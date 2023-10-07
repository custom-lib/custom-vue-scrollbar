<template>
    <div
        v-show="Boolean(scrollInfo.thumbSize) && (fixedThumb ? isWrapperIntersecting : true)"
        :class="[
            'scrollbar__thumbPlaceholder',
            `scrollbar__thumbPlaceholder--${type}`,
            {
                ['scrollbar__thumbPlaceholder--autoHide']: autoHide,
                ['scrollbar__thumbPlaceholder--autoExpand']: autoExpand,
            }
        ]"
        :style="{
            width: type === 'horizontal' ? `${scrollInfo.thumbSize}px`: '',
            height: type === 'vertical' ? `${scrollInfo.thumbSize}px` : '',
            position: !shouldFixed ? 'absolute' : 'fixed',
            [type === 'vertical' ? 'top' : 'left']: !shouldFixed ? '3px' : `${scrollInfo.boundaryDistance + 3}px`
        }"
        ref="thumbEl"
        @pointerdown.stop="handlePointerDown"
    >
        <div
            v-once
            :class="['scrollbar__thumb', `scrollbar__thumb--${type}`]"
        />
    </div>
    <div
        v-if="props.fixedThumb"
        v-show="Boolean(scrollInfo.thumbSize)"
        ref="shepherdEl"
        :class="['scrollbar__shepherd', `scrollbar__shepherd--${type}`]"
    />
</template>

<script lang="ts">
export default {
    name: 'ScrollbarThumb'
}
</script>
<script setup lang="ts">
import { throttle } from 'lodash-es';
import { computed, onUnmounted, watch } from 'vue';

interface Props {
    type: 'horizontal' | 'vertical';
    autoExpand: boolean;
    autoHide: boolean;
    autoHideDelay: number;
    fixedThumb?: boolean;
    scrollInfo: {
        thumbSize: number;
        contentMainSize: number;
        wrapperMainSize: number;
        boundaryDistance: number;
    };
    thumbWidth?: number;
    wrapperEl: Element;
}
const props = defineProps<Props>();
const computedThumbWidth = computed(() => `${props.thumbWidth ?? 12}px`)

/** <--------------- mouse drag handler ---------------> */
let autoHideTimer: number | null = null;
let thumbEl = $shallowRef<HTMLDivElement>(null!);
const pointerDownInfo = { pageX: 0, pageY: 0, scrollPos: 0 };
let pointerId: number | null = null;

const startAutoHideTimer = () => {
    autoHideTimer = setTimeout(() => {
        if (thumbEl) thumbEl.classList.remove('scrollbar__thumbPlaceholder--scrolling')
        autoHideTimer = null;
    }, props.autoHideDelay);
}

const clearAutoHideTimer = () => {
    if (autoHideTimer !== null) clearTimeout(autoHideTimer);
}
onUnmounted(clearAutoHideTimer);

const handlePointerMove = throttle((evt: PointerEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    const moveDirection = props.type === 'horizontal' ? 'pageX' : 'pageY';
    const moveDistance = (evt[moveDirection] - pointerDownInfo[moveDirection]) / props.scrollInfo.wrapperMainSize * props.scrollInfo.contentMainSize;
    props.wrapperEl.scrollTo({ [props.type === 'horizontal' ? 'left' : 'top']: pointerDownInfo.scrollPos + moveDistance, behavior: 'auto' });
}, 16);

const handlePointerEnd = () => {
    startAutoHideTimer();

    thumbEl.removeEventListener('pointermove', handlePointerMove);
    thumbEl.removeEventListener('pointerup', handlePointerEnd);
    thumbEl.removeEventListener('pointercancel', handlePointerEnd);
    thumbEl.removeEventListener('mousewheel', handlePointerEnd);
    document.removeEventListener('mousewheel', handlePointerEnd);
    if (typeof pointerId === 'number') thumbEl.releasePointerCapture(pointerId);
    pointerId = null;
};

