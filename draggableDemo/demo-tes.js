  $(function() {
      /*
      给的参考例子里面是当 被拖动模块覆盖目标模块的时候，就会在目标模块上面自动出现一个小的占位框，因此都是默认移动到目标模块的上面的
      之所以能移动到一列的最后一个位置最后是因为每一列最后面都有一个不可见的模块
      要求：占位框不能太高，否则添加占位框之后目标模块被寄到下面之后，可能会影响到之前的被覆盖事件覆盖
      */
        var drag=function (frame){
        		this.frame=frame;
        		this.beginEditMode();
        	}

       drag.prototype = 	{
 	        beginEditMode:function() {
                    var t = this;
                    this.frame.addClass("edit-mode-frame"),
                    this.frame.draggable({
                        revert: "invalid",
                        helper: "clone",
                        zIndex: 10000,
                        opacity: 0.7,
                        start: function(e, n) {
                            return t.startDrag(e, n)
                        },
                        drag: function(e, n) {
                            return t.dragHandler(e, n)
                        },
                        stop: function(e, n) {
                            return t.endDrag(e, n)
                        }
                    });
                    this.upDropFrame = $('<div class="up-drop-handler"></div>');
                    this.downDropFrame = $('<div class="down-drop-handler"></div>');
                    this.frame.append(this.upDropFrame);
                    this.frame.append(this.downDropFrame);
                    this.upDropFrame.droppable({
                        accept: ".component-frame,.new-component",
                        tolerance: "pointer",
                        greedy: true,
                        over: function(e, n) {                   
                            return t.dragOver(e, n, !0)
                        },
                        drop: function(e, n) {                      
                            return t.dropHanlder(e, n, !0)
                        },
                        out: function(e, n) {
                            return t.dragOut(e, n, !0)
                        }
                    });
                    this.downDropFrame.droppable({
                        accept: ".component-frame,.new-component",
                        tolerance: "pointer",
                        greedy: true,
                        over: function(e, n) {
                            return t.dragOver(e, n, !1)
                        },
                        drop: function(e, n) {
                            return t.dropHanlder(e, n, !1)
                        },
                        out: function(e, n) {
                            return t.dragOut(e, n, !1)
                        }
                    });
                    this.zwf=$('.zwf');
                    // var n = this.getEditor();
                    // if (n.isSettingInComponent()) {
                    //     var r = this.frame.width();
                    //     this.frame.css({
                    //         perspective: r + "px"
                    //     })
                    // }
                },
            startDrag:function(t, e) {
                    this.dragging = true;    
                },
            dragHandler:function(t, e) {

               },
            endDrag:function(t, e) {
                    this.dragging = false;
                },
            isDragging:function() {
                    return this.dragging
                },
            dragOver:function(t, e, flag) {
                   $('.zwf').remove();
                    if(flag){ 
                    	this.upDropFrame.addClass("hover-drop-handler");
                         this.frame.before('<div class="zwf">我是占位框<div>');   
                    }else{
                     	this.downDropFrame.addClass("hover-drop-handler");
                        this.frame.after('<div class="zwf">我是占位框<div>'); 
                    } 
                },
            dropHanlder:function(t, ui, flag) {
                    $('.zwf').remove();                               
                    var draggable = ui.draggable;
                    var  id = draggable.attr("data-component-id");
                    if (flag ){
                    	this.upDropFrame.removeClass("hover-drop-handler");
                    }else{
                    	this.downDropFrame.removeClass("hover-drop-handler");                    
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
                     
                    var dragComponent = $(".component-frame[data-component-id='"+id+"']")[0];

                              //Component.getInstance(id);
                    this.moveComponent(dragComponent, flag)
                },
            dragOut:function(t, ui, flag) {
                 $('.zwf').remove();
	           	 if(flag){
	           	 	this.upDropFrame.removeClass("hover-drop-handler") ;
	           	 }else{
	           	 	this.downDropFrame.removeClass("hover-drop-handler");
	           	 }     
                            
                },
            endEditMode:function() {
                    this.frame.off(),
                    this.frame.removeClass("edit-mode-frame"),
                    this.frame.draggable("destroy"),
                    this.upDropFrame.droppable("destroy"),
                    this.downDropFrame.droppable("destroy"),
                    this.upDropFrame.remove(),
                    this.downDropFrame.remove()
                },
            moveComponent:function(moveComponent,flag){
                	if(flag){
                		this.frame.before(moveComponent);
                	}else{
                		this.frame.after(moveComponent);
                	}
                }
        }
        $(".component-frame").each(function(index,item){
        	 item = $(item);
        	new drag(item);
        })

  });