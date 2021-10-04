<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/AutoExpand.vue"
    >
        <custom-scrollbar :style="{ height: '40vh' }" :autoExpand="false">
            <p v-for="_ in 30" v-once>
                Some contents...
            </p>
        </custom-scrollbar> 
    </Box>
</template>

<script lang="ts">
export default {
    name: 'AutoExpand',
    i18n: {
        messages: {
            en: {
                title: 'Auto Expand',
                desc: `The 'autoExpand' property is on by default, and can be explicitly set to 'false' to disable the near-growth scrollbar feature.`
            },
            zh: {
                title: '靠近变大',
                desc: `'autoExpand' 属性 默认开启，可以显式设置其为 false 禁用靠近变大滚动条功能。`
            },
        },
    },
}
</script>