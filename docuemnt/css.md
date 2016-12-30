# CSS

## 总结
1. 要多多利用伪类，对减少html嵌套复杂度，实现一些背景效果等作用不错

## 一、浏览器支持及回退机制

1. 浏览器前缀，利用层叠机制，把标准语法排在最后
2. @supports
3. 使用javascript给根元素添加一些辅助类，然后可以针对支持或不支持某些特性的浏览器来分别编写样式 
* e.g

```javascript
if("clipPath" in $0.style){
    //但是判断为true并不意味着浏览器就一定真的支持这个css特性
}
```


## 二、背景与边框

### 2.1 多重边框

1. 考虑使用box-shadow或outline来作为边框，但outline并不紧贴box-radius,box-shadow会紧贴边框
2. linear-gradient做斜条纹时要注意根据角度计算无缝贴片，但使用repeating-linear-gradient就不用担心这个问题


## 三、形状

### 3.1 平行四边想

* 因为skew()会使得内部的文字也发生变形，如果只想让背景变形，字体不变，那么可以使用为元素，将为元素作为背景进行相应的变形的来实现这样的效果
 