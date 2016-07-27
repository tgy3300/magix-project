define('app/views/demos/file-uploader',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('mp-e95',".mp-e95-uploader{width:300px;height:100px;background:#eee;line-height:100px;text-align:center;font-size:20px;margin:30px;cursor:pointer}.mp-e95-test{background-color:#eee;width:400px;height:100px;margin-bottom:20px}");
module.exports = Magix.View.extend({
    tmpl: "<div mx-view=\"coms/uploader/index\" class=\"mp-e95-uploader\">点击上传文件</div><div mx-view=\"coms/range/index\" mx-change=\"range()\"></div><div id=\"test\" class=\"mp-e95-test\"></div><button mx-click=\"test()\">Vframe created test</button>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'range<change>':function(e){
        console.log(e.value);
    }
});
});