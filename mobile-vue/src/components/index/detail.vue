<template>
    <div class="index-box">
        <div class="carousel" :style="carouselStyle">
            <slot></slot>
            <ul class="carousel-img">
                <li v-for="(item, index) in imgList" :class="tabCls(index)" v-on="{mouseenter:stopcarousel,mouseleave:carouselFun}">
                    <img v-bind:src="item.img" v-bind:alt="item.alt"/> 
                </li>
            </ul>
            <div class="carousel-pager"> 
                <i v-for="(item, index) in imgList" :class="pageCls(index)" @click="pageChange(index)"> </i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            // prop 指定验证要求, prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
            width: {
                type: String,
                defalut: 800
            },
            height: {
                type: String,
                defalut: 500
            },
            gap: {
                type: String,
                defalut: 5
            },
            loop: {
                type: Boolean,
                defalut: false
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
            carouselStyle: function() {
                let style = "";
                this.width ? style += "width:" + this.width + ";" : style += "width:100%;";
                this.height ? style += "height:" + this.height + ";" : style += "height:500px;";
                return style;
            }
        },
        mounted() {
            //  
        },
        methods: {
            computeWidth() {},
            getItems() {
                return this.$children.filter(item => item.$options.name === 'carousel-item');
            },
            carouselFun() {
                if (!this.loop) return;
                if (this.clock) {
                    clearTimeout(this.clock);
                }
                this.clock = setTimeout(() => {
                    this.activekey++;
                    if (this.activekey >= this.maxNum) {
                        this.activekey = 0;
                    }
                    this.carouselFun();
                }, 1000 * this.timeGap);
            },
            stopcarousel() {
                if (!this.loop) return;
                if (this.clock) {
                    clearTimeout(this.clock);
                }
            },
            tabCls(index) {
                if (index === this.activekey) {
                    return 'carousel-show'
                }
                if ((index + 1) === this.activekey || (index === 0 && this.maxNum === this.activekey)) {
                    return 'carousel-hide'
                }
            },
            pageCls(index) {
                if (index === this.activekey) {
                    return 'carousel-page-show'
                }
            },
            updateNav() {
                this.imgList = [];
                this.getItems().forEach(item => {
                    this.imgList.push({
                        img: item.img,
                        alt: item.alt
                    })
                });
                this.maxNum = this.imgList.length;
                this.carouselFun();
            },
            pageChange(index) {

                if (this.clock) {
                    clearTimeout(this.clock);
                }
                this.activekey = index;
                if (this.loop) {
                    this.carouselFun();
                }
            }
        },
    }
</script>
<style lang="scss">

</style>