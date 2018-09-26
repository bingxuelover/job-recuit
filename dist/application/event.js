/**
 * 事件绑定 - 添加、删除、编辑、收起
 **/

function eventBind() {
  //模块编辑事件
  $(".j_tabEdit").live("click", function() {
    var tabWrap = $(this).closest(".j_tabWrap"),
      tabMain = tabWrap.find(".j_tabMain"),
      slideBtn = $(this).siblings(".j_tabSlideUp"),
      preview = tabWrap.find(".j_preview"),
      formWrap = tabWrap.find(".j_formWrap"),
      form = formWrap.find("form"),
      formName = form.attr("name");
    if (tabMain.is(":hidden")) {
      tabMain.slideDown();
    }
    $(this).hide();
    if (isRepeated(formName, form)) {
      slideBtn.hide();
      $(this).siblings(".j_tabAdd").show();
    } else {
      slideBtn.show();
      preview.hide();
      formWrap.show();
    }
    selectCreate(form);
    plugBind(form, 1);
  });

  //循环项编辑事件
  $(".j_repeatEdit").live("click", function() {
    var preview = $(this).closest(".j_preview"),
      formWrap = preview.siblings(".j_formWrap");
    preview.hide();
    formWrap.show();
  });

  //删除事件
  $(".j_delete").live("click", function() {
    var deleteBtn = $(this),
      tab = deleteBtn.closest(".j_tabRepeat"),
      tabWrap = tab.closest(".j_tabWrap"),
      slideBtn = tabWrap.find(".j_tabSlideUp"),
      addBtn = tabWrap.find(".j_tabAdd"),
      form = tab.find("form"),
      number = form.attr("number"),
      dataId = form.attr("formeditid"),
      formName = form.attr("name"),
      formId = form.attr("formid"),
      tabTemp = tabWrap.find(".j_temp");
    var msg = "是否确定删除该模块？";
    popConfirm(msg, function() {
      //删除接口
      var url = urlPath + "delete";
      if (tab.find(".j_previewMain ul").html() != "" || tab.find(".j_previewName").text() != "") {
        // var childMoudleName = form.attr("childmoudle");
        // var jsonSource = prepareJsonSource(formName, childMoudleName, number);
        var data_Id = form.attr("formeditid");
        $.ajax({
          type: "POST",
          url: url,
          data: {},
          dataType: 'json',
          processData: true,
          success: function(data) {
            if (data.status == 0 && !!data.msg) {
              var curJsonStr = SyncJsonInfoForDeleteChild(formName, number);
              $("#ResumeInfo_" + formName).val(JSON.stringify(curJsonStr));

              resumeDataReset(formName);
              tab.remove();
              addBtn.removeClass("dis");
              if (tabTemp.prevAll(".j_tabRepeat").length == 0) {
                tabAdd(tabTemp, 1);
                tabUnComplete(formName);
              } else {
                tabTemp.prevAll(".j_tabRepeat").each(function() {
                  var number = $(this).index(),
                    form = $(this).find("form");
                  if (number == 1) {
                    $(this).addClass("first").siblings().removeClass("first");
                  }
                  form.attr("number", number);
                });
                //右侧导航完成状态
                checkTabCompleteForRepeat(formName, form);
              }
            } else {
              popAlert(
                !!data.msg
                ? data.msg
                : "删除失败",
              function() {});
            }
          }
        });
      }
    });
  });

  // 添加事件
  $(".j_tabAdd").live("click", function() {
    if ($(this).hasClass("dis")) {
      return;
    }
    var addBtn = $(this),
      tabWrap = addBtn.closest(".j_tabWrap"),
      tabfirst = tabWrap.find(".first");

    if ($(tabfirst.find(".j_preview")[0]).is(":hidden")) {
      $(tabfirst.find(".j_formWrap")[0]).show().find("input").eq(0).focus();
    } else {
      tabTemp = tabWrap.find(".j_temp"),
      max = parseInt(addBtn.attr("max")),
      number = tabTemp.prevAll(".j_tabRepeat").length + 1;
      tabTemp.find('.j_formWrap').show();
      tabAdd(tabTemp, number);
      if (number >= max) {
        addBtn.addClass("dis");
      }
    }
  });

  //保存事件
  $(".j_btnSure").live("click", function() {
    var form = $(this).closest("form"),
      saveBtn = $(this),
      tabMain = saveBtn.closest(".j_tabMain"),
      formName = form.attr("name"),
      formId = form.attr("formid"),
      formEditId = form.attr("formeditid"),
      isRepeate = false,
      formNum = 0,
      isNull1 = true; //form下全都没有值

    var formCertificate = [],
      formLanguage = [],
      certificateTrue = false,
      languageTrue = false;
    //遍历表单如果有值 isNull1=false
    form.find("input:visible").each(function() {
      if ($(this).attr('type') != 'file' && $(this).val() && $(this).val() != '') {
        isNull1 = false; //有值
      }
    })

    form.find(":file").each(function() {
      if ($(this).attr('type') == 'file' && $(this).attr('data-value')) {
        isNull1 = false; //有值
      }
    });

    form.find('select').each(function() {
      if ($(this).val() != '-1') {
        isNull1 = false; //有值
      }
    })
    form.find('textarea').each(function() {
      if ($(this).val() && $(this).val() != '') {
        isNull1 = false; //有值
      }
    })
    if (!form.parent().parent().parent().attr('required') && !form.find('.icon_must').length > 0 && isNull1) { //非必填模块且无必填项且全都为空

      popAlert('没有可保存的信息', function() {
        formClear(form, true, true);
      });
      return false;

    } else {
      //表单英语证书获取时间验证
      form.find("input[type = 'text']:visible").each(function() {
        BlurRuleEvent($(this).get(0), languageID);
      });
      //工作照验证
      form.find("input[name='work_photo_path_input']").each(function() {
        var tabMain = $(this).closest(".j_tabMain");
        var formWrap = tabMain.find(".j_formWrap").eq(0),
          previewWrap = tabMain.find(".j_preview");

        if ($(this).attr("rule") && JSON.parse($(this).attr("rule"))["must"]) {

          if ($(this).attr("data-value") == '' || !$(this).attr("data-value")) {

            var errBox = $(this).closest('.j_itemCont').find('.j_errorWrap').length > 0
              ? $(this).closest('.j_itemCont').find('.j_errorWrap')
              : $(this).closest(".applicationLeft").find(".j_errorWrap").eq(0).clone();
            $(this).closest('.j_itemCont').append(errBox);
            errBox = $(this).closest('.j_itemCont').find('.j_errorMain').eq(0);

            errBox.css("right", "-490px");
            errBox.css("top", "-60px");
            var errMsg = $(this).closest('.j_itemCont').find(".j_errorMain").find("p");

            if (languageID == 1) {
              errMsg.html($(this).attr("err") || "此项为必填项");
            } else {
              errMsg.html($(this).attr("err") || "this option is required");
            }

            errBox.show();

          }
        }
      })
      //校验表单
      submitCheckout(form, languageID);
      //无报错情况下
      if (isError(form)) {
        saveBtn.attr("data-isMe", "true");
        //小循环项中未选择项移除
        releaserRemove(form);
        if (isRepeated(formName, form)) { //循环项
          formNum = form.attr("number");
          isRepeate = true;
        }
        if (form.find("input[name='moudlename']").length > 0) {
          form.find("input[name='moudlename']").val(formName);
        } else {
          form.append("<input type='hidden' name='moudlename' value='" + formName + "'/>")
        };
        if (form.find("input[name='loopno']").length > 0) {
          form.find("input[name='loopno']").val(formNum);
        } else {
          form.append("<input type='hidden' name='loopno' value='" + formNum + "'/>")
        };
        //保存接口
        var url = urlPath + "save";
        var formJson = form.serializeArray();
        var formSubmit = {};
        var formCertificateLi = [],
          formLanguageLi = [];
        $.each(formJson, function() {
          var thisJsonName = $(this)[0].name,
            thisJsonVal = $(this)[0].value;
          if (thisJsonVal !== "-1" && thisJsonVal !== "" && thisJsonVal !== "选择日期") {
            if (thisJsonName.search(/certificate/gi) !== -1) {
              certificateTrue = true;
              var oCache = {};
              oCache[thisJsonName] = thisJsonVal;
              formCertificateLi.push(oCache);
            } else if (thisJsonName.search(/language/gi) !== -1) {
              languageTrue = true;
              var oCache = {};
              oCache[thisJsonName] = thisJsonVal;
              formLanguageLi.push(oCache);
            } else {
              formSubmit[thisJsonName] = thisJsonVal;
            }
          }
        })

        if (certificateTrue) {
          var formCertificateN = 1
          $.each(formCertificateLi, function(index, el) {
            var formCertificateI = Math.floor(index / 3);
            var cacheObj = $.extend(formCertificate[formCertificateI] || {}, el);
            formCertificate[formCertificateI] = cacheObj;
          });
          formSubmit.certificate = formCertificate;
        }
        if (languageTrue) {
          var formLanguageN = 1
          $.each(formLanguageLi, function(index, el) {
            var formLanguageI = Math.floor(index / 3);
            var cacheObj = $.extend(formLanguage[formLanguageI] || {}, el);
            formLanguage[formLanguageI] = cacheObj;
          });
          formSubmit.language_skill = formLanguage;
        }

        if (formEditId && formEditId !== "") 
          formSubmit.data_id = formEditId;
        
        // console.log(formSubmit);
        form.find(":file").attr("disabled", "disabled");
        $.ajax({
          type: "POST",
          url: url,
          success: function(dataJson) {
            form.find(":file").removeAttr("disabled");
            var result = dataJson;
            if (result.status == 0 && !!result.msg) {
              //更新数据到json中
              if (isRepeate) {
                // 循环项
                var rightJson = SyncResumeInfoContent(formName, JSON.stringify(formSubmit), formNum, formNum);
                $("#ResumeInfo_" + formName).val(rightJson);
                // 右侧导航栏显示完成图标
                tabComplete(formName);
                // 简历数据更新
                resumeDataReset(formName);
                // 数据反向赋值
                tabMain.find(".j_tabRepeat").each(function() {
                  if (!$(this).parent().hasClass("j_temp")) {
                    $(this).remove();
                  }
                });
                var tabTemp = tabMain.find(".j_temp"),
                  temp = tabTemp.html(),
                  number = 0,
                  addBtn = tabMain.closest(".j_tabWrap").find(".j_tabAdd"),
                  max = parseInt(addBtn.attr("max")),
                  jsonTabData = JSON.parse(resumeData[formName]);
                for (var i = 0; i < jsonTabData.length; i++) {
                  tabTemp.before(temp);
                  var tab = tabTemp.prev(),
                    tabData = jsonTabData[i];
                  number = i + 1;
                  var flag = tabInput(tab, tabData, number);
                  if (flag) {
                    break;
                  }
                };

                tabMain.find(".j_btnSure:visible").each(function() {
                  preview($(this).closest("form"));
                });

                preview(saveBtn.closest("form"));
                if (addBtn.is(":hidden")) {
                  addBtn.show().siblings().hide();
                }
                if (tabTemp.prevAll(".j_tabRepeat").length >= max) {
                  addBtn.addClass("dis");
                } else {
                  addBtn.removeClass("dis");
                }
                checkTabCompleteForRepeat(formName, form);
              } else {
                var rightJson = SyncResumeInfoContent(formName, JSON.stringify(formSubmit), 0, 0);
                $("#ResumeInfo_" + formName).val(rightJson);
                // 右侧导航栏显示完成图标
                tabComplete(formName);
                // 简历数据更新
                resumeDataReset(formName);
                // 变成预览状态
                preview(form);
              }
            } else {
              popAlert(
                !!result.msg
                ? result.msg
                : "保存失败",
              function() {});
            }
          }
        })
        form.find(":file").removeAttr("disabled");
      }
    }
  });

  //取消事件
  $(".j_btnCancel").live("click", function() {
    var cancelBtn = $(this);

    var msg = "取消将丢失未保存的信息，确定取消？";
    popConfirm(msg, function() {
      var form = cancelBtn.closest("form");
      formClear(form, true, true);
    });
  });

  //下拉
  $(".j_tabSlideUp").live("click", function() {
    var thisObj = $(this),
      tabWrap = thisObj.closest(".j_tabWrap"),
      tabMain = tabWrap.find(".j_tabMain"),
      form = tabMain.find("form"),
      formName = tabMain.find("form").attr("name");
    if (tabMain.is(":visible")) {
      if (tabMain.find(".j_formWrap:visible").length > 0) {
        var msg = "收起将丢失未保存的信息，确定收起？";
        popConfirm(msg, function() {
          tabMain.find(".j_formWrap:visible").each(function() {
            var form = $(this).find("form");
            formClear(form);
          });
          thisObj.hide().siblings(".j_tabEdit").show();
          tabMain.slideUp();
        });
      } else {
        thisObj.hide().siblings(".j_tabEdit").show();
        tabMain.slideUp();
      };
    } else {
      tabMain.slideDown();
      if (isRepeated(formName, form)) {
        thisObj.hide().siblings(".j_tabAdd").show();
      }
      if (tabMain.find(".j_formWrap:visible").length == 0) {
        thisObj.hide().siblings(".j_tabEdit").show();
      }
    }
  });

  //图片格式上传
  $(".j_fileImg").live("change", function() {
    var thisObj = $(this),
      thisObjBox = $(this).closest(".j_fileBox"),
      maxSize = 1024;

    /* js判断图片大小 */
    //var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var isIE = !+[1];
    var isEdge = navigator.userAgent.indexOf("Trident/7.0;") > -1;
    var fileSize = 0;
    if (isIE && thisObj.prop('files') && thisObj.prop('files').length > 0) {
      var fPath = thisObj.val();
      var fSys = new ActiveXObject("Scripting.FileSystemObject");
      var file = fSys.GetFile(fPath);
      fileSize = file.Size;
    } else {
      if (!isEdge && thisObj.prop('files') && thisObj.prop('files').length > 0) 
        fileSize = thisObj.prop('files')[0].size;
      }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //KB为单位
    /* 判断图片大小 */
    if (fileSize <= maxSize) {
      if (thisObj.val() != "") {
        if (isImages(fileValue(thisObj.val()))) {
          var url = urlPath + "uploadPhoto";
          $.ajaxFileUpload({
            url: url,
            secureuri: false,
            fileElement: thisObj,
            fileElementId: "photo_attach_work_photo_path_input",
            dataType: 'json',
            data: {},
            beforeSend: function() {
              $(this).attr("disabled");
            },
            complete: function() {
              $(this).removeAttr("disabled");
            },
            success: function(data, status) {
              if (status == 'success' && data) {
                if (data) {
                  var objData = data.data;
                  var objDataUrl = objData.url;
                  thisObjBox.find("input:hidden").val(objDataUrl);
                  thisObjBox.find("input:file").attr("data-value", objDataUrl);
                  thisObjBox.find(".j_filePath").text(objDataUrl);
                  if (thisObj.attr('name') == 'work_photo_name') {
                    $("#upload_faceImg").attr("src", objDataUrl);
                  }
                } else {
                  popAlert("上传失败！", function() {
                    thisObjBox.find("input:file").removeAttr("data-value").val("");
                    thisObjBox.find(".j_filePath").text("");
                  });
                }
              }
            }
          });
        } else {
          var msg = "图片格式不正确";
          popAlert(msg, function() {
            thisObjBox.find("input:file").removeAttr("data-value").val("");
            thisObjBox.find(".j_filePath").text("");
            thisObjBox.find("input:hidden").val("");
          });
        }
      }
    } else {
      var tmp = (maxSize * 1.0 / 1024).toFixed(1);
      popAlert('文件大小请不要超过' + tmp + 'M！', function() {
        thisObjBox.find("input:file").removeAttr("data-value").val("");
        thisObjBox.find(".j_filePath").text("");
      });
    }

  });

  //手机区号
  $(".area_code").live("click", function() {
    var a = $(this).next();
    return a.is(":visible")
      ? ($(this).removeClass("active"), a.hide())
      : ($(this).addClass("active"), a.show().scrollTop(0)),
    !1
  });

  $(".area_code_list dd").live("click", function() {
    var selvalue = $(this).find('span').text();
    if (selvalue) {
      $("input[name='national_code']").val(selvalue);
    }
    var a = $(this).parents(".area_code_list"),
      c = a.prev();
    return c.text($(this).children("span").text()),
    c.trigger("click"),
    !1
  });
  $(document).live("click", function(c) {
    var h = $(c.target);
    return a(h, "area_code_list")
      ? !1
      : ($(".area_code").removeClass("active"), void $(".area_code_list").hide())
  });

  $(".infochange").live('click', function() {
    var backurl = encodeURIComponent(window.location.href);
    var tohash = $(this).attr("id") == "changephone"
      ? "phone"
      : "email";
    // window.location.href = "//localhost:8001/LoginManager/UpdatePassword?backurl=" + backurl + "&place=" + tohash;
  });
}

