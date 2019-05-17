import IndexPage from "../components/index"
import BookIndexPage from "../components/book/index"
import MovieIndexPage from "../components/movie/index"
import MainPage from "../components/main"
import LoaginPage from "../components/login"
import notFoundPage from "../components/404"
import VueRouter from "vue-router";
import Vue from 'vue' //注：这句必须要有，虽然在main.js里面已经引入过Vue，但是这里不要这句的话，就直接报错了Vue is not defined
Vue.use(VueRouter);
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })


const router = new VueRouter({
    routes: [
        { path: '/', redirect: { name: 'login' } },
        // 动态路径参数 以冒号开头
        { path: '/login', name: 'login', component: LoaginPage },
        {
            path: '/main',
            component: MainPage,
            children: [{
                    path: 'index',
                    name: 'mainIndex',
                    component: IndexPage
                },
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'book',
                    name: 'bookMain',
                    component: BookIndexPage
                },
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'movie',
                    component: MovieIndexPage
                }
            ]
        },
        { path: '*', name: '404', component: notFoundPage },
    ]
});
const whiteList = [""];
//全局前置守卫：
// router.beforeEach((to, from, next) => {
//     if (whiteList.includes(to.path)) {
//         next();
//     } else {
//         next({ name: 'login' }); //重新定向到登录页
//     };

// });
export default router;