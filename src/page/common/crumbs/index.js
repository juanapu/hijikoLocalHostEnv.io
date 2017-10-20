/*
* @Author: Administrator
* @Date:   2017-10-02 13:14:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-02 13:54:52
*/

"user strict";

require('./index.css');
var _mm=require('../../../util/mm.js');
var string=require('./index.string');

var crumbs={
	data : {
		title : ''
	},
	init   : function(){
		var _this=this;
		_this.render();
	},
	render : function(){
		var _this=this;
		_this.data.title=document.title;
		var result=_mm.renderHtml(string,_this.data);
		$(".currentPg").text(result);
	}
};

$(function(){
	crumbs.init();
});