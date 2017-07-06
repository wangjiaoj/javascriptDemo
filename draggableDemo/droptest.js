  $(function () {
      var defaultOptions = {
          start: function (e, n) {

          },
          drag: function (e, n) {

          },
          stop: function (e, n) {

          }
      }
      var dragtestId = 0;
      var dragtest = function (el, options) {
          this.options = $.extend({}, defaultOptions, options || {});
          this.id = dragtestId++;
          this.el = el;
          this.init();
      }


      dragtest.prototype = {
              downflag: false,
              init: function () {
                  this.initDrag();

              },

              initDrag: function () {
                  var self = this;

                  this.el.on('mousedown', function (e) {
                      self.initClientX = e.clientX;
                      self.initClientY = e.clientY;
                      self.downflag = true;
                      var position = $(this).position();
                      self.top = position.top;
                      self.left = position.left;
                      self.startDrag();
                  });
              },
              startDrag: function () {
                  var self = this;
                  var html = this.el;
                  console.log('start')
                  $('body').on('mousemove.' + this.id, function (e) {
                      if (!!self.downflag) {
                          //   var top = self.top + e.clientY - self.initClientY;
                          //   var left = self.left + e.clientX - self.initClientX;
                          //           html.css({
                          //       'position': 'absolute',
                          //       'top': top + 'px',
                          //       'left': left + 'px'
                          //   })
                          html.addClass('ui-draggable-dragging')
                          html.position({

                              of: event,
                              collision: "fit"
                          });
                          html.css({
                              'z-index': "1000"
                          })

                      }
                  });
                  $('body').on('mouseup.' + this.id, function (e) {
                      self.downflag = false;
                      self.endDrag();
                      console.log('end')
                  });
              },
              endDrag: function () {
                  $('body').off('mousemove.' + this.id);
                  $('body').off('mouseup.' + this.id);
              }
          }
          /*
           被拖动模块覆盖目标模块的时候，就会在目标模块上面自动出现一个小的占位框，因此都是默认移动到目标模块的上面的
          之所以能移动到一列的最后一个位置最后是因为每一列最后面都有一个不可见的模块
      
          */
      var drag = function (frame) {
          this.frame = frame;
          this.beginEditMode();
      }

      drag.prototype = {
          beginEditMode: function () {
              var t = this;
              this.empty = this.frame.hasClass('component-empty')
              this.frame.addClass("edit-mode-frame");
              //   this.frame.draggable({

              //       revert: "invalid",
              //       helper: "clone",
              //       zIndex: 10000,
              //       opacity: 0.7,
              //       cancel: '.inner-content,.inner-content-header li',
              //       start: function (e, n) {
              //           return t.startDrag(e, n)
              //       },
              //       drag: function (e, n) {
              //           return t.dragHandler(e, n)
              //       },
              //       stop: function (e, n) {
              //           return t.endDrag(e, n)
              //       }
              //   });

              new dragtest(this.frame, {

              })
              this.type = this.frame.data('component-type');
              this.frameContent = this.frame.find('.component-frame-content');
              this.upDropFrame = $('<div class="up-drop-handler"></div>');
              this.downDropFrame = $('<div class="down-drop-handler"></div>');
              this.ZWKFrame = $('<div class="zwf">我是占位框</div>');

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
                  over: function (e, n) {
                      return t.dragOver(e, n, !0)
                  },
                  drop: function (e, n) {
                      return t.dropHanlder(e, n, !0)
                  },
                  out: function (e, n) {
                      return t.dragOut(e, n, !0)
                  }
              });
              if (!this.empty) {
                  this.downDropFrame.droppable({
                      accept: ".component-frame,.new-component",
                      tolerance: "pointer",
                      greedy: true,
                      over: function (e, n) {
                          return t.dragOver(e, n, !1)
                      },
                      drop: function (e, n) {
                          return t.dropHanlder(e, n, !1)
                      },
                      out: function (e, n) {
                          return t.dragOut(e, n, !1)
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
          },
          dragHandler: function (t, e) {

          },
          endDrag: function (t, e) {
              this.dragging = false;
          },
          isDragging: function () {
              return this.dragging
          },
          dragOver: function (t, ui, flag) {
              debugger
              this.frameContent.removeClass('component-frame-sameType');
              this.frameContent.removeClass('component-frame-no-sameType');
              if (flag) {
                  this.upDropFrame.addClass("hover-drop-handler");
                  this.ZWKFrame.addClass('zwk-hid');
              } else {
                  var draggable = ui.draggable;
                  var type = draggable.attr("data-component-type");
                  console.log('over-type:id:' + type + ";type:" + this.type)
                  if (type == this.type) {
                      this.frameContent.addClass('component-frame-sameType');
                  } else {
                      this.frameContent.addClass('component-frame-no-sameType');
                  }
                  this.downDropFrame.addClass("hover-drop-handler");
              }
          },
          dropHanlder: function (t, ui, flag) {
              var draggable = ui.draggable;
              var id = draggable.attr("data-component-id");
              if (flag) {
                  this.upDropFrame.removeClass("hover-drop-handler");
                  this.ZWKFrame.removeClass('zwk-hid');
                  var dragComponent = $(".component-frame[data-component-id='" + id + "']")[0];
                  this.moveComponent(dragComponent, flag)
              } else {
                  this.frameContent.removeClass('component-frame-sameType');
                  this.frameContent.removeClass('component-frame-no-sameType');
                  this.downDropFrame.removeClass("hover-drop-handler");
                  var draggable = ui.draggable;
                  var type = draggable.attr("data-component-type");
                  console.log('over-type:id:' + type + ";type:" + this.type)
                  if (type == this.type) {
                      var dragComponent = $(".component-frame[data-component-id='" + id + "']")[0];
                      this.hebing(dragComponent, flag);
                  }
              }
              //无法找到id默认为拖动的新建组件
              // if(!id) {   
              //     var a = draggable.attr("data-type");
              //     if (!a){   
              //        throw new Error("需要根据对应type创建组件");
              //     }
              //     this.parent.emit(s.EVENT.CREATE_CHILD, this, a, flag);
              //     return;
              // }


              //Component.getInstance(id);

          },
          dragOut: function (t, ui, flag) {
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
          moveComponent: function (moveComponent, flag) {
              if (flag) {
                  this.frame.before(moveComponent);
              } else {
                  this.frame.after(moveComponent);
              }
          },
          hebing: function (moveComponent, flag) {
              var moveComponent = $(moveComponent);
              var header = moveComponent.find('.inner-content-header>ul>li');
              var moveBody = moveComponent.find('.inner-content');
              moveBody.addClass('hidden');
              this.frame.find('.inner-content-header>ul').append(header);
              this.frame.find('.inner-content-body').append(moveBody);
              moveComponent.detach()
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