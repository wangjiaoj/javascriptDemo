import { Row, Col } from './row';
import Tab from './tabs/tab';
import TabPanel from './tabs/tab-panel';
import carousel from './carousel/carousel'
import carouselItem from './carousel/carousel-item'
const IV = {
    install: function(Vue) {
        Vue.component('my-Row', Row);
        Vue.component('my-Col', Col);
        Vue.component('my-tab', Tab);
        Vue.component('my-tab-panel', TabPanel);
        Vue.component('carousel', carousel);
        Vue.component('carousel-item', carouselItem);
    }
}
export default IV;