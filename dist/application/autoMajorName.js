;
(function($, undefined) {
  var activeM = 0;
  $.fn.autoMajorName = function(options) {
    var constant = {
      schoolData: [],
      sortSchoolData: [],
      thisObj: this,
      flagHide: true,
      lauguagedata: null
    };
    var opts = {
      popTop: 32,
      popLeft: 0,
      lauguage: 0
    };
    $.major = {
      inputValue: null,
      popSchoolWrap: null,
      schoolListWrap: null,
      schoolTip: null
    }
    $.extend(opts, options);
    var method = {
      newArray: function() {
        if (opts.lauguage == 2) {
          constant.lauguagedata = major_en
        } else {
          constant.lauguagedata = major;
        };
        for (var i = 0; i < constant.lauguagedata.length; i++) {
          if (constant.lauguagedata[i]["sub"]) {
            for (var j = 0; j < constant.lauguagedata[i]["sub"].length; j++) {
              var row = {
                sid: constant.lauguagedata[i]["sub"][j].id,
                pid: constant.lauguagedata[i].id,
                pvalue: constant.lauguagedata[i].value,
                value: constant.lauguagedata[i]["sub"][j].value,
                valueEn: constant.lauguagedata[i]["sub"][j].py
              }
              constant.schoolData.push(row);
            }
          }
        };
        if (opts.lauguage == 2) {
          constant.sortSchoolData = constant.schoolData.sort(function(a, b) {
            return a.value.localeCompare(b.value)
          });
        } else {
          constant.sortSchoolData = constant.schoolData.sort(function(a, b) {
            return a.valueEn.localeCompare(b.valueEn)
          });
        }

      },
      creatPop: function() {
        if (opts.lauguage == 2) {
          if ($(".j_plugSchoolListWrap").length == 0) {
            $("body").append("<div class=\"plugSchoolListWrap j_plugSchoolListWrap\"><iframe class=\"plugiframe j_iframe\"></iframe><ul class=\"j_plugSchool\"></ul><div class=\" j_plugTip noSchool\">Your professional is not found</div></div>")
          } else {
            $(".j_plugTip").html("Your professional is not found");
          };
        } else {
          if ($(".j_plugSchoolListWrap").length == 0) {
            $("body").append("<div class=\"plugSchoolListWrap j_plugSchoolListWrap\"><iframe class=\"plugiframe j_iframe\"></iframe><ul class=\"j_plugSchool\"></ul><div class=\" j_plugTip noSchool\">未找到你所填写的专业，按照即将获得证书的专业名称据实填写。</div></div>")
          } else {
            $(".j_plugTip").html("未找到您所填写的专业，按照即将获得证书的专业名称据实填写。");
          };

        };

      },
      listEffect: function(event, thisobj) {
        var top = thisobj.offset().top + opts.popTop,
          left = thisobj.offset().left + opts.popLeft;
        $.major.popSchoolWrap.css({"top": top, "left": left});
        $.major.schoolListWrap.find("li").remove();
        if (!(event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13)) {
          activeM = 0;
        }
        $.major.popSchoolWrap.show();
      },
      creatList: function() {
        for (var k = 0; k < constant.sortSchoolData.length; k++) {
          var flag;
          if (opts.lauguage == 2) {
            flag = (constant.sortSchoolData[k].value.substring(0, $.major.inputValue.length)).toLowerCase() == ($.major.inputValue).toLowerCase();
          } else {
            flag = constant.sortSchoolData[k].value.substring(0, $.major.inputValue.length) == $.major.inputValue || (constant.sortSchoolData[k].valueEn.substring(0, $.major.inputValue.length)).toLowerCase() == ($.major.inputValue).toLowerCase();
          }
          if ($.major.inputValue != "") {
            if (flag) {
              if ($.major.schoolListWrap.find("li").length < 11) {
                $.major.schoolListWrap.append("<li pvalue=" + constant.sortSchoolData[k].pvalue + " val=" + constant.sortSchoolData[k].sid + " pid=" + constant.sortSchoolData[k].pid + " title='" + constant.sortSchoolData[k].value + "'>" + constant.sortSchoolData[k].value + "</li>")
              }
            }
          }
        };

        $.major.schoolListWrap.find("li").eq(0).addClass("liHover").end().hover(function() {
          $(this).addClass("liHover").siblings().removeClass("liHover");
          activeM = $(this).index();
          constant.flagHide = false;
        }, function() {
          constant.flagHide = true
        });
      },
      element: function() {
        $.major.popSchoolWrap = $(".j_plugSchoolListWrap");
        $.major.schoolListWrap = $(".j_plugSchool");
        $.major.schoolTip = $(".j_plugTip");
      },
      listRule: function() {
        if ($.major.schoolListWrap.find("li").length == 0) {
          $.major.schoolListWrap.hide();
          $.major.schoolTip.show();
          //$.major.popSchoolWrap.hide();
        } else {
          //$.major.popSchoolWrap.show();
          $.major.schoolListWrap.show();
          $.major.schoolTip.hide();
        }
        if (constant.thisObj.val() == "") {
          $.major.popSchoolWrap.hide();
        };
        if ($.major.schoolListWrap.is(":visible")) {
          $(".j_iframe").show().height($.major.schoolListWrap.height());
        } else {
          $(".j_iframe").hide();
        };
      },
      keyCode: function(event) {
        switch (event.keyCode) {
          case 40:
            if (activeM < $.major.schoolListWrap.find("li").length - 1) {
              activeM++;
            }
            $.major.schoolListWrap.find("li").eq(activeM).addClass("liHover").siblings().removeClass("liHover");

            break;
          case 38:
            if (activeM >= 1) {
              activeM--;
            }
            $.major.schoolListWrap.find("li").eq(activeM).addClass("liHover").siblings().removeClass("liHover");

            break;
        }
      },
      keyEnter: function(event) {
        switch (event.keyCode) {
          case 40:
            event.preventDefault();
            break;
          case 38:
            event.preventDefault();
            break;
          case 13:
            event.preventDefault();
            $.major.schoolListWrap.find("li").each(function() {
              if ($(this).attr("class") == "liHover") {
                constant.thisObj.val($(this).text()).blur();
                constant.thisObj.next().val($(this).attr("val"));
                constant.thisObj.next().next().val($(this).attr("pid"));
                constant.thisObj.next().next().next().val($(this).attr("pvalue"));
                $.major.popSchoolWrap.hide();
              }
            })
            break;
        }
      }
    };
    method.newArray();
    if ($.fn.on) {
      $(document).off("focus").on("focus", this.selector, function() {
        constant.thisObj = $(this);
        method.creatPop();
        method.element();

        constant.thisObj.unbind("keyup").bind("keyup", function(event) {
          $.major.inputValue = constant.thisObj.val();
          method.listEffect(event, $(this));
          method.creatList();
          method.listRule();
          if (!$.major.schoolListWrap.find("li").length == 0) {
            method.keyCode(event);
          }
        }).unbind("blur").bind("blur", function() {
          if (constant.flagHide) {
            $.major.popSchoolWrap.hide();
            $(this).next().val(9999);
            $(this).next().next().val(9999);
            if (opts.lauguage == 1) {
              $(this).next().next().next().val("其他");
            } else {
              $(this).next().next().next().val("Other");
            }
          }
          for (var k = 0; k < constant.sortSchoolData.length; k++) {
            if ($.major.inputValue != "") {
              if ($(this).val() == constant.sortSchoolData[k].value) {
                //console.log(0);
                $(this).next().val(constant.sortSchoolData[k].sid);
                $(this).next().next().val(constant.sortSchoolData[k].pid);
                $(this).next().next().next().val(constant.sortSchoolData[k].pvalue);
              }
            }
          };

        }).unbind("keydown").bind("keydown", function(event) {
          if (!$.major.schoolListWrap.find("li").length == 0) {
            method.keyEnter(event);
          }
        })
        $.major.schoolListWrap.find("li").die("click").live("click", function() {
          constant.thisObj.val($(this).text());
          constant.thisObj.next().val($(this).attr("val"));
          constant.thisObj.next().next().val($(this).attr("pid"));
          constant.thisObj.next().next().next().val($(this).attr("pvalue"));
          $.major.popSchoolWrap.hide();
        })
      });
    } else {
      $(this).die("focus").live("focus", function() {
        constant.thisObj = $(this);
        method.creatPop();
        method.element();

        constant.thisObj.unbind("keyup").bind("keyup", function(event) {
          $.major.inputValue = constant.thisObj.val();
          method.listEffect(event, $(this));
          method.creatList();
          method.listRule();
          if (!$.major.schoolListWrap.find("li").length == 0) {
            method.keyCode(event);
          }
        }).unbind("blur").bind("blur", function() {
          if (constant.flagHide) {
            $.major.popSchoolWrap.hide();
            $(this).next().val(9999);
            $(this).next().next().val(9999);
            if (opts.lauguage == 1) {
              $(this).next().next().next().val("其他");
            } else {
              $(this).next().next().next().val("Other");
            };
          }
          for (var k = 0; k < constant.sortSchoolData.length; k++) {
            if ($.major.inputValue != "") {
              if ($(this).val() == constant.sortSchoolData[k].value) {
                $(this).next().val(constant.sortSchoolData[k].sid);
                $(this).next().next().val(constant.sortSchoolData[k].pid);
                $(this).next().next().next().val(constant.sortSchoolData[k].pvalue);
              }
            }
          };

        }).unbind("keydown").bind("keydown", function(event) {
          if (!$.major.schoolListWrap.find("li").length == 0) {
            method.keyEnter(event);
          }
        })
        $.major.schoolListWrap.find("li").die("click").live("click", function() {
          constant.thisObj.val($(this).text());
          constant.thisObj.next().val($(this).attr("val"));
          constant.thisObj.next().next().val($(this).attr("pid"));
          constant.thisObj.next().next().next().val($(this).attr("pvalue"));
          $.major.popSchoolWrap.hide();
        })
      });
    }

  }

})(jQuery);
