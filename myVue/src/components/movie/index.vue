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
                books: [{
                    id: 1,
                    author: '伪装者',
                    name: '伪装者',
                    price: 32.0
                }, {
                    id: 2,
                    author: 'super deluxe',
                    name: 'super deluxe',
                    price: 30.0
                }, {
                    id: '3',
                    author: 'wondering',
                    name: 'wondering',
                    price: 24.0
                }, {
                    id: 4,
                    author: 'baahubali',
                    name: 'baahubali',
                    price: 20.0
                }]
            }
        }
    }
</script>
<style lang="scss">

</style>