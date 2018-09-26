/**
 * 工具类
 **/
//数据定义
function dataSet() {
  for (var i = 0; i < $("#resumeInfoContent input").length; i++) {
    var formName = $("#resumeInfoContent input").eq(i).attr("id").replace("ResumeInfo_", ""),
      formValue = $("#resumeInfoContent input").eq(i).val();
    resumeData[formName] = formValue;
  }
};

//简历数据更新
function resumeDataReset(formName) {
  resumeData[formName] = $("#ResumeInfo_" + formName).val();
};

//获取指定名称的cookie的值
function getCookie(key) {
  var cookieArr = document.cookie.split("; ");
  for (var i = 0; i < cookieArr.length; i++) {
    //获取单个cookies
    var kv = cookieArr[i].split("=");
    if (kv[0] == key) {
      if (kv.length > 1 && typeof kv[1] !== 'undefined') {
        return unescape(kv[1]);
      } else {
        return "";
      }
    }
  }
  return "";
}

// 清除cookie
function clearCookie(key, domain, path) {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  var cookieDomain = domain
      ? 'domain=' + domain + ';'
      : '',
    cookiePath = path
      ? 'path=' + path + ';'
      : 'path=/;';
  if (keys && keys.length > 0) {
    if (typeof key === 'string' && key !== '') {
      for (var i = keys.length - 1; i >= 0; i--) {
        if (keys[i] === key) {
          document.cookie = keys[i] + '=;' + cookieDomain + cookiePath + 'expires=' + new Date(0).toUTCString();
          break;
        }
      }
    } else {
      for (var i = keys.length; i--;) 
        document.cookie = keys[i] + '=;' + cookieDomain + cookiePath + 'expires=' + new Date(0).toUTCString();
      }
    }
}

//页面初始化
function init(lid) {
  if (getCookie('userSubmit') == 1) {
    $('#submitOk').show().prev().hide();
    $("#companyHas").text(getCookie('jobCompany'));
    $("#positionHas").text(getCookie('jobPosition'));
  }
  $('#imgdomain').val(imgPath);
  // 表单赋值
  var data = resumeData;
  // console.log(data);
  for (var k in data) {
    var form = $("form[name = '" + k + "']");
    if (isRepeated(k, form)) {
      // 循环项
      var tempForm = $(".j_temp").find("form[name = '" + k + "']"),
        temp = tempForm.closest(".j_temp"),
        html = temp.html(),
        number = 0;
      for (var i = 0; i < JSON.parse(data[k]).length; i++) {
        temp.before(html);
        var tab = temp.prev(),
          tabData = JSON.parse(data[k])[i];
        number = i + 1;
        var flag = tabInput(tab, tabData, number, true);
        if (flag) {
          break;
        }
      }
      checkTabCompleteForRepeat(form.attr("name"), form);
      var tabAdd = temp.closest(".j_tabWrap").find(".j_tabAdd"),
        max = parseInt(tabAdd.attr("max")),
        len = temp.prevAll(".j_tabRepeat").length;
      if (len >= max) {
        tabAdd.addClass("dis");
      }
    } else { //非循环项
      tabInput(form.parent(), JSON.parse(data[k]), null, true);
    }
  }
}

