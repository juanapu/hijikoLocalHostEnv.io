/******index*****/

"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/loading/index.js');
var _headerIndex=require('../common/headerIndex/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');
var _commonJs=require('../common/index.js');
require('./layout.js');
var loginHtml=require('./login.string');  //get customized string module for login & register
var registerHtml=require('./register.string');
var img; // insert image to html code

/****define page move*****/
var goTransaction="./transaction.html";
var goForgetPw='./forgetPw.html';


var index={
	init: function(){
		var _this=this;
		_this.checkTarget(); //check what's the purpose of user. 
	},
	checkTarget: function(){
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.userRegister();
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.bindUserLogic();
		}else{
			_this.userLogin();
			_this.insertHtml(loginHtml,$(".formWrap"));
		};
		_this.insertImg();
		_this.bindUserLogic(); // register,login,reset password etc page jumps
	},
	insertHtml: function(string,insertDomSelector){
		var insert=_mm.renderHtml(string,{});
		insertDomSelector.html(insert);
	},
	insertImg: function(){
		var innerDiv=$(".main>.wrap").children("div");

		for(var i=1;i<=innerDiv.length;i++){
			img=require('../../resource/img/pg'+i+'.png');
			$(".main>.wrap>.pg"+i+">.content>.description>img").attr('src',img);
		};
	},
	bindUserLogic: function(){
/*		var _this=this;
		_this.userLogin();
		var callbackFun=function(){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.userRegister();
			 $("a.jsLogin").click(function(){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
			 	_this.userLogin();
				 $("a.jsRegister").click(function(){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
	 				_this.userRegister();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun);   */
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.registerAccessFunc();
		}else{
			_this.loginAccessFunc(); 
		};
	},
	registerAccessFunc: function(){
		var _this=this;
		_this.userRegister(); //
		var callbackFun=function(){ // show findPw form
			_this.insertHtml(loginHtml,$(".formWrap"));
			_this.userLogin();
			_this.AddResetPwEvent();
			 $("a.jsRegister").click(function(){
			 	_this.insertHtml(registerHtml,$(".formWrap"));
			 	_this.userRegister(); //
				 $("a.jsLogin").click(function(){
				 	_this.insertHtml(loginHtml,$(".formWrap"));
	 				_this.userLogin();
					_this.AddResetPwEvent();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsLogin").click(callbackFun);
	},
	loginAccessFunc: function(){
		var _this=this;
		_this.userLogin();
		_this.AddResetPwEvent();
		var callbackFun=function(){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.userRegister();
			 $("a.jsLogin").click(function(){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
			 	_this.userLogin();
	 			_this.AddResetPwEvent();
				 $("a.jsRegister").click(function(){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
	 				_this.userRegister();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun); 
	},
	AddResetPwEvent: function(){
		 $("a.jsResetPw").click(function(){
		 	window.location.href=goForgetPw;
		 });
	},
	userRegister: function(){
		var _this=this;
		$(".registerForm>form").submit(function(e){
			var data={
 				email: $(".registerForm .email input").val()?$(".registerForm .email input").val():'',
 				nickname: $(".registerForm .userName input").val()?$(".registerForm .userName input").val():'',
 				password: $(".registerForm .passWord input").val()
			};
			_commonJs.loading();
			_user.register(data,function(res,txtStatus){
				_commonJs.unloading();
				_this.insertHtml(loginHtml,$(".formWrap"));
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			},function(err){
				_commonJs.unloading();
				$(".registerForm .resultPg>.resultWrap>p").text(err);
				$(".registerForm .resultPg").show('slow');
			});
			e.preventDefault();
		});
	},
	userLogin: function(){
		var _this=this;
		$(".loginForm.login>form").submit(function(e){
			var userInfo={
				nickname: $(".loginForm.login .userName input").val()?$(".loginForm.login .userName input").val():'',
 				password: $(".loginForm.login .passWord input").val(),
			};
			//释放 var url='/users/login?nickname='+userInfo.nickname+'&password='+userInfo.password;
			_commonJs.loading();
			_user.login(userInfo,function(res,txtStatus){
				_commonJs.unloading();
				/***********set cookies****************/
				var psWord=$.base64.encode(userInfo.password);
				_commonJs.setCookie('nickname',userInfo.nickname);
				_commonJs.setCookie('password',psWord);
				_commonJs.setCookie('user_id',res.user_id);
				var redirectPg=_mm.getUrlParam('redirectFrom');
				window.location.href=redirectPg?redirectPg:goTransaction;
			},function(err){
				_commonJs.unloading();
				$(".loginForm .resultPg>.resultWrap>p").text(err);
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			});
			e.preventDefault();
		});
	}

}

$(function(){
	index.init();
});
