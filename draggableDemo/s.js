            key: "beginEditMode",
                value: function() {
                    var t = this;
                    this.frame.addClass("edit-mode-frame"),
                    this.frame.hover(function() {
                        t.enterFrame()
                    }, function() {
                        t.leaveFrame()
                    }),
                    this.frame.draggable({
                        revert: "invalid",
                        helper: "clone",
                        zIndex: 1e4,
                        opacity: .7,
                        start: function(e, n) {
                            return t.startDrag(e, n)
                        },
                        drag: function(e, n) {
                            return t.dragHandler(e, n)
                        },
                        stop: function(e, n) {
                            return t.endDrag(e, n)
                        }
                    }),
                    this.upDropFrame = e('<div class="up-drop-handler"></div>'),
                    this.downDropFrame = e('<div class="down-drop-handler"></div>'),
                    this.frame.append(this.upDropFrame),
                    this.frame.append(this.downDropFrame),
                    this.upDropFrame.droppable({
                        accept: ".component-frame,.new-component",
                        tolerance: "pointer",
                        greedy: !0,
                        over: function(e, n) {
                            return t.dragOver(e, n, !0)
                        },
                        drop: function(e, n) {
                            return t.dropHanlder(e, n, !0)
                        },
                        out: function(e, n) {
                            return t.dragOut(e, n, !0)
                        }
                    }),
                    this.downDropFrame.droppable({
                        accept: ".component-frame,.new-component",
                        tolerance: "pointer",
                        greedy: !0,
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
                    var n = this.getEditor();
                    if (n.isSettingInComponent()) {
                        var r = this.frame.width();
                        this.frame.css({
                            perspective: r + "px"
                        })
                    }
                }
            }, {
                key: "startDrag",
                value: function(t, e) {
                    this.dragging = !0,
                    h["default"].hide()
                }
            }, {
                key: "dragHandler",
                value: function(t, e) {}
            }, {
                key: "endDrag",
                value: function(t, e) {
                    this.dragging = !1
                }
            }, {
                key: "isDragging",
                value: function() {
                    return this.dragging
                }
            }, {
                key: "dragOver",
                value: function(t, e, n) {
                    n ? this.upDropFrame.addClass("hover-drop-handler") : this.downDropFrame.addClass("hover-drop-handler")
                }
            }, {
                key: "dropHanlder",
                value: function(t, e, r) {
                    var o = e.draggable
                      , i = o.attr("data-component-id");
                    if (r ? this.upDropFrame.removeClass("hover-drop-handler") : this.downDropFrame.removeClass("hover-drop-handler"),
                    !i) {
                        var a = o.attr("data-type");
                        if (!a)
                            throw new Error("需要根据对应type创建组件");
                        return void this.parent.emit(s.EVENT.CREATE_CHILD, this, a, r)
                    }
                    var u = n.getInstance(i);
                    this.moveComponent(u, r)
                }
            }, {
                key: "dragOut",
                value: function(t, e, n) {
                    n ? this.upDropFrame.removeClass("hover-drop-handler") : this.downDropFrame.removeClass("hover-drop-handler")
                }
            }, {
                key: "enterFrame",
                value: function() {
                    this.dragging || h["default"].show(this)
                }
            }, {
                key: "leaveFrame",
                value: function() {
                    h["default"].hide()
                }
            }, {
                key: "endEditMode",
                value: function() {
                    this.frame.off(),
                    this.frame.removeClass("edit-mode-frame"),
                    this.frame.draggable("destroy"),
                    this.upDropFrame.droppable("destroy"),
                    this.downDropFrame.droppable("destroy"),
                    this.upDropFrame.remove(),
                    this.downDropFrame.remove()
                }
            }, 