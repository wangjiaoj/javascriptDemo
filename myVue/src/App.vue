<template>
    <div id="app">
       <router-view></router-view> 
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                msg: 'I am an apple'
            }
        }
    }
</script>
<style lang="scss">
    #app {
        display: flex;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>