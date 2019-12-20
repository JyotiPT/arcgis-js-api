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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Evented","../../../../core/Logger","../../../../core/unitUtils","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/aaBoundingRect","../../../../layers/graphics/dehydratedFeatures","../../../../symbols/support/unitConversionUtils","../../webgl-engine/lib/Intersector"],function(e,t,r,o,a,i,n,s,l,c,d,p,y,u,v,h){Object.defineProperty(t,"__esModule",{value:!0});var f=n.getLogger("esri.views.3d.layers.support.StageLayerElevationProvider"),m=function(e){function t(t){var r=e.call(this,t)||this;return r.elevationOffset=0,r.layerDirtyNotificationHandle=null,r}return r(t,e),t.prototype.initialize=function(){var e=this;this.renderCoordsHelper=this.view.renderCoordsHelper,this.intersectLayers=[this.stageLayer],this.intersector=new h(this.view.viewingMode),this.intersector.options.store=0;var t=this.computeLayerExtent(this.stageLayer);this.zmin=t[2],this.zmax=t[5],this.layerDirtyNotificationHandle=this.stageLayer.on("dirty",function(t){return e.stageLayerChanged(t.origin,t.dirtyType,t.subObject)})},t.prototype.dispose=function(){this.layerDirtyNotificationHandle.remove()},t.prototype.elevationInfoChanged=function(){var e=null!=this.layer?this.layer.elevationInfo:null;if(null!=e&&"on-the-ground"!==e.mode){var t=s.getMetersPerVerticalUnitForSR(this.layer.spatialReference),r=v.getMetersPerUnit(e.unit);this.elevationOffset=(e.offset||0)*r/t}else this.elevationOffset=0},t.prototype.getElevation=function(e){if(u.isPoint(e)){if(!this.renderCoordsHelper.toRenderCoords(e,E))return f.error("could not project point for elevation alignment"),null}else if(!this.renderCoordsHelper.toRenderCoords(e,this.spatialReference,E))return f.error("could not project point for elevation alignment"),null;var t=this.elevationOffset,r=this.zmin+t,o=this.zmax+t;c.vec3.copy(B,E),c.vec3.copy(C,E),this.renderCoordsHelper.setAltitude(o,B),this.renderCoordsHelper.setAltitude(r,C);var a=function(e){return e.metadata&&e.metadata.isElevationSource};return this.intersector.reset(B,C),this.intersector.intersect(this.intersectLayers,null,null,1,null,a),this.intersector.results.min.getIntersectionPoint(E)?this.renderCoordsHelper.getAltitude(E):null},t.prototype.stageLayerChanged=function(e,t,r){switch(t){case"layerObjectAdded":case"layerObjectRemoved":case"objGeometryAdded":var o=r;o.metadata&&o.metadata.isElevationSource&&this.objectChanged(o);break;case"objGeometryRemoved":case"objGeometryReplaced":case"objGeometryTransformation":case"vertexAttrsUpdated":case"objTransformation":var o=e;o.metadata&&o.metadata.isElevationSource&&this.objectChanged(o)}},t.prototype.objectChanged=function(e){if(this.spatialReference){p.empty(g),e.metadata.lastValidElevationBB.isEmpty()||this.expandExtent(e.metadata.lastValidElevationBB.bbMin,e.metadata.lastValidElevationBB.bbMax,g);var t=e.getBBMin(!1),r=e.getBBMax(!1);this.expandExtent(t,r,g),p.toRect(g,x),this.zmin=Math.min(this.zmin,g[2]),this.zmax=Math.max(this.zmax,g[5]),b.extent=x,b.spatialReference=this.spatialReference,this.emit("elevation-change",b),c.vec3.copy(e.metadata.lastValidElevationBB.bbMin,t),c.vec3.copy(e.metadata.lastValidElevationBB.bbMax,r)}},t.prototype.computeLayerExtent=function(e){p.empty(g);for(var t=0,r=e.getObjects();t<r.length;t++){var o=r[t];this.expandExtent(o.getBBMin(!1),o.getBBMax(!1),g)}return g},t.prototype.expandExtent=function(e,t,r){for(var o=0;o<8;++o)E[0]=1&o?e[0]:t[0],E[1]=2&o?e[1]:t[1],E[2]=4&o?e[2]:t[2],this.renderCoordsHelper.fromRenderCoords(E,E,this.spatialReference),p.expand(r,E);return r},o([l.property({constructOnly:!0})],t.prototype,"layer",void 0),o([l.property({constructOnly:!0})],t.prototype,"stageLayer",void 0),o([l.property({constructOnly:!0})],t.prototype,"view",void 0),o([l.property({readOnly:!0,aliasOf:"view.spatialReference"})],t.prototype,"spatialReference",void 0),t=o([l.subclass("esri.views.3d.layers.support.StageLayerElevationProvider")],t)}(l.declared(i.EventedMixin(a)));t.StageLayerElevationProvider=m;var g=p.empty(),x=y.empty(),b={spatialReference:null,extent:x,context:"scene"},E=d.vec3f64.create(),B=d.vec3f64.create(),C=d.vec3f64.create()});