 // Dependencies  
 var fs = require('fs');
 var url = require('url');
 var http = require('http');
 var exec = require('child_process').exec;
 var path = require('path');
 (async() => {
     var host;
     var pages = [];
     var DOWNLOAD_DIR = './libs/';
     var webpackConfig;
     var importList;
     //先清空下libs
     rmDirSync(DOWNLOAD_DIR);
     //读取package.json 获取组件库依赖importList和组件库组件结构文件componentFile(component.file.json)
     var packageJson = fs.readFileSync(path.join(__dirname, './package.json'), 'utf8');
     if (packageJson) {
         webpackConfig = JSON.parse(packageJson);
         if (webpackConfig.componentFile && webpackConfig.host && webpackConfig.host) {
             importList = webpackConfig.importList;
             host = webpackConfig.host;
             mkDirSync(DOWNLOAD_DIR);
             download_file_httpget(host + webpackConfig.componentFile, null, () => {
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
     async function mkDirSync(DIR) {
         if (fs.existsSync(DIR)) {
             return false;
         } else {
             fs.mkdirSync(DIR);
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
         var componentJson = fs.readFileSync(path.join(__dirname, DOWNLOAD_DIR + 'component.file.json'), 'utf8');
         if (componentJson) {
             var componentStruct = JSON.parse(componentJson);
             for (var key in componentStruct.component) {
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
             //按照依赖的组件和item[j].file中的组件结构在libs中创建目录，并下载对应文件到本地
             pages.map((item, key) => {
                 let dir = DOWNLOAD_DIR + item.name;
                 mkDirSync(dir);
                 for (var floder in item.list.file) {
                     var urlItem = item.list.file[floder];
                     mkDirSync(dir + "/" + floder);
                     for (var i = 0; i < urlItem.length; i++) {
                         var pageUrl = urlItem[i];
                         var fileName = getName(pageUrl);
                         pageUrl = host + pageUrl;
                         download_file_httpget(pageUrl, dir + "/" + floder + "/");
                     }
                 }
             });
             console.log('make libs sucess!');
             console.log('npm run build... ');
             exec('npm run build', function(error, stdout, stderr) {
                 if (error) throw error;
                 else {
                     console.log(stdout);
                     console.log(stderr);
                 }
             });
         }
     }

 })();