//从json串中对表单元素反向赋值
function tabInput(tab, data, number, eventFlag) {
  var form = tab.find("form"),
    flag = true,
    required = true,
    noReqnoval = true,
    mustNums = 0; //没有必填项没有纸 (baojin)
  if (number) {
    form.attr("number", number);
    if (number == 1) {
      tab.addClass("first").siblings().removeClass("first");
    }
  }
  if (data.id && data.id.Value) {
    form.attr("formeditid", data.id.Value);
  }

  for (var k in data) {
    if (data[k]["Value"] && data[k]["Value"] != -1) {
      flag = false;
      appendValue(form, k, data[k]);
    } else {
      if (k == "certificate" || k == "language_skill") { //英语证书、语言能力
        if (releaseAppend(form, k, data[k])) {
          flag = false;
        }
        releaserRemove(form);
      }
    }
    //判断是否存在必填项没填，是的话required = false
    if (!data[k]["Value"] && data[k]["IsRequired"] == "True") {
      if (form.find("input[name = '" + k + "']:visible").length > 0 || (form.find("input[type='file']").length > 0 && !form.find("input[type='file']").attr('data-value')) || form.find("select[name = '" + k + "']").prev().is("visible") || form.find("select[name = '" + k + "']").val() == '-1' || form.find("textarea[name = '" + k + "']:visible").length > 0) {
        required = false;
      }
      if (form.attr("name") == "photo_attach" && form.find("input[name = '" + k + "']").length > 0) {
        required = false;
      }
    } else if (data[k]["IsRequired"] == "False" && data[k]["Value"] && data[k]["Value"] != -1) { //不是必填项 却有值
      noReqnoval = false;
    } else if (data[k]["IsRequired"] == "True") {
      if (form.find("input[name = '" + k + "']:visible").length > 0 || form.find("input[name = '" + k + "_input']:visible").attr('type') == 'file' || form.find("select[name = '" + k + "']").length > 0 || form.find("textarea[name = '" + k + "']:visible").length > 0) {
        mustNums++;
      }
    }
  }

  selectCreate(form);
  releaseInitOne(form);
  if (isRepeated(form.attr("name"), form)) {
    plugIdReset(form, number);
    if (!eventFlag) {
      plugBind(form, languageID);
    }
  }
  // console.log(form.attr("name"), required, flag);
  if (!flag && form.length != 0) {
    if (required) {
      tabComplete(form.attr("name"));
      if (mustNums == 0 && noReqnoval) {
        // console.log('tabUnComplete 1', required, form.attr("name"));
        tabUnComplete(form.attr("name"));
      }
    } else {
      // console.log('tabUnComplete 2', required, form.attr("name"));
      tabUnComplete(form.attr("name"));
    }
    preview(form);
  } else {
    if (eventFlag) {
      if (!isRepeated(form.attr("name"), form)) {
        var tabWrap = form.closest(".j_tabWrap"),
          tabMain = tabWrap.find(".j_tabMain"),
          tabSlideUp = tabWrap.find(".j_tabSlideUp"),
          tabEdit = tabWrap.find(".j_tabEdit");
        tabMain.hide();
        tabEdit.show();
        tabSlideUp.hide();
      }
    }
  }
  if (number) {
    if (flag && number != 1) {
      if (number == 2 && eventFlag) {
        var tabWrap = form.closest(".j_tabWrap"),
          tabMain = tabWrap.find(".j_tabMain"),
          tabSlideUp = tabWrap.find(".j_tabSlideUp"),
          tabEdit = tabWrap.find(".j_tabEdit"),
          tabAdd = tabWrap.find(".j_tabAdd");
        //tabMain.hide();
        tabWrap.find('.j_formWrap').eq(0).hide();
        tabSlideUp.hide();
        tabAdd.hide();
        tabEdit.show();
      }
      tab.remove();
      return true;
    } else {
      return false;
    }
  }
}

//循环项添加新模块
function tabAdd(tabTemp, number) {
  var temp = tabTemp.html();
  tabTemp.before(temp);
  var form = tabTemp.prev().find("form");
  form.attr("number", number);
  if (number == 1) {
    form.closest(".j_tabRepeat").addClass("first").siblings().removeClass("first");
  }
  selectCreate(form);
  releaseInitOne(form);
  plugIdReset(form, number);
  plugBind(form, languageID);
}

