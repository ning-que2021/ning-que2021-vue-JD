import {reqGoodsInfo,reqAddOrUpdateShopCart} from "../../api";
import {getUUID} from "../../utils/uuid_token";


const state = {
  goodInfo: {},
  uuid_token:getUUID()
}

const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },

}

const actions = {
  async getGoodInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId);
    //console.log(result.data.data);
    if (result.status === 200) {
      commit('GETGOODINFO', result.data.data)
    }
  },

  async AddOrUpdateShopCart({commit}, {skuId, skuNum}){
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //console.log(result);
    if (result.status==200){
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }

}

const getters = {
  //路径导航简化的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //品牌售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}