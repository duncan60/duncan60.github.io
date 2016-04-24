var $pageMenu,$wrap,$nav,$navPoint,$stAry,
	pageId=["about","skills","works"],targetID="",pageStatus="";
function isTransitionsSupported() {
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = thisStyle.transition !== undefined || 
                  thisStyle.WebkitTransition !== undefined || 
                  thisStyle.MozTransition !== undefined || 
                  thisStyle.MsTransition !== undefined || 
                  thisStyle.OTransition !== undefined;
    return support;
}

var init=function(){
	getDOM();
	setEventHandler();
}

var getDOM=function(){
	 $pageMenu=$("#page-menu");
	 $wrap=$(".wrapper");
	 $nav=$(".main-nav");
	 $navPoint=$(".nav-opint");
	 $stAry=[$("#about"),$("#skills"),$("#works")];
}
var setEventHandler=function(){
	$navPoint.on('click',function(){
		$pageMenu.toggleClass('open');
		$navPoint.toggleClass('active');
		$wrap.toggleClass('effect-back');
		if($wrap.hasClass('effect-back')){
		 	pageStatus="fadeOut";
		 	//if($._data( $(".effect-back")[0], 'events' )==undefined){
		 	$(".effect-back").off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',effectBackComplete);
		 	$(".effect-back").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',effectBackComplete);
		 	//}
		 }
	})
	$nav.on('click','a',navHandler).on('mouseenter mouseleave','a',function(e){
		$("#"+$(this).attr('data-page')).toggleClass('up');
	});
}
var navHandler=function(e){
	
	pageStatus="fadeIn";
	targetID=$(this).attr('data-page');	
	$.each(pageId, function( index, value ) {
		if(value!=targetID  ){
		  $stAry[index].addClass('fade-out');
		 }
	});
	$(".fade-out").off('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',stFadeOutComplete);
	$(".fade-out").on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',stFadeOutComplete);
	e.preventDefault();
}
var stFadeOutComplete=function(){
	reIndex(targetID);
	$pageMenu.removeClass('open');
	$navPoint.removeClass('active');
	$wrap.removeClass('effect-back');	
}
var effectBackComplete=function(){ 
	ageStatus="fadeOut";
	if(pageStatus=="fadeIn"){
		$.each(pageId, function( index, value ) {	
	  		$("#"+value).removeClass('fade-out');
		});
	}
}

var reIndex=function(target){
	$.each(pageId, function( index, value ) {		 
	  	$stAry[index].removeClass('first second third');
	});
	switch(target) {
   		case "about":
   			$stAry[0].addClass('first');
       		$stAry[1].addClass('second');
       		$stAry[2].addClass('third');
        break;
    	case "skills":
        	$stAry[2].addClass('second');
       		$stAry[0].addClass('third');
       		$stAry[1].addClass('first');
        break;
   		case "works":
   			$stAry[2].addClass('first');
        	$stAry[0].addClass('second');
       		$stAry[1].addClass('third');
        break;
        default:

        break;
	}
	
}
init();