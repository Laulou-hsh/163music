"use strict";

import Vue from 'vue';
import axios from 'axios';


let config = {
    // baseURL: 'http://musicapi.leanapp.cn/',
    // baseURL: 'http://192.168.83.2:3000/',
    baseURL: 'https://music.kele8.cn/',
    // this.$axios.get('abc/') 最终拼接结果为 http://musicapi.leanapp.cn/abc/
    timeout: 60 * 1000,// 超时时间
    // withCredentials: true// 检测跨域访问
};
// 创建对象
const _axios = axios.create(config);
// 请求前置配置
_axios.interceptors.request.use(
    function (config) {
        // config.headers= {// 修改配置
        //     TOKEN: 'abc'
        // }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// 得到返回结果后的操作
_axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;

    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
        $http: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);

export default Plugin;