/*
* @Author: Administrator
* @Date:   2017-10-05 10:49:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-08 16:06:16
*/

"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/navsimple/index.js');
require('../common/footer/index.js');
var _header=require('../common/header/index.js');
var _mm=require('../../util/mm.js');

var _result={
	init : function(){
		var _this=this;
		$(".w.result").show();
		_this.bind();
	},
	bind : function(){
		$(".result .wrap .js-goShopping").click(function(){
			window.location.href=_mm.getUrlParam('redirectfrom');
		});
		$(".result .wrap .js-goCart").click(function(){
			window.location.href='./cart.html?redirectfrom='+_mm.getUrlParam('redirectfrom');
		});
	}
};


$(function(){
	_result.init();
});