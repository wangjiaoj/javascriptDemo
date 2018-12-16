/**
 * flex表格构造函数
 * @construct
 * @param {Node} container table容器
 */
function FlexTable(container, data, options) {
    // 容器
    this.container = container;
    this.fixedAlways = container.querySelector('.fixed-always');
    this.fixedHead = container.querySelector('.fixed-head');
    this.fixedTitle = container.querySelector('.fixed-title');
    this.tableFrame = container.querySelector('.table-frame');
    // this.verticalScrollbar = container.querySelector('.vertical-scrollbar');

    // 原始数据
    this.tableHeads = data.tableHeads;
    this.tableFields = data.tableFields;
    this.tableBody = data.tableBody;

    // 表格固定所需的数据
    // 左侧固定title的宽度，在title列渲染完毕后获取
    this.titleWidth = 0;
    // 每一列table的宽度
    this.tablecellWidth = [];

    // 表格样式
    // 容器最大高度
    // this.containerMaxHeight = 700;
    // 单元格行高
    // this.cellHeight = 30;

    // 基础设置，根据原始数据生成
    this.baseOption = {
        // charts有图
        chartsRows: {},
        // group行可伸缩
        groupRows: {},
        // 加粗行
        boldRows: {},
        // 加粗列
        boldCols: {},
        // 数字行（字符串类型） 文字型居左 数字型居右
        numberRows: {},
        // 数字列
        numberCols: {},
        // 空白行
        blankRow: {},
        // (筛选后)需显示的行
        showRows: {},
        // (筛选后)需显示的列
        showCols: {},
        // 条目筛选行
        itemFilterRows: {},
        // 条目筛选列
        itemFilterCols: {}
    };

    // 状态配置，可以通过接口暴露出去，改变状态并刷新表格
    this.state = {
        // 旋转标志位筛选
        rotateState: true,
        // 保留小数位数筛选
        decLength: 2,
        // 隐藏空白行筛选
        shouldHideBlankRow: false,
        // 单位筛选
        unit: '',
        // 年份报告期筛选
        yearAndReportFilter: null,
        // 条目筛选
        itemFilter: {},
        // 起始年份筛选
        beginYear: options.beginYear || new Date().getFullYear().toString(),
        // 截止年份筛选
        endYear: options.endYear || new Date().getFullYear().toString(),
        // validateYears 由起始年份和截止年份计算出的综合值
        validateYears: [],
        // scopesBtns筛选
        scopesBtns: ['月'],
        // kpis筛选，这里不应该写死值
        kpis: ['累计值'],
        // validateCols 由scopesBtns和kpis计算出的综合值
        validateCols: [],
        // thscode
        thscode: options.thscode || '300033.SZ'
    };

    //   this.init();
}

var tp = FlexTable.prototype;

// tp.setOption = function(data, opt) {
//   this.tableHeads = data.heads;
//   this.tableFields = data.fields;
//   this.tableBody = data.body;
//
//   this.init();
// }

/**
 * 初始化
 */
tp.init = function() {
    this.tableReflow();
    this.bind();
};

/**
 * 暴露给外部更改state值
 * @param {String} state
 * @param {Any} value
 */
tp.changeState = function(prop, value) {
    if (!this.state[prop]) {
        return;
    }
    this.state[prop] = value;
};

/**
 * 更改原始数据
 */
tp.updateOrigin = function(data) {
    this.tableHeads = data.tableHeads;
    this.tableFields = data.tableFields;
    this.tableBody = data.tableBody;
    this.tableReflow();
};

/**
 * 基础设置初始化
 */
tp.resetBaseOption = function() {
    for (var i in this.baseOption) {
        if (this.baseOption.hasOwnProperty(i)) {
            this.baseOption[i] = {};
        }
    }
};

/**
 * 表格重绘
 */
tp.tableReflow = function() {
    // 先重置配置
    this.setBaseOption();

    domClear(this.fixedTitle);
    console.time('fixedTitle');
    this.renderFixedTitle(this.fixedTitle);
    console.timeEnd('fixedTitle');

    domClear(this.fixedAlways);
    console.time('fixedAlways');
    this.renderFixedAlways(this.fixedAlways);
    console.timeEnd('fixedAlways');

    this.tableBodyReflow();
};

