/**
 * thanks:
 *  http://mootools.net/docs/more/Utilities/IframeShim
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var Position = require('position');

    var isIE6 = (window.navigator.userAgent || '').toLowerCase().indexOf('msie 6') !== -1;

    var defaultOptions = {
        includeMargin: false, // 覆盖范围是否包含元素的margin
        offset: '',
        className: 'iframe-shim',
        zIndex: null
    };

    function createShim() {
        var self = this, opts = self.options;
        var $target = self.$target;

        var style = {
            position: 'absolute',
            border: 'none',
            opacity: 0
        };

        var zIndex = $target.css('zIndex');
        if (zIndex && zIndex > 0) {
            style.zIndex = zIndex - 1;
        }
        if (!opts.zIndex) {
            style.zIndex = opts.zIndex;
        }

        var $shim = $('<iframe>', {
            src: 'javascript:false;document.write("");',
            frameborder: 0,
            scrolling: 'no'
        }).css(style);

        $shim.insertBefore($target);

        return $shim;
    }

    function IframeShim(element, options) {
        var self = this;

        if (isIE6) {
            self.options = $.extend({}, (options || {}), defaultOptions);

            var $target = $(element);

            if (!$target[0]) {
                throw new Error('Invalid Element.');
            }

            self.$target = $target.eq(0); // 只能一对一
            self.$shim = null;
        } else {
            self.position = self.show = self.hide = self.remove = function(){return self};
        }

        return self;
    }

    IframeShim.prototype = {
        constructor: IframeShim,
        position: function() {
            var self = this;
            var opts = self.options;
            var includeMargin = !!opts.includeMargin;

            var $target = self.$target;
            var targetWidth = $target.outerWidth(includeMargin);
            var targetHeight = $target.outerHeight(includeMargin);

            if (!targetWidth || !targetHeight) {
                return self.hide();
            }

            var $shim = self.$shim;
            if (!$shim[0]) {
                self.$shim = $shim = createShim.call(self);
            }

            $shim.css({
                width: targetWidth,
                height: targetHeight
            });

            Position({
                element: $shim, pos: opts.offset
            }, $target);

            return self.show();
        },
        show: function() {
            var self = this;
            var $shim = self.$shim;
            $shim && $shim.css('display', 'block');
            return self;
        },
        hide: function() {
            var self = this;
            var $shim = self.$shim;
            $shim && $shim.css('display', 'none');
            return self;
        },
        remove: function() {
            var self = this;
            var $shim = self.$shim;
            $shim && $shim.remove();
            return self;
        }
    };

    module.exports = IframeShim;
});