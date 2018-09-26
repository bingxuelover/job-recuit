//验证必填项规则
function BlurRuleEvent(obj, lid) {

  $self = $(obj);
  //关闭提示语
  tipClosed($self);
  if ($self.is("input[type='radio']") || $self.is("input[type='checkbox']") || $self.attr("rule") == undefined) {
    return;
  }
  var errBox = $self.nextAll(".j_errorWrap").find(".j_errorMain"),
    errMsg = errBox.find("p"),
    rule = JSON.parse($self.attr("rule"));
  if ($self.is(":file")) { //file
    errBox = $self.closest(".j_fileBox").nextAll(".j_errorWrap").find(".j_errorMain");
    errMsg = errBox.find("p");
    if (rule.must == true && $.trim($self.val()) == "" && (!$self.attr("data-value") || $self.attr("data-value") == '')) {
      if (lid == 1) {
        errMsg.html($self.attr("err") || "此项为必填项");
      } else {
        errMsg.html($self.attr("err") || "this option is required");
      }
      errBox.show();
    } else {
      errBox.hide();
    }
    return;
  }
  if ($self.hasClass("j_checkBoxWrap")) { //复选框
    if (rule.must == true) {
      var len = 0;
      $self.find(":checkbox").each(function() {
        if ($(this).attr("checked") == "checked" || $(this).attr("checked") == true) {
          len++;
        }
      });
      if (len == 0) {
        if (lid == 1) {
          errMsg.html($self.attr("err") || "此项为必填项");
        } else {
          errMsg.html($self.attr("err") || "this option is required");
        }
        errBox.show();
      } else {
        if (len > rule.max) {
          if (lid == 1) {
            errMsg.html("最多只能选" + rule.max + "项。");
          } else {
            errMsg.html(rule.max + "items max");
          }
          errBox.show();
        } else {
          errBox.hide();
        }
      }
    }
    return;
  }

  if ($self.hasClass("j_radioBox")) { //单选框

    if (rule.must == true) {
      var len = 0;
      $self.find(":radio").each(function() {
        if ($(this).attr("checked") == "checked" || $(this).attr("checked") == true) {
          len++;
        }
      });

      if (len == 0) {
        if (lid == 1) {
          errMsg.html($self.attr("err") || "此项为必填项");
        } else {
          errMsg.html($self.attr("err") || "this option is required");
        }
        errBox.show();
      } else {
        errBox.hide();
      };
    }
    return;
  };
  if (rule.must == true) { //必填项验证

    //必填项没有填写
    if (($.trim($self.val()) == "" || $self.val().length == 0 || $self.val() == "-1" || $self.val() == $self.attr("data-value"))) {
      if ($self.is("input[type='text']") || $self.is("textarea")) {
        if (lid == 1) {
          errMsg.html($self.attr("err") || "此项为必填项");
        } else {
          errMsg.html($self.attr("err") || "this option is required");
        }
      } else {
        errMsg.html($self.attr("err"));
      }
      errBox.show();
      return;
    }
    //学校名称不得低于三个字
    // if ($self.attr("id") === "education_experience_school_name" && $self.val().length < 3) {
    if ($self.hasClass("j_schoolName") && $self.val().length < 3) {

      if ($self.is("input[type='text']") || $self.is("textarea")) {
        if (lid == 1) {
          errMsg.html($self.attr("err") || "此项为必填项");
        } else {
          errMsg.html($self.attr("err") || "this option is required");
        }
      } else {
        errMsg.html($self.attr("err"));
      }
      errBox.show();
      return;
    } else {
      errBox.hide();
    }
    //超出最大字符数
    if ($self.val().length > rule.max) {
      if ($self.is("input[type='text']") || $self.is("textarea")) {
        if (lid == 1) {
          errMsg.html("最多能填写" + rule.max + "个字符");
        } else {
          errMsg.html(rule.max + "characters can be input");
        }
        errBox.show();
        return;
      }
    }
  }
  //input输入框格式验证
  if ($self.is("input[type='text']")) {
    if (rule.must == false && !$self.val()) 
      return;
    switch ($self.attr("name")) {
      case 'name': //验证姓名
        if (!ContainsExpChar($self.val())) {
          errMsg.html("不能包含特殊字符");
          errBox.show();
        }
        if (inName($self.val())) {
          errMsg.html("姓名格式输入不正确");
          errBox.show();
        }
        break;
      case 'id_card': //验证身份证号
        if ($("select:[name='id_card_type']").val() == "7") {
          if (!isIdCardNo($self.val())) {
            errMsg.html("身份证号码填写有误或与填写的出生日期不符。");
            errBox.show();
          }
        } else {
          if ($self.val() != "") {
            if (!isCard($self.val())) {
              errMsg.html("证件号码填写有误。");
              errBox.show();
            }
          }
        }
        break;
      case 'stature': //验证身高
        if (isNaN($self.val()) || $self.val().length > 3) {
          errMsg.html("只能填写3位以内的数字");
          errBox.show();
        } else if (parseInt($self.val()) < 80 || parseInt($self.val()) > 230) {
          errMsg.html("请填写正确的身高");
          errBox.show();
        }
        break;
      case 'avoirdupois': //验证体重
        if (isNaN($self.val()) || $self.val().length > 3) {
          errMsg.html("只能填写3位以内的数字");
          errBox.show();
        };
        break;
      case 'postal_code': //邮政编码
        if (isNaN($self.val())) {
          errMsg.html("邮政编码只能填写数字。");
          errBox.show();
        };
        break;
      case 'english_score': //英语分数
        var patn = /^\d{1,4}$/;
        if (isNaN($self.val()) || $self.val().length > 4) {
          errMsg.text("只能输入4位数字。");
          errBox.show();
        };
        break;
      case 'edu_time_long': //学制
        var patn = /^\d{1}$/;
        if (isNaN($self.val()) || $self.val().length > 1) {
          errMsg.text("只能输入1位数字。");
          errBox.show();
        };
        break;
      case 'mobile_number': //手机号码
        if (!isMobile($self.val())) {
          errMsg.html("请填写有效的手机号码");
          errBox.show();
        }
        break;
      case 'emergency_number': //紧急联系电话
        if (!isPhone($self.val())) {
          errMsg.html("请填写有效的联系电话");
          errBox.show();
        } else if (isSame($self.val(), $('#contact_info_mobile_number').val())) {
          errMsg.html("紧急联系电话不能和个人手机号码相同");
          errBox.show();
        }
        break;
      case 'phone': //电话号码
        if (!isPhone($self.val())) {
          if (lid == 1) {
            errMsg.text("请填写正确的联系方式。(如：13588888888、021-88888888、021-88888888-888)");
          } else {
            errMsg.text("Please fill in your contact exactly.(Example：13588888888、021-88888888、021-88888888-888).");
          }
          errBox.show();
        }
        break;
      case 'email': //电子邮箱
        if (!isEmail($self.val())) {
          errMsg.html("电子邮箱格式填写错误");
          errBox.show();
        };
        break;
      case 'hukou_city':
        break;
      default:
        if (!ContainsExpChar($self.val())) {
          errMsg.html("不能包含特殊字符");
          errBox.show();
        }
        break;
    }
  }
  if ($self.hasClass("j_dateStar")) { //关联时间 - 开始时间验证是否晚于结束时间
    var item = $self.closest(".j_itemWrap"),
      itemEnd = item.next(),
      endObj = itemEnd.find(".j_dateEnd"),
      endTime = endObj.val(),
      starLabel = trim(item.find(".j_itemTitle").text()),
      endLabel = trim(itemEnd.find(".j_itemTitle").text());
    if (endTime != endObj.attr("data-value")) {
      if ($self.val() > endTime) {
        if (lid == 1) {
          errMsg.html(starLabel + "不能晚于" + endLabel);
        } else {
          errMsg.html(starLabel + " can not be later than " + endLabel);
        }
        errBox.show();
        return;
      } else {
        errClosed(endObj);
      }
    }
  }
  if ($self.hasClass("j_dateEnd")) { //关联时间 - 结束时间验证是否早于开始时间
    var item = $self.closest(".j_itemWrap"),
      itemStar = item.prev(),
      starObj = itemStar.find(".j_dateStar"),
      starTime = starObj.val(),
      starLabel = trim(itemStar.find(".j_itemTitle").text()),
      endLabel = trim(item.find(".j_itemTitle").text());
    if (starTime != starObj.attr("data-value")) {
      if ($self.val() < starTime) {
        if (lid == 1) {
          errMsg.html(endLabel + "不能早于" + starLabel);
        } else {
          errMsg.html(endLabel + " can not be earlier than " + starLabel);
        }
        errBox.show();
        return;
      } else {
        errClosed(starObj);
      };
    }
  }
  //英文模板文本框不能输入汉字
  if (lid == 2) {
    if ($self.val() && $self.is("input") || $self.is("textarea")) {
      var reg = /.*[\u4e00-\u9fa5]+.*$/;
      if (reg.test($self.val())) {
        errMsg.html("Please don't input Chinese");
        errBox.show();
        return;
      }
    }
  }
}
function trim(str) { //去除空格
  return str.replace("*", "").replace("：", "").replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
}
function ContainsExpChar(val) { //是否包含特殊符号
  var patrn = new RegExp("[`~!@#$%^&*=|{}':;',\\[\\].<>/?~！@#￥……&*&;—|{}【】‘；：”“'。，、？]");
  if (!patrn.test(val)) 
    return true;
  return false;
}
function inName(str) { //判断姓名格式
  var pattan = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
  if (!pattan.test(str)) 
    return true;
  return false;
}
function isMobile(num) { //验证手机格式
  // var patn = /^[1][34578][0-9]{9}$/;
  var patn = /^[0-9]{5,11}$/;
  if (patn.test(num)) {
    return true;
  } else {
    return false;
  };
};

