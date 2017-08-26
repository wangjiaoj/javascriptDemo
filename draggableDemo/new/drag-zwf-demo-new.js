  $(function () {

      var componentId = 0;
      var drag = function (frame) {
          this.frame = frame;
          this.frame.attr('data-component-id', componentId++)
          this.beginEditMode();
      }

      drag.prototype = {
          beginEditMode: function () {
              var t = this;
              this.empty = this.frame.hasClass('component-empty')
              this.frame.addClass("edit-mode-frame");

              this.frame.draggable({
                  revert: "invalid",
                  helper: false, //"clone",
                  distance: 10,
                  zIndex: 10000,
                  opacity: 0.7,
                  cancel: '.inner-content-body,.inner-content-header li:not(.hb-tabs)',
                  start: function (e, n) {
                      return t.startDrag(e, n)
                  },
                  drag: function (e, n) {
                      return t.dragHandler(e, n)
                  },
                  stop: function (e, n) {
                      return t.endDrag(e, n)
                  }
              });
              this.type = this.frame.data('component-type');
              this.frameContent = this.frame.find('.component-frame-content');
              this.upDropFrame = $('<div class="up-drop-handler"></div>');

              this.frame.append(this.upDropFrame);

              if (!this.empty) {
                  this.frame.append(this.downDropFrame);
              } else {
                  console.log('empty')
              }
              this.upDropFrame.droppable({
                  accept: ".component-frame,.new-component",
                  tolerance: "pointer",
                  greedy: true,
                  over: function (event, ui) {
                      return t.dragOver(event, ui, !0)
                  },
                  drop: function (event, ui) {
                      return t.dropHanlder(event, ui, !0)
                  },
                  out: function (event, ui) {
                      return t.dragOut(event, ui, !0)
                  }
              });


          },
          startDrag: function (t, e) {
              this.dragging = true;
              var target = $(t.originalEvent.target);

              if (target.hasClass('hb-tabs')) {
                  var con = e.helper;
                  var len = con.find('.inner-content-header>ul>li').length;
                  if (len > 1) {
                      console.log('tabs:' + index)
                      var index = target.index();
                      con.attr('data-component-tabs', index);

                      var headers = con.find('.inner-content-header>ul>li');
                      var moveBodys = con.find('.inner-content');
                      var sigleheaders = headers.eq(index);
                      var singlebody = moveBodys.eq(index);
                      singlebody.removeClass('hidden')
                      headers.not(':eq(' + index + ')').detach();
                      moveBodys.not(':eq(' + index + ')').detach();

                  } else {
                      return;
                  }
              }
          },
          dragHandler: function (t, e) {

          },
          endDrag: function (t, e) {
              this.dragging = false;
          },
          isDragging: function () {
              return this.dragging
          },
          dragOver: function (event, ui, flag) {
              this.frameContent.removeClass('component-frame-sameType');
              this.frameContent.removeClass('component-frame-no-sameType');
              if (flag) {
                  this.upDropFrame.addClass("hover-drop-handler");
                  this.frameContent.addClass('component-frame-fg');
                  //   this.ZWKFrame.addClass('zwk-hid');
              }
          },
          dropHanlder: function (event, ui, flag) {
              var draggable = ui.draggable;
              var helper = ui.helper;
              var tabs = helper.attr('data-component-tabs');
              if (flag) {
                  this.upDropFrame.removeClass("hover-drop-handler");
                  this.frameContent.removeClass('component-frame-fg');
                  //   this.ZWKFrame.removeClass('zwk-hid');
                  if (tabs) {
                      this.moveComponent(draggable, flag, tabs);
                  } else {
                      this.moveComponent(draggable, flag)
                  }

              }

          },
          dragOut: function (event, ui, flag) {
              if (flag) {
                  this.upDropFrame.removeClass("hover-drop-handler");
                  this.frameContent.removeClass('component-frame-fg');
                  //   this.ZWKFrame.removeClass('zwk-hid');
              }

          },
          endEditMode: function () {
              this.frame.off(),
                  this.frame.removeClass("edit-mode-frame"),
                  this.frame.draggable("destroy"),
                  this.upDropFrame.droppable("destroy"),
                  this.downDropFrame.droppable("destroy"),
                  this.upDropFrame.remove(),
                  this.downDropFrame.remove()
          },
          moveComponent: function (moveComponent, flag, tabs) {
              if (tabs) {
                  var type = moveComponent.attr('data-component-type');
                  var newCom = $('<div class="component-frame"  data-component-type="' + type + '"></div>')
                  var toobarSpan = moveComponent.find('.inner-content-header>.toolbar>span');
                  var toolbar;

                  if (toobarSpan.length <= 1) {
                      toolbar = '<div class="toolbar"> <span class="close">×</span> </div>';
                  } else {
                      toolbar = '<div class="toolbar"> <span class="setting"></span><span class="close">×</span> </div>';
                  }
                  console.log('type:' + type)
                  var newComInner = $('<div class="component-frame-content"><div class="inner-content-header"> <ul></ul>' + toolbar + '</div><div class="inner-content-body"></div> </div>')
                  newCom.append(newComInner);
                  this.frame.before(newCom);
                  new drag(newCom);
                  var headerSelect = moveComponent.find('.inner-content-header>ul>li').eq(tabs).removeClass('hb-tabs');
                  var bodySelect = moveComponent.find('.inner-content').eq(tabs).removeClass('hidden');
                  newCom.find('.inner-content-header>ul').append(headerSelect);
                  newCom.find('.inner-content-body').append(bodySelect);

                  //原模块第一个默认显示
                  moveComponent.find('.inner-content:eq(0)').removeClass('hidden');
                  //原模块如果已经是单模块-则去掉头部的hb-tabs
                  var orginLi = moveComponent.find('.inner-content-header>ul>li');
                  if (orginLi.length <= 1) {
                      orginLi.removeClass('hb-tabs');
                  }
              } else {
                  if (flag) {
                      this.frame.before(moveComponent);
                  }
              }

          }
      }

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
      $(".component-frame").each(function (index, item) {
          item = $(item);
          new drag(item);
      })


  });