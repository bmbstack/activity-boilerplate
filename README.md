# 概述

activity-boilerplate

## History
- 2017年02月18日
    1. **重大BUG**修复: v-tap事件绑定缺陷;

```javascript
import Vue from 'vue';
import VueTap from 'path/to/vue-tap';

Vue.use(VueTap);
// or
Vue.use(VueTap, {
    moment: 100,    // 按下抬起间隔100ms
    distance: 40,   // 按下抬起间距40像素
});
```

- 2017年02月15日
    1. 添加toast;

- 2017年02月14日
    1. 修改访问路径;
    2. 去除notification-logger组件;
    3. 优化页面属性;
    4. 添加常用less函数;

- 2017年02月09日
    1. 添加跑马灯组件marqueeLine;

```jsx
<marquee-line  speed={ 5 }>
    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
</marquee-line>
```

- 2017年02月07日
    1. 修复vue-tap在PC上的bug;

- 2017年01月13日
    1. 添加字体处理, 并明确字体设置规则;

- 2017年01月03日
    1. 添加Notification Logger;

```javascript
if (process.env.NODE_ENV === 'development') {
    require('notification-logger');
    logger.init();
    console.log('欢迎使用vue-bolilerplate.  fe@knowbox.com 敬上.', '欢迎');
}
```

- 2017年01月02日
    1. 添加埋点Vue插件;
    2. 添加性能统计脚本:
        - 首屏时间(src/static/js/performance-first-screen.js);
        - 白屏时间(src/static/js/performance-white-screen.js);
        - 用户可操作时间(src/static/js/performance-ready.js);
        - 总下载时间(src/static/js/performance-load.js);
        - 如果不改模板, 不需要纠结性能统计的问题, 除了需要**修改一下模板中的data-performance-host属性值**

```javascript
// Usage:
import Vue from 'vue';
import VueRecord from 'path/to/plugins/vue-record';

Vue.use(VueRecord, {
    host: 'http://domain.com'
});  // like other vue plugin

// you also can use absolute url in v-directive
// <div v-record-click="http://domain.com/record?type=userclick&action=click"></div>

new Vue({
    render: h => // eslint-disable-line no-undef
        <div 
            v-record-load="/record?type=pageload&action=load"
            v-record-click="/record?type=userclick&action=click"></div>
})
```

```html
<body data-performance-host="http://domain.com/performance">
    <div>
        <!-- ... -->
    </div>
</body>
```

- 2016年12月22日
    1. 添加[jsdoc](http://www.css88.com/doc/jsdoc/index.html);

```shell
yarn run doc
```

- 2016年12月16日
    1. 添加[eslint](http://eslint.org/docs/rules/), 重新所有utils文件
    2. 添加分享api库文件(微信, QQ);

```yaml
# .eslintrc.yml 示例
ruls:
  indent:
    - error
    - 4
```

- 2016年12月15日
    1. 修复生成/清除目标文件地址错误;
    2. 合并生成文件的配置, 生成目录/dist/${process.env.NODE_ENV}/依赖环境变量;

```javascript
// 删除生成的文件
// https://github.com/johnagan/clean-webpack-plugin
new CleanWebpackPlugin([DIST_PATH], {
    root: path.join(__dirname, '../'),
    verbose: true,
    dry: false,
    exclude: [],
}),
```

- 2016年12月12日
    1. 添加less配置项(Example 1);
    2. 添加滚动处理标记(Example 2);

```javascript
// Example 1
// less or sass variable configuration
const cssOptions = JSON.stringify({
    modifyVars: {
        'theme-color': 'red'
    }
});
```

```html
<!-- 页面中唯一的可滚动元素 -->
<div scroll></div>
```

- 2016年12月08日
    1. 添加axios异步请求方案;
    2. 标准化目录结构;

- 2016年12月07日
    1. 去掉对webpack-dashboard插件的使用;
    2. 启用[webpack.BannerPlugin](http://webpack.github.io/docs/list-of-plugins.html#bannerplugin)插件, 用于在脚本文件添加版本信息;
    3. 添加渲染raw html的代码示例(Example 1);
    4. 添加[webpack-shell-plugin](https://github.com/1337programming/webpack-shell-plugin)插件的使用, 用于在dev-server准备就绪时自动打开浏览器(Example 2);

```javascript
// Example 1
const component = {
    render(h) {
        // Dangerious! Make sure you won't be XSS attacked;
        return (
            <div { ...{ domProps: { innerHTML: "<span></span>" } } }></div>
        );
    }
}
```

```javascript
// Example 2
// ./webpack.config.development.js
const result = {
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ['echo ...'],
            onBuldEnd: ['open http://localhost:8090/example.html']
        })
    ]
}
```

- 2016年12月06日
    1. 添加vuex2.x和vue-router2.x;
    2. 添加基于mocha+chai的测试用例示例;
    3. 去除vue-resource, 用isomorphic-fetch替代. 理由是vue-resource依赖DOM对象, 不适合做代码同构;
    4. 优化了utils的工具函数;
    5. 修改v-tap.js使其兼容vue2.x,并不再支持vue1.x, 并修复一个v-tap的bug;
    6. 添加埋点库[in-view](https://github.com/camwiegert/in-view);

- 2016年10月25日
    1. 取消对webpack-dashboard的使用,所以同时去掉了package.json中的script -> `npm run dev:win`;
    2. 使用JSX语法与Render函数编写`project/components/example1.js`组件;
    3. 使用传统方法编写`project/components/example2.vue`组件;
    4. 在`project/module/example.js`中使用上述两种方式编写的组件:
        - Render函数必须保留第一个参数h, [为什么?](https://vuejs.org/guide/render-function.html);
        - 使用JSX语法编写的组件不需要在根实例中注册即可在Render函数中使用;
        - 传统方法编写的组件仍需在html文件使用.

**注意**: 使用JSX需要安装额外的[babel插件](https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage), 本脚手架中已安装;

- 2016年10月19日
    1. 添加sass-loader, 加载vue文件之外的sass文件;  
    2. 修改vue版本为2.0

- 2016年09月24日
    1. 添加工作平台操作系统识别,windows在以下情况下需要特殊处理:
        - 在开发时引用compatible.js文件,需要手动require, 无法在模板中通过script引入
    2. 验证编译条件环境标识通过
    3. 添加JSON-loader

- 2016年09月23日 
    添加less-loader, 加载vue文件之外的less文件;
