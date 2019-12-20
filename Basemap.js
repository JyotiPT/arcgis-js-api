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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./geometry","./core/arrayUtils","./core/Collection","./core/collectionUtils","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/maybe","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./portal/Portal","./portal/PortalItem","./support/basemapDefinitions","./webdoc/support/writeUtils"],function(e,r,t,o,a,n,i,s,l,p,u,c,f,y,d,h,m,b,L,I,g,v){var w=0,S=y.getLogger("esri.Basemap");return function(r){function p(e){var t=r.call(this,e)||this;t.id=null,t.portalItem=null,t.spatialReference=null,t.thumbnailUrl=null,t.title="Basemap",t.id=Date.now().toString(16)+"-basemap-"+w++,t.baseLayers=new s,t.referenceLayers=new s;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,"elevation"===e.type&&S.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a basemap layer and will therefore be ignored.")},a=function(e){e.parent=null};return t.baseLayers.on("after-add",function(e){return o(e.item)}),t.referenceLayers.on("after-add",function(e){return o(e.item)}),t.baseLayers.on("after-remove",function(e){return a(e.item)}),t.referenceLayers.on("after-remove",function(e){return a(e.item)}),t}o(p,r),c=p,p.prototype.initialize=function(){var e=this;this.when().catch(function(r){S.error("#load()","Failed to load basemap (title: '"+e.title+"', id: '"+e.id+"')",r)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},p.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),e=t({},e),delete e.resourceInfo),e},Object.defineProperty(p.prototype,"baseLayers",{set:function(e){this._set("baseLayers",l.referenceSetter(e,this._get("baseLayers")))},enumerable:!0,configurable:!0}),p.prototype.writeBaseLayers=function(e,r,o,a){var n=this,i=[];if(!e)return void(r[o]=i);a=t({},a,{layerContainerType:"basemap"}),this.baseLayers.forEach(function(e){var r=v.getLayerJSON(e,n._getLayerJSONFromResourceInfo(e),a);d.isSome(r)&&i.push(r)}),this.referenceLayers.forEach(function(e){var r=v.getLayerJSON(e,n._getLayerJSONFromResourceInfo(e),a);d.isSome(r)&&(r.isReference=!0,i.push(r))}),r[o]=i},Object.defineProperty(p.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",l.referenceSetter(e,this._get("referenceLayers")))},enumerable:!0,configurable:!0}),p.prototype.writeTitle=function(e,r){r.title=e||"Basemap"},p.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource(e)),this.when()},p.prototype.loadAll=function(){var e=this;return f.loadAll(this,function(r){r(e.baseLayers,e.referenceLayers)})},p.prototype.clone=function(){var e={id:this.id,title:this.title,portalItem:this.portalItem,baseLayers:this.baseLayers.slice(),referenceLayers:this.referenceLayers.slice()};return this.loaded&&(e.loadStatus="loaded"),new c({resourceInfo:this.resourceInfo}).set(e)},p.prototype.read=function(e,r){this.resourceInfo||this._set("resourceInfo",{data:e,context:r}),this.inherited(arguments)},p.prototype.write=function(e,r){return e=e||{},r&&r.origin||(r=t({origin:"web-map"},r)),this.inherited(arguments,[e,r]),!this.loaded&&this.resourceInfo&&this.resourceInfo.data.baseMapLayers&&(e.baseMapLayers=this.resourceInfo.data.baseMapLayers.map(function(e){var r=u.clone(e);return r.url&&m.isProtocolRelative(r.url)&&(r.url="https:"+r.url),r.templateUrl&&m.isProtocolRelative(r.templateUrl)&&(r.templateUrl="https:"+r.templateUrl),r})),e},p.prototype._loadFromSource=function(e){var r=this,t=r.resourceInfo,o=r.portalItem;if(h.throwIfAborted(e),t){var a=t.context?t.context.url:null;return this._loadLayersFromJSON(t.data,a,e)}return o?this._loadFromItem(o,e):h.resolve(null)},p.prototype._loadLayersFromJSON=function(r,t,o){var a=this,n=this.resourceInfo&&this.resourceInfo.context,i=this.portalItem&&this.portalItem.portal||n&&n.portal||null,s=n&&"web-scene"===n.origin?"web-scene":"web-map";return h.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){var n=[];if(h.throwIfAborted(o),r.baseMapLayers&&Array.isArray(r.baseMapLayers)){var l={context:{origin:s,url:t,portal:i,layerContainerType:"basemap"},defaultLayerType:"DefaultTileLayer"},p=e.populateOperationalLayers(a.baseLayers,r.baseMapLayers.filter(function(e){return!e.isReference}),l);n.push(p);var u=e.populateOperationalLayers(a.referenceLayers,r.baseMapLayers.filter(function(e){return e.isReference}),l);n.push(u)}return h.eachAlways(n)}).then(function(){})},p.prototype._loadFromItem=function(e,r){var t=this;return e.load(r).then(function(e){return e.fetchData("json",r)}).then(function(o){var a=m.urlToObject(e.itemUrl);return t._set("resourceInfo",{data:o.baseMap,context:{origin:"web-map",portal:e.portal||L.getDefault(),url:a}}),t.read(t.resourceInfo.data,t.resourceInfo.context),t.read({spatialReference:o.spatialReference},t.resourceInfo.context),t.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||L.getDefault(),url:a}),t._loadLayersFromJSON(t.resourceInfo.data,a,r)})},p.prototype._getLayerJSONFromResourceInfo=function(e){var r=this.get("resourceInfo.data.baseMapLayers");return d.isSome(r)?i.find(r,function(r){return r.id===e.id}):null},p.fromId=function(e){var r=g.esriBasemapDefinitions[e];return r?c.fromJSON(r):null};var c;return a([b.property({json:{write:{ignoreOrigin:!0,target:"baseMapLayers"}}})],p.prototype,"baseLayers",null),a([b.writer("baseLayers")],p.prototype,"writeBaseLayers",null),a([b.property({type:String,json:{origins:{"web-scene":{write:!0}}}})],p.prototype,"id",void 0),a([b.property({type:I})],p.prototype,"portalItem",void 0),a([b.property()],p.prototype,"referenceLayers",null),a([b.property({readOnly:!0})],p.prototype,"resourceInfo",void 0),a([b.property({type:n.SpatialReference})],p.prototype,"spatialReference",void 0),a([b.property()],p.prototype,"thumbnailUrl",void 0),a([b.property({type:String,json:{origins:{"web-scene":{write:{isRequired:!0}}}}})],p.prototype,"title",void 0),a([b.writer("title")],p.prototype,"writeTitle",null),p=c=a([b.subclass("esri.Basemap")],p)}(b.declared(p.JSONSupportMixin(c)))});