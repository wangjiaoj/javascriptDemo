  $(function () {
      /*
      给的参考例子里面是当 被拖动模块覆盖目标模块的时候，就会在目标模块上面自动出现一个小的占位框，因此都是默认移动到目标模块的上面的
      之所以能移动到一列的最后一个位置最后是因为每一列最后面都有一个不可见的模块
      此处实现：把占位框添加到frame中的第一个元素中，这样就不会出现占位框把upDropFrame区域挤走的情况来了
      */
      var drag = function (frame) {
          this.frame = frame;
          this.beginEditMode();
      }

      drag.prototype = {
          beginEditMode: function () {
              var t = this;

              this.frame.addClass("edit-mode-frame"),
                  this.frame.draggable({
                      revert: "invalid",
                      helper: "clone",
                      zIndex: 10000,
                      opacity: 0.7,
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
              this.upDropFrame = $('<div class="up-drop-handler"></div>');

              this.ZWKFrame = $('<div class="zwf">我是占位框<div>');
              this.frame.prepend(this.ZWKFrame);
              this.frame.append(this.upDropFrame);

              this.upDropFrame.droppable({
                  accept: ".component-frame",
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
          dragOver: function (t, e, flag) {
              if (flag) {
                  this.ZWKFrame.addClass('zwk-hid');
                  this.upDropFrame.addClass("hover-drop-handler");
              }
          },
          dropHanlder: function (t, ui, flag) {
              var draggable = ui.draggable;
              var id = draggable.attr("data-component-id");
              if (flag) {
                  this.ZWKFrame.removeClass('zwk-hid');
                  this.upDropFrame.removeClass("hover-drop-handler");
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

              var dragComponent = $(".component-frame[data-component-id='" + id + "']")[0];

              //Component.getInstance(id);
              this.moveComponent(dragComponent, flag)
          },
          dragOut: function (t, ui, flag) {
              if (flag) {
                  this.ZWKFrame.removeClass('zwk-hid');
                  this.upDropFrame.removeClass("hover-drop-handler");
                  console.log('out-remove')
              }

          },
          moveComponent: function (moveComponent, flag) {
              if (flag) {
                  this.frame.before(moveComponent);
              }
          }
      }
      $(".component-frame").each(function (index, item) {
          item = $(item);
          new drag(item);
      })

  });