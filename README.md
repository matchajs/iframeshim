#IframeShim

在IE6下遮盖Select元素和Flash元素

---

##使用说明

###create  `new IframeShim(element[, options]);`

**参数**
`element` 继承的父类
`options` 要混入的实例属性，可以选择一下类型：
+ `includeMargin` 
+ `offset` 
+ `className` iframe的className
+ `zIndex` iframe的z-index值



###position  `shim.position()`

重新定位的iframe元素。当需要移动或调整的iframe元素调用此方法。

```js
/* 示例 1 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').position();
});
```

```js
/* 示例 2 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target');

    $target.css('display', 'block');
    shim.position(); // 需要在目标元素显示之后才进行定位
});
```


###show  `shim.show()`

显示iframe元素

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').position();

    shim.hie(); // 隐藏

    $('#button').click(function(){
        shim.show();
    });    
});
```


###hide  `shim.hide()`

将iframe元素隐藏

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').position();

    $('#button').click(function(){
        shim.hide();
    });    
});
```


###remove  `shim.remove()`

将iframe元素移出DOM

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').position();

    $('#button').click(function(){
        shim.remove();
    });    
});
```