## 一、跟webpack.4.ie的区别
   入口文件出口文件地址不一致，去掉了html加版本号的配置内容
### 二、使用
   2.1 配置选取和增加：
       config/forDiff目录中放置着支持不同情况的配置，可以根据需要增加其他类型的配置；

   2.2 从config/forDiff中选取合适的配置文件，
       把webpack.config.base.js复制到config目录，
       把babelrc复制到package.json同级目录，运行命令即可


