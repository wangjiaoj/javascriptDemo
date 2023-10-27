const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require('@babel/generator');
const types = require('@babel/types');
const transAddVariableDeclaration = code => {
  const ast = parser.parse(code);
  // 访问者对象
  const visitor = {
    Program(path) {
      const objectExpression =  types.objectExpression([
          types.objectProperty(
            types.identifier("key"),
            types.stringLiteral("HelloWorld")
          ),
          types.objectProperty(
            // 字符串类型 key
            types.stringLiteral("str"),
            types.arrayExpression([])
          ),
          types.objectProperty(
            types.memberExpression(
              types.identifier("obj"),
              types.identifier("propName")
            ),
            types.booleanLiteral(false),
            // 计算值 key
            true
          ),
      ]) 
      //types.stringLiteral("HelloWorld") 
      const declarations = types.variableDeclarator(types.identifier("mm1"),objectExpression);
      path.node.body.push(types.variableDeclaration("let", [declarations]))
    },
  };
  traverse.default(ast, visitor);
  // 生成代码
  const newCode = generator.default(ast, {}, code).code;
  return newCode;
};

const run = ()=>{
    const code = `const a = 1`;
    var data = transAddVariableDeclaration(code)
    console.log(data)
}
run()