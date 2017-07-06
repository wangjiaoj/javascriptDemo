  $(function () {
      /*
               被拖动模块覆盖目标模块的时候，就会在目标模块上面自动出现一个小的占位框，因此都是默认移动到目标模块的上面的
              之所以能移动到一列的最后一个位置最后是因为每一列最后面都有一个不可见的模块
      
              */
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
                  helper: "clone",
                  distance: 10,
                  zIndex: 10000,
                  opacity: 0.7,
                  cancel: '.inner-content,.inner-content-header li:not(.hb-tabs)',
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
              this.downDropFrame = $('<div class="down-drop-handler"></div>');
              this.ZWKFrame = $('<div class="zwf"><h1>移动到这里</h1></div>');

              this.frame.prepend(this.ZWKFrame);
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
              if (!this.empty) {
                  this.downDropFrame.droppable({
                      accept: ".component-frame,.new-component",
                      tolerance: "pointer",
                      greedy: true,
                      over: function (event, ui) {
                          return t.dragOver(event, ui, !1)
                      },
                      drop: function (event, ui) {
                          return t.dropHanlder(event, ui, !1)
                      },
                      out: function (event, ui) {
                          return t.dragOut(event, ui, !1)
                      }
                  });
              }

              // var n = this.getEditor();
              // if (n.isSettingInComponent()) {
              //     var r = this.frame.width();
              //     this.frame.css({
              //         perspective: r + "px"
              //     })
              // }
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
                  this.ZWKFrame.addClass('zwk-hid');
              } else {
                  var draggable = ui.draggable;
                  var type = draggable.attr("data-component-type");
                  if (type == this.type) {
                      this.frameContent.addClass('component-frame-sameType');
                  } else {
                      this.frameContent.addClass('component-frame-no-sameType');
                  }
                  this.downDropFrame.addClass("hover-drop-handler");
              }
          },
          dropHanlder: function (event, ui, flag) {
              var draggable = ui.draggable;
              var helper = ui.helper;
              var tabs = helper.attr('data-component-tabs');
              if (flag) {
                  this.upDropFrame.removeClass("hover-drop-handler");
                  this.ZWKFrame.removeClass('zwk-hid');
                  if (tabs) {
                      this.moveComponent(draggable, flag, tabs);
                  } else {
                      this.moveComponent(draggable, flag)
                  }

              } else {

                  this.frameContent.removeClass('component-frame-sameType');
                  this.frameContent.removeClass('component-frame-no-sameType');
                  this.downDropFrame.removeClass("hover-drop-handler");
                  var type = draggable.attr("data-component-type");

                  if (type == this.type) {
                      if (tabs) {
                          this.hebing(draggable, flag, tabs);
                      } else {
                          this.hebing(draggable, flag);
                      }
                  }
              }

          },
          dragOut: function (event, ui, flag) {
              if (flag) {
                  this.upDropFrame.removeClass("hover-drop-handler");
                  this.ZWKFrame.removeClass('zwk-hid');
              } else {
                  this.frameContent.removeClass('component-frame-sameType');
                  this.frameContent.removeClass('component-frame-no-sameType');
                  this.downDropFrame.removeClass("hover-drop-handler");
                  this.downDropFrame.removeClass("hover-drop-handler");
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
                  //直接clone拖动会有bug.....
                  //   var newCom = moveComponent.clone(true);
                  //   var headers = newCom.find('.inner-content-header>ul>li');
                  //   var moveBodys = newCom.find('.inner-content');
                  //   var sigleheaders = headers.eq(tabs);
                  //   var singlebody = moveBodys.eq(tabs);
                  //   singlebody.removeClass('hidden')
                  //   sigleheaders.removeClass('hb-tabs');
                  //   headers.not(':eq(' + tabs + ')').detach();
                  //   moveBodys.not(':eq(' + tabs + ')').detach();
                  //   this.frame.before(newCom);
                  //   var headerMoveComponent = moveComponent.find('.inner-content-header>ul>li');
                  //   headerMoveComponent.eq(tabs).detach();
                  //   moveComponent.find('.inner-content').eq(tabs).detach();
                  //   //原模块第一个默认显示
                  //   moveComponent.find('.inner-content:eq(0)').removeClass('hidden');
                  //   //原模块如果已经是单模块-则去掉头部的hb-tabs
                  //   var orginLi = moveComponent.find('.inner-content-header>ul>li');
                  //   if (orginLi.length <= 1) {
                  //       orginLi.removeClass('hb-tabs');
                  //   }
                  var type = moveComponent.attr('data-component-type');
                  var newCom = $('<div class="component-frame"  data-component-type="' + type + '"></div>')
                  var toobarSpan = moveComponent.find('.inner-content-header>.toolbar>span');
                  var toolbar;
                   
                  if(toobarSpan.length<=1){
                      toolbar='<div class="toolbar"> <span class="close">×</span> </div>';
                  }else{
                      toolbar='<div class="toolbar"> <span class="setting"></span><span class="close">×</span> </div>';
                  }
                  console.log('type:'+type)
                  var newComInner = $('<div class="component-frame-content"><div class="inner-content-header"> <ul></ul>'+toolbar+'</div><div class="inner-content-body"></div> </div>')
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

          },
          hebing: function (moveComponent, flag, tabs) {
              var headers = moveComponent.find('.inner-content-header>ul>li');
              var moveBodys = moveComponent.find('.inner-content');
              var parentUl = this.frame.find('.inner-content-header>ul');
              var parentBody = this.frame.find('.inner-content-body')
              if (tabs) {
                  var moveBody = moveBodys[tabs];
                  var header = headers[tabs];
                  $(moveBody).addClass('hidden');
                  parentBody.append(moveBody);
                  parentUl.append(header);
                  //原模块如果已经是单模块-则去掉头部的hb-tabs
                  var orginLi = moveComponent.find('.inner-content-header>ul>li');
                  if (orginLi.length <= 1) {
                      orginLi.removeClass('hb-tabs');
                  }
                  //原模块第一个默认显示
                  moveComponent.find('.inner-content:eq(0)').removeClass('hidden');
              } else {
                  moveBodys.addClass('hidden');
                  parentUl.append(headers);
                  parentBody.append(moveBodys);
                  moveComponent.detach();
              }
              parentUl.find('li').addClass('hb-tabs');

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