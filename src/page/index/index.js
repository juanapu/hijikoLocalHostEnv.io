"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
var _header=require('../common/header/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');
require('./layout.js');
var loginHtml=require('./login.string');  //get customized string module for login & register
var registerHtml=require('./register.string');
var img; // insert image to html code


var index={
	init: function(){
		var _this=this;
		if($(".formWrap").children("div").length==0){
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
		var _this=this;
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
		$("a.jsRegister").click(callbackFun);
	},
	userRegister: function(){
		var _this=this;
		$(".registerForm>form").submit(function(){
			var data={
 				nickname: 'test6',
 				email: 'test6@hot.com',
 				password: 'test123'
			};
			var url='/users/register?email='+data.email+'&nickname='+data.nickname+'&password='+data.password;
			_user.register(url,data,function(res,txtStatus){
				_this.insertHtml(loginHtml,$(".formWrap"));
				$(".loginForm .resultPg").show('slow');
			},function(err){
				console.log(err);
			});
			alert("register");
		});
	},
	userLogin: function(){
		$(".loginForm.login>form").submit(function(){
			alert("login");
		});
	}

/*	
	UserNameApiValidate: function(data,target,val){
		_user.userName(data,function(res,txtStatus){
			publicVal.returnResult=true;
		},function(err){
			val.errMsg=err;
			target.siblings(".check").show().children("i").addClass("fa-times");
			$(".error-item .err-msg").text(val.errMsg);
			$(".error-item").show();
			publicVal.returnResult=false;	
			console.log("modify result: "+publicVal.returnResult);
		});
	} */
}

$(function(){
	index.init();
});