//表单项填值
function appendValue(form, k, v) {
  var doom;
  if (v["FieldType"] == "1") { //普通输入框
    if (k == "national_code") { //手机区号
      if (!v["Value"]) 
        v["Value"] = "0086";
      $("span[name='span_national_code']").text(v["Value"]);
    }
    doom = form.find("input[name='" + k + "']:visible");

    if (doom.length > 0) {
      doom.val(v["Value"]);
      if (doom.hasClass("j_citySingle")) { //单选城市
        var cityData = getCitySingleId(v["Value"]);
        doom.next().val(cityData.id);
        doom.next().next().val(cityData.pid);
        doom.next().next().next().val(cityData.pVal);
      }
      if (k == "hukou_city") { //家庭常住地
        doom.next().children('.placeholder').text(v["Value"]);
      }
    } else { //隐藏域赋值
      doom = form.find("input:hidden[name='" + k + "']");
      if (doom.length > 0) {
        doom.val(v["Value"]);
      }
    }
  } else if (v["FieldType"] == "2") { //多行输入框
    doom = form.find("textarea[name='" + k + "']");
    doom.val(v["Value"]);
    doom.text(v["Value"]);
    var len = doom.val().length;
    if (doom.attr("rule")) {
      var max = JSON.parse(doom.attr("rule")).max;
    }
    doom.nextAll(".j_textareaNum").find("span").text(len);
    doom.nextAll(".j_textareaNum").find("font").text(max);
  } else if (v["FieldType"] == "3" || v["FieldType"] == "51" || v["FieldType"] == "52" || v["FieldType"] == "54") { //下拉框(是否有亲属受雇本公司)
    doom = form.find("select[name='" + k + "']");
    if (form.attr("name") == "wanted_career") {
      doom.each(function(index, el) {
        $(el).find("option").each(function() {
          if ($(this).attr("value") == v["Value"]) {
            $(this).attr("selected", true).siblings().removeAttr("selected");
            return false;
          }
        });
        if ($(el).prev().hasClass("j_selectBox")) {
          $(el).prev().find(".j_selectTitle").attr({"data-value": v["Value"], "title": $(el).find("option:selected").text()}).text($(el).find("option:selected").text());
        }
      });
    } else {
      doom.find("option").each(function() {
        if ($(this).attr("value") == v["Value"]) {
          $(this).attr("selected", true).siblings().removeAttr("selected");
          return false;
        }
      });
      if (doom.prev().hasClass("j_selectBox")) {
        doom.prev().find(".j_selectTitle").attr({"data-value": v["Value"], "title": doom.find("option:selected").text()}).text(doom.find("option:selected").text());
      }
    }

    releaseInit(doom, form);
  } else if (v["FieldType"] == "4") { //单选按钮
    doom = $("div[name = '" + k + "']:visible");
    doom.find(":radio").each(function() {
      if ($(this).val() == v["Value"]) {
        $(this).attr("checked", true);
      }
    });
  } else if (v["FieldType"] == "5") { //复选框
    doom = $("div[name = '" + k + "']:visible");
    doom.find(":checkbox").each(function() {
      if (v["Value"].indexOf($(this).val()) > -1) {
        $(this).attr("checked", true);
      } else {
        $(this).prop("checked", false);
      }
    });
  } else if (v["FieldType"] == "6") { //时间到日
    doom = form.find("input[name='" + k + "']");
    if (v["Value"]) {
      doom.val(v["Value"]);
    } else {
      doom.val(doom.attr("data-value"));
    }
  } else if (v["FieldType"] == "7") { //单选城市
    doom = form.find("input[name='" + k + "']:visible");
    if (v["Value"]) {
      doom.val(v["Value"]);
      // var cityData = getCitySingleId(v["Value"]);
      // doom.next().val(cityData.id);
      // doom.next().next().val(cityData.pid);
      // doom.next().next().next().val(cityData.pVal);
    } else {
      doom.val(doom.attr("data-value"));
    }
  } else if (v["FieldType"] == "8") { //学校
    doom = form.find("input[name='" + k + "']:visible");
    doom.val(v["Value"]);
    //doom.next().val(getSchoolId(v["Value"]));
  } else if (v["FieldType"] == "9") { //专业
    doom = form.find("input[name='" + k + "']:visible");
    doom.val(v["Value"]);
    // var majorData = getMajorId(v["Value"]);
    // doom.next().val(majorData.id);
    // doom.next().next().val(majorData.pid);
    // doom.next().next().next().val(majorData.pVal);
  } else if (v["FieldType"] == "10") { //照片
    if (k == "work_photo_path") {
      //yanwei.dong 2017-8-8 支付宝有头像特殊处理
      var faceImgUrl = v["Value"];
      if (v["Value"].indexOf("http:") > -1 || v["Value"].indexOf("https:") > -1) {
        faceImgUrl = v["Value"];
      }
      $("#j_applicationFaceImg").attr("src", faceImgUrl);
      $("#upload_faceImg").attr("src", faceImgUrl);
      doom = form.find("input[name='" + k + "']");
      doom.siblings(".j_filePath").text(v["Value"]);
      doom.parent().find("input:file").attr("data-value", v["Value"]);
      doom.parent().find("input:hidden").val(v["Value"]);
    } else {
      if (resumeType) {
        doom = form.find("input[name='" + k + "']");
        doom.siblings(".j_filePath").text(v["Value"]);
        doom.parent().find("input:file").attr("data-value", v["Value"]);
        doom.parent().find("input:hidden").val(v["Value"]);
      }
    }
  } else if (v["FieldType"] == "11") { //文件附件
    //if(resumeType){
    var doomHide = form.find("input[name='" + k + "']");
    doom = doomHide.prev();
    doom.siblings(".j_filePath").text(v["Value"]);
    doom.attr("data-value", v["Value"]);
    doomHide.val(v["Value"]);
    //}else{          标准简历
    //            form.find(":file").attr("data-value", v["Value"]);
    //            form.find(":hidden").val(v["Value"]);
    //        }
  } else if (v["FieldType"] == "12") { //提示性文本

  } else if (v["FieldType"] == "13") { //多选城市
    doom = form.find("input[name='" + k + "']:visible");
    if (v["Value"]) {
      doom.val(v["Value"]);
    } else {
      doom.val(doom.attr("data-value"));
    }
  } else if (v["FieldType"] == "14") { //选择到月
    doom = form.find("input[name='" + k + "']:visible");
    if (v["Value"]) {
      doom.val(v["Value"]);
    } else {
      doom.val(doom.attr("data-value"));
    }
  } else if (v["FieldType"] == "20") { //行业
    doom = form.find("input[name='" + k + "']");
    doom.val(v["Value"]);
  } else if (v["FieldType"] == "21") { //职业
    doom = form.find("input[name='" + k + "']");
    doom.val(v["Value"]);
  } else if (v["FieldType"] == "54") { //是否学生干部
    doom = form.find("select[name='" + k + "']");
    doom.find("option[value = " + v["Value"] + "]").attr("selected", true).siblings().removeAttr("selected");

  } else if (v["FieldType"] == "57") { //证明人
    doom = form.find("select[name='" + k + "']");
    doom.find("option[value = " + v["Value"] + "]").attr("selected", true).siblings().removeAttr("selected");
  } else {}
  if (doom) {
    doom.siblings(".j_tipWrap").find(".j_tipMain").hide();
    doom.siblings(". j_errorWrap").find(".j_errorMain").hide();
  }
}

