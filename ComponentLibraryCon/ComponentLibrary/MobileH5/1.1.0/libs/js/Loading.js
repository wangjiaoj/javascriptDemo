 import '../css/Loading.scss'
 import HtmlElementBuild from './HtmlElementBuild';
 /** 
  * 加载中效果实现：Loading
  * desc: 加载中效果是svg加动画实现的
  */

 /** 
  * 加载中效果实现：Loading
  * @description:加载中效果
  * @param {string} size:加载中图标大小
  * @param {string} top: margin-top
  * @example
  * new Loading("100px","100px")
  */
 class Loading extends HtmlElementBuild {
     constructor(size, top) {
         super();
         let style = '';
         let reg = /^\d+?(rem|px|vw)$/; //
         if (size && reg.test(size)) {
             if (top && reg.test(top)) {
                 style = `style="width:${size};height:${size};margin-top:${top};"`;
             } else {
                 style = `style="width:${size};height:${size};"`;
             }
         } else if (top && reg.test(top)) {
             style = `style="margin-top:${top};"`;
         }
         let body = document.querySelector("body");
         let toastClassName = 'm-ifind-loading-wrapper';
         let div = this.buildElement('div', toastClassName);
         div.innerHTML = `<i class="m-ifind-loading-icon" ${style}></i>`;
         body.appendChild(div);
         this.loading = div;
     }
     static removeAllLoading() {
         let loading = document.querySelectorAll('.m-ifind-loading-wrapper');
         if (loading.length > 0) {
             for (let i = 0; i < loading.length; i++) loading[i].remove()
         }
     }
     remove() {
         this.loading.remove();
     }
 }
 export default Loading;