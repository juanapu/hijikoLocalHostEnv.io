/******index*****/

"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/loading/index.js');
var _headerIndex=require('../common/headerIndex/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-service.js');
var _commonJs=require('../common/index.js');
require('./layout.js');
var loginHtml=require('./login.string');  //get customized string module for login & register
var registerHtml=require('./register.string');
var img; // insert image to html code

/****define page move*****/
var goTransaction="./transaction.html";
var goForgetPw='./forgetPw.html';


var index={
	init: function(){
		var _this=this;
		_this.checkTarget(); //check what's the purpose of user. 
	},
	checkTarget: function(){
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.userRegister();
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.bindUserLogic();
		}else{
			_this.userLogin();
			_this.insertHtml(loginHtml,$(".formWrap"));
		};
		_this.insertImg();
		_this.bindUserLogic(); // register,login,reset password etc page jumps
	},
	insertHtml: function(string,insertDomSelector){
		var insert=_mm.renderHtml(string,{});
		insertDomSelector.html(insert);
	},
	insertImg: function(){
		var innerDiv=$(".main>.wrap").children("div");

		for(var i=1;i<=innerDiv.length;i++){
			img=require('../../resource/img/pg'+i+'.png');
			$(".main>.wrap>.pg"+i+">.content>.description>img").attr('src',img);
		};
	},
	bindUserLogic: function(){
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.registerAccessFunc();
		}else{
			_this.loginAccessFunc(); 
		};
	},
	registerAccessFunc: function(){
		var _this=this;
		$(".registerForm .email input").focus();
		_this.userRegister(); //
		var callbackFun=function(){ // show findPw form
			_this.insertHtml(loginHtml,$(".formWrap"));
			_this.userLogin();
			_this.AddResetPwEvent();
			 $("a.jsRegister").click(function(){
			 	_this.insertHtml(registerHtml,$(".formWrap"));
			 		$(".registerForm .email input").focus();
			 	_this.userRegister(); //
				 $("a.jsLogin").click(function(){
				 	_this.insertHtml(loginHtml,$(".formWrap"));
	 				_this.userLogin();
					_this.AddResetPwEvent();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsLogin").click(callbackFun);
	},
	loginAccessFunc: function(){
		var _this=this;
		_this.userLogin();
		_this.AddResetPwEvent();
		var callbackFun=function(){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			$(".registerForm .email input").focus();
			_this.userRegister();
			 $("a.jsLogin").click(function(){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
			 	_this.userLogin();
	 			_this.AddResetPwEvent();
				 $("a.jsRegister").click(function(){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
			 		$(".registerForm .email input").focus();
	 				_this.userRegister();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun); 
	},
	AddResetPwEvent: function(){
		 $("a.jsResetPw").click(function(){
		 	window.location.href=goForgetPw;
		 });
	},
	userRegister: function(){
		var _this=this;
		var checkResult=false;	
		_mm.disableInputKeyCode($(".registerForm>form input"),32);
		var targ=".registerForm";
		_this.checkAllValidate(targ);
		$(".registerForm>form").submit(function(e){
			var data={
 				email: $(".registerForm .email input").val()?$(".registerForm .email input").val():'',
 				firstname: $(".registerForm .userName input[name='fstName']").val()?$(".registerForm .userName input[name='fstName']").val():'',
 				lastname: $(".registerForm .userName input[name='lstName']").val()?$(".registerForm .userName input[name='lstName']").val():'',
 				password: $.base64.encode($(".registerForm .passWord input").val()),
 				trade_sn: _mm.getUrlParam('tranNum')? _mm.getUrlParam('tranNum'):''
			};
			data.nickname=data.lastname+' '+data.firstname; //added nick name
			_commonJs.loading();
			_user.register(data,function(res,txtStatus){
				_commonJs.unloading();
				_this.insertHtml(loginHtml,$(".formWrap"));
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			},function(err){
				_commonJs.unloading();
				$(".registerForm .resultPg>.resultWrap>p").text(err);
				$(".registerForm .resultPg").show('slow');
			});
			 e.preventDefault();
		});
	},
	userLogin: function(){
		var _this=this;
		var targ=".loginForm.login";
		_this.checkAllValidate(targ);
		$(".loginForm.login>form").submit(function(e){
			var userInfo={
				email: $(".loginForm.login .email input").val()?$(".loginForm.login .email input").val():'',
 				password: $.base64.encode($(".loginForm.login .passWord input").val())
			};
			//释放 var url='/users/login?nickname='+userInfo.nickname+'&password='+userInfo.password;
			_commonJs.loading();
			_user.login(userInfo,function(res,txtStatus){
				_commonJs.unloading();
				/***********set cookies****************/
				var psWord=$.base64.encode(userInfo.password);
				_commonJs.setCookie('email',userInfo.email);
				_commonJs.setCookie('nickname',res.user_fullname);
				_commonJs.setCookie('user_firstname',res.user_firstname);
				_commonJs.setCookie('user_lastname',res.user_lastname);
				_commonJs.setCookie('password',psWord);
				_commonJs.setCookie('user_id',res.user_id);
				var redirectPg=_mm.getUrlParam('redirectFrom');
				window.location.href=redirectPg?redirectPg:goTransaction;
			},function(err){
				_commonJs.unloading();
				$(".loginForm .resultPg>.resultWrap>p").text(err);
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			});
			e.preventDefault();
		});
	},
	checkAllValidate: function(target){
		   $(target+" input").blur(function(){
			   	function emptyAction(targ){
						$(target+" .resultPg>.resultWrap>p").text('亲，不能为空哦');
					 	$(target+" .resultPg").show('slow');
					 	targ.addClass('errInput');
			   	};

			  function errAction(targ,type){
			  	        var typeTxt='';
			  	        switch(type){
			  	        	case 'email' :
			  	        		typeTxt='邮箱'
			  	        		break;
        	 	        	case 'lstName'||'fstName' :
			  	        		typeTxt='姓名'
			  	        		break;
        	 	        	case 'passWord' :
			  	        		typeTxt='密码'
			  	        		break;
			  	        };
						$(target+" .resultPg>.resultWrap>p").text('亲，要正确填写'+typeTxt+'哦');
					 	$(target+" .resultPg").show('slow');
					 	targ.addClass('errInput');
			   	};

			   function rightAction(targ){
						$(target+" .resultPg").hide('slow');
						targ.removeClass('errInput');
			   	};
			   	var type=$(this).attr('name');
			   	  _mm.validAlert($(this),type,emptyAction,errAction,rightAction);

			   	  /*****check whether all filled******/
		   	  		   var formItem=$(target+">form").children('.formItem');
		   	  		   var checkFalseNum=0;
		   	  		   var check;
					   for(var i=0;i<formItem.length;i++){
					   	   var input=$(formItem[i]).children('input');
					   	    for(var j=0;j<input.length;j++){
						   	      check=_mm.validResult($(input[j]),$(input[j]).attr('name'),emptyAction,errAction,rightAction);
						   	    if(!check){
						   	    	checkFalseNum++;
						   	    };
						   	};
					   };
				if(!checkFalseNum){
					$(target+" input[type='submit']").attr('disabled',false).removeClass('disInput',1000);
				}else{
					$(target+" input[type='submit']").attr('disabled',true).addClass('disInput',1000);
				};
			});
	}
}

$(function(){
	index.init();
});