//获取插件j_plug的值
function getPlugVal(obj) {
  if (obj.val()) {
    if (obj.attr("data-value")) {
      if (obj.val() == obj.attr("data-value")) {
        return "";
      } else {
        return obj.val();
      }
    } else {
      return obj.val();
    }
  } else {
    return "";
  }
};

//右侧导航栏显示完成图标
function tabComplete(name) {
  if (name == "photo_attach") { //照片
    if (!($("#photo_attach_work_photo_path").val())) {
      return;
    }
  }
  $("#nav_" + name).addClass("complete");
}
//右侧导航栏隐藏完成图标
function tabUnComplete(name) {
  // console.log('tabUnComplete', name);
  $("#nav_" + name).removeClass("complete");
}
//循环模块右侧导航完成图标显示隐藏
function checkTabCompleteForRepeat(name, form) {
  var iscomplete = true;
  var isEmpty = true;
  var isFor = false;
  var mustNum = 0;
  var isSchool1 = false,
    isSchool2 = false,
    isSchool3 = false;

  var allFormTab = $("#" + name).closest(".j_tabMain").children(".j_tabRepeat");
  allFormTab.each(function() {
    if (!iscomplete) 
      return;
    
    var theForm = $(this).find("form");
    var checkItemWrap = theForm.find(".j_itemWrap");
    checkItemWrap.each(function() {
      if ($(this).css("display") != "none" && $(this).parent().css("display") != "none") {
        var inputItem = $(this).find(".j_itemCont input").eq(0);
        var selectItem = $(this).find(".j_itemCont select").eq(0);
        var areaItem = $(this).find(".j_itemCont textarea").eq(0);
        var item = inputItem.length > 0
          ? inputItem
          : selectItem.length > 0
            ? selectItem
            : areaItem.length > 0
              ? areaItem
              : null;
        if (item && item.attr("rule") && JSON.parse(item.attr("rule")).must) {
          mustNum++;
          if (!item.val() || item.val() == "-1") {
            // console.log('in false', item.val(), item[0]);
            iscomplete = false;
            return;
          } else {
            if (item.attr("name") == "education_degree") {
              if (item.val() == 8) {
                isSchool1 = true
              } else if (item.val() == 7) {
                isSchool2 = true
              } else if (item.val() == 4) {
                isSchool3 = true
              }
            }
          }
        } else if (item && item.attr("rule") && !JSON.parse(item.attr("rule")).must) {
          if (item.val() && item.val() != "-1") {
            isEmpty = false;
            if (item.attr('datatype') === '6' && item.val() === '选择日期') {
              isEmpty = true;
            }
          }
        }
      }
    });
  });
  // console.log(allFormTab.length, mustNum, isEmpty, iscomplete, form);
  if (allFormTab.length > 0 && mustNum == 0 && isEmpty) {
    iscomplete = false;
  }
  if (iscomplete) {
    if (name == "education_experience") {
      if (isSchool1 && isSchool2 && isSchool3) {
        tabComplete(name);
      } else {
        tabUnComplete(name);
      }
    } else {
      tabComplete(name);
    }
  } else {
    // console.log('reapet tabUnComplete', name);
    tabUnComplete(name);
  }
}

//学校获取id
function getSchoolId(v) {
  if (languageID == 1) {
    var data = baseDataFile.school;
  } else {
    var data = baseDataFileEn.school;
  }
  var id = 9999;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["sub"]) {
      for (var j = 0; j < data[i]["sub"].length; j++) {
        if (data[i]["sub"][j]["sub"]) {
          for (var k = 0; k < data[i]["sub"][j]["sub"].length; k++) {
            if (data[i]["sub"][j]["sub"][k]["value"] == v) {
              id = data[i]["sub"][j]["sub"][k]["id"];
              return id;
            }
          }
        }
      }
    }
  }
  return id;
};
//专业获取id
function getMajorId(v) {
  if (languageID == 1) {
    var data = major,
      other = "其他";
  } else {
    var data = majorEn,
      other = "Other";
  }
  var id = 9999,
    pid = 9999,
    pVal = other;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["sub"]) {
      for (var j = 0; j < data[i]["sub"].length; j++) {
        if (data[i]["sub"][j]["value"] == v) {
          id = data[i]["sub"][j]["id"];
          pid = data[i]["id"];
          pVal = data[i]["value"];
        }
      }
    }
  }
  var majorData = {
    "id": id,
    "pid": pid,
    "pVal": pVal
  };
  return majorData;
}
//城市单选
function getCitySingleId(v) {
  if (languageID == 1) {
    var data = city;
  } else {
    var data = city_en;
  }
  var id,
    pid,
    pVal;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["sub"]) {
      for (var j = 0; j < data[i]["sub"].length; j++) {
        if (data[i]["sub"][j]["value"] == v) {
          id = data[i]["sub"][j]["id"];
        } else {
          if (data[i]["sub"][j]["sub"]) {
            for (var k = 0; k < data[i]["sub"][j]["sub"].length; k++) {
              if (data[i]["sub"][j]["sub"][k]["value"] == v) {
                id = data[i]["sub"][j]["sub"][k]["id"];
                pid = data[i]["sub"][j]["id"];
                pVal = data[i]["sub"][j]["value"];
              }
            }
          }
        }
      }
    }
  }
  var cityData = {
    "id": id,
    "pid": pid,
    "pVal": pVal
  };
  return cityData;
}

