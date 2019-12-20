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

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/tsSupport/extendsHelper","../../core/tsSupport/assignHelper","../../core/Error","../../core/promiseUtils","../schema","./utils"],function(e,t,r,n,i,s,o,u,c,a){function l(e,t){if(t.properties){if("layerType"in t.properties)return t.properties.layerType.enum[0];if("type"in t.properties)return t.properties.type.enum[0]}switch(e){case"multipoint_geometry_schema.json":return"multipoint";case"point_geometry_schema.json":return"point";case"polyline_geometry_schema.json":return"polyline";case"polygon_geometry_schema.json":return"polygon";case"extent_schema.json":return"extent"}}function f(e){return"array"===e.type?f(e.items)+"[]":e.type}function p(e){var t={count:e.length,refsCount:0,typesCount:0,distinctTypes:[],type:null},r=new Set;for(var n in e){var i=e[n];i.$ref?t.refsCount++:i.type&&(t.typesCount++,r.add(f(i)))}return r.forEach(function(e){return t.distinctTypes.push(e)}),t.distinctTypes.sort(),t.refsCount===t.count?t.type="refs":2===t.count&&t.refsCount>0&&1===t.distinctTypes.length&&"null"===t.distinctTypes[0]?t.type="refsAndNull":t.typesCount===t.count?(t.type="types",t.distinctTypes=t.distinctTypes):t.type="mix",t}function h(e){return"array"===e.type||!("properties"in e)}function d(e,t,r){return r.hasFilteredProperties?e+"--"+t+"--"+r.filteredPropertiesArray.join("/"):e+"--"+t}function m(e,t,i,s,o){return n(this,void 0,void 0,function(){var n,u,c,a,f;return r(this,function(r){switch(r.label){case 0:return n=l(e,i),(s=s?s.replace("<?TYPE?>",n?"<"+n+">":""):null,h(i))?(u=o.currentClass?null:{type:e,name:e,id:e+"--"+t,typeValue:t,properties:[]},u&&o.push(null,u),[4,q(i,s,o)]):[3,2];case 1:return r.sent(),[2,u];case 2:return c=d(e,t,o),(a="drawingInfo_schema.json"!==e&&o.seen.get(c))&&s?(o.addProperty({name:s,type:a}),[2,a]):(f={type:e,name:e,id:c,typeValue:t,properties:[]},s&&o.addProperty({name:s,type:f}),o.push(s,f),[4,q(i,"",o)]);case 3:return r.sent(),[2,o.pop()]}})})}function y(e,t,i){return n(this,void 0,void 0,function(){var n,o,u,c,a,l,f;return r(this,function(r){switch(r.label){case 0:return[4,i.requestSchema(e.$ref)];case 1:if(n=r.sent(),!(o=T(n.schema)))return[3,6];u=0,c=o,r.label=2;case 2:return u<c.length?(a=c[u],l=s({},n.schema),l.properties=s({},l.properties,{type:{type:"string",enum:[a]}}),f=-1===t.indexOf("<?TYPE?>")?t+"<?TYPE?>":t,[4,m(n.schemaId,a,l,f,i)]):[3,5];case 3:r.sent(),r.label=4;case 4:return u++,[3,2];case 5:return[2,void 0];case 6:return[4,m(n.schemaId,null,n.schema,t,i)];case 7:return r.sent(),[2,void 0]}})})}function v(e,t){return!!j(e)&&(/.*pointCloudLayer_schema\.json\/layerDefinition_schema\.json\/drawingInfo_schema\.json$/.test(e.stack.map(function(e){return e.klass.type}).join("/"))&&"renderer"===t)}function g(e,t){return!!j(e)&&(/.*rasterDataLayer_schema\/.json\/layerDefinition_schema\.json\/drawingInfo_schema\.json$/.test(e.stack.map(function(e){return e.klass.type}).join("/"))&&"renderer"===t)}function j(e){return e.currentClass&&"drawingInfo_schema.json"===e.currentClass.name}function w(e){return e.currentClass&&"operationalLayers_schema.json"===e.currentClass.name}function b(e,t,r){if(j(r)){var n=v(r,t),i=g(r,t);return e.filter(function(e){if(/uniqueValueFromStyleRenderer_schema\.json$/.test(e.$ref))return!1;var t=/pointCloud.*Renderer/.test(e.$ref),r=/raster.*Renderer/.test(e.$ref);return n===t&&r===i})}return w(r)?e.filter(function(e){return"kmlLayer_schema.json"!==e.$ref}):e}function P(e,t,i){return n(this,void 0,void 0,function(){return r(this,function(r){switch(r.label){case 0:return[4,q(e.items,t+"[]",i)];case 1:return r.sent(),[2]}})})}function _(e,t,i){return n(this,void 0,void 0,function(){var s=this;return r(this,function(o){switch(o.label){case 0:return[4,i.withFilteredProperties(null,function(o){return n(s,void 0,void 0,function(){var n,s,u,c,a;return r(this,function(r){switch(r.label){case 0:n=[];for(s in e.properties)n.push(s);u=0,r.label=1;case 1:return u<n.length?(c=n[u],o&&!o.has(c)?[3,3]:(a=t?t+"."+c:c,[4,q(e.properties[c],a,i)])):[3,4];case 2:r.sent(),r.label=3;case 3:return u++,[3,1];case 4:return[2]}})})})];case 1:return o.sent(),[2]}})})}function O(e,t,r){void 0===t&&(t=""),void 0===r&&(r=new Set);for(var n=0,i=e;n<i.length;n++){var s=i[n];if("properties"in s)for(var o in s.properties){var u=s.properties[o],c=t?t+"."+o:o,a=Object.keys(u);if(0===a.length||1===a.length&&"$ref"===a[0])r.add(c);else{if(1!==a.length||"allOf"!==a[0])throw new Error("unexpected allOf filter construct: "+JSON.stringify(u));r.add(c),O(u.allOf,c,r)}}}return r}function S(e,t,i){return n(this,void 0,void 0,function(){var n,s,o,u,c;return r(this,function(r){switch(r.label){case 0:for(n=null,s=0,o=e.allOf;s<o.length;s++)if("$ref"in(u=o[s])){if(n)throw new Error("Cannot process more than 1 ref in an allOf construct");n=u}else if(!("properties"in u))throw new Error("allOf construct only allows simple top-level property filters");return c=O(e.allOf),[4,i.withFilteredProperties(c,function(){return y(n,t,i)})];case 1:return r.sent(),[2]}})})}function C(e,t,i){return n(this,void 0,void 0,function(){var n,s,o,u,c,l,f,h,d,m;return r(this,function(r){switch(r.label){case 0:if(n=p(e.oneOf),"refs"!==n.type&&"refsAndNull"!==n.type)return[3,6];s=b(e.oneOf,t,i),o=0,u=s,r.label=1;case 1:return o<u.length?(c=u[o],"null"!==c.type?[3,2]:[3,4]):[3,5];case 2:return[4,q(c,(t||"")+"<?TYPE?>",i)];case 3:r.sent(),r.label=4;case 4:return o++,[3,1];case 5:return[2];case 6:if("types"===n.type)return i.addProperty({name:t,type:a.sorted(n.distinctTypes).join("|")}),[2];l=[];for(f in e.oneOf)l.push(f);h=0,r.label=7;case 7:return h<l.length?(d=l[h],m=".oneOf["+d+"]",[4,q(e.oneOf[d],""+t+m,i)]):[3,10];case 8:r.sent(),r.label=9;case 9:return h++,[3,7];case 10:return[2]}})})}function T(e){if("layerDefinition"===e.title)return null;var t=e.properties&&e.properties.type;return t&&t.enum?t.enum:null}function R(e,t,i){return n(this,void 0,void 0,function(){return r(this,function(r){switch(r.label){case 0:return[4,y(e,t,i)];case 1:return r.sent(),[2]}})})}function $(e,t,i){return n(this,void 0,void 0,function(){var n,s;return r(this,function(r){return n="unknown",e.type&&(n=Array.isArray(e.type)?a.sorted(e.type).join("|"):e.type.replace(/ /g,"").split(",").join("|")),s={name:t,type:n,default:e.default},e.enum&&(s.enum=a.sorted(e.enum).map(function(e){return"string"==typeof e?'"'+e+'"':""+e}).join("|")),i.addProperty(s),[2]})})}function q(e,t,i){return n(this,void 0,void 0,function(){return r(this,function(r){return"array"===e.type?[2,P(e,t,i)]:"properties"in e?[2,_(e,t,i)]:"allOf"in e?[2,S(e,t,i)]:"oneOf"in e?[2,C(e,t,i)]:"$ref"in e?[2,R(e,t,i)]:[2,$(e,t,i)]})})}function E(e){return 0===e.indexOf(L)?e.slice(L.length):e}function x(e,t){return n(this,void 0,void 0,function(){var n;return r(this,function(r){switch(r.label){case 0:return[4,k.create(e,t)];case 1:return n=r.sent(),[2,m((e||"webScene")+"_schema.json",null,n.schemaRoot,null,n)]}})})}Object.defineProperty(t,"__esModule",{value:!0});var L="#/definitions/";t.scan=x;var k=function(t){function s(e,r,n){var i=t.call(this)||this;return i.definitions=e,i.schemaRoot=r,i.requestSchema=n,i.filteredProperties=null,i.requestSchema.bind(i),i}return i(s,t),Object.defineProperty(s.prototype,"hasFilteredProperties",{get:function(){return this.filteredProperties&&this.filteredProperties.size>0},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"filteredPropertiesArray",{get:function(){var e=[];return this.filteredProperties.forEach(function(t){return e.push(t)}),e},enumerable:!0,configurable:!0}),s.prototype.withFilteredProperties=function(e,t){return n(this,void 0,void 0,function(){var n,i,s,o=this;return r(this,function(r){switch(r.label){case 0:return n=this.filteredProperties,this.filteredProperties=null,i=function(e){o.filteredProperties||(o.filteredProperties=new Set),o.filteredProperties.add(e)},n&&n.forEach(function(e){var t=e.split(".");t.length>1&&(i(t[0]),i(t.slice(1).join(".")))}),e&&e.forEach(i),[4,t(n)];case 1:return s=r.sent(),this.filteredProperties=n,[2,s]}})})},s.create=function(e,t){return n(this,void 0,void 0,function(){return r(this,function(r){return t&&t.useRemoteSchema?[2,s.createRemote(e,t.baseUrl)]:[2,s.createLocal(e)]})})},s.createLocal=function(e){var t=e?c.json.definitions[e+"_schema.json"]:c.json;return new s(c.json.definitions,t,s.getLocalSchemaRequest())},s.createRemote=function(e,t){return n(this,void 0,void 0,function(){var n,i,o;return r(this,function(r){switch(r.label){case 0:return[4,s.getRemoteSchemaRequest(t)];case 1:return n=r.sent(),i=new s({},null,n),[4,i.requestSchema((e||"webscene")+"_schema.json")];case 2:return o=r.sent().schema,[2,new s(i.definitions,o,n)]}})})},s.getLocalSchemaRequest=function(){return function(e){var t=E(e),r=this.definitions[t];return r?u.resolve({schemaId:t,schema:r}):u.reject(new o("flatspec-spec:invalid-local-schema","Schema reference is not a local reference"))}},s.getRemoteSchemaRequest=function(t){return n(this,void 0,void 0,function(){var n,i;return r(this,function(r){switch(r.label){case 0:return t?(n=s.getLocalSchemaRequest(),[4,u.create(function(t){return e(["../../request"],t)})]):[2,u.reject(new o("flatspec-spec:missing-base-url","The base url of the remote schema directory must be specified when using a remote schema"))];case 1:return i=r.sent(),[2,function(e){var r=this;return n.call(this,e).catch(function(){return i(t+"/"+e,{responseType:"json"}).then(function(t){return r.definitions[E(e)]=t.data,{schemaId:e,schema:t.data}})})}]}})})},s}(a.ScanContext);t.schemaDefinitions=Object.keys(c.json.definitions).map(function(e){return e.replace(/_schema\.json$/,"")})});