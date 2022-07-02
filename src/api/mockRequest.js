// 这份文件就是用来做拦截的
import axios from 'axios'
//引入进度条
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

// 创建一个单例（实例）
const requests = axios.create({
  baseURL: '/mock',
  timeout: 4000
})

// 拦截器 - 请求拦截
requests.interceptors.request.use(config=>{
  // 部分接口需要拿到token
  let token = localStorage.getItem('token');
  if(token){
    config.headers = {
      'aa-token': token
    }
  }
  //进度条开始动
  nprogress.start();
  return config;
}, err=>{
  return Promise.reject(err)
});


// 拦截器 - 响应拦截
requests.interceptors.response.use(res=>{
  //进度条结束
  nprogress.done();
  return res;
}, err=>{
  return Promise.reject(err)
});

// 整体导出
export default requests;