//城市多选
function getCityManyId(v) {}

//职位
function getJoyTypeId(v) {
  if (languageID == 1) {
    var dataTitle = jobtypeClass,
      dataP = CONST_JOBTYPE.split("@");
  } else {
    var dataTitle = jobtypeClass_EN,
      dataP = CONST_JOBTYPE_EN.split("@");
  }
  var data = [];
  for (var i = 0; i < dataP.length; i++) {
    if (dataP[i] != "") {
      data.push(dataP[i].split("|"))
    }
  };
  var pid = obj.next().next().val().split(",");
  var pvalue = [];
  for (var i = 0; i < pid.length; i++) {
    for (var j = 0; j < dataTitle.length; j++) {
      if (pid[i] == dataTitle[j].id) {
        pvalue.push(dataTitle[j].name);
      };
    };
    for (var k = 0; k < data.length; k++) {
      if (pid[i] == data[k][0]) {
        pvalue.push(data[k][1]);
      };
    };
  };
}

//行业
function getIndustryId(v) {}

//单列值清空（由于该函数只在联动项做隐藏时使用到，故只做输入框和下拉框清空）
function itemClear(item) {
  item.find("input:text").each(function() { //输入框
    if ($(this).hasClass("j_plug")) {
      $(this).val($(this).attr("data-value"));
    } else {
      $(this).val("");
    }
  });
  item.find("select").each(function() { //下拉框
    $(this).find("option[value = '-1']").attr("selected", true).siblings().removeAttr("selected");
    var selectValue = $(this).val(),
      selectText = $(this).find(":selected").text();
    $(this).prev().find(".j_selectTitle").attr({"data-value": selectValue, "title": selectText}).text(selectText);
  });
  item.find("textarea").each(function() { //多行输入框
    $(this).val("").text("");
    $(this).nextAll(".j_textareaNum span").text("0");
  });
  item.find(".j_radioWrap").each(function() { //单选框
    $(this).find("input:radio").each(function() {
      $(this).attr("checked", false).removeAttr("checked");
    });
  });
  item.find(".j_checkboxWrap").each(function() { //复选框
    $(this).find("input:checkbox").each(function() {
      $(this).attr("checked", false).removeAttr("checked");
    });
  });
  item.find(":file").each(function() { //file
    $(this).removeAttr("data-value");
    $(this).siblings(":hidden").val("");

    $(this).siblings(".j_filePath").text("");

  });
  releaseInitOne(item);
  item.find(".j_tipMain").hide().find("p").html(""); //辅助提示语
  item.find(".j_errorMain").hide().find("p").html(""); //报错信息
};

//表单清空
function formClear(form, eventflag, isCancel) {
  var formName = form.attr("name"),
    flag = true;
  if (isRepeated(formName, form)) { //循环项
    var formNumber = form.attr("number");
    console.log(resumeData[formName]);
    var formNum = parseInt(formNumber) - 1,
      data = JSON.parse(resumeData[formName])[formNum],
      isRepeat = true;
  } else {
    var data = JSON.parse(resumeData[formName]);
  }

  for (var k in data) {
    if (data[k]["Value"]) {
      flag = false;
      appendValue(form, k, data[k]);
    } else {
      if (k == "certificate" || k == "language_skill") { //英语证书、语言能力
        if (releaseAppend(form, k, data[k], isCancel)) {
          flag = false;
        }
        releaserRemove(form);
      }
    }
  }
  if (flag) {
    if (eventflag) {
      if (formNum) {
        form.closest(".j_tabWrap").find(".j_tabAdd").removeClass("dis");
        form.closest(".j_tabRepeat").remove();
      } else {
        form.closest(".j_tabMain").slideUp();
        if (isRepeat) {
          form.closest(".j_tabWrap").find(".j_tabAdd").hide().siblings(".j_tabEdit").show();
        }
      }
    }
  } else {
    preview(form);
  }
}