/**
 * 更新表格主体，每行的宽度会有变化，所以固定的表头也要重绘
 */
tp.tableBodyReflow = function() {
    // 清空
    domClear(this.tableFrame);
    setTimeout(function() {
        console.time('tableFrame');
        this.renderTable(this.tableFrame);
        console.timeEnd('tableFrame');
    }.bind(this), 0);

    domClear(this.fixedHead);
    setTimeout(function() {
        console.time('fixedHead');
        this.renderFixedHead(this.fixedHead);
        console.timeEnd('fixedHead');
    }.bind(this), 0);
};

/**
 * 数据项遍历（基础设置）
 */
tp.setBaseOption = function() {
    var _this = this;

    // 年限筛选
    var showColsByYear = function() {
        _this.state.validateYears = [];
        var t1 = parseInt(_this.state.beginYear);
        var t2 = parseInt(_this.state.endYear);
        while (t1 <= t2) {
            _this.state.validateYears.push(t1++);
        }
        return _this.state.validateYears;
    }();
    // 前端不处理筛选数据，由服务端处理后返回给前端展示
    // // 频率筛选
    // var showColsByScopesBtns = (() => {
    //     this.state.validateCols = [];
    //     // 目前只有一个值
    //     var scopesBtn = this.state.scopesBtns[0];
    //     var kpi = this.state.kpis[0];
    //     return this.state.validateCols;
    // })();
    // // 类型筛选
    // var showColsByKpis = (() => {
    //     this.state.validateCols = [];
    //     // 目前只有一个值
    //     var scopesBtn = this.state.scopesBtns[0];
    //     var kpi = this.state.kpis[0];
    //     return this.state.validateCols;
    // })();

    // !!!日的！重新获取数据的要重置baseOption
    this.baseOption.groupRows = [];
    this.baseOption.chartsRows = [];
    this.baseOption.numberRows = [];
    this.baseOption.boldRows = [];
    this.baseOption.blankRow = [];
    this.baseOption.showRows = [];
    this.baseOption.showCols = [];
    this.baseOption.itemFilterRows = [];
    // 遍历行
    for (var row = 0, rows = this.tableFields.length; row < rows; row += 1) {
        var thisRow = this.tableFields[row];
        // 加charts icon
        if (thisRow.popchart !== undefined && thisRow.popchart === '1') {
            this.baseOption.chartsRows[row] = true;
        }
        // 加伸缩
        if (thisRow.is_group !== undefined && thisRow.is_group === 'true') {
            this.baseOption.groupRows[row] = true;
        }
        // 加粗
        if (thisRow.bold !== undefined && thisRow.bold === 1) {
            this.baseOption.boldRows[row] = true;
        }
        // 内容类型
        if (thisRow.type === 'currency') {
            this.baseOption.numberRows[row] = true;
        }
        // 如果需要隐藏空行，则需判断该行是否是空白行
        if (this.state.shouldHideBlankRow && this.tableBody[row].every(function(cell) {
                return cell.value === '';
            })) {
            this.baseOption.blankRow[row] = true;
        }
        // 年份和报告期筛选
        if (!this.state.yearAndReportFilter || !thisRow.perioddate || this.state.yearAndReportFilter.test(thisRow.t_value)) {
            this.baseOption.showRows[row] = true;
        }
        // 起始年份和截止年份
        if (this.state.validateYears.length > 0) {
            var validate = function validate(t_value) {
                var isValidate = _this.state.validateYears.filter(function(year) {
                    return new RegExp('^' + year, 'g').test(t_value);
                });
                return !!isValidate.length;
            };

            if (col !== undefined) {
                this.baseOption.showCols[col] = validate(thisRow.t_value);
            }
        }
        // 条目筛选
        if (this.state.itemFilter && this.state.itemFilter[thisRow.t_value]) {
            this.baseOption.itemFilterRows[row] = this.state.itemFilter[thisRow.t_value];
        }
    }

    // 遍历列
    for (var col = 0, cols = this.tableHeads.length; col < cols; col += 1) {
        var thisCol = this.tableHeads[col];
        // 加粗
        if (thisCol.bold !== undefined) {
            this.baseOption.boldCols[col] = true;
        }
        // 内容类型
        if (thisCol.type === 'currency') {
            this.baseOption.numberCols[col] = true;
        }
        // 如果需要隐藏空行，则需判断该行是否是空白行
        if (this.state.shouldHideBlankCol && this.tableBody[col].every(function(cell) {
                return cell.value === '';
            })) {
            this.baseOption.blankCol[col] = true;
        }
        // 年份和报告期筛选
        if (!this.state.yearAndReportFilter || !thisCol.perioddate || this.state.yearAndReportFilter.test(thisCol.t_value)) {
            this.baseOption.showCols[col] = true;
        }
        // 起始年份和截止年份
        if (this.state.validateYears.length > 0) {
            var validate = function validate(t_value) {
                var isValidate = _this.state.validateYears.filter(function(year) {
                    return new RegExp('^' + year, 'g').test(t_value);
                });

                return !!isValidate.length;
            };
            if (col !== undefined) {
                this.baseOption.showCols[col] = validate(thisCol.t_value);
            }
        }
        // 条目筛选
        if (this.state.itemFilter && this.state.itemFilter[thisCol.t_value]) {
            this.baseOption.itemFilterCols[col] = this.state.itemFilter[thisCol.t_value];
        }
    }

    // 遍历行
    // var filterCols = Object.keys(this.baseOption.itemFilterCols);
    // if (filterCols.length > 0) {
    //     for (var row = 0, rows = this.tableFields.length; row < rows; row += 1) {
    //     if (!filterCols.every(function(e) {
    //         return this.baseOption.itemFilterCols[e][this.tableBody[row][e].value];
    //     }.bind(this))) {
    //         this.baseOption.showRows[row] = false;
    //     }
    //     }
    // }

    // // 遍历列
    // var filterRows = Object.keys(this.baseOption.itemFilterRows);
    // if (filterRows.length > 0) {
    //     for (var col = 0, cols = this.tableHeads.length; col < cols; col += 1) {
    //     if (!filterRows.every(function(e) {
    //         return this.baseOption.itemFilterRows[e][this.tableBody[e][col].value];
    //     }.bind(this))) {
    //         this.baseOption.showCols[col] = false;
    //     }
    //     }
    // }
};
/**
 * 调整表头单元格的宽度
 */
