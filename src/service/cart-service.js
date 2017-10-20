/*
* @Author: Administrator
* @Date:   2017-08-31 09:10:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-08 11:51:37
*/
"use strict";

var _mm = require('util/mm.js');
var _cart = {
	//get cart's number
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		});
	},
	//add products to cart
	addDo 		: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/add.do"),
			data : data,
			success : resolve,
			error : reject
		});
	},
	//list cart product
	cartList 	: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/list.do"),
			success : resolve,
			error : reject
		});
	},
	cartUpdate	: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/update.do"),
			data : data,
			success : resolve,
			error : reject
		});
	},
	//unselect all
	cartUnselectAll	: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/un_select_all.do"),
			success : resolve,
			error : reject
		});
	},	
		//select all
	cartSelectAll	: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/select_all.do"),
			success : resolve,
			error : reject
		});
	},
	//select a certain single product
	cartSelectSingle	: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/select.do"),
			data	: data, 
			success : resolve,
			error : reject
		});
	},
	//unselect a certain single product
	cartUnselectSingle	: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/un_select.do"),
			data	: data, 
			success : resolve,
			error : reject
		});
	},
	//delete a single product
	deletSingleProduct 	: function(path,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl("/cart/delete_product.do"+path),
			success : resolve,
			error : reject
		});
	}

};

module.exports = _cart;