<template>
    <vue-qr
            :logoCornerRadius="10"
            :logoScale="logoScale"
            :dotScale="1"
            :margin="0"
            :logoSrc="logoSrc"
            :text="qrText"
            :size="size">
    </vue-qr>
</template>

<script>
    import VueQr from 'vue-qr'
    export default {
        name: "MyQRCode",
        props: {
            logoScale: {
                type: Number,
                default: 0.2
            },
            logoSrc: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            size: {
                type: Number,
                default: 0
            }
        },
        components: {
            VueQr
        },
        data() {
            return {
                qrText: this.text
            }
        },
        watch: {
            text(n) {
                this.qrText = n;
            }
        }
    }
</script>

<style scoped>

</style>
