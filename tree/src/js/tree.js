$(function () {
    /*
    第一次加载的时候要遍历到最里面第一个叶子节点为止-trigger第一个节点直到展开第一个子节点为止
    要预留出来的接口方法 展开美股--trigger一下最外层即可
     */
    var defalutoptions = {
        el: '',
        data: {},
        selectedLeaf: function (seq) {}
    }

    var TreeNav = function (el, options) {
        this.el = el;
        this.options = $.extend(defalutoptions, options);
        this.init();
    }
    var fn = TreeNav.prototype;

    fn.init = function () {
        this.build();
        this.bind();
    }
    fn.build = function () {
        //根据ajax获取数据
        var _this = this;
        var ajaxUrl = this.options.url;
        $.ajax({
            url: ajaxUrl,
            dataType: 'json',
            success: function (res) {
                if (res.errno == 0) {
                    _this.createtreeRoot(res.data);
                }
            }
        });
    }
    fn.createtreeRoot = function (data) {
        //构造最外层父节点
        var el = this.el;
        var parentTree = [];
        parentTree.push('<ul class="tree-ul">');
        for (var i = 0; i < data.length; i++) {
            if (data[i].isleaf) {
                var leaf = this.createTreeleaf(data[i]);
                parentTree.push(leaf);
            } else {
                var parentTreeNode = this.createParentTreeItem(data[i]);
                parentTree.push(parentTreeNode);
            }
        }
        parentTree.push('</ul>');
        $(el).empty().append(parentTree.join(''));
        this.options.afterBuildRoot(data);
    }
    fn.createParentTreeItem = function (item) {
        var parentTreeNode = [];
        parentTreeNode.push('<li class="parent-tree-item" data-seq="' + item.seq + '" seq="' + item.seq + '">');
        if (item.ename) {
            parentTreeNode.push('<div class="parent-tree-item-name"> <span class="">' + item.cname +
                '</span><label class="">' + item.ename + '</label> <i class="tree-contrl-icon"></i></div>');
        } else {
            parentTreeNode.push('<div class="parent-tree-item-name"> <span class="">' + item.cname +
                '</span><label class=""></label> <i class="tree-contrl-icon"></i></div>');
        }
        parentTreeNode.push('</li>');
        return parentTreeNode.join('');
    }

    fn.createChild = function (data) {
        var childtree = [];
        childtree.push('<ul class="child-tree">');
        var childTreeItemName;
        for (var i = 0; i < data.length; i++) {
            if (data[i].isleaf) {
                var leaf = this.createTreeleaf(data[i]);
                childtree.push(leaf);
            } else {
                childtree.push('<li class="child-tree-item"  data-seq="' + data[i].seq + '">');
                if (data[i].ename) {
                    childTreeItemName = ' <div class="child-tree-item-name"> <span>' + data[i].cname +
                        ' </span><label>' + data[i].ename + '</label> <i class="tree-contrl-icon"></i> </div>';
                } else {
                    childTreeItemName = ' <div class="child-tree-item-name"> <span>' + data[i].cname +
                        ' </span><label></label> <i class="tree-contrl-icon"></i> </div>';
                }
                childtree.push(childTreeItemName);
            }
            childtree.push('</li>');
        }
        childtree.push('</ul>');
        return childtree.join('');
    }
    fn.createTreeleaf = function (data) {
            //叶子节点 暂时使用tbCname
            return '<li class="tree-leaf-item" data-seq="' + data.seq + '" ><p>' + data.tbCname + '</span><p>' + data.ename + '</p></li>';
        }
        /**
         * 展开seq父目录 子目录都关闭,而且没有叶子节点被选中
         * */
    fn.openParentNode = function (rootSeq) {
        var prentTreeNode = $('.parent-tree-item[data-seq=' + rootSeq + ']');
        if (prentTreeNode.hasClass('tree-open')) {
            prentTreeNode.find('tree-open').removeClass('tree-open');
            prentTreeNode.find('tree-open').removeClass('tree-open');
        } else {
            prentTreeNode.trigger("click");
        }
    }

    /**
     *  展开rootSeq父目录第一个子目录的第一个子节点
     *  */
    fn.selectedFirstleafNode = function (rootSeq) {
        var prentTreeNode = $('.parent-tree-item[data-seq=' + rootSeq + ']');
        var childTree = prentTreeNode.children("ul");
        if (childTree.length == 0) { //子节点已加载
            this.createFisrtLeaf(prentTreeNode, rootSeq);
        } else {
            this.checkFisrtLeaf(childTree);
        }
        prentTreeNode.addClass('tree-open');
    }
    fn.checkFisrtLeaf = function (content) {
        //展开一层 判断第一个节点是否叶子节点
        var firstLi = content.find("li:eq(0)");;
        var seq = firstLi.data('seq');
        if (firstLi.hasClass('tree-leaf-item')) {
            //是叶子节点 取消其他节点选中效果 增加当前节点选中效果 
            this.selectedleafStatus(firstLi, seq);
            return;
        } else {
            firstLi.addClass('tree-open');
            var childTree = firstLi.children("ul"); //子节点已加载
            if (childTree.length == 0) {
                this.createFisrtLeaf(firstLi, seq);
            } else {
                this.checkFisrtLeaf(childTree, seq)
            }
        }
    }
    fn.createFisrtLeaf = function (content, seq) {
        content.addClass('tree-open');
        var that = this;
        var ajaxUrl = this.options.url;
        $.ajax({
            url: ajaxUrl + "?seq=" + seq,
            dataType: 'json',
            success: function (res) {
                var dom = that.createChild(res.data);
                dom = $(dom);
                //判断res.data里面第一个res.data[0].isleaf
                content.append(dom);
                var firstLi = dom.find("li:eq(0)");
                var first = res.data[0];
                if (!first.isleaf) {
                    that.createFisrtLeaf(firstLi, first.seq);
                } else {
                    that.selectedleafStatus(firstLi, first.seq);
                    return;
                }
            }
        });
    }

    /**
     * 根据leafSeq选中某一个叶子节点  rootSeq leafSeq
     **/
    fn.selelctedleafBySeq = function (rootSeq, leafSeq) {
        var prentTreeNode = $('.parent-tree-item[data-seq=' + rootSeq + ']');
        var childTree = prentTreeNode.children("ul");
        if (childTree.length == 0) {
            this.createLeafBySeq(prentTreeNode, rootSeq, leafSeq);
        } else {
            //子节点已加载
            this.checkLeafBySeq(childTree, leafSeq);
        }
        prentTreeNode.addClass('tree-open');
    }
    fn.checkLeafBySeq = function (content, leafSeq) {
        //展开一层 判断节点是否叶子节点
        var _this = this;
        var liList = content.children('li');
        liList.each(function (index, liItem) {
            liItem = $(liItem);
            var seq = liItem.data('seq');
            if (liItem.hasClass('tree-leaf-item')) {
                _this.selectedleafStatus(liItem, seq);
                return;
            } else {
                liItem.addClass('tree-open');
                var childTree = liItem.children("ul"); //子节点已加载
                if (childTree.length == 0) {
                    _this.createLeafBySeq(liItem, seq, leafSeq);
                } else {
                    _this.checkLeafBySeq(childTree, leafSeq)
                }
            }
        });
    }
    fn.createLeafBySeq = function (content, seq, leafSeq) {
        content.addClass('tree-open');
        var that = this;
        var ajaxUrl = this.options.url;
        $.ajax({
            url: ajaxUrl + "?seq=" + seq,
            dataType: 'json',
            success: function (res) {
                var dom = that.createChild(res.data);
                dom = $(dom);
                //判断res.data里面 res.data[i].isleaf
                content.append(dom);
                for (var i = 0; i < res.data.length; i++) {
                    var item = res.data[i];
                    var liItem = dom.find("li:eq(" + i + ")");
                    if (!item.isleaf) {
                        that.createLeafBySeq(liItem, item.seq, leafSeq);
                    } else if (item.seq == leafSeq) {
                        that.selectedleafStatus(liItem, item.seq);
                        return;
                    }
                }

            }
        });
    }
    fn.appendChildTree = function (parentLi, seq) {
            var _this = this;
            var ajaxUrl = _this.options.url;
            $.ajax({
                url: ajaxUrl + "?seq=" + seq,
                dataType: 'json',
                success: function (res) {
                    if (res.errno == 0) {
                        var childTree = _this.createChild(res.data);
                        parentLi.append(childTree);
                    }
                }
            });
        }
        /**
         * 给leaf节点-liItem添加选中效果 并取消其他节点的选中效果
         *  */
    fn.selectedleafStatus = function (liItem, seq) {
        var LiRoot = liItem.parents(".parent-tree-item")
        var other = LiRoot.siblings();
        other.find('.tree-open').removeClass('tree-open');
        other.find('.leaf-selected').removeClass('leaf-selected');
        other.removeClass('tree-open');

        LiRoot.find('.leaf-selected').removeClass('leaf-selected');
        liItem.addClass("leaf-selected");
        this.options.selectedLeaf(seq);
    }
    fn.bind = function () {
        var el = this.el;
        var _this = this;
        $(el).on("click", ".parent-tree-item-name", function () {
            var parentLi = $(this).parent('li');
            if (parentLi.hasClass("tree-open")) {
                parentLi.removeClass("tree-open");
            } else {
                parentLi.addClass("tree-open");
                var seq = parentLi.data('seq');
                if (parentLi.find('ul').length == 0) {
                    _this.appendChildTree(parentLi, seq);
                }
            }
        });
        $(el).on("click", ".child-tree-item-name", function () {
            var parentLi = $(this).parent('li');
            if (parentLi.hasClass("tree-open")) {
                parentLi.removeClass("tree-open");
            } else {
                parentLi.addClass("tree-open");
                var seq = parentLi.data('seq');
                if (parentLi.find('ul').length == 0) {
                    _this.appendChildTree(parentLi, seq);
                }
            }
        });
        $(el).on("click", ".tree-leaf-item", function () {
            if (!$(this).hasClass("leaf-selected")) {
                $(el).find('.tree-leaf-item').removeClass('leaf-selected');
                $(this).addClass("leaf-selected");
                var seq = $(this).data('seq');
                _this.options.selectedLeaf(seq);
            }
        });

    }

    window.TreeNav = TreeNav;

});