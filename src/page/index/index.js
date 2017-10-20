"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/nav/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
var _header=require('../common/header/index.js');
var _navSide=require('../common/nav-side/index.js');
var _mm=require('../../util/mm.js');

//http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
_mm.request({
	url: 'w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
	success : function(res){
		console.log("success");
		console.log(res);
		console.log(res.status);
	},
	error: function(errMsg){
		console.log("it is error");
		console.log(errMsg);
	}
}); 

	var html='<div>{{data}}</div>';
	var data ={
		data: 124
	};
console.log(_mm.renderHtml(html,data));
console.log(_mm.validate(18911247993,'phone'));

console.log(_mm.getUrlParam('test'));
console.log(" here is index js");

_header.init();
_navSide.init('order-list');