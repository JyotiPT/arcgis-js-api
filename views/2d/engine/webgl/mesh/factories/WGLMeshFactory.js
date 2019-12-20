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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/tsSupport/generatorHelper","../../../../../../core/tsSupport/awaiterHelper","../../../../../../core/Error","../../../../../../core/has","../../../../../../core/Logger","../../../../../../core/maybe","../../../../../../core/promiseUtils","../../../../../../geometry/SpatialReference","../../../../../../geometry/support/jsonUtils","../../../../../../symbols/SimpleLineSymbol","../../definitions","../../enums","../../WGLDisplayObject","../MeshData","../VertexVector","../templates/WGLLabelTemplate","../templates/WGLLineTemplate","../templates/WGLMarkerTemplate","../templates/WGLTemplateStore"],function(e,t,r,T,o,a,v,l,_,G,w,D,i,L,s,S,n,p,y,m,u,I){Object.defineProperty(t,"__esModule",{value:!0});var c=l.getLogger("esri.views.2d.engine.webgl.WGLMeshFactory"),b={esriGeometryPoint:["above-right","above-center","above-left","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null,esriGeometryEnvelope:null};var h=function(){function e(e,t,r,o,l,a){this._isDD=!1,this._labelsDebugTemplate=null,this._isDD=_.isSome(r)&&"dot-density"===r.type,this._geometryType=e,this._idField=t,this._templateStore=o,this._setLabelTemplates(l,r,a)}return e.prototype.update=function(e,t,r){this._isDD=_.isSome(t)&&"dot-density"===t.type,this._setLabelTemplates(e,t,r)},e.prototype._setLabelTemplates=function(e,t,r){e&&this._validateLabelingInfo(e)&&(this._labelTemplates=e.map(function(e){return y.default.fromLabelClass(t,e,r)}))},Object.defineProperty(e.prototype,"templates",{get:function(){return this._templateStore},enumerable:!0,configurable:!0}),e.prototype.createMeshData=function(e){var t=new Array(5),r=new Array,o=this._labelTemplates&&0<this._labelTemplates.length,l="esriGeometryPolyline"===this._geometryType?L.HEURISTIC_GLYPHS_PER_LINE:L.HEURISTIC_GLYPHS_PER_FEATURE;return t[s.WGLGeometryType.MARKER]=new p.VertexVectors(s.WGLGeometryType.MARKER,e),t[s.WGLGeometryType.FILL]=new p.VertexVectors(s.WGLGeometryType.FILL,e,this._isDD),t[s.WGLGeometryType.LINE]=new p.VertexVectors(s.WGLGeometryType.LINE,e),t[s.WGLGeometryType.TEXT]=new p.VertexVectors(s.WGLGeometryType.TEXT,e),t[s.WGLGeometryType.LABEL]=new p.VertexVectors(s.WGLGeometryType.LABEL,o?l:0),new n.MeshData(r,t)},e.prototype.analyze=function(b,h,g,f,d,L){return o(this,void 0,void 0,function(){var o,l,a,i,s,n,p,y,m,u,c;return T(this,function(e){switch(e.label){case 0:return o=b,G.isAborted(L)?[2,[]]:_.isSome(g)?[4,g.analyze(this._idField,b,d,L)]:[3,2];case 1:e.sent(),e.label=2;case 2:l=0,a=o,e.label=3;case 3:return l<a.length?(i=a[l],s=-1,h?null==(n=i).symbol?[3,5]:(p=null,"cim"===n.symbol.type&&(r=((t=i).attributes?Object.keys(t.attributes):[]).map(function(e){return{name:e,alias:e,type:"string"==typeof t.attributes[e]?"esriFieldTypeString":"esriFieldTypeDouble"}}),p={geometryType:null!=t.centroid?"esriGeometryPolygon":D.getJsonType(t.geometry),spatialReference:w.fromJSON(t.geometry.spatialReference),fields:r}),[4,this._templateStore.createTemplateGroup(n.symbol,null,null,p)]):[3,7]):[3,10];case 4:return s=e.sent(),[3,6];case 5:_.isSome(g)&&(s=g.match(this._idField,i,null,null,d)),e.label=6;case 6:return[3,8];case 7:_.isSome(g)&&(s=g.match(this._idField,i,this._geometryType,f,d)),e.label=8;case 8:if(I.isDynamicId(s))for(y=this._templateStore.getDynamicTemplateGroup(s),m=0,u=y;m<u.length;m++)(c=u[m])&&c.analyze&&c.analyze(this._templateStore,i,f,d);i.groupId=s,e.label=9;case 9:return l++,[3,3];case 10:return[2,this._templateStore.finalize(L).then(function(){return o})]}var t,r})})},e.prototype.write=function(e,t,r,o,l,a,i){var s=this._templateStore.getTemplateGroup(t.groupId),n=e,p=t.localId;if(null!=p){var y=new S(p),m=!!a&&!!this._labelTemplates&&a.has(p);if(I.isDynamicId(t.groupId))for(var u=0,c=s;u<c.length;u++){(L=c[u]).bindFeature(t,r,o)}if(s&&(t.geometry||t.centroid)){var b=y.displayRecords,h=t.insertAfter;void 0!==h&&(y.insertAfter=h);var g=this._geometryType;g||(g=null!=t.centroid?"esriGeometryPolygon":D.getJsonType(t.geometry));for(var f=0,d=s;f<d.length;f++){var L=d[f],T=n.get(L.geometryType);L.writeMesh(b,T,g,p,t)}if(m){var _=this._getLabelReference(s),G=a.get(p);this._writeLabelMesh(y,n,p,t,i,G,_,l,g)}n.pushDisplayObject(y)}}else v("esri-2d-debug")&&console.debug("Got null id for feature")},e.prototype._hasBadLabelClass=function(e,t){var r=e.labelPlacement,o=b[t];if(!e.symbol)return c.warn("No LabelClass symbol specified."),!0;if(!o)return c.error(new a("mapview-labeling:unsupported-geometry-type","Unable to create labels for Feature Layer, "+t+" is not supported")),!0;if(!o.some(function(e){return e===r})){var l=o[0];r&&c.warn("Found invalid label placement type "+r+" for "+t+". Defaulting to "+l),e.labelPlacement=l}return!1},e.prototype._validateLabelingInfo=function(e){var t=this;return!e.some(function(e){return t._hasBadLabelClass(e,t._geometryType)})},e.prototype._getLabelReference=function(e){for(var t=0,r=e;t<r.length;t++){var o=r[t];if(o instanceof u.default)return o}return null},e.prototype._writeLabelMesh=function(e,t,r,o,l,a,i,s,n){for(var p=e.displayRecords,y=[],m=0;m<a.length;m++){var u=a[m],c=u.id,b=u.text,h=u.rtl,g=this._labelTemplates[c],f=t.get(g.geometryType),d=l.get(g.symbolId).glyphMosaicItems;g.bindReferenceTemplate(i),g.bindTextInfo(d,b,h),g.writeMesh(p,f,n,r,o,s,y)}e.metrics=y,L.DEBUG_LABELS&&this._debugLabels(e,t)},e.prototype._debugLabels=function(e,t){for(var r=e.displayRecords,o=e.id,l=0,a=e.metrics;l<a.length;l++)for(var i=a[l],s=0,n=i.boxes?i.boxes.concat([i.bounds]):[i.bounds];s<n.length;s++){var p=n[s],y=i.anchor[0]+i.offsetX+p.center[0],m=i.anchor[1]+i.offsetY+p.center[1],u={geometry:{paths:[[[y-p.width/2,m+p.height/2],[0,-p.height],[p.width,0],[0,p.height],[-p.width,0]]]},attributes:{}},c=this._getLabelDebugTemplate(),b=t.get(c.geometryType);c.writeMesh(r,b,"esriGeometryPolyline",o,u)}},e.prototype._getLabelDebugTemplate=function(){return this._labelsDebugTemplate||(this._labelsDebugTemplate=this._createLabelsDebugTemplate()),this._labelsDebugTemplate},e.prototype._createLabelsDebugTemplate=function(){var e=new i({style:"solid",width:1,color:[255,0,0,1]});return m.default.fromSimpleLine(null,!1,e,null,!1)},e}();t.WGLMeshFactory=h});