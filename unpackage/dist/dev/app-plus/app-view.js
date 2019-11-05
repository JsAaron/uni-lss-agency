var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20190312_syb_scopedata*/window.__wcc_version__='v0.5vv_20190312_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'header'])
Z([3,'header__top'])
Z([3,'header__top-content'])
Z([3,'header__line'])
Z([3,'header__text'])
Z([3,'数据总览'])
Z([3,'header__data'])
Z([3,'header__row'])
Z([3,'header__col'])
Z([3,'¥1399.49'])
Z([3,'总交易额'])
Z(z[8])
Z([3,'1'])
Z([3,'三级代理商总数'])
Z(z[7])
Z(z[8])
Z(z[9])
Z([3,'佣金总额'])
Z(z[8])
Z([3,'113'])
Z([3,'商户总数'])
Z(z[7])
Z(z[8])
Z([3,'3'])
Z([3,'二级代理商总数'])
Z(z[8])
Z([3,'2016'])
Z([3,'总交易笔数'])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'container'])
Z([3,'__l'])
Z([3,'1'])
Z([3,'content'])
Z([3,'content__title'])
Z([3,'content__line'])
Z([3,'content__text'])
Z([3,'业务员发展商户占比'])
Z([3,'qiun-columns'])
Z([3,'qiun-charts'])
Z([3,'canvasRing'])
Z([3,'charts'])
Z(z[10])
Z([3,'qiun-bottom'])
Z([3,'qiun-names'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'serieNames']])
Z(z[15])
Z([3,'qiun-row'])
Z([3,'qiun-dot'])
Z([a,[[2,'+'],[[2,'+'],[[2,'+'],[[6],[[7],[3,'item']],[3,'name']],[1,':']],[[6],[[7],[3,'item']],[3,'data']]],[1,'%']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./pages/home/header.wxml','./pages/home/main.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_n('view')
_rz(z,oB,'class',0,e,s,gg)
var xC=_n('view')
_rz(z,xC,'class',1,e,s,gg)
var oD=_n('view')
_rz(z,oD,'class',2,e,s,gg)
var fE=_n('view')
_rz(z,fE,'class',3,e,s,gg)
_(oD,fE)
var cF=_n('text')
_rz(z,cF,'class',4,e,s,gg)
var hG=_oz(z,5,e,s,gg)
_(cF,hG)
_(oD,cF)
_(xC,oD)
_(oB,xC)
var oH=_n('view')
_rz(z,oH,'class',6,e,s,gg)
var cI=_n('view')
_rz(z,cI,'class',7,e,s,gg)
var oJ=_n('view')
_rz(z,oJ,'class',8,e,s,gg)
var lK=_n('view')
var aL=_n('text')
var tM=_oz(z,9,e,s,gg)
_(aL,tM)
_(lK,aL)
_(oJ,lK)
var eN=_n('view')
var bO=_oz(z,10,e,s,gg)
_(eN,bO)
_(oJ,eN)
_(cI,oJ)
var oP=_n('view')
_rz(z,oP,'class',11,e,s,gg)
var xQ=_n('view')
var oR=_oz(z,12,e,s,gg)
_(xQ,oR)
_(oP,xQ)
var fS=_n('view')
var cT=_oz(z,13,e,s,gg)
_(fS,cT)
_(oP,fS)
_(cI,oP)
_(oH,cI)
var hU=_n('view')
_rz(z,hU,'class',14,e,s,gg)
var oV=_n('view')
_rz(z,oV,'class',15,e,s,gg)
var cW=_n('view')
var oX=_oz(z,16,e,s,gg)
_(cW,oX)
_(oV,cW)
var lY=_n('view')
var aZ=_oz(z,17,e,s,gg)
_(lY,aZ)
_(oV,lY)
_(hU,oV)
var t1=_n('view')
_rz(z,t1,'class',18,e,s,gg)
var e2=_n('view')
var b3=_oz(z,19,e,s,gg)
_(e2,b3)
_(t1,e2)
var o4=_n('view')
var x5=_oz(z,20,e,s,gg)
_(o4,x5)
_(t1,o4)
_(hU,t1)
_(oH,hU)
var o6=_n('view')
_rz(z,o6,'class',21,e,s,gg)
var f7=_n('view')
_rz(z,f7,'class',22,e,s,gg)
var c8=_n('view')
var h9=_oz(z,23,e,s,gg)
_(c8,h9)
_(f7,c8)
var o0=_n('view')
var cAB=_oz(z,24,e,s,gg)
_(o0,cAB)
_(f7,o0)
_(o6,f7)
var oBB=_n('view')
_rz(z,oBB,'class',25,e,s,gg)
var lCB=_n('view')
var aDB=_oz(z,26,e,s,gg)
_(lCB,aDB)
_(oBB,lCB)
var tEB=_n('view')
var eFB=_oz(z,27,e,s,gg)
_(tEB,eFB)
_(oBB,tEB)
_(o6,oBB)
_(oH,o6)
_(oB,oH)
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var oHB=_n('view')
_rz(z,oHB,'class',0,e,s,gg)
var xIB=_mz(z,'m-header',['bind:__l',1,'vueId',1],[],e,s,gg)
_(oHB,xIB)
var oJB=_n('view')
_rz(z,oJB,'class',3,e,s,gg)
var fKB=_n('view')
_rz(z,fKB,'class',4,e,s,gg)
var cLB=_n('view')
_rz(z,cLB,'class',5,e,s,gg)
_(fKB,cLB)
var hMB=_n('view')
_rz(z,hMB,'class',6,e,s,gg)
var oNB=_oz(z,7,e,s,gg)
_(hMB,oNB)
_(fKB,hMB)
_(oJB,fKB)
_(oHB,oJB)
var cOB=_n('view')
_rz(z,cOB,'class',8,e,s,gg)
var oPB=_n('view')
_rz(z,oPB,'class',9,e,s,gg)
var lQB=_mz(z,'canvas',['canvasId',10,'class',1,'id',2],[],e,s,gg)
_(oPB,lQB)
_(cOB,oPB)
_(oHB,cOB)
var aRB=_n('view')
_rz(z,aRB,'class',13,e,s,gg)
var tSB=_n('view')
_rz(z,tSB,'class',14,e,s,gg)
var eTB=_v()
_(tSB,eTB)
var bUB=function(xWB,oVB,oXB,gg){
var cZB=_n('view')
_rz(z,cZB,'class',19,xWB,oVB,gg)
var h1B=_n('text')
_rz(z,h1B,'class',20,xWB,oVB,gg)
_(cZB,h1B)
var o2B=_n('text')
var c3B=_oz(z,21,xWB,oVB,gg)
_(o2B,c3B)
_(cZB,o2B)
_(oXB,cZB)
return oXB
}
eTB.wxXCkey=2
_2z(z,17,bUB,e,s,gg,eTB,'item','index','index')
_(aRB,tSB)
_(oHB,aRB)
_(r,oHB)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],["@charset \x22UTF-8\x22;\nbody { width: 100%; height: 100%; -webkit-box-sizing: border-box; box-sizing: border-box; font-size: 16px; -webkit-font-smoothing: antialiased; font-family: Arial; position: relative; font-size: 16px; font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; }\nwx-button[plain] { border: 0; }\nwx-button::after { border: none; }\nwx-input { outline: none; border: none; list-style: none; }\n",],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./app.wxss:18:8)",{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./app.wxss:18:8)",{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['pages/home/header.wxss']=setCssToHead([".",[1],"header { height: ",[0,500],"; position: relative; }\n.",[1],"header__line { margin: 0 ",[0,20],"; width: ",[0,10],"; height: ",[0,40],"; background: #ffffff; }\n.",[1],"header__top { height: ",[0,300],"; width: 100%; background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RkM1Q0I2M0ZFQjIxMUU5QUM1REVCRkFGRkMwOTA1NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RkM1Q0I2NEZFQjIxMUU5QUM1REVCRkFGRkMwOTA1NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdGQzVDQjYxRkVCMjExRTlBQzVERUJGQUZGQzA5MDU3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdGQzVDQjYyRkVCMjExRTlBQzVERUJGQUZGQzA5MDU3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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); background-size: 100% 100%; color: #ffffff; }\n.",[1],"header__top-content { display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; padding-top: ",[0,60],"; }\n.",[1],"header__text { font-size: 20px; }\n.",[1],"header__data { -webkit-box-shadow: 0px 10px 10px #ccc; box-shadow: 0px 10px 10px #ccc; display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around; font-size: ",[0,25],"; position: absolute; top: ",[0,150],"; background: #ffffff; width: ",[0,700],"; border-radius: 10px; left: ",[0,25],"; font-weight: bold; }\n.",[1],"header__row { padding: ",[0,20]," 0; }\n.",[1],"header__col { padding: ",[0,20]," 0; line-height: 200%; display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n.",[1],"header__col \x3e wx-view:last-child { color: #909399; }\n",],undefined,{path:"./pages/home/header.wxss"});    
__wxAppCode__['pages/home/header.wxml']=$gwx('./pages/home/header.wxml');

__wxAppCode__['pages/home/main.wxss']=setCssToHead([".",[1],"container { width: 100vw; min-height: 100vh; background: #fff; overflow-y: scroll; }\n.",[1],"content { margin: ",[0,20]," 0; }\n.",[1],"content__title { display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; font-weight: bold; font-size: ",[0,30],"; }\n.",[1],"content__line { margin: 0 ",[0,20],"; width: ",[0,10],"; height: ",[0,30],"; background: #60a8fc; }\n.",[1],"qiun-padding { padding: 2%; width: 96%; }\n.",[1],"qiun-wrap { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"qiun-rows { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal !important; -webkit-box-direction: normal !important; -webkit-flex-direction: row !important; -ms-flex-direction: row !important; flex-direction: row !important; }\n.",[1],"qiun-columns { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical !important; -webkit-box-direction: normal !important; -webkit-flex-direction: column !important; -ms-flex-direction: column !important; flex-direction: column !important; }\n.",[1],"qiun-common-mt { margin-top: ",[0,10],"; }\n.",[1],"qiun-bg-white { background: #ffffff; }\n.",[1],"qiun-title-bar { width: 96%; padding: ",[0,10]," 2%; -webkit-flex-wrap: nowrap; -ms-flex-wrap: nowrap; flex-wrap: nowrap; }\n.",[1],"qiun-title-dot-light { border-left: ",[0,10]," solid #0ea391; padding-left: ",[0,10],"; font-size: ",[0,32],"; color: #000000; }\n.",[1],"qiun-charts { width: ",[0,750],"; height: ",[0,500],"; background-color: #ffffff; }\n.",[1],"charts { width: ",[0,750],"; height: ",[0,500],"; background-color: #ffffff; }\n.",[1],"qiun-bottom { padding: ",[0,30]," ",[0,20],"; font-size: 12px; }\n.",[1],"qiun-names { display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n.",[1],"qiun-row { display: -webkit-box !important; display: -webkit-flex !important; display: -ms-flexbox !important; display: flex !important; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; width: 25%; padding: ",[0,10]," 0; }\n.",[1],"qiun-dot { width: ",[0,20],"; height: ",[0,20],"; border-radius: 50%; background: red; background: #0069d9; margin-right: ",[0,5],"; }\n",],undefined,{path:"./pages/home/main.wxss"});    
__wxAppCode__['pages/home/main.wxml']=$gwx('./pages/home/main.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();
