<template>
    <div class="login-box">
        <div class="login-bg">登录</div>
         <div class="login-area">
             <div class="row">
                   <input type="text" name="" value="" placeholder="姓名">
             </div>  
             <div class="row">
                  <input type="password" name="" value="" placeholder="密码">
             </div>
              <input type='button' href="javscript:;" @click="doLogin"  value="login button">
         </div>
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
    .login-box {
        width: 400px;
        margin: 0 auto;
    }
</style>