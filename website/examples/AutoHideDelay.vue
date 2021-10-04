<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/AutoHideDelay.vue"
    >
        <custom-scrollbar :style="{ height: '40vh' }" :autoHideDelay="2000">
            <p v-for="_ in 48" v-once>
                Hover to show thumb...
            </p>
        </custom-scrollbar> 
    </Box>
</template>

<script lang="ts">
export default {
    name: 'AutoHideDelay',
    i18n: {
        messages: {
            en: {
                title: 'Auto Hide Delay',
                desc: `The 'autoHideDelay' property can be set to automatically hide the scrollbar after the scroll is triggered n(ms), default 900, in the example below it is 2000.`
            },
            zh: {
                title: '自动隐藏延时',
                desc: `'autoHideDelay' 属性 可以设置触发滚动n(ms)后再自动隐藏滚动条，默认900，下例中是2000。`
            },
        },
    },
}
</script>