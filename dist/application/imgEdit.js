
;(function ($, undefined) {
    $.fn.imgEdit = function(opttons){
        var opts = {
            "boxAreaObj" : $(".j_imgLoadWrap"),         
            "imgTipObj" : $(".j_imgLoadTip"),           
            "defaultImg" : "defaultImg170",             
            "slideBtnObj" : $(".j_imgLoadSlideBtn"),    
            "slideWidth" : 100,                         
            "saveBtnObj" : $(".j_imgEditSaveBtn")           
        };
        var options = options || {};
        $.extend(opts, options);
        var showObj = opts.boxAreaObj.find(".j_imgLoadShow"),        
            reflectObj = opts.boxAreaObj.find(".j_imgLoadDragFunc"), 
            imgBoxObj = opts.boxAreaObj.find(".j_imgLoadBox"),       
            showWidth = showObj.width(),                        
            showHeight = showObj.height(),                      
            showObj_x1 = showObj.prev().width() + 1,
            showObj_x2 = showObj_x1 + showWidth,
            showObj_y1 = showObj.parent().prev().height() + 1,
            showObj_y2 = showObj_y1 + showHeight,
            imgBoxWidth = opts.boxAreaObj.width(),                   
            imgBoxHeight = opts.boxAreaObj.height();                 
        var utils = {
            "fileFunc" : function(imgSrc){
                $("input[name='Orignal']").val(imgSrc);
                var imgFaceObj = new Image();
                imgFaceObj.onload = function(){
                    var imgFaceWidth = imgFaceObj.width,        
                        imgFaceHeight = imgFaceObj.height,      
                        imgFaceColunm = (imgFaceHeight/imgFaceWidth).toFixed(2),  
						
                        imgNewFaceWidth = showWidth,                    
                        imgNewFaceHeight = 0,                   
                        imgNewFaceLeft = 0,                     
                        imgNewFaceTop = 0;                      
                    imgNewFaceHeight = imgFaceColunm * imgNewFaceWidth;
                   
                    if(imgNewFaceHeight < showHeight){                  
                        imgNewFaceHeight = showHeight;
                        imgNewFaceTop = showObj_y1;
                        imgNewFaceWidth = parseInt(imgNewFaceHeight / imgFaceColunm);
                        imgNewFaceLeft = (imgBoxWidth - imgNewFaceWidth)/2;
                    }else{                                      
                        imgNewFaceLeft = showObj_x1;
                        imgNewFaceTop = (imgBoxHeight - imgNewFaceHeight)/2;
                    }
                    var $imgFaceObj = $(imgFaceObj);
                    
                    if(imgFaceWidth < imgNewFaceWidth || imgFaceHeight < imgNewFaceHeight){
                        $imgFaceObj.attr({"data-enlarge":"1","orig-width":imgFaceWidth,"orig-height":imgFaceHeight});       
                        imgFaceWidth = imgNewFaceWidth * 2;
                        imgFaceHeight = imgNewFaceHeight * 2;
                    }else{
                        $imgFaceObj.attr("data-enlarge","0");
                    }
                    var imgNewFaceMaxLeft = imgNewFaceLeft - ((imgFaceWidth - imgNewFaceWidth) / 2),    
                        imgNewFaceMaxTop = imgNewFaceTop - ((imgFaceHeight - imgNewFaceHeight) / 2);    
                    $imgFaceObj.css({
                        width : imgNewFaceWidth + "px",
                        height : imgNewFaceHeight + "px",
                        position : "absolute",
                        top : imgNewFaceTop + "px",
                        left : imgNewFaceLeft + "px"
                    });
                    
                    $imgFaceObj.attr({
                        "max_width" : imgFaceWidth,
                        "min_width" : imgNewFaceWidth,
                        "max_height" : imgFaceHeight,
                        "min_height" : imgNewFaceHeight,
                        "max_left" : imgNewFaceMaxLeft,
                        "min_left" : imgNewFaceLeft,
                        "max_top" : imgNewFaceMaxTop,
                        "min_top" : imgNewFaceTop,
                        "colunm" : imgFaceColunm
                    });
                    
                    reflectObj.css({
                        width : imgNewFaceWidth + "px",
                        height : imgNewFaceHeight + "px",
                        cursor : "move",
                        top : imgNewFaceTop + "px",
                        left : imgNewFaceLeft + "px"
                    });
                    imgBoxObj.html(imgFaceObj).show();      
                    opts.imgTipObj.hide();                       
                    imgBoxObj.parent().removeClass(opts.defaultImg);
                    var imgObj = imgBoxObj.find("img");
                    utils.imgZoom(opts.slideBtnObj, imgBoxObj, reflectObj, opts.slideWidth);                    
                    utils.imgDrag(imgObj, reflectObj, opts.boxAreaObj, showObj);                               
                    utils.imgSave(opts.saveBtnObj, imgBoxObj, opts.slideBtnObj, showObj, opts.slideWidth);       
                };
                imgFaceObj.src = imgSrc;
            },
            "imgDrag" : function(imgObj, reflectObj, boxAreaObj, showObj){
                var imgBoxWidth = boxAreaObj.width(),       
                    imgBoxHeight = boxAreaObj.height(),     
                    x1 = boxAreaObj.offset().left,          
                    x2 = x1 + imgBoxWidth,                  
                    y1 = boxAreaObj.offset().top,           
                    y2 = y1 + imgBoxHeight,                 
                    old_X = 0,                              
                    page_X = 0,                             
                    old_Y = 0,                             
                    page_Y = 0,                             
                    old_left = parseInt(reflectObj.css("left")),
                    old_top = parseInt(reflectObj.css("top")),  
                    showWidth = showObj.width(),                
                    showHeight = showObj.height(),              
                    areaX1 = showObj.prev().width() + 1,
                    areaX2 = areaX1 + showWidth,
                    areaY1 = showObj.parent().prev().height() + 1,
                    areaY2 = areaY1 + showHeight;
                var dragFunc = function(e){                
                   
                    if(e.pageX < x1 || e.pageX > x2 || e.pageY < y1 || e.pageY > y2){
                        reflectObj.css("cursor","default");
                        return;
                    }else{
                        reflectObj.css("cursor","move");
                    };
                    
                    
                    if(old_X == 0){         
                        old_X = e.pageX;
                        old_Y = e.pageY;
                    }
                    page_X = e.pageX;                       
                    page_Y = e.pageY;                       
                    var x = page_X - old_X + old_left,      
                        y = page_Y - old_Y + old_top;       
                    old_left = x;                          
                    old_top = y;                            
                    old_X = page_X;                        
                    old_Y = page_Y;                         
                   
                    var width = parseInt(imgObj.css("width")),
                        height = parseInt(imgObj.css("height")),
                        x_1 = areaX2 - width,
                        y_1 = areaY2 - height;
                    if(x > areaX1){
                        x = areaX1;
                    }
                    if( x < x_1){
                        x = x_1;
                    }
                    if( y > areaY1){
                        y = areaY1;
                    }
                    if( y < y_1){
                        y = y_1;
                    }
                    reflectObj.css({
                        left : x + "px",
                        top : y + "px"
                    });
                    imgObj.css({
                        left : x + "px",
                        top : y + "px"
                    });
                    
                };
                reflectObj.mousedown(function(e){
                    $(document).bind("mousemove", dragFunc);
                });
                $(document).mouseup(function(){
                    $(this).unbind("mousemove", dragFunc);
                    old_X = 0;
                });
                reflectObj.mouseover(function(){
                    $(this).css("cursor","move");
                });
            },
            "imgZoom" : function(slideBtnObj, imgBoxObj, reflectObj, slideWidth){
                var slidebox = slideBtnObj.parent(),
                    left = slideBtnObj.offset().left,
                    moveFunc,
                    imgObj = imgBoxObj.find("img"),
                    maxW = parseInt(imgObj.attr("max_width")),
                    minW = parseInt(imgObj.attr("min_width")),
                    maxH = parseInt(imgObj.attr("max_height")),
                    minH = parseInt(imgObj.attr("min_height")),
                    colunm = imgObj.attr("colunm");
              
                var zoomFunc = function(e){
                    var newImgObj = imgBoxObj.find("img");
                    if(newImgObj.attr("allow")){
                        return;
                    };
                    var re = /^[0-9]+.?[0-9]*$/;
                   
                    if(!re.test(e.pageX)){
                        return;
                    };
                    var x = (e.pageX - left),
                        z = x / slideWidth,
                        maxL = parseInt(imgObj.attr("max_left")),
                        minL = parseInt(imgObj.attr("min_left")),
                        maxT = parseInt(imgObj.attr("max_Top")),
                        minT = parseInt(imgObj.attr("min_Top"));
                    
                    if(x >= 0 && x < slideWidth){
                        slideBtnObj.css("left", x + "px");
                        var w = (maxW - minW) * z + minW,
                            h = (maxH - minH) * z + minH,
                            l = (maxL - minL) * z + minL,
                            t = (maxT - minT) * z + minT;
                        imgObj.css({
                            width : w + "px",
                            height : h + "px",
                            left : l + "px",
                            top : t + "px"
                        });
                        reflectObj.css({
                            width : w + "px",
                            height : h + "px",
                            left : l + "px",
                            top : t + "px"
                        });
                    };
                };
                
                var setMaxMin = function(){
                    var width = parseInt(imgObj.css("width")),
                        height = parseInt(imgObj.css("height")),
                        left = parseInt(imgObj.css("left")),
                        top = parseInt(imgObj.css("top")),
                        maxW = parseInt(imgObj.attr("max_width")),
                        minW = parseInt(imgObj.attr("min_width")),
                        maxH = parseInt(imgObj.attr("max_height")),
                        minH = parseInt(imgObj.attr("min_height")),
                        maxL = left - (maxW - width) / 2,
                        minL = left + (width - minW) / 2,
                        maxT = top - (maxH - height) / 2,
                        minT = top + (height - minH) / 2;
                    imgObj.attr({
                        "max_left" : maxL,
                        "min_left" : minL,
                        "max_top" : maxT,
                        "min_top" : minT
                    });
                };
                slideBtnObj.live("click",function(e){
                    $(document).unbind("mousemove",zoomFunc);
                }).mousedown(function(){
                    setMaxMin();
                    $(document).bind("mousemove",zoomFunc)
                });
                slidebox.mouseleave(function(){
                    $(document).unbind("mousemove",zoomFunc);
                });
            },
            "imgSave" : function(saveBtnObj, imgBoxObj, slideBtnObj, showObj, slideWidth){
                var imgObj = imgBoxObj.find("img"),
                    showWidth = showObj.width(),                
                    showHeight = showObj.height(),             
                    areaX1 = showObj.prev().width() + 1,
                    areaX2 = areaX1 + showWidth,
                    areaY1 = showObj.parent().prev().height() + 1,
                    areaY2 = areaY1 + showHeight;
               
                var checkLocation = function(imgX1, imgY1, imgX2, imgY2){
                    var flag = true;
                    if(imgX1 <= areaX1 && imgX2 >= areaX2 && imgY1 <= areaY1 && imgY2 >= areaY2){
                        flag = true;
                    }else{
                        flag = false;
                    };
                    return flag;
                };
                
                saveBtnObj.die().live("click", function () {
                    if(imgBoxObj.find("img").attr("allow")){
                        return true;
                    };
                    var x,                                                                 
                        y,                                                                  
                        scale,                                                             
                        btnLeft,
                        originalWidth,
                        width = parseInt(imgObj.css("width")),
                        maxWidth = parseInt(imgObj.attr("max_width")),
                        origWidth = parseInt(imgObj.attr("orig-width")),
                        height = parseInt(imgObj.css("height")),
                        imgX1 = parseInt(imgObj.css("left")),
                        imgX2 = imgX1 + width,
                        imgY1 = parseInt(imgObj.css("top")),
                        imgY2 = imgY1 + height;
                    if(checkLocation(imgX1, imgY1, imgX2, imgY2)){
                        x = areaX1 - imgX1;
                        y = areaY1 - imgY1;
                        if(imgObj.attr("data-enlarge") == 1){   
                            originalWidth = origWidth;
                        }else{
                            originalWidth = maxWidth;
                        };
                        scale = parseFloat((width / originalWidth).toFixed(4));
                        var paramData = { rid: $("#rootcompanyid").val(), oriFilePath: imgObj.attr("src"), X: x, Y: y, width: showWidth, height: showHeight, scale: scale };
                        var postUrl = "/ApplicationFormTemplate/UploadPhotoCut?lid=" + languageID;
                        $.post(postUrl, paramData, function (data) {
                            var imgSrc = $("#imgdomain").val() + data.FilePath;
                            $("#j_applicationFaceImg").attr("src", imgSrc);
                            $(".j_popUpLoadFaceBox").hide();
                            coverHide();
                        }, "json");
                        return true;
                    }else{
                        alert("亲，您保存的图片位置不对");
                        return false;
                    };
                    return false;
                });
            }
        };
        opts.slideBtnObj.css("left","0px");
        thisObj = $(this);
        if (isImages(fileValue(thisObj.val()))) {
            var url = "/ApplicationFormTemplate/UploadPhoto?lid=" + languageID;
            if (resumeType)
                url = "/uploadphoto";
            $.ajaxFileUpload({
                secureuri: false,
                fileElement: thisObj,
                url: url,
                dataType: 'json',
                type: "post",
                data: { lid: languageID },
                success: function (data) {
                    if (data.ret)
                        utils.fileFunc($("#imgdomain").val() + data.FilePath);
                    else
                        alert(data.ErrorMessage);
                }
            });
           
        }
    };
})(jQuery);