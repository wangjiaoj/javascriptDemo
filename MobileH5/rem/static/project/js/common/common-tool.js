class HtmlElementBuild {
    constructor() {

    };
    buildElementText(text) {
        text = text ? text : 'div';
        let textEle = document.createTextNode(text);
        return textEle;
    };
    buildElement(type, className, attributeList) {
        type = type ? type : 'div';
        let div = document.createElement(type);
        if (className) {
            if (typeof className == "string") {
                div.classList.add(className)
            } else {
                className.forEach((item, index) => {
                    div.classList.add(item);
                });
            }
        }
        if (attributeList) {
            attributeList.forEach((item, index) => {
                div.setAttribute(item.name, item.value);
            });
        }
        return div;
    }
}
/**
 * 全屏下拉框：FullScreenSelect
 * 
 *  */
var FullScreenSelectId = 0;
class FullScreenSelect {
    constructor(options) {
        this.data = options.data;
        this.el = options.el;
        this.defalutValue = options.defalutValue || this.data[0];
        this.options = options;
        this.build();
        this.bind();
    };
    build() {
        FullScreenSelectId++;
        let body = document.querySelector("body");
        this.id = "fullScreenSelect" + FullScreenSelectId;
        let div = this.buildElement('div', ['full-screen-select', 'ifind-hide'], [{ name: "id", value: this.id }]);

        let ul = this.buildElement('ul');

        if (this.data)
            for (var t = 0; t < this.data.length; t++)
                this.data[t] === this.defalutValue ? e.push('<li title="' + this.data[t].name + '" class="full-select-option-selected" data-value="' + this.data[t].key + '">' + this.data[t].name + '<i class="selected-icon"></i></li>') : e.push('<li title="' + this.data[t].name + '" data-value="' + this.data[t].key + '">' + this.data[t].name + '<i class="selected-icon"></i></li>');
        e.push("</ul></div>");

        body.appendChild(div);
        this.dom = div;
    };
    bind() {
        var e = this;
        this.dom.on("click", "li", function(t) {
                t.stopPropagation(),
                    t.preventDefault();
                var l = $(this).attr("data-value");
                e.defalutValue = l;
                var i = $(this).attr("title");
                e.dom.find("li.full-select-option-selected").removeClass("full-select-option-selected"),
                    $(this).addClass("full-select-option-selected"),
                    e.options.afterSelectedFun({
                        name: i,
                        key: l
                    }),
                    e.hide()
            }),
            this.el.on("click", function(t) {
                e.show();
            }),
            this.dom.on("click", function(t) {
                e.hide();
            })
    };
    show() {
        this.dom && this.dom.classList.add("ifind-hide");
    };
    hide() {
        this.dom && this.dom.classList.remove("ifind-hide");
    };
    restData(e) {
        this.options.data = e,
            this.data = e,
            this.defalutValue = this.data[0],
            this.dom.remove(),
            this.build(),
            this.bind()
    };
    val(e) {
        for (var t = this.dom.find("li"), l = 0; l < t.length; l++)
            t[l].getAttribute("data-value") == e && (this.defalutValue = e,
                this.dom.find("li.full-select-option-selected").classList.remove("full-select-option-selected"),
                t[l].classList.add("full-select-option-selected"))
    }
}








/** 
 * 模态框实现：Dialog
 * desc: 会打断用户的正常操作，要求用户必须对其进行回应，否则不能继续其它操作行为。
 */

/** 
 * 非模态框实现：Toast / HUD
 * @description:Toast 是一种主要用于提示系统消息的轻量级控件，显示一段时间（大概是1-2s）后自动消失,一般是灰黑或者黑色半透明不包含操作也不能从屏幕上手动关闭，不会打断用户的操作，多个Toast 可以叠加出现
 * @param {string} text:文案
 * @param {number} timer: toast消失时间 可选项：大于0的数字 单位秒  默认3s后消失
 * @param {string} position:显示位置 top middle bottom  默认bottom
 * @param {string} type:可选项：text success fail warn 四种； 默认bottom
 * }
 * @examle
 * new Toast("请重新输入验证码",1)
 */
var ToastId = 0;
class Toast extends HtmlElementBuild {
    constructor(text, timer, position, type) {
        super();
        ToastId++;
        text = text ? text : 'success!';
        timer = timer ? timer : 3 * 1000;
        position = position ? position : 'bottom';
        let body = document.querySelector("body");
        //let frage = document.createDocumentFragment();
        //frage.appendChild(div);
        let id = 'ToastId' + ToastId;
        let toastClassName = 'm-ifind-toast-wrapper';
        let div = this.buildElement('div', toastClassName, [{ name: "id", value: id }]);
        div.innerHTML = `<div class="toast-container"><div class="toast-text">${text}</div></div>`;
        // let innerdiv = this.buildElement('div', 'toast-container');
        // let textdiv = this.buildElement('div', 'toast-text');
        //let i = this.buildElement('i', 'miui-toast-icon');
        // textdiv.appendChild(this.buildElementText('text'));
        // innerdiv.appendChild(textdiv);
        // innerdiv.appendChild(i);
        // div.appendChild(innerdiv);
        body.appendChild(div);
        this.container = div;
        this.id = id;



        setTimeout(() => {
            this.remove();
        }, timer)
    };

    remove() {
        this.container.remove();
    }
}



class Loading extends HtmlElementBuild {
    constructor() {
        super();
        let body = document.querySelector("body");
        let toastClassName = 'm-ifind-loading-wrapper';;
        let div = this.buildElement('div', toastClassName);
        // let i = this.buildElement('i', 'm-ifind-loading-icon');
        // div.appendChild(i);
        div.innerHTML = `<i class="m-ifind-loading-icon"></i>`;
        body.appendChild(div);
        this.loading = div;
    }
    remove() {
        this.loading.remove();
    }
}


function setClock(e, t, l) {
    if (l && t.hasClass(l))
        return !1;
    60 === e ? (t.addClass("btn-time-count"),
        t.text(e + "s"),
        setClock(--e, t)) : setTimeout(function() {
        e < 1 ? (t.text("获取验证码"),
            t.removeClass("btn-time-count")) : (t.text(e + "s"),
            setClock(--e, t))
    }, 1e3)
}