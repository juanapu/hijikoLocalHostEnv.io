/*
* @Author: Administrator
* @Date:   2017-09-03 09:02:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 15:45:15
*  here is header
*/
"use strict";

require('./index.css');
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var _commonJs=require('../index.js');
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
		_this.pageMove();
		_this.checkInWechat();
	},
	insertImg: function(){
		var img=require('../../../resource/img/logo.png');
		$(".headerWrap>nav.navbar>a.navbar-brand>img").attr('src',img);
	},
	renderApi: function(){
		/****get api render new message*******/
		//if has new message
			  var msgNum=1; //messagenum
			  $(".headerWrap span.notification--num.act>.inner").text(msgNum);
			  $(".headerWrap .act").addClass('active');
			  console.log($(".headerWrap .act"));
		//else no new message
			// $(".headerWrap .act").removeClass('active');

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
	pageMove: function(){
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
			window.location.href=goAlertHistrory;
			e.stopPropagation();
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