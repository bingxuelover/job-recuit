/**
 * 联动项、小循环项添加、删除
**/

//页面初始化不在同一列联动项处理(下拉框)
function releaseInit(doom, form) {
  if (doom.attr("name") == "id_card_type") { //证件类型
    if (doom.val() == -1) {
      form.find(".j_id_card_type").hide();
    } else {
      form.find(".j_id_card_type").show();
    }
  }
  if (doom.attr("name") == "healthiness_status") { //健康状况
    if (doom.val() == 3) {
      form.find(".j_healthiness_status").show();
    } else {
      form.find(".j_healthiness_status").hide();
    }
  }
  if (doom.attr("name") == "education_degree") { //学历
    if (doom.val() == -1 || doom.val() == 15) {
      form.find(".j_education_degree, .j_education_degree_direction, .j_education_degree_score, .j_education_special").hide();
    } else {
      form.find(".j_education_degree").show();
      form.find(".j_education_degree_score, .j_education_special").hide();
      if (doom.val() < 4) {
        form.find(".j_education_degree_direction").show();
      } else if (doom.val() == 4) {
        form.find(".j_education_special").show();
      } else if (doom.val() == 7) {
        form.find(".j_education_degree_score").show();
        form.find(".j_education_degree, .j_education_degree_direction").hide();
      } else if (doom.val() == 8) {
        form.find(".j_education_degree, .j_education_degree_direction").hide();
      } else {
        form.find(".j_education_degree_direction").hide();
      }
    }
  }
  if (doom.attr("name") == "education_level") { //学位
    if (doom.val() == 4) {
      form.find(".j_education_level").show();
    } else {
      form.find(".j_education_level").hide();
    }
  }
  if (doom.attr("name") == "is_oversea") { //海外
    if (doom.val() == 1) {
      form.find(".j_is_oversea").show();
    } else {
      form.find(".j_is_oversea").hide();
    }
  }
  if (doom.attr("id") == "wanted_career_company") { //职位联动
    switch (doom.val()) {
      case "省公司":
        form.find(".j_company_top1").show();
        break;
      case "石家庄分公司":
        form.find(".j_company1").show();
        break;
      case "承德分公司":
        form.find(".j_company1").show();
        break;
      case "张家口分公司":
        form.find(".j_company2").show();
        break;
      case "秦皇岛分公司":
        form.find(".j_company3").show();
        break;
      case "廊坊分公司":
        form.find(".j_company4").show();
        break;
      case "保定分公司":
        form.find(".j_company6").show();
        break;
      default:
        form.find(".j_company1").show();
    }
  }
  if (doom.attr("name") == "change_status") { //是否接受调剂
    if (doom.val() == 1) {
      form.find(".j_change_status").show();
    } else {
      form.find(".j_change_status").hide();
    }
  }
  if (doom.attr("name") == "change_status_country") { //是否接受区县调剂
    if (doom.val() == 1) {
      form.find(".j_change_status_country").show();
    } else {
      form.find(".j_change_status_country").hide();
    }
  }
  if (doom.attr("name") == "is_cadres") { //是否学生干部
    if (doom.val() == 1) {
      form.find(".j_is_cadres").show();
    } else {
      form.find(".j_is_cadres").hide();
    }
  }
  if (doom.attr("name") == "is_cadres_scholasticleader_level") { //干部级别
    if (doom.val() == -1) {
      form.find(".j_is_cadres_scholasticleader_level").hide();
    } else {
      form.find(".j_is_cadres_scholasticleader_level").show();
    }
  }
  if (doom.attr("name") == "is_cadres_scholasticleader") { //干部名称
    if (doom.val() == -1) {
      form.find(".j_is_cadres_scholasticleader").hide();
    } else {
      form.find(".j_is_cadres_scholasticleader").show();
    }
  }
  if (doom.attr("name") == "comment_title") { //自我评价标题
    if (doom.val() == 89) {
      form.find(".j_comment_title").show();
    } else {
      form.find(".j_comment_title").hide();
    }
  }
  if (doom.attr("name") == "is_references") { //证明人
    if (doom.val() == 1) {
      form.find(".j_references").show();
    } else {
      form.find(".j_references").hide();
    }
  }
  if (doom.attr("name") == "is_practice") { //是否在本公司实习过
    if (doom.val() == 1) {
      form.find(".j_is_practice").show();
    } else {
      form.find(".j_is_practice").hide();
    }
  }
  if (doom.attr("name") == "relative_in_company") { //是否有亲友受雇于本公司
    if (doom.val() == 1) {
      form.find(".j_relative_in_company").show();
    } else {
      form.find(".j_relative_in_company").hide();
    }
  }
  if (doom.attr("name") == "national_code") { //手机区号
    if (doom.val() == -1) {
      form.find(".j_national_code").hide();
    } else {
      form.find(".j_national_code").show();
    }
  }
};

