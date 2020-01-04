import IndexPage from "../components/index"
import CenterIndexPage from "../components/center/index"
import TradeIndexPage from "../components/trade/index"
import MainPage from "../components/main"
import LoginPage from "../components/login"
import notFoundPage from "../components/404"
import VueRouter from "vue-router";
import Vue from 'vue' //注：这句必须要有，虽然在main.js里面已经引入过Vue，但是这里不要这句的话，就直接报错了Vue is not defined
import store from '../store'
Vue.use(VueRouter);
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })


const router = new VueRouter({
    mode: 'history',
    base: '/', //web-app/
    routes: [
        { path: '/', redirect: { name: 'login' }, },
        // 动态路径参数 以冒号开头
        { path: '/login', name: 'login', component: LoginPage },
        {
            path: '/main',
            name: 'main',
            component: MainPage,
            redirect: { name: 'mainIndex' },
            children: [{
                    path: 'index',
                    name: 'mainIndex',
                    component: IndexPage
                },
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'center',
                    name: 'mainCenter',
                    component: CenterIndexPage
                },
                {
                    path: 'trade',
                    name: 'mainTrade',
                    component: TradeIndexPage
                }
            ]
        },
        { path: '*', name: '404', component: notFoundPage },
    ],

});
const whiteList = ["mainIndex", "mainTrade", "login"];
//全局前置守卫：
router.beforeEach((to, from, next) => {

    if (!to.name || whiteList.includes(to.name)) {
        next();
    } else if (!store.state.token) {
        console.log(to.name)
        console.log(store.state.token)
        next({ name: 'login' }); //重新定向到登录页
    };

});
export default router;