import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: { //要设置的全局访问的state对象
        showFooter: true,
        changableNum: 0
            //要设置的初始属性值
    },
    getters: { //实时监听state值的变化(最新状态)
        isShow(state) { //方法名随意,主要是来承载变化的showFooter的值
            return state.showFooter
        },
        getChangedNum() { //方法名随意,主要是用来承载变化的changableNum的值
            return state.changebleNum
        }
    }
});