tp.adjustTdWidth = function() {
    this.tablecellWidth = Array.prototype.slice.call(this.tableFrame.querySelectorAll('table thead th')).map(function(e, i) {
        return e.offsetWidth;
    });
    var ul = $('.j_fixedHeadUl');
    for (var i = 0; i < ul.length; i++) {
        var li = $('ul:eq(' + i + ') li');
        for (var j = 0, showCol = 0, l = this.tableHeads.length; j < l; j += 1) {
            // 如果该列被筛选掉了，则跳过这次循坏
            if (!this.baseOption.showCols[j]) {
                continue;
            }
            li[j].style.width = this.tablecellWidth[showCol] + 'px';
            showCol += 1;
        }
        $('ul:eq(' + i + ')').css('margin-left', this.titleWidth + 'px');
    }
};
/**
 * 渲染表格title
 * @param {Node} dom
 */
tp.renderFixedTitle = function(dom) {
    var _this2 = this;

    var element, elementData;
    var frag = document.createDocumentFragment();
    var ul = createNode('ul');

    // ul.appendChild(createNode('li'));

    for (var i = 0, l = this.tableFields.length; i < l; i += 1) {
        element = createNode('li');
        elementData = this.tableFields[i];
        var t_value = elementData.t_value || elementData.title;
        // 文本填充
        if (elementData.unit !== undefined) {
            element.innerText = this.state.unit ? t_value + '(' + this.state.unit + ')' : t_value + '(' + elementData.unit + ')';
        } else {
            element.innerText = t_value;
        }
        // element.innerText = elementData.unit !== undefined ? (t_value + '(' + elementData.unit + ')') : t_value;

        // 缩进
        if (elementData.space !== undefined) {
            element.style.textIndent = elementData.space * 8 + 'px';
        }

        // 伸缩icon
        if (this.baseOption.groupRows[i]) {
            var icon = createNode('div', 'is--sub', '', {
                'data-id': elementData.id,
                'data-index': i,
                'data-children': elementData.children.join(',')
            });
            icon.addEventListener('click', function(e) {
                var cls = e.target.classList;
                var action = 'handleAdd';
                if (cls.contains('is--sub')) {
                    action = 'handleSub';
                }
                _this2.admin.emit(action, e);
                _this2.adjustTdWidth();
            });
            element.prepend(icon);
        }

        // charts icon
        if (this.baseOption.chartsRows[i]) {
            var icon = createNode('div', 'is--charts', '', {
                'data-id': elementData.id,
                'data-index': i,
                'data-zbmc': elementData.title
            });
            element.appendChild(icon);
        }

        // level li
        if (elementData.level !== undefined) {
            element.setAttribute('data-level', elementData.level);
        }

        // level parent
        if (elementData.parent !== undefined) {
            element.setAttribute('data-parent', elementData.parent);
        }

        // 加粗
        if (this.baseOption.boldRows[i]) {
            element.style.fontWeight = 'bold';
        }

        // 唯一id
        element.id = elementData.id;

        // 添加该行
        if (!this.baseOption.blankRow[i] && this.baseOption.showRows[i]) {
            frag.appendChild(element);
        }
    }

    ul.appendChild(frag);
    dom.appendChild(ul);

    this.titleWidth = dom.clientWidth;
};