//页面初始化在同一列联动项处理
function releaseInitOne(form) {
  if (form.find("select[name = 'scholarship_level']").length > 0) { //奖学金
    form.find("select[name = 'scholarship_level']").each(function() {
      var scholarshipScale = $(this).nextAll("select[ name = 'scholarship_scale']"), //奖学金等级
        scholarshipScaleOther = $(this).nextAll("input[name = 'scholarship_scale_other']"); //奖学金其他
      if ($(this).val() == -1 || $(this).val() == 1) {
        scholarshipScale.prev().hide();
        scholarshipScaleOther.hide();
      } else {
        scholarshipScale.prev().show();
      }
      if (scholarshipScale.val() == 4) {
        scholarshipScaleOther.show();
      } else {
        scholarshipScaleOther.hide();
      }
    });
  }
  if (form.find("select[name = 'english_level']").length > 0) { //英语等级
    var englishLevel = form.find("select[name = 'english_level']");
    if (englishLevel.val() == -1 || englishLevel.val() == 70) {
      englishLevel.next().hide().next().hide();
    } else {
      englishLevel.next().show().next().show();
    }
  }
  if (form.find(".j_scholarship_itemWrap:visible").length >= parseInt(form.find(".j_scholarship_addBtn").attr("max"))) { //奖学金的添加按钮是否隐藏
    form.find(".j_scholarship_addBox").hide();
  } else {
    form.find(".j_scholarship_addBox").show();
  }
  if (form.find("select[name = 'certificate_certificate']").length > 0) { //英语证书
    form.find("select[name = 'certificate_certificate']").each(function() {
      var achievedate = $(this).nextAll("input[name = 'certificate_achievedate']"), //英语证书获取时间
        certificate = $(this).nextAll("input[name = 'certificate_level']"); //英语证书等级、分数
      if ($(this).val() == -1) {
        achievedate.hide().prev().hide();
        certificate.hide().prev().hide();
      } else {
        achievedate.show().prev().show();
        certificate.show().prev().show();
      }
    });
  }
  if (form.find(".j_certificate_itemWrap:visible").length >= parseInt(form.find(".j_certificate_addBtn").attr("max"))) { //英语证书的添加按钮是否隐藏
    form.find(".j_certificate_addBox").hide();
  } else {
    form.find(".j_certificate_addBox").show();
  }
  if (form.find("select[name = 'language_skill_language_skill']").length > 0) { //语言能力
    form.find("select[name = 'language_skill_language_skill']").each(function() {
      var listenSay = $(this).nextAll("select[name = 'language_skill_listen_say']"), //听说能力
        readWrite = $(this).nextAll("select[name = 'language_skill_read_write']"); //读写能力
      if ($(this).val() == -1) {
        listenSay.prev().hide().prev().hide();
        readWrite.prev().hide().prev().hide();
      } else {
        listenSay.prev().show().prev().show();
        readWrite.prev().show().prev().show();
      }
    });
  }
  if (form.find(".j_language_skill_itemWrap:visible").length >= parseInt(form.find(".j_language_skill_addBtn").attr("max"))) { //语言能力的添加按钮是否隐藏
    form.find(".j_language_skill_addBox").hide();
  } else {
    form.find(".j_language_skill_addBox").show();
  }

  if (typeof(CustomAction) != "undefined" && typeof(CustomAction.InitEdit) != "undefined") {
    CustomAction.InitEdit(form.attr("id"), form);
  }
};