//校验事件
function submitCheckout(obj, lid) {
  //校验下拉框
  obj.find(".j_selectBox:visible").each(function() { //只验证可见状态下的下拉框控件
    BlurRuleEvent($(this).next().get(0), lid);
  });
  //校验textarea
  obj.find("textarea:visible").each(function() { //只验证可见状态下的textarea 控件
    BlurRuleEvent($(this).get(0), lid);
  });
  //校验input输入框
  obj.find("input[type = 'text']:visible").each(function() { //只验证可见状态下的input控件
    BlurRuleEvent($(this).get(0), lid);
  });
  //校验隐藏状态下的file框
  obj.find(":file").each(function() { //验证file控件
    BlurRuleEvent($(this).get(0), lid);
  });
  //校验单选框
  obj.find(".j_radioBox").each(function() { //验证可见状态下的单选框
    if ($(this).is(":visible")) {
      BlurRuleEvent($(this).get(0), lid);
    }
  });
  //校验复选框
  obj.find(".j_checkBoxWrap").each(function() { //验证可见状态下的复选框
    if ($(this).is(":visible")) {
      BlurRuleEvent($(this).get(0), lid);
    }
  });
};

//判断是否是循环模块
function isRepeated(formName, form) {
  if (formName) {
    if (tabRepeatName.toString().indexOf(formName) > -1) {
      return true;
    }
  }
  if (form) {
    if (form.closest(".j_tabWrap").find(".j_tabRepeat").length > 0) {
      return true;
    }
  }
  return false;
}
//判断浏览器内核
function getBrowser(getVersion) {
  //注意关键字大小写
  var ua_str = navigator.userAgent.toLowerCase(),
    ie_Tridents,
    trident,
    match_str,
    ie_aer_rv,
    browser_chi_Type;
  // console.log("article url: http://blog.csdn.net/aerchi/article/details/51697592");

  //判断IE 浏览器,
  //blog: http://blog.csdn.net/aerchi/article/details/51697592
  if ("ActiveXObject" in self) {
    // ie_aer_rv:  指示IE 的版本.
    // It can be affected by the current document mode of IE.
    ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/))
      ? match_str[1]
      : (match_str = ua_str.match(/rv:([\d.]+)/))
        ? match_str[1]
        : 0;

    // ie: Indicate the really version of current IE browser.
    ie_Tridents = {
      "trident/7.0": 11,
      "trident/6.0": 10,
      "trident/5.0": 9,
      "trident/4.0": 8
    };
    //匹配 ie8, ie11, edge
    trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/))
      ? match_str[1]
      : undefined;
    browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0
      ? "ie"
      : undefined;
  } else {
    //判断 windows edge 浏览器
    // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
    // match_str[1]: 返回版本号,如: "edge"
    //若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
    browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/))
      ? "ie"
      :
      //判断firefox 浏览器
      (match_str = ua_str.match(/firefox\/([\d.]+)/))
        ? "firefox"
        :
        //判断chrome 浏览器
        (match_str = ua_str.match(/chrome\/([\d.]+)/))
          ? "chrome"
          :
          //判断opera 浏览器
          (match_str = ua_str.match(/opera.([\d.]+)/))
            ? "opera"
            :
            //判断safari 浏览器
            (match_str = ua_str.match(/version\/([\d.]+).*safari/))
              ? "safari"
              : undefined;
  }

  console.log("author: aerchi, blog: //blog.csdn.net/aerchi");
  //返回浏览器类型和版本号
  var verNum,
    verStr;
  verNum = trident && ie_Tridents[trident]
    ? ie_Tridents[trident]
    : match_str[1];
  verStr = (getVersion != undefined)
    ? browser_chi_Type + "/" + verNum
    : browser_chi_Type;
  return verStr;
}
//兼容IE8 最大输入长度
function maxlength(e, length) {
  e.keyup(function() {
    if ($(this).val().length >= length) {
      $(this).val($(this).val().substr(0, length));
    }
  })
}
//特殊事件添加
function doomSpecialEvent() {
  //解决clone选中值过不去
  $("select").live("change", function() {
    $(this).find("option:selected").attr("selected", "selected").siblings().removeAttr("selected");
  });
  //由于file的value值无法用js改变，故存到data-value
  $(":file").live("change", function() {
    $(this).attr("data-value", $(this).val());
  });
  //textarea计数
  var timer;
  $("textarea").live({
    focus: function() {
      var thisObj = $(this);
      timer = setInterval(function() {

        var num = thisObj.val().length;
        var engine = getBrowser();
        var count = thisObj.val().split('\n').length - 1;
        if (engine == "chrome") {
          num += count;
        } else if (engine == "ie") {
          maxlength($("#skill_favorite_filed_208"), 500);
          maxlength($("#module_52_filed_212"), 4999);
          maxlength($("#module_54_filed_216"), 5000);
          maxlength($("#work_ecperience_work_description"), 5000);
          maxlength($("#awards_activity_filed_217"), 500);
          maxlength($("#awards_activity_filed_218"), 500);
          maxlength($("#awards_activity_filed_219"), 500);
        }
        thisObj.siblings(".j_textareaNum").find("span").html(num);
      }, 300);
    },
    blur: function() {
      clearInterval(timer);
    }
  });
  //初始化textarea计数
  $("textarea").each(function() {
    var len = $(this).val().length;
    if ($(this).attr("rule")) {
      var max = JSON.parse($(this).attr("rule")).max;
    }
    $(this).nextAll(".j_textareaNum").find("span").text(len);
    $(this).nextAll(".j_textareaNum").find("font").text(max);
  });

}
//判断是否存在错误信息
function isError(obj) {
  var flag = true;
  obj.find(".j_errorMain").each(function() {
    if ($(this).is(":visible")) {
      flag = false;
      return false;
    }
  });
  return flag;
};

