# CSS

## 一、浏览器支持及回退机制

1. 浏览器前缀，利用层叠机制，把标准语法排在最后
2. @supports
3. 使用javascript给根元素添加一些辅助类，然后可以针对支持或不支持某些特性的浏览器来分别编写样式

## 二、背景与边框

### 2.1 多重边框

1. 考虑使用box-shadow或outline来作为边框，但outline并不紧贴box-radius,box-shadow会紧贴边框
2. linear-gradient做斜条纹时要注意根据角度计算无缝贴片，但使用repeating-linear-gradient就不用担心这个问题