//预览联动项处理
function releasePreview(options) {
  var el = options.el,
    previewLabel = $.trim(options.previewLabel),
    previewValue = options.previewValue,
    form = options.form,
    item = options.item;

  if (el.attr("name") == "id_card_type") { //证件类型
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + form.find("input[name = 'id_card']").val();
  }
  if (el.attr("name") == "healthiness_status" && el.val() == 3) { //健康情况
    previewValue = form.find("input[name = 'healthiness_history']").val();
  }
  if (el.attr("name") == "is_oversea" && el.val() == 1) { //海外
    var is_cadres_scholasticleader = form.find("select[name = 'oversea_experience']");
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + (
      is_cadres_scholasticleader.val() == -1
      ? "&nbsp;"
      : is_cadres_scholasticleader.find(":selected").text());
  }
  if (el.attr("name") == "is_cadres_scholasticleader_level") { //干部级别
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + (
      form.find("select[name = 'is_cadres_scholasticleader']").val() == -1
      ? ""
      : form.find("select[name = 'is_cadres_scholasticleader']").find(":selected").text());
  }
  if (el.attr("name") == "comment_title" && el.val() == 89) { //自我评价自定义标题
    previewValue = form.find("input[name = 'comment_customtitle']").val();
  }
  if (el.attr("name") == "english_level" && el.val() != 70) { //英语等级
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + item.find("input[ name = 'english_score']").val();
  }
  if (el.attr("name") == "scholarship_level") { //奖学金
    if (previewLabel == "：") {
      previewLabel = '<font style="visibility:hidden;">奖学金：</font>';
    }
    if (!(el.val() == 1)) {
      previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + (
        item.find("select[name = 'scholarship_scale']").val() == -1
        ? ""
        : item.find("select[name = 'scholarship_scale']").find(":selected").text());
      if (item.find("select[name = 'scholarship_scale']").val() == 4) {
        previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + item.find("input[name = 'scholarship_scale_other']").val();
      }
    }
  }
  if (el.attr("name") == "certificate_certificate") { //英语证书
    if (previewLabel == "：") {
      previewLabel = '<font style="visibility:hidden;">英语证书：</font>';
    }
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + item.find("input[name = 'certificate_achievedate']").val();
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + item.find("input[name = 'certificate_level']").val();
  }
  if (el.attr("name") == "language_skill_language_skill") { //语言能力
    if (previewLabel == "：") {
      previewLabel = '<font style="visibility:hidden;">语言能力：</font>';
    }
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + (
      item.find("select[name = 'language_skill_listen_say']").val() == -1
      ? ""
      : item.find("select[name = 'language_skill_listen_say']").find(":selected").text());
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + (
      item.find("select[name = 'language_skill_read_write']").val() == -1
      ? ""
      : item.find("select[name = 'language_skill_read_write']").find(":selected").text());
  }
  if (el.attr("name") == "national_code") { //手机区号
    previewValue += "&nbsp;&nbsp;&nbsp;&nbsp;" + form.find("input[name = 'mobile_number']").val();
  }
  var arr = [previewLabel, previewValue];
  return arr;
};

//是否是需要忽略的联动项
function isReleaseName(name) {
  var arr = [
      "id_card", "healthiness_history", "oversea_experience", "is_cadres_scholasticleader", "comment_customtitle"
    ],
    flag = false;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == name) {
      flag = true;
      break;
    }
  }
  return flag;
}

