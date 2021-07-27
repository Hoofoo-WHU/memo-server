!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=2)}([function(e,t){e.exports=require("leanengine")},function(e,t){e.exports=require("koa-router")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=o(0),s=o(3);n.init({appId:process.env.LEANCLOUD_APP_ID,appKey:process.env.LEANCLOUD_APP_KEY,masterKey:process.env.LEANCLOUD_APP_MASTER_KEY}),n.Cloud.useMasterKey();const i=parseInt(process.env.LEANCLOUD_APP_PORT||process.env.PORT||"3000");s.default.listen(i,()=>{console.log("Memo app is running on port:",i),process.on("uncaughtException",e=>{console.error("Caught exception:",e.stack)}),process.on("unhandledRejection",(e,t)=>{console.error("Unhandled Rejection at: Promise ",t," reason: ",e.stack)})})},function(e,t,o){"use strict";var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(s,i){function r(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){e.done?s(e.value):new o(function(t){t(e.value)}).then(r,u)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=o(4),i=o(6),r=o(7),u=o(8),a=o(9),c=o(10),d=o(1),l=o(11),f=o(0),p=new r;p.keys=["memo"],p.use(a(f.koa())),p.use(c()),p.use(u()),p.use(l({maxAge:"session",sameSite:"none"},p)),p.use((e,t)=>n(this,void 0,void 0,function*(){e.set("Access-Control-Allow-Origin",e.header.origin),e.set("Access-Control-Allow-Methods","PATCH,OPTION,POST,GET,DELETE"),e.set("Access-Control-Allow-Headers","Content-Type"),e.set("Access-Control-Allow-Credentials","true"),yield t()}));const y=new d({prefix:"/api"});y.use(i.default.routes()),y.use(s.default.routes()),p.use(y.routes()),t.default=p},function(e,t,o){"use strict";var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(s,i){function r(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){e.done?s(e.value):new o(function(t){t(e.value)}).then(r,u)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=o(5),i=new(o(1))({prefix:"/login"}),r=process.env.GITHUB_CLIENT_ID,u=process.env.GITHUB_CLIENT_SECRET;i.post("/github/:code",e=>n(this,void 0,void 0,function*(){if(!e.session.isLogin){if("undefined"===e.params.code)return void(e.status=403);const t=yield s.default({data:{client_id:r,client_secret:u,code:e.params.code},headers:{Accept:"application/json"},method:"post",url:"https://github.com/login/oauth/access_token"});if(t.data.error)return e.status=403,void(e.body={error:t.data.error,error_description:t.data.error_description});{const o=yield s.default.get("https://api.github.com/user",{headers:{Authorization:`token ${t.data.access_token}`}});e.session.avatar=o.data.avatar_url,e.session.id=o.data.id,e.session.isLogin=!0,e.session.name=o.data.name}}e.body={avatar:e.session.avatar,name:e.session.name}})),t.default=i},function(e,t){e.exports=require("axios")},function(e,t,o){"use strict";var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(s,i){function r(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){e.done?s(e.value):new o(function(t){t(e.value)}).then(r,u)}a((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=o(1),i=o(0),r=new s;r.prefix("/memo");const u=i.Object.extend("Memo");r.options("/:id",e=>n(this,void 0,void 0,function*(){e.status=200})),r.all("*",(e,t)=>n(this,void 0,void 0,function*(){if(!e.session.isLogin)return e.status=403,void(e.message="not login");yield t()})),r.get("/",e=>n(this,void 0,void 0,function*(){const t=new i.Query("Memo");t.equalTo("id",e.session.id);const o=yield t.find();e.body=o})),r.get("/:id",e=>n(this,void 0,void 0,function*(){try{const t=new i.Query("Memo"),o=yield t.get(e.params.id);o.get("id")===e.session.id?e.body=o:e.status=403}catch(t){e.status=404}})),r.post("/",e=>n(this,void 0,void 0,function*(){const t=new u;t.set("id",e.session.id);const o=yield t.save();e.body=o})),r.patch("/:id",e=>n(this,void 0,void 0,function*(){try{const t=new i.Query("Memo"),o=yield t.get(e.params.id);if(o.get("id")!==e.session.id)return void(e.status=403);Reflect.ownKeys(e.request.body).forEach(t=>{o.set(t,e.request.body[t])});const n=yield o.save();e.body=n}catch(t){e.status=400}})),r.delete("/:id",e=>n(this,void 0,void 0,function*(){try{const t=new i.Query("Memo"),o=yield t.get(e.params.id);if(o.get("id")!==e.session.id)return void(e.status=403);const n=yield o.destroy();e.body=n}catch(t){e.status=400}})),t.default=r},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("koa-bodyparser")},function(e,t){e.exports=require("koa-convert")},function(e,t){e.exports=require("koa-logger")},function(e,t){e.exports=require("koa-session")}]);