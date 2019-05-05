import {
    Row,
    Col
} from './row';
import {
    Tab,
    TabPanel
} from './tabMenu';
const IV = {
    install: function(Vue) {
        Vue.component('my-Row', Row);
        Vue.component('my-Col', Col);
        Vue.component('my-tab', Tab);
        Vue.component('my-tab-panel', TabPanel);
    }
}
export default IV;