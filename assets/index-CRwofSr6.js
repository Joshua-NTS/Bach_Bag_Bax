(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))c(f);new MutationObserver(f=>{for(const p of f)if(p.type==="childList")for(const v of p.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&c(v)}).observe(document,{childList:!0,subtree:!0});function s(f){const p={};return f.integrity&&(p.integrity=f.integrity),f.referrerPolicy&&(p.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?p.credentials="include":f.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(f){if(f.ep)return;f.ep=!0;const p=s(f);fetch(f.href,p)}})();var Ms={exports:{}},mo={},js={exports:{}},we={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dc;function Cd(){if(Dc)return we;Dc=1;var l=Symbol.for("react.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),p=Symbol.for("react.provider"),v=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),N=Symbol.iterator;function x(S){return S===null||typeof S!="object"?null:(S=N&&S[N]||S["@@iterator"],typeof S=="function"?S:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},z=Object.assign,P={};function D(S,R,H){this.props=S,this.context=R,this.refs=P,this.updater=H||_}D.prototype.isReactComponent={},D.prototype.setState=function(S,R){if(typeof S!="object"&&typeof S!="function"&&S!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,S,R,"setState")},D.prototype.forceUpdate=function(S){this.updater.enqueueForceUpdate(this,S,"forceUpdate")};function A(){}A.prototype=D.prototype;function ee(S,R,H){this.props=S,this.context=R,this.refs=P,this.updater=H||_}var G=ee.prototype=new A;G.constructor=ee,z(G,D.prototype),G.isPureReactComponent=!0;var ne=Array.isArray,he=Object.prototype.hasOwnProperty,L={current:null},q={key:!0,ref:!0,__self:!0,__source:!0};function re(S,R,H){var le,ue={},me=null,ve=null;if(R!=null)for(le in R.ref!==void 0&&(ve=R.ref),R.key!==void 0&&(me=""+R.key),R)he.call(R,le)&&!q.hasOwnProperty(le)&&(ue[le]=R[le]);var B=arguments.length-2;if(B===1)ue.children=H;else if(1<B){for(var ge=Array(B),je=0;je<B;je++)ge[je]=arguments[je+2];ue.children=ge}if(S&&S.defaultProps)for(le in B=S.defaultProps,B)ue[le]===void 0&&(ue[le]=B[le]);return{$$typeof:l,type:S,key:me,ref:ve,props:ue,_owner:L.current}}function K(S,R){return{$$typeof:l,type:S.type,key:R,ref:S.ref,props:S.props,_owner:S._owner}}function ie(S){return typeof S=="object"&&S!==null&&S.$$typeof===l}function ae(S){var R={"=":"=0",":":"=2"};return"$"+S.replace(/[=:]/g,function(H){return R[H]})}var ye=/\/+/g;function ke(S,R){return typeof S=="object"&&S!==null&&S.key!=null?ae(""+S.key):R.toString(36)}function Se(S,R,H,le,ue){var me=typeof S;(me==="undefined"||me==="boolean")&&(S=null);var ve=!1;if(S===null)ve=!0;else switch(me){case"string":case"number":ve=!0;break;case"object":switch(S.$$typeof){case l:case a:ve=!0}}if(ve)return ve=S,ue=ue(ve),S=le===""?"."+ke(ve,0):le,ne(ue)?(H="",S!=null&&(H=S.replace(ye,"$&/")+"/"),Se(ue,R,H,"",function(je){return je})):ue!=null&&(ie(ue)&&(ue=K(ue,H+(!ue.key||ve&&ve.key===ue.key?"":(""+ue.key).replace(ye,"$&/")+"/")+S)),R.push(ue)),1;if(ve=0,le=le===""?".":le+":",ne(S))for(var B=0;B<S.length;B++){me=S[B];var ge=le+ke(me,B);ve+=Se(me,R,H,ge,ue)}else if(ge=x(S),typeof ge=="function")for(S=ge.call(S),B=0;!(me=S.next()).done;)me=me.value,ge=le+ke(me,B++),ve+=Se(me,R,H,ge,ue);else if(me==="object")throw R=String(S),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(S).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.");return ve}function xe(S,R,H){if(S==null)return S;var le=[],ue=0;return Se(S,le,"","",function(me){return R.call(H,me,ue++)}),le}function w(S){if(S._status===-1){var R=S._result;R=R(),R.then(function(H){(S._status===0||S._status===-1)&&(S._status=1,S._result=H)},function(H){(S._status===0||S._status===-1)&&(S._status=2,S._result=H)}),S._status===-1&&(S._status=0,S._result=R)}if(S._status===1)return S._result.default;throw S._result}var Y={current:null},b={transition:null},W={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:b,ReactCurrentOwner:L};function V(){throw Error("act(...) is not supported in production builds of React.")}return we.Children={map:xe,forEach:function(S,R,H){xe(S,function(){R.apply(this,arguments)},H)},count:function(S){var R=0;return xe(S,function(){R++}),R},toArray:function(S){return xe(S,function(R){return R})||[]},only:function(S){if(!ie(S))throw Error("React.Children.only expected to receive a single React element child.");return S}},we.Component=D,we.Fragment=s,we.Profiler=f,we.PureComponent=ee,we.StrictMode=c,we.Suspense=d,we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W,we.act=V,we.cloneElement=function(S,R,H){if(S==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+S+".");var le=z({},S.props),ue=S.key,me=S.ref,ve=S._owner;if(R!=null){if(R.ref!==void 0&&(me=R.ref,ve=L.current),R.key!==void 0&&(ue=""+R.key),S.type&&S.type.defaultProps)var B=S.type.defaultProps;for(ge in R)he.call(R,ge)&&!q.hasOwnProperty(ge)&&(le[ge]=R[ge]===void 0&&B!==void 0?B[ge]:R[ge])}var ge=arguments.length-2;if(ge===1)le.children=H;else if(1<ge){B=Array(ge);for(var je=0;je<ge;je++)B[je]=arguments[je+2];le.children=B}return{$$typeof:l,type:S.type,key:ue,ref:me,props:le,_owner:ve}},we.createContext=function(S){return S={$$typeof:v,_currentValue:S,_currentValue2:S,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},S.Provider={$$typeof:p,_context:S},S.Consumer=S},we.createElement=re,we.createFactory=function(S){var R=re.bind(null,S);return R.type=S,R},we.createRef=function(){return{current:null}},we.forwardRef=function(S){return{$$typeof:y,render:S}},we.isValidElement=ie,we.lazy=function(S){return{$$typeof:j,_payload:{_status:-1,_result:S},_init:w}},we.memo=function(S,R){return{$$typeof:C,type:S,compare:R===void 0?null:R}},we.startTransition=function(S){var R=b.transition;b.transition={};try{S()}finally{b.transition=R}},we.unstable_act=V,we.useCallback=function(S,R){return Y.current.useCallback(S,R)},we.useContext=function(S){return Y.current.useContext(S)},we.useDebugValue=function(){},we.useDeferredValue=function(S){return Y.current.useDeferredValue(S)},we.useEffect=function(S,R){return Y.current.useEffect(S,R)},we.useId=function(){return Y.current.useId()},we.useImperativeHandle=function(S,R,H){return Y.current.useImperativeHandle(S,R,H)},we.useInsertionEffect=function(S,R){return Y.current.useInsertionEffect(S,R)},we.useLayoutEffect=function(S,R){return Y.current.useLayoutEffect(S,R)},we.useMemo=function(S,R){return Y.current.useMemo(S,R)},we.useReducer=function(S,R,H){return Y.current.useReducer(S,R,H)},we.useRef=function(S){return Y.current.useRef(S)},we.useState=function(S){return Y.current.useState(S)},we.useSyncExternalStore=function(S,R,H){return Y.current.useSyncExternalStore(S,R,H)},we.useTransition=function(){return Y.current.useTransition()},we.version="18.3.1",we}var Fc;function Zs(){return Fc||(Fc=1,js.exports=Cd()),js.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ic;function Ed(){if(Ic)return mo;Ic=1;var l=Zs(),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,f=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function v(y,d,C){var j,N={},x=null,_=null;C!==void 0&&(x=""+C),d.key!==void 0&&(x=""+d.key),d.ref!==void 0&&(_=d.ref);for(j in d)c.call(d,j)&&!p.hasOwnProperty(j)&&(N[j]=d[j]);if(y&&y.defaultProps)for(j in d=y.defaultProps,d)N[j]===void 0&&(N[j]=d[j]);return{$$typeof:a,type:y,key:x,ref:_,props:N,_owner:f.current}}return mo.Fragment=s,mo.jsx=v,mo.jsxs=v,mo}var Oc;function Nd(){return Oc||(Oc=1,Ms.exports=Ed()),Ms.exports}var m=Nd(),Q=Zs(),zi={},Ts={exports:{}},ft={},_s={exports:{}},Ps={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ac;function Md(){return Ac||(Ac=1,(function(l){function a(b,W){var V=b.length;b.push(W);e:for(;0<V;){var S=V-1>>>1,R=b[S];if(0<f(R,W))b[S]=W,b[V]=R,V=S;else break e}}function s(b){return b.length===0?null:b[0]}function c(b){if(b.length===0)return null;var W=b[0],V=b.pop();if(V!==W){b[0]=V;e:for(var S=0,R=b.length,H=R>>>1;S<H;){var le=2*(S+1)-1,ue=b[le],me=le+1,ve=b[me];if(0>f(ue,V))me<R&&0>f(ve,ue)?(b[S]=ve,b[me]=V,S=me):(b[S]=ue,b[le]=V,S=le);else if(me<R&&0>f(ve,V))b[S]=ve,b[me]=V,S=me;else break e}}return W}function f(b,W){var V=b.sortIndex-W.sortIndex;return V!==0?V:b.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var p=performance;l.unstable_now=function(){return p.now()}}else{var v=Date,y=v.now();l.unstable_now=function(){return v.now()-y}}var d=[],C=[],j=1,N=null,x=3,_=!1,z=!1,P=!1,D=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,ee=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(b){for(var W=s(C);W!==null;){if(W.callback===null)c(C);else if(W.startTime<=b)c(C),W.sortIndex=W.expirationTime,a(d,W);else break;W=s(C)}}function ne(b){if(P=!1,G(b),!z)if(s(d)!==null)z=!0,w(he);else{var W=s(C);W!==null&&Y(ne,W.startTime-b)}}function he(b,W){z=!1,P&&(P=!1,A(re),re=-1),_=!0;var V=x;try{for(G(W),N=s(d);N!==null&&(!(N.expirationTime>W)||b&&!ae());){var S=N.callback;if(typeof S=="function"){N.callback=null,x=N.priorityLevel;var R=S(N.expirationTime<=W);W=l.unstable_now(),typeof R=="function"?N.callback=R:N===s(d)&&c(d),G(W)}else c(d);N=s(d)}if(N!==null)var H=!0;else{var le=s(C);le!==null&&Y(ne,le.startTime-W),H=!1}return H}finally{N=null,x=V,_=!1}}var L=!1,q=null,re=-1,K=5,ie=-1;function ae(){return!(l.unstable_now()-ie<K)}function ye(){if(q!==null){var b=l.unstable_now();ie=b;var W=!0;try{W=q(!0,b)}finally{W?ke():(L=!1,q=null)}}else L=!1}var ke;if(typeof ee=="function")ke=function(){ee(ye)};else if(typeof MessageChannel<"u"){var Se=new MessageChannel,xe=Se.port2;Se.port1.onmessage=ye,ke=function(){xe.postMessage(null)}}else ke=function(){D(ye,0)};function w(b){q=b,L||(L=!0,ke())}function Y(b,W){re=D(function(){b(l.unstable_now())},W)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(b){b.callback=null},l.unstable_continueExecution=function(){z||_||(z=!0,w(he))},l.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<b?Math.floor(1e3/b):5},l.unstable_getCurrentPriorityLevel=function(){return x},l.unstable_getFirstCallbackNode=function(){return s(d)},l.unstable_next=function(b){switch(x){case 1:case 2:case 3:var W=3;break;default:W=x}var V=x;x=W;try{return b()}finally{x=V}},l.unstable_pauseExecution=function(){},l.unstable_requestPaint=function(){},l.unstable_runWithPriority=function(b,W){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var V=x;x=b;try{return W()}finally{x=V}},l.unstable_scheduleCallback=function(b,W,V){var S=l.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?S+V:S):V=S,b){case 1:var R=-1;break;case 2:R=250;break;case 5:R=1073741823;break;case 4:R=1e4;break;default:R=5e3}return R=V+R,b={id:j++,callback:W,priorityLevel:b,startTime:V,expirationTime:R,sortIndex:-1},V>S?(b.sortIndex=V,a(C,b),s(d)===null&&b===s(C)&&(P?(A(re),re=-1):P=!0,Y(ne,V-S))):(b.sortIndex=R,a(d,b),z||_||(z=!0,w(he))),b},l.unstable_shouldYield=ae,l.unstable_wrapCallback=function(b){var W=x;return function(){var V=x;x=W;try{return b.apply(this,arguments)}finally{x=V}}}})(Ps)),Ps}var $c;function jd(){return $c||($c=1,_s.exports=Md()),_s.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bc;function Td(){if(bc)return ft;bc=1;var l=Zs(),a=jd();function s(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,f={};function p(e,t){v(e,t),v(e+"Capture",t)}function v(e,t){for(f[e]=t,e=0;e<t.length;e++)c.add(t[e])}var y=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),d=Object.prototype.hasOwnProperty,C=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,j={},N={};function x(e){return d.call(N,e)?!0:d.call(j,e)?!1:C.test(e)?N[e]=!0:(j[e]=!0,!1)}function _(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function z(e,t,n,r){if(t===null||typeof t>"u"||_(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function P(e,t,n,r,o,i,u){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=u}var D={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){D[e]=new P(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];D[t]=new P(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){D[e]=new P(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){D[e]=new P(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){D[e]=new P(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){D[e]=new P(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){D[e]=new P(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){D[e]=new P(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){D[e]=new P(e,5,!1,e.toLowerCase(),null,!1,!1)});var A=/[\-:]([a-z])/g;function ee(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(A,ee);D[t]=new P(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(A,ee);D[t]=new P(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(A,ee);D[t]=new P(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){D[e]=new P(e,1,!1,e.toLowerCase(),null,!1,!1)}),D.xlinkHref=new P("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){D[e]=new P(e,1,!1,e.toLowerCase(),null,!0,!0)});function G(e,t,n,r){var o=D.hasOwnProperty(t)?D[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(z(t,n,o,r)&&(n=null),r||o===null?x(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ne=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,he=Symbol.for("react.element"),L=Symbol.for("react.portal"),q=Symbol.for("react.fragment"),re=Symbol.for("react.strict_mode"),K=Symbol.for("react.profiler"),ie=Symbol.for("react.provider"),ae=Symbol.for("react.context"),ye=Symbol.for("react.forward_ref"),ke=Symbol.for("react.suspense"),Se=Symbol.for("react.suspense_list"),xe=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),Y=Symbol.for("react.offscreen"),b=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=b&&e[b]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,S;function R(e){if(S===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);S=t&&t[1]||""}return`
`+S+e}var H=!1;function le(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(T){var r=T}Reflect.construct(e,[],t)}else{try{t.call()}catch(T){r=T}e.call(t.prototype)}else{try{throw Error()}catch(T){r=T}e()}}catch(T){if(T&&r&&typeof T.stack=="string"){for(var o=T.stack.split(`
`),i=r.stack.split(`
`),u=o.length-1,h=i.length-1;1<=u&&0<=h&&o[u]!==i[h];)h--;for(;1<=u&&0<=h;u--,h--)if(o[u]!==i[h]){if(u!==1||h!==1)do if(u--,h--,0>h||o[u]!==i[h]){var g=`
`+o[u].replace(" at new "," at ");return e.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",e.displayName)),g}while(1<=u&&0<=h);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?R(e):""}function ue(e){switch(e.tag){case 5:return R(e.type);case 16:return R("Lazy");case 13:return R("Suspense");case 19:return R("SuspenseList");case 0:case 2:case 15:return e=le(e.type,!1),e;case 11:return e=le(e.type.render,!1),e;case 1:return e=le(e.type,!0),e;default:return""}}function me(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case q:return"Fragment";case L:return"Portal";case K:return"Profiler";case re:return"StrictMode";case ke:return"Suspense";case Se:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ae:return(e.displayName||"Context")+".Consumer";case ie:return(e._context.displayName||"Context")+".Provider";case ye:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case xe:return t=e.displayName||null,t!==null?t:me(e.type)||"Memo";case w:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}function ve(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return me(t);case 8:return t===re?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function B(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ge(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function je(e){var t=ge(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(u){r=""+u,i.call(this,u)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(u){r=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function dt(e){e._valueTracker||(e._valueTracker=je(e))}function De(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ge(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function kt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Yt(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function zn(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=B(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function tt(e,t){t=t.checked,t!=null&&G(e,"checked",t,!1)}function Lt(e,t){tt(e,t);var n=B(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Rn(e,t.type,n):t.hasOwnProperty("defaultValue")&&Rn(e,t.type,B(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Bt(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Rn(e,t,n){(t!=="number"||kt(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var $e=Array.isArray;function an(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+B(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Er(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(s(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function it(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(s(92));if($e(n)){if(1<n.length)throw Error(s(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:B(n)}}function Nr(e,t){var n=B(t.value),r=B(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Mr(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function zt(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dn(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?zt(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ut,ko=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ut=Ut||document.createElement("div"),Ut.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ut.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Fn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var un={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},So=["Webkit","ms","Moz","O"];Object.keys(un).forEach(function(e){So.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),un[t]=un[e]})});function Zn(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||un.hasOwnProperty(e)&&un[e]?(""+t).trim():t+"px"}function In(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Zn(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Co=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function jr(e,t){if(t){if(Co[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(s(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(s(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(s(61))}if(t.style!=null&&typeof t.style!="object")throw Error(s(62))}}function Tr(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _r=null;function Pr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var O=null,se=null,pe=null;function be(e){if(e=Zr(e)){if(typeof O!="function")throw Error(s(280));var t=e.stateNode;t&&(t=Go(t),O(e.stateNode,e.type,t))}}function nt(e){se?pe?pe.push(e):pe=[e]:se=e}function Jn(){if(se){var e=se,t=pe;if(pe=se=null,be(e),t)for(e=0;e<t.length;e++)be(t[e])}}function Eo(e,t){return e(t)}function ta(){}var qi=!1;function na(e,t,n){if(qi)return e(t,n);qi=!0;try{return Eo(e,t,n)}finally{qi=!1,(se!==null||pe!==null)&&(ta(),Jn())}}function Lr(e,t){var n=e.stateNode;if(n===null)return null;var r=Go(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var Vi=!1;if(y)try{var zr={};Object.defineProperty(zr,"passive",{get:function(){Vi=!0}}),window.addEventListener("test",zr,zr),window.removeEventListener("test",zr,zr)}catch{Vi=!1}function _f(e,t,n,r,o,i,u,h,g){var T=Array.prototype.slice.call(arguments,3);try{t.apply(n,T)}catch(I){this.onError(I)}}var Rr=!1,No=null,Mo=!1,Hi=null,Pf={onError:function(e){Rr=!0,No=e}};function Lf(e,t,n,r,o,i,u,h,g){Rr=!1,No=null,_f.apply(Pf,arguments)}function zf(e,t,n,r,o,i,u,h,g){if(Lf.apply(this,arguments),Rr){if(Rr){var T=No;Rr=!1,No=null}else throw Error(s(198));Mo||(Mo=!0,Hi=T)}}function On(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ra(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function oa(e){if(On(e)!==e)throw Error(s(188))}function Rf(e){var t=e.alternate;if(!t){if(t=On(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return oa(o),e;if(i===r)return oa(o),t;i=i.sibling}throw Error(s(188))}if(n.return!==r.return)n=o,r=i;else{for(var u=!1,h=o.child;h;){if(h===n){u=!0,n=o,r=i;break}if(h===r){u=!0,r=o,n=i;break}h=h.sibling}if(!u){for(h=i.child;h;){if(h===n){u=!0,n=i,r=o;break}if(h===r){u=!0,r=i,n=o;break}h=h.sibling}if(!u)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function ia(e){return e=Rf(e),e!==null?la(e):null}function la(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=la(e);if(t!==null)return t;e=e.sibling}return null}var sa=a.unstable_scheduleCallback,aa=a.unstable_cancelCallback,Df=a.unstable_shouldYield,Ff=a.unstable_requestPaint,Ie=a.unstable_now,If=a.unstable_getCurrentPriorityLevel,Wi=a.unstable_ImmediatePriority,ua=a.unstable_UserBlockingPriority,jo=a.unstable_NormalPriority,Of=a.unstable_LowPriority,ca=a.unstable_IdlePriority,To=null,qt=null;function Af(e){if(qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(To,e,void 0,(e.current.flags&128)===128)}catch{}}var Rt=Math.clz32?Math.clz32:Bf,$f=Math.log,bf=Math.LN2;function Bf(e){return e>>>=0,e===0?32:31-($f(e)/bf|0)|0}var _o=64,Po=4194304;function Dr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Lo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,u=n&268435455;if(u!==0){var h=u&~o;h!==0?r=Dr(h):(i&=u,i!==0&&(r=Dr(i)))}else u=n&~o,u!==0?r=Dr(u):i!==0&&(r=Dr(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Rt(t),o=1<<n,r|=e[n],t&=~o;return r}function Uf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var u=31-Rt(i),h=1<<u,g=o[u];g===-1?((h&n)===0||(h&r)!==0)&&(o[u]=Uf(h,t)):g<=t&&(e.expiredLanes|=h),i&=~h}}function Gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function fa(){var e=_o;return _o<<=1,(_o&4194240)===0&&(_o=64),e}function Qi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Rt(t),e[t]=n}function Vf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Rt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function Ki(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Rt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Ne=0;function pa(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var da,Xi,ma,ha,va,Yi=!1,zo=[],cn=null,fn=null,pn=null,Ir=new Map,Or=new Map,dn=[],Hf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ya(e,t){switch(e){case"focusin":case"focusout":cn=null;break;case"dragenter":case"dragleave":fn=null;break;case"mouseover":case"mouseout":pn=null;break;case"pointerover":case"pointerout":Ir.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Or.delete(t.pointerId)}}function Ar(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=Zr(t),t!==null&&Xi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Wf(e,t,n,r,o){switch(t){case"focusin":return cn=Ar(cn,e,t,n,r,o),!0;case"dragenter":return fn=Ar(fn,e,t,n,r,o),!0;case"mouseover":return pn=Ar(pn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Ir.set(i,Ar(Ir.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Or.set(i,Ar(Or.get(i)||null,e,t,n,r,o)),!0}return!1}function ga(e){var t=An(e.target);if(t!==null){var n=On(t);if(n!==null){if(t=n.tag,t===13){if(t=ra(n),t!==null){e.blockedOn=t,va(e.priority,function(){ma(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ro(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ji(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);_r=r,n.target.dispatchEvent(r),_r=null}else return t=Zr(n),t!==null&&Xi(t),e.blockedOn=n,!1;t.shift()}return!0}function wa(e,t,n){Ro(e)&&n.delete(t)}function Gf(){Yi=!1,cn!==null&&Ro(cn)&&(cn=null),fn!==null&&Ro(fn)&&(fn=null),pn!==null&&Ro(pn)&&(pn=null),Ir.forEach(wa),Or.forEach(wa)}function $r(e,t){e.blockedOn===t&&(e.blockedOn=null,Yi||(Yi=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,Gf)))}function br(e){function t(o){return $r(o,e)}if(0<zo.length){$r(zo[0],e);for(var n=1;n<zo.length;n++){var r=zo[n];r.blockedOn===e&&(r.blockedOn=null)}}for(cn!==null&&$r(cn,e),fn!==null&&$r(fn,e),pn!==null&&$r(pn,e),Ir.forEach(t),Or.forEach(t),n=0;n<dn.length;n++)r=dn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<dn.length&&(n=dn[0],n.blockedOn===null);)ga(n),n.blockedOn===null&&dn.shift()}var er=ne.ReactCurrentBatchConfig,Do=!0;function Qf(e,t,n,r){var o=Ne,i=er.transition;er.transition=null;try{Ne=1,Zi(e,t,n,r)}finally{Ne=o,er.transition=i}}function Kf(e,t,n,r){var o=Ne,i=er.transition;er.transition=null;try{Ne=4,Zi(e,t,n,r)}finally{Ne=o,er.transition=i}}function Zi(e,t,n,r){if(Do){var o=Ji(e,t,n,r);if(o===null)vl(e,t,r,Fo,n),ya(e,r);else if(Wf(o,e,t,n,r))r.stopPropagation();else if(ya(e,r),t&4&&-1<Hf.indexOf(e)){for(;o!==null;){var i=Zr(o);if(i!==null&&da(i),i=Ji(e,t,n,r),i===null&&vl(e,t,r,Fo,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else vl(e,t,r,null,n)}}var Fo=null;function Ji(e,t,n,r){if(Fo=null,e=Pr(r),e=An(e),e!==null)if(t=On(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ra(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fo=e,null}function xa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(If()){case Wi:return 1;case ua:return 4;case jo:case Of:return 16;case ca:return 536870912;default:return 16}default:return 16}}var mn=null,el=null,Io=null;function ka(){if(Io)return Io;var e,t=el,n=t.length,r,o="value"in mn?mn.value:mn.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var u=n-e;for(r=1;r<=u&&t[n-r]===o[i-r];r++);return Io=o.slice(e,1<r?1-r:void 0)}function Oo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ao(){return!0}function Sa(){return!1}function mt(e){function t(n,r,o,i,u){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(n=e[h],this[h]=n?n(i):i[h]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ao:Sa,this.isPropagationStopped=Sa,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ao)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ao)},persist:function(){},isPersistent:Ao}),t}var tr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},tl=mt(tr),Br=V({},tr,{view:0,detail:0}),Xf=mt(Br),nl,rl,Ur,$o=V({},Br,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:il,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ur&&(Ur&&e.type==="mousemove"?(nl=e.screenX-Ur.screenX,rl=e.screenY-Ur.screenY):rl=nl=0,Ur=e),nl)},movementY:function(e){return"movementY"in e?e.movementY:rl}}),Ca=mt($o),Yf=V({},$o,{dataTransfer:0}),Zf=mt(Yf),Jf=V({},Br,{relatedTarget:0}),ol=mt(Jf),ep=V({},tr,{animationName:0,elapsedTime:0,pseudoElement:0}),tp=mt(ep),np=V({},tr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),rp=mt(np),op=V({},tr,{data:0}),Ea=mt(op),ip={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ap(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=sp[e])?!!t[e]:!1}function il(){return ap}var up=V({},Br,{key:function(e){if(e.key){var t=ip[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Oo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:il,charCode:function(e){return e.type==="keypress"?Oo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Oo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cp=mt(up),fp=V({},$o,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Na=mt(fp),pp=V({},Br,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:il}),dp=mt(pp),mp=V({},tr,{propertyName:0,elapsedTime:0,pseudoElement:0}),hp=mt(mp),vp=V({},$o,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),yp=mt(vp),gp=[9,13,27,32],ll=y&&"CompositionEvent"in window,qr=null;y&&"documentMode"in document&&(qr=document.documentMode);var wp=y&&"TextEvent"in window&&!qr,Ma=y&&(!ll||qr&&8<qr&&11>=qr),ja=" ",Ta=!1;function _a(e,t){switch(e){case"keyup":return gp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pa(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var nr=!1;function xp(e,t){switch(e){case"compositionend":return Pa(t);case"keypress":return t.which!==32?null:(Ta=!0,ja);case"textInput":return e=t.data,e===ja&&Ta?null:e;default:return null}}function kp(e,t){if(nr)return e==="compositionend"||!ll&&_a(e,t)?(e=ka(),Io=el=mn=null,nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ma&&t.locale!=="ko"?null:t.data;default:return null}}var Sp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function La(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Sp[e.type]:t==="textarea"}function za(e,t,n,r){nt(r),t=Vo(t,"onChange"),0<t.length&&(n=new tl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vr=null,Hr=null;function Cp(e){Xa(e,0)}function bo(e){var t=sr(e);if(De(t))return e}function Ep(e,t){if(e==="change")return t}var Ra=!1;if(y){var sl;if(y){var al="oninput"in document;if(!al){var Da=document.createElement("div");Da.setAttribute("oninput","return;"),al=typeof Da.oninput=="function"}sl=al}else sl=!1;Ra=sl&&(!document.documentMode||9<document.documentMode)}function Fa(){Vr&&(Vr.detachEvent("onpropertychange",Ia),Hr=Vr=null)}function Ia(e){if(e.propertyName==="value"&&bo(Hr)){var t=[];za(t,Hr,e,Pr(e)),na(Cp,t)}}function Np(e,t,n){e==="focusin"?(Fa(),Vr=t,Hr=n,Vr.attachEvent("onpropertychange",Ia)):e==="focusout"&&Fa()}function Mp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return bo(Hr)}function jp(e,t){if(e==="click")return bo(t)}function Tp(e,t){if(e==="input"||e==="change")return bo(t)}function _p(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Dt=typeof Object.is=="function"?Object.is:_p;function Wr(e,t){if(Dt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!d.call(t,o)||!Dt(e[o],t[o]))return!1}return!0}function Oa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Aa(e,t){var n=Oa(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Oa(n)}}function $a(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$a(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ba(){for(var e=window,t=kt();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=kt(e.document)}return t}function ul(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Pp(e){var t=ba(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&$a(n.ownerDocument.documentElement,n)){if(r!==null&&ul(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=Aa(n,i);var u=Aa(n,r);o&&u&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==u.node||e.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Lp=y&&"documentMode"in document&&11>=document.documentMode,rr=null,cl=null,Gr=null,fl=!1;function Ba(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fl||rr==null||rr!==kt(r)||(r=rr,"selectionStart"in r&&ul(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Gr&&Wr(Gr,r)||(Gr=r,r=Vo(cl,"onSelect"),0<r.length&&(t=new tl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=rr)))}function Bo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var or={animationend:Bo("Animation","AnimationEnd"),animationiteration:Bo("Animation","AnimationIteration"),animationstart:Bo("Animation","AnimationStart"),transitionend:Bo("Transition","TransitionEnd")},pl={},Ua={};y&&(Ua=document.createElement("div").style,"AnimationEvent"in window||(delete or.animationend.animation,delete or.animationiteration.animation,delete or.animationstart.animation),"TransitionEvent"in window||delete or.transitionend.transition);function Uo(e){if(pl[e])return pl[e];if(!or[e])return e;var t=or[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ua)return pl[e]=t[n];return e}var qa=Uo("animationend"),Va=Uo("animationiteration"),Ha=Uo("animationstart"),Wa=Uo("transitionend"),Ga=new Map,Qa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function hn(e,t){Ga.set(e,t),p(t,[e])}for(var dl=0;dl<Qa.length;dl++){var ml=Qa[dl],zp=ml.toLowerCase(),Rp=ml[0].toUpperCase()+ml.slice(1);hn(zp,"on"+Rp)}hn(qa,"onAnimationEnd"),hn(Va,"onAnimationIteration"),hn(Ha,"onAnimationStart"),hn("dblclick","onDoubleClick"),hn("focusin","onFocus"),hn("focusout","onBlur"),hn(Wa,"onTransitionEnd"),v("onMouseEnter",["mouseout","mouseover"]),v("onMouseLeave",["mouseout","mouseover"]),v("onPointerEnter",["pointerout","pointerover"]),v("onPointerLeave",["pointerout","pointerover"]),p("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),p("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),p("onBeforeInput",["compositionend","keypress","textInput","paste"]),p("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));function Ka(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,zf(r,t,void 0,e),e.currentTarget=null}function Xa(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var u=r.length-1;0<=u;u--){var h=r[u],g=h.instance,T=h.currentTarget;if(h=h.listener,g!==i&&o.isPropagationStopped())break e;Ka(o,h,T),i=g}else for(u=0;u<r.length;u++){if(h=r[u],g=h.instance,T=h.currentTarget,h=h.listener,g!==i&&o.isPropagationStopped())break e;Ka(o,h,T),i=g}}}if(Mo)throw e=Hi,Mo=!1,Hi=null,e}function Te(e,t){var n=t[Sl];n===void 0&&(n=t[Sl]=new Set);var r=e+"__bubble";n.has(r)||(Ya(t,e,2,!1),n.add(r))}function hl(e,t,n){var r=0;t&&(r|=4),Ya(n,e,r,t)}var qo="_reactListening"+Math.random().toString(36).slice(2);function Kr(e){if(!e[qo]){e[qo]=!0,c.forEach(function(n){n!=="selectionchange"&&(Dp.has(n)||hl(n,!1,e),hl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[qo]||(t[qo]=!0,hl("selectionchange",!1,t))}}function Ya(e,t,n,r){switch(xa(t)){case 1:var o=Qf;break;case 4:o=Kf;break;default:o=Zi}n=o.bind(null,t,n,e),o=void 0,!Vi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function vl(e,t,n,r,o){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var u=r.tag;if(u===3||u===4){var h=r.stateNode.containerInfo;if(h===o||h.nodeType===8&&h.parentNode===o)break;if(u===4)for(u=r.return;u!==null;){var g=u.tag;if((g===3||g===4)&&(g=u.stateNode.containerInfo,g===o||g.nodeType===8&&g.parentNode===o))return;u=u.return}for(;h!==null;){if(u=An(h),u===null)return;if(g=u.tag,g===5||g===6){r=i=u;continue e}h=h.parentNode}}r=r.return}na(function(){var T=i,I=Pr(n),$=[];e:{var F=Ga.get(e);if(F!==void 0){var X=tl,J=e;switch(e){case"keypress":if(Oo(n)===0)break e;case"keydown":case"keyup":X=cp;break;case"focusin":J="focus",X=ol;break;case"focusout":J="blur",X=ol;break;case"beforeblur":case"afterblur":X=ol;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":X=Ca;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":X=Zf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":X=dp;break;case qa:case Va:case Ha:X=tp;break;case Wa:X=hp;break;case"scroll":X=Xf;break;case"wheel":X=yp;break;case"copy":case"cut":case"paste":X=rp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":X=Na}var te=(t&4)!==0,Oe=!te&&e==="scroll",E=te?F!==null?F+"Capture":null:F;te=[];for(var k=T,M;k!==null;){M=k;var U=M.stateNode;if(M.tag===5&&U!==null&&(M=U,E!==null&&(U=Lr(k,E),U!=null&&te.push(Xr(k,U,M)))),Oe)break;k=k.return}0<te.length&&(F=new X(F,J,null,n,I),$.push({event:F,listeners:te}))}}if((t&7)===0){e:{if(F=e==="mouseover"||e==="pointerover",X=e==="mouseout"||e==="pointerout",F&&n!==_r&&(J=n.relatedTarget||n.fromElement)&&(An(J)||J[Zt]))break e;if((X||F)&&(F=I.window===I?I:(F=I.ownerDocument)?F.defaultView||F.parentWindow:window,X?(J=n.relatedTarget||n.toElement,X=T,J=J?An(J):null,J!==null&&(Oe=On(J),J!==Oe||J.tag!==5&&J.tag!==6)&&(J=null)):(X=null,J=T),X!==J)){if(te=Ca,U="onMouseLeave",E="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(te=Na,U="onPointerLeave",E="onPointerEnter",k="pointer"),Oe=X==null?F:sr(X),M=J==null?F:sr(J),F=new te(U,k+"leave",X,n,I),F.target=Oe,F.relatedTarget=M,U=null,An(I)===T&&(te=new te(E,k+"enter",J,n,I),te.target=M,te.relatedTarget=Oe,U=te),Oe=U,X&&J)t:{for(te=X,E=J,k=0,M=te;M;M=ir(M))k++;for(M=0,U=E;U;U=ir(U))M++;for(;0<k-M;)te=ir(te),k--;for(;0<M-k;)E=ir(E),M--;for(;k--;){if(te===E||E!==null&&te===E.alternate)break t;te=ir(te),E=ir(E)}te=null}else te=null;X!==null&&Za($,F,X,te,!1),J!==null&&Oe!==null&&Za($,Oe,J,te,!0)}}e:{if(F=T?sr(T):window,X=F.nodeName&&F.nodeName.toLowerCase(),X==="select"||X==="input"&&F.type==="file")var oe=Ep;else if(La(F))if(Ra)oe=Tp;else{oe=Mp;var ce=Np}else(X=F.nodeName)&&X.toLowerCase()==="input"&&(F.type==="checkbox"||F.type==="radio")&&(oe=jp);if(oe&&(oe=oe(e,T))){za($,oe,n,I);break e}ce&&ce(e,F,T),e==="focusout"&&(ce=F._wrapperState)&&ce.controlled&&F.type==="number"&&Rn(F,"number",F.value)}switch(ce=T?sr(T):window,e){case"focusin":(La(ce)||ce.contentEditable==="true")&&(rr=ce,cl=T,Gr=null);break;case"focusout":Gr=cl=rr=null;break;case"mousedown":fl=!0;break;case"contextmenu":case"mouseup":case"dragend":fl=!1,Ba($,n,I);break;case"selectionchange":if(Lp)break;case"keydown":case"keyup":Ba($,n,I)}var fe;if(ll)e:{switch(e){case"compositionstart":var de="onCompositionStart";break e;case"compositionend":de="onCompositionEnd";break e;case"compositionupdate":de="onCompositionUpdate";break e}de=void 0}else nr?_a(e,n)&&(de="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(de="onCompositionStart");de&&(Ma&&n.locale!=="ko"&&(nr||de!=="onCompositionStart"?de==="onCompositionEnd"&&nr&&(fe=ka()):(mn=I,el="value"in mn?mn.value:mn.textContent,nr=!0)),ce=Vo(T,de),0<ce.length&&(de=new Ea(de,e,null,n,I),$.push({event:de,listeners:ce}),fe?de.data=fe:(fe=Pa(n),fe!==null&&(de.data=fe)))),(fe=wp?xp(e,n):kp(e,n))&&(T=Vo(T,"onBeforeInput"),0<T.length&&(I=new Ea("onBeforeInput","beforeinput",null,n,I),$.push({event:I,listeners:T}),I.data=fe))}Xa($,t)})}function Xr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vo(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Lr(e,n),i!=null&&r.unshift(Xr(e,i,o)),i=Lr(e,t),i!=null&&r.push(Xr(e,i,o))),e=e.return}return r}function ir(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Za(e,t,n,r,o){for(var i=t._reactName,u=[];n!==null&&n!==r;){var h=n,g=h.alternate,T=h.stateNode;if(g!==null&&g===r)break;h.tag===5&&T!==null&&(h=T,o?(g=Lr(n,i),g!=null&&u.unshift(Xr(n,g,h))):o||(g=Lr(n,i),g!=null&&u.push(Xr(n,g,h)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var Fp=/\r\n?/g,Ip=/\u0000|\uFFFD/g;function Ja(e){return(typeof e=="string"?e:""+e).replace(Fp,`
`).replace(Ip,"")}function Ho(e,t,n){if(t=Ja(t),Ja(e)!==t&&n)throw Error(s(425))}function Wo(){}var yl=null,gl=null;function wl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xl=typeof setTimeout=="function"?setTimeout:void 0,Op=typeof clearTimeout=="function"?clearTimeout:void 0,eu=typeof Promise=="function"?Promise:void 0,Ap=typeof queueMicrotask=="function"?queueMicrotask:typeof eu<"u"?function(e){return eu.resolve(null).then(e).catch($p)}:xl;function $p(e){setTimeout(function(){throw e})}function kl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),br(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);br(t)}function vn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function tu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var lr=Math.random().toString(36).slice(2),Vt="__reactFiber$"+lr,Yr="__reactProps$"+lr,Zt="__reactContainer$"+lr,Sl="__reactEvents$"+lr,bp="__reactListeners$"+lr,Bp="__reactHandles$"+lr;function An(e){var t=e[Vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Zt]||n[Vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=tu(e);e!==null;){if(n=e[Vt])return n;e=tu(e)}return t}e=n,n=e.parentNode}return null}function Zr(e){return e=e[Vt]||e[Zt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(s(33))}function Go(e){return e[Yr]||null}var Cl=[],ar=-1;function yn(e){return{current:e}}function _e(e){0>ar||(e.current=Cl[ar],Cl[ar]=null,ar--)}function Me(e,t){ar++,Cl[ar]=e.current,e.current=t}var gn={},Xe=yn(gn),lt=yn(!1),$n=gn;function ur(e,t){var n=e.type.contextTypes;if(!n)return gn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function st(e){return e=e.childContextTypes,e!=null}function Qo(){_e(lt),_e(Xe)}function nu(e,t,n){if(Xe.current!==gn)throw Error(s(168));Me(Xe,t),Me(lt,n)}function ru(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(s(108,ve(e)||"Unknown",o));return V({},n,r)}function Ko(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||gn,$n=Xe.current,Me(Xe,e),Me(lt,lt.current),!0}function ou(e,t,n){var r=e.stateNode;if(!r)throw Error(s(169));n?(e=ru(e,t,$n),r.__reactInternalMemoizedMergedChildContext=e,_e(lt),_e(Xe),Me(Xe,e)):_e(lt),Me(lt,n)}var Jt=null,Xo=!1,El=!1;function iu(e){Jt===null?Jt=[e]:Jt.push(e)}function Up(e){Xo=!0,iu(e)}function wn(){if(!El&&Jt!==null){El=!0;var e=0,t=Ne;try{var n=Jt;for(Ne=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Jt=null,Xo=!1}catch(o){throw Jt!==null&&(Jt=Jt.slice(e+1)),sa(Wi,wn),o}finally{Ne=t,El=!1}}return null}var cr=[],fr=0,Yo=null,Zo=0,St=[],Ct=0,bn=null,en=1,tn="";function Bn(e,t){cr[fr++]=Zo,cr[fr++]=Yo,Yo=e,Zo=t}function lu(e,t,n){St[Ct++]=en,St[Ct++]=tn,St[Ct++]=bn,bn=e;var r=en;e=tn;var o=32-Rt(r)-1;r&=~(1<<o),n+=1;var i=32-Rt(t)+o;if(30<i){var u=o-o%5;i=(r&(1<<u)-1).toString(32),r>>=u,o-=u,en=1<<32-Rt(t)+o|n<<o|r,tn=i+e}else en=1<<i|n<<o|r,tn=e}function Nl(e){e.return!==null&&(Bn(e,1),lu(e,1,0))}function Ml(e){for(;e===Yo;)Yo=cr[--fr],cr[fr]=null,Zo=cr[--fr],cr[fr]=null;for(;e===bn;)bn=St[--Ct],St[Ct]=null,tn=St[--Ct],St[Ct]=null,en=St[--Ct],St[Ct]=null}var ht=null,vt=null,Le=!1,Ft=null;function su(e,t){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function au(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ht=e,vt=vn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ht=e,vt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=bn!==null?{id:en,overflow:tn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ht=e,vt=null,!0):!1;default:return!1}}function jl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Tl(e){if(Le){var t=vt;if(t){var n=t;if(!au(e,t)){if(jl(e))throw Error(s(418));t=vn(n.nextSibling);var r=ht;t&&au(e,t)?su(r,n):(e.flags=e.flags&-4097|2,Le=!1,ht=e)}}else{if(jl(e))throw Error(s(418));e.flags=e.flags&-4097|2,Le=!1,ht=e}}}function uu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ht=e}function Jo(e){if(e!==ht)return!1;if(!Le)return uu(e),Le=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!wl(e.type,e.memoizedProps)),t&&(t=vt)){if(jl(e))throw cu(),Error(s(418));for(;t;)su(e,t),t=vn(t.nextSibling)}if(uu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){vt=vn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}vt=null}}else vt=ht?vn(e.stateNode.nextSibling):null;return!0}function cu(){for(var e=vt;e;)e=vn(e.nextSibling)}function pr(){vt=ht=null,Le=!1}function _l(e){Ft===null?Ft=[e]:Ft.push(e)}var qp=ne.ReactCurrentBatchConfig;function Jr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(s(309));var r=n.stateNode}if(!r)throw Error(s(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(u){var h=o.refs;u===null?delete h[i]:h[i]=u},t._stringRef=i,t)}if(typeof e!="string")throw Error(s(284));if(!n._owner)throw Error(s(290,e))}return e}function ei(e,t){throw e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function fu(e){var t=e._init;return t(e._payload)}function pu(e){function t(E,k){if(e){var M=E.deletions;M===null?(E.deletions=[k],E.flags|=16):M.push(k)}}function n(E,k){if(!e)return null;for(;k!==null;)t(E,k),k=k.sibling;return null}function r(E,k){for(E=new Map;k!==null;)k.key!==null?E.set(k.key,k):E.set(k.index,k),k=k.sibling;return E}function o(E,k){return E=jn(E,k),E.index=0,E.sibling=null,E}function i(E,k,M){return E.index=M,e?(M=E.alternate,M!==null?(M=M.index,M<k?(E.flags|=2,k):M):(E.flags|=2,k)):(E.flags|=1048576,k)}function u(E){return e&&E.alternate===null&&(E.flags|=2),E}function h(E,k,M,U){return k===null||k.tag!==6?(k=xs(M,E.mode,U),k.return=E,k):(k=o(k,M),k.return=E,k)}function g(E,k,M,U){var oe=M.type;return oe===q?I(E,k,M.props.children,U,M.key):k!==null&&(k.elementType===oe||typeof oe=="object"&&oe!==null&&oe.$$typeof===w&&fu(oe)===k.type)?(U=o(k,M.props),U.ref=Jr(E,k,M),U.return=E,U):(U=Ei(M.type,M.key,M.props,null,E.mode,U),U.ref=Jr(E,k,M),U.return=E,U)}function T(E,k,M,U){return k===null||k.tag!==4||k.stateNode.containerInfo!==M.containerInfo||k.stateNode.implementation!==M.implementation?(k=ks(M,E.mode,U),k.return=E,k):(k=o(k,M.children||[]),k.return=E,k)}function I(E,k,M,U,oe){return k===null||k.tag!==7?(k=Kn(M,E.mode,U,oe),k.return=E,k):(k=o(k,M),k.return=E,k)}function $(E,k,M){if(typeof k=="string"&&k!==""||typeof k=="number")return k=xs(""+k,E.mode,M),k.return=E,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case he:return M=Ei(k.type,k.key,k.props,null,E.mode,M),M.ref=Jr(E,null,k),M.return=E,M;case L:return k=ks(k,E.mode,M),k.return=E,k;case w:var U=k._init;return $(E,U(k._payload),M)}if($e(k)||W(k))return k=Kn(k,E.mode,M,null),k.return=E,k;ei(E,k)}return null}function F(E,k,M,U){var oe=k!==null?k.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return oe!==null?null:h(E,k,""+M,U);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case he:return M.key===oe?g(E,k,M,U):null;case L:return M.key===oe?T(E,k,M,U):null;case w:return oe=M._init,F(E,k,oe(M._payload),U)}if($e(M)||W(M))return oe!==null?null:I(E,k,M,U,null);ei(E,M)}return null}function X(E,k,M,U,oe){if(typeof U=="string"&&U!==""||typeof U=="number")return E=E.get(M)||null,h(k,E,""+U,oe);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case he:return E=E.get(U.key===null?M:U.key)||null,g(k,E,U,oe);case L:return E=E.get(U.key===null?M:U.key)||null,T(k,E,U,oe);case w:var ce=U._init;return X(E,k,M,ce(U._payload),oe)}if($e(U)||W(U))return E=E.get(M)||null,I(k,E,U,oe,null);ei(k,U)}return null}function J(E,k,M,U){for(var oe=null,ce=null,fe=k,de=k=0,He=null;fe!==null&&de<M.length;de++){fe.index>de?(He=fe,fe=null):He=fe.sibling;var Ee=F(E,fe,M[de],U);if(Ee===null){fe===null&&(fe=He);break}e&&fe&&Ee.alternate===null&&t(E,fe),k=i(Ee,k,de),ce===null?oe=Ee:ce.sibling=Ee,ce=Ee,fe=He}if(de===M.length)return n(E,fe),Le&&Bn(E,de),oe;if(fe===null){for(;de<M.length;de++)fe=$(E,M[de],U),fe!==null&&(k=i(fe,k,de),ce===null?oe=fe:ce.sibling=fe,ce=fe);return Le&&Bn(E,de),oe}for(fe=r(E,fe);de<M.length;de++)He=X(fe,E,de,M[de],U),He!==null&&(e&&He.alternate!==null&&fe.delete(He.key===null?de:He.key),k=i(He,k,de),ce===null?oe=He:ce.sibling=He,ce=He);return e&&fe.forEach(function(Tn){return t(E,Tn)}),Le&&Bn(E,de),oe}function te(E,k,M,U){var oe=W(M);if(typeof oe!="function")throw Error(s(150));if(M=oe.call(M),M==null)throw Error(s(151));for(var ce=oe=null,fe=k,de=k=0,He=null,Ee=M.next();fe!==null&&!Ee.done;de++,Ee=M.next()){fe.index>de?(He=fe,fe=null):He=fe.sibling;var Tn=F(E,fe,Ee.value,U);if(Tn===null){fe===null&&(fe=He);break}e&&fe&&Tn.alternate===null&&t(E,fe),k=i(Tn,k,de),ce===null?oe=Tn:ce.sibling=Tn,ce=Tn,fe=He}if(Ee.done)return n(E,fe),Le&&Bn(E,de),oe;if(fe===null){for(;!Ee.done;de++,Ee=M.next())Ee=$(E,Ee.value,U),Ee!==null&&(k=i(Ee,k,de),ce===null?oe=Ee:ce.sibling=Ee,ce=Ee);return Le&&Bn(E,de),oe}for(fe=r(E,fe);!Ee.done;de++,Ee=M.next())Ee=X(fe,E,de,Ee.value,U),Ee!==null&&(e&&Ee.alternate!==null&&fe.delete(Ee.key===null?de:Ee.key),k=i(Ee,k,de),ce===null?oe=Ee:ce.sibling=Ee,ce=Ee);return e&&fe.forEach(function(Sd){return t(E,Sd)}),Le&&Bn(E,de),oe}function Oe(E,k,M,U){if(typeof M=="object"&&M!==null&&M.type===q&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case he:e:{for(var oe=M.key,ce=k;ce!==null;){if(ce.key===oe){if(oe=M.type,oe===q){if(ce.tag===7){n(E,ce.sibling),k=o(ce,M.props.children),k.return=E,E=k;break e}}else if(ce.elementType===oe||typeof oe=="object"&&oe!==null&&oe.$$typeof===w&&fu(oe)===ce.type){n(E,ce.sibling),k=o(ce,M.props),k.ref=Jr(E,ce,M),k.return=E,E=k;break e}n(E,ce);break}else t(E,ce);ce=ce.sibling}M.type===q?(k=Kn(M.props.children,E.mode,U,M.key),k.return=E,E=k):(U=Ei(M.type,M.key,M.props,null,E.mode,U),U.ref=Jr(E,k,M),U.return=E,E=U)}return u(E);case L:e:{for(ce=M.key;k!==null;){if(k.key===ce)if(k.tag===4&&k.stateNode.containerInfo===M.containerInfo&&k.stateNode.implementation===M.implementation){n(E,k.sibling),k=o(k,M.children||[]),k.return=E,E=k;break e}else{n(E,k);break}else t(E,k);k=k.sibling}k=ks(M,E.mode,U),k.return=E,E=k}return u(E);case w:return ce=M._init,Oe(E,k,ce(M._payload),U)}if($e(M))return J(E,k,M,U);if(W(M))return te(E,k,M,U);ei(E,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,k!==null&&k.tag===6?(n(E,k.sibling),k=o(k,M),k.return=E,E=k):(n(E,k),k=xs(M,E.mode,U),k.return=E,E=k),u(E)):n(E,k)}return Oe}var dr=pu(!0),du=pu(!1),ti=yn(null),ni=null,mr=null,Pl=null;function Ll(){Pl=mr=ni=null}function zl(e){var t=ti.current;_e(ti),e._currentValue=t}function Rl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function hr(e,t){ni=e,Pl=mr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(at=!0),e.firstContext=null)}function Et(e){var t=e._currentValue;if(Pl!==e)if(e={context:e,memoizedValue:t,next:null},mr===null){if(ni===null)throw Error(s(308));mr=e,ni.dependencies={lanes:0,firstContext:e}}else mr=mr.next=e;return t}var Un=null;function Dl(e){Un===null?Un=[e]:Un.push(e)}function mu(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Dl(t)):(n.next=o.next,o.next=n),t.interleaved=n,nn(e,r)}function nn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var xn=!1;function Fl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function rn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function kn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Ce&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,nn(e,n)}return o=r.interleaved,o===null?(t.next=t,Dl(r)):(t.next=o.next,o.next=t),r.interleaved=t,nn(e,n)}function ri(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ki(e,n)}}function vu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var u={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=u:i=i.next=u,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function oi(e,t,n,r){var o=e.updateQueue;xn=!1;var i=o.firstBaseUpdate,u=o.lastBaseUpdate,h=o.shared.pending;if(h!==null){o.shared.pending=null;var g=h,T=g.next;g.next=null,u===null?i=T:u.next=T,u=g;var I=e.alternate;I!==null&&(I=I.updateQueue,h=I.lastBaseUpdate,h!==u&&(h===null?I.firstBaseUpdate=T:h.next=T,I.lastBaseUpdate=g))}if(i!==null){var $=o.baseState;u=0,I=T=g=null,h=i;do{var F=h.lane,X=h.eventTime;if((r&F)===F){I!==null&&(I=I.next={eventTime:X,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});e:{var J=e,te=h;switch(F=t,X=n,te.tag){case 1:if(J=te.payload,typeof J=="function"){$=J.call(X,$,F);break e}$=J;break e;case 3:J.flags=J.flags&-65537|128;case 0:if(J=te.payload,F=typeof J=="function"?J.call(X,$,F):J,F==null)break e;$=V({},$,F);break e;case 2:xn=!0}}h.callback!==null&&h.lane!==0&&(e.flags|=64,F=o.effects,F===null?o.effects=[h]:F.push(h))}else X={eventTime:X,lane:F,tag:h.tag,payload:h.payload,callback:h.callback,next:null},I===null?(T=I=X,g=$):I=I.next=X,u|=F;if(h=h.next,h===null){if(h=o.shared.pending,h===null)break;F=h,h=F.next,F.next=null,o.lastBaseUpdate=F,o.shared.pending=null}}while(!0);if(I===null&&(g=$),o.baseState=g,o.firstBaseUpdate=T,o.lastBaseUpdate=I,t=o.shared.interleaved,t!==null){o=t;do u|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Hn|=u,e.lanes=u,e.memoizedState=$}}function yu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(s(191,o));o.call(r)}}}var eo={},Ht=yn(eo),to=yn(eo),no=yn(eo);function qn(e){if(e===eo)throw Error(s(174));return e}function Il(e,t){switch(Me(no,t),Me(to,e),Me(Ht,eo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Dn(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Dn(t,e)}_e(Ht),Me(Ht,t)}function vr(){_e(Ht),_e(to),_e(no)}function gu(e){qn(no.current);var t=qn(Ht.current),n=Dn(t,e.type);t!==n&&(Me(to,e),Me(Ht,n))}function Ol(e){to.current===e&&(_e(Ht),_e(to))}var ze=yn(0);function ii(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Al=[];function $l(){for(var e=0;e<Al.length;e++)Al[e]._workInProgressVersionPrimary=null;Al.length=0}var li=ne.ReactCurrentDispatcher,bl=ne.ReactCurrentBatchConfig,Vn=0,Re=null,Be=null,qe=null,si=!1,ro=!1,oo=0,Vp=0;function Ye(){throw Error(s(321))}function Bl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dt(e[n],t[n]))return!1;return!0}function Ul(e,t,n,r,o,i){if(Vn=i,Re=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,li.current=e===null||e.memoizedState===null?Qp:Kp,e=n(r,o),ro){i=0;do{if(ro=!1,oo=0,25<=i)throw Error(s(301));i+=1,qe=Be=null,t.updateQueue=null,li.current=Xp,e=n(r,o)}while(ro)}if(li.current=ci,t=Be!==null&&Be.next!==null,Vn=0,qe=Be=Re=null,si=!1,t)throw Error(s(300));return e}function ql(){var e=oo!==0;return oo=0,e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qe===null?Re.memoizedState=qe=e:qe=qe.next=e,qe}function Nt(){if(Be===null){var e=Re.alternate;e=e!==null?e.memoizedState:null}else e=Be.next;var t=qe===null?Re.memoizedState:qe.next;if(t!==null)qe=t,Be=e;else{if(e===null)throw Error(s(310));Be=e,e={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},qe===null?Re.memoizedState=qe=e:qe=qe.next=e}return qe}function io(e,t){return typeof t=="function"?t(e):t}function Vl(e){var t=Nt(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=Be,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var u=o.next;o.next=i.next,i.next=u}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var h=u=null,g=null,T=i;do{var I=T.lane;if((Vn&I)===I)g!==null&&(g=g.next={lane:0,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),r=T.hasEagerState?T.eagerState:e(r,T.action);else{var $={lane:I,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null};g===null?(h=g=$,u=r):g=g.next=$,Re.lanes|=I,Hn|=I}T=T.next}while(T!==null&&T!==i);g===null?u=r:g.next=h,Dt(r,t.memoizedState)||(at=!0),t.memoizedState=r,t.baseState=u,t.baseQueue=g,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Re.lanes|=i,Hn|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Hl(e){var t=Nt(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var u=o=o.next;do i=e(i,u.action),u=u.next;while(u!==o);Dt(i,t.memoizedState)||(at=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function wu(){}function xu(e,t){var n=Re,r=Nt(),o=t(),i=!Dt(r.memoizedState,o);if(i&&(r.memoizedState=o,at=!0),r=r.queue,Wl(Cu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||qe!==null&&qe.memoizedState.tag&1){if(n.flags|=2048,lo(9,Su.bind(null,n,r,o,t),void 0,null),Ve===null)throw Error(s(349));(Vn&30)!==0||ku(n,t,o)}return o}function ku(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Re.updateQueue,t===null?(t={lastEffect:null,stores:null},Re.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Su(e,t,n,r){t.value=n,t.getSnapshot=r,Eu(t)&&Nu(e)}function Cu(e,t,n){return n(function(){Eu(t)&&Nu(e)})}function Eu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dt(e,n)}catch{return!0}}function Nu(e){var t=nn(e,1);t!==null&&$t(t,e,1,-1)}function Mu(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:io,lastRenderedState:e},t.queue=e,e=e.dispatch=Gp.bind(null,Re,e),[t.memoizedState,e]}function lo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Re.updateQueue,t===null?(t={lastEffect:null,stores:null},Re.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ju(){return Nt().memoizedState}function ai(e,t,n,r){var o=Wt();Re.flags|=e,o.memoizedState=lo(1|t,n,void 0,r===void 0?null:r)}function ui(e,t,n,r){var o=Nt();r=r===void 0?null:r;var i=void 0;if(Be!==null){var u=Be.memoizedState;if(i=u.destroy,r!==null&&Bl(r,u.deps)){o.memoizedState=lo(t,n,i,r);return}}Re.flags|=e,o.memoizedState=lo(1|t,n,i,r)}function Tu(e,t){return ai(8390656,8,e,t)}function Wl(e,t){return ui(2048,8,e,t)}function _u(e,t){return ui(4,2,e,t)}function Pu(e,t){return ui(4,4,e,t)}function Lu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function zu(e,t,n){return n=n!=null?n.concat([e]):null,ui(4,4,Lu.bind(null,t,e),n)}function Gl(){}function Ru(e,t){var n=Nt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Du(e,t){var n=Nt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Fu(e,t,n){return(Vn&21)===0?(e.baseState&&(e.baseState=!1,at=!0),e.memoizedState=n):(Dt(n,t)||(n=fa(),Re.lanes|=n,Hn|=n,e.baseState=!0),t)}function Hp(e,t){var n=Ne;Ne=n!==0&&4>n?n:4,e(!0);var r=bl.transition;bl.transition={};try{e(!1),t()}finally{Ne=n,bl.transition=r}}function Iu(){return Nt().memoizedState}function Wp(e,t,n){var r=Nn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ou(e))Au(t,n);else if(n=mu(e,t,n,r),n!==null){var o=ot();$t(n,e,r,o),$u(n,t,r)}}function Gp(e,t,n){var r=Nn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ou(e))Au(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var u=t.lastRenderedState,h=i(u,n);if(o.hasEagerState=!0,o.eagerState=h,Dt(h,u)){var g=t.interleaved;g===null?(o.next=o,Dl(t)):(o.next=g.next,g.next=o),t.interleaved=o;return}}catch{}finally{}n=mu(e,t,o,r),n!==null&&(o=ot(),$t(n,e,r,o),$u(n,t,r))}}function Ou(e){var t=e.alternate;return e===Re||t!==null&&t===Re}function Au(e,t){ro=si=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function $u(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ki(e,n)}}var ci={readContext:Et,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useInsertionEffect:Ye,useLayoutEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useMutableSource:Ye,useSyncExternalStore:Ye,useId:Ye,unstable_isNewReconciler:!1},Qp={readContext:Et,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:Et,useEffect:Tu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ai(4194308,4,Lu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ai(4194308,4,e,t)},useInsertionEffect:function(e,t){return ai(4,2,e,t)},useMemo:function(e,t){var n=Wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Wp.bind(null,Re,e),[r.memoizedState,e]},useRef:function(e){var t=Wt();return e={current:e},t.memoizedState=e},useState:Mu,useDebugValue:Gl,useDeferredValue:function(e){return Wt().memoizedState=e},useTransition:function(){var e=Mu(!1),t=e[0];return e=Hp.bind(null,e[1]),Wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Re,o=Wt();if(Le){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),Ve===null)throw Error(s(349));(Vn&30)!==0||ku(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Tu(Cu.bind(null,r,i,e),[e]),r.flags|=2048,lo(9,Su.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Wt(),t=Ve.identifierPrefix;if(Le){var n=tn,r=en;n=(r&~(1<<32-Rt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=oo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Vp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Kp={readContext:Et,useCallback:Ru,useContext:Et,useEffect:Wl,useImperativeHandle:zu,useInsertionEffect:_u,useLayoutEffect:Pu,useMemo:Du,useReducer:Vl,useRef:ju,useState:function(){return Vl(io)},useDebugValue:Gl,useDeferredValue:function(e){var t=Nt();return Fu(t,Be.memoizedState,e)},useTransition:function(){var e=Vl(io)[0],t=Nt().memoizedState;return[e,t]},useMutableSource:wu,useSyncExternalStore:xu,useId:Iu,unstable_isNewReconciler:!1},Xp={readContext:Et,useCallback:Ru,useContext:Et,useEffect:Wl,useImperativeHandle:zu,useInsertionEffect:_u,useLayoutEffect:Pu,useMemo:Du,useReducer:Hl,useRef:ju,useState:function(){return Hl(io)},useDebugValue:Gl,useDeferredValue:function(e){var t=Nt();return Be===null?t.memoizedState=e:Fu(t,Be.memoizedState,e)},useTransition:function(){var e=Hl(io)[0],t=Nt().memoizedState;return[e,t]},useMutableSource:wu,useSyncExternalStore:xu,useId:Iu,unstable_isNewReconciler:!1};function It(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ql(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fi={isMounted:function(e){return(e=e._reactInternals)?On(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ot(),o=Nn(e),i=rn(r,o);i.payload=t,n!=null&&(i.callback=n),t=kn(e,i,o),t!==null&&($t(t,e,o,r),ri(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ot(),o=Nn(e),i=rn(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=kn(e,i,o),t!==null&&($t(t,e,o,r),ri(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ot(),r=Nn(e),o=rn(n,r);o.tag=2,t!=null&&(o.callback=t),t=kn(e,o,r),t!==null&&($t(t,e,r,n),ri(t,e,r))}};function bu(e,t,n,r,o,i,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,u):t.prototype&&t.prototype.isPureReactComponent?!Wr(n,r)||!Wr(o,i):!0}function Bu(e,t,n){var r=!1,o=gn,i=t.contextType;return typeof i=="object"&&i!==null?i=Et(i):(o=st(t)?$n:Xe.current,r=t.contextTypes,i=(r=r!=null)?ur(e,o):gn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Uu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fi.enqueueReplaceState(t,t.state,null)}function Kl(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Fl(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Et(i):(i=st(t)?$n:Xe.current,o.context=ur(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ql(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&fi.enqueueReplaceState(o,o.state,null),oi(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function yr(e,t){try{var n="",r=t;do n+=ue(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Xl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Yl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Yp=typeof WeakMap=="function"?WeakMap:Map;function qu(e,t,n){n=rn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){gi||(gi=!0,ps=r),Yl(e,t)},n}function Vu(e,t,n){n=rn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Yl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Yl(e,t),typeof r!="function"&&(Cn===null?Cn=new Set([this]):Cn.add(this));var u=t.stack;this.componentDidCatch(t.value,{componentStack:u!==null?u:""})}),n}function Hu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Yp;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=fd.bind(null,e,t,n),t.then(e,e))}function Wu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Gu(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=rn(-1,1),t.tag=2,kn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var Zp=ne.ReactCurrentOwner,at=!1;function rt(e,t,n,r){t.child=e===null?du(t,null,n,r):dr(t,e.child,n,r)}function Qu(e,t,n,r,o){n=n.render;var i=t.ref;return hr(t,o),r=Ul(e,t,n,r,i,o),n=ql(),e!==null&&!at?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,on(e,t,o)):(Le&&n&&Nl(t),t.flags|=1,rt(e,t,r,o),t.child)}function Ku(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!ws(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Xu(e,t,i,r,o)):(e=Ei(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&o)===0){var u=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wr,n(u,r)&&e.ref===t.ref)return on(e,t,o)}return t.flags|=1,e=jn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Xu(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Wr(i,r)&&e.ref===t.ref)if(at=!1,t.pendingProps=r=i,(e.lanes&o)!==0)(e.flags&131072)!==0&&(at=!0);else return t.lanes=e.lanes,on(e,t,o)}return Zl(e,t,n,r,o)}function Yu(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Me(wr,yt),yt|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Me(wr,yt),yt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Me(wr,yt),yt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Me(wr,yt),yt|=r;return rt(e,t,o,n),t.child}function Zu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Zl(e,t,n,r,o){var i=st(n)?$n:Xe.current;return i=ur(t,i),hr(t,o),n=Ul(e,t,n,r,i,o),r=ql(),e!==null&&!at?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,on(e,t,o)):(Le&&r&&Nl(t),t.flags|=1,rt(e,t,n,o),t.child)}function Ju(e,t,n,r,o){if(st(n)){var i=!0;Ko(t)}else i=!1;if(hr(t,o),t.stateNode===null)di(e,t),Bu(t,n,r),Kl(t,n,r,o),r=!0;else if(e===null){var u=t.stateNode,h=t.memoizedProps;u.props=h;var g=u.context,T=n.contextType;typeof T=="object"&&T!==null?T=Et(T):(T=st(n)?$n:Xe.current,T=ur(t,T));var I=n.getDerivedStateFromProps,$=typeof I=="function"||typeof u.getSnapshotBeforeUpdate=="function";$||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(h!==r||g!==T)&&Uu(t,u,r,T),xn=!1;var F=t.memoizedState;u.state=F,oi(t,r,u,o),g=t.memoizedState,h!==r||F!==g||lt.current||xn?(typeof I=="function"&&(Ql(t,n,I,r),g=t.memoizedState),(h=xn||bu(t,n,h,r,F,g,T))?($||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=g),u.props=r,u.state=g,u.context=T,r=h):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,hu(e,t),h=t.memoizedProps,T=t.type===t.elementType?h:It(t.type,h),u.props=T,$=t.pendingProps,F=u.context,g=n.contextType,typeof g=="object"&&g!==null?g=Et(g):(g=st(n)?$n:Xe.current,g=ur(t,g));var X=n.getDerivedStateFromProps;(I=typeof X=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(h!==$||F!==g)&&Uu(t,u,r,g),xn=!1,F=t.memoizedState,u.state=F,oi(t,r,u,o);var J=t.memoizedState;h!==$||F!==J||lt.current||xn?(typeof X=="function"&&(Ql(t,n,X,r),J=t.memoizedState),(T=xn||bu(t,n,T,r,F,J,g)||!1)?(I||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,J,g),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,J,g)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||h===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=J),u.props=r,u.state=J,u.context=g,r=T):(typeof u.componentDidUpdate!="function"||h===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),r=!1)}return Jl(e,t,n,r,i,o)}function Jl(e,t,n,r,o,i){Zu(e,t);var u=(t.flags&128)!==0;if(!r&&!u)return o&&ou(t,n,!1),on(e,t,i);r=t.stateNode,Zp.current=t;var h=u&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&u?(t.child=dr(t,e.child,null,i),t.child=dr(t,null,h,i)):rt(e,t,h,i),t.memoizedState=r.state,o&&ou(t,n,!0),t.child}function ec(e){var t=e.stateNode;t.pendingContext?nu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&nu(e,t.context,!1),Il(e,t.containerInfo)}function tc(e,t,n,r,o){return pr(),_l(o),t.flags|=256,rt(e,t,n,r),t.child}var es={dehydrated:null,treeContext:null,retryLane:0};function ts(e){return{baseLanes:e,cachePool:null,transitions:null}}function nc(e,t,n){var r=t.pendingProps,o=ze.current,i=!1,u=(t.flags&128)!==0,h;if((h=u)||(h=e!==null&&e.memoizedState===null?!1:(o&2)!==0),h?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Me(ze,o&1),e===null)return Tl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(u=r.children,e=r.fallback,i?(r=t.mode,i=t.child,u={mode:"hidden",children:u},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=u):i=Ni(u,r,0,null),e=Kn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ts(n),t.memoizedState=es,e):ns(t,u));if(o=e.memoizedState,o!==null&&(h=o.dehydrated,h!==null))return Jp(e,t,u,r,h,o,n);if(i){i=r.fallback,u=t.mode,o=e.child,h=o.sibling;var g={mode:"hidden",children:r.children};return(u&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=g,t.deletions=null):(r=jn(o,g),r.subtreeFlags=o.subtreeFlags&14680064),h!==null?i=jn(h,i):(i=Kn(i,u,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,u=e.child.memoizedState,u=u===null?ts(n):{baseLanes:u.baseLanes|n,cachePool:null,transitions:u.transitions},i.memoizedState=u,i.childLanes=e.childLanes&~n,t.memoizedState=es,r}return i=e.child,e=i.sibling,r=jn(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ns(e,t){return t=Ni({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function pi(e,t,n,r){return r!==null&&_l(r),dr(t,e.child,null,n),e=ns(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Jp(e,t,n,r,o,i,u){if(n)return t.flags&256?(t.flags&=-257,r=Xl(Error(s(422))),pi(e,t,u,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=Ni({mode:"visible",children:r.children},o,0,null),i=Kn(i,o,u,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&dr(t,e.child,null,u),t.child.memoizedState=ts(u),t.memoizedState=es,i);if((t.mode&1)===0)return pi(e,t,u,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var h=r.dgst;return r=h,i=Error(s(419)),r=Xl(i,r,void 0),pi(e,t,u,r)}if(h=(u&e.childLanes)!==0,at||h){if(r=Ve,r!==null){switch(u&-u){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|u))!==0?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,nn(e,o),$t(r,e,o,-1))}return gs(),r=Xl(Error(s(421))),pi(e,t,u,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=pd.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,vt=vn(o.nextSibling),ht=t,Le=!0,Ft=null,e!==null&&(St[Ct++]=en,St[Ct++]=tn,St[Ct++]=bn,en=e.id,tn=e.overflow,bn=t),t=ns(t,r.children),t.flags|=4096,t)}function rc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Rl(e.return,t,n)}function rs(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function oc(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(rt(e,t,r.children,n),r=ze.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rc(e,n,t);else if(e.tag===19)rc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Me(ze,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ii(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),rs(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ii(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}rs(t,!0,n,null,i);break;case"together":rs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function di(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function on(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Hn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=jn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=jn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ed(e,t,n){switch(t.tag){case 3:ec(t),pr();break;case 5:gu(t);break;case 1:st(t.type)&&Ko(t);break;case 4:Il(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Me(ti,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Me(ze,ze.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?nc(e,t,n):(Me(ze,ze.current&1),e=on(e,t,n),e!==null?e.sibling:null);Me(ze,ze.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return oc(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Me(ze,ze.current),r)break;return null;case 22:case 23:return t.lanes=0,Yu(e,t,n)}return on(e,t,n)}var ic,os,lc,sc;ic=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},os=function(){},lc=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,qn(Ht.current);var i=null;switch(n){case"input":o=Yt(e,o),r=Yt(e,r),i=[];break;case"select":o=V({},o,{value:void 0}),r=V({},r,{value:void 0}),i=[];break;case"textarea":o=Er(e,o),r=Er(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Wo)}jr(n,r);var u;n=null;for(T in o)if(!r.hasOwnProperty(T)&&o.hasOwnProperty(T)&&o[T]!=null)if(T==="style"){var h=o[T];for(u in h)h.hasOwnProperty(u)&&(n||(n={}),n[u]="")}else T!=="dangerouslySetInnerHTML"&&T!=="children"&&T!=="suppressContentEditableWarning"&&T!=="suppressHydrationWarning"&&T!=="autoFocus"&&(f.hasOwnProperty(T)?i||(i=[]):(i=i||[]).push(T,null));for(T in r){var g=r[T];if(h=o?.[T],r.hasOwnProperty(T)&&g!==h&&(g!=null||h!=null))if(T==="style")if(h){for(u in h)!h.hasOwnProperty(u)||g&&g.hasOwnProperty(u)||(n||(n={}),n[u]="");for(u in g)g.hasOwnProperty(u)&&h[u]!==g[u]&&(n||(n={}),n[u]=g[u])}else n||(i||(i=[]),i.push(T,n)),n=g;else T==="dangerouslySetInnerHTML"?(g=g?g.__html:void 0,h=h?h.__html:void 0,g!=null&&h!==g&&(i=i||[]).push(T,g)):T==="children"?typeof g!="string"&&typeof g!="number"||(i=i||[]).push(T,""+g):T!=="suppressContentEditableWarning"&&T!=="suppressHydrationWarning"&&(f.hasOwnProperty(T)?(g!=null&&T==="onScroll"&&Te("scroll",e),i||h===g||(i=[])):(i=i||[]).push(T,g))}n&&(i=i||[]).push("style",n);var T=i;(t.updateQueue=T)&&(t.flags|=4)}},sc=function(e,t,n,r){n!==r&&(t.flags|=4)};function so(e,t){if(!Le)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function td(e,t,n){var r=t.pendingProps;switch(Ml(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(t),null;case 1:return st(t.type)&&Qo(),Ze(t),null;case 3:return r=t.stateNode,vr(),_e(lt),_e(Xe),$l(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Jo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ft!==null&&(hs(Ft),Ft=null))),os(e,t),Ze(t),null;case 5:Ol(t);var o=qn(no.current);if(n=t.type,e!==null&&t.stateNode!=null)lc(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(s(166));return Ze(t),null}if(e=qn(Ht.current),Jo(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Vt]=t,r[Yr]=i,e=(t.mode&1)!==0,n){case"dialog":Te("cancel",r),Te("close",r);break;case"iframe":case"object":case"embed":Te("load",r);break;case"video":case"audio":for(o=0;o<Qr.length;o++)Te(Qr[o],r);break;case"source":Te("error",r);break;case"img":case"image":case"link":Te("error",r),Te("load",r);break;case"details":Te("toggle",r);break;case"input":zn(r,i),Te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Te("invalid",r);break;case"textarea":it(r,i),Te("invalid",r)}jr(n,i),o=null;for(var u in i)if(i.hasOwnProperty(u)){var h=i[u];u==="children"?typeof h=="string"?r.textContent!==h&&(i.suppressHydrationWarning!==!0&&Ho(r.textContent,h,e),o=["children",h]):typeof h=="number"&&r.textContent!==""+h&&(i.suppressHydrationWarning!==!0&&Ho(r.textContent,h,e),o=["children",""+h]):f.hasOwnProperty(u)&&h!=null&&u==="onScroll"&&Te("scroll",r)}switch(n){case"input":dt(r),Bt(r,i,!0);break;case"textarea":dt(r),Mr(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Wo)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{u=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=zt(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),n==="select"&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[Vt]=t,e[Yr]=r,ic(e,t,!1,!1),t.stateNode=e;e:{switch(u=Tr(n,r),n){case"dialog":Te("cancel",e),Te("close",e),o=r;break;case"iframe":case"object":case"embed":Te("load",e),o=r;break;case"video":case"audio":for(o=0;o<Qr.length;o++)Te(Qr[o],e);o=r;break;case"source":Te("error",e),o=r;break;case"img":case"image":case"link":Te("error",e),Te("load",e),o=r;break;case"details":Te("toggle",e),o=r;break;case"input":zn(e,r),o=Yt(e,r),Te("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=V({},r,{value:void 0}),Te("invalid",e);break;case"textarea":it(e,r),o=Er(e,r),Te("invalid",e);break;default:o=r}jr(n,o),h=o;for(i in h)if(h.hasOwnProperty(i)){var g=h[i];i==="style"?In(e,g):i==="dangerouslySetInnerHTML"?(g=g?g.__html:void 0,g!=null&&ko(e,g)):i==="children"?typeof g=="string"?(n!=="textarea"||g!=="")&&Fn(e,g):typeof g=="number"&&Fn(e,""+g):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(f.hasOwnProperty(i)?g!=null&&i==="onScroll"&&Te("scroll",e):g!=null&&G(e,i,g,u))}switch(n){case"input":dt(e),Bt(e,r,!1);break;case"textarea":dt(e),Mr(e);break;case"option":r.value!=null&&e.setAttribute("value",""+B(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?an(e,!!r.multiple,i,!1):r.defaultValue!=null&&an(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Wo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ze(t),null;case 6:if(e&&t.stateNode!=null)sc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(s(166));if(n=qn(no.current),qn(Ht.current),Jo(t)){if(r=t.stateNode,n=t.memoizedProps,r[Vt]=t,(i=r.nodeValue!==n)&&(e=ht,e!==null))switch(e.tag){case 3:Ho(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ho(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Vt]=t,t.stateNode=r}return Ze(t),null;case 13:if(_e(ze),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Le&&vt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)cu(),pr(),t.flags|=98560,i=!1;else if(i=Jo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(s(317));i[Vt]=t}else pr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ze(t),i=!1}else Ft!==null&&(hs(Ft),Ft=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ze.current&1)!==0?Ue===0&&(Ue=3):gs())),t.updateQueue!==null&&(t.flags|=4),Ze(t),null);case 4:return vr(),os(e,t),e===null&&Kr(t.stateNode.containerInfo),Ze(t),null;case 10:return zl(t.type._context),Ze(t),null;case 17:return st(t.type)&&Qo(),Ze(t),null;case 19:if(_e(ze),i=t.memoizedState,i===null)return Ze(t),null;if(r=(t.flags&128)!==0,u=i.rendering,u===null)if(r)so(i,!1);else{if(Ue!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=ii(e),u!==null){for(t.flags|=128,so(i,!1),r=u.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,u=i.alternate,u===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=u.childLanes,i.lanes=u.lanes,i.child=u.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=u.memoizedProps,i.memoizedState=u.memoizedState,i.updateQueue=u.updateQueue,i.type=u.type,e=u.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Me(ze,ze.current&1|2),t.child}e=e.sibling}i.tail!==null&&Ie()>xr&&(t.flags|=128,r=!0,so(i,!1),t.lanes=4194304)}else{if(!r)if(e=ii(u),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),so(i,!0),i.tail===null&&i.tailMode==="hidden"&&!u.alternate&&!Le)return Ze(t),null}else 2*Ie()-i.renderingStartTime>xr&&n!==1073741824&&(t.flags|=128,r=!0,so(i,!1),t.lanes=4194304);i.isBackwards?(u.sibling=t.child,t.child=u):(n=i.last,n!==null?n.sibling=u:t.child=u,i.last=u)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Ie(),t.sibling=null,n=ze.current,Me(ze,r?n&1|2:n&1),t):(Ze(t),null);case 22:case 23:return ys(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(yt&1073741824)!==0&&(Ze(t),t.subtreeFlags&6&&(t.flags|=8192)):Ze(t),null;case 24:return null;case 25:return null}throw Error(s(156,t.tag))}function nd(e,t){switch(Ml(t),t.tag){case 1:return st(t.type)&&Qo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return vr(),_e(lt),_e(Xe),$l(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Ol(t),null;case 13:if(_e(ze),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));pr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _e(ze),null;case 4:return vr(),null;case 10:return zl(t.type._context),null;case 22:case 23:return ys(),null;case 24:return null;default:return null}}var mi=!1,Je=!1,rd=typeof WeakSet=="function"?WeakSet:Set,Z=null;function gr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Fe(e,t,r)}else n.current=null}function is(e,t,n){try{n()}catch(r){Fe(e,t,r)}}var ac=!1;function od(e,t){if(yl=Do,e=ba(),ul(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var u=0,h=-1,g=-1,T=0,I=0,$=e,F=null;t:for(;;){for(var X;$!==n||o!==0&&$.nodeType!==3||(h=u+o),$!==i||r!==0&&$.nodeType!==3||(g=u+r),$.nodeType===3&&(u+=$.nodeValue.length),(X=$.firstChild)!==null;)F=$,$=X;for(;;){if($===e)break t;if(F===n&&++T===o&&(h=u),F===i&&++I===r&&(g=u),(X=$.nextSibling)!==null)break;$=F,F=$.parentNode}$=X}n=h===-1||g===-1?null:{start:h,end:g}}else n=null}n=n||{start:0,end:0}}else n=null;for(gl={focusedElem:e,selectionRange:n},Do=!1,Z=t;Z!==null;)if(t=Z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Z=e;else for(;Z!==null;){t=Z;try{var J=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(J!==null){var te=J.memoizedProps,Oe=J.memoizedState,E=t.stateNode,k=E.getSnapshotBeforeUpdate(t.elementType===t.type?te:It(t.type,te),Oe);E.__reactInternalSnapshotBeforeUpdate=k}break;case 3:var M=t.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(s(163))}}catch(U){Fe(t,t.return,U)}if(e=t.sibling,e!==null){e.return=t.return,Z=e;break}Z=t.return}return J=ac,ac=!1,J}function ao(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&is(t,n,i)}o=o.next}while(o!==r)}}function hi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ls(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function uc(e){var t=e.alternate;t!==null&&(e.alternate=null,uc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Vt],delete t[Yr],delete t[Sl],delete t[bp],delete t[Bp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function cc(e){return e.tag===5||e.tag===3||e.tag===4}function fc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ss(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Wo));else if(r!==4&&(e=e.child,e!==null))for(ss(e,t,n),e=e.sibling;e!==null;)ss(e,t,n),e=e.sibling}function as(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(as(e,t,n),e=e.sibling;e!==null;)as(e,t,n),e=e.sibling}var Qe=null,Ot=!1;function Sn(e,t,n){for(n=n.child;n!==null;)pc(e,t,n),n=n.sibling}function pc(e,t,n){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(To,n)}catch{}switch(n.tag){case 5:Je||gr(n,t);case 6:var r=Qe,o=Ot;Qe=null,Sn(e,t,n),Qe=r,Ot=o,Qe!==null&&(Ot?(e=Qe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Qe.removeChild(n.stateNode));break;case 18:Qe!==null&&(Ot?(e=Qe,n=n.stateNode,e.nodeType===8?kl(e.parentNode,n):e.nodeType===1&&kl(e,n),br(e)):kl(Qe,n.stateNode));break;case 4:r=Qe,o=Ot,Qe=n.stateNode.containerInfo,Ot=!0,Sn(e,t,n),Qe=r,Ot=o;break;case 0:case 11:case 14:case 15:if(!Je&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,u=i.destroy;i=i.tag,u!==void 0&&((i&2)!==0||(i&4)!==0)&&is(n,t,u),o=o.next}while(o!==r)}Sn(e,t,n);break;case 1:if(!Je&&(gr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(h){Fe(n,t,h)}Sn(e,t,n);break;case 21:Sn(e,t,n);break;case 22:n.mode&1?(Je=(r=Je)||n.memoizedState!==null,Sn(e,t,n),Je=r):Sn(e,t,n);break;default:Sn(e,t,n)}}function dc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new rd),t.forEach(function(r){var o=dd.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function At(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,u=t,h=u;e:for(;h!==null;){switch(h.tag){case 5:Qe=h.stateNode,Ot=!1;break e;case 3:Qe=h.stateNode.containerInfo,Ot=!0;break e;case 4:Qe=h.stateNode.containerInfo,Ot=!0;break e}h=h.return}if(Qe===null)throw Error(s(160));pc(i,u,o),Qe=null,Ot=!1;var g=o.alternate;g!==null&&(g.return=null),o.return=null}catch(T){Fe(o,t,T)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)mc(t,e),t=t.sibling}function mc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(At(t,e),Gt(e),r&4){try{ao(3,e,e.return),hi(3,e)}catch(te){Fe(e,e.return,te)}try{ao(5,e,e.return)}catch(te){Fe(e,e.return,te)}}break;case 1:At(t,e),Gt(e),r&512&&n!==null&&gr(n,n.return);break;case 5:if(At(t,e),Gt(e),r&512&&n!==null&&gr(n,n.return),e.flags&32){var o=e.stateNode;try{Fn(o,"")}catch(te){Fe(e,e.return,te)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,u=n!==null?n.memoizedProps:i,h=e.type,g=e.updateQueue;if(e.updateQueue=null,g!==null)try{h==="input"&&i.type==="radio"&&i.name!=null&&tt(o,i),Tr(h,u);var T=Tr(h,i);for(u=0;u<g.length;u+=2){var I=g[u],$=g[u+1];I==="style"?In(o,$):I==="dangerouslySetInnerHTML"?ko(o,$):I==="children"?Fn(o,$):G(o,I,$,T)}switch(h){case"input":Lt(o,i);break;case"textarea":Nr(o,i);break;case"select":var F=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var X=i.value;X!=null?an(o,!!i.multiple,X,!1):F!==!!i.multiple&&(i.defaultValue!=null?an(o,!!i.multiple,i.defaultValue,!0):an(o,!!i.multiple,i.multiple?[]:"",!1))}o[Yr]=i}catch(te){Fe(e,e.return,te)}}break;case 6:if(At(t,e),Gt(e),r&4){if(e.stateNode===null)throw Error(s(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(te){Fe(e,e.return,te)}}break;case 3:if(At(t,e),Gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{br(t.containerInfo)}catch(te){Fe(e,e.return,te)}break;case 4:At(t,e),Gt(e);break;case 13:At(t,e),Gt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(fs=Ie())),r&4&&dc(e);break;case 22:if(I=n!==null&&n.memoizedState!==null,e.mode&1?(Je=(T=Je)||I,At(t,e),Je=T):At(t,e),Gt(e),r&8192){if(T=e.memoizedState!==null,(e.stateNode.isHidden=T)&&!I&&(e.mode&1)!==0)for(Z=e,I=e.child;I!==null;){for($=Z=I;Z!==null;){switch(F=Z,X=F.child,F.tag){case 0:case 11:case 14:case 15:ao(4,F,F.return);break;case 1:gr(F,F.return);var J=F.stateNode;if(typeof J.componentWillUnmount=="function"){r=F,n=F.return;try{t=r,J.props=t.memoizedProps,J.state=t.memoizedState,J.componentWillUnmount()}catch(te){Fe(r,n,te)}}break;case 5:gr(F,F.return);break;case 22:if(F.memoizedState!==null){yc($);continue}}X!==null?(X.return=F,Z=X):yc($)}I=I.sibling}e:for(I=null,$=e;;){if($.tag===5){if(I===null){I=$;try{o=$.stateNode,T?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(h=$.stateNode,g=$.memoizedProps.style,u=g!=null&&g.hasOwnProperty("display")?g.display:null,h.style.display=Zn("display",u))}catch(te){Fe(e,e.return,te)}}}else if($.tag===6){if(I===null)try{$.stateNode.nodeValue=T?"":$.memoizedProps}catch(te){Fe(e,e.return,te)}}else if(($.tag!==22&&$.tag!==23||$.memoizedState===null||$===e)&&$.child!==null){$.child.return=$,$=$.child;continue}if($===e)break e;for(;$.sibling===null;){if($.return===null||$.return===e)break e;I===$&&(I=null),$=$.return}I===$&&(I=null),$.sibling.return=$.return,$=$.sibling}}break;case 19:At(t,e),Gt(e),r&4&&dc(e);break;case 21:break;default:At(t,e),Gt(e)}}function Gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(cc(n)){var r=n;break e}n=n.return}throw Error(s(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Fn(o,""),r.flags&=-33);var i=fc(e);as(e,i,o);break;case 3:case 4:var u=r.stateNode.containerInfo,h=fc(e);ss(e,h,u);break;default:throw Error(s(161))}}catch(g){Fe(e,e.return,g)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function id(e,t,n){Z=e,hc(e)}function hc(e,t,n){for(var r=(e.mode&1)!==0;Z!==null;){var o=Z,i=o.child;if(o.tag===22&&r){var u=o.memoizedState!==null||mi;if(!u){var h=o.alternate,g=h!==null&&h.memoizedState!==null||Je;h=mi;var T=Je;if(mi=u,(Je=g)&&!T)for(Z=o;Z!==null;)u=Z,g=u.child,u.tag===22&&u.memoizedState!==null?gc(o):g!==null?(g.return=u,Z=g):gc(o);for(;i!==null;)Z=i,hc(i),i=i.sibling;Z=o,mi=h,Je=T}vc(e)}else(o.subtreeFlags&8772)!==0&&i!==null?(i.return=o,Z=i):vc(e)}}function vc(e){for(;Z!==null;){var t=Z;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Je||hi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Je)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:It(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&yu(t,i,r);break;case 3:var u=t.updateQueue;if(u!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}yu(t,u,n)}break;case 5:var h=t.stateNode;if(n===null&&t.flags&4){n=h;var g=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":g.autoFocus&&n.focus();break;case"img":g.src&&(n.src=g.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var T=t.alternate;if(T!==null){var I=T.memoizedState;if(I!==null){var $=I.dehydrated;$!==null&&br($)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(s(163))}Je||t.flags&512&&ls(t)}catch(F){Fe(t,t.return,F)}}if(t===e){Z=null;break}if(n=t.sibling,n!==null){n.return=t.return,Z=n;break}Z=t.return}}function yc(e){for(;Z!==null;){var t=Z;if(t===e){Z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,Z=n;break}Z=t.return}}function gc(e){for(;Z!==null;){var t=Z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{hi(4,t)}catch(g){Fe(t,n,g)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(g){Fe(t,o,g)}}var i=t.return;try{ls(t)}catch(g){Fe(t,i,g)}break;case 5:var u=t.return;try{ls(t)}catch(g){Fe(t,u,g)}}}catch(g){Fe(t,t.return,g)}if(t===e){Z=null;break}var h=t.sibling;if(h!==null){h.return=t.return,Z=h;break}Z=t.return}}var ld=Math.ceil,vi=ne.ReactCurrentDispatcher,us=ne.ReactCurrentOwner,Mt=ne.ReactCurrentBatchConfig,Ce=0,Ve=null,Ae=null,Ke=0,yt=0,wr=yn(0),Ue=0,uo=null,Hn=0,yi=0,cs=0,co=null,ut=null,fs=0,xr=1/0,ln=null,gi=!1,ps=null,Cn=null,wi=!1,En=null,xi=0,fo=0,ds=null,ki=-1,Si=0;function ot(){return(Ce&6)!==0?Ie():ki!==-1?ki:ki=Ie()}function Nn(e){return(e.mode&1)===0?1:(Ce&2)!==0&&Ke!==0?Ke&-Ke:qp.transition!==null?(Si===0&&(Si=fa()),Si):(e=Ne,e!==0||(e=window.event,e=e===void 0?16:xa(e.type)),e)}function $t(e,t,n,r){if(50<fo)throw fo=0,ds=null,Error(s(185));Fr(e,n,r),((Ce&2)===0||e!==Ve)&&(e===Ve&&((Ce&2)===0&&(yi|=n),Ue===4&&Mn(e,Ke)),ct(e,r),n===1&&Ce===0&&(t.mode&1)===0&&(xr=Ie()+500,Xo&&wn()))}function ct(e,t){var n=e.callbackNode;qf(e,t);var r=Lo(e,e===Ve?Ke:0);if(r===0)n!==null&&aa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&aa(n),t===1)e.tag===0?Up(xc.bind(null,e)):iu(xc.bind(null,e)),Ap(function(){(Ce&6)===0&&wn()}),n=null;else{switch(pa(r)){case 1:n=Wi;break;case 4:n=ua;break;case 16:n=jo;break;case 536870912:n=ca;break;default:n=jo}n=Tc(n,wc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function wc(e,t){if(ki=-1,Si=0,(Ce&6)!==0)throw Error(s(327));var n=e.callbackNode;if(kr()&&e.callbackNode!==n)return null;var r=Lo(e,e===Ve?Ke:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Ci(e,r);else{t=r;var o=Ce;Ce|=2;var i=Sc();(Ve!==e||Ke!==t)&&(ln=null,xr=Ie()+500,Gn(e,t));do try{ud();break}catch(h){kc(e,h)}while(!0);Ll(),vi.current=i,Ce=o,Ae!==null?t=0:(Ve=null,Ke=0,t=Ue)}if(t!==0){if(t===2&&(o=Gi(e),o!==0&&(r=o,t=ms(e,o))),t===1)throw n=uo,Gn(e,0),Mn(e,r),ct(e,Ie()),n;if(t===6)Mn(e,r);else{if(o=e.current.alternate,(r&30)===0&&!sd(o)&&(t=Ci(e,r),t===2&&(i=Gi(e),i!==0&&(r=i,t=ms(e,i))),t===1))throw n=uo,Gn(e,0),Mn(e,r),ct(e,Ie()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(s(345));case 2:Qn(e,ut,ln);break;case 3:if(Mn(e,r),(r&130023424)===r&&(t=fs+500-Ie(),10<t)){if(Lo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ot(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=xl(Qn.bind(null,e,ut,ln),t);break}Qn(e,ut,ln);break;case 4:if(Mn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var u=31-Rt(r);i=1<<u,u=t[u],u>o&&(o=u),r&=~i}if(r=o,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ld(r/1960))-r,10<r){e.timeoutHandle=xl(Qn.bind(null,e,ut,ln),r);break}Qn(e,ut,ln);break;case 5:Qn(e,ut,ln);break;default:throw Error(s(329))}}}return ct(e,Ie()),e.callbackNode===n?wc.bind(null,e):null}function ms(e,t){var n=co;return e.current.memoizedState.isDehydrated&&(Gn(e,t).flags|=256),e=Ci(e,t),e!==2&&(t=ut,ut=n,t!==null&&hs(t)),e}function hs(e){ut===null?ut=e:ut.push.apply(ut,e)}function sd(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Dt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mn(e,t){for(t&=~cs,t&=~yi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Rt(t),r=1<<n;e[n]=-1,t&=~r}}function xc(e){if((Ce&6)!==0)throw Error(s(327));kr();var t=Lo(e,0);if((t&1)===0)return ct(e,Ie()),null;var n=Ci(e,t);if(e.tag!==0&&n===2){var r=Gi(e);r!==0&&(t=r,n=ms(e,r))}if(n===1)throw n=uo,Gn(e,0),Mn(e,t),ct(e,Ie()),n;if(n===6)throw Error(s(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Qn(e,ut,ln),ct(e,Ie()),null}function vs(e,t){var n=Ce;Ce|=1;try{return e(t)}finally{Ce=n,Ce===0&&(xr=Ie()+500,Xo&&wn())}}function Wn(e){En!==null&&En.tag===0&&(Ce&6)===0&&kr();var t=Ce;Ce|=1;var n=Mt.transition,r=Ne;try{if(Mt.transition=null,Ne=1,e)return e()}finally{Ne=r,Mt.transition=n,Ce=t,(Ce&6)===0&&wn()}}function ys(){yt=wr.current,_e(wr)}function Gn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Op(n)),Ae!==null)for(n=Ae.return;n!==null;){var r=n;switch(Ml(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qo();break;case 3:vr(),_e(lt),_e(Xe),$l();break;case 5:Ol(r);break;case 4:vr();break;case 13:_e(ze);break;case 19:_e(ze);break;case 10:zl(r.type._context);break;case 22:case 23:ys()}n=n.return}if(Ve=e,Ae=e=jn(e.current,null),Ke=yt=t,Ue=0,uo=null,cs=yi=Hn=0,ut=co=null,Un!==null){for(t=0;t<Un.length;t++)if(n=Un[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var u=i.next;i.next=o,r.next=u}n.pending=r}Un=null}return e}function kc(e,t){do{var n=Ae;try{if(Ll(),li.current=ci,si){for(var r=Re.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}si=!1}if(Vn=0,qe=Be=Re=null,ro=!1,oo=0,us.current=null,n===null||n.return===null){Ue=1,uo=t,Ae=null;break}e:{var i=e,u=n.return,h=n,g=t;if(t=Ke,h.flags|=32768,g!==null&&typeof g=="object"&&typeof g.then=="function"){var T=g,I=h,$=I.tag;if((I.mode&1)===0&&($===0||$===11||$===15)){var F=I.alternate;F?(I.updateQueue=F.updateQueue,I.memoizedState=F.memoizedState,I.lanes=F.lanes):(I.updateQueue=null,I.memoizedState=null)}var X=Wu(u);if(X!==null){X.flags&=-257,Gu(X,u,h,i,t),X.mode&1&&Hu(i,T,t),t=X,g=T;var J=t.updateQueue;if(J===null){var te=new Set;te.add(g),t.updateQueue=te}else J.add(g);break e}else{if((t&1)===0){Hu(i,T,t),gs();break e}g=Error(s(426))}}else if(Le&&h.mode&1){var Oe=Wu(u);if(Oe!==null){(Oe.flags&65536)===0&&(Oe.flags|=256),Gu(Oe,u,h,i,t),_l(yr(g,h));break e}}i=g=yr(g,h),Ue!==4&&(Ue=2),co===null?co=[i]:co.push(i),i=u;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var E=qu(i,g,t);vu(i,E);break e;case 1:h=g;var k=i.type,M=i.stateNode;if((i.flags&128)===0&&(typeof k.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(Cn===null||!Cn.has(M)))){i.flags|=65536,t&=-t,i.lanes|=t;var U=Vu(i,h,t);vu(i,U);break e}}i=i.return}while(i!==null)}Ec(n)}catch(oe){t=oe,Ae===n&&n!==null&&(Ae=n=n.return);continue}break}while(!0)}function Sc(){var e=vi.current;return vi.current=ci,e===null?ci:e}function gs(){(Ue===0||Ue===3||Ue===2)&&(Ue=4),Ve===null||(Hn&268435455)===0&&(yi&268435455)===0||Mn(Ve,Ke)}function Ci(e,t){var n=Ce;Ce|=2;var r=Sc();(Ve!==e||Ke!==t)&&(ln=null,Gn(e,t));do try{ad();break}catch(o){kc(e,o)}while(!0);if(Ll(),Ce=n,vi.current=r,Ae!==null)throw Error(s(261));return Ve=null,Ke=0,Ue}function ad(){for(;Ae!==null;)Cc(Ae)}function ud(){for(;Ae!==null&&!Df();)Cc(Ae)}function Cc(e){var t=jc(e.alternate,e,yt);e.memoizedProps=e.pendingProps,t===null?Ec(e):Ae=t,us.current=null}function Ec(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=td(n,t,yt),n!==null){Ae=n;return}}else{if(n=nd(n,t),n!==null){n.flags&=32767,Ae=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ue=6,Ae=null;return}}if(t=t.sibling,t!==null){Ae=t;return}Ae=t=e}while(t!==null);Ue===0&&(Ue=5)}function Qn(e,t,n){var r=Ne,o=Mt.transition;try{Mt.transition=null,Ne=1,cd(e,t,n,r)}finally{Mt.transition=o,Ne=r}return null}function cd(e,t,n,r){do kr();while(En!==null);if((Ce&6)!==0)throw Error(s(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(s(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Vf(e,i),e===Ve&&(Ae=Ve=null,Ke=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||wi||(wi=!0,Tc(jo,function(){return kr(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=Mt.transition,Mt.transition=null;var u=Ne;Ne=1;var h=Ce;Ce|=4,us.current=null,od(e,n),mc(n,e),Pp(gl),Do=!!yl,gl=yl=null,e.current=n,id(n),Ff(),Ce=h,Ne=u,Mt.transition=i}else e.current=n;if(wi&&(wi=!1,En=e,xi=o),i=e.pendingLanes,i===0&&(Cn=null),Af(n.stateNode),ct(e,Ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(gi)throw gi=!1,e=ps,ps=null,e;return(xi&1)!==0&&e.tag!==0&&kr(),i=e.pendingLanes,(i&1)!==0?e===ds?fo++:(fo=0,ds=e):fo=0,wn(),null}function kr(){if(En!==null){var e=pa(xi),t=Mt.transition,n=Ne;try{if(Mt.transition=null,Ne=16>e?16:e,En===null)var r=!1;else{if(e=En,En=null,xi=0,(Ce&6)!==0)throw Error(s(331));var o=Ce;for(Ce|=4,Z=e.current;Z!==null;){var i=Z,u=i.child;if((Z.flags&16)!==0){var h=i.deletions;if(h!==null){for(var g=0;g<h.length;g++){var T=h[g];for(Z=T;Z!==null;){var I=Z;switch(I.tag){case 0:case 11:case 15:ao(8,I,i)}var $=I.child;if($!==null)$.return=I,Z=$;else for(;Z!==null;){I=Z;var F=I.sibling,X=I.return;if(uc(I),I===T){Z=null;break}if(F!==null){F.return=X,Z=F;break}Z=X}}}var J=i.alternate;if(J!==null){var te=J.child;if(te!==null){J.child=null;do{var Oe=te.sibling;te.sibling=null,te=Oe}while(te!==null)}}Z=i}}if((i.subtreeFlags&2064)!==0&&u!==null)u.return=i,Z=u;else e:for(;Z!==null;){if(i=Z,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:ao(9,i,i.return)}var E=i.sibling;if(E!==null){E.return=i.return,Z=E;break e}Z=i.return}}var k=e.current;for(Z=k;Z!==null;){u=Z;var M=u.child;if((u.subtreeFlags&2064)!==0&&M!==null)M.return=u,Z=M;else e:for(u=k;Z!==null;){if(h=Z,(h.flags&2048)!==0)try{switch(h.tag){case 0:case 11:case 15:hi(9,h)}}catch(oe){Fe(h,h.return,oe)}if(h===u){Z=null;break e}var U=h.sibling;if(U!==null){U.return=h.return,Z=U;break e}Z=h.return}}if(Ce=o,wn(),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(To,e)}catch{}r=!0}return r}finally{Ne=n,Mt.transition=t}}return!1}function Nc(e,t,n){t=yr(n,t),t=qu(e,t,1),e=kn(e,t,1),t=ot(),e!==null&&(Fr(e,1,t),ct(e,t))}function Fe(e,t,n){if(e.tag===3)Nc(e,e,n);else for(;t!==null;){if(t.tag===3){Nc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Cn===null||!Cn.has(r))){e=yr(n,e),e=Vu(t,e,1),t=kn(t,e,1),e=ot(),t!==null&&(Fr(t,1,e),ct(t,e));break}}t=t.return}}function fd(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ot(),e.pingedLanes|=e.suspendedLanes&n,Ve===e&&(Ke&n)===n&&(Ue===4||Ue===3&&(Ke&130023424)===Ke&&500>Ie()-fs?Gn(e,0):cs|=n),ct(e,t)}function Mc(e,t){t===0&&((e.mode&1)===0?t=1:(t=Po,Po<<=1,(Po&130023424)===0&&(Po=4194304)));var n=ot();e=nn(e,t),e!==null&&(Fr(e,t,n),ct(e,n))}function pd(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Mc(e,n)}function dd(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(s(314))}r!==null&&r.delete(t),Mc(e,n)}var jc;jc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||lt.current)at=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return at=!1,ed(e,t,n);at=(e.flags&131072)!==0}else at=!1,Le&&(t.flags&1048576)!==0&&lu(t,Zo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;di(e,t),e=t.pendingProps;var o=ur(t,Xe.current);hr(t,n),o=Ul(null,t,r,e,o,n);var i=ql();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,st(r)?(i=!0,Ko(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Fl(t),o.updater=fi,t.stateNode=o,o._reactInternals=t,Kl(t,r,e,n),t=Jl(null,t,r,!0,i,n)):(t.tag=0,Le&&i&&Nl(t),rt(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(di(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=hd(r),e=It(r,e),o){case 0:t=Zl(null,t,r,e,n);break e;case 1:t=Ju(null,t,r,e,n);break e;case 11:t=Qu(null,t,r,e,n);break e;case 14:t=Ku(null,t,r,It(r.type,e),n);break e}throw Error(s(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Zl(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Ju(e,t,r,o,n);case 3:e:{if(ec(t),e===null)throw Error(s(387));r=t.pendingProps,i=t.memoizedState,o=i.element,hu(e,t),oi(t,r,null,n);var u=t.memoizedState;if(r=u.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=yr(Error(s(423)),t),t=tc(e,t,r,n,o);break e}else if(r!==o){o=yr(Error(s(424)),t),t=tc(e,t,r,n,o);break e}else for(vt=vn(t.stateNode.containerInfo.firstChild),ht=t,Le=!0,Ft=null,n=du(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(pr(),r===o){t=on(e,t,n);break e}rt(e,t,r,n)}t=t.child}return t;case 5:return gu(t),e===null&&Tl(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,u=o.children,wl(r,o)?u=null:i!==null&&wl(r,i)&&(t.flags|=32),Zu(e,t),rt(e,t,u,n),t.child;case 6:return e===null&&Tl(t),null;case 13:return nc(e,t,n);case 4:return Il(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=dr(t,null,r,n):rt(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Qu(e,t,r,o,n);case 7:return rt(e,t,t.pendingProps,n),t.child;case 8:return rt(e,t,t.pendingProps.children,n),t.child;case 12:return rt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,u=o.value,Me(ti,r._currentValue),r._currentValue=u,i!==null)if(Dt(i.value,u)){if(i.children===o.children&&!lt.current){t=on(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var h=i.dependencies;if(h!==null){u=i.child;for(var g=h.firstContext;g!==null;){if(g.context===r){if(i.tag===1){g=rn(-1,n&-n),g.tag=2;var T=i.updateQueue;if(T!==null){T=T.shared;var I=T.pending;I===null?g.next=g:(g.next=I.next,I.next=g),T.pending=g}}i.lanes|=n,g=i.alternate,g!==null&&(g.lanes|=n),Rl(i.return,n,t),h.lanes|=n;break}g=g.next}}else if(i.tag===10)u=i.type===t.type?null:i.child;else if(i.tag===18){if(u=i.return,u===null)throw Error(s(341));u.lanes|=n,h=u.alternate,h!==null&&(h.lanes|=n),Rl(u,n,t),u=i.sibling}else u=i.child;if(u!==null)u.return=i;else for(u=i;u!==null;){if(u===t){u=null;break}if(i=u.sibling,i!==null){i.return=u.return,u=i;break}u=u.return}i=u}rt(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,hr(t,n),o=Et(o),r=r(o),t.flags|=1,rt(e,t,r,n),t.child;case 14:return r=t.type,o=It(r,t.pendingProps),o=It(r.type,o),Ku(e,t,r,o,n);case 15:return Xu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),di(e,t),t.tag=1,st(r)?(e=!0,Ko(t)):e=!1,hr(t,n),Bu(t,r,o),Kl(t,r,o,n),Jl(null,t,r,!0,e,n);case 19:return oc(e,t,n);case 22:return Yu(e,t,n)}throw Error(s(156,t.tag))};function Tc(e,t){return sa(e,t)}function md(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(e,t,n,r){return new md(e,t,n,r)}function ws(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hd(e){if(typeof e=="function")return ws(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ye)return 11;if(e===xe)return 14}return 2}function jn(e,t){var n=e.alternate;return n===null?(n=jt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ei(e,t,n,r,o,i){var u=2;if(r=e,typeof e=="function")ws(e)&&(u=1);else if(typeof e=="string")u=5;else e:switch(e){case q:return Kn(n.children,o,i,t);case re:u=8,o|=8;break;case K:return e=jt(12,n,t,o|2),e.elementType=K,e.lanes=i,e;case ke:return e=jt(13,n,t,o),e.elementType=ke,e.lanes=i,e;case Se:return e=jt(19,n,t,o),e.elementType=Se,e.lanes=i,e;case Y:return Ni(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ie:u=10;break e;case ae:u=9;break e;case ye:u=11;break e;case xe:u=14;break e;case w:u=16,r=null;break e}throw Error(s(130,e==null?e:typeof e,""))}return t=jt(u,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Kn(e,t,n,r){return e=jt(7,e,r,t),e.lanes=n,e}function Ni(e,t,n,r){return e=jt(22,e,r,t),e.elementType=Y,e.lanes=n,e.stateNode={isHidden:!1},e}function xs(e,t,n){return e=jt(6,e,null,t),e.lanes=n,e}function ks(e,t,n){return t=jt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function vd(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Qi(0),this.expirationTimes=Qi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qi(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ss(e,t,n,r,o,i,u,h,g){return e=new vd(e,t,n,h,g),t===1?(t=1,i===!0&&(t|=8)):t=0,i=jt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fl(i),e}function yd(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:L,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function _c(e){if(!e)return gn;e=e._reactInternals;e:{if(On(e)!==e||e.tag!==1)throw Error(s(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(st(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(s(171))}if(e.tag===1){var n=e.type;if(st(n))return ru(e,n,t)}return t}function Pc(e,t,n,r,o,i,u,h,g){return e=Ss(n,r,!0,e,o,i,u,h,g),e.context=_c(null),n=e.current,r=ot(),o=Nn(n),i=rn(r,o),i.callback=t??null,kn(n,i,o),e.current.lanes=o,Fr(e,o,r),ct(e,r),e}function Mi(e,t,n,r){var o=t.current,i=ot(),u=Nn(o);return n=_c(n),t.context===null?t.context=n:t.pendingContext=n,t=rn(i,u),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=kn(o,t,u),e!==null&&($t(e,o,u,i),ri(e,o,u)),u}function ji(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Lc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Cs(e,t){Lc(e,t),(e=e.alternate)&&Lc(e,t)}function gd(){return null}var zc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Es(e){this._internalRoot=e}Ti.prototype.render=Es.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));Mi(e,t,null,null)},Ti.prototype.unmount=Es.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Wn(function(){Mi(null,e,null,null)}),t[Zt]=null}};function Ti(e){this._internalRoot=e}Ti.prototype.unstable_scheduleHydration=function(e){if(e){var t=ha();e={blockedOn:null,target:e,priority:t};for(var n=0;n<dn.length&&t!==0&&t<dn[n].priority;n++);dn.splice(n,0,e),n===0&&ga(e)}};function Ns(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _i(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Rc(){}function wd(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var T=ji(u);i.call(T)}}var u=Pc(t,r,e,0,null,!1,!1,"",Rc);return e._reactRootContainer=u,e[Zt]=u.current,Kr(e.nodeType===8?e.parentNode:e),Wn(),u}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var h=r;r=function(){var T=ji(g);h.call(T)}}var g=Ss(e,0,!1,null,null,!1,!1,"",Rc);return e._reactRootContainer=g,e[Zt]=g.current,Kr(e.nodeType===8?e.parentNode:e),Wn(function(){Mi(t,g,n,r)}),g}function Pi(e,t,n,r,o){var i=n._reactRootContainer;if(i){var u=i;if(typeof o=="function"){var h=o;o=function(){var g=ji(u);h.call(g)}}Mi(t,u,e,o)}else u=wd(n,t,e,o,r);return ji(u)}da=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Dr(t.pendingLanes);n!==0&&(Ki(t,n|1),ct(t,Ie()),(Ce&6)===0&&(xr=Ie()+500,wn()))}break;case 13:Wn(function(){var r=nn(e,1);if(r!==null){var o=ot();$t(r,e,1,o)}}),Cs(e,1)}},Xi=function(e){if(e.tag===13){var t=nn(e,134217728);if(t!==null){var n=ot();$t(t,e,134217728,n)}Cs(e,134217728)}},ma=function(e){if(e.tag===13){var t=Nn(e),n=nn(e,t);if(n!==null){var r=ot();$t(n,e,t,r)}Cs(e,t)}},ha=function(){return Ne},va=function(e,t){var n=Ne;try{return Ne=e,t()}finally{Ne=n}},O=function(e,t,n){switch(t){case"input":if(Lt(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Go(r);if(!o)throw Error(s(90));De(r),Lt(r,o)}}}break;case"textarea":Nr(e,n);break;case"select":t=n.value,t!=null&&an(e,!!n.multiple,t,!1)}},Eo=vs,ta=Wn;var xd={usingClientEntryPoint:!1,Events:[Zr,sr,Go,nt,Jn,vs]},po={findFiberByHostInstance:An,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},kd={bundleType:po.bundleType,version:po.version,rendererPackageName:po.rendererPackageName,rendererConfig:po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ne.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ia(e),e===null?null:e.stateNode},findFiberByHostInstance:po.findFiberByHostInstance||gd,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Li=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Li.isDisabled&&Li.supportsFiber)try{To=Li.inject(kd),qt=Li}catch{}}return ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xd,ft.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ns(t))throw Error(s(200));return yd(e,t,null,n)},ft.createRoot=function(e,t){if(!Ns(e))throw Error(s(299));var n=!1,r="",o=zc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ss(e,1,!1,null,null,n,!1,r,o),e[Zt]=t.current,Kr(e.nodeType===8?e.parentNode:e),new Es(t)},ft.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=ia(t),e=e===null?null:e.stateNode,e},ft.flushSync=function(e){return Wn(e)},ft.hydrate=function(e,t,n){if(!_i(t))throw Error(s(200));return Pi(null,e,t,!0,n)},ft.hydrateRoot=function(e,t,n){if(!Ns(e))throw Error(s(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",u=zc;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(u=n.onRecoverableError)),t=Pc(t,null,e,1,n??null,o,!1,i,u),e[Zt]=t.current,Kr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Ti(t)},ft.render=function(e,t,n){if(!_i(t))throw Error(s(200));return Pi(null,e,t,!1,n)},ft.unmountComponentAtNode=function(e){if(!_i(e))throw Error(s(40));return e._reactRootContainer?(Wn(function(){Pi(null,null,e,!1,function(){e._reactRootContainer=null,e[Zt]=null})}),!0):!1},ft.unstable_batchedUpdates=vs,ft.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!_i(n))throw Error(s(200));if(e==null||e._reactInternals===void 0)throw Error(s(38));return Pi(e,t,n,!1,r)},ft.version="18.3.1-next-f1338f8080-20240426",ft}var Bc;function _d(){if(Bc)return Ts.exports;Bc=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(a){console.error(a)}}return l(),Ts.exports=Td(),Ts.exports}var Uc;function Pd(){if(Uc)return zi;Uc=1;var l=_d();return zi.createRoot=l.createRoot,zi.hydrateRoot=l.hydrateRoot,zi}var Ld=Pd(),xt=Uint8Array,Cr=Uint16Array,zd=Int32Array,hf=new xt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vf=new xt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Rd=new xt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),yf=function(l,a){for(var s=new Cr(31),c=0;c<31;++c)s[c]=a+=1<<l[c-1];for(var f=new zd(s[30]),c=1;c<30;++c)for(var p=s[c];p<s[c+1];++p)f[p]=p-s[c]<<5|c;return{b:s,r:f}},gf=yf(hf,2),wf=gf.b,Dd=gf.r;wf[28]=258,Dd[258]=28;var Fd=yf(vf,0),Id=Fd.b,Us=new Cr(32768);for(var Pe=0;Pe<32768;++Pe){var _n=(Pe&43690)>>1|(Pe&21845)<<1;_n=(_n&52428)>>2|(_n&13107)<<2,_n=(_n&61680)>>4|(_n&3855)<<4,Us[Pe]=((_n&65280)>>8|(_n&255)<<8)>>1}var go=(function(l,a,s){for(var c=l.length,f=0,p=new Cr(a);f<c;++f)l[f]&&++p[l[f]-1];var v=new Cr(a);for(f=1;f<a;++f)v[f]=v[f-1]+p[f-1]<<1;var y;if(s){y=new Cr(1<<a);var d=15-a;for(f=0;f<c;++f)if(l[f])for(var C=f<<4|l[f],j=a-l[f],N=v[l[f]-1]++<<j,x=N|(1<<j)-1;N<=x;++N)y[Us[N]>>d]=C}else for(y=new Cr(c),f=0;f<c;++f)l[f]&&(y[f]=Us[v[l[f]-1]++]>>15-l[f]);return y}),wo=new xt(288);for(var Pe=0;Pe<144;++Pe)wo[Pe]=8;for(var Pe=144;Pe<256;++Pe)wo[Pe]=9;for(var Pe=256;Pe<280;++Pe)wo[Pe]=7;for(var Pe=280;Pe<288;++Pe)wo[Pe]=8;var xf=new xt(32);for(var Pe=0;Pe<32;++Pe)xf[Pe]=5;var Od=go(wo,9,1),Ad=go(xf,5,1),Ls=function(l){for(var a=l[0],s=1;s<l.length;++s)l[s]>a&&(a=l[s]);return a},bt=function(l,a,s){var c=a/8|0;return(l[c]|l[c+1]<<8)>>(a&7)&s},zs=function(l,a){var s=a/8|0;return(l[s]|l[s+1]<<8|l[s+2]<<16)>>(a&7)},$d=function(l){return(l+7)/8|0},Js=function(l,a,s){return(a==null||a<0)&&(a=0),(s==null||s>l.length)&&(s=l.length),new xt(l.subarray(a,s))},bd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],wt=function(l,a,s){var c=new Error(a||bd[l]);if(c.code=l,Error.captureStackTrace&&Error.captureStackTrace(c,wt),!s)throw c;return c},Bd=function(l,a,s,c){var f=l.length,p=c?c.length:0;if(!f||a.f&&!a.l)return s||new xt(0);var v=!s,y=v||a.i!=2,d=a.i;v&&(s=new xt(f*3));var C=function(dt){var De=s.length;if(dt>De){var kt=new xt(Math.max(De*2,dt));kt.set(s),s=kt}},j=a.f||0,N=a.p||0,x=a.b||0,_=a.l,z=a.d,P=a.m,D=a.n,A=f*8;do{if(!_){j=bt(l,N,1);var ee=bt(l,N+1,3);if(N+=3,ee)if(ee==1)_=Od,z=Ad,P=9,D=5;else if(ee==2){var L=bt(l,N,31)+257,q=bt(l,N+10,15)+4,re=L+bt(l,N+5,31)+1;N+=14;for(var K=new xt(re),ie=new xt(19),ae=0;ae<q;++ae)ie[Rd[ae]]=bt(l,N+ae*3,7);N+=q*3;for(var ye=Ls(ie),ke=(1<<ye)-1,Se=go(ie,ye,1),ae=0;ae<re;){var xe=Se[bt(l,N,ke)];N+=xe&15;var G=xe>>4;if(G<16)K[ae++]=G;else{var w=0,Y=0;for(G==16?(Y=3+bt(l,N,3),N+=2,w=K[ae-1]):G==17?(Y=3+bt(l,N,7),N+=3):G==18&&(Y=11+bt(l,N,127),N+=7);Y--;)K[ae++]=w}}var b=K.subarray(0,L),W=K.subarray(L);P=Ls(b),D=Ls(W),_=go(b,P,1),z=go(W,D,1)}else wt(1);else{var G=$d(N)+4,ne=l[G-4]|l[G-3]<<8,he=G+ne;if(he>f){d&&wt(0);break}y&&C(x+ne),s.set(l.subarray(G,he),x),a.b=x+=ne,a.p=N=he*8,a.f=j;continue}if(N>A){d&&wt(0);break}}y&&C(x+131072);for(var V=(1<<P)-1,S=(1<<D)-1,R=N;;R=N){var w=_[zs(l,N)&V],H=w>>4;if(N+=w&15,N>A){d&&wt(0);break}if(w||wt(2),H<256)s[x++]=H;else if(H==256){R=N,_=null;break}else{var le=H-254;if(H>264){var ae=H-257,ue=hf[ae];le=bt(l,N,(1<<ue)-1)+wf[ae],N+=ue}var me=z[zs(l,N)&S],ve=me>>4;me||wt(3),N+=me&15;var W=Id[ve];if(ve>3){var ue=vf[ve];W+=zs(l,N)&(1<<ue)-1,N+=ue}if(N>A){d&&wt(0);break}y&&C(x+131072);var B=x+le;if(x<W){var ge=p-W,je=Math.min(W,B);for(ge+x<0&&wt(3);x<je;++x)s[x]=c[ge+x]}for(;x<B;++x)s[x]=s[x-W]}}a.l=_,a.p=R,a.b=x,a.f=j,_&&(j=1,a.m=P,a.d=z,a.n=D)}while(!j);return x!=s.length&&v?Js(s,0,x):s.subarray(0,x)},Ud=new xt(0),Kt=function(l,a){return l[a]|l[a+1]<<8},Tt=function(l,a){return(l[a]|l[a+1]<<8|l[a+2]<<16|l[a+3]<<24)>>>0},Rs=function(l,a){return Tt(l,a)+Tt(l,a+4)*4294967296};function qd(l,a){return Bd(l,{i:2},a&&a.out,a&&a.dictionary)}var qs=typeof TextDecoder<"u"&&new TextDecoder,Vd=0;try{qs.decode(Ud,{stream:!0}),Vd=1}catch{}var Hd=function(l){for(var a="",s=0;;){var c=l[s++],f=(c>127)+(c>223)+(c>239);if(s+f>l.length)return{s:a,r:Js(l,s-1)};f?f==3?(c=((c&15)<<18|(l[s++]&63)<<12|(l[s++]&63)<<6|l[s++]&63)-65536,a+=String.fromCharCode(55296|c>>10,56320|c&1023)):f&1?a+=String.fromCharCode((c&31)<<6|l[s++]&63):a+=String.fromCharCode((c&15)<<12|(l[s++]&63)<<6|l[s++]&63):a+=String.fromCharCode(c)}};function Ai(l,a){if(a){for(var s="",c=0;c<l.length;c+=16384)s+=String.fromCharCode.apply(null,l.subarray(c,c+16384));return s}else{if(qs)return qs.decode(l);var f=Hd(l),p=f.s,s=f.r;return s.length&&wt(8),p}}var Wd=function(l,a){return a+30+Kt(l,a+26)+Kt(l,a+28)},Gd=function(l,a,s){var c=Kt(l,a+28),f=Kt(l,a+30),p=Ai(l.subarray(a+46,a+46+c),!(Kt(l,a+8)&2048)),v=a+46+c,y=Qd(l,v,f,s,Tt(l,a+20),Tt(l,a+24),Tt(l,a+42)),d=y[0],C=y[1],j=y[2];return[Kt(l,a+10),d,C,p,v+f+Kt(l,a+32),j]},Qd=function(l,a,s,c,f,p,v){var y=f==4294967295,d=p==4294967295,C=v==4294967295,j=a+s,N=y+d+C;if(c&&N){for(;a+4<j;a+=4+Kt(l,a+2))if(Kt(l,a)==1)return[y?Rs(l,a+4+8*d):f,d?Rs(l,a+4):p,C?Rs(l,a+4+8*(d+y)):v,1];c<2&&wt(13)}return[f,p,v,0]};function Kd(l,a){for(var s={},c=l.length-22;Tt(l,c)!=101010256;--c)(!c||l.length-c>65558)&&wt(13);var f=Kt(l,c+8);if(!f)return{};var p=Tt(l,c+16),v=Tt(l,c-20)==117853008;if(v){var y=Tt(l,c-12);v=Tt(l,y)==101075792,v&&(f=Tt(l,y+32),p=Tt(l,y+48))}for(var d=0;d<f;++d){var C=Gd(l,p,v),j=C[0],N=C[1],x=C[2],_=C[3],z=C[4],P=C[5],D=Wd(l,P);p=z,j?j==8?s[_]=qd(l.subarray(D,D+N),{out:new xt(x)}):wt(14,"unknown compression type "+j):s[_]=Js(l,D,D+N)}return s}const Xd=[80,75,3,4];function Yd(l){return Xd.every((a,s)=>l[s]===a)}function Vs(l){return l.charCodeAt(0)===65279?l.slice(1):l}function Zd(l){const a=Kd(l),s=Object.keys(a),c=s.find(p=>p.toLowerCase().endsWith("meta-inf/container.xml"));if(c){const p=new DOMParser().parseFromString(Ai(a[c]),"application/xml");for(const v of Array.from(p.getElementsByTagName("rootfile"))){const y=v.getAttribute("full-path");if(!y)continue;const d=s.find(C=>C===y)??s.find(C=>C.endsWith(y));if(d)return Vs(Ai(a[d]))}}const f=s.find(p=>!p.toLowerCase().startsWith("meta-inf/")&&/\.(musicxml|xml)$/i.test(p));if(f)return Vs(Ai(a[f]));throw new Error("This .mxl archive does not contain a MusicXML score.")}function Jd(l){return l.replace(/\.(musicxml|xml|mxl|midi?|kar)$/i,"")||"score"}const Ui=["C","D","E","F","G","A","B"],Hs={S:"Soprano",A:"Alto",T:"Tenor",B:"Bass"},em={s1upper:"Staff 1 · upper",s1lower:"Staff 1 · lower",s2upper:"Staff 2 · upper",s2lower:"Staff 2 · lower"};function xo(l){const a=[0,2,4,5,7,9,11][Ui.indexOf(l.step)];return(l.octave+1)*12+a+l.alter}function tm(l){return l.octave*7+Ui.indexOf(l.step)}function _t(l,a){const s=[];for(const c of Array.from(l.children))c.tagName===a&&s.push(c);return s}function We(l,a){if(!l)return null;for(const s of Array.from(l.children))if(s.tagName===a)return s;return null}function Ge(l,a){const s=We(l,a);return s?(s.textContent??"").trim():void 0}function gt(l,a){const s=Ge(l,a);if(s===void 0||s==="")return;const c=Number(s);return Number.isFinite(c)?c:void 0}function ho(l,a){return l.getElementsByTagName(a)[0]??null}function nm(l,a){for(;a;)[l,a]=[a,l%a];return l}function rm(l,a){return!l||!a?l||a:Math.abs(l/nm(l,a)*a)}const om={breve:8,whole:4,half:2,quarter:1,eighth:.5,"16th":.25,"32nd":.125,"64th":.0625};function im(l,a,s){return{onset:l,duration:a,pitches:[],dots:0,tieStart:!1,tieStop:!1,slurStart:!1,slurStop:!1,fermata:!1,articulations:[],accidentals:[],lyrics:[],grace:!1,graceSlash:!1,cue:!1,measureRest:!1,staff:s}}function lm(l){const a=[],s=new DOMParser().parseFromString(l,"application/xml"),c=s.getElementsByTagName("parsererror")[0];if(c)throw new Error(`This file is not valid XML. ${(c.textContent??"").slice(0,200)}`);const f=s.documentElement;if(!f)throw new Error("Empty document.");if(f.tagName==="score-timewise")throw new Error("This is a time-wise MusicXML file. Re-export as part-wise MusicXML (every notation app does this by default).");if(f.tagName!=="score-partwise")throw new Error(`Expected a MusicXML score but the document root is <${f.tagName}>. Export the piece as MusicXML (.musicxml, .xml or .mxl) and try again.`);const p=Ge(ho(s,"work"),"work-title")||(ho(s,"movement-title")?.textContent??"").trim()||void 0,v=Ge(ho(s,"work"),"work-number")||void 0;let y,d;const C=ho(s,"identification");if(C)for(const L of _t(C,"creator")){const q=(L.getAttribute("type")??"").toLowerCase(),re=(L.textContent??"").trim();re&&(q==="composer"&&!y?y=re:(q==="lyricist"||q==="poet")&&!d?d=re:!y&&!q&&(y=re))}const j=new Map,N=ho(s,"part-list");if(N)for(const L of _t(N,"score-part")){const q=L.getAttribute("id")??"",re=Ge(L,"part-name")||Ge(L,"part-abbreviation")||Ge(We(L,"score-instrument"),"instrument-name")||q;j.set(q,re)}let x=1;for(const L of Array.from(s.getElementsByTagName("divisions"))){const q=Number((L.textContent??"").trim());Number.isFinite(q)&&q>0&&(x=rm(x,Math.round(q)))}(!Number.isFinite(x)||x<=0||x>1e6)&&(a.push("Unusual <divisions> values in the source; timing was rounded."),x=768);const _=_t(f,"part");if(_.length===0)throw new Error("The score contains no parts.");const z=[],P=new Map,D=new Map,A=new Map;function ee(L){for(;z.length<=L;)z.push({index:z.length,number:String(z.length+1),repeatForward:!1,repeatBackward:null,endings:[],implicit:!1,newSystem:!1,newPage:!1,length:0});return z[L]}const G=new Map;for(const L of _){const q=L.getAttribute("id")??`P${_.length}`,re=j.get(q)??q,K=L===_[0];let ie=1,ae=x,ye=0,ke;_t(L,"measure").forEach((xe,w)=>{const Y=ee(w),b=xe.getAttribute("number");K&&b&&(Y.number=b),xe.getAttribute("implicit")==="yes"&&(Y.implicit=!0);let W=0,V=0;const S=new Map,R=H=>{const le=`${q} ${H}`;let ue=P.get(le);for(ue||(ue={partId:q,partName:re,voice:H,transpose:ye,measures:[]},P.set(le,ue)),ue.transpose=ye;ue.measures.length<=w;)ue.measures.push([]);return ue};for(const H of Array.from(xe.children))switch(H.tagName){case"attributes":{const le=gt(H,"divisions");le&&le>0&&(ie=le,ae=x/ie);const ue=We(H,"key");if(ue){const B=gt(ue,"fifths");B!==void 0&&!Y.key&&(Y.key={fifths:B,mode:Ge(ue,"mode")})}const me=We(H,"time");if(me){const B=Number(Ge(me,"beats")??""),ge=Number(Ge(me,"beat-type")??"");Number.isFinite(B)&&Number.isFinite(ge)&&B>0&&ge>0&&(ke={beats:B,beatType:ge,symbol:me.getAttribute("symbol")??void 0},Y.time||(Y.time=ke))}const ve=We(H,"transpose");ve&&(ye=(gt(ve,"chromatic")??0)+(gt(ve,"octave-change")??0)*12);break}case"print":{H.getAttribute("new-system")==="yes"&&(Y.newSystem=!0),H.getAttribute("new-page")==="yes"&&(Y.newPage=!0);break}case"backup":{W-=(gt(H,"duration")??0)*ae,W<0&&(W=0);break}case"forward":{W+=(gt(H,"duration")??0)*ae,V=Math.max(V,W);break}case"direction":{cm(H,Y,G,w,ae,W);break}case"sound":{const le=Number(H.getAttribute("tempo")??"");Number.isFinite(le)&&le>0&&Y.tempo===void 0&&(Y.tempo=le);break}case"barline":{um(H,Y);break}case"note":{const le=Ge(H,"voice")||"1",ue=Math.max(1,Math.round(gt(H,"staff")??1)),ve=R(le).measures[w],B=We(H,"chord")!==null,ge=We(H,"grace"),je=ge!==null,dt=je?0:(gt(H,"duration")??0)*ae;if(B){const tt=S.get(le);if(tt){qc(H,tt);break}}const De=im(W,dt,ue);De.grace=je,De.graceSlash=je&&ge?.getAttribute("slash")==="yes",De.cue=We(H,"cue")!==null,De.noteType=Ge(H,"type"),De.dots=_t(H,"dot").length;const kt=We(H,"rest");kt?De.measureRest=kt.getAttribute("measure")==="yes":qc(H,De);const Yt=We(H,"time-modification");if(Yt){const tt=gt(Yt,"actual-notes"),Lt=gt(Yt,"normal-notes");tt&&Lt&&(De.timeMod={actual:tt,normal:Lt})}for(const tt of _t(H,"tie"))tt.getAttribute("type")==="start"&&(De.tieStart=!0),tt.getAttribute("type")==="stop"&&(De.tieStop=!0);const zn=We(H,"notations");zn&&sm(zn,De);for(const tt of _t(H,"lyric")){const Lt=am(tt);Lt&&De.lyrics.push(Lt)}ve.push(De),S.set(le,De),je||(W+=dt,V=Math.max(V,W));break}}if(ke){const H=ke.beats*x*4/ke.beatType;A.set(w,Math.max(A.get(w)??0,H))}D.set(w,Math.max(D.get(w)??0,V))})}if(z.length===0)throw new Error("The score contains no measures.");let ne=x*4;for(const L of z){const q=A.get(L.index)??0;q>0&&(ne=q);const re=D.get(L.index)??0,K=L.implicit||L.number==="0";L.length=K&&re>0?re:Math.max(ne,re)}for(const[L,q]of G){const re=z[L];re&&(re.directions=q)}const he=fm(P,z,a);if(he.length===0)throw new Error("No notes were found in this score.");return{divisions:x,measures:z,streams:he,title:p,subtitle:v,composer:y,lyricist:d,warnings:a}}function qc(l,a){const s=We(l,"pitch");if(!s)return;const c=(Ge(s,"step")??"C").toUpperCase(),f=Ui.includes(c)?c:"C",p=Math.round(gt(s,"octave")??4),v=Math.round(gt(s,"alter")??0);a.pitches.push({step:f,alter:v,octave:p}),a.accidentals.push(Ge(l,"accidental"))}function sm(l,a){for(const c of _t(l,"tied"))c.getAttribute("type")==="start"&&(a.tieStart=!0),c.getAttribute("type")==="stop"&&(a.tieStop=!0);for(const c of _t(l,"slur"))c.getAttribute("type")==="start"&&(a.slurStart=!0),c.getAttribute("type")==="stop"&&(a.slurStop=!0);We(l,"fermata")&&(a.fermata=!0);for(const c of _t(l,"tuplet")){const f=c.getAttribute("type");(f==="start"||f==="stop")&&(a.tuplet=f)}const s=We(l,"articulations");if(s)for(const c of Array.from(s.children))a.articulations.push(c.tagName)}function am(l){const a=Ge(l,"text"),s=We(l,"extend")!==null;if(!a&&!s)return null;const c=l.getAttribute("number")??"1",f=Math.max(1,Math.round(Number(c.replace(/\D+/g,""))||1)),p=Ge(l,"syllabic");return{verse:f,syllabic:p,text:a??"",extend:s}}function um(l,a){const s=l.getAttribute("location")??"right",c=Ge(l,"bar-style");c&&(s==="left"?a.barStyleLeft=c:a.barStyleRight=c);const f=We(l,"repeat");if(f){const v=f.getAttribute("direction");if(v==="forward"&&(a.repeatForward=!0),v==="backward"){const y=Number(f.getAttribute("times")??"2");a.repeatBackward=Number.isFinite(y)&&y>=2?Math.round(y):2}}const p=We(l,"ending");if(p){const v=p.getAttribute("type"),y=(p.getAttribute("number")??"").split(/[,\s]+/).map(d=>Number(d)).filter(d=>Number.isFinite(d)&&d>0);if(v==="start"||v==="stop"||v==="discontinue"){const d={numbers:y.length?y:[1],type:v,location:s==="left"?"left":"right"};a.endings.some(C=>C.type===d.type&&C.location===d.location)||a.endings.push(d)}}}function cm(l,a,s,c,f,p){const v=l.getAttribute("placement")??void 0,y=Math.max(0,p+(gt(l,"offset")??0)*f),d=We(l,"sound"),C=d?Number(d.getAttribute("tempo")??""):NaN;Number.isFinite(C)&&C>0&&a.tempo===void 0&&(a.tempo=C);const j=N=>{const x=s.get(c)??[];x.push(N),s.set(c,x)};for(const N of _t(l,"direction-type"))for(const x of Array.from(N.children))if(x.tagName==="metronome"){const _=Ge(x,"beat-unit")??"quarter",z=_t(x,"beat-unit-dot").length,P=Number((Ge(x,"per-minute")??"").replace(/[^\d.]/g,"")),D=(om[_]??1)*1.5**z;Number.isFinite(P)&&P>0&&(a.tempo===void 0&&(a.tempo=P*D),a.tempoText||(a.tempoText=`${_}${".".repeat(z)} = ${Math.round(P)}`))}else if(x.tagName==="words"||x.tagName==="rehearsal"){const _=(x.textContent??"").trim();_&&j({onset:y,kind:x.tagName==="words"?"words":"rehearsal",text:_,placement:v})}else if(x.tagName==="dynamics"){const _=Array.from(x.children).map(z=>z.tagName).filter(z=>z!=="other-dynamics").join("");_&&j({onset:y,kind:"dynamics",text:_,placement:v??"below"})}}function fm(l,a,s){const c=[];for(const p of l.values()){for(;p.measures.length<a.length;)p.measures.push([]);const v=new Map;let y=0;for(const j of p.measures)for(const N of j)N.pitches.length&&(v.set(N.staff,(v.get(N.staff)??0)+1),y++);const d=[...v.entries()].sort((j,N)=>N[1]-j[1]);if(d.length>1&&d.slice(1).some(([,j])=>j/Math.max(1,y)>=.25))for(const j of d.map(([N])=>N).sort((N,x)=>N-x))c.push(Vc(`${p.partId}/${p.voice}/s${j}`,p,j,p.measures.map(N=>N.filter(x=>x.staff===j)),a));else c.push(Vc(`${p.partId}/${p.voice}`,p,d[0]?.[0]??1,p.measures,a))}const f=c.filter(p=>p.noteCount>0);return f.sort((p,v)=>v.avgMidi-p.avgMidi),f.length<4&&s.push(`Only ${f.length} voice${f.length===1?"":"s"} found, fewer than the four expected for SATB. Check the voice assignment below.`),f}function Vc(l,a,s,c,f){const p=[];let v=0,y=0,d=1/0,C=-1/0;for(let j=0;j<f.length;j++){const N=(c[j]??[]).slice();N.sort((P,D)=>P.onset-D.onset);const x=[];let _=0;for(const P of N){if(P.grace){x.push(Hc(P));continue}P.onset>_+1e-6&&x.push(Ds(_,P.onset-_)),x.push(Hc(P)),_=Math.max(_,P.onset+P.duration);for(const D of P.pitches){const A=xo(D);v+=A,y++,A<d&&(d=A),A>C&&(C=A)}}const z=f[j].length;if(x.length===0){const P=Ds(0,z);P.measureRest=!0,x.push(P)}else _<z-1e-6&&x.push(Ds(_,z-_));p.push(x)}return{key:l,partId:a.partId,partName:a.partName,staff:s,voice:a.voice,measures:p,noteCount:y,avgMidi:y?v/y:0,minMidi:y?d:0,maxMidi:y?C:0,transpose:a.transpose}}function Hc(l){const{staff:a,...s}=l;return s}function Ds(l,a){return{onset:l,duration:a,pitches:[],dots:0,tieStart:!1,tieStop:!1,slurStart:!1,slurStop:!1,fermata:!1,articulations:[],accidentals:[],lyrics:[],grace:!1,graceSlash:!1,cue:!1,measureRest:!1}}const pm=768,Fs={quantize:16,includePercussion:!1},dm=[{value:0,label:"Off"},{value:4,label:"1/4"},{value:8,label:"1/8"},{value:16,label:"1/16"},{value:32,label:"1/32"}];function mm(l){return l.length>4&&l[0]===77&&l[1]===84&&l[2]===104&&l[3]===100}function hm(l){const a=new DataView(l.buffer,l.byteOffset,l.byteLength),s=(C,j)=>String.fromCharCode(...l.subarray(C,C+j));if(l.length<14||s(0,4)!=="MThd")throw new Error("This is not a MIDI file (no MThd header).");const c=a.getUint32(4),f=a.getUint16(10),p=a.getUint16(12);if(p&32768)throw new Error("This MIDI file is timed in SMPTE frames rather than musical beats, so it has no note values to notate.");const y={ppq:p||480,notes:[],tempos:[],timeSignatures:[],keySignatures:[],trackNames:[],endTick:0};let d=8+c;for(let C=0;C<f&&d+8<=l.length&&s(d,4)==="MTrk";C++){const j=a.getUint32(d+4),N=Math.min(l.length,d+8+j);let x=d+8,_=0,z=0;const P=new Map,D=()=>{let A=0;for(let ee=0;ee<4&&x<N;ee++){const G=l[x++];if(A=A<<7|G&127,(G&128)===0)break}return A};for(;x<N;){_+=D();let A=l[x];if(A&128?x++:A=z,A===255){const ne=l[x++],he=D(),L=l.subarray(x,x+he);if(x+=he,z=0,ne===3&&L.length)y.trackNames[C]=new TextDecoder().decode(L).trim();else if(ne===81&&L.length>=3){const q=L[0]<<16|L[1]<<8|L[2];q>0&&y.tempos.push({tick:_,qpm:6e7/q})}else if(ne===88&&L.length>=2)y.timeSignatures.push({tick:_,beats:L[0]||4,beatType:2**L[1]||4});else if(ne===89&&L.length>=2){const q=L[0]<<24>>24;y.keySignatures.push({tick:_,fifths:q,minor:L[1]===1})}else if(ne===47)break;continue}if(A===240||A===247){x+=D(),z=0;continue}z=A;const ee=A&240,G=A&15;if(ee===144||ee===128){const ne=l[x++],he=l[x++],L=G<<8|ne;if(ee===144&&he>0){const q=P.get(L);q?q.push(_):P.set(L,[_])}else{const re=P.get(L)?.shift();re!==void 0&&_>re&&y.notes.push({track:C,channel:G,midi:ne,start:re,end:_})}}else ee===192||ee===208?x+=1:x+=2}for(const[A,ee]of P)for(const G of ee)_>G&&y.notes.push({track:C,channel:A>>8&15,midi:A&255,start:G,end:_});y.endTick=Math.max(y.endTick,_),d=d+8+j}if(y.notes.length===0)throw new Error("This MIDI file contains no notes.");y.notes.sort((C,j)=>C.start-j.start||j.midi-C.midi);for(const C of[y.tempos,y.timeSignatures,y.keySignatures])C.sort((j,N)=>j.tick-N.tick);return y}const vm=[[0,0],[0,1],[1,0],[1,1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,0],[5,1],[6,0]],ym=[[0,0],[1,-1],[1,0],[2,-1],[2,0],[3,0],[4,-1],[4,0],[5,-1],[5,0],[6,-1],[6,0]];function gm(l,a){const s=a<0?ym:vm,[c,f]=s[(l%12+12)%12];return{step:Ui[c],alter:f,octave:Math.floor(l/12)-1}}function wm(l){const a=new Array(12).fill(0);for(const p of l)a[(p.midi%12+12)%12]++;const s=[0,2,4,5,7,9,11];let c=0,f=-1/0;for(let p=-7;p<=7;p++){const v=(p*7%12+12)%12;let y=0;for(const d of s)y+=a[(v+d)%12];y-=Math.abs(p)*.01,y>f&&(f=y,c=p)}return c}function xm(l,a=8){const s=new Map;for(const p of l){const v=s.get(p.start);v?v.push(p):s.set(p.start,[p])}const c=[],f=[];for(const p of[...s.keys()].sort((v,y)=>v-y)){const v=s.get(p).slice().sort((d,C)=>C.midi-d.midi),y=c.map((d,C)=>C).filter(d=>f[d]<=p);for(const d of v){let C=y.shift();if(C===void 0)if(c.length<a)c.push([]),f.push(0),C=c.length-1;else{C=f.indexOf(Math.min(...f));const j=c[C][c[C].length-1];j&&j.end>p&&(j.end=p)}c[C].push(d),f[C]=d.end}}return c.filter(p=>p.length>0)}function Ri(l,a,s=!1){return{onset:l,duration:a,pitches:[],dots:0,tieStart:!1,tieStop:!1,slurStart:!1,slurStop:!1,fermata:!1,articulations:[],accidentals:[],lyrics:[],grace:!1,graceSlash:!1,cue:!1,measureRest:s}}function km(l,a){const s=hm(l),c=[],f=pm,p=L=>L*f/s.ppq,v=a.quantize>0?f*4/a.quantize:0,y=L=>v>0?Math.round(L/v)*v:Math.round(L),d=v>0?v:f/16;let C=s.notes.filter(L=>a.includePercussion||L.channel!==9).map(L=>{const q=y(p(L.start)),re=Math.max(q+d,y(p(L.end)));return{...L,start:q,end:re}});if(C.length===0)throw new Error(s.notes.length>0?"This MIDI file only contains a drum track, which cannot be notated as voices.":"This MIDI file contains no notes.");s.notes.length!==C.length&&c.push("A percussion channel was skipped.");const j=Math.max(...C.map(L=>L.end),y(p(s.endTick))),N=s.timeSignatures.length?s.timeSignatures.map(L=>({...L,at:y(p(L.tick))})):[{tick:0,beats:4,beatType:4,at:0}];N[0].at>0&&N.unshift({tick:0,beats:4,beatType:4,at:0});const x=s.keySignatures.length?s.keySignatures[0].fifths:wm(C);s.keySignatures.length||c.push("The file has no key signature, so one was inferred from the notes.");const _=[],z=[];let P=0,D=0,A={beats:0,beatType:0},ee=0;for(;P<j-1&&ee++<2e4;){for(;D+1<N.length&&N[D+1].at<=P;)D++;const L=N[D],q=Math.max(f,L.beats*f*4/L.beatType),re=_.length,K=L.beats!==A.beats||L.beatType!==A.beatType;A={beats:L.beats,beatType:L.beatType};const ie=s.tempos.filter(ye=>y(p(ye.tick))<=P).pop(),ae=s.tempos.find(ye=>y(p(ye.tick))>=P&&y(p(ye.tick))<P+q);_.push({index:re,number:String(re+1),key:re===0?{fifths:x}:void 0,time:K?{beats:L.beats,beatType:L.beatType}:void 0,tempo:re===0?ie?.qpm??s.tempos[0]?.qpm??100:ae?.qpm,repeatForward:!1,repeatBackward:null,endings:[],implicit:!1,newSystem:!1,newPage:!1,length:q}),z.push(P),P+=q}_.length===0&&(_.push({index:0,number:"1",key:{fifths:x},time:{beats:4,beatType:4},tempo:s.tempos[0]?.qpm??100,repeatForward:!1,repeatBackward:null,endings:[],implicit:!1,newSystem:!1,newPage:!1,length:f*4}),z.push(0));const G=new Map;for(const L of C){const q=`${L.track}:${L.channel}`,re=G.get(q);re?re.push(L):G.set(q,[L])}const ne=[];for(const[L,q]of G){const[re,K]=L.split(":").map(Number),ie=s.trackNames[re]||(G.size>1?`Track ${re+1}${K?` ch${K+1}`:""}`:"MIDI"),ae=xm(q.map(ye=>({midi:ye.midi,start:ye.start,end:ye.end})));ae.forEach((ye,ke)=>{ne.push(Sm(ae.length>1?`${L}/${ke+1}`:L,ae.length>1?`${ie} ${ke+1}`:ie,String(ke+1),ye,_,z,x))})}ne.sort((L,q)=>q.avgMidi-L.avgMidi),ne.length<4&&c.push(`Only ${ne.length} line${ne.length===1?"":"s"} could be separated out of this MIDI file.`);const he=(s.trackNames.find(L=>L&&!/^(track|piano|midi)/i.test(L))??"").trim();return{divisions:f,measures:_,streams:ne,title:he||void 0,warnings:c}}function Sm(l,a,s,c,f,p,v){const y=c.slice().sort((P,D)=>P.start-D.start),d=[];for(const P of y){const D=d[d.length-1];D&&P.start<D.end&&(D.end=P.start),P.end>P.start&&d.push({...P})}const C=[];let j=0,N=0,x=1/0,_=-1/0,z=0;return f.forEach((P,D)=>{const A=p[D],ee=A+P.length,G=[];let ne=0;for(;z<d.length&&d[z].end<=A;)z++;for(let he=z;he<d.length&&d[he].start<ee;he++){const L=d[he],q=Math.max(0,L.start-A),re=Math.min(P.length,L.end-A);if(re-q<1)continue;q>ne&&G.push(Ri(ne,q-ne));const K=gm(L.midi,v);G.push({...Ri(q,re-q),pitches:[K],accidentals:[void 0],tieStop:L.start<A,tieStart:L.end>ee}),ne=re;const ie=xo(K);j+=ie,N++,ie<x&&(x=ie),ie>_&&(_=ie)}G.length===0?G.push(Ri(0,P.length,!0)):ne<P.length&&G.push(Ri(ne,P.length-ne)),C.push(G)}),{key:l,partId:l,partName:a,staff:1,voice:s,measures:C,noteCount:N,avgMidi:N?j/N:0,minMidi:N?x:0,maxMidi:N?_:0,transpose:0}}async function Cm(l){const a=new Uint8Array(await l.arrayBuffer());if(mm(a))return{kind:"midi",name:l.name,bytes:a};if(Yd(a))return{kind:"musicxml",name:l.name,xml:Zd(a)};const s=Vs(new TextDecoder("utf-8").decode(a));if(/^\s*(<\?xml|<!DOCTYPE|<score-)/.test(s.slice(0,200)))return{kind:"musicxml",name:l.name,xml:s};throw new Error(`"${l.name}" is neither MusicXML nor a MIDI file. Export the piece as .musicxml, .mxl or .mid and try again.`)}function Wc(l,a){return l.kind==="midi"?km(l.bytes,a):lm(l.xml)}const Em=[{role:"S",re:/\b(sopran[oa]?|sopraan|sopran|cantus|canto|superius|discant|descant|treble|dessus|s\.?)\b/i},{role:"A",re:/\b(alt[oi]?|altus|contralto|contra-?alt[oa]?|mezzo|haute-?contre|a\.?)\b/i},{role:"T",re:/\b(tenor[ei]?|tenore|tenuto-?voice|taille|t\.?)\b/i},{role:"B",re:/\b(bass?[oi]?|bas|bassus|bariton[e]?|basse|b\.?)\b/i}];function Gc(l){const a=l.replace(/[_\-.]+/g," ").trim();if(!a)return null;const s=new Set;for(const{role:c,re:f}of Em)f.test(a)&&s.add(c);return s.size===1?[...s][0]:null}function Is(l){const a=new Map;if(l.length===0)return a;const s=l.map(d=>({stream:d,role:Gc(`${d.partName} ${d.voice}`)??Gc(d.partName)})),c=new Map;for(const d of s)d.role&&c.set(d.role,(c.get(d.role)??0)+1);if(s.filter(d=>d.role).length>=Math.min(4,l.length)&&[...c.values()].every(d=>d===1))for(const d of s)d.role&&a.set(d.stream.key,d.role);const v=["S","A","T","B"].filter(d=>![...a.values()].includes(d));return l.filter(d=>!a.has(d.key)).sort((d,C)=>C.avgMidi-d.avgMidi).forEach((d,C)=>{C<v.length&&a.set(d.key,v[C])}),a}function kf(l){let a=0,s=0;for(const c of l.measures)for(const f of c)f.pitches.length&&(s++,f.pitches.length>=2&&a++);return s?a/s:0}function Nm(l,a,s){if(!l.pitches.length)return{...l,lyrics:s?l.lyrics:[]};const c=l.pitches.map((p,v)=>({p,i:v,m:xo(p)}));c.sort((p,v)=>p.m-v.m);const f=a==="upper"?c[c.length-1]:c[0];return{...l,pitches:[f.p],accidentals:[l.accidentals[f.i]],lyrics:s?l.lyrics:[]}}function Qc(l,a){const s=l.measures.map(y=>y.map(d=>Nm(d,a,a==="upper")));let c=0,f=0,p=1/0,v=-1/0;for(const y of s)for(const d of y)for(const C of d.pitches){const j=xo(C);c+=j,f++,j<p&&(p=j),j>v&&(v=j)}return{...l,key:`${l.key}#${a}`,partName:`${l.partName} (${a})`,measures:s,noteCount:f,avgMidi:f?c/f:0,minMidi:f?p:0,maxMidi:f?v:0,derivedFrom:{key:l.key,role:a}}}function Kc(l){const a=l.streams.filter(c=>kf(c)>=.5);if(a.length===0)return l;const s=[];for(const c of l.streams)a.includes(c)?s.push(Qc(c,"upper"),Qc(c,"lower")):s.push(c);return s.sort((c,f)=>f.avgMidi-c.avgMidi),{...l,streams:s}}function Os(l){return l.streams.length<4&&l.streams.some(a=>kf(a)>=.5)}const bi=[{id:"SA_TB",label:"S + A  /  T + B",hint:"The default: women above, men below, as in a closed score",roles:["S","A","T","B"]},{id:"ST_AB",label:"S + T  /  A + B",hint:"Soprano over tenor, alto over bass",roles:["S","T","A","B"]},{id:"SB_AT",label:"S + B  /  A + T",hint:"Outer voices above, inner voices below",roles:["S","B","A","T"]}],Mm="SA_TB";function As(l,a,s){const c=new Map;for(const z of l){const P=a.get(z.key);P&&!c.has(P)&&c.set(P,z.key)}const[f,p,v,y]=(bi.find(z=>z.id===s)??bi[0]).roles,d=z=>c.get(z)??null,C=(z,P)=>{const D=l.find(ee=>ee.key===z),A=l.find(ee=>ee.key===P);return D&&A&&A.avgMidi>D.avgMidi?[P,z]:[z,P]},[j,N]=C(d(f),d(p)),[x,_]=C(d(v),d(y));return{s1upper:j,s1lower:N,s2upper:x,s2lower:_}}const Bi=[{id:"G2",label:"Treble",sign:"G",line:2,octaveChange:0,middle:34,bias:1,auto:!0},{id:"F4",label:"Bass",sign:"F",line:4,octaveChange:0,middle:22,bias:1,auto:!0},{id:"C3",label:"Alto",sign:"C",line:3,octaveChange:0,middle:28,bias:1.6,auto:!1},{id:"C4",label:"Tenor",sign:"C",line:4,octaveChange:0,middle:26,bias:1.7,auto:!1},{id:"G2-8",label:"Treble 8vb",sign:"G",line:2,octaveChange:-1,middle:27,bias:1.35,auto:!0},{id:"F4+8",label:"Bass 8va",sign:"F",line:4,octaveChange:1,middle:29,bias:1.75,auto:!1}];function Xc(l){return Bi.find(a=>a.id===l)??Bi[0]}function Yc(l,a){if(l.length===0)return 0;let s=0;for(const c of l)s+=Math.max(0,(Math.abs(c-a.middle)-5)/2);return s/l.length}function Sf(l,a){if(l.length===0)return 0;let s=0,c=0;for(const p of l){const v=Math.abs(p-a.middle),y=Math.max(0,(v-5)/2);s+=y*y,c+=v}const f=l.length;return s/f*a.bias+(a.bias-1)*.18+c/f*.001}const Ws=Bi.filter(l=>l.auto);function Zc(l){if(l.length===0)return"G2";let a=Ws[0],s=1/0;return Ws.forEach((c,f)=>{const p=Sf(l,c)+f/1e4;p<s&&(s=p,a=c)}),a.id}function jm(l){return Math.min(...Ws.map(a=>Sf(l,a)))}function Gs(l){if(l.length===0)return 0;const a=l.slice().sort((c,f)=>c-f),s=c=>a[Math.min(a.length-1,Math.floor(c*a.length))];return s(.95)-s(.05)}function Tm(l){const a=l.length;if(a===0)return[];const s=[-1,0,1];let c=new Array(a).fill(0),f=1/0;const p=y=>y===0?.3:.22,v=(y,d)=>{if(y===a){const C=[];l.forEach((x,_)=>{for(const z of x)C.push(z+d[_]*7)});const j=d.reduce((x,_,z)=>x+(_===0?0:p(z)),0),N=jm(C)+j;N<f-1e-9&&(f=N,c=d.slice());return}for(const C of s)v(y+1,[...d,C])};return v(0,[]),c[0]!==0&&c.every(y=>y===c[0])?c.map(()=>0):c}const Qs=[{type:"breve",quarters:8},{type:"whole",quarters:4},{type:"half",quarters:2},{type:"quarter",quarters:1},{type:"eighth",quarters:.5},{type:"16th",quarters:.25},{type:"32nd",quarters:.125},{type:"64th",quarters:.0625},{type:"128th",quarters:.03125}],_m=Qs.flatMap(l=>[0,1,2].map(a=>({type:l.type,dots:a,quarters:l.quarters*(a===0?1:a===1?1.5:1.75)}))).sort((l,a)=>a.quarters-l.quarters||l.dots-a.dots);function Pm(l,a){const s=a/512,c=[];let f=l,p=0;for(;f>s&&p++<32;){const v=_m.find(y=>y.quarters*a<=f+s);if(!v)break;c.push({duration:Math.min(f,v.quarters*a),type:v.type,dots:v.dots}),f-=v.quarters*a}return c.length===0&&c.push({duration:l,type:Lm(l,a),dots:0}),c}function Lm(l,a){const s=l/a;let c=Qs[3];for(const f of Qs)Math.abs(f.quarters-s)<Math.abs(c.quarters-s)&&(c=f);return c.type}function Xt(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const zm=new Set(["sharp","natural","flat","double-sharp","sharp-sharp","flat-flat","natural-sharp","natural-flat","quarter-flat","quarter-sharp","three-quarters-flat","three-quarters-sharp"]);function Cf(l,a){return a===0?l:{...l,octave:l.octave+a}}const Rm=[["s1upper","s1lower"],["s2upper","s2lower"]];function ea(l,a,s){const c=new Map(l.streams.map(f=>[f.key,f]));return Rm.map(f=>{const p=f.map(v=>({slot:v,stream:a[v]?c.get(a[v]):void 0})).filter(v=>v.stream!==void 0);return p.map((v,y)=>({stream:v.stream,slot:v.slot,voiceNumber:y+1,stem:p.length>1?y===0?"up":"down":null,octaveShift:s[v.slot]??0}))})}function Ln(l){const a=[];for(const s of l)for(const c of s.stream.measures)for(const f of c)for(const p of f.pitches)a.push(tm(p)+s.octaveShift*7);return a}const Xn={s1upper:0,s1lower:0,s2upper:0,s2lower:0};function $s(l,a){const s={...Xn};for(const c of ea(l,a,Xn)){if(c.length===0)continue;const f=Tm(c.map(p=>Ln([p])));c.forEach((p,v)=>{s[p.slot]=Math.max(-2,Math.min(2,f[v]??0))})}return s}const Ef=13;function Jc(l,a){return ea(l,a,Xn).some(s=>s.length>=2&&Gs(Ln(s))>=Ef)}function Dm(l,a){const s=ea(l,a.assignment,a.octaves);if(s.every(x=>x.length===0))throw new Error("No voices are assigned. Pick at least one voice for a staff.");const c=[Xc(a.clef1==="auto"?Zc(Ln(s[0])):a.clef1),Xc(a.clef2==="auto"?Zc(Ln(s[1])):a.clef2)],f=[Yc(Ln(s[0]),c[0]),Yc(Ln(s[1]),c[1])],p=[Gs(Ln(s[0])),Gs(Ln(s[1]))],v=s.map((x,_)=>({voices:x,index:_})).filter(x=>x.voices.length>0),y=l.divisions,d=[];d.push('<?xml version="1.0" encoding="UTF-8"?>'),d.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">'),d.push('<score-partwise version="4.0">');const C=a.title?.trim(),j=a.composer?.trim(),N=a.lyricist?.trim();return C&&d.push(`  <work><work-title>${Xt(C)}</work-title></work>`),d.push("  <identification>"),j&&d.push(`    <creator type="composer">${Xt(j)}</creator>`),N&&d.push(`    <creator type="lyricist">${Xt(N)}</creator>`),d.push("    <encoding><software>Bach Bag Bax</software></encoding>"),d.push("  </identification>"),d.push("  <part-list>"),v.length>1&&(d.push('    <part-group type="start" number="1">'),d.push("      <group-symbol>brace</group-symbol>"),d.push("      <group-barline>yes</group-barline>"),d.push("    </part-group>")),v.forEach((x,_)=>{const z=a.staffNames?.[x.index]?.trim(),P=z?"":' print-object="no"';d.push(`    <score-part id="P${_+1}">`),d.push(`      <part-name${P}>${Xt(z||`Staff ${x.index+1}`)}</part-name>`),d.push("    </score-part>")}),v.length>1&&d.push('    <part-group type="stop" number="1"/>'),d.push("  </part-list>"),v.forEach((x,_)=>{const z=_===0,P=c[x.index]??c[0];d.push(`  <part id="P${_+1}">`);for(let D=0;D<l.measures.length;D++){const A=l.measures[D];d.push(`    <measure number="${Xt(A.number)}"${A.implicit?' implicit="yes"':""}>`),D>0&&A.newPage?d.push('      <print new-page="yes"/>'):D>0&&A.newSystem&&d.push('      <print new-system="yes"/>');const ee=Im(A,D,y,P);if(ee&&d.push(ee),z){const L=Om(A,D);L&&d.push(L);for(const q of A.directions??[])q.kind!=="dynamics"&&d.push(Am(q.text,q.placement??"above"))}const G=$m(A);G&&d.push(G);let ne=0;x.voices.forEach((L,q)=>{ne>0&&d.push(`      <backup><duration>${ne}</duration></backup>`);const re=a.lyrics==="all"||a.lyrics==="top"&&x.index===0&&q===0;for(const K of L.stream.measures[D]??[]){const ie=Bm(K,{divisions:y,voiceNumber:L.voiceNumber,stem:L.stem,lyrics:re,octaveShift:L.octaveShift});ie&&d.push(ie)}ne=Math.round(Fm(L.stream,D,A))});const he=bm(A);he&&d.push(he),d.push("    </measure>")}d.push("  </part>")}),d.push("</score-partwise>"),{xml:d.join(`
`),clefs:c,staves:s,measureCount:l.measures.length,ledgerLoad:f,span:p}}function Fm(l,a,s){let c=0;for(const f of l.measures[a]??[])c+=f.duration;return c||s.length}function Im(l,a,s,c){const f=a===0,p=l.key!==void 0,v=l.time!==void 0;if(!f&&!p&&!v)return null;const y=["      <attributes>"];if(f&&y.push(`        <divisions>${Math.round(s)}</divisions>`),(p||f)&&(y.push("        <key>"),y.push(`          <fifths>${l.key?.fifths??0}</fifths>`),l.key?.mode&&y.push(`          <mode>${Xt(l.key.mode)}</mode>`),y.push("        </key>")),v||f){const d=l.time??{beats:4,beatType:4,symbol:void 0},C=d.symbol&&d.symbol!=="normal"?` symbol="${Xt(d.symbol)}"`:"";y.push(`        <time${C}>`),y.push(`          <beats>${d.beats}</beats>`),y.push(`          <beat-type>${d.beatType}</beat-type>`),y.push("        </time>")}return f&&(y.push("        <clef>"),y.push(`          <sign>${c.sign}</sign>`),y.push(`          <line>${c.line}</line>`),c.octaveChange&&y.push(`          <clef-octave-change>${c.octaveChange}</clef-octave-change>`),y.push("        </clef>")),y.push("      </attributes>"),y.join(`
`)}function Om(l,a){if(l.tempo===void 0)return null;const s=Math.round(l.tempo);if(!Number.isFinite(s)||s<=0)return null;const c=a===0||l.tempoText!==void 0,f=['      <direction placement="above" directive="yes">'];return c&&(f.push("        <direction-type>"),f.push('          <metronome parentheses="no">'),f.push("            <beat-unit>quarter</beat-unit>"),f.push(`            <per-minute>${s}</per-minute>`),f.push("          </metronome>"),f.push("        </direction-type>")),f.push(`        <sound tempo="${s}"/>`),f.push("      </direction>"),f.join(`
`)}function Am(l,a){return[`      <direction placement="${a}">`,"        <direction-type>",`          <words>${Xt(l)}</words>`,"        </direction-type>","      </direction>"].join(`
`)}function $m(l){const a=l.endings.filter(c=>c.location==="left");if(!l.repeatForward&&a.length===0)return null;const s=['      <barline location="left">'];l.repeatForward&&s.push("        <bar-style>heavy-light</bar-style>");for(const c of a)s.push(`        <ending number="${c.numbers.join(", ")}" type="${c.type}"/>`);return l.repeatForward&&s.push('        <repeat direction="forward"/>'),s.push("      </barline>"),s.join(`
`)}function bm(l){const a=l.endings.filter(f=>f.location==="right"),s=l.repeatBackward?"light-heavy":l.barStyleRight;if(!s&&!l.repeatBackward&&a.length===0)return null;const c=['      <barline location="right">'];s&&c.push(`        <bar-style>${Xt(s)}</bar-style>`);for(const f of a)c.push(`        <ending number="${f.numbers.join(", ")}" type="${f.type}"/>`);if(l.repeatBackward){const f=l.repeatBackward>2?` times="${l.repeatBackward}"`:"";c.push(`        <repeat direction="backward"${f}/>`)}return c.push("      </barline>"),c.join(`
`)}function Bm(l,a){const s=l.pitches.length===0;if(l.grace)return Um(l,a);if(s&&l.measureRest)return $i(["<note>",'  <rest measure="yes"/>',`  <duration>${Math.max(1,Math.round(l.duration))}</duration>`,`  <voice>${a.voiceNumber}</voice>`,"</note>"]);const c=l.noteType?[{duration:l.duration,type:l.noteType,dots:l.dots}]:Pm(l.duration,a.divisions),f=qm(c,l.duration),p=[];return f.forEach((v,y)=>{const d=y===0,C=y===f.length-1,j=l.tieStop&&d||!d,N=l.tieStart&&C||!C;if(s){p.push($i(["<note>","  <rest/>",`  <duration>${v.duration}</duration>`,`  <voice>${a.voiceNumber}</voice>`,`  <type>${v.type}</type>`,...ef(v.dots),"</note>"]));return}l.pitches.forEach((x,_)=>{const z=Cf(x,a.octaveShift),P=l.accidentals[_],D=d&&P&&zm.has(P),A=[];if(j&&A.push('    <tied type="stop"/>'),N&&A.push('    <tied type="start"/>'),_===0&&d&&l.slurStart&&A.push('    <slur type="start" number="1"/>'),_===0&&C&&l.slurStop&&A.push('    <slur type="stop" number="1"/>'),_===0&&d&&l.tuplet==="start"&&A.push('    <tuplet type="start"/>'),_===0&&C&&l.tuplet==="stop"&&A.push('    <tuplet type="stop"/>'),_===0&&d&&l.articulations.length){A.push("    <articulations>");for(const G of l.articulations)A.push(`      <${G}/>`);A.push("    </articulations>")}_===0&&C&&l.fermata&&A.push(`    <fermata type="${a.stem==="down"?"inverted":"upright"}"/>`);const ee=[];if(a.lyrics&&_===0&&d)for(const G of l.lyrics)ee.push(`  <lyric number="${G.verse}">`),G.syllabic&&ee.push(`    <syllabic>${G.syllabic}</syllabic>`),ee.push(`    <text>${Xt(G.text)}</text>`),G.extend&&ee.push("    <extend/>"),ee.push("  </lyric>");p.push($i(["<note>",_>0?"  <chord/>":null,l.cue?"  <cue/>":null,"  <pitch>",`    <step>${z.step}</step>`,z.alter?`    <alter>${z.alter}</alter>`:null,`    <octave>${z.octave}</octave>`,"  </pitch>",`  <duration>${v.duration}</duration>`,j?'  <tie type="stop"/>':null,N?'  <tie type="start"/>':null,`  <voice>${a.voiceNumber}</voice>`,`  <type>${v.type}</type>`,...ef(v.dots),D?`  <accidental>${P}</accidental>`:null,l.timeMod?`  <time-modification><actual-notes>${l.timeMod.actual}</actual-notes><normal-notes>${l.timeMod.normal}</normal-notes></time-modification>`:null,a.stem?`  <stem>${a.stem}</stem>`:null,A.length?`  <notations>
${A.join(`
`)}
  </notations>`:null,...ee,"</note>"]))})}),p.join(`
`)}function Um(l,a){return l.pitches.length?l.pitches.map((s,c)=>{const f=Cf(s,a.octaveShift);return $i(["<note>",`  <grace${l.graceSlash?' slash="yes"':""}/>`,c>0?"  <chord/>":null,"  <pitch>",`    <step>${f.step}</step>`,f.alter?`    <alter>${f.alter}</alter>`:null,`    <octave>${f.octave}</octave>`,"  </pitch>",`  <voice>${a.voiceNumber}</voice>`,`  <type>${l.noteType??"eighth"}</type>`,a.stem?`  <stem>${a.stem}</stem>`:null,"</note>"])}).join(`
`):""}function ef(l){return Array.from({length:Math.max(0,Math.min(3,l))},()=>"  <dot/>")}function $i(l){return l.filter(a=>a!==null&&a!=="").map(a=>`      ${a}`).join(`
`)}function qm(l,a){const s=Math.max(0,Math.round(a)),c=l.map(p=>({...p,duration:Math.max(0,Math.round(p.duration))})),f=c.reduce((p,v)=>p+v.duration,0);return c.length&&f!==s&&(c[c.length-1].duration+=s-f),c.filter(p=>p.duration>0)}const Ks=[{id:"A3",label:"A3",width:297,height:420},{id:"A4",label:"A4",width:210,height:297},{id:"A5",label:"A5",width:148,height:210},{id:"A6",label:"A6",width:105,height:148},{id:"B4",label:"B4",width:250,height:353},{id:"B5",label:"B5",width:176,height:250},{id:"letter",label:"Letter",width:215.9,height:279.4},{id:"legal",label:"Legal",width:215.9,height:355.6},{id:"tabloid",label:"Tabloid",width:279.4,height:431.8},{id:"custom",label:"Custom",width:210,height:297}],Vm=["Leipzig","Bravura","Leland","Gootville","Petaluma"],Xs={paper:"A4",customWidth:210,customHeight:297,orientation:"portrait",margins:{top:15,right:12,bottom:15,left:12},scale:100,staffGap:12,systemGap:8,noteSpacing:.25,lyricSize:4.5,justifyVertically:!1,breaks:"auto",font:"Leipzig",showHeader:!0,showFooter:!1,staffLineWidth:.15};function Hm(l){const a=Ks.find(j=>j.id===l.paper)??Ks[1],s=l.paper==="custom"?l.customWidth:a.width,c=l.paper==="custom"?l.customHeight:a.height,f=l.orientation==="portrait",p=Pt(f?s:c,40,1e3),v=Pt(f?c:s,40,1e3),y=p*.45,d=v*.45,C={top:Pt(l.margins.top,0,d),right:Pt(l.margins.right,0,y),bottom:Pt(l.margins.bottom,0,d),left:Pt(l.margins.left,0,y)};return{pageWidth:p,pageHeight:v,contentWidth:p-C.left-C.right,contentHeight:v-C.top-C.bottom,margins:C}}function Pt(l,a,s){return Number.isFinite(l)?Math.min(s,Math.max(a,l)):a}function Wm(l,a){const s=Pt(l.scale,20,400),c=100/s,f=p=>Math.round(p*10*c);return{scale:s,pageWidth:Math.max(100,f(a.contentWidth)),pageHeight:Math.max(100,f(a.contentHeight)),pageMarginTop:0,pageMarginBottom:0,pageMarginLeft:0,pageMarginRight:0,adjustPageHeight:!1,adjustPageWidth:!1,mmOutput:!0,svgViewBox:!0,svgHtml5:!1,svgRemoveXlink:!0,footer:l.showFooter?"auto":"none",header:l.showHeader?"auto":"none",breaks:l.breaks,font:l.font,spacingStaff:Pt(l.staffGap,0,48),spacingSystem:Pt(l.systemGap,0,48),spacingLinear:Pt(l.noteSpacing,.02,1),spacingNonLinear:.6,lyricSize:Pt(l.lyricSize,2,8),justifyVertically:l.justifyVertically,staffLineWidth:Pt(l.staffLineWidth,.1,.3),minLastJustification:.6,condense:"none"}}function Gm(l,a){const s=l.map((j,N)=>N);if(!a)return s;const c=[],f=new Map;let p=0,v=0,y=1;const d=Math.max(2e3,l.length*64);let C=0;for(;p<l.length;){if(C++>d)return s;const j=l[p];j.repeatForward&&(v=p,y=f.get(-p-1)??1);const N=j.endings.find(x=>x.type==="start");if(N&&!N.numbers.includes(y)){let x=p+1;for(;x<l.length;){const _=l[x].endings.find(z=>z.type==="start");if(_&&_.numbers.includes(y))break;x++}if(x>=l.length)break;p=x;continue}if(c.push(p),j.repeatBackward){const x=j.repeatBackward,_=f.get(p)??1;if(_<x){f.set(p,_+1),y=_+1,f.set(-v-1,y),p=v;continue}}p++}return c.length?c:s}function Qm(l){return l.some(a=>a.repeatBackward!==null||a.repeatForward||a.endings.length>0)}const bs=480,Km=84,Xm={tempoScale:1,fallbackTempo:Km,expandRepeats:!0,programs:[52,52],velocity:90,gate:.97,separateChannels:!0,followOctaveShifts:!0},tf=[{value:52,label:"Choir aahs"},{value:53,label:"Voice oohs"},{value:54,label:"Synth choir"},{value:19,label:"Church organ"},{value:16,label:"Drawbar organ"},{value:0,label:"Grand piano"},{value:6,label:"Harpsichord"},{value:48,label:"String ensemble"},{value:42,label:"Cello"},{value:40,label:"Violin"},{value:71,label:"Clarinet"},{value:73,label:"Flute"}];function Ys(l){let a=Math.max(0,Math.round(l));const s=[a&127];for(a>>=7;a>0;)s.unshift(a&127|128),a>>=7;return s}function Nf(l){return Array.from(new TextEncoder().encode(l))}function nf(l,a){const s=a.length;return[...Nf(l),s>>>24&255,s>>>16&255,s>>>8&255,s&255,...a]}function rf(l){const a=l.slice().sort((f,p)=>f.tick-p.tick||f.priority-p.priority),s=[];let c=0;for(const f of a)s.push(...Ys(f.tick-c),...f.data),c=f.tick;return s.push(...Ys(0),255,47,0),s}function of(l,a){const s=Nf(a);return[255,l,...Ys(s.length),...s]}function Ym(l,a,s,c,f,p){const v=l.stream;let y=new Map;const d=v.transpose+(p?l.octaveShift*12:0);s.forEach((C,j)=>{const N=c[j];for(const x of v.measures[C]??[]){if(x.grace||x.duration<=0||x.pitches.length===0)continue;const _=N+x.onset,z=new Map,P=new Set;for(const D of x.pitches){const A=xo(D)+d;if(A<0||A>127)continue;const ee=x.tieStop?y.get(A):void 0;if(ee)ee.durDiv=_+x.duration-ee.startDiv,x.tieStart?z.set(A,ee):(P.add(A),f.push(ee));else{const G={startDiv:_,durDiv:x.duration,midi:A,staff:a,measure:j};x.tieStart?z.set(A,G):f.push(G)}}for(const[D,A]of y)!z.has(D)&&!P.has(D)&&f.push(A);y=z}});for(const C of y.values())f.push(C)}function Zm(l,a){const s=new Map;for(const f of l){const p=a?`${f.staff}:${f.midi}`:`${f.midi}`,v=s.get(p);v?v.push(f):s.set(p,[f])}const c=[];for(const f of s.values()){f.sort((v,y)=>v.startDiv-y.startDiv);let p={...f[0]};for(let v=1;v<f.length;v++){const y=f[v];y.startDiv<p.startDiv+p.durDiv-1e-6?p.durDiv=Math.max(p.durDiv,y.startDiv+y.durDiv-p.startDiv):(c.push(p),p={...y})}c.push(p)}return c.sort((f,p)=>f.startDiv-p.startDiv||f.midi-p.midi)}function lf(l,a,s,c,f){const p=Gm(l.measures,c.expandRepeats),v=l.divisions,y=[];let d=0;for(const K of p)y.push(d),d+=l.measures[K].length;const C=d,j=[];a.forEach((K,ie)=>{if(!(f!==void 0&&f!==ie))for(const ae of K)Ym(ae,ie,p,y,j,c.followOctaveShifts)});const N=Zm(j,c.separateChannels),x=K=>Math.round(K/v*bs),_=[];_.push({tick:0,priority:0,data:of(3,l.title||"Bach Bag Bax")});let z=null,P="";if(p.forEach((K,ie)=>{const ae=l.measures[K],ye=x(y[ie]),ke=ae.tempo??(ie===0?c.fallbackTempo:void 0);if(ke!==void 0){const Se=Math.max(10,Math.min(400,ke*c.tempoScale));if(z===null||Math.abs(Se-z)>.01){z=Se;const xe=Math.round(6e7/Se);_.push({tick:ye,priority:0,data:[255,81,3,xe>>16&255,xe>>8&255,xe&255]})}}if(ae.time){const Se=`${ae.time.beats}/${ae.time.beatType}`;if(Se!==P){P=Se;const xe=Math.max(0,Math.round(Math.log2(ae.time.beatType)));_.push({tick:ye,priority:0,data:[255,88,4,ae.time.beats&255,xe,24,8]})}}if(ie===0&&ae.key){const Se=Math.max(-7,Math.min(7,Math.round(ae.key.fifths))),xe=(ae.key.mode??"").toLowerCase()==="minor"?1:0;_.push({tick:ye,priority:0,data:[255,89,2,Se&255,xe]})}}),z===null){const K=Math.max(10,Math.min(400,c.fallbackTempo*c.tempoScale)),ie=Math.round(6e7/K);_.unshift({tick:0,priority:0,data:[255,81,3,ie>>16&255,ie>>8&255,ie&255]}),z=K}const D=a.map((K,ie)=>ie).filter(K=>f===void 0||K===f),A=[],ee=[rf(_)];D.forEach((K,ie)=>{const ae=c.separateChannels?Math.min(15,ie):0,ye=c.programs[K]??c.programs[0]??0,ke=s[K]??`Staff ${K+1}`;A.push(ke);const Se=[{tick:0,priority:0,data:of(3,ke)},{tick:0,priority:0,data:[192|ae,ye&127]}];for(const xe of N){if(xe.staff!==K)continue;const w=x(xe.startDiv),Y=x(xe.startDiv+xe.durDiv)-w,b=Math.max(1,Math.round(Y*c.gate));Se.push({tick:w,priority:1,data:[144|ae,xe.midi,c.velocity&127]}),Se.push({tick:w+b,priority:0,data:[128|ae,xe.midi,64]})}ee.push(rf(Se))});const G=nf("MThd",[0,1,ee.length>>8&255,ee.length&255,bs>>8&255,bs&255]),ne=ee.flatMap(K=>nf("MTrk",K)),he=Uint8Array.from([...G,...ne]),L=Jm(l,p,y,v,c),q=N.map(K=>({time:L(K.startDiv),duration:Math.max(.03,L(K.startDiv+K.durDiv)-L(K.startDiv)),midi:K.midi,staff:K.staff,measure:K.measure})).sort((K,ie)=>K.time-ie.time),re=p.map((K,ie)=>({sourceIndex:K,start:L(y[ie]),end:L(y[ie]+l.measures[K].length)}));return{bytes:he,notes:q,duration:L(C),trackNames:A,measureSpans:re}}function Jm(l,a,s,c,f){const p=d=>Math.max(10,Math.min(400,d)),v=[];a.forEach((d,C)=>{const j=l.measures[d].tempo;if(j===void 0)return;const N=p(j*f.tempoScale),x=s[C],_=v[v.length-1];_&&_.div===x?_.qpm=N:(!_||Math.abs(_.qpm-N)>.01)&&v.push({div:x,qpm:N})}),(!v.length||v[0].div!==0)&&v.unshift({div:0,qpm:p(f.fallbackTempo*f.tempoScale)});const y=[0];for(let d=1;d<v.length;d++)y[d]=y[d-1]+(v[d].div-v[d-1].div)/c*(60/v[d-1].qpm);return d=>{let C=0;for(;C+1<v.length&&v[C+1].div<=d;)C++;return y[C]+(d-v[C].div)/c*(60/v[C].qpm)}}const eh="modulepreload",th=function(l,a){return new URL(l,a).href},sf={},af=function(a,s,c){let f=Promise.resolve();if(s&&s.length>0){let v=function(j){return Promise.all(j.map(N=>Promise.resolve(N).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const y=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),C=d?.nonce||d?.getAttribute("nonce");f=v(s.map(j=>{if(j=th(j,c),j in sf)return;sf[j]=!0;const N=j.endsWith(".css"),x=N?'[rel="stylesheet"]':"";if(!!c)for(let P=y.length-1;P>=0;P--){const D=y[P];if(D.href===j&&(!N||D.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${j}"]${x}`))return;const z=document.createElement("link");if(z.rel=N?"stylesheet":eh,N||(z.as="script"),z.crossOrigin="",z.href=j,C&&z.setAttribute("nonce",C),document.head.appendChild(z),N)return new Promise((P,D)=>{z.addEventListener("load",P),z.addEventListener("error",()=>D(new Error(`Unable to preload CSS for ${j}`)))})}))}function p(v){const y=new Event("vite:preloadError",{cancelable:!0});if(y.payload=v,window.dispatchEvent(y),!y.defaultPrevented)throw v}return f.then(v=>{for(const y of v||[])y.status==="rejected"&&p(y.reason);return a().catch(p)})};let Di=null;function Mf(){return Di||(Di=(async()=>{const[{default:l},{VerovioToolkit:a}]=await Promise.all([af(()=>import("./verovio-module-BUjnntrA.js"),[],import.meta.url),af(()=>import("./verovio-p93OQkwQ.js"),[],import.meta.url)]),s=await l();return new a(s)})().catch(l=>{throw Di=null,l})),Di}let Bs=null,uf=Promise.resolve();function nh(l,a){const s=uf.then(()=>cf(l,a),()=>cf(l,a));return uf=s.catch(()=>{}),s}async function cf(l,a){const s=await Mf();if(s.setOptions(a),Bs!==l){if(Bs=null,!s.loadData(l)){const y=s.getLog();throw new Error(`Verovio could not engrave this score.${y?`
${y.slice(0,400)}`:""}`)}Bs=l}else s.redoLayout();const c=Math.max(1,s.getPageCount()),f=[];for(let y=1;y<=c;y++)f.push(s.renderToSVG(y));const p=s.getLog().trim(),v=p?Array.from(new Set(p.split(`
`).map(y=>y.trim()).filter(Boolean))).slice(0,8):[];return{pages:f,warnings:v}}class rh{ctx=null;master=null;scheduled=[];notes=[];startedAt=0;offset=0;raf=0;mutedStaves=new Set;playing=!1;duration=0;onTick=null;onEnd=null;setNotes(a,s){const c=this.playing;this.stop(),this.notes=a,this.duration=s,c&&(this.offset=0)}setStaffMuted(a,s){if(s?this.mutedStaves.add(a):this.mutedStaves.delete(a),this.playing){const c=this.position();this.play(c)}}isStaffMuted(a){return this.mutedStaves.has(a)}position(){return!this.playing||!this.ctx?this.offset:this.offset+(this.ctx.currentTime-this.startedAt)}async play(a){this.stopSources();const s=this.ensureContext();s.state==="suspended"&&await s.resume(),this.offset=Math.max(0,a??this.position()),this.offset>=this.duration-.01&&(this.offset=0),this.startedAt=s.currentTime,this.playing=!0;const c=s.currentTime-this.offset+.06;for(const f of this.notes)f.time+f.duration<this.offset||this.mutedStaves.has(f.staff)||this.scheduleNote(s,f,c);this.tick()}pause(){this.playing&&(this.offset=this.position(),this.playing=!1,this.stopSources(),cancelAnimationFrame(this.raf))}stop(){this.playing=!1,this.offset=0,this.stopSources(),cancelAnimationFrame(this.raf),this.onTick?.(0)}seek(a){const s=Math.max(0,Math.min(this.duration,a));this.playing?this.play(s):(this.offset=s,this.onTick?.(s))}dispose(){this.stop(),this.ctx?.close(),this.ctx=null,this.master=null}ensureContext(){return this.ctx||(this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=.32,this.master.connect(this.ctx.destination)),this.ctx}scheduleNote(a,s,c){const f=Math.max(a.currentTime,c+s.time),p=c+s.time+s.duration;if(p<=a.currentTime)return;const v=440*Math.pow(2,(s.midi-69)/12),y=a.createGain(),d=a.createStereoPanner();d.pan.value=s.staff===0?-.22:.22;const C=.02,j=.14,N=s.staff===0?.3:.26;y.gain.setValueAtTime(0,f),y.gain.linearRampToValueAtTime(N,f+C),y.gain.setValueAtTime(N*.85,Math.max(f+C,p-j)),y.gain.linearRampToValueAtTime(1e-4,p+j);const x=a.createOscillator();x.type=s.staff===0?"triangle":"sawtooth",x.frequency.value=v;const _=a.createBiquadFilter();_.type="lowpass",_.frequency.value=s.staff===0?2600:1500,_.Q.value=.6,x.connect(_),_.connect(y),y.connect(d),d.connect(this.master),x.start(f),x.stop(p+j+.05);const z={stop:()=>{try{x.stop()}catch{}x.disconnect(),y.disconnect(),d.disconnect()}};this.scheduled.push(z),x.onended=()=>{const P=this.scheduled.indexOf(z);P>=0&&this.scheduled.splice(P,1)}}stopSources(){for(const a of this.scheduled.slice())a.stop();this.scheduled=[]}tick=()=>{if(!this.playing)return;const a=this.position();if(this.onTick?.(a),a>=this.duration){this.playing=!1,this.offset=0,this.stopSources(),this.onEnd?.();return}this.raf=requestAnimationFrame(this.tick)}}const pt={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",width:16,height:16,"aria-hidden":!0},et={Chevron:({className:l})=>m.jsx("svg",{...pt,className:l,children:m.jsx("path",{d:"m9 18 6-6-6-6"})}),Print:()=>m.jsxs("svg",{...pt,children:[m.jsx("path",{d:"M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"}),m.jsx("path",{d:"M6 14h12v7H6z"})]}),Download:()=>m.jsxs("svg",{...pt,children:[m.jsx("path",{d:"M12 3v12m0 0 4-4m-4 4-4-4"}),m.jsx("path",{d:"M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"})]}),Play:()=>m.jsx("svg",{...pt,fill:"currentColor",stroke:"none",children:m.jsx("path",{d:"M7 4.5v15l12-7.5z"})}),Pause:()=>m.jsx("svg",{...pt,fill:"currentColor",stroke:"none",children:m.jsx("path",{d:"M7 4h3.5v16H7zM13.5 4H17v16h-3.5z"})}),Stop:()=>m.jsx("svg",{...pt,fill:"currentColor",stroke:"none",children:m.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1.5"})}),Plus:()=>m.jsx("svg",{...pt,children:m.jsx("path",{d:"M12 5v14M5 12h14"})}),Minus:()=>m.jsx("svg",{...pt,children:m.jsx("path",{d:"M5 12h14"})}),Sun:()=>m.jsxs("svg",{...pt,children:[m.jsx("circle",{cx:"12",cy:"12",r:"4"}),m.jsx("path",{d:"M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"})]}),Moon:()=>m.jsx("svg",{...pt,children:m.jsx("path",{d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"})}),File:()=>m.jsxs("svg",{...pt,children:[m.jsx("path",{d:"M14 3v5h5"}),m.jsx("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2z"})]}),Close:()=>m.jsx("svg",{...pt,children:m.jsx("path",{d:"M6 6l12 12M18 6 6 18"})}),Reset:()=>m.jsx("svg",{...pt,children:m.jsx("path",{d:"M3 12a9 9 0 1 0 2.6-6.4M3 4v5h5"})}),Music:()=>m.jsxs("svg",{...pt,children:[m.jsx("path",{d:"M9 18V5l11-2v13"}),m.jsx("circle",{cx:"6.5",cy:"18",r:"2.5"}),m.jsx("circle",{cx:"17.5",cy:"16",r:"2.5"})]})};function Sr({title:l,badge:a,defaultOpen:s=!0,children:c}){const[f,p]=Q.useState(s);return m.jsxs("section",{className:"panel","data-open":f,children:[m.jsxs("button",{type:"button",className:"panel-head",onClick:()=>p(v=>!v),"aria-expanded":f,children:[m.jsx(et.Chevron,{className:"chevron"}),m.jsx("h3",{children:l}),a!=null&&m.jsx("span",{className:"panel-badge",children:a})]}),f&&m.jsx("div",{className:"panel-body",children:c})]})}function Yn({label:l,value:a,hint:s,children:c}){return m.jsxs("div",{className:"field",children:[m.jsxs("div",{className:"field-label",children:[m.jsx("span",{children:l}),a!==void 0&&m.jsx("span",{className:"field-value",children:a})]}),c,s&&m.jsx("div",{className:"field-hint",children:s})]})}function sn({label:l,value:a,min:s,max:c,step:f=1,suffix:p="",hint:v,format:y,onChange:d}){return m.jsx(Yn,{label:l,value:`${y?y(a):a}${p}`,hint:v,children:m.jsx("input",{type:"range",min:s,max:c,step:f,value:a,onChange:C=>d(Number(C.target.value)),"aria-label":l})})}function vo({label:l,value:a,options:s,hint:c,onChange:f}){const p=m.jsx("div",{className:"segmented",role:"group","aria-label":l,children:s.map(v=>m.jsx("button",{type:"button",title:v.title,"aria-pressed":a===v.value,onClick:()=>f(v.value),children:v.label},v.value))});return l?m.jsx(Yn,{label:l,hint:c,children:p}):p}function Qt({label:l,checked:a,onChange:s}){return m.jsxs("label",{className:"switch",children:[m.jsx("span",{className:"switch-label",children:l}),m.jsx("input",{type:"checkbox",checked:a,onChange:c=>s(c.target.checked)}),m.jsx("span",{className:"switch-track"})]})}function Pn({label:l,value:a,options:s,hint:c,disabled:f,title:p,onChange:v}){const y=Q.useId(),d=m.jsx("select",{id:y,value:a,disabled:f,title:p,onChange:C=>v(C.target.value),"aria-label":l,children:s.map(C=>m.jsx("option",{value:C.value,children:C.label},C.value))});return l?m.jsx(Yn,{label:l,hint:c,children:d}):d}function ff({label:l,value:a,min:s,max:c,step:f=1,suffix:p,onChange:v}){return m.jsx(Yn,{label:l,value:p,children:m.jsx("input",{type:"number",value:Number.isFinite(a)?a:"",min:s,max:c,step:f,onChange:y=>{const d=Number(y.target.value);Number.isFinite(d)&&v(Math.min(c,Math.max(s,d)))},"aria-label":l})})}function yo({kind:l="info",icon:a,children:s}){return m.jsxs("div",{className:`notice ${l}`,children:[m.jsx("span",{className:"notice-icon",children:a??(l==="error"||l==="warn"?"!":"i")}),m.jsx("div",{children:s})]})}const oh=".xml,.musicxml,.mxl,.mid,.midi,.kar,application/xml,text/xml,audio/midi";function jf(l){if(!l||l.length===0)return null;const a=Array.from(l);return a.find(s=>/\.(musicxml|mxl|xml|midi?|kar)$/i.test(s.name))??a[0]}function ih(l){const[a,s]=Q.useState(!1),c=Q.useRef(0);return Q.useEffect(()=>{const f=d=>{d.dataTransfer?.types.includes("Files")&&(c.current++,s(!0))},p=()=>{c.current=Math.max(0,c.current-1),c.current===0&&s(!1)},v=d=>{d.dataTransfer?.types.includes("Files")&&d.preventDefault()},y=d=>{if(!d.dataTransfer?.types.includes("Files"))return;d.preventDefault(),c.current=0,s(!1);const C=jf(d.dataTransfer.files);C&&l(C)};return window.addEventListener("dragenter",f),window.addEventListener("dragleave",p),window.addEventListener("dragover",v),window.addEventListener("drop",y),()=>{window.removeEventListener("dragenter",f),window.removeEventListener("dragleave",p),window.removeEventListener("dragover",v),window.removeEventListener("drop",y)}},[l]),a}function lh({onFile:l,onSample:a,busy:s}){const c=Q.useRef(null);return m.jsxs("div",{className:"dropzone",children:[m.jsxs("div",{className:"dropzone-inner",children:[m.jsx("div",{className:"dropzone-icon",children:m.jsx(et.Music,{})}),m.jsxs("div",{children:[m.jsx("h2",{children:"Drop a four-voice score"}),m.jsx("p",{children:"MusicXML or MIDI. Soprano, alto, tenor and bass go in; a printable two-staff score and a two-track MIDI file come out. Everything happens in your browser: nothing is uploaded."})]}),m.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"},children:[m.jsx("button",{type:"button",className:"btn primary",disabled:s,onClick:()=>c.current?.click(),children:s?"Reading…":"Choose a file"}),m.jsx("button",{type:"button",className:"btn",disabled:s,onClick:a,children:"Load a sample"})]}),m.jsxs("div",{className:"dropzone-formats",children:[m.jsx("span",{className:"tag",children:".musicxml"}),m.jsx("span",{className:"tag",children:".xml"}),m.jsx("span",{className:"tag",children:".mxl"}),m.jsx("span",{className:"tag",children:".mid"})]})]}),m.jsx("input",{ref:c,type:"file",accept:oh,className:"sr-only",onChange:f=>{const p=jf(f.target.files);p&&l(p),f.target.value=""}})]})}const sh=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],ah=[{value:"-2",label:"-2 oct"},{value:"-1",label:"-1 oct"},{value:"0",label:"as is"},{value:"1",label:"+1 oct"},{value:"2",label:"+2 oct"}];function Fi(l){return!Number.isFinite(l)||l<=0?"–":`${sh[Math.round(l)%12]}${Math.floor(Math.round(l)/12)-1}`}function uh(l){const{score:a,merged:s,settings:c,roles:f,layout:p,midiOptions:v,hasLyrics:y,canSplitChords:d,scoreHasRepeats:C,showGuides:j,warnings:N,midiImport:x,onMidiImport:_,onSettings:z,onLayout:P,onMidi:D,onGuides:A,onResetLayout:ee,onFitOctaves:G,onResetOctaves:ne,onDownloadMidi:he,onDownloadXml:L}=l,q=[{value:"",label:"— none —"},...a.streams.map(w=>{const Y=f.get(w.key),b=w.partName.trim()||"Unnamed",W=Y&&b.toLowerCase().startsWith(Hs[Y].slice(0,3).toLowerCase()),V=Y&&!W?`${Y} · `:"",S=w.voice!=="1"?` v${w.voice}`:"";return{value:w.key,label:`${V}${b}${S} · ${Fi(w.minMidi)}–${Fi(w.maxMidi)}`}})],re=w=>q.find(Y=>Y.value===(w??""))?.label,K=[{value:"auto",label:"Automatic"},...Bi.map(w=>({value:w.id,label:w.label}))],ie=Ks.map(w=>({value:w.id,label:w.id==="custom"?"Custom…":`${w.label} · ${pf(w.width)} × ${pf(w.height)} mm`})),ae=["s1upper","s1lower","s2upper","s2lower"].map(w=>({slot:w,by:c.octaves[w]??0,key:c.assignment[w]})).filter(w=>w.by!==0&&w.key),ye=ae.length>0,ke=ae.map(w=>{const Y=a.streams.find(R=>R.key===w.key),b=w.key?f.get(w.key):void 0,W=b?Hs[b]:Y?.partName??"A voice",V=w.by>0?"up":"down",S=Math.abs(w.by)===1?"an octave":`${Math.abs(w.by)} octaves`;return`${W} is written ${S} ${V}`}).join(", "),Se=s?s.span.map((w,Y)=>w>=Ef?`Staff ${Y+1} has to cover a wide range.`:"").filter(Boolean):[],xe=s?s.staves.map(w=>w.map(Y=>f.get(Y.stream.key)??Y.stream.partName.slice(0,4)).join(" + ")):[];return m.jsxs("aside",{className:"sidebar",children:[N.length>0&&m.jsx("div",{style:{padding:"14px 16px 0"},children:m.jsx(yo,{kind:"warn",icon:"!",children:N.map((w,Y)=>m.jsx("div",{children:w},Y))})}),x&&m.jsxs(Sr,{title:"MIDI import",badge:"from .mid",children:[m.jsx("div",{className:"field-hint",children:"A MIDI file records key presses, not notation, so where the notes land has to be guessed. These two settings are the guesses."}),m.jsx(vo,{label:"Snap notes to",value:String(x.quantize),options:dm.map(w=>({value:String(w.value),label:w.label})),hint:x.quantize===0?"Timing is kept exactly as recorded, which a live performance rarely survives.":`Starts and lengths are rounded to the nearest 1/${x.quantize} note.`,onChange:w=>_({quantize:Number(w)})}),m.jsx(Qt,{label:"Include the drum channel",checked:x.includePercussion,onChange:w=>_({includePercussion:w})})]}),m.jsxs(Sr,{title:"Voices",badge:`${a.streams.length} found`,children:[m.jsx(vo,{label:"Combine as",value:c.pairing,options:bi.map(w=>({value:w.id,label:w.label.replace(/\s+/g,""),title:w.hint})),hint:bi.find(w=>w.id===c.pairing)?.hint,onChange:w=>z({pairing:w})}),m.jsx("div",{className:"voice-legend",children:a.streams.map(w=>{const Y=f.get(w.key);return m.jsxs("div",{className:"voice-legend-row",children:[m.jsx("span",{className:"role-pill","data-role":Y??"",children:Y??"?"}),m.jsxs("span",{className:"voice-legend-name",children:[w.partName,w.voice!=="1"?` · voice ${w.voice}`:""]}),m.jsxs("span",{className:"voice-legend-range",children:[Fi(w.minMidi),"–",Fi(w.maxMidi)]})]},w.key)})}),["s1upper","s1lower","s2upper","s2lower"].map(w=>m.jsxs("div",{className:"voice-slot",children:[m.jsxs("span",{className:"slot-tag",children:[m.jsx("span",{className:`slot-dot${w.startsWith("s2")?" s2":""}`}),em[w].replace("Staff ","St ")]}),m.jsx(Pn,{value:c.assignment[w]??"",options:q,title:re(c.assignment[w]),onChange:Y=>z({assignment:{...c.assignment,[w]:Y||null}})}),m.jsx(Pn,{value:String(c.octaves[w]??0),options:ah,disabled:!c.assignment[w],onChange:Y=>z({octaves:{...c.octaves,[w]:Number(Y)}})})]},w)),m.jsxs("div",{className:"row two",children:[m.jsx("button",{type:"button",className:"btn",onClick:G,children:"Fit to staves"}),m.jsx("button",{type:"button",className:"btn",onClick:ne,disabled:!ye,children:"Original octaves"})]}),ye?m.jsxs("div",{className:"field-hint",children:[ke," so the two voices share a staff without a thicket of ledger lines. Choose",m.jsx("em",{children:" original octaves"})," to hear and print them exactly as written."]}):Se.length>0?m.jsxs("div",{className:"field-hint",children:[Se.join(" ")," Try ",m.jsx("em",{children:"fit to staves"}),", another clef, or a different pairing."]}):null,d&&m.jsx(Qt,{label:"Split chords into separate voices",checked:c.splitChords,onChange:w=>z({splitChords:w})})]}),m.jsxs(Sr,{title:"Staves",badge:s?s.clefs.map(w=>w.label).join(" / "):void 0,children:[m.jsxs("div",{className:"row two",children:[m.jsx(Pn,{label:"Staff 1 clef",value:c.clef1,options:K,onChange:w=>z({clef1:w})}),m.jsx(Pn,{label:"Staff 2 clef",value:c.clef2,options:K,onChange:w=>z({clef2:w})})]}),m.jsx(vo,{label:"Lyrics",value:c.lyrics,options:[{value:"none",label:"None"},{value:"top",label:"Top voice"},{value:"all",label:"Every voice"}],hint:y?void 0:"This file has no lyrics.",onChange:w=>z({lyrics:w})}),m.jsx(Qt,{label:`Label staves${xe.length?` (${xe.join(" / ")})`:""}`,checked:c.staffLabels,onChange:w=>z({staffLabels:w})}),m.jsx(Yn,{label:"Title",children:m.jsx("input",{type:"text",value:c.title,placeholder:"Untitled",onChange:w=>z({title:w.target.value})})}),m.jsx(Yn,{label:"Composer",children:m.jsx("input",{type:"text",value:c.composer,placeholder:"—",onChange:w=>z({composer:w.target.value})})})]}),m.jsxs(Sr,{title:"Page",children:[m.jsx(Pn,{label:"Paper size",value:p.paper,options:ie,onChange:w=>P({paper:w})}),p.paper==="custom"&&m.jsxs("div",{className:"row two",children:[m.jsx(ff,{label:"Width",suffix:"mm",value:p.customWidth,min:40,max:1e3,onChange:w=>P({customWidth:w})}),m.jsx(ff,{label:"Height",suffix:"mm",value:p.customHeight,min:40,max:1e3,onChange:w=>P({customHeight:w})})]}),m.jsx(vo,{label:"Orientation",value:p.orientation,options:[{value:"portrait",label:"Portrait"},{value:"landscape",label:"Landscape"}],onChange:w=>P({orientation:w})}),m.jsx(Yn,{label:"Margins",value:"mm",children:m.jsx("div",{className:"row four",children:["top","right","bottom","left"].map(w=>m.jsxs("label",{style:{display:"grid",gap:4},children:[m.jsx("span",{className:"field-value",style:{textTransform:"capitalize"},children:w}),m.jsx("input",{type:"number",min:0,max:80,step:1,value:p.margins[w],"aria-label":`${w} margin in millimetres`,onChange:Y=>{const b=Number(Y.target.value);Number.isFinite(b)&&P({margins:{...p.margins,[w]:Math.min(80,Math.max(0,b))}})}})]},w))})}),m.jsx(Qt,{label:"Show margin guides",checked:j,onChange:A})]}),m.jsxs(Sr,{title:"Music size & spacing",children:[m.jsx(sn,{label:"Music size",value:p.scale,min:40,max:220,step:1,suffix:"%",hint:"The staff and every symbol on it, relative to the paper.",onChange:w=>P({scale:w})}),m.jsx(sn,{label:"Distance between the two staves",value:p.staffGap,min:0,max:40,step:.5,format:w=>w.toFixed(1),onChange:w=>P({staffGap:w})}),m.jsx(sn,{label:"Distance between systems",value:p.systemGap,min:0,max:40,step:.5,format:w=>w.toFixed(1),hint:"How much air between one line of music and the next.",onChange:w=>P({systemGap:w})}),m.jsx(sn,{label:"Note spacing",value:p.noteSpacing,min:.05,max:.8,step:.01,format:w=>w.toFixed(2),hint:"Lower packs more bars onto each line.",onChange:w=>P({noteSpacing:w})}),m.jsx(sn,{label:"Lyric size",value:p.lyricSize,min:2,max:8,step:.1,format:w=>w.toFixed(1),onChange:w=>P({lyricSize:w})}),m.jsx(sn,{label:"Staff line thickness",value:p.staffLineWidth,min:.1,max:.3,step:.01,format:w=>w.toFixed(2),onChange:w=>P({staffLineWidth:w})}),m.jsx(Pn,{label:"Music font",value:p.font,options:Vm.map(w=>({value:w,label:w})),onChange:w=>P({font:w})}),m.jsx(vo,{label:"Line breaks",value:p.breaks,options:[{value:"auto",label:"Automatic"},{value:"smart",label:"Smart"},{value:"encoded",label:"As in file"}],onChange:w=>P({breaks:w})}),m.jsx(Qt,{label:"Spread systems down the page",checked:p.justifyVertically,onChange:w=>P({justifyVertically:w})}),m.jsx(Qt,{label:"Print title block",checked:p.showHeader,onChange:w=>P({showHeader:w})}),m.jsx(Qt,{label:"Print page numbers",checked:p.showFooter,onChange:w=>P({showFooter:w})}),m.jsxs("button",{type:"button",className:"btn wide",onClick:ee,disabled:ch(p),children:[m.jsx(et.Reset,{})," Reset layout"]})]}),m.jsxs(Sr,{title:"MIDI",defaultOpen:!1,children:[m.jsxs("div",{className:"row two",children:[m.jsx(Pn,{label:"Staff 1 sound",value:String(v.programs[0]),options:tf.map(w=>({value:String(w.value),label:w.label})),onChange:w=>D({programs:[Number(w),v.programs[1]]})}),m.jsx(Pn,{label:"Staff 2 sound",value:String(v.programs[1]),options:tf.map(w=>({value:String(w.value),label:w.label})),onChange:w=>D({programs:[v.programs[0],Number(w)]})})]}),m.jsx(sn,{label:"Tempo",value:v.tempoScale,min:.4,max:2,step:.01,format:w=>`${Math.round(w*100)}`,suffix:"%",hint:a.measures.some(w=>w.tempo!==void 0)?"Scales the tempo written in the file.":`The file has no tempo, so ${v.fallbackTempo} bpm is used.`,onChange:w=>D({tempoScale:w})}),!a.measures.some(w=>w.tempo!==void 0)&&m.jsx(sn,{label:"Base tempo",value:v.fallbackTempo,min:30,max:220,step:1,suffix:" bpm",onChange:w=>D({fallbackTempo:w})}),m.jsx(sn,{label:"Note length",value:v.gate,min:.4,max:1,step:.01,format:w=>`${Math.round(w*100)}`,suffix:"%",hint:"Shorter notes give a more detached, easier-to-follow line.",onChange:w=>D({gate:w})}),m.jsx(Qt,{label:"Play repeats out",checked:v.expandRepeats,onChange:w=>D({expandRepeats:w})}),!C&&m.jsx("div",{className:"field-hint",children:"This score has no repeat signs."}),m.jsx(Qt,{label:"One MIDI channel per staff",checked:v.separateChannels,onChange:w=>D({separateChannels:w})}),m.jsx(Qt,{label:"Play the octave shifts too",checked:v.followOctaveShifts,onChange:w=>D({followOctaveShifts:w})}),m.jsx("div",{className:"field-hint",children:v.followOctaveShifts?"The MIDI matches the printed page.":"The MIDI keeps the original pitches, whatever the page shows."}),m.jsxs("button",{type:"button",className:"btn wide primary",onClick:()=>he(),children:[m.jsx(et.Download,{})," Download MIDI (2 tracks)"]}),m.jsxs("div",{className:"row two",children:[m.jsx("button",{type:"button",className:"btn",onClick:()=>he(0),children:"Staff 1 only"}),m.jsx("button",{type:"button",className:"btn",onClick:()=>he(1),children:"Staff 2 only"})]}),m.jsxs("button",{type:"button",className:"btn wide",onClick:L,children:[m.jsx(et.Download,{})," Download merged MusicXML"]})]})]})}function pf(l){return String(Math.round(l*10)/10)}function ch(l){return JSON.stringify(l)===JSON.stringify(Xs)}function fh({pages:l,geometry:a,zoom:s,showGuides:c,activeMeasure:f,followCursor:p}){const v=Q.useRef(null),y=Q.useRef([]),d=Q.useRef(null);return Q.useLayoutEffect(()=>{y.current=v.current?Array.from(v.current.querySelectorAll("g.measure")):[],d.current=null},[l]),Q.useEffect(()=>{const C=d.current;if(C&&C.classList.remove("is-playing"),d.current=null,f===null)return;const j=y.current[f];if(!j||(j.classList.add("is-playing"),d.current=j,!p))return;const N=v.current?.closest(".preview-scroll");if(!N)return;const x=j.getBoundingClientRect(),_=N.getBoundingClientRect();(x.bottom>_.bottom-24||x.top<_.top+24)&&N.scrollTo({top:N.scrollTop+(x.top-_.top)-_.height*.35,behavior:"smooth"})},[f,p,l]),m.jsx("div",{ref:v,className:"pages",style:{"--pw":a.pageWidth,"--ph":a.pageHeight,"--mt":a.margins.top,"--mr":a.margins.right,"--mb":a.margins.bottom,"--ml":a.margins.left,"--z":s},children:l.map((C,j)=>m.jsxs("div",{className:`page${c?" margin-guides":""}`,children:[m.jsx("div",{className:"page-inner",dangerouslySetInnerHTML:{__html:C}}),m.jsxs("span",{className:"page-number",children:[j+1," / ",l.length]})]},j))})}function df(l){(!Number.isFinite(l)||l<0)&&(l=0);const a=Math.floor(l/60),s=Math.floor(l%60);return`${a}:${String(s).padStart(2,"0")}`}function ph({playing:l,position:a,duration:s,staffLabels:c,mutedStaves:f,followCursor:p,onToggleFollow:v,onPlayPause:y,onStop:d,onSeek:C,onToggleMute:j}){return m.jsxs("div",{className:"player",children:[m.jsx("button",{type:"button",className:"btn icon primary",onClick:y,title:l?"Pause":"Play","aria-label":l?"Pause":"Play",children:l?m.jsx(et.Pause,{}):m.jsx(et.Play,{})}),m.jsx("button",{type:"button",className:"btn icon ghost",onClick:d,title:"Stop","aria-label":"Stop",children:m.jsx(et.Stop,{})}),m.jsx("span",{className:"player-time",children:df(a)}),m.jsx("input",{className:"player-scrub",type:"range",min:0,max:Math.max(.1,s),step:.05,value:Math.min(a,s),onChange:N=>C(Number(N.target.value)),"aria-label":"Playback position"}),m.jsx("span",{className:"player-time",children:df(s)}),m.jsx("div",{className:"sep"}),m.jsx("div",{className:"mute-group",children:c.map((N,x)=>m.jsx("button",{type:"button",className:"mute-btn","data-muted":f[x]===!0,onClick:()=>j(x),title:`${f[x]?"Unmute":"Mute"} ${N}`,children:N},x))}),m.jsx("div",{className:"sep"}),m.jsx("button",{type:"button",className:"mute-btn","data-muted":!p,onClick:v,title:"Scroll the preview to follow playback",children:"Follow"})]})}const dh=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <work><work-title>Sample Chorale</work-title></work>
  <identification><encoding><software>Bach Bag Bax</software></encoding></identification>
  <part-list>
    <score-part id="P1"><part-name>Soprano</part-name><part-abbreviation>S</part-abbreviation></score-part>
    <score-part id="P2"><part-name>Alto</part-name><part-abbreviation>A</part-abbreviation></score-part>
    <score-part id="P3"><part-name>Tenor</part-name><part-abbreviation>T</part-abbreviation></score-part>
    <score-part id="P4"><part-name>Bass</part-name><part-abbreviation>B</part-abbreviation></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>4</divisions>
        <key><fifths>0</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <direction placement="above" directive="yes">
        <direction-type>
          <metronome><beat-unit>quarter</beat-unit><per-minute>72</per-minute></metronome>
        </direction-type>
        <sound tempo="72"/>
      </direction>
      <barline location="left">
        <bar-style>heavy-light</bar-style>
        <repeat direction="forward"/>
      </barline>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>A</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>sam</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>ple</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>cho</text>
        </lyric>
      </note>
    </measure>
    <measure number="2">
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>rale</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>writ</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>ten</text>
        </lyric>
      </note>
    </measure>
    <measure number="3">
      <note>
        <pitch>
          <step>F</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>out</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>in</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>four</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>part</text>
        </lyric>
      </note>
    </measure>
    <measure number="4">
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>har</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>middle</syllabic>
          <text>mo</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>ny</text>
        </lyric>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        <repeat direction="backward"/>
      </barline>
    </measure>
    <measure number="5">
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>so</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>you</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>can</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>see</text>
        </lyric>
      </note>
    </measure>
    <measure number="6">
      <note>
        <pitch>
          <step>G</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>the</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>notes</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>on</text>
        </lyric>
      </note>
    </measure>
    <measure number="7">
      <note>
        <pitch>
          <step>F</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>two</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>staves</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>and</text>
        </lyric>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>5</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>hear</text>
        </lyric>
      </note>
    </measure>
    <measure number="8">
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
        <lyric number="1">
          <syllabic>single</syllabic>
          <text>them</text>
        </lyric>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
      </barline>
    </measure>
  </part>
  <part id="P2">
    <measure number="1">
      <attributes>
        <divisions>4</divisions>
        <key><fifths>0</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <barline location="left">
        <bar-style>heavy-light</bar-style>
        <repeat direction="forward"/>
      </barline>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="2">
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="3">
      <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="4">
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        <repeat direction="backward"/>
      </barline>
    </measure>
    <measure number="5">
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="6">
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="7">
      <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="8">
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
      </barline>
    </measure>
  </part>
  <part id="P3">
    <measure number="1">
      <attributes>
        <divisions>4</divisions>
        <key><fifths>0</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef>
          <sign>G</sign>
          <line>2</line>
          <clef-octave-change>-1</clef-octave-change>
        </clef>
      </attributes>
      <barline location="left">
        <bar-style>heavy-light</bar-style>
        <repeat direction="forward"/>
      </barline>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
    </measure>
    <measure number="2">
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="3">
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
    </measure>
    <measure number="4">
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        <repeat direction="backward"/>
      </barline>
    </measure>
    <measure number="5">
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
    </measure>
    <measure number="6">
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="7">
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>up</stem>
      </note>
    </measure>
    <measure number="8">
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        <stem>up</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
      </barline>
    </measure>
  </part>
  <part id="P4">
    <measure number="1">
      <attributes>
        <divisions>4</divisions>
        <key><fifths>0</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef>
          <sign>F</sign>
          <line>4</line>
        </clef>
      </attributes>
      <barline location="left">
        <bar-style>heavy-light</bar-style>
        <repeat direction="forward"/>
      </barline>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>2</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="2">
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>2</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="3">
      <note>
        <pitch>
          <step>F</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="4">
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
        <repeat direction="backward"/>
      </barline>
    </measure>
    <measure number="5">
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="6">
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>half</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
    </measure>
    <measure number="7">
      <note>
        <pitch>
          <step>F</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
      <note>
        <pitch>
          <step>G</step>
          <octave>3</octave>
        </pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>quarter</type>
        <stem>down</stem>
      </note>
    </measure>
    <measure number="8">
      <note>
        <pitch>
          <step>C</step>
          <octave>3</octave>
        </pitch>
        <duration>16</duration>
        <voice>1</voice>
        <type>whole</type>
        <stem>down</stem>
        <notations>
          <fermata type="upright"/>
        </notations>
      </note>
      <barline location="right">
        <bar-style>light-heavy</bar-style>
      </barline>
    </measure>
  </part>
