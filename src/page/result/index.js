/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 16:39:48
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../common/header/index.js');
var _mm=require('../../util/mm.js');
var img=require('../../resource/img/qrcode.png');
var _trade=require('service/trade-service.js');

var _loading=require('../common/loading/index.js');  /***loadding page****/
var _commonJs=require('../common/index.js');
/***define url*****/
var goHome=_mm.getFileHost('index.html');
var redirectPg=_mm.getFileHost('tranDetail.html');

var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.renderApi();
	 		_this.bindEvent();
	},
	renderApi: function(){
		var data={
			trade_sn: _mm.getUrlParam('transactionNum'),
			type: 2
		};
		_commonJs.loading();
		_trade.viewTrade(data,function(resDt,txtStatus){
			_commonJs.unloading();
			var stat='';
			var statTxt='';
			if(resDt.status===0){ //have not paid
				stat='付款未完成';
				statTxt='付款必须全额付款，否则交易不能成功哦！若您未付清全款，请及时到菜单栏-》【交易管理】-》留言HiJiko说明情况'

			}else if(resDt.status===1){ //paid
				stat='付款成功';
				statTxt='恭喜您，付款成功啦！'

			}else if(resDt.status===-2){ //not right
				stat='余额不足';
				statTxt='付款必须全额付款，否则交易不能成功哦！若您未付清全款，请及时到菜单栏-》【交易管理】-》留言HiJiko说明情况'
			}else{ //other problem. 
				stat='交易发生错误';
				statTxt='若您已支付，请及时到菜单栏-》【交易管理】-》留言HiJiko说明情况'
			};
			$(".notice p.status>span.stat").text(stat);
			$(".notice p.status>span.statTxt").text(statTxt);
			var homeUrl=goHome+'?tranNum='+_mm.getUrlParam('transactionNum')+'&redirectFrom='+redirectPg+'?tranNum='+_mm.getUrlParam('transactionNum')+'&type=3';
			 console.log(homeUrl);
			$("input.payLink").val(homeUrl);
			console.log(resDt);
		},function(err){
			_commonJs.unloading();
			_mm.errorTips(err);
			$(".confirmPg").html('出错啦！！！请刷新页面试试哦！！或者去菜单栏-》 【交易管理】-》【留言】');
		});
	},
	bindEvent: function(){
		var _this=this;
		document.getElementById('copyButton').addEventListener('click',function(){
			_this.copyToClipboard(document.getElementById("copyTarget"));
		});
	},
	copyToClipboard: function(elem){
		  elem.focus();
	       elem.select();
		document.execCommand("copy",true);
	}
};

$(function(){
	confirmPg.init();
});