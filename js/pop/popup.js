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

	//mindstore
	$("#mindstore-btn").on('click',function(){
		$("#mindstore-page").html("");
		commonAjaxFn("GET","http://mindstore.io/","html",mindstoreFn);
	    return false;
	});

	//segmentfault
	$("#segmentfault-btn").on('click',function(){
		$("#segmentfault-page").html("");
		commonAjaxFn("GET","http://segmentfault.com/blogs","html",segmentfaultFn);
	    return false;
	});

	//zhihu
	$("#zhihu-btn").on('click',function(){
		$("#zhihu-page").html("");
		commonAjaxFn("GET","http://www.zhihu.com/explore","html",zhihuFn);
	    return false;
	});

	//solidot
	$("#solidot-btn").on('click',function(){
		$("#solidot-page").html("");
		commonAjaxFn("GET","http://solidot.org.feedsportal.com/c/33236/f/556826/index.rss","xml",solidotFn);
	    return false;
	});

	//next 36
	$("#next36-btn").on('click',function(){
		$("#next36-page").html("");
		commonAjaxFn("GET","http://next.36kr.com/posts","html",next36Fn);
	    return false;
	});

	//jianshu
	$("#jianshu-btn").on('click',function(){
		$("#jianshu-page").html("");
		commonAjaxFn("GET","http://www.jianshu.com/","html",jianshuFn);
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

	$(".cat-list ul").hide();
	$("#jandan-page").html(ulHtml).show();
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

//mindstoreFn
function mindstoreFn(data){
	var ulHtml="";

	$(data).find("#mind-list").find("ul").eq(0).find("li").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find(".mind-title>a").text();
		var link = $(ele).find(".mind-title>a").attr("href");

		var  itemString = $(ele).html();
		var zanNum = $(ele).find(".vote-total").text();
		var mindDes = $(ele).find(".mind-des").text();

		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+zanNum+' 条支持 | '+mindDes+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#mindstore-page").html(ulHtml).show();

}

//segmentfault
function segmentfaultFn(data){
	var ulHtml="";

	$(data).find(".stream-list.blog-stream").find("section").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find(".title>a").text();
		var link = "http://segmentfault.com"+$(ele).find(".title>a").attr("href");

		var  itemString = $(ele).html();
		var zanNum = $(ele).find(".votes").html();
		var mindDes = $(ele).find(".excerpt").text();

		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+zanNum+' | '+mindDes+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#segmentfault-page").html(ulHtml).show();

}

//zhihu
function zhihuFn(data){
	var ulHtml="";

	$(data).find(".explore-tab .tab-panel").find(".explore-feed").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find(".question_link").text();
		var link = $(ele).find(".question_link").attr("href");

		var  itemString = $(ele).html();
		var zanNum = $(ele).find(".zm-item-vote-count").html();
		var mindDes = $(ele).find(".zh-summary").text();

		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+zanNum+'条赞同 | '+mindDes+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#zhihu-page").html(ulHtml).show();

}

//solidot
function solidotFn(data){

	var ulHtml="";

	$(data).find("channel").find("item").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find("title").text();
		var link = $(ele).find("link").text();
		var des = $(ele).find("description").text().substring(0,20);
		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+des+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#solidot-page").html(ulHtml).show();

}

//jianshu
function jianshuFn(data){
	var ulHtml="";

	$(data).find(".thumbnails").find(".article").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find(".title").text();
		var link = $(ele).find(".title").attr("href");

		var zanNum = $(ele).find(".like-icon-button").remove("i").text();
		var mindDes = $(ele).find(".content").text();

		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+zanNum+'次喜欢 | '+mindDes+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#jianshu-page").html(ulHtml).show();

}

//next36-http://next.36kr.com/posts
function next36Fn(data){
	var ulHtml="";

	$(data).find(".post>ul").eq(0).find(".product-item ").each(function(index, ele) {
		if (index > 9) { return false};
		var title = $(ele).find(".product-url>a").text();
		var link = $(ele).find(".product-url>a").attr("href");

		var zanNum = $(ele).find(".vote-count").text();
		var mindDes = $(ele).find(".post-tagline").text();

		var liHtml = '<li><a target="_blank" href="'+link
					+'" title="'+title+'" "><p class="page-title">'+title
					+'</p>'
					+'<p class="page-brief">'+zanNum+'次支持 | '+mindDes+'</p></a></li>';
		ulHtml += liHtml;
	});
	
	$(".cat-list ul").hide();
	$("#next36-page").html(ulHtml).show();
}











