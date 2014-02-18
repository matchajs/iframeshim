/**
 * thanks:
 *  - http://mootools.net/docs/more/Utilities/IframeShim
 *  - https://github.com/aralejs/iframe-shim
 */
define("matcha/iframeshim/1.0.0/iframeshim-debug", [ "jquery-debug-debug", "matcha/position/1.0.0/position-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug-debug");
    var Position = require("matcha/position/1.0.0/position-debug");
    var isIE6 = (window.navigator.userAgent || "").toLowerCase().indexOf("msie") !== -1;
    var defaultOptions = {
        includeMargin: false,
        // 覆盖范围是否包含元素的margin
        offset: "",
        // iframe shim偏移位置, 类似CSS写法, 如: '10px 20px'
        className: "ui-iframe-shim",
        // iframe shim的样式
        zIndex: null
    };
    function IframeShim(element, options) {
        var self = this;
        if (isIE6) {
            self.options = $.extend({}, defaultOptions, options || {});
            var $target = $(element);
            if (!$target[0]) {
                throw new Error("Invalid Element.");
            }
            self.$target = $target.eq(0);
            // 一对一
            self.$shim = null;
        } else {
            self.position = self.hide = self.show = self.remove = Noop;
        }
        return self;
    }
    $.extend(IframeShim.prototype, {
        /**
         * 定位iframe shim
         * @returns {IframeShim}
         */
        position: function() {
            var self = this;
            var opts = self.options;
            var $target = self.$target;
            if (!$target || !$target[0]) {
                return self;
            }
            var includeMargin = !!opts.includeMargin;
            var targetWidth = $target.outerWidth(includeMargin);
            var targetHeight = $target.outerHeight(includeMargin);
            if (!targetWidth || !targetHeight || $target.is(":hidden")) {
                return self.hide();
            }
            var $shim = self.$shim;
            if (!$shim || !$shim[0]) {
                self.$shim = $shim = createShim.call(self);
            }
            if (includeMargin) {
                var targetMargin = getElementMargin($target);
                var targetPos = -targetMargin.left + " " + -targetMargin.top;
            }
            $shim.css({
                width: targetWidth,
                height: targetHeight
            });
            Position({
                element: $shim,
                pos: opts.offset
            }, {
                element: $target,
                pos: targetPos || ""
            });
            return self;
        },
        /**
         * 显示iframe shim并定位到目标元素位置
         * @returns {IframeShim}
         */
        show: function() {
            var self = this;
            self.position();
            self.$shim.css("display", "block");
            return self;
        },
        /**
         * 隐藏iframe shim
         * @returns {IframeShim}
         */
        hide: function() {
            var self = this;
            var $shim = self.$shim;
            $shim && $shim.css("display", "none");
            return self;
        },
        /**
         * 移除iframe shim
         * @returns {IframeShim}
         */
        remove: function() {
            var self = this;
            var $shim = self.$shim;
            $shim && $shim.remove();
            self.$shim = null;
            return self;
        }
    });
    module.exports = IframeShim;
    // Helpers
    function Noop() {
        return this;
    }
    /**
     * 创建shim，默认display:none
     * @returns {jQuery}
     */
    function createShim() {
        var self = this, opts = self.options;
        var $target = self.$target;
        var style = {
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            border: "none",
            opacity: 0
        };
        // zIndex：配置 > 目标元素
        if (opts.zIndex != null) {
            style.zIndex = opts.zIndex;
        } else {
            var zIndex = $target.css("zIndex");
            if (zIndex && zIndex > 0) {
                style.zIndex = zIndex - 1;
            }
        }
        var $shim = $("<iframe>", {
            src: 'javascript:"";document.write("");',
            frameborder: 0,
            scrolling: "no",
            "class": opts.className
        }).css(style);
        $shim.insertBefore($target);
        return $shim;
    }
    function getElementMargin($el) {
        var elementMargin = $el.css("margin");
        elementMargin = elementMargin.split(" ");
        var margin = {};
        switch (elementMargin.length) {
          case 4:
            margin.top = toNumber(elementMargin[0]);
            margin.right = toNumber(elementMargin[1]);
            margin.bottom = toNumber(elementMargin[2]);
            margin.left = toNumber(elementMargin[3]);
            break;

          case 3:
            margin.top = toNumber(elementMargin[0]);
            margin.right = margin.left = toNumber(elementMargin[1]);
            margin.bottom = toNumber(elementMargin[2]);
            break;

          case 2:
            margin.top = margin.bottom = toNumber(elementMargin[0]);
            margin.right = margin.left = toNumber(elementMargin[1]);
            break;

          default:
            margin.top = margin.right = margin.bottom = margin.left = toNumber(elementMargin[0]);
            break;
        }
        return margin;
    }
    function toNumber(o) {
        return parseFloat(o) || 0;
    }
});
