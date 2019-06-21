<template>
    <div id="listApp">
      <h3>标题</h3>
      <div class="list">

          
      </div>
      <div class="add">
          <span>+新申报</span>
      </div>
    </div>
</div>
</template>
<script>
    export default {
        name: 'List',
        data() {
            return {
                selected: "1",
                data: [{
                    title: 'I am an apple',
                    state: "",
                    date: "",
                }]
            }
        },
        methods: {
            handleClick(index) {
                debugger
            },
            // active() {
            //     debugger
            // }
        },
    }
</script>
<style lang="scss">
    #listApp {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;*/
        .button-nav {
            border: 2px solid #26a2ff;
            border-radius: 5px;
        }
        .button-nav.mint-navbar .mint-tab-item.is-selected {
            border-bottom: 0px solid #26a2ff;
            color: #fff;
            background-color: #26a2ff;
            margin-bottom: 0px;
        }
        .blue-title {
            color: #26a2ff;
            .mint-cell-wrapper {
                background-image: none;
            }
        }
    }
</style>