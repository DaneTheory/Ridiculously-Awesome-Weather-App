// Core
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

// Module
const Dotenv = require('dotenv-webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssCalc = require('postcss-calc');

const join = path.join;
const resolve = path.resolve;

const root = resolve(__dirname);
const src = join(root, 'src');

const makePcssLoader = (env) => {
  const localIdentName = (env === 'test') ? '[local]' : '[name]---[local]---[hash:base64:5]';
  return {
    // Matches local styles (excludes node_modules)
    test: /\.pcss$/,
    loaders: [
      'style-loader',
      `css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=${ localIdentName }`,
      'postcss-loader',
    ],
    exclude: path.resolve(__dirname, 'node_modules'),
  };
};

const config = {
  context: __dirname,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:3000', // Webpack Dev Server host and port
      'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
      join(src, 'index.jsx'),
    ],
  },
  output: {
    path: join(root, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv(),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // Note: process.env vars must be quoted!
      'process.env.NODE_ENV': '"development"',
      'process.env.API_KEY': process.env.API_KEY ? `"${ process.env.API_KEY }"` : 'undefined',
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true,
      __DEVTOOLS__: true, // Toggle redux-devtools
    }),
    new HtmlWebpackPlugin({
      title: 'Wthrly - Do the Weather Thing!',
      template: join(src, 'static/index-template.ejs'),
    }),
    new DashboardPlugin()
  ],
  module: {
    loaders: [
      // Style Files
      makePcssLoader(NODE_ENV),
      {
        // Matches vendor styles (in node_modules)
        // Bundles css without transforms / modules
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]---[local]---[hash:base64:5]',
        ],
        include: path.resolve(__dirname, 'node_modules'),
      },
      {
        // react-toolbox requires scss files
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // },

      /* Script / JSON Files */
      {
        // JS files that live outside of node_modules get transpiled without react
        test: /\.js$/,
        loaders: [
          'react-hot?errorReporter=redbox-react',
          'babel-loader',
          'eslint-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        // All JSX files get transpiled with react
        test: /\.jsx$/,
        loaders: [
          'react-hot?errorReporter=redbox-react',
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
        loaders: ['url-loader?limit=10000'],
      },
      {
        test: /\.svg(\?\S*)?$/,
        loaders: ['url-loader?mimetype=image/svg+xml&limit=10000'],
      },

      /* Font Files */
      {
        test: /\.otf(\?\S*)?$/,
        loaders: ['url-loader?limit=10000'],
      },
      {
        test: /\.eot(\?\S*)?$/,
        loaders: ['url-loader?limit=10000'],
      },
      {
        test: /\.ttf(\?\S*)?$/,
        loaders: ['url-loader?mimetype=application/octet-stream&limit=10000'],
      },
      {
        test: /\.woff2?(\?\S*)?$/,
        loaders: ['url-loader?mimetype=application/font-woff&limit=10000'],
      },
    ],
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      components: join(src, 'components'),
      actions: join(src, 'actions'),
      reducers: join(src, 'reducers'),
      utils: join(src, 'utils'),
      images: join(src, 'images'),
    },
  },

  // Loader Configs
  postcss() {
    // These plugins are applied to .pcss files (in reverse order)
    return [
      precss,
      postcssCalc,
      autoprefixer,
    ];
  },
  sassLoader: {
    data: `@import "${ path.resolve(__dirname, 'src/theme/_config.scss') }";`,
  },
};

if (NODE_ENV === 'test') {
  config.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  };
}

module.exports = config;
