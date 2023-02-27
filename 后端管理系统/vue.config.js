const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  devServer: {
    proxy: {
      ///api是后端数据接口的上下文路径
      '/httpServer': {
        //这里的地址是后端数据接口的地址
        target: 'http://localhost:5000',
        //允许跨域
        changeOrigin: true,
        client: {
          webSocketURL: 'ws://0.0.0.0:6103/ws',
        },
        pathRewrite: {
          "^/httpServer": "",
        },
      }
    }
  }
})
