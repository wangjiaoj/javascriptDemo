  // 表格获取数据时要用到的初始参数
        var thsName = '浦发银行';
        var requestThscode = '600000.SH';
var container = document.getElementById('content')
var tableContainer = container.querySelector('.content-body');
var tableFields = jsonResult.data.tableFields;
var tableHeads = jsonResult.data.tableHeads;
var tableBody = jsonResult.data.tableBody;
var table = new FlexTable(tableContainer, {
                        tableFields: tableFields,
                        tableHeads: tableHeads,
                        tableBody: tableBody
                    }, {
                        // 初始化筛选值起始年份
                        beginYear: 2014,
                        // 初始化筛选值截止年份
                        endYear: 2018,
                        // thscode
                        thscode: '60000'
                    });
                    // {
                    //     // 初始化筛选值起始年份
                    //     beginYear: this.tools.defBeginYear,
                    //     // 初始化筛选值截止年份
                    //     endYear: this.tools.defEndYear,
                    //     // thscode
                    //     thscode: requestThscode
                    // }  
                    
table.init();