import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: { //要设置的全局访问的state对象
        showLeftMenu: true,
        account: {
            accountName: '',
            passward: '',
        },
        personInfo: {
            name: '',
            year: ''
        }
        //要设置的初始属性值
    },
    getters: { //实时监听state值的变化(最新状态)--主要是用于设置一些通用的state派生属性或方法
        isShow(state) { //方法名随意,主要是来承载变化的showLeftMenu的值,第一个参数是state
            return state.showLeftMenu
        },
        getChangedNum(state) {
            return state.changebleNum
        }
    },
    mutations: { //通过store.commit来触发状态变更--mutation 都是同步事务
        leftMenuChange(state, show) {
            state.showLeftMenu = show;
        },
        personInfoChange(state, info) {
            state.personInfo.name = info.name;
            state.personInfo.name = info.year;
        },
        accountChange(state, account) {
            state.account.accountName = account.accountName;
            state.account.passward = account.passward;
        },
    },
    Action: { //通过store.dispatch 方法触发状态变更--mutation 都是同步事务

    }

});