/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-24 15:20:33
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
var goTranListRcv='./tranListRcv.html';
/**public data**/
var userInfo=_commonJs.checkLogin();


var tranList={
	init: function(){
		var _this=this;
		_this.renderApi();
	},
	bindEvent: function(){
		var _this=this;
		$(".mobileHogan .detail").click(function(){
			var targ=$(this).parents('.table');
			window.location.href=goDetail+"?tranNum="+targ.data('trannum')+"&id="+targ.data('id')+"&role="+targ.data('role')+"&status="+targ.data('status')+"&type=2";
		});
		$(".tranListPg .tabWrap button.jsRcvList").click(function(){
			//type(2(my payment)，3 (my income orders)
			var orderType=$(this).hasClass('jsRcvList')?3:2;
			window.location.href=goTranListRcv;
		});
	},
	renderApi: function(orderType){ 	//type(2(my payment)，3 (my income orders)
		var _this=this;
		// var userInfo=_commonJs.checkLogin();
		var data={
			user_id: userInfo.cookie.user_id,
			type: orderType?orderType:2,
			page: 1
		};
		var isPc=_this.isPc();
		//if is pc, use pagination. If is mobile load all. 
		if(isPc){
 			_commonJs.loading();
			_this.loadPc(data,userInfo,orderType);	
		}else{
		 /* mobile load all**/
 			_commonJs.loading();
			_trade.tranList(data,function(resDt,txtStatus,res){
				data.page=res.pages;
				_this.loadMobile(data,userInfo,orderType);
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});		 		
		};
	},
	loadMobile: function(data,userInfo,orderType){
			var _this=this;
			data.type=orderType?orderType:2;
			_trade.tranList(data,function(res,txtStatus){
					_commonJs.unloading();
					_this.renderHoganPcMb(res,userInfo,orderType);
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
	},
	loadPc: function(data,userInfo,orderType,noDestroyTwbs){
			var _this=this;
			data.type=orderType?orderType:2;
			noDestroyTwbs?noDestroyTwbs:false;
			_trade.tranList(data,function(res,txtStatus,resTotal){
					_commonJs.unloading();
					/*******pagination logic********/
					var pgData=[];
					if(data.page===1){
						pgData=res;
					}
					else{
						var first=(data.page-1)*5;
						var last=((data.page-1)*5+4>res.length)?(res.length-1):(data.page-1)*5+4;
						for(var i=first;i<=last;i++){
							pgData.push(res[i]);
						};
					};
					_this.pagination(resTotal,data,pgData,userInfo,orderType,noDestroyTwbs); 
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
	},
	isPc: function(){
		var wid=$(window).width();
		if(wid<=700){
			return false;
		}else{
			return true;
		};
	},
	delTran: function(tranId,targMb,targPc){
				 /**delete order by using delete API***/
			var data={
				id: tranId
			};
			_trade.tranDelete(data,function(res,txtStatus){
				targMb.hide('fast'); 
				targPc.hide('fast'); 
			},function(err){
				_mm.errorTips(err);
			});   
	},
	//resTotal, total res data. data: user_ID&&page, res: res.data, userInfo: cookie&&login
	pagination: function(resTotal,data,pgData,userInfo,orderType,noDestroyTwbs){
			var _this=this;
			data.type=orderType?orderType:data.type;
			var currentPg;
			if(!data.page){
				currentPg=1;
			};
		    //  _this.renderHoganHTML(res,userInfo);
			_this.pageLogic();/******use to divide pages*******/
		    _this.renderHoganPcMb(pgData,userInfo,orderType);
		    if(!pgData){
		    	data.page=1;
		    };
		    _this.twbsPagination(resTotal,data,pgData,userInfo,orderType,currentPg,noDestroyTwbs); 
	},
	twbsPagination: function(resTotal,data,pgData,userInfo,orderType,currentPg,noDestroyTwbs){
		var _this=this;
		if(!noDestroyTwbs){
			 $('#pagination-demo').twbsPagination('destroy');
		};
		    $('#pagination-demo').twbsPagination({
		        totalPages: resTotal.pages?resTotal.pages:1,
		        visiblePages: (resTotal.pages>10)?10:resTotal.pages,
		        next: 'Next',
		        prev: 'Prev',
		        initiateStartPageClick: false,
		        hideOnlyOnePage: true,
		        onPageClick: function (event,page) {
		            //fetch content and render here
		            //$('#page-content').text('Page ' + page) + ' content here';
		            if(!(page===currentPg)){
			            data.page=page;
			            _commonJs.loading();
						_this.loadPc(data,userInfo,data.type,'noDestroyTwbs');	 
					};
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
	renderHoganPcMb: function(items,userInfo,orderType){	
			var _this=this;		
			var hoganData={
				list: []
			};

			$.each(items,function(index,val){
				/***status setting****/
					//type(，1，admin；2，payer；3，receiver)
				if(val.receive_user_id.toString()){
					switch(userInfo.cookie.user_id.toString()){
						case  val.user_id.toString() :
							val.roleMark=2
							val.role="付款方"
							break;
						case val.receive_user_id.toString():
							val.roleMark=3
							val.role="收款方"
							break;
						default :
							val.roleMark=1
							val.role="HiJiko"
							break; 
					};					
				}else{
					//val.receive_user=(val.receive_user_id===userInfo.cookie.user_id)?"收款方":"付款方";
					val.roleMark=(val.user_id.toString()===userInfo.cookie.user_id.toString())?2:1;
					val.role=(val.user_id.toString()===userInfo.cookie.user_id.toString())?"付款方":"管理员";
				};
				switch(val.status){
	//0，waitting for pay；1：paid；2：money released；-1：pending;-2:request of refund;-3 :refuned ;-4:request of pending; -5: invisible for user -6，hide for payer，-7，hide for all users（not admin）

						case  0 :
							val.statusTxt="等待付款"
							val.ableCelBtn=(val.roleMark===3)?false:true  //active cancel button=false.
							val.ablePasBtn=false  //active pause button=false.
							break;
						case 1 :
							val.statusTxt="已付款"
							val.ableCelBtn=false  
							val.ablePasBtn=(val.roleMark===3)?false:true
							break;
						case 2 :
							val.statusTxt="已完成"
							val.ableCelBtn=true
							val.ablePasBtn=false  
							break; 
						case -1 :
							val.statusTxt="托管暂停"
							val.ableCelBtn=false
							val.ablePasBtn=false  
							break; 
						case -2 :
							val.statusTxt="申请退款"
							val.ableCelBtn=false 
							val.ablePasBtn=(val.roleMark===3)?false:true 
							break; 
						case -3 :
							val.statusTxt="已退款"
							val.ableCelBtn=false
							val.ablePasBtn=false  
							break; 
						case -4 :
							val.statusTxt="申请暂停"
							val.ableCelBtn=false
							val.ablePasBtn=false  
							break; 
				};
				// val.receive_user=(val.receive_user_id===userInfo.cookie.user_id)?"收款方":"付款方";
				val.created=val.created.replace('T','      ').replace(/\+.*/,'');
				hoganData.list.push(val);
			});

			var insertMbHtml=_mm.renderHtml(mobileTrade,hoganData);
			$(".mobileHogan").html(insertMbHtml);
			 var insertHtml=_mm.renderHtml(tradehtml,hoganData);
			 $(".pcHogan").html(insertHtml);		 			// render tabWrap
			_this.addPOP();  /*** pop up message box when click button ****/
			_this.bindEvent();
	},
	//event: e, targ: the clicked button selector
	tradeMsgLogic: function(event,targ){ 
				var data={
					trade_sn: '',
					message: '',
					type: '',
					user_id: ''
				};
				data.trade_sn=targ.parents(".popWrap.comment").parents(".table").data("trannum")?targ.parents(".popWrap.comment").parents(".table").data("trannum"):targ.parents(".popWrap.comment").parents("td.action").parents("tr").data("trannum");
				data.type=targ.parents(".popWrap.comment").parents(".table").data("role")?targ.parents(".popWrap.comment").parents(".table").data("role"):targ.parents(".popWrap.comment").parents("td.action").parents("tr").data("role");
				data.user_id=userInfo.cookie.user_id;
				data.message=targ.parents(".buttonWrap").siblings("textarea").val();
				_commonJs.loading();
				_trade.tranMesCreate(data,function(resDt,txtStatus,res){
					_commonJs.unloading();
					targ.parents('.popWrap').hide('slow',function(){
						$(this).remove();
						_mm.errorTips("留言成功啦，点击订单-》可在订单详情页面查看留言哦！");
					}); 
				},function(err){
					_commonJs.unloading();
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
			$(".popWrap.comment .buttonWrap>input[type='submit']").click(function(e){
				 if($(this).parents(".buttonWrap").siblings("textarea").val()){
						_this.tradeMsgLogic(e,$(this)); 
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