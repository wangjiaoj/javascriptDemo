import Vue from 'vue'
import App from './app'

import axios from 'axios'
import '../assets/base.scss'

import "babel-polyfill";
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    // components: { App },
    // template: '<App />'
    render: h => h(App),
})