/**
 * Xml可视化 构造函数
 * @construct
 */
function XmlTable(container, xmlString, options) {
    this.xmlString = xmlString;
    this.options = options;
    // 容器
    this.container = container;
    this.toolbar = container.querySelector('.content-tools');
    this.tableContainer = container.querySelector('.content-body');

    // table 实例
    this.table = null;

    // 各个xml节点
    this.xmlDoc = null;
    this.xmlHead = null;
    this.xmlFields = null;
    this.xmlBody = null;
    this.xmlFiltrs = null;
    this.xmlDownlist = null;

    // 原始数据
    this.tableFields = [];
    this.tableHeads = [];
    this.tableBody = [];
    this.tableFiltrs = [];

    // tool扁平化配置
    this.tools = {
        // 是否存在还原按钮
        reloadBtn: true,
        // 是否存在旋转按钮
        rotateBtn: true,
        // 旋转按钮状态
        rotateState: true,
        // 是否存在保留位数选择框
        decSelector: true,
        // 是否存在隐藏空行按钮
        hideBlankRowBtn: true,
        // 保留位数选项
        decSelectorLength: 5,
        // 保留位数当前选项
        decSelectorValue: 2,
        // 是否存在单位选择框
        unitSelector: true,
        // 单位选项
        unitSelectorOptions: ['元', '千元', '万元', '十万元', '百万元', '千万元', '亿元', '十亿元', '百亿元'],
        // 单位默认值
        unitSelectorDefault: '元',
        // 是否存在范围选择按钮
        rangeFilter: true,
        // 是否存在beginYears选择框
        beginYearsSelector: true,
        // 是否存在endYears选择框
        endYearsSelector: true,
        // 起始年份
        beginYears: options.beginYears || ['2014', '2015', '2016', '2017', '2018'],
        // 截止年份
        endYears: options.endYears || ['2014', '2015', '2016', '2017', '2018'],
        // 是否存在统计频率选择组
        scopesBtnsSelector: true,
        // 统计频率
        scopesBtns: ['月', '季', '年'],
        // 是否存在指标类型选择组
        kpisSelector: true,
        // 指标类型
        kpis: ['当期值', '累计值'],
        // 辅助频道
        otherChannels: [thsName || '', '', '机构观点'],
        // 是否存在otherChannels选择框
        otherChannelsSelector: true,
        // 选择的tab
        defOtherChannel: '0',
        // 选择的频率值
        defScope: '',
        // 选择的指标类型值
        defKpi: '',
        // 选择的起始年份
        defBeginYear: options.endYears[0],
        // 选择的截止年份
        defEndYear: options.beginYears[4] || options.beginYears[options.beginYears.length - 1],
        // 是否存在导出选择组
        exportSelector: true,
        // 导出配置
        defExport: '',
        // 导出
        exportSelects: ['xls'] // , 'pdf']
    };

    // 初始化
    //   this.init();
}

var p = XmlTable.prototype;

/**
 * 解析xml
 * @param {String} xmlStr
 * @returns {null}
 */
p.xmlParse = function(xmlStr) {
    console.time('replace');
    xmlStr = xmlStr.replace(/&/g, '&amp;');
    console.timeEnd('replace');
    var parser = new DOMParser();
    console.time('xmlParseFromString');
    var xmlDoc = parser.parseFromString(xmlStr, "application/xml");
    console.timeEnd('xmlParseFromString');
    var head = xmlDoc.querySelector('head');
    var fields = head.querySelector('fields');
    var body = head.querySelector('body');
    var filtrs = xmlDoc.querySelector('filtrs');
    var downlist = xmlDoc.querySelector('downlist');

    // 固定列数据
    var tableFields = Array.prototype.slice.call(fields.children).map(function(e, i) {
        return getAllAttributes(e, {
            't_value': 'title'
        });
    });

    // 筛选项数据
    var tableFiltrs = Array.prototype.slice.call(filtrs.children).map(function(e, i) {
        var attrs = getAllAttributes(e);
        attrs.children = Array.prototype.slice.call(e.children).map(function(item) {
            return getAllAttributes(item);
        });
        return attrs;
    });
    this.tableFiltrs = tableFiltrs;

    var tableHeads = [];
    var tableBody = [];

    Array.prototype.slice.call(body.children).forEach(function(e, i) {
        // 每一列数据
        var children = Array.prototype.slice.call(e.children);
        //
        tableHeads.push(getAllAttributes(e));

        tableBody.push(children.map(function(cell) {
            var attrs = getAllAttributes(cell);
            var value = cell.textContent;

            // if (value !== '' && !isNaN(Number(value))) {
            //   value = Number(value);
            // }
            attrs.value = value;
            return attrs;
        }));
    });

    this.xmlDoc = xmlDoc;
    this.xmlHead = head;
    this.xmlFields = fields;
    this.xmlBody = body;
    this.xmlFiltrs = filtrs;
    this.xmlDownlist = downlist;

    this.tableFields = tableFields;
    this.tableHeads = tableHeads;
    this.tableBodyTranspose = tableBody;
    this.tableBody = transpose(tableBody);
};

p.setTablePartValues = function(data) {
    this.tableFields = data.tableFields;
    this.tableHeads = data.tableHeads;
    this.tableBodyTranspose = data.tableBody;
    this.tableBody = transpose(data.tableBody);
};

/**
 * 模拟数据
 * @param {JSON} param0 {rows: 行数, begin: 开始年份, end: 截止年份} 
 */
