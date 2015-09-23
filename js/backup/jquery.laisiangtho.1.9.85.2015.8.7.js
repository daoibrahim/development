(function($,uA){
var z='laisiangtho', version='1.9.85.2015.8.12';
$.fn[z]=function(options){
var app=this, sO=$.extend({Q:['action'],Extend:z,Click:'click',On:z,hash:'hashchange',Device:'desktop',Platform:'web',Layout:z,Browser:'chrome',Orientation:{change:'D1699',landscape:'landscape',portrait:'portrait'}}, options);
return z={
    agent:function(){
        var device={
            is:function(needle){return uA.toLowerCase().indexOf(needle) !== -1;},
            ios:function(){return this.iphone() || this.ipod() || this.ipad();},
            iphone:function(){return !this.windows() && this.is('iphone');},
            ipod:function(){return this.is('ipod');},
            ipad:function(){return this.is('ipad');},
            android:function(){return !this.windows() && this.is('android');},
            androidPhone:function(){return this.android() && this.is('mobile');},
            androidTablet:function(){return this.android() && !this.is('mobile');},
            blackberry:function(){return this.is('blackberry') || this.is('bb10') || this.is('rim');},
            blackberryPhone:function(){return this.blackberry() && !this.is('tablet');},
            blackberryTablet:function(){return this.blackberry() && this.is('tablet');},
            windows:function(){return this.is('windows');},
            windowsPhone:function(){return this.windows() && this.is('phone');},
            windowsTablet:function(){return this.windows() && (this.is('touch') && !this.windowsPhone());},
            fxos:function(){return (this.is('(mobile;') || this.is('(tablet;')) && this.is('; rv:');},
            fxosPhone:function(){return this.fxos() && this.is('mobile');},
            fxosTablet:function(){return this.fxos() && this.is('tablet');},
            meego:function(){return this.is('meego');},
            cordova:function(){return window.cordova && location.protocol === 'file:';},
            chrome:function(){return sO.Platform === 'chrome';},
            nodeWebkit:function(){return typeof window.process === 'object';},
            mobile:function(){return this.androidPhone() || this.iphone() || this.ipod() || this.windowsPhone() || this.blackberryPhone() || this.fxosPhone() || this.meego();},
            tablet:function(){return this.ipad() || this.androidTablet() || this.blackberryTablet() || this.windowsTablet() || this.fxosTablet();},
            //desktop:function(){return !this.tablet() && !this.mobile();},
            Orientation:{
                    handle:function(){
                            $(window.document.documentElement).attr({class:((window.innerHeight / window.innerWidth) < 1)?sO.Orientation.landscape:sO.Orientation.portrait});
                            if(window.config)z.utility.Orientation();
                    },
                    init:function(){
                            if(window.addEventListener){window.addEventListener(sO.OrientationEvent, this.handle, false);} 
                            else if(window.attachEvent){window.attachEvent(sO.OrientationEvent,this.handle);} 
                            else{window[sO.OrientationEvent]=this.handle;}
                            this.handle();
                    }
            },
            get:function(){
                var d=[sO.Extend];
                if(this.mobile()){
                    sO.Deploy='mobile';
                    d.push(sO.Deploy,sO.Platform);//console.log('//MOBILE');
                }else if(this.tablet()) {
                    sO.Deploy='tablet';
                    d.push(sO.Deploy,sO.Platform);//console.log('//TABLET');
                }else{
                    if($.isFunction(this[sO.Device])){
                        d.push(sO.Deploy,sO.Platform);//console.log('//DEPLOY');
                    }else{
                        sO.Deploy=sO.Device;
                        d.push(sO.Deploy,sO.Platform);//console.log('//DESKTOP');
                    }
                }
                if(this.ios()) {
                    d.push('ios');
                } else if (this.android()) {
                    d.push('android');
                }else if($.isFunction(this[sO.Device])){
                    d.push(sO.Device);
                }
                var file=[], df=[];
                for(var i in d){
                    df.push(d[i]);
                    var fl=df.join('.');
                    file.push({type:'link',name:fl},{type:'script',name:fl});
                }
                return file;
            }
        };
        MsgInfo=$('li');
        sO.OrientationEvent=(Object.prototype.hasOwnProperty.call(window, "onorientationchange"))?"orientationchange":"resize";
        this.meta(device.get()).start();
        sO.isCordova=device.cordova();
        sO.isChrome=device.chrome();
        device.Orientation.init();
    },
    meta:function(data){
            return {
                    data:[{type:'script',name:'localforage.min'},{type:'script',name:'Sortable.min'},{type:'script',name:'data.bible'},{type:'script',name:'data.config'},{type:'link',name:sO.Extend,dir:'fonts/fontello/'}],
                    type:{script:{attr:{src:null}, extension:'.js', dir:'js/'},link:{attr:{rel:'stylesheet',href:null}, extension:'.css', dir:'css/'}},
                    start:function(){
                            $.merge(this.data, data||{}); this.src(this.data);
                    },
                    src:function(meta){
                            var self=this, x=meta.shift(), y=x.type, url=(x.dir||this.type[y].dir)+x.name+this.type[y].extension, req=document.createElement(y);
                            for(var i in this.type[y].attr){req[i]=this.type[y].attr[i]||url;}
                            req.onload=function(){
                                    MsgInfo.html(x.name);
                                    if(meta.length){self.src(meta);}else{z.extend();}
                            };
                            document.head.appendChild(req);
                    }
            };
    },
    extend:function(){
            delete this.agent; delete this.meta; delete this.extend;
            window[sO.Extend]=$.extend(this,window[sO.Extend]);
            if(sO.isCordova){
                    MsgInfo.html('getting Device ready').attr({class:'icon-database'});
                    document.addEventListener("deviceready", this.ready, false);
            }else{
                    this.ready();
            }
    },
    ready:function(){
        for(var j in sO.Q){
            var x=($.type(sO.Q[j]) === 'object')?Object.keys(sO.Q[j])[0]:sO.Q[j];
            z[0](x.split(' '),sO.Q[j][x]);
        }
    },
    0:function(x,q){
            if(z[x[0]] && $.isFunction(z[x[0]][x[1]])){return z[x[0]][x[1]](q,x);}
            else if(z[x[0]] && $.isFunction(z[x[0]])){return z[x[0]](q,x);}
            else if(z[x[0]] && $.isFunction(z[x[0]][0])){return z[x[0]][0](q,x);}
            else if(z[x[0]] && z[x[0]][x[1]] && $.isFunction(z[x[0]][x[1]][x[2]])){return z[x[0]][x[1]][x[2]](q,x);}
            else{return false;}
    },
    1:function(x) {
            return this.obj={element:x, name:x.get(0).tagName, class:z.get(x).class(), id:z.get(x).id()};
    },
    watch:function(x){
            return {id:function(){z[0](z[1]($(this)).id);},class:function(){z[0](z[1]($(this)).class,$(this));},go:function(q){z[0](x,q);}};
    },
    action:function(){
            app.on(sO.Click,this.is(sO.On).class,this.watch().class);
    },
    tag:function(x){
            return{
                    layout:{star:'*',link:'link[rel="*"]',form:'form[name="*"]',input:'input[name="*"]',meta:'meta[name="*"]',class:'.*',id:'#*',tag:' <*>',mz:'meta[name="z:*"]'},
                    is:function(y){return this.layout[y].replace('*',x);}
            };
    },
    is:function(x){
            return {class:z.tag(x).is('class'), id:z.tag(x).is('id'), tag:z.tag(x).is('tag'),form:z.tag(x).is('form'),input:z.tag(x).is('input')};
    },
    get:function(x){
            if(x && $.type(x) !== 'object')x=$(x);
            return {
                    d:{id:'-',class:' '},
                    of:function(y,s){return this.do(y,s);},
                    class:function(){return this.do('class',this.d.class);},
                    id:function(){return this.do('id',this.d.id);},
                    href:function(){return this.do('href',true).done;},
                    content:function(){return this.do('content',true).done;},
                    do:function(y,s){this.done=x=x.attr(y); if(s === true){return this; }else if(s){return this.split(s);}else{return this.split(this.d[y]||this.d.class);}},
                    check:function(y){return ($.type(y) !== 'undefined')?y:'';},
                    split:function(y){return this.check(x).split(y);}
            };
    },
    var:{
            link:function(x){x.forEach(function(y){window[y]=z.get(z.tag(y).is('link')).href();});},
            meta:function(x){x.forEach(function(y){window[y]=z.get(z.tag(y).is('meta')).content();});}
    },
    fn:function(x){
        return {
            uniqueid:function(){
                    return new Date().getTime();
            },
            string:function(){
                    return $.map(x,function(v){
                            return $.isNumeric(v)?String.fromCharCode(v):v;
                    }).join('');
            },
            url:function(y){
                    return this.string();
            },
            filesize:function(){
                    if(x===0){return '0 byte';}
                    var k=1000,s=['bytes','kb','mb','gb','tb','pb','eb','zb','yb'],i=Math.floor(Math.log(x) / Math.log(k));
                    return (x / Math.pow(k, i)).toPrecision(3) + ' ' + s[i];
            },
            html:function(dl,position){
                    var ht=$(); $.each(x, function(key,v){
                            var f=(function (k,item,container,is){
                                    var tag=z.is(k).tag,attr=item.attr,child=item.text,df=false;
                                    if(attr && attr.fn){
                                            df=item.attr.fn.split(' '); delete attr.fn;
                                    }
                                    if($.type(child) === 'string'){
                                            var list=$(tag,attr).html(child);
                                    }else if(item.value){
                                            var list=$(tag,attr).val(item.value);
                                    }else if(!child){
                                            var list=$(tag,attr);
                                    }else{
                                            var list=$(tag,attr);
                                            for(i in child){
                                                    if($.isNumeric(i)){
                                                            var k=Object.keys(child[i]); f(k,child[i][k], list);
                                                    }else{
                                                            f(i,child[i], list);
                                                    }
                                            }
                                    }
                                    if(df)z.watch(df).go(list);
                                    if(is){ht=container.add(list);}else{container.append(list);}
                            });
                            f(key,v, ht,true);
                    });
                    if(dl){ ($.type(dl) !== 'object'?$(dl):dl)[position||'append'](ht); }
                    return ht;
            },
            run:function(){
                    var y=$(this), d=z.get(y).of('data-fa'), i=z.get(y).class();
                    if(x[i[0]]){
                            if(d[0] && $.isFunction(x[i[0]][d[0]]))x[i[0]][d[0]](y,d,i);
                            if(i[1] && $.isFunction(x[i[0]][i[1]]))y.off().on(sO.Click,function(e){x[i[0]][i[1]](e);});
                    }
            },
            serializeObject:function(q){
                    var d=q||{};
                    $.each(x.serializeArray(), function(i,v) {
                            d[v.name]=v.value;
                    });
                    return d;
            },
            serializeJSON:function(){
            },
            hash:function(callback){
                    var q=x||location.hash;y={};
                    var match, plus=/\+/g, search=/([^\?#&=]+)=([^&]*)/g, d=function(s){ return decodeURIComponent(s.replace(plus," ")); };
                    while(match = search.exec(q)) y[d(match[1])]=d(match[2]);
                    if(callback){return callback.call(z,y);}
                    else{return y;}
            }
        };
    },
    array:function(d,o){
        return {
            merge:function(y){
                    if($.type(y) === 'array')o=y;
                    this.data=d=d.concat(o).sort(function (a, b) {
                            return a - b;//a > b ? 1 : a < b ? -1 : 0;//a > b ? 1 : a < b ? -1 : 0;
                    });
                    return this;
                    //return (y)?this.unique():this;
            },
            unique:function(){
                    return d.filter(function (item, index) {
                            return d.indexOf(item) === index;
                    });
            },
            removeIfduplicate:function(y){
                    //if(y)d=this.merge(y);
                    return $.map(d,function (v,i) {
                            d[i] === d[i+1] && (d[i] = d[i+1] = null);
                            return d[i];
                    });
            },
            to:function(y){
                return {
                    sentence:function(x){
                                return (d.length>1)?[d.slice(0, -1).join(y||', '), d.slice(-1)[0]].join(x||' & '):d[0];
                        }
                };
            }
        };
    },
    screen:{
        Full:{
            name:function(x){
                    this.screen=x;
            },
            is:function(is){
                    //this.screen.toggleClass('icon-screen-small');
                    if(is){this.screen.addClass('icon-screen-small');}else{this.screen.removeClass('icon-screen-small');}
            }
        },
        Max:{
            name:function(x){
                    this.screen=x;
            },
            is:function(is){
                    //this.screen.toggleClass(config.css.active);
                    if(is){this.screen.addClass(config.css.winActive);}else{this.screen.removeClass(config.css.winActive);}
            }
        },
        Status:function(){
                if(window.screenStatus){
                        if(screenStatus.isFullscreen())z.screen.Full.is(true);
                        if(screenStatus.isMaximized())z.screen.Max.is(true);
                }		
        }
    },
    database:{
        init:function(callback){
            db=this;
            localforage.config({name:config.store.name,storeName:'store',version:config.store.version,description:'the Holy Bible',size:300000000});
            this.driver().then(function(){
                delete db.init; delete db.driver;
            });
            this.ready().then(function(){
                delete db.ready; callback(db);
            });
        },
        driver:function(){
            return localforage.setDriver([localforage.INDEXEDDB,localforage.WEBSQL,localforage.LOCALSTORAGE]);
        },
        ready:function(){
            return localforage.ready();
        },
        deleteDatabase:function(){
            return localforage.clear();
        },
        add:function(q){
            return localforage.setItem(q.table, q.data);//console.log('database add',q.table);
        },
        get:function(q){
            return localforage.getItem(q.table);//console.log('database get',q.table);
        },
        put:function(q){
            return localforage.setItem(q.table, q.data); //console.log('database put',q.table);
        },
        read:function(q){
            localforage.keys(q);
        },
        delete:function(q){
            return localforage.removeItem(q.table);
        },
        UpdateLang:function(){
            return this.add({table:config.store.lang,data:lai.store.lang});
        },
        UpdateNote:function(){
            return this.put({table:config.store.note,data:lai.store.note});
        }
    },
    load:function(){
            h=z.utility.Html(); lai={store:{note:null,lang:{},query:{},lookup:{setting:{},book:{}}},previous:{},todo:{Orientation:true}};
            $('p').addClass(config.css.active).html(config.version);
            $('h1').attr({title:config.build}).attr({class:'icon-fire'});
            var l7=[], l8={}, obj={
                    reading:function(bID){
                            if(config.bible.ready && lai.store.query.bible){
                                    if(config.bible.ready==1){
                                            return lai.store.query.bible;
                                    }else if(config.bible.ready==2){
                                            return bID;
                                    }else{
                                            return true;
                                    }
                            }else{
                                    return true;
                            }
                    },
                    go:function(){
                            var bID=l7.shift(); lai[bID]={};
                            if(lai.store.lang[bID].info){
                                    $("p").html(lai.store.lang[bID].info.name).promise().done(function(){
                                            if(obj.reading(bID) == bID){
                                                    z.content({bible:bID,reading:bID}).xml(function(response){
                                                            obj.next();
                                                    }).read();
                                            }else{
                                                    obj.next();
                                            }
                                    });
                            }else{
                                    this.json(bID,this.next);
                            }
                    },
                    next:function(){
                            if(l7.length){
                                    obj.go();
                            }else{
                                    z.go=function(page,q){
                                            window.location.hash=page+$.param(q);
                                    };
                                    z.load=function(){
                                            $('body').html(z.fn(config.body).html()).promise().done(z.init());
                                    };
                                    $(window).bind(sO.hash,function(){z.init();});
                                    function fSN(){
                                            db.get({table:config.store.note}).then(function(storeNote){
                                                    if(storeNote){
                                                            lai.store.note=storeNote; z.load();
                                                    }else{
                                                            db.put({table:config.store.note,data:config.store.noteData}).then(function(storeNote){
                                                                    lai.store.note=storeNote; z.load();
                                                            });
                                                    }
                                            });
                                    };
                                    function fSL(){
                                            db.get({table:config.store.lookup}).then(function(storeLookup){
                                                    if(storeLookup){
                                                            lai.store.lookup=storeLookup; fSN();
                                                    }else{
                                                            db.put({table:config.store.lookup,data:{setting:lai.store.lookup.setting,book:lai.store.lookup.book}}).then(function(storeLookup){
                                                                    lai.store.lookup=storeLookup; fSN();
                                                            });
                                                    }
                                            });
                                    };
                                    db.UpdateLang().then(fSL);
                            }
                    },
                    json:function(bID,callback,x){
                            var o=z.utility.Url(config.id,[bID],config.file.lang);
                            var request=$.ajax({url:(x)?x+o.url:o.url,dataType:o.data,contentType:o.content,cache:false});
                            request.done(function(j){
                                    var lID=j.info.lang=j.info.lang || config.language.info.lang;
                                    MsgInfo.html(j.info.name);
                                    var prepare=function(lC,lN){
                                            var l9={};
                                            return {
                                                    is:{
                                                            index:function(n){
                                                                    l9[n]=lai.store.lang[bID].index;
                                                            },
                                                            name:function(n){
                                                                    l9[n]={};
                                                                    for(var i in lC[n]){
                                                                            var jB=(typeof lN.b === "undefined" || typeof lN.b[i] === "undefined")?[]:[lN.b[i]];
                                                                            var jN=(typeof lN.name === "undefined" || typeof lN.name[i] === "undefined")?[]:lN.name[i];
                                                                            $.merge(jB,jN);
                                                                            l9[n][i]=$.unique(z.array(lC[n][i]).merge(jB).data);
                                                                    }
                                                            }
                                                    },
                                                    merge:function(){
                                                            for(var f in lC){
                                                                    if(this.is[f]){
                                                                            this.is[f](f);
                                                                    }else{
                                                                            l9[f]=(lN[f])?$.extend({},lC[f],lN[f]):lC[f];
                                                                    }
                                                            }
                                                            return l9;
                                                    },
                                                    next:function(){
                                                            $.extend(lai.store.lang[bID],this.merge());
                                                            $("p").html(lID).attr({class:'icon-database'}).promise().done(function(){
                                                                    z.content({bible:bID,reading:obj.reading(bID)}).xml(function(response){
                                                                            callback();
                                                                    }).read();
                                                            });
                                                    }
                                            };
                                    };
                                    if(l8[lID]){
                                            prepare(l8[lID],j).next();
                                    }else{
                                            var o=z.utility.Url('lang',[lID],config.file.lang), get=$.ajax({url:o.url,dataType:o.data,contentType:o.content,cache:false});
                                            get.done(function(langauge){
                                                    l8[lID]=prepare(config.language,langauge).merge();
                                                    prepare(l8[lID],j).next();
                                            });
                                            get.fail(function(jqXHR, textStatus){
                                                    prepare(config.language,j).next();
                                            });
                                    }
                            });
                            request.fail(function(jqXHR, textStatus){
                                    if(api){
                                            if(x){
                                                    z.utility.remove.lang(bID,function(){
                                                            l7.splice(l7.indexOf(bID), 1); callback();
                                                    });
                                            }else{
                                                    obj.json(bID,callback,api);
                                            }
                                    }else{
                                            z.utility.remove.lang(bID,function(){
                                                    l7.splice(l7.indexOf(bID), 1); callback();
                                            });
                                    }
                            });
                    },
                    available:function(j){
                        console.log(j);
                        if(j){lai.store.lang=z.array(config.bible.available,Object.keys(j)).merge().unique().reduce(function(o,v,i){
                            if($.isPlainObject(j[v])){o[v]={index:(j[v].index||j[v].index==0)||i};}else{o[v]={index:i};} return o;}, {});
                        }else{lai.store.lang=config.bible.available.reduce(function(o,v,i){o[v]={index:i};return o;}, {});}
                    }
            };
            MsgInfo.html('getting Database ready').attr({class:'icon-database'});
            this.database.init(function(sql){
                    //sql.deleteDatabase();
                    MsgInfo.html('getting Configuration ready').attr({class:'icon-config'});
                    sql.get({table:config.store.info}).then(function(storeInfo){
                            MsgInfo.html('getting Language ready').attr({class:'icon-language'});
                            $('p').attr({class:'icon-language'}).html('One more moment please');
                            sql.get({table:config.store.lang}).then(function(storeLang){
                                    MsgInfo.attr({class:'icon-flag'});
                                    if(storeLang){
                                            if(storeInfo && storeInfo.build == config.build){
                                                    sO.Ready=3; lai.store.lang=storeLang; process_query();//ONLOAD
                                            }else{
                                                    sO.Ready=2; obj.available(storeLang); process_query();//ONUPDATE
                                            }
                                    }else{
                                            sO.Ready=1; obj.available(); process_query();//ONINSTALL
                                            //sql.deleteDatabase();
                                    }
                            });
                            function process_query(){
                                    sql.get({table:config.store.query}).then(function(storeQuery){
                                            if(storeQuery){lai.store.query=storeQuery; process_trigger();}else{process_trigger();}
                                    });
                            };
                            function process_trigger(){
                                    z.utility.Index();
                                    l7=config.bible.available.concat();
                                    if(sO.Ready==3){obj.go();}else{sql.add({table:config.store.info,data:{build:config.build,version:config.version}}).then(obj.go());}
                            };
                    });
            });
    },
    init:function(){
        var css={result:this.is('result').class},
        setting={page:config.page[0],bible:config.bible.available[0],book:1,testament:1,catalog:1,chapter:1,verses:'',verse:'',q:'',result:''};
        this.fn().hash(function(q){
                q.page=location.hash.split("?")[0].replace('#','');
                if($.isEmptyObject(lai.store.query)){
                        lai.store.query=$.extend({},setting,q);
                }else{
                        q.page=(q.page)?q.page:lai.store.query.page;
                        $.extend(lai.store.query,q);
                }
                var f={
                        page:function(i,o,d){
                                lai.store.query[i]=($.inArray(o.toLowerCase(), config.page) >= 0)?o:d;
                                config.css.currentPage=this.is(lai.store.query[i]).class;
                        }, 
                        bible:function(i,o,d){
                                lai.store.query[i]=($.inArray(o.toLowerCase(), config.bible.available) >= 0)?o:d;
                        }, 
                        book:function(i,o,d){
                                if($.isNumeric(o)){
                                        lai.store.query[i]=(bible.book[o])?o:d;
                                }else{
                                        lai.store.query[i]=d;
                                        var o=o.replace(new RegExp('-', 'g'), ' ').toLowerCase(), books=lai.store.lang[lai.store.query.bible].b;
                                        for(var k in books){
                                                if(books[k].toLowerCase() == q || lang.b[k].toLowerCase() == o){
                                                        lai.store.query[i]=k;
                                                        break;
                                                }
                                        }
                                }
                        }, 
                        testament:function(i,o,d){
                                lai.store.query[i]=bible.info[lai.store.query.book].t;
                        },
                        catalog:function(i,o,d){
                                lai.store.query[i]=bible.info[lai.store.query.book].s;
                        },
                        chapter:function(i,o,d){
                                lai.store.query[i]=(bible.info[lai.store.query.book].c >= o && o > 0)?o:d;
                        }, 
                        verse:function(i,o,d){
                                lai.store.query[i]=(bible.info[lai.store.query.book].v[lai.store.query.chapter-1] >= o)?o:d;
                        }, 
                        verses:function(i,o,d){
                        },
                        q:function(i,o,d){
                                if(q.q){lai.store.query.q=q.q;}
                        }, 
                        bookmark:function(){
                        }
                }
                for(var i in lai.store.query)if($.isFunction(f[i]))f[i].call(this,i,lai.store.query[i],setting[i]);
        });
        this.utility.Header.call(this,$(config.css.header));
        this.utility.Footer.call(this,$(config.css.footer));
        this.utility.Body().keydown(function(e){
                if(e.which == 27)lai.todo.pause=true;
                else if(e.which == 13)lai.todo.enter=true;
        });
        var form={name:this.is('lookup').form,field:this.is('q').input,button:this.is('search').input};
        $(form.name).on('submit',function(e){
                var x=$(this); z.fn(x).serializeObject(lai.store.query);
                if(lai.store.query.page == x.attr('name')){
                         e.stopPropagation();
                        x.find(form.field).attr('autocomplete', 'off').focus().select().promise().done(z.lookup());	
                }else{
                        z.go(x.attr('action'),{q:lai.store.query.q});
                }
                return false;
        }).find(form.field).val(lai.store.query.q).focusin(function(){
                //
        }).focusout(function(){
                //
        }).keyup(function(evt){
                //
        });
        $(form.name).find(form.button).on(sO.Click,function(){
                $(this.form).submit();
        }).promise().done(function(){
                $(form.field).attr('autocomplete', 'off').focus().select();
        });
        /*
        $(this.is('fA').class).each(this.fn(this.fA).run).promise().done(this.utility.Query.call(this));
        this.containerMain=$(config.css.content).children(config.css.currentPage);
        this.containerMain.fadeIn(300).siblings().hide().promise().done(this.utility.Ready.call(this));
        */
        this.containerMain=$(config.css.content).children(config.css.currentPage);
        this.containerMain.fadeIn(300).siblings().hide().promise().done(this.utility.Ready.call(this));
        $(this.is('fA').class).each(this.fn(this.fA).run).promise().done(this.utility.Query.call(this));

        this.utility.Analytics();
        if(lai.todo.Orientation){
                this.utility.Orientation();
                delete lai.todo.Orientation;
        }
    },
    utility:{
        remove:{
            lang:function(x,callback){
                    delete lai[x];
                    delete lai.store.lang[x];
                    config.bible.available.splice(config.bible.available.indexOf(x), 1);
                    db.UpdateLang().then(function(){
                            if(callback)callback();
                    });
            }
        },
        Index:function(){
                config.bible.available=[];
                $.map(lai.store.lang, function(e, i) {
                  return {id:i,index:e.index};
                }).sort(function (a, b){
                        return a.index - b.index;
                }).forEach(function(e){
                        config.bible.available.push(e.id);
                });
                /*
                $.each(lai.store.lang,function(bID,l){
                        l10.push({id:bID,index:l.index});
                });
                l10.sort(function (a, b){
                        return a.index - b.index;
                }).forEach(function(e){
                        config.bible.available.push(e.id);
                });
                */
        },
        Ready:function(){
                this[$.isFunction(this[lai.store.query.page])?lai.store.query.page:$(config.page).get(-1)]();
        },
        Url:function(l,x,y){
                var Url=z.fn([l,47,x.join('/'),46,y]).url(), Filename=Url.substring(Url.lastIndexOf('/')+1), Type=z.fn(['application',47,y]).string();
                if(sO.isCordova){
                        var Path=cordova.file.dataDirectory, Local=cordova.file.dataDirectory+Filename;
                }else{
                        var Path=null, Local=null; 
                }
                return {url:Url, data:y, content:Type+'; charset=utf-8',filename:Filename,type:Type,path:Path,local:Local};
        },
        Num:function(n,l){
                var l=l||lai.store.query.bible;
                return $.isEmptyObject(lai.store.lang[l].n)?n:n.toString().replace(/[0123456789]/g,function(s) {return lai.store.lang[l].n[s];});
        },
        Page:function(n){
                return z.fn([35,config.page[n],63]).url();
        },
        Html:function(){
                return { ol:z.is('ol').tag, ul:z.is('ul').tag, li:z.is('li').tag, a:z.is('a').tag, div:z.is('div').tag,p:z.is('p').tag,
                        h1:z.is('h1').tag, h2:z.is('h2').tag,h3:z.is('h3').tag,h4:z.is('h4').tag, span:z.is('span').tag,em:z.is('em').tag,sup:z.is('sup').tag
                };
        },
        Query:function(){
                db.put({table:config.store.query,data:lai.store.query});
        },
        Lang:function(n,l){
        },
        Info:{
            version:function(){
                    //z.fn(config.loader).html($('body'));
            }
        },
        Header:function(container){
                if(config.header[lai.store.query.page]){
                        if(lai.todo.headerChanged !=lai.store.query.page){
                                container.replaceWith(this.fn({header:config.header[lai.store.query.page]}).html(null,null,true)).promise().done(function(){
                                        lai.todo.headerChanged=lai.store.query.page;
                                        container.find(config.css.currentPage).addClass(config.css.active).siblings().removeClass(config.css.active);
                                        z.screen.Status();
                                        lai.todo.Orientation=true;
                                });
                        }
                }else if(lai.todo.headerChanged){
                        container.replaceWith(this.fn({header:config.body.header}).html(null,null,true)).promise().done(function(){
                                delete lai.todo.headerChanged;
                                container.find(config.css.currentPage).addClass(config.css.active).siblings().removeClass(config.css.active);
                                z.screen.Status();
                                lai.todo.Orientation=true;
                        });
                }else{
                        container.find(this.is(config.css.active).class).removeClass(config.css.active).promise().done($(config.css.currentPage).addClass(config.css.active));
                }
        },
        Footer:function(container){
                if(config.footer[lai.store.query.page]){
                        if(lai.todo.footerChanged != lai.store.query.page){
                                container.replaceWith(this.fn({footer:config.footer[lai.store.query.page]}).html(null,null,true)).promise().done(function(){
                                        lai.todo.footerChanged=lai.store.query.page;
                                        //container.find(config.css.currentPage).addClass(config.css.active).siblings().removeClass(config.css.active);
                                        $(config.css.currentPage).addClass(config.css.active);
                                        lai.todo.Orientation=true;
                                });
                        }
                }else if(lai.todo.footerChanged){
                        container.replaceWith(this.fn({footer:config.body.footer}).html(null,null,true)).promise().done(function(){
                                delete lai.todo.footerChanged;
                                //container.find(config.css.currentPage).addClass(config.css.active).siblings().removeClass(config.css.active);
                                $(config.css.currentPage).addClass(config.css.active);
                                lai.todo.Orientation=true;
                        });
                }else{
                        container.find(this.is(config.css.active).class).removeClass(config.css.active).promise().done($(config.css.currentPage).addClass(config.css.active));
                }
        },
        Working:function(q){
                /*
                if(MsgInfo.is(":hidden")){$('body').addClass(config.css.working+(q.wait?' '+config.css.wait:'')).promise().done(MsgInfo.slideDown(200));}
                else if(q.wait===true){$('body').addClass(config.css.wait);}
                */
                if(MsgInfo.is(":hidden")){$('body').addClass(config.css.working).promise().done(MsgInfo.slideDown(200));}
                if(q.wait===true){$('body').addClass(config.css.wait);}
                if(q.disable===true){$('body').addClass(config.css.disable);}
                return (q.msg)?MsgInfo.html(q.msg):MsgInfo;
        },
        Done:function(callback){
                MsgInfo.slideUp(200).empty().promise().done(function(){
                        z.utility.Body().promise().done(function(){
                                if(callback)callback();
                        });
                });
        },
        Body:function(){
                return $('body').attr({id:lai.store.query.page,class:''});
        },
        Orientation:function(){
                $(config.css.content).css({'top':$(config.css.header).outerHeight(),'bottom':$(config.css.footer).outerHeight()});
        },
        Analytics:function(){
                if(z.analytics)z.analytics.sendPage(lai.store.query.page);
        }
    },
    container:{
        Closest:function(container,x,y){
                if(container.is(':visible') && !$(x.target).closest('#popup, .win').length && !$(x.target).closest(container).length && !$(x.target).closest(y).length) return true;
        },
        FadeOut:function(container,x,y){
                container.fadeOut(1).promise().done(function(){
                        x.removeClass(config.css.active); if(y)y.removeAttr("style");
                });
        }
    },
    requestFileSystem:function(success,error){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,success,error);
    },
    /*
    rootFileSystem:function(){
        if(sO.isCordova && window.LocalFileSystem){
            this.requestFileSystem(
                function(dir){
                    sO.FileDirectory=dir.root;
                },
                function(error){
                    delete sO.FileDirectory;
                    console.log(error.code);
                }
            );
        }
        z.requestFileSystem(function(fileSystem){
            fileSystem.root.getFile(o.filename, {create:false}, xml.local.remove, function(error){
                    xml.done.removing({status:true});
            });
        }, function(error){
            xml.done.removing({status:true});
        })
    },
    */
    resolveFileSystem:function(url,success,error){
            window.resolveLocalFileSystemURL(url,success,error);
    },
    fA:{
        about:{
            version:function(){
                    $(h.div,{id:'popup',class:'version'}).append(
                            $(h.div,{id:'window'}).append(
                                    $(h.h1,{title:config.build}).text(config.name),
                                    $(h.h2).text(config.version),
                                    $(h.p).html(config.aboutcontent),
                                    $(h.p,{id:'by'}).append($(h.a,{target:'_blank',href:config.developerlink}).text(config.developer)),
                                    $(h.div,{id:'clickme'}).html('Ok').on(sO.Click,function(evt){
                                            evt.stopImmediatePropagation(); $(this).parents('div').remove();
                                    })
                            )
                    ).appendTo('body').on(sO.Click,function(evt){
                            //if(!$(evt.target).closest('#window').length)$('#clickme').fadeOut(50).fadeIn(50);
                            if(!$(evt.target).closest('#window').length)$('#clickme').effect( "highlight", {color:"#F30C10"}, 100 );
                    });
            }
        },
        chapter:{
            get:{
                next:function(){
                        var book=parseInt(lai.store.query.book), chapter=parseInt(lai.store.query.chapter)+1;
                        if(bible.info[book].c<chapter){
                                book++;
                                book=(book>66)?1:book;
                                chapter=1;
                        }
                        return {book:book,chapter:chapter};
                },
                previous:function(){
                    var book=parseInt(lai.store.query.book), chapter=parseInt(lai.store.query.chapter)-1;
                    if(chapter<1){
                            book--;
                            book=(book<1)?66:book;
                            chapter=bible.info[book].c;
                    }
                    return {book:book,chapter:chapter};
                }
            },
            text:function(x){
                    var q=this.get[x](), lD=lai.store.lang[lai.store.query.bible];
                    return lD.l.BFVBC.replace(/{b}/,lD.b[q.book]).replace(/{c}/,z.utility.Num(q.chapter));
            },
            nameCurrent:function(e){
                e.html(z.utility.Num(lai.store.query.chapter)); 
                if(lai.todo.ActiveChapter){
                    //TODO if(sO.isCordova)-> REMOVE or empty it container
                    lai.todo.ActiveChapter.addClass(config.css.active).promise().done(function(){
                        delete lai.todo.ActiveChapter;
                    });
                }
            },
            nameNext:function(e){
                    e.attr('title',this.text('next'));
            },
            namePrevious:function(e){
                    e.attr('title',this.text('previous'));
            },
            html:function(bID){
                var ol=$(h.ol,{class:'list-chapter'});
                $.each(bible.info[bID].v,function(chapter,verse){
                    chapter++;
                    $(h.li,{id:chapter,class:(lai.store.query.chapter==chapter?config.css.active:'')}).append(
                        $(h.a,{href:z.utility.Page(2)+$.param({chapter:chapter})}).html(z.utility.Num(chapter)).append(
                            $(h.sup).html(z.utility.Num(verse))
                        )
                    ).appendTo(ol);
                }); return ol;
            },
            list:function(e){
                var x=$(e.target), container=x.parent().children().eq(1);
                if(container.is(':hidden')){
                    x.addClass(config.css.active);
                    this.html(lai.store.query.book).appendTo(container.fadeIn(200).find(z.is(z.get(x).class()[1]).id)).promise().done(function(){
                        this.children().on(sO.Click,function(){
                            lai.todo.ActiveChapter=$(this);
                        });
                        $(document).on(sO.Click,function(y){
                            if(z.container.Closest(container,y,x))z.container.FadeOut(container,x);
                        });
                    });
                }else{
                    z.container.FadeOut(container,x);
                }
            },
            next:function(){
                    z.go(z.utility.Page(2),this.get.next());
            },
            previous:function(){
                    z.go(z.utility.Page(2),this.get.previous());
            },
            book:function(bID){
                //TODO
                return $(h.span).html(z.utility.Num(bible.info[bID].c)).on(sO.Click,function(){
                    var container=$(this).parent().parent();
                    if(container.children('ol').length){
                        container.children().eq(1).fadeOut(300).remove();
                        $(this).removeClass(config.css.active);
                    }else{
                        z.fA.chapter.html(bID).appendTo(container).promise().done($(this).addClass(config.css.active));
                    }
                });
            }
            /*
            parallel:function(){
                var ul=$(h.ul,{class:'parallel'}).appendTo(li);
                config.bible.available.forEach(function(i){
                    var ic=z.is(i).class;
                    $(h.li,{class:(y===i)?config.css.active:(container.children(ic).length)?'has':i}).html(lai.store.lang[i].info.name).on(sO.Click,function(){
                        callback($(this),i,ic);
                    }).appendTo(ul);
                });
            }
            */
        },
        lookup:{
            html:function(container){
                    var container=$(h.ol,{class:'list-lookup'}).appendTo(container.empty()),obj=this;
                    $.each(bible.catalog,function(testamentID,cL){
                            var testamentName=lai.store.lang[lai.store.query.bible].t[testamentID];
                            var testamentTagID=Object.keys(config.language)[0]+testamentID;
                            var testamentClass=(lai.store.lookup.setting[testamentTagID]?config.css.active:'testament');
                            $(h.li,{id:testamentTagID,class:testamentClass}).html(
                                    $(h.p,{text:testamentName}).on(sO.Click,function(e){
                                            obj.pClick(e,$(this).parent().children('ol').find('ol'))
                                    }).append(
                                            $(h.span).text('+').addClass(testamentClass)
                                    )
                            ).appendTo(container).promise().done(function(){
                                    $(h.ol,{class:'section'}).appendTo(this).promise().done(function(){
                                            var it=this;
                                            $.each(cL,function(sectionID,bL){
                                                    var sectionName=lai.store.lang[lai.store.query.bible].s[sectionID];
                                                    var sectionTagID=Object.keys(config.language)[1]+sectionID;
                                                    var sectionClass=(lai.store.lookup.setting[sectionTagID]?config.css.active:'');
                                                    $(h.li,{id:sectionTagID,class:sectionClass}).append(
                                                            $(h.p,{text:sectionName}).on(sO.Click,function(e){
                                                                    obj.pClick(e,$(this).parent().children('ol'));
                                                            }).append(
                                                                    $(h.span,{text:'+'}).addClass(sectionClass)
                                                            )
                                                    ).appendTo(it).promise().done(function(){
                                                            var ol=$(h.ol,{class:'book'}).appendTo(this);
                                                            bL.forEach(function(id){
                                                                    var bookName=lai.store.lang[lai.store.query.bible].b[id];
                                                                    $(h.li,{id:id,class:(lai.store.lookup.book[id]?config.css.active:'')}).text(bookName).on(sO.Click,function(){
                                                                            $(this).toggleClass(config.css.active);
                                                                            obj.bookID(id); obj.db();
                                                                    }).appendTo(ol);
                                                            });
                                                            ol.promise().done(function(){
                                                                    obj.pClass(ol);
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
                    return container;
            },
            setting:function(e){					
                    var x=$(e.target), container=x.parents('div').children().eq(1);
                    if(container.is(':hidden')){
                            x.addClass(config.css.active);
                            this.html(container.fadeIn(200).find(z.is(z.get(x).class()[1]).id)).promise().done(function(){
                                    $(document).on(sO.Click,function(y){
                                            if(z.container.Closest(container,y,x))z.container.FadeOut(container,x);
                                    });
                            });
                    }else{
                            z.container.FadeOut(container,x);
                    }
            },
            query:function(bO){
                    var tmp=[],obj=this;
                    bO.each(function(){
                            var ol=$(this);
                            ol.children().each(function(a,y){
                                    var y=$(y), bID=z.get(y).id()[0];
                                    y.toggleClass(config.css.active);
                                    obj.bookID(bID);
                            }).promise().done(function(){
                                    obj.pClass(ol);
                            });
                    });
            },
            pClick:function(e,ol){
                    var x=$(e.target);
                    if(x.get(0).tagName.toLowerCase()=='p'){
                            this.query(ol);
                    }else{
                            var li=x.parents('li'),sectionID=li.attr('id');
                            ol.fadeToggle(100);
                            x.toggleClass(config.css.active).promise().done(function(){
                                    if(this.hasClass(config.css.active)){
                                            lai.store.lookup.setting[sectionID]=true;
                                    }else{
                                            delete lai.store.lookup.setting[sectionID];
                                    }
                            });
                    }
                    this.db();
            },
            pClass:function(ol){
                    var total=ol.children().length, active=ol.children(z.is(config.css.active).class).length, catalog=ol.parent().children().eq(0);
                    if(total==active){
                            catalog.removeClass().addClass('yes');
                    }else if(active>0){
                            catalog.removeClass().addClass('some');
                    }else{
                            catalog.removeClass().addClass('no');
                    }
            },
            bookID:function(id){
                    if(lai.store.lookup.book[id]){
                            delete lai.store.lookup.book[id];
                    }else{
                            lai.store.lookup.book[id]={};
                    }
            },
            db:function(){
                    db.put({table:config.store.lookup,data:lai.store.lookup});
            },
            msg:function(e){
                    MsgLookup=e; if(lai.store.query.result > 0){e.text(z.utility.Num(lai.store.query.result)).attr('title',lai.store.query.q);}else{e.empty();}
            }
        },
        container:{
            msg:function(e){
                    MsgInfo=e;
            },
            title:function(e){
                //e.html(lai.store.lang[lai.store.query.bible].l.BFVBC.replace(/{b}/,lai.store.lang[lai.store.query.bible].b[lai.store.query.book]).replace(/{c}/,z.utility.Num(lai.store.query.chapter)));
            }
        },
        Mobile:{
            //MOBILE
            Common:function(x,callback){
                x.off().on(sO.Click,function(){
                    if(x.hasClass(config.css.active)){
                        z.utility.Done();
                    }else{
                        z.utility.Working(callback());
                        if(lai.todo.ActiveTab)lai.todo.ActiveTab.removeClass(config.css.active);
                        lai.todo.ActiveTab=x;
                    }
                    x.toggleClass(config.css.active);
                }).removeClass(config.css.active);
            },
            Testament:function(e){
                //TODO - smarter on Page Active
                e.children().each(function(index,x){
                    var container=$(x).children(), id=index+1;
                    if(lai.store.query.testament===id)container.addClass(config.css.active);
                    container.html(lai.store.lang[lai.store.query.bible].t[id]).on(sO.Click,function(){
                        e.children(x).children().removeClass(config.css.active).eq(index).addClass(config.css.active).promise().done(function(){
                            z.containerMain.find('ol.testament').hide().eq(index).fadeIn(300);
                        });
                    });
                }).promise().done(function(){
                    z.containerMain.promise().done(function(){
                        this.find('ol.testament').hide().eq(lai.store.query.testament-1).fadeIn(300);
                    });
                });
            },
            Parallel:function(e){
                this.Common(e,function(){
                    /*
                    var ul=$(h.ul,{class:'parallel'}).appendTo(li);
                    config.bible.available.forEach(function(i){
                        var ic=z.is(i).class;
                        $(h.li,{class:(y===i)?config.css.active:(container.children(ic).length)?'has':i}).html(lai.store.lang[i].info.name).on(sO.Click,function(){
                            callback($(this),i,ic);
                        }).appendTo(ul);
                    });
                    return {msg:ul};
                    *
                    /*
                    return {
                        msg:$(h.ul,{class:'parallel'})
                    };
                    */
                    var p=z.utility.Page(2), ol=$(h.ol,{class:'rows row-bible'});//.appendTo(this.containerMain.empty());
                    config.bible.available.forEach(function(bID){
                        var lang=lai.store.lang[bID].info, isLocal=lai.store.lang[bID].local, availableClass=(isLocal)?config.css.available:config.css.notAvailable,
                        offlineClass='icon-ok offline',onlineClass='icon-logout offline', isAvailable=(isLocal)?offlineClass:onlineClass;
                        $(h.li,{id:bID,class:(lai.store.query.bible===bID)?config.css.active+' '+availableClass:availableClass}).html(
                            $(h.p).append(
                                $(h.span,{class:isAvailable}),

                                $(h.a,{href:p+$.param({bible:bID})}).html(lang.name),
                                $(h.span,{class:'icon-menu drag'})
                            )
                        ).appendTo(ol);
                    });
                    return {msg:ol};
                });
            },
            Chapter:function(e){
                this.Common(e,function(){
                    return {
                        msg:z.fA.chapter.html(lai.store.query.book)
                    };
                });
            },
            Bookmark:function(e){
                this.Common(e,function(){
                    return {
                        msg:$(h.div).html('Bookmark<br>a')
                    };
                });
            },
            LookUp:function(e){
            }
        }
    },
    regex:function(q){
        var name=lai.store.lang[q.bible].name,info=bible.info,book,chapter,Start,End, setting={book:";",chapter:",",verse:"-"};
        return {
            result:{},
            search:function(s){
                    var y;
                    for(var i in name){
                            var x=name[i].map(function(value){ 
                                    return value.toLowerCase();
                            }).indexOf(s.trim().toLowerCase());
                            if(x >= 0){ y=i; break; }
                    }
                    return parseInt(y);
            },
            options:function(){
                    if(!this.result[book])this.result[book]={};
                    if(chapter <=info[book].c){
                            var Verses=info[book].v[chapter-1];
                            if(!this.result[book][chapter])this.result[book][chapter]=[];
                            if(Start && End){
                                    var vs=(Start <= Verses)?Start:Verses,ve=(End <= Verses)?End:Verses;
                                    for (i = vs; i < ve+1; i++) { this.push(this.result[book][chapter],i); }
                            }else if(Start){
                                    this.push(this.result[book][chapter],(Start <= Verses)?Start:Verses);
                            }
                    }else if(Object.getOwnPropertyNames(this.result[book]).length === 0){
                            delete this.result[book];
                    }
            },
            push:function(o,i){
                    if(o.indexOf(i) <= 0){
                            o.push(i); o.sort( function(a,b) { return a > b ? 1 : a < b ? -1 : 0; } );
                    }
            },
            nameVerse:function(e){
                    var verse;
                    var dashed=function(str,n){
                            var d=(str.toString().slice(-1)!=setting.verse)?setting.verse:'';
                            return str+d+n;
                    }
                    e.filter(function(v, k, a){
                            var c=parseInt(v), o=parseInt(a[k-1]), n=parseInt(a[k+1]);
                            if(k==0){
                                    verse=c;
                            }else if(c>=(o+1)){
                                    if(c>(o+1)){
                                            verse=verse+setting.chapter+c;
                                    }else if((c+1)<n){
                                            verse=dashed(verse,c);
                                    }else{
                                            if(k==a.length-1){
                                                    if(c>o){
                                                            verse=dashed(verse,c);
                                                    }
                                            }else{
                                                    verse=dashed(verse,'');
                                            }
                                    }
                            }
                    });
                    return verse;
            },
            //obj, object
            obj:function(e){
                    for(var b in e) {
                            book=b;
                            for(var c in e[b]) {
                                    chapter=c;
                                    for(var v in e[b][c]) {
                                            var R=e[b][c][v].split(setting.verse);
                                            Start=parseInt(R[0]),End=(R.length>1)?parseInt(R[1]):false;
                                            this.options();
                                    }
                            }
                    }
                    return this;
            },
            //ref,reference
            ref:function(e){
                    if(!Array.isArray(e))e=e.split(setting.book);
                    for(var i in e) {
                            var R=/(((\w+)\.(\d+)\.(\d+))([\-–]?)?((\w+)\.(\d+)\.(\d+))?)/.exec(e[i]);
                            if(Array.isArray(R)){
                                    book=this.search(R[3]);
                                    if(book){ chapter=parseInt(R[4]),Start=parseInt(R[5]),End=parseInt(R[10]); this.options();}
                            }
                    }
                    return this;
            },
            //str, string
            str:function(e){
                    if(!Array.isArray(e))e=e.split(setting.book);
                    for(var i in e) {
                            if(e[i]){
                                    var c=e[i].trim().split(setting.chapter);
                                    for (var x in c) {
                                            if(x==0){
                                                    var R=/(\d?(\w+?)?(\s?)\w+(\s+?)?(\s?)\w+(\s+?))?((\d+)((\s+)?\:?(\s+)?)?)((\d+)([\-–])?(\d+)?)?/.exec(c[x]);
                                                    if(R && R[1]){
                                                            book=this.search(R[1]);
                                                            if(book){ chapter=parseInt(R[8]),Start=parseInt(R[13]),End=parseInt(R[15]); this.options();}
                                                            else{ break; }
                                                    }else{ break; }
                                            }else if(book){
                                                    var R=/(\s?(\d+?)(\s+)?\:(\s+)?)?(\s?\d+)?(\s?(\d+?)?([\-–])?(\s?\d+)?)/.exec(c[x]);
                                                    if(R){ chapter=parseInt(R[2])||chapter,Start=parseInt(R[5]), End=parseInt(R[9]); this.options();}
                                                    else{break;}
                                            }
                                    }
                            }
                    }
                    return this;
            },
            is:function(e){
                    if(Object.getOwnPropertyNames(this.str(e).result).length > 0){
                            return this.result;
                    }else if(Object.getOwnPropertyNames(this.ref(e).result).length > 0){
                            return this.result;
                    }	
            }
        };
    },
    menu:function(callback){
        return {
            bible:function(attr){
                //PageClass=rows row-bible
                //var p=z.utility.Page(2), ol=$(h.ol,{class:PageClass});//.appendTo(this.containerMain.empty());
                var ol=$(h.ol,attr);
                config.bible.available.forEach(function(bID){
                    var lang=lai.store.lang[bID].info, isLocal=lai.store.lang[bID].local, availableClass=(isLocal)?config.css.available:config.css.notAvailable,
                    offlineClass='icon-ok offline',onlineClass='icon-logout offline', isAvailable=(isLocal)?offlineClass:onlineClass;
                    $(h.li,{id:bID,class:(lai.store.query.bible===bID)?config.css.active+' '+availableClass:availableClass}).html(
                        callback(bID,lang,isLocal,availableClass,offlineClass,onlineClass,isAvailable)
                    ).appendTo(ol);
                });
                return ol;
            }
        };
    },
    content:function(q){
        var lD=lai.store.lang[q.bible], fn={
            xml:function(callback){
                var o=z.utility.Url(config.id,[q.bible],config.file.bible);
                var xml={
                    read:function(){
                            // TODO
                            if($.isEmptyObject(lai[q.bible].bible)){
                                    if(sO.isCordova){
                                            z.resolveFileSystem(o.local,xml.local.reading, function(error){
                                                    xml.done.getting({msg:'to Local',status:false});
                                            });
                                    }else{
                                            db.get({table:q.bible}).then(function(storeBible){
                                                    if(storeBible){
                                                            if($.isEmptyObject(storeBible)){
                                                                    xml.done.getting({msg:'to Store',status:false});
                                                            }else{
                                                                    if(q.reading==q.bible){
                                                                            lai[q.bible].bible=storeBible; xml.done.getting({msg:'from Store',status:true});
                                                                    }else{
                                                                            xml.done.getting({msg:'to Store',status:true});
                                                                    }
                                                            }
                                                    }else{
                                                            xml.done.getting({msg:'to Store',status:false});
                                                    }
                                            });
                                    }
                            }else{
                                    xml.done.getting({msg:'from Object',status:true});
                            }
                    },
                    remove:function(){
                            if(sO.isCordova){
                                    z.resolveFileSystem(o.local,xml.local.removing, function(error){
                                            xml.done.removing({status:true});
                                    });
                            }else{
                                    db.delete({table:q.bible}).then(function(){
                                            xml.done.removing({status:true});
                                    });
                            }
                    },
                    get:function(){
                            if($.isEmptyObject(lai[q.bible].bible)){
                                    if(sO.isCordova){
                                            z.utility.Working({msg:lD.l.PleaseWait,wait:true}).promise().done(function(){
                                                    z.resolveFileSystem(o.local, xml.local.getting, xml.local.downloading)
                                            });
                                    }else{
                                            db.get({table:q.bible}).then(function(storeBible){
                                                    if(storeBible){
                                                            lai[q.bible].bible=storeBible;
                                                            if($.isEmptyObject(lai[q.bible].bible)){
                                                                    xml.load();
                                                            }else{
                                                                    xml.done.getting({msg:'from Store',status:true});
                                                            }
                                                    }else{
                                                            xml.load();
                                                    }
                                            });
                                    }
                            }else{
                                    callback({msg:'from Object',status:true});
                            }
                    },
                    load:function(x){
                            $.ajax({
                                    //headers:{}, xhrFields:{"withCredentials": true},
                                    beforeSend:function(xhr){
                                            z.utility.Working({msg:lD.l.Downloading,wait:true});
                                            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                                    },
                                    xhr:function(){
                                            var xhr=new window.XMLHttpRequest();
                                            xhr.addEventListener("progress", function(evt){
                                                    if(evt.lengthComputable) {
                                                            var Percentage=Math.floor(evt.loaded / evt.total * 100);
                                                            z.utility.Working({msg:lD.l.PercentLoaded.replace(/{Percent}/, z.utility.Num(Percentage))});
                                                    }
                                            }, false);
                                            /*
                                            //Upload progress
                                            XMLHttpRequest.upload.addEventListener("progress", function(evt){
                                                    if(evt.lengthComputable) {
                                                            var Percent=Math.floor(evt.loaded / evt.total * 100);
                                                            z.utility.Working({
                                                                    msg:lD.l.PercentLoaded.replace(/{Percent}/, z.utility.Num(Percentage)),
                                                                    class:true
                                                            });
                                                    }
                                            }, false); 
                                            */
                                            return xhr;
                                    },
                                    url:(x)?x+o.url:o.url,dataType:o.data,contentType:o.content,cache:false,crossDomain:true,async:true
                            }).done(function(j, status, d){
                                    xml.jobType(j);
                            }).fail(function(jqXHR, textStatus){
                                    if(api){
                                            if(x){
                                                    xml.done({msg:textStatus,status:false});
                                            }else{
                                                    xml.load(api);
                                            }
                                    }else{
                                            xml.done({msg:textStatus,status:false});
                                    }
                            }).always(function(){});
                    },
                    local:{
                            downloading:function(){
                                    z.utility.Working({msg:lD.l.Downloading});
                                    var fileTransfer = new FileTransfer();
                                    fileTransfer.onprogress=function(evt) {
                                            if(evt.lengthComputable){
                                                    var Percentage = Math.floor(evt.loaded / evt.total * 100);
                                                    z.utility.Working({msg:lD.l.PercentLoaded.replace(/{Percent}/, z.utility.Num(Percentage))});
                                            }
                                    };
                                    fileTransfer.download(encodeURI(api+o.url), o.local, xml.local.content, function(error){
                                            xml.done.getting({msg:error.code,status:false});
                                    });
                            },
                            content:function(fileEntry,error){
                                    fileEntry.file(function(file) {
                                            //file.name, file.localURL, file.type, new Date(file.lastModifiedDate), file.size
                                            var reader=new FileReader();
                                            reader.onloadend=function(e){
                                                    var parser=new DOMParser();
                                                    xml.jobType(parser.parseFromString(e.target.result,o.type));
                                            };
                                            reader.readAsText(file);
                                    },function(){
                                            xml.done.getting({msg:'fail to read Local',status:false});
                                    });
                            },
                            reading:function(fileEntry){
                                    if(q.reading==q.bible){
                                            xml.local.content(fileEntry);
                                    }else{
                                            xml.done.getting({msg:'from Reading',status:true});
                                    }
                            },
                            removing:function(fileEntry){
                                    fileEntry.remove(function() {
                                            xml.done.removing({status:true});
                                    },function(error){
                                            xml.done.removing({status:false});
                                    });
                            },
                            getting:function(fileEntry){
                                    xml.local.content(fileEntry);
                            }
                    },
                    jobType:function(j){
                            var jobType=$(j).children().get(0).tagName;
                            if($.isFunction(this.job[jobType])){
                                    lai[q.bible].bible={info:{},book:{}};
                                    this.job[jobType](j);
                            }else{
                                    this.done.getting({msg:'no '+jobType+' Method found',status:false});
                            }
                    },
                    job:{
                        bible:function(j){
                                var theTitle=[], theRef=[], index=0;
                                $(j).children().each(function(o,i1){
                                        var j1=$(i1), d1=j1.children(), id=j1.attr('id');
                                        if(d1.length){
                                                d1.each(function(b,i2){
                                                        var j2=$(i2), d2=j2.children(), i2=j2.attr('id'), t2=j2.get(0).tagName.toLowerCase(), contentIndex=0;
                                                        if($.type(lai[q.bible].bible[t2]) ==='undefined')lai[q.bible].bible[t2]={};
                                                        if(d2.length){
                                                                lai[q.bible].bible[t2][i2]={};
                                                                setTimeout(function(){
                                                                        d2.each(function(c,i3){
                                                                                var j3=$(i3), d3=j3.children(), i3=j3.attr('id'), t3=j3.get(0).tagName.toLowerCase();
                                                                                if($.type(lai[q.bible].bible[t2][i2][t3]) ==='undefined')lai[q.bible].bible[t2][i2][t3]={};
                                                                                if(d3.length){
                                                                                        lai[q.bible].bible[t2][i2][t3][i3]={};
                                                                                        lai[q.bible].bible[t2][i2][t3][i3].verse={};
                                                                                        setTimeout(function(){
                                                                                                d3.each(function(v,i4){
                                                                                                        var j4=$(i4), d4=j4.children(), i4=j4.attr('id'), t4=j4.get(0).tagName.toLowerCase();
                                                                                                        i4='v'+i4;
                                                                                                        lai[q.bible].bible[t2][i2][t3][i3].verse[i4]={};
                                                                                                        lai[q.bible].bible[t2][i2][t3][i3].verse[i4].text=j4.text();
                                                                                                        if(j4.attr('ref'))lai[q.bible].bible[t2][i2][t3][i3].verse[i4].ref=j4.attr('ref').split(',');
                                                                                                        if(j4.attr('title'))lai[q.bible].bible[t2][i2][t3][i3].verse[i4].title=j4.attr('title').split(',');
                                                                                                        if(d1.length == b+1){
                                                                                                                if(d2.length == c+1){
                                                                                                                        if(d3.length == v+1){
                                                                                                                                if(sO.isCordova){
                                                                                                                                        xml.done.getting({msg:'Localed',status:true});
                                                                                                                                }else{
                                                                                                                                        db.put({table:q.bible,data:lai[q.bible].bible}).then(xml.done.getting({msg:'Stored',status:true}));
                                                                                                                                }
                                                                                                                        }
                                                                                                                }
                                                                                                        }
                                                                                                });
                                                                                        },30/b*c);
                                                                                        //chapter
                                                                                }else if(i3){
                                                                                        //info
                                                                                        lai[q.bible].bible[t2][i2][t3][i3]=j3.text();
                                                                                }else{
                                                                                        //content
                                                                                        contentIndex++;
                                                                                        //lai[q.bible].bible[t2][i2][t3][contentIndex]={ref:j3.attr('ref').split(','), title:j3.text()};
                                                                                        lai[q.bible].bible[t2][i2][t3][contentIndex]={title:j3.text()};
                                                                                        if(j3.attr('ref'))lai[q.bible].bible[t2][i2][t3][contentIndex].ref=j3.attr('ref').split(',');
                                                                                }
                                                                        }).promise().done(function(){
                                                                                MsgInfo.html(lD.b[i2]);
                                                                        });
                                                                },90*b);
                                                        }else{
                                                                lai[q.bible].bible[t2][i2]=j2.text();
                                                        }
                                                });
                                        }else{
                                                var name=j1.attr('id'), text=j1.text();
                                        }
                                });
                        }
                    },
                    done:{
                        getting:function(response){
                                lai.store.lang[q.bible].local=response.status;
                                if(q.reading){
                                        callback(response);
                                }else{
                                        db.UpdateLang().then(function(){
                                                callback(response);
                                                z.utility.Done();
                                        });

                                }
                        },
                        removing:function(response){
                                delete lai[q.bible].bible;
                                if(response.status)lai.store.lang[q.bible].local=false;
                                db.UpdateLang().then(function(){
                                        callback(response);
                                });
                        }
                    }
                }; return xml;
            },
            msg:function(m){
                console.log(m);
            },
            get:function(callback){
                var obj={
                    data:function(callback){
                            return callback(fn,this);
                    },
                    result:{book:0,chapter:0,verse:0,str:''},
                    verseMerged:function(list,vID){
                            return $(list).map(function(t,i){
                                    var v1=vID, v2=v1.split('-');
                                    if(v1==i){ return i;}else if(v2.length>1 && v2[0] <= i && v2[1] >= i){ return i;} 
                            }).get();
                    },
                    search:function(str,nQ){
                            //TODO
                            if($.type(nQ) === "string"){
                                    if(str.search(new RegExp(nQ, "gi")) > -1)return true;
                            }else{
                                    return true;
                            }
                    },
                    replace:function(str,nQ){
                            //TODO str.replace(/(([^\s]+\s\s*){20})(.*)/,"$1…")
                            if($.type(nQ) === "string"){
                                    return str.replace(new RegExp(nQ, "i"), '<b>$&</b>');
                            }else{
                                    return str;
                            }
                    },
                    booklistID:function(){
                            return Object.keys(this.booklist);
                    },
                    booklistName:function(o){
                            return $.map(o, function(i) {
                                    return lai.store.lang[q.bible].b[i];
                            });
                    },
                    queryRegex:function(){
                            return this.booklist=z.regex(q).is(q.q);
                    },
                    queryBook:function(){
                            if(Object.getOwnPropertyNames(lai.store.lookup.book).length > 0){
                                    this.booklist={}; 
                                    $.each(lai.store.lookup.book,function(bID,d){
                                            obj.booklist[bID]={};
                                            if($.isEmptyObject(d)){
                                                    $.each(bible.info[bID].v,function(cID,f){
                                                            cID++;
                                                            obj.booklist[bID][cID]=[];
                                                    });
                                            }else{
                                                    obj.booklist[bID]=d;
                                            }
                                    });
                                    return this.booklist;
                            }
                    },
                    queryChapter:function(){
                            this.booklist={};
                            this.booklist[q.book]={};
                            this.booklist[q.book][q.chapter]=[];
                            return this.booklist;
                    },
                    queryCheck:function(){
                            if(q.booklist){
                                    this.booklist=q.booklist;
                                    delete q.booklist;
                                    return this.booklist;
                            } else if(this.queryRegex()){
                                    return this.booklist;
                            } else if(this.queryBook()){
                                    return this.booklist;
                            } 
                    },
                    bible:function(dQ){
                            var Def = new $.Deferred();
                            var i=0, total=Object.keys(dQ).length;
                            $.each(dQ,function(bID,data){
                                    setTimeout(function(){
                                            var book=lai[q.bible].bible.book[bID];
                                            if(book){
                                                    if(lai.todo.pause)return MsgInfo.text(lai.store.lang[q.bible].l.Paused);
                                                    obj.chapter(book,bID,data,function(cID,vID,verse,list){
                                                            var df = new $.Deferred();
                                                            callback(fn,obj,bID,cID,vID,verse,list).progress(function(){
                                                                    df.notify();
                                                            }).done(function(){
                                                                    df.resolve();
                                                            });
                                                            return df.promise();
                                                    }).progress(function(){
                                                            Def.notify();
                                                    }).done(function(){
                                                            i++;
                                                            if(total==i)Def.resolve();
                                                    });
                                            }else{
                                                    i++;
                                                    Def.notify();
                                                    if(total==i)Def.resolve();
                                            }
                                    },(200/total*i));
                            });
                            return Def.promise();
                    },
                    chapter:function(book,bID,list,callback){
                            var Def = new $.Deferred();
                            var i=0, total=Object.keys(list).length;
                            $.each(list,function(cID,data){
                                    setTimeout(function(){
                                            var chapter=book.chapter[cID];
                                            if(chapter){
                                                    if(lai.todo.pause)return MsgInfo.text(lai.store.lang[q.bible].l.Paused);
                                                    Def.notify();
                                                    obj.verse(chapter,bID,cID,data,function(vID,verse,list){
                                                            var df = new $.Deferred();
                                                            callback(cID,vID,verse,list).progress(function(){
                                                                    df.notify();
                                                            }).done(function(){
                                                                    df.resolve();
                                                            });
                                                            return df.promise();
                                                    }).progress(function(){
                                                            Def.notify();
                                                    }).done(function(){
                                                            i++;
                                                            if(total == i)Def.resolve();
                                                    });
                                            }else{
                                                    i++;
                                                    Def.notify();
                                                    if(total==i)Def.resolve();
                                            }
                                    },100/total*i);
                            });
                            return Def.promise();
                    },
                    verse:function(chapter,bID,cID,list,callback){
                            var Def = new $.Deferred();
                            var i=0, total = Object.keys(chapter.verse).length;
                            $.each(chapter.verse,function(vID,verse){
                                    setTimeout(function(){
                                            Def.notify();
                                            i++;
                                            callback(vID,verse,list).progress(function(){
                                                    Def.notify();
                                            }).done(function(){
                                                    if(total == i)Def.resolve();
                                            });
                                    },(50/total*i));
                            });
                            return Def.promise();
                    }
                }; return obj;
            },
            option:function(container){
                return {
                    parallel:function(callback){
                        return $(h.span,{class:'icon-language'}).on(sO.Click,function(event){
                            var e=$(event.target), li=e.parent(), ul=li.children().eq(1), y=li.attr('class');
                            if(ul.length){
                                ul.fadeOut(200).remove();
                            }else{
                                ul=$(h.ul,{class:'parallel'}).appendTo(li);
                                config.bible.available.forEach(function(i){
                                    var ic=z.is(i).class;
                                    $(h.li,{class:(y===i)?config.css.active:(container.children(ic).length)?'has':i}).html(lai.store.lang[i].info.name).on(sO.Click,function(){
                                        callback($(this),i,ic);
                                    }).appendTo(ul);
                                });
                                $(document).on(sO.Click,function(evt){
                                    if(!$(evt.target).closest(li).length)ul.remove();
                                });
                            }
                        });
                    },
                    reference:function(data){
                        var li=$(h.li,{class:'ref'}).appendTo(container), reference=z.regex(q).ref(data).result; 
                        $.each(reference,function(bID,ref){
                            $.each(ref,function(cID,vID){
                                $(h.a).html(lD.l.BFBCV.replace(/{b}/, lD.b[bID]).replace(/{c}/, z.utility.Num(cID)).replace(/{v}/,z.utility.Num(z.regex(q).nameVerse(vID)))).on(sO.Click,function(){
                                    $.extend(q,{ref:data}); fn.reference(li);
                                }).appendTo(li);
                            });
                        }); return li;
                    },
                    note:function(){
                        return $(h.span,{class:'icon-pin active'}).on(sO.Click,function(event){
                            var x=$(event.target), li=x.parent(), ul=li.children().eq(1);
                            if(ul.length){
                                ul.fadeOut(200).remove();
                            }else{
                                var row=x.parents(z.is('cID').class), bID=z.get(row.parents(z.is('bID').class)).id()[0], cID=z.get(row).id()[0];
                                ul=$(h.ul,{class:'note'}).appendTo(li);
                                if(lai.store.note){
                                    var notefn=function(){
                                        $.each(lai.store.note,function(id,note){
                                            if(note.name){
                                                $(h.li,{id:id}).append(
                                                    $(h.p,{class:'add icon-right'}).on(sO.Click,function(){
                                                        var vIDs=[], liRow=$(this);
                                                        row.children('ol').children().each(function(){
                                                            if($(this).attr("id") && $(this).hasClass(config.css.active)){
                                                                vIDs.push($(this).attr("id"));
                                                            }
                                                        }).promise().done(function(){
                                                            if(vIDs.length){
                                                                if($.isEmptyObject(note.data))note.data={};
                                                                if($.isEmptyObject(note.data[bID]))note.data[bID]={};
                                                                note.data[bID][cID]=vIDs;	
                                                            }else if(note.data){
                                                                if(note.data[bID] && note.data[bID][cID]) delete note.data[bID][cID];
                                                                if($.isEmptyObject(note.data[bID])) delete note.data[bID];
                                                                if($.isEmptyObject(note.data)) delete note.data;
                                                            }
                                                            db.UpdateNote().then(function(){
                                                                ul.empty(); notefn();
                                                            });
                                                            /*
                                                            z.db.user.note.put().onsuccess=function(){
                                                                ul.empty(); notefn();
                                                            }
                                                            */
                                                        });
                                                    }),
                                                    $(h.p,{class:'name'}).html(note.name).on(sO.Click,function(){
                                                        row.children('ol').children().each(function(i,e){
                                                            var ids=$(this).attr("id");
                                                            if(ids){
                                                                if(note.data && note.data[bID] && $.inArray(ids, note.data[bID][cID]) >= 0){
                                                                    $(this).addClass(config.css.active);
                                                                }else{
                                                                    $(this).removeClass(config.css.active);
                                                                }
                                                            }
                                                        });
                                                    })
                                                ).appendTo(ul).promise().done(function(){
                                                    if(note.data){
                                                        if(note.data[bID]){
                                                            if(note.data[bID][cID]){
                                                                this.addClass(config.css.active);
                                                            }else{
                                                                delete note.data[bID];
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    notefn();
                                }else{
                                    $(h.li).append(
                                        $(h.p,{class:'indexedb'}).html('Your browser does not support Indexedb!')
                                    ).appendTo(ul);
                                }
                                $(document).on(sO.Click,function(evt){
                                    if(!$(evt.target).closest(li).length)ul.remove();
                                });
                            }
                        });
                    }
                };
            },
            desktop:{
                MenuChapter:function(container){//o,container
                    return $(h.ul).append(
                        $(h.li).addClass(lai.store.query.bible).append(
                            fn.option(container).parallel(function(li,i,ic){
                                var newChapter=container.children(ic), aP=container.children().length;
                                if(newChapter.length){
                                    if(aP > 1){
                                        var oldClass=z.get(container).class()[2];
                                        container.removeClass(oldClass).addClass(oldClass.charAt(0)+(aP-1));
                                        newChapter.remove();
                                        li.removeClass('has');
                                        if(lai.previous.bible===i)lai.previous.bible=container.children().eq(0).attr('class');
                                    }
                                }else{
                                    lai.todo.containerEmpty=true; $.extend(lai.store.query,{bible:i}); li.addClass('has'); fn.chapter(container);
                                }
                            })
                        ),
                        $(h.li).append(fn.option(container).note())
                    );
                },
                MenuLookUp:function(container){
                    return $(h.ul).append(
                        $(h.li).append(fn.option(container).note())
                    );
                },
                MenuNote:function(container){
                    return $(h.ul).append(
                        $(h.li).append(fn.option(container).note())
                    );
                }
            },
            tablet:{
            },
            mobile:{
            },
            chapter:function(container){
                var olb, olc, olv, ol; lD=lai.store.lang[q.bible];
                this.get(function(o,obj,bID,cID,vID,verse,list){
                    var df = new $.Deferred();
                    var bD=lai[q.bible].bible;
                    var vID=vID.slice(1);
                    var bookName=lD.b[bID], chapterName=z.utility.Num(cID), verseName=z.utility.Num(vID);
                    var msg=lD.l.BFBCV.replace(/{b}/, bookName).replace(/{c}/, chapterName).replace(/{v}/,verseName);
                    //MsgInfo.text(msg).promise().done(function(){});
                    obj.result.verse++;
                    if(obj.result.b!==bID){
                        obj.result.b=bID; obj.result.book++;
                        olb=$(h.ol).appendTo($(h.li,{id:bID,class:'bID'}).append(
                            $(h.div).append(
                                $(h.h2).text(bookName)
                            )
                        ).appendTo(ol));
                    }
                    if(obj.result.b!==bID || obj.result.c!==cID){
                        obj.result.c=cID; obj.result.chapter++;
                        olc=$(h.ol,{class:'verse'}).appendTo($(h.li,{id:cID,class:'cID'}).append(
                            $(h.div).append(
                                $(h.h3,{class:'no'}).text(chapterName).on(sO.Click,function(){
                                    $(this).parents('li').children('ol').children().each(function(){
                                        if($(this).attr("id"))$(this).toggleClass(config.css.active);
                                    });
                                }),
                                typeof o[sO.Deploy].MenuChapter === 'function' && o[sO.Deploy].MenuChapter(container)
                            )
                        ).appendTo(olb));
                    }
                    if(verse.title){
                        $(h.li,{class:'title'}).html(verse.title.join(', ')).appendTo(olc);
                    }
                    $(h.li,{id:vID,'data-verse':verseName}).html(obj.replace(verse.text,q.q)).appendTo(olc).on(sO.Click,function(){
                        $(this).toggleClass(config.css.active);
                    }).promise().always(function(){
                        if(verse.ref){
                            o.option(olc).reference(verse.ref).promise().always(function(){
                                df.resolve();
                            });
                        }else{
                            df.resolve();
                        }
                    });
                    return df.promise();
                }).data(function(o,obj){
                    o.xml(function(response){
                        if(response.status){
                            if(obj.queryChapter()){
                                var current_booklistId=obj.booklistID();
                                var current_booklist=current_booklistId.join();
                                var msg=lD.l.BFVBC.replace(/{b}/, lD.b[q.book]).replace(/{c}/, z.utility.Num(q.chapter));
                                if(lai.previous.bible===q.bible && lai.previous.booklist===current_booklist && lai.previous.chapter===q.chapter){
                                    //console.log('PREVIOUS TASK');
                                    //o.msg(msg);
                                }else{
                                    if(lai.todo.containerEmpty){
                                        delete lai.todo.containerEmpty;
                                    }else{
                                        container.empty();
                                    }
                                    ol=$(h.ol,{class:q.bible}).appendTo(container);
                                    obj.bible(obj.booklist).progress(function(){
                                        //MsgLookup.text(z.utility.Num(obj.result.verse));
                                    }).done(function(){
                                        lai.previous.booklist=current_booklist;
                                        lai.previous.bible=q.bible;
                                        lai.previous.book=q.book;
                                        lai.previous.chapter=q.chapter;
                                        //lai.store.query.result=obj.result.verse;
                                        //o.msg(msg);
                                        /*
                                        MsgLookup.attr('title',q.q).text(z.utility.Num(q.result)).promise().done(function(){
                                            if(!obj.result.verse){
                                                ol.addClass(config.css.deactivate).append(
                                                    $(h.li).html(lD.l.IsNotFound.replace(/{is}/, q.q))
                                                );
                                            }
                                        });
                                        */
                                        if(!obj.result.verse){
                                            ol.addClass(config.css.deactivate).append(
                                                $(h.li).html(lD.l.IsNotFound.replace(/{is}/, q.q))
                                            );
                                        }
                                        container.promise().done(function(){
                                            var aP=this.children().length, oldClass=z.get(this).class()[2];
                                            $(this).removeClass(oldClass);
                                            $(this).addClass(oldClass.charAt(0)+aP);
                                        });
                                    }).always(function(){
                                        if(z.analytics)z.analytics.sendEvent({bible:q.bible,key:q.book,result:q.chapter});
                                    });	
                                }
                            }
                        }
                    }).get();
                });
            },
            lookup:function(container){
                var olb, olc, olv, ol, nQ=(z.regex(q).is(q.q))?'':q.q, lD=lai.store.lang[q.bible];
                this.get(function(o,obj,bID,cID,vID,verse,list){
                    var df = new $.Deferred();
                    var bD=lai[q.bible].bible;
                    var vID=vID.slice(1);
                    var bookName=lD.b[bID], chapterName=z.utility.Num(cID), verseName=z.utility.Num(vID);
                    MsgInfo.text(lD.l.BFBCV.replace(/{b}/, bookName).replace(/{c}/, chapterName).replace(/{v}/,verseName)).promise().done(function(){
                        if(list.length){
                            var tmpid=obj.verseMerged(list,vID);
                        }else{
                            var tmpid=[vID];
                        }
                        if(tmpid.length && obj.search(verse.text,nQ)){
                            obj.result.verse++;
                            if(obj.result.b!==bID){
                                obj.result.b=bID; obj.result.book++;
                                olb=$(h.ol).appendTo($(h.li,{id:bID,class:'bID'}).append(
                                    $(h.div).append(
                                        $(h.h2).text(bookName)
                                    )
                                ).appendTo(ol));
                            }
                            if(obj.result.b!==bID || obj.result.c!==cID){
                                obj.result.c=cID; obj.result.chapter++;
                                olc=$(h.ol,{class:'verse'}).appendTo($(h.li,{id:cID,class:'cID'}).append(
                                    $(h.div).append(
                                        $(h.h3).append(
                                            $(h.a,{href:z.utility.Page(2)+$.param({book:bID,chapter:cID})}).text(chapterName)
                                        ),
                                        typeof o[sO.Deploy].MenuLookUp === 'function' && o[sO.Deploy].MenuLookUp(container)
                                    )
                                ).appendTo(olb));
                            }
                            $(h.li,{id:vID,'data-verse':verseName}).html(obj.replace(verse.text,q.q)).appendTo(olc).on(sO.Click,function(){
                                $(this).toggleClass(config.css.active);
                            }).promise().always(function(){
                                if(verse.ref){
                                    o.option(olc).reference(verse.ref).promise().always(function(){
                                        df.resolve();
                                    });
                                }else{
                                    df.resolve();
                                }
                            });
                        }else{
                            df.resolve();
                        }
                    }); return df.promise();
                }).data(function(o,obj){
                    o.xml(function(response){
                        if(response.status){
                            if(obj.queryCheck()){
                                var current_booklistId=obj.booklistID();
                                var current_booklist=current_booklistId.join();
                                if(lai.previous.q!==q.q || lai.previous.booklist!==current_booklist){
                                    ol=$(h.ol,{class:q.bible}).appendTo(container.empty());
                                    obj.bible(obj.booklist).progress(function(){
                                        MsgLookup.text(z.utility.Num(obj.result.verse));
                                    }).done(function(){
                                        lai.previous.booklist=current_booklist;
                                        lai.previous.q=q.q;
                                        o.msg(lD.l.FoundBCV.replace(/{b}/, z.utility.Num(obj.result.book)).replace(/{c}/, z.utility.Num(obj.result.chapter)).replace(/{v}/,z.utility.Num(obj.result.verse)));
                                        q.result=obj.result.verse;
                                        MsgLookup.attr('title',q.q).text(z.utility.Num(q.result)).promise().done(function(){
                                            var booklistName=z.array(obj.booklistName(current_booklistId)).to().sentence();
                                            if(!obj.result.verse){
                                                ol.addClass(config.css.deactivate).append(
                                                    $(h.li).html(lD.l.IsNotFoundIn.replace(/{is}/, q.q).replace(/{in}/, booklistName))
                                                );
                                            }
                                        });
                                        container.promise().done(function(){
                                            var aP=this.children().length, oldClass=z.get(this).class()[2];
                                            $(this).removeClass(oldClass);
                                            $(this).addClass(oldClass.charAt(0)+aP);
                                        });
                                    }).always(function(){
                                        if(z.analytics)z.analytics.sendEvent({bible:q.bible,key:q.q,result:obj.result.verse});
                                    });
                                }else{
                                    //console.log('PREVIOUS TASK');
                                }
                            }else if($.isEmptyObject(lai.store.lookup.book)){
                                lai.previous.q=q.q; lai.previous.booklist=false;
                                ol=$(h.ol,{class:q.bible}).appendTo(container.empty());
                                ol.addClass(config.css.deactivate).append(
                                    $(h.li).html(lD.l.NoBookSelected),
                                    $(h.li,{class:'showme'}).html(lD.l.ShowMe).on(sO.Click,function(){
                                        $('.lookup.setting').trigger(sO.Click);
                                    })
                                );
                            }
                        }
                    }).get();
                });
            },
            note:function(container,data){
                var olb, olc, olv, ol; lD=lai.store.lang[q.bible];
                this.get(function(o,obj,bID,cID,vID,verse,list){
                    var df = new $.Deferred();
                    var bD=lai[q.bible].bible;
                    var vID=vID.slice(1);
                    var bookName=lD.b[bID], chapterName=z.utility.Num(cID), verseName=z.utility.Num(vID);
                    MsgInfo.text(lD.l.BFBCV.replace(/{b}/, bookName).replace(/{c}/, chapterName).replace(/{v}/,verseName)).promise().done(function(){
                        var tmpid=(list.length)?obj.verseMerged(list,vID):[vID];
                        if(tmpid.length){
                            obj.result.verse++;
                            if(obj.result.b!==bID){
                                    obj.result.b=bID; obj.result.book++;
                                    olb=$(h.ol).appendTo($(h.li,{id:bID,class:'bID'}).append(
                                            $(h.div).append(
                                                    $(h.h3).text(bookName)
                                            )
                                    ).appendTo(ol));
                            }
                            if(obj.result.b!==bID || obj.result.c!==cID){
                                obj.result.c=cID; obj.result.chapter++;
                                olc=$(h.ol,{class:'verse'}).appendTo($(h.li,{id:cID,class:'cID'}).append(
                                    $(h.div).append(
                                        $(h.h4,{class:'no'}).text(chapterName).on(sO.Click,function(){
                                                $(this).parent().parent().children('ol').children().each(function(){
                                                        if($(this).attr("id"))$(this).toggleClass(config.css.active);
                                                });
                                        }),
                                        typeof o[sO.Deploy].MenuNote === 'function' && o[sO.Deploy].MenuNote(container)
                                    )
                                ).appendTo(olb));
                            }
                            if(verse.title){
                                $(h.li,{class:'title'}).html(verse.title.join(', ')).appendTo(olc);
                            }
                            $(h.li,{id:vID,'data-verse':verseName}).html(obj.replace(verse.text,q.q)).appendTo(olc).on(sO.Click,function(){
                                $(this).toggleClass(config.css.active);
                            }).promise().always(function(){
                                if(verse.ref){
                                    o.option(olc).reference(verse.ref).promise().always(function(){
                                        df.resolve();
                                    });
                                }else{
                                    df.resolve();
                                }
                            });
                        }
                    });
                    return df.promise();
                }).data(function(o,obj){
                    o.xml(function(response){
                        if(response.status){
                            ol=$(h.ol,{class:q.bible}).appendTo(container);
                            if(data){
                                obj.bible(data).progress(function(){
                                    MsgLookup.text(z.utility.Num(obj.result.verse));
                                }).done(function(){
                                    container.addClass(config.css.active);
                                }).always(function(){

                                });
                            }
                        }
                    }).get();
                });
            },
            reference:function(container){
                var olb, ol; lD=lai.store.lang[q.bible];
                this.get(function(o,obj,bID,cID,vID,verse,list){
                    var df = new $.Deferred();
                    var bD=lai[q.bible].bible;
                    var vID=vID.slice(1);
                    var bookName=lD.b[bID], chapterName=z.utility.Num(cID), verseName=z.utility.Num(vID);
                    var tmpid=(list.length)?obj.verseMerged(list,vID):[vID];
                    if(tmpid.length){
                        obj.result.verse++;
                        if(obj.result.b!==bID){
                            obj.result.b=bID; obj.result.book++;
                            olb=$(h.ol).appendTo($(h.li,{id:bID,class:'bID'}).append(
                                $(h.div).append(
                                    $(h.h3).text(bookName)
                                )
                            ).appendTo(ol));
                        }
                        if(obj.result.b!==bID || obj.result.c!==cID){
                            obj.result.c=cID; obj.result.chapter++;
                            olc=$(h.ol,{class:'verse'}).appendTo($(h.li,{id:cID,class:'cID'}).append(
                                $(h.div).append(
                                    $(h.h4,{class:'no'}).text(chapterName)
                                )
                            ).appendTo(olb));
                        }
                        if(verse.title){
                            $(h.li,{class:'title'}).html(verse.title.join(', ')).appendTo(olc);
                        }
                        $(h.li,{id:vID,'data-verse':verseName}).html(obj.replace(verse.text,q.q)).appendTo(olc).promise().always(function(){
                            df.resolve();
                        });
                    }else{
                        df.resolve();
                    }
                    return df.promise();
                }).data(function(o,obj){
                    o.xml(function(response){
                        if(response.status){
                            var reference=z.regex(q).is(q.ref);
                            if(reference){
                                ol=$(h.ol,{class:q.bible}).appendTo(container.empty());
                                obj.bible(reference).progress(function(){
                                    MsgLookup.text(z.utility.Num(obj.result.verse));
                                }).done(function(){
                                    container.addClass(config.css.active);
                                }).always(function(){
                                    delete q.ref;
                                });
                            }else{
                                delete q.ref;
                            }
                        }
                    }).get();
                });
            }
        }; return fn;
    },
    bible:function(){
        console.log(this.ready);
        var p=this.utility.Page(1);
        this.containerMain.html(this.menu(function(bID,lang,isLocal,availableClass,offlineClass,onlineClass,isAvailable){
            return $(h.p).append(
                $(h.span,{class:isAvailable}).on(sO.Click,function(evt){
                    evt.preventDefault(); //evt.stopPropagation();  evt.stopImmediatePropagation();
                    var x=$(this), li=x.parents('li');
                    if(MsgInfo.is(":hidden"))lai.todo.bibleOption=false;
                    if(lai.todo.bibleOption===bID){
                        z.utility.Done(function(){
                            delete lai.todo.bibleOption;
                        });
                    }else if(li.hasClass(config.css.notAvailable)){
                        z.utility.Working({
                            msg:$(h.ul,{class:'data-dialog'}).append(
                                $(h.li).append(
                                    $(h.p).html(lai.store.lang[bID].l.WouldYouLikeToAdd.replace(/{is}/, x.parent().children('a').text()))
                                ),
                                $(h.li).append(
                                    $(h.span,{class:'yes icon-thumbs-up-alt'}).on(sO.Click,function(evt){
                                        evt.preventDefault();
                                        z.content({bible:bID}).xml(function(response){
                                            if(response.status){
                                                li.removeClass(config.css.notAvailable).addClass(config.css.available);
                                                x.removeClass(onlineClass).addClass(offlineClass);
                                            }
                                        }).get();
                                    }),
                                    $(h.span,{class:'no icon-thumbs-down-alt'}).on(sO.Click,function(evt){
                                        evt.preventDefault();
                                        z.utility.Done(function(){
                                            delete lai.todo.bibleOption;
                                        });
                                    })
                                )
                            ),
                            wait:true
                        });
                    }else{
                        lai.todo.bibleOption=bID;
                        z.utility.Working({
                            msg:$(h.ul,{class:'data-dialog'}).append(
                                $(h.li).append(
                                    $(h.p).html(lai.store.lang[bID].l.WouldYouLikeToRemove.replace(/{is}/, x.parent().children('a').text()))
                                ),
                                $(h.li).append(
                                    $(h.span,{class:'yes icon-thumbs-up-alt'}).on(sO.Click,function(evt){
                                        evt.preventDefault();
                                        li.removeClass(config.css.available).addClass(config.css.notAvailable);
                                        x.removeClass(offlineClass).addClass(onlineClass);
                                        z.utility.Working({msg:lai.store.lang[bID].l.PleaseWait,wait:true}).promise().done(function(){
                                            li.removeClass(config.css.available).addClass(config.css.notAvailable);
                                            x.removeClass(offlineClass).addClass(onlineClass);
                                            z.content({bible:bID}).xml(function(response){
                                                z.utility.Done(function(){
                                                    delete lai.todo.bibleOption;
                                                });
                                            }).remove();
                                        });
                                    }),
                                    $(h.span,{class:'no icon-thumbs-down-alt'}).on(sO.Click,function(evt){
                                        evt.preventDefault();
                                        z.utility.Done(function(){
                                            delete lai.todo.bibleOption;
                                        });
                                    })
                                )
                            ),
                            wait:true
                        });
                    }
                }),
                $(h.a,{href:p+$.param({bible:bID})}).html(lang.name),
                $(h.span,{class:'icon-menu drag'})
            );
        }).bible({id:'dragable',class:'rows row-bible'})).promise().done(function(e){
            console.log('done');
        });
        /*
        var p=this.utility.Page(1), ol=$(h.ol,{id:'dragable',class:'rows row-bible'}).appendTo(this.containerMain.empty());
        config.bible.available.forEach(function(bID){
            var lang=lai.store.lang[bID].info, isLocal=lai.store.lang[bID].local, availableClass=(isLocal)?config.css.available:config.css.notAvailable,
            offlineClass='icon-ok offline',onlineClass='icon-logout offline', isAvailable=(isLocal)?offlineClass:onlineClass;
            $(h.li,{id:bID,class:(lai.store.query.bible===bID)?config.css.active+' '+availableClass:availableClass}).html(
                $(h.p).append(
                    $(h.span,{class:isAvailable}).on(sO.Click,function(evt){
                        evt.preventDefault(); //evt.stopPropagation();  evt.stopImmediatePropagation();
                        var x=$(this), li=x.parents('li');
                        if(MsgInfo.is(":hidden"))lai.todo.bibleOption=false;
                        if(lai.todo.bibleOption===bID){
                            z.utility.Done(function(){
                                delete lai.todo.bibleOption;
                            });
                        }else if(li.hasClass(config.css.notAvailable)){
                            z.utility.Working({
                                msg:$(h.ul,{class:'data-dialog'}).append(
                                    $(h.li).append(
                                        $(h.p).html(lai.store.lang[bID].l.WouldYouLikeToAdd.replace(/{is}/, x.parent().children('a').text()))
                                    ),
                                    $(h.li).append(
                                        $(h.span,{class:'yes icon-thumbs-up-alt'}).on(sO.Click,function(evt){
                                            evt.preventDefault();
                                            z.content({bible:bID}).xml(function(response){
                                                if(response.status){
                                                    li.removeClass(config.css.notAvailable).addClass(config.css.available);
                                                    x.removeClass(onlineClass).addClass(offlineClass);
                                                }
                                            }).get();
                                        }),
                                        $(h.span,{class:'no icon-thumbs-down-alt'}).on(sO.Click,function(evt){
                                            evt.preventDefault();
                                            z.utility.Done(function(){
                                                delete lai.todo.bibleOption;
                                            });
                                        })
                                    )
                                ),
                                wait:true
                            });
                        }else{
                            lai.todo.bibleOption=bID;
                            z.utility.Working({
                                msg:$(h.ul,{class:'data-dialog'}).append(
                                    $(h.li).append(
                                        $(h.p).html(lai.store.lang[bID].l.WouldYouLikeToRemove.replace(/{is}/, x.parent().children('a').text()))
                                    ),
                                    $(h.li).append(
                                        $(h.span,{class:'yes icon-thumbs-up-alt'}).on(sO.Click,function(evt){
                                            evt.preventDefault();
                                            li.removeClass(config.css.available).addClass(config.css.notAvailable);
                                            x.removeClass(offlineClass).addClass(onlineClass);
                                            z.utility.Working({msg:lai.store.lang[bID].l.PleaseWait,wait:true}).promise().done(function(){
                                                li.removeClass(config.css.available).addClass(config.css.notAvailable);
                                                x.removeClass(offlineClass).addClass(onlineClass);
                                                z.content({bible:bID}).xml(function(response){
                                                    z.utility.Done(function(){
                                                        delete lai.todo.bibleOption;
                                                    });
                                                }).remove();
                                            });
                                        }),
                                        $(h.span,{class:'no icon-thumbs-down-alt'}).on(sO.Click,function(evt){
                                            evt.preventDefault();
                                            z.utility.Done(function(){
                                                delete lai.todo.bibleOption;
                                            });
                                        })
                                    )
                                ),
                                wait:true
                            });
                        }
                    }),
                    $(h.a,{href:p+$.param({bible:bID})}).html(lang.name),
                    $(h.span,{class:'icon-menu drag'})
                )
            ).appendTo(ol);
        });
        */
        /*
        ol.promise().done(function(e){
            Sortable.create(document.getElementById(this.get(0).id), {
                handle: ".drag", animation: 150, ghostClass: 'ghost',
                onAdd: function (evt){},
                onUpdate:function(evt){
                    ol.children().each(function(i,e){
                        var id=$(e).get(0).id;
                        lai.store.lang[id].index=$(e).index();
                    }).promise().done(function(){
                        db.UpdateLang().then(z.utility.Index);
                    });
                },
                onRemove: function (evt){},
                onStart:function(evt){},
                onEnd: function(evt){}
            });
        });
        */
    },
    book:function(){
        //TODO
        var fU=this.utility.Page(2), lD=lai.store.lang[lai.store.query.bible], div=$(h.div,{class:'data-book'}).appendTo(this.containerMain.empty());
        $.each(bible.catalog,function(testamentID,cL){
            var testamentName=lD.t[testamentID];
            $(h.ol,{class:'testament',id:testamentID}).append(
                $(h.li,{id:'t-'+testamentID}).html(
                    $(h.h1,{text:testamentName})
                )
            ).appendTo(div).promise().done(function(){
                $(h.ol,{class:'catalog'}).appendTo(this.children()).promise().done(function(){
                    var it=this;
                    $.each(cL,function(catalogID,bL){
                        var catalogName=lD.s[catalogID];
                        $(h.li,{id:'c-'+catalogID}).append(
                            $(h.h2,{text:catalogName})
                        ).appendTo(it).promise().done(function(){
                            var it=$(h.ol,{class:'book'}).appendTo(this);
                            bL.forEach(function(bookID){
                                var bookName=lD.b[bookID];
                                $(h.li,{id:'b-'+bookID,class:(lai.store.query.book==bookID?config.css.active:'')}).append(
                                    $(h.p).append(
                                        $(h.a,{href:fU+$.param({book:bookID})}).html(bookName),
                                        z.fA.chapter.book(bookID)
                                    )
                                ).appendTo(it);
                            });
                        });
                    });
                });
            });
        });
    },
    reader:function(){
        //TODO
        delete lai.todo.pause;
        this.content(lai.store.query).chapter(this.containerMain.children());
    },
    lookup:function(){
        //TODO
        //delete lai.todo.pause;
        this.content(lai.store.query).lookup(this.containerMain.children());
    },
    note:function(){
        //TODO
        //this.content(lai.store.query).note(this.containerMain.children());
        var container=$(h.div,{class:'data-com data-note d1'}).appendTo(this.containerMain.empty());
        var lB=lai.store.lang[lai.store.query.bible];
        /*
        if(this.db.connection){
                var sql=z.db.user.note.get();
                sql.onsuccess=function(e){
                };
                sql.onerror=function(e){
                        $(h.div,{class:'data-note error'}).html('there seem to be Indexedb problem!').appendTo(container);
                };
        }else{
                $(h.div,{class:'data-note error indexedb'}).html('Your browser does not support Indexedb!').appendTo(container);
        }
        */
        var notelist=function(){
                var ol=$(h.ol,{class:'nobg'}).appendTo(container.empty());
                if(lai.store.note){
                        var total=Object.keys(lai.store.note).length;
                        $.each(lai.store.note,function(id,note){
                                //console.log(id,note);
                                if(note.name){
                                        var iseditable=($.isNumeric(id))?'yes icon-list':'no icon-'+id;
                                        var totalData=(note.data)?Object.keys(note.data).length:0;
                                        $(h.li,{id:id, class:iseditable,'data-title':totalData}).append(
                                            $(h.div).html(note.name).on(sO.Click,function(e) {
                                                var x = $(this);
                                                if(!x.attr('contenteditable')){
                                                    setTimeout(function() {
                                                            var dblclick = parseInt(x.data('double'), 7);
                                                            if(dblclick > 0){
                                                                    x.data('double', dblclick-1);
                                                            }else{
                                                                    var olN=x.parent().children('ol');
                                                                    if(olN.length){
                                                                            olN.remove();x.parent().removeClass(config.css.active);
                                                                    }else{
                                                                            x.parent().addClass(config.css.active);
                                                                            if(note.data){
                                                                                    z.content(lai.store.query).note(x.parent(),note.data);
                                                                            }else{
                                                                                    $(h.ol,{class:'norecord'}).append($(h.li).html('No record found!')).appendTo(x.parent());
                                                                            }
                                                                    }
                                                            }
                                                    },50);
                                                }
                                            }).dblclick(function(e) {
                                                $(this).data('double', 1);
                                                var x=$(this), label=x.text(), id=x.parent().attr('id');
                                                if($.isNumeric(id)){
                                                    x.unbind(sO.Click+'.myEvents').attr({'data-title':label,contenteditable:true}).on('keydown',function(e){
                                                        if(e.keyCode === 27){
                                                            x.removeAttr('contenteditable','autocomplete').text(label).bind(sO.Click);
                                                            delete lai.todo.pause;
                                                        }else if(e.keyCode === 13){
                                                            lai.store.note[id].name=$(this).removeAttr('contenteditable').text();
                                                            db.put({table:config.store.note,data:lai.store.note});
                                                        }
                                                    });
                                                }
                                            })
                                        ).appendTo(ol).promise().done(function(){
                                            if($.isNumeric(id)){
                                                var x=this;
                                                $(h.span,{class:'delete icon-wrong',title:'delete'}).on(sO.Click,function(){
                                                    delete lai.store.note[id];
                                                    db.UpdateNote().then(function(){
                                                            x.remove();
                                                    });
                                                    /*
                                                    db.put({table:config.store.note,data:lai.store.note}).then(function(){
                                                            x.remove();
                                                    });
                                                    */
                                                }).appendTo(this);
                                            }
                                        });
                                }
                        });
                }else{
                        $(h.li).html('No records were found!').appendTo(ol);
                }
                $(h.li,{class:'add icon-tag',contenteditable:true}).on('keydown',function(e){
                                if(e.keyCode === 13){
                                        var label=$(this).text(), uniqueid=Math.random().toString().substr(2, 9);
                                        if(label && !lai.store.note[uniqueid]){
                                                lai.store.note[uniqueid]={name:label};
                                                db.put({table:config.store.note,data:lai.store.note}).then(function(){
                                                        notelist();
                                                });
                                        }
                                        e.preventDefault();
                                }
                }).on(sO.Click,function(){
                        $(this).addClass(config.css.active).empty();
                }).appendTo(ol);
        };
        notelist();
    },
    todo:function(){
        //TODO
        /*
        db.deleteDatabase().then(function(){
            console.log('DB deleted');
        });
        */
    }
};};})(jQuery,navigator.userAgent);