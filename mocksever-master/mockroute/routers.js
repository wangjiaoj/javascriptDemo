var koa = require('koa')
var router = require('koa-router')()
var mockdata = require('../jsonData/mockdata')
var mockschemadata = require('../jsonData/mockschema')
var schemadata = require('./mock')
var citydata = require('../jsonData/city')
    /** 
     * 路由配置 
     * API路由列表
     * 
     * 
     */
router
    .get('/', async function(ctx, next) {
        ctx.body = mockdata
    })
    .get("/mock", async function(ctx, next) {
        ctx.body = mockdata
    }).get("/mockschemadata", async function(ctx, next) {
        ctx.body = mockschemadata
    }).get("/city", async function(ctx, next) {
        ctx.body = citydata
    });

module.exports = router