/******index*****/

"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/loading/index.js');
var _headerIndex=require('../common/headerFindPw/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');
var _commonJs=require('../common/index.js');
require('./layout.js');
var loginHtml=require('./login.string');  //get customized string module for login & findPw
var findPwHtml=require('./findPw.string');
var img; // insert image to html code

/****define page move*****/
var goTransaction="./transaction.html";
var wait=60; //count down timer


var index={
	init: function(){
		var _this=this;
		if($(".formWrap").children("div").length==0){
			_this.userfindPw();
			_this.insertHtml(findPwHtml,$(".formWrap"));
		};
		_this.insertImg();
		_this.bindUserLogic(); // findPw,login,reset password etc page jumps
		_this.bindEvent();
	},
	insertHtml: function(string,insertDomSelector){
		var insert=_mm.renderHtml(string,{});
		insertDomSelector.html(insert);
	},
	insertImg: function(){
		var innerDiv=$(".forgetPw>.wrap").children("div");

		for(var i=1;i<=innerDiv.length;i++){
			img=require('../../resource/img/pg'+i+'.png');
			$(".forgetPw>.wrap>.pg"+i+">.content>.description>img").attr('src',img);
		};
	},
	bindUserLogic: function(){
		var _this=this;
		_this.userfindPw(); //
		var callbackFun=function(){ // show findPw form
			_this.insertHtml(loginHtml,$(".formWrap"));
			_this.userLogin();
			 $("a.jsfindPw").click(function(){
			 	_this.insertHtml(findPwHtml,$(".formWrap"));
			 	_this.userfindPw(); //
				 $("a.jsLogin").click(function(){
				 	_this.insertHtml(loginHtml,$(".formWrap"));
	 				_this.userLogin();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsLogin").click(callbackFun);
	},
	bindEvent: function(){
		var _this=this;
		$(".forgetPw .formItem.securityCode button.btn.btn-warning").click(function(){
			_this.countDown($(this));
		});
	},
	userfindPw: function(){
		var _this=this;
		$(".findPwForm>form").submit(function(e){
			var data={
 				email: $(".findPwForm .email input").val()?$(".findPwForm .email input").val():'',
 				nickname: $(".findPwForm .userName input").val()?$(".findPwForm .userName input").val():'',
 				password: $(".findPwForm .passWord input").val()
			};
			_commonJs.loading();
			_user.findPw(data,function(res,txtStatus){
				_commonJs.unloading();
				_this.insertHtml(loginHtml,$(".formWrap"));
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			},function(err){
				_commonJs.unloading();
				$(".findPwForm .resultPg>.resultWrap>p").text(err);
				$(".findPwForm .resultPg").show('slow');
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
	},
	countDown: function(targ){
		var _this=this;
		 if (wait == 0) {  
            targ.attr("disabled",false);            
	           targ.text("获取验证码");  
            wait = 60;  
        } else {  
            targ.attr("disabled", true);  
            targ.text("重新发送 " + wait); 
            wait--;  
            setTimeout(function(){
            	_this.countDown(targ);
            }, 1000);  
        }; 
	}

}

$(function(){
	index.init();
});
