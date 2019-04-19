## MobileH5使用文档说明
 移动端组件基础组件集合，包括Loading, Toast, FullScreenSelect 

###  组件引入
可以根据需要引入所需要的组件，示例：
>import { Loading, Toast, FullScreenSelect } from '../libs/MobileH5/1.1.0';

### Loading
加载中效果实现：Loading; 加载中效果是svg加动画实现的。
#### 初始化调用
 * @param {string} size:参数值均为浏览器可识别的大小单位，包括rem,vw,px;
 * @param {string} top: 参数值均为浏览器可识别的大小单位，包括rem,vw,px;
 
调用方式:
> loadingObj = new Loading();
参数示例：
> new Loading("100px","100px"); 

#### 其他方法
移除加载中图标:
> loadingObj.remove();

移除全部的加载中图标:
> Loading.removeAllLoading();

### Toast
 * @description:Toast 是一种主要用于提示系统消息的轻量级控件，显示一段时间（大概是1-2s）后自动消失,黑色半透明不包含操作也不能从屏幕上手动关闭，不会打断用户的操作，多个Toast 可以叠加出现。
#### 初始化调用
 * @param {string} text:文案
 * @param {number} timer: toast消失时间 可选项：大于0的数字 单位秒  默认3s后消失
 * @param {string} type:可选项：text success  warn 三种； 默认text
 * @param {string} position:显示位置 top middle bottom  默认bottom
>new Toast("请重新输入验证码",1," warn","middle")

### FullScreenSelect
全屏下拉框
#### 初始化调用
  * @param {object} el:下拉框展示触发dom对象
  * @param {Array} data: 数据
  * @param {Function} afterSelectedFun:选中某个下拉框选项之后的回调函数
调用全屏下拉框：

 ```javascript
    new FullScreenSelect({
            el: document.querySelector(".info-item__tel"),
            afterSelectedFun: function(item) {
                 //回调函数处理选中后事件，item参数是对象，结构为{item.name,item.value}
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
```
#### 其他方法
展示下拉框
>selectObj.show();

数据重置,参数格式要求和初始化的data要求一致
>selectObj.resetData(data);

设置选中某一项，参数为key
>selectObj.setValue(key);

