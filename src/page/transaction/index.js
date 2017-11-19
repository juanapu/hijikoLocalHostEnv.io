/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 16:08:37
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/header/index.js');
var _loading=require('../common/loading/index.js');  /***loadding page****/
var _mm=require('../../util/mm.js');
var _trade=require('service/trade-service.js');
var _commonJs=require('../common/index.js'); /**loading is writen here***/

/****page url define***/
var confirmPg='./confirm.html';

var transaction={
	init: function(){
		var _this=this;
		_this.bindEvent();
		_this.tradeAPI();
	},
	bindEvent: function(){
		$(".transaction form input[type=range]").change(function(){
			var amount=$(this).val();
			/****************************************but mark here, donot work in iphone device**********************************************/
			$(".transaction form>.form-item.range>label>span").html(amount);
		});
	},
	tradeAPI: function(){
		var _this=this;
		$(".transaction form.trade").submit(function(e){
			/***get keyWord***/
			var tradeName=$(".transaction form.trade input[name='transName']").val()?$(".transaction form.trade input[name='transName']").val():'';
			var tradeAmount=$(".transaction form.trade input[name='tranMont']").val();
			var receiver=$(".transaction form.trade input[name='tranReceiver']").val();
			var holdDays=$(".transaction form.trade .range>label>span.dateExpire").text();
			var userInfo=_commonJs.checkLogin();
			console.log(userInfo);
			var data={
				user_id:  userInfo.login?userInfo.cookie.user_id:0,
				title: tradeName,
				hijiko_money: tradeAmount,
				receive_user: receiver,
				days: holdDays
			};
			_commonJs.loading();
			_trade.createTrade(data,function(res,txtStatus){
				_commonJs.unloading();
				window.location.href=confirmPg+'?transactionNum='+res.trade_sn;
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
			e.preventDefault();
		});
	}

}


$(function(){
	transaction.init();
});

module.exports=transaction;