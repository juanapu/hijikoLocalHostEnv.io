
"use strict"

require('./layout.css');
//require('../css/style.css')

var commonJs={
	init: function(){
		var _this=this;
		FastClick.attach(document.body);  /****** mobile click event compatibility ******/
	},
	loading: function(){
		$("#loadingWrap").show().css({opacity: 1});
	},
	unloading: function(){
		$("#loadingWrap").css({opacity: 0}).hide();	
	}

};

$(function(){
	commonJs.init();
});


module.exports=commonJs;