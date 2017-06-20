var express = require('express');
var cookie = require('cookie-parser');
// 创建app对象
var router = express.Router();
router.use(cookie())

// 设置cookie
router.get('/', function (req, res, next) {
    res.cookie('rememberme', 'yes', {domain:"localhost"});
    res.render('test', { title: 'cookie' });
});
module.exports = router;