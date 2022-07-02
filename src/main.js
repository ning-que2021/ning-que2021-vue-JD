import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//三级联动组件--全局组件
import TypeNav from "./components/TypeNav";
import Carousel from "./components/Carousel";
import Pagination from "./components/Pagination";
import { Button,MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload'

import "./mock/mockServe";
import 'swiper/css/swiper.css'

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button);
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox;
import atm from "./assets/1.jpg";

//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});//多了一个v-upper

Vue.config.productionTip = false

//统一接受api文件夹里全部的请求函数
import * as API from "./api";  //统一引入
//引入表单校验插件
import './plugins/validate'

Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
}).$mount('#app')
