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

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f32","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f32","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../geometry/support/aaBoundingBox","./PointHighlights","../../support/geometryUtils","../../support/geometryUtils","../../support/orientedBoundingBox","../../webgl-engine/lib/ComponentUtils","../../webgl-engine/lib/intersectorUtils","../../webgl-engine/lib/ProgramRepository","../../webgl-engine/materials/internal/MaterialUtil","../../webgl-engine/shaders/PointRendererPrograms","../../../webgl/BufferObject","../../../webgl/renderState","../../../webgl/VertexArrayObject"],function(e,t,i,r,n,s,o,a,l,h,c,u,p,d,g,m,f,_,v,P,b,S,x){function y(e){return e?256:64}function z(e,t,i,r,n){if(i.drawScreenSpace)return i.fixedSize*t*r;var s=y(n)*t*r;return i.drawFixedSize?Math.min(i.fixedSize/2,s):i.screenMinSize>0?Math.min(Math.max(i.screenMinSize*t*r,e/2),s):Math.min(e/2,s)}function R(e,t,i,r,n){return i.drawScreenSpace?0:z(e,t,i,r,n)}function w(e,t,i){return null==i&&(i=l.vec3f64.create()),i[0]=e.origin[0]+e.coordinates[3*t],i[1]=e.origin[1]+e.coordinates[3*t+1],i[2]=e.origin[2]+e.coordinates[3*t+2],i}Object.defineProperty(t,"__esModule",{value:!0});var H={positions:[{name:"aPosition",count:3,type:5126,offset:0,stride:12,normalized:!1}],colors:[{name:"aColor",count:3,type:5121,offset:0,stride:3,normalized:!0}]},M=function(){function e(e){var t=this;this._params=e,this.type="Point",this._highlights=new u.PointHighlights({forEachNode:function(e){return t.forEachNode(e)},addHighlight:function(e,i,r,n){return t.addHighlight(e,i,r,n)},removeHighlight:function(e,i){return t.removeHighlight(e,i)}}),this.canRender=!0,this.layerUid="",this._useFixedSizes=!1,this._scaleFactor=1,this._minSizePx=0,this._useRealWorldSymbolSizes=!1,this._size=0,this._sizePx=0,this._slicePlaneEnabled=!1,this._clipBox=c.create(c.POSITIVE_INFINITY),this._programRep=null,this._recreatePrograms=!0,this._programWorld=null,this._programScreen=null,this._programWorldDepth=null,this._programScreenDepth=null,this._programWorldHighlight=null,this._programScreenHighlight=null,this.tempMatrix4=n.mat4f32.create(),this.tempVec3=a.vec3f32.create(),this.nodes=[]}return Object.defineProperty(e.prototype,"needsHighlight",{get:function(){return this._highlights.hasHighlights},enumerable:!0,configurable:!0}),e.prototype.initializeRenderContext=function(e){this._initContext=e;var t=e.rctx;this._programRep=new _(t),e.requestRender(),this._recreatePrograms=!0},e.prototype.uninitializeRenderContext=function(){this._programRep.dispose(),this._programRep=null,this._programWorld=null,this._programScreen=null,this._programWorldDepth=null,this._programScreenDepth=null,this._programWorldHighlight=null,this._programScreenHighlight=null},e.prototype.intersect=function(e,t,i,r){var n=this,a=l.vec3f64.create(),u=l.vec3f64.create(),m=l.vec3f64.create(),_=l.vec3f64.create(),v=d.plane.create(),P=e.camera.perScreenPixelRatio/2,b=e.camera.near,S=this._getSizeParams();o.vec3.subtract(u,r,i);var x=1/o.vec3.length(u);o.vec3.scale(u,u,x),o.vec3.negate(m,u),h.vec4.set(v,u[0],u[1],u[2],-o.vec3.dot(u,i));var y=function(){function e(){this.node=null,this.pointId=null,this.point=null,this.dist=null,this.normal=null,this.layerUid=""}return e}(),H=new y,M=new y,E=[],I=c.create(),F=c.create(this._clipBox);c.offset(F,-i[0],-i[1],-i[2],F);for(var U=this,W=0,O=this.nodes;W<O.length;W++){var q=O[W];!function(s){var l=s.splatSize*U._scaleFactor,h=g.minimumDistancePlane(s.obb,v),p=g.maximumDistancePlane(s.obb,v);h-=R(l,h+b,S,P,s.isLeaf),p-=R(l,p+b,S,P,s.isLeaf);var d=p<0,f=null!=H.dist&&null!=M.dist&&H.dist<h*x&&M.dist>p*x;if(d||f)return"continue";var W=z(l,p+b,S,P,s.isLeaf);if(!g.intersectLine(s.obb,i,u,W))return"continue";var O=W*W;g.toAaBoundingBox(s.obb,I),c.offset(I,-i[0],-i[1],-i[2],I);var q=!c.contains(F,I);o.vec3.subtract(_,s.origin,i);for(var V=s.coordinates.length/3,j=0;j<V;j++)!function(h){if(a[0]=_[0]+s.coordinates[3*h],a[1]=_[1]+s.coordinates[3*h+1],a[2]=_[2]+s.coordinates[3*h+2],q&&!c.containsPoint(F,a))return"continue";var p=o.vec3.dot(a,u),d=o.vec3.squaredLength(a)-p*p;if(d>O)return"continue";var g=p+b,f=R(l,g,S,P,s.isLeaf);if(p-f<0)return"continue";g-=f;var v=z(l,g,S,P,s.isLeaf);if(d>v*v)return"continue";var I=(p-f)*x,U=function(e){e.point=w(s,h,e.point),e.dist=I,e.normal=m,e.node=s,e.pointId=h,e.layerUid=n.layerUid};if((null==H.dist||I<H.dist)&&(null==t||t(i,r,I))&&U(H),0!==e.options.store&&(null==M.dist||I>M.dist)&&(null==t||t(i,r,I))&&U(M),2===e.options.store&&(null==t||t(i,r,I))){var W=new y;U(W),E.push(W)}}(j)}(q)}var V=function(e){var t=e.layerUid,i=e.node,r=e.pointId;return{type:"external",point:e.point,metadata:{layerUid:t,createGraphic:function(){return n._params.createGraphic(i,r,e.point)}}}},j=function(e,t){var i=V(t),r=t.layerUid+"/"+t.node.id+"/"+t.pointId;e.set(i,r,t.dist,t.normal,s.mat4f64.IDENTITY,void 0),e.intersector="PointRenderer"};if(null!=H.dist){var N=e.results.min;(null==N.dist||H.dist<N.dist)&&j(N,H)}if(null!=M.dist&&0!==e.options.store){var D=e.results.max;(null==D.dist||M.dist>D.dist)&&j(D,M)}if(2===e.options.store)for(var B=p.ray.fromPoints(i,r),C=0,T=E;C<T.length;C++){var A=T[C],L=new f.IntersectorResult(B);j(L,A),e.results.all.push(L)}},e.prototype.render=function(e){if(0!==e.pass&&1!==e.pass&&4!==e.pass)return!1;for(var t=1===e.pass,i=e.rctx,n=0,s=this.nodes;n<s.length;n++){var a=s[n];null==a.vao&&this._initNode(e,a)}this._ensurePrograms();var l=this._getSizeParams(),h=this._selectProgram(e.pass,l);if(null==h||0===this.nodes.length)return!0;var u=this._clipBox,p=!c.equals(u,c.POSITIVE_INFINITY,function(e,t){return e===t});if(p||(o.vec3.set(this.tempVec3,-1/0,-1/0,-1/0),h.setUniform3fv("uClipMin",this.tempVec3),o.vec3.set(this.tempVec3,1/0,1/0,1/0),h.setUniform3fv("uClipMax",this.tempVec3)),i.bindProgram(h),i.setPipelineState(this._pipelineState),h.setUniformMatrix4fv("uProjectionMatrix",e.camera.projectionMatrix),t&&h.setUniform2f("nearFar",e.camera.near,e.camera.far),e.isHighlightPass){var d={viewport:e.camera.fullViewport,highlightDepthTexture:e.highlightDepthTexture};v.bindHighlightRendering(i,d,h)}var g=e.camera.pixelRatio;l.drawFixedSize&&h.setUniform2f("uPointScale",l.fixedSize*g,e.camera.fullHeight);for(var m=this._slicePlaneEnabled?e.sliceHelper&&e.sliceHelper.plane:null,f=0,_=this.nodes;f<_.length;f++){var a=_[f];if(0!==a.coordinates.length&&(!e.isHighlightPass||a.highlights)){if(h.setUniform2f("uScreenMinMaxSize",l.screenMinSize*g,y(a.isLeaf)*g),!l.drawFixedSize){var P=a.splatSize*this._scaleFactor;h.setUniform2f("uPointScale",P*g,e.camera.fullHeight/g)}var b=a.origin;p&&(o.vec3.set(this.tempVec3,u[0]-b[0],u[1]-b[1],u[2]-b[2]),h.setUniform3fv("uClipMin",this.tempVec3),o.vec3.set(this.tempVec3,u[3]-b[0],u[4]-b[1],u[5]-b[2]),h.setUniform3fv("uClipMax",this.tempVec3)),r.mat4.identity(this.tempMatrix4),r.mat4.translate(this.tempMatrix4,this.tempMatrix4,b),r.mat4.multiply(this.tempMatrix4,e.camera.viewMatrix,this.tempMatrix4),h.setUniformMatrix4fv("uModelViewMatrix",this.tempMatrix4),m&&v.bindSlicePlane(b,m,h),i.bindVAO(a.vao),e.isHighlightPass?this._renderHighlightFragments(i,a):i.drawArrays(0,0,a.coordinates.length/3)}}return!0},e.prototype._renderHighlightFragments=function(e,t){var r=t.highlights;if(r){for(var n=i.unwrap(r[0].component),s=n+1,o=1;o<r.length;o++){var a=i.unwrap(r[o].component);if(a!==s){var l=s-n;l>0&&e.drawArrays(0,n,l),n=a}s=a+1}var h=s-n;h>0&&e.drawArrays(0,n,h)}},Object.defineProperty(e.prototype,"useFixedSizes",{get:function(){return this._useFixedSizes},set:function(e){this._useFixedSizes!==e&&(this._useFixedSizes=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scaleFactor",{get:function(){return this._scaleFactor},set:function(e){this._scaleFactor!==e&&(this._scaleFactor=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minSizePx",{get:function(){return this._minSizePx},set:function(e){this._minSizePx!==e&&(this._minSizePx=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useRealWorldSymbolSizes",{get:function(){return this._useRealWorldSymbolSizes},set:function(e){this._useRealWorldSymbolSizes!==e&&(this._useRealWorldSymbolSizes=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return this._size},set:function(e){this._size!==e&&(this._size=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sizePx",{get:function(){return this._sizePx},set:function(e){this._sizePx!==e&&(this._sizePx=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"clippingBox",{set:function(e){c.set(this._clipBox,e||c.POSITIVE_INFINITY)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"slicePlaneEnabled",{get:function(){return this._slicePlaneEnabled},set:function(e){this._slicePlaneEnabled!==e&&(this._slicePlaneEnabled=e,this._requestRender(),this._recreatePrograms=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectionHandlerId",{get:function(){return this.layerUid},enumerable:!0,configurable:!0}),e.prototype.addNode=function(e){this.nodes.push(e),this._highlights.nodeAdded(e),this._requestRender()},e.prototype.removeNode=function(e){var t=this,i=null;return this.nodes=this.nodes.filter(function(r){return r.id!==e||(i=r,r.vao&&(r.vao.dispose(!0),r.vao=null),t._highlights.nodeRemoved(r),!1)}),this._requestRender(),i},e.prototype.forEachNode=function(e){this.nodes.forEach(e)},e.prototype.removeAll=function(){this.nodes.forEach(function(e){e.vao&&(e.vao.dispose(!0),e.vao=null)}),this._highlights.removeAll(),this.nodes=[],this._requestRender()},e.prototype.highlight=function(e,t){return this._highlights.add(e,t)},e.prototype.addHighlight=function(e,t,i,r){e.highlights=m.addHighlight(e.highlights,t,i,r),this._requestRender()},e.prototype.removeHighlight=function(e,t){e.highlights=m.removeHighlight(e.highlights,t),this._requestRender()},e.prototype._initNode=function(e,t){var i=e.rctx;t.vao=new x(i,P.program.attributes,H,{positions:b.createVertex(i,35044,t.coordinates),colors:b.createVertex(i,35044,t.rgb)})},e.prototype._requestRender=function(){this._initContext&&this._initContext.requestRender()},e.prototype._getSizeParams=function(){var e=this._useFixedSizes,t=e&&!this._useRealWorldSymbolSizes,i=t?this._sizePx:this._size,r=this._minSizePx;return e&&(r=0),{drawScreenSpace:t,drawFixedSize:e,fixedSize:i,screenMinSize:r}},e.prototype._selectProgram=function(e,t){var i=t.drawScreenSpace;switch(e){case 1:return i?this._programScreenDepth:this._programWorldDepth;case 4:return i?this._programScreenHighlight:this._programWorldHighlight;default:return i?this._programScreen:this._programWorld}},e.prototype._ensurePrograms=function(){this._recreatePrograms&&(this._recreatePrograms=!1,this._programWorld=this._programRep.getProgram(P.program,{slicePlaneEnabled:this._slicePlaneEnabled}),this._programScreen=this._programRep.getProgram(P.program,{drawScreenSize:!0,slicePlaneEnabled:this._slicePlaneEnabled}),this._programWorldDepth=this._programRep.getProgram(P.program,{depthPass:!0,slicePlaneEnabled:this._slicePlaneEnabled}),this._programScreenDepth=this._programRep.getProgram(P.program,{drawScreenSize:!0,depthPass:!0,slicePlaneEnabled:this._slicePlaneEnabled}),this._programWorldHighlight=this._programRep.getProgram(P.program,{highlightPass:!0,slicePlaneEnabled:this._slicePlaneEnabled}),this._programScreenHighlight=this._programRep.getProgram(P.program,{drawScreenSize:!0,highlightPass:!0,slicePlaneEnabled:this._slicePlaneEnabled}),this._pipelineState=S.makePipelineState({depthTest:{func:513},depthWrite:S.defaultDepthWriteParams,colorWrite:S.defaultColorWriteParams}))},e}();t.PointRenderer=M,function(e){function t(e){return e.hasOwnProperty("splatSize")}e.isInstanceOfNode=t}(M=t.PointRenderer||(t.PointRenderer={})),t.PointRenderer=M});