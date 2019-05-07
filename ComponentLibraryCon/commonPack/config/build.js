 // Dependencies  
 const webpack = require('webpack')
 const fs = require('fs');
 const url = require('url');
 const http = require('http');
 const chalk = require('chalk'); //颜色插件
 const webpackBuildConfig = require('../webpack.config'); //build 配置
 const path = require('path');
 (async() => {
     var host;
     var pages = [];
     var DOWNLOAD_DIR = './libs/';
     var packageJsonName = '../package.json';
     var DOWNLOAD_DIR_JSON = '../libs/component.file.json'
     var webpackConfig;
     var importList;
     //先清空下libs
     rmDirSync(DOWNLOAD_DIR);
     //读取package.json 获取组件库依赖importList和组件库组件结构文件componentFile(component.file.json)
     var packageJson = fs.readFileSync(path.join(__dirname, packageJsonName), 'utf8');
     if (packageJson) {
         webpackConfig = JSON.parse(packageJson);
         if (webpackConfig.componentFile && webpackConfig.host && webpackConfig.host) {
             importList = webpackConfig.importList;
             host = webpackConfig.host;
             mkDirSync(DOWNLOAD_DIR);
             download_file_httpget(host + webpackConfig.componentFile, null, () => {
                 console.log(`length:${importList.length}`)
                 if (importList.length) {
                     downLibsAndBuild();
                 }
             });
         } else {
             var err = "package.json didn't exist componentFile or importList or host";
             console.log(err);
             throw new Error(err);
         }
     }


     function getName(url) {
         url = url.split('/');
         url = url[url.length - 1];
         if (url.indexOf("?") > -1) {
             url = url.split('?');
             url = url[0];
         }
         return url;
     }

     function rmDirSync(DIR) {
         if (fs.existsSync(DIR)) {
             fs.readdirSync(DIR).forEach((file) => {
                 var curPath = DIR + "/" + file;
                 if (fs.statSync(curPath).isDirectory()) {
                     rmDirSync(curPath);
                 } else {
                     fs.unlinkSync(curPath);
                 }
             })
             fs.rmdirSync(DIR);
         }
     }

     /**
      * Function to make Dir  
      *  */
     function mkDirSync(path) {
         if (fs.existsSync(path)) {
             console.log(`mk dir:${path} but dir exists already`);
             return false;
         } else {
             let status = fs.mkdirSync(path);
             console.log(`mk dir:${path} status:${status}`)
             return true;
         }
     }

     /**
      * Function to download file using HTTP.get  
      * param:dir存在时使用dir作为目录,否则使用 DOWNLOAD_DIR作为目录
      *  */
     async function download_file_httpget(file_url, dir, callback) {
         var options = {
             host: url.parse(file_url).host,
             port: 80,
             path: url.parse(file_url).pathname
         };

         var file_name = url.parse(file_url).pathname.split('/').pop();
         var dirFile = dir ? dir + file_name : DOWNLOAD_DIR + file_name;
         var file = fs.createWriteStream(dirFile);

         var req = http.get(options, function(res) {
             if (res.statusCode === 404) {
                 var err = `${file_url} -- status:${res.statusCode} didn't exist`;
                 console.log(err);
                 throw new Error(err);
             } else {
                 res.on('data', function(data) {
                     file.write(data);
                 }).on('end', function() {
                     file.end();
                     if (callback) {
                         callback();
                     }
                 });
             }
         });
     };
     /**
      * 读取component.file.json中的组件文件结构，并将package.json中依赖的组件下载到libs中
      * param:dir存在时使用dir作为目录,否则使用 DOWNLOAD_DIR作为目录
      *  */
     function downLibsAndBuild() {
         console.log(`downLibsAndBuild:1111111`);
         var componentJson = fs.readFileSync(path.join(__dirname, DOWNLOAD_DIR_JSON), 'utf8');
         if (componentJson) {
             var componentStruct = JSON.parse(componentJson);
             console.log(`componentJson:1111`)
             for (var key in componentStruct.component) {
                 console.log(`key:${key}`)
                 var item = componentStruct.component[key];
                 for (var i = 0; i < importList.length; i++) {
                     if (importList[i].name == key) {
                         for (var j = 0; j < item.length; j++) {
                             if (importList[i].version == item[j].version) {
                                 pages.push({ name: key, list: item[j] });
                             }
                         }
                     }
                 }
             };
         }

         if (pages.length) {
             //按照依赖的组件和在libs中创建目录/name/version
             pages.map((item, key) => {
                 let dir = DOWNLOAD_DIR + item.name;
                 mkDirSync(dir);
                 dir = dir + "/" + item.list.version;
                 mkDirSync(dir);
                 analysisFile(item.list.file, dir);
             });
             console.log('make libs sucess!');
             console.log('npm run build... ');
             webpack(webpackBuildConfig, (err, stats) => {

                 if (err) throw err;
                 //process是全局对象，无需引入--
                 process.stdout.write(stats.toString({
                     colors: true,
                     modules: false,
                     children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                     chunks: false,
                     chunkModules: false
                 }) + '\n\n')

                 if (stats.hasErrors()) {
                     console.log(chalk.red('  Build failed with errors.\n'))
                     process.exit(1)
                 }

                 console.log(chalk.cyan('  Build complete.\n'))
                 console.log(chalk.yellow(
                     '  Tip: built files are meant to be served over an HTTP server.\n' +
                     '  Opening index.html over file:// won\'t work.\n'
                 ));
                 //清空libs
                 rmDirSync(DOWNLOAD_DIR);
                 console.log('clear ./libs');
             });

         }
     }
     //按照item[j].file中的组件结构在libs/name/version中拉取对应组件的文件到本地
     function analysisFile(files, dir) {
         if (files && typeof files === "object") {
             if (Array.isArray(files)) {
                 for (var i = 0; i < files.length; i++) {
                     let pageUrl = files[i];
                     if (typeof pageUrl === "string") {
                         pageUrl = host + pageUrl;
                         //  console.log(`down:${pageUrl} at dir:${dir + "/"}`);
                         download_file_httpget(pageUrl, dir + "/");
                     } else if (typeof pageUrl === "object") {
                         analysisFile(pageUrl, dir);
                     }
                 }
             } else {
                 //对象
                 for (var floder in files) {
                     //创建文件夹
                     let tempdir = dir + "/" + floder;
                     mkDirSync(tempdir);
                     analysisFile(files[floder], tempdir);
                 }
             }
         }
     }
 })();