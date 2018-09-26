//行业选择
function industryPicker(obj, objParentId, objId, limit, lid) {
  if (obj.data("events") && obj.data("events")["click"]) {
    return;
  }
  obj.IndustryOn(
    lid == 1
    ? CONST_INDUSTRY['industry']
    : CONST_INDUSTRY_EN['industry'], {
    limit: limit,
    InsHiddenId: objParentId,
    SubHiddenId: objId,
    callBack: function() {
      BlurRuleEvent(obj.get(0), lid)
      var data = lid == 1
        ? CONST_INDUSTRY['industry']
        : CONST_INDUSTRY_EN['industry'];
      var pid = obj.next().next().val().split(",");
      var pvalue = [];
      for (var i = 0; i < pid.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (pid[i] == data[j].id) {
            pvalue.push(data[j].value);
          };
        };
      };
      obj.next().next().next().val(pvalue.join(","));
    }
  });
};

//职位类别
function jobTypePicker(obj, objId, objHideId, objHideParentId, lid) {
  if (obj.data("events") && obj.data("events")["click"]) {
    return;
  }
  obj.on("click", function() {
    obj.parent().industryCreator('__layer_wrapper__', true, null, objId, objHideId, objHideParentId, function() {
      BlurRuleEvent(obj.get(0), lid);
      var dataTitle = lid == 1
        ? jobtypeClass
        : jobtypeClass_EN;
      var dataP = lid == 1
        ? CONST_JOBTYPE.split("@")
        : CONST_JOBTYPE_EN.split("@");
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
      obj.next().next().next().val(pvalue.join(","));
    }, function() {
      BlurRuleEvent(obj.get(0), lid);
    }, lid);
  });
};

//日期选择（到日）
function datePickerToDay(obj, lid) {
  var myDate = new Date();
  var DEFAULTDATE = "";
  var dateFormat_value = "";
  var objName = obj.attr("name");
  switch (objName) {
    case "birth": //出生日期：｛当前年份-23｝-01-01
      DEFAULTDATE = (myDate.getFullYear() - 20).toString() + "-01-01"
      break;
    case "graduation_date": //毕业时间：｛当前年份｝-06-01
      DEFAULTDATE = (myDate.getFullYear() + 1).toString() + "-06-30"
      break;
    case "edu_date_start": //入学时间：｛当前年份-4｝-09-01
      DEFAULTDATE = (myDate.getFullYear() - 3).toString() + "-09-01"
      break;
    case "edu_date_end": //毕业时间：｛当前年份｝-06-01
      DEFAULTDATE = (myDate.getFullYear() + 1).toString() + "-06-30"
      break;
    case "project_date_start": //项目开始时间：｛当前年份｝-01-01
    case "project_date_end": //项目结束时间：｛当前年份｝-01-01
      DEFAULTDATE = myDate.getFullYear().toString() + "-01-01"
      break;
    default:
      break;
  }
  if (lid == "1") {
    obj.datepicker({
      onClose: function() {
        BlurRuleEvent(this, 1)
      },
      inline: true,
      dayNamesMin: [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
      ],
      dayNames: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      currentText: "今天",
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      selectOtherMonths: true,
      dateFormat: "yy-mm-dd",
      prevText: "上个月",
      nextText: "下个月",
      showMonthAfterYear: true,
      minDate: "-79y",
      yearRange: "-79:+10",
      defaultDate: DEFAULTDATE,
      yearSuffix: "年",
      changeYear: true
    });
  } else {
    obj.datepicker({
      onClose: function() {
        BlurRuleEvent(this, 2)
      },
      inline: true,
      dayNamesMin: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      currentText: "Today",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      selectOtherMonths: true,
      dateFormat: "yy-mm-dd",
      prevText: "Last month",
      nextText: "next month",
      showMonthAfterYear: true,
      minDate: "-79y",
      yearRange: "-79:+10",
      defaultDate: DEFAULTDATE,
      yearSuffix: "",
      changeYear: true
    });
  }
};

//日期选择（到月）
function datePickerToMonth(obj, lid) {
  if (lid == "1") {
    obj.datepicker({
      onClose: function() {
        BlurRuleEvent(this, 1)
      },
      inline: true,
      dayNamesMin: [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
      ],
      dayNames: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      currentText: "今天",
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      selectOtherMonths: true,
      dateFormat: "yy-mm",
      prevText: "上个月",
      nextText: "下个月",
      showMonthAfterYear: true,
      minDate: "-79y",
      yearRange: "-79:+10",
      defaultDate: "",
      yearSuffix: "年",
      changeYear: true
    });
  } else {
    obj.datepicker({
      onClose: function() {
        BlurRuleEvent(this, 2)
      },
      inline: true,
      dayNamesMin: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      currentText: "Today",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      selectOtherMonths: true,
      dateFormat: "yy-mm",
      prevText: "Last month",
      nextText: "next month",
      showMonthAfterYear: true,
      minDate: "-79y",
      yearRange: "-79:+10",
      defaultDate: "",
      yearSuffix: "",
      changeYear: true
    });
  }
};

//插件绑定函数
function plugBind(obj, lid) {
  obj.find(".j_plug").each(function() {
    if ($(this).parents().hasClass("j_temp") || $(this).closest(".j_certificateTemp").length > 0) {
      return;
    }
    //行业选择绑定
    if ($(this).hasClass("j_industry")) {
      industryPicker($(this), $(this).next().next().attr("id"), $(this).next().attr("id"), 5, lid)
      return;
    }
    //职业类型绑定
    if ($(this).hasClass("j_jobType")) {
      jobTypePicker($(this), $(this).attr("id"), $(this).next().attr("id"), $(this).next().next().attr("id"), lid);
      return;
    }
    //日期选择（到日）绑定
    if ($(this).hasClass("j_toDay")) {
      datePickerToDay($(this), lid);
      return;
    }
    //日期选择（到月）绑定
    if ($(this).hasClass("j_toMonth")) {
      datePickerToMonth($(this), lid);
      return;
    }
  });
};

//支持动态绑定（只需绑定一次）
function plugBindOne(lid) {
  //城市选择（单选）
  $(".j_citySingle").seleteCity({
    language: lid,
    isMultipleChoice: false,
    popUrl: "/HtmlFile/popSelectCity.shtml",
    closeCallback: function() {
      BlurRuleEvent(this, lid);
    }
  });
  $(".j_citySingleArea").seleteCity({
    language: lid,
    isMultipleChoice: false,
    popUrl: "/HtmlFile/popSelectCity.shtml",
    closeCallback: function() {
      BlurRuleEvent(this, lid);
    }
  });

  //城市选择（多选）
  $(".j_cityMany").seleteCity({
    language: lid,
    isMultipleChoice: true,
    popUrl: "/HtmlFile/popSelectCity.shtml",
    closeCallback: function() {
      BlurRuleEvent(this, lid);
    }
  });
  //学校
  $(".j_schoolName").autoSchoolName({popTop: 34, lauguage: lid});
  //专业
  $(".j_majorName").autoMajorName({popTop: 34, lauguage: lid});
}
