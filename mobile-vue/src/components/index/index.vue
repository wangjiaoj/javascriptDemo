<template>
    <div class="index">
        <table>
            <thead>
                <tr>
                    <th>股票</th>
                    <th>最新</th>
                    <th>涨幅</th>
                    <th>行业板块</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='stock in stockList'>
                    <td>{{stock.id}}</td>
                    <td>{{stock.price}}</td>
                    <td>{{stock.name}}</td>
                    <td>{{stock.industry}}</td>
                </tr>
            </tbody>
        </table>
         
    </div>
</template>
<script>
    export default {
        data() {
            return {
                money: {
                    num: '',
                    price: '',
                },
                stockList: [{
                    id: 300033,
                    industry: '曹雪芹',
                    name: '红楼梦',
                    price: 32.0
                }, {
                    id: 300033,
                    industry: '施耐庵',
                    name: '水浒传',
                    price: 30.0
                }, {
                    id: '300033',
                    industry: '罗贯中',
                    name: '三国演义',
                    price: 24.0
                }, {
                    id: 300033,
                    industry: '吴承恩',
                    name: '西游记',
                    price: 20.0
                }]
            }
        },
        computed: {
            totalPrice: function() {
                return this.money.num * this.money.price
            }
        }

    }
</script>
<style lang="scss">

</style>