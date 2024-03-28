
var APNGOptimizerModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(moduleArg = {}) {

var f=moduleArg,aa,r;f.ready=new Promise((a,b)=>{aa=a;r=b});var ba=Object.assign({},f),ca=(a,b)=>{throw b;},da="object"==typeof window,t="function"==typeof importScripts,u="",fa;
if(da||t)t?u=self.location.href:"undefined"!=typeof document&&document.currentScript&&(u=document.currentScript.src),_scriptDir&&(u=_scriptDir),u.startsWith("blob:")?u="":u=u.substr(0,u.replace(/[?#].*/,"").lastIndexOf("/")+1),t&&(fa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});var ha=f.print||console.log.bind(console),w=f.printErr||console.error.bind(console);Object.assign(f,ba);ba=null;f.quit&&(ca=f.quit);var y;
f.wasmBinary&&(y=f.wasmBinary);var z,ia=!1,ja,A,C,D,F,G,ka,la;function ma(){var a=z.buffer;f.HEAP8=ja=new Int8Array(a);f.HEAP16=C=new Int16Array(a);f.HEAPU8=A=new Uint8Array(a);f.HEAPU16=D=new Uint16Array(a);f.HEAP32=F=new Int32Array(a);f.HEAPU32=G=new Uint32Array(a);f.HEAPF32=ka=new Float32Array(a);f.HEAPF64=la=new Float64Array(a)}var na=[],oa=[],pa=[];function qa(){var a=f.preRun.shift();na.unshift(a)}var H=0,sa=null,J=null;
function ta(a){f.onAbort?.(a);a="Aborted("+a+")";w(a);ia=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");r(a);throw a;}var ua=a=>a.startsWith("data:application/octet-stream;base64,"),K;K="apng-optimizer.wasm";if(!ua(K)){var va=K;K=f.locateFile?f.locateFile(va,u):u+va}function wa(a){if(a==K&&y)return new Uint8Array(y);if(fa)return fa(a);throw"both async and sync fetching of the wasm failed";}
function xa(a){return y||!da&&!t||"function"!=typeof fetch?Promise.resolve().then(()=>wa(a)):fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${a}'`;return b.arrayBuffer()}).catch(()=>wa(a))}function ya(a,b,c){return xa(a).then(d=>WebAssembly.instantiate(d,b)).then(c,d=>{w(`failed to asynchronously prepare wasm: ${d}`);ta(d)})}
function za(a,b){var c=K;return y||"function"!=typeof WebAssembly.instantiateStreaming||ua(c)||"function"!=typeof fetch?ya(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){w(`wasm streaming compile failed: ${e}`);w("falling back to ArrayBuffer instantiation");return ya(c,a,b)}))}function Aa(a){this.name="ExitStatus";this.message=`Program terminated with exit(${a})`;this.status=a}
var Ba=a=>{for(;0<a.length;)a.shift()(f)},Ca=f.noExitRuntime||!0,Da="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,L=(a,b,c)=>{var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.buffer&&Da)return Da.decode(a.subarray(b,c));for(d="";b<c;){var e=a[b++];if(e&128){var g=a[b++]&63;if(192==(e&224))d+=String.fromCharCode((e&31)<<6|g);else{var k=a[b++]&63;e=224==(e&240)?(e&15)<<12|g<<6|k:(e&7)<<18|g<<12|k<<6|a[b++]&63;65536>e?d+=String.fromCharCode(e):(e-=65536,d+=String.fromCharCode(55296|
e>>10,56320|e&1023))}}else d+=String.fromCharCode(e)}return d};class Ea{constructor(a){this.O=a-24}}var Fa=0,Ga=0,Ha={},Ia=a=>{for(;a.length;){var b=a.pop();a.pop()(b)}};function Ja(a){return this.fromWireType(G[a>>2])}
var M={},N={},Ka={},La,Ma=(a,b,c)=>{function d(l){l=c(l);if(l.length!==a.length)throw new La("Mismatched type converter count");for(var h=0;h<a.length;++h)O(a[h],l[h])}a.forEach(function(l){Ka[l]=b});var e=Array(b.length),g=[],k=0;b.forEach((l,h)=>{N.hasOwnProperty(l)?e[h]=N[l]:(g.push(l),M.hasOwnProperty(l)||(M[l]=[]),M[l].push(()=>{e[h]=N[l];++k;k===g.length&&d(e)}))});0===g.length&&d(e)},Na,P=a=>{for(var b="";A[a];)b+=Na[A[a++]];return b},Q,Oa=a=>{throw new Q(a);};
function Pa(a,b,c={}){var d=b.name;if(!a)throw new Q(`type "${d}" must have a positive integer typeid pointer`);if(N.hasOwnProperty(a)){if(c.W)return;throw new Q(`Cannot register type '${d}' twice`);}N[a]=b;delete Ka[a];M.hasOwnProperty(a)&&(b=M[a],delete M[a],b.forEach(e=>e()))}function O(a,b,c={}){if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");return Pa(a,b,c)}
var Qa=[],R=[],Ta=a=>{switch(a){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:const b=Qa.pop()||R.length;R[b]=a;R[b+1]=1;return b}},Ua={name:"emscripten::val",fromWireType:a=>{if(!a)throw new Q("Cannot use deleted val. handle = "+a);var b=R[a];9<a&&0===--R[a+1]&&(R[a]=void 0,Qa.push(a));return b},toWireType:(a,b)=>Ta(b),argPackAdvance:8,readValueFromPointer:Ja,L:null},Va=(a,b)=>{switch(b){case 4:return function(c){return this.fromWireType(ka[c>>2])};case 8:return function(c){return this.fromWireType(la[c>>
3])};default:throw new TypeError(`invalid float width (${b}): ${a}`);}},Wa=(a,b)=>Object.defineProperty(b,"name",{value:a});function Xa(a){for(var b=1;b<a.length;++b)if(null!==a[b]&&void 0===a[b].L)return!0;return!1}function Ya(a){var b=Function;if(!(b instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);var c=Wa(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c}
var Za=(a,b)=>{if(void 0===f[a].N){var c=f[a];f[a]=function(...d){if(!f[a].N.hasOwnProperty(d.length))throw new Q(`Function '${b}' called with an invalid number of arguments (${d.length}) - expects one of (${f[a].N})!`);return f[a].N[d.length].apply(this,d)};f[a].N=[];f[a].N[c.R]=c}},$a=(a,b,c)=>{if(f.hasOwnProperty(a)){if(void 0===c||void 0!==f[a].N&&void 0!==f[a].N[c])throw new Q(`Cannot register public name '${a}' twice`);Za(a,a);if(f.hasOwnProperty(c))throw new Q(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
f[a].N[c]=b}else f[a]=b,void 0!==c&&(f[a].ca=c)},ab=(a,b)=>{for(var c=[],d=0;d<a;d++)c.push(G[b+4*d>>2]);return c},S,bb=(a,b,c=[])=>a.includes("j")?(0,f["dynCall_"+a])(b,...c):S.get(b)(...c),cb=(a,b)=>(...c)=>bb(a,b,c),T=(a,b)=>{a=P(a);var c=a.includes("j")?cb(a,b):S.get(b);if("function"!=typeof c)throw new Q(`unknown function pointer with signature ${a}: ${b}`);return c},db,fb=a=>{a=eb(a);var b=P(a);U(a);return b},gb=(a,b)=>{function c(g){e[g]||N[g]||(Ka[g]?Ka[g].forEach(c):(d.push(g),e[g]=!0))}
var d=[],e={};b.forEach(c);throw new db(`${a}: `+d.map(fb).join([", "]));},hb=a=>{a=a.trim();const b=a.indexOf("(");return-1!==b?a.substr(0,b):a},ib=(a,b,c)=>{switch(b){case 1:return c?d=>ja[d]:d=>A[d];case 2:return c?d=>C[d>>1]:d=>D[d>>1];case 4:return c?d=>F[d>>2]:d=>G[d>>2];default:throw new TypeError(`invalid integer width (${b}): ${a}`);}},jb="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0,kb=(a,b)=>{var c=a>>1;for(var d=c+b/2;!(c>=d)&&D[c];)++c;c<<=1;if(32<c-a&&jb)return jb.decode(A.subarray(a,
c));c="";for(d=0;!(d>=b/2);++d){var e=C[a+2*d>>1];if(0==e)break;c+=String.fromCharCode(e)}return c},lb=(a,b,c)=>{c??=2147483647;if(2>c)return 0;c-=2;var d=b;c=c<2*a.length?c/2:a.length;for(var e=0;e<c;++e)C[b>>1]=a.charCodeAt(e),b+=2;C[b>>1]=0;return b-d},mb=a=>2*a.length,nb=(a,b)=>{for(var c=0,d="";!(c>=b/4);){var e=F[a+4*c>>2];if(0==e)break;++c;65536<=e?(e-=65536,d+=String.fromCharCode(55296|e>>10,56320|e&1023)):d+=String.fromCharCode(e)}return d},ob=(a,b,c)=>{c??=2147483647;if(4>c)return 0;var d=
b;c=d+c-4;for(var e=0;e<a.length;++e){var g=a.charCodeAt(e);if(55296<=g&&57343>=g){var k=a.charCodeAt(++e);g=65536+((g&1023)<<10)|k&1023}F[b>>2]=g;b+=4;if(b+4>c)break}F[b>>2]=0;return b-d},pb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&++c;b+=4}return b},qb=[null,[],[]],V,rb=[];La=f.InternalError=class extends Error{constructor(a){super(a);this.name="InternalError"}};for(var sb=Array(256),tb=0;256>tb;++tb)sb[tb]=String.fromCharCode(tb);Na=sb;
Q=f.BindingError=class extends Error{constructor(a){super(a);this.name="BindingError"}};R.push(0,1,void 0,1,null,1,!0,1,!1,1);f.count_emval_handles=()=>R.length/2-5-Qa.length;
db=f.UnboundTypeError=((a,b)=>{var c=Wa(b,function(d){this.name=b;this.message=d;d=Error(d).stack;void 0!==d&&(this.stack=this.toString()+"\n"+d.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(a.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:`${this.name}: ${this.message}`};return c})(Error,"UnboundTypeError");
var Cb={a:(a,b,c,d)=>{ta(`Assertion failed: ${a?L(A,a):""}, at: `+[b?b?L(A,b):"":"unknown filename",c,d?d?L(A,d):"":"unknown function"])},d:(a,b,c)=>{var d=new Ea(a);G[d.O+16>>2]=0;G[d.O+4>>2]=b;G[d.O+8>>2]=c;Fa=a;Ga++;throw Fa;},n:a=>{var b=Ha[a];delete Ha[a];var c=b.X,d=b.Y,e=b.P,g=e.map(k=>k.V).concat(e.map(k=>k.$));Ma([a],g,k=>{var l={};e.forEach((h,n)=>{var m=k[n],q=h.T,p=h.U,B=k[n+e.length],I=h.Z,ea=h.aa;l[h.S]={read:v=>m.fromWireType(q(p,v)),write:(v,x)=>{var E=[];I(ea,v,B.toWireType(E,x));
Ia(E)}}});return[{name:b.name,fromWireType:h=>{var n={},m;for(m in l)n[m]=l[m].read(h);d(h);return n},toWireType:(h,n)=>{for(var m in l)if(!(m in n))throw new TypeError(`Missing field: "${m}"`);var q=c();for(m in l)l[m].write(q,n[m]);null!==h&&h.push(d,q);return q},argPackAdvance:8,readValueFromPointer:Ja,L:d}]})},v:()=>{},r:(a,b,c,d)=>{b=P(b);O(a,{name:b,fromWireType:function(e){return!!e},toWireType:function(e,g){return g?c:d},argPackAdvance:8,readValueFromPointer:function(e){return this.fromWireType(A[e])},
L:null})},B:a=>O(a,Ua),o:(a,b,c)=>{b=P(b);O(a,{name:b,fromWireType:d=>d,toWireType:(d,e)=>e,argPackAdvance:8,readValueFromPointer:Va(b,c),L:null})},t:(a,b,c,d,e,g,k)=>{var l=ab(b,c);a=P(a);a=hb(a);e=T(d,e);$a(a,function(){gb(`Cannot call ${a} due to unbound types`,l)},b-1);Ma([],l,h=>{var n=a;var m=a;h=[h[0],null].concat(h.slice(1));var q=e,p=h.length;if(2>p)throw new Q("argTypes array size mismatch! Must at least get return value and 'this' types!");var B=null!==h[1]&&!1,I=Xa(h),ea="void"!==h[0].name;
q=[m,Oa,q,g,Ia,h[0],h[1]];for(var v=0;v<p-2;++v)q.push(h[v+2]);if(!I)for(v=B?1:2;v<h.length;++v)null!==h[v].L&&q.push(h[v].L);I=Xa(h);v=h.length;var x="",E="";for(p=0;p<v-2;++p)x+=(0!==p?", ":"")+"arg"+p,E+=(0!==p?", ":"")+"arg"+p+"Wired";x=`\n        return function (${x}) {\n        if (arguments.length !== ${v-2}) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${v-2}');\n        }`;I&&(x+="var destructors = [];\n");var Ra=I?"destructors":
"null",ra="humanName throwBindingError invoker fn runDestructors retType classParam".split(" ");B&&(x+="var thisWired = classParam['toWireType']("+Ra+", this);\n");for(p=0;p<v-2;++p)x+="var arg"+p+"Wired = argType"+p+"['toWireType']("+Ra+", arg"+p+");\n",ra.push("argType"+p);B&&(E="thisWired"+(0<E.length?", ":"")+E);x+=(ea||k?"var rv = ":"")+"invoker(fn"+(0<E.length?", ":"")+E+");\n";if(I)x+="runDestructors(destructors);\n";else for(p=B?1:2;p<h.length;++p)B=1===p?"thisWired":"arg"+(p-2)+"Wired",null!==
h[p].L&&(x+=`${B}_dtor(${B});\n`,ra.push(`${B}_dtor`));ea&&(x+="var ret = retType['fromWireType'](rv);\nreturn ret;\n");let [Sa,xb]=[ra,x+"}\n"];Sa.push(xb);h=Ya(Sa)(...q);m=Wa(m,h);h=b-1;if(!f.hasOwnProperty(n))throw new La("Replacing nonexistent public symbol");void 0!==f[n].N&&void 0!==h?f[n].N[h]=m:(f[n]=m,f[n].R=h);return[]})},c:(a,b,c,d,e)=>{b=P(b);-1===e&&(e=4294967295);e=l=>l;if(0===d){var g=32-8*c;e=l=>l<<g>>>g}var k=b.includes("unsigned")?function(l,h){return h>>>0}:function(l,h){return h};
O(a,{name:b,fromWireType:e,toWireType:k,argPackAdvance:8,readValueFromPointer:ib(b,c,0!==d),L:null})},b:(a,b,c)=>{function d(g){return new e(ja.buffer,G[g+4>>2],G[g>>2])}var e=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=P(c);O(a,{name:c,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{W:!0})},p:(a,b)=>{b=P(b);var c="std::string"===b;O(a,{name:b,fromWireType:function(d){var e=G[d>>2],g=d+4;if(c)for(var k=g,l=0;l<=e;++l){var h=g+l;if(l==
e||0==A[h]){k=k?L(A,k,h-k):"";if(void 0===n)var n=k;else n+=String.fromCharCode(0),n+=k;k=h+1}}else{n=Array(e);for(l=0;l<e;++l)n[l]=String.fromCharCode(A[g+l]);n=n.join("")}U(d);return n},toWireType:function(d,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var g,k="string"==typeof e;if(!(k||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array))throw new Q("Cannot pass non-string to std::string");var l;if(c&&k)for(g=l=0;g<e.length;++g){var h=e.charCodeAt(g);127>=h?l++:
2047>=h?l+=2:55296<=h&&57343>=h?(l+=4,++g):l+=3}else l=e.length;g=l;l=ub(4+g+1);h=l+4;G[l>>2]=g;if(c&&k){if(k=h,h=g+1,g=A,0<h){h=k+h-1;for(var n=0;n<e.length;++n){var m=e.charCodeAt(n);if(55296<=m&&57343>=m){var q=e.charCodeAt(++n);m=65536+((m&1023)<<10)|q&1023}if(127>=m){if(k>=h)break;g[k++]=m}else{if(2047>=m){if(k+1>=h)break;g[k++]=192|m>>6}else{if(65535>=m){if(k+2>=h)break;g[k++]=224|m>>12}else{if(k+3>=h)break;g[k++]=240|m>>18;g[k++]=128|m>>12&63}g[k++]=128|m>>6&63}g[k++]=128|m&63}}g[k]=0}}else if(k)for(k=
0;k<g;++k){n=e.charCodeAt(k);if(255<n)throw U(h),new Q("String has UTF-16 code units that do not fit in 8 bits");A[h+k]=n}else for(k=0;k<g;++k)A[h+k]=e[k];null!==d&&d.push(U,l);return l},argPackAdvance:8,readValueFromPointer:Ja,L(d){U(d)}})},j:(a,b,c)=>{c=P(c);if(2===b){var d=kb;var e=lb;var g=mb;var k=l=>D[l>>1]}else 4===b&&(d=nb,e=ob,g=pb,k=l=>G[l>>2]);O(a,{name:c,fromWireType:l=>{for(var h=G[l>>2],n,m=l+4,q=0;q<=h;++q){var p=l+4+q*b;if(q==h||0==k(p))m=d(m,p-m),void 0===n?n=m:(n+=String.fromCharCode(0),
n+=m),m=p+b}U(l);return n},toWireType:(l,h)=>{if("string"!=typeof h)throw new Q(`Cannot pass non-string to C++ string type ${c}`);var n=g(h),m=ub(4+n+b);G[m>>2]=n/b;e(h,m+4,n+b);null!==l&&l.push(U,m);return m},argPackAdvance:8,readValueFromPointer:Ja,L(l){U(l)}})},q:(a,b,c,d,e,g)=>{Ha[a]={name:P(b),X:T(c,d),Y:T(e,g),P:[]}},k:(a,b,c,d,e,g,k,l,h,n)=>{Ha[a].P.push({S:P(b),V:c,T:T(d,e),U:g,$:k,Z:T(l,h),aa:n})},s:(a,b)=>{b=P(b);O(a,{ba:!0,name:b,argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})},
x:()=>{throw Infinity;},g:()=>{ta("")},y:a=>{var b=A.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=(e.min.call(e,2147483648,d+(65536-d%65536)%65536)-z.buffer.byteLength+65535)/65536;try{z.grow(e);ma();var g=1;break a}catch(k){}g=void 0}if(g)return!0}return!1},e:a=>{Ca||(f.onExit?.(a),ia=!0);ca(a,new Aa(a))},A:()=>52,u:function(){return 70},z:(a,b,c,d)=>{for(var e=0,g=0;g<c;g++){var k=G[b>>2],l=G[b+4>>2];b+=
8;for(var h=0;h<l;h++){var n=A[k+h],m=qb[a];0===n||10===n?((1===a?ha:w)(L(m,0)),m.length=0):m.push(n)}e+=l}G[d>>2]=e;return 0},w:vb,i:wb,m:yb,h:zb,l:Ab,f:Bb},W=function(){function a(c){W=c.exports;z=W.C;ma();S=W.H;oa.unshift(W.D);H--;f.monitorRunDependencies?.(H);0==H&&(null!==sa&&(clearInterval(sa),sa=null),J&&(c=J,J=null,c()));return W}var b={a:Cb};H++;f.monitorRunDependencies?.(H);if(f.instantiateWasm)try{return f.instantiateWasm(b,a)}catch(c){w(`Module.instantiateWasm callback failed with error: ${c}`),
r(c)}za(b,function(c){a(c.instance)}).catch(r);return{}}(),U=f._free=a=>(U=f._free=W.E)(a),ub=f._malloc=a=>(ub=f._malloc=W.F)(a),eb=a=>(eb=W.G)(a),X=(a,b)=>(X=W.I)(a,b),Y=()=>(Y=W.J)(),Z=a=>(Z=W.K)(a);f.dynCall_jiji=(a,b,c,d,e)=>(f.dynCall_jiji=W.M)(a,b,c,d,e);function yb(a,b,c){var d=Y();try{return S.get(a)(b,c)}catch(e){Z(d);if(e!==e+0)throw e;X(1,0)}}function zb(a,b,c){var d=Y();try{S.get(a)(b,c)}catch(e){Z(d);if(e!==e+0)throw e;X(1,0)}}
function vb(a){var b=Y();try{return S.get(a)()}catch(c){Z(b);if(c!==c+0)throw c;X(1,0)}}function Ab(a,b,c,d){var e=Y();try{S.get(a)(b,c,d)}catch(g){Z(e);if(g!==g+0)throw g;X(1,0)}}function wb(a,b){var c=Y();try{return S.get(a)(b)}catch(d){Z(c);if(d!==d+0)throw d;X(1,0)}}function Bb(a,b,c,d,e){var g=Y();try{S.get(a)(b,c,d,e)}catch(k){Z(g);if(k!==k+0)throw k;X(1,0)}}
f.addFunction=(a,b)=>{if(!V){V=new WeakMap;var c=S.length;if(V)for(var d=0;d<0+c;d++){var e=S.get(d);e&&V.set(e,d)}}if(c=V.get(a)||0)return c;if(rb.length)c=rb.pop();else{try{S.grow(1)}catch(l){if(!(l instanceof RangeError))throw l;throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";}c=S.length-1}try{S.set(c,a)}catch(l){if(!(l instanceof TypeError))throw l;if("function"==typeof WebAssembly.Function){d=WebAssembly.Function;e={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"};for(var g={parameters:[],
results:"v"==b[0]?[]:[e[b[0]]]},k=1;k<b.length;++k)g.parameters.push(e[b[k]]);b=new d(g,a)}else{d=[1];e=b.slice(0,1);b=b.slice(1);g={i:127,p:127,j:126,f:125,d:124,e:111};d.push(96);k=b.length;128>k?d.push(k):d.push(k%128|128,k>>7);for(k=0;k<b.length;++k)d.push(g[b[k]]);"v"==e?d.push(0):d.push(1,g[e]);b=[0,97,115,109,1,0,0,0,1];e=d.length;128>e?b.push(e):b.push(e%128|128,e>>7);b.push(...d);b.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0);b=new WebAssembly.Module(new Uint8Array(b));b=(new WebAssembly.Instance(b,
{e:{f:a}})).exports.f}S.set(c,b)}V.set(a,c);return c};f.removeFunction=a=>{V.delete(S.get(a));S.set(a,null);rb.push(a)};var Db;J=function Eb(){Db||Fb();Db||(J=Eb)};
function Fb(){function a(){if(!Db&&(Db=!0,f.calledRun=!0,!ia)){Ba(oa);aa(f);if(f.onRuntimeInitialized)f.onRuntimeInitialized();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=[f.postRun]);f.postRun.length;){var b=f.postRun.shift();pa.unshift(b)}Ba(pa)}}if(!(0<H)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)qa();Ba(na);0<H||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1);a()},1)):a())}}
if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();Fb();


  return moduleArg.ready
}
);
})();
export default APNGOptimizerModule;