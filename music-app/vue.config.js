const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

configureWebpack: (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.mode = 'production';
    config["performance"] = {
      "maxEntrypointSize": 100000000,
      "maxAssetSize": 300000000
    }
  }
}