p.mock = function() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { rows: 72, begin: 2012, end: 2017 },
        rows = _ref.rows,
        begin = _ref.begin,
        end = _ref.end;

    // 这里采用JSON数据格式，替换上面的XML字符串格式
    var randomObjects = function randomObjects(row, col, rule) {
        // 这里使用函数来生成，当然可以使用ajax来
        return Mock.mock({ // 这里模拟一个可配置的二维数组
            data: function data() {
                return new Array(row).fill('').map(function() {
                    return Mock.mock(rule);
                });
            }
        });
    };

    /**
     * mock生成日期片段
     * @param {String} begin 2015
     * @param {String} end 2016
     * @param {String} type cur当前 | all累计
     * @returns {Array} result ['2015-03-31', '2015-06-30', '2015-09-30', '2015-12-31', '2016-03-31', '2016-06-30', '2016-09-30', '2016-12-31']
     */
    function periodDate(begin, end, type) {
        var dValue = end - begin;
        var result = [];
        var period = begin;
        var big = [0, 2, 4, 6, 7, 9, 11];
        var m = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        for (var i = 0; i <= dValue; i++) {
            var temp = [];
            for (var j = 0; j < 12; j++) {
                var c = 30;
                if (big.indexOf(j) > -1) {
                    c = 31;
                }
                temp.push(period + '-' + m[j] + '-' + c);
            }
            result.push(temp.join(','));
            period++;
        }
        return result.join(',').split(',');
    }

    var periodObject = periodDate(begin, end);
    var number = rows || periodObject.length;
    var ids = randomObjects(number, 1, /\d{5}/).data;

    // let mockData = (row, col) => { // 这里使用函数来生成二维数组
    //     return Mock.mock({ // 这里模拟一个可配置的二维数组
    //         data: function() {
    //             return new Array(row).fill('').map(() => {
    //                 return new Array(col).fill('').map(() => {
    //                     return Mock.mock('@float(1, 10000, 1, 3)');
    //                 });
    //             });
    //         }
    //     });
    // }
    /*
    var mockData = Mock.mock({
        [`tableFields|${number}`]: [{
            'index|+1': 1,
            'id|+1': ids,
            'title': '@cword(3)',
            // 'title_en': '@title',
            't_value': function(){
                return this.title;
            },
            // 't_value_en': function(){
            //     return this.t_value;
            // },
            'type': function() {
                // 无数据只展示标题
                return this.index > 2 ? 'currency' : 'string';
            },
            'is_group': 'false',// 是否伸缩分级标识
            'children': function(){
                // 伸缩层级子集，不包括孙集，只在is_group为true时有值
                if (this.is_group === 'true') {
                    // 可设置，对应子集
                    return [];
                }
                return undefined;
            },
            'level': function() {
                // 伸缩层级 0顶级 | 1中级 | 2最低级，只在is_group为true时有值
                if (this.is_group === 'true') {
                    // 可设置，对应子集
                    return Mock.mock(/0|1|2/);
                }
                return undefined;
            },
            'bold': /1|0/,// 加粗
            'space': '0',// 行前空格数
        }],
        [`tableHeads|${number}`]: [{
                'id|+1': 1,
                'istable': 'false',
                't_value|+1': periodObject,
                // 't_value_en': '@name(5)',
                'perioddate': function(){
                    return this.t_value;
                },
        }],
        // "tableBody|4-4": [
        //     [
        //         {
        //             'id|+1': ids,
        //             'value': '@float(1000, 9999, 4, 4)'
        //         }
        //     ]
        // ],
        [`tableBody|${number}`]: randomObjects(number, number, {
                'id|+1': ids,
                'value': `@float(1000, 9999, ${number}, ${number})`
            }).data
    });
      mockData = {
        tableFields: [
            {
                id: '00204087',
                title: '上市前/上市后',
                title_en: 'Pre-IPO/after Listing',
                type: 'string',
                t_value: '上市前/上市后',
                t_value_en: 'Pre-IPO/after Listing',
            },
            {
                id: '00204088',
                title: '报表格式',
                title_en: 'Report Format',
                type: 'string',
                t_value: '报表格式',
                t_value_en: 'Report Format',
            },
            {
                id: '00204089',
                title: '报表类型',
                title_en: 'Report Type',
                type: 'string',
                space: '0',
                t_value: '报表类型',
                t_value_en: 'Report Type',
            },
            {
                id: '00204090',
                title: '一、经营活动产生的现金流量：',
                title_en: '1.Cash Flows From Operating Activities',
                type: 'string',
                is_group: 'true',
                children: ['00204091', '00204092', '00204098', '002040102'],
                level: '0',
                bold: '1',
                space: '0',
                t_value: '一、经营活动产生的现金流量：',
                t_value_en: '1.Cash Flows From Operating Activities',
            },
            {
                id: '00204091',
                title: '客户存款和同业存放款项净增加额',
                title_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                isPicture: '1',
                pciInd: '1',
                level: '1',
                hcwidth: '1060',
                hcheight: '672',
                backTestUrl: 'http://xxx.xxx.xx',
                space: '4',
                t_value: '客户存款和同业存放款项净增加额',
                t_value_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities'
            },
            {
                id: '00204098',
                title: '户存款和同业存放款项净增加额',
                title_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                isPicture: '1',
                pciInd: '1',
                level: '1',
                hcwidth: '1060',
                hcheight: '672',
                backTestUrl: 'http://xxx.xxx.xx',
                space: '4',
                t_value: '客户存款和同业存放款项净增加额',
                t_value_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities'
            },
            {
                id: '00204092',
                title: '经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency, urlnew',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                is_group: 'true',
                children: ['00204093', '00204099'],
                parent: '00204090',
                level: '1',
                space: '4',
                t_value: '经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '00204093',
                title: '其中1：经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                level: '2',
                parent: '00204092',
                space: '6',
                t_value: '其中1：经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '00204099',
                title: '其中2：经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                level: '2',
                parent: '00204092',
                space: '6',
                t_value: '其中2：经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '002040102',
                title: '叁经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency, urlnew',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                is_group: 'true',
                children: ['002040103', '002040109'],
                parent: '00204090',
                level: '1',
                space: '4',
                t_value: '叁经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '002040103',
                title: '叁其中1：经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                level: '2',
                parent: '002040102',
                space: '6',
                t_value: '叁其中1：经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '002040109',
                title: '叁其中2：经营活动现金流入小计',
                title_en: 'Net Increase in Deposits (Total Balance Items)',
                type: 'currency',
                popchart: '1',
                currency: 'cny',
                unit: '元',
                unit_en: 'Yuan',
                unit_title: '元',
                unit_title_en: 'Yuan',
                level: '2',
                parent: '002040102',
                space: '6',
                t_value: '叁其中2：经营活动现金流入小计',
                t_value_en: 'Net Increase in Deposits (Total Balance Items)'
            },
            {
                id: '00204182',
                title: '会计师事务所',
                title_en: '会计师事务所',
                type: 'string',
                space: '0',
                t_value: '会计师事务所',
                t_value_en: '会计师事务所'
            },
        ],
        tableHeads: [
            {
                id: '1',
                istable: 'false',
                t_value: '2017 一季报',
                t_value_en: '2017 Q1 Report',
                perioddate: '2017-03-31'
            },
            {
                id: '2',
                istable: 'false',
                t_value: '2017 一季报',
                t_value_en: '2017 Q1 Report',
                perioddate: '2017-03-31'
            },
            {
                id: '3',
                istable: 'false',
                t_value: '2016 年报',
                t_value_en: '2016 Annual Reports',
                perioddate: '2016-12-31'
            },
            {
                id: '4',
                istable: 'false',
                t_value: '2016 年报',
                t_value_en: '2016 Annual Reports',
                perioddate: '2016-12-31'
            },
        ],
        tableBody: [
            [
                // 数目对应tableHeads长度
                {
                    id: '00204087', // 对应 tableFields 相对索引 id
                    value: '上市后'
                },
                {
                    id: '00204087', // 对应 tableFields 相对索引 id
                    value: '上市后'
                },
                {
                    id: '00204087', // 对应 tableFields 相对索引 id
                    value: '上市后'
                },
                {
                    id: '00204087', // 对应 tableFields 相对索引 id
                    value: '上市后'
                },
            ],
            [
                // 数目对应tableHeads长度
                {
                    id: '00204088', // 对应 tableFields 相对索引 id
                    value: '商业银行'
                },
                {
                    id: '00204088', // 对应 tableFields 相对索引 id
                    value: '商业银行'
                },
                {
                    id: '00204088', // 对应 tableFields 相对索引 id
                    value: '商业银行'
                },
                {
                    id: '00204088', // 对应 tableFields 相对索引 id
                    value: '商业银行'
                },
            ],
            [
                // 数目对应tableHeads长度
                {
                    id: '00204089', // 对应 tableFields 相对索引 id
                    value: '合并'
                },
                {
                    id: '00204089', // 对应 tableFields 相对索引 id
                    value: '母公司'
                },
                {
                    id: '00204089', // 对应 tableFields 相对索引 id
                    value: '合并调整'
                },
                {
                    id: '00204089', // 对应 tableFields 相对索引 id
                    value: '母公司调整'
                },
            ],
            [
                {
                    id: '00204090',
                    value: '18663000000.0000'
                },
                {
                    id: '00204090',
                    value: '18663000000.0000'
                },
                {
                    id: '00204090',
                    value: '18663000000.0000'
                },
                {
                    id: '00204090',
                    value: '18663000000.0000'
                },
            ],
            [
                {
                    id: '00204091',
                    value: '18663000000.0000'
                },
                {
                    id: '00204091',
                    value: '18663000000.0000'
                },
                {
                    id: '00204091',
                    value: '18663000000.0000'
                },
                {
                    id: '00204091',
                    value: '18663000000.0000'
                },
            ],
            [
                {
                    id: '00204098',
                    value: '18663000000.0000'
                },
                {
                    id: '00204098',
                    value: '18663000000.0000'
                },
                {
                    id: '00204098',
                    value: '18663000000.0000'
                },
                {
                    id: '00204098',
                    value: '18663000000.0000'
                },
            ],
            [
                // 数目对应tableHeads长度
                // urlnew 指定数据格式
                {
                    id: '00204092',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '35260000000.0000'
                },
                {
                    id: '00204092',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '25260000000.0000'
                },
                {
                    id: '00204092',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '15260000000.0000'
                },
                {
                    id: '00204092',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '33330000000.0000'
                },
            ],
            [
                {
                    id: '00204093',
                    value: '18663000000.0000'
                },
                {
                    id: '00204093',
                    value: '18663000000.0000'
                },
                {
                    id: '00204093',
                    value: '18663000000.0000'
                },
                {
                    id: '00204093',
                    value: '18663000000.0000'
                },
            ],
            [
                {
                    id: '00204099',
                    value: '18663000000.0000'
                },
                {
                    id: '00204099',
                    value: '18663000000.0000'
                },
                {
                    id: '00204099',
                    value: '18663000000.0000'
                },
                {
                    id: '00204099',
                    value: '18663000000.0000'
                },
            ],
            [
                // 数目对应tableHeads长度
                // urlnew 指定数据格式
                {
                    id: '002040102',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '35260000000.0000'
                },
                {
                    id: '002040102',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '25260000000.0000'
                },
                {
                    id: '002040102',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '15260000000.0000'
                },
                {
                    id: '002040102',
                    url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
                    type: 'xml',
                    value: '33330000000.0000'
                },
            ],
            [
                {
                    id: '002040103',
                    value: '18663000000.0000'
                },
                {
                    id: '002040103',
                    value: '18663000000.0000'
                },
                {
                    id: '002040103',
                    value: '18663000000.0000'
                },
                {
                    id: '002040103',
                    value: '18663000000.0000'
                },
            ],
            [
                {
                    id: '002040109',
                    value: '18663000000.0000'
                },
                {
                    id: '002040109',
                    value: '18663000000.0000'
                },
                {
                    id: '002040109',
                    value: '18663000000.0000'
                },
                {
                    id: '002040109',
                    value: '18663000000.0000'
                },
            ],
            [
                // 数目对应tableHeads长度
                {
                    id: '00204182',
                    value: '普华永道中天会计师事务所(特殊普通合伙)'
                },
                {
                    id: '00204182',
                    value: ''
                },
                {
                    id: '00204182',
                    value: ''
                },
                {
                    id: '00204182',
                    value: '普华永道中天会计师事务所(特殊普通合伙)'
                },
            ]
        ]
    };
    */
    var mockData = {};

    var chunk = function chunk(arr, count) {
        if (count == null || count < 1) return [];
        var result = [];
        var i = 0,
            length = arr.length;
        while (i < length) {
            result.push(Array.prototype.slice.call(arr, i, i += count));
        }
        return result;
    };

    // 线上真实数据和伪真实数据不用做chunk，开发的mock数据要做chunk
    // mockData.tableBody=chunk(mockData.tableBody, number);

    console.log(JSON.stringify(mockData, null, 4));

    // var mockDataFirst = {
    //     tableFields: [
    //         {
    //             id: '00204087',
    //             title: '上市前/上市后',
    //             title_en: 'Pre-IPO/after Listing',
    //             type: 'string',
    //             t_value: '上市前/上市后',
    //             t_value_en: 'Pre-IPO/after Listing',
    //         },
    //         {
    //             id: '00204088',
    //             title: '指标类型',
    //             title_en: 'Report Format',
    //             type: 'string',
    //             t_value: '指标类型',
    //             t_value_en: 'Report Format',
    //         },
    //         {
    //             id: '00204089',
    //             title: '时间区间',
    //             title_en: 'Report Type',
    //             type: 'string',
    //             space: '0',
    //             t_value: '时间区间',
    //             t_value_en: 'Report Type',
    //         },
    //         {
    //             id: '00204090',
    //             title: '一、经营活动产生的现金流量：',
    //             title_en: '1.Cash Flows From Operating Activities',
    //             type: 'string',// 无数据只展示标题
    //             is_group: 'true',// 是否伸缩分级标识
    //             children: ['00204091', '00204092', '00204098', '002040102'],// 伸缩层级子集，不包括孙集
    //             level: '0',// 伸缩层级 0顶级 | 1中级 | 2最低级 ，
    //             bold: '1',// 加粗
    //             space: '0',// 行前空格数
    //             t_value: '一、经营活动产生的现金流量：',
    //             t_value_en: '1.Cash Flows From Operating Activities',
    //         },
    //         {
    //             id: '00204091',
    //             title: '客户存款和同业存放款项净增加额',
    //             title_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities',
    //             type: 'currency',
    //             popchart: '1',// 是否可查看对应可视化图例 1可查看| 0不可查看
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             isPicture: '1',
    //             pciInd: '1',
    //             level: '1',
    //             hcwidth: '1060',
    //             hcheight: '672',
    //             backTestUrl: 'http://xxx.xxx.xx',
    //             space: '4',
    //             t_value: '客户存款和同业存放款项净增加额',
    //             t_value_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities'
    //         },
    //         {
    //             id: '00204098',
    //             title: '户存款和同业存放款项净增加额',
    //             title_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities',
    //             type: 'currency',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             isPicture: '1',
    //             pciInd: '1',
    //             level: '1',
    //             hcwidth: '1060',
    //             hcheight: '672',
    //             backTestUrl: 'http://xxx.xxx.xx',
    //             space: '4',
    //             t_value: '客户存款和同业存放款项净增加额',
    //             t_value_en: 'Net Increase in Deposits Others Cash Flows From Operating Activities'
    //         },
    //         {
    //             id: '00204092',
    //             title: '经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency, urlnew',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             is_group: 'true',
    //             children: ['00204093', '00204099'],
    //             parent: '00204090',
    //             level: '1',
    //             space: '4',
    //             t_value: '经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '00204093',
    //             title: '其中1：经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             level: '2',
    //             parent: '00204092',
    //             space: '6',
    //             t_value: '其中1：经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '00204099',
    //             title: '其中2：经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             level: '2',
    //             parent: '00204092',
    //             space: '6',
    //             t_value: '其中2：经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '002040102',
    //             title: '叁经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency, urlnew',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             is_group: 'true',
    //             children: ['002040103', '002040109'],
    //             parent: '00204090',
    //             level: '1',
    //             space: '4',
    //             t_value: '叁经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '002040103',
    //             title: '叁其中1：经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             level: '2',
    //             parent: '002040102',
    //             space: '6',
    //             t_value: '叁其中1：经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '002040109',
    //             title: '叁其中2：经营活动现金流入小计',
    //             title_en: 'Net Increase in Deposits (Total Balance Items)',
    //             type: 'currency',
    //             popchart: '1',
    //             currency: 'cny',
    //             unit: '元',
    //             unit_en: 'Yuan',
    //             unit_title: '元',
    //             unit_title_en: 'Yuan',
    //             level: '2',
    //             parent: '002040102',
    //             space: '6',
    //             t_value: '叁其中2：经营活动现金流入小计',
    //             t_value_en: 'Net Increase in Deposits (Total Balance Items)'
    //         },
    //         {
    //             id: '00204182',
    //             title: '会计师事务所',
    //             title_en: '会计师事务所',
    //             type: 'string',
    //             space: '0',
    //             t_value: '会计师事务所',
    //             t_value_en: '会计师事务所'
    //         },
    //     ],
    //     tableHeads: [
    //         {
    //             id: '1',
    //             istable: 'false',
    //             t_value: '2017 一月报',
    //             t_value_en: '2017 Q1 Report',
    //             perioddate: '2017-03-31'
    //         },
    //         {
    //             id: '2',
    //             istable: 'false',
    //             t_value: '2017 一季报',
    //             t_value_en: '2017 Q1 Report',
    //             perioddate: '2017-03-31'
    //         },
    //         {
    //             id: '3',
    //             istable: 'false',
    //             t_value: '2016 年报',
    //             t_value_en: '2016 Annual Reports',
    //             perioddate: '2016-12-31'
    //         },
    //         {
    //             id: '4',
    //             istable: 'false',
    //             t_value: '2015 年报',
    //             t_value_en: '2015 Annual Reports',
    //             perioddate: '2015-12-31'
    //         },
    //     ],
    //     tableBody: [
    //         [
    //             // 数目对应tableHeads长度
    //             {
    //                 id: '00204087', // 对应 tableFields 相对索引 id
    //                 value: '上市后'
    //             },
    //             {
    //                 id: '00204087', // 对应 tableFields 相对索引 id
    //                 value: '上市后'
    //             },
    //             {
    //                 id: '00204087', // 对应 tableFields 相对索引 id
    //                 value: '上市后'
    //             },
    //             {
    //                 id: '00204087', // 对应 tableFields 相对索引 id
    //                 value: '上市后'
    //             },
    //         ],
    //         [
    //             // 数目对应tableHeads长度
    //             {
    //                 id: '00204088', // 对应 tableFields 相对索引 id
    //                 value: '当期值'
    //             },
    //             {
    //                 id: '00204088', // 对应 tableFields 相对索引 id
    //                 value: '当期值'
    //             },
    //             {
    //                 id: '00204088', // 对应 tableFields 相对索引 id
    //                 value: '当期值'
    //             },
    //             {
    //                 id: '00204088', // 对应 tableFields 相对索引 id
    //                 value: '当期值'
    //             },
    //         ],
    //         [
    //             // 数目对应tableHeads长度
    //             {
    //                 id: '00204089', // 对应 tableFields 相对索引 id
    //                 value: '一个月'
    //             },
    //             {
    //                 id: '00204089', // 对应 tableFields 相对索引 id
    //                 value: '一个月'
    //             },
    //             {
    //                 id: '00204089', // 对应 tableFields 相对索引 id
    //                 value: '一个月'
    //             },
    //             {
    //                 id: '00204089', // 对应 tableFields 相对索引 id
    //                 value: '一个月'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '00204090',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204090',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204090',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204090',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '00204091',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204091',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204091',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204091',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '00204098',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204098',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204098',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204098',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             // 数目对应tableHeads长度
    //             // urlnew 指定数据格式
    //             {
    //                 id: '00204092',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '35260000000.0000'
    //             },
    //             {
    //                 id: '00204092',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '25260000000.0000'
    //             },
    //             {
    //                 id: '00204092',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '15260000000.0000'
    //             },
    //             {
    //                 id: '00204092',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '33330000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '00204093',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204093',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204093',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204093',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '00204099',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204099',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204099',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '00204099',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             // 数目对应tableHeads长度
    //             // urlnew 指定数据格式
    //             {
    //                 id: '002040102',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '35260000000.0000'
    //             },
    //             {
    //                 id: '002040102',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '25260000000.0000'
    //             },
    //             {
    //                 id: '002040102',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '15260000000.0000'
    //             },
    //             {
    //                 id: '002040102',
    //                 url: 'iFindService/f9Stock/sub-table/stock?seq=1133026&thscode=600000.SH&name=%E7%BB%8F%E8%90%A5%E6%B4%BB%E5%8A%A8%E7%8E%B0%E9%87%91%E6%B5%81%E5%85%A5%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129',
    //                 type: 'xml',
    //                 value: '33330000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '002040103',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040103',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040103',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040103',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             {
    //                 id: '002040109',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040109',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040109',
    //                 value: '18663000000.0000'
    //             },
    //             {
    //                 id: '002040109',
    //                 value: '18663000000.0000'
    //             },
    //         ],
    //         [
    //             // 数目对应tableHeads长度
    //             {
    //                 id: '00204182',
    //                 value: '普华永道中天会计师事务所(特殊普通合伙)'
    //             },
    //             {
    //                 id: '00204182',
    //                 value: ''
    //             },
    //             {
    //                 id: '00204182',
    //                 value: ''
    //             },
    //             {
    //                 id: '00204182',
    //                 value: '普华永道中天会计师事务所(特殊普通合伙)'
    //             },
    //         ]
    //     ]
    // };

    mockData.tableBody = transpose(mockData.tableBody);
    return mockData;
};

