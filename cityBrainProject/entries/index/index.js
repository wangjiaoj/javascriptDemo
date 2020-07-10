 import Vue from 'vue';
 import App from '../../src/pages/app'

 import axios from 'axios'
 import '../../src/assets/base.scss'

 import "babel-polyfill";
 Vue.config.productionTip = false;




 new Vue({
         el: "#app",
         // components: { App },
         // template: '<App />'
         render: h => h(App),
     })
     //import Vconsole from 'vconsole';



 //new Vconsole();