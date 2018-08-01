const path = require("path");
module.exports = {
  entry: ['./src/index.js'],
  output: {
    // path: __dirname,
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    // proxy: {
    //   '/api/*': {
    //       target: 'http://localhost:4000',
    //       secure: false,
    //       changeOrigin: true,
    //   }
    // },
  }
};