/**
 * tableHeads不用处理，直接用服务端返回的数据
 * tableFields不用处理，直接用服务端返回的数据
 * tableBody要遍历处理，得到以下格式的数据
 *   [
 *        [
 *            {id: "00204087", value: "上市后"},
 *            {id: "00204088", value: "商业银行"},
 *            {id: "00204089", value: "合并"},
 *            {id: "00204090", value: "161351000000.0000"},
 *            {id: "00204091", value: ""},
 *            {id: "00204092", url: "iFindService/f9Stock/sub-table/stock?seq=1133026&t…%E7%89%B9%E6%AE%8A%E7%A7%91%E7%9B%AE&table=STK129", type: "xml", value: "35260000000.0000"},
 *            {id: "00204093", value: "161351000000.0000"}
 *        ],
 *   ]
 **/
// p.transformTableBody = function(data) {
//     var actTableBody = [];
//     for (var i=0, L=data.tableHeads.length; i<L; i++) {
//         // 限定外围 4
//         // 限定内围 8
//         var origin = data.tableBody;
//         // 组装容器 [[], [], [], []]
//         actTableBody[i] = [];
//         // 填充数据 [[{00, 10, 20, 30, 40, 50, 60, 70}], [{01, 11, 21, 31, 41, 51, 61, 71}]]
//         for (var j=0, K=origin.length; j<K; j++) {
//             actTableBody[i].push(data.tableBody[j][i]);
//         }
//     }
//     return actTableBody;
// }

