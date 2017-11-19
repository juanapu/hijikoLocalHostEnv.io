/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 16:19:34
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../common/header/index.js');
var _mm=require('../../util/mm.js');
var _trade=require('service/trade-service.js');
var img=require('../../resource/img/qrcode.png');

/****define transactionNum******/
var transactionNum='';

var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.bindEvent();
	 		_this.pageMove();
	 		_this.tradeEditAPI();
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
	pageMove: function(){
		$(".confirmPg>.notice>div>a.link").click(function(){
		//	window.location.href='./transaction.html';
		});
	},
	tradeEditAPI: function(){
		transactionNum=_mm.getUrlParam('transactionNum');
		console.log(transactionNum);
		var data={
			trade_sn: transactionNum
		}
		$(".confirmPg>.notice a.goBack").click(function(){
			_trade.editTrade(data,function(res,txtStatus){
					console.log(res);
					console.log("sccuess:"+txtStatus);
			},function(err){
					console.log("error:"+err);
			});
		});

	}
};

$(function(){
	confirmPg.init();
});