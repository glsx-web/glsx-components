const path = require('path')
const webpack = require('webpack')
module.exports = {
  devtool: 'source-map',
  entry: './src/index.js', // 入口文件，就是上步骤的src目录下的index.js文件，
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出路径，就是上步骤中新建的dist目录，
    publicPath: '/dist/',
    filename: 'glsx-vue-components.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'scss-loader' },
        {
          loader: 'postcss-loader',
          options: { // 如果没有options这个选项将会报错 No PostCSS Config found
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('autoprefixer')(), // CSS浏览器兼容
              require('cssnano')() // 压缩css
            ]
          }
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
      loader: 'babel-loader'
    },
    {
      test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
      loader: 'url-loader',
      query: {
        limit: 30000,
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