/**
 * 重置筛选按钮有效性
 */
p.resetBtnAble = function(b) {
    Array.prototype.slice.call(document.querySelectorAll('.o-tools-scope-btns-span')).map(function(d) {
        d.setAttribute('data-able', b);
    });
    Array.prototype.slice.call(document.querySelectorAll('.o-tools-kpis-span')).map(function(d) {
        d.setAttribute('data-able', b);
    });
    Array.prototype.slice.call(document.querySelectorAll('.o-tools-year-select')).map(function(d) {
        if (b === 'false') {
            d.setAttribute('disabled', 'disabled');
        } else {
            d.removeAttribute('disabled');
        }
    });
};

/** 
 * 展示无表格数据打底
 */
p.showEmpty = function(msg) {
    var emptyNode = document.querySelector('.j-frame-empty');
    if (!emptyNode) {
        emptyNode = createNode('div', 'o-frame-empty j-frame-empty', msg || '');
        document.querySelector('.j-toggle-table').appendChild(emptyNode);
    } else {
        emptyNode.style.display = 'block';
        emptyNode.innerHTMTL = msg || emptyNode.innerHTML;
    }
    document.querySelector('.j-toggle-table .fixed-always').style.display = 'none';
    document.querySelector('.j-toggle-table .fixed-head').style.display = 'none';
    document.querySelector('.j-toggle-table .fixed-title').style.display = 'none';
    document.querySelector('.j-toggle-table .table-frame').style.display = 'none';
};

