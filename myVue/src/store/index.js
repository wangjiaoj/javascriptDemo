import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: { //要设置的全局访问的state对象
        showFooter: true,
        changableNum: 0
            //要设置的初始属性值
    }
});