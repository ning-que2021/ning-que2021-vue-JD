//小仓库
import {reqCategoryList,reqBannerList,reqFloorList} from "../../api";

const state ={
  categoryList:[],
  bannerList:[],
  floorList:[]
};
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
    //console.log(state.categoryList);
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
};
const actions = {
  async categoryList({commit}){
    let result = await reqCategoryList();
    //console.log(result)
    if (result.status==200){
      commit('CATEGORYLIST',result.data.data)
    }
  },
  //获取首页轮播图数据
  async getBannerList({commit}){
    let result = await reqBannerList();
    //console.log(result);
    if (result.status == 200){
      commit('GETBANNERLIST',result.data.data)
    }
  },
  //获取floor数据
  async getFloorList({commit}){
    let result = await reqFloorList();
    if (result.status == 200){
      commit('GETFLOORLIST',result.data.data)
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