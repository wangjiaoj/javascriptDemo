import Vue from 'vue'
import MINT from 'mint-ui'
import 'mint-ui/lib/style.css'
import Preview from './preview.vue'

Vue.use(MINT)

new Vue({
    el: '#app',
    //router,
    components: { Preview },
    template: '<Preview/>'
})