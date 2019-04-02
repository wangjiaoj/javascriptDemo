 // Dependencies  
 var fs = require('fs');
 var url = require('url');
 var http = require('http');
 var exec = require('child_process').exec;
 var path = require('path');
 (async() => {
     var host; //'http://172.20.230.165:81';
     var pages; //pages = pages.split('\n');
     var DOWNLOAD_DIR = './static/libs/'; //'./downloads/';
     var webpackConfig;

     fs.readFile(path.join(__dirname, './package.json'), 'utf8', function(err, data1) {
         if (err) throw err;
         webpackConfig = JSON.parse(data1)
         pages = webpackConfig.importList;
         host = webpackConfig.host;
         downLibsAndBuild();
     });


     function getName(url) {
         url = url.split('/');
         url = url[url.length - 1];
         if (url.indexOf("?") > -1) {
             url = url.split('?');
             url = url[0];
         }
         return url;
     }


     async function download_file_httpget(file_url) {
         var options = {
             host: url.parse(file_url).host,
             port: 80,
             path: url.parse(file_url).pathname
         };

         var file_name = url.parse(file_url).pathname.split('/').pop();
         var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

         http.get(options, function(res) {
             res.on('data', function(data) {
                 file.write(data);
             }).on('end', function() {
                 file.end();
                 console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
             });
         });
     };
     // We will be downloading the files to a directory, so make sure it's there  
     // This step is not required if you have manually created the directory  
     // Function to download file using HTTP.get  
     function downLibsAndBuild() {
         //  var flag;
         // flag = setInterval(async() => {}, 4000);
         //else {  clearInterval(flag);   }

         if (pages.length) {

             pages.map((item, index) => {
                 console.log(item)
                 var pageUrl = item; //pages.shift()
                 var fileName = getName(pageUrl);
                 pageUrl = host + pageUrl;
                 download_file_httpget(pageUrl);
             })

             exec('npm run build', function(err, stdout, stderr) {
                 if (err) throw err;
                 else {
                     console.log('npm run build... ');
                     console.log(stdout);
                 }
             });

         }

     }

     //  var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
     //  var child = exec(mkdir, function(err, stdout, stderr) {
     //      if (err) throw err;
     //      else download_file_httpget(file_url);
     //  });



 })();