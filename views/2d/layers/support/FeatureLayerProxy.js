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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Promise","../../../../core/promiseUtils","../../../../core/requireUtils","../../../../core/workers","../../../../core/accessorSupport/decorators","module"],function(t,e,r,n,o,i,s,c,u,a,l,p,h){function d(t){return Array.isArray(t)}Object.defineProperty(e,"__esModule",{value:!0});var v=function(e){function o(t){var r=e.call(this,t)||this;return r._startupResolver=u.createResolver(),r.isReady=!1,r}return r(o,e),o.prototype.initialize=function(){this._controller=u.createAbortController(),this.addResolvingPromise(this._startWorker(this._controller.signal))},o.prototype.destroy=function(){this._connection.close(),this._controller.abort()},Object.defineProperty(o.prototype,"tileRenderer",{set:function(t){this.client.tileRenderer=t},enumerable:!0,configurable:!0}),o.prototype.startup=function(t,e,r,n){return s(this,void 0,void 0,function(){var o,s,c,u;return i(this,function(i){switch(i.label){case 0:return o=this._controller.signal,s=d(r.source)?{transferList:r.source,signal:o}:void 0,c=t.tileInfo.toJSON(),u={service:r,config:e,tileInfo:c,options:n},[4,this._connection.invoke("startup",u,s)];case 1:return i.sent(),this._startupResolver.resolve(),this._set("isReady",!0),[2]}})})},o.prototype.update=function(t,e){return s(this,void 0,void 0,function(){var r;return i(this,function(n){switch(n.label){case 0:return r={config:t,options:e},[4,this._startupResolver.promise];case 1:return n.sent(),[2,this._connection.invoke("update",r)]}})})},o.prototype.setHighlight=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.setHighlight",t)]}})})},o.prototype.refresh=function(){return s(this,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,this._startupResolver.promise];case 1:return t.sent(),[2,this._connection.invoke("controller.refresh")]}})})},o.prototype.setViewState=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("setViewState",t.toJSON())]}})})},o.prototype.queryFeatures=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryFeatures",t.toJSON(),e)]}})})},o.prototype.queryObjectIds=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryObjectIds",t.toJSON(),e)]}})})},o.prototype.queryFeatureCount=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryFeatureCount",t.toJSON(),e)]}})})},o.prototype.queryExtent=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){return[2,this._connection.invoke("controller.queryExtent",t.toJSON(),e)]})})},o.prototype.queryLatestObservations=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryLatestObservations",t.toJSON(),e)]}})})},o.prototype.queryStatistics=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.queryStatistics",t)]}})})},o.prototype.getObjectId=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getObjectId",t)]}})})},o.prototype.getLocalId=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getLocalId",t)]}})})},o.prototype.getAggregate=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getAggregate",t)]}})})},o.prototype.getAggregateValueRanges=function(){return s(this,void 0,void 0,function(){return i(this,function(t){switch(t.label){case 0:return[4,this._startupResolver.promise];case 1:return t.sent(),[2,this._connection.invoke("controller.getAggregateValueRanges")]}})})},o.prototype.mapValidLocalIds=function(t){return s(this,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.mapValidLocalIds",t)]}})})},o.prototype.onEdits=function(t){return s(this,void 0,void 0,function(){var e,r,n;return i(this,function(o){switch(o.label){case 0:return[4,this._startupResolver.promise];case 1:return o.sent(),e=t.addedFeatures,r=t.deletedFeatures,n=t.updatedFeatures,[2,this._connection.invoke("controller.onEdits",{addedFeatures:e,deletedFeatures:r,updatedFeatures:n})]}})})},o.prototype.enableEvent=function(t,e){return s(this,void 0,void 0,function(){return i(this,function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.enableEvent",{name:t,value:e})]}})})},o.prototype._startWorker=function(e){return s(this,void 0,void 0,function(){var r,n;return i(this,function(o){switch(o.label){case 0:return r=a.getAbsMid("../features/Pipeline",t,h),[4,l.open(r,{client:this.client,strategy:"dedicated",signal:e})];case 1:return n=o.sent(),this._connection=n,[2]}})})},n([p.property()],o.prototype,"isReady",void 0),n([p.property()],o.prototype,"client",void 0),n([p.property()],o.prototype,"tileRenderer",null),o=n([p.subclass("esri.views.2d.layers.support.FeatureLayerProxy")],o)}(p.declared(c.EsriPromise));e.default=v});