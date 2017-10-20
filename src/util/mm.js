/*
* @Author: Juana
* @Date:   2017-08-17 08:31:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-08 15:45:11
*/

'use strict';

var _this = this;
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
var _mm={
	request: function(param){
		var _this=this;
		$.ajax({
			type	: param.method || 'get',
			url		: param.url 	|| '',
			dataType: param.type    || 'json',
			data    : param.data    || '',
			success : function(res,txtStatus){
				//request successfully
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//no login 
				else if(10 === res.status){
					_this.doLogin();
				}
				//request data errorf
				else if(1=== res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
				else{
					console.log("param's url :"+param.url);
				}
			},
			error   : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}

		});
	},
	//get server host's address
	getServerUrl : function(path){
		return conf.serverHost+path;
	},
	//get url's certain value
	getUrlParam : function(name){
		var reg = new RegExp('(^|&?)'+name+'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//render html template
	renderHtml : function(htmlTemplate, data){
		var template = Hogan.compile(htmlTemplate);
		var	result = template.render(data);
		return result;
	},
	//success alert message
	successTips : function(msg){
		alert(msg || 'successfully submitted');
	},
	errorTips : function(msg){
		alert(msg || 'wrong behavior');
	},
	// phone,email,empty varification
	validate : function(value,type){
		var value = $.trim(value);
		//check whether it is empty
		if('require' === type){
			return !!value; // return true if value exist
		};
		//phone varification
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		};
		//email varification
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3})){1,3}$/.test(value);
		};
		//password varification
		if('password' === type){
			return  /^[A-Za-z]\w{7,14}$/.test(value);
		};
		//username varification
		if('username' === type){
			return /^[a-zA-Z0-9_-]{4,16}$/.test(value); 
		};
	},
	doLogin: function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
		//window.location.href='./user-login.html';
	},
	doRegister: function(){
		window.location.href='./user-register.html?redirect='+encodeURIComponent(window.location.href);
		//window.location.href='./user-register.html';
	},
};

console.log("here is mm js");
module.exports=_mm;