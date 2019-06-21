import Vue from 'vue'
import MINT from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MINT)

new Vue({
    el: '#app',
    //router,
    components: { App },
    template: '<App/>'
})