</score-partwise>`,mh=96/25.4,Ii={pairing:Mm,assignment:{s1upper:null,s1lower:null,s2upper:null,s2lower:null},octaves:Xn,clef1:"auto",clef2:"auto",lyrics:"top",staffLabels:!0,splitChords:!0,title:"",composer:""};function hh(){const[l,a]=Q.useState("dark"),[s,c]=Q.useState(null),[f,p]=Q.useState(null),[v,y]=Q.useState(null),[d,C]=Q.useState(Fs),[j,N]=Q.useState(Ii),[x,_]=Q.useState(Xs),[z,P]=Q.useState(Xm),[D,A]=Q.useState(!1),[ee,G]=Q.useState(null),[ne,he]=Q.useState([]),[L,q]=Q.useState(!1),[re,K]=Q.useState(null),[ie,ae]=Q.useState("fit"),[ye,ke]=Q.useState(1),[Se,xe]=Q.useState(1),[w,Y]=Q.useState(!1),[b,W]=Q.useState(!1),[V,S]=Q.useState(0),[R,H]=Q.useState([!1,!1]),[le,ue]=Q.useState(!0),me=Q.useRef(null),ve=Q.useRef(null);Q.useEffect(()=>{document.documentElement.dataset.theme=l},[l]);const B=Q.useMemo(()=>v?j.splitChords&&Os(v)?Kc(v):v:null,[v,j.splitChords]),ge=Q.useMemo(()=>B?Is(B.streams):new Map,[B]),je=Q.useCallback((O,se)=>{const pe=Wc(O,se),be=Os(pe)&&Ii.splitChords?Kc(pe):pe,nt=Is(be.streams),Jn=As(be.streams,nt,Ii.pairing),Eo=Jc(be,Jn)?$s(be,Jn):Xn;c(O),C(se),y(pe),p(O.name),N({...Ii,assignment:Jn,octaves:Eo,title:pe.title??"",composer:pe.composer??""}),he([]),G(null),K(null)},[]),dt=Q.useCallback(async O=>{A(!0),G(null);try{je(await Cm(O),Fs)}catch(se){c(null),y(null),p(null),G(se instanceof Error?se.message:String(se))}finally{A(!1)}},[je]),De=Q.useCallback(()=>{A(!0),G(null);try{je({kind:"musicxml",name:"sample-chorale.musicxml",xml:dh},Fs)}catch(O){G(O instanceof Error?O.message:String(O))}finally{A(!1)}},[je]),kt=Q.useCallback(O=>{if(!s||s.kind!=="midi")return;const se={...d,...O};C(se);try{y(Wc(s,se)),G(null)}catch(pe){G(pe instanceof Error?pe.message:String(pe))}},[s,d]),Yt=ih(dt);Q.useEffect(()=>{Mf().catch(()=>{})},[]);const zn=Q.useCallback(O=>{N(se=>{const pe={...se,...O};return O.pairing&&O.pairing!==se.pairing&&B&&(pe.assignment=As(B.streams,ge,O.pairing),pe.octaves=Jc(B,pe.assignment)?$s(B,pe.assignment):Xn),pe})},[B,ge]);Q.useEffect(()=>{B&&N(O=>{const se=new Set(B.streams.map(nt=>nt.key)),pe=Object.values(O.assignment).some(nt=>nt!==null&&!se.has(nt)),be=Object.values(O.assignment).every(nt=>nt===null);return!pe&&!be?O:{...O,assignment:As(B.streams,Is(B.streams),O.pairing)}})},[B]);const tt=Q.useCallback(O=>{_(se=>({...se,...O}))},[]),Lt=Q.useCallback(O=>{P(se=>({...se,...O}))},[]),Bt=Q.useMemo(()=>{if(!B)return null;const O=se=>se.filter(pe=>!!pe).map(pe=>{const be=ge.get(pe);return be?Hs[be]:B.streams.find(nt=>nt.key===pe)?.partName??""}).filter(Boolean).join(" + ");return[O([j.assignment.s1upper,j.assignment.s1lower]),O([j.assignment.s2upper,j.assignment.s2lower])]},[B,ge,j.assignment]),Rn=Q.useMemo(()=>{if(!B)return{};try{return{score:Dm(B,{assignment:j.assignment,clef1:j.clef1,clef2:j.clef2,lyrics:j.lyrics,octaves:j.octaves,staffNames:j.staffLabels?Bt:null,title:j.title,composer:j.composer,lyricist:B.lyricist})}}catch(O){return{error:O instanceof Error?O.message:String(O)}}},[B,j,Bt]),$e=Rn.score??null,an=Q.useCallback(()=>{B&&N(O=>({...O,octaves:$s(B,O.assignment)}))},[B]),Er=Q.useCallback(()=>{N(O=>({...O,octaves:Xn}))},[]),it=Q.useMemo(()=>Hm(x),[x]),Nr=Q.useMemo(()=>Wm(x,it),[x,it]),Mr=Q.useMemo(()=>JSON.stringify(Nr),[Nr]);Q.useEffect(()=>{if(!$e){he([]),q(!1);return}let O=!1;q(!0);const se=window.setTimeout(async()=>{try{const pe=await nh($e.xml,JSON.parse(Mr));if(O)return;he(pe.pages),K(null)}catch(pe){if(O)return;K(pe instanceof Error?pe.message:String(pe))}finally{O||q(!1)}},120);return()=>{O=!0,window.clearTimeout(se)}},[$e,Mr]);const zt=Q.useMemo(()=>{if(!B||!$e)return null;try{return lf(B,$e.staves,Bt??[],z)}catch{return null}},[B,$e,Bt,z]);Q.useEffect(()=>{const O=new rh;return ve.current=O,O.onTick=se=>S(se),O.onEnd=()=>{W(!1),S(0)},()=>{O.dispose(),ve.current=null}},[]),Q.useEffect(()=>{const O=ve.current;O&&(O.setNotes(zt?.notes??[],zt?.duration??0),W(!1),S(0))},[zt]);const Dn=Q.useCallback(()=>{const O=ve.current;O&&(O.playing?(O.pause(),W(!1)):(O.play(),W(!0)))},[]),Ut=Q.useCallback(()=>{ve.current?.stop(),W(!1),S(0)},[]),ko=Q.useCallback(O=>{const se=ve.current;se&&H(pe=>{const be=pe.slice();return be[O]=!be[O],se.setStaffMuted(O,be[O]),be})},[]),Fn=Q.useMemo(()=>{if(!b||!zt)return null;const O=zt.measureSpans.find(se=>V>=se.start&&V<se.end);return O?O.sourceIndex:null},[b,V,zt]);Q.useEffect(()=>{const O=me.current;if(!O)return;const se=()=>{const be=O.clientWidth-48,nt=it.pageWidth*mh;xe(Math.max(.15,Math.min(2.5,be/nt)))};se();const pe=new ResizeObserver(se);return pe.observe(O),()=>pe.disconnect()},[it.pageWidth,ne.length]);const un=ie==="fit"?Se:ye,So=Q.useCallback(O=>{ke(se=>Math.max(.2,Math.min(3,Math.round(((ie==="fit"?Se:se)+O)*100)/100))),ae("manual")},[ie,Se]);Q.useEffect(()=>{const O=document.createElement("style");return O.id="page-size",O.textContent=`@page { size: ${Oi(it.pageWidth)}mm ${Oi(it.pageHeight)}mm; margin: 0; }`,document.head.appendChild(O),()=>O.remove()},[it.pageWidth,it.pageHeight]);const Zn=Q.useCallback(()=>{Ut(),window.setTimeout(()=>window.print(),60)},[Ut]),In=f?Jd(f):"score",Co=Q.useCallback(O=>{if(!B||!$e)return;const se=lf(B,$e.staves,Bt??[],z,O),pe=O===void 0?"2-voice":`staff${O+1}`;mf(new Blob([se.bytes],{type:"audio/midi"}),`${In}-${pe}.mid`)},[B,$e,Bt,z,In]),jr=Q.useCallback(()=>{$e&&mf(new Blob([$e.xml],{type:"application/vnd.recordare.musicxml+xml"}),`${In}-2staff.musicxml`)},[$e,In]),Tr=Q.useCallback(()=>{Ut(),c(null),y(null),p(null),he([]),G(null),K(null)},[Ut]);Q.useEffect(()=>{const O=se=>{const pe=se.target;pe&&/^(INPUT|SELECT|TEXTAREA)$/.test(pe.tagName)||(se.key===" "&&B?(se.preventDefault(),Dn()):(se.metaKey||se.ctrlKey)&&se.key.toLowerCase()==="p"&&B&&(se.preventDefault(),Zn()))};return window.addEventListener("keydown",O),()=>window.removeEventListener("keydown",O)},[Dn,Zn,B]);const _r=Q.useMemo(()=>{const O=[...B?.warnings??[]];return B&&B.streams.length>4&&O.push(`${B.streams.length} voices were found. Check that the right four are selected.`),O},[B]),Pr=Q.useMemo(()=>!!B?.streams.some(O=>O.measures.some(se=>se.some(pe=>pe.lyrics.length>0))),[B]);return m.jsxs("div",{className:"app",children:[m.jsxs("header",{className:"topbar",children:[m.jsxs("div",{className:"brand",children:[m.jsx("span",{className:"brand-mark","aria-hidden":!0,children:"♫"}),m.jsxs("div",{className:"brand-text",children:[m.jsx("div",{className:"brand-title",children:"Bach Bag Bax"}),m.jsx("div",{className:"brand-sub",children:"Four voices → two staves & a two-track MIDI file"})]})]}),m.jsx("div",{className:"topbar-spacer"}),f&&m.jsxs("div",{className:"file-chip",children:[m.jsx(et.File,{}),m.jsx("strong",{children:f}),m.jsx("button",{type:"button",className:"btn icon ghost",onClick:Tr,title:"Close this file",children:m.jsx(et.Close,{})})]}),m.jsxs("div",{className:"topbar-actions",children:[m.jsx("button",{type:"button",className:"btn icon ghost",onClick:()=>a(O=>O==="dark"?"light":"dark"),title:l==="dark"?"Switch to light interface":"Switch to dark interface",children:l==="dark"?m.jsx(et.Sun,{}):m.jsx(et.Moon,{})}),B&&m.jsxs(m.Fragment,{children:[m.jsxs("button",{type:"button",className:"btn",onClick:()=>Co(),title:"Download the MIDI file",children:[m.jsx(et.Download,{})," MIDI"]}),m.jsxs("button",{type:"button",className:"btn primary",onClick:Zn,title:"Print or save as PDF",children:[m.jsx(et.Print,{})," Print"]})]})]})]}),m.jsxs("div",{className:"main",children:[B?m.jsx(uh,{score:B,merged:$e,settings:j,roles:ge,layout:x,midiOptions:z,hasLyrics:Pr,canSplitChords:Os(v??B),scoreHasRepeats:Qm(B.measures),showGuides:w,warnings:_r,onSettings:zn,onLayout:tt,onMidi:Lt,onGuides:Y,onResetLayout:()=>_(Xs),midiImport:s?.kind==="midi"?d:null,onMidiImport:kt,onFitOctaves:an,onResetOctaves:Er,onDownloadMidi:Co,onDownloadXml:jr}):m.jsx("aside",{className:"sidebar",children:m.jsxs("div",{className:"panel-body",style:{paddingTop:18},children:[m.jsxs(yo,{kind:"info",icon:"i",children:[m.jsx("strong",{children:"How it works"}),m.jsx("div",{style:{marginTop:6},children:"Your four voices are matched to soprano, alto, tenor and bass, then written onto two staves: soprano with tenor, alto with bass. You can change any of that, resize and re-space the page, print at A4 or A5, and export a two-track MIDI file."})]}),ee&&m.jsxs(yo,{kind:"error",icon:"!",children:[m.jsx("strong",{children:"That file could not be read"}),m.jsx("pre",{children:ee})]})]})}),m.jsxs("main",{className:"preview",children:[B&&m.jsxs("div",{className:"preview-bar",children:[m.jsxs("span",{children:[ne.length," page",ne.length===1?"":"s"," · ",B.measures.length," bars"]}),m.jsx("div",{className:"sep"}),m.jsxs("span",{children:[Oi(it.pageWidth)," × ",Oi(it.pageHeight)," mm"]}),m.jsx("div",{className:"topbar-spacer"}),m.jsxs("div",{className:"zoom-group",children:[m.jsx("button",{type:"button",className:"btn icon ghost",onClick:()=>So(-.1),title:"Zoom out",children:m.jsx(et.Minus,{})}),m.jsxs("span",{className:"zoom-value",children:[Math.round(un*100),"%"]}),m.jsx("button",{type:"button",className:"btn icon ghost",onClick:()=>So(.1),title:"Zoom in",children:m.jsx(et.Plus,{})})]}),m.jsxs("div",{className:"segmented",style:{padding:2},children:[m.jsx("button",{type:"button","aria-pressed":ie==="fit",onClick:()=>ae("fit"),children:"Fit"}),m.jsx("button",{type:"button","aria-pressed":ie==="manual"&&Math.abs(ye-1)<.001,onClick:()=>{ke(1),ae("manual")},children:"100%"})]})]}),m.jsxs("div",{className:"preview-body",children:[L&&B&&m.jsxs("div",{className:"busy-pill",children:[m.jsx("span",{className:"spinner"})," Engraving"]}),B?Rn.error?m.jsx("div",{className:"preview-scroll",children:m.jsx("div",{style:{maxWidth:620,margin:"40px auto"},children:m.jsxs(yo,{kind:"warn",icon:"!",children:[m.jsx("strong",{children:"Nothing to show yet"}),m.jsx("div",{style:{marginTop:6},children:Rn.error})]})})}):re?m.jsx("div",{className:"preview-scroll",children:m.jsx("div",{style:{maxWidth:620,margin:"40px auto"},children:m.jsxs(yo,{kind:"error",icon:"!",children:[m.jsx("strong",{children:"The score could not be engraved"}),m.jsx("pre",{children:re})]})})}):ne.length===0?m.jsxs("div",{className:"preview-busy",children:[m.jsx("span",{className:"spinner"}),m.jsx("span",{children:"Preparing the engraver…"})]}):m.jsx("div",{className:"preview-scroll",ref:me,children:m.jsx(fh,{pages:ne,geometry:it,zoom:un,showGuides:w,activeMeasure:Fn,followCursor:le})}):m.jsx(lh,{onFile:dt,onSample:De,busy:D})]}),B&&zt&&m.jsx(ph,{playing:b,position:V,duration:zt.duration,staffLabels:(Bt??["Staff 1","Staff 2"]).map((O,se)=>O||`Staff ${se+1}`),mutedStaves:R,followCursor:le,onToggleFollow:()=>ue(O=>!O),onPlayPause:Dn,onStop:Ut,onSeek:O=>{ve.current?.seek(O),S(O)},onToggleMute:ko})]})]}),Yt&&m.jsx("div",{className:"drop-overlay",children:m.jsx("div",{children:"Drop to open"})})]})}function Oi(l){return Math.round(l*10)/10}function mf(l,a){const s=URL.createObjectURL(l),c=document.createElement("a");c.href=s,c.download=a,document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}const Tf=document.getElementById("root");if(!Tf)throw new Error("Missing #root element");Ld.createRoot(Tf).render(m.jsx(Q.StrictMode,{children:m.jsx(hh,{})}));export{af as _};
