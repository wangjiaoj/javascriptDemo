(function(window, underfined) {
    //为了避免声明了一些全局变量而污染，把代码放在一个“沙箱执行”，然后在暴露出命名空间（可以为API，函数，对象）
    /*因为这个外层函数只传了一个参数，因此沙箱执行时，u自然会undefined，把9个字母缩成1个字母，可以看出压缩后的代码减少一些字节数。 
    在ECMAScript5之前undefined都是可写的，也就是undefined可以赋值的。
    jQuery作者这么做的目的还有防止2B程序员对undefined进行赋值后使得代码出现了不可预料的bug。 */
    myJQuery = function(selector, context) {
        return new myJQuery.prototype.init(selector, context);
    }
    myJQuery.prototype = {
        val: function() {
            var ele = this.selector;
            ele.value();
        },
        addHandler: function(type, handler) {
            var ele = document.getElementById(this.selector);
            if (ele.addEventListenter) {
                ele.addEventListenter(type, handler, false);
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + type, handler);
            } else {
                ele["on" + type] = handler;
            }
            return this;
        },
        removeHandler: function(type, handler) {
            var ele = ocument.getElementById(this.selector);
            if (ele.addEventListenter) {
                ele.removeEventListenter(type, handler);
            } else if (ele.attachEvent) {
                ele.detachEvent("on" + type, handler);
            } else {
                ele["on" + type] = null;
            }
            return this;
        }
    }
    myJQuery.prototype.init = function(selector, context) {
        if (!selector) {
            return this;
        }

        document.getElementById(selector);
        if (selector) {
            this.selector = selector;
            this.context = context;
        }
    }
    myJQuery.ajax = function(options) {
            options = options || {};
            options.type = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);

            //创建 - 非IE6 - 第一步
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else { //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //接收 - 第三步
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            }

            //连接 和 发送 - 第二步
            if (options.type == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                xhr.send(null);
            } else if (options.type == "POST") {
                xhr.open("POST", options.url, true);
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }
        //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
    myJQuery.prototype.init.prototype = myJQuery.prototype;

    window.myJQuery = window.$ = myJQuery;
})(window)