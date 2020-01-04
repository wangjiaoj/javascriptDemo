<template>
    <div class="login-box">
        <div class="login-title">登录</div>
         <div class="login-area">
            <my-Row >
               
                <my-Col span="8"> <input type="text" name="" value="" placeholder="姓名"></my-Col>
            </my-Row>
            <my-Row >
                
                <my-Col span="8">  <input type="password" name="" value="" placeholder="密码"></my-Col>
            </my-Row>   
             <my-Row > 
                   <button type='button' href="javscript:;" @click="doLogin"  >登录</button>
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
                this.$store.commit('setToken', 'tttt');
                this.$router.push({
                    name: 'mainCenter'
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
    
    .login-area>div {
        line-height: 35px;
    }
</style>