//部分控件id重置
function plugIdReset(form, number) {
  form.find(".j_plug").each(function() {
    if ($(this).hasClass("j_toDay") || $(this).hasClass("j_toMonth") || $(this).hasClass("j_industry") || $(this).hasClass("j_jobType")) {
      $(this).attr("id", $(this).attr("id") + "_" + number);
      if ($(this).hasClass("j_industry") || $(this).hasClass("j_jobType")) {
        $(this).next().attr("id", $(this).next().attr("id") + "_" + number);
        $(this).next().next().attr("id", $(this).next().next().attr("id") + "_" + number);
        $(this).next().next().next().attr("id", $(this).next().next().next().attr("id") + "_" + number);
      }
    }
  });
}

//提示框关闭事件
function tipClosed(obj) {
  obj.nextAll(".j_tipWrap").find(".j_tipMain p").html("");
  obj.nextAll(".j_tipWrap").find(".j_tipMain").hide();
}

//提示框显示事件
function tipShow(obj) {
  if (obj.attr("tip")) {
    obj.nextAll(".j_tipWrap").find(".j_tipMain p").html(obj.attr("tip"));
    obj.nextAll(".j_tipWrap").find(".j_tipMain").show();
  }
}

//报错框关闭事件
function errClosed(obj) {
  obj.nextAll(".j_errorWrap").find(".j_errorMain p").html("");
  obj.nextAll(".j_errorWrap").find(".j_errorMain").hide();

}

//判断是否ie6
function isIE6() {
  return /msie 6/.test(navigator.userAgent.toLowerCase()) && /msie/.test(navigator.userAgent.toLowerCase());
};
//判断是否ie7
function isIE7() {
  return /msie 7/.test(navigator.userAgent.toLowerCase()) && /msie/.test(navigator.userAgent.toLowerCase());
};
/* 表单元素绑定验证事件 控件和下拉框的验证是放在绑定的时候 */
function inputCheckBind(lid) {
  //输入框绑定focus事件
  $("input:text").live("focus", function() {
    tipShow($(this));
    errClosed($(this));
  });
  //输入框blur时进行验证
  $("input:text").live("blur", function() {
    if (!$(this).hasClass("j_plug")) {
      BlurRuleEvent($(this).get(0), lid);
    } else {
      if ($(this).hasClass("j_schoolName") || $(this).hasClass("j_majorName")) { //联想关键词，故用blur验证
        BlurRuleEvent($(this).get(0), lid);
      }
    }
  });
  //多行输入框绑定focus事件
  $("textarea").live("focus", function() {
    tipShow($(this));
    errClosed($(this));
  });
  //多行输入框绑定blur事件
  $("textarea").live("blur", function() {
    BlurRuleEvent($(this).get(0), lid);
  });
  //单选框验证事件
  $(":radio").live("click", function() {
    BlurRuleEvent($(this).closest(".j_radioBox").get(0), lid);
  });
  //复选框验证事件
  $(":checkbox").live("click", function() {
    BlurRuleEvent($(this).closest(".j_checkBoxWrap").get(0), lid);
  });
  //file绑定focus事件
  $("input:file").live("focus", function() {
    tipShow($(this).closest(".j_fileBox"));
    errClosed($(this).closest(".j_fileBox"));
  });
}

//file value值截取
function fileValue(str) {
  return str.substring(str.lastIndexOf(".") + 1, str.length);
}

