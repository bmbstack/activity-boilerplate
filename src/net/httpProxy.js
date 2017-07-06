import axios from 'axios';
import storage, { AUTHORIZATION_KEY } from '../utils/storage';
import { HTTP_METHOD } from '../constants/http';

/** @module net/httpProxy */

/**
 * @function httpProxy
 * @author Nixon
 * @see {@link https://github.com/mzabriskie/axios axios} on Github
 * @param {string} url api地址
 * @param {string} [method] {@link module:constants/http method}
 * @param {object} [data] 发起非GET请求时的requestBody
 * @param {boolean} [credentials] 是否认证
 * @returns {promise}
 * @example
 * import httpProxy from 'path/to/net/httpProxy';
 * httpProxy('remote/to/api')
 *     .then((response) => {
 *         // TODO: add your code
 *     });
 */
export default (url, method = HTTP_METHOD.GET, data = {}, credentials = false) => {
    const options = {
        url,
        method,
        headers: {
            'Authorization': storage.getData(AUTHORIZATION_KEY) || 'token will be here',
        },
        withCredentials: credentials
    };

    if (method !== HTTP_METHOD.GET) {
        options.headers['Accept'] = 'application/json';
        options.headers['Content-Type'] = 'application/json;charset=UTF-8';
        options.data = data;
    }
    if (method === HTTP_METHOD.GET) {
        options.params = data;
    }

    return axios(options);
};
