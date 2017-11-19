/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 22:49:53
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../common/header/index.js');
var _loading=require('../common/loading/index.js');  /***loadding page****/
var _mm=require('../../util/mm.js');
var _trade=require('service/trade-service.js');
var img=require('../../resource/img/qrcode.png');
var _commonJs=require('../common/index.js'); /**loading is writen here***/

/***define page url*****/
var goTransactionPg='./transaction.html';
/****define public data******/
var hijikoSharing=0.001;
var transactionNum='';


var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.checkTransactionNum(); //check transaction number, if no transaction number, go back to transaction page. 
	},
	checkTransactionNum: function(){
			var _this=this;
			var transactionNum=_mm.getUrlParam('transactionNum');
			if(transactionNum){
		 		_this.renderData(); //dynamically add text got from API
		 		_this.bindEvent();
		 		_this.tradeEditAPI(); 
		 	}else{
		 		window.location.href=goTransactionPg;
		 	};
	},
	bindEvent: function(){
		var _this=this;
		document.getElementById('copyButton').addEventListener('click',function(){
			$("button#copyButton~span").show('slow').delay(1000).hide('slow');
			$("input#copyTarget").select();
			_this.copyToClipboard(document.getElementById("copyTarget"));
		});
	},
	copyToClipboard: function(elem){
		  elem.focus();
	       elem.select();
		document.execCommand("copy",true);
	},
	renderData: function(){
		_commonJs.loading();
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		_trade.editTrade(data,function(res,txtStatus){
			$(".confirmPg>.notice span.mount").text(res.hijiko_money);
			$(".confirmPg>.notice span.alipayAct").text(res.receive_user);
			$(".confirmPg>.notice span.dateExpire").text(res.days); 
			$(".confirmPg>.QR span#hijikoSharing").text(res.reward_money/res.hijiko_money*100+'%');
			$(".confirmPg>.QR span.finalMount").text(res.total_fee);
			_commonJs.unloading();
		},function(err){
			_commonJs.unloading();
			_mm.errorTips(err);
		}); 
	},
	tradeEditAPI: function(){
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		$(".confirmPg>.notice a.goBack").click(function(){
			_commonJs.loading();
			_trade.editTrade(data,function(res,txtStatus){
					console.log(res);
					console.log("sccuess:"+txtStatus);
					window.location.href=goTransactionPg+'?transactionNum='+res.trade_sn;
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
		});

	}
};

$(function(){
	confirmPg.init();
});