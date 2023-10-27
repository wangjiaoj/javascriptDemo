const fs = require('fs');
const compilerSfc = require('@vue/compiler-sfc');


function parseVue(code){
    return compilerSfc.parse(code).descriptor
}

const run = ()=>{
     const content = fs.readFileSync('../src/testVueSetup.vue','utf-8')
  // const content = fs.readFileSync('../src/testVue.vue','utf-8')
   const descriptor = parseVue(content)
   console.log(descriptor.template)
   console.log('template--------------')
   console.log(descriptor.template.ast.children)
}
run()