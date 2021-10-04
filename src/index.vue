<template>
    <div class="scrollbar__wrapper">
        <div
            ref="wrapperEl"
            class="scrollbar__scroller"
            v-bind="$attrs"
            @wheel="handleScroll"
            @scroll="handleScroll"
        >
            <div
                ref="contentEl"
                :class="['scrollbar__content', contentClass, { ['scrollbar__content--fixedThumb']: fixedThumb, [`scrollbar__content--${direction}`]: direction }]"
                :style="contentStyle"
            >
                <slot></slot>
            </div>
        </div>

        <Thumb
            v-for="(_, thumbType) in thumbs"
            :ref="instance => setThumbsInstance(instance, thumbType)"
            :key="thumbType"
            :autoExpand="autoExpand"
            :autoHide="autoHide"
            :autoHideDelay="autoHideDelay"
            :fixedThumb="(thumbType === direction ? false : fixedThumb)"
            :type="thumbType"
            :scrollInfo="thumbType === 'vertical' ? scrollHeightInfo : scrollWidthInfo"
            :wrapperEl="wrapperEl"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'CustomScrollbar',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { clamp } from 'lodash-es';
import type { HTMLAttributes, StyleValue } from 'vue';
import { onMounted, watch } from 'vue';
import Thumb from './thumb.vue';
import type { Rect } from './useMeasure';
import useMeasure from './useMeasure';

interface Props extends HTMLAttributes {
    contentClass?: string;
    contentStyle?: StyleValue;
    /** Set major scroll direction.Will auto set the scroll container element display to 'horizontal' -> 'inline-flex' / 'vertical' -> 'block'('inline-block' if fixedThumb). */
    direction?: 'horizontal' | 'vertical';
    thumbMinSize?: number;
    thumbMaxSize?: number;
    autoHide?: boolean;
    autoHideDelay?: number;
    autoExpand?: boolean;
    /** In fixedThumb mode, minor direction thumb will be fixed at edge of screen if scroller element out of window. */
    fixedThumb?: boolean;
    throttleType?: 'throttle' | 'debounce' | 'none';
    throttleWait?: number;
    simulateScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'vertical',
    autoHide: true,
    autoHideDelay: 900,
    autoExpand: true,
    throttleType: 'debounce',
    throttleWait: 333,
    thumbMinSize: 48,
    thumbMaxSize: Infinity,
});

const emit = defineEmits<{
    (type: 'wrapperResize', evt: Rect): void;
    (type: 'contentResize', evt: Rect): void;
    (type: 'scroll', evt: { target: Element; scrollLeft: number; scrollTop: number; }): void;
}>();


/** Batch render Thumbs.Get the Thumb element and then set transform, autoHide onScroll. */
const thumbs = {
    horizontal: { el: null as unknown as HTMLElement, instance: null as unknown as typeof Thumb},
    vertical: { el: null as unknown as HTMLElement, instance: null as unknown as typeof Thumb }
};
const setThumbsInstance = (instance: any, direction: keyof typeof thumbs) => {
    if (!thumbs[direction].instance) thumbs[direction].instance = instance;
}
let wrapperEl = $shallowRef<HTMLDivElement>(null!);
let contentEl = $shallowRef<HTMLDivElement>(null!);
onMounted(() => {
    const childNodes = Array.from(wrapperEl.parentElement?.childNodes!);
    for (const thumbType in thumbs) {
        thumbs[thumbType as keyof typeof thumbs].el = childNodes.find(ele => (ele as HTMLElement)?.classList?.contains(`scrollbar__thumbPlaceholder--${thumbType}`)) as HTMLElement;
    }
});



