var path = require('path');
var fs = require('fs');

var ROOT_PATH = path.resolve(__dirname, '../');
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var ENTRY_PATH = path.resolve(ROOT_PATH, 'entries');

// 入口文件配置
function _getEntries() {
    return fs.readdirSync(ENTRY_PATH).filter(filename => /^[a-zA-Z0-9]/.test(filename)).map(filename => {
        return {
            name: filename,
            entry: path.resolve(ENTRY_PATH, filename),
            template: path.resolve(ENTRY_PATH, filename + '/template.html')
        }
    });
}


module.exports = {
    ROOT_PATH,
    APP_PATH,
    BUILD_PATH,
    ENTRY_PATH,

    jsPath: 'project/js/',
    cssPath: 'project/css/',
    imgPath: 'project/images/',
    fontPath: 'project/font/',

    entryConfig: _getEntries(),

    // 高德地图key值
    AMAP_KEY: 'b95132d280324c5735df19ddcb965824'
}