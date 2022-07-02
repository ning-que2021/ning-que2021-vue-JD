
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/center',
    name:'center',
    component:()=>import('@/views/Center'),
    meta: {show:true},
    children:[
      {
        path:'myOrder',
        component:()=>import('@/views/Center/myOrder'),
      },
      {
        path:'groupOrder',
        component:()=>import('@/views/Center/groupOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myOrder'
      }
    ]
  },
  {
    path:'/pay',
    name:'pay',
    component:()=>import('@/views/Pay'),
    meta: {show:true},
  },
  {
    path:'/trade',
    name:'trade',
    component:()=>import('@/views/Trade'),
    meta: {show:true},
  },
  {
    path:'/shopCart',
    name:'shopCart',
    component:()=>import('@/views/ShopCart'),
    meta: {show:true},
  },
  {
    path:'/addCartSuccess',
    name:'addCartSuccess',
    component:()=>import('@/views/AddCartSuccess'),
    meta: {show:true},
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/Home'),
    meta: {show:true},
  },
  {
    path:'/Detail/:skuid',
    name:'detail',
    component:()=>import("@/views/Detail"),
    meta: {show:true},
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("@/views/Login"),
    meta: {show: false}
  },
  {
    path:'/register',
    name:'register',
    component:()=>import("@/views/Register"),
    meta: {show:false}
  },
  {
    path:'/search/:keyword?',
    name:'search',
    component:()=>import("@/views/Search"),
    meta: {show: true}
  },
]