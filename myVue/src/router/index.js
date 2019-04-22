import IndexPage from "../components/index.vue"
import VueRouter from "vue-router";
import Vue from 'vue'   //注：这句必须要有，虽然在main.js里面已经引入过Vue，但是这里不要这句的话，就直接报错了Vue is not defined

Vue.use(VueRouter);
export default new VueRouter({
    routes: [ 
        // 动态路径参数 以冒号开头
        { path: '/index', component: IndexPage }
    ]
})