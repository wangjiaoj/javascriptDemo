<template>
 <div>hello
     <input type="text" v-model="name">
 </div>
</template>
<script lang='ts' setup>
import { defineComponent, ref } from 'vue'
const  name =  ref('jack')
</script>
<style lang="scss">
input {
    color: #333;
}
</style>
