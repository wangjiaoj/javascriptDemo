const fs = require('fs');
const compilerSfc = require('@vue/compiler-sfc');

function writeFileHandle(name,content){
    fs.writeFileSync('../result/'+name,JSON.stringify(content,null,4),{encoding:'utf-8'})
}

const run = ()=>{
    const readfileName = '../src/TemplateAstTypeDemo.vue' //'../src/testVueSetup.vue'

    const code = fs.readFileSync(readfileName,'utf-8')
    const descriptor = compilerSfc.parse(code).descriptor;
    writeFileHandle('demoParse.json',descriptor)
     
    let compileredTemplate = compilerSfc.compileTemplate({
        id: '123',
        filename: 'foo.vue',
        source: descriptor.template.content
    })
    writeFileHandle('demoCompileredTemplate.json',compileredTemplate)

    let compileredScript = compilerSfc.compileScript(descriptor, {
        id: '123'
    })
    writeFileHandle('demoCompileredScript.json',compileredScript)

    let compileredStyle = compilerSfc.compileStyle({
        source: descriptor.styles[0].content,
        scoped: true,
        id: 'data-v-123'
    })
    console.log(compileredStyle)
}
run()