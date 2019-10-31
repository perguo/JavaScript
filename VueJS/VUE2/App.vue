<template>
    <!--<div>hello Vue.js {{ msg }}</div>-->
    <progress/>
</template>

<script>
    import Progress from './Progress'
    export default {
        components: {
            Progress
        },
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