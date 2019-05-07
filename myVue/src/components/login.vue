<template>
    <div class="login-box">
        <div class="login-bg">登录</div>
         <div class="login-area">
            <my-Row >
                <my-Col span="4">姓名</my-Col>
                <my-Col span="8"> <input type="text" name="" value="" placeholder="姓名"></my-Col>
            </my-Row>
            <my-Row >
                <my-Col span="4">密码</my-Col>
                <my-Col span="8">  <input type="password" name="" value="" placeholder="密码"></my-Col>
            </my-Row>   
             <my-Row > 
                   <input type='button' href="javscript:;" @click="doLogin"  value="login button">
             </my-Row>  
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
        margin: 100px auto;
    }
</style>