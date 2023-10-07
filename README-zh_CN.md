custom-vue-scrollbar(Vue3)
=========================

 [custom-react-scrollbar (react版)](https://github.com/custom-lib/custom-react-scrollbar)

中文 | [English](https://github.com/custom-lib/custom-vue-scrollbar/blob/main/READM.md)

**[Demos](https://custom-lib.github.io/custom-vue-scrollbar/)**

* 很少的api，像原生滚动容器一样使用。
* 可以自定义滚动条样式。
* 支持滚动条最小尺寸/最大尺寸设置。
* 自动隐藏滚动条、设置自动隐藏延时。
* 浮动滚动条（当滚动容器超出屏幕可视区域时，让滚动条固定于屏幕底部）。
* 滚动只吃一点cpu占用，不会造成很大的性能问题。可选的debounce/throttle类型与时间监听滚动容器尺寸变化。
* 支持 原生滚动模式（默认） 和 模拟滚动模式（用于如：与浮动元素同步滚动进度等场景）。
* 很轻量，未压缩前16.5kb，压缩后4.5kb（gzip）。
* typescript支持

##### 我为什么会造一个自定义滚动条的新轮子

1. 我需要一个不改变原生滚动机制的滚动条以很方便的与其他组件结合。没错我指的就是better-scroll的transform模拟机制。
2. 我需要满足上述浮动滚动条的需求，这是社区中的其他滚动条组件没有的。
3. 我需要可以切换的模拟滚动模式，用以浮动在外的元素同步滚动进度时不出现延时。这点perfect-scrollbar可以满足，但是它太古老太重性能太差，而且只支持模拟滚动模式（正常情况下用原生滚动模式性能更优，触控板滑动体验更友好）。
4. 我需要鼠标靠近滚动条时候变大以方便点击这个交互细节。这点perfect-scrollbar也有，但是其他更新的库如react-scrollbars-custom等都不支持。
5. 我需要一个使用上尽可能接近原生的，0侵入式的，轻量的滚动条。社区的其他滚动条喜欢加一些额外的概念，这让我很不舒服。
6. 我需要性能拖累不那么大的自定义滚动条。因此：js层面不能有过多的计算，render方式尽可能优化，css的contain属性也会有很大帮助。当我做完这些，在老机子上对比社区其他库的性能表现，确认custom-vue-scrollbar会比它们都要优秀。

## 引入

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

## 基础用法

像使用原生滚动容器一样给它设置一个固定的尺寸即可。原生的滚动api可以通过ref.scrollEl形式使用。

```javascript
<template>
    <custom-scrollbar :style="{ width: '500px', height: '300px' }" ref="scroll">
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

除以下组件Props，也可以使用所有原生DOM属性和事件。

**class** _`:string`_ = undefined
滚动容器class，一般只用来设置尺寸。

**style** _`:object`_ = undefined
滚动容器style。

**wrapperClass** _`:string`_ = undefined
包裹容器的class。

**wrapperStyle** _`:object`_ = undefined
包裹容器的style。

**contentClass** _`:string`_ = undefined
内容容器class，设置display、padding等的地方。

**contentStyle** _`:object`_ = undefined
内容容器style。

**direction** _`:'horizontal' | 'vertical'`_ = 'vertical'  
内容容器默认block布局，如果需要改成横向排列，可以通过设置组件属性 'direction' 为 'horizontal' 来使其布局变为 'display': 'flex' & 'flex-direction': 'row'。 或者通过 'contentClass' / 'contentStyle' 属性来手动设置。但是不建议手动设置，因为 'direction' 属性 与下文 'fixedThumb' 属性 有关。

**thumbMinSize / thumbMaxSize** _`:number`_ = 48 / Infinity  
设置滚动条的 最小/最大 尺寸。

**thumbWidth** _`:number`_ = 12
设置滚动条的宽度。

**autoHide** _`:boolean`_ = true  
开启后，只有当鼠标悬浮于滚动容器上时才会显示滚动条。

**autoHideDelay** _`:number(ms)`_ = 900
当滚动发生后 鼠标移出容器，经过autoHideDelay设置的延迟才会隐藏滚动条。

**autoExpand** _`:boolean`_ = true  
滚动条默认是8px宽，实际外部有一个12px的占位容器，点击、拖拽的逻辑是挂在这个占位容器上的(方便点击，8px视觉上舒服但是难点)。当开启这个选项，占位容器hover时，滚动条宽度会变为占位容器的宽度。

**fixedThumb** _`:boolean`_ = false
'direction' 属性指定的方向为 '主轴方向'。开启fixedThumb后，如果辅轴有滚动条，并且主轴方向有部分滚动容器位于屏幕外。辅轴的滚动条将会浮动至屏幕边缘。

**throttleType** _`:'throttle' | 'debounce' | 'none'`_ = 'debounce'
ResizeObserver监听 包裹/内容 容器的尺寸变化来更新滚动条的尺寸。大部分场景下并不需要高频率的刷新，并且大部分场景下使用'debounce'即可。

**throttleWait** _`:number`_ = 333
'throttleType'属性不为'none'时触发的时间。

**simulateScroll** _`:boolean`_ = false
使用wheel模拟滚动代替原生滚动。在需要与外部浮动的元素同步滚动进度时开启，可以消除原生滚动在同步时 不在同一轮事件循环里 带来的抖动。

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
滚动容器大小改变时触发

**contentResize** _`:(rect: Rect) => void`_
内容容器大小改变时触发

### 覆写滚动条样式

```javascript
// 修改滚动条尺寸(占位容器)，hover前的滚动条显示宽度为占位容器的2/3，如下则为12px。
.scrollbar__thumbPlaceholder--vertical {
    width: 20px;
}
.scrollbar__thumbPlaceholder--horizontal {
    height: 20px;
}

// 修改滚动条样式。
.scrollbar__thumb {
    background-color: red;
}
```

## 运行示例

Run the demos:
```bash
npm install
npm run dev
```

## 打包

```bash
npm install
npm run build:lib
```

## License

MIT


## custom-lib相关QQ群

![image](https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/assets/qrCode.jpg)
