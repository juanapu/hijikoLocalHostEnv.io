/*
* @Author: Administrator
* @Date:   2017-09-23 10:06:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-24 10:24:48
*/
"use strict";
require('./index.css');
require('../common/layout.css');
//require('../common/navsimple/index.js');
require('../common/navsimple/index.js');
require('../common/footer/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');

var _passReset={
	init: function(){
		var _this=this;
		_this.bind();
	},
	bind: function(){
		var data={
			username: '',
			errMsg: '',
			question: '',
			answer: '',
			passwordNew: '',
			forgetToken: ''
		};
		var _this=this;
		/*******validate user name************/
		$(".inner-cont.user-name .btn.btn-submit").click(function(){
			data.username=$("input#username").val();
			_user.passReset(data,function(res,txtStatus){
				$(".error-item").hide();
				$(".inner-cont.user-name").hide();
				$(".inner-cont.question").show().find(".user-label").children("span").text(res);
				data.question=res;
			},function(err){
				var target=$(".error-item .err-msg");
				_this.errMsg(target,err,data);
			});
			console.log("click");
		});
		/*********validate security question **************/
		$(".inner-cont.question .btn.btn-submit").click(function(){
			data.answer=$("input#answer").val();
			console.log(data);
			_user.passResetCheckAnswer(data,function(res,txtStatus){
				$(".error-item").hide();
				$(".inner-cont.question").hide();
				$(".inner-cont.newPass").show();
				data.forgetToken=res;
			},function(err){
				var target=$(".error-item .err-msg");
				_this.errMsg(target,err,data);
			});
		});
		/******* set new password ********/
		$(".inner-cont.newPass .btn.btn-submit").click(function(){
			data.passwordNew=$("input#newPass").val();
			console.log(data);
			_user.forgetRestPass(data,function(res,txtStatus){
				$(".error-item").hide();
				_mm.doLogin();
			},function(err){
				var target=$(".error-item .err-msg");
				_this.errMsg(target,err,data);
			});
		});
	},
	errMsg: function(target,err,data){
		data.errMsg=err;
		target.text(data.errMsg);
		$(".error-item").show();
	},
};

$(window).ready(function(){
	_passReset.init();
});

module.exports=_passReset;