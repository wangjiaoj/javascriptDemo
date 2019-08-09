<template>
    <div id="app">
    <mt-navbar class="button-nav" v-model="selected">
        <mt-tab-item id="1">聘请单位</mt-tab-item>
        <mt-tab-item id="2">专家信息</mt-tab-item>
        <mt-tab-item id="3">其他信息</mt-tab-item>
        <mt-tab-item id="4">上报</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
               <h3>授予“西湖友谊奖”</h3>
            <section> 
               
                <mt-cell title="一、单位信息" value="" class="blue-title"></mt-cell>
                <mt-field label="聘请单位" placeholder="请输入聘请单位" type="text" v-model="data.workCompany" @blur.native.capture="checkState('workCompany',$event)" ></mt-field>
                <mt-field label="主管部门" placeholder="请输入主管部门" type="text" v-model="data.goverment"  @blur.native.capture="checkState('goverment',$event)" ></mt-field>
            </section>
            <section> 
                <mt-cell title="二、联系方式" value="" class="blue-title"></mt-cell>
                <mt-field label="聘请单位联系人" placeholder="请输入主管部门" type="text" v-model="data.personName"  @blur.native.capture="checkState('personName',$event)" ></mt-field>
                <mt-field label="联系电话及手机" placeholder="请输入联系方式" type="tel"  v-model="data.phoneNum"  @blur.native.capture="checkState('phoneNum',$event)" ></mt-field>
                <mt-field label="电子邮箱" placeholder="请输入电子邮箱" type="email"  v-model="data.email"  @blur.native.capture="checkState('email',$event)" ></mt-field>
            </section>
            <mt-button type="primary" size="large"  @click.native="handleClick">保存</mt-button>
   
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
            <h3>授予“西湖友谊奖”</h3>
           <section>
                <mt-cell title="一、基本信息" value="" class="blue-title"></mt-cell>
                <mt-field class="field-required" label="英文全名" placeholder="英文全名" type="text" v-model="data.englishName"  @blur.native.capture="checkState('englishName',$event)" ></mt-field>
                <mt-field class="field-required" label="中文译名" placeholder="请输入中文译名" type="text"  v-model="data.chinessName"  @blur.native.capture="checkState('chinessName',$event)" ></mt-field>
                <mt-field class="field-required" label="护照号" placeholder="请输入护照号" type="number"  v-model="data.price"  @blur.native.capture="checkState('price',$event)" ></mt-field>

                <mt-field class="field-required" label="性别" placeholder="请输入性别" type="text"  v-model="data.sex"  @blur.native.capture="checkState('sex',$event)" ></mt-field>
               
                <mt-field class="field-required" label="入职日期" placeholder="请输入日期" type="text"  v-model="data.date"  @click.native.capture="openPicker()" ></mt-field>
            </section>
             
            <section>
                <mt-field label="国外联系地址（中英文）" placeholder="国外联系地址（中英文）" type="textarea" rows="4"  v-model="data.introduce"  @blur.native.capture="checkState('introduce',$event)" ></mt-field>
            </section>
             
            <mt-button type="primary" size="large"  @click.native="handleClick">保存</mt-button>
   
        </mt-tab-container-item>



       <mt-tab-container-item id="3">
            <h3>授予“西湖友谊奖”</h3>
           <mt-cell title="主营业务范围"></mt-cell>
           <mt-radio align="right" v-model="data.radioValue" :options="radioOptions"></mt-radio>
           <mt-cell title="业务领域(可多选)"></mt-cell>
           <mt-checklist  align="right" v-model="data.checkboxValue" :options="checkboxOptions" @change="checkon"></mt-checklist>
           <mt-cell title="上传附件"></mt-cell>
           <div class="upload-container">
                <div class="upload-item" v-for="(img, i) in data.imgValue" :key="i">
                    <div class="upload-img" :style="" @click="showImgs(i)">background:url(' + img + ')</div>
                    <i class="delete" @click="deleteItem(i)"></i>
                </div>
                <div v-if="!data.imgSize || data.imgValue.length < data.imgSize" class="upload-item">
                    <div class="upload-btn" @click="chooseImg">
                        上传文件
                    </div>
                </div>
                
                <!--<div class="upload-padding-top">
                    <div class="upload-item" v-for="(img, i) in inputValue" :key="i">
                        <div class="upload-img" :style="'background:url(' + img + ')'" @click="showImgs(i)"></div>
                        <i class="delete" @click="deleteInputItem(i)"></i>
                    </div>
                    <div v-if="!inputSize || inputValue.length < inputSize" class="upload-item">
                        <div class="upload-btn">
                        <input type="file" accept="image/*" @change="fileChangeHandler" style="opacity: 0; width: 100%; height: 100%;">
                        </div>
                    </div>
                </div>-->
                
        </div>
        
        </mt-tab-container-item>   

        <mt-tab-container-item id="4">
            <h3>授予“西湖友谊奖”</h3>
            <p>本申请书中所填写的内容和资料真实、 有效， 如存在弄虚作 假和与事实相违背的内容， 由本单位（ 个人） 承担全部责任。 本次申报的项目没有获得国家和省级有关部门的立项支持。</p>
            <p style="text-align: center;margin-top: 20px;font-size: 16px;">
                <input type="checkbox" class="commit-agree" value="同意" v-model:checked="agreement" @change="setBtnDisabled"> 我已阅读以上内容， 并同意以上承诺。
            </p>
            <mt-button ref="submitBtn" class="submit-btn" type="primary" size="large" disabled="" @click.native="submitHandleClick">上报</mt-button>
  
        </mt-tab-container-item>
     
    </mt-tab-container>
 
    <mt-datetime-picker ref="picker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"   type="date" v-model="pickerValue" :startDate="startDate" @confirm="handleConfirm"></mt-datetime-picker>
    
