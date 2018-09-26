(function($){

    var oldSelected = '';
    var w=this;
    $.fn.extend({
        IndustryOn:function(data,options){
            var isUrl=typeof urlOrData==='string';
            options= $.extend({}, $.IndustryOn.defaults,{
                data:data
            },options);
            this.each(function(){
                new $.IndustryOn(this,options);
            });
        }
    });
    $.IndustryOn=function(dom,options){
        var language = languageID;
        var btn_val_cancel = language == 2 ? 'Cancel' : '取消';
        var btn_val_ok =  language == 2 ? 'Ok' : '确定';
        var title_val = language == 2 ? 'Choice Category' : '选择行业类别';
        options.title = title_val;
        //选中赋值
        function selected(data){
            var pid=[],
                cid=[],
                name=[];
            if($.isArray(data)){
                for(var i in data){
                    pid.push(data[i].pid);
                    cid.push(data[i].id);
                    name.push(data[i].value);
                }
            }else{
                pid.push(data.pid);
                cid.push(data.id);
                name.push(data.value);
            }
            $('#'+options.InsHiddenId).length&&$('#'+options.InsHiddenId).val(pid.join(','));
            $('#'+options.SubHiddenId).length&&$('#'+options.SubHiddenId).val(cid.join(','));
            $(dom).val(name.join('；'));
        };
        //反向赋值
        function initSelected(){
            var InsIds=$('#'+options.InsHiddenId).length&&$('#'+options.InsHiddenId).val();
            var SubIds=[];
            if($('#'+options.SubHiddenId).length){
                var subVal = $('#'+options.SubHiddenId).val();
                SubIds=subVal.split(',');
            }
            return SubIds;
        }
        var select= $.IndustryOn.Select(dom,options,selected,initSelected);
        $(dom).click(function(){
            select.show();
            /*行业单选时的反选，如果页面中有值，则把相应的值赋给oldSelected保存*/
            if(options.limit == 1 && $('#'+options.InsHiddenId).length && $('#'+options.SubHiddenId).length){
                oldSelected = {
                    'data-id' : $('#'+options.SubHiddenId).val(),
                    'data-pid' : $('#'+options.InsHiddenId).val(),
                    'data-value' : $(dom).val()
                }
            }else{
                oldSelected = '';
            }
        });
    };
    $.IndustryOn.defaults={
        title:"",
        limit:1,
        data:[],
        width:0,
        left:0,
        InsHiddenId:'',
        SubHiddenId:''
    };

    $.IndustryOn.Select=function(dom,options,fn,prefn){
        var element,
            list,
            form,
            selectedLi,
            needsInit=true;
            //$(".profess_contt li").removeClass("ins_over");
        var CLASS={
            //SELECTED:'ins_over',
            HOVER:'ins_hover'
        };
        var language = languageID;
        var btn_val_cancel = language == 2 ? 'Cancel' : '取消';
        var btn_val_ok =  language == 2 ? 'Ok' : '确定';
        var title_val = language == 2 ? 'Choice Category' : '选择行业类别';
		options.title = title_val;
        function init(){
            if(!needsInit)
                return;
            element=$('<div onselectstart="return false"/>').addClass('profess_select').hide().appendTo(w.document.body);
            var limit="";
            if(language == 2){
                limit=options.limit>1?"Most selection "+options.limit:"";
            }else{
                limit=options.limit>1?"最多可选"+options.limit+"项":"";
            }
            $('<div/>').addClass('profess_title').appendTo(element).html(''+options.title+'<span>'+limit+'</span>');
            var parentDiv=$('<div/>').addClass('profess_cont').appendTo(element);
            list=$('<div/>').addClass('profess_contt').appendTo(parentDiv);
            form=$('<form/>').appendTo(list).click(function(event){
                //alert(target(event).nodeName);
                selected1.call(target(event));
            });       
            if(options.limit===1){
                form.mouseover(function(event){
                    if(target(event).nodeName&&target(event).nodeName.toLowerCase()==='li'){
                        $('ul>li',form).removeClass(CLASS.HOVER);
                        $(target(event)).addClass(CLASS.HOVER);
                    }
                });
            }
            var footer=$('<div/>').addClass('profess_foot').appendTo(parentDiv);
			$('<span class="true">'+btn_val_ok+'</span>').appendTo(footer).click(function(){
                //关闭并赋值
                if(options.limit>1){
                    var data=[];
                    if(selectedLi.length>0){
                        $.each(selectedLi,function(){
                            data.push($.data(this,'ins_cdata'));
                        });
                        fn.call(this,data);
                    }else{
                       fn.call(this,"");
                    }
                }else{
                    var data = { "pid" : oldSelected["data-pid"],"id" : oldSelected["data-id"],"value" : oldSelected["data-value"]};
                    fn.call("", data);
                }
                hide();
                /*回调函数_校验*/
                if(options.callBack){
                    options.callBack();
                }
            });
            
            $(".close_btn").click(function(){
                /*关闭时把行业单选时用来保存选择值的oldSelected清空*/
                oldSelected = '';
                //关闭
                hide();
                /*回调函数_校验*/
                if(options.callBack){
                    options.callBack();
                }
            });
            $('<span class="false">'+btn_val_cancel+'</span>').appendTo(footer).click(function(){
                /*关闭时把行业单选时用来保存选择值的oldSelected清空*/
                oldSelected = '';
                //关闭
                hide();
                /*回调函数_校验*/
                if(options.callBack){
                    options.callBack();
                }
            });
            fillData();		
            needsInit=false;

            $(".profess_contt li span").click(function(){
                 $(this).parent().addClass("ins_over").siblings("li").removeClass("ins_over");
                 $(this).parent().parent().parent().siblings("div").find("li").removeClass("ins_over");
            })
        }

        function selected(){
            if(options.limit>1){
                selectedLi = resetPanel();
                //页脚提示
            }else{
                $(this).addClass(CLASS.SELECTED);
                var data = $.data(this,'ins_cdata');
                fn.call(this,data);
//              hide();
                return data;
            }
        }

        function selected1(){
            if(options.limit>1){
                selectedLi = resetPanel();
                //页脚提示
            }else{
                $(this).addClass(CLASS.SELECTED);
                var data = $.data(this,'ins_cdata');
                /*行业单选点击某一个项时把选择的值保存到oldSelected中*/
                if(data){
                    oldSelected = {
                        'data-id' : data.id,
                        'data-pid' : data.pid,
                        'data-value' : data.value
                    }
                }
                //fn.call(this,data);
//              hide();
                return data;
            }
        }

        function resetPanel(){
            var ckList = list.find('ul>li>input:checkbox:checked');
            if(ckList.length>=options.limit){
                list.find('ul>li>input:checkbox').not('input:checked').attr("disabled","disabled");
            }else{
                list.find('ul>li>input:checkbox').not('input:checked').removeAttr('disabled');
            }
            return selectedLi= ckList.closest('li');
        }


        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI")
                element = element.parentNode;
            if (!element)
                return [];
            return element;
        }

        function fillData(){
            var data=options.data;
            if(!data||!data.length)
                return;
            for(var i in data){
                var parent=data[i];
                var div=$('<div/>').appendTo(form).append('<h5 class="center">'+parent["value"]+'</h5>');
                if(parent['sub']&&parent['sub'].length){
                    var ul=$('<ul/>').appendTo(div);
                    for(var key in parent['sub']){
                        var cdr=parent['sub'][key];
                        var li=setLi(cdr).appendTo(ul);
                        var cache={
                            pid:parent['id'],
                            id:cdr['id'],
                            value:cdr['value']
                        };
                        $.data(li[0],'ins_cdata',cache);
                    }
                };
				
            }
        }
        function preInit(){
              if(options.limit>1){
                    $(".profess_contt").find("li").each(function(){                   
                       $(this).find('input:checkbox').attr('checked',false);  
                    })
                }else{
                     $(".profess_contt").find("li").each(function(){
                        $(this).removeClass("ins_over");                 
                    }) 
                }  
            var subIds=typeof prefn==='function'&&prefn.call(this);
            if(subIds.length){
                if(options.limit>1){
                    for(var key in subIds){
                        //form.find("ul>li[c_index='"+subIds[key]+"']").find('input:checkbox').attr('checked', true);
                        if(form.find("ul>li[c_index='"+subIds[key]+"']").find('input:checkbox').length > 0){
                            form.find("ul>li[c_index='"+subIds[key]+"']").find('input:checkbox').get(0).checked = true;
                        }
                        
                    }
                    resetPanel();//计数
                    return;
                }
                form.find("ul>li[c_index='"+subIds[0]+"']").addClass("ins_over").siblings().removeClass("ins_over");
                if(subIds==""){
                    form.find("li").each(function(){
                        $(this).removeClass("ins_over");                 
                    })
                }
            }
        }
        function hide(){
            //$.popupBase.close(element);
            element.hide();
			$("#cPop_cover").hide();
			$("#cPop_coverIframe").hide();
        }
        function setLi(cdr){
            var li=$('<li/>').attr('c_index',cdr['id']);
            if(options.limit>1){
                var id='sub_'+cdr['id'];
                li.html('<input type="checkbox" name="subcheck" id="'+id+'"><label for="'+id+'">'+cdr['value']+'</label>');
            }else{
                li.html('<span>' + cdr['value'] + '</span>');
            }
            return li;
        }

        return {
            show:function(){
                init();
                preInit();//选中
                
                
				if(/msie 6/.test(navigator.userAgent.toLowerCase()) && /msie/.test(navigator.userAgent.toLowerCase())){	
					window.frames["cPop_coverIframe"].document.bgColor = "#000";
					var ifr = document.getElementById("cPop_coverIframe");
					ifr.height = $(window).height();
					ifr.style.display = "block";
				}else{
					$("#cPop_cover").show();
				};
				element.css("top",($(window).height()-element.height())/2 + $(window).scrollTop())
				element.show();
				$(".center").each(function(){
				var centerHeight = $(this).parent().height();
				$(this).css({height:centerHeight,lineHeight:centerHeight+'px'})
				$(".profess_contt").find("div:odd").css("background","#f7f8f8")	
                
            });
                
            },
            hide:function(){
                hide();
            }
        };
    };
}).call(window,jQuery);
