#IframeShim

解决IE环境下，不能遮盖Select元素和Flash元素的问题。

---

##使用说明

###create  `new IframeShim(element[, options]);`

**参数**
`element` 继承的父类
`options` 要混入的实例属性，可以选择一下类型：
+ `includeMargin` 覆盖范围是否包含元素的margin
+ `offset` iframe shim偏移位置, 类似CSS写法, 如: '10px 20px'
+ `className` iframe shim的样式
+ `zIndex` iframe shim的z-index值



###position  `shim.position()`

重新定位的iframe元素，当需要移动或调整的iframe元素可调用此方法。

```js
/* 示例 1 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').show();

    $('#target').css('width', 300);
    shim.position();
});
```


###show  `shim.show()`

显示iframe元素

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target');

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

    var shim = new IframeShim('#target').show();

    $('#button').click(function(){
        shim.hide();
    });    
});
```


###remove  `shim.remove()`

将iframe元素从DOM中移除

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').show();

    $('#button').click(function(){
        shim.remove();
    });    
});
```