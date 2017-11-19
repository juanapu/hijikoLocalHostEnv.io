/*
* @Author: Administrator
* @Date:   2017-11-17 14:59:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 13:59:49
*/
"use strict";

var _mm = require('util/mm.js');

var _user = {
	register: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/users/register'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	login: function(userInfo,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/users/login'),
			data  : userInfo,
			method: 'post',
			success: resolve,
			error  : reject
		});

	},
	//logout function
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/users/logout'),
			method : 'POST',
			success : resolve,
			error   : reject
		});
	}
};


module.exports = _user;