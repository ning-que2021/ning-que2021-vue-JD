//API进行统一管理
import requests from "./request";
import mockRequest from "./mockRequest";

//三级联动接口
///api/product/getBaseCategoryList

export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})

export const reqBannerList = () => mockRequest({url: '/banner'})

export const reqFloorList = () => mockRequest({url: '/floor'})

export const reqGetSearchInfo = (params) => requests({url: '/list', method: 'post', data: params})

//获取商品详情接口  /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method: 'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post',
})

//获取购物车列表数据接口    /api/cart/cartList
export const reqCarList = () => requests({url: '/cart/cartList', method: 'get'})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

//修改商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get',
})

//获取注册验证码的接口  /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册接口  /api/user/passport/register
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录接口 服务器派发token 把token存储到本地存储空间 /api/user/passport/login
export const reqUserLogin = (data) =>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】          /api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录  清除token
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息接口   /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单交易页信息接口  /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = () => mockRequest({url: '/pay'})

export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});