KISSY.add("calendar",function(a){Y=YAHOO;$D=Y.util.Dom;$E=Y.util.Event;Y.namespace("Calendar");Calendar=function(){this.init.apply(this,arguments)};a.mix(Calendar.prototype,{init:function(f,d){var e=this;e.id=e.C_Id=f;e.buildParam(d);if(!e.popup){e.con=new Y.util.Element(f)}else{var c=new Y.util.Element(f);e.trigger=c;e.C_Id="C_"+Math.random().toString().replace(/.\./i,"");var b=document.createElement("div");b.id=e.C_Id;document.getElementsByTagName("body")[0].appendChild(b);e.con=new Y.util.Element(e.C_Id);e.con.setStyle("top","0px");e.con.setStyle("position","absolute");e.con.setStyle("background","white");e.con.setStyle("visibility","hidden")}e.buildEventCenter();e.render();e.buildEvent();return this},buildEventCenter:function(){var c=this;c.EventCenter={};var b=function(e){for(var d=0;d<e.length;d++){var f=e[d];c.EventCenter[f]=new Y.util.CustomEvent(f)}};b(["select","switch","rangeselect","timeselect","selectcomplete","hide","show"]);return this},on:function(b,d){var c=this;c.EventCenter[b].subscribe(function(f,e){d.apply(d,e)});return this},render:function(g){var e=this;var g=g||{};e.parseParam(g);e.ca=[];e.con.addClass("c-call clearfix multi-"+e.multi_page);e.con.set("innerHTML","");for(var d=0,f=[e.year,e.month];d<e.multi_page;d++){if(d==0){var c=true}else{var c=false;f=e.computeNextMonth(f)}if(d==(e.multi_page-1)){var b=true}else{var b=false}e.ca.push(new e.Call({year:f[0],month:f[1],prev_arrow:c,next_arrow:b,withtime:e.withtime},e));e.ca[d].render()}return this},showdate:function(e,c){var b=new Date(c-0+e*86400000);b=b.getFullYear()+"/"+(b.getMonth()+1)+"/"+b.getDate();return new Date(b)},buildEvent:function(){var b=this;if(!b.popup){return this}$E.on(document,"click",function(d){var c=$E.getTarget(d);if(c.id==b.C_Id){return}if(!$D.isAncestor($D.get(b.C_Id),c)){b.hide()}});$E.on(b.id,"click",function(c){$E.stopEvent(c);if(b.con.getStyle("visibility")=="hidden"){b.show()}else{b.hide()}});return this},show:function(){var d=this;d.con.setStyle("visibility","");var c=$D.getXY(d.trigger.get("id"))[0];var b=$D.getXY(d.trigger.get("id"))[1]+Number($D.getRegion(d.trigger.get("id")).height);d.con.setStyle("left",c.toString()+"px");d.con.setStyle("top",b.toString()+"px");return this},hide:function(){var b=this;b.con.setStyle("visibility","hidden");return this},buildParam:function(f){var c=this;if(typeof f=="undefined"||f==null){var f={}}c.date=(typeof f.date=="undefined"||f.date==null)?new Date():f.date;c.selected=(typeof f.selected=="undefined"||f.selected==null)?c.date:f.selected;c.multi_page=(typeof f.multi_page=="undefined"||f.multi_page==null)?1:f.multi_page;c.closeable=(typeof f.closeable=="undefined"||f.closeable==null)?false:f.closeable;c.range_select=(typeof f.range_select=="undefined"||f.range_select==null)?false:f.range_select;c.mindate=(typeof f.mindate=="undefined"||f.mindate==null)?false:f.mindate;c.maxdate=(typeof f.maxdate=="undefined"||f.maxdate==null)?false:f.maxdate;c.multi_select=(typeof f.multi_select=="undefined"||f.multi_select==null)?false:f.multi_select;c.navigator=(typeof f.navigator=="undefined"||f.navigator==null)?true:f.navigator;c.arrow_left=(typeof f.arrow_left=="undefined"||f.arrow_left==null)?false:f.arrow_left;c.arrow_right=(typeof f.arrow_right=="undefined"||f.arrow_right==null)?false:f.arrow_right;c.popup=(typeof f.popup=="undefined"||f.popup==null)?false:f.popup;c.withtime=(typeof f.withtime=="undefined"||f.withtime==null)?false:f.withtime;c.action=(typeof f.action=="undefined"||f.action==null)?["click"]:f.action;if(typeof f.range!="undefined"&&f.range!=null){var b=c.showdate(1,new Date(f.range.start.getFullYear()+"/"+(f.range.start.getMonth()+1)+"/"+(f.range.start.getDate())));var d=c.showdate(1,new Date(f.range.end.getFullYear()+"/"+(f.range.end.getMonth()+1)+"/"+(f.range.end.getDate())));c.range={start:b,end:d}}else{c.range={start:null,end:null}}return this},parseParam:function(d){var c=this;if(typeof d=="undefined"||d==null){var d={}}for(var b in d){c[b]=d[b]}c.handleDate();return this},getNumOfDays:function(b,c){return 32-new Date(b,c-1,32).getDate()},templetShow:function(c,h){var g=this;if(h instanceof Array){var e="";for(var d=0;d<h.length;d++){e+=g.templetShow(c,h[d])}c=e}else{var j=c.match(/{\$(.*?)}/g);if(h!==undefined&&j!=null){for(var d=0,b=j.length;d<b;d++){var f=j[d].replace(/({\$)|}/g,"");value=(h[f]!==undefined)?h[f]:"";c=c.replace(j[d],value)}}}return c},handleDate:function(){var c=this;var b=c.date;c.weekday=b.getDay()+1;c.day=b.getDate();c.month=b.getMonth();c.year=b.getFullYear();return this},getHeadStr:function(b,c){return b.toString()+"��"+(Number(c)+1).toString()+"��"},monthAdd:function(){var b=this;if(b.month==11){b.year++;b.month=0}else{b.month++}b.date=new Date(b.year.toString()+"/"+(b.month+1).toString()+"/"+b.day.toString());return this},monthMinus:function(){var b=this;if(b.month==0){b.year--;b.month=11}else{b.month--}b.date=new Date(b.year.toString()+"/"+(b.month+1).toString()+"/"+b.day.toString());return this},computeNextMonth:function(b){var e=this;var d=b[0];var c=b[1];if(c==11){d++;c=0}else{c++}return[d,c]},handleRange:function(e){var c=this;var e=c.showdate(1,e);if((c.range.start==null&&c.range.end==null)||(c.range.start!=null&&c.range.end!=null)){c.range.start=e;c.range.end=null;c.render()}else{if(c.range.start!=null&&c.range.end==null){c.range.end=e;if(c.range.start.getTime()>c.range.end.getTime()){var b=c.range.start;c.range.start=c.range.end;c.range.end=b}else{if(/532/.test(Y.env.ua.webkit)){c.range.start=c.showdate(-1,c.range.start)}}c.EventCenter.rangeselect.fire(c.range);c.render()}}return this},TimeSelector:function(e,b){this.fathor=b;this.fcon=$D.getAncestorByClassName(e,"c-box");this.popupannel=new Y.util.Element($D.getElementsByClassName("selectime","div",this.fcon)[0]);if(typeof b._time=="undefined"){b._time=new Date()}this.time=b._time;this.status="s";var d=document.createElement("div");d.className="c-time";d.innerHTML='ʱ�䣺<span class="h">h</span>:<span class="m">m</span>:<span class="s">s</span><!--{{arrow--><div class="cta"><button class="u"></button><button class="d"></button></div><!--arrow}}-->';this.ctime=new Y.util.Element(d);var c=document.createElement("button");c.className="ct-ok";c.innerHTML="ȷ��";this.button=new Y.util.Element(c);this.h_a=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];this.m_a=["00","10","20","30","40","50"];this.s_a=["00","10","20","30","40","50"];this.parseSubHtml=function(f){var h="";for(var g=0;g<f.length;g++){h+='<a href="javascript:void(0);" class="item">'+f[g]+"</a>"}h+='<a href="javascript:void(0);" class="x">x</a>';return h};this.showPopup=function(g){var i=this;this.popupannel.set("innerHTML",g);this.popupannel.removeClass("hidden");var f=i.status;var h=i.ctime;new Y.util.Element($D.getElementsByClassName("h","span",i.ctime)[0]).removeClass("on");new Y.util.Element($D.getElementsByClassName("m","span",i.ctime)[0]).removeClass("on");new Y.util.Element($D.getElementsByClassName("s","span",i.ctime)[0]).removeClass("on");switch(f){case"h":new Y.util.Element($D.getElementsByClassName("h","span",i.ctime)[0]).addClass("on");break;case"m":new Y.util.Element($D.getElementsByClassName("m","span",i.ctime)[0]).addClass("on");break;case"s":new Y.util.Element($D.getElementsByClassName("s","span",i.ctime)[0]).addClass("on");break}};this.hidePopup=function(){var f=this;f.popupannel.addClass("hidden")};this.render=function(){var j=this;var i=j.get("h");var f=j.get("m");var g=j.get("s");j.fathor._time=j.time;$D.getElementsByClassName("h","span",j.ctime)[0].innerHTML=i;$D.getElementsByClassName("m","span",j.ctime)[0].innerHTML=f;$D.getElementsByClassName("s","span",j.ctime)[0].innerHTML=g;return j};this.set=function(f,g){var h=this;var g=Number(g);switch(f){case"h":h.time.setHours(g);break;case"m":h.time.setMinutes(g);break;case"s":h.time.setSeconds(g);break}h.render()};this.get=function(f){var g=this;var h=g.time;switch(f){case"h":return h.getHours();break;case"m":return h.getMinutes();break;case"s":return h.getSeconds();break}};this.add=function(){var h=this;var f=h.status;var g=h.get(f);g++;h.set(f,g)};this.minus=function(){var h=this;var f=h.status;var g=h.get(f);g--;h.set(f,g)};this.init=function(){var f=this;e.set("innerHTML","");e.appendChild(f.ctime);e.appendChild(f.button);f.render();f.popupannel.on("click",function(i){var h=new Y.util.Element($E.getTarget(i));if(h.hasClass("x")){f.hidePopup();return}else{if(h.hasClass("item")){var g=Number(h.get("innerHTML"));f.set(f.status,g);f.hidePopup();return}}});f.button.on("click",function(g){var h=f.fathor.date;h.setHours(f.get("h"));h.setMinutes(f.get("m"));h.setSeconds(f.get("s"));f.fathor.EventCenter.timeselect.fire(h);if(f.fathor.popup&&f.fathor.closeable){f.fathor.hide()}});$E.on($D.getElementsByClassName("u","button",f.ctime)[0],"click",function(g){f.hidePopup();f.add()});$E.on($D.getElementsByClassName("d","button",f.ctime)[0],"click",function(g){f.hidePopup();f.minus()});$E.on($D.getElementsByClassName("h","span",f.ctime)[0],"click",function(h){var g=f.parseSubHtml(f.h_a);f.status="h";f.showPopup(g)});$E.on($D.getElementsByClassName("m","span",f.ctime)[0],"click",function(h){var g=f.parseSubHtml(f.m_a);f.status="m";f.showPopup(g)});$E.on($D.getElementsByClassName("s","span",f.ctime)[0],"click",function(h){var g=f.parseSubHtml(f.s_a);f.status="s";f.showPopup(g)})};this.init()},Call:function(c,b){this.fathor=b;this.month=Number(c.month);this.year=Number(c.year);this.prev_arrow=c.prev_arrow;this.next_arrow=c.next_arrow;this.node=null;this.id="";this.EV=[];this.html=['<div class="c-hd">','<a href="javascript:void(0);" class="prev {$prev}"><</a>','<a href="javascript:void(0);" class="title">{$title}</a>','<a href="javascript:void(0);" class="next {$next}">></a>',"</div>",'<div class="c-bd">','<div class="whd">',"<span>��</span>","<span>һ</span>","<span>��</span>","<span>��</span>","<span>��</span>","<span>��</span>","<span>��</span>","</div>",'<div class="dbd clearfix">',"{$ds}","</div>","</div>",'<div class="setime hidden">',"</div>",'<div class="c-ft {$showtime}">','<div class="c-time">',"ʱ�䣺00:00 	&hearts;","</div>","</div>",'<div class="selectime hidden"><!--���Դ�ŵ�ѡʱ���һЩ�ؼ�ֵ-->',"</div>"].join("");this.nav_html=["<p>","��",'<select value="{$the_month}">','<option class="m1" value="1">01</option>','<option class="m2" value="2">02</option>','<option class="m3" value="3">03</option>','<option class="m4" value="4">04</option>','<option class="m5" value="5">05</option>','<option class="m6" value="6">06</option>','<option class="m7" value="7">07</option>','<option class="m8" value="8">08</option>','<option class="m9" value="9">09</option>','<option class="m10" value="10">10</option>','<option class="m11" value="11">11</option>','<option class="m12" value="12">12</option>',"</select>","</p>","<p>","��",'<input type="text" value="{$the_year}" onfocus="this.select()"></input>',"</p>","<p>",'<button class="ok">ȷ��</button><button class="cancel">ȡ��</button>',"</p>"].join("");this.renderUI=function(){var h=this;h.HTML="";var d={};d.prev="";d.next="";d.title="";d.ds="";if(!h.prev_arrow){d.prev="hidden"}if(!h.next_arrow){d.next="hidden"}if(!h.fathor.showtime){d.showtime="hidden"}d.id=h.id="cc-"+Math.random().toString().replace(/.\./i,"");d.title=h.fathor.getHeadStr(h.year,h.month);h.createDS();d.ds=h.ds;var e=h.fathor.con.get("innerHTML");var f=document.createElement("div");f.innerHTML=h.fathor.templetShow(h.html,d);f.className="c-box";f.id=d.id;h.fathor.con.appendChild(f);h.node=new Y.util.Element(h.id);if(h.fathor.withtime){var g=new Y.util.Element($D.getElementsByClassName("c-ft","div",h.id)[0]);g.removeClass("hidden");h.timmer=new h.fathor.TimeSelector(g,h.fathor)}return this};this.buildEvent=function(){var f=this;var d=new Y.util.Element(f.id);var e=new Y.util.Element($D.getElementsByClassName("setime","div",f.id)[0]);$E.purgeElement($D.getElementsByClassName("dbd","div",d.get("id")));$E.on($D.getElementsByClassName("dbd","div",d.get("id")),"click",function(h){$E.stopEvent(h);var g=$E.getTarget(h);if($D.hasClass(g,"null")){return}if($D.hasClass(g,"disabled")){return}var j=Number(g.innerHTML);var i=new Date(f.year+"/"+(f.month+1)+"/"+j);f.fathor.date=i;f.fathor.EventCenter.select.fire(i);if(f.fathor.popup&&f.fathor.closeable){f.fathor.hide()}if(f.fathor.range_select){f.fathor.handleRange(i)}f.fathor.render({selected:i})});$E.purgeElement($D.getElementsByClassName("prev","a",d.get("id")),false,"click");$E.on($D.getElementsByClassName("prev","a",d.get("id")),"click",function(g){$E.stopEvent(g);f.fathor.monthMinus().render();f.fathor.EventCenter["switch"].fire(new Date(f.fathor.year+"/"+(f.fathor.month+1)+"/01"))});$E.purgeElement($D.getElementsByClassName("next","a",d.get("id")),false,"click");$E.on($D.getElementsByClassName("next","a",d.get("id")),"click",function(g){$E.stopEvent(g);f.fathor.monthAdd().render();f.fathor.EventCenter["switch"].fire(new Date(f.fathor.year+"/"+(f.fathor.month+1)+"/01"))});if(f.fathor.navigator){$E.purgeElement($D.getElementsByClassName("title","a",d.get("id")),false,"click");$E.on($D.getElementsByClassName("title","a",d.get("id")),"click",function(h){$E.stopEvent(h);try{f.timmer.hidePopup()}catch(h){}e.set("innerHTML","");var g=f.fathor.templetShow(f.nav_html,{the_month:f.month+1,the_year:f.year});e.set("innerHTML",g);e.removeClass("hidden");$E.on(d.getElementsByTagName("input").item(0),"keydown",function(l){$E.stopEvent(l);var k=$E.getTarget(l);if(l.keyCode==38){k.value=Number(k.value)+1;k.select()}if(l.keyCode==40){k.value=Number(k.value)-1;k.select()}if(l.keyCode==13){var j=e.getElementsByTagName("select").item(0).value;var i=e.getElementsByTagName("input").item(0).value;f.fathor.render({date:new Date(i+"/"+j+"/01")});f.fathor.EventCenter["switch"].fire(new Date(i+"/"+j+"/01"));e.addClass("hidden")}})});$E.purgeElement($D.getElementsByClassName("setime","div",d.get("id")),false,"click");$E.on($D.getElementsByClassName("setime","div",d.get("id")),"click",function(j){$E.stopEvent(j);var i=$E.getTarget(j);if($D.hasClass(i,"ok")){var h=e.getElementsByTagName("select").item(0).value;var g=e.getElementsByTagName("input").item(0).value;f.fathor.render({date:new Date(g+"/"+h+"/01")});f.fathor.EventCenter["switch"].fire(new Date(g+"/"+h+"/01"));e.addClass("hidden")}else{if($D.hasClass(i,"cancel")){e.addClass("hidden")}}})}return this};this.getNode=function(){var d=this;return d.node};this.createDS=function(){var l=this;var f="";var j=new Date(l.year+"/"+(l.month+1)+"/01").getDay();var d=l.fathor.getNumOfDays(l.year,l.month+1)+j;for(var e=0;e<d;e++){if(/532/.test(Y.env.ua.webkit)){var g=new Date(l.year+"/"+Number(l.month+1)+"/"+(e+1-j).toString())}else{var g=new Date(l.year+"/"+Number(l.month+1)+"/"+(e+2-j).toString())}var h=new Date(l.year+"/"+Number(l.month+1)+"/"+(e+1-j).toString());if(e<j){f+='<a href="javascript:void(0);" class="null">0</a>'}else{if(l.fathor.mindate instanceof Date&&new Date(l.year+"/"+(l.month+1)+"/"+(e+2-j)).getTime()<l.fathor.mindate.getTime()){f+='<a href="javascript:void(0);" class="disabled">'+(e-j+1)+"</a>"}else{if(l.fathor.maxdate instanceof Date&&new Date(l.year+"/"+(l.month+1)+"/"+(e+1-j)).getTime()>l.fathor.maxdate.getTime()){f+='<a href="javascript:void(0);" class="disabled">'+(e-j+1)+"</a>"}else{if((l.fathor.range.start!=null&&l.fathor.range.end!=null)&&(g.getTime()>=l.fathor.range.start.getTime()&&h.getTime()<l.fathor.range.end.getTime())){if(e==(j+(new Date()).getDate()-1)&&(new Date()).getFullYear()==l.year&&(new Date()).getMonth()==l.month){f+='<a href="javascript:void(0);" class="range today">'+(e-j+1)+"</a>"}else{f+='<a href="javascript:void(0);" class="range">'+(e-j+1)+"</a>"}}else{if(e==(j+(new Date()).getDate()-1)&&(new Date()).getFullYear()==l.year&&(new Date()).getMonth()==l.month){f+='<a href="javascript:void(0);" class="today">'+(e-j+1)+"</a>"}else{if(e==(j+l.fathor.selected.getDate()-1)&&l.month==l.fathor.selected.getMonth()&&l.year==l.fathor.selected.getFullYear()){f+='<a href="javascript:void(0);" class="selected">'+(e-j+1)+"</a>"}else{f+='<a href="javascript:void(0);">'+(e-j+1)+"</a>"}}}}}}}if(d%7!=0){for(var e=0;e<(7-d%7);e++){f+='<a href="javascript:void(0);" class="null">0</a>'}}l.ds=f;return this};this.render=function(){var d=this;d.renderUI();d.buildEvent();return this}}});a.Calendar=Calendar});