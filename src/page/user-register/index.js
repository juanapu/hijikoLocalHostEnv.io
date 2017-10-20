/*
* @Author: Administrator
* @Date:   2017-09-10 16:44:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-23 09:57:09
*/
"use strict";

require('../user-login/index.css');
require('./index.css');
require('../common/layout.css');
//require('../common/navsimple/index.js');
require('../common/navsimple/index.js');
require('../common/footer/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');

var publicVal={
	returnResult: true
};

var _register={
	init: function(){
		$("div.error-item").hide();
		var _this=this;
		_this.bind();
	},
	bind: function(){
		var _this=this;
		var userInfo={
			finalData: {
				username: '',
				password: '',
				email   : '',
				phone   : '',
				question: '',
				answer  : ''
			},
			username: {
				val: '',
				validate: false,
				errMsg: "请输入4-16位由字母数字下划线或减号组成的用户名"
			},
			password:　{
				val: '',
				validate: false,
				errMsg: "请输入8-14位英文字母组合做为密码"
			},
			confirmPw: {
				val: '',
				validate: false,
				errMsg: "两次输入密码不一致"
			},
			phone: {
				val: '',
				validate: false,
				errMsg: "请输入有效的手机号"
			},
			email: {
				val: '',
				validate: false,
				errMsg: "请输入有效的邮箱号"
			},
			question: {
				val: '',
				validate: false,
				errMsg: "请输入密码提示问题"

			},
			answer: {
				val: '',
				validate: false,
				errMsg: "请输入密码提示答案"

			}

		};
		var data={
			str: '',
			type: 'username'
		};

		function blurFunc(val,target){  /*******target: target selector,val: userInfo value ******/
			userInfo[val].val= $.trim(target.val());
			userInfo[val].validate=_mm.validate(userInfo[val].val,val);
			_this.validate(userInfo[val],target);
			//console.log("val is :"+val+"   target is:"+target+"   userInfo.username.val="+userInfo[val].val);
		}; 
		$("input#username").blur(function(){
			blurFunc('username',$(this));
			data.str=$("input#username").val();
			var target=$("input#username");
			var val=userInfo.username;
			_this.UserNameApiValidate(data,target,val);
			console.log("final result:"+publicVal.returnResult);
		});
		$("input#password").blur(function(){
			blurFunc('password',$(this));
		});
		$("input#password-confirm").blur(function(){
			userInfo.confirmPw.val= $.trim($("input#password-confirm").val());
			userInfo.confirmPw.validate=false;
			if(userInfo.confirmPw.val===userInfo.password.val){
				userInfo.confirmPw.validate=true;
			}
			_this.validate(userInfo.confirmPw,$(this));
		});
		$("input#phone").blur(function(){
			blurFunc('phone',$(this));
		});
		$("input#email").blur(function(){
			blurFunc('email',$(this));
		});
		$("a.btn.btn-submit").click(function(){
			_this.submit(userInfo);
		});
		$("input#question").blur(function(){
			userInfo.question.val= $.trim($("input#question").val());
			if(userInfo.question.val){
				userInfo.question.validate=true;
			}else{
				userInfo.question.errMsg="密码提示问题不能为空";
			};
			_this.validate(userInfo.question,$("input#question"));
		});
		$("input#answer").blur(function(){
			userInfo.answer.val= $.trim($("input#answer").val());
			if(userInfo.answer.val){
				userInfo.answer.validate=true;
			}else{
				userInfo.answer.errMsg="密码提示问题不能为空";
			};
			_this.validate(userInfo.answer,$("input#answer"));
		});

	},
	validate: function(val,target){
		if(val.validate){
			$(".error-item").hide();	
			target.siblings(".check").show().children("i").removeClass("fa-times");
		}else{
			target.siblings(".check").show().children("i").addClass("fa-times");
			$(".error-item .err-msg").text(val.errMsg);
			$(".error-item").show();	
		};
	},
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
	},
	submit : function(userInfo){
		var result=true;
		 userInfo.username.validate=publicVal.returnResult;
		$.each(userInfo,function(key,value){
			console.log("userInfo["+key+"].validate="+userInfo[key].validate);
			if(key!="finalData"){
				if(!userInfo[key].validate)
					result=false;
			};

		});
		if(result){
			$.each(userInfo,function(key,value){
				userInfo.finalData[key]=userInfo[key].val;
				//console.log("userInfo.finalData["+key+"]===="+userInfo.finalData[key]);
			});
					console.log("userInfo.finalData is :"+userInfo.finalData);
					_user.register(userInfo.finalData,function(res,txtStatus){
						 window.location.href = './user-login.html?type=register';
						 console.log("res is :"+res);
					},function(err){
						$(".error-item .err-msg").text(err);
						$(".error-item").show();
						console.log("err is :"+err);
					});
		};
	
	}

};

$(document).ready(function(){
	_register.init();
});