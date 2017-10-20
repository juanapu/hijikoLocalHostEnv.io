/*
* @Author: Administrator
* @Date:   2017-10-02 12:59:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-08 15:44:58
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
var string=require('./index.string');
var loading=require('./loading.string');
var _product=require('../../service/product-service.js');

var _list={
	data: {
			categoryId : '',
			keyword	   : '',
			pageNum    : 1,
			pageSize	: 10,
			orderBy		: 'price_desc'
		},
	init	: function(){
		var _this=this;
		_this.bind();
		//_this.render();
		_this.getListDo();
	},
	bind 	: function(){
		var _this=this;
		$("button").click(function(){
			if($(this).hasClass('active')){
				$(this).siblings("button").removeClass('active');
			}else{
				$(this).siblings("button").removeClass('active');
				$(this).addClass('active');
				if($(this).hasClass('price')){
					$(this).children('.caretDown').addClass('firstTime');
				};
			};
		});
		$("button.price").click(function(){
			//change the price order
			if($(this).children('span').hasClass('firstTime')){
				$(this).children('span').removeClass('firstTime');
				_this.data.orderBy='price_desc';
			}else{
				if(_this.data.orderBy=='price_desc'){
					_this.data.orderBy='price_asc';
					_this.getListDo();
				}else{
					_this.data.orderBy='price_desc';
					_this.getListDo();
				};
				$(this).children('.active').removeClass('active').siblings('span').addClass('active');
			};
		});
		$("button.order").click(function(){
			$(".caretDown").addClass('firstTime').addClass('active').siblings().removeClass('active');
			_this.data.orderBy='price_desc';
			_this.getListDo();
		});
	},
	render :  function(renderHtml,data){
		var _this=this;
		var renderData=data?data:_this.data;
		var result=_mm.renderHtml(renderHtml,renderData);
		$(".listCont").html(result);
	},
	getListDo : function(){
		var _this=this;
		$.each(_this.data,function(key,value){
			_this.data[key]=_mm.getUrlParam(key)?_mm.getUrlParam(key):value;
		});
		_this.render(loading,'');
		_product.listDo(_this.data,function(res,txtStatus){
			res.currentUrl=window.location.href;
			_this.render(string,res);
			_this.pagination(res);
		},function(err){
			_mm.errorTips(err);
			window.location.href="./index.html";
		});
	},
	pagination : function(res){
		if(res.hasNextPage){
			$("button.next").addClass('active');
		};
		if(res.hasPreviousPage){
			$("button.prev").addClass('active');
		};
		
	}
};

$(function(){
	_list.init();
})

