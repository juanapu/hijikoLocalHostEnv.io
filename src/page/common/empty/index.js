/*
* @Author: Administrator
* @Date:   2017-09-02 09:30:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-25 16:18:22
*/
"use strict";

require('./index.css');

var empty={
	init: function(){
		var _this=this;
		_this.showEmptyPg();
	},
	showEmptyPg: function(){
		var checkWrap=$("body").has('.emptyWrap');
		console.log(checkWrap);
	}
}

$(function(){
	empty.init();
});