//联动项input的赋值 奖学金、英语证书、语言能力
function releaseAppend(form, k, data, isCancel) {
  var flag = false;
  if (k == "certificate") { //英语证书
    var tabTemp = form.find(".j_certificateTemp"),
      itemTemp = tabTemp.html(),
      oTitle = form.find('.j_certificate_itemWrap').eq(0).find('.j_itemTitle').html(),
      addBox = form.find(".j_certificate_addBox");
    addBox.prevAll('.j_certificate_itemWrap').each(function() {
      $(this).remove();
    })
    addBox.before(itemTemp);
    for (var m in data[0]) {
      if (data[0][m]["Value"]) {
        flag = true;
        appendValue(addBox.prev(), m, data[0][m]);
      }
    }
    if (flag) {
      addBox.prev().find(".j_certificate_deleteBtn").show();
    }
    for (var i = 1; i < data.length; i++) {
      var breakFlag = true;
      if (data[i]["certificate_certificate"]["Value"]) {
        breakFlag = false;
        //if(!isCancel){ (修复线上bug  取消时出现重复信息   isCancel为判断是否为取消事件的变量)
        addBox.before(itemTemp);
        //}
        for (var m in data[i]) {
          if (data[i][m]["Value"]) {
            appendValue(addBox.prev(), m, data[i][m]);
          }
        }
      }
      if (breakFlag) {
        //break;
      }
    }
    addBox.prevAll(".j_certificate_itemWrap").each(function() {
      var number = $(this).index(),
        certificate_achievedate = $(this).find("input[name = 'certificate_achievedate']");
      certificate_achievedate.attr("id", certificate_achievedate.attr("id") + "_" + number);
    });
    addBox.find(".j_certificate_addBtn").attr("number", addBox.prevAll(".j_certificate_itemWrap").length);
    form.find('.j_certificate_itemWrap').eq(0).find('.j_itemTitle').append(oTitle);
  }
  if (k == "language_skill") { //语言能力
    var itemTemp = form.find(".j_language_skillTemp").html(),
      oTitle = form.find('.j_language_skill_itemWrap').eq(0).find('.j_itemTitle').html(),
      addBox = form.find(".j_language_skill_addBox");
    addBox.prevAll('.j_language_skill_itemWrap').each(function() {
      $(this).remove();
    })
    addBox.before(itemTemp);
    selectCreate(addBox.prev()); //yanwei.dong 2016-10-19,解决下拉框无法点击
    for (var m in data[0]) {
      if (data[0][m]["Value"]) {
        flag = true;
        appendValue(addBox.prev(), m, data[0][m]);
      }
    }
    if (flag) {
      addBox.prev().find(".j_language_skill_deleteBtn").show();
    }
    for (var i = 1; i < data.length; i++) {
      var breakFlag = true;
      if (data[i]["language_skill_language_skill"]["Value"]) {
        breakFlag = false;
        // if(!isCancel){//(修复线上bug  取消时出现重复信息   isCancel为判断是否为取消事件的变量)
        addBox.before(itemTemp);
        selectCreate(addBox.prev()); //yanwei.dong 2016-10-19 解决下拉框无法点击
        // }
        for (var m in data[i]) {
          if (data[i][m]["Value"]) {
            appendValue(addBox.prev(), m, data[i][m]);
          }
        }
      }
      if (breakFlag) {
        //break;
      }
    }
    form.find('.j_language_skill_itemWrap').eq(0).find('.j_itemTitle').append(oTitle);
  }
  releaseInitOne(form);
  return flag;
}

//联动项排除
function releaserRemove(form) {
  if (form.find(".j_scholarship_itemWrap:visible").length > 0) { //奖学金
    var title = "";
    form.find(".j_scholarship_itemWrap:visible").each(function() {
      var itemTitle = $.trim($(this).find(".j_itemTitle").html());
      if (!(itemTitle == "" || itemTitle == "&nbsp;")) {
        title = itemTitle;
      }
      if ($(this).find("select[ name = 'scholarship_level']").val() == -1) {
        $(this).remove();
      }
    });
    if (form.find(".j_scholarship_itemWrap:visible").length <= 1) {
      if (form.find(".j_scholarship_itemWrap:visible").length == 0) {
        form.find(".j_scholarship_addBox").before(form.find(".j_scholarshipTemp").html());
      }
      form.find(".j_scholarship_itemWrap:visible").find(".j_scholarship_deleteBtn").hide();
    }
    form.find(".j_scholarship_itemWrap:visible").first().find(".j_itemTitle").html(title);
  }

  if (form.find(".j_certificate_itemWrap:visible").length > 0) { //英语证书
    var title = "";
    form.find(".j_certificate_itemWrap:visible").each(function() {
      var itemTitle = $.trim($(this).find(".j_itemTitle").html());
      if (!(itemTitle == "" || itemTitle == "&nbsp;")) {
        title = itemTitle;
      }
      if ($(this).find("select[ name = 'certificate_certificate']").val() == -1) {
        $(this).remove();
      }
    });
    if (form.find(".j_certificate_itemWrap:visible").length <= 1) {
      if (form.find(".j_certificate_itemWrap:visible").length == 0) {
        form.find(".j_certificate_addBox").before(form.find(".j_certificateTemp").html());
      }
      form.find(".j_certificate_itemWrap:visible").find(".j_certificate_deleteBtn").hide();
    }
    form.find(".j_certificate_itemWrap:visible").first().find(".j_itemTitle").html(title);
  }

  if (form.find(".j_language_skill_itemWrap:visible").length > 0) { //语言能力
    var title = "";
    form.find(".j_language_skill_itemWrap:visible").each(function() {
      var itemTitle = $.trim($(this).find(".j_itemTitle").html());
      if (!(itemTitle == "" || itemTitle == "&nbsp;")) {
        title = itemTitle;
      }
      // if($(this).find("select[ name = 'language_skill_language_skill']").val() == -1){
      //     $(this).remove();
      // } yanwei.dong 2016-10-19 解决下拉框无法点击
    });
    if (form.find(".j_language_skill_itemWrap:visible").length <= 1) {
      if (form.find(".j_language_skill_itemWrap:visible").length == 0) {
        form.find(".j_language_skill_addBox").before(form.find(".j_language_skillTemp").html());
      }
      form.find(".j_language_skill_itemWrap:visible").find(".j_language_skill_deleteBtn").hide();
    }
    form.find(".j_language_skill_itemWrap:visible").first().find(".j_itemTitle").html(title);
  }
}

