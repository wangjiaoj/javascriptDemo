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
                }, {
                    title: "新增市场注册资本总额（亿元）",
                    data: [{ name: '累计绝对值', value: 4616.69 }, { name: '累计增速（%）', value: 12.26 }, { name: '较1-6月（%）', value: 0.68 },
                        { name: '7月以来', value: 89.47 }, { name: '7月以来同比增长（%）', value: 62.96 }]
                }, {
                    title: "新增亲清在线兑付金额（亿）",
                    data: [{ name: '累计绝对值', value: 22.3 }, { name: '较上周', value: 5.14 }]
                }, {
                    title: "新增亲清在线申领次数（万次）",
                    data: [{ name: '累计绝对值', value: 127.81 }, { name: '较上周', value: 1.48 }]
                }, {
                    title: "实时管理人口(万人)",
                    data: [{ name: '累计绝对值', value: 1628.44 }, { name: '较去年日均', value: 28.44 }, { name: '较6月日均', value: 14.03 }]
                }, {
                    title: "新批项目数量（个）",
                    data: [{ name: '累计绝对值', value: 4815 },
                        { name: '累计增速（%）', value: 11.23 },
                        { name: '较7月以来同比增长（%）', value: 206.9 } ]
                }, {
                    title: "新批项目投资额（亿）",
                    data: [{ name: '累计绝对值', value: 9607.68 },
                        { name: '累计增速（%）', value: 23.58 },
                        { name: '较7月以来同比增长（%）', value: 275.83 } ]
                }, {
                    title: "新建商品住房销售面积（万方）",
                    data: [{ name: '累计绝对值', value: 704.84 },
                        { name: '累计增速（%）', value: 17.23 },
                        { name: '较1-6月（%）', value: -0.33 },
                        { name: '7月以来', value: 9.46 },
                        { name: '7月以来同比增长（%）', value: -3.25 } ]
                }, {
                    title: "新建商品住房销售套数（套）",
                    data: [{ name: '累计绝对值', value: 58886 },
                        { name: '累计增速（%）', value: 14.07 },
                        { name: '较1-6月（%）', value: -0.17 },
                        { name: '7月以来', value: 829 },
                        { name: '7月以来同比增长（%）', value: 3.11 } ]
                }, {
                    title: "银联消费额（亿元）",
                    data: [{ name: '累计绝对值', value: 5190.33 },
                        { name: '累计增速（%）', value: -31.74 },
                        { name: '较1-6月（%）', value: -0.17 },
                        { name: '7月以来', value: 64.09 } ]
                }, {
                    title: "酒店入住人次（万人次）",
                    data: [{ name: '累计绝对值', value: 1545.65 },
                        { name: '累计增速（%）', value: -52.4 },
                        { name: '较1-6月（%）', value: -0.18 },
                        { name: '7月以来', value: 22.97 },
                        { name: '7月以来同比增长（%）', value: -37  }]
                }, {
                    title: "湖滨步行街日客流量（万人次）",
                    data: [{ name: '累计绝对值', value: 10.69 },
                        { name: '累计增速（%）', value: -41.12 },
                        { name: '较1-6月（%）', value: 26.01 },
                    ]
                },
                {
                    title: "高速收费站入口流量（万车次）",
                    data: [{ name: '累计绝对值', value: 7378.97 },
                        { name: '累计增速（%）', value: -0.18 },
                        { name: '较1-6月（%）', value: -0.02 },
                        { name: '7月以来同比增长（%）', value: -1.59 }
                    ]
                },
                {
                    title: " 高速收费站出口流量（万车次）",
                    data: [{ name: '累计绝对值', value: 7557.88 },
                        { name: '累计增速（%）', value: -8.37 },
                        { name: '较1-6月（%）', value: 0.33 },
                        { name: '7月以来同比增长（%）', value: -6.45 }
                    ]
                },
                {
                    title: "机场货运吞吐量（万吨）",
                    data: [{ name: '累计绝对值', value: 33.29 },
                        { name: '累计增速（%）', value: 0.41 },
                    ]
                }, {
                    title: "机场旅客吞吐量(万人)",
                    data: [{ name: '累计绝对值', value: 957.83 },
                        { name: '累计增速（%）', value: 14.74 },
                    ]
                }, {
                    title: "EPI指数",
                    data: [{ name: '累计绝对值', value: 103.15 },
                        { name: '较上周', value: -3.13 },
                        { name: '全省排名', value: 10 },
                        { name: '较上周全省排名', value: 10 },
                    ]
                },
                {
                    title: " 冷鲜肉批发价（元/㎏）",
                    data: [{ name: '当前', value: 45 },
                        { name: '较今年峰值', value: -29.95 },

                    ]
                },
                {
                    title: "猪肉批发量(吨)",
                    data: [{ name: '累计绝对值', value: 68894.51 },
                        { name: '累计增速（%）', value: -31.94 },
                        { name: '较1-6月（%）', value: -0.18 },
                        { name: '7月以来', value: 739.88 },
                        { name: '7月以来同比增长（%）', value: -11.3 }
                    ]
                }],
                dayReport: [
                    { title: "新增市场主体总量（个）", monitoringValue: "***", absoluteValue: 115223, growthRate: -19.04, dailyAverage: 722.56, peakValue: 3667 },
                    { title: "新增市场注册资本总额（亿元）", monitoringValue: "***", absoluteValue: 4635.42, growthRate: 11.28, dailyAverage: 24.69, peakValue: 421.9 },
                    { title: "新增亲清在线政策数（个）", monitoringValue: 0, absoluteValue: 152, growthRate: "***", dailyAverage: "***", peakValue: "***" },
                    { title: "新增亲清在线兑付金额（亿）", monitoringValue: 0.05, absoluteValue: 23.2, growthRate: "***", dailyAverage: "***", peakValue: "***" },
                    { title: "新增亲清在线申领次数（万次）", monitoringValue: 0.05, absoluteValue: 128.18, growthRate: "***", dailyAverage: "***", peakValue: "***" },
                    { title: "实时管理人口(万人)", monitoringValue: 1617.1, absoluteValue: "***", growthRate: "***", dailyAverage: 1600, peakValue: 1617.78 },
                    { title: "新批项目数量（个）", monitoringValue: 0, absoluteValue: 4883, growthRate: 9.78, dailyAverage: 24, peakValue: 76 },
                    { title: "新批项目投资额（亿）", monitoringValue: 0, absoluteValue: 9555.25, growthRate: 21.36, dailyAverage: 43.57, peakValue: "***" },
                    { title: "新建商品住房销售面积（万方）", monitoringValue: 6.67, absoluteValue: 719.38, growthRate: 17.67, dailyAverage: 7.2, peakValue: 13.41 },
                    { title: "新建商品住房销售套数（套）", monitoringValue: 585, absoluteValue: 60127, growthRate: 14.53, dailyAverage: 622, peakValue: 1142 },
                    { title: "银联消费额（亿元）", monitoringValue: 23.38, absoluteValue: 5213.7, growthRate: -32.24, dailyAverage: 49.12, peakValue: 152.93 },
                    { title: "酒店入住人次（万人次）	", monitoringValue: 12.17, absoluteValue: 1570.35, growthRate: -52.17, dailyAverage: 20.45, peakValue: 41.45 },
                    { title: "湖滨步行街日客流量（万人次）", monitoringValue: 14.32, absoluteValue: 1590.52, growthRate: "***", dailyAverage: 14.45, peakValue: 17.51 },
                    { title: "高速收费站入口流量（万车次）", monitoringValue: 44.68, absoluteValue: 7470.86, growthRate: -0.17, dailyAverage: 43.71, peakValue: 63.88 },
                    { title: "高速收费站出口流量（万车次）", monitoringValue: 46.06, absoluteValue: 7653.86, growthRate: -8.36, dailyAverage: 48.44, peakValue: 64.99 },
                    { title: "机场货运吞吐量（万吨）", monitoringValue: 0.24, absoluteValue: 33.75, growthRate: "***", dailyAverage: 0.19, peakValue: 0.28 },
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