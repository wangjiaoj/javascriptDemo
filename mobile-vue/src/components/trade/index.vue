<template>
    <div class="index">
        <my-Row >
            <my-Col span="1">ddddddd</my-Col>
        </my-Row>
        <my-tab value="tab1">
            <my-tab-panel label="tab1" name="tab1">
                 AAAAA
            </my-tab-panel>  

            <my-tab-panel label="tab2" name="tab2">
                BBBBB
            </my-tab-panel> 

            <my-tab-panel label="tab3" name="tab3">
                CCCCCC
            </my-tab-panel>
        </my-tab>
       
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>作者</th>
                    <th>书名</th>
                    <th>价格</th>
                </tr>
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