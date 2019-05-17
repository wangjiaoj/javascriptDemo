import { Row, Col } from './row';
import Tab from './tabs/tab';
import TabPanel from './tabs/tab-panel';
import slider from './slider/slider'
import sliderItem from './slider/slider-item'
const IV = {
    install: function(Vue) {
        Vue.component('my-Row', Row);
        Vue.component('my-Col', Col);
        Vue.component('my-tab', Tab);
        Vue.component('my-tab-panel', TabPanel);
        Vue.component('slider', slider);
        Vue.component('slider-item', sliderItem);
    }
}
export default IV;