<template>
    <Box
        :title="$t('title')"
        :desc="$t('desc')"
        codeSrc="https://github.com/custom-lib/custom-vue-scrollbar/blob/main/website/examples/ThumbSize.vue"
    >
        <template #operation>
            <div class="operation">
                <span :style="{ marginRight: '8px' }">thumbMinSize:</span> <input class="operation_input" type="number" v-model="thumbMinSize" />(px)
            </div>
        </template>
        <template #default>
            <custom-scrollbar :style="{ maxHeight: '40vh' }" :autoHide="false" throttleType="none" :thumbMinSize="thumbMinSize">
                <p>Start</p>
                <p v-for="_ in 120" v-once>
                    Hover to show thumb...
                </p>
                <p>End</p>
            </custom-scrollbar> 
        </template>
    </Box>
</template>

<script lang="ts">
export default {
    name: 'ThumbSize',
    i18n: {
        messages: {
            en: {
                title: 'Thumb Min/Max Size',
                desc: `
                    The upper and lower limits of the scrollbar size can be specified by 'thumbMinSize' (default 48) / 'thumbMaxSize' (default Infinity).
                    A lower limit larger than the container size will be specified as 48, and an upper limit smaller than the container size will be specified as Infinity.
                `
            },
            zh: {
                title: '滚动条最小/最大尺寸',
                desc: `可以通过 'thumbMinSize'(默认 48) / 'thumbMaxSize'(默认 Infinity) 指定滚动条尺寸的上下限。下限大于容器尺寸将会被指定为48，上限小于容器尺寸将会被指定为Infinity。`
            },
        },
    },
}
</script>

<script lang="ts" setup>
let thumbMinSize = $ref(160);
</script>

<style lang="scss">
.operation_input {
    all: unset;
    margin-right: 20px;

    width: 120px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid;
    border-image-source: linear-gradient(130.18deg, #FFFFFF 35.92%, rgba(55, 83, 111, 0.4) 190.57%);

    background-color: #E3EDF7;
    box-shadow: inset -3px -3px 7px #FFFFFF, inset 2px 2px 5px rgba(136, 165, 191, 0.38);
    &:hover, &:focus {
        border-image: linear-gradient(136.4deg, #FFFFFF -105.81%, rgba(55, 83, 111, 0.4) 188.83%);
    }

    outline: none;
    -webkit-appearance: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0; 
    }
    -moz-appearance: textfield;
}
</style>