/** Measure the rect of wrapperEl and container el reactively, computed size of thumb. */
const wrapperRect = useMeasure($$(wrapperEl), { wait: props.throttleWait, type: props.throttleType, callback: updateMaxScrollDistance });
const contentRect = useMeasure($$(contentEl), { wait: props.throttleWait, type: props.throttleType, callback: updateMaxScrollDistance });
let nativeMaxScrollTop = $shallowRef<number>(0);
let nativeMaxScrollLeft = $shallowRef<number>(0);
function updateMaxScrollDistance() { // Recalculate native scrollable distance should happen at both wrapperEl and contentEl rect changee.
    nativeMaxScrollTop = Math.max((wrapperEl.scrollHeight - wrapperRect.height) | 0 , 0);
    nativeMaxScrollLeft = Math.max((wrapperEl.scrollWidth - wrapperRect.width) | 0, 0);
}
let scrollWidthInfo = $computed(() => {
    return {
        thumbSize : nativeMaxScrollLeft ? 
            clamp(
                wrapperRect.width / wrapperEl.scrollWidth *  wrapperRect.width,
                props.thumbMinSize > wrapperRect.width ? 48 : props.thumbMinSize,
                props.thumbMaxSize
            ) : 0,
        /** used in mouse drag handler */
        contentMainSize: contentRect.width,
        wrapperMainSize: wrapperRect.width,
        /** for fixedThumb position */
        boundaryDistance: Math.abs(wrapperRect.left),
    }
});
let scrollHeightInfo = $computed(() => {
    return {
        thumbSize:
            nativeMaxScrollTop ?
            clamp(
                wrapperRect.height / wrapperEl.scrollHeight * wrapperRect.height,
                props.thumbMinSize > wrapperRect.height ? 48 : props.thumbMinSize,
                props.thumbMaxSize
            ) : 0,
        contentMainSize: contentRect.height,
        wrapperMainSize: wrapperRect.height,
        boundaryDistance: Math.abs(wrapperRect.top),
    }
});
// Scrollable distance of simulate custom scrollbar's thumb.
let maxScrollTop = $computed(() => wrapperRect.height - scrollHeightInfo.thumbSize - 5) // thumb has 3px's margin to wrapper;
let maxScrollLeft = $computed(() => wrapperRect.width - scrollWidthInfo.thumbSize - 5);



const handleNativeScroll = () => {
    if (nativeMaxScrollLeft) {
        thumbs.horizontal.el.style.transform = `translate3d(${(wrapperEl.scrollLeft / nativeMaxScrollLeft) * maxScrollLeft}px, 0, 0)`;
        thumbs.horizontal.instance.autoHideAfterScroll();
    }
    if (nativeMaxScrollTop) {
        thumbs.vertical.el.style.transform = `translate3d(0, ${(wrapperEl.scrollTop / nativeMaxScrollTop) * maxScrollTop}px, 0)`;
        thumbs.vertical.instance.autoHideAfterScroll();
    }
}
// should recalculate thumb position when dynamic content size change.
watch(() => [nativeMaxScrollLeft, nativeMaxScrollTop], handleNativeScroll);


const handleSimulateScroll = (evt: WheelEvent) => {
    evt.stopPropagation();
    const preScrollLeft = wrapperEl.scrollLeft;
    const preScrollTop = wrapperEl.scrollTop;
    const newScrollLeft = clamp(preScrollLeft + (evt?.deltaX || 0), 0, nativeMaxScrollLeft) | 0;
    const newScrollTop = clamp(preScrollTop + (evt?.deltaY || 0), 0, nativeMaxScrollTop) | 0;
    wrapperEl.scrollLeft = newScrollLeft;
    wrapperEl.scrollTop = newScrollTop;
    if (nativeMaxScrollLeft) {
        thumbs.horizontal.el.style.transform = `translate3d(${(newScrollLeft / nativeMaxScrollLeft) * maxScrollLeft}px, 0, 0)`;
        thumbs.horizontal.instance.autoHideAfterScroll();
    }
    if (nativeMaxScrollTop) {
        thumbs.vertical.el.style.transform = `translate3d(0, ${(newScrollTop / nativeMaxScrollTop) * maxScrollTop}px, 0)`;
        thumbs.vertical.instance.autoHideAfterScroll();
    }
    emit('scroll', { target: wrapperEl, scrollLeft: newScrollLeft, scrollTop: newScrollTop });
}

const handleScroll = (evt: WheelEvent | UIEvent) => {
    if (props.simulateScroll) handleSimulateScroll(evt as WheelEvent);
    else handleNativeScroll();
}


watch(wrapperRect, () => emit('wrapperResize', wrapperRect));
watch(contentRect, () => emit('contentResize', contentRect));
</script>

<style lang="scss">
.scrollbar__wrapper {
    position: relative;
    height: fit-content;
    &:hover {
        > .scrollbar__thumbPlaceholder {
            opacity: 1;
        }
    }
}
.scrollbar__scroller {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    scroll-behavior: auto !important;
}

.scrollbar__content {
    &--vertical {
        display: block;
        &.scrollbar__content--fixedThumb {
            display: inline-block;
        }
    }
    &--horizontal {
        display: inline-flex;
    }
}
</style>