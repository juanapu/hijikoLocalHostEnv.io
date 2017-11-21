/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 17:05:56
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../common/header/index.js');
require('../common/loading/index.js');
var _commonJs=require('../common/index.js');
var _mm=require('../../util/mm.js');
var _trade=require('service/trade-service.js');
var tradehtml=require('./tradelist.string'); 
var mobileTrade=require('./mobileTrade.string'); 
/****define url*******/
var goDetail='./tranDetail.html';

var tranList={
	init: function(){
		var _this=this;
		_this.renderApi();
	},
	bindEvent: function(){
		$(".mobileHogan .detail").click(function(){
			alert("right");
			window.location.href=goDetail+"?tranNum="+$(this).data('trannum');
		});

	},
	renderApi: function(){
		var _this=this;
		var userInfo=_commonJs.checkLogin();
		var data={
			user_id: userInfo.cookie.user_id,
			page: 1
		};
		_commonJs.loading();
		_trade.tranList(data,function(res,txtStatus){
				_commonJs.unloading();
				var hoganData={
					list: []
				};

				$.each(res,function(index,val){
					val.payed=val.payed?"已支付":"等待付款";
					val.receive_user=(val.receive_user===userInfo.cookie.nickname)?"收款方":"付款方";
					val.created=val.created.replace('T','      ').replace(/\+.*/,'');
					hoganData.list.push(val);
				});

				var insertHtml=_mm.renderHtml(tradehtml,hoganData);
				$(".pcHogan").html(insertHtml);
				var insertMbHtml=_mm.renderHtml(mobileTrade,hoganData);
				$(".mobileHogan").html(insertMbHtml);
				_this.addPOP();  /*** pop up message box when click button ****/
				_this.bindEvent();
		},function(err){
			_mm.errorTips(err);
		});
	},
	delTran: function(tranId,targMb,targPc){
				 /**delete order by using delete API***/
			var data={
				id: tranId
			};
			_trade.tranDelete(data,function(res,txtStatus){
				targMb.hide('slow'); 
				targPc.hide('slow'); 
			},function(err){
				_mm.errorTips(err);
			});   
	},
	addPOP: function(){
		var _this=this;
		$(".js-POP").click(function(){
			var adCls='';
			switch($(this).data('type')){
				case 'delete' : 
				  adCls='del'
				  break;
	  		case 'pauseRlease' : 
				  adCls='pauseRlease'
				  break;
	  		case 'comment' : 
				  adCls='comment'
				  break;
			
			};

			var popCnt='<div class="popWrap '+adCls+' "><div class="desc"></div><form action=""><textarea rows="4" value="please input here"></textarea><div class="buttonWrap"><input class="cancel cmnBtn light" type="button" value="取消"/> <input type="submit" class="cmnBtn" value="确认" /></div></form></div>';
			var $this=$(this);
			$this.after(popCnt);
			/******description of each form*********/
			var dataTy=$(this).data('type'); //get data type
			 switch(dataTy){
 			 	case 'delete': //pause release button click => html
			 			$this.siblings('.popWrap').find('.desc').html('！！注意：订单删除，将无法找回，请谨慎操作');
			 			$('.popWrap.del>form>textarea').attr('readonly','readonly').text('若想删除该订单，请点击下方的 【确认】 按钮。否则，点击 【取消】。 \n删除无法找回，谨慎操作');
			 		break;
			 	case 'pauseRlease': //pause release button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入暂停放款的原因，例：与收款人协商一致暂停放款');
			 		break;
			 	case 'comment':  //comment button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入留言内容。注意：此条留言将与收款方&HiJiko管理员共享');
			 		break;
			 };
			 $this.siblings('.popWrap').show('slow');
			$(".popWrap .cancel").click(function(e){
				var $inside=$(this);
				$inside.parents('.popWrap').hide('slow',function(){
					$(this).remove();
				});
				e.stopPropagation();  
			});
			$(".popWrap.del .buttonWrap>input[type='submit']").click(function(e){
				var $inside=$(this);
				var tranId=$inside.parents("form").parents(".action").data('id');
				var targMb=$inside.parents(".wrap").parent();
				var targPc=$inside.parents("td.action").parent();
				_this.delTran(tranId,targMb,targPc);
				$inside.parents('.popWrap').hide('slow',function(){
					$(this).remove();
				}); 
				e.stopPropagation();  
			});
			$(".popWrap form").bind('click keypress submit',function(e){
				e.stopPropagation();  
				e.preventDefault();
			})
		});
	}
};

$(function(){
	tranList.init();
});