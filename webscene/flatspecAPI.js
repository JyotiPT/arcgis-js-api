// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../WebScene","../Basemap","../Ground","../core/JSONSupport","../core/MultiOriginJSONSupport","../core/requireUtils","../layers/GroupLayer","../layers/mixins/OperationalLayer","../core/accessorSupport/extensions/serializableProperty/type"],function(e,t,n,r,a,s,i,o,u,p,c,l,y){function h(e){return r(this,void 0,void 0,function(){var t,r;return n(this,function(n){switch(n.label){case 0:return t=new L,[4,w({typeName:"json",type:e},t)];case 1:return n.sent(),r=t.flatProperties,r.sort(function(e,t){return e.path.localeCompare(t.path)}),[2,r]}})})}function f(e){return r(this,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:return t=new L({classPaths:{},cacheEnabled:!1}),[4,w({typeName:"json",type:e},t)];case 1:return n.sent(),[2,t.classPaths]}})})}function d(e,t){return r(this,void 0,void 0,function(){var r;return n(this,function(n){switch(n.label){case 0:switch(r=e.typeName){case"array":return[3,1];case"union":return[3,3];case"json":return[3,5];case"native":return[3,7]}return[3,9];case 1:return[4,v(e,t)];case 2:return n.sent(),[3,9];case 3:return[4,g(e,t)];case 4:return n.sent(),[3,9];case 5:return[4,w(e,t)];case 6:return n.sent(),[3,9];case 7:return[4,b(e,t)];case 8:return n.sent(),[3,9];case 9:return[2]}})})}function b(e,t){return r(this,void 0,void 0,function(){return n(this,function(n){return t.addProperty({path:t.pathString,type:k(e)}),[2]})})}function v(e,t){return r(this,void 0,void 0,function(){return n(this,function(n){switch(n.label){case 0:return t.pushPath(t.popPath()+"[]"),[4,d(e.elementType,t)];case 1:return n.sent(),[2]}})})}function m(e){return B[e]||e}function g(e,t){return r(this,void 0,void 0,function(){var r,a,s,i;return n(this,function(n){switch(n.label){case 0:r=t.popPath(),a=0,s=e.types,n.label=1;case 1:return a<s.length?(i=s[a],t.pushPath(r+"<"+m(i.value)+">"),[4,d(i.type,t)]):[3,4];case 2:n.sent(),t.popPath(),n.label=3;case 3:return a++,[3,1];case 4:return t.pushPath(r),[2]}})})}function P(e,t,o){return r(this,void 0,void 0,function(){return n(this,function(n){switch(n.label){case 0:return e.type!==a||"layers"!==t?[3,2]:[4,j("web-scene/operational-layers")];case 1:return[2,n.sent()];case 2:return e.type!==s||"baseLayers"!==t?[3,4]:[4,j("web-scene/basemap")];case 3:return[2,n.sent()];case 4:return e.type!==i||"layers"!==t?[3,6]:[4,j("web-scene/ground")];case 5:return[2,n.sent()];case 6:return e.type!==c||"layers"!==t?[3,8]:[4,j("web-scene/operational-layers",function(e){return e!==c})];case 7:return[2,n.sent()];case 8:return[2,x(o)]}})})}function w(e,t){return r(this,void 0,void 0,function(){var r,a,s,i,o,u,p,c,l,y,h,f,d,b,v,m,g,w,j,k;return n(this,function(n){switch(n.label){case 0:if(r=e.type.__accessorMetadata__,a=e.type.prototype.declaredClass.replace(/\./g,"/"),s=r&&r.properties,a&&t.classPaths&&(t.classPaths[t.pathString]=a),!s)return t.addProperty({path:t.pathString,type:"unknown"}),[2];if(i=t.seen.get(e.type)){for(o=0,u=i;o<u.length;o++)p=u[o],t.pushPath(p.path),t.addProperty({path:t.pathString,type:p.type}),t.popPath();return[2]}c=t.flatProperties.length,l=t.pathString,y=[];for(h in s)y.push(h);f=0,n.label=1;case 1:return f<y.length?(d=y[f],b=s[d],v=A(b),v&&v.enabled?[4,P(e,d,b)]:[3,6]):[3,7];case 2:return(m=n.sent())?(g=v.target,"string"!=typeof g&&null!=g?[3,4]:[4,S(m,"string"==typeof g?g:d,t)]):[3,6];case 3:return n.sent(),[3,6];case 4:return[4,N(g,t)];case 5:n.sent(),n.label=6;case 6:return f++,[3,1];case 7:if(t.flatProperties.length===c)return t.addProperty({path:t.pathString,type:"unknown"}),[2];for(w=[],j=c;j<t.flatProperties.length;j++)k=t.flatProperties[j],w.push({path:k.path.slice(l.length+1),type:k.type});return t.addSeen(e.type,w),[2]}})})}function S(e,t,a){return r(this,void 0,void 0,function(){return n(this,function(n){switch(n.label){case 0:return a.pushPath(t),[4,d(e,a)];case 1:return n.sent(),a.popPath(),[2]}})})}function N(e,t){return r(this,void 0,void 0,function(){var r,a,s;return n(this,function(n){for(r in e)a=e[r],s=void 0,s=a.types?C(a.types):O(a.type),S(s,r,t);return[2]})})}function j(t,a){return r(this,void 0,void 0,function(){var r,s,i,o,u,c,y,h,f;return n(this,function(n){switch(n.label){case 0:r=l.supportedTypes[t],s={typeName:"union",key:"layerType",types:[]},i=[];for(o in r)i.push(o);u=0,n.label=1;case 1:return u<i.length?(c=i[u],y=l.typeModuleMap[c],y?[4,p.when(e,"../layers/mixins/"+y)]:[3,3]):[3,4];case 2:if(h=n.sent(),a&&!a(h))return[3,3];s.types.push({type:{typeName:"json",type:h},value:c}),n.label=3;case 3:return u++,[3,1];case 4:return 0===s.types.length?[2,null]:(f={typeName:"array",elementType:1===s.types.length?s.types[0].type:s},[2,f])}})})}function k(e){switch(e.typeName){case"array":return k(e.elementType)+"[]";case"union":var t=e.types.map(function(e){return k(e.type)});return""+t.join(" | ");case"native":switch(e.type){case Number:return"number";case String:return"string";case Boolean:return"boolean";default:return"unknown"}case"json":return e.type.prototype.declaredClass}}function T(e){var t=e.prototype.itemType&&e.prototype.itemType.Type;if(!t)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"==typeof t)return{typeName:"array",elementType:O(t)};if(t.typeMap){var n=[];for(var r in t.typeMap)n.push({type:O(t.typeMap[r]),value:r});return{typeName:"array",elementType:{typeName:"union",key:"string"==typeof t.key?t.key:"type",types:n}}}}function x(e){return e.types?C(e.types):M(e)}function C(e){if(Array.isArray(e))return{typeName:"array",elementType:C(e[0])};var t=[];for(var n in e.typeMap)t.push({type:O(e.typeMap[n]),value:n});return 1===t.length?t[0].type:{typeName:"union",key:"string"==typeof e.key?e.key:"type",types:t}}function M(e){var t=e.json&&e.json.type;return O(t||e.type)}function O(e){return e?Array.isArray(e)?{typeName:"array",elementType:O(e[0])}:y.isCollection(e)?T(e):q(e)?{typeName:"native",type:e}:_(e)?{typeName:"json",type:e}:{typeName:"native",type:null}:{typeName:"native",type:null}}function _(e){var t=e._meta&&e._meta.bases;return t?-1!==t.indexOf(o)||-1!==t.indexOf(u):!1}function q(e){return e===String||e===Boolean||e===Number}function A(e){if(!e.json)return null;var t=e.json.origins,n=e.json.write,r=t&&t["web-scene"]&&t["web-scene"].write,a=t&&t["web-document"]&&t["web-document"].write;return r||a||n||null}Object.defineProperty(t,"__esModule",{value:!0}),t.scan=h,t.collectClassPaths=f;var B={"unique-value":"uniqueValue","class-breaks":"classBreaks","point-3d":"PointSymbol3D","line-3d":"LineSymbol3D","mesh-3d":"MeshSymbol3D","polygon-3d":"PolygonSymbol3D","label-3d":"LabelSymbol3D","web-style":"styleSymbolReference",text:"Text",object:"Object",icon:"Icon",fill:"Fill",extrude:"Extrude",line:"Line",path:"Path","point-cloud-class-breaks":"pointCloudClassBreaksRenderer","point-cloud-rgb":"pointCloudRGBRenderer","point-cloud-stretch":"pointCloudStretchRenderer","point-cloud-unique-value":"pointCloudUniqueValueRenderer","fixed-size":"pointCloudFixedSizeAlgorithm",splat:"pointCloudSplatAlgorithm"},L=function(){function e(e){this.flatProperties=[],this.path=[],this.seen=new Map,e&&e.classPaths&&(this.classPaths=e.classPaths),this.cacheEnabled=!(!e||!e.cacheEnabled)}return e.prototype.addProperty=function(e){this.flatProperties.push(e)},e.prototype.addSeen=function(e,t){this.cacheEnabled&&this.seen.set(e,t)},e.prototype.pushPath=function(e){this.path.push(e)},e.prototype.popPath=function(){return this.path.pop()},Object.defineProperty(e.prototype,"pathString",{get:function(){return this.path.join(".")},enumerable:!0,configurable:!0}),e}()});