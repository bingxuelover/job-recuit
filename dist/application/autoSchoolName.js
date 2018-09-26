;
(function($, undefined) {
  var active = 0;
  $.fn.autoSchoolName = function(options) {
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
    $.school = {
      inputValue: null,
      popSchoolWrap: null,
      schoolListWrap: null,
      schoolTip: null
    }
    $.extend(opts, options);
    var method = {
      newArray: function() {
        if (opts.lauguage == 2) {
          constant.lauguagedata = baseDataFileEn.school;
        } else {
          constant.lauguagedata = baseDataFile.school;
        }
        // for( var i in constant.lauguagedata ){
        // 	for( var j = 0 ; j < constant.lauguagedata[i].length ; j++ ){
        // 		var row = {
        // 			sid : constant.lauguagedata[i][j][0],
        // 			pid : constant.lauguagedata[i][j][1],
        // 			value : constant.lauguagedata[i][j][2],
        // 			valueEn : constant.lauguagedata[i][j][3]
        // 		}
        // 		constant.schoolData.push(row);
        // 	}
        // };

        for (var i = 0; i < constant.lauguagedata.length; i++) {
          for (var j = 0; j < constant.lauguagedata[i].sub.length; j++) {
            if (constant.lauguagedata[i].sub[j].sub) {
              for (var k = 0; k < constant.lauguagedata[i].sub[j].sub.length; k++) {
                var row = {
                  sid: constant.lauguagedata[i].sub[j].sub[k].id,
                  pid: constant.lauguagedata[i].sub[j].id,
                  value: constant.lauguagedata[i].sub[j].sub[k].value,
                  valueEn: constant.lauguagedata[i].sub[j].sub[k].py
                }
                constant.schoolData.push(row);
              }
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
            $("body").append("<div class=\"plugSchoolListWrap j_plugSchoolListWrap\"><iframe class=\"plugiframe j_iframe\"></iframe><ul class=\"j_plugSchool\"></ul><div class=\" j_plugTip noSchool\">Your school is not found</div></div>")
          } else {
            $(".j_plugTip").html("Your school is not found");
          };
        } else {
          if ($(".j_plugSchoolListWrap").length == 0) {
            $("body").append("<div class=\"plugSchoolListWrap j_plugSchoolListWrap\"><iframe class=\"plugiframe j_iframe\"></iframe><ul class=\"j_plugSchool\"></ul><div class=\" j_plugTip noSchool\">没有找到你所在的学校，可自行填写。</div></div>")
          } else {
            $(".j_plugTip").html("未找到您所在的学校,请自行填写即可。");
          };
        }

      },
      listEffect: function(event, thisobj) {
        var top = thisobj.offset().top + opts.popTop,
          left = thisobj.offset().left + opts.popLeft;
        $.school.popSchoolWrap.css({"top": top, "left": left});
        $.school.schoolListWrap.find("li").remove();
        if (!(event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13)) {
          active = 0;
        }
        $.school.popSchoolWrap.show();
      },
      creatList: function() {
        for (var k = 0; k < constant.sortSchoolData.length; k++) {
          var flag;
          if (opts.lauguage == 2) {
            flag = (constant.sortSchoolData[k].value.substring(0, $.school.inputValue.length)).toLowerCase() == ($.school.inputValue).toLowerCase();
          } else {
            flag = constant.sortSchoolData[k].value.substring(0, $.school.inputValue.length) == $.school.inputValue || (constant.sortSchoolData[k].valueEn.substring(0, $.school.inputValue.length)).toLowerCase() == ($.school.inputValue).toLowerCase();
          }
          if ($.school.inputValue != "") {
            if (flag) {
              if ($.school.schoolListWrap.find("li").length < 6) {
                $.school.schoolListWrap.append("<li val=" + constant.sortSchoolData[k].sid + " title='" + constant.sortSchoolData[k].value + "'>" + constant.sortSchoolData[k].value + "</li>")
              }
            }
          }
        };

        $.school.schoolListWrap.find("li").eq(0).addClass("liHover").end().hover(function() {
          $(this).addClass("liHover").siblings().removeClass("liHover");
          active = $(this).index();
          constant.flagHide = false;
        }, function() {
          constant.flagHide = true
        });
      },
      element: function() {
        $.school.popSchoolWrap = $(".j_plugSchoolListWrap");
        $.school.schoolListWrap = $(".j_plugSchool");
        $.school.schoolTip = $(".j_plugTip");
      },
      listRule: function() {
        if ($.school.schoolListWrap.find("li").length == 0) {
          $.school.schoolListWrap.hide();
          $.school.schoolTip.show();
        } else {
          $.school.schoolListWrap.show();
          $.school.schoolTip.hide();
        }
        if (constant.thisObj.val() == "") {
          $.school.popSchoolWrap.hide();
        };
        if ($.school.schoolListWrap.is(":visible")) {
          $(".j_iframe").show().height($.school.schoolListWrap.height());
        } else {
          $(".j_iframe").hide();
        };
      },
      keyCode: function(event) {
        switch (event.keyCode) {
          case 40:
            if (active < $.school.schoolListWrap.find("li").length - 1) {
              active++;
            }
            $.school.schoolListWrap.find("li").eq(active).addClass("liHover").siblings().removeClass("liHover");

            break;
          case 38:
            if (active >= 1) {
              active--;
            }
            $.school.schoolListWrap.find("li").eq(active).addClass("liHover").siblings().removeClass("liHover");

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
            $.school.schoolListWrap.find("li").each(function() {
              if ($(this).attr("class") == "liHover") {
                constant.thisObj.val($(this).text()).blur();
                constant.thisObj.next().val($(this).attr("val"));
                window.BlurRuleEvent && window.BlurRuleEvent(constant.thisObj, opts.lauguage);
                $.school.popSchoolWrap.hide();
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
          $.school.inputValue = constant.thisObj.val();
          method.listEffect(event, $(this));
          method.creatList();
          method.listRule();
          if (!$.school.schoolListWrap.find("li").length == 0) {
            method.keyCode(event);
          }
        }).unbind("blur").bind("blur", function() {
          if (constant.flagHide) {
            $.school.popSchoolWrap.hide();
            $(this).next().val(9999);
          }
          for (var k = 0; k < constant.sortSchoolData.length; k++) {
            if ($.school.inputValue != "") {
              if ($(this).val() == constant.sortSchoolData[k].value) {
                $(this).next().val(constant.sortSchoolData[k].sid)
              }
            }
          };

        }).unbind("keydown").bind("keydown", function(event) {
          if (!$.school.schoolListWrap.find("li").length == 0) {
            method.keyEnter(event);
          }
        })
        $.school.schoolListWrap.find("li").die("click").live("click", function() {
          constant.thisObj.val($(this).text());
          constant.thisObj.next().val($(this).attr("val"));
          window.BlurRuleEvent && window.BlurRuleEvent(constant.thisObj, opts.lauguage);
          $.school.popSchoolWrap.hide();
        })
      });
    } else {
      $(this).die("focus").live("focus", function() {
        constant.thisObj = $(this);
        method.creatPop();
        method.element();

        constant.thisObj.unbind("keyup").bind("keyup", function(event) {
          $.school.inputValue = constant.thisObj.val();
          method.listEffect(event, $(this));
          method.creatList();
          method.listRule();
          if (!$.school.schoolListWrap.find("li").length == 0) {
            method.keyCode(event);
          }
        }).unbind("blur").bind("blur", function() {
          if (constant.flagHide) {
            $.school.popSchoolWrap.hide();
            $(this).next().val(9999);
          }
          for (var k = 0; k < constant.sortSchoolData.length; k++) {
            if ($.school.inputValue != "") {
              if ($(this).val() == constant.sortSchoolData[k].value) {
                $(this).next().val(constant.sortSchoolData[k].sid)
              }
            }
          };

        }).unbind("keydown").bind("keydown", function(event) {
          if (!$.school.schoolListWrap.find("li").length == 0) {
            method.keyEnter(event);
          }
        })
        $.school.schoolListWrap.find("li").die("click").live("click", function() {
          constant.thisObj.val($(this).text());
          constant.thisObj.next().val($(this).attr("val"));
          window.BlurRuleEvent && window.BlurRuleEvent(constant.thisObj, opts.lauguage);
          $.school.popSchoolWrap.hide();
        })
      });
    }
    //$(this).focus(function(){
    //			constant.thisObj = $(this);
    //			method.creatPop();
    //			method.element();
    //
    //
    //			constant.thisObj.unbind("keyup").bind("keyup",function(event){
    //				$.school.inputValue = constant.thisObj.val();
    //				method.listEffect(event,$(this));
    //				method.creatList();
    //				method.listRule();
    //				if( !$.school.schoolListWrap.find("li").length == 0 ){
    //					method.keyCode(event);
    //				}
    //			}).unbind("blur").bind("blur",function(){
    //				if( constant.flagHide ){
    //					$.school.popSchoolWrap.hide();
    //					$(this).next().val(9999);
    //				}
    //				for( var k = 0; k < constant.sortSchoolData.length ; k++ ){
    //					if( $.school.inputValue != "" ){
    //						if( $(this).val() == constant.sortSchoolData[k].value ){
    //							$(this).next().val(constant.sortSchoolData[k].sid)
    //						}
    //					}
    //				};
    //
    //			}).unbind("keydown").bind("keydown",function(event){
    //				if( !$.school.schoolListWrap.find("li").length == 0 ){
    //					method.keyEnter(event);
    //				}
    //			})
    //			$.school.schoolListWrap.find("li").die("click").live("click",function(){
    //				constant.thisObj.val($(this).text());
    //				constant.thisObj.next().val($(this).attr("val"));
    //				$.school.popSchoolWrap.hide();
    //			})
    //		});

  }

})(jQuery);