function a(a, c) {
  for (var h = a; h[0];) {
    if (h.hasClass(c)) 
      return !0;
    h = h.parent()
  }
  return !1
}

function submitEvent() {
  //验证是否会有可编辑状态模块
  if ($(".j_formWrap:visible").length > 0) {
    var msg = "申请表模块还未保存，请先保存后再提交";
    popAlert(msg, function() {
      $("html,body").animate({
        scrollTop: $(document).find(".j_formWrap:visible").eq(0).offset().top - 20
      }, 100);
    });
    hideDisabledSubmitBtn();
    return;
  }
  //无报错
  var url = urlPath + "Resume";
  $.ajax({
    type: "POST",
    url: url,
    dataType: 'json',
    async: false,
    data: {},
    success: function(data) {
      if (data.status == 0) {
        popAlert("投递成功", function() {});
        showDisabledSubmitBtn()
      } else {
        popAlert("投递失败", function() {});
        hideDisabledSubmitBtn();
      }
    }
  })
}

function SyncJsonInfoForDeleteChild(moudlename, index) {
  var curJsonStr = JSON.parse($("#ResumeInfo_" + moudlename).val());
  var theJson = curJsonStr[index - 1];
  $.each(theJson, function(n, obj) {
    obj.Text = "";
    obj.Value = obj.FieldType == "3"
      ? "-1"
      : "";
  });
  var delJson = curJsonStr.splice(index - 1, 1);
  curJsonStr.splice(curJsonStr.length, 0, delJson[0]);
  return curJsonStr;
}

