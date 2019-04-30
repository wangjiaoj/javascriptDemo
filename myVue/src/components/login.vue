<template>
    <div class="login-main">
        <div class="login-bg">登录</div>
         <div class="login-area">
           <input type="text" name="" value="" placeholder="姓名">
            <input type="password" name="" value="" placeholder="密码">
         </div>
         <a href="javscript:;" @click="doLogin">button</a>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            doLogin() {
                this.$router.push({
                    'name': 'bookMain'
                });
            }
        }

    }
</script>
<style lang="scss">

</style>