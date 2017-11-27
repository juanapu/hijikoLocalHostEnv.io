/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 10:24:18
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
		_this.checkTranNum();//check whether has transaction num, if has transaction num come from confirm page, edit info. or input info.
	},
	bindEvent: function(){
		$(".transaction form input[type=range]").change(function(){
			var amount=$(this).val();
			/****************************************but mark here, donot work in iphone device**********************************************/
			$(".transaction form>.form-item.range>label>span").html(amount);
		});
		/*** restrict input only number*****/
		var ableArr=[48,49,50,51,52,53,54,55,56,57,8];
		_mm.disableKeyCode($(".transaction input[type=number]"),ableArr);
	},
	checkTranNum: function(){
		var _this=this;
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		if(data.trade_sn){ /***have transaction num come from confirm page,refill input**/
			_commonJs.loading();
			_trade.viewTrade(data,function(res,txtStatus){
				   var editTradeData={
				   	 id: res.id,
				   	 title: res.title,
				   	 hijiko_money: res.hijiko_money,
				   	 receive_user: res.receive_user,
				   	 days: res.days
				   };
					_commonJs.unloading();
					/**refill input***/
					$(".transaction form.trade input[name='transName']").val(res.title);
					$(".transaction form.trade input[name='tranMont']").val(res.hijiko_money);
					$(".transaction form.trade input[name='tranReceiver']").val(res.receive_user);
					$(".transaction form.trade .range>label>span.dateExpire").text(res.days);
					/**check whether any update**/
					var inputItem=$(".transaction form.trade").find('input');
					for(var i=0;i<inputItem.length-1;i++){
						$(inputItem[i]).change(function(){
							var name=$(this).attr('name');
							switch(name) {
							    case 'transName':
							        editTradeData.title=$(this).val();
							        break;
							    case 'tranMont':
							        editTradeData.hijiko_money=$(this).val();
							        break;
							     case 'tranReceiver':
							        editTradeData.receive_user=$(this).val();
							        break;
							     case 'days':
							        editTradeData.days=$(this).val();
							        break;
							};
						});
					};
					//console.log(data);
					//console.log(inputItem);
					$(".transaction form.trade").submit(function(e){
						_commonJs.loading();
						_trade.editTradePost(editTradeData,function(res,txtStatus){
							_commonJs.unloading();
							window.location.href=confirmPg+'?transactionNum='+data.trade_sn+'&id='+res.id;
						},function(err){
							_commonJs.unloading();
							_mm.errorTips(err);
						});
						e.preventDefault();
					});
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
		}else{
			_this.tradeAPI();
		};
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
				window.location.href=confirmPg+'?transactionNum='+res.trade_sn+'&user_id='+data.user_id+'&title='+data.title+'&hijiko_money='+data.hijiko_money+'&receive_user='+data.receive_user+'&days='+data.days;
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