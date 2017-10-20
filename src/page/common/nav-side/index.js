/*
* @Author: Administrator
* @Date:   2017-09-03 11:02:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-23 09:56:23
*/
"use strict";
require('./index.css');
var string=require('./index.string');
var _mm=require('util/mm.js');

var navSide={
	option: {
		name: '',
		navList: [
			{name: 'user-center', desc : '个人中心' , href: './user-center.html',isActive: false},
			{name: 'order-list', desc : '我的订单' , href: './order-list.html',isActive: false},
			{name: 'user-pass-update', desc : '修改密码' , href: './user-pass-update.html',isActive:false},
			{name: 'about', desc : '关于MMALL' , href: './about.html',isActive:false}	
		]
	},
	// navN : indicates the nav list's name
	init: function(navN){
		var _this=this;
		this.render(navN);
	},
	render: function(navN){
		var _this=this;
		var navListNum=_this.option.navList.length;
		for(var i=0;i<navListNum;i++){
			if(navN==_this.option.navList[i].name){
					_this.option.navList[i].isActive=true;
					console.log("the navN is "+navN);
			}
		}
		var renderContent=_mm.renderHtml(string,navSide.option);
		$(".nav-side").html(renderContent);
		console.log(navListNum);
	}

};

module.exports=navSide;