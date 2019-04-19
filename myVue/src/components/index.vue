<template>
    <div class="index">
        <table>
            <thead>
                <th>
                    <td>序号</td>
                    <td>作者</td>
                    <td>书名</td>
                    <td>价格</td>
                </th>
            </thead>
            <tbody>
                <tr v-for='book in books'>
                    <td>{{book.id}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.name}}</td>
                    <td>{{book.price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                book: {
                    id: 0,
                    author: '',
                    name: '',
                    price: ''
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
        }
    }
</script>
<style lang="scss">

</style>