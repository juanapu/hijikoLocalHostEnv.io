/*
* @Author: Administrator
* @Date:   2017-09-25 19:50:27
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-02 13:56:43
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
			{key   : 'username',
			 value : '',
			 text  : '用户名'
			},
			{key   : 'email',
			  value: '',
			  text : '邮箱'
			},
			{key    : 'id',
			 value  : '',
			 text   : '编号'
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
		$(".js-userInfoEdit").click(function(){
			window.location.href="./user-center-update.html";
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
		},function(err){
			//_this.option.data[6].err=err;
		});
	}

}

$(function(){
	_userCenter.init();
});