const handlePointerDown = (evt: PointerEvent) => {
    if (evt.ctrlKey || evt.button !== 0) return;
    clearAutoHideTimer();

    pointerDownInfo.pageX = evt.pageX;
    pointerDownInfo.pageY = evt.pageY;
    pointerDownInfo.scrollPos = props.wrapperEl[props.type === 'horizontal' ? 'scrollLeft' : 'scrollTop'];

    pointerId = evt?.pointerId;
    thumbEl.setPointerCapture(pointerId);

    thumbEl.addEventListener('pointermove', handlePointerMove);
    thumbEl.addEventListener('pointerup', handlePointerEnd);
    thumbEl.addEventListener('pointercancel', handlePointerEnd);
    thumbEl.addEventListener('mousewheel', handlePointerEnd, { passive: false });
    document.addEventListener('mousewheel', handlePointerEnd, { passive: false }); // cancel drag on mousewheel
    thumbEl.classList.add('scrollbar__thumbPlaceholder--scrolling');
}

const autoHideAfterScroll = () => {
    clearAutoHideTimer();
    if (thumbEl) thumbEl.classList.add('scrollbar__thumbPlaceholder--scrolling');
    startAutoHideTimer();
}
defineExpose({
    autoHideAfterScroll
});



/** <--------------- fixed Thumb ---------------> */
let isWrapperIntersecting = $shallowRef<boolean>(false);
let isShepherdIntersecting = $shallowRef<boolean>(false);
let shepherdEl = $shallowRef<HTMLElement>(null!);
let shepherdIO: IntersectionObserver | null = null;
let wrapperIO: IntersectionObserver | null = null;
let shouldFixed = $computed(() => props.fixedThumb && !isShepherdIntersecting);
const shepherdIOCallback: IntersectionObserverCallback = ([entry]) => isShepherdIntersecting = entry.isIntersecting;
const wrapperIOCallback: IntersectionObserverCallback = ([entry]) => isWrapperIntersecting = entry.isIntersecting;

const clearIO = () => {
    if (shepherdIO) {
        shepherdIO.disconnect();
        shepherdIO = null;
    }
    if (wrapperIO) {
        wrapperIO.disconnect();
        wrapperIO = null;
    }
}

watch(() => [props.fixedThumb, props.wrapperEl], () => {
    if (!props.fixedThumb || !props.wrapperEl) return clearIO();
    clearIO();
    wrapperIO = new IntersectionObserver(wrapperIOCallback, { threshold: [0, 0.5] });
    wrapperIO.observe(props.wrapperEl);
    shepherdIO = new IntersectionObserver(shepherdIOCallback);
    shepherdIO.observe(shepherdEl);
});

onUnmounted(clearIO);
</script>

<style lang="scss">
.scrollbar__thumbPlaceholder {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    contain: strict;
    transition: opacity 275ms ease;

    &--vertical {
        top: 3px;
        right: 0;

        width: v-bind(computedThumbWidth);
    }
    &--horizontal {
        left: 3px;
        bottom: 0;

        height: v-bind(computedThumbWidth);
    }

    &--autoHide {
        opacity: 0;
    }

    &--scrolling {
        opacity: 1;
    }

    &:hover {
        > .scrollbar__thumb {
                opacity: 1;
        }
    }
    &--autoExpand {
        &:hover {
            > .scrollbar__thumb {
                &--vertical {
                    transform: scaleX(1.5);
                }
                &--horizontal {
                    transform: scaleY(1.5);
                }
            }
        }
    }
}

.scrollbar__thumb {
    background-color: rgba(9, 30, 66, 0.5);
    opacity: .6;
    transition: opacity 275ms ease, transform 200ms ease;
    contain: strict;

    border-radius: 4px;
    &--vertical {
        width: 66.667%;
        height: 100%;
    }
    &--horizontal {
        height: 66.667%;
        width: 100%;
    }
}

.scrollbar__shepherd {
    position: absolute;
    &--vertical {
        width: 0%;
        height: 1000;
        top: 0;
        right: 0;
    }
    &--horizontal {
        width: 100%;
        height: 0%;
        bottom: 0;
        left: 0;
    }
    contain: strict;
}
</style>