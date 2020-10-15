<template>
    <div :style="{'height': height, 'width': width}">
        <video ref="videoPlayer" class="video-js" style="height: 100%;width: 100%;" controlslist="nodownload" oncontextmenu="return false;">
            您的浏览器不支持 video 标签。
        </video>
    </div>
</template>

<script>
    import videoJS from 'video.js'
    import video_zhCN from 'video.js/dist/lang/zh-CN.json'
    // require('videojs-contrib-quality-levels');
    // require('videojs-hls-quality-selector');
    videoJS.addLanguage('zh-CN', video_zhCN);
    export default {
        name: "MyVideo",
        props: {
            videoType: {
                type: String,
                default: 'application/x-mpegURL'
            },
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
            }
        },
        data() {
            return {
                videoJS: null
            }
        },
        watch: {
            videoSrc(val) {
                if(val) this.videoJS.src(val)
            }
        },
        mounted() {
            let that = this;
            this.videoJS = videoJS(this.$refs.videoPlayer, {
                autoplay: false,
                controls: true,
                loop: false,
                muted: false,
                preload: 'auto',
                language: 'zh-CN',
                sources: [
                    {
                        src: this.videoSrc,
                        type: this.videoType
                    }
                ]
            }, function () {
                that.$emit('onPlayerReady');
                // this.hlsQualitySelector({
                //     displayCurrentQuality: true,
                // });
                this.on('ended', function () {
                    that.$emit('endedEvent')
                })
            });
            this.$nextTick(() => {
                //禁用迅雷的视频下载
                if(document.getElementsByClassName('xl-chrome-ext-bar') && document.getElementsByClassName('xl-chrome-ext-bar')[0]) document.getElementsByClassName('xl-chrome-ext-bar')[0].remove();
            })
        },
        methods: {
            play() {
                this.videoJS.play()
            },
            pause() {
                this.videoJS.pause()
            },
            destroy() {
                this.videoJS.dispose()
            }
        },
        beforeDestroy() {
            if (this.videoJS) {
                this.destroy()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-js /deep/ .vjs-big-play-button {
        @include absolute_center()
    }
</style>
