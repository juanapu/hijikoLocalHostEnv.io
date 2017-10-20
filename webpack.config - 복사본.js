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
		commons: "./src/page/common/commons.js",
		index: "./src/page/index/index.js",
		"user-login": "./src/page/user-login/user-login.js",
		test: "./src/page/test/test.js",	
	},
	output: {
		path: __dirname+'/dist',
		publicPath: '/dist',
		filename: './src/page/[name]/[name].js'
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