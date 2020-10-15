<template>
    <div class="myFlvVideo">
        <video ref="videoElement" controls controlslist="nodownload" :width="width" :height="height">
            Your browser is too old which doesn't support HTML5 video.
        </video>
    </div>
</template>

<script>
    import flvJs from 'flv.js/dist/flv.min'
    export default {
        name: "MyFlvVideo",
        props: {
            width: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: ''
            },
            videoSrc: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'mp4'
            }
        },
        data() {
            return {
                flvPlayer: null
            }
        },
        mounted() {
            if(document.getElementsByClassName('xl-chrome-ext-bar') && document.getElementsByClassName('xl-chrome-ext-bar')[0]) document.getElementsByClassName('xl-chrome-ext-bar')[0].remove(); //禁用迅雷的视频下载
        },
        methods: {
            start(notPlay) {
                if(flvJs.isSupported()) {
                    this.flvPlayer = flvJs.createPlayer({
                        type: this.type,
                        url: this.videoSrc
                    }, {
                        lazyLoad: false
                    });
                    this.flvPlayer.attachMediaElement(this.$refs.videoElement);
                    this.flvPlayer.load(); //加载
                    window.removeEventListener('ended', this.endedEventFn);
                    document.getElementsByTagName("video")[0].addEventListener("ended", this.endedEventFn, true);
                    document.getElementsByTagName("video")[0].oncontextmenu = () => false;
                    if(!notPlay) setTimeout(() => this.play(), 100)
                }
            },
            //监听播放结束
            endedEventFn() {
                this.$emit('endedEvent')
            },
            play() {
                this.flvPlayer.play();
            },
            pause() {
                this.flvPlayer.pause();
            },
            destroyFn() {
                if(this.flvPlayer) {
                    this.pause();
                    this.flvPlayer.unload();
                    this.flvPlayer.detachMediaElement();
                    this.flvPlayer.destroy();
                    this.flvPlayer = null;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
