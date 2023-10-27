const config = {
  publicPath: './',
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      minimize: false,
    },
    externals: process.env.NODE_ENV === 'production' ? [
      '@antv/g6',
      'element-ui',
    ] : []
  }
}

module.exports = config
