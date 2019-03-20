/****
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
        FullScreenSelectId++,

        this.id = "fullScreenSelect" + FullScreenSelectId;
        var e = ['<div class="full-screen-select ifind-hide" id="' + this.id + '"><ul>'];
        if (this.data)
            let lis = this.data.map((item, index) => {
                if (this.defalutValue === index.toString()) {
                    return `<li class="active" data-num="${index}">${item}</li>`
                } else {
                    return `<li data-num="${index}">${item}</li>`
                }
            }).join("");

        for (var t = 0; t < this.data.length; t++)
            this.data[t] === this.defalutValue ? e.push('<li title="' + this.data[t].name + '" class="full-select-option-selected" data-value="' + this.data[t].key + '">' + this.data[t].name + '<i class="selected-icon"></i></li>') : e.push('<li title="' + this.data[t].name + '" data-value="' + this.data[t].key + '">' + this.data[t].name + '<i class="selected-icon"></i></li>');
        e.push("</ul></div>"),
            $("body").append(e.join("")),
            this.dom = $("#" + this.id)
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
                e.show()
            }),
            this.dom.on("click", function(t) {
                e.hide()
            })
    };
    show() {
        this.dom && this.dom.removeClass("ifind-hide")
    };
    hide() {
        this.dom && this.dom.addClass("ifind-hide")
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
                this.dom.find("li.full-select-option-selected").removeClass("full-select-option-selected"),
                t[l].classList.add("full-select-option-selected"))
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


function popErrorRemove() {
    var e = $(".pop-error-container");
    e.length > 0 && e.remove()
}

function popError(text) {
    var t = $(".pop-error-container");
    t.length > 0 && t.remove(),
        $("body").append('<div class="pop-error-container"><div class="error-text">' + text + "</div></div>"),
        setTimeout(function() {
            popErrorRemove()
        }, 2e3)
}