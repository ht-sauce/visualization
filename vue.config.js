const vueConfig = {
  devServer: {
    proxy: {
      '/test': {
        target: 'http://127.0.0.1:3000/',
        //ws: true,
        changeOrigin: true,
      },
    },
  },
}

module.exports = vueConfig
