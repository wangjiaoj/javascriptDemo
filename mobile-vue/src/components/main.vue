<template>
    <div class="page-container">
        <div class="page-body">
            <router-view></router-view> 
        </div>
        <div class="nav-page">
            <ul class="clearfix">
                 <li><router-link to="/main/index">行情</router-link></li>
                <li><router-link to="/main/trade">交易</router-link></li>
                <li><router-link to="/main/center">个人中心</router-link></li>
            </ul>
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
        padding: 0px 15px;
    }
    
    .nav-page {
        position: absolute;
        bottom: 0px;
        background: #495060;
        color: #FFF;
        width: 100%;
        ul {
            color: #fff;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            li {
                line-height: 40px;
                width: 90px;
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