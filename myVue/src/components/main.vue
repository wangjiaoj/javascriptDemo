<template>
    <div class="page-container">
        <div class="nav-header">
            <ul class="clearfix">
                <li><router-link to="/main/movie">movie</router-link></li>
                <li><router-link to="/main/book">book</router-link></li>
            </ul>
        </div>
        <div class="page-body">
            <router-view></router-view> 
        </div>
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