//联动项绑定
function releaseEvent() {
  $("select[name = 'healthiness_status']").live("change", function() { //健康
    var healthinessWrap = $(this).closest(".j_itemWrap").siblings(".j_healthiness_status");
    if ($(this).val() == 3) {
      healthinessWrap.show();
    } else {
      healthinessWrap.hide();
    }
    itemClear(healthinessWrap);
  });
  $("select[name = 'id_card_type']").live("change", function() { //证件类型
    var idCard_wrap = $(this).closest(".j_itemWrap").siblings(".j_id_card_type");
    if ($(this).val() == -1) {
      idCard_wrap.hide();
    } else {
      idCard_wrap.show();
    }
    itemClear(idCard_wrap);
  });
  $("select[name = 'relative_status']").live("change", function() { //证件类型
    var idCard_wrap = $(this).closest(".j_itemWrap").siblings(".j_relative_status_type");
    if ($(this).val() == 1) {
      idCard_wrap.show();
    } else {
      idCard_wrap.hide();
    }
    itemClear(idCard_wrap);
  });
  $("select[name = 'education_degree']").live("change", function() { ///学历
    var item = $(this).closest(".j_itemWrap"),
      degreeRelate = item.siblings(".j_education_degree"),
      degreeDirection_relate = item.siblings(".j_education_degree_direction"),
      degreeDirection_special = item.siblings(".j_education_special"),
      degreeDirection_score = item.siblings(".j_education_degree_score");
    if ($(this).val() == -1 || $(this).val() == 15) {
      degreeRelate.hide();
      degreeDirection_relate.hide();
      degreeDirection_special.hide();
      degreeDirection_score.hide();
    } else {
      degreeRelate.show();
      degreeDirection_score.hide();
      degreeDirection_special.hide();
      if ($(this).val() < 4) {
        degreeDirection_relate.show();
      } else if ($(this).val() == 4) {
        degreeDirection_special.show();
      } else if ($(this).val() == 7) {
        degreeDirection_score.show();
        degreeRelate.hide();
        degreeDirection_relate.hide();
      } else if ($(this).val() == 8) {
        degreeRelate.hide();
        degreeDirection_relate.hide();
      } else {
        degreeDirection_relate.hide();
      }
    }
    degreeRelate.each(function() {
      itemClear($(this));
    });
    degreeDirection_special.each(function() {
      itemClear($(this));
    });
    itemClear(degreeDirection_relate);
    itemClear(degreeDirection_score);
  });
  $("select[name = 'education_level']").live("change", function() { //学位
    var minorName = $(this).closest(".j_itemWrap").siblings(".j_education_level");
    if ($(this).val() == 4) {
      minorName.show();
    } else {
      minorName.hide();
    }
    itemClear(minorName);
  });
  $("select[name = 'is_oversea']").live("change", function() { //海外
    var overseaExperience_wrap = $(this).closest(".j_itemWrap").siblings(".j_is_oversea");
    if ($(this).val() == 1) {
      overseaExperience_wrap.show();
    } else {
      overseaExperience_wrap.hide();
    }
    itemClear(overseaExperience_wrap);
  });
  $("select[id = 'wanted_career_company']").live("change", function() { //职位联动
    var positon1 = $(this).closest(".j_itemWrap").siblings(".j_company_top1");
    var positon2 = $(this).closest(".j_itemWrap").siblings(".j_company_top2");
    var positon3 = $(this).closest(".j_itemWrap").siblings(".j_company_top3");
    var positon4 = $(this).closest(".j_itemWrap").siblings(".j_company1");
    var positon5 = $(this).closest(".j_itemWrap").siblings(".j_company2");
    var positon6 = $(this).closest(".j_itemWrap").siblings(".j_company3");
    var positon7 = $(this).closest(".j_itemWrap").siblings(".j_company4");
    var positon8 = $(this).closest(".j_itemWrap").siblings(".j_company5");
    var positon9 = $(this).closest(".j_itemWrap").siblings(".j_company6");
    if ($(this).val() == "省公司") {
      positon1.show();
      positon2.hide();
      positon3.hide();
      positon4.hide();
      positon5.hide();
      positon6.hide();
      positon7.hide();
      positon8.hide();
      positon9.hide();
    } else if ($(this).val() == "张家口分公司") {
      positon1.hide();
      positon2.hide();
      positon3.hide();
      positon4.hide();
      positon5.show();
      positon6.hide();
      positon7.hide();
      positon8.hide();
      positon9.hide();
    } else if ($(this).val() == "秦皇岛分公司") {
      positon1.hide();
      positon2.hide();
      positon3.hide();
      positon4.hide();
      positon5.hide();
      positon6.show();
      positon7.hide();
      positon8.hide();
      positon9.hide();
    } else if ($(this).val() == "廊坊分公司") {
      positon1.hide();
      positon2.hide();
      positon3.hide();
      positon4.hide();
      positon5.hide();
      positon6.hide();
      positon7.show();
      positon8.hide();
      positon9.hide();
    } else if ($(this).val() == "保定分公司") {
      positon1.hide();
      positon2.hide();
      positon3.hide();
      positon4.hide();
      positon5.hide();
      positon6.hide();
      positon7.hide();
      positon8.hide();
      positon9.show();
    } else {
      positon1.hide();
      positon2.hide();
      positon3.hide();
      positon4.show();
      positon5.hide();
      positon6.hide();
      positon7.hide();
      positon8.hide();
      positon9.hide();
    }
    itemClear(positon1);
    itemClear(positon2);
    itemClear(positon3);
    itemClear(positon4);
    itemClear(positon5);
    itemClear(positon6);
    itemClear(positon7);
    itemClear(positon8);
    itemClear(positon9);
  });
  $("select[name = 'change_status']").live("change", function() { //是否调剂
    var idCard_wrap = $(this).closest(".j_itemWrap").siblings(".j_change_status");
    if ($(this).val() == 1) {
      idCard_wrap.show();
    } else {
      idCard_wrap.hide();
    }
    itemClear(idCard_wrap);
  });
  $("select[name = 'change_status_country']").live("change", function() { //是否县区调剂
    var idCard_country = $(this).closest(".j_itemWrap").siblings(".j_change_status_country");
    if ($(this).val() == 1) {
      idCard_country.show();
    } else {
      idCard_country.hide();
    }
    itemClear(idCard_country);
  });
  $("select[name = 'is_cadres']").live("change", function() { //是否学生干部
    var item = $(this).closest(".j_itemWrap"),
      is_cadres_cadres = item.siblings(".j_is_cadres"),
      is_cadres_scholasticleader_level = item.siblings(".j_is_cadres_scholasticleader_level"),
      is_cadres_scholasticleader = item.siblings(".j_is_cadres_scholasticleader");
    if ($(this).val() == 1) {
      is_cadres_cadres.show();
    } else {
      is_cadres_cadres.hide();
      itemClear(is_cadres_cadres);
      is_cadres_scholasticleader_level.hide();
      itemClear(is_cadres_scholasticleader_level);
      is_cadres_scholasticleader.hide();
      is_cadres_scholasticleader.each(function() {
        itemClear($(this));
      });
    }
  });

  $("select[name = 'is_cadres_scholasticleader_level']").live("change", function() { //干部级别
    var item = $(this).closest(".j_itemWrap"),
      is_cadres_scholasticleader_level = item.siblings(".j_is_cadres_scholasticleader_level"),
      is_cadres_scholasticleader = item.siblings(".j_is_cadres_scholasticleader");
    if ($(this).val() == -1) {
      is_cadres_scholasticleader_level.hide();
      itemClear(is_cadres_scholasticleader_level);
      is_cadres_scholasticleader.hide();
      is_cadres_scholasticleader.each(function() {
        itemClear($(this));
      });
    } else {
      is_cadres_scholasticleader_level.show();
    }
  });

  $("select[name = 'is_cadres_scholasticleader']").live("change", function() { //干部名称
    var item = $(this).closest(".j_itemWrap"),
      is_cadres_scholasticleader = item.siblings(".j_is_cadres_scholasticleader");
    if ($(this).val() == -1) {
      is_cadres_scholasticleader.hide();
      is_cadres_scholasticleader.each(function() {
        itemClear($(this));
      });
    } else {
      is_cadres_scholasticleader.show();
    }
  });

  $("select[name = 'comment_title']").live("change", function() { //自我评价标题
    var customtitle = $(this).closest(".j_itemWrap").siblings(".j_comment_title");
    if ($(this).val() == 89) {
      customtitle.show();
    } else {
      customtitle.hide();
    }
    itemClear(customtitle);
  });
  $("select[name = 'is_references']").live("change", function() { //证明人
    var ecperienceReferences_relate = $(this).closest(".j_itemWrap").siblings(".j_references");
    if ($(this).val() == 1) {
      ecperienceReferences_relate.show();
    } else {
      ecperienceReferences_relate.hide();
    }
    ecperienceReferences_relate.each(function() {
      itemClear($(this));
    });
  });
  $("select[name = 'scholarship_level']").live("change", function() { //奖学金
    var scholarshipScale = $(this).nextAll("select[name = 'scholarship_scale']"),
      scholarshipScaleOther = $(this).nextAll("input[name='scholarship_scale_other']");
    if ($(this).val() == -1 || $(this).val() == 1) {
      scholarshipScale.prev().hide();
      scholarshipScale.prev().find(".j_selectTitle").attr({"data-value": "-1", "title": scholarshipScale.find("option[value = '-1']").text()}).text(scholarshipScale.find("option[value = '-1']").text());
      scholarshipScale.find("option[value = '-1']").attr("selected", "selected").siblings().removeAttr("selected");
      scholarshipScaleOther.val("").hide();
    } else {
      scholarshipScale.prev().show();
    }
  });
  $("select[name = 'scholarship_scale']").live("change", function() { //奖学金等级
    var scholarshipScaleOther = $(this).nextAll("input[name='scholarship_scale_other']");
    if ($(this).val() == 4) {
      scholarshipScaleOther.show();
    } else {
      scholarshipScaleOther.val("").hide();
    }
  });
  $("select[name = 'english_level']").live("change", function() { //英语等级
    var englishLevel = $(this).nextAll("input[name = 'english_score']");
    if ($(this).val() == -1 || $(this).val() == 70) {
      englishLevel.val("").hide();
    } else {
      englishLevel.show();
    }
  });
  $("select[name = 'certificate_certificate']").live("change", function() { //英语证书
    var achievedate = $(this).nextAll("input[ name = 'certificate_achievedate']"), //英语证书获取时间
      certificate = $(this).nextAll("input[ name = 'certificate_level']"); //英语证书等级、分数
    if ($(this).val() == -1) {
      achievedate.val("").hide().prev().hide();
      certificate.val("").hide().prev().hide();
    } else {
      achievedate.show().prev().show();
      certificate.show().prev().show();
    }
  });
  $("select[name = 'language_skill_language_skill']").live("change", function() { //英语证书
    var listenSay = $(this).nextAll("select[name='language_skill_listen_say']"), //听说能力
      readWrite = $(this).nextAll("select[name = 'language_skill_read_write']"); //读写能力
    if ($(this).val() == -1) {
      listenSay.prev().hide().prev().hide();
      listenSay.find("option[value = '-1']").attr("selected", "selected").siblings().removeAttr("selected");
      listenSay.prev().find(".j_selectTitle").attr({"data-value": "-1", "title": listenSay.find("option[value = '-1']").text()}).text(listenSay.find("option[value = '-1']").text());
      readWrite.prev().hide().prev().hide();
      readWrite.find("option[value = '-1']").attr("selected", "selected").siblings().removeAttr("selected");
      readWrite.prev().find(".j_selectTitle").attr({"data-value": "-1", "title": readWrite.find("option[value = '-1']").text()}).text(readWrite.find("option[value = '-1']").text());
    } else {
      listenSay.prev().show().prev().show();
      readWrite.prev().show().prev().show();
    }
  });
  $("select[name = 'is_practice']").live("change", function() { //是否在本公司实习过
    var is_practice = $(this).closest(".j_itemWrap").siblings(".j_is_practice");
    if ($(this).val() == 1) {
      is_practice.show();
    } else {
      is_practice.hide();
    }
    itemClear(is_practice);
  });
  $("select[name = 'relative_in_company']").live("change", function() { //是否有亲友受雇于本公司
    var relative_in_company = $(this).closest(".j_itemWrap").siblings(".j_relative_in_company");
    if ($(this).val() == 1) {
      relative_in_company.show();
    } else {
      relative_in_company.hide();
    }
    itemClear(relative_in_company);
  });
  $("select[name = 'national_code']").live("change", function() { //手机区号
    var idCard_wrap = $(this).closest(".j_itemWrap").siblings(".j_national_code");
    if ($(this).val() == -1) {
      idCard_wrap.hide();
    } else {
      idCard_wrap.show();
    }
    itemClear(idCard_wrap);
  });
};

