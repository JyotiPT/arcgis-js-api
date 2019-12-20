// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../compilerUtils","../Logger"],function(e,n,r,t){function u(e){return null==e?e:new Date(e)}function o(e){return null==e?e:!!e}function a(e){return null==e?e:e.toString()}function i(e){return null==e?e:"number"==typeof e&&isNaN(e)?0:parseFloat(e)}function s(e){return null==e?e:Math.round(parseFloat(e))}function l(e){return e&&e.constructor&&void 0!==e.constructor._meta}function c(e,n){return null!=n&&e&&!(n instanceof e)}function f(e){return e&&("isCollection"in e||e._meta&&e._meta.bases&&e._meta.bases.some(function(e){return"isCollection"in e}))}function y(e){return e&&e.Type?"function"==typeof e.Type?e.Type:e.Type.base:null}function p(e,n){if(!n||!n.constructor||!f(n.constructor))return v(e,n)?n:new e(n);var r=y(e.prototype.itemType),t=y(n.constructor.prototype.itemType);if(!r)return n;if(!t)return new e(n);if(r===t)return n;var u=t._meta&&t._meta.bases;return u&&-1!==u.indexOf(r)?new e(n):(v(e,n),n)}function v(e,n){return!!l(n)&&(D.error("Accessor#set","Assigning an instance of '"+(n.declaredClass||"unknown")+"' which is not a subclass of '"+g(e)+"'"),!0)}function d(e,n){return null==n?n:f(e)?p(e,n):c(e,n)?v(e,n)?n:new e(n):n}function g(e){return e&&e.prototype&&e.prototype.declaredClass||"unknown"}function b(e){switch(e){case Number:return i;case F:return s;case Boolean:return o;case String:return a;case Date:return u;default:return d.bind(null,e)}}function h(e,n){var r=b(e);return 1===arguments.length?r:r(n)}function m(e,n,r){return 1===arguments.length?m.bind(null,e):n?Array.isArray(n)?n.map(function(n){return e(n,r)}):[e(n,r)]:n}function A(e,n){return 1===arguments.length?m(h.bind(null,e)):m(h.bind(null,e),n)}function w(e,n,r){return 0!==n&&Array.isArray(r)?r.map(function(r){return w(e,n-1,r)}):e(r)}function T(e,n,r){if(2===arguments.length)return T.bind(null,e,n);if(!r)return r;r=w(e,n,r);for(var t=n,u=r;t>0&&Array.isArray(u);)t--,u=u[0];if(void 0!==u)for(var o=0;o<t;o++)r=[r];return r}function N(e,n,r){return 2===arguments.length?T(h.bind(null,e),n):T(h.bind(null,e),n,r)}function O(e){return!!Array.isArray(e)&&!e.some(function(n){var r=typeof n;return!("string"===r||"number"===r||"function"===r&&e.length>1)})}function j(e,n){if(2===arguments.length)return j(e).call(null,n);for(var r=new Set,t=e.filter(function(e){return"function"!=typeof e}),u=e.filter(function(e){return"function"==typeof e}),o=0,a=e;o<a.length;o++){var i=a[o];"string"!=typeof i&&"number"!=typeof i||r.add(i)}var s=null,l=null;return function(e,n){if(null==e)return e;var o=typeof e,a="string"===o||"number"===o;return a&&(r.has(e)||u.some(function(e){return"string"===o&&e===String||"number"===o&&e===Number}))?e:"object"===o&&u.some(function(n){return!c(e,n)})?e:(a&&t.length?(s||(s=t.map(function(e){return"string"==typeof e?"'"+e+"'":""+e}).join(", ")),D.error("Accessor#set","'"+e+"' is not a valid value for this property, only the following values are valid: "+s)):"object"==typeof e&&u.length?(l||(l=u.map(function(e){return g(e)}).join(", ")),D.error("Accessor#set","'"+e+"' is not a valid value for this property, value must be one of "+l)):D.error("Accessor#set","'"+e+"' is not a valid value for this property"),n&&(n.valid=!1),null)}}function k(e,n){if(2===arguments.length)return k(e).call(null,n);var r={},t=[],u=[];for(var o in e.typeMap){var a=e.typeMap[o];r[o]=h(a),t.push(g(a)),u.push(o)}var i=function(){return"'"+t.join("', '")+"'"},s=function(){return"'"+u.join("', '")+"'"},f="string"==typeof e.key?function(n){return n[e.key]}:e.key;return function(n){if(e.base&&!c(e.base,n))return n;if(null==n)return n;var t=f(n)||e.defaultKeyValue,u=r[t];if(!u)return D.error("Accessor#set","Invalid property value, value needs to be one of "+i()+", or a plain object that can autocast (having .type = "+s()+")"),null;if(!c(e.typeMap[t],n))return n;if("string"==typeof e.key&&!l(n)){var o={};for(var a in n)a!==e.key&&(o[a]=n[a]);return u(o)}return u(n)}}function S(e){if(!(e&&"type"in e))return!1;switch(e.type){case"native":case"array":case"one-of":return!0;default:r.neverReachedSilent(e)}return!1}function _(e){switch(e.type){case"native":return h(e.value);case"array":return m(_(e.value));case"one-of":return C(e);default:r.neverReached(e)}return null}function C(e){var n=null;return function(r,t){return B(r,e)?r:(null==n&&(n=M(e)),D.error("Accessor#set","Invalid property value, value needs to be of type "+n),t&&(t.valid=!1),null)}}function M(e){switch(e.type){case"native":switch(e.value){case Number:return"number";case String:return"string";case Boolean:return"boolean";case F:return"integer";case Date:return"date";default:return g(e.value)}case"array":return"array of "+M(e.value);case"one-of":var n=e.values.map(function(e){return M(e)});return"one of "+n.slice(0,n.length-1)+" or "+n[n.length-1];default:r.neverReached(e)}return"unknown"}function B(e,n){if(null==e)return!0;switch(n.type){case"native":switch(n.value){case Number:case F:return"number"==typeof e;case Boolean:return"boolean"==typeof e;case String:return"string"==typeof e}return e instanceof n.value;case"array":return!!Array.isArray(e)&&!e.some(function(e){return!B(e,n.value)});case"one-of":return n.values.some(function(n){return B(e,n)})}}Object.defineProperty(n,"__esModule",{value:!0});var D=t.getLogger("esri.core.Accessor");n.ensureDate=u,n.ensureBoolean=o,n.ensureString=a,n.ensureNumber=i,n.ensureInteger=s,n.isClassedType=l,n.requiresType=c,n.ensureClass=d,n.ensureType=h,n.ensureArrayTyped=m,n.ensureArray=A,n.ensureNArrayTyped=T,n.ensureNArray=N,n.isOneOf=O,n.ensureOneOf=j,n.ensureOneOfType=k;var F=function(){function e(){}return e}();n.Integer=F,n.types={native:function(e){return{type:"native",value:e}},array:function(e){return{type:"array",value:e}},oneOf:function(e){return{type:"one-of",values:e}}},n.isLongFormType=S,n.ensureLongFormType=_,n.default=h});