<template>
    <div class="mySendMessageBox">
        <my-btn
                :height="height"
                :font-size="fontSize"
                :not-used="!((ifCheckPwd ? checkPwd() : true) && checkPhone() && !validateDisabled)"
                @myClick="sendValidateCode"
                width="150px"
                :text="validateText"/>
    </div>
</template>

<script>
    import Main from 'js-mixin-utils'
    import MyBtn from '../MyBtn'
    export default {
        name: "MySendMessageBox",
        props: {
            ifCheckPwd: {
                type: Boolean,
                default: false
            },
            password: {
                type: String,
                default: ''
            },
            phoneNumber: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: '48px'
            },
            fontSize: {
                type: String,
                default: '18px'
            }
        },
        components: {
            MyBtn
        },
        data() {
            return {
                validateDisabled: false,
                validateText: '获取验证码'
            }
        },
        methods: {
            checkPhone() {
                return Main.checkMobile(this.phoneNumber, true)
            },
            checkPwd() {
                return Main.checkPassword(this.password, true)
            },
            /**
             * 调接口，成功后调用下面方法
             */
            sendSmsSuccess() {
                let that = this;
                let second = 59;
                let setIntervalFun;

                that.validateText = '60秒';
                Main.elementUIToast('验证码已发送，请注意查收');

                setIntervalFun = setInterval(() => {
                    if (second === -1) {
                        that.validateDisabled = false;
                        that.validateText = '获取验证码';
                        return clearInterval(setIntervalFun);
                    }
                    that.validateText = second + '秒';
                    second--;
                }, 1000);
            },
            /**
             * 调接口，失败后调用下面方法
             */
            sendSmsFail() {
                this.validateDisabled = false;
            },
            sendValidateCode() {
                let that = this;
                let validateDisabled = that.validateDisabled;

                if (!Main.checkMobile(that.phoneNumber)) return;
                if (validateDisabled) return;

                that.validateDisabled = true;
                this.$emit('sendSms');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mySendMessageBox {
        padding-left: 10px;
    }
</style>
