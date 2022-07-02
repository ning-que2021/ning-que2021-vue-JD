import {reqCarList, reqDeleteCartById, reqUpdateCheckedById} from "../../api";


const state = {
  cartList: []
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  //获取购物车列表数据
  async getCartList({commit}) {
    let result = await reqCarList();
    //console.log(result);
    if (result.status == 200) {
      commit('GETCARTLIST', result.data.data)
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({commit}, skuId) {
    let result = await reqDeleteCartById(skuId);
    //console.log(result);
    if (result.status == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.data.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
//删除全部选中的商品
  deleteAllCheckedCart({dispatch, getters}) {
    //context:小仓库
    //获取购物车中全部的商品【是一个数组】
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
      //将每一次返回的promise添加到数组中
      PromiseAll.push(promise)
    });
    //只要全部的p1,p2...都成功，返回结果即为成功，
    //如果有一个失败，返回的即为失败结果
    return Promise.all(PromiseAll)
  },
  //修改产品全选状态
  updateAllCartIsChecked({dispatch, state}, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
      promiseAll.push(promise)
    });
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}