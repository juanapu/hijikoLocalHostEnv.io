/*
* @Author: Administrator
* @Date:   2017-10-02 20:53:34
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-04 11:53:53
*/
"use strict";

var _mm = require('util/mm.js');

var _product = {
	//get list's product
	listDo: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/product/list.do'),
			data : data,
			method : 'get',
			success : resolve,
			error   : reject
		})
	},
	//get all data for detail.html
	detailDo : function(url,data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/product/detail.do'+url),
			data : data,
			method : 'get',
			success : resolve,
			error   : reject
		})
	}
};


module.exports=_product;