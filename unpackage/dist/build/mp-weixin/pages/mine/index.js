(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/index"],{"77a1":function(t,n,e){"use strict";e.r(n);var r=e("fd8a"),u=e("9105");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("db59");var o,c=e("f0c5"),f=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);n["default"]=f.exports},"8f98":function(t,n,e){},9105:function(t,n,e){"use strict";e.r(n);var r=e("fd8d"),u=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=u.a},a49c:function(t,n,e){"use strict";(function(t){e("2cdb");r(e("66fd"));var n=r(e("77a1"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},db59:function(t,n,e){"use strict";var r=e("8f98"),u=e.n(r);u.a},fd8a:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var u=function(){var t=this,n=t.$createElement;t._self._c},a=[]},fd8d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("a34a"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t,n,e,r,u,a,o){try{var c=t[a](o),f=c.value}catch(i){return void e(i)}c.done?n(f):Promise.resolve(f).then(r,u)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(r,u){var o=t.apply(n,e);function c(t){a(o,r,u,c,f,"next",t)}function f(t){a(o,r,u,c,f,"throw",t)}c(void 0)}))}}var c={data:function(){return{userInfo:{},data:{}}},methods:{getData:function(){var n=this;return o(r.default.mark((function e(){var u,a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return u=t.getStorageSync("openid")||"",e.next=3,n.request({url:n.baseUrl+"/user/"+u,method:"get"});case 3:a=e.sent,n.data=a.data;case 5:case"end":return e.stop()}}),e)})))()}},onLoad:function(){this.userInfo=t.getStorageSync("userInfo"),console.log(this.userInfo)},onShow:function(){this.getData()}};n.default=c}).call(this,e("543d")["default"])}},[["a49c","common/runtime","common/vendor"]]]);