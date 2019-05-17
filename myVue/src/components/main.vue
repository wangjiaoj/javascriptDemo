<template>
    <div class="page-container">
        <div class="nav-header">
            <div class="nav-logo">
                <h1><router-link to="/main/index">测试项目系统</router-link></h1></div>
            <ul class="clearfix">
                <li><router-link to="/main/movie">movie</router-link></li>
                <li><router-link to="/main/book">book</router-link></li>
            </ul>
        </div>
        <div class="page-body">
            <router-view></router-view> 
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .page-container {}
    
    .page-body {
        padding: 0px 20px;
    }
    
    .nav-header {
        background: #495060;
        color: #FFF;
        padding: 0px 20px;
        .nav-logo {
            float: left;
            h1 {
                font-size: 28px;
                a {
                    color: #fff;
                }
            }
        }
        ul {
            color: #fff;
            li {
                line-height: 40px;
                a {
                    color: #fff;
                    &:hover {
                        color: #3288fa;
                    }
                }
            }
        }
    }
</style>