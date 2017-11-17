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
        this.init();
        this.options = $.extend(defalutoptions, options);
    }
    var fn = TreeNav.prototype;

    fn.init = function () {
        this.build();
        this.bind();
    }
    fn.build = function () {
        //根据ajax获取数据 --treeDate
        // $.ajax({
        //         url:"",
        //         data:'',
        //         dataType:'json',
        //         success:function(res){
        //         }
        // }); 
        //构造最外层父节点
        var data = treeDate;
        var el = this.el;
        var parentTree = [];
        parentTree.push('<ul class="tree-ul">');
        for (var i = 0; i < data.length; i++) {
            if (data[i].isleaf) {
                var leaf = this.createTreeleaf(data[i]);
                parentTree.push(leaf);
            } else {
                var parentTreeNode = this.createParentTree(data[i]);
                parentTree.push(parentTreeNode);
            }
        }
        parentTree.push('</ul>');
        $(el).empty().append(parentTree.join(''));
    }
    fn.createParentTree = function (item) {
        var parentTreeNode = [];
        parentTreeNode.push('<li class="parent-tree-item" data-seq="' + item.seq + '">');
        parentTreeNode.push('<div class="parent-tree-item-name"> <span class="">' + item.name +
            '</span><label class="">' + item.ename + '</label> <i class="tree-contrl-icon"></i></div>');
        parentTreeNode.push('</li>');
        return parentTreeNode.join('');
    }

    fn.createChild = function (seq, type) {
        //根据ajax获取数据 --treeleaveData
        // $.ajax({
        //         url:""+seq,
        //         data:'',
        //         dataType:'json',
        //         success:function(res){

        //         }
        // }); 
        var data;
        if (type == 0) {
            data = window.treeleaveData;
        } else {
            data = window.lefdata;
        }

        var childtree = [];
        childtree.push('<ul class="child-tree">');
        var childTreeItemName;
        for (var i = 0; i < data.length; i++) {
            if (data[i].isleaf) {
                var leaf = this.createTreeleaf(data[i]);
                childtree.push(leaf);
            } else {
                childtree.push('<li class="child-tree-item"  data-seq="' + data[i].seq + '">');
                childTreeItemName = ' <div class="child-tree-item-name"> <span>' + data[i].name +
                    ' </span><label>' + data[i].ename + '</label> <i class="tree-contrl-icon"></i> </div>';
                childtree.push(childTreeItemName);
            }
            childtree.push('</li>');
        }
        childtree.push('</ul>');
        return childtree.join('');
    }
    fn.createTreeleaf = function (data) {
        //叶子节点
        return '<li class="tree-leaf-item" data-seq="' + data.seq + '" ><p>' + data.name + '</span><p>' + data.ename + '</p></li>';
    }

    fn.openParentNode = function (seq) {
        //展开seq父目录 子目录都关闭
        var prentTreeNode = $('.parent-tree-item-name[data-seq=' + seq + ']');
        if (prentTreeNode.hasClass('tree-open')) {
            prentTreeNode.find('tree-open').removeClass('tree-open');
        } else {
            prentTreeNode.trigger("click");
        }

    }
    fn.openFirstleafNode = function (seq) {
        //展开seq父目录第一个子目录的第一个子节点
        var prentTreeNode = $('.parent-tree-item-name[data-seq=' + seq + ']');
        var childTree = prentTreeNode.child("ul"); //子节点已加载
        if (childTree.length == 0) {
            this.createFisrtLeaf(prentTreeNode, seq);
        } else {
            this.checkFisrtLeaf(childTree, seq);
        }
        prentTreeNode.addClass('treeopen');
    }
    fn.checkFisrtLeaf = function (content) {
        //展开一层 判断第一个节点是否叶子节点
        var firstLi = content.childfirstLi();
        var seq = firstLi.data('seq');
        if (firstLi.hasClass('tree-leaf-item')) {
            firstLi.addClass("leaf-selected");
            this.options.selectedLeaf(seq);
            return;
        } else {
            firstLi.addClass('treeopen');
            var childTree = firstLi.child("ul"); //子节点已加载
            if (childTree.length == 0) {
                this.createFisrtLeaf(prentTreeNode, seq);
            } else {
                this.checkFisrtLeaf(childTree, seq)
            }
        }
    }
    fn.createFisrtLeaf = function (content, seq) {
        content.addClass('treeopen');
        var that = this;
        $.ajax({
            url: "" + seq,
            data: '',
            dataType: 'json',
            success: function (res) {
                var dom = that.checkFisrtLeaf(res.data, seq);
                //判断res.data里面第一个res.data[0].isleaf
                content.append(dom);
                var firstLi = dom.childfirstLi()
                if (!res.data[0].isleaf) {
                    that.createFisrtLeaf(firstLi, res.data[0].seq);
                } else {
                    firstLi.addClass("leaf-selected");
                    that.options.selectedLeaf(seq);
                    return;
                }
            }
        });
    }
    fn.selelctedlef = function (seq) {
        //选中某一个叶子节点seq
        //这个估计要拿到parentSeq
        var prentTreeNode = $('.parent-tree-item-name[data-seq=' + parentSeq + ']');
        //遍历childNode isleaf&&seq==seq

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
                    var childTree = _this.createChild(seq, 0);
                    parentLi.append(childTree);
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
                    var childTree = _this.createChild(seq, 1);
                    parentLi.append(childTree);
                }
            }
        });
        $(el).on("click", ".tree-leaf-item", function () {
            if (!$(this).hasClass("leaf-selected")) {
                $(el).find('.tree-leaf-item').removeClass('leaf-selected');
                $(this).addClass("leaf-selected");
                var seq = $(this).data('seq');
                that.options.selectedLeaf(seq);
            }
        });

    }

    window.TreeNav = TreeNav;
    window.treeDate = [{
        "name": "股票", //股票名称
        "ename": "Stock",
        "seq": 1, //股票seq
        "isleaf": false,
    }, {
        "name": "港股", //股票名称
        "ename": "Stock",
        "seq": 2, //股票seq
        "isleaf": false,
    }, {
        "name": "美股", //股票名称
        "ename": "Stock",
        "seq": 3, //股票seq
        "isleaf": false,
    }];
    window.treeleaveData = [{
        "name": "基本信息", //股票模块名称
        "ename": "BascicInforamtion",
        "seq": 11, //股票模块seq 
        "isleaf": false,
    }, {
        "name": "股本股东", //股票模块名称
        "ename": "BascicInforamtion",
        "seq": 11, //股票模块seq 
        "isleaf": false,
    }];
    window.lefdata = [{
        "name": "股票置换", //股票模块详情名称
        "ename": "Stock Exchange",
        "seq": 111, //股票模块详情seq
        "isleaf": true
    }, {
        "name": "股票置换日历", //股票模块详情名称
        "ename": "BascicInforamtion",
        "seq": 112, //股票模块详情seq
        "isleaf": true
    }, {
        "name": "公司员工情况", //股票模块详情名称
        "ename": "BascicInforamtion",
        "seq": 113, //股票模块详情seq
        "isleaf": true
    }, {
        "name": "公司主要产品", //股票模块详情名称
        "ename": "BascicInforamtion",
        "seq": 114, //股票模块详情seq
        "isleaf": true
    }];
    new TreeNav(".tree-wrap", {});
});