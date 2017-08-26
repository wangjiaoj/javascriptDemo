  $(function () {


      $('h1').on("click", function () {
          var x = $(this).html()
          $(this).html(x + "ok")
      })
      $('.inner-content-header li').on("click", function () {
          if (!$(this).hasClass('selected')) {
              $(this).addClass('selected');
              var index = $(this).index();
              $(this).siblings('li').removeClass('selected');
              var cont = $(this).parents('.component-frame-content');
              cont.find('.inner-content').addClass('hidden');
              cont.find('.inner-content:eq(' + index + ')').removeClass('hidden');
          }

      })

      //   $("#sortable").sortable({
      //       placeholder: "ui-state-highlight"
      //   });

      $(".layout-frame").sortable({
          cancel: '.inner-content-body,.inner-content-header li:not(.hb-tabs)',
          appendTo: '.layout-frame',
          helper: "clone",
          items: '>.component-frame',
          //   containment: ".layout-frame",
          //   placeholder: "ui-sortable-placeholder component-frame",
          tolerance: 'pointer',
          sort: function (x, y) {

          },
          start: function (x, y) {
              var placeholder = y.placeholder;
              placeholder.html('<div></div>')
              placeholder.css("visibility", "visible")
          },
          stop: function (x, y) {

          },
          update: function (x, y) {

          },
          beforeStop: function (event, ui) {

          },
          over: function (event, ui) {
              var item = ui.item;
              var helper = ui.helper;
              console.log('item' + item.attr("data-component-id") + 'helper' + helper.attr("data-component-id"));


          }
      });

  });