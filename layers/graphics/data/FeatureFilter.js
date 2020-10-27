// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../geometry/support/aaBoundingRect","../../../geometry/support/boundsUtils","./spatialQuerySupport","./timeSupport","./utils","../../../tasks/support/Query","../../../views/2d/layers/features/FeatureStore2D","../../../views/2d/layers/features/support/whereUtils"],(function(e,t,i,r,s,o,n,a,u,l,h,p,c,d,y,_){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var f=s.getLogger("esri.views.2d.layers.features.controllers.FeatureFilter"),m=function(){function e(e){this._geometryBounds=u.create(),this._idToVisibility=new Map,this._serviceInfo=e}return Object.defineProperty(e.prototype,"hash",{get:function(){return this._hash},enumerable:!1,configurable:!0}),e.prototype.check=function(e){return this._applyFilter(e)},e.prototype.clear=function(){var e=this._resetAllHiddenIds();return this.update(),{show:e,hide:[]}},e.prototype.invalidate=function(){var e=this;this._idToVisibility.forEach((function(t,i){e._idToVisibility.set(i,0)}))},e.prototype.setKnownIds=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];this._idToVisibility.set(r,1)}},e.prototype.setTrue=function(e){var t=this,i=[],r=[],s=a.SetFromValues(e);return this._idToVisibility.forEach((function(e,o){var n=!!(1&t._idToVisibility.get(o)),a=s.has(o);!n&&a?i.push(o):n&&!a&&r.push(o),t._idToVisibility.set(o,a?3:0)})),{show:i,hide:r}},e.prototype.createQuery=function(){var e=this,t=e.geometry,i=e.spatialRel,r=e.where,s=e.timeExtent,o=e.objectIds;return d.fromJSON({geometry:t,spatialRel:i,where:r,timeExtent:s,objectIds:o})},e.prototype.update=function(e,t){return i.__awaiter(this,void 0,void 0,(function(){var r;return i.__generator(this,(function(i){switch(i.label){case 0:return this._hash=JSON.stringify(e),[4,c.normalizeQueryLike(e,null,t)];case 1:return r=i.sent(),[4,n.all([this._setGeometryFilter(r),this._setIdFilter(r),this._setAttributeFilter(r),this._setTimeFilter(r)])];case 2:return i.sent(),[2]}}))}))},e.prototype._setAttributeFilter=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t;return i.__generator(this,(function(i){switch(i.label){case 0:return e&&e.where?(t=this,[4,_.createWhereClause(e.where,this._serviceInfo.fieldsIndex)]):(this._clause=null,this.where=null,[2]);case 1:return t._clause=i.sent(),this.where=e.where,[2]}}))}))},e.prototype._setIdFilter=function(e){this._idsToShow=e&&e.objectIds&&a.SetFromValues(e.objectIds),this._idsToHide=e&&e.hiddenIds&&a.SetFromValues(e.hiddenIds),this.objectIds=e&&e.objectIds},e.prototype._setGeometryFilter=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s;return i.__generator(this,(function(i){switch(i.label){case 0:return e&&e.geometry?(t=e.geometry,r=e.spatialRel||"esriSpatialRelIntersects",[4,h.getSpatialQueryOperator(r,t,this._serviceInfo.geometryType,this._serviceInfo.hasZ,this._serviceInfo.hasM)]):(this._spatialQueryOperator=null,this.geometry=null,this.spatialRel=null,[2]);case 1:return s=i.sent(),l.getBoundsXY(this._geometryBounds,t),this._spatialQueryOperator=s,this.geometry=t,this.spatialRel=r,[2]}}))}))},e.prototype._setTimeFilter=function(e){if(this.timeExtent=this._timeOperator=null,e&&e.timeExtent)if(this._serviceInfo.timeInfo)this.timeExtent=e.timeExtent,this._timeOperator=p.getTimeOperator(this._serviceInfo.timeInfo,e.timeExtent,y.featureAdapter);else{var t=new r("feature-layer-view:time-filter-not-available","Unable to apply time filter, as layer doesn't have time metadata.",e.timeExtent);f.error(t)}},e.prototype._applyFilter=function(e){return this._filterByGeometry(e)&&this._filterById(e)&&this._filterByTime(e)&&this._filterByExpression(e)},e.prototype._filterByExpression=function(e){return!this.where||this._clause(e)},e.prototype._filterById=function(e){return(!this._idsToHide||!this._idsToHide.size||!this._idsToHide.has(e.getObjectId()))&&(!this._idsToShow||!this._idsToShow.size||this._idsToShow.has(e.getObjectId()))},e.prototype._filterByGeometry=function(e){if(!this.geometry)return!0;var t=e.readHydratedGeometry();return!!t&&this._spatialQueryOperator(t)},e.prototype._filterByTime=function(e){return!o.isSome(this._timeOperator)||this._timeOperator(e)},e.prototype._resetAllHiddenIds=function(){var e=this,t=[];return this._idToVisibility.forEach((function(i,r){1&i||(e._idToVisibility.set(r,1),t.push(r))})),t},e}();t.default=m}));