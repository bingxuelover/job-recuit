/**
 * Author:weishuheng
 * Time:2015-07-07
 * select.js是控件js文件
 * @class
 * @static
 * @param {Object} 传递参数
        {
            "trigger" : "click",            //触发事件类型
            "lid" : 1,                      //语言种类，1中文，其他为英文
            "data" : null,                  //数据源
            "hasSelect" : true,             //是否存在select(若有联动，联动项的hasSelect与父级一致)
            "multiple" : false,             //是否有联动项
            "width" : 200,                  //模拟下拉框宽度
            "optionWidth" : null,           //模拟下拉框option列表宽度
            "multipleSelectDoom" : null,    //联动的select元素
            "multipleDivDoom" : null,       //联动的模拟下拉框
            "multipleWidth" : 200,          //联动的模拟下拉框的宽度
            "multipleOptionWidth" : null,   //联动模拟下拉框option列表宽度
            "selectId" : -1,                //已选中option的value值
            "max" : 10,                     //option显示最大条数
            "change" : null,                //模拟下拉框的change事件
            "init" : null                   //模拟下拉框初始化事件
        }
 * @example
    selectBox.js适用于3种场景
    1、无关联要求，单独对某个select下拉框以模拟下拉框的形式展现
        $("select").select();
    2、页面不存在select，但已经存在模拟下拉框的代码(下拉框数据来自传递参数)
        $("#selectBox").select({
            data : select.data,
            hasSelect : false
        });
    3、有关联要求的两个select，且后一个select的下拉框数据根据前一个下拉框的选中值展现
        $("select").select({
            multipleSelectDoom : $("#childSelector"),
            multiple : true,
            data : select.data
        });
        或者
        $("#selectBox").select({
            multipleDivDoom : $("#childSelector"),
            multiple : true,
            data : select.data
        });
 * @bug
        1、暂时不支持动态添加的下拉框
        2、不支持三级联动下拉框
        3、select的change事件必须在模拟下拉框初始化之前设置完成
        4、select的change事件value值的改变不会同步到selectBox
**/
(function($) {
  $.fn.select = function(options) {
    var el = this;
    if ($(el).length > 1) {
      $(el).each(function() {
        $(this).select(options);
      });
      return;
    }
    if ($(el).length == 0) {
      return;
    }
    if (!options) {
      options = {}
    };
    var opts = {
      "trigger": "click", //触发事件类型
      "lid": 1, //语言种类，1中文，其他为英文
      "data": null, //数据源
      "hasSelect": true, //是否存在select(若有联动，联动项的hasSelect与父级一致)
      "multiple": false, //是否有联动项
      "width": 200, //模拟下拉框宽度
      "optionWidth": null, //模拟下拉框option列表宽度
      "multipleSelectDoom": null, //联动的select元素
      "multipleDivDoom": null, //联动的模拟下拉框
      "multipleWidth": 200, //联动的模拟下拉框的宽度
      "multipleOptionWidth": null, //联动模拟下拉框option列表宽度
      "selectId": -1, //已选中option的value值
      "max": 10, //option显示最大条数
      "change": null, //模拟下拉框的change事件
      "init": null, //模拟下拉框初始化事件
      "before": null,
      "close": null,
      "className": null
    };
    $.extend(opts, options);

    var map = {
      "selectDoom": null, //select元素
      "divDoom": null, //模拟下拉框元素
      "html": null, //selectBox div代码
      "data": null, //下拉列表数据
      "difaultId": null, //option:selected的value值
      "difaultValue": null, //option:selected的text值
      "optionHeight": 30, //option高度
      "tip": null, //默认提示语
      "listBox": null, //模拟下拉框的下拉列表容器 j_selectList
      "selected": null, //模拟下拉框显示已选择值容器 j_selectTitle
      "li": null, //模拟下拉框下拉列表项 j_selectLi
      "width": null, //模拟下拉框宽度
      "slideDownTime": 120, //模拟下拉框显示下拉列表所需时间
      "slideUpTime": 50 //模拟下拉框隐藏下拉列表所需时间
    };
    if (opts.multiple) {
      var multipleMap = {
        "selectDoom": null, //联动项的select元素
        "divDoom": null, //联动项模拟下拉框
        "width": null, //联动项模拟下拉框的宽度
        "listBox": null, //联动项模拟下拉框的下拉列表容器 j_selectList
        "selected": null, //联动项模拟下拉框显示已选择值容器 j_selectTitle
        "dataId": null, //父级项change后的value值
        "data": null //联动项下拉数据
      };
    };
    var utils = {
      init: function() {

        //map.html存储selectBox的div代码
        map.html = utils.selectBoxCreate();
        //重置map中doom缺失项
        utils.doomReset();
        //设置data数据源
        utils.dataCreate();
        //设置模拟下拉框的宽度：map.width
        if (options.width || (opts.hasSelect && map.selectDoom.is(":hidden"))) {
          map.width = opts.width;
        } else {
          if (!opts.hasSelect || map.divDoom.attr("data-value")) {
            map.width = map.divDoom.width();
          } else {
            map.width = map.selectDoom.width();
          }
        }
        //设置select选中的value值与相应的text值map.difaultId、map.difaultValue
        if (options.selectId || !opts.hasSelect) {
          map.difaultId = opts.selectId;
          for (var i = 0; i < opts.data.length; i++) {
            if (opts.data[i].id == opts.selectId) {
              map.difaultValue = opts.data[i].value;
              break;
            }
          }
        } else {
          map.difaultId = map.selectDoom.val();
          map.difaultValue = map.selectDoom.find("option:selected").text();
        }
        if (opts.hasSelect) {
          //隐藏select
          map.selectDoom.hide();
          //重置隐藏select的下拉项
          utils.selectReset(map.selectDoom, map.data, map.difaultId);
        }
        //模拟下拉框设置
        // setTimeout(function() {
        utils.selectBoxReset();
        //联动项初始化
        utils.multiple();
        //事件绑定
        utils.eventBind();
        // }, 300)

        if (opts.init) {
          opts.init();
        }
      },
      doomReset: function() {
        if (el.is("select")) { //绑定的doom元素为select
          map.selectDoom = $(el);
          //若页面不存在该select模拟下拉框的div代码，生成一个
          if (!map.selectDoom.prev().hasClass("j_selectBox")) {
            map.selectDoom.before(map.html);
          };
          map.divDoom = map.selectDoom.prev();
        } else {
          map.divDoom = $(el);
          if (opts.hasSelect) {
            map.selectDoom = map.divDoom.next();
          }
        }
      },
      eventBind: function() {
        //绑定触发显示模拟下拉框list
        map.selected.bind(opts.trigger, function() {
          if (map.listBox.is(":hidden") && !map.divDoom.hasClass("dis")) {
            utils.listBoxShow();
          }
        });

        // $('.j_tabWrap').on(opts.trigger, map.selected, function(event){
        //     event.preventDefault();
        //     if(map.listBox.is(":hidden") && !map.divDoom.hasClass("dis")){
        //         utils.listBoxShow();
        //     }
        // });

        // $(map.selected).parents('form').each(function(index, element){
        //    plugBind($(element), 1);
        // });

        //绑定选取获取事件
        map.listBox.delegate(".j_selectLi", "click", function() {
          if ($(this).attr("data-value") != map.selected.attr("data-value")) {
            map.selected.attr("data-value", $(this).attr("data-value"));
            map.selected.attr("title", $(this).text());
            map.selected.text($(this).text());
            //若有联动，对联动项进行数据初始化
            if (opts.multiple) {
              multipleMap.dataId = map.selected.attr("data-value");
              if (multipleMap.dataId == -1) {
                multipleMap.divDoom.addClass("dis");
                multipleMap.listBox.html("");
                multipleMap.selected.attr({"data-value": "-1", "title": map.tip}).text(map.tip);
                if (opts.hasSelect) {
                  multipleMap.selectDoom.html('<option selected="selected" value="-1">' + map.tip + '</option>');
                }
              } else {
                multipleMap.divDoom.removeClass("dis");
                //联动项下拉数据multipleMap.data重置
                for (var i = 0; i < opts.data.length; i++) {
                  if (opts.data[i].id == multipleMap.dataId) {
                    multipleMap.data = opts.data[i].sub;
                    break;
                  }
                };
                //生成联动项的模拟下拉框
                if (opts.hasSelect) {
                  multipleMap.selectDoom.select({"data": multipleMap.data, "selectId": -1});
                } else {
                  multipleMap.divDoom.select({"data": multipleMap.data, "selectId": -1, "hasSelect": false});
                }
              }
            }
            if (opts.change) {
              opts.change();
            };
            //隐藏select触发change事件
            if (opts.hasSelect) {
              map.selectDoom.find("option").each(function() {
                if ($(this).attr("value") == map.selected.attr('data-value')) {
                  $(this).attr("selected", true);
                  return false;
                }
              });
              //map.selectDoom.find("option[value = " + map.selected.attr('data-value') + "]").attr("selected", true);
              map.selectDoom.change();
            }
          }
          utils.listBoxhide();
        });
      },
      multiple: function() {
        if (opts.multiple) {
          //重置opts中联动项doom缺失项
          if (opts.hasSelect) {
            if (opts.multipleSelectDoom) {
              multipleMap.selectDoom = opts.multipleSelectDoom;
            } else {
              multipleMap.selectDoom = opts.multipleDivDoom.next();
            }
            if (!multipleMap.selectDoom.prev().hasClass("j_selectBox")) {
              multipleMap.selectDoom.before(map.html);
            }
            multipleMap.divDoom = opts.multipleSelectDoom.prev();
          } else {
            multipleMap.divDoom = opts.multipleDivDoom;
          }
          //联动项初始化
          multipleMap.listBox = multipleMap.divDoom.find(".j_selectList");
          multipleMap.selected = multipleMap.divDoom.find(".j_selectTitle");
          multipleMap.data = null;
          multipleMap.divDoom.addClass("dis");
          if (options.multipleWidth || (opts.hasSelect && multipleMap.selectDoom.is(":hidden"))) {
            multipleMap.width = opts.multipleWidth;
          } else {
            if (opts.hasSelect) {
              multipleMap.width = multipleMap.selectDoom.width();
            } else {
              multipleMap.width = multipleMap.divDoom.width();
            }
          }
          multipleMap.divDoom.css("width", multipleMap.width + "px");
          multipleMap.selected.attr({"data-value": -1, "title": map.tip}).html(map.tip);
        }
      },
      selectReset: function(selectDoom, data, difaultId) { //重置select，保证select与selectBox的选项一致
        selectDoom.html("");
        for (var i = 0; i < data.length; i++) {
          selectDoom.append('<option value="' + data[i].id + '">' + data[i].value + '</option>');
        }
        selectDoom.find("option").each(function() {
          if ($(this).attr("value") == difaultId) {
            $(this).attr("selected", true);
            return false;
          }
        });
        //selectDoom.find("option[value = " + difaultId + "]").attr("selected", true);
      },
      selectBoxCreate: function() { //生成selectBox div代码
        var selectBox = '<div class="selectBox j_selectBox' + (
        opts.className || "") + '">';
        selectBox += '<div class="selectTitle j_selectTitle"></div>';
        selectBox += '<div class="selectList j_selectList" style="display:none"></div>';
        selectBox += '</div>';
        return selectBox;
      },
      selectBoxReset: function() { //初始化selectBox
        map.divDoom.css("width", map.width + "px");
        map.listBox = map.divDoom.find(".j_selectList");
        map.selected = map.divDoom.find(".j_selectTitle");
        map.selected.attr({"data-value": map.difaultId, "title": map.difaultValue}).html(map.difaultValue);
        map.listBox.css({
          "max-height": opts.max * map.optionHeight + "px",
          "width": opts.optionWidth || (map.width - 2) + "px"
        });

        map.listBox.html("");
        for (var i = 0; i < map.data.length; i++) {
          map.listBox.append('<div class="selectList_li j_selectLi" data-value="' + map.data[i].id + '" title="' + map.data[i].value + '">' + map.data[i].value + '</div>');
        }
        map.li = map.listBox.find(".j_selectLi");
        if (utils.isIE6()) {
          if (map.li.length > opts.max) {
            map.listBox.css("height", opts.max * map.optionHeight + "px");
          };
          map.li.hover(function() {
            $(this).addClass("hover");
          }, function() {
            $(this).removeClass("hover");
          });
        }
      },
      dataCreate: function() { //map.data添加数据
        utils.lanage();
        if (opts.data) {
          map.data = opts.data;
        } else {
          var selOptons = map.selectDoom.find("option");
          map.data = [];
          for (var i = 0; i < selOptons.length; i++) {
            map.data.push({
              "id": selOptons[i].value,
              "value": $(selOptons[i]).text()
            });
          }
        }

        for (var i = 0; i < map.data.length; i++) {
          if (map.data[i].id == "-1" || map.data[i].value == map.tip) {
            return;
          }
        }
        map.data.splice(0, 0, {
          "id": "-1",
          "value": map.tip
        });
      },
      isIE6: function() {
        return (! - [1] && !window.XMLHttpRequest)
      },
      lanage: function() { //对应语言生成默认语
        if (opts.lid == 1) {
          map.tip = "请选择";
        } else {
          map.tip = "select";
        }
      },
      listBoxShow: function() { //模拟下拉列表显示
        map.divDoom.addClass("focus");
        if (opts.before) {
          opts.before();
        }
        if (utils.isIE6()) {
          map.listBox.show();
        } else {
          map.listBox.slideDown(map.slideDownTime);
        }
        setTimeout(function() {
          $(document).bind("click.selectHide", utils.docClick);
        }, 0);
      },
      listBoxhide: function() { //模拟下拉列表隐藏
        map.divDoom.removeClass("focus");
        $(document).unbind("click.selectHide");
        if (utils.isIE6()) {
          map.listBox.hide();
        } else {
          map.listBox.slideUp(map.slideUpTime);
        }
        if (opts.close) {
          opts.close();
        }
      },
      docClick: function(e) { //点击空白处隐藏
        if (!$(e.target).parents().is(map.listBox)) {
          utils.listBoxhide();
        };
      }
    }

    utils.init();
  };
})(jQuery);
