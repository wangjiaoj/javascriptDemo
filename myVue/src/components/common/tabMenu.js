var Tab = {
    template: `<div class="iv-tab"><slot></slot></div>`,
    data: function() {
        return {}
    },
    computed: {},
    methods: {}
};
var TabPanel = {
    props: ['label'],
    template: `<div class="iv-tab-coantainer">
        <div class="iv-tab-nav">
           <ul>
               <li v-on:click="tabChange">{{label}}</li>
           </ul>
        </div>
        <div class="iv-tab-body">
            <div class="iv-tab-content"><slot></slot></div>
        </div>
    </div>`,
    data: function() {
        return {
            tabIndex: 0
        }
    },
    computed: {
        tabMenuData: function() {
            return this.tabIndex
        },
    },
    methods: {
        tabChange() {}
    }
};
export {
    Tab,
    TabPanel
}