</div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                selected: "1",
                agreement: false,
                startDate: new Date('1990-01-01'),
                pickerValue: new Date(),
                data: {
                    workCompany: "",
                    goverment: "",
                    personName: "",
                    phoneNum: "",
                    email: "",
                    englishName: '',
                    chinessName: '',
                    price: "",
                    sex: "",
                    date: "",
                    introduce: "",
                    radioValue: '0',
                    checkboxValue: [],
                    imgValue: ['https://hzmetro2.oss-cn-hangzhou.aliyuncs.com/jssdk/docs/chooseImage/qrcode.png', 'https://hzmetro2.oss-cn-hangzhou.aliyuncs.com/jssdk/docs/chooseImage/qrcode.png', 'https://hzmetro2.oss-cn-hangzhou.aliyuncs.com/jssdk/docs/chooseImage/qrcode.png', 'https://hzmetro2.oss-cn-hangzhou.aliyuncs.com/jssdk/docs/chooseImage/qrcode.png'],
                    imgSize: 10, //最多上传图片限制
                },
                radioOptions: [{
                    label: '科技成果评估',
                    value: '1',
                    // disabled: true  该参数用于设置不可选选项
                }, {
                    label: '科学研究与技术开发',
                    value: '2'
                }, {
                    label: '科技成果转让与扩散',
                    value: '3'
                }],
                checkboxOptions: [{
                    label: '科技成果评估',
                    value: '1',
                    // disabled: true  该参数用于设置不可选选项
                }, {
                    label: '科学研究与技术开发',
                    value: '2'
                }, {
                    label: '科技成果转让与扩散',
                    value: '3'
                }]

            }
        },
        computed: {},
        mounted() {
            //最开始获取页面表单数据
            this.getData();
        },
        methods: {
            //上报按钮的可点击状态控制
            setBtnDisabled(state, event) {
                let btn = this.$refs.submitBtn.$el
                if (this.agreement) {
                    btn.classList.remove('is-disabled');
                    btn.setAttribute('disabled', false);
                } else {
                    btn.classList.add('is-disabled');
                    btn.setAttribute('disabled', true);
                }
            },

            checkState(name, event) {
                //验证是否必填项目--也可以在此处根据name增加一些其他验证
                if (name) {
                    let stateDom = event.currentTarget.getElementsByClassName('mint-field-state');
                    if (stateDom[0].classList.contains('field-required')) {
                        if (this.data[name] == "") {
                            console.log('add-is-error')
                            stateDom[0].classList.add('is-error');
                            stateDom[0].childNodes[0].classList.add('mintui-field-error');
                        } else {
                            console.log('remove-is-error')
                            stateDom[0].classList.remove('is-error');
                            stateDom[0].childNodes[0].classList.remove('mintui-field-error');
                        }
                    }
                }
            },
            handleClick() {
                //保存数据，然后跳转回到list页面即可
                console.log(this.data.workCompany)
            },
            getData() {
                //ajax--获取数据-对展示的数据进行赋值

                this.data.workCompany = "科技",
                    this.data.goverment = "科技厅",
                    this.data.personName = "科技厅86467",
                    this.data.phoneNum = "1386467485",
                    this.data.email = "2386467485@qq.com",
                    this.data.englishName = 'I am an apple',
                    this.data.chinessName = 'I am an apple',
                    this.data.price = "",
                    this.data.sex = "",
                    this.data.date = "",
                    this.data.introduce = "",
                    this.data.radioValue = '0',
                    this.data.checkboxValue = [];

            },
            checkon() {
                //checkbox选中事件回调
            },
            submitHandleClick() {
                //协议是否已同意-协议统一之后可以走上报流程
                console.log(this.agreement);
                if (this.agreement) {
                    //验证一下数据是否都填了，然后提交数据-跳转回到list即可
                }
            },
            openPicker() {
                //展开日期选择器
                this.$refs.picker.open();
            },
            handleConfirm(date) {
                //日期选择-点击确定后的回调函数
                this.data.date = date.getFullYear() + '-' + date.getMonth() +
                    '-' + date.getDate();
            },
            chooseImg() {
                //图片上传组件--浙里办jssdk用法
                var that = this;
                dd.device.notification.chooseImage({
                    onSuccess: function(res) {
                        console.log(res, res.picPath[0]);
                        that.data.imgValue.push(res.picPath[0]);
                    },
                    onFail: function(res) {
                        console.log(res)
                    }
                })
            },
            showImgs() {
                console.log('show images.');
            },
            deleteItem(index) {
                this.data.imgValue.splice(index, 1)
                this.$mount();
            },
            // deleteInputItem(index) {
            //     this.inputValue.splice(index, 1)
            //     this.$mount()
            // },
            // fileChangeHandler(e) {
            //     var that = this;
            //     var file = e.target.files[0]
            //     var reader = new FileReader();
            //     reader.readAsDataURL(file); // 读出 base64
            //     reader.onload = function() {
            //         // 图片的 base64 格式, 可以直接当成 img 的 src 属性值      
            //         var dataURL = reader.result;
            //         event.target.value = '';
            //         if (!reader.result) {
            //             return;
            //         }
            //         console.log('inputValue', that.inputValue)
            //         that.inputValue.push(dataURL);
            //     }
            // },


        }
    }
</script>
<style lang="scss">
    #app {
        .upload-container {
            border: 1px #d8d8d8 dashed;
            border-radius: 15px;
            position: relative;
            padding: 20px;
        }
        .upload-container .upload-item {
            position: relative;
            width: 100%;
            height: 40px;
            margin: 5px;
            &>div {
                height: 40px;
                line-height: 40px;
            }
            .upload-btn {
                display: block;
                width: 30%;
                color: #fff;
                background-color: #26a2ff;
                border-radius: 15px;
                text-align: center;
                margin: 0 auto;
            }
        }
        .delete {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            width: 19px;
            height: 19px;
            background: #e9e9e9;
            border-radius: 100%;
            position: absolute;
            right: 3px;
            top: 9px;
            &:before {
                content: "X";
                background: #888;
                width: 13px;
                height: 1px;
                display: block;
            }
        }
        h3 {
            text-align: center;
        }
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
        .field-required {
            .mint-cell-title::before {
                content: '*';
                color: red;
            }
        }
    }
</style>