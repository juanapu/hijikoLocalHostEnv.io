/*
* @Author: Administrator
* @Date:   2017-09-25 19:50:27
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-02 13:59:45
*/

"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/nav/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/crumbs/index.js');
var _header=require('../common/header/index.js');
var _navSide=require('../common/nav-side/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');
var string=require('./index.string');

_navSide.init('user-center');

var _userCenter={
	option: {
		data: [
			{key   : 'email',
			  value: '',
			  text : '邮箱'
			},
			{key    : 'phone',
			 value  : '',
			 text   : '电话号'
			},
			{key    : 'question',
			 value  : '',
			 text   : '密码提示问题'
			},
			{key    : 'answer',
			 value  : '',
			 text   : '密码提示问题答案'
			}
		]
	},
	userInfo: {
		email    : '',
		phone    : '',
		question : '',
		answer   : '',
		username : ''
	},
	init: function(){
		var _this=this;
		window.onload=function(){
			$("div.load-cont").hide();
		};
		_this.getUserInfo();
		_this.bind();
	},
	//bind event
	bind: function(){
		var _this=this;
		$(".js-userInfoUpdate").click(function(){
			_user.userInfoUpdate(_this.userInfo,function(res,txtStatus){
				$.each(_this.userInfo,function(index){
					if(index!="username"){
						_this.userInfo[index]=$("input."+index).val();
					}; 
				});
				alert("恭喜你更改成功啦！");
				window.location.href="./user-center.html";
			},function(err){
				alert(err);
			});
		});
	},
	//render content of users' information
	renderCont: function(){
		var _this=this;
		var data=_this.option;
		var renderContent=_mm.renderHtml(string,data);
		$(".renderCnt").html(renderContent);
	},
	getUserInfo: function(){
		var _this=this;
		_user.getUserInfo(function(res,txtStatus){
			$.each(_this.option.data,function(index){
				let objVal='';
				$.each(_this.option.data[index],function(key,value){
					if(value){
						objVal=value;
					}else if(!value){
						_this.option.data[index].value=res[objVal];
					}
				});
			});
			_this.renderCont();
			$.each(_this.userInfo,function(index){
				_this.userInfo[index]=res[index];
			});
			$("span.value.userName").text(_this.userInfo.username);
		},function(err){
			_this.option.data[6].err=err;
		});
	}

}

$(function(){
	_userCenter.init();
});