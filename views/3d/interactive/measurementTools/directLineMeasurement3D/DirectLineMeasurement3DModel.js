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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Accessor","../../../../../core/Handles","../../../../../core/mathUtils","../../../../../core/Quantity","../../../../../core/quantityUtils","../../../../../core/unitUtils","../../../../../core/watchUtils","../../../../../core/accessorSupport/decorators","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../geometry/Point","../../../../../geometry/support/geodesicUtils","../support/UnitNormalizer","../../../support/earthUtils","../../../support/projectionUtils","../../../support/PropertiesPool"],function(e,t,i,r,n,o,a,s,c,l,p,u,d,h,m,f,g,y,v,P){var b=y.earthRadius*Math.PI/180,_=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._tempStartPosition=h.vec3f64.create(),t._tempEndPosition=h.vec3f64.create(),t._tempCornerPosition=h.vec3f64.create(),t._unitNormalizer=new g,t._handles=new o,t._propertiesPool=new P.default({startPoint:m,endPoint:m},t),t.cursorPoint=null,t.state="initial",t.mode="auto",t.unit="metric",t.active=!1,t.directDistance=null,t.horizontalDistance=null,t.verticalDistance=null,t.geodesicDistance=null,t.geodesicAngle=null,t.triangleCollapseRatioThreshold=.03,t.geodesicMeasurementDistanceThreshold=1e5,t}return i(t,e),t.prototype.initialize=function(){var e=this;this._handles.add(p.init(this.sceneView,"spatialReference",function(t){e._unitNormalizer.spatialReference=t}),"scene-view"),this.reset()},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this._propertiesPool.destroy(),this._propertiesPool=null},Object.defineProperty(t.prototype,"startPoint",{set:function(e){if(!e)return void this._set("startPoint",null);var t=this._propertiesPool.get("startPoint");t.copy(e),this._set("startPoint",t),this._updateMeasurement()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"startPointSurfaceLocation",{set:function(e){this._set("startPointSurfaceLocation",e),this._updateMeasurement()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"endPoint",{set:function(e){if(!e)return void this._set("endPoint",null);var t=this._propertiesPool.get("endPoint");t.copy(e),this._set("endPoint",t),this._updateMeasurement()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"endPointSurfaceLocation",{set:function(e){this._set("endPointSurfaceLocation",e),this._updateMeasurement()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"measurementSurfaceLocation",{get:function(){var e=this.startPointSurfaceLocation,t=this.endPointSurfaceLocation;return null==e||null==t?"camera-dependent":"above-the-surface"===e&&"below-the-surface"===t||"below-the-surface"===e&&"above-the-surface"===t||"on-the-surface"===e&&"on-the-surface"===t?"camera-dependent":"above-the-surface"===e||"above-the-surface"===t?"above-the-surface":"below-the-surface"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"validMeasurement",{get:function(){return!!this.startPoint&&!!this.endPoint},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isMeasuring",{get:function(){return!!this.startPoint},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"geodesicDistanceExceeded",{get:function(){return this.horizontalDistance&&this.horizontalDistance.value>this.geodesicMeasurementDistanceThreshold},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"measurementMode",{get:function(){var e=this.mode;return"auto"===e&&(e="euclidean","degrees"!==this.unit&&"degrees-minutes-seconds"!==this.unit||(e="geodesic"),this.geodesicDistanceExceeded&&(e="geodesic")),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"triangleView",{get:function(){var e=this._collapseTriangle(),t=null,i=null,r=null,n="geodesic"===this.measurementMode,o=this.directDistance,s=n?this.geodesicDistance:this.horizontalDistance,p=this.verticalDistance,u=null;switch(this.unit){case"metric":t=o&&c.formatMetricLength(o),i=s&&c.formatMetricLength(s),r=p&&c.formatMetricVerticalLength(p),u=o&&o.toUnit("meters");break;case"imperial":t=o&&c.formatImperialLength(o),i=s&&c.formatImperialLength(s),r=p&&c.formatImperialVerticalLength(p),u=o&&o.toUnit(l.preferredImperialLengthUnit(o.value,o.unit));break;case"degrees":i=this.geodesicAngle&&c.formatDecimal(this.geodesicAngle,"degrees"),u=this.geodesicAngle&&this.geodesicAngle.toUnit("degrees");break;case"degrees-minutes-seconds":i=this.geodesicAngle&&c.formatDMS(this.geodesicAngle),u=this.geodesicAngle&&this.geodesicAngle.toUnit("degrees");break;default:t=o&&c.formatDecimal(o,this.unit),i=s&&c.formatDecimal(s,this.unit),r=p&&c.formatDecimal(p,this.unit),u=o&&o.toUnit(this.unit)}var d=1;return u&&(d=a.nextHighestPowerOfTen(u.value/30),d*="degrees"===u.unit?b:l.convertUnit(1,u.unit,"meters"),d/=this._unitNormalizer.normalizeDistance(1)),{visible:this.validMeasurement&&!this.startPoint.equals(this.endPoint),mode:this.measurementMode,collapsed:e,directLabel:t,horizontalLabel:i,verticalLabel:r,stripeLength:d}},enumerable:!0,configurable:!0}),t.prototype.reset=function(){this.clearMeasurement()},t.prototype.clearMeasurement=function(){this.state="initial",this.startPoint=null,this.endPoint=null,this.cursorPoint=null,this._clearOverride("measurementSurfaceLocation"),this._updateMeasurement()},t.prototype.finishMeasurement=function(){if(!this._isOverridden("measurementSurfaceLocation")){var e=this.measurementSurfaceLocation,t="camera-dependent"===e?this.sceneView.state.camera.aboveGround?"above-the-surface":"below-the-surface":e;this._override("measurementSurfaceLocation",t)}this.state="measured"},t.prototype._collapseTriangle=function(){return!(this.validMeasurement&&!this.startPoint.equals(this.endPoint))||("geodesic"===this.measurementMode||Math.min(this.verticalDistance.value/this.horizontalDistance.value,this.horizontalDistance.value/this.verticalDistance.value)<this.triangleCollapseRatioThreshold)},t.prototype._exactGeodesicDistanceAndAngle=function(e,t){v.pointToWGS84ComparableLonLat(e,D),v.pointToWGS84ComparableLonLat(t,M);var i=a.deg2rad(D[0]),r=a.deg2rad(D[1]),n=a.deg2rad(M[0]),o=a.deg2rad(M[1]),c=Math.abs(n-i),l=a.acosClamped(Math.sin(r)*Math.sin(o)+Math.cos(r)*Math.cos(o)*Math.cos(c)),p=a.rad2deg(l),u={distance:0};return f.inverseGeodeticSolver(u,[D[0],D[1]],[M[0],M[1]]),{distance:new s(u.distance,"meters"),angle:new s(p,"degrees")}},t.prototype._approximateGeodesicDistanceAndAngle=function(e){return{distance:new s(e,"meters"),angle:new s(e/b,"degrees")}},t.prototype._euclideanDistances=function(e,t){e.z>t.z&&(e=[e,e=t][0]);var i=e.clone();i.z=t.z;var r=this._tempStartPosition,n=this._tempEndPosition,o=this._tempCornerPosition,a=this.sceneView.spatialReference,c=v.canProject(a,v.WGS84ECEFSpatialReference)?v.WGS84ECEFSpatialReference:a;v.pointToVector(e,r,c),v.pointToVector(t,n,c),v.pointToVector(i,o,c);var l=d.vec3.distance(r,n),p=d.vec3.distance(o,n),u=Math.abs(t.z-e.z);return l=this._unitNormalizer.normalizeDistance(l),p=this._unitNormalizer.normalizeDistance(p),u=this._unitNormalizer.normalizeElevation(u),{direct:new s(l,"meters"),horizontal:new s(p,"meters"),vertical:new s(u,"meters")}},t.prototype._updateMeasurement=function(){if(!this.startPoint||!this.endPoint)return this._set("directDistance",null),this._set("horizontalDistance",null),this._set("verticalDistance",null),this._set("geodesicDistance",null),void this._set("geodesicAngle",null);var e=this._euclideanDistances(this.startPoint,this.endPoint),t=this.sceneView.spatialReference,i=v.canProjectToWGS84ComparableLonLat(t)?this._exactGeodesicDistanceAndAngle(this.startPoint,this.endPoint):this._approximateGeodesicDistanceAndAngle(e.horizontal.value);this._set("directDistance",e.direct),this._set("horizontalDistance",e.horizontal),this._set("verticalDistance",e.vertical),this._set("geodesicDistance",i.distance),this._set("geodesicAngle",i.angle)},r([u.property({constructOnly:!0})],t.prototype,"sceneView",void 0),r([u.property({value:null})],t.prototype,"startPoint",null),r([u.property({value:null})],t.prototype,"startPointSurfaceLocation",null),r([u.property({value:null})],t.prototype,"endPoint",null),r([u.property({value:null})],t.prototype,"endPointSurfaceLocation",null),r([u.property({dependsOn:["startPointSurfaceLocation","endPointSurfaceLocation"]})],t.prototype,"measurementSurfaceLocation",null),r([u.property()],t.prototype,"cursorPoint",void 0),r([u.property()],t.prototype,"state",void 0),r([u.property()],t.prototype,"mode",void 0),r([u.property()],t.prototype,"unit",void 0),r([u.property()],t.prototype,"active",void 0),r([u.property({readOnly:!0,dependsOn:["startPoint","endPoint"]})],t.prototype,"validMeasurement",null),r([u.property({readOnly:!0,dependsOn:["startPoint"]})],t.prototype,"isMeasuring",null),r([u.property({readOnly:!0})],t.prototype,"directDistance",void 0),r([u.property({readOnly:!0})],t.prototype,"horizontalDistance",void 0),r([u.property({readOnly:!0})],t.prototype,"verticalDistance",void 0),r([u.property({readOnly:!0})],t.prototype,"geodesicDistance",void 0),r([u.property({readOnly:!0})],t.prototype,"geodesicAngle",void 0),r([u.property({readOnly:!0,dependsOn:["horizontalDistance","geodesicMeasurementDistanceThreshold"]})],t.prototype,"geodesicDistanceExceeded",null),r([u.property({readOnly:!0,dependsOn:["horizontalDistance","unit","geodesicDistanceExceeded"]})],t.prototype,"measurementMode",null),r([u.property({readOnly:!0,dependsOn:["unit","measurementMode","startPoint","endPoint","triangleCollapseRatioThreshold"]})],t.prototype,"triangleView",null),r([u.property()],t.prototype,"triangleCollapseRatioThreshold",void 0),r([u.property()],t.prototype,"geodesicMeasurementDistanceThreshold",void 0),t=r([u.subclass("esri.views.3d.interactive.measurementTools.directLineMeasurement3D.DirectLineMeasurement3DModel")],t)}(u.declared(n)),D=h.vec3f64.create(),M=h.vec3f64.create();return _});