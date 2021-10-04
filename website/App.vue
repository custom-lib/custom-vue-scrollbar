<template>
    <custom-scrollbar class="page-scroller">
        <h1 class="page_title">
            CustomScrollbar (vue3)
            <div class="language_btn" @click="handleChangeLanguage">{{ locale === 'en' ? '简体中文' : 'English' }}</div>
        </h1>
        <div class="box_container">
            <BasicUsage />
            <Horizontal />
            <ThumbStyle />
            <AutoHide />
            <AutoHideDelay />
            <AutoExpand />
            <AutoHeight />
            <ThumbSize />
            <FixedThumb />
            <Other />
        </div>
    </custom-scrollbar>
</template>

<script lang="ts">
export default {
    name: 'App',
};
</script>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import AutoExpand from './examples/AutoExpand.vue';
import AutoHeight from './examples/AutoHeight.vue';
import AutoHide from './examples/AutoHide.vue';
import AutoHideDelay from './examples/AutoHideDelay.vue';
import BasicUsage from './examples/BasicUsage.vue';
import FixedThumb from './examples/FixedThumb.vue';
import Horizontal from './examples/Horizontal.vue';
import Other from './examples/Other.vue';
import ThumbSize from './examples/ThumbSize.vue';
import ThumbStyle from './examples/ThumbStyle.vue';

const { locale } = useI18n();
const handleChangeLanguage = () => {
    if (locale.value === 'zh') locale.value = 'en';
    else locale.value = 'zh';
};
</script>

<style lang="scss">
body {
    font-family: Gilroy, sans-serif, Avenir, Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    letter-spacing: 0.02em;
    margin: 0;
    background: linear-gradient(180deg, #ebf3fa 9.85%, #dde7f3 53.92%, #e6f0f9 100%);
    overflow: hidden;
}

.language_btn {
    position: absolute;
    right: 40px;
    top: 0;
    width: 100px;
    height: 44px;
    line-height: 44px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    background-color: #e3edf7;
    box-shadow: -4px -2px 16px #ffffff, 4px 2px 16px rgba(136, 165, 191, 0.48);
    text-decoration: none;
    cursor: pointer;
    transition: box-shadow 300ms ease;
    user-select: none;
    &:hover {
        box-shadow: inset -3px -3px 7px #ffffff, inset 3px 3px 7px rgba(136, 165, 191, 0.48);
    }
}

.page-scroller {
    height: 100vh;
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 120px;
}

* {
    box-sizing: border-box;
}

.page_title {
    position: relative;
    text-align: center;
    font-weight: bold;
    color: #31456a;
    margin-block-start: 0;
    margin-block-end: 0;
    &::after {
        content: '';
        display: block;
        margin: 24px 0 40px 0;
        width: 100%;
        height: 1px;
        background-color: #dae2e9;
    }
}

.box_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15vh;
}
</style>