/**
 * 渲染左上角固定块
 * @param {Node} dom
 */
tp.renderFixedAlways = function(dom) {
    var frag = document.createDocumentFragment();
    // - 2 是减去边框宽度
    var width = 'width:' + (this.titleWidth - 2) + 'px';
    var div = createNode('div', 'fixed-always__div', '截止日期', { 'style': width });
    frag.appendChild(div);

    // 固定除日期之外的tableBody中的行
    for (var i = 0; i < 2; i++) {
        var div = createNode('div', 'fixed-always__div fixed-always__div-others', this.tableFields[i].title, { 'style': width });
        frag.appendChild(div);
    }
    // dom.style.width = this.titleWidth + 'px';
    dom.appendChild(frag);
};

/**
 * 渲染表格头部
 * @param {Node} dom
 */
tp.renderThead = function(dom) {
    var th, thLength, thElement, thisColData;
    var trElement = document.createElement('tr');

    for (th = 0, thLength = this.tableHeads.length; th < thLength; th += 1) {
        thElement = document.createElement('th');
        thisColData = this.tableHeads[th];
        thElement.innerText = thisColData.t_value || thisColData.title;

        if (this.baseOption.showCols[th]) {
            trElement.appendChild(thElement);
        }
    }

    dom.appendChild(trElement);
};

/**
 * 渲染表格主体
 * @param {Node} dom
 */
tp.renderTbody = function(dom) {
    var tr, trLength, td, tdLength, trElement, tdElement, trData, tdData, textNode, boldRowsFlag, numberRowsFlag;
    // 表格旋转后要使用转置后的数据
    var tableData = this.tableBody;
    // 保留小数位数
    var decLength = this.state.decLength;
    // 单位转换
    var units = {
        '元': 1,
        '千元': 1000,
        '万元': 10000,
        '十万元': 100000,
        '百万元': 1000000,
        '千万元': 10000000,
        '亿元': 100000000,
        '十亿元': 1000000000,
        '百亿元': 10000000000
    };
    var divisor = units[this.state.unit];

    for (tr = 0, trLength = this.tableBody.length; tr < trLength; tr += 1) {
        // 如果改行需要隐藏空白行或者被筛选掉了，则跳过这次循坏
        if (this.state.shouldHideBlankRow && this.baseOption.blankRow[tr] || !this.baseOption.showRows[tr]) {
            continue;
        }

        trData = tableData[tr];
        trElement = document.createElement('tr');

        // 该行是否是加粗行
        boldRowsFlag = this.baseOption.boldRows[tr];
        // 该行是否是数字行
        numberRowsFlag = this.baseOption.numberRows[tr];

        for (td = 0, tdLength = trData.length; td < tdLength; td += 1) {
            // 如果该列被筛选掉了，则跳过这次循坏
            if (!this.baseOption.showCols[td]) {
                continue;
            }

            if (!trElement.id) {
                trElement.id = trData[0].id;
            }

            tdData = trData[td] || {};
            tdElement = document.createElement('td');

            // 该单元格是否加粗
            if (boldRowsFlag || this.baseOption.boldCols[td]) {
                tdElement.className = 'text-bold';
            }
            // 该单元格是否是数字类型
            if (numberRowsFlag || this.baseOption.numberCols[td]) {
                tdElement.align = 'right';
                textNode = document.createTextNode(numberProcess(tdData.value, decLength, divisor));
            } else {
                textNode = document.createTextNode(tdData.value);
                // textNode = document.createTextNode(tdData.value);
            }

            tdElement.appendChild(textNode);
            trElement.appendChild(tdElement);
        }
        dom.appendChild(trElement);
    }
};

