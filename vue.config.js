const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭生成map文件
  productionSourceMap:false,
  transpileDependencies: true,
  //配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        //pathRewrite: { '^/api': '' },不用重写路径了
      },
    },
  },
})
