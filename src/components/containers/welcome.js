import { marqueeLine } from '../dumb';
import { slideIn } from '../animations';

import VueGesture from 'vue-gesture';

/**
 * 欢迎组件(示例)
 * @class Welcome
 * @memberof module:components/containers
 * @example
 * import { welcome } from 'path/to/components/containers'
 * export default {
 *     components: {
 *         welcome
 *     },
 *     render(h) {
 *         return (<welcome msg={"World"}></welcome>)
 *     }
 * }
 */
const welcome = {
    name: 'welcome',
    components: {
        marqueeLine,
        slideIn
    },
    data() {

        return {
            show: true 
        }
    },
    /**
     * @lends module:components/containers.welcome
     */
    props: {
        /**
         * @type {number}
         * @desc 显示的文案
         */
        msg: {
            type: String,
            default: 'World'
        }
    },
    render(h) { // eslint-disable-line
        return (
            <div v-record-click="/record?type=userclick&action=click">
                { h('div', { domProps: { innerHTML: '<span style="color: red;">Welcome</span>' } }) }
                <div {...{ domProps: { innerHTML: '<span style="color: red;">Welcome</span>' } }}></div>
                { 
                    this.show && <div class="example abc" 
                        v-record-load="/record?type=pageload&action=load"
                        v-tap={this.handleClick}>Hello {this.msg}</div>
                }
                <div class="example cba" 
                    v-record-load="/record?type=pageload&action=load"
                    v-tap={this.handleTouch}>扯呼</div>
                <div class="1example other">Oh Yeah</div>
                <marquee-line  speed={ 5 }>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃, 叔叔家里还有好多小猫小狗</div>
                    <div>你好呀, 小妹妹, 叔叔给你糖吃</div>
                </marquee-line>
                <div class="toast">Hello</div>
            </div>
        );
    },
    methods: {
        handleClick(event) {
            this.show = !this.show;
            console.log(event)
        },
        handleTouch(event) {
            console.log('My God');
        }
    }
};

export default welcome;
