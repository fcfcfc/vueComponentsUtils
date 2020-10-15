<template>
    <audio ref="myAudio"
           preload
           :src="audioSrc"
           :class="{'ifHide': ifHide}"
           controls
           controlslist="nodownload"
           oncontextmenu="return false;"
           @ended="audioEnd">
        您的浏览器不支持 audio 标签。
    </audio>
</template>

<script>
    export default {
        name: "MyAudio",
        props: {
            audioSrc: {
                type: String,
                default: ''
            },
            ifHide: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {

            }
        },
        mounted() {
            //禁用迅雷的视频下载
            if(document.getElementsByClassName('xl-chrome-ext-bar') && document.getElementsByClassName('xl-chrome-ext-bar')[0]) document.getElementsByClassName('xl-chrome-ext-bar')[0].remove();
        },
        methods: {
            playAudio() {
                this.$refs.myAudio.play()
            },
            pauseAudio() {
                this.$refs.myAudio.pause()
            },
            audioEnd() {
                this.$emit('audioEnd')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ifHide {
        display: none;
    }
</style>
