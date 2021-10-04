<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/ThumbStyle.vue"
        :class="$style.customCls"
    >
        <custom-scrollbar :style="{ height: '40vh' }" :autoHide="false">
            <p v-for="_ in 64" v-once :style="{ width: '100vw', maxWidth: '1400px' }">
                Hover to show thumb...
            </p>
        </custom-scrollbar> 
    </Box>
</template>

<script lang="ts">
export default {
    name: 'ThumbStyle',
    i18n: {
        messages: {
            en: {
                title: 'Thumb Style',
                desc: `
                    Override the scrollbar style by css, please see the sample code for details.
                    (Note: In order to support the hover effect, the scrollbar is divided into inner and outer containers, and the inner container is 2/3 of the width of the outer container.)
                `
            },
            zh: {
                title: '滚动条样式',
                desc: '通过css覆写滚动条样式，具体怎么写请看样例代码。（注意: 为了支持hover变大效果，滚动条分内外容器，内部容器宽度为外部容器2/3。）'
            },
        },
    },
}
</script>


<style lang="scss" module>
.customCls {
    :global {
        .scrollbar__thumbPlaceholder--horizontal {
            height: 24px;
        }
        .scrollbar__thumbPlaceholder--autoExpand:hover > .scrollbar__thumb {
            border-radius: 12px;
        }

        .scrollbar__thumb {
            background: linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%);
            border-radius: 8px;
        }


        .scrollbar__thumbPlaceholder--vertical {
            width: 80px;
        }
        .scrollbar__thumb.scrollbar__thumb--vertical {
            background: url('../assets/Rem.jpg');
            background-size: contain;
            background-repeat: repeat-y;
        }
    }
}
</style>