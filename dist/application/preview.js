/**
 * 预览
**/

//生成预览状态
function preview(form) {
  // console.log('preview', form[0]);
  var formWrap = form.closest(".j_formWrap"),
    preview = formWrap.siblings(".j_preview"),
    tabType = form.closest(".j_tabWrap").attr("required"),
    formName = form.attr("name"),
    previewTitle = preview.find(".j_previewTitle"),
    previewMain = preview.find(".j_previewMain ul"),
    itemList = form.find(".j_itemWrap:visible"),
    len = itemList.length,
    item = null,
    ruleMust = null,
    previewLabel = "",
    previewValue = "",
    previewList = "";
  previewMain.html("");
  // console.log('itemList', itemList);
  if (formName == "photo_attach") { //附件
    previewList = "";
    form.find("input:file").each(function() {
      var fileValue = $(this).attr("data-value");
      if (fileValue && fileValue != '') {
        fileName = fileValue.substring(fileValue.lastIndexOf("/") + 1, fileValue.lastIndexOf(".")),
        fileType = fileValue.substring(fileValue.lastIndexOf(".") + 1);

        previewList += '<li>';
        previewList += '<div class="clearfix">';
        previewList += '<div class="icon_attachments imgBg l"></div>';
        previewList += '<div class="l application_filePreview">';
        previewList += '<div><span>附件名称：</span><p>' + fileName + '</p></div>';
        previewList += '<div><span>附件类型：</span><p>' + fileType + '</p></div>';
        previewList += '</div>';
        previewList += '</div>';
        previewList += '</li>';
      }

    })

    previewMain.append(previewList);
    formWrap.hide();
    preview.show();
    formWrap.closest(".j_tabWrap").find(".j_tabSlideUp").hide().siblings(".j_tabEdit").show();
    return;
  }
  for (var i = 0; i < len; i++) {
    item = itemList.eq(i);
    previewValue = "";
    var el = null;
    previewLabel = item.find(".j_itemTitle").text() + "：";
    if (item.find("input[name = 'name']").length > 0) { //姓名
      var name = getPlugVal(item.find("input[name = 'name']"));

    } else if (item.find("select[name = 'gender']").length > 0) { //性别
      var gender = getPlugVal(item.find("select[name = 'gender']"));

    } else if (item.find("input[name = 'birth']").length > 0) { //出生日期
      var birth = getPlugVal(item.find("input[name = 'birth']"));

    } else if (item.find("input[name = 'school_name']").length > 0) { //学校名称
      var schoolName = getPlugVal(item.find("input[name = 'school_name']"));

    } else if (item.find("input[name = 'edu_date_start']").length > 0) { //入学时间
      var eduStart = getPlugVal(item.find("input[name = 'edu_date_start']"));
      eduStart = eduStart.replaceAll("-", "/");

    } else if (item.find("input[name = 'edu_date_end']").length > 0) { //毕业时间
      var eduEnd = getPlugVal(item.find("input[name = 'edu_date_end']"));
      eduEnd = eduEnd.replaceAll("-", "/");

    } else if (item.find("input[name = 'company_name']").length > 0) { //实习公司名称
      var companyName = getPlugVal(item.find("input[name = 'company_name']"));

    } else if (item.find("input[name = 'job_date_start']").length > 0) { //实习开始时间
      var jobStart = getPlugVal(item.find("input[name = 'job_date_start']"));
      jobStart = jobStart.replaceAll("-", "/");

    } else if (item.find("input[name = 'job_date_end']").length > 0) { //实习结束时间
      var jobEnd = getPlugVal(item.find("input[name = 'job_date_end']"))
      jobEnd = jobEnd.replaceAll("-", "/");

    } else if (item.find("input[name = 'project_name']").length > 0) { //项目名称
      var projectName = getPlugVal(item.find("input[name = 'project_name']"));

    } else if (item.find("input[name = 'project_date_start']").length > 0) { //项目开始时间
      var projectStart = getPlugVal(item.find("input[name = 'project_date_start']"));
      projectStart = projectStart.replaceAll("-", "/");

    } else if (item.find("input[name = 'project_date_end']").length > 0) { //项目结束时间
      var projectEnd = getPlugVal(item.find("input[name = 'project_date_end']"));
      projectEnd = projectEnd.replaceAll("-", "/");

    } else if (item.find("input[name = 'family_name']").length > 0) { //家庭成员姓名
      var familyName = getPlugVal(item.find("input[name = 'family_name']"));

    } else if (item.find("input[name = 'family_relation']").length > 0) { //家庭成员关系
      var familyRelation = getPlugVal(item.find("input[name = 'family_relation']"));

    } else { //无特殊结构
      el = item.find(".j_itemCont").children().first();
      if (el.is("input:text")) { //输入框
        previewValue = getPlugVal(el);
      } else if (el.is("textarea")) { //多行文本输入框
        previewValue = el.val();
      } else if (el.hasClass("j_selectBox")) { //下拉框
        el = el.next();
        if (el.val() == "-1") {
          previewValue = ""
        } else {
          previewValue = el.find(":selected").text();
          var arr = releasePreview({ //联动项
            "el": el,
            "previewLabel": previewLabel,
            "previewValue": previewValue,
            "form": form,
            "item": item
          });
          previewLabel = arr[0];
          previewValue = arr[1];
        }
      } else if (el.hasClass("j_radioBox")) { //单选框
        el.find("input[type = 'radio']:visible").each(function() {
          if ($(this).attr("checked") == true || $(this).attr("checked") == "checked") {
            previewValue = $(this).next("label").text();
          }
        });
      } else if (el.hasClass("j_checkBoxWrap")) { //复选框
        el.find("input[type = 'checkbox']:visible").each(function() {
          if ($(this).attr("checked") == true || $(this).attr("checked") == "checked") {
            previewValue += $(this).next("label").text() + "&nbsp;&nbsp;&nbsp;&nbsp;";
          }
        });
      } else if (el.is(".j_fileBox")) { //file
        el = el.find(":file");
        if (el.attr("data-value")) {
          previewValue = el.attr("data-value");
        }
      } else if (el.attr('name') == 'span_national_code') {
        var el2 = el.next().next();
        var _ncode = $.trim(el.next().find('input').val());
        if (_ncode) {
          previewValue = _ncode + " - " + getPlugVal(el2);
        } else {
          previewValue = getPlugVal(el2);
        }
      } else {}
    }
    previewLabel = $.trim(previewLabel);
    previewValue = $.trim(previewValue);
    if (el && el.length > 0) {
      if (el.attr("rule")) {
        ruleMust = JSON.parse(el.attr("rule"));
        if (ruleMust) {
          ruleMust = ruleMust.must;
        } else {
          ruleMust = false;
        }
      }
      if (!isReleaseName(el.attr("name"))) {
        if (!(!ruleMust && previewValue == "")) {
          previewList += "<li><span>" + previewLabel + "</span><p>" + previewValue + "</p></li>";
        }
      }
    }
  };
  // console.log('previewList', formName, previewList);
  previewMain.append(previewList);
  if (isRepeated(formName, form)) { //循环项
    if (formName == "education_experience") { //教育经历
      previewTitle.find(".j_previewName").html(schoolName + "（" + eduStart + "-" + eduEnd + "）");
    }
    if (formName == "family_relationship") { //家庭关系
      previewTitle.find(".j_previewName").html(familyName + "（" + familyRelation + "）");
    }
  } else { //非循环项
    if (formName == "person_info") { //个人信息
      if (gender == 1) {
        var genderClassName = "icon_male";
      } else {
        var genderClassName = "icon_female";
      }
      previewTitle.html('<p class="ml20 mb20"><span>' + name + '</span><i class="' + genderClassName + ' imgBg ml10 mr10"></i>(' + birth + ')</p>');
    } else {
      if (previewTitle.length > 0) {
        previewTitle.remove(); //非循环项清除previewTitle
      }
    }
    var tabWrap = form.closest(".j_tabWrap"),
      tabShow = tabWrap.find(".j_tabSlideUp"),
      tabEdit = tabWrap.find(".j_tabEdit");
    tabShow.hide();
    tabEdit.show();
  }
  formWrap.hide();
  preview.show();
}
