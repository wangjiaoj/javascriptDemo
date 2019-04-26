import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import axios from 'axios'
import "babel-polyfill";
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: '<App />'
})