var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* 获取节点上所有的属性
* @param {XmlNode} node xml节点
* @param {Object} map 属性映射
* @returns {Object} 属性
*/
function getAllAttributes(node, map) {
  var data = {};
  var attributes = node.attributes;
  for (var i = 0; i < attributes.length; i++) {
    var name = attributes[i].name;
    data[name] = node.getAttribute(name);
  }

  if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) === 'object') {
    Object.keys(map).forEach(function (key) {
      data[key] = data[map[key]];
    });
  }
  return data;
}

/**
* 二维数组转置
* @param {Array} arr 二维数组
* @returns {Array}
*/
function transpose(arr) {
  console.time('transpose');
  var resultArr = [];
  // 获取数组里最长的长度
  var maxLength = Math.max.apply(null, arr.map(function (e) {
    return e.length;
  }));

  for (var i = 0; i < maxLength; i += 1) {
    resultArr.push(arr.map(function (cell, index) {
      return cell[i] || {};
    }));
  }

  console.timeEnd('transpose');
  return resultArr;
}

/**
* 单位转换、保留小数位并增加千分位
* @param {String} num 数字字符串
* @param {Number} decimal 保留小数的位数
* @param {Number} divisor 除数
* @returns {String}
*/
function numberProcess(num, decimal, divisor) {
  decimal = decimal || 0;
  if (num === '') {
    return '--';
  }
  num = divisor ? Number(num) / divisor : Number(num);
  num = num.toFixed(decimal).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  return num;
}

/**
* 生成一个Node
* @param {String} nodeName
* @param {String} className
* @param {String} innerText
* @param {Object} attributes
* @returns {Node}
*/
function createNode(nodeName, className, innerText, attributes) {
  var node = document.createElement(nodeName);

  if (className) {
    node.className = className;
  }
  if (innerText) {
    node.innerText = innerText;
  }
  if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object') {
    Object.keys(attributes).forEach(function (key) {
      if (attributes[key]) {
        node.setAttribute(key, attributes[key]);
      }
    });
  }

  return node;
}

/**
* 清空dom里的内容
* @param {Node} dom
*/
function domClear(dom) {
  Array.prototype.slice.call(dom.children).forEach(function (element) {
    element.remove();
  });
}
