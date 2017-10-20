/*
* @Author: Administrator
* @Date:   2017-09-07 21:03:40
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-25 20:16:44
*/

"use strict";

require('./index.css');
require('../common/layout.css');
//require('../common/navsimple/index.js');
require('../common/navsimple/index.js');
require('../common/footer/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');

var _login={
	init: function(){
		var _this=this;
		this.bindEvent();
		$("div.error-item").hide();
	},
	bindEvent: function(){
		var _this=this;
		$("a.btn.btn-submit").click(function(){
			var result=_this.formValidate();
			_this.submit(result);
		});
		$(".user-cont .user-content").keyup(function(e){
			if(e.keyCode==13){
				var result=_this.formValidate();
				_this.submit(result);
			}
		});
	},
	formValidate : function(){
		var result={
			state: false,
		};

		var userVal=$("input#username").val();
		var pwVal=$("input#password").val();
		var userCheck=_mm.validate(userVal,'require');	
		var pwCheck=_mm.validate(pwVal,'require');
		if(!userCheck){
			$("input#username").parent().addClass('err');
			$("div.error-item").show();
			$("p.err-msg").text('用户名不能为空');
			result.state=false;
			return result;
		};
		if(!pwCheck){
			$("input#password").parent().addClass('err');
			$("div.error-item").show();
			$("p.err-msg").text('密码不能为空');
			result.state=false;
			return result;
		};
		//validation success
		result.state=true;
		return result;
	},
	submit: function(result){
		var userVal=$("input#username").val();
		var pwVal=$("input#password").val();
		//console.log("current location "+window.location.href);
		console.log(window.location.href);
		if(result.state){
			var userInfo={
			username : $.trim(userVal),
			password : $.trim(pwVal)
		};
		_user.login(userInfo,function(){
			window.location.href = _mm.getUrlParam('redirect') || './index.html';
		},function(){
			$("p.err-msg").text('用户名或密码错误');
			$("div.error-item").show();
			$("input").parent().removeClass('err');
		}); 
		};
	}  
}

$(document).ready(function(){
	_login.init();
});