function SyncResumeInfoContent(moudleName, updateJsonStr, oldLoopNo, curLoopNo, jsonStr) {
  var curResumeInfoContent = $("#ResumeInfo_" + moudleName).val();
  var curResumeInfoJson = JSON.parse(curResumeInfoContent);
  var updateJson = JSON.parse(updateJsonStr);
  if (oldLoopNo == 0 && curLoopNo == 0) { //非循环模块
    $.each(curResumeInfoJson, function(n, obj) {
      if ($.type(obj).toLocaleLowerCase() == "array") {
        $.each(obj, function(index, eleObj) {
          $.each(eleObj, function(ele, theEle) {
            var i = index + 1;
            SyncChildJsonNode(moudleName, updateJson, theEle, n + "." + ele, true, index);
          });
        });
      } else {
        SyncChildJsonNode(moudleName, updateJson, obj, moudleName + "." + n, false);
      }
    });
  } else { //循环模块
    var theJson = curResumeInfoJson[oldLoopNo - 1];
    if (theJson !== undefined) {
      $.each(theJson, function(n, obj) {
        SyncChildJsonNode(moudleName, updateJson, obj, moudleName + "." + n, false);
      });
      //排序
      if (oldLoopNo != curLoopNo) {
        curResumeInfoJson.splice(oldLoopNo - 1, 1);
        curResumeInfoJson.splice(curLoopNo - 1, 0, theJson);
      }
    }
  }

  return JSON.stringify(curResumeInfoJson);
}