//小循环项
function circleEvent() {
  //小循环项添加
  $(".j_scholarship_addBtn").live("click", function() { //奖学金
    var item = $(this).closest(".j_scholarship_addBox"),
      max = parseInt($(this).attr("max")),
      len = item.siblings(".j_scholarship_itemWrap:visible").length;
    item.before($(".j_scholarshipTemp").html());
    selectCreate(item.prev());
    item.siblings(".j_scholarship_itemWrap:visible").find(".j_scholarship_deleteBtn").show();
    if (len >= (max - 1)) {
      $(this).hide();
    }
  });
  $(".j_certificate_addBtn").live("click", function() { //英语证书
    var item = $(this).closest(".j_certificate_addBox"),
      max = parseInt($(this).attr("max")),
      number = parseInt($(this).attr("number")) + 1,
      len = item.siblings(".j_certificate_itemWrap:visible").length;
    item.before($(".j_certificateTemp").html());
    selectCreate(item.prev());
    var certificate_achievedate = item.prev().find("input[name = 'certificate_achievedate']");
    certificate_achievedate.attr("id", certificate_achievedate.attr("id") + "_" + number);
    $(this).attr("number", number);
    plugBind(item.prev(), languageID);
    item.siblings(".j_certificate_itemWrap:visible").find(".j_certificate_deleteBtn").show();
    if (len >= (max - 1)) {
      $(this).hide();
    }
  });
  $(".j_language_skill_addBtn").live("click", function() { //语言能力
    var item = $(this).closest(".j_language_skill_addBox"),
      max = parseInt($(this).attr("max")),
      len = item.siblings(".j_language_skill_itemWrap:visible").length;
    item.before($(".j_language_skillTemp").html());
    selectCreate(item.prev());
    item.siblings(".j_language_skill_itemWrap:visible").find(".j_language_skill_deleteBtn").show();
    if (len >= (max - 1)) {
      $(this).hide();
    }
  });

  //小循环项删除
  $(".j_scholarship_deleteBtn").live("click", function() { //奖学金
    var item = $(this).closest(".j_scholarship_itemWrap"),
      addBtn = item.siblings(".j_scholarship_addBox").children().eq(0),
      addBtnDiv = item.siblings(".j_scholarship_addBox"),
      title = item.find(".j_itemTitle").text().replace(/\s+/g, "");
    if (title.length) {
      item.siblings(".j_scholarship_itemWrap").eq(0).find(".j_itemTitle").text(title);
    }
    if (item.siblings(".j_scholarship_itemWrap").length == 1) {
      item.siblings(".j_scholarship_itemWrap").find(".j_scholarship_deleteBtn").hide();
    }
    item.remove();
    addBtn.show();
    addBtnDiv.show();
  });

  $(".j_certificate_deleteBtn").live("click", function() { //英语证书
    var item = $(this).closest(".j_certificate_itemWrap"),
      addBtn = item.siblings(".j_certificate_addBox").children().eq(0),
      addBtnDiv = item.siblings(".j_certificate_addBox"),
      title = item.find(".j_itemTitle").text().replace(/\s+/g, "");
    if (title.length) {
      item.siblings(".j_certificate_itemWrap").eq(0).find(".j_itemTitle").text(title);
    }
    if (item.siblings(".j_certificate_itemWrap").length == 1) {
      item.siblings(".j_certificate_itemWrap").find(".j_certificate_deleteBtn").hide();
    }
    item.remove();
    addBtn.show();
    addBtnDiv.show();
  });

  $(".j_language_skill_deleteBtn").live("click", function() { //语言能力
    var item = $(this).closest(".j_language_skill_itemWrap"),
      addBtn = item.siblings(".j_language_skill_addBox").children().eq(0),
      addBtnDiv = item.siblings(".j_language_skill_addBox"),
      title = item.find(".j_itemTitle").text().replace(/\s+/g, "");
    if (title.length) {
      item.siblings(".j_language_skill_itemWrap").eq(0).find(".j_itemTitle").text(title);
    }
    if (item.siblings(".j_language_skill_itemWrap").length == 1) {
      item.siblings(".j_language_skill_itemWrap").find(".j_language_skill_deleteBtn").hide();
    }
    item.remove();
    addBtn.show();
    addBtnDiv.show();
  });
}
