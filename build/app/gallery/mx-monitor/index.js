define("app/gallery/mx-monitor/index",["$"],function(e,o,n){var i=e("$"),d=0,r=[],t=function(e){for(var o=r.length-1;o>=0;o--){var n=r[o];if(n.removed)r.splice(o,1);else{var i=n.view;"mousedown"==e.type&&i.inside(e.target)||i.hide()}}},f=function(e){var o=r[e.id];o&&(o.removed=!0),delete r[e.id]},u=function(e){f(e);var o={view:e};r.push(o),r[e.id]=o},a=function(){d||(i(document).on("mousedown",t),i(window).on("resize",t)),d++},s=function(){d>0&&(--d||(i(document).off("mousedown",t),i(window).off("resize",t)))};n.exports={add:u,remove:f,setup:a,teardown:s}});