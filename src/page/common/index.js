
"use strict"

require('./layout.css');
require('./empty.css');
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
			if((!cookieStore.email)||(!cookieStore.password)){
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
			email: Cookies.get('email')?Cookies.get('email'):0,
			nickname: Cookies.get('nickname')?Cookies.get('nickname'):0,
			password: Cookies.get('password')?$.base64.decode(Cookies.get('password')):Cookies.get('password'),
			user_firstname: Cookies.get('user_firstname')?Cookies.get('user_firstname'):0,
			user_lastname: Cookies.get('user_lastname')?Cookies.get('user_lastname'):0,
			user_id: Cookies.get('user_id')?Cookies.get('user_id'):0,
		};
		return cookieStore;
	},
	setCookie: function(name,val){
		Cookies.set(name,val,{expires: 7,path : '/'});
	},
	cleanCookie: function(){
		Cookies.remove('email', { path: '/' });
		Cookies.remove('nickname', { path: '/' });
		Cookies.remove('password', { path: '/' });
		Cookies.remove('user_id', { path: '/' });
		Cookies.remove('user_firstname', { path: '/' });
		Cookies.remove('user_lastname', { path: '/' });
	}

};

$(function(){
	commonJs.init();
});


module.exports=commonJs;