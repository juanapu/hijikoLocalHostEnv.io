var webpack = require('webpack');
var htmlWebpackPlugin= require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//deploy environment online/dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//get html-webpack-plugin configuration parameters

var getHtmlConfig = function(name){
	return{
		template : './src/view/'+name+'.html',
		filename : 'view/'+name+'.html',
		inject   : true,
		hash     : true,
		chunks   : ['commons', name]
	};
};
var getHtmlLayoutConfig = function(name){
	return{
		template : './src/view/layout/'+name+'.html',
		filename : 'view/'+name+'.html',
		inject   : true,
		hash     : true,
		chunks   : ['commons','navsimple'] 
	}
};

var exportContent ={
	entry:{
		commons: "./src/page/common/index.js",
		index: "./src/page/index/index.js",
		"user-login"   :    "./src/page/user-login/index.js",
		"user-register": "./src/page/user-register/index.js",
		test: "./src/page/test/index.js",
		"user-pass-reset" : "./src/page/user-pass-reset/index.js",
		"user-center"     : "./src/page/user-center/index.js",
		"user-center-update": "./src/page/user-center-update/index.js",
		"list"				: "./src/page/list/index.js",
		"detail"			: "./src/page/detail/index.js",
		"result"			: "./src/page/result/index.js",
		"cart"			: "./src/page/cart/index.js",
		"confirm"			: "./src/page/confirm/index.js"
	},
	output: {
		path: __dirname+'/dist',
		publicPath: '/dist',
		filename: './src/page/[name].js'
	}, 
	module: {  
	    rules: [
	      {
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: "css-loader"
	        })
	      },
	      {
	      	test: /\.(gif|png|jpg|jpeg)\??.*$/,
	      	loader: 'url-loader',
	      	options: {
	      		limit: 100,
	      		name: '/resource/img/[name].[ext]'
	      	}
	      },
	      {
	      	test: /\.(woff|eot|svg|ttf|woff2)\??.*$/,
	      	loader: 'url-loader',
	      	options: {
	      		limit: 100,
	      		name: '/resource/font/[name].[ext]'
		      }
		  },
		  {
		  	test: /\.string$/,
		  	loader: 'html-loader'
		  }
	    ]
	  },
	plugins: [
		new htmlWebpackPlugin(getHtmlConfig('index')),
		new htmlWebpackPlugin(getHtmlConfig('test')),
		new htmlWebpackPlugin(getHtmlConfig('user-login')),
		new htmlWebpackPlugin(getHtmlConfig('user-register')),
		new htmlWebpackPlugin(getHtmlConfig('user-pass-reset')),
		new htmlWebpackPlugin(getHtmlConfig('user-center')),
		new htmlWebpackPlugin(getHtmlConfig('user-center-update')),
		new htmlWebpackPlugin(getHtmlConfig('list')),
		new htmlWebpackPlugin(getHtmlConfig('detail')),
		new htmlWebpackPlugin(getHtmlConfig('result')),
		new htmlWebpackPlugin(getHtmlConfig('cart')),
		new htmlWebpackPlugin(getHtmlConfig('confirm')),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'page/commons/commons.js'
		}),
		new ExtractTextPlugin("page/[name]/[name].css")
	],
	resolve: {
            alias: {
                util: __dirname+'/src/util',
                service : __dirname+'/src/service',
            }
       }
};


if('dev' === WEBPACK_ENV){
	config.entry.commons.push('webpack-dev-server/client?http://localhost:8080');
};
 

module.exports=	exportContent;