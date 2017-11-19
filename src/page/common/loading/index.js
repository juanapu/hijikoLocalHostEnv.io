/*
* @Author: Administrator
* @Date:   2017-11-17 23:21:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 15:02:12
*  how to use:
*    1) add 	<%= require('html-loader!./layout/loading.html') %>  to the target page
*    2) require  load->index.js
*    3) require  common->index.js->  _common.loading()/_common.unloading
*/
require('./index.css');

var _loading={
	init: function(){
	}
};

$(function(){
	_loading.init();
});

module.exports=_loading;