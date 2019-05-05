import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/base.scss'
import IV from './components/common/index'
import "babel-polyfill";
Vue.config.productionTip = false;
Vue.use(IV);
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: '<App />'
})