/**
 * 渲染表格
 * @param {Node} dom
 */
tp.renderTable = function(dom) {
    var frag = document.createDocumentFragment();
    var table = createNode('table');
    var tbody = createNode('tbody');
    var thead = createNode('thead');

    // 表格真实高度
    var tableHeight = (this.tableBody.length + 1) * this.cellHeight + 1;

    this.renderThead(thead);
    this.renderTbody(tbody);

    table.appendChild(thead);
    table.appendChild(tbody);
    table.style.marginLeft = this.titleWidth - 1 + 'px';
    frag.appendChild(table);
    dom.appendChild(frag);

    // var tbodyHtml = this.tableBody.map(function(tr, trIndex) {
    //   var cacheArr = ['<tr>'];
    //
    //   Array.prototype.push.apply(cacheArr, tr.map(function(td, tdIndex) {
    //     return '<td>' + (td.value || '') + '</td>';
    //   }));
    //
    //   cacheArr.push('</tr>');
    //   return cacheArr.join('');
    // });
    //
    // tbody.innerHTML = tbodyHtml.join('');
};

/**
 * 渲染固定头部
 * @param {Node} dom
 */
tp.renderFixedHead = function(dom) {
    console.time('getTableWidths');
    this.tablecellWidth = Array.prototype.slice.call(this.tableFrame.querySelectorAll('table thead th')).map(function(e, i) {
        return e.offsetWidth;
    });
    console.timeEnd('getTableWidths');
    var frag = document.createDocumentFragment();
    // var ul = document.createElement('ul');
    var ul = createNode('ul', 'o-fixed-head-ul j_fixedHeadUl');
    var liElement = null;

    for (var i = 0, showCol = 0, l = this.tableHeads.length; i < l; i += 1) {
        // 如果该列被筛选掉了，则跳过这次循坏
        if (!this.baseOption.showCols[i]) {
            continue;
        }

        liElement = document.createElement('li');
        liElement.innerText = this.tableHeads[i].t_value;
        liElement.style.width = this.tablecellWidth[showCol] + 'px';
        ul.appendChild(liElement);
        showCol += 1;
    }

    ul.style.marginLeft = this.titleWidth + 'px';
    frag.appendChild(ul);
    // 生成额外的tbody中的指定固定行
    for (var i = 0; i < 2; i++) {
        var ul = createNode('ul', 'o-fixed-head-ul u-fixed-head-white j_fixedHeadUl');
        var liElement = null;
        for (var ij = 0, showCol = 0, l = this.tableHeads.length; ij < l; ij += 1) {
            // 如果该列被筛选掉了，则跳过这次循坏
            if (!this.baseOption.showCols[ij]) {
                continue;
            }
            liElement = document.createElement('li');
            liElement.innerText = this.tableBody[i][ij].value;
            liElement.style.width = this.tablecellWidth[showCol] + 'px';
            ul.appendChild(liElement);
            showCol += 1;
        }
        ul.style.marginLeft = this.titleWidth + 'px';
        frag.appendChild(ul);
    }

    dom.appendChild(frag);
};

