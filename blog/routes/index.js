var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});

router.get('/login-test', function(req, res, next) {
    res.render('login-test', { title: 'login' });
});

router.post('/ajax-login', function(req, res, next) {
    res.send(JSON.stringify({ status: "success" }));
    res.end();
});
module.exports = router;