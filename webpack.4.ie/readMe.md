#多页面webpack打包示例
## 一、结构说明
  1.1 src目录
     src为源代码目录
  1.2 static/project/为src中的代码打包后生成文件所在的目录
  
## 二、开发流程
1.1、 首先在命令行中运行命令
> npm run dev
1.2、 当新增页面的时候，在tpl目录中新增一个html文件，如果需要新增对应的js文件，可以在src/pages/目录中新增一个js文件.
示例：
在tpl文件中新增report/add.html,
可以配套在src/pages目录中新增一个report/add.js,
html中引用js和css地址为
><link href="static/project/css/report-add.css" rel="stylesheet">
><script type="text/javascript" src="static/project/js/report-add.js"></script>


## 三、命令介绍
