/*
* @Author: Administrator
* @Date:   2017-09-03 09:02:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 15:53:02
*  here is header
*/
"use strict";

require('./index.css');
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var _commonJs=require('../index.js');
var _trade=require('service/trade-service.js');
require('bootstrap');
/****url define***/
var indexPg='./index.html';
var goTranList='./tranList.html';
var goTranPg='./transaction.html';
var goAlertHistrory='./alertHistory.html';
/***define text****/
var loginPgTxt='宝贝儿，你还没登录哦';

var header={
	init: function(){
		var _this=this;
		_this.insertImg();
		_this.renderApi();
		 _this.bindEvent();
		// _this.pageMove();
		// _this.checkInWechat();
	},
	insertImg: function(){
		var img=require('../../../resource/img/logo.png');
		$(".headerWrap>nav.navbar>a.navbar-brand>img").attr('src',img);
	},
	renderApi: function(){
		var _this=this;
		/****get api render new message*******/
		//if has new message
		var data={
			user_id: _commonJs.getCookie().user_id
		};
		_commonJs.loading();

		_trade.tranLogCount(data,function(resDt,txtStatus){
				if(_mm.getPage()==='transaction'){ //if it is transaction page insert unloading
					_commonJs.unloading();
				};

			  var msgNum=parseInt(resDt.logscount); //messagenum
			  if(msgNum){
			  $(".headerWrap span.notification--num.act>.inner").text(msgNum);
			  $(".headerWrap .act").addClass('active');
			 }else{
			 	 $(".headerWrap .act").removeClass('active');
			 };
			 //get resDt.id
			 var unread=resDt.ids;
			_this.pageMove(unread);
			_this.checkInWechat();
		},function(err){
			_commonJs.unloading();
			_mm.errorTips(err);
		});
	},
	bindEvent: function(){
				/**********mobile version menu bar*************/

		$(".headerWrap .bar.mobile a.menuMb").click(function(e){
			$(".bar.mobile>ul.navbar-nav").toggle('slow').siblings('a').toggleClass('showUl');
			e.preventDefault(e);
			e.stopPropagation();
		});
		$(".headerWrap .bar.pc ul li").click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
		$(".headerWrap .bar.mobile ul li").click(function(e){
			e.stopPropagation(e);  
			$(this).addClass('active').siblings().removeClass('active');
		});

		/**logout**/
		$(".jsLogout").click(function(){
			_user.logout(function(res,txtStatus){
				alert(txtStatus);
				window.location.href=indexPg;
				_commonJs.cleanCookie();
			},function(err){
				alert(err);
			});
		});
		/** go to transaction manage list page */
		$(".headerWrap .jsTranMg").click(function(){
			window.location.href=goTranList;
		});
		/** go to transaction page */
		$(".headerWrap .jsAddTran").click(function(){
			window.location.href=goTranPg;
		});
	},
	pageMove: function(unread){
		$("a.navbar-brand").click(function(){
			window.location.href=indexPg;
		});
		var logInfo=_commonJs.checkLogin();
		if(!logInfo.login){
			var currentUrl=window.location.href;
			alert("宝贝儿，你还没登录哦~~先去登录哦！");
			window.location.href=indexPg+'?redirectFrom='+currentUrl;
		}else{
			$(".headerWrap .bar .nickName").text(logInfo.cookie.nickname);
		};

		$(".bellWrap").click(function(e){
			_commonJs.loading();
			var data={
				id: unread,
				user_id: _commonJs.getCookie().user_id
			};

			var unreadQue='';
				$.each(data.id,function(index,val){
					if(index>0){
						unreadQue+='_'+val.id; 
					}else{
						unreadQue+=val.id; 
					};
				});
			window.location.href=goAlertHistrory+'?unread='+unreadQue;
		});
	},
	checkInWechat: function(){
		var ua=window.navigator.userAgent.toLowerCase();
		if((ua.match(/MicroMessenger/i))=="micromemessenger"){
			return true;
		}
		else{
			return false;
		}

	}
};

$(function(){
	header.init();
});

module.exports=header;