/** 
 * 隐藏无表格数据打底，展示数据表格
 */
p.hideEmpty = function() {
    document.querySelector('.j-toggle-table .fixed-always').style.display = 'block';
    document.querySelector('.j-toggle-table .fixed-head').style.display = 'block';
    document.querySelector('.j-toggle-table .fixed-title').style.display = 'block';
    document.querySelector('.j-toggle-table .table-frame').style.display = 'block';
    if (document.querySelector('.j-frame-empty')) {
        document.querySelector('.j-frame-empty').style.display = 'none';
    }
};

/**
 * 初始化
 */
p.init = function() {
    console.time('tools');
    if (requestThscode.indexOf('.OC') > -1) {
        this.tools.otherChannelsSelector = false;
    }
    this.createTools(this.toolbar);

    this.mask = this.createShowLayout();
    console.timeEnd('tools');
    console.time('parse');
    this.resetBtnAble('false');
    // 解析xml
    if (this.xmlString) {
        this.xmlParse(this.xmlString);
    } else {
        // 重置数据并渲染表格
        if (this.options.data && this.options.data.tableBody && this.options.data.tableFields && this.options.data.tableHeads) {
            this.options.data.tableBody = transpose(this.options.data.tableBody);
            this.setTablePartValues(this.options.data);
        } else {
            // this.setTablePartValues(this.mock());
            this.renderTable({
                payload: function(data) {
                    // if (data.tableHeads) {
                    this.tableFields = data.tableFields;
                    this.tableHeads = data.tableHeads;
                    this.tableBody = data.tableBody;
                    this.table = new FlexTable(this.tableContainer, {
                        tableFields: this.tableFields,
                        tableHeads: this.tableHeads,
                        tableBody: this.tableBody
                    }, {
                        // 初始化筛选值起始年份
                        beginYear: this.tools.defBeginYear,
                        // 初始化筛选值截止年份
                        endYear: this.tools.defEndYear,
                        // thscode
                        thscode: requestThscode
                    });

                    // this.table.init();

                    // setTimeout(() => {
                    //     if ((this.table && this.table.tableHeads.length !== 0 && this.table.tableFields.length !== 0
                    //         && this.table.tableBody.length !== 0)) {
                    this.resetBtnAble('true');
                    //     }
                    // }, 0);
                    // } else {
                    // alert('对不起，该公司暂无您所查数据');
                    if (!data.tableHeads) {
                        this.showEmpty('对不起，该公司暂无您所查数据');
                    }
                    // }
                    this.table.init();
                }.bind(this)
            });
        }
    }
    console.timeEnd('parse');
};

/**
 * 导出逻辑
 */
p.getExport = function getExcel(type, thscode, syear, eyear, tjpl, zblx) {
    // /thsft/iFindService/f9Stock/stock54/download-com-business-data?thscode=600115.SH&syear=2012&eyear=2017&tjpl=月&zblx=当期值
    var http_url = document.location.protocol + "//" + document.location.host;
    var c = document.createElement('a');
    var excelUrl = 'javascript:;';
    if (type === 'xls') {
        if (this.tools.defOtherChannel === '0') {
            excelUrl = http_url + '/thsft/iFindService/f9Stock/stock54/download-com-business-data?thscode=' + thscode + '&syear=' + syear + '&eyear=' + eyear + '&tjpl=' + tjpl + '&zblx=' + zblx;
        } else if (this.tools.defOtherChannel === '2') {
            excelUrl = http_url + '/thsft/iFindService/f9Stock/stock54/download-institutional-perspective?thscode=' + thscode;
        }
    }

    c.href = excelUrl;
    document.body.appendChild(c);
    c.click();
    c.remove();
    c = null;
};

/**
 * 遮罩层
 * loading状态
 */
p.createShowLayout = function() {
    var frage = document.createDocumentFragment();
    var layout = document.createElement('div');
    layout.id = 'J_layout';
    layout.classList.add('o-layout');
    var message = document.createElement('div');
    message.id = 'J_layoutMessage';
    message.classList.add('o-layout-message');
    frage.appendChild(layout);
    frage.appendChild(message);
    document.body.appendChild(frage);
    var defaultOptions = {
        msg: '正在处理...'
    };
    return {
        show: function show() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions.msg;

            layout.style.display = 'block';
            message.style.display = 'block';
            message.innerHTML = msg;
        },
        hide: function hide() {
            layout.style.display = 'none';
            message.style.display = 'none';
            message.innerHTML = '';
        },
        instruct: function instruct() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { action: 'show', delay: -1, cb: function cb() {} },
                _ref2$action = _ref2.action,
                action = _ref2$action === undefined ? 'show' : _ref2$action,
                _ref2$delay = _ref2.delay,
                delay = _ref2$delay === undefined ? -1 : _ref2$delay,
                _ref2$payload = _ref2.payload,
                payload = _ref2$payload === undefined ? { msg: defaultOptions.msg } : _ref2$payload,
                _ref2$cb = _ref2.cb,
                cb = _ref2$cb === undefined ? function() {} : _ref2$cb;

            var self = this;
            var donow = function donow(action) {
                self[action](payload.msg) && cb();
            };
            if (delay !== -1) {
                setTimeout(function() {
                    donow(action);
                }, delay);
            } else {
                donow(action);
            }
        }
    };
};

p.renderTable = function(_ref3) {
    var payload = _ref3.payload;

    if (!payload) {
        payload = function(data) {
            // updateOrigin时用到的data不需要经过transpose转换
            if (data.tableHeads) {
                this.hideEmpty();
                this.table.updateOrigin(data);
            } else {
                // alert('对不起，该公司暂无您所查数据');
                this.showEmpty('对不起，该公司暂无您所查数据');
            }
        }.bind(this);
    }
    var syear = document.querySelector('#J_toolsBeginYearSelect').value;
    var eyear = document.querySelector('#J_toolsEndYearSelect').value;
    syear = parseInt(syear);
    eyear = parseInt(eyear);
    var middleAry = [syear, eyear];
    /**
     * 不限用户设定起始时间大小，主动掰正逻辑
     * e.g: 2017 至 2015 [等同于] 2015 至 2017
     * */
    if (syear - eyear > 0) {
        var eyear = middleAry[0],
            syear = middleAry[1];
    }
    this.ajax({
        url: '/thsft/iFindService/f9Stock/stock54/ajax-business-data?thscode=' + (requestThscode || '300033.SZ') + '&tjpl=' + this.tools.defScope + '&zblx=' + this.tools.defKpi + '&syear=' + syear + '&eyear=' + eyear,
        method: 'get',
        payload: payload
    });
};

