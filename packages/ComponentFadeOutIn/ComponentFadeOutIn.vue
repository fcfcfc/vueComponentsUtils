<template>
    <transition name="component-fade" mode="out-in">
        <slot/>
    </transition>
</template>

<script>
    export default {
        name: "ComponentFadeOutIn"
    }
</script>

<style lang="scss" scoped>
    /deep/ .component-fade-enter-active, /deep/ .component-fade-leave-active {
        transition: opacity .2s ease;
    }
    /deep/ .component-fade-enter, /deep/ .component-fade-leave-to {
        opacity: 0;
    }
</style>