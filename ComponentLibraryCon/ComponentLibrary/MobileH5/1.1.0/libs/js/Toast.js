 import '../css/toast.scss'
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
  * @param {string} type:可选项：text success  warn 三种； 默认text
  * @param {string} position:显示位置 top middle bottom  默认bottom
  * @example
  * new Toast("请重新输入验证码",1,"warn","middle")
  */
 var ToastId = 0;
 class Toast extends HtmlElementBuild {
     constructor(text, timer, type, position) {
         super();
         ToastId++;
         text = text ? text : 'success!';
         timer = timer ? timer * 1000 : 3 * 1000;
         let id = 'ToastId' + ToastId;
         let toastClassName = 'm-ifind-toast-wrapper';
         if (!position || position == 'bottom') {} else if (position == 'top') {
             toastClassName = ['m-ifind-toast-wrapper', 'm-ifind-toast-wrapper-top']
         } else if (position == 'middle') {
             toastClassName = ['m-ifind-toast-wrapper', 'm-ifind-toast-wrapper-middle']
         }
         let wrapper = this.buildElement('div', toastClassName, [{ name: "id", value: id }]);
         let icon = 'toast-icon ';
         let textClass = 'toast-text';
         if (!type || type == 'text') {} else if (type == 'success') {
             icon += ' toast-icon-success';
         } else if (type == 'warn') {
             icon += ' toast-icon-warn';
             textClass += ' toast-text-warn';
         }
         wrapper.innerHTML = `<div class="toast-container"><i class="${icon}"></i><div class="${textClass}">${text}</div></div>`;
         let body = document.querySelector("body");
         body.appendChild(wrapper);
         this.container = wrapper;
         this.id = id;
         setTimeout(() => {
             this.remove();
         }, timer)
     };

     remove() {
         this.container.remove();
     }
 }

 export default Toast;