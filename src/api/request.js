// 这份文件就是用来做拦截的
import axios from 'axios'
//引入进度条
import nprogress from "nprogress";
//进度条样式
import 'nprogress/nprogress.css'
import store from "../store";


// 创建一个单例（实例）
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 拦截器 - 请求拦截
requests.interceptors.request.use((config) => {

  // 部分接口需要拿到token
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段，和后台老师商量好的
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要带token给服务器
  if (store.state.user.token){
    config.headers.token = store.state.user.token
  }
  //进度条开始动
  nprogress.start();
  return config;
}, err => {
  return Promise.reject(err)
});


// 拦截器 - 响应拦截
requests.interceptors.response.use((res) => {
  //进度条结束
  nprogress.done();
  return res;
}, (error) => {
  return Promise.reject(new Error('faile'));
});

// 整体导出
export default requests;