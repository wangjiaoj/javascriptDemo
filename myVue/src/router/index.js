import IndexPage from "index"
export default new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/user/:id', component: IndexPage }
    ]
})