//是否是图片
function isImages(str) {
  var filterFile = "jpg gif",
    flag = false,
    value = str.toLowerCase();
  if (filterFile.indexOf(value) > -1) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

//是否是附件
function isDoc(str) {
  var filterFile = "doc docx rar zip xls xlsx pdf",
    flag = false,
    value = str.toLowerCase();
  if (filterFile.indexOf(value) > -1) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

//弹层sure按钮事件
var sureBtnfunc;
//弹层show
function popShow(obj, msg, sureFunc) {
  obj.css("visibility", "hidden").parent().show();
  obj.find(".j_popMsg").html(msg);
  //遮罩
  if (isIE6()) {
    var popObj_top = $(window).scrollTop() + ($(window).height() - obj.height()) / 2;
    obj.parent().css("top", popObj_top + "px");
  }
  coverShow();
  obj.css("visibility", "visible").parent().css("height", obj.height() + "px").show();

  //确认回调函数
  sureBtnfunc = sureFunc;
}
//confirm弹层
function popConfirm(msg, sureFunc) {
  if (sureFunc == undefined) {
    sureFunc = function() {};
  };
  popShow($(".j_cPop_confirmTip"), msg, sureFunc);
};
//alert弹层
function popAlert(msg, sureFunc) {
  if (sureFunc == undefined) {
    sureFunc = function() {};
  };
  popShow($(".j_cPop_alertTip"), msg, sureFunc);
};
//alert弹层
function popBox() {
  coverShow();
  $(".j_cPop_boxTip").parent().show()
};
//弹层hide
function closeBtn(obj) {
  obj.closest(".j_cPopWrap").hide();
  coverHide();
  sureBtnfunc = null;
}
//确定按钮
$(".j_popSureBtn").click(function() {
  sureBtnfunc();
  closeBtn($(this));
});
//取消按钮
$(".j_popCancelBtn").click(function() {
  closeBtn($(this));
});
//遮罩层显示
function coverShow() {
  if (isIE6()) {
    window.frames["cPop_coverIframe"].document.bgColor = "#000";
    var ifr = document.getElementById("cPop_coverIframe");
    ifr.height = $(window).height();
    ifr.style.display = "block";
  } else {
    $("#cPop_cover").show();
  }
}
//遮罩层隐藏
function coverHide() {
  if (isIE6()) {
    document.getElementById("cPop_coverIframe").style.display = "none";
  } else {
    $("#cPop_cover").hide();
  }
}

//模拟下拉框
function selectCreate(form) {
  form.find("select").each(function() {
    var thisObj = $(this);
    var opts = {
      "lid": languageID,
      "before": function() {
        tipShow(thisObj);
        errClosed(thisObj);
      },
      "close": function() {
        BlurRuleEvent(thisObj.get(0), languageID);
      }
    };
    if (thisObj.attr("name") == "edu_type" && languageID != 1) { //英文版受教育类型
      opts["optionWidth"] = 300;
    };
    if (thisObj.attr("name") == "english_level" && languageID != 1) { //英文版英语等级
      opts["optionWidth"] = 200;
    };
    if (thisObj.attr("name") == "certificate_certificate") { //英语证书
      if (languageID != 1) {
        opts["optionWidth"] = 320;
      } else {
        opts["optionWidth"] = 200;
      }
    };
    if (thisObj.attr("name") == "language_skill_language_skill" && languageID != 1) { //语言能力
      opts["optionWidth"] = 200;
    };
    if (thisObj.attr("name") == "language_skill_listen_say" && languageID != 1) { //听说能力
      opts["optionWidth"] = 160;
    };
    if (thisObj.attr("name") == "language_skill_read_write" && languageID != 1) { //读写能力
      opts["optionWidth"] = 160;
    };
    if (thisObj.hasClass("small") || thisObj.hasClass("superSmall") || thisObj.hasClass("moreSmall")) {
      opts["className"] = " mr10 ";
      if (thisObj.hasClass("small")) {
        opts["width"] = 124;
      }
      if (thisObj.hasClass("superSmall")) {
        opts["width"] = 94;
      }
      if (thisObj.hasClass("moreSmall")) {
        opts["width"] = 94;
      }
    } else {
      opts["width"] = 264;
    }
    thisObj.select(opts);
  });
}

//string添加replaceAll方法
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
  if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
    return this.replace(new RegExp(reallyDo, (
      ignoreCase
      ? "gi"
      : "g")), replaceWith);
  } else {
    return this.replace(reallyDo, replaceWith);
  }
};

//解决ie8以下ie浏览器clone没法复制select、textarea的值
(function(original) {
  jQuery.fn.clone = function() {
    var result = original.apply(this, arguments),
      my_textareas = this.find('textarea').add(this.filter('textarea')),
      result_textareas = result.find('textarea').add(result.filter('textarea')),
      my_selects = this.find('select').add(this.filter('select')),
      result_selects = result.find('select').add(result.filter('select'));
    for (var i = 0, l = my_textareas.length; i < l; ++i) 
      $(result_textareas[i]).val($(my_textareas[i]).val());
    for (var j = 0, m = my_selects.length; j < m; ++j) 
      result_selects[j].selectedIndex = my_selects[j].selectedIndex;
    return result;
  };
})(jQuery.fn.clone);
