import Vue from 'vue'
import MINT from 'mint-ui'
import 'mint-ui/lib/style.css'
import List from './list.vue'

Vue.use(MINT)

new Vue({
    el: '#app',
    //router,
    components: { List },
    template: '<List/>'
})