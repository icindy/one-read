$(function(){
	//首次点击后展示v2x列表
	$("#v2x-page").show();

	//煎蛋a链接
	$("#jandan-btn").on('click',function(){
		$("#jandan-page").html("");
		$.ajax({
	        type: "GET",
	        url: "http://jandan.net/feed",
	        dataType: "xml",
	        beforeSend: function(){
	        	$(".net-ok").hide();
	        	$(".spinner").show();
	        },
	        success: function(data){

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
	        },
	        error: function(){
	        	alert("error");
	        },
	        complete: function(){
	        	$(".spinner").hide();
	        	$(".net-ok").show();
			}

    	});
    	return false;
    });

    	//雪球
	$("#xueqiu-btn").on('click',function(){
		$("#xueqiu-page").html("");
		$.ajax({
		       type: "GET",
		       url: "http://xueqiu.com/hots/topic/rss",
		       dataType: "xml",
		       success: function(data){

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
		        },
		       error: function(){
		        alert("error");
		       }
	    });
	    return false;
	});
	
});

function commonAjaxFn(){
	$.ajax({
        type: "GET",
        url: "http://jandan.net/feed",
        data: null,
        dataType: "json",
        success: function(data){
	                $(data).find("channel").find("item").each(function(index, ele) {
						var titles = $(ele).find("title").text();
						var links = $(ele).find("link").text();
						var commentNum = $(ele).find("slash:comments").text();
						console.log(titles+'-----');
						var html = '<li><a href="'+links
									+'"><p class="page-title">'+titles
									+'</p>'
									+'<p class="page-brief">'+commentNum+' 条评论</p></a></li>';
						$("#jandan-page").append(html);
					});
          		}
    });

}


