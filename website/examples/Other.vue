<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        :codeSrc="$t('codeSrc')"
    >
    </Box>
</template>

<script lang="ts">
export default {
    name: 'Other',
    i18n: {
        messages: {
            en: {
                title: 'Other',
                desc: 'The rest of the properties (throttleType, throttleWait, simulateScroll) and Emit (wrapperResize, contentResize) are available in README.',
                codeSrc: 'https://github.com/custom-lib/custom-vue-scrollbar',
            },
            zh: {
                title: '其他',
                desc: '其余属性（throttleType、throttleWait、simulateScroll）以及Emit（wrapperResize、contentResize）请看README。',
                codeSrc: 'https://github.com/custom-lib/custom-vue-scrollbar/blob/main/README-zh_CN.md',
            },
        },
    },
};
</script>
