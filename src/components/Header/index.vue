<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>京东欢迎您！</p>
            <p v-if="!userName">
              <router-link to="/login">请登录</router-link>
              <router-link to="/register" class="register">免费注册</router-link>
            </p>
            <p v-else>
              <a>{{userName}}</a>
              <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myOrder">我的订单</router-link>
            <router-link to="/shopCart">我的购物车</router-link>
            <a href="###">我的京东</a>
            <a href="###">京东会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注京东</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt=""></router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return {
      keyword:''
    }
  },
  computed:{
    userName(){
      return this.$store.state.user.userInfo.name
    }
  },
  mounted() {
    this.add()
    this.$bus.$on('clear',()=>{
      this.keyword = ''
    })
  },
  methods: {
    add(){
      for (let i = 0; i < 10; i++) {
        setTimeout(()=>{
          console.log(i);
        },1000)
      }
    },
    goSearch() {
      //路由传参：qq
      //第一种：字符串形式
      //this.$router.push('/search/' + this.keyword+'?k='+this.keyword.toUpperCase())
      //第二种：模板字符串
      //this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //第三种：对象写法
      // this.$router.push({name:'search',params:{keyword:this.keyword || undefined}})
      if (this.$route.query){
        let location = {name:'search',params:{keyword:this.keyword || undefined}};
        location.query = this.$route.query;
        this.$router.push(location)
      }
    },
    //退出登录
    async logout(){
      try {
        await this.$store.dispatch('userLogout')
      }catch (error){
        alert(error.message)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.header {

  &
  > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }

        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &
          + a {
            border-left: 1px solid #b3aeae;
          }

        }

      }

    }
  }

  &
  > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {

        img {
          width: 175px;
          margin: 25px 45px;
        }

      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &
          :focus {
            outline: none;
          }

        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &
          :focus {
            outline: none;
          }

        }
      }
    }
  }
}
</style>