function SyncChildJsonNode(moudleName, updateJson, obj, nodeName, isChildLoop, index) {
  var expdef = "@#选择学校#选择专业#选择城市#选择日期#请选择#";
  $.each(updateJson, function(o, updateJsonValue) {
    if (nodeName == o || nodeName == moudleName + "." + o) {
      var theValue = updateJson[o];
      obj.Value = theValue;
      if (obj.FieldType == "3") {
        var theText = "";
        obj.Text = theText;
        if (expdef.indexOf("#" + theText + "#") > 0) {
          obj.Text = "";
          obj.Value = "";
        }
      } else {
        obj.Text = theValue;
      }
    } else {
      if (isChildLoop && updateJsonValue !== null) {
        var theName = nodeName.split(".");
        if (o == theName[0]) {
          $.each(JSON.parse(updateJsonValue), function(iel, oel) {
            if (iel == index) {
              $.each(oel, function(indexiel, eloel) {
                if (indexiel == theName[1]) {
                  obj.Text = eloel
                  obj.Value = eloel
                }
              });
            }
          });
        }
      }
    }
  });
}

function prepareJsonSource(moudleName,
/* 循环模块名称 */
childMoudleName, loopIndex) {
  var result = {};
  var curResumeInfoContent = $("#ResumeInfo_" + moudleName).val();
  var curResumeInfoJson = JSON.parse(curResumeInfoContent);
  $.each(curResumeInfoJson, function(i, obj) {
    var index = i + 1;
    if (index != loopIndex) {
      $.each(obj, function(eleName, eleObj) {
        if (eleObj.FieldType != "57" && eleObj.FieldType != "7") //不用来存值的字段
          result[moudleName + "." + childMoudleName + "_" + index + "." + eleName] = eleObj.Value;
        }
      );
    }
  });
  return JSON.stringify(result);
}

