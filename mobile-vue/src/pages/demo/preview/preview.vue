<template>
    <div id="preview">
 
            <section>   
                <mt-cell title="一、单位信息" value="" class="blue-title"></mt-cell>
                <mt-cell title="聘请单位" v-model:value="data.workCompany"></mt-cell>
                <mt-cell title="主管部门"    v-model:value="data.goverment"></mt-cell>
            </section>
            <section> 
                <mt-cell title="二、联系方式" value="" class="blue-title"></mt-cell>
                <mt-cell title="聘请单位联系人"   v-model:value="data.personName"></mt-cell>
                <mt-cell title="联系电话及手机"    v-model:value="data.phoneNum"></mt-cell>
                <mt-cell title="电子邮箱"    v-model:value="data.email"></mt-cell>
            </section>
        
           <section>
                <mt-cell title="一、基本信息" value="" class="blue-title"></mt-cell>
                <mt-cell title="英文全名"   v-model:value="data.englishName"></mt-cell>
                <mt-cell title="中文译名"   v-model:value="data.chinessName"></mt-cell>
                <mt-cell title="护照号"    v-model:value="data.price"></mt-cell>

                <mt-cell title="性别"    v-model:value="data.sex"></mt-cell>
                <mt-cell title="入职日期"    v-model:value="data.date"></mt-cell>
           </section>
             
            <section>
                <mt-field label="国外联系地址（中英文）" placeholder="国外联系地址（中英文）" type="textarea" rows="4"  v-model:value="data.introduce"></mt-field>
            </section>
        
    
     
    </div>
</div>
</template>
<script>
    export default {
        name: 'Preview',
        data() {
            return {
                selected: "1",
                data: {
                    workCompany: "2386467485@qq.com",
                    goverment: "2386467485@qq.com",
                    personName: "2386467485@qq.com",
                    phoneNum: "1386467485",
                    email: "2386467485@qq.com",

                    englishName: 'I am an apple',
                    chinessName: 'I am an apple',

                    price: "",
                    sex: "",
                    date: "",
                    introduce: "",
                }

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
    #preview {
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