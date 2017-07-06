/* global window */
(function() {
    var defaultOptions = {
        host: ''
    };

    function merge(options) {
        for (var key in defaultOptions) {
            if (!options[key])
                options[key] = defaultOptions[key];
        }
    }

    function setEventHandler(el, type, handler) {
        if (!el.addEventListener) {
            el.addEventListener = function(type, handler) {
                el.attachEvent('on' + type, handler);
            };
        }

        return el.addEventListener(type, handler, false);
    }

    function emitEventHander(url) {
        var URL = url + (url.indexOf('?') > -1 ? '&' : '?') + (+new Date);

        if (window.navigator.sendBeacon) {
            // 即使页面跳转, 浏览器页会尽可能坚强的发送一个请求出去
            window.navigator.sendBeacon(url);
        } else {
            (new Image()).src = URL;
        }
    }

    var vueRecord = {
        install: function(Vue, options = defaultOptions) {
            merge(options);

            var host = options.host;

            Vue.directive('recordLoad', {
                bind: function(el, binding) {
                    if (window.document.readyState === 'complete') {
                        emitEventHander.bind(el, host + binding.value)();
                    } else {
                        setEventHandler(window, 'load', emitEventHander.bind(el, host + binding.value));
                    }
                }
            });

            Vue.directive('recordClick', {
                bind: function(el, binding) {
                    setEventHandler(el, 'click', emitEventHander.bind(el, host + binding.value));
                }
            });
        }
    };

    if (typeof exports == 'object') {
        module.exports = vueRecord;
    } else if (typeof define == 'function' && define.amd) { // eslint-disable-line no-undef
        define([], function () { // eslint-disable-line no-undef
            return vueRecord;
        });
    } else if (window.Vue) {
        window.vueRecord = vueRecord;
        window.Vue.use(vueRecord);
    }
})();
