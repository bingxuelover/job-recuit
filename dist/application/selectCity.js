!function(u,t){u.fn.seleteCity=function(t){var i,h,s,e,n,a,l={trigger:"focus",language:1,popUrl:"/pop/popSelectCity.shtml",isArea:!1,isMultipleChoice:!1,isForeign:!0,isForeignList:!0,closeCallback:null,die:null};u.variate={popWrap:null,tab:null,tabIndex:null,citylist:null,selectHK:null,closebtn:null,topTitle:null,firstTab:null,hotCity:null,province:null,selectedTitle:null,surebtn:null,tabPcon:null,tabACon:null,tabHKCon:null,selectedList:null,tabArea:null,tabHK:null,tabProvince:null};this.selector;u.extend(l,t);var r={creatPop:function(t){if(0==u("#selectCityPop").length?(u("body").append('<div id="selectCityPop" class="sCP_Wrap"><h1 class="sCP_title"><span></span></h1><div class="sCP_mainWrap"><div class="clearfix allTit"><div class="j_tabAll sCP_allBtn"></div><ul class="sCP_tab j_cityTab clearfix"><li class="sCP_dpn"></li><li class="sCP_dpn"></li><li class="sCP_dpn"></li></ul></div><div class="j_tabContent"><div class="j_tabIndex"><div><h2 class="sCP_setionTitle"></h2><ul class="sCP_setionContent j_hotCity j_citylist clearfix"></ul></div><div><h2 class="sCP_setionTitle"></h2><ul class="sCP_setionContent j_province j_citylist clearfix"></ul></div></div><div class="j_tabProvince" style="display:none"><div class="addDiv"><h3></h3></div><ul class="sCP_list clearfix j_tabPcon j_citylist"></ul></div><div class="j_tabArea" style="display:none"><div class="addDiv"><h3></h3></div><ul class="sCP_list clearfix j_tabACon j_citylist"></ul></div><div class="j_tabHK" style="display:none"><h3></h3><ul class="sCP_list clearfix j_tabHKCon j_citylist"></ul></div></div><div class="clearfix"><div class="sCP_selectedTitle"></div><ul class="j_selected sCP_selectedCity"></ul></div><div class="sCp_btnBox"><span class="j_surebtn"></span><span class="j_closebtn"></span></div></div></div>'),r.creatDom(),r.deleteCity(),r.listStyle()):(u.variate.tab.find("li").hide(),u.variate.tabIndex.show().siblings().hide(),u.variate.citylist.html(""),u.variate.selectHK.find("span").removeClass("active")),/msie 6/.test(navigator.userAgent.toLowerCase())&&/msie/.test(navigator.userAgent.toLowerCase())){window.frames.cPop_coverIframe.document.bgColor="#000";var a=document.getElementById("cPop_coverIframe");a.height=u(window).height(),a.style.display="block",u("#cPop_cover").hide()}else u("#cPop_cover").show(),u("#cPop_coverIframe").hide();r.init(t),u.variate.popWrap.show(),u.variate.popWrap.css("top",(u(window).height()-u("#selectCityPop").height())/2+u(window).scrollTop())},init:function(t){r.languageFun(),r.setText(),r.reverse(t),r.activeSetting(),u.variate.closebtn.unbind("click").bind("click",function(){r.closePop(t)}),r.sureBtn(t),r.creatListIndex(),r.selected(),r.highLight(),r.selecteList()},selecteList:function(){u.variate.selectedList.find("li").length?u.variate.selectedList.siblings().show():u.variate.selectedList.siblings().hide()},setText:function(){u.variate.topTitle.find("span").text(e.popTitle),0==u.variate.topTitle.find("small").length&&l.isMultipleChoice&&u.variate.topTitle.append("<small>"+e.max5+"</small>"),u.variate.firstTab.text(e.tab1),u.variate.tab.find("li").eq(2).text(e.tab4).removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.hotCity.prev("h2").text(e.hotCity),u.variate.province.prev("h2").text(e.tab2),u.variate.selectHK.find("span").text(e.tab4),u.variate.selectedTitle.text(e.selected),u.variate.surebtn.text(e.sureBtn),u.variate.closebtn.text(e.closeBtn)},creatDom:function(){u.variate.popWrap=u("#selectCityPop"),u.variate.tab=u(".j_cityTab"),u.variate.tabIndex=u(".j_tabIndex"),u.variate.citylist=u(".j_citylist"),u.variate.selectHK=u(".j_selectHK"),u.variate.closebtn=u(".j_closebtn"),u.variate.topTitle=u(".sCP_title"),u.variate.firstTab=u(".j_tabAll"),u.variate.hotCity=u(".j_hotCity"),u.variate.province=u(".j_province"),u.variate.selectedTitle=u(".sCP_selectedTitle"),u.variate.surebtn=u(".j_surebtn"),u.variate.tabPcon=u(".j_tabPcon"),u.variate.tabACon=u(".j_tabACon"),u.variate.tabHKCon=u(".j_tabHKCon"),u.variate.selectedList=u(".j_selected"),u.variate.tabArea=u(".j_tabArea"),u.variate.tabHK=u(".j_tabHK"),u.variate.tabProvince=u(".j_tabProvince")},languageFun:function(){1==l.language?(i=hotCity,h=city,e={popTitle:"选择城市信息",max5:"最多可选5项",tab1:"全部",tab2:"省份",tab3:"地区",tab4:"海外",hotCity:"热门城市",selected:"您当前的选择:",sureBtn:"确定",closeBtn:"取消"},n="../images/qu.jpg",a="不能超过5项"):(i=hotCity_en,h=city_en,e={popTitle:"Please select city",max5:"Most selection 5",tab1:"All",tab2:"Provice",tab3:"Area",tab4:"OVERSEAS",hotCity:"Hot",selected:"Your selection:",sureBtn:"OK",closeBtn:"Cancel"},n="../images/district.jpg",a="No more than five",u("#selectCityPop").addClass("style_en"))},reverse:function(t){if(l.isMultipleChoice)r.multipeValue(t);else{var a=t.val(),i=t.next().val(),e=t.next().next().val(),s=t.next().next().next().val(),n=t.next().next().next().next().val();a=a.replace("选择城市",""),""==s&&(s="全国",e=i),r.evaluation(u(this),a,s,e,i,n)}},creatList:function(t,a,i,e,s){return e=e||(e=i),(1!=l.language?14<t.length:8<t.length)?s?'<li class="listsp" parent-value='+a+" data-p="+i+" data-c="+e+" data-a="+s+"><span>"+t+"</span></li>":'<li class="listsp" parent-value='+a+" data-p="+i+" data-c="+e+"><span>"+t+"</span></li>":s?"<li parent-value="+a+"  data-p="+i+" data-c="+e+" data-a="+s+"><span>"+t+"</span></li>":"<li parent-value="+a+"  data-p="+i+" data-c="+e+"><span>"+t+"</span></li>"},creatListIndex:function(){for(var t=0;t<i.length;t++)for(var a=0;a<i[t].sub.length;a++)"489"==i[t].id?u.variate.hotCity.append(r.creatList(i[t].sub[a].value,i[t].value,i[t].sub[a].id,i[t].sub[a].id)):"768"!=i[t].sub[a].id&&"707"!=i[t].sub[a].id&&"576"!=i[t].sub[a].id&&"831"!=i[t].sub[a].id&&"691"!=i[t].sub[a].id&&"822"!=i[t].sub[a].id&&u.variate.hotCity.append(r.creatList(i[t].sub[a].value,i[t].value,i[t].id,i[t].sub[a].id));r.isAreaFun(u.variate.hotCity);for(t=0;t<h[0].sub.length;t++)"530"!=h[0].sub[t].id&&"538"!=h[0].sub[t].id&&"531"!=h[0].sub[t].id&&"551"!=h[0].sub[t].id&&u.variate.province.append(r.creatList(h[0].sub[t].value,h[0].value,h[0].sub[t].id));(l.isForeign||l.isForeignList)&&u.variate.province.append('<li class="j_selectHK" parent-value="国外" data-p="480" data-c="480"><span>'+e.tab4+"</span></li>")},creatCity:function(t){u.variate.tabPcon.find("li").remove();for(var a=0;a<h[0].sub.length;a++)if(t==h[0].sub[a].id)for(var i=0;i<h[0].sub[a].sub.length;i++)u.variate.tabPcon.append(r.creatList(h[0].sub[a].sub[i].value,h[0].sub[a].value,h[0].sub[a].id,h[0].sub[a].sub[i].id));r.isAreaFun(u.variate.tabPcon)},creatArea:function(t,a){u.variate.tabACon.find("li").remove();for(var i=0;i<s.length;i++)if(t==s[i].value)for(var e=0;e<s[i].sub.length;e++)u.variate.tabACon.append(r.creatList(s[i].sub[e].value,s[i].value,a,s[i].id,s[i].sub[e].id))},creatForeign:function(){for(var t=0;t<h[1].sub.length;t++)u.variate.tabHKCon.append(r.creatList(h[1].sub[t].value,h[1].value,h[1].id,h[1].sub[t].id))},isAreaFun:function(t){l.isArea&&t.find("li").each(function(){for(var t=u(this).attr("data-c"),a=0;a<s.length;a++)t==s[a].id&&u(this).append("<img src="+n+" />")})},maxFiveFun:function(){return!l.isMultipleChoice||(!(4<u.variate.selectedList.find("li").length)||(0==u(".j_errorTips").length&&u.variate.selectedList.append('<div class="j_errorTips">'+a+"</div>"),!1))},evaluation:function(t,a,i,e,s,n){s=s||(s=e),a?t.find("span").hasClass("active")||(l.isMultipleChoice?u("<li><span>"+a+'</span><a class="closeCity j_deleteCity"></a></li>').appendTo(u.variate.selectedList).attr({"parent-value":i,"data-p":e,"data-c":s,"data-a":n}):(u.variate.selectedList.html(""),u.variate.selectedList.append("<li><span>"+a+'</span><a class="closeCity j_deleteCity"></a></li>').find("li").attr({"parent-value":i,"data-p":e,"data-c":s,"data-a":n}))):u.variate.selectedList.html("")},multipeValue:function(t){u.variate.selectedList.html("");for(var a,i,e,s,n,l,r,c=t.next().val().split(","),d=0;d<c.length;d++){l=!1,2==(r=c[d].split(":")).length&&(c[d]=r[1]);for(var o=0;o<h[1].sub.length;o++)c[d]==h[1].sub[o].id&&(a=h[1].id,s=h[1].sub[o].value,i=h[1].sub[o].id,l=!0,u("<li><span>"+s+'</span><a class="closeCity j_deleteCity"></a></li>').appendTo(u.variate.selectedList).attr({"data-p":a,"data-c":i,"data-a":e}));for(o=0;o<h[0].sub.length;o++)if(c[d]==h[0].sub[o].id)a=h[0].sub[o].id,s=h[0].sub[o].value,l=!0,i=a,u("<li><span>"+s+'</span><a class="closeCity j_deleteCity"></a></li>').appendTo(u.variate.selectedList).attr({"data-p":a,"data-c":i,"data-a":e});else if(h[0].sub[o].sub)for(var v=0;v<h[0].sub[o].sub.length;v++)if(c[d]==h[0].sub[o].sub[v].id){a=h[0].sub[o].id,s=h[0].sub[o].value,i=h[0].sub[o].sub[v].id,n=h[0].sub[o].sub[v].value,l=!0,u("<li><span>"+n+'</span><a class="closeCity j_deleteCity"></a></li>').appendTo(u.variate.selectedList).attr({"data-p":a,"data-c":i,"data-a":e});break}if(!l);}},highLight:function(){u.variate.province.find("li").each(function(){var t=u(this);u.variate.selectedList.find("li").each(function(){t.attr("data-p")==u(this).attr("data-p")&&t.find("span").addClass("active")})}),u.variate.hotCity.find("li").each(function(){var t=u(this);u.variate.selectedList.find("li").each(function(){t.attr("data-p")==u(this).attr("data-p")&&t.attr("data-c")==u(this).attr("data-c")&&t.find("span").addClass("active")})})},selected:function(){u.variate.firstTab.click(function(){r.activeSetting(),u.variate.tab.find("li").hide(),u.variate.tabIndex.show().siblings().hide()}),u.variate.tab.find("li").eq(0).click(function(){if(u(this).removeClass("nocurrent"),"none"!==u(this).next().css("display")){var t,a=u(this).attr("data-p");u(this).next()&&(u(this).next().hide(),u.variate.tabArea.hide());for(var i=0;i<h[0].sub.length;i++)if(h[0].sub[i].sub)for(var e=0;e<h[0].sub[i].sub.length;e++)h[0].sub[i].id==a&&(t=h[0].sub[i].value);u.variate.tabProvince.show().siblings().hide(),u.variate.tabProvince.find("h3").text(t),r.creatCity(a),r.activeSetting()}}),u.fn.on?(u.variate.hotCity.off("click","li").on("click","li",function(){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");u(this).find("span").hasClass("active")||r.maxFiveFun()&&(r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}),u.variate.hotCity.off("click","img").on("click","img",function(){var t=u(this).parent().text(),a=u(this).parent().attr("data-p"),i=u(this).parent().attr("data-c");return u.variate.tab.find("li").eq(1).text(t).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabArea.show().siblings().hide(),r.creatArea(t,a),u.variate.tabArea.find("h3").text(t).attr({"data-p":a,"data-c":i}),r.activeSetting(),!1}),u.variate.province.off("click","li").on("click","li",function(){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&("561"!==i&&"562"!==i&&"563"!==i&&"480"!==i?(u.variate.tab.find(" li").eq(0).text(t).attr("data-p",i).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabProvince.show().siblings().hide(),u.variate.tabProvince.find("h3").text(t).attr({"data-p":i,"data-c":e}),r.creatCity(i)):"480"===i&&l.isForeignList&&(u.variate.tabHK.show().siblings().hide(),u.variate.tab.find("li").eq(2).show(),0==u.variate.tabHK.find("li").length&&r.creatForeign()),u(this).find("span").hasClass("active")||(r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.selecteList()),r.activeSetting())}),u.variate.tabHKCon.off("click","li").on("click","li",function(){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.off("click","li").on("click","li",function(){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.off("click","img").on("click","img",function(){var t=u(this).parent().text(),a=u(this).parent().attr("data-p");return accid=u(this).parent().attr("data-c"),u.variate.tab.find("li").eq(1).text(t).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabArea.show().siblings().hide(),r.creatArea(t,a),u.variate.tabArea.find("h3").text(t).attr({"data-p":a,"data-c":accid}),r.activeSetting(),!1}),u.variate.tabArea.off("click","li").on("click","li",function(){var t=u(this).parent().prev("div").find("h3").text()+"-"+u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.off("click","h3").on("click","h3",function(){if(!u(this).hasClass("active")){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(u(this).addClass("active"),r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}}),u.variate.tabArea.off("click","h3").on("click","h3",function(){if(!u(this).hasClass("active")){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(u(this).addClass("active"),r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}})):(u.variate.hotCity.find("li").die("click").live("click",function(){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");u(this).find("span").hasClass("active")||r.maxFiveFun()&&(r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.activeSetting(),r.selecteList())}),u.variate.hotCity.find("img").die("click").live("click",function(){var t=u(this).parent().text(),a=u(this).parent().attr("data-p"),i=u(this).parent().attr("data-c");return u.variate.tab.find("li").eq(1).text(t).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabArea.show().siblings().hide(),r.creatArea(t,a),u.variate.tabArea.find("h3").text(t).attr({"data-p":a,"data-c":i}),r.activeSetting(),!1}),u.variate.province.find("li").die("click").live("click",function(){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&("561"!==i&&"562"!==i&&"563"!==i&&"480"!==i?(u.variate.tab.find("li").eq(0).text(t).attr("data-p",i).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabProvince.show().siblings().hide(),u.variate.tabProvince.find("h3").text(t).attr({"data-p":i,"data-c":e}),r.creatCity(i)):"480"===i&&l.isForeignList&&(u.variate.tabHK.show().siblings().hide(),u.variate.tab.find("li").eq(2).show(),0==u.variate.tabHK.find("li").length&&r.creatForeign()),u(this).find("span").hasClass("active")||(r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.selecteList()),r.activeSetting())}),u.variate.tabHKCon.find("li").die("click").live("click",function(){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.find("li").die("click").live("click",function(){var t=u(this).text(),a=u(this).attr("data-p"),i=u(this).attr("parent-value"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,i,a,e,s),l.isMultipleChoice&&r.conditions(a,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.find("img").die("click").live("click",function(){var t=u(this).parent().text(),a=u(this).parent().attr("data-p");return accid=u(this).parent().attr("data-c"),u.variate.tab.find("li").eq(1).text(t).show().removeClass("nocurrent").siblings().addClass("nocurrent"),u.variate.tabArea.show().siblings().hide(),r.creatArea(t,a),u.variate.tabArea.find("h3").text(t).attr({"data-p":a,"data-c":accid}),r.activeSetting(),!1}),u.variate.tabArea.find("li").die("click").live("click",function(){var t=u(this).parent().prev("div").find("h3").text()+"-"+u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.activeSetting(),r.selecteList())}),u.variate.tabProvince.find("h3").die("click").live("click",function(){if(!u(this).hasClass("active")){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(u(this).addClass("active"),r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.activeSetting(),r.selecteList())}}),u.variate.tabArea.find("h3").die("click").live("click",function(){if(!u(this).hasClass("active")){var t=u(this).text(),a=u(this).attr("parent-value"),i=u(this).attr("data-p"),e=u(this).attr("data-c"),s=u(this).attr("data-a");r.maxFiveFun()&&(u(this).addClass("active"),r.evaluation(u(this),t,a,i,e,s),l.isMultipleChoice&&r.conditions(i,e,s),r.activeSetting(),r.selecteList())}}))},conditions:function(e,s,n){0<u.variate.selectedList.find("li").length&&u.variate.selectedList.find("li").each(function(){var t=u(this).attr("data-p"),a=u(this).attr("data-c"),i=u(this).attr("data-a");n?i||(t!=a?a!=s||i||u(this).remove():e==t&&u(this).remove()):e!=s?t==t&&a==s&&i?u(this).remove():t==a&&e==t&&u(this).remove():e==t&&t!=a&&u(this).remove()})},activeSetting:function(){u.variate.citylist.find("li").each(function(){var a=u(this).attr("data-p"),i=u(this).attr("data-c"),e=u(this).attr("data-a"),s=u(this);if(e){var n=!0;u.variate.selectedList.find("li").each(function(){u(this).attr("data-p"),u(this).attr("data-c");var t=u(this).attr("data-a");e==t&&(s.find("span").addClass("active"),n=!1)}),n&&s.find("span").removeClass("active")}else if(a!=i){n=!0;u.variate.selectedList.find("li").each(function(){u(this).attr("data-p");var t=u(this).attr("data-c");u(this).attr("data-a");i==t&&(s.find("span").addClass("active"),n=!1)}),n&&s.find("span").removeClass("active")}else{n=!0;u.variate.selectedList.find("li").each(function(){var t=u(this).attr("data-p");u(this).attr("data-c"),u(this).attr("data-a");a==t&&(s.find("span").addClass("active"),n=!1)}),n&&s.find("span").removeClass("active")}}),r.titleActive()},titleActive:function(){var r=!0;u(".j_tabContent").find("h3").each(function(){var e=u(this),s=e.attr("data-p"),n=e.attr("data-c"),l=e.attr("data-a");u.variate.selectedList.find("li").each(function(){var t=u(this).attr("data-p"),a=u(this).attr("data-c"),i=u(this).attr("data-a");t==s&&a==n&&l==i&&(e.addClass("active"),r=!1)}),r&&e.removeClass("active")})},listStyle:function(){u.fn.on?(u(".j_tabContent").off("mouseover mouseout","h3").on({mouseover:function(){u(this).addClass("hover")},mouseout:function(){u(this).removeClass("hover")}},"h3"),u.variate.citylist.off("mouseover mouseout","li").on({mouseover:function(){u(this).find("img").show().end().find("span").addClass("hover")},mouseout:function(){u(this).find("img").hide().end().find("span").removeClass("hover")}},"li")):(u(".j_tabContent").find("h3").die("mouseover mouseout").live({mouseover:function(){u(this).addClass("hover")},mouseout:function(){u(this).removeClass("hover")}}),u.variate.citylist.find("li").die("mouseover mouseout").live({mouseover:function(){u(this).find("img").show().end().find("span").addClass("hover")},mouseout:function(){u(this).find("img").hide().end().find("span").removeClass("hover")}}))},sureBtn:function(n){u.fn.on?u.variate.surebtn.off("click").on("click",function(){if(l.isMultipleChoice){var t,a,i,e=[],s=[];u.variate.selectedList.find("li").each(function(){e.push(u(this).text()),u(this).attr("data-a")?(i=u(this).attr("data-c")+":"+u(this).attr("data-a"),s.push(i)):u(this).attr("data-p")!=u(this).attr("data-c")?s.push(u(this).attr("data-c")):s.push(u(this).attr("data-p"))}),t=e.join("+"),a=s.join(","),n.val(t),n.next().val(a)}else"全国"!=u.variate.selectedList.find("li").attr("parent-value")?(n.val(u.variate.selectedList.find("li").text()),n.next().val(u.variate.selectedList.find("li").attr("data-c")),n.next().next().val(u.variate.selectedList.find("li").attr("data-p")),n.next().next().next().val(u.variate.selectedList.find("li").attr("parent-value")),n.next().next().next().next().val(u.variate.selectedList.find("li").attr("data-a"))):(n.val(u.variate.selectedList.find("li").text()),n.next().val(u.variate.selectedList.find("li").attr("data-c")),n.next().next().val(""),n.next().next().next().val(""));r.closePop(n)}):u.variate.surebtn.die("click").live("click",function(){if(l.isMultipleChoice){var t,a,i,e=[],s=[];u.variate.selectedList.find("li").each(function(){e.push(u(this).text()),u(this).attr("data-a")?(i=u(this).attr("data-c")+":"+u(this).attr("data-a"),s.push(i)):u(this).attr("data-p")!=u(this).attr("data-c")?s.push(u(this).attr("data-c")):s.push(u(this).attr("data-p"))}),t=e.join("；"),a=s.join(","),n.val(t),n.next().val(a)}else"全国"!=u.variate.selectedList.find("li").attr("parent-value")?(n.val(u.variate.selectedList.find("li").text()),n.next().val(u.variate.selectedList.find("li").attr("data-c")),n.next().next().val(u.variate.selectedList.find("li").attr("data-p")),n.next().next().next().val(u.variate.selectedList.find("li").attr("parent-value")),n.next().next().next().next().val(u.variate.selectedList.find("li").attr("data-a"))):(n.val(u.variate.selectedList.find("li").text()),n.next().val(u.variate.selectedList.find("li").attr("data-c")),n.next().next().val(""),n.next().next().next().val(""));r.closePop(n)})},closePop:function(t){u.variate.popWrap.hide(),u("#cPop_cover").hide(),u("#cPop_coverIframe").hide(),l.closeCallback&&l.closeCallback.call(t)},deleteCity:function(){u.fn.on?u.variate.selectedList.on("click","li",function(){u(this).remove(),r.activeSetting(),r.selecteList(),0!=u(".j_errorTips").length&&u(".j_errorTips").remove()}):u.variate.selectedList.find("li").live("click",function(){u(this).remove(),r.activeSetting(),r.selecteList(),0!=u(".j_errorTips").length&&u(".j_errorTips").remove()})}};u.fn.on?"die"==l.die?u(document).off(".cityEvent",this.selector):u(document).off(l.trigger).on(l.trigger+".cityEvent",this.selector,function(){r.creatPop(u(this))}):"die"==l.die?this.die(l.trigger):this.live(l.trigger,function(){r.creatPop(u(this))})}}(jQuery);