// /**
// * 生成固定的纵向滚动条
// * @param {Node} dom
// */
// tp.renderVerticlScrollbar = function(dom) {
//   var frag = document.createDocumentFragment();
//   var topArrow = createNode('div', 'vertical-scroll-top-arrow'),
//     bottomArrow = createNode('div', 'vertical-scroll-bottom-arrow'),
//     scrollbar = createNode('div', 'vertical-scroll-bar');
//   // table总高度
//   var allItemHeight = this.tableBody.length * this.cellHeight;
//   // table容器高度
//   var tableContainerHeight = this.containerMaxHeight;
//   // 是否显示滚动条
//   var isShow = allItemHeight > tableContainerHeight;
//   // 鼠标按下标志位
//   var mousedownFlag = false;
//   // 拖动鼠标起始位置
//   var startY = 0;
//   // 滑块位置
//   var scrollbarTop = 0;
//   // 滑块高度最小值
//   var scrollbarMinHeight = 70;
//   // 滑块高度
//   var scrollbarHeight = tableContainerHeight / allItemHeight * (tableContainerHeight - 10);
//   scrollbarHeight = scrollbar >= scrollbarMinHeight ? scrollbar : scrollbarMinHeight;
//   // 滑块top最小值
//   var minTop = 0;
//   // 滑块top最大值
//   var maxTop = tableContainerHeight - scrollbarHeight;
//
//   scrollbar.style.height = scrollbarHeight + 'px';
//
//   scrollbar.addEventListener('mousedown', function(event) {
//     startY = event.clientY;
//     mousedownFlag = true;
//   });
//   document.addEventListener('mouseup', function(event) {
//     if (mousedownFlag) {
//       mousedownFlag = false;
//     }
//   });
//   document.addEventListener('mousemove', function(event) {
//     var pos;
//     if (mousedownFlag) {
//       pos = event.clientY;
//       scrollbarTop += (pos - startY);
//       startY = pos;
//       if (scrollbarTop >= minTop && scrollbarTop <= maxTop) {
//         scrollbar.style.top = scrollbarTop + 'px';
//       }
//     }
//   });
//
//   frag.appendChild(topArrow);
//   frag.appendChild(bottomArrow);
//   frag.appendChild(scrollbar);
//
//   dom.appendChild(frag);
// }

/**
 * 绑定事件
 */
tp.bind = function() {
    this.admin = new EventEmitter();

    function toggleClass(dom, cls1, cls2) {
        if (!dom || !cls1) return false;
        var clst = dom.classList;
        if (!cls2) {
            if (clst.contains(cls1)) {
                clst.remove(cls1);
            } else {
                clst.add(cls1);
            }
        } else {
            clst.remove(cls1);
            clst.add(cls2);
        }
    }

    function toggleData(dom, data, value) {
        if (!dom || !data) return false;
        dom.setAttribute(data, value);
    }
    /**
     * 伸缩反应
     * @param {String} action 'handleAdd'|''
     * @param {String} group '00204098, 00204099'
     * @param {String} level '0' | '1' | '2' 
     */
    function effect(action, group, level) {
        if (!action) return false;
        var material = group.split(',');
        var dataClass = '';
        if (action === 'handleSub') {
            dataClass = 'is--hide';
        }

        material.map(function(id) {
            var li = document.querySelector('li[id="' + id + '"]');
            var tr = document.querySelector('tr[id="' + id + '"]');
            // handle level 2, level 2 is the lowest level
            if (li.getAttribute('data-level') === '2' && level === '0') {
                // set the class as the same as it's parent level
                // var parentClass = document.querySelector(`[id="${li.getAttribute('data-parent')}"]`).className;
                // li.className = parentClass;
                // tr.className = parentClass;
                toggleClass(li, 'is--hide');
                toggleClass(tr, 'is--hide');
            } else {
                if (li.getAttribute('data-level') === '2' && level === '1') {
                    toggleClass(li, 'is--hide');
                    toggleClass(tr, 'is--hide');
                } else {
                    if (li.getAttribute('data-level') === '1') {
                        toggleClass(li, 'is--hide');
                        toggleClass(tr, 'is--hide');
                        var isGroup = hasChildren(li);
                        // ignore if level 2 is is--add 
                        if (li.getAttribute('data-class') === 'is--hide') {
                            log('%c' + li.id + ' is closed, do nothing', { color: 'green' });
                            return true;
                        } else {
                            if (isGroup) {
                                effect(action, li.querySelector('[data-id="' + id + '"]').getAttribute('data-children'), '0');
                            }
                        }
                    }
                }
            }
        });
    }

    function hasChildren(dom) {
        if (!dom) return;
        if (dom.childElementCount === 1 && dom.children[0].classList.contains('is--charts')) {
            return false;
        }
        if (dom.childElementCount > 0) {
            return true;
        }
        return false;
    }
    this.admin.on('handleAdd', function(e) {
        log(e.target.getAttribute('data-id') + ' handleAdd', { color: 'red' });
        toggleClass(e.target, 'is--add', 'is--sub');
        toggleData(e.target.parentElement, 'data-class', '');
        // handle level
        var level = e.target.parentElement ? e.target.parentElement.getAttribute('data-level') : e.target.getAttribute('data-level');
        effect('handleAdd', e.target.getAttribute('data-children'), level);
    });
    this.admin.on('handleSub', function(e) {
        log(e.target.getAttribute('data-id') + ' handleSub', { color: 'orange' });
        toggleClass(e.target, 'is--sub', 'is--add');
        toggleData(e.target.parentElement, 'data-class', 'is--hide');

        // handle level
        var level = e.target.parentElement ? e.target.parentElement.getAttribute('data-level') : e.target.getAttribute('data-level');
        effect('handleSub', e.target.getAttribute('data-children'), level);
    });
  
    var that = this;
    this.tableFrame.addEventListener('scroll', function(event) {
        console.time('scroll');
        var scrollHead = that.fixedHead.querySelectorAll('.j_fixedHeadUl');
        var scrollTitle = that.fixedTitle.querySelector('ul');
        var scrollTop = this.scrollTop;
        var scrollLeft = this.scrollLeft;
        Array.prototype.slice.call(scrollHead).map(function(ul) {
            ul.style.left = '-' + scrollLeft + 'px';
        });
        // scrollHead.style.left = '-' + scrollLeft + 'px';
        scrollTitle.style.top = '-' + scrollTop + 'px';
        console.timeEnd('scroll');
    });
};
/**
 * 起始时间
 * @param {Number} dec
 */
