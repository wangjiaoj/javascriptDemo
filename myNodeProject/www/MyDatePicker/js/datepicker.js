 (function($) {
     var cache = {},
         tmpl;

     var defaultOptions = {
         el: 'id', //日历显示定位位置的id，当选中日期后将数据显示到该id内
         minDate: "1900-01-01 00:00:00",
         maxDate: "2099-12-31 23:59:59",
         eCont: 'id', //单纯当做日历使用的元素id
         startDate: '', //'1980-05-01'日历展示的初始日期，也可以使用这样的格式'%y-%M-01 00:00:00',%y表示当前年份
         isShowClear: true,
         readOnly: false, //isShowClear false 和 readOnly true 最好同时使用,
         dateFmt: 'yyyy-MM-dd', //'yyyy年MM月ss秒'年月日时分秒   'H:mm:ss'只显示时分秒   'yyyy年MM月'年月
         firstDayOfWeek: 0, //自定义星期的第一天,各个国家的习惯不同,有些喜欢以星期日作为第一天,有些以星期一作为第一天.相关属性:firstDayOfWeek: 可设置 0 - 6 的任意一个数字,0:星期日 1:星期一 
         position: { left: 100, top: 50 }, //自定义弹出位置
         onpicked: function() {}, //选中日期时的回调函数
         calendars: 1, //单日历还是双日历
         current: '2017-01-01',
         onRenderCell: function() { return {} }
     }
     var ids = {},
         views = {
             years: 'datepickerViewYears',
             months: 'datepickerViewMonths',
             days: 'datepickerViewDays'
         },
         tpl = {
             wrapper: '<div class="datepicker"><div class="datepickerBorderT" /><div class="datepickerBorderB" /><div class="datepickerBorderL" /><div class="datepickerBorderR" /><div class="datepickerBorderTL" /><div class="datepickerBorderTR" /><div class="datepickerBorderBL" /><div class="datepickerBorderBR" /><div class="datepickerContainer"><table cellspacing="0" cellpadding="0"><tbody><tr></tr></tbody></table></div></div>',
             header: [
                 '<div class="dpTitle">',
                 '<div class="navImg NavImgll"><a></a></div><div class="navImg NavImgl"><a></a></div>',
                 '<div style="float:left"><div class="menuSel MMenu" style="display: none; left: 36px;">',
                 '<table cellspacing="0" cellpadding="3" border="0" nowrap="nowrap"><tbody>',
                 '<tr><td nowrap="" class="menu">一月</td><td nowrap="" class="menu">七月</td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu" >二月</td><td nowrap="" class="menu">八月</td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu">三月</td><td nowrap="" class="menu">九月</td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu">四月</td><td nowrap="" class="menu">十月 </td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu">五月</td><td nowrap="" class="menu">十一</td></tr>',
                 '<tr nowrap="nowrap "><td nowrap="" class="menu">六月</td><td nowrap="" class="menu">十二</td></tr>',
                 '</tbody></table>',
                 '</div><input class="yminput"></div>',
                 '<div style="float:left"><div class="menuSel YMenu" style="display: none;"></div><input class="yminput"></div>',
                 '<div class="navImg NavImgrr"><a></a></div><div class="navImg NavImgr"><a></a></div>',
                 '<div style="float:right"></div>',
                 '</div>'
             ],



             head: [
                 '<td class="datepickerBlock">',
                 '<table cellspacing="0" cellpadding="0">',
                 '<thead>',
                 '<tr>',
                 '<th colspan="7"><a class="datepickerGoPrev" href="#"><span><%=prev%></span></a>',
                 '<a class="datepickerMonth" href="#"><span></span></a>',
                 '<a class="datepickerGoNext" href="#"><span><%=next%></span></a></th>',
                 '</tr>',
                 '<tr class="datepickerDoW">',
                 '<th><span><%=day1%></span></th>',
                 '<th><span><%=day2%></span></th>',
                 '<th><span><%=day3%></span></th>',
                 '<th><span><%=day4%></span></th>',
                 '<th><span><%=day5%></span></th>',
                 '<th><span><%=day6%></span></th>',
                 '<th><span><%=day7%></span></th>',
                 '</tr>',
                 '</thead>',
                 '</table></td>'
             ],
             space: '<td class="datepickerSpace"><div></div></td>',
             days: [
                 '<div><table class="WdayTable" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody class="datepickerDays">',
                 '<tr class="MTitle" align="center"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>',
                 '<tr>',
                 '<td class="<%=weeks[0].days[0].classname%>"><span><%=weeks[0].days[0].text%></span></td>',
                 '<td class="<%=weeks[0].days[1].classname%>"><span><%=weeks[0].days[1].text%></span></td>',
                 '<td class="<%=weeks[0].days[2].classname%>"><span><%=weeks[0].days[2].text%></span></td>',
                 '<td class="<%=weeks[0].days[3].classname%>"><span><%=weeks[0].days[3].text%></span></td>',
                 '<td class="<%=weeks[0].days[4].classname%>"><span><%=weeks[0].days[4].text%></span></td>',
                 '<td class="<%=weeks[0].days[5].classname%>"><span><%=weeks[0].days[5].text%></span></td>',
                 '<td class="<%=weeks[0].days[6].classname%>"><span><%=weeks[0].days[6].text%></span></td>',
                 '</tr>',
                 '<tr>',
                 '<td class="<%=weeks[1].days[0].classname%>"><span><%=weeks[1].days[0].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[1].classname%>"><span><%=weeks[1].days[1].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[2].classname%>"><span><%=weeks[1].days[2].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[3].classname%>"><span><%=weeks[1].days[3].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[4].classname%>"><span><%=weeks[1].days[4].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[5].classname%>"><span><%=weeks[1].days[5].text%></span></a></td>',
                 '<td class="<%=weeks[1].days[6].classname%>"><span><%=weeks[1].days[6].text%></span></a></td>',
                 '</tr>',
                 '<tr>',
                 '<td class="<%=weeks[2].days[0].classname%>"><span><%=weeks[2].days[0].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[1].classname%>"><span><%=weeks[2].days[1].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[2].classname%>"><span><%=weeks[2].days[2].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[3].classname%>"><span><%=weeks[2].days[3].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[4].classname%>"><span><%=weeks[2].days[4].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[5].classname%>"><span><%=weeks[2].days[5].text%></span></a></td>',
                 '<td class="<%=weeks[2].days[6].classname%>"><span><%=weeks[2].days[6].text%></span></a></td>',
                 '</tr>',
                 '<tr>',
                 '<td class="<%=weeks[3].days[0].classname%>"><span><%=weeks[3].days[0].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[1].classname%>"><span><%=weeks[3].days[1].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[2].classname%>"><span><%=weeks[3].days[2].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[3].classname%>"><span><%=weeks[3].days[3].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[4].classname%>"><span><%=weeks[3].days[4].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[5].classname%>"><span><%=weeks[3].days[5].text%></span></a></td>',
                 '<td class="<%=weeks[3].days[6].classname%>"><span><%=weeks[3].days[6].text%></span></a></td>',
                 '</tr>',
                 '<tr>',
                 '<td class="<%=weeks[4].days[0].classname%>"><span><%=weeks[4].days[0].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[1].classname%>"><span><%=weeks[4].days[1].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[2].classname%>"><span><%=weeks[4].days[2].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[3].classname%>"><span><%=weeks[4].days[3].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[4].classname%>"><span><%=weeks[4].days[4].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[5].classname%>"><span><%=weeks[4].days[5].text%></span></a></td>',
                 '<td class="<%=weeks[4].days[6].classname%>"><span><%=weeks[4].days[6].text%></span></a></td>',
                 '</tr>',
                 '<tr>',
                 '<td class="<%=weeks[5].days[0].classname%>"><span><%=weeks[5].days[0].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[1].classname%>"><span><%=weeks[5].days[1].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[2].classname%>"><span><%=weeks[5].days[2].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[3].classname%>"><span><%=weeks[5].days[3].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[4].classname%>"><span><%=weeks[5].days[4].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[5].classname%>"><span><%=weeks[5].days[5].text%></span></a></td>',
                 '<td class="<%=weeks[5].days[6].classname%>"><span><%=weeks[5].days[6].text%></span></a></td>',
                 '</tr>',
                 '</tbody></table></div>'
             ],
             months: [
                 '<table cellspacing="0" cellpadding="3" border="0" nowrap="nowrap"><tbody>',
                 '<tr><td nowrap="" class="menu"><%=data[0]%></td><td nowrap="" class="menu"><%=data[6]%></td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu" ><%=data[1]%></td><td nowrap="" class="menu"><%=data[7]%></td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu"><%=data[2]%></td><td nowrap="" class="menu"><%=data[8]%></td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu"><%=data[3]%></td><td nowrap="" class="menu"><%=data[9]%> </td></tr>',
                 '<tr nowrap="nowrap"><td nowrap="" class="menu"><%=data[4]%></td><td nowrap="" class="menu"><%=data[10]%></td></tr>',
                 '<tr nowrap="nowrap "><td nowrap="" class="menu"><%=data[5]%></td><td nowrap="" class="menu"><%=data[11]%></td></tr>',
                 '</tbody></table>',
                 '<table cellspacing="0" cellpadding="3" border="0" align="center"><tbody><tr><td class="menu">←</td><td class="menu" >×</td><td class="menu" >→</td></tr></tbody></table>'
             ]
         };



     extendDate();

     var DatePicker = function(options) {
         this.options = $.extend({}, defaultOptions, options || {});
         this.init();
     }; // DatePicker
     var fn = DatePicker.prototype
     fn.init = function() {
         this.bulidCalender();
     }
     fn.bulidCalender = function() {
         var options = this.options;
         var cnt;
         for (var i = 0; i < options.calendars; i++) {
             date = new Date(options.current);

             //  date.addMonths(-currentCal + i);
             //  tblCal = cal.find('table').eq(i + 1);

             //  if (i == 0) tblCal.addClass('datepickerFirstView');
             //  if (i == options.calendars - 1) tblCal.addClass('datepickerLastView');

             //  if (tblCal.hasClass('datepickerViewDays')) {
             //      dow = date.getMonthName(true) + ", " + date.getFullYear();
             //  } else if (tblCal.hasClass('datepickerViewMonths')) {
             //      dow = date.getFullYear();
             //  } else if (tblCal.hasClass('datepickerViewYears')) {
             //      dow = (date.getFullYear() - 6) + ' - ' + (date.getFullYear() + 5);
             //  }
             //  tblCal.find('thead tr:first th a:eq(1) span').text(dow);
             dow = date.getFullYear() - 6;

             data = {
                 data: [],
                 className: 'datepickerYears'
             }
             for (var j = 0; j < 12; j++) {
                 data.data.push(dow + j);
             }
             // datepickerYears template
             //  html = tmpl(tpl.months.join(''), data);

             date.setDate(1);
             data = { weeks: [], test: 10 };
             month = date.getMonth();
             var dow = (date.getDay() - options.firstDayOfWeek) % 7;
             date.addDays(-(dow + (dow < 0 ? 7 : 0)));
             cnt = 0;
             while (cnt < 42) {
                 indic = parseInt(cnt / 7, 10);
                 indic2 = cnt % 7;
                 if (!data.weeks[indic]) {
                     data.weeks[indic] = {
                         days: []
                     };
                 }
                 data.weeks[indic].days[indic2] = {
                     text: date.getDate(),
                     classname: []
                 };
                 var today = new Date();
                 if (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getYear() == date.getYear()) {
                     data.weeks[indic].days[indic2].classname.push('datepickerToday');
                 }
                 if (date > today) {
                     // current month, date in future
                     data.weeks[indic].days[indic2].classname.push('datepickerFuture');
                 }

                 if (month != date.getMonth()) {
                     data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth');
                     // disable clicking of the 'not in month' cells
                     data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
                 } else {
                     data.weeks[indic].days[indic2].classname.push('datepickerInMonth');
                 }
                 if (date.getDay() == 0) {
                     data.weeks[indic].days[indic2].classname.push('datepickerSunday');
                 }
                 if (date.getDay() == 6) {
                     data.weeks[indic].days[indic2].classname.push('datepickerSaturday');
                 }
                 var fromUser = options.onRenderCell(date);
                 var val = date.valueOf();
                 if (options.date && (!$.isArray(options.date) || options.date.length > 0)) {
                     if (fromUser.selected || options.date == val || $.inArray(val, options.date) > -1 || (options.mode == 'range' && val >= options.date[0] && val <= options.date[1])) {
                         data.weeks[indic].days[indic2].classname.push('datepickerSelected');
                     }
                 }
                 if (fromUser.disabled) {
                     data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
                 }
                 if (fromUser.className) {
                     data.weeks[indic].days[indic2].classname.push(fromUser.className);
                 }
                 data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
                 cnt++;
                 date.addDays(1);
             }
             // Fill the datepickerDays template with data
             html = tmpl(tpl.days.join(''), data); //+ html;

             //  data = {
             //      data: options.locale.monthsShort,
             //      className: 'datepickerMonths'
             //  };
             //  // datepickerMonths template
             //  html = tmpl(tpl.months.join(''), data) + html;
             var $WdateDiv = $('<div class="WdateDiv"></div>');
             $WdateDiv.append(tpl.header.join(""), html);
             var dataPicker = $("body").append($WdateDiv);

             $WdateDiv.find(".yminput").eq(0).val(date.getMonth() + "月");
             $WdateDiv.find(".yminput").eq(1).val(date.getFullYear());
             this.wrapper = $WdateDiv;
         }
         this.bindHeader();
     }
     fn.bindHeader = function() {
         var datePickerWrapper = this.wrapper,
             options = this.options;;
         var self = this,
             html, data, dow;
         datePickerWrapper.on("", "click", function() {

         });
         datePickerWrapper.find(".yminput").on("focus", function() {
             if ($(this).siblings("div").find("table").length < 1) {
                 date = new Date(options.current);

                 dow = date.getFullYear() - 6;

                 data = {
                     data: [],
                     className: 'datepickerYears'
                 }
                 for (var j = 0; j < 12; j++) {
                     data.data.push(dow + j);
                 }
                 // datepickerYears template
                 html = tmpl(tpl.months.join(''), data);
                 $(this).siblings("div").append(html);
             }

             $(this).siblings("div").css("display", "block");
         });
         datePickerWrapper.find(".yminput").on("blur", function() {
             if ($(this).siblings("div").find("table").length > 1) {
                 $(this).siblings("div").empty();
             }
             $(this).siblings("div").css("display", "none");
         });
     }

     function extendDate() {
         if (Date.prototype.tempDate) {
             return;
         }
         Date.prototype.tempDate = null;

         Date.prototype.addDays = function(n) {
             this.setDate(this.getDate() + n);
             this.tempDate = this.getDate();
         };
         Date.prototype.addMonths = function(n) {
             if (this.tempDate == null) {
                 this.tempDate = this.getDate();
             }
             this.setDate(1);
             this.setMonth(this.getMonth() + n);
             this.setDate(Math.min(this.tempDate, this.getMaxDays()));
         };
         Date.prototype.addYears = function(n) {
             if (this.tempDate == null) {
                 this.tempDate = this.getDate();
             }
             this.setDate(1);
             this.setFullYear(this.getFullYear() + n);
             this.setDate(Math.min(this.tempDate, this.getMaxDays()));
         };
         Date.prototype.getMaxDays = function() {
             var tmpDate = new Date(Date.parse(this)),
                 d = 28,
                 m;
             m = tmpDate.getMonth();
             d = 28;
             while (tmpDate.getMonth() == m) {
                 d++;
                 tmpDate.setDate(d);
             }
             return d - 1;
         };
     }
     var
         tmpl = function tmpl(str, data) {
             // Figure out if we're getting a template, or if we need to
             // load the template - and be sure to cache the result.
             var fn = !/\W/.test(str) ?
                 cache[str] = cache[str] ||
                 tmpl(document.getElementById(str).innerHTML) :

                 // Generate a reusable function that will serve as a template
                 // generator (and which will be cached).
                 new Function("obj",
                     "var p=[],print=function(){p.push.apply(p,arguments);};" +

                     // Introduce the data as local variables using with(){}
                     "with(obj){p.push('" +

                     // Convert the template into pure JavaScript
                     str
                     .replace(/[\r\t\n]/g, " ")
                     .split("<%").join("\t")
                     .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                     .replace(/\t=(.*?)%>/g, "',$1,'")
                     .split("\t").join("');")
                     .split("%>").join("p.push('")
                     .split("\r").join("\\'") +
                     "');}return p.join('');");

             // Provide some basic currying to the user
             return data ? fn(data) : fn;
         };


     window.DatePicker = DatePicker;
 })(jQuery);