import { debounce, throttle } from 'lodash-es';
import { onUnmounted, reactive, shallowRef, watchEffect } from 'vue';
import type { Ref } from 'vue';

export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    x: number;
    y: number;
}

interface Option {
    wait?: number;
    type?: 'throttle' | 'debounce' | 'none';
    callback?: () => void;
}

const defaultOption = {
    wait: 333,
    type: 'debounce'
}

export default function useMeasure<T extends Element | SVGSVGElement = any>(ref: Ref<T>, option?: Option): Rect;
export default function useMeasure<T extends Element | SVGSVGElement = any>(option?: Option): readonly [Ref<T>, Rect];
export default function useMeasure<T extends Element | SVGSVGElement = any>(...args: any) {
    const hasParamRef = 'value' in args?.[0];
    let option: Option | undefined;
    if (hasParamRef) option = args?.[1];
    else option = args?.[0];
    const { wait, type, callback } = { ...defaultOption, ...option };
    const targetRef = hasParamRef ? args[0] : shallowRef<T>(null!)
    const rect = reactive<Rect>({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 });

    let ro: ResizeObserver | null = null;
    const clearRo = () => {
        if (!ro) return;
        ro.disconnect();
        ro = null;
    }

    watchEffect(() => {
        if (!targetRef.value) return;
        clearRo();
        const observerFunc = () => {
            const domRect = targetRef.value.getBoundingClientRect();
            rect.left = domRect.left;
            rect.top = domRect.top;
            rect.right = domRect.right;
            rect.bottom = domRect.bottom;
            rect.width = domRect.width;
            rect.height = domRect.height;
            rect.x = domRect.x;
            rect.y = domRect.y;
            callback?.();
        };

        let execFunc = observerFunc;
        if (type === 'throttle' && wait >= 4) execFunc = throttle(execFunc, wait);
        else if (type === 'debounce' && wait >= 4) execFunc = debounce(execFunc, wait);
        window.addEventListener('resize', execFunc);
        ro = new ResizeObserver(execFunc);
        ro.observe(targetRef.value as Element);
    });

    onUnmounted(clearRo);

    if (hasParamRef) return rect;
    return [targetRef, rect] as const;
}
