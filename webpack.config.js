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
		chunks   : ['common', name]
	};
};
var getHtmlLayoutConfig = function(name){
	return{
		template : './src/view/layout/'+name+'.html',
		filename : 'view/'+name+'.html',
		inject   : true,
		hash     : true,
		chunks   : ['common','navsimple'] 
	}
};

var exportContent ={
	entry:{
		'common': ['./src/page/common/index.js'],
		'index': "./src/page/index/index.js",
		'transaction': "./src/page/transaction/index.js",
		'confirm': "./src/page/confirm/index.js",
		'result': "./src/page/result/index.js",
		'tranList': "./src/page/tranList/index.js",
		'tranDetail': "./src/page/tranDetail/index.js"
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
		new htmlWebpackPlugin(getHtmlConfig('transaction')),
		new htmlWebpackPlugin(getHtmlConfig('confirm')),
		new htmlWebpackPlugin(getHtmlConfig('result')),
		new htmlWebpackPlugin(getHtmlConfig('tranList')),
		new htmlWebpackPlugin(getHtmlConfig('tranDetail')),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'page/common/common.js'
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