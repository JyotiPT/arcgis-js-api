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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Handles","../../../../../core/mathUtils","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec2","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../manipulatorUtils","./LaserLineRenderer","../support/Label","../support/LabelSegment","../support/labelUtils","../support/PathSegmentInterpolator","../support/viewUtils","../../../support/projectionUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Intersector","../../../webgl-engine/lib/Layer","../../../webgl-engine/lib/Object3D","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/lineStippleUtils","../../../webgl-engine/materials/MeasurementArrowMaterial","../../../webgl-engine/materials/RibbonLineMaterial"],function(e,t,i,r,o,n,s,a,l,c,d,h,_,u,p,g,m,b,v,w,L,P,f,j,y,O,S,G,C,V,A){var M=[1,.5,0,.75],R={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:.75,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleOpacity:.5,handleRadius:5,triangleColor:M,triangleLineWidth:3,triangleCornerSize:32,triangleSubdivisions:128,arrowWidth:16,arrowOutlineColor:[1,.5,0,1],arrowOutlineWidth:.2,arrowStripeEvenColor:[1,1,1,1],arrowStripeOddColor:[1,.5,0,1],arrowStripeLength:16,arrowSubdivisions:128,geodesicProjectionLineWidth:2,geodesicProjectionLineColor:M,guideLineWidth:2,guideLineColor:M,guideStippleLengthPixels:6,labelDistance:25},D=function(){function e(e,t){void 0===t&&(t={}),this._visible=!1,this._laserLineRenderer=null,this._directDistanceLabel=new p,this._horizontalDistanceLabel=new p,this._verticalDistanceLabel=new p,this._handles=new o,this._listenerHandles=null,this._cursorPosition=h.vec3f64.create(),this._startPosition=h.vec3f64.create(),this._endPosition=h.vec3f64.create(),this._centerPosition=h.vec3f64.create(),this._cornerPosition=h.vec3f64.create(),this._arrowLabelSegment=new g,this._horizontalLabelSegment=new g,this._verticalLabelSegment=new g,this._geodesicProjectionLabelSegment=new g,this._origin=h.vec3f64.create(),this._originTransform=l.mat4f64.create(),this._lastDraggedHandle=null,this._model=e,this._sceneView=e.sceneView,this._params=v.copyParameter(R,t),this._layer=new O("point-to-point-measurement",{isPickable:!1}),this._createMaterials(),this._createObjects(),this._intersector=new y(this._sceneView.viewingMode),this._intersector.options.store=0}return e.prototype.destroy=function(){this.hide(),this._handles.destroy(),this._handles=null},Object.defineProperty(e.prototype,"requiresCursorPoint",{get:function(){return"initial"===this._model.state&&this._model.active},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"cameraAboveGround",{get:function(){return this._sceneView.state.camera.aboveGround},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){e?this.show():this.hide()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"testData",{get:function(){return{labels:{direct:this._directDistanceLabel,horizontal:this._horizontalDistanceLabel,vertical:this._verticalDistanceLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!0,configurable:!0}),e.prototype.createManipulators=function(){var e=this,t=function(){var t=_.createSphereManipulator(e._sceneView,e._params.handleColor,e._params.handleOpacity);return t.visible=!1,t.hideOnGrab=!0,t.radius=e._params.handleRadius,t},i=t(),r=t();this._model.startPoint&&(i.mapPoint=this._model.startPoint,i.visible=!0),this._model.endPoint&&(r.mapPoint=this._model.endPoint,r.visible=!0);var o=function(){var t=e._lastDraggedHandle;i.grabbing&&!r.grabbing&&(t="start"),r.grabbing&&!i.grabbing&&(t="end"),i.grabbing||r.grabbing||(t=null);var o=t!==e._lastDraggedHandle;e._lastDraggedHandle=t,o&&e.visible&&e._updateLaserLine()};return this._handles.add([i.watch("grabbing",function(){o()}),r.watch("grabbing",function(){o()})]),{start:i,end:r}},e.prototype.show=function(){if(!this._visible){this._visible=!0;var e=this._sceneView._stage,t={glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha};this._laserLineRenderer=new u(this._sceneView.renderCoordsHelper,t),e.addRenderPlugin(this._laserLineRenderer.renderSlots,this._laserLineRenderer),this._addToStage(e),this._directDistanceLabel.addToView(this._sceneView),this._horizontalDistanceLabel.addToView(this._sceneView),this._verticalDistanceLabel.addToView(this._sceneView),this._initializeListeners(),this._updateCursorPosition(),this._updateStartPosition(),this._updateEndPosition(),this._updateLaserLine(),this._updateView()}},e.prototype.hide=function(){if(this._visible){this._visible=!1;var e=this._sceneView._stage;e.removeRenderPlugin(this._laserLineRenderer),this._laserLineRenderer=null,this._removeFromStage(e),this._directDistanceLabel.removeFromView(this._sceneView),this._horizontalDistanceLabel.removeFromView(this._sceneView),this._verticalDistanceLabel.removeFromView(this._sceneView),this._destroyListeners(),this._sceneView.cursor=null}},e.prototype.pick=function(t){var i=this._sceneView.spatialReference,r=s.screenPointObjectToArray(t.screenPoint);this._sceneView.sceneIntersectionHelper.intersectToolIntersectorScreen(r,this._intersector);var o=this._intersector.results.min,n=h.vec3f64.create();if(!o.getIntersectionPoint(n))return new e.PickResult;var a=this._sceneView.renderCoordsHelper.fromRenderCoords(n,i),l="TerrainRenderer"===o.intersector?"ground":"feature";return new e.PickResult(l,n,a)},e.prototype.getElevation=function(e){return this._sceneView.basemapTerrain.ready?this._sceneView.basemapTerrain.getElevation(e)||0:0},e.prototype.overlappingHandles=function(e,t){return v.pointToPointScreenDistance(e,t,this._sceneView)<=this._params.handleRadius},e.prototype._createMaterials=function(){this._triangleLineMaterial=new A({width:this._params.triangleLineWidth,color:this._params.triangleColor,polygonOffset:!0},"triangle-line"),this._triangleLineMaterial.renderOccluded=4,this._triangleCornerMaterial=new G({color:this._params.triangleColor,transparent:!0,writeDepth:!1,polygonOffset:!0},"triangle-corner"),this._triangleCornerMaterial.renderOccluded=4,this._arrowMaterial=new V({outlineColor:this._params.arrowOutlineColor,stripeEvenColor:this._params.arrowStripeEvenColor,stripeOddColor:this._params.arrowStripeOddColor,polygonOffset:!0},"arrow"),this._arrowMaterial.renderOccluded=4,this._geodesicProjectionLineMaterial=new A({width:this._params.geodesicProjectionLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0},"geodesic-line"),this._geodesicProjectionLineMaterial.renderOccluded=4,this._geodesicGuideLineMaterial=new A({width:this._params.guideLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0,stipplePattern:C.createStipplePatternSimple(this._params.guideStippleLengthPixels),stippleIntegerRepeats:!1},"geodesic-guide"),this._geodesicGuideLineMaterial.renderOccluded=4},e.prototype._createObjects=function(){this._triangleLineObject=new S,this._layer.addObject(this._triangleLineObject),this._triangleCornerObject=new S,this._layer.addObject(this._triangleCornerObject),this._arrowObject=new S,this._layer.addObject(this._arrowObject),this._geodesicProjectionLineObject=new S,this._layer.addObject(this._geodesicProjectionLineObject),this._geodesicProjectionStartGuideObject=new S,this._layer.addObject(this._geodesicProjectionStartGuideObject),this._geodesicProjectionEndGuideObject=new S,this._layer.addObject(this._geodesicProjectionEndGuideObject)},e.prototype._addToStage=function(e){e.add(0,this._layer),e.add(3,this._triangleLineMaterial),e.add(3,this._triangleCornerMaterial),e.add(3,this._arrowMaterial),e.add(3,this._geodesicProjectionLineMaterial),e.add(3,this._geodesicGuideLineMaterial),e.add(1,this._triangleLineObject),e.add(1,this._triangleCornerObject),e.add(1,this._arrowObject),e.add(1,this._geodesicProjectionLineObject),e.add(1,this._geodesicProjectionStartGuideObject),e.add(1,this._geodesicProjectionEndGuideObject),e.addToViewContent([this._layer.id])},e.prototype._removeFromStage=function(e){e.removeFromViewContent([this._layer.id]),e.remove(0,this._layer.id),e.remove(3,this._triangleLineMaterial.id),e.remove(3,this._triangleCornerMaterial.id),e.remove(3,this._arrowMaterial.id),e.remove(3,this._geodesicProjectionLineMaterial.id),e.remove(3,this._geodesicGuideLineMaterial.id),e.remove(1,this._triangleLineObject.id),e.remove(1,this._triangleCornerObject.id),e.remove(1,this._arrowObject.id),e.remove(1,this._geodesicProjectionLineObject.id),e.remove(1,this._geodesicProjectionStartGuideObject.id),e.remove(1,this._geodesicProjectionEndGuideObject.id)},e.prototype._getLabelPositions=function(e,t,i,r,o){var a=this._model.triangleView,l=a.collapsed,d=s.castRenderScreenPointArray3(L.sv3d.get()),h=s.castRenderScreenPointArray3(L.sv3d.get());o.projectPoint(i,d),o.projectPoint(t,h);var _={direct:l?"top":"bottom",horizontal:"top",vertical:d[0]<h[0]?"left":"right"};if(!l){var u=L.sv2d.get(),p=L.sv2d.get();if(v.screenSpaceTangent(e,i,u,o),v.screenSpaceTangent(e,t,p,o),c.vec2.dot(u,p)>=z)_.direct=n.sign(u[1])===n.sign(p[1])?m.mirrorPosition(_.vertical):_.vertical;else{var g=s.castRenderScreenPointArray(L.sv2d.get());v.screenSpaceTangent(i,t,g,o),c.vec2.dot(g,p)>=z&&(_.direct=n.sign(g[0])===n.sign(p[0])?m.mirrorPosition(_.horizontal):_.horizontal)}}if("below-the-surface"===r){var b=function(e){return"top"===e?"bottom":"top"};_.direct=b(_.direct),_.horizontal=b(_.horizontal),_.vertical=b(_.vertical)}return _},e.prototype._updateView=function(){var e;if(this._sceneView.ready){var t=this._sceneView._stage,i=t.getCamera(),r=this._sceneView.renderCoordsHelper,o=this._model.triangleView;if(!o.visible)return this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries(),this._arrowObject.removeAllGeometries(),this._geodesicProjectionLineObject.removeAllGeometries(),this._geodesicProjectionStartGuideObject.removeAllGeometries(),this._geodesicProjectionEndGuideObject.removeAllGeometries(),this._directDistanceLabel.visible=!1,this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var n="camera-dependent"===this._model.measurementSurfaceLocation?this._sceneView.state.camera.aboveGround?"above-the-surface":"below-the-surface":this._model.measurementSurfaceLocation,s=this._startPosition,l=this._endPosition,c="above-the-surface"===n?1:-1,h=c*(r.getAltitude(l)-r.getAltitude(s));h<0&&(e=[l,s],s=e[0],l=e[1]);var _=this._cornerPosition;r.worldUpAtPosition(s,_),d.vec3.scale(_,_,c*Math.abs(h)),d.vec3.add(_,_,s);var u=this._centerPosition;v.midpoint([s,l,_],u),d.vec3.copy(this._origin,u),a.mat4.identity(this._originTransform),a.mat4.translate(this._originTransform,this._originTransform,this._origin),o.collapsed?(this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries()):this._updateTriangleObjects(this._triangleLineObject,this._triangleCornerObject,s,l,_,this._origin,this._originTransform,i,this._horizontalLabelSegment,this._verticalLabelSegment),this._updateArrowObject(this._arrowObject,this._startPosition,this._endPosition,this._origin,this._originTransform,o.stripeLength,i,o.mode,this._arrowLabelSegment);var p=this._requiresGeodesicGuides(this._startPosition,this._endPosition,i,o.mode);this._updateGeodesicProjectionLineObject(this._geodesicProjectionLineObject,this._startPosition,this._endPosition,this._origin,this._originTransform,p,this._geodesicProjectionLabelSegment),this._updateGeodesicProjectionGuideObjects(p);var g=this._params.labelDistance,m=this._getLabelPositions(s,l,_,n,i);this._updateAuxiliaryMeasureLabels(o,i,m),"geodesic"!==o.mode?this._updateLabel(this._directDistanceLabel,this._arrowLabelSegment,g,m.direct,o.directLabel,o.visible,16,i):(this._updateLabel(this._horizontalDistanceLabel,p?this._geodesicProjectionLabelSegment:this._arrowLabelSegment,g,m.horizontal,o.horizontalLabel,o.visible,16,i),this._directDistanceLabel.visible=!1)}},e.prototype._updateAuxiliaryMeasureLabels=function(e,t,i){if(e.collapsed)return this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var r=this._params.labelDistance;this._updateLabel(this._horizontalDistanceLabel,this._horizontalLabelSegment,r,i.horizontal,e.horizontalLabel,!0,12,t),this._updateLabel(this._verticalDistanceLabel,this._verticalLabelSegment,r,i.vertical,e.verticalLabel,!0,12,t)},e.prototype._updateTriangleObjects=function(e,t,i,r,o,n,s,a,l,c){var h=[d.vec3.subtract(L.sv3d.get(),i,n),d.vec3.subtract(L.sv3d.get(),o,n),d.vec3.subtract(L.sv3d.get(),r,n)];l.update(o,r),c.update(i,o);var _=new P(j.createPolylineGeometry(h),"triangle-line");e.removeAllGeometries(),e.addGeometry(_,this._triangleLineMaterial,s);var u=L.sv3d.get(),p=L.sv3d.get();d.vec3.subtract(u,o,i),d.vec3.normalize(u,u),d.vec3.subtract(p,r,o),d.vec3.normalize(p,p);var g=.33*Math.min(d.vec3.distance(o,i),d.vec3.distance(o,r)),m=this._params.triangleCornerSize*a.computeScreenPixelSizeAt(o),b=Math.min(g,m),v=new P(this._quadGeometryData(o,u,p,b,n),"triangle-corner");t.removeAllGeometries(),t.addGeometry(v,this._triangleCornerMaterial,s)},e.prototype._updateArrowObject=function(e,t,i,r,o,n,s,a,l){this._createInterpolatedLineGeometry(e,this._arrowMaterial,"arrow",t,i,r,o,a,this._arrowLabelSegment);var c=s.computeScreenPixelSizeAt(l.origin);this._arrowMaterial.setParameterValues({width:this._params.arrowWidth*c,stripeLength:n})},e.prototype._getSegmentInterpolator=function(e,t){var i=this._sceneView.spatialReference,r=this._sceneView.renderCoordsHelper,o=r.spatialReference;return w.canProject(i,w.SphericalECEFSpatialReference)?new b.Spherical(e,t,o,o):new b.Linear(e,t)},e.prototype._updateGeodesicProjectionLineObject=function(e,t,i,r,o,n,s){if(!n)return void e.removeAllGeometries();var a=this._sceneView.renderCoordsHelper,l=d.vec3.copy(L.sv3d.get(),t),c=d.vec3.copy(L.sv3d.get(),i);a.setAltitude(0,l),a.setAltitude(0,c),this._createInterpolatedLineGeometry(e,this._geodesicProjectionLineMaterial,"geodesicProjectionLine",l,c,r,o,"geodesic",s)},e.prototype._requiresGeodesicGuides=function(e,t,i,r){return!("geodesic"!==r||!this._model.geodesicDistanceExceeded)&&(this._requiresGeodesicGuideAt(e,i)||this._requiresGeodesicGuideAt(t,i))},e.prototype._requiresGeodesicGuideAt=function(e,t){var i=this._sceneView.renderCoordsHelper,r=t.computeScreenPixelSizeAt(e);return i.getAltitude(e)/r>=10},e.prototype._updateGeodesicProjectionGuideObjects=function(e){if(!e)return this._geodesicProjectionStartGuideObject.removeAllGeometries(),void this._geodesicProjectionEndGuideObject.removeAllGeometries();var t=this._sceneView.renderCoordsHelper,i=d.vec3.copy(L.sv3d.get(),this._startPosition),r=d.vec3.copy(L.sv3d.get(),this._endPosition);t.setAltitude(0,i),t.setAltitude(0,r),this._createInterpolatedLineGeometry(this._geodesicProjectionStartGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",i,this._startPosition,this._origin,this._originTransform,"euclidean"),this._createInterpolatedLineGeometry(this._geodesicProjectionEndGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",r,this._endPosition,this._origin,this._originTransform,"euclidean")},e.prototype._createInterpolatedLineGeometry=function(e,t,i,r,o,n,s,a,l){var c=this._sceneView.renderCoordsHelper,h=[],_=[],u=function(e,t){var i=L.sv3d.get();d.vec3.subtract(i,e,n),h.push(i),_.push(t)};if("euclidean"===a){var p=L.sv3d.get();v.midpoint([r,o],p);var g=L.sv3d.get();c.worldUpAtPosition(p,g),u(r,g),u(o,g),l&&l.update(r,o)}else{for(var m=this._getSegmentInterpolator(r,o),b=this._params.arrowSubdivisions+1&-2,w=null,f=null,y=0;y<b;++y){var O=y/(b-1),S=L.sv3d.get(),g=L.sv3d.get();m.eval(O,S),c.worldUpAtPosition(S,g),y===b/2-1?w=S:y===b/2&&(f=S),u(S,g)}l&&l.update(w,f)}var G=new P(j.createPolylineGeometry(h,_),i);e.removeAllGeometries(),e.addGeometry(G,t,s)},e.prototype._quadGeometryData=function(e,t,i,r,o){var n=L.sv3d.get(),s=[],a=L.sv3d.get();d.vec3.scale(a,i,r);var l=L.sv3d.get();d.vec3.scale(l,t,-r);for(var c=0;c<4;++c)d.vec3.copy(n,e),d.vec3.subtract(n,n,o),1&c&&d.vec3.add(n,n,a),2&c&&d.vec3.add(n,n,l),s.push(n[0],n[1],n[2]);return new f.GeometryData({position:{size:3,data:s}},{position:new Uint32Array([0,1,2,1,2,3])})},e.prototype._updateLabel=function(e,t,i,r,o,n,a,l){var c=s.castScreenPointArray(L.sv2d.get()),d=s.castScreenPointArray(L.sv2d.get()),h=m.computeLabelPositionFromSegment(l,t,i,r,c,d);e.updatePosition(c,d),e.text=o,e.visible=h&&n,e.fontSize=a},e.prototype._updateCursorPosition=function(){this._model.cursorPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.cursorPoint,this._cursorPosition),this._updateLaserLine()},e.prototype._updateStartPosition=function(){this._model.startPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.startPoint,this._startPosition)},e.prototype._updateEndPosition=function(){this._model.endPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.endPoint,this._endPosition)},e.prototype._getFocusPosition=function(){var e=this._model,t=e.triangleView.visible&&e.triangleView.collapsed&&"euclidean"===e.measurementMode;switch(e.state){case"drawing":return t?this._startPosition:e.endPoint?this._endPosition:this._startPosition;case"editing":return t?"start"===this._lastDraggedHandle?this._endPosition:this._startPosition:"start"===this._lastDraggedHandle?this._startPosition:this._endPosition;default:return e.cursorPoint?this._cursorPosition:null}},e.prototype._getFocusSpherePosition=function(){return"drawing"===this._model.state||"end"===this._lastDraggedHandle?this._startPosition:this._endPosition},e.prototype._updateLaserLine=function(){var e=this._model,t=this._getFocusPosition(),i=this._params.laserLineEnabled&&!!t&&"measured"!==e.state&&e.active;i?(this._laserLineRenderer.focusPlaneActive=i&&"euclidean"===e.measurementMode,this._laserLineRenderer.focusSphereActive=i&&!!e.startPoint&&"geodesic"===e.measurementMode,this._laserLineRenderer.focusPosition=t,this._laserLineRenderer.focusSpherePosition=this._getFocusSpherePosition(),this._laserLineRenderer.segmentActive=i&&e.triangleView.visible&&!e.triangleView.collapsed,this._laserLineRenderer.segmentStartPosition=this._startPosition,this._laserLineRenderer.segmentEndPosition=this._endPosition):(this._laserLineRenderer.focusPlaneActive=!1,this._laserLineRenderer.focusSphereActive=!1,this._laserLineRenderer.segmentActive=!1)},e.prototype._initializeListeners=function(){var e=this;this._listenerHandles=new o,this._listenerHandles.add([this._model.watch("state",function(){e._updateLaserLine()}),this._model.watch("measurementMode",function(){e._updateLaserLine()}),this._model.watch("hoveredHandle",function(){e._updateView()}),this._model.watch("cursorPoint",function(){e._updateCursorPosition()}),this._model.watch("startPoint",function(){e._updateStartPosition(),e._updateView(),e._updateLaserLine()}),this._model.watch("endPoint",function(){e._updateEndPosition(),e._updateView(),e._updateLaserLine()}),this._model.watch("unit",function(){e._updateView()}),this._model.watch("active",function(){e._updateLaserLine(),e._updateView()}),this._sceneView.state.watch("camera",function(){e._updateView()})])},e.prototype._destroyListeners=function(){this._listenerHandles.destroy(),this._listenerHandles=null},e}();!function(e){var t=function(){function e(){}return e}();e.PickRequest=t;var i=function(){function e(e,t,i){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),this.type=e,this.scenePoint=t,this.mapPoint=i}return e}();e.PickResult=i}(D||(D={}));var z=Math.cos(n.deg2rad(12));return D});