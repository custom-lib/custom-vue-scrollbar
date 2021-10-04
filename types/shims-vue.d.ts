 /// <reference types="vue/ref-macros" />

declare module '*.vue' {
    import { App, DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any> & {
        install(app: App): void;
    };
    export default component;
}
