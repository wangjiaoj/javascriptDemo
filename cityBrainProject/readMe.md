## 多入口文件打包

###  

 







### .babelrc配置说明
1. 如果useBuiltIns为true，项目中必须引入babel-polyfill。
2. babel-polyfill只能被引入一次，如果多次引入会造成全局作用域的冲突。
useBuiltIns 可以根据之前的配置自行添加 polyfill，默认不开启。
安装 babel-polyfill 后只要引入一次就行：import "babel-polyfill";