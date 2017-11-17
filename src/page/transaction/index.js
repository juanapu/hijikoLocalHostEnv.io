/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-10 12:44:57
*/
"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/header/index.js');
//require('./range-touch.min.js');
var _mm=require('../../util/mm.js');


var transaction={
	init: function(){
		var _this=this;
		_this.bindEvent();
	},
	bindEvent: function(){
		$(".transaction form input[type=range]").change(function(){
			var amount=$(this).val();
			/****************************************but mark here, donot work in iphone device**********************************************/
			$(".transaction form>.form-item.range>label>span").html(amount);
		});
	}


}


$(function(){
	transaction.init();
});
