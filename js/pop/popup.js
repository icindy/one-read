$(function(){
	$("#jandan-btn").on('click',function(){
		$("#jandan-page").html("");
		$.ajax({
	        type: "GET",
	        url: "http://jandan.net/feed",
	        dataType: "xml",
	        success: function(data){
	        		    
		                $(data).find("channel").find("item").each(function(index, ele) {
							var titles = $(ele).find("title").text();
							var links = $(ele).find("link").text();
							var  itemString = $(ele).html();
							var commentNum = $(ele).find("slashComments").text();
							console.log(titles+'-----');
							var html = '<li><a href="'+links
										+'"><p class="page-title">'+titles
										+'</p>'
										+'<p class="page-brief">'+commentNum+' 条评论</p></a></li>';
							$("#jandan-page").append(html);
						});
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


