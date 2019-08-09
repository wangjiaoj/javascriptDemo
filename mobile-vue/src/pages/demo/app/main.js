import Vue from 'vue'
import MINT from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MINT)
window.onload = function() {
    dd.ready({
        developer: 'daip@dtdream.com',
        usage: [
            'dd.biz.navigation.setTitle',
            'dd.device.notification.chooseImage',
        ],
        remark: '描述业务场景'
    }, function() {
        console.log('ready')
    });
}
document.addEventListener('JSBridgeReady', function() {
    // dd.biz.navigation.setTitle({
    //     title: '邮箱正文',
    //     onSuccess: function(data) {
    //         debugger
    //     },
    //     onFail: function(error) {
    //         debugger
    //     }
    // });
}, false);
new Vue({
    el: '#app',
    //router,
    components: { App },
    template: '<App/>'
})