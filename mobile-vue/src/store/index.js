import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: { //要设置的全局访问的state对象
        token: '',
        user: {
            accountName: '',
            userName: '',
            year: ''
        },

        //要设置的初始属性值
    },
    getters: {
        //实时监听state值的变化(最新状态)--主要是用于设置一些通用的state派生属性或方法
        loginStatue(state) {
            return state.token ? true : false
        },
        getToken(state) {
            return state.token
        }
    },
    mutations: { //通过store.commit来触发状态变更--mutation 都是同步事务
        setToken(state, token) {
            state.token = token;
        },
        userInfoChange(state, info) {
            state.user.name = info.name;
            state.user.accountName = info.accountName;
            state.account.passward = info.passward;
        },

    },
    Action: { //通过store.dispatch 方法触发状态变更--mutation 都是同步事务

    }

});