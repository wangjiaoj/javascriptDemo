<template>
    <div class="index">
        <table>    
            <tbody>
                <tr v-for='book in books'>
                    <td>{{book.id}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.name}}</td>
                    <td>{{book.price}}</td>
                </tr>
            </tbody>
        </table>
        <div class="money-count">
            <div>价格计算小工具</div>
            <div>
                <label for="">num</label>
                 <input type="number" name="" v-model:value="money.num">
            </div>
            <div>
                <label for="">price</label>
                 <input type="number" v-model:value="money.price">
            </div>
            <div>
                <label for="">{{totalPrice}}</label>
            </div>
        </div>
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
                books: [{
                    id: 1,
                    author: '曹雪芹',
                    name: '红楼梦',
                    price: 32.0
                }, {
                    id: 2,
                    author: '施耐庵',
                    name: '水浒传',
                    price: 30.0
                }, {
                    id: '3',
                    author: '罗贯中',
                    name: '三国演义',
                    price: 24.0
                }, {
                    id: 4,
                    author: '吴承恩',
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