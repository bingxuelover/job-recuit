/**
 * applicationRight.js是头部右侧及简历标题调用事件
 **/
function applicationRight() {
  //右侧导航hover效果
  $(".j_applicationNav li").hover(function() {
    $(this).addClass("hover");
  }, function() {
    $(this).removeClass("hover");
  });
  $(".j_applicationNav").on("click", "li", function() {
    var $this = $(this);
    if ($(".j_tabWrap").eq($this.index()).offset()) {
      var top = $(".j_tabWrap").eq($this.index()).offset().top - 20;
      $("body,html").animate({
        scrollTop: top
      }, 300)
    };
    setTimeout(function() {
      $this.addClass("cur").siblings().removeClass("cur");
    }, 310)
  });
  //右侧提交申请按钮
  $("#submitAllBtn").click(function() {
    var checkType = false;
    $('.application_nav li').each(function(index, el) {
      if ($(el).attr('required')) {
        if ($(el).not('.complete').length > 0) {
          checkType = true;
        }
      }
    });
    if (!checkType) {
      popBox()
      submitAll()
    } else {
      popAlert('简历还没填写完整，请返回继续填写！', function() {})
    }
  })

  $(".j_popCloseBtn").live("click", function() {
    $(".j_popUpLoadFaceBox").hide();
    coverHide();
  });

  //右侧悬浮
  var boundaryValue = $(".j_applicationRight").offset().top || 100;
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop(),
      windowHeight = $(window).height(),
      navHeight = $(".j_applicationRight").height(),
      bodyHeight = $("body").height();
    if (scrollTop > boundaryValue) {
      $(".j_applicationRight").addClass("applicationRight_fixed");
    } else {
      $(".j_applicationRight").removeClass("applicationRight_fixed");
    };
    var menu = $("#menu");
    var items = $("#content").find(".content-box");
    var curId = ""; //定义变量，当前所在的楼层item #id

    items.each(function() {
      var m = $(this); //定义变量，获取当前类
      var itemsTop = m.offset().top; //定义变量，获取当前类的top偏移量

      if (scrollTop > itemsTop - 20) {
        curId = m.attr("id");
      } else {
        return false;
      }
    });

    //给相应的楼层设置cur,取消其他楼层的cur
    var curLink = menu.find(".cur");
    if (curId && curLink.attr("data-id") != curId) {
      curLink.removeClass("cur");
      menu.find("[data-id=" + curId + "]").addClass("cur");
    }
  });
  $('#loginOut').click(function() {
    location.href = "index.html";
  });
};
