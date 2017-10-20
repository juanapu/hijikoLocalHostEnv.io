/*
* @Author: Administrator
* @Date:   2017-10-06 11:11:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-08 17:07:13
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

var cart={
	data	: {
		productId	: 0,
		count		: 0,
		productStock: 0,
		allselected : '',
		productIds  : []
	},
	init	: function(){
		var _this=this;
		var html=_mm.renderHtml(loading,);
		$(".w.cart").html(html);
		_this.render();
	},
	bind	: function(){
		var _this=this;
		//click plus button add num
		$("table tbody button.plus").click(function(){
			var $this=$(this);
			_this.data.productId=$(this).parents("tr").data('productid');
			_this.data.count=parseInt($(this).parents("tr").data('count'))+1;
			_this.data.productStock=$(this).parents("tr").data('stock');
			if(_this.data.count<=_this.data.productStock){
				_this.updateCart();
			}else{
				_mm.errorTips("库存不足");
				_this.data.count=_this.data.productStock;
				_this.updateCart();
			};
		});
		//input num
		$("input.quantity").change(function(){
			var $this=$(this);
			var result=$this.val();
			_this.data.productId=$(this).parents("tr").data('productid');
			_this.data.productStock=$(this).parents("tr").data('stock');
			if((result<=_this.data.productStock)&&(result>0)){
				_this.data.count=result;
				_this.updateCart();
			}
			else if(result==0){
				_mm.errorTips("数量不能小于0,若不要这件商品，请点【删除】");
				_this.data.count=1;
				_this.updateCart();
			}
			else{
				_mm.errorTips("库存不足");
				_this.data.count=_this.data.productStock;
				_this.updateCart();
			};
		});
		//click minus button
		$("table tbody button.minus").click(function(){
			var $this=$(this);
			_this.data.productId=$(this).parents("tr").data('productid');
			_this.data.count=parseInt($(this).parents("tr").data('count'))-1;
			_this.data.productStock=$(this).parents("tr").data('stock');
			if(_this.data.count>0){
				_this.updateCart();
			}else{
				_mm.errorTips("数量不能小于0,若不要这件商品，请点【删除】");
				_this.data.count=1;
				_this.updateCart();
			};
		});
		//uncheck all
		$(".cart table .selectAll").click(function(){
			var $this=$(this);
			_this.data.allselected=$this.parents('table').data('allselected');
			if(_this.data.allselected)
			{
				_cart.cartUnselectAll(function(res,txtStatus){
						var html=_mm.renderHtml(loading,);
						$(".cart .loadingWrap").html(html);
						_this.render(true);
					},function(err){
						_mm.errorTips(err);
					});
			}else{
				_cart.cartSelectAll(function(res,txtStatus){
						var html=_mm.renderHtml(loading,);
						$(".cart .loadingWrap").html(html);
						_this.render();
					},function(err){
						_mm.errorTips(err);
				});
			}
		});
		//select a certain product
		$(".cart table tbody input[type=checkbox].singleSelect").click(function(){
			var $this=$(this);
			var singleChecked=$this.data('checked');
			_this.data.productId=$this.parents("tr").data('productid');
			if(singleChecked){
				_cart.cartUnselectSingle(_this.data,function(res,txtStatus){
					var html=_mm.renderHtml(loading,);
					$(".cart .loadingWrap").html(html);
					_this.render();
				},function(err){
					_mm.errorTips(err);
				});  
			}else{
				_cart.cartSelectSingle(_this.data,function(res,txtStatus){
					var html=_mm.renderHtml(loading,);
					$(".cart .loadingWrap").html(html);
					_this.render();
				},function(err){
					_mm.errorTips(err);
				});
			};			
		});
		//delete a single product
		$(".cart table tbody tr td a.deleteSingle").click(function(){
			var $this=$(this);
			var path="?productIds=";
			path+=$this.parents("tr").data('productid');
			console.log(_this.data);
			_cart.deletSingleProduct(path,function(res,txtStatus){
				console.log(res);
				var html=_mm.renderHtml(loading,);
				$(".cart .loadingWrap").html(html);
				_this.render();
			},function(err){
				_mm.errorTips(err);
			});
		});
		//go back to add items
		$(".cart .empty .js-goShopping").click(function(){
			window.location.href=_mm.getUrlParam('redirectfrom');
		});
		//delete multiple product
		$(".cart table tfoot a.deleteMul").click(function(){
			var $this=$(this);
			var path="?productIds=";
			path+=_this.data.productIds;
			console.log(path);
			_cart.deletSingleProduct(path,function(res,txtStatus){
				console.log(res);
				var html=_mm.renderHtml(loading,);
				$(".cart .loadingWrap").html(html);
				_this.render();
				},function(err){
					_mm.errorTips(err);
				});
		});
		//submit and move to confirm page
		$(".cart table tfoot button.submit").click(function(){
			window.location.href='./confirm.html';
		});
	},
	updateCart : function(){
		var _this=this;
		_cart.cartUpdate(_this.data,function(res,txtStatus){
				var html=_mm.renderHtml(loading,);
				$(".cart .loadingWrap").html(html);
				_this.render();
			},function(err){
					_mm.errorTips(err);
			});
	},
	render	: function(unselectAll){
		var _this=this;
		_this.data.productIds=[];
		_cart.cartList(function(res,txtStatus){
			 var html=_mm.renderHtml(string,res);
				$(".w.cart").html(html);
				if(res.cartProductVoList.length){
					$(".cart .innerWrap").show();
				}else{
					$(".cart .innerWrap").hide();
				};
				$(".cart table thead input[type=checkbox]").prop('checked',res.allChecked);	
				$(".cart table tfoot input[type=checkbox]").prop('checked',res.allChecked);
				$.each(res.cartProductVoList,function(index,value){
					if(res.cartProductVoList[index].productChecked){
						$(".cart table tbody tr:nth-child("+(index+1)+") input[type=checkbox]").prop('checked',true);
						_this.data.productIds.push(res.cartProductVoList[index].productId);
					}else{
						$(".cart table tbody tr:nth-child("+(index+1)+") input[type=checkbox]").prop('checked',false);	
					};
				}); 
			_nav.loadCartCount();
			_this.bind();
		},function(err){
			_mm.errorTips(err);
		});
	}
};

$(function(){
	cart.init();
});