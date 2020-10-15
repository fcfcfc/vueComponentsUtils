<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide :style="{'width': slideWidth}" v-for="(item, index) in slidesArr" :key="item.id">
            <slot :itemInfo="{item, index}"/>
        </swiper-slide>
        <div class="swiper-scrollbar" :id="scrollbarId" v-if="useScrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
    import 'swiper/css/swiper.css'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "MySwiper",
        components: {
          Swiper,
          SwiperSlide
        },
        props: {
            slidesArr: {
                type: Array,
                default: function () {
                    return []
                }
            },
            slidesPerView: {
                type: [Number, String],
                default: 1
            },
            freeMode: {
                type: Boolean,
                default: false
            },
            useScrollbar: {
                type: Boolean,
                default: false
            },
            scrollbarBgc: {
                type: String,
                default: 'rgba(0, 0, 0, 0.1)'
            },
            scrollbarDragBgc: {
                type: String,
                default: 'rgba(0, 0, 0, 0.5)'
            },
            slideWidth: {
                type: String,
                default: ''
            },
            scrollbarIndex: {
                type: String,
                default: ''
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper || {}
            }
        },
        data() {
            return {
                scrollbarId: `scrollbarId${new Date().getTime()}_${this.scrollbarIndex}`,
                swiperOption: {
                    freeMode: this.freeMode,
                    slidesPerView: this.slidesPerView,
                    on:{
                        transitionEnd: () => this.$emit('getCurrentActiveIndex', this.swiper.activeIndex || 0),
                    }
                }
            }
        },
        methods: {
            slideToIndex(index) {
                this.swiper.slideTo(index)
            },
            updateSize() {
                this.swiper.updateSize()
            }
        },
        beforeMount() {
            if(this.useScrollbar) this.swiperOption.scrollbar = {
                el: '.swiper-scrollbar',
                hide: true
            }
        },
        mounted() {
            let swiperScrollbar = document.getElementById(this.scrollbarId) || {};
            let swiperScrollbarDrag = swiperScrollbar.firstChild || {};
            if(swiperScrollbar.style) swiperScrollbar.style.backgroundColor = this.scrollbarBgc;
            if(swiperScrollbarDrag.style) swiperScrollbarDrag.style.backgroundColor = this.scrollbarDragBgc;
            this.$nextTick(() => {
                if(swiperScrollbar.style && this.swiper.$el) {
                    this.swiper.$el[0].addEventListener('mouseenter', () => swiperScrollbar.style.opacity = 1);
                    this.swiper.$el[0].addEventListener('mouseleave', () => swiperScrollbar.style.opacity = 0)
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
</style>
