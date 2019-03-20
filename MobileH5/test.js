//自定义一个组件的基类，自定义的html标签组件都需要继承HTMLElement父类
class component extends HTMLElement {
    constructor() {
        super();
        this._data = {};
        this._data.tabData = [];
        this._data.index = 0;

    };
    /*
     * begin 给自定义元素用setAttribute设置属性时
     *必需要用static get observedAttributes -- 注册用setAttribute的属性
     *和attributeChangedCallback配合使用--当使用setAttribute之后会自动调用该方法，
     *在这个用getAttribute得到相应属性值
     * 
     */
    static get observedAttributes() {
        return ["tabData", "index"];
    };
    attributeChangedCallback() {
        try {
            this._data.tabData = JSON.parse(this.getAttribute("tabData"));
            this._data.index = this.getAttribute("index");
        } catch (e) {};
        this.creatLis();
    };
    initData() {
        //shadow不是<m-radio>中的子元素，它是一个容器，容器里的内容替换<m-radio>在html中的的
        //位置，我是把shadow当作一个document来看的，相当于在元素中也有一个document
        let shadow = this.attachShadow({
            mode: "open"
        });
    };
    //创建tab元素
    createTabDom() {
        /* 创建选项卡dom结构 */

        //创建div
        let container = document.createElement("div");
        container.classList.add("container");

        let fragment = document.createDocumentFragment();
        //创建ul
        let ul = document.createElement("ul");
        ul.classList.add("tabUl");
        fragment.appendChild(ul);
        container.appendChild(fragment);
        this.shadowRoot.appendChild(container);
        this.creatLis();
    };

}



//选项卡构造方法 this指向的<my-radio>  dom元素
class MyTab extends component {
    constructor() {
        super();
        this.initData();
        this.htmlStyle();
        this.createTabDom();
        this.createTabEvent();

    };
    //style样式
    htmlStyle() {
        /* style样式 */
        let style = document.createElement("style");
        style.textContent = `ul{
             margin:0;
             padding:0;
         }
         ul,li{
             list-style: none;
         }
         li,div{
             padding:0;
         }
         ul{
             float: left;
         }
         li{
             padding: 10px 20px; 
             border: 1px solid #eeeeee;
             float:left;
             font-size: 14px;
             cursor: pointer;
             color: #666666;
         }
         li:hover{
             color:#ffffff;
             background: -webkit-linear-gradient(left,rgb(82, 211, 243),#eeeeee45,rgb(82, 211, 243));
         }
         .active{
             color:#ffffff;
             background: -webkit-linear-gradient(left,rgb(82, 211, 243),#eeeeee45,rgb(82, 211, 243));
         }
         .container{
             overflow: auto;
         }`;

        this.shadowRoot.appendChild(style);
    };

    creatLis() {

        //创建li

        let tabData = this._data.tabData;
        if (tabData.length > 0) {

            let lis = tabData.map((item, index) => {
                if (this._data.index === index.toString()) {
                    return `<li class="active" data-num="${index}">${item}</li>`
                } else {
                    return `<li data-num="${index}">${item}</li>`
                }
            }).join("");
            let ul = this.shadowRoot.querySelector(".tabUl");
            ul.innerHTML = lis;

        }


    };
    createTabEvent() {
        let me = this;

        /* 绑定事件 */
        this.shadowRoot.addEventListener("click", function(e) {
            if (e.target.tagName.toUpperCase() == "LI") {
                me._data.index = e.target.dataset.num;
                me.setAttribute("index", me._data.index);
                me.creatLis();

                //创建一个自己定义对象
                let changeEvent = new CustomEvent("change", {
                    detail: {
                        index: me._data.index
                    }
                });
                //触发自定义事件
                me.dispatchEvent(changeEvent);

            }
        });

        //this.shadowRoot.onclick this.shadowRoot不支持onclick这种绑定事件的方式（不支持dom0级的绑定方式）
        /* this.shadowRoot.onclick = function(e){
            console.log(e);
            if(e.targe == 'li'){
                console.log(e);
                                
            }
        } */
    }
};

customElements.define("my-tab", MyTab); //html中写<my-tab></my-tab>标签，自动会调用MyTab类。