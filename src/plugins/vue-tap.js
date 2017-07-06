~function() {
    var plugin = {
        install: function(Vue, options) {
            // 验证是否是有效点击
            isValid = isValid.bind(Vue, options || {});

            // 设置一个指令
            Vue.directive('tap', {
                bind: function(el, binding, vnode, oldVnode) {
                    el.tap = {};
                    el.tap.fn = compose(function(event) {
                        event && vnode.elm  == el && binding.value.call(el, event);
                    }, touchendHandler);

                    el.addEventListener('touchstart', touchstartHandler, false);
                    el.addEventListener('touchend', el.tap.fn, false);
                },
                update: function(el, binding, vnode, oldVnode) {
                    el.removeEventListener('touchend', el.tap.fn);

                    el.tap.fn = compose(function(event) {
                        event && vnode.elm  == el && binding.value.call(el, event);
                    }, touchendHandler);
                    
                    el.addEventListener('touchend', el.tap.fn);
                },
                unbind: function(el, binding, vnode) {
                    el.removeEventListener('touchstart', touchstartHandler);
                    el.removeEventListener('touchend', el.tap.fn);
                }
            });
        }
    };

    // 组合函数
    function compose() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);

            while(i--) {
                result = args[i].call(this, result);
            }

            return result;
        };
    }

    // 判断是否有效tap
    function isValid(options, time, distanceX, distanceY) {
        options.moment = options.moment || 10000;
        options.distance = options.distance || 40;

        return time < options.moment 
            && Math.abs(distanceX) < options.distance 
            && Math.abs(distanceY) < options.distance;
    }

    var touchstartHandler = function(event) {
        var evt = event || window.event || this.callee.caller.arguments[0];
        var touch = evt.touches[0];
        this.tap.moment = +new Date;
        this.tap.position = { x: touch.pageX, y: touch.pageY };
    };
    var touchendHandler = function(event) {
        var evt = event || window.event || this.callee.caller.arguments[0];
        var touch = evt.changedTouches[0];

        var diffTime = +new Date - this.tap.moment;
        var distanceX = touch.pageX - this.tap.position.x;
        var distanceY = touch.pageY - this.tap.position.y;

        if (isValid(diffTime, distanceX, distanceX)) {
            return event;
        }
    };

    /* eslint-disable no-undef */
    if (typeof exports == 'object') {
        module.exports = plugin;
    } else if (typeof define == 'function' && define.amd) {
        define([], function() {
            return plugin;
        });
    } else if (window.Vue) {
        window.vueTap = plugin;
        window.Vue.use(window.vueTap);
    }
    /* eslint-enable no-undef */
}();
