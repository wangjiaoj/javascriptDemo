 import '../css/common-tool.scss'
 import HtmlElementBuild from './HtmlElementBuild';
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
 module.exports = Loading;