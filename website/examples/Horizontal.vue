<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/Horizontal.vue"
    >
        <custom-scrollbar :style="{ width: '100%', padding: '12px' }" direction="horizontal">
            <p
                v-for="_ in 48"
                v-once
                :style="{ whiteSpace: 'nowrap' }"
            >
                Hover to show thumb...
            </p>
        </custom-scrollbar> 
    </Box>
</template>

<script lang="ts">
export default {
    name: 'Horizontal',
    i18n: {
        messages: {
            en: {
                title: 'Horizontal',
                desc: `
                    If you need to change the content container to horizontal layout,
                    you can set the component property 'direction' to 'horizontal' to change the layout to 'display': 'flex' & 'flex-direction': 'row'.
                    Or set it manually via 'contentClass' / 'contentStyle' properties.
                    However, it is not recommended to set it manually, as the 'direction' property is related to the 'fixedThumb' property below.
                `
            },
            zh: {
                title: '横向排列',
                desc: `
                    内容容器默认block布局，如果需要改成横向排列，可以通过设置组件属性 'direction' 为 'horizontal' 来使其布局变为 'display': 'flex' & 'flex-direction': 'row'。
                    或者通过 'contentClass' / 'contentStyle' 属性来手动设置。但是不建议手动设置，因为 'direction' 属性 与下文 'fixedThumb' 属性 有关。
                `
            },
        },
    },
}
</script>