const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './assets/scripts/index.js',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'sounds',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules\/@firebase/ // to exclude firebase from source-map
        // exclude: /node_modules\/@firebase\/auth/ //to just exclude firebase auth from source-map
        // https://stackoverflow.com/questions/62694558/firebase-auth-import-source-map-warnings
      }
    ]
  }
};
