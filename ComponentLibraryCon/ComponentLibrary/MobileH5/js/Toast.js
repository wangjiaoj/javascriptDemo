 import '../css/common-tool.scss'
 import HtmlElementBuild from './HtmlElementBuild';
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


 module.exports = Toast;