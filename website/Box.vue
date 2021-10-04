<template>
    <div class="box">
        <div class="box_title">
            <span>
                {{ title }}
                <a target="_blank" :href="codeSrc">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31456A"><path d="M1024 512c0 17-6.7 33.2-18.8 45.2l-128 128c-24.2 25.8-64.7 27.1-90.5 2.9-25.8-24.2-27.1-64.7-2.9-90.5 0.9-1 1.9-2 2.9-2.9l82.7-82.8-82.8-82.8c-25-25-25-65.5 0-90.5s65.5-25 90.5 0l128 128c12.1 12.1 18.9 28.4 18.9 45.4zM697.2 284.5l-256 512h-0.6c-15.4 31.5-53.5 44.6-85 29.2-22-10.8-35.9-33.2-35.6-57.7 0.2-9.9 2.7-19.6 7.4-28.3h-0.6l256-512h0.6c15.4-31.5 53.5-44.6 85-29.2 21.9 10.7 35.8 33.1 35.6 57.5-0.2 9.9-2.7 19.6-7.4 28.4l0.6 0.1zM192 704c-17 0-33.3-6.7-45.2-18.8l-128-128c-25-25-25-65.5-0.1-90.5l0.1-0.1 128-128c25-25 65.5-25 90.5 0s25 65.5 0 90.5L154.5 512l82.8 82.8c25 25 25 65.5 0 90.5-12.1 12-28.3 18.7-45.3 18.7z"></path></svg>
                </a>
            </span>
        </div>
        <div class="box_desc">
            {{ desc }}
        </div>
        <div class="box_opertion">
            <slot name="opertion"></slot>
        </div>
        <div class="box_content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Box'
}
</script>

<script lang="ts" setup>

interface Props {
    title:   string;
    desc:    string;
    codeSrc: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.box {
    width: 90vw;
    max-width: 1200px;
    margin: 0 auto;
    display: inline-block;
    padding: 24px;
    border-radius: 24px;
    background-color: transparent;
    box-shadow: -16px -16px 40px rgba(255, 255, 255, 0.8), 16px 4px 64px rgba(18, 61, 101, 0.3), inset -8px -6px 80px rgba(255, 255, 255, 0.18);
}

.box_title {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 900;
    color: #31456A;
    text-align: center;
    > span {
        position: relative;
        text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.6), 1px 1px 2px rgba(20, 44, 73, 0.31);
        > a {
            position: absolute;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            right: -12px;
            top: 50%;
            transform: translate(100%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background-color: #E3EDF7;
            box-shadow: -4px -2px 16px #FFFFFF, 4px 2px 16px rgba(136, 165, 191, 0.48);
            text-decoration: none;
            cursor: pointer;
            transition: box-shadow 300ms ease;
            &:hover {
                box-shadow: inset -3px -3px 7px #FFFFFF, inset 3px 3px 7px rgba(136, 165, 191, 0.48);
            }
        }
    }
}

.box_desc {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    text-indent: 2em;
    text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.6), 1px 1px 2px rgba(20, 44, 73, 0.31);
    color: #31456A;
    opacity: .6;
}

.box_content {
    border-radius: 16px;
    font-size: 18px;
    font-weight: 500;
    color: #31456A;
    background-color: #E3EDF7;
    box-shadow: inset -3px -3px 7px #FFFFFF, inset 2px 2px 5px rgba(136, 165, 191, 0.38);
    opacity: .7;
}

.box_opertion {
    font-size: 18px;
    font-weight: 600;
    color: #31456A;
    opacity: .85;
}
</style>