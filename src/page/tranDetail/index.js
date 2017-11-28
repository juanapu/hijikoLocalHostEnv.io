/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-28 17:45:37
*/
"use strict";

require('../common/layout.css');
require('./index.css');
require('../common/footer/index.js');
require('../common/header/index.js');
require('bootstrap');

require('../common/loading/index.js');
var _commonJs=require('../common/index.js');

var _mm=require('../../util/mm.js');
var _trade=require('service/trade-service.js');
var hoganHtml=require('./hoganHtml.string');

/*********  define url ************/
var goConfirm='./confirm.html';

/****** define public variable*************/
var userInfo=_commonJs.checkLogin();

var tranList={
	init: function(){
		var _this=this;
		_this.renderAPI();
	},
	bindEvent: function(){
	},
	renderAPI: function(){
		var _this=this;
		_commonJs.che
		var tradeData={
			trade_sn: _mm.getUrlParam('tranNum'),
			type: _mm.getUrlParam('type'),
			user_id: userInfo.cookie.user_id
		};
		_commonJs.loading();
		_trade.viewTrade(tradeData,function(res,txtStatus){  /*****get transaction's information, render HTML and dynamic data***********/
			res.ablePasBtn=(parseInt(_mm.getUrlParam('role'))===3)?false:true; //role=3: receiver, role=2: payer  add ablePasBtn
			res.ableContinuePay=false;
			switch(res.status){
	//0，waitting for pay；1：paid；2：money released；-1：pending;-2:request of refund;-3 :refuned ;-4:request of pending; -5: invisible for user -6，hide for payer，-7，hide for all users（not admin）

						case  0 :
							res.statusTxt="等待付款"
							res.ableContinuePay=(_mm.getUrlParam('type')==='2')?true:false
							res.ablePasBtn=false  //active pause button=false.
							break;
						case 1 :
							res.statusTxt="已付款"
							res.ablePasBtn=(_mm.getUrlParam('type')==='3')?false:true
							res.realeaseDays=res.left_days
							break;
						case 2 :
							res.statusTxt="已完成"
							res.ablePasBtn=false  
							break; 
						case -1 :
							res.statusTxt="托管暂停"
							res.ablePasBtn=false  
							break; 
						case -2 :
							res.statusTxt="申请退款"
							res.ablePasBtn=(_mm.getUrlParam('type')==='3')?false:true 
							break; 
						case -3 :
							res.statusTxt="已退款"
							res.ablePasBtn=false  
							break; 
						case -4 :
							res.statusTxt="申请暂停"
							res.ablePasBtn=false  
							break; 
				};

	      /*****render trade logs API*********/
             var logData={
             	user_id: res.user_id,
             	page: 20
             };
             res.messageLength=res.trade_messages.length; //add messageLength
             res.msgList=[];
             	$.each(res.trade_logs,function(index,val){
             		if(!(val.content==='添加留言')){
             			 val.created=val.created.replace("T"," ").replace(/\+.*/," ");
	             		res.msgList.push(val);
             		};
             	});

             _trade.tranLog(logData,function(resDt,txtStatus){
	      			_commonJs.unloading();
             	$.each(res.trade_messages,function(index,val){
             		if(val.type===2){ //payer comment
             			val.commentType="付款人";
             			val.commentUser=res.user_fullname;
             			val.commentRole="isPayer";

             		}else if(val.type===3){ //receiver comment
             			val.commentType="收款人";
             			val.commentUser=res.receive_user_fullname;
             			val.commentRole="isRec";
             		}else{ //admin comment
             			val.commentType="管理员";
             			val.commentUser="HiJiko";
             			val.commentRole="isAdmin";
             		};
             	});
		             /*****render hogan template*********/
					var template=_mm.renderHtml(hoganHtml,res);
					$(".tranDetailPg>.row>.hoganHtml").html(template);

					/********add other events after html are rendered*********/
					_this.addPOP(res);  
				//	_this.pagination();
					_this.changeCss();
					_this.insertImg();
					_this.bindEvent(); 
             },function(err){
     			_commonJs.unloading();
             	_mm.errorTips(err);
             });

		},function(err){
			_commonJs.unloading();
			_mm.errorTips(err);
			$(".tranDetailPg ").html('<div style="padding-top: 3em"><div class="row"><div class="col-md-8 col-xs-8">出错啦！！！请刷新页面试试哦！！或者清一下浏览器缓存重新登录一次哦</div></div></div>');
		});
	},
	insertImg: function(){
		var hjImg=require('../../resource/img/hijikoLogo.png');
		var recImg=require('../../resource/img/store.png');
		var payerImg=require('../../resource/img/userIcon.png');
		$(".userImg>img.isAdmin").attr('src',hjImg);
		$(".userImg>img.isRec").attr('src',recImg);
		$(".userImg>img.isPayer").attr('src',payerImg);
	},
	changeCss: function(){
		var elem1 = document.getElementById("cmtListWrap");
		var style = window.getComputedStyle(elem1, null).overflowY;
		if(style==='scroll'){
			var htEm=$(window).height()/parseFloat($("body").css("font-size"));
			var htForm=$(".formWrap").height()/parseFloat($("body").css("font-size"));
			var htBt=$(".actionWrap.mobile>div").height()/parseFloat($("body").css("font-size"));
			var htCmt=htEm-htForm-htBt-8;
			$("#cmtListWrap").css({"max-height":""+htCmt+"em"});
		};
	},
	pagination: function(){
			var _this=this;
			_this.pageLogic();/******use to divide pages*******/
			$('#pagination-demo').twbsPagination({
		        totalPages: 16,
		        visiblePages: 6,
		        next: 'Next',
		        prev: 'Prev',
		        onPageClick: function (event, page) {
		            //fetch content and render here
		            $('#page-content').text('Page ' + page) + ' content here';
		        }
		    });
	},
	pageLogic: function(){
			var cmtNum=$('.commentListWrap .cmtInner').length;
			if(!cmtNum){
				$(".tranDetailPg .formWrap").addClass('rmMxHt');
			}else{
				$(".tranDetailPg .formWrap").removeClass('rmMxHt');
			};
	},
	//event: e, targ: the clicked button selector
	tradeMsgLogic: function(event,targ,viewRes){ 
				var data={
					trade_sn: viewRes.trade_sn,
					message: '',
					type: _mm.getUrlParam('type'),
					email: viewRes.user_email
				};
				data.message=targ.parents(".buttonWrap").siblings("textarea").val();
				_commonJs.loading();
				_trade.tranMesCreate(data,function(resDt,txtStatus,res){
					_commonJs.unloading();
					targ.parents('.popWrap').hide('slow',function(){
						$(this).remove();
						_mm.errorTips("留言成功啦，点击订单-》可在订单详情页面查看留言哦！");
						location.reload();
					}); 
				},function(err){
					_commonJs.unloading();
					_mm.errorTips(err);
				});
	},
	addPOP: function(viewRes){
		var _this=this;
		$(".js-POP").click(function(){
			var adCls='';
			switch($(this).data('type')){
		  		case 'pauseRlease' : 
					  adCls='pauseRlease'
					  break;
		  		case 'comment' : 
					  adCls='comment'
					  break;
		  		case 'continuePay' : 
				  adCls='continuePay'
				  break;
			};
			var popCnt='<div class="popWrap '+adCls+' "><div class="desc"></div><form action=""><textarea rows="4" value="please input here"></textarea><div class="buttonWrap"><input class="cancel cmnBtn light" type="button" value="取消"/> <input type="submit" class="cmnBtn" value="确认" /></div></form></div>';
			var $this=$(this);
			$this.after(popCnt);
			/******description of each form*********/
			var dataTy=$(this).data('type'); //get data type
			 switch(dataTy){
			 	case 'pauseRlease': //pause release button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入暂停放款的原因，例：与收款人协商一致暂停放款');
			 		break;
			 	case 'comment':  //comment button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入留言内容。注意：此条留言将与收款方&HiJiko管理员共享');
			 		break;
			 	case 'continuePay':
				 		$this.siblings('.popWrap').find('.desc').html('！！注意：请不要重复付款，若您已付款，状态显示失败，请留言HiJiko');
			 			$('.popWrap.continuePay>form>textarea').attr('readonly','readonly').text('若您还未支付，请点【确定】，开始支付，请务必全款支付，否则交易无法正常显示');
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
			$(".popWrap.continuePay .buttonWrap>input[type='submit']").click(function(e){
				var $inside=$(this);
				var tranSn=_mm.getUrlParam('tranNum');
				window.location.href=goConfirm+'?transactionNum='+tranSn;
				$inside.parents('.popWrap').hide('slow',function(){
					$(this).remove();
				}); 
				e.stopPropagation();  
			});

			//applay tradeMsgLogic
			$(".popWrap.comment .buttonWrap>input[type='submit']").click(function(e){
				 if($(this).parents(".buttonWrap").siblings("textarea").val()){
						_this.tradeMsgLogic(e,$(this),viewRes); 
                 }else{
                 	_mm.errorTips("亲爱的，你还没有留言哦！");
                 };
			});
			$(".popWrap form").bind('click submit',function(e){
				e.stopPropagation();
				e.preventDefault();  
			})
		});
	}
};

$(function(){
	tranList.init();
});