/**
 * 更改attribute值
 * @param {DOM} dom 元素
 * @param {String} attr 属性
 * @param {String} value 值
 */
p.setAttr = function(dom, attr, value) {
    if (!dom || !attr) return false;

    function change(d, v) {
        if (v) {
            d.setAttribute(attr, v);
        } else {
            d.removeAttribute(attr);
        }
    }
    if (dom.children.length > 0) {
        Array.prototype.slice.call(dom.children).map(function(d) {
            change(d, value);
        });
    } else {
        change(dom, value);
    }
};
/**
 * 控制显隐
 * @param {String} cls 元素class
 * @param {String} index 元素index
 */
p.toggleTable = function(cls) {
    var self = this;
    var dom = document.querySelectorAll(cls);
    return {
        show: function show(index) {
            var index = parseInt(index);
            Array.prototype.slice.call(dom).map(function(item, key) {
                if (key === index) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    };
};

/**
 * 工具栏-其他频道筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createOtherChannelsSelector = function(toolContainer) {
    var div = createNode('div', 'o-tools-year-wrapper');
    var btns = createNode('div', 'o-tools-other-channels', '', { id: "J_toolsOtherChannels" });
    var options = this.tools.otherChannels;
    var dLength = this.tools.otherChannels.length;
    var defaultValue = this.tools.defOtherChannel || 0;
    var optElement = null;
    div.appendChild(btns);
    for (var i = 0; i < dLength; i += 1) {
        if (options[i]) {
            btns.appendChild(createNode('span', 'o-tools-other-channels-span', options[i], { 'data-selected': defaultValue == i, 'id': '' + i }));
        }
    }

    btns.addEventListener('click', function(event) {
        //   this.table.setTableDec(sel.value);
        log(event.target.innerText, { color: 'red' });
        this.setAttr(event.target.parentElement, 'data-selected', false);
        this.setAttr(event.target, 'data-selected', true);
        var showTables = this.toggleTable('.j-toggle-table');
        var id = event.target.getAttribute('id');
        this.tools.defOtherChannel = id;
        showTables.show(id);
        this.resetBtnAble('false');
        if (id === '0') {
            //modified at 20180419
            // this.table.tableReflow();
            this.resetBtnAble('true');
        }
    }.bind(this));

    return div;
};

/**
 * 工具栏-导出筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createExportSelector = function(toolContainer) {
    var self = this;
    // function getText(v) {
    //     var result = '';
    //     switch (v) {
    //         case 'xls':
    //             result = '导出Excel';
    //             break;
    //         case 'pdf':
    //             result = '导出到PDF';
    //             break;
    //         default:
    //             result = '导出数据';
    //             break;
    //     }
    //     return result;
    // }
    /**
     * <div class="o-tools-export-selects" id="J_toolsExportSelects">
            <span>导出数据
                <span class="c-selects-arrow"><b></b></span>
            </span>
            <ul style="display: none;">
                <li>
                    <a value="xls">导出到EXCEL</a>
                </li>
                <li>
                    <a value="pdf">导出到PDF</a>
                </li>
            </ul>
        </div>
     */
    function download(type) {
        //thscode, syear, eyear, tjpl, zblx
        var syear = document.querySelector('#J_toolsBeginYearSelect').value;
        var eyear = document.querySelector('#J_toolsEndYearSelect').value;
        syear = parseInt(syear);
        eyear = parseInt(eyear);
        var middleAry = [syear, eyear];
        /**
         * 不限用户设定起始时间大小，主动掰正逻辑
         * e.g: 2017 至 2015 [等同于] 2015 至 2017
         * */
        if (syear - eyear > 0) {
            var eyear = middleAry[0],
                syear = middleAry[1];
        }
        self.getExport(type || 'xls', requestThscode, syear, eyear, self.tools.defScope, self.tools.defKpi);
    }
    var div = createNode('div', 'o-tools-export-wrapper');
    var sel = createNode('div', 'o-tools-export-selects', '', { id: "J_toolsExportSelects" });
    var text = createNode('a', 'c-selects-text', '导出Excel', { value: 'xls' });
    sel.appendChild(text);
    div.appendChild(sel);
    sel.addEventListener('click', function(event) {
        download(event.target.getAttribute('value'));
    });
    /*
    var text = createNode('span', 'c-selects-text', '导出数据');
    var arrowSpan = createNode('span', 'c-selects-arrow');
    var arrowB = createNode('b');
    arrowSpan.appendChild(arrowB);
    text.appendChild(arrowSpan);
    sel.appendChild(text);
    var ul = createNode('ul', 'c-selects-items', '', {style: 'display: none'});
    sel.appendChild(ul);
    var options = this.tools.exportSelects;
    var dLength = this.tools.exportSelects.length;
    var defaultValue = this.tools.defExport || '';
    var optElement = null;
    div.appendChild(sel);
    for (var i = 0; i < dLength; i += 1) {
        var li = createNode('li', 'c-selects-item');
        li.appendChild(createNode('a', null, getText(options[i]), {value: options[i], selected: defaultValue == options[i]}));
        ul.appendChild(li);
    }
    function hideUL() {
        document.querySelector('.c-selects-items').style.display = 'none';
        document.querySelector('.o-tools-export-wrapper').classList.remove('hover');
    }
      sel.addEventListener('click', function(event) {
        // debugger;
        if (event.target.nodeName !== 'A') {
            document.querySelector('.c-selects-items').style.display = 'block';
            document.querySelector('.o-tools-export-wrapper').classList.add('hover');
        } else if (event.target.nodeName === 'A') {
            log(event.target.getAttribute('value'), {color: 'green'});
            hideUL();
            download(event.target.getAttribute('value'));
        }
          // debugger;
    })
      sel.addEventListener('mouseleave', function(event) {
        // debugger;
        if (event.target.nodeName !== 'A') {
            hideUL();
        }
        // debugger;
    }) 
    */

    // sel.addEventListener('change', function(event) {
    //     log(sel.value, {color: 'red'});
    //     this.tools.defExport = sel.value;
    // }.bind(this));

    return div;
};

/**
 * 工具栏-指标类型筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createKpisSelector = function(toolContainer) {
    var div = createNode('div', 'o-tools-year-wrapper');
    var btns = createNode('div', 'o-tools-kpis', '指标类型：', { id: "J_toolsKpis" });
    var options = this.tools.kpis;
    var dLength = this.tools.kpis.length;
    var defaultValue = this.tools.defKpi || 1;
    var optElement = null;
    div.appendChild(btns);
    for (var i = 0; i < dLength; i += 1) {
        btns.appendChild(createNode('span', 'o-tools-kpis-span', options[i], { 'data-selected': defaultValue === i }));
    }
    this.tools.defKpi = options[defaultValue];

    btns.addEventListener('click', function(event) {
        if (event.target.classList.contains('o-tools-kpis-span')) {
            //   this.table.setTableDec(sel.value);
            log(event.target.innerText, { color: 'red' });
            if (this.checkClickAble(event)) {
                this.setAttr(event.target.parentElement, 'data-selected', false);
                this.setAttr(event.target, 'data-selected', true);
                // 前端不处理数据逻辑，统一发请求给服务端获取筛选数据
                // this.table.filterTableSource({
                //     kpis: [event.target.innerText]
                // });
                this.tools.defKpi = event.target.innerText;
                // 改变flextable状态值state
                this.table.changeState('kpis', [this.tools.defKpi]);
                this.renderTable(event.target.innerText);
            } else {
                log('不可操作');
            }
        }
    }.bind(this));

    return div;
};

/**
 * 工具栏-统计频率筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createScopesBtnsSelector = function(toolContainer) {
    var div = createNode('div', 'o-tools-year-wrapper');
    var btns = createNode('div', 'o-tools-scope-btns', '统计频率：', { id: "J_toolsScopeBtns" });
    var options = this.tools.scopesBtns;
    var dLength = this.tools.scopesBtns.length;
    var defaultValue = this.tools.defScope || 0;
    var optElement = null;
    div.appendChild(btns);
    for (var i = 0; i < dLength; i += 1) {
        btns.appendChild(createNode('span', 'o-tools-scope-btns-span', options[i], { 'data-selected': defaultValue === i }));
    }
    this.tools.defScope = options[0];

    btns.addEventListener('click', function(event) {
        if (event.target.classList.contains('o-tools-scope-btns-span')) {
            //   this.table.setTableDec(sel.value);
            log(event.target.innerText, { color: 'red' });
            if (this.checkClickAble(event)) {
                this.setAttr(event.target.parentElement, 'data-selected', false);
                this.setAttr(event.target, 'data-selected', true);
                // this.table.filterTableSource({
                //     scopesBtns: [event.target.innerText]
                // });
                this.tools.defScope = event.target.innerText;
                // 改变flextable状态值state
                this.table.changeState('scopesBtns', [this.tools.defScope]);
                this.renderTable(event.target.innerText);
            } else {
                log('不可操作');
            }
        }
    }.bind(this));

    return div;
};

/**
 * 工具栏-时间筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createBeginYearSelector = function(toolContainer) {
    var div = createNode('div', 'o-tools-year-wrapper u-no-marign');
    var label = createNode('label', 'o-tools-year-label', '统计范围：');
    var sel = createNode('select', 'o-tools-year-select', '', { id: "J_toolsBeginYearSelect" });
    var options = this.tools.beginYears;
    var dLength = this.tools.beginYears.length;
    var defaultValue = this.tools.defBeginYear || options[4] || 0;
    var optElement = null;
    div.appendChild(label);
    div.appendChild(sel);
    for (var i = 0; i < dLength; i += 1) {
        sel.appendChild(createNode('option', null, options[i], { value: options[i], selected: defaultValue == options[i] }));
    }
    if (!this.tools.defBeginYear) {
        this.tools.defBeginYear = options[0];
    }

    sel.addEventListener('change', function(event) {
        var _this = this;

        //   this.table.setTableDec(sel.value);
        log(sel.value, { color: 'red' });
        var validate = function validate() {
            var endYear = _this.table.state.endYear;
            return parseInt(sel.value) >= parseInt(endYear);
        };
        if (validate()) {
            // this.table.filterTableSource({
            //     beginYear: sel.value
            // });
            this.table.changeState('beginYear', sel.value);
            this.tools.defBeginYear = sel.value;
            this.renderTable('beginYear');
        } else {
            alert('截止时间必须小于起始时间');
            sel.value = this.table.state.beginYear;
        }
    }.bind(this));

    return div;
};

/**
 * 工具栏-时间筛选
 * @param {Node} toolContainor
 * @returns {Node}
 */
p.createEndYearSelector = function(toolContainer) {
    var div = createNode('div', 'o-tools-year-wrapper');
    var label = createNode('label', 'o-tools-year-label', '-');
    var sel = createNode('select', 'o-tools-year-select', '', { id: "J_toolsEndYearSelect" });
    var options = this.tools.endYears;
    var dLength = this.tools.endYears.length;
    var defaultValue = this.tools.defEndYear || 0;
    var optElement = null;
    div.appendChild(label);
    div.appendChild(sel);
    for (var i = 0; i < dLength; i += 1) {
        sel.appendChild(createNode('option', null, options[i], { value: options[i], selected: defaultValue == options[i] }));
    }
    if (!this.tools.defEndYear) {
        this.tools.defEndYear = options[0];
    }

    sel.addEventListener('change', function(event) {
        var _this2 = this;

        //   this.table.setTableDec(sel.value);
        log(sel.value, { color: 'red' });
        var validate = function validate() {
            var beginYear = _this2.table.state.beginYear;
            return parseInt(beginYear) >= parseInt(sel.value);
        };
        if (validate()) {
            // this.table.filterTableSource({
            //     endYear: sel.value
            // });
            this.table.changeState('endYear', sel.value);
            this.tools.defEndYear = sel.value;
            this.renderTable('endYear');
        } else {
            alert('截止时间必须小于起始时间');
            sel.value = this.table.state.endYear;
        }
    }.bind(this));

    return div;
};

/**
 * 检测是否能响应click交互
 */
p.checkClickAble = function(e) {
    if (e.target.getAttribute('data-able') === 'false') {
        return;
    }
    return true;
};

/**
 * 生成工具栏
 * @param {Node} dom
 */
p.createTools = function(dom) {
    var opt = this.tools;
    var frag = document.createDocumentFragment();

    // 固定工具配置映射关系
    var optMap = {
        // reloadBtn: this.createReloadBtn,
        // rotateBtn: this.createRotateBtn,
        // decSelector: this.createDecimalSelector,
        // hideBlankRowBtn: this.hideBlankRow,
        // rangeFilter: this.createRangeFilter,
        // unitSelector: this.createUnitConversionSelector
        beginYearsSelector: this.createBeginYearSelector,
        endYearsSelector: this.createEndYearSelector,
        scopesBtnsSelector: this.createScopesBtnsSelector,
        kpisSelector: this.createKpisSelector,
        otherChannelsSelector: this.createOtherChannelsSelector,
        exportSelector: this.createExportSelector
    };

    // xml里提取的筛选项
    var filterOpt = this.tableFiltrs;

    Object.keys(optMap).forEach(function(key, index) {
        if (opt[key]) {
            frag.appendChild(optMap[key].call(this, createNode('div', 'tools-item')));
        }
    }.bind(this));

    // filterOpt.forEach(function(item) {
    //   frag.appendChild(this.createFilterSelector(createNode('div', 'tools-item'), item));
    // }.bind(this));

    dom.appendChild(frag);
};

/**
 * 工具栏-还原按钮
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.createReloadBtn = function(toolContainer) {
    var btn = createNode('button', 'tools-reload-btn', '还原');
    btn.addEventListener('click', function(event) {
        console.log(event);
    });
    toolContainer.appendChild(btn);
    return toolContainer;
};

/**
 * 工具栏-旋转按钮
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.createRotateBtn = function(toolContainer) {
    var btn = createNode('button', 'tools-rotate-btn', '旋转');
    btn.addEventListener('click', function(event) {
        this.table.tableRotate();
    }.bind(this));
    toolContainer.appendChild(btn);
    return toolContainer;
};

/**
 * 工具栏-隐藏空行按钮
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.hideBlankRow = function(toolContainer) {
    var btn = createNode('button', 'tools-rotate-btn', '隐藏空行');
    btn.addEventListener('click', function(event) {
        this.table.hideBlankRow();
    }.bind(this));
    toolContainer.appendChild(btn);
    return toolContainer;
};

/**
 * 工具栏-保留小数位数选择框
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.createDecimalSelector = function(toolContainer) {
    var sel = createNode('select', 'tools-decimal-select');
    var dLength = this.tools.decSelectorLength;
    var defaultValue = this.tools.decSelectorValue;
    var optElement = null;
    var cache = '';
    for (var i = 0; i < dLength; i += 1) {
        cache = Number(0).toFixed(i);
        sel.appendChild(createNode('option', null, cache, { value: i, selected: defaultValue === i }));
    }

    sel.addEventListener('change', function(event) {
        this.table.setTableDec(sel.value);
    }.bind(this));

    return sel;
};

/**
 * 工具栏 -单位转换
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.createUnitConversionSelector = function(toolContainer) {
    var sel = createNode('select', 'tools-unit-select');
    var options = this.tools.unitSelectorOptions;
    var defaultValue = this.tools.unitSelectorDefault;

    for (var i = 0; i < options.length; i += 1) {
        sel.appendChild(createNode('option', null, options[i], { selected: defaultValue === options[i] }));
    }

    sel.addEventListener('change', function(event) {
        this.table.unitConversion(sel.value);
    }.bind(this));

    return sel;
};

/**
 * 工具栏 - 范围选择
 * @param {Node} toolContainer
 * @returns {Node}
 */
p.createRangeFilter = function(toolContainer) {
    var fOpt = this.tableFiltrs;
    var that = this;
    var btn = createNode('button', 'tools-filter-btn', '范围选择');
    // 弹出框
    var box = createNode('div', 'tools-pop-window');

    var btnGroup = createNode('div', 'tools-pop-window-bg');
    // 显示标志
    var showFlag = false;
    // 筛选项（需传到table里）
    var filterOption = {};

    fOpt.forEach(function(e, index) {
        var item = createNode('div', 'tools-pop-window-item');
        var title = createNode('h6', 'tools-pop-window-title');
        var ul = createNode('ul', 'tools-pop-window-ul');

        title.innerText = e.name;

        e.children.forEach(function(child, id) {
            var li = createNode('li', 'tools-pop-window-li');
            var checkbox = createNode('input', 'tools-pop-window-checkbox', null, {
                type: e.name === '时间范围' ? 'radio' : 'checkbox',
                name: 'range-filter-' + index,
                id: 'range-filter-' + index + id,
                value: child.f || child.name,
                checked: e.default === '' || e.default === child.name
            });

            var label = createNode('label', 'tools-pop-window-label', child.name, {
                for: 'range-filter-' + index + id
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            ul.appendChild(li);
        });

        item.appendChild(title);
        item.appendChild(ul);
        box.appendChild(item);
    });

    var confirmBtn = createNode('button', 'tools-pop-window-bg-btn', '确定');
    var cancelBtn = createNode('button', 'tools-pop-window-bg-btn', '取消');

    btnGroup.appendChild(confirmBtn);
    btnGroup.appendChild(cancelBtn);
    box.appendChild(btnGroup);

    // 关闭弹窗
    function closePop() {
        box.remove();
        showFlag = !showFlag;
    }

    // 弹出按钮
    btn.addEventListener('click', function(event) {
        if (showFlag) {
            closePop();
        } else {
            document.body.appendChild(box);
            showFlag = !showFlag;
        }
    });

    // 确认按钮（点击后会格式化筛选数据传给table）
    confirmBtn.addEventListener('click', function() {
        var filters = box.querySelectorAll('ul');
        var results = [];
        filterOption = {};

        Array.prototype.slice.call(filters).forEach(function(e, index) {
            var inputs = e.querySelectorAll('input');
            for (var i in inputs) {
                if (inputs[i].checked) {
                    var value = inputs[i].value;
                    if (/=/.test(value)) {
                        var cache = value.split('=');
                        var key = cache[0].slice(1, cache[0].length - 1);
                        var par = cache[1];
                        if (!filterOption[key]) {
                            filterOption[key] = {};
                        }
                        filterOption[key][cache[1].slice(1, cache[1].length - 1)] = true;
                    } else if (fOpt[index].name === '时间范围') {
                        filterOption[fOpt[index].name] = value;
                    } else if (fOpt[index].name === '报告期') {
                        if (!filterOption[fOpt[index].name]) {
                            filterOption[fOpt[index].name] = [value];
                        } else {
                            filterOption[fOpt[index].name].push(value);
                        }
                    }
                }
            }
        });

        console.log(filterOption);
        closePop();
        that.table.rangeFilter(filterOption);
    });

    // 取消按钮
    cancelBtn.addEventListener('click', closePop);

    return btn;
};
/**
 * 切换请求拿表格数据
 */
p.ajax = function(_ref4) {
    var _ref4$url = _ref4.url,
        url = _ref4$url === undefined ? '/thsft/iFindService/f9Stock/stock54/ajax-business-data' : _ref4$url,
        _ref4$method = _ref4.method,
        method = _ref4$method === undefined ? 'get' : _ref4$method,
        _ref4$data = _ref4.data,
        data = _ref4$data === undefined ? { 'syear': '2015', 'eyear': '2016', 'tjpl': '年', 'zblx': 'current' } : _ref4$data,
        _ref4$responseType = _ref4.responseType,
        responseType = _ref4$responseType === undefined ? 'json' : _ref4$responseType,
        _ref4$validateStatus = _ref4.validateStatus,
        validateStatus = _ref4$validateStatus === undefined ? function(status) {
            return status >= 200 && status < 300; // default
        } : _ref4$validateStatus,
        payload = _ref4.payload;

    var self = this;
    this.mask.show();
    return axios({
        url: url,
        method: method,
        data: data,
        responseType: responseType,
        validateStatus: validateStatus
    }).then(function(response) {
        var result = response;
        if ((result.statusText === 'OK' || result.statusText === '') && result.status === 200) {
            var resultData = result.data;
            if (resultData.errno === 0) {
                payload(resultData.data);
            } else {
                alert(resultData.error);
            }
        }
        self.mask.instruct({ delay: 0, action: 'hide' });
    }).catch(function(error) {
        self.mask.instruct({ delay: 0, action: 'hide' });
        if (error.response) {
            //请求已发出，但服务器使用状态代码进行响应
            //落在2xx的范围之外
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            //在设置触发错误的请求时发生了错误
            console.log('Error', error.message);
        }
    });
};

// /**
// * 工具栏-动态生成筛选块
// * @param {Node} toolContainer
// * @returns {Node}
// */
// p.createFilterSelector = function(toolContainer, option) {
//   var sel = createNode('select', 'tool-filterSelector');
//   var children = option.children;
//   for (var i = 0, l = children.length; i < l; i += 1) {
//     var thisOption = children[i];
//     sel.appendChild(createNode('option', null, thisOption.name, {value: thisOption.f || thisOption.name, selected: option.default === thisOption.name}));
//   }
//
//   return sel;
// }