/*
* @Author: Administrator
* @Date:   2017-10-03 16:50:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-12 21:25:32
*/
"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/nav/index.js');
require('../common/footer/index.js');
require('../common/crumbs/index.js');

var _header=require('../common/header/index.js');
var _mm=require('../../util/mm.js');
var _product=require('../../service/product-service.js');
var _cart =require('../../service/cart-service.js');
var string=require('./index.string');
var loading=require('./loading.string');
var _nav=require('../common/nav/index.js');

var _detail={
	data    : {
		productId : ''
	},
	init 	:  function(){
		var _this=this;
		_this.loading(loading,);
		_this.displayApi();
	},
	bind	: function(res,data){
		var _this=this;
		var $mainImg=$(".detail .mainImg img");
		$(".detail .num button[data-type='plus']").click(function(){
			var result=parseInt($(this).siblings('input.value').val());
			if((result+1)<=res.stock){
				result++;
			};
			$(this).siblings('input.value').val(result);
		});
		//minus button's event
		$(".detail .num button[data-type='minus']").click(function(){
			var result=parseInt($(this).siblings('input.value').val());
			if((result-1)>=1){
				result--;
			};
			$(this).siblings('input.value').val(result);
		});
		//add product to cart and redirect to result page
		$(".detail .submitWrap button.submit").click(function(){
			_this.getCartNum(data);
		});
		//hover on category images, show big image as main image
		var previewImg=$(".detail .previewImgWrap").children();
		$.each(previewImg,function(){
			var $this=$(this);
			$this.hover(function(){
				var src=$this.attr('src');
				$mainImg.attr('src',src);
			},function(){
			});
		});
	},
	loading	    : function(loading,){
		var html=_mm.renderHtml(loading,);
		$(".w.detail").html(html);
	}, 
	displayApi	: function(){
		var _this=this;
		var url='';
		_this.data.productId=parseInt(_mm.getUrlParam('productId'));
		url='?productId='+_this.data.productId;
		_product.detailDo(url,_this.data.productId,function(res){
			var arr=[];
			arr=res.subImages.split(',');
			$.each(arr,function(index,value){
				arr[index]={'img': value};
			});
			res.subImages=arr;
			_this.render(res);
			_this.bind(res,_this.data);
		},function(err){
			_mm.errorTips(err);
		});
	},
	render	: function(data){
		var _this=this;
		var html=_mm.renderHtml(string,data);
		$(".w.detail").html(html);
	},
	getCartNum : function(data){
		data.count=parseInt($(".detail .num input.value").val());
			_cart.addDo(data,function(res,txtStatus){
				_nav.loadCartCount();
				window.location.href='./result.html?redirectfrom='+_mm.getUrlParam('redirectfrom');
			},function(err){
				_mm.errorTips(err);
		});
	}
};

$(function(){
	_detail.init();
});