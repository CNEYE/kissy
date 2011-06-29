/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("ajax/base",function(j,i,l,h){function c(d){d=d||{};j.mix(d,r,false);if(d.crossDomain==null){var n=g.exec(d.url.toLowerCase());d.crossDomain=!!(n&&(n[1]!=p[1]||n[2]!=p[2]||(n[3]||(n[1]==="http:"?80:443))!=(p[3]||(p[1]==="http:"?80:443))))}if(d.data&&!j.isString(d.data))d.data=j.param(d.data);d.type=d.type.toUpperCase();d.hasContent=!k.test(d.type);if(!d.hasContent){if(d.data)d.url+=(/\?/.test(d.url)?"&":"?")+d.data;if(d.cache===false)d.url+=(/\?/.test(d.url)?"&":"?")+"_ksTS="+(j.now()+"_"+
j.guid())}d.dataType=j.trim(d.dataType||"*").split(b);d.context=d.context||d;return d}function a(d,n){f.fire(d,{ajaxConfig:n.config,xhr:n})}function e(d){var n=this.config;d=d.type;this.timeoutTimer&&clearTimeout(this.timeoutTimer);n[d]&&n[d].call(n.context,this.responseData,this.statusText,this);a(d,this)}function f(d){if(d.url){d=c(d);var n=new h(d);a("start",n);var v=new (s[d.dataType[0]]||s["*"])(n);n.transport=v;d.contentType&&n.setRequestHeader("Content-Type",d.contentType);var t=d.dataType[0],
u=d.accepts;n.setRequestHeader("Accept",t&&u[t]?u[t]+(t!=="*"?", */*; q=0.01":""):u["*"]);for(var w in d.headers)n.setRequestHeader(w,d.headers[w]);n.on("complete success error",e);n.readyState=1;a("send",n);if(d.async&&d.timeout>0)n.timeoutTimer=setTimeout(function(){n.abort("timeout")},d.timeout);try{n.state=1;v.send()}catch(x){n.status<2?n.callback(-1,x):j.error(x)}return n}}var b=/\s+/,g=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,o=function(d){return d},k=/^(?:GET|HEAD)$/,m,p;try{m=location.href}catch(q){m=
document.createElement("a");m.href="";m=m.href}p=g.exec(m);m=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/.test(p[1]);var s={},r={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},converters:{text:{json:i.parse,html:o,text:o,xml:j.parseXML}},contents:{xml:/xml/,html:/html/,json:/json/}};r.converters.html=r.converters.text;f.__transports=
s;f.__defaultConfig=r;j.mix(f,l.Target);f.isLocal=m;return f},{requires:["json","event","./xhrobject"]});KISSY.add("ajax/form-serializer",function(j,i){var l=encodeURIComponent;return{serialize:function(h){h=i.get(h);var c=[];j.each(h.elements,function(a){a.disabled||c.push(l(a.name)+"="+l(i.val(a)))});return c.join("&")}}},{requires:["dom"]});
KISSY.add("ajax/form",function(j,i,l,h){i.on("start",function(c){c=c.xhr.config;if(c.form){var a=l.get(c.form);if((a.encoding||a.enctype).toLowerCase()!="multipart/form-data"){if(a=h.serialize(a))if(c.hasContent){c.data=c.data||"";if(c.data)c.data+="&";c.data+=a}else c.url+=(/\?/.test(c.url)?"&":"?")+a}else{a=c.dataType[0];if(a=="*")a="text";c.dataType.length=2;c.dataType[0]="iframe";c.dataType[1]=a}}});return i},{requires:["./base","dom","./form-serializer"]});
KISSY.add("ajax/iframe-upload",function(j,i,l,h){function c(b){this.xhr=b}var a=h.__transports,e=document,f=h.__defaultConfig;f.converters.text.iframe=function(b){return b};f.converters.iframe=f.converters.text;j.augment(c,{send:function(){var b=this.xhr,g=b.config,o,k=i.get(g.form);this.attrs={target:i.attr(k,"target")||"",action:i.attr(k,"action")||""};this.form=k;var m=j.guid("ajax-iframe");b.iframe=i.create("<iframe  id='"+m+"' name='"+m+"' style='position:absolute;left:-9999px;top:-9999px;'/>");
b.iframeId=m;i.prepend(b.iframe,e.body||e.documentElement);i.attr(k,{target:b.iframeId,action:g.url});if(g.data){g=g.data;g=j.unparam(g);o=[];for(var p in g){m=e.createElement("input");m.type="hidden";m.name=p;m.value=g[p];i.append(m,k);o.push(m)}o=o}this.fields=o;l.on(b.iframe,"load error",this._callback,this);k.submit()},_callback:function(b){var g=this.xhr,o=b.type;b=g.iframe;i.attr(this.form,this.attrs);if(o=="load"){o=b.contentWindow.document;g.responseXML=o;g.responseText=i.text(o.body);g.callback(200,
"success")}else o=="error"&&g.callback(500,"error");i.remove(this.fields);l.detach(b);i.remove(b);g.iframe=null},abort:function(){this._callback(0,1)}});a.iframe=c;return h},{requires:["dom","event","./base"]});
KISSY.add("ajax/jsonp",function(j,i){var l=i.__defaultConfig;l.jsonp="callback";l.jsonpCallback=function(){return j.guid("jsonp")};i.on("start",function(h){h=h.xhr;var c=h.config;if(c.dataType[0]=="jsonp"){var a,e=c.jsonpCallback,f=j.isFunction(e)?e():e,b=window[f];c.url+=(/\?/.test(c.url)?"&":"?")+c.jsonp+"="+f;window[f]=function(g){a=[g]};h.on("complete",function(){window[f]=b;if(b===undefined)try{delete window[f]}catch(g){}else a&&b(a[0])});h.converters=h.converters||{};h.converters.script=h.converters.script||
{};h.converters.script.json=function(){a||j.error(" not call jsonpCallback : "+f);return a[0]};c.dataType.length=2;c.dataType[0]="script";c.dataType[1]="json"}});return i},{requires:["./base"]});
KISSY.add("ajax/script",function(j,i){function l(a){if(!a.config.crossDomain&&!a.config.forceScript)return new h["*"](a);this.xhrObj=a;return 0}var h=i.__transports,c=i.__defaultConfig;c.accepts.script="text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";c.contents.script=/javascript|ecmascript/;c.converters.text.script=function(a){j.globalEval(a);return a};j.augment(l,{send:function(){var a=this,e,f=this.xhrObj.config,b=document.head||document.getElementsByTagName("head")[0]||
document.documentElement;a.head=b;e=document.createElement("script");a.script=e;e.async="async";if(f.scriptCharset)e.charset=f.scriptCharset;e.src=f.url;e.onerror=e.onload=e.onreadystatechange=function(g){g=g||window.event;a._callback((g.type||"error").toLowerCase())};b.insertBefore(e,b.firstChild)},_callback:function(a,e){var f=this.script,b=this.xhrObj,g=this.head;if(e||!f.readyState||/loaded|complete/.test(f.readyState)||a=="error"){f.onerror=f.onload=f.onreadystatechange=null;g&&f.parentNode&&
g.removeChild(f);this.head=this.script=undefined;if(!e&&a!="error")b.callback(200,"success");else a=="error"&&b.callback(500,"scripterror")}},abort:function(){this._callback(0,1)}});h.script=l;return i},{requires:["./base","./xhr"]});
KISSY.add("ajax/xhr",function(j,i){function l(){try{return new window.XMLHttpRequest}catch(e){}}var h=i.__transports;i.xhr=window.ActiveXObject?function(e){var f;if(i.isLocal&&!e)a:{try{f=new window.ActiveXObject("Microsoft.XMLHTTP");break a}catch(b){}f=void 0}return f||l()}:l;var c=i.xhr(),a=false;if(c){if("withCredentials"in c)a=true;c=function(e){this.xhrObj=e};j.augment(c,{send:function(){var e=this,f=e.xhrObj,b=f.config;if(b.crossDomain&&!a)j.error("do not allow crossdomain xhr !");else{var g=
i.xhr(),o,k;e.xhr=g;b.username?g.open(b.type,b.url,b.async,b.username,b.password):g.open(b.type,b.url,b.async);if(o=b.xhrFields)for(k in o)g[k]=o[k];f.mimeType&&g.overrideMimeType&&g.overrideMimeType(f.mimeType);if(!b.crossDomain&&!f.requestHeaders["X-Requested-With"])f.requestHeaders["X-Requested-With"]="XMLHttpRequest";try{for(k in f.requestHeaders)g.setRequestHeader(k,f.requestHeaders[k])}catch(m){}g.send(b.hasContent&&b.data||null);if(!b.async||g.readyState==4)e._callback();else g.onreadystatechange=
function(){e._callback()}}},abort:function(){this._callback(0,1)},_callback:function(e,f){try{var b=this.xhr,g=this.xhrObj,o=g.config;if(f||b.readyState==4){b.onreadystatechange=j.noop;if(f)b.readyState!==4&&b.abort();else{var k=b.status;g.responseHeadersString=b.getAllResponseHeaders();var m=b.responseXML;if(m&&m.documentElement)g.responseXML=m;g.responseText=b.responseText;try{var p=b.statusText}catch(q){p=""}if(!k&&i.isLocal&&!o.crossDomain)k=g.responseText?200:404;else if(k===1223)k=204;g.callback(k,
p)}}}catch(s){b.onreadystatechange=j.noop;f||g.callback(-1,s)}}});h["*"]=c;return i}},{requires:["./base"]});
KISSY.add("ajax/xhrobject",function(j,i){function l(a){var e=a.responseText,f=a.responseXML,b=a.config,g=b.converters,o=a.converters||{},k,m,p=b.contents,q=b.dataType;if(e||f){for(b=a.mimeType||a.getResponseHeader("Content-Type");q[0]=="*";)q.shift();if(!q.length)for(k in p)if(p[k].test(b)){q[0]!=k&&q.unshift(k);break}q[0]=q[0]||"text";if(q[0]=="text"&&e!=undefined)m=e;else if(q[0]=="xml"&&f!=undefined)m=f;else j.each(["text","xml"],function(r){var d=q[0];if(o[r]&&o[r][d]||g[r]&&g[r][d]){q.unshift(r);
m=r=="text"?e:f;return false}})}p=q[0];for(b=1;b<q.length;b++){k=q[b];var s=o[p]&&o[p][k]||g[p]&&g[p][k];if(!s)throw"no covert for "+p+" => "+k;m=s(m);p=k}a.responseData=m}function h(a){j.mix(this,{responseData:null,config:a||{},timeoutTimer:null,responseText:null,responseXML:null,responseHeadersString:"",responseHeaders:null,requestHeaders:{},readyState:0,state:0,statusText:null,status:0,transport:null})}var c=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg;j.augment(h,i.Target,{setRequestHeader:function(a,e){this.requestHeaders[a]=
e;return this},getAllResponseHeaders:function(){return this.state===2?this.responseHeadersString:null},getResponseHeader:function(a){var e;if(this.state===2){if(!this.responseHeaders)for(this.responseHeaders={};e=c.exec(this.responseHeadersString);)this.responseHeaders[e[1]]=e[2];e=this.responseHeaders[a]}return e===undefined?null:e},overrideMimeType:function(a){if(!this.state)this.mimeType=a;return this},abort:function(a){a=a||"abort";this.transport&&this.transport.abort(a);this.callback(0,a);return this},
callback:function(a,e){if(this.state!=2){this.state=2;this.readyState=4;var f;if(a>=200&&a<300||a==304)if(a==304){e="notmodified";f=true}else try{l(this);e="success";f=true}catch(b){e="parsererror : "+b}else if(a<0)a=0;this.status=a;this.statusText=e;f?this.fire("success"):this.fire("error");this.fire("complete");this.transport=undefined}}});return h},{requires:["event"]});
KISSY.add("ajax",function(j,i){j.mix(i,{get:function(l,h,c,a,e){if(j.isFunction(h)){a=c;c=h}return i({type:e||"get",url:l,data:h,success:c,dataType:a})},post:function(l,h,c,a){if(j.isFunction(h)){a=c;c=h;h=undefined}return i.get(l,h,c,a,"post")},jsonp:function(l,h,c){if(j.isFunction(h)){c=h;h=null}return i.get(l,h,c,"jsonp")},getScript:j.getScript,getJSON:function(l,h,c){return i.get(l,h,c,"json")},upload:function(l,h,c,a,e){if(j.isFunction(c)){a=c;c=null}return i({url:l,type:"post",dataType:e,form:h,
data:c,success:a})}});return i},{requires:["ajax/base","ajax/xhrobject","ajax/xhr","ajax/script","ajax/jsonp","ajax/form","ajax/iframe-upload"]});