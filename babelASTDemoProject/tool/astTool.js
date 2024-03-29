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
  };
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};

const run = ()=>{
    const code = `const a = {
      b:1,
      c:'hello'
    }`;
   var data =  transToLet(code)
   console.log(data)
}
run()