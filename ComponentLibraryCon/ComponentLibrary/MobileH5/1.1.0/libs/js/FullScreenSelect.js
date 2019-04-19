 import '../css/common-tool.scss'
 import HtmlElementBuild from './HtmlElementBuild';
 /**
  * 全屏下拉框：FullScreenSelect
  * @param {object} el:下拉框展示触发dom对象
  * @param {Array} data: 数据
  * @param {Function} afterSelectedFun:选中某个下拉框选项之后的回调函数
  * @example 
   var selectObj = new FullScreenSelect({
            el: document.querySelector(".info-item__tel"),
            afterSelectedFun: function(item) {
            },
            data: [{
                name: "AAA",
                key: 1
            }, {
                name: "BBB",
                key: 11
            }, {
                name: "dddd",
                key: 111
            }]
        });
  *  */

 var FullScreenSelectId = 0;
 class FullScreenSelect extends HtmlElementBuild {
     constructor(options) {
         super();
         this.data = options.data;
         this.el = options.el;
         this.currentValue = options.defalutValue || this.data[0].key;
         this.options = options;
         this.build();
         this.bind();
     };

     build() {
         FullScreenSelectId++;
         let body = document.querySelector("body");
         this.id = "fullScreenSelect" + FullScreenSelectId;
         let wrapper = this.buildElement('div', ['full-screen-select', 'ifind-hide'], [{ name: "id", value: this.id }]);
         let ulList = [`<ul>`];
         if (this.data) {
             for (let i = 0; i < this.data.length; i++) {
                 let selectedStatus = '';
                 if (this.data[i].key === this.currentValue) {
                     selectedStatus = 'full-select-option-selected';
                 }
                 ulList.push(`<li title="${this.data[i].name}" class="${selectedStatus}" data-value="${ this.data[i].key }">${ this.data[i].name }<i class="selected-icon"></i></li>`);
             }
         }
         ulList.push(`</ul>`);
         body.appendChild(wrapper);
         wrapper.innerHTML = ulList.join('');
         this.dom = wrapper;
     };
     bind() {
         var _this = this;
         this.dom.addEventListener("click", (e) => {
             e.stopPropagation();
             e.preventDefault();
             let target = e.target;
             if (target.nodeName === 'LI') {
                 let value = target.getAttribute("data-value");
                 this.currentValue = value;
                 let name = target.getAttribute("title");
                 let selectedItem = this.dom.querySelector("li.full-select-option-selected")
                 selectedItem ? selectedItem.classList.remove("full-select-option-selected") : '';
                 target.classList.add("full-select-option-selected");
                 this.options.afterSelectedFun({
                     name: name,
                     key: value
                 });
             }
             this.hide();
         }, false);
         this.el.addEventListener("click", (t) => {
             this.show();
         });
     }
     show() {
         this.dom && this.dom.classList.remove("ifind-hide");
     };
     hide() {
         this.dom && this.dom.classList.add("ifind-hide");
     };
     resetData(data, defalutValue) {
         this.data = data;
         this.currentValue = defalutValue || data[0].key;
         this.dom.remove();
         this.build();
         this.bind();
     };
     getItemByKey(key) {
         let item = { name: "", key: "" };
         for (let i = 0; i < this.data.length; i++) {
             let selectedStatus = '';
             if (this.data[i] === key) {
                 item = this.data[i];
             }
         }
         return item;
     }
     setValue(value) {
         let flag = false;
         let optionsList = this.dom.querySelectorAll("li");
         for (var l = 0; l < optionsList.length; l++) {
             if (optionsList[l].getAttribute("data-value") == value) {
                 this.currentValue = value;
                 let selectedItem = this.dom.querySelector("li.full-select-option-selected");
                 if (selectedItem) {
                     selectedItem.classList.remove("full-select-option-selected");
                 }
                 optionsList[l].classList.add("full-select-option-selected");
                 flag = true;
                 let name = optionsList[l].getAttribute("title");
                 this.options.afterSelectedFun({
                     name: name,
                     key: value
                 });
                 break;
             }
         }
         return flag;
     }
 }

 export default FullScreenSelect;