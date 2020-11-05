const vueConfig = {
  devServer: {
    proxy: {
      '/test': {
        target: 'http://127.0.0.1:3000/',
        //ws: true,
        changeOrigin: true,
      },
      '/sns': {
        target: 'https://api.weixin.qq.com',
        //ws: true,
        changeOrigin: true,
      },
    },
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        prependData: `@import '~@/styles/variables.scss';`,
      },
    },
  },
}

module.exports = vueConfig
