$(function() {

  /* 加载页面form */
  $('#itemInfo').load('./components/user-info.html', function() {
    plugBind($('#person_info'), 1);
    $('#person_info_hukou').citypicker();
  });
  $('#itemContact').load('../components/user-contact.html .wrapper', function() {});
  $('#itemEducation').load('./components/user-education.html .wrapper', function() {
    plugBind($('#education_experience'), 1);
  });
  $('#itemWanted').load('./components/user-wanted.html .wrapper', function() {});
  $('#itemAbility').load('./components/user-ability.html', function() {
    plugBind($('#skill_favorite'), 1);
  });
  $('#itemFamily').load('./components/user-family.html .wrapper', function() {});
  $('#itemElse').load('./components/work-question.html .wrapper', function() {});

  $.getJSON("./js/get.json", function(theresumejson) {
    $.each(theresumejson.resume, function(module) {
      var moduleDataNew = theresumejson.resume[module];
      if (module === 'wanted_career') {
        if (GetQueryString("companyname")) {
          moduleDataNew.company.Text = GetQueryString("companyname")
          moduleDataNew.company.Value = GetQueryString("companyname")
        }
        if (GetQueryString("jobname")) {
          moduleDataNew.company.Text = GetQueryString("jobname")
          moduleDataNew.position.Value = GetQueryString("jobname")
        }
      }
      $("#ResumeInfo_" + module).val(JSON.stringify(moduleDataNew));
    });
    // 数据初始化
    dataSet();
    // 页面初始化
    init(languageID);
    // 事件绑定 - 添加、删除、编辑、收起
    eventBind();
    //插件初始化绑定
    plugBind($(document), languageID);
    plugBindOne(languageID);
    //联动项事件绑定
    releaseEvent();
    circleEvent();
    //绑定blur验证事件
    inputCheckBind(languageID);
    //特殊事件添加
    doomSpecialEvent();
    //其他事件
    applicationRight();
    //声明提示
    // popBox()
  });

  $('#confirmOk').change(function(event) {
    if ($(this).is(':checked')) {
      $('#confirmOkClose').unbind('click');
      $('#confirmOkClose').bind('click', function() {
        closeBtn($(this));
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + 1)
        document.cookie = "confirmKnow=" + escape("true") + ";expires=" + exdate.toGMTString()
        $(this).unbind('click');
      });
    } else {
      $('#confirmOkClose').unbind('click');
      $('#confirmOkClose').bind('click', function() {
        confirm('确认诚信声明后，才能点击确定按钮，进行数据填写')
      })
    }
  });
  $('#confirmOkClose').bind('click', function() {
    confirm('请阅读声明并点击确认后，才能点击确定按钮，进行数据填写')
  })
});
