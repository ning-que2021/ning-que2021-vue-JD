import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
import store from "../store";

Vue.use(VueRouter)


//重写push|replace 方法
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点：都可以调用函数·篡改函数的上下文
    //不同点：call传递参数要用，隔开  而apply传递参数要传递 数组[]
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    })
  }
}

//重写replace 方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    })
  }
}


const router = new VueRouter({
  routes,
  //跳转后滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {y: 0}
  }
});
//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
  //to可以获取到你要跳转到哪个路由的信息
  //from：可以获取到你从哪个路由而来的信息
  //next：放行函数   next() 全部放行; next（‘path’）放行到指定的路由
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  //如果已经登录
  if (token) {
    //已经登录还想去login，不能去返回首页
    if (to.path == '/login') {
      next('/home')
    } else {
      //登录，去的不是login，而是其他路由组件页面
      //如果用户名已经有了 放行
      if (name) {
        next()
      } else {
        //如果没有用户信息，派发action让仓库存储用户信息再跳转
        //妙
        try {
          await store.dispatch('getUserInfo');
          next()
        } catch (error) {
          //token失效了获取不到用户信息，重新登录
          //清楚token
          store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
})

export default router
