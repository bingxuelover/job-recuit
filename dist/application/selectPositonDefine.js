
//职位类别包装函数
$.fn.industryCreator = function(containerid,isMultiSelect,selectedMaxNum,showNamesElemId,showIdsElemId,showParentIdsElemId,confimFun,cancelFun,language){
	var cateUrl = '';
	var language = language;
	if(language && language == 2){
		cateUrl = '/HtmlFile/popSelectPosition_en.shtml';
	}else{
		cateUrl = '/HtmlFile/popSelectPosition.shtml';
	}
	$.ajax({
		url : cateUrl,
		dataType : "html",
		async: false,
		success : function(data){
			if(/msie 6/.test(navigator.userAgent.toLowerCase()) && /msie/.test(navigator.userAgent.toLowerCase())){	
				window.frames["cPop_coverIframe"].document.bgColor = "#000";
				var ifr = document.getElementById("cPop_coverIframe");
				ifr.height = $(window).height();
				ifr.style.display = "block";
			}else{
				$("#cPop_cover").show();
			};
			$("body").append(data);
			$(".positionCategoryBox").css("top",($(window).height()-$(".positionCategoryBox").height())/2 + $(window).scrollTop())	
			if(isMultiSelect){
				var tip = language == 1 ? '最多可选5项' : 'Most selection 5';
				$('#__layer_wrapper__ h4 ').append('<small>' + tip +'</small>');
				/*多选时为了使下边线对其，调整第一列的高度*/
				//if(language == 2){
//					var hackP = $("#layer_div_job_cate_class").next("div").find("p");
//					$(hackP[2]).css({height:'122px',lineHeight:'122px'});
//					$(hackP[8]).css({height:'91px',lineHeight:'91px'});
//					$(hackP[9]).css({height:'153px',lineHeight:'153px'});
//					$(hackP[11]).css({height:'273px',lineHeight:'273px'});
//					$(hackP[12]).css({height:'152px',lineHeight:'152px'});
//				}
			}
			document.getElementById("layer_div_job_cate_class").style.display="none";
			var jobCate = new zpJobCateMgr();
			jobCate.isMultiSelect = isMultiSelect || false;
			jobCate.selectedMaxNum = selectedMaxNum || 5;
			jobCate.show(showNamesElemId, showIdsElemId,showParentIdsElemId,
				function(){
					typeof confimFun == 'function' ? confimFun() : '';
					//selectJobCate.onclose();
					$("#"+containerid).hide().remove();
					$("#cPop_cover").hide();
					$("#cPop_coverIframe").hide();	
				}, function(){
					typeof cancelFun == 'function' ? cancelFun() : '';
					$("#"+containerid).hide().remove();
					$("#cPop_cover").hide();
					$("#cPop_coverIframe").hide();
			});
			/*控件显示后修改划过效果*/
			if( $.fn.on ){
				$(".ul_job_cate_parent_css li").on("mouseover",function(){
					$(this).css("background","#f8f8f8").siblings().css("background","#fff");
					$(this).css("borderRight","1px solid #f8f8f8").siblings().css("borderRight","1px solid #ebeaea");
				})
			}else{
				$(".ul_job_cate_parent_css li").live("mouseover",function(){
					$(this).css("background","#f8f8f8").siblings().css("background","#fff");
					$(this).css("borderRight","1px solid #f8f8f8").siblings().css("borderRight","1px solid #ebeaea");
				})
			}
		}
	});
};