tp.filterTableSource = function(_ref) {
    var endYear = _ref.endYear,
        beginYear = _ref.beginYear,
        scopesBtns = _ref.scopesBtns,
        kpis = _ref.kpis;

    this.resetBaseOption();
    this.state.endYear = endYear || this.state.endYear;
    this.state.beginYear = beginYear || this.state.beginYear;
    this.state.scopesBtns = scopesBtns || this.state.scopesBtns;
    this.state.kpis = kpis || this.state.kpis;

    this.tableReflow();
};

/**
 * 表格旋转
 */
tp.tableRotate = function() {
    this.resetBaseOption();

    this.state.rotateState = !this.state.rotateState;
    var _ref2 = [this.tableFields, this.tableHeads];
    this.tableHeads = _ref2[0];
    this.tableFields = _ref2[1];

    this.tableBody = transpose(this.tableBody);
    this.tableReflow();
};

/**
 * 保留小数位
 * @param {Number} dec
 */
tp.setTableDec = function(dec) {
    this.state.decLength = dec;
    this.tableBodyReflow();
};

/**
 * 隐藏空白行
 */
tp.hideBlankRow = function() {
    this.state.shouldHideBlankRow = !this.state.shouldHideBlankRow;
    this.tableReflow();
};

/**
 * 单位转换
 * @param {String} unit
 */
tp.unitConversion = function(unit) {
    this.state.unit = unit;
    this.tableReflow();
};

/**
 * 筛选
 * @param {Object} option
 */
tp.rangeFilter = function(option) {
    var thisYear = new Date().getFullYear();
    var yearQuickOpt = {
        '最新': [thisYear],
        '今年': [thisYear],
        '去年': [thisYear - 1],
        '近两年': [thisYear, thisYear - 1],
        '近三年': [thisYear, thisYear - 1, thisYear - 2],
        '近五年': [thisYear, thisYear - 1, thisYear - 2, thisYear - 3, thisYear - 4],
        '全部': []
    };
    // 年份
    var year = option['时间范围'];
    // 报告期
    var report = option['报告期'];

    // 生成正则字符串
    var reg = '(' + yearQuickOpt[year].join('|') + ')\ (' + report.join('|') + ')';

    delete option['时间范围'];
    delete option['报告期'];

    this.state.yearAndReportFilter = new RegExp(reg);
    this.state.itemFilter = option;

    this.resetBaseOption();
    this.tableReflow();
};