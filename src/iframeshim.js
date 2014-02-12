/**
 * thanks:
 *  http://mootools.net/docs/more/Utilities/IframeShim
 *  https://github.com/aralejs/iframe-shim
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var Position = require('position');

    var isIE6 = (window.navigator.userAgent || '').toLowerCase().indexOf('msie 6') !== -1;

    var defaultOptions = {
        includeMargin: false, // 覆盖范围是否包含元素的margin
        offset: '',
        className: 'ui-iframe-shim',
        zIndex: null
    };

    var IframeShim = isIE6 ? function(element, options) {
        var self = this;

        self.options = $.extend({}, (options || {}), defaultOptions);

        var $target = $(element);

        if (!$target[0]) {
            throw new Error('Invalid Element.');
        }

        self.$target = $target.eq(0); // 只能一对一
        self.$shim = null;


        return self;
    } : function() {};

    var extendPrototype = isIE6 ? {
        position: function() {
            var self = this;
            var opts = self.options;
            var includeMargin = !!opts.includeMargin;

            var $target = self.$target;
            var targetWidth = $target.outerWidth(includeMargin);
            var targetHeight = $target.outerHeight(includeMargin);

            if (!targetWidth || !targetHeight || $target.is(':hidden')) {
                return self.hide();
            }

            var $shim = self.$shim;
            if (!$shim || !$shim[0]) {
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
    } : {
        position: Noop,
        show: Noop,
        hide: Noop,
        remove: Noop
    };

    $.extend(IframeShim.prototype, extendPrototype);

    module.exports = IframeShim;

    // Helpers

    function Noop() {return this;}

    function createShim() {
        var self = this, opts = self.options;
        var $target = self.$target;

        var style = {
            position: 'absolute',
            border: 'none',
            opacity: 0
        };

        if (opts.zIndex != null) {
            style.zIndex = opts.zIndex;
        } else {
            var zIndex = $target.css('zIndex');
            if (zIndex && zIndex > 0) {
                style.zIndex = zIndex - 1;
            }
        }

        var $shim = $('<iframe>', {
            src: 'javascript:false;document.write("");',
            frameborder: 0,
            scrolling: 'no'
        }).css(style);

        $shim.insertBefore($target);

        return $shim;
    }
});