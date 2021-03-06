/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@index.css');
let DD = require('../mx-dragdrop/index');
let $ = require('$');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me.$range = extra.range;
    },
    render() {
        let me = this;
        me.updater.digest();
        me.$hours = $('#' + me.id + ' .@index.css:hour');
        if (me.$range) {
            me.val(me.$range);
        }
    },
    showRange() {
        let me = this;
        let hours = me.$hours;
        hours.each((idx, item) => {
            item = $(item);
            let start = item.find('.@index.css:start');
            let end = item.find('.@index.css:end');
            if (!item.hasClass('@index.css:active')) {
                start.hide();
                end.hide();
            } else {
                start[item.prev().hasClass('@index.css:active') ? 'hide' : 'show']();
                end[item.next().hasClass('@index.css:active') ? 'hide' : 'show']();
            }
        });
    },
    val(str) {
        let me = this;
        let hours = me.$hours;
        if (str || str === '') {
            hours.each((idx, item) => {
                item = $(item);
                if (str.charAt(idx) == '1') {
                    item.addClass('@index.css:active');
                } else {
                    item.removeClass('@index.css:active');
                }
            });
            me.showRange();
        } else {
            str = [];
            hours.each((idx, item) => {
                item = $(item);
                if (idx < 24)
                    str.push(item.hasClass('@index.css:active') ? 1 : 0);
            });
            str = str.join('');
        }
        return str;
    },
    'start<mousedown>' (e) {
        let me = this;
        let current = $(e.eventTarget);
        let active = current.hasClass('@index.css:active');
        current.toggleClass('@index.css:active');
        me.showRange();
        $('#' + me.id).trigger({
            type: 'change',
            range: me.val()
        });
        me.$active = active;
        me.$drag = true;
        DD.begin(e.target, () => {
            DD.clear();
        }, () => {
            delete me.$drag;
        });
    },
    'over<mouseover>' (e) {
        let me = this;
        if (me.$drag) {
            let flag = !Magix.inside(e.relatedTarget, e.eventTarget);
            if (flag) {
                let current = $(e.eventTarget);
                current[me.$active ? 'removeClass' : 'addClass']('@index.css:active');
                me.showRange();
                $('#' + me.id).trigger({
                    type: 'change',
                    range: me.val()
                });
            }
        }
    }
}, {
    improve(str) {
        if (!str) {
            str = '';
        }
        let start = 0;
        let end = 24;
        while (start < end) {
            if (!str.charAt(start)) {
                str += '0';
            }
            start++;
        }
        return str;
    }
});