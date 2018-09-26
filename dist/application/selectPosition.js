/**
 * Created on 15-4-13.
 */
//CONST_SUBJOBTYPE
//CONST_JOBTYPE
function zpJobCateMgr() {
    this.currCateId = "";
    this.selectedData = {};
    this.parentSelectedData = [];
    this.showCateNamesElemId = "";//"txt_jobCate_Names";
    this.showCateIdsElemId = "";//"txt_jobCate_Ids";
    this.showParentIdsElemId = "";//"txt_jobCate_p_ids"//不能去除重复，要与上面id一一对应
    if (zpJobCateMgr.initDataOk == false)
        zpJobCateMgr.initData();
    this.jobCateObj = zpJobCateMgr.dataObj;//{cateId:{name:"",parentId:1000,child:{id:"name"}}}
}
zpJobCateMgr.initDataOk = false;
zpJobCateMgr.dataObj = {};

zpJobCateMgr.initData = function () {
    zpJobCateMgr.language = languageID ? languageID : 1;
    //重新在内存中整理数据格式
    var jobCate = zpJobCateMgr.language == 1 ? CONST_JOBTYPE.split('@') : CONST_JOBTYPE_EN.split('@');

    for (var m = 0, mLen = jobCate.length; m < mLen; m++) {
        if (jobCate[m] != "") {
            var jobCateArr = jobCate[m].split("|")
            if (jobCateArr.length == 3 && jobCateArr[0]) {
                zpJobCateMgr.dataObj[jobCateArr[0]] = { name: jobCateArr[1], parentId: jobCateArr[2], child: {} };//
            }
        }
    }
    var subCate = zpJobCateMgr.language == 1 ? CONST_SUBJOBTYPE.split('@') : CONST_SUBJOBTYPE_EN.split('@');
    for (var i = 0, len = subCate.length; i < len; i++) {
        if (subCate[i] != "") {
            var subCateArr = subCate[i].split("|");
            if (subCateArr.length == 3) {
                zpJobCateMgr.dataObj[subCateArr[2]]["child"][subCateArr[0]] = subCateArr[1];
            }
        }
    }
    zpJobCateMgr.initDataOk = true;
}
zpJobCateMgr.prototype = {
    selectedMaxNum: 5,
    isMultiSelect: true,
    elemClassId: 'layer_div_job_cate_class',
    elemParentId: 'layer_div_job_cate_parent',
    elemChildId: 'layer_div_job_cate_child',
    isParentId: function (id) {
        return this.jobCateObj[id] != undefined ? true : false;
    },
    show: function (showNamesElemId, showIdsElemId, showParentIdsElemId, confimFun, cancelFun) {
		
        this.showCateNamesElemId = showNamesElemId;
        this.showCateIdsElemId = showIdsElemId;
        this.showParentIdsElemId = showParentIdsElemId;
        var _self = this;
        $("#__layer_op_btn_ok").click(function () {
            var names = [];
            var ids = [];
            var pIds = [];
            for (var id in _self.selectedData) {
                ids.push(id)
                pIds.push(_self.selectedData[id]["parentId"]);
                names.push(_self.selectedData[id]["name"]);
            }
            $("#" + _self.showCateNamesElemId).val(names.join("；"));
            $("#" + _self.showCateIdsElemId).val(ids.join(","));
            $("#" + _self.showParentIdsElemId).val(pIds.join(","));
            typeof confimFun == 'function' ? confimFun() : '';
        });
        $("#__layer_op_btn_cancle").click(function () {
            typeof cancelFun == 'function' ? cancelFun() : '';
        });
        $("#job_close").click(function () {
            typeof cancelFun == 'function' ? cancelFun() : '';
        });
        this.init();
        this.render();
        this.showSeletedItem();
    },
    init: function () {
        var names = $("#" + this.showCateNamesElemId).val();
        var pIds = $("#" + this.showParentIdsElemId).val();
        var ids = $("#" + this.showCateIdsElemId).val();
        if (ids != "") {
            var pIdArr = pIds.split(",");
            var idArr = ids.split(",");
            var nameArr = names.split("；");
            if (pIdArr.length != idArr.length) {
                return;
            }
            for (var i = 0, len = idArr.length; i < len; i++) {
                if (idArr[i] != "") {
                    this.selectedData[idArr[i]] = { name: this.getNameById(zpJobCateMgr.dataObj,idArr[i]), isParentId: this.isParentId(idArr[i]), parentId: pIdArr[i] };
                }
            }
            /*为了反选保存选中的大类的值*/
            this.parentSelectedData = pIdArr;
        }
    },
    render: function () {
        var _self = this;
        var classHtml = [];
        var cateHtml = [];

        cateHtml.push("<ul id='layer_ul_job_cate_parent' class='ul_job_cate_parent_css'>")
        for (var i = 0, len = jobtypeClass.length; i < len; i++) {
            //jobtypeClass[i]["id"] + "-" +
            classHtml.push(jobtypeClass[i]["name"]);
            var id = jobtypeClass[i]["id"];
            for (var cateId in this.jobCateObj) {
                if (this.jobCateObj[cateId]["parentId"] == id)
                    /*为了调整英文下第二列文字显示样式，在拼接第二列的li时添加一个div，以参数'divForStyle'为标志*/
                    cateHtml.push(this.getItemHtml(cateId, this.jobCateObj[cateId]["name"], id, "layer_cate_item_",'divForStyle'))
            }/*
        cateHtml.push("<b>---------------------------</b>");*/
        }
        cateHtml.push("</ul>")
        //第一列
        document.getElementById(this.elemClassId).innerHTML = classHtml.join("<br/>");
        //第二列
        document.getElementById(this.elemParentId).innerHTML = cateHtml.join("");

        $("#layer_ul_job_cate_parent").find("input").each(function (index, item) {
            /*大类反选时深的背景颜色,由于_self.parentSelectedData中只保存了小类的大类，所以大类本身被选中还需要在遍历_self.selectedData*/
            for(var i = 0; i < _self.parentSelectedData.length; i++){
                if($(item).val() == _self.parentSelectedData[i]){
                    $(item).parent().addClass('deep');
                }
            }
            /*大类本身被选中时还需要在遍历_self.selectedData*/
            for(var key in _self.selectedData){
                if($(item).val() == key){
                    $(item).parent().addClass('deep');
                }
            }
            $(item).click(function () {
                if(_self.isMultiSelect){
                    /*选择大类时如果他的parent的class中没有deep，则给parent添加deep，如果有再判断该项是否被选中，没有选中时去掉class的deep*/
                    $(this).parent().hasClass('deep') ? (!$(this).prop('checked') ? $(this).parent().removeClass("deep") : '') : $(this).parent().addClass("deep");
                }
                return _self.itemClickEvent(this, true, this.getAttribute("data-pid"));
            });
        })

        $("#layer_ul_job_cate_parent").find("li").each(function (index, item) {
            $(item).mouseover(function (e) {
                //this.style.backgroundColor = '#f8f8f8';
                //this.style.borderRight = 'none';
                var parentId = this.getAttribute("data-id");
                _self.currCateId = parentId;
                var html = [];
                if(_self.isMultiSelect){
                    html.push("<ul id='layer_ul_job_cate_sub' class='ul_job_cate_parent_css'>");
                }else{
                    html.push("<ul id='layer_ul_job_cate_sub' class='ul_job_cate_parent_css radio_job'>");
                }
                var child = _self.jobCateObj[parentId].child;
                for (var subCateId in child) {
                    html.push(_self.getItemHtml(subCateId, child[subCateId], parentId, "layer_cate_sub_item_"))
                }

                html.push("</ul>");
                //第三列
                var currentItem = $(item);
                document.getElementById(_self.elemChildId).innerHTML = html.join("");

                if(_self.isMultiSelect){
                    $("#layer_ul_job_cate_sub").find("input").each(function (index, item) {
                        $(item).click(function () {
                            //记录其他兄弟元素有没有被选中
                            var has_checked = $(item).parent("li").siblings().find("input").is(":checked");

                            if(has_checked == false){
                                currentItem.hasClass('deep') ? currentItem.removeClass("deep") : currentItem.addClass("deep");
                            }else{

                            }
                        });
                    });
                }else{
                    $("#layer_ul_job_cate_sub").find("label").each(function (index, item) {
                        $(item).click(function () {
                            if($(this).hasClass("current")){
                                currentItem.addClass("light");
                                currentItem.removeClass("deep");
                                $(this).removeClass("current");
                            }else{
                                 currentItem.addClass("deep").siblings().removeClass("deep");
                                $(this).addClass("current").parent("li").siblings().find("label").removeClass("current");
                            }

                        });
                    });
                }

                if(_self.isMultiSelect){
                    $("#layer_ul_job_cate_sub").find("input").each(function (index, item) {
                        $(item).click(function () {
                            return _self.itemClickEvent(this, false, this.getAttribute("data-pid"));
                        });
                    }); 
                }else{
                   $("#layer_ul_job_cate_sub").find("label").each(function (index, item) {
                        $(item).click(function () {
                            var that = null;
                            if($(this).siblings("input").attr('checked')){
                                that = $(this).siblings("input").removeAttr('checked')[0]
                            }else{
                                that = $(this).siblings("input").attr('checked', 'checked')[0]
                            }
                            return _self.itemClickEvent(that, false, that.getAttribute("data-pid"));
                        });
                    }); 
               }
               /*第三列英文多选折行处理*/
               //if(zpJobCateMgr.language == 1){
//                    $("#layer_ul_job_cate_sub label").css("line-height","24px");
//
//                }else if(zpJobCateMgr.language == 2 && _self.isMultiSelect){
//                    $("#layer_ul_job_cate_sub label").css("max-width","172px");
//                    $("#layer_ul_job_cate_sub li input").css("marginTop","4px");
//                }
                // 调节第三列的排列高度对齐
               // var evenLi = $("#layer_div_job_cate_child li:even");
//                $("#layer_div_job_cate_child li:even").each(function(index, ele){
//                    var self = $(ele).height();
//                    var borber = $(ele).next().height();
//                    if(self <= borber){
//                        $(ele).height(borber)
//                    }else{
//                        $(ele).next().height(self);
//                    }
//                })
            });
            $(item).mouseout(function (e) {
                // this.style.backgroundColor = '#ffffff';
                // this.style.borderRight = '1px solid #e5e5e5';
            });
        });
        /*在英文页面调整第一列行高*/
        zpJobCateMgr.language = languageID ? languageID : 1;
        if(zpJobCateMgr.language == 2){
            //var hackLen=$("#layer_div_job_cate_class").next("div").find("p").length;
//            for(var i=0;i<hackLen;i++){
//                $($("#layer_div_job_cate_class").next("div").find("p")[i]).addClass("hackP_"+i)
//            }
            /*在英文页面单选时调整第二列左对齐*/
            //if(!_self.isMultiSelect){
//                $(".ul_job_cate_parent_css li label").css("display","inline-block")
//            }
            //调整第2列
            setTimeout(function(){
                var lastHackLi = $("#layer_ul_job_cate_parent li label").parent();
                lastHackLi.each(function(index,ele){
                    if($(ele).find("label").height()>30){
                        $(ele).find("label").addClass("minlineHeight");
                        $(ele).find("input").css("marginTop","1px")
                    }
                })
            },10);
        }
        /*ie6 浏览器样式修改：隐藏div*/
        //$('#__layer_show_selected_item').hide();
    },
    itemClickEvent: function (obj, isParentCate, pid) {
        var checked = true;
        if (!obj.checked) {
            checked = false;
            this.removeSelectedVal(obj.value);
            /*多选时去勾选，如果不足this.selectedMaxNum个使所有input可以选择*/
            if (this.isMultiSelect ) {
                var num = 0;
                for (var key in this.selectedData) {
                    num++;
                }
                if(num < this.selectedMaxNum){
                    $("#layer_div_job_cate_parent li").find('input').each(function(index, ele){
                        $(ele).removeAttr('disabled');
                    });
                    $("#layer_ul_job_cate_sub li").find('input').each(function(index, ele){
                        $(ele).removeAttr('disabled');
                    });
                }
            }
        } else {
            if (!this.addSelectedVal(obj.value, $(obj.parentNode).text(), isParentCate, pid)) {
                return false;
            }
        }

        if (isParentCate)
            $("#layer_ul_job_cate_sub").find("input").each(function (index, item) {
                if (checked) {
                    $(item).attr("disabled", "true")
                } else {
                    $(item).removeAttr("disabled")
                }
            });
        return true;
    },
    getItemHtml: function (id, name, parentId, chkIdPre, divForStyle) {
        var html = [];
        var chkId = chkIdPre + id;
        html.push("<li data-id='" + id + "'>");
        html.push(this.getCheckBoxHtml(chkId, id, parentId))
        html.push("<label for='" + chkId + "' class='" + (this.isSelectedVal(id) ? "current" : "")+ "'>");
        //id + "-" +
        html.push(name)
        html.push("</label>");
        /*为了调整英文下第二列文字显示样式，在拼接第二列的li时添加一个div，以参数'divForStyle'为标志*/
       // if(zpJobCateMgr.language == 2 && divForStyle){
//            html.push("<div style='clear:both;height:0px;overflow:hidden;'></div>");
//        }
        html.push("</li>");
        return html.join("");
    },
    getCheckBoxHtml: function (id, val, parentId) {
        return "<input " + (this.isSelectedVal(val) ? "checked" : "") + " " + ((this.isSelectedParentId(parentId) || (this.getSelectedNum() == this.selectedMaxNum && !this.isSelectedVal(val))) ? "disabled" : "") + " style='display:" + (this.isMultiSelect ? "" : "none") + "' type='checkbox' data-pid=" + parentId + " id='" + id + "' value='" + val + "'/>";
    },
    isSelectedParentId: function (id) {
        if (this.selectedData[id] != undefined && this.selectedData[id].isParentId) {
            return true;
        }
        return false;
    },
    isSelectedVal: function (id) {
        return this.selectedData[id] != undefined ? true : false;
    },
    removeSelectedVal: function (id) {
        delete this.selectedData[id];
    },
    addSelectedVal: function (id, name, isParentId, pid) {
        //选择大类，需要把小类移除，
        //var a = { "123": { isParentId: true, name: "abc",parentId:pid } }
        if (this.isMultiSelect) {
            var num = 0;
            if (isParentId) {
                for (var childId in zpJobCateMgr.dataObj[id]["child"]) {
                    for (var selId in this.selectedData) {
                        if (selId == childId) {
                            delete this.selectedData[selId];
                            $("#layer_cate_sub_item_" + id).removeAttr("checked");
                        }
                    }
                }
            }
            for (var selId in this.selectedData) {
                num++;
            }
            this.selectedData[id] = { isParentId: isParentId, name: name, parentId: pid };
            /*多选超过指定个数后disabled其他input*/
            if (this.selectedMaxNum <= num + 1) {
                $("#layer_div_job_cate_parent li").find('input').each(function(index, ele){
                    if(!$(ele).prop('checked')){
                        $(ele).attr('disabled', 'true');
                    }
                });
                $("#layer_ul_job_cate_sub li").find('input').each(function(index, ele){
                    // if($(ele).val() == id){$(ele).removeAttr('checked');}
                    if(!$(ele).prop('checked')){
                        $(ele).attr('disabled', 'true');
                    }
                });
                // alert("最多选择 " + this.selectedMaxNum + " 个")
                return true;
            }
            //console.log(html.join(";"));
            this.showSeletedItem();
        } else {
            this.selectedData = {};
            this.selectedData[id] = { isParentId: isParentId, name: name, parentId: pid };
        }
        return true;
    },
    getSelectedNum : function(){
        var num = 0;
        for (var key in this.selectedData) {
            num++;
        }
        return num;
    },
    getNameById : function(dataObj, id){
        /*根据id在处理后的数据源中查找该id对应的名称即name并返回，如果没找到则返回空字符串*/
        for(var key in dataObj){
            /*先在根属性即大类中查找，如果找到直接返回对应的name*/
            if(key == id){
                return dataObj[key]['name'];
            }else{
                /*如果根属性即大类中没有找到，则遍历该大类下的子属性child，如果找到对应的id，则返回该id对应的值*/
                if(dataObj[key]['child']){
                    for(var childKey in dataObj[key]['child']){
                        if(childKey == id){
                            return dataObj[key]['child'][childKey];
                        }
                    }
                }
                continue;
            }
        }
        return '';
    },
    showSeletedItem: function () {
        var _self = this;
        var html = [];
        html.push("<ul>");
        for (var selId in this.selectedData) {
            html.push("<li>");
            html.push(selId + "$" + this.selectedData[selId]["name"])
            html.push("<label data-id='" + selId + "' data-isParentId='" + this.selectedData[selId]["isParentId"] + "'>del</label>");
            html.push("</li>");
        }
        html.push("</ul>");
        //$("#__layer_show_selected_item").html(html.join(""));
        $("#__layer_show_selected_item").find("label").each(function (index, item) {
            $(item).click(function () {
                //alert(this.getAttribute("data-isParentId"))
                var id = this.getAttribute("data-id");
                if (this.getAttribute("data-isParentId") == "true") {
                    $("#layer_cate_item_" + id).removeAttr("checked");
                    if (_self.currCateId == id) {
                        $("#layer_ul_job_cate_sub").find("input").each(function (index, item) {
                            $(item).removeAttr("disabled")
                        });
                    }
                } else {
                    $("#layer_cate_sub_item_" + id).removeAttr("checked");
                }
                _self.removeSelectedVal(id);
                _self.showSeletedItem();
            });
        });
    }
}
//document.getElementById("layer_div_job_cate_class").style.display="none";

//jobCate.isMultiSelect = false;
//jobCate.selectedMaxNum = 3;
//jobCate.show("txt_jobCate_Names", "txt_jobCate_Ids");

