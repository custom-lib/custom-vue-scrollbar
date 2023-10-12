custom-vue-scrollbar(Vue3)
=========================

[custom-react-scrollbar (react version here)](https://github.com/custom-lib/custom-react-scrollbar)

English | [中文](https://github.com/custom-lib/custom-vue-scrollbar/blob/main/README-zh_CN.md)

**[Demos](https://custom-lib.github.io/custom-vue-scrollbar/)**

It's dependencies of custom-vue-table.

* Few APIs, used like native scroll container.
* Customize the scroll bar style.
* Support the minimum size/maximum size setting of the scroll bar.
* Automatically hide the scroll bar and optional set the automatic hide delay.
* Floating scroll bar (when the scroll container exceeds the visible area of ​​the screen, the scroll bar is fixed at the bottom of the screen).
* High performance.Optional debounce/throttle to observe size changes.。
* Support native scroll mode (default) and simulate scroll mode (useful in scenes such as: scroll synchronously with outer float elements).
* it's lightweight. 16.5kb uncompressed, 4.5kb after compression (gzip).
* typescript support.

##### Why I write this lib

1. I need a scrollbar that doesn't change the native scrolling mechanism to easily integrate with other components. Yes, I am referring to the better-scroll's transform simulation mechanism.
2. I need to satisfy the above requirement of a floating scrollbar, which is not available in other scrollbar components in the community.
3. I need a toggleable simulate scroll mode to synchronize the scrolling progress of the floating outer elements without delay. This can be satisfied by perfect-scrollbar, but it is too old, too heavy, too poor performance, and only supports simulated scrolling mode (under normal circumstances with native scroll mode performance is better, and touchpad sliding experience is more friendly).
4. I need the interaction detail that the mouse gets bigger when it is close to the scrollbar to facilitate clicking. This is also available in perfect-scrollbar, but other better libraries such as react-scrollbars-custom don't support it.
5. I need a scrollbar that is as close to native as possible, 0-intrusive, and lightweight. Other scrollbars in the community like to add some extra concepts, which makes me uncomfortable.
6. I need a custom scrollbar with less performance drag. So: no excessive calculations at the js level, render method optimized as much as possible, css contain property would also help a lot. When I'm done with this and comparing the performance performance of other libraries in the community on an old machine, I confirm that custom-vue-scrollbar will outperform them all.

## Install

```bash
npm install --save custom-vue-scrollbar
```

```javascript
// main.ts
import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';
app.component(CustomScrollbar.name, CustomScrollbar);

declare module 'vue' {
    export interface GlobalComponents {
        CustomScrollbar: typeof CustomScrollbar;
    }
}
```

## Basic Usage

Just give it a fixed size like using a native scroll container.The native scroll api can be used via the ref.scrollEl.

```javascript
<template>
    <custom-scrollbar :style="{ width: '500px', height: '300px' }">
        <div :style="{ width: '1000px', height: '600px' }">
            Some great content...
        </div>
    </custom-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const scroll = ref<{ scrollEl: HTMLDivElement; }>();

const handleClickScrollToTop = () => {
    if (!scroll.value.scrollEl) return;
    scroll.value.scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
```


### Props

In addition to the following component Props, all native DOM properties and events can also be used.

**class** _`:string`_ = undefined
Container class, which is generally only used to set the size.

**style** _`:object`_ = undefined
Container style.

**wrapperClass** _`:string`_ = undefined
Wrapper class, the place to set display, padding, etc.

**wrapperStyle** _`:object`_ = undefined
Wrapper style.

**contentClass** _`:string`_ = undefined
Content class, the place to set display, padding, etc.

**contentStyle** _`:object`_ = undefined
Content style.

**direction** _`:'horizontal' | 'vertical'`_ = 'vertical'  
If you need to change the content container to horizontal layout, you can set the component property 'direction' to 'horizontal' to change the layout to 'display': 'flex' & 'flex-direction': 'row'. Or set it manually via 'contentClass' / 'contentStyle' properties. However, it is not recommended to set it manually, as the 'direction' property is related to the 'fixedThumb' property below.

**thumbMinSize / thumbMaxSize** _`:number`_ = 48 / Infinity  
Sets the minimum/maximum size of the scrollbar.

**thumbWidth** _`:number`_ = 12
Set the width of the scrollbar thumb.

**autoHide** _`:boolean`_ = true  
When turned on, the scrollbar will be displayed only when the mouse hovers over the scroll container.

**autoHideDelay** _`:number(ms)`_ = 900
When the scrolling is triggered, the scrollbar will be hidden only after the delay set by autoHideDelay.

**autoExpand** _`:boolean`_ = true  
Scroll bar default is 8px wide, the actual external has a 12px placeholder container, click, drag and drop logic is hanging on this placeholder container (convenient to click, 8px visually comfortable but difficult). When this option is turned on, the occupancy container hover, the scrollbar width will change to the width of the occupancy container.

**fixedThumb** _`:boolean`_ = false
The 'direction' property specifies the direction as the 'major axis direction'. When the 'fixedThumb' property is turned on, if the secondary axis has a scrollbar and the major axis has a scroll container that is partially off-screen. The scrollbar of the secondary axis will float to the edge of the screen.

**throttleType** _`:'throttle' | 'debounce' | 'none'`_ = 'debounce'
ResizeObserver listens for changes in the size of the container/content DOM Node to update the size of the scrollbar. Most scenarios do not require a high refresh rate and using 'debounce' is sufficient in most scenarios.

**throttleWait** _`:number`_ = 333
The time to trigger when the 'throttleType' attribute is not 'none'.

**simulateScroll** _`:boolean`_ = false
Use 'wheel' to simulate scrolling instead of native scrolling. Turn it on when you need to synchronize the scrolling progress with an external floating element to eliminate the jitter caused by native scrolling that is not in the same event loop when synchronizing.

### Emit

```javascript
interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    x: number;
    y: number;
}
```

**wrapperResize** _`:(rect: Rect) => void`_
Triggered when the size of the scroller container changes

**contentResize** _`:(rect: Rect) => void`_
Triggered when the size of the scroller content changes

### Overwrite scrollbar style

```javascript
// Modify the scrollbar size (placeholder container), the width of the scrollbar display before hover is 2/3 of the placeholder container, as follows, it is 12px.
.scrollbar__thumbPlaceholder--vertical {
    width: 20px;
}
.scrollbar__thumbPlaceholder--horizontal {
    height: 20px;
}

// Modify the scrollbar style.
.scrollbar__thumb {
    background-color: red;
}
```

## Running example

Run the demos:
```bash
npm install
npm run dev
```

## Build lib
```bash
npm install
npm run build:lib
```

## License

MIT
