#IframeShim

解决IE环境下，不能遮盖Select元素和Flash元素的问题。

---

##使用说明

###create  `new IframeShim(element[, options]);`

**参数**
`element` 被遮挡的目标元素，可传 Selector、DOM
`options` 要混入的实例属性，可以选择一下类型：
+ `includeMargin` 覆盖范围是否包含目标元素的margin，默认 `false`
+ `offset` iframe shim偏移位置, 类似CSS写法, 如: `'10px 20px'`，默认 `''`
+ `className` iframe shim的样式，默认 `'ui-iframe-shim'`
+ `zIndex` iframe shim的z-index值，默认 `null`



###position  `shim.position()`

定位的iframe元素，当需要移动或调整的iframe元素可调用此方法。

```js
/* 示例 */
define(function(require, exports, module) {
    var IframeShim = require('iframeshim');

    var shim = new IframeShim('#target').position();

    $('#target').css('width', 300);
    shim.position();
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

将iframe元素从DOM中移除

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