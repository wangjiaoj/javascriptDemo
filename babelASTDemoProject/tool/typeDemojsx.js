const generator = require('@babel/generator');
const types = require('@babel/types');
 

const run = ()=>{
  const buttonAst = types.jsxElement(
    types.jsxOpeningElement(types.jsxIdentifier("Button"), []),
    types.jsxClosingElement(types.jsxIdentifier("Button")),
    [types.jsxExpressionContainer(types.identifier("props.name"))]
  );
  
  const clickAst = types.jsxAttribute(
    types.jsxIdentifier("onClick"),
    types.jSXExpressionContainer(types.identifier("handleClick"))
  );
  const jsxAst =  types.jsxElement(
    types.jsxOpeningElement(types.jsxIdentifier("div"), [clickAst]),
    types.jsxClosingElement(types.jsxIdentifier("div")),
    [buttonAst]
  )
  const newCode = generator.default(jsxAst).code;
  console.log(newCode)
}
run()