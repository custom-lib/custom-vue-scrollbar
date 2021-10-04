<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/FixedThumb.vue"
    >
        <custom-scrollbar :fixedThumb="true" :autoHide="false" throttleType="none">
            <div v-for="_ in 20" v-once :style="{ width: '100vw', maxWidth: '1400px', height: '8vh', lineHeight: '8vh' }">
                horizontal thumb is fixed in screen bottom now...
            </div>
        </custom-scrollbar> 
    </Box> 
</template>

<script lang="ts">import { defineComponent } from "vue";

export default defineComponent({
    name: 'FixedThumb',
    i18n: {
        messages: {
            en: {
                title: 'Fixed Thumb',
                desc: `
                    The 'direction' property specifies the direction as the 'major axis direction'.
                    When the 'fixedThumb' property is turned on, if the secondary axis has a scrollbar and the major axis has a scroll container that is partially off-screen.
                    The scrollbars of the secondary axis will float to the edge of the screen.
                `
            },
            zh: {
                title: '基础用法',
                desc: `'direction' 属性 指定的方向为 '主轴方向'。开启 'fixedThumb' 属性 后，如果辅轴有滚动条，并且主轴方向有部分滚动容器位于屏幕外。辅轴的滚动条将会浮动至屏幕边缘。`
            },
        },
    },
});
</script>