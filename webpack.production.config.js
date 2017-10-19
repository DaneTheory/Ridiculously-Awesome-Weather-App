// Core
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

// Module
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssCalc = require('postcss-calc');
const config = require('./src/config');

const join = path.join;
const resolve = path.resolve;

const root = resolve(__dirname);
const src = join(root, 'src');

console.log('Building production bundle with config: ', JSON.stringify(config, null, 2));

const makePcssLoader = (env) => {
  return {
    // Matches local styles (excludes node_modules)
    test: /\.pcss$/,
    loader: ExtractTextPlugin.extract([], [
      'css-loader?modules&camelCase&importLoaders=1',
      'postcss-loader',
    ]),
    exclude: path.resolve(__dirname, 'node_modules'),
  };
};

module.exports = {
  context: __dirname,
  entry: {
    app: [
      join(src, 'index.jsx'),
    ],
  },
  output: {
    path: join(root, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { /* uglify config */ },
    }),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      /* Note: process.env vars must be quoted! */
      // Note: This forces react to use the production build
      'process.env.NODE_ENV': '"production"',
      'process.env.API_KEY': process.env.API_KEY ? `"${ process.env.API_KEY }"` : 'undefined',
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false,
      // toggles redux-devtools
      __DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Wthrly - Do the Weather Thing!',
      template: join(src, 'static/index-template.ejs'),
    }),
  ],
  module: {
    loaders: [
      /* Style Files */
      makePcssLoader(NODE_ENV),
      {
        // Matches vendor styles (in node_modules)
        // Bundles css without transforms / modules
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([], [
          'css-loader?localIdentName=[name]---[local]---[hash:base64:5]',
        ]),
        include: path.resolve(__dirname, 'node_modules'),
      },
      {
        // react-toolbox requires scss files
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([], [
          'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss-loader',
          `sass-loader?data=@import "${ path.resolve(__dirname, 'src/theme/_config.scss') }";`,
        ]),
      },

      /* Script / JSON Files */
      {
        // JS files that live outside of node_modules get transpiled without react
        test: /\.js$/,
        loaders: [
          'babel-loader?presets[]=es2015,presets[]=stage-2',
          'eslint-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        // All JSX files get transpiled with react
        test: /\.jsx$/,
        loaders: [
          // Same as js w/o react plugin
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2',
          'eslint-loader',
        ],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },

      /* Image Files */
      {
        test: /\.(jpe?g|png|gif)$/,
        loaders: ['file-loader?regExp=/?src/static/(.*)&name=[1]'],
      },
      {
        test: /\.svg(\?\S*)?$/,
        loaders: ['file-loader?regExp=/?src/static/(.*)&name=[1]'],
      },

      /* Font Files */
      {
        test: /\.otf(\?\S*)?$/,
        loaders: ['file-loader&name=fonts/[name].[ext]'],
      },
      {
        test: /\.eot(\?\S*)?$/,
        loaders: ['file-loader&name=fonts/[name].[ext]'],
      },
      {
        test: /\.ttf(\?\S*)?$/,
        loaders: ['file-loader&name=fonts/[name].[ext]'],
      },
      {
        test: /\.woff2?(\?\S*)?$/,
        loaders: ['file-loader&name=fonts/[name].[ext]'],
      },
    ],

  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      components: join(src, 'components'),
      actions: join(src, 'actions'),
      reducers: join(src, 'reducers'),
      utils: join(src, 'utils'),
      images: join(src, 'static/images'),
    },
  },

  /* Loader Configs */
  postcss() {
    // These plugins are applied to .pcss files (in reverse order)
    return [
      precss,
      postcssCalc,
      autoprefixer,
    ];
  },
};
