<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/BasicUsage.vue"
    >
        <template #operation>
            <div class="operation">
                <div class="operation_btn" @click="handleClickScrollToTop" :style="{ width: 'fit-content', padding: '0 16px' }">
                    {{ $t('scrollToTop') }}
                </div>
            </div>
        </template>
        <custom-scrollbar :style="{ height: '40vh' }" ref="scroll">
            <p v-for="_ in 48" v-once>Hover to show thumb...</p>
        </custom-scrollbar>
    </Box>
</template>

<script lang="ts">
export default {
    name: 'BasicUsage',
    i18n: {
        messages: {
            en: {
                title: 'Basic Usage',
                desc: 'You can use custom-scrollbar like a native scroll container that has declared overflow: scroll, and then give a size for it. When the content size exceeds its size, scroll bars will appear.',
                scrollToTop: 'Scroll To Top'
            },
            zh: {
                title: '基础用法',
                desc: '像使用已经申明了overflow: scroll的原生滚动容器一样使用，给它设置一个固定的尺寸即可。当内容尺寸超出指定的尺寸，滚动条就会出现。',
                scrollToTop: '点击滚动到顶部'
            },
        },
    },
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
const scroll = ref<{ scrollEl: HTMLDivElement; }>();

const handleClickScrollToTop = () => {
    if (!scroll.value?.scrollEl) return;
    scroll.value.scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>