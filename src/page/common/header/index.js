/*
* @Author: Administrator
* @Date:   2017-09-03 09:02:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-03 11:34:28
*/
"use strict";

require('./index.css');
var _mm=require('util/mm.js');

var header={
	init: function(){
		var _this=this;
		_this.recallEvent();
		_this.bindEvent();
	},
	// get the url keyword and assign to the input 
	recallEvent: function(){
		var result=_mm.getUrlParam('keyword');
		if(result){
			$(".header .search-con input.search-input").val(result);
		};
	},
	bindEvent: function(){
		var _this=this;
		$(".header button.search-btn").click(function(){		
			_this.searchSubmit();
		});
		$(".header .search-con input.search-input").focus(function(){
			var contVal=$(this).attr("placeholder");
			$(this).attr("placeholder","");
			$(this).blur(function(){
				$(this).attr("placeholder",contVal);
			});
		}).keyup(function(e){
			if(e.keyCode===13){
				_this.searchSubmit();
			}
		});
	},
	searchSubmit: function(){
		var textVal=$(".header .search-con input.search-input").val();
		if(textVal){
			console.log(textVal);
			window.location.href='./list.html?keyword='+textVal;
		}
	}
};
$(function(){
	header.init();
});

module.exports=header;