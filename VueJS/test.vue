<template>
    <div>hello Vue.js {{ msg }}</div>
</template>

<script>
    export default {
        data () {
            return {
                msg: "第一个 Vue 文件"
            }
        }
    }
</script>

<style>
    div{
        border: 1px solid red;
    }
</style>