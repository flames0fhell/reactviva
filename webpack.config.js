module.exports = {
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
        presets : ['es2015','react']
      }
    }]
  }
}
