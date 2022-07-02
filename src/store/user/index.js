//登录与注册的模块
import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout} from "@/api";
import {setToken,getToken,removeToken} from "../../utils/token";


const state = {
  code: '',
  token:getToken(),
  userInfo:{}
};

const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  CLEAR(state){
    state.token = '';
    state.userInfo = {};

    removeToken()
  }
};

const actions = {
  async getCode({commit}, phone) {
    let result = await reqGetCode(phone);
    console.log(result.data.data);
    if (result.data.code == 200) {
      commit('GETCODE', result.data.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user);
    //console.log(result);
    if (result.data.code == 200){
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  //登录【token】
  async userLogin({commit},data){
    let result = await reqUserLogin(data);
    //console.log(result.data);
    if (result.data.code==200){
      commit('USERLOGIN',result.data.data.token);
      //持久化存储token
      setToken(result.data.data.token)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo();
    //console.log(result);
    if (result.data.code==200){
      commit('GETUSERINFO',result.data.data)
      return 'ok'
    }else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async userLogout({commit}){
    let result = await reqLogout();
    if (result.data.code==200){
      commit('CLEAR',result.data.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
};


const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}