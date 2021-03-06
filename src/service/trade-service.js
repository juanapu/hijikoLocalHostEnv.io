/*
* @Author: Administrator
* @Date:   2017-11-19 12:02:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 12:36:03
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
	viewTrade: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/view'),
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
	},
	paymentsCreate: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/payments/create'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranList: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/index'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranDetail: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/view'),
			data : data,
			method : 'get',
			success : resolve,
			error   : reject
		})
	},
	tranDelete: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/delete'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},//transaction message create
	tranMesCreate: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/TradeMessages/create'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranMesRead: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/TradeMessages/receive'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranLog: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/TradeLogs/index'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranLogCount: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/TradeLogs/logscount'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranPause:  function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/pending'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	tranLogRead: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/TradeLogs/receive'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	}
};

module.exports = _trade;