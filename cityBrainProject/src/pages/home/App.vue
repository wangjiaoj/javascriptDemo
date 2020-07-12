<template>
    <div id="app">
         <div class="page-container">

            <div class="nav-header">
                <h2 class="nav-title">数据看板</h2> 
                <div class="nav-tab"> 
                    <ul class="clearfix">
                        <li :class="{'selected':isDayReport}" @click="toggleType(1)">日报</li>
                        <li :class="{'selected':!isDayReport}" @click="toggleType(2)">周报</li>
                    </ul>    
                    <ul class="clearfix">
                        <li :class="{'selected':isShowData}">看数据</li>
                        <li :class="{'selected':!isShowData}">看趋势</li>
                    </ul>
                </div>
            </div>

            <div class="page-body">
                
               <div class="report-item" v-show="isDayReport" v-for='(item,index) in dayReport' :key="index">
                     <h4 class="report-item-title">{{item.title}}</h4>
                     <div class="report-detail-container clearfix">
                        <div class="detail-item">
                            <span class="detail-item-data">{{item.monitoringValue}}</span>
                            <p class="detail-item-name">监测值（T-2）</p>
                        </div>
                        <div class="detail-item">
                            <span class="detail-item-data">{{item.absoluteValue}}</span>
                            <p class="detail-item-name">累计绝对值</p>
                        </div>                        
                        <div class="detail-item">
                            <span class="detail-item-data" :class="{'up-color':item.growthRate>0,'down-color':item.growthRate<0}">{{item.growthRate}}</span>
                            <p class="detail-item-name">累计增速（%）</p>
                        </div>                        
                        <div class="detail-item">
                            <span class="detail-item-data">{{item.dailyAverage}}</span>
                            <p class="detail-item-name">上年日均</p>
                        </div>                        
                        <div class="detail-item">
                            <span class="detail-item-data">{{item.peakValue}}</span>
                            <p class="detail-item-name">上年峰值</p>
                        </div>
                    </div>   
                </div>

                <div class="report-item"  v-show="!isDayReport" v-for='(item,index) in weekReport' :key="index">          
                    <h4 class="report-item-title">{{item.title}}</h4>
                    <div class="report-detail-container clearfix">
                        
                        <div class="detail-item"  v-for='(data,itemIndex) in item.data' :key="itemIndex">
                            <span class="detail-item-data" :class="{'up-color':data.name&&data.name.indexOf('%')>-1&&data.value>0,'down-color':data.name&&data.name.indexOf('%')>-1&&data.value<0}">{{data.value}}</span>
                            <p class="detail-item-name">{{data.name}}</p>
                        </div>
   
                    </div> 
                </div>

            </div>


        </div> 
    </div>
</template>
<script>
    export default {
        
        data() {
            return {
                isDayReport:true,
                isShowData:true,
                weekReport:[{
                    title: "新增市场主体总量（个）",
                    data: [{ name: '累计绝对值', value: 114253 }, { name: '累计增速（%）', value: -18.72 }, { name: '较1-6月（%）', value: -0.41 },
                        { name: '7月以来', value: 1952 }, { name: '7月以来同比增长（%）', value: 14.82 }]
                } ,
                
                {
                    title: " 冷鲜肉批发价（元/㎏）",
                    data: [{ name: '当前', value: 45 },
                        { name: '较今年峰值', value: -29.95 },

                    ]
                },
                ],
                dayReport: [
                         { title: "机场旅客吞吐量(万人)", monitoringValue: 7.53, absoluteValue: 973.78, growthRate: "***", dailyAverage: 10.99, peakValue: 12.8 },
                    { title: "全社会统筹用电量（亿千万时）", monitoringValue: 2.27, absoluteValue: 352.77, growthRate: -5.39, dailyAverage: 2.16, peakValue: 3.28 },
                    { title: "猪肉批发量(吨)", monitoringValue: 407.7, absoluteValue: 69717.11, growthRate: -31.74, dailyAverage: 500.2, peakValue: 859.89 },
                    { title: "冷鲜肉批发价（元/㎏）", monitoringValue: 45.35, absoluteValue: "***", growthRate: 123.6, dailyAverage: 27.8, peakValue: 50.84 },
                ],
            }
        },
        computed: {
            // totalPrice: function() {
            //     return 'dd:'+this.money
            // }
        },
         methods: { 
             // 切换路由
             toggleType(type) {
               this.isDayReport = (type==1?true:false);
             }
        }
    }
</script>
 
<style lang="scss" >
@import '../../assets/index.scss';
   
</style>