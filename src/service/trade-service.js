/*
* @Author: Administrator
* @Date:   2017-11-19 12:02:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 16:20:09
*/
"use strict";

var _mm = require('util/mm.js');

var _trade={
	createTrade: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/create'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	editTrade: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/edit'),
			data : data,
			method : 'get',
			success : resolve,
			error   : reject
		})
	},
	editTradePost: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/edit'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	}
};

module.exports = _trade;