function isPhone(num) { //验证电话号码
  var patn = /^([\d-+]*)$/;
  if (patn.test(num)) {
    return true;
  } else {
    return false;
  };
};
function isSame(num, other) {
  if (num == other) {
    return true;
  } else {
    return false;
  };
}
function isEmail(num) { //验证邮箱格式
  var patn = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
  if (patn.test(num)) {
    return true;
  } else {
    return false;
  };
};
function isBlog(num) { //验证博客
  var patn = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
  if (patn.test(num)) {
    return true;
  } else {
    return false;
  };

};
function isCard(num) {
  var patn = /^([0-9a-zA-Z]*)$/;
  if (patn.test(num)) {
    return true;
  } else {
    return false;
  };
};
function isIdCardNo(num) { //校验身份证合法性
  num = num.toUpperCase();
  var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };

  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    return false;
  }

  //校验地区
  if (aCity[parseInt(num.substr(0, 2))] == null) {
    // 非法地区
    return false;
  }

  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  var len,
    re;
  len = num.length;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //输入的身份证号里出生日期不对！
      return false;
    } else {
      //将15位身份证转成18位
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        i;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      num += arrCh[nTemp % 11];
      //返回18位的结果
      //return num;
      return true;
    }
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //输入的身份证号里出生日期不对！
      return false;
    } else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        //18位身份证的校验码不正确！应该是 valnum 的值
        return false;
      }
      //返回18位的结果
      //return num;
      var cardDate = arrSplit[2] + "-" + arrSplit[3] + "-" + arrSplit[4];
      var userDate = $('#person_info_birth').val();
      if (cardDate != userDate) {
        return false;
      }
      return true;
    }
  }
  return false;
}
