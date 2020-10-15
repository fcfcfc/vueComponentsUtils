<template>
    <div id="app">
        <collapse-transition>
            <div>1.CollapseTransition</div>
        </collapse-transition>
        <component-fade-out-in>
            <div>2.ComponentFadeOutIn</div>
        </component-fade-out-in>
        <div>3.MyAudio</div>
        <my-audio/>
        <div>4.MyBackTop</div>
        <my-back-top/>
        <div>5.MyBtn</div>
        <my-btn background-color-hover="red" :not-used="notUsed" @myClick="btnClick"/>
        <div>6.MyFlowChart</div>
        <my-flow-chart/>
        <div>7.MyFlvVideo</div>
        <my-flv-video/>
        <div>8.MyMask</div>
        <my-mask v-show="false"/>
        <div>9.MyQRCode</div>
        <my-q-r-code/>
        <div>10.MySaveToPDF</div>
        <my-save-to-p-d-f/>
        <div>11.MySendMessageBox</div>
        <my-send-message-box/>
        <div>12.MySwiper</div>
        <my-swiper ref="mySwiperDom" style="width:50%"
                   :free-mode="true"
                   slide-width="auto"
                   class="swiperStyle"
                   :use-scrollbar="true"
                   scrollbar-drag-bgc="red"
                   :slidesArr="[{}]"
                   :slidesPerView="'auto'">
            <div flex="cross:center">
                <div v-for="(item, index) in caseStatusList"
                     flex="cross:center"
                     :key="item.id">
                    <div class="caseStatusItem" flex="main-cross:center" :class="{'ifSelected':selectedStatusId===item.id}">
                        <div class="itemIndex" flex="main-cross:center">{{index}}</div>
                        <div class="itemText">{{item.label}}</div>
                    </div>
                    <div v-if="index!==caseStatusList.length-1" class="caseStatusLine"></div>
                </div>
            </div>
        </my-swiper>
        <my-swiper ref="mySwiperDom" style="width:50%"
                   :free-mode="true"
                   slide-width="auto"
                   class="swiperStyle"
                   :use-scrollbar="true"
                   scrollbar-drag-bgc="red"
                   :slidesArr="[{}]"
                   :slidesPerView="'auto'">
            <div flex="cross:center">
                <div v-for="(item, index) in caseStatusList"
                     flex="cross:center"
                     :key="item.id">
                    <div class="caseStatusItem" flex="main-cross:center" :class="{'ifSelected':selectedStatusId===item.id}">
                        <div class="itemIndex" flex="main-cross:center">{{index}}</div>
                        <div class="itemText">{{item.label}}</div>
                    </div>
                    <div v-if="index!==caseStatusList.length-1" class="caseStatusLine"></div>
                </div>
            </div>
        </my-swiper>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                selectedStatusId: '',
                caseStatusList: [
                    {
                        id: 1,
                        label: '初始状态初始状态初始'
                    },
                    {
                        id: 2,
                        label: '开始穿刺'
                    },
                    {
                        id: 3,
                        label: '穿刺过程'
                    },
                    {
                        id: 4,
                        label: '穿刺中断'
                    },
                    {
                        id: 5,
                        label: '穿刺过程'
                    },
                    {
                        id: 6,
                        label: '穿刺中断'
                    }
                ],
                notUsed: false
            }
        },
        methods: {
            btnClick() {
                this.caseStatusList.push({
                    id: new Date().getTime(),
                    label: '哈哈哈'
                })
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .swiperStyle {
        width: 100%;
        padding-left: 20px;
        .caseStatusItem {
            position: relative;
            border-radius: 0 4px 4px 0;
            width: 181px;
            height: 32px;
            cursor: pointer;
            background-color: #f1f4f3;
            &:hover {
                background-color: #e1e9e6;
                .itemIndex {
                    background-color: #e1e9e6;
                }
            }
            .itemIndex {
                font-size: 14px;
                color: #333333;
                position: absolute;
                left: -15px;
                height: 30px;
                width: 30px;
                border-radius: 100%;
                background-color: #f1f4f3;
            }
            .itemText {
                max-width: 140px;
                font-size: 14px;
                color: #333333;
            }
        }
        .caseStatusLine {
            width: 32px;
            height: 1px;
            background-color: #cccccc;
        }
    }
</style>
