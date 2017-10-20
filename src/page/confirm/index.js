/*
* @Author: Administrator
* @Date:   2017-10-08 17:03:59
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-12 21:26:08
*/
"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/nav/index.js');
require('../common/footer/index.js');
require('../common/crumbs/index.js');
var _header=require('../common/header/index.js');
var _nav=require('../common/nav/index.js');
var _mm=require('../../util/mm.js');
var _cart=require('../../service/cart-service.js');
var string=require('./index.string');
var loading=require('../common/loading.string');

var _confirm={
	init: function(){
		var _this=this;
		_this.bind();
	},
	bind : function(){
		$(".confirm .address ul li.filledAddress").hover(function(){
			$(this).find('.inner').show();
		},function(){
			$(this).find('.inner').hide();
		});
	}
};

$(function(){
	_confirm.init();
});