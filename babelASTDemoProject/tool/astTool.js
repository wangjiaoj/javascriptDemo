const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const transToLet = code => {
  const ast = parser.parse(code);
  // 访问者对象
  const visitor = {
    // 遍历声明表达式
    ObjectExpression(path){
      console.log(path.node)
    },
    VariableDeclaration(path) {
   
      if (path.node.type === 'VariableDeclaration') {
        // 替换
        // if (path.node.kind === 'var') {
        //   path.node.kind = 'let';
        // }
      }
    },
  };
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};

const run = ()=>{
    // const code = `const a = 1
    // var b = 2
    // let c = 3`;
    const code = `const a = {
      b:1,
      c:'hello'
    }`;
   var data =  transToLet(code)
  //  console.log(data)
}
run()