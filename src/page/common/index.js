
"use strict"

require('./layout.css');
//require('../css/style.css')

var commonJs={
	init: function(){
		var _this=this;
		FastClick.attach(document.body);  /****** mobile click event compatibility ******/
		_this.pageMove();
	},
	pageMove: function(){
		
	}
};

$(function(){
	commonJs.init();
});


