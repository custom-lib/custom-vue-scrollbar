import type { StyleValue } from 'vue';

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

declare const _default: import("vue").DefineComponent<{
    wrapperClass: {
        type: any;
        required: false;
    };
    wrapperStyle: {
        type: StyleValue;
        required: false;
    };
    class: {
        type: any;
        required: false;
    };
    style: {
        type: StyleValue;
        required: false;
    };
    contentClass: {
        type: StringConstructor;
        required: false;
    };
    contentStyle: {
        type: StyleValue;
        required: false;
    };
    direction: {
        type: 'horizontal' | 'vertical';
        required: false;
        default: 'vertical';
    };
    fixedThumb: {
        type: BooleanConstructor;
        required: false;
    };
    thumbMinSize: {
        type: NumberConstructor;
        required: false;
        default: 48;
    };
    thumbMaxSize: {
        type: NumberConstructor;
        required: false;
        default: Infinity;
    };
    thumbWidth: {
        type: NumberConstructor;
        required: false;
        default: 12;
    }
    autoHide: {
        type: BooleanConstructor;
        required: false;
        default: true;
    };
    autoHideDelay: {
        type: NumberConstructor;
        required: false;
        default: 900;
    };
    autoExpand: {
        type: BooleanConstructor;
        required: false;
        default: true;
    };
    throttleType: {
        type: 'throttle' | 'debounce' | 'none';
        required: false;
        default: 'debounce';
    };
    throttleWait: {
        type: NumberConstructor;
        required: false;
        default: 333;
    };
    simulateScroll: {
        type: BooleanConstructor;
        required: false;
    };
}, {
    props: {
        wrapperClass?: string | undefined;
        wrapperStyle?: StyleValue | undefined;
        contentClass?: string | undefined;
        contentStyle?: StyleValue | undefined;
        direction: 'horizontal' | 'vertical';
        fixedThumb?: boolean | undefined;
        thumbMinSize: number;
        thumbMaxSize: number;
        thumbWidth: number;
        autoHide: boolean;
        autoHideDelay: number;
        autoExpand: boolean;
        throttleType: 'throttle' | 'debounce' | 'none';
        throttleWait: number;
        simulateScroll?: boolean | undefined;
    };
    emit: {
        (type: 'wrapperResize', evt: Rect): void;
        (type: 'contentResize', evt: Rect): void;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("wrapperResize" | "contentResize")[], "wrapperResize" | "contentResize", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    class?: any | undefined;
    style?: StyleValue | undefined;
    contentClass?: string | undefined;
    contentStyle?: StyleValue | undefined;
    wrapperClass?: string | undefined;
    wrapperStyle?: StyleValue | undefined;
    direction?: 'horizontal' | 'vertical';
    fixedThumb?: boolean;
    thumbMinSize?: number;
    thumbMaxSize?: number;
    thumbWidth?: number;
    autoHide?: boolean;
    autoHideDelay?: number;
    autoExpand?: boolean;
    throttleType?: 'throttle' | 'debounce' | 'none';
    throttleWait?: number;
    simulateScroll?: boolean | undefined;
} & {
    direction: 'horizontal' | 'vertical';
    fixedThumb: boolean;
    thumbMinSize: number;
    thumbMaxSize: number;
    autoHide: boolean;
    autoHideDelay: number;
    autoExpand: boolean;
    throttleType: string;
    throttleWait: number;
    simulateScroll: boolean;
} & {
    class?: any| undefined;
    style?: StyleValue | undefined;
    contentClass?: string | undefined;
    contentStyle?: StyleValue;
}> & {
    onWrapperResize?: ((rect: Rect) => void) | undefined;
    onContentResize?: ((rect: Rect) => void) | undefined;
}, {
    direction: 'horizontal' | 'vertical';
    fixedThumb: boolean;
    thumbMinSize: number;
    thumbMaxSize: number;
    autoHide: boolean;
    autoHideDelay: number;
    autoExpand: boolean;
    throttleType: string;
    throttleWait: number;
    simulateScroll: boolean;
}>;
export default _default;
