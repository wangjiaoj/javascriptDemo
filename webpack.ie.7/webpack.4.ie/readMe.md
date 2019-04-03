#使用说明
## 一、package.json

  package.json中需要额外配置三个参数：

```javascript
"componentFile": "/static/ComponentLibraryCon/component.file.json",
//固定地址componentFile,用于说明组件的文件组织结构
"importList": [{
        "name": "MobileH5",
        "version": "1.0.0"
}],//依赖的组件库组件
"host": "http://10.0.16.235"//cnd的host
```
## 二、 build命令
2.1、项目构建命令：node build
2.2、build.js简介：
   思路：1）清空static目录统计的libs文件夹
         2）按照package.json中的componentFile参数从cdn上拉取component.file.json文件（该文件用于说明组件的文件结构）
         3）按照package.json中的importList参数和component.file.json文件,将项目依赖的组件拉取到本地libs中去
         4）调用npm run build
   tips：该命令主要用于线上打包，每次运行都会重新拉取线上组件，再打包，所以如果有组件修改或增加，注意要先发布到开发或者测试环境的cdn上；
        另外本地测试该命令的时候，如果本地libs中组件变动，记得要先备份，再测试该命令
## 三、 import命令
2.1、辅助拉取组件到libs命令：node import
2.2、import.js简介：    
     该命令会对比本地的libs中是否已经存在要拉取的cdn组件文件，libs中已经存在的组件文件是不会被重新拉取更新的。
## 四、本地调试命令：
   本地调试命令 npm run dev ,可以先使用node import，再使用该命令来实现在本地调试组件。