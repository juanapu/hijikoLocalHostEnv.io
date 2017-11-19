
"use strict"

require('./layout.css');
//require('../css/style.css')

/*****define public url*******/
var rtFolderUrl='http://localhost:8080/dist/view/';
var _loading='../common/loading/index.js';

var commonJs={
	init: function(){
		var _this=this;
		FastClick.attach(document.body);  /****** mobile click event compatibility ******/
//		_this.loading();
		$("body>div").ready(function(){
//			_this.unloading();
		});
	},
	/*******page loading setting**********/
	loading: function(){
		$("#loadingWrap").show().css({opacity: 1,filter: 'alpha(opacity=100)'});
	},
	unloading: function(){
		$("#loadingWrap").css({opacity: 0,filter: 'alpha(opacity=0)'}).hide();
	}, 
	/***********cookie setting && login check******************/
	checkLogin: function(){
		var _this=this;
		var logInfo={};
		/****if it's not home page, check cookie****/
		var url=window.location.href;
		var pgUrl=url.replace(rtFolderUrl,'').substring(0,5);
		if((pgUrl.length===0)||(pgUrl==='index')){
			/******it is home page*******/
		}else{
			var cookieStore=_this.getCookie(); 
			if((!cookieStore.nickname)||(!cookieStore.password)){
				logInfo.login=false;
			}else{
				logInfo.login=true;
				logInfo.cookie=cookieStore;
			};
			return logInfo;
		};
	},
	getCookie: function(){
		var cookieStore={
			nickname: Cookies.get('nickname'),
			password: Cookies.get('password')?$.base64.decode(Cookies.get('password')):Cookies.get('password'),
			user_id: Cookies.get('user_id')?Cookies.get('user_id'):0
		};
		return cookieStore;
	},
	setCookie: function(name,val){
		Cookies.set(name,val,{expires: 7,path : '/'});
	},
	cleanCookie: function(){
		Cookies.remove('nickname', { path: '/' });
		Cookies.remove('password', { path: '/' });
		Cookies.remove('user_id', { path: '/' });
	}

};

$(function(){
	commonJs.init();
});


module.exports=commonJs;