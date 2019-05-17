<template>
    <div class="slider">
        <slot></slot>
         <ul>
            <li v-for="(item, index) in imgList" :class="tabCls(index)" >
                  <img v-bind:src="item.img" v-bind:alt="item.alt"/> 
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            width: {
                type: String
            },
            height: {
                type: String
            },
            gap: {
                type: String,
                defalut: 5
            }
        },
        data() {
            return {
                activekey: 0,
                maxNum: 0,
                imgList: [],
                clock: "",
                timeGap: this.gap || 5
            }
        },
        computed: {

        },
        mounted() {
            //  
        },
        methods: {
            getItems() {
                return this.$children.filter(item => item.$options.name === 'slider-item');
            },
            sliderFun() {
                if (this.clock) {
                    clearTimeout(this.clock);
                }
                this.clock = setTimeout(() => {
                    this.activekey++;
                    if (this.activekey > this.maxNum) {
                        this.activekey = 0;
                    }
                    console.log(this.activekey);
                    this.sliderFun();
                }, 1000 * this.timeGap);
            },
            tabCls(index) {

                if (index === this.activekey) {
                    return 'slider-show'
                }
                if ((index + 1) === this.activekey || (index === 0 && this.maxNum === this.activekey)) {
                    return 'slider-hide'
                }
            },
            updateNav() {
                this.imgList = [];

                let list = this.getItems();
                list.forEach(item => {
                    this.imgList.push({
                        img: item.img,
                        alt: item.alt
                    })
                });
                this.maxNum = this.imgList.length;
                this.sliderFun();
            }
        },
    }
</script>