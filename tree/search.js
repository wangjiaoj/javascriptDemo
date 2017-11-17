// require('../css/base.css');
// require('../css/common.css');
// require('../css/search.css');
// require('./tree');

$(function () {

    var searchResult = [];
    var item = {
        "name": "股票-基本信息-股票置换(stockExchange)", //股票名称-股票模块名称-股票模块信息表名称(股票模块信息表英文名称)
        "seq": 1, //seq  用来拼装http://.......?seq=1
    }
    for (var i = 0; i < 100; i++) {
        searchResult.push(item);
    }



    function PageLoad(param) {
        this.params = {
            input: "",
            page: 1,
        };
        this.loadSearchResultLength = 0;
        this.init();
        this.bind();
    }
    var fn = PageLoad.prototype;
    fn.init = function () {
        this.loadSearchResult();
    }
    fn.bind = function () {
        var container = $(".main-container");
        var _this = this;
        container.find('.select-selected-options').click(function (e) {
            var $ele = $(e.currentTarget);
            var option = $ele.parent().find('.select-options');
            option.toggle();
        });
        container.on('click', '.select-options li', function (e) {
            var $ele = $(e.currentTarget);
            var span = $ele.parents('.select-wrap').find('.select-selected-value');
            span.text($ele.text());
        });
        container.find('.select-options').mouseleave(function (e) {
            $(this).hide();
        });
        container.on("click", ".search-btn", function () {
            _this.params.page = 1;
            _this.loadSearchResult();
        });
        container.on("click", ".load-more span", function () {
            _this.params.page = 2;
            _this.loadSearchResult();
        });

    }
    fn.loadSearchResult = function () {
        // $.ajax({
        //         url:"",
        //         data:'',
        //         dataType:'json',
        //         success:function(res){

        //         }
        // }); 
        var list = [];
        for (var i = 0; i < searchResult.length; i++) {
            list.push('<li><a href="' + searchResult[i].seq + '">' + (i + 1) + '、' + searchResult[i].name + '</a> </li>');
        }
        $(".search-result-list ul").append(list.join(""));
    }
    new PageLoad();
})