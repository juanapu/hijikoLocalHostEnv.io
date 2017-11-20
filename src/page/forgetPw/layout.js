require('./index.css');
require('bootstrap');

var marginTop,hideTop;

var layout={
	init: function(){
			var _this=this;
			var documentWidth=$(document).width();
				if(documentWidth<=330){
					marginTop='126px';
					hideTop='-500px';
				}else{
					marginTop='136px';
					hideTop='-500px'; // set margin top value out of screen for previous page. 
				};
			_this.changeContentMargin(1,marginTop,1500); 
			_this.event();

	},
	changeContentMargin: function(num,margin,speed,display){  /*display the content of the first page, num=page num, margin=new margin style*/
		$(".main>.wrap>.pg"+num+">.content").show('fast').animate({
			marginTop: margin,
			opacity: 1,
			display: display,
		},speed);
	},
	event: function(){
		var _this=this;
		var innerDiv=$(".main>.wrap").children("div");
				$(".main button.js-nxt").click(function(){
					$("button.js-prev").show('slow');
					var show=$(".wrap").attr("data-show");
					var next=parseInt(show)+1;
					if(next<=innerDiv.length){
						_this.changeContentMargin(next,marginTop,1500,'block');
						$(".pg"+show).animate({
							height: 0
						},1000); 
						_this.changeContentMargin(show,hideTop,500,'none');
						$(".pg"+next).css({
							display: 'block'
						}).animate({
							height: '100%'
						},1000,function(){
							$(".wrap").attr("data-show",next);
						}); 
					};
					if(next===innerDiv.length){
						$(".main button.js-nxt").hide('slow');
					};
				});
				$("button.js-prev").click(function(){
					$("button.js-nxt").show('slow');
					var show=$(".wrap").attr("data-show");
					var prev=parseInt(show)-1;
					if(prev>0){
						_this.changeContentMargin(prev,marginTop,1500,'block');
						$(".pg"+show).animate({
							height: 0
						},1000);
						$(".pg"+prev).css({
							display: 'block'
						}).animate({
							height: '100%'
						},1000,function(){
							_this.changeContentMargin(show,'1300px',500,'none');
							$(".wrap").attr("data-show",prev);
						});
					};
					if(prev===1){
						$("button.js-prev").hide('slow');
					};
				});
	}

};


$(function(){
	layout.init();
});