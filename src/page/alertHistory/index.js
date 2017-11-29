/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 15:35:33
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
var hoganHtml=require('./hoganHtml.string');

/****page url define***/
var confirmPg='./confirm.html';

var transaction={
	init: function(){
		var _this=this;
		_this.renderApi();
	},
	renderApi: function(){
		var _this=this;
		var logData={
			user_id: _commonJs.getCookie().user_id,
			page: 20
		};
		 _commonJs.loading();
	     _trade.tranLog(logData,function(resDt,txtStatus,res){
			 _commonJs.unloading();
			 var localUser=_commonJs.getCookie().nickname;

			 $.each(resDt,function(index,val){
				 if(val.content === '添加留言'){
				 	val.isComt=true;
				 }else{
				 	val.isStatChange=true;
				 };
				 if(localUser===val.trade.receive_user_fullname){ //the comment user is receiver
				 	val.role=3;
				 }else if(localUser===val.trade.user_fullname){  //the comment user is  payer
				 	val.role=2;
				 }else{
				 	val.role=1;
				 };
				 if(val.name===localUser){
				 	val.isLocalUser=true;
				 };
				 val.msgId=val.trade.id;
				 val.title=val.trade.title;
				 val.created=val.created.replace("T"," ").replace(/\+.*/," ");
			 });
 			var template=_mm.renderHtml(hoganHtml,res);
			$(".alertHistory .hoganWrap").html(template);

			/**set unread messge's style**/
			 var unreadQue=_mm.getUrlParam('unread');
			 var unreadArr=unreadQue.split('_');
			 $.each(unreadArr,function(index,val){
			 	$("#unread"+val).addClass('unread');
			 });
					_this.bindEvent();
	     },function(err){
	     	 _commonJs.unloading();
	     	 _mm.errorTips(err);
	     	 $(".alertHistory").html('<div class="container" style="padding-top: 3em"><div class="row"><div class="col-md-8 col-xs-8">出错啦！！！请刷新页面试试哦！！或者清一下浏览器缓存重新登录一次哦</div></div></div>');
	     });
	},
	bindEvent: function(){
		$(".alertWrap.unread>p>a").click(function(e){
			var data={
				id: $(this).parents('.alertWrap').data('cmid'),
				user_id: _commonJs.getCookie().user_id
			};
			_trade.tranLogRead(data,function(resDt,txtStatus,res){
				//_mm.successTips(txtStatus);
			},function(err){
				_mm.errorTips(err);
			});
		});
	}
}


$(function(){
	transaction.init();
});

module.exports=transaction;