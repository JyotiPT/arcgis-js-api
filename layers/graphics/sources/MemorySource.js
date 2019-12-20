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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/assignHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../geometry","../../../Graphic","../../../core/Collection","../../../core/Error","../../../core/has","../../../core/Loadable","../../../core/Logger","../../../core/maybe","../../../core/Promise","../../../core/promiseUtils","../../../core/requireUtils","../../../core/workers","../../../core/accessorSupport/decorators","../../../core/accessorSupport/ensureType","../../../tasks/support/FeatureSet","module"],function(e,t,r,o,i,n,s,a,u,p,l,c,d,y,h,f,g,m,v,_,b,S,F){Object.defineProperty(t,"__esModule",{value:!0});var T=0,R=y.getLogger("esri.layers.graphics.sources.MemorySource"),O=function(t){function i(e){var r=t.call(this,e)||this;return r._idToClientGraphic=null,r.type="memory",r}return r(i,t),i.prototype.load=function(e){var t=h.isSome(e)?e.signal:null;return this.addResolvingPromise(this._startWorker(t)),this.when()},Object.defineProperty(i.prototype,"workerGeometryType",{get:function(){var e=this.layer&&this.layer.geometryType;return e?this._geometryTypeRequiresClientGraphicMapping(e)?"polygon":e:null},enumerable:!0,configurable:!0}),i.prototype.applyEdits=function(e){var t=this;return this.load().then(function(){return t._applyEdits(e)})},i.prototype.openPorts=function(){var e=this;return this.load().then(function(){return e._connection.openPorts()})},i.prototype.queryFeatures=function(e,t){var r=this;return void 0===t&&(t={}),this.load(t).then(function(){return r._connection.invoke("queryFeatures",e?e.toJSON():null,t)}).then(function(e){var t=S.fromJSON(e);if(!r._requiresClientGraphicMapping())return t;for(var o=r.layer.objectIdField,i=0,n=t.features;i<n.length;i++){var s=n[i],a=s.attributes[o],u=r._idToClientGraphic.get(a);u&&(s.geometry=u.geometry)}return t.geometryType=r.layer.geometryType,t})},i.prototype.queryFeaturesJSON=function(e,t){var r=this;return void 0===t&&(t={}),this._requiresClientGraphicMapping()?g.reject(new l("query-features-json:unsupported","Cannot query in JSON format for client only geometry types (mesh and extent)")):this.load(t).then(function(){return r._connection.invoke("queryFeatures",e?e.toJSON():null,t)})},i.prototype.queryFeatureCount=function(e,t){var r=this;return void 0===t&&(t={}),this.load(t).then(function(){return r._connection.invoke("queryFeatureCount",e?e.toJSON():null,t)})},i.prototype.queryObjectIds=function(e,t){var r=this;return void 0===t&&(t={}),this.load(t).then(function(){return r._connection.invoke("queryObjectIds",e?e.toJSON():null,t)})},i.prototype.queryExtent=function(e,t){var r=this;return void 0===t&&(t={}),this.load(t).then(function(){return r._connection.invoke("queryExtent",e?e.toJSON():null,t)}).then(function(e){return{count:e.count,extent:a.Extent.fromJSON(e.extent)}})},i.prototype._applyEdits=function(e){var t=this;if(!this._connection)throw new l("feature-layer-source:edit-failure","Memory source not loaded");var r=this.layer.objectIdField,o=null,i=[],n=[];if(e.addFeatures&&(o=this._prepareAddFeatures(e.addFeatures)),e.deleteFeatures)for(var s=0,a=e.deleteFeatures;s<a.length;s++){var u=a[s];"objectId"in u&&null!=u.objectId?i.push(u.objectId):"attributes"in u&&null!=u.attributes[r]&&i.push(u.attributes[r])}if(e.updateFeatures)for(var p=0,c=e.updateFeatures;p<c.length;p++){var u=c[p];n.push(this._serializeFeature(u))}return this._connection.invoke("applyEdits",{adds:o?o.features:[],updates:n,deletes:i}).then(function(e){var r=e.fullExtent,i=e.featureEditResults;if(t.fullExtent=r,o&&o.finish(i.uidToObjectId),t._idToClientGraphic)for(var n=0,s=i.deleteResults;n<s.length;n++){var a=s[n];a.success&&t._idToClientGraphic.delete(a.objectId)}return t._createEditsResult(i)})},i.prototype._createEditsResult=function(e){return{addFeatureResults:e.addResults?e.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:e.updateResults?e.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:e.deleteResults?e.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:[],updateAttachmentResults:[],deleteAttachmentResults:[]}},i.prototype._createFeatureEditResult=function(e){var t=!0===e.success?null:e.error||{code:void 0,description:void 0};return{objectId:e.objectId,globalId:e.globalId,error:t?new l("feature-layer-source:edit-failure",t.description,{code:t.code}):null}},i.prototype._prepareAddFeatures=function(e){for(var t=new Map,r=new Array(e.length),o=null,i=0;i<e.length;i++){var n=e[i],s=this._serializeFeature(n);!o&&h.isSome(n.geometry)&&(o=n.geometry.type),r[i]=s,t.set(""+s.uid,n)}var a=this;return{features:r,inferredGeometryType:o,finish:function(e){var r=a.sourceJSON.objectIdField;for(var o in e){var i=e[o],n=t.get(o);n&&(n.attributes||(n.attributes={}),-1===i?delete n.attributes[r]:n.attributes[r]=i,a._addIdToClientGraphic(n))}}}},i.prototype._addIdToClientGraphic=function(e){if(this._idToClientGraphic){var t=this.sourceJSON.objectIdField,r=e.attributes&&e.attributes[t];null!=r&&this._idToClientGraphic.set(r,e)}},i.prototype._requiresClientGraphicMapping=function(){var e=this.layer.geometryType||this.sourceJSON.geometryType;return this._geometryTypeRequiresClientGraphicMapping(e)},i.prototype._geometryRequiresClientGraphicMapping=function(e){return this._geometryTypeRequiresClientGraphicMapping(e.type)},i.prototype._geometryTypeRequiresClientGraphicMapping=function(e){return"mesh"===e||"multipatch"===e||"extent"===e},i.prototype._serializeFeature=function(e){var t=e.attributes,r=this._geometryForSerialization(e),o=(T++).toString();return r?{uid:o,geometry:r.toJSON(),attributes:t}:{uid:o,attributes:t}},i.prototype._geometryForSerialization=function(e){var t=e.geometry;return h.isNone(t)?null:this._geometryRequiresClientGraphicMapping(t)?a.Polygon.fromExtent(t.extent):t},i.prototype._startWorker=function(t){return s(this,void 0,void 0,function(){var r,o,i,s,u,p,l,d,y,h,f,_,b,S,T,O;return n(this,function(n){switch(n.label){case 0:return c("esri-webpack")?[4,g.create(function(t){return e(["./support/MemorySourceWorker"],t)})]:[3,2];case 1:n.sent(),n.label=2;case 2:return r=this,[4,v.open(m.getAbsMid("./support/MemorySourceWorker",e,F),{strategy:c("esri-workers-for-memory-layers")?"dedicated":"local",signal:t})];case 3:return r._connection=n.sent(),o=this.layer,i=o.fields,s=o.spatialReference,u=o.objectIdField,p=o.hasM,l=o.hasZ,d=o.timeInfo,y="defaults"===this.layer.originOf("spatialReference"),h=this._prepareAddFeatures(this.items),this.on("before-changes",function(e){R.error("Source modifications will not propagate after layer has been loaded. Please use .applyEdits() instead"),e.preventDefault()}),f={features:h.features,fields:i&&i.map(function(e){return e.toJSON()}),geometryType:a.typeKebabDictionary.toJSON(this.workerGeometryType),hasM:p,hasZ:l,objectIdField:u,spatialReference:y?null:s&&s.toJSON(),timeInfo:d?d.toJSON():null},[4,this._connection.invoke("load",f,{signal:t})];case 4:for(_=n.sent(),b=0,S=_.warnings;b<S.length;b++)T=S[b],R.warn(T.message,{layer:this.layer,warning:T});return _.featureErrors.length&&R.warn("Encountered "+_.featureErrors.length+" validation errors while loading features",_.featureErrors),O=_.layerDefinition,this._geometryTypeRequiresClientGraphicMapping(h.inferredGeometryType)&&(O.geometryType=a.typeKebabDictionary.toJSON(h.inferredGeometryType)),this.sourceJSON=O,this._requiresClientGraphicMapping()&&(this._idToClientGraphic=new Map),h.finish(_.assignedObjectIds),[2]}})})},o([_.shared({Type:u,ensureType:b.ensureType(u)})],i.prototype,"itemType",void 0),o([_.property()],i.prototype,"type",void 0),o([_.property({constructOnly:!0})],i.prototype,"layer",void 0),o([_.property({readOnly:!0,dependsOn:["layer.geometryType"]})],i.prototype,"workerGeometryType",null),o([_.property()],i.prototype,"sourceJSON",void 0),i=o([_.subclass("esri.layers.graphics.sources.MemorySource")],i)}(_.declared(d.LoadableMixin(f.EsriPromiseMixin(p))));t.MemorySource=O,t.default=O});