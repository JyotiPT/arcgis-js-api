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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../geometry","../core/Collection","../core/CollectionFlattener","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/accessorSupport/decorators","../geometry/SpatialReference","./Layer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/KMLSublayer","./support/kmlUtils"],function(e,r,t,o,i,n,l,s,a,p,u,y,c,f,d,b,h,v,g,S,m,O){return function(e){function r(r,t){var o=e.call(this,r,t)||this;return o._visibleFolders=[],o.allSublayers=new p({root:o,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return e.sublayers}}),o.outSpatialReference=d.WGS84,o.path=null,o.operationalLayerType="KML",o.sublayers=null,o.type="kml",o.url=null,o}return o(r,e),r.prototype.initialize=function(){var e=this;this.watch("sublayers",function(r,t){t&&t.forEach(function(e){e.parent=null,e.layer=null}),r&&r.forEach(function(r){r.parent=e,r.layer=e})},!0),this.on("sublayer-update",function(){return e.notifyChange("fullExtent")})},r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t({url:e},r):e},r.prototype.readSublayersFromItemOrWebMap=function(e,r){this._visibleFolders=r.visibleFolders},r.prototype.readSublayers=function(e,r,t){return O.sublayersFromJSON(m,r,t,this._visibleFolders)},r.prototype.writeSublayers=function(e,r){for(var t=e,o=[],i=t.toArray();i.length;){var n=i[0];n.networkLink||(n.visible&&o.push(n.id),n.sublayers&&i.push.apply(i,n.sublayers.toArray())),i.shift()}r.visibleFolders=o},Object.defineProperty(r.prototype,"title",{get:function(){if(this._get("title")&&"defaults"!==this.originOf("title"))return this._get("title");if(this.url){var e=this.url.substring(this.url.lastIndexOf("/")+1,this.parsedUrl.path.lastIndexOf("."));return 0===e.length&&(e="KML"),e}return this._get("title")||""},set:function(e){this._set("title",e)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"visibleSublayers",{get:function(){var e=this.sublayers,r=[],t=function(e){e.visible&&(r.push(e),e.sublayers&&e.sublayers.forEach(t))};return e&&e.forEach(t),r},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"fullExtent",{get:function(){return this._recomputeFullExtent()},enumerable:!0,configurable:!0}),r.prototype.load=function(e){var r=this,t=u.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"]},e).then(function(){return r._fetchService(t)})),this.when()},r.prototype._fetchService=function(e){return l(this,void 0,void 0,function(){var r,t,o=this;return n(this,function(i){switch(i.label){case 0:return[4,c.resolve().then(function(){return o.resourceInfo?{ssl:!1,data:o.resourceInfo}:O.fetchService(o.url,o.outSpatialReference,o.refreshInterval,e)})];case 1:return r=i.sent(),t=O.parseKML(r.data),t&&this.read(t,{origin:"service"}),[2]}})})},r.prototype._recomputeFullExtent=function(){var e=null;this.extent&&(e=this.extent.clone());var r=function(t){if(t.sublayers)for(var o=0,i=t.sublayers.items;o<i.length;o++){var n=i[o];r(n),n.visible&&n.fullExtent&&(e?e.union(n.fullExtent):e=n.fullExtent.clone())}};return r(this),e},i([f.property({readOnly:!0})],r.prototype,"allSublayers",void 0),i([f.property({type:d})],r.prototype,"outSpatialReference",void 0),i([f.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],r.prototype,"path",void 0),i([f.property({type:["show","hide","hide-children"]})],r.prototype,"listMode",void 0),i([f.property({type:["KML"]})],r.prototype,"operationalLayerType",void 0),i([f.property({type:a.ofType(m),json:{write:{ignoreOrigin:!0}}})],r.prototype,"sublayers",void 0),i([f.reader(["web-map","portal-item"],"sublayers",["visibleFolders"])],r.prototype,"readSublayersFromItemOrWebMap",null),i([f.reader("service","sublayers",["sublayers"])],r.prototype,"readSublayers",null),i([f.writer("sublayers")],r.prototype,"writeSublayers",null),i([f.property({readOnly:!0,json:{read:!1}})],r.prototype,"type",void 0),i([f.property({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}},dependsOn:["url","parsedUrl"]})],r.prototype,"title",null),i([f.property()],r.prototype,"url",void 0),i([f.property({readOnly:!0,dependsOn:["sublayers"]})],r.prototype,"visibleSublayers",null),i([f.property({type:s.Extent})],r.prototype,"extent",void 0),i([f.property({dependsOn:["extent"]})],r.prototype,"fullExtent",null),r=i([f.subclass("esri.layers.KMLLayer")],r)}(f.declared(g.RefreshableLayer(S.ScaleRangeLayer(h.OperationalLayer(v.PortalLayer(y.MultiOriginJSONMixin(b)))))))});