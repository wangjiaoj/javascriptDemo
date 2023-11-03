const generator = require('@babel/generator');
const template = require('@babel/template');
const types = require('@babel/types');
const buildRequire = template.default(`
  var IMPORT_NAME = require(SOURCE);
`);
const ast = buildRequire({
  IMPORT_NAME: types.identifier("myModule"),
  SOURCE: types.stringLiteral("my-module"),
});
const newCode = generator.default(ast).code;
console.log(newCode);

 