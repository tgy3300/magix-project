define('coms/tree/branch',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */

var Magix = require('magix');
var $ = require('$');
module.exports = Magix.View.extend({
    tmpl: "<ul><%for(var i=0,br;i<list.length;i++){br=list[i]%><li class=\"mx-582-li\"><div class=\"mx-582-icon<%if(br.children){%> mx-582-cp<%}%>\" <%if(br.children){%> mx-click=\"toggle({id:'<%=br[dataId]%>'})\" <%}%>><%if(br.children){%>+<%}%></div><div><label><input type=\"checkbox\" mx-change=\"check()\" value=\"<%=br[dataId]%>\"/><%=br[textKey]%></label></div><%if(br.children){%><div mx-view=\"coms/tree/branch?text=<%@textKey%>&id=<%@dataId%>&list=<%@br.children%>\" id=\"<%=id%>_<%=br[dataId]%>\" class=\"mx-582-indent mx-582-none\" test=\"ab\"></div><%}%></li><%}%></ul>",
    tmplData: [],
    ctor: function(extra) {
        var me = this;
        if (Magix.has(extra, 'index')) {
            me.$list = extra.list[extra.index].children;
        } else {
            me.$list = extra.list;
        }
        console.log(me);
        me.$textKey = extra.text;
        me.$dataId = extra.id;
    },
    render: function() {
        var me = this;
        me.$updater.set({
            textKey: me.$textKey,
            id: me.id,
            dataId: me.$dataId,
            list: me.$list
        }).digest();
    },
    checkAll: function(state) {
        $('#' + this.id + ' input[type="checkbox"]').prop('checked', state);
    },
    'toggle<click>': function(e) {
        var node = $('#' + this.id + '_' + e.params.id);
        var current = $(e.current);
        var val = $.trim(current.html());
        if (val == '+') {
            node.slideDown();
            current.html('-');
        } else {
            node.slideUp();
            current.html('+');
        }
    },
    'check<change>': function(e) {
        var me = this;
        var vf = Magix.Vframe.get(me.id + '_' + e.current.value);
        if (vf) {
            vf.invoke('checkAll', e.current.checked);
        }
    }
});
});