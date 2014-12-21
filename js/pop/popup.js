$(function(){
	//首次点击后展示v2x列表
	$("#v2x-page").show();
	//首次加入xueqiu
	commonAjaxFn("GET","http://xueqiu.com/hots/topic/rss","xml",xueqiuFn);
	//煎蛋a链接
	$("#jandan-btn").on('click',function(){
		$("#jandan-page").html("");
		commonAjaxFn("GET","http://jandan.net/feed","xml",jandanFn);
    	return false;
    });

    //雪球
	$("#xueqiu-btn").on('click',function(){
		$("#xueqiu-page").html("");
		commonAjaxFn("GET","http://xueqiu.com/hots/topic/rss","xml",xueqiuFn);
	    return false;
	});
	
});

// common function
//ajax发送执行的公共函数
function commonAjaxFn(ajaxType, ajaxUrl, ajaxDataType, successFn){
	$.ajax({
	        type: ajaxType,
	        url: ajaxUrl,
	        dataType: ajaxDataType,
	        beforeSend: ajaxBeforeFn,
	        success: function(data){successFn(data)},
	        error: ajaxErrorFn,
	        complete: ajaxCompleteFn
    });
}
function ajaxFn(data){

}

//ajax执行前的公共函数
function ajaxBeforeFn(){
	$(".pop-div").show();
	$(".net-ok").hide();
	$(".spinner").show();       
}

//ajax执行完成后的公共函数
function ajaxCompleteFn(){
	$(".spinner").hide();
	$(".net-ok").show();
	$(".pop-div").hide();
}

//ajax执行后错误的公共函数
function ajaxErrorFn(){

}


// 每一个网站的处理函数

//煎蛋函数
function jandanFn(data){
	var ulHtml="";

	$(data).find("channel").find("item").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find("title").text();
		var link = $(ele).find("link").text();
		var  itemString = $(ele).html();
		var commentNum = $(ele).find("slashComments").text();
		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+commentNum+' 条评论</p></a></li>';
		ulHtml += liHtml;
	});

	$("#jandan-page").html(ulHtml);
	$(".cat-list ul").hide();
	$("#jandan-page").show();
}

//雪球函数
function xueqiuFn(data){
	var ulHtml="";

	$(data).find("channel").find("item").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find("title").text();
		var link = $(ele).find("link").text();
		var  itemString = $(ele).html();
		var commentNum = $(ele).find("slashComments").text();
		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+commentNum+' 条评论</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#xueqiu-page").html(ulHtml).show();
}








