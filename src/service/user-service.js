/*
* @Author: Administrator
* @Date:   2017-08-29 08:57:49
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-26 22:29:09
*/
//https://en.wikipedia.org/api/rest_v1/?spec
"use strict";

var _mm = require('util/mm.js');

var _user = {
	register: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/user/register.do'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	userName: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('.test/user/check_valid.do'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		});
	},
	login: function(userInfo,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/user/login.do'),
			data  : userInfo,
			method: 'post',
			success: resolve,
			error  : reject
		});

	},
	checkLogin: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	//logout function
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//check user name at the first step of forget password
	passReset : function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_get_question.do'),
			data: data,
			method : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//check the security answer at the second step of forget password 
	passResetCheckAnswer: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_check_answer.do'),
			data: data,
			method : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//reset password at the third step of forget password
	forgetRestPass: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_reset_password.do'),
			data: data,
			method : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//get user's information
	getUserInfo: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_information.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	//update user's information in user-center-update.html
	userInfoUpdate: function(data,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/update_information.do'),
			data: data,
			method : 'POST',
			success : resolve,
			error   : reject
		});
	}
};

module.exports = _user;