function getItemFormJsonSource(moudleName, itemKey, loopNo) {
  var resultVal = "";
  var curResumeInfoContent = $("#ResumeInfo_" + moudleName).val();
  var curResumeInfoJson = JSON.parse(curResumeInfoContent);
  if (loopNo == undefined) { //非循环模块
    $.each(curResumeInfoJson, function(eleName, eleObj) {
      if (eleName == itemKey) {
        resultVal = eleObj.Value;
      }
    });
  } else {
    $.each(curResumeInfoJson, function(i, obj) {
      if (loopNo == i + 1) {
        $.each(obj, function(eleName, eleObj) {
          if (eleName == itemKey) {
            resultVal = eleObj.Value;
          }
        });
      }
    });
  }
  return !resultVal
    ? ""
    : resultVal;;
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) 
    return unescape(r[2]);
  return null;
}

//检验必填模块下必填字段的输入情况
function formCheckmustmust(obj) {

  var formWrap = obj.find(".j_formWrap").eq(0),
    previewWrap = obj.find(".j_preview");
  if (formWrap.is(":hidden")) {
    formWrap_flagShow = true;
    formWrap.show();
  } else {
    formWrap_flagShow = false;
  }
  if (previewWrap.is(":hidden")) {
    previewWrap_flagShow = true;
    previewWrap.show();
  } else {
    previewWrap_flagShow = false;
  }
  submitCheckout(formWrap, languageID);
  if (isError(formWrap)) {
    if (formWrap_flagShow) {
      formWrap.hide();
      previewWrap.show();
      if (formWrap.closest('.j_temp').length > 0) {
        formWrap.show();
      }
    } else {
      previewWrap.hide();
      formWrap.show();
    }
    // if (tabMain_flagShow) {
    //     tabMain.hide();
    // }
    return 0;
  } else {
    previewWrap.hide();
    return 1;

  }
}

