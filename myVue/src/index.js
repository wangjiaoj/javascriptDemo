import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: '<App />'
})