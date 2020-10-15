<template>
    <div class="myBtn">
        <div :class="newClass" ref="myBtn" :style="{
            'border': (borderColor ? `1px solid ${borderColor}` : ''),
            'width': width,
            'height': height,
            'font-size': fontSize,
            'border-radius': borderRadius
            }" @click="sendInputToFather()" class="myBtnStyle" flex="main-cross:center">
            {{text}}
        </div>
    </div>
</template>

<script>
    require('scss-flex')
    export default {
        name: "MyBtn",
        props: {
            color: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: ''
            },
            backgroundColorHover: {
                type: String,
                default: ''
            },
            notUsed: {
                type: Boolean,
                default: false
            },
            alwaysUse: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '48px'
            },
            fontSize: {
                type: String,
                default: '18px'
            },
            borderRadius: {
                type: String,
                default: '4px'
            },
            borderColor: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
        computed: {
            newClass() {
                let backgroundColorHover = (this.backgroundColorHover || '').replace(/#/g, '');
                if(backgroundColorHover) backgroundColorHover = 'a_' + backgroundColorHover;
                return `${this.notUsed ? 'notUsed' : ''} ${backgroundColorHover}`
            }
        },
        mounted() {
            this.setCssRules();
            let myBtnDom = this.$refs.myBtn;

            if(this.backgroundColor) myBtnDom.style.backgroundColor = this.backgroundColor;
            if(this.color) myBtnDom.style.color = this.color;
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let backgroundColorHover = (this.backgroundColorHover || '').replace(/#/g, '');
                let backgroundColorHoverRule = '';
                if(backgroundColorHover) {
                    backgroundColorHoverRule = `.myBtnStyle.a_${backgroundColorHover}:hover`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === backgroundColorHoverRule) backgroundColorHoverRule = '';
                    })
                })
                if(backgroundColorHoverRule) {
                    document.styleSheets[length - 1].addRule(backgroundColorHoverRule, `background-color: ${this.backgroundColorHover} !important`)
                }
            },
            sendInputToFather() {
                if(this.notUsed) {
                    if(!this.alwaysUse) return;
                }
                this.$emit('myClick')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myBtnStyle {
        overflow: hidden;
        line-height: 1;
        color: #FFFFFF;
        cursor: pointer;
    }
    .myBtnStyle.notUsed {
        background-color: #e2e2e2 !important;
    }
</style>