//检测非必填模块下必填字段的输入情况(baojin)
function formCheckmust(obj) {
  var mustLen = 0;
  var hasVal = 0;
  var formWrap = obj.find(".j_formWrap"),
    previewWrap = obj.find(".j_preview");
  if (formWrap.is(":hidden")) {
    formWrap_flagShow = true;
    formWrap.show();
  } else {
    formWrap_flagShow = false;
  }
  if (previewWrap.is(":hidden")) {
    previewWrap_flagShow = true;
    previewWrap.show();
  } else {
    previewWrap_flagShow = false;
  }

  formWrap.find("select").each(function() {

    if ($(this).prev().is(':visible') && $(this).attr("rule") && JSON.parse($(this).attr("rule"))["must"]) {
      mustLen++;
      if ($(this).val() != "-1") {
        hasVal++; //有值
      }
    }

  });
  formWrap.find("textarea:visible").each(function() {

    if ($(this).attr("rule") && JSON.parse($(this).attr("rule"))["must"]) {
      mustLen++;
      if ($(this).val() && $(this).val() != "") {
        hasVal++; //有值
      }
    }

  });
  formWrap.find("input:visible").each(function() {

    if ($(this).attr("type") != "file" && $(this).attr("rule") && JSON.parse($(this).attr("rule"))["must"]) {
      mustLen++;
      if ($(this).attr("type") != "file" && $(this).val() != "选择日期" && $(this).val() != "Select Date" && $(this).val() != "选择城市" && $(this).val() != "Select City" && $(this).val() != "") {
        hasVal++; //有值
      }
    }

  });
  formWrap.find(":file").each(function() {

    if ($(this).attr("rule") && JSON.parse($(this).attr("rule"))["must"]) {
      mustLen++;
      if ($(this).attr("data-value") && $(this).attr("data-value") != '') {
        hasVal++; //有值
      }
    }

  });
  //console.log(obj.find('form').attr('name'),mustLen,hasVal)
  if (mustLen != 0 && hasVal != 0 && hasVal < mustLen) {
    submitCheckout(formWrap, languageID);
    previewWrap.hide();
    return 1;
  } else {
    formWrap.hide();
    if (formWrap.closest('.j_temp').length > 0) {
      formWrap.show();
    }
    if (previewWrap_flagShow) {
      previewWrap.hide();
    }
    return 0;
  }

}

function showDisabledSubmitBtn() {
  var disDom = $('#disableSubmitAllBtn');
  if (disDom.length == 0) {
    disDom = $('<a class="applicationTemp_submitBtn mt30" style="background:#aaa9a9" id="disableSubmitAllBtn">提交申请</a>');
    $("#submitAllBtn").after(disDom);
  } else {
    $("#disableSubmitAllBtn").show();
  }
  $("#submitAllBtn").hide();
}

function hideDisabledSubmitBtn() {
  $("#disableSubmitAllBtn").hide();
  $("#submitAllBtn").show();
}

//大提交按钮
function submitAll() {
  showDisabledSubmitBtn();
  submitEvent();
}
