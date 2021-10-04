<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/AutoHide.vue"
    >
        <custom-scrollbar :style="{ height: '40vh' }" :autoHide="false">
            <p v-for="_ in 48" v-once>
                Hover to show thumb...
            </p>
        </custom-scrollbar> 
    </Box>
</template>

<script lang="ts">
export default {
    name: 'AutoHide',
    i18n: {
        messages: {
            en: {
                title: 'Auto Hide',
                desc: `The 'autoHide' property is on by default and can be explicitly set to 'false' to always display the scrollbar.`
            },
            zh: {
                title: '自动隐藏',
                desc: `'autoHide' 属性默认开启，可以显式设置其为 false 永久显示滚动条。`
            },
        },
    },
}
</script>