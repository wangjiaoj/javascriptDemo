<template title="hello">
    <div>    
        <p class="pName">{{ flag?'是':'否' }} World!</p>
        <input type="text" v-model="name" />
        <button  @click="handleClick"></button>
        <componentChild :data="childData"></componentChild>
        <label title="标题">{{ tame }} World!</label>
    </div>
</template>
<script lang='ts'>
import componentChild from './componentChild.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'foo',
    props:{
        flag :false,
    },
    setup() {
        const handleClick=()=>{

        }
        const handleChildClick=()=>{

         }
        return {
            name: ref('jack'),
            tame: ref('jack'),
            childData:ref('childJack'),
            handleClick
        }
    }
})
</script>
<style lang="scss">
input {
    color: #333;
}
</style>
   