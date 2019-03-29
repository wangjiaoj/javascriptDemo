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

 module.exports = FullScreenSelect;