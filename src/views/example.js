/* global process, logger */

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//


// windows特殊处理
if (process.env.IS_WINDOWS) {
    require('../static/js/compatible');
}

// 仅开发模式使用
if (process.env.NODE_ENV === 'development') {
    console.log('欢迎使用vue-bolilerplate.  fe@knowbox.com 敬上.', '欢迎');
}

import Vue from 'vue';
import VueTap from '../plugins/vue-tap';
import VueRecord from '../plugins/vue-record';

// import global styles
import '../styles/app.less';
// import requestAnimationFrame polyfill
import '../utils/requestAnimationFrame';

// import routes table
import router from '../routes/appRoute';

Vue.use(VueTap);
Vue.use(VueRecord, {
    host: 'http://domain.com'
});

// create root instance and mount to #app element
// #app element is in ../template/app.html
// eslint-disable-next-line
const app = new Vue({
    router,
    render(h) { // eslint-disable-line no-unused-vars
        return (
            <router-view></router-view>
        );
    }
}).$mount('#app');
