import IndexPage from "../components/index"
import MainPage from "../components/main"
import LoaginPage from "../components/login"

import VueRouter from "vue-router";
import Vue from 'vue' //注：这句必须要有，虽然在main.js里面已经引入过Vue，但是这里不要这句的话，就直接报错了Vue is not defined

Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        { path: '/', redirect: { name: 'login' } },
        // 动态路径参数 以冒号开头
        { path: '/login', name: 'login', component: LoaginPage },
        {
            path: '/main',
            component: MainPage,
            children: [{
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'index',
                component: IndexPage
            }]
        }

    ]
})