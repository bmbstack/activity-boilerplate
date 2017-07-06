/**
 * 性能统计 - 全部完成时间
 * @author Nixon
 * @since 2017年01月02日
 */

(function() {
    if (window.performance) {
        window.time = window.time || {
            loaded: 0
        };

        window.addEventListener('load', function() {
            window.time.loaded = +new Date - window.performance.timing.navigationStart;

            var queryStrings = [];
            for(var key in window.time) {
                queryStrings.push(key + '=' + window.time[key]);
            }

            var host;
            if (window.document.body.dataset) {
                host = window.document.body.dataset['performanceHost'];
            } else {
                host = window.document.body.getAttribue('data-performance-host');
            }

            (new Image()).src = host + '/log?' + queryStrings.join('&') + '&' + (+new Date);
        });
    }
})();
