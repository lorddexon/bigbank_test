const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/resources/scss/_variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  }
}
