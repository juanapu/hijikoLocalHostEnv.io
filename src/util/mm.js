/*
* @Author: Juana
* @Date:   2017-08-17 08:31:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 15:54:50
*
*  here is mm js
*/

'use strict';

var _this = this;
var Hogan = require('hogan.js');
var conf = {
	serverHost : 'http://localhost:8080',
	fileHost: 'http://localhost:8080/dist/view/'
};
var _mm={
	request: function(param){
		$.ajax({
			type	: param.method || 'get',
			//url		: param.url 	|| '',
			url : param.url?param.url+'?'+$.map(param.data,function(val,key){return key+'='+val}).join('&'):'',
			dataType: param.type    || 'json',
			data    : param.data    || '',
			success : function(res,txtStatus){
				console.log("below is mm res");
				console.log(res);
				//request successfully
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.message,res);
				}
				//no login 
				else if(10 === res.status){
					_this.doLogin();
				}
				//request data errorf
				else if(1=== res.status){
					typeof param.error === 'function' && param.error(res.message);
				}
				else{
					console.log("the status is "+res.status);
				}
			},
			error   : function(err){
				console.log("below is mm err");
				console.log(err);
				typeof param.error === 'function' && param.error(err.statusText);
			}

		});
	},
	//get server host's address
	getServerUrl : function(path){
		return conf.serverHost+path;
	},
	//get file host location
	getFileHost: function(path){
		return conf.fileHost+path;
	},
	//get url's certain value
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	getRedirect: function(name){
		var reg = new RegExp('(^|&)'+name+'=');
		var key = window.location.search.substr(1).match(reg)[0];
		var result=window.location.search.substring(window.location.search.indexOf(name)+name.length+1,window.location.search.length);
		return result ? decodeURIComponent(result) : null;
	},
	getPage: function(){ //get this url page's name
		var lc=window.location.pathname;
		var arr=lc.split("/");
		var result=arr[arr.length-1].replace(".html","");
		return result;
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
	validate : function(value,type,required){
		var value = $.trim(value);
		//check whether it is empty
		if('required' === required){
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
		if('passWord' === type){
			//return  /^[A-Za-z]\w{7,14}$/.test(value);
			return  value;
		};
		//username varification
		if('nickname' === type){
			return /^[a-zA-Z0-9_-]{4,16}$/.test(value); 
		};
		//for all 
		if(('lstName' ===  type)||('fstName' === type)){
			return value;
		};
	},
	validAlert: function(targ,type,emptyAction,errAction,rightAction){
		var _this=this;
		if(!_this.validate(targ.val(),'','required')){
			 emptyAction(targ,type);	
		}else if(!_this.validate(targ.val(),type,'')){
			 errAction(targ,type);
		}else{
			 rightAction(targ);
			 return true;
		};
		return false;
	},
	validResult: function(targ,type,emptyAction,errAction,rightAction){
		var _this=this;
		if((_this.validate(targ.val(),'','required'))&&(_this.validate(targ.val(),type,''))){
			 return true;
		};
		return false;
	},
	doLogin: function(){
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
		//window.location.href='./user-login.html';
	},
	doRegister: function(){
		window.location.href='./user-register.html?redirect='+encodeURIComponent(window.location.href);
		//window.location.href='./user-register.html';
	}, 
	//allowed: input allowed key code arr, and target selector
	disableKeyCode: function(targ,allowed){
		targ.keydown(function(e){
				if(allowed.indexOf(e.keyCode)<0){
					e.preventDefault();
				};
		});
	},
	disableInputKeyCode: function(targ,disabled){
			targ.keydown(function(e){
				if(e.keyCode === 32){
					e.preventDefault();
				};
			});
	},
	//targ: target selector, sib: need to be disabled siblings' class
	disableSiblings: function(targ,sib){
		targ.addClass('active').attr('disabled',true).siblings(sib).removeClass('active').attr('disabled',false);
	}
};

module.exports=_mm;