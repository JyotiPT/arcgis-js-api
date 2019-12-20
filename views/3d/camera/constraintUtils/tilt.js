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

define(["require","exports","../../../../core/compilerUtils","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","./common","../../state/utils/viewUtils","../../support/earthUtils","../../support/geometryUtils"],function(e,t,r,a,n,i,s,c,o,l,u,d){function m(e,t,a,i){void 0===a&&(a=o.defaultApplyOptions),void 0===i&&(i=!0),q.eyeCenterDistance=0,q.requiresTwoSteps=!1;var c=p(e,t,a,void 0,q);if(0===c)return!1;switch(n.mat4.identity(T),n.mat4.rotate(T,T,-c,t.viewRight),a.tiltMode){case 1:s.vec3.transformMat4(S,t.viewForward,T),s.vec3.scale(S,S,q.eyeCenterDistance),s.vec3.add(t.center,t.eye,S);break;case 0:s.vec3.subtract(S,t.center,t.eye),s.vec3.transformMat4(S,S,T),s.vec3.subtract(t.eye,t.center,S);break;default:r.neverReached(a.tiltMode)}return s.vec3.transformMat4(t.up,t.up,T),t.markViewDirty(),!q.requiresTwoSteps||!i||m(e,t,a,!1)}function p(e,t,r,a,n){if(void 0===r&&(r=o.defaultApplyOptions),void 0===a&&(a=o.defaultApplyOptions),!e.state.constraints.tilt)return 0;var i=t.distance,s=e.state.constraints.tilt(i,P);return R(e,r,s),2===a.interactionType&&o.hasConstraintType(a.selection,2)&&x(e,a.interactionStartCamera,s),1===r.tiltMode||1===a.tiltMode?f(e,t,s,n):v(e,t,s)}function v(e,t,r){var n=l.viewAngle(e.renderCoordsHelper,t.center,t.eye),i=a.clamp(n,r.min,r.max),s=n-i;return M(s)?s:0}function f(e,t,a,n){switch(n&&(n.requiresTwoSteps=!1),e.viewingMode){case"global":return h(e,t,a,n);case"local":return y(e,t,a,n);default:return void r.neverReached(e.viewingMode)}}function y(e,t,r,n){var i=l.viewAngle(e.renderCoordsHelper,t.center,t.eye),s=a.clamp(i,r.min,r.max),c=i-s;if(!M(c))return 0;if(n){var o=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,u=e.renderCoordsHelper.getAltitude(t.eye)-o,d=Math.cos(s);Math.abs(d)>1e-4?n.eyeCenterDistance=u/d:n.eyeCenterDistance=t.distance}return c}function h(e,t,r,n){var i=C(e,t,b),s=a.clamp(i.tiltAtCenter,r.min,r.max);if(!M(i.tiltAtCenter-s))return 0;var c,o;return i.centerIsOnSurface?(c=w(i),o=g(i,c)):(c=i.constraints.clampTilt(i.eyeCenterDistance,i.tiltAtCenter),n&&c<Math.PI/2&&(n.requiresTwoSteps=!0,c=Math.PI/2-1e-5),o=I(i,c)),n&&(n.eyeCenterDistance=A(i,c)),o}function C(e,t,r){var n=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,i=n+u.earthRadius,c=e.renderCoordsHelper.intersectManifold(t.ray,n,D);return r.eyeCenterDistance=t.distance,c?(r.eyeCenterDistance=s.vec3.distance(t.eye,D),r.tiltAtCenter=l.viewAngle(e.renderCoordsHelper,D,t.eye)):e.state.isLocal?r.tiltAtCenter=l.viewAngle(e.renderCoordsHelper,t.center,t.eye):(d.sphere.closestPointOnSilhouette(d.sphere.wrap(i),t.ray,D),r.eyeCenterDistance=s.vec3.distance(t.eye,D),r.tiltAtCenter=a.acosClamped(-s.vec3.dot(t.viewForward,s.vec3.normalize(D,D)))),r.radius=i,r.eyeRadius=s.vec3.length(t.eye),r.constraints=e.state.constraints,r.centerIsOnSurface=c,r}function M(e){return Math.abs(e)>1e-9}function w(e){var t=e.constraints,r=e.eyeCenterDistance,a=e.tiltAtCenter,n=a,i=t.clampTilt(r,a),s=A(e,i);if(t.clampTilt(s,a)===i)return i;for(var c=0;c<10&&M(i-n);){var o=(n+i)/2,l=A(e,o);M(t.clampTilt(l,o)-o)?n=o:i=o,c++}return i}function A(e,t){if(!e.centerIsOnSurface)return e.eyeCenterDistance;var r=Math.PI-a.clamp(t,0,Math.PI),n=a.asinClamped(e.radius/e.eyeRadius*Math.sin(r)),i=Math.PI-r-n,s=Math.sin(i)/Math.sin(r);if(e.eyeRadius<e.radius&&s>1){var c=Math.PI-n,o=Math.PI-r-c;return Math.sin(o)/Math.sin(r)*e.eyeRadius}return s*e.eyeRadius}function g(e,t){var r=a.asinClamped(e.radius/e.eyeRadius*Math.sin(e.tiltAtCenter)),n=a.asinClamped(e.radius/e.eyeRadius*Math.sin(t));return e.eyeRadius>e.radius?r-n:n-r}function I(e,t){return e.tiltAtCenter-Math.PI/2-(t-Math.PI/2)}function R(e,t,r){if(0!==t.interactionType){var a=t.interactionStartCamera,n=t.interactionFactor,i=r.min,s=r.max,c=p(e,a,o.defaultApplyOptions,t),u=0===c?0:l.viewAngle(e.renderCoordsHelper,a.center,a.eye);r.min=i,r.max=s,2===t.interactionType?(o.hasConstraintType(t.selection,2)&&x(e,a,r),o.adjustRangeForInteraction(c,u,!0,n,O,r)):o.adjustRangeForInteraction(c,u,!1,n,O,r)}}function x(e,t,r){if(!e.state.isLocal){var n=e.state.constraints;if(n.altitude){var i=s.vec3.squaredLength(t.center),c=Math.sqrt(i),o=t.distance,l=n.altitude.min+u.earthRadius,d=n.altitude.max+u.earthRadius,m=(l*l-o*o-i)/(-2*c*o),p=(d*d-o*o-i)/(-2*c*o);r.min=Math.max(r.min,Math.min(Math.PI-a.acosClamped(p),r.max)),r.max=Math.min(r.max,Math.PI-a.acosClamped(m))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.applyTiltConstraint=m,t.getTiltConstraintError=p;var S=c.vec3f64.create(),T=i.mat4f64.create(),D=c.vec3f64.create(),O=a.deg2rad(5),P={min:0,max:0},b={constraints:null,radius:0,eyeRadius:0,centerIsOnSurface:!0,eyeCenterDistance:0,tiltAtCenter:0},q={eyeCenterDistance:0,requiresTwoSteps:!1}});