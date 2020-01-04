<template>
<div class="iv-tab-coantainer">
    <div class="iv-tab-nav">
        <ul>
            <li v-for="(item, index) in navList" :class="tabCls(item)" v-on:click="tabChange(index)">{{item.label}}</li>
        </ul>
    </div>
    <div class="iv-tab-body">
        <slot></slot>
    </div>
</div>
</template>
<script>
    export default {
        props: {
            value: {
                type: [String, Number]
            }
        },
        data: function() {
            return {
                navList: [],
                activekey: this.value
            }
        },
        computed: {},
        mounted() {},
        watch: {
            activekey(val) {
                this.updateStatus();
            }
        },
        methods: {
            getTabs() {
                return this.$children.filter(item => item.$options.name === 'my-tab-panel');
            },
            updateNav() {
                this.navList = [];
                this.getTabs().forEach((panel, index) => {
                    this.navList.push({
                        labelType: typeof panel.label,
                        label: panel.label,
                        name: panel.currentName ||
                            index,
                    });
                });
                this.updateStatus();
            },
            tabChange(index) {
                const nav = this.navList[index];
                this.activekey = nav.name;
            },
            updateStatus() {
                this.getTabs().forEach(tab => {
                    tab.show = (tab.currentName === this.activekey);
                });
            },
            tabCls(item) {
                if (item.name ===
                    this.activekey) {
                    return 'tab-focus'
                }
            }
        }

    }
</script>