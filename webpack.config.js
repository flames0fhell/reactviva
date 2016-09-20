var webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry :{
    app : "./resource/js/app.js",
    service : "./resource/js/service.js"
  }
  ,output : {
    path : __dirname + "/public/js/",
    filename  : "[name].js"
  }
  ,module : {
    loaders : [{
      test : /\.js$/,
      exclude : /node_modules/,
      loader : ['babel-loader'],
      query:{
        presets : ['es2015','react','stage-1']
      },
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          minimize : true,
          compress: {warnings: false},
          output: {comments: false},
          sourceMap: true
        })
      ]
    }]
  }
}
