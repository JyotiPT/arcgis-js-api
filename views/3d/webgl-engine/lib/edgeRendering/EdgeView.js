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

define(["require","exports","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/arrayUtils","../../../../../core/mathUtils","../../../../../core/promiseUtils","../../../../../core/requireUtils","../../../../../core/typedArrayUtil","../../../../../core/workers","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f64","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../support/buffer/utils","../../core/shaderLibrary/attributes/VertexPosition.glsl","../../core/util/TwoVectorPosition","../GridLocalOriginFactory","../localOriginHelper","../LocalOriginManager","../Object3D","../PreinterleavedGeometryData","../TextureBackedBuffer/BufferManager","./bufferLayouts","./edgeBufferWriters","./EdgeProcessingWorker","./EdgeRenderer","./strokes","./util","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject","module"],function(e,t,r,n,i,o,s,a,c,d,u,l,f,g,p,h,m,v,y,b,E,O,w,x,T,R,j,C,M,I,B,k,L,P,D){Object.defineProperty(t,"__esModule",{value:!0});var N=function(){function t(e,t,r){this.rctx=e,this.techniqueRepository=t,this.callbacks=r,this.profilingCallback=null,this.perObjectData=new Map,this.renderers=new Map,this.localOrigins=new w.LocalOriginManager(new E),this.numberOfRenderedEdges=0,this.gpuMemoryUsage=0,this.worker=new M,this.workerThread=null,this.destroyed=!1,this.tmpModelPosition=m.vec3f64.create(),this.tmpCameraPosition=m.vec3f64.create(),this.componentColorManager=new R.BufferManager(this.rctx,2)}return t.prototype.initialize=function(){var t=this;u.open(c.getAbsMid("./EdgeProcessingWorker",e,D)).then(function(e){t.destroyed?e.close():t.workerThread=e});for(var r=j.VertexLayout.createBuffer(4),n=0;n<4;n++)r.sideness.set(n,0,0===n||3===n?0:1),r.sideness.set(n,1,0===n||1===n?0:1);this.verticesBufferObject=L.createVertex(this.rctx,35044,r.buffer)},t.prototype.destroy=function(){this.destroyed||(this.workerThread&&(this.workerThread.close(),this.workerThread=null),this.verticesBufferObject&&(this.verticesBufferObject.dispose(),this.verticesBufferObject=null),this.destroyed=!0)},t.prototype.getUsedMemory=function(){return this.gpuMemoryUsage},Object.defineProperty(t.prototype,"numberOfRenderedPrimitives",{get:function(){return this.numberOfRenderedEdges},enumerable:!0,configurable:!0}),t.prototype.shouldRender=function(){return this.renderers.size>0},t.prototype.addComponentObject=function(e,t,r,o,s,c,d,u){return n(this,void 0,void 0,function(){var n,l,f;return i(this,function(i){switch(i.label){case 0:return this.hasObject(e)?[2]:(n=new Array,f={loaded:a.create(function(e){return l=e}),renderables:[],center:r},this.perObjectData.set(e,f),n.push(this.addComponentGeometry(e,t,f,o,s,c,d,u)),[4,a.all(n)]);case 1:return i.sent(),this.callbacks.setNeedsRender(),l(),[2]}})})},t.prototype.addObject=function(e,t,r,o,s){return n(this,void 0,void 0,function(){var n,c,d,u,l,f,g;return i(this,function(i){switch(i.label){case 0:if(this.hasObject(e))return[2];if(n=new Array,d={loaded:a.create(function(e){return c=e}),renderables:[]},this.perObjectData.set(e,d),s&&s.mergeGeometries&&e.geometries.length>1&&this.canMergeGeometries(e))n.push(this.addObjectMergedGeometries(e,d,t,r));else for(u=0;u<e.geometries.length;u++)if(l=e.geometries[u],f=e.geometryRecords[u],g=f.material,g.supportsEdges){if(l.data instanceof T)throw Error("Deprecated");n.push(this.addGeometryNonPreinterleaved(e,d,l.data,f,t[0],r,o))}return[4,a.all(n)];case 1:return i.sent(),this.callbacks.setNeedsRender(),c(),[2]}})})},t.prototype.hasObject=function(e){return this.perObjectData.has(e)},t.prototype.updateAllComponentOpacities=function(e,t){return n(this,void 0,void 0,function(){var r,n,o=this;return i(this,function(i){switch(i.label){case 0:return r=t instanceof Array?function(e){return t[e]}:function(){return t},[4,this.getObjectEntry(e)];case 1:return n=i.sent(),n.renderables.forEach(function(e){for(var t=e.components.meta.length,n=0;n<t;n++){var i=r(n),s=e.components.meta[n],a=s.index;s.material.opacity=i,e.components.buffer.textureBuffer.setDataElement(a,1,3,255*i)}o.updateTransparency(e)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateAllComponentMaterials=function(e,t,r,o){return n(this,void 0,void 0,function(){var n,s,a,c,d,u=this;return i(this,function(i){switch(i.label){case 0:return n=e instanceof x,s=!!r.slicePlaneEnabled,a=k.determineRendererType(t),c=I.EdgeRenderer.getKey(a,s,n),[4,this.getObjectEntry(e)];case 1:return d=i.sent(),d.renderables.forEach(function(r){if(c!==r.rendererKey){var n=u.renderers.get(r.rendererKey),i=u.acquireRenderer(a,s,e instanceof x);n.removeRenderable(r),n.refCount.decrement(),r.rendererKey=c,i.addRenderable(r)}for(var d=0;d<t.length;d++)r.components.meta[d].material=t[d];o&&u.updateComponentBuffer(r.components),u.updateTransparency(r)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateObjectVisibility=function(e,t){return n(this,void 0,void 0,function(){var r;return i(this,function(n){switch(n.label){case 0:return[4,this.getObjectEntry(e)];case 1:return r=n.sent(),r.renderables.forEach(function(e){e.visible=t}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.removeObject=function(e){var t=this,r=this.perObjectData.get(e);r&&(this.perObjectData.delete(e),r.loaded.then(function(){r.renderables.forEach(function(e){t.removeRenderable(e)}),t.callbacks.setNeedsRender()}))},t.prototype.getObjectEntry=function(e){return n(this,void 0,void 0,function(){var t;return i(this,function(r){switch(r.label){case 0:if(!(t=this.perObjectData.get(e)))throw"no object";return[4,t.loaded];case 1:return r.sent(),[2,t]}})})},t.prototype.removeAll=function(){var e=this;this.perObjectData.forEach(function(t,r){e.removeObject(r)})},t.prototype.render=function(e,t){var r=this;this.localOrigins.updateViewMatrices(e.view);var n=e.viewInvTransp,i=m.vec3f64.create(),o=new b.TwoVectorPosition,s=new y.VertexPosition.ViewProjectionTransform,a=f.mat3f64.create();h.vec3.set(i,n[3],n[7],n[11]),o.set(i),h.vec3.copy(s.worldFromView_TH,o.high),h.vec3.copy(s.worldFromView_TL,o.low),l.mat3.fromMat4(s.viewFromCameraRelative_RS,e.view),g.mat4.copy(s.projFromView,e.proj);var c=f.mat3f64.create();l.mat3.transpose(c,s.viewFromCameraRelative_RS),l.mat3.invert(a,c),this.renderers.forEach(function(e){0===e.refCount.value&&(r.renderers.delete(e.key),e.dispose())}),this.componentColorManager.garbageCollect(),this.componentColorManager.updateTextures();var d=0,u=0;if(this.renderers.forEach(function(e){return e.forEachRenderable(function(e){d+=e.statistics.averageEdgeLength,u++},t)}),0!==u){var p=e.view,v=40*d/u,E=k.estimateLengthAtDistance(e.viewport[3],e.fovY,1,3.5*e.pixelRatio),O={distanceFalloffFactor:v,minimumEdgeLength:E,transparency:t,viewProjectionTransform:s,transformNormal_ViewFromGlobal:a};this.updateObjectCameraDistances(e),this.numberOfRenderedEdges=0,this.renderers.forEach(function(t){r.renderRegularEdges(t,e,O),r.renderSilhouetteEdges(t,e,O)}),e.view=p}},t.prototype.updateTransparency=function(e){var t=k.determineEdgeTransparency(e.components.meta),r=k.determineObjectTransparency(e.components.meta);t===e.edgeTransparency&&r===e.objectTransparency||(e.edgeTransparency=t,e.objectTransparency=r,this.renderers.get(e.rendererKey).setRenderablesDirty())},t.prototype.computeModelTransformWithLocalOrigin=function(e,t,r){if(e.getCombinedStaticTransformation(t,r),t.origin)this.localOrigins.register(t.origin);else{var n=h.vec3.set(this.tmpModelPosition,r[12],r[13],r[14]);t.origin=this.localOrigins.acquire(n)}return O.applyToModelMatrix(t.origin.vec3,r),r},t.prototype.updateComponentBuffer=function(e){for(var t=e.meta,r=e.buffer,n=0;n<t.length;n++){var i=t[n].material,o=t[n].index,a=s.clamp(Math.round(i.size*I.LINE_WIDTH_FRACTION_FACTOR),0,255),c=s.clamp(i.extensionLength,-I.EXTENSION_LENGTH_OFFSET,255-I.EXTENSION_LENGTH_OFFSET)+I.EXTENSION_LENGTH_OFFSET,d="solid"===i.type?0:1,u=255*i.opacity,l=i.color,f=255*l[0],g=255*l[1],p=255*l[2],h=255*l[3];r.textureBuffer.setData(o,0,f,g,p,h),r.textureBuffer.setData(o,1,a,c,d,u)}},t.prototype.createComponentBuffers=function(e){for(var t=[],r=this.componentColorManager.getBuffer(e.length),n=0;n<e.length;n++){var i=e[n],o=r.acquireIndex();t.push({index:o,material:i})}var s={meta:t,buffer:r};return this.updateComponentBuffer(s),s},t.prototype.extractEdges=function(e,t,r,n,i){return this.worker.process({data:t,originalIndices:i,writerSettings:e,skipDeduplicate:r},n?null:this.workerThread)},t.prototype.createEdgeResources=function(e){var t={};if(e.regular.lodInfo.lengths.length>0){var r=new P(this.rctx,j.EdgeShaderAttributeLocations,{vertices:j.glVertexLayout,instances:C.RegularEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:L.createVertex(this.rctx,35044,e.regular.instancesData.buffer)});t.regular={vao:r,lod:e.regular.lodInfo}}if(e.silhouette.lodInfo.lengths.length>0){var r=new P(this.rctx,j.EdgeShaderAttributeLocations,{vertices:j.glVertexLayout,instances:C.SilhouetteEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:L.createVertex(this.rctx,35044,e.silhouette.instancesData.buffer)});t.silhouette={vao:r,lod:e.silhouette.lodInfo}}return t},t.prototype.disposeEdgeResources=function(e){e.regular&&(e.regular.vao.vertexBuffers.instances.dispose(),e.regular.vao.dispose(!1),e.regular.vao=null),e.silhouette&&(e.silhouette.vao.vertexBuffers.instances.dispose(),e.silhouette.vao.dispose(!1),e.silhouette.vao=null)},t.prototype.addGeometryNonPreinterleaved=function(e,t,r,o,s,a,c){return n(this,void 0,void 0,function(){var n,d,u,l;return i(this,function(i){return n=r.getAttribute("position"),d=this.computeModelTransformWithLocalOrigin(e,o,p.mat4f64.create()),u=o.origin,l={position:n,indices:r.getIndices("position"),modelTransform:d,origin:u},[2,this.addNonPreinterleaved(t,l,s,a,c)]})})},t.prototype.addNonPreinterleaved=function(e,t,r,o,s){return void 0===s&&(s=!1),n(this,void 0,void 0,function(){var n,a,c,d,u,l,f,g,p,h,m,v,y,b,E;return i(this,function(i){switch(i.label){case 0:for(n=this.acquireRenderer(r.type,o.slicePlaneEnabled||!1),a=t.modelTransform,c=t.origin,d=t.indices,u=t.position,l=u.data.length/u.strideIdx,f=j.EdgeInputBufferLayout.createBuffer(l),g=0;g<l;g++)f.position.set(g,0,u.data[u.offsetIdx+g*u.strideIdx+0]),f.position.set(g,1,u.data[u.offsetIdx+g*u.strideIdx+1]),f.position.set(g,2,u.data[u.offsetIdx+g*u.strideIdx+2]);return p=this.createComponentBuffers([r]),k.fillComponenBufferIndices(p.meta,[0,f.componentIndex.count],f.componentIndex),[4,this.extractEdges(n.writerSettings,f,!1,s,d)];case 1:return h=i.sent(),m=this.createEdgeResources(h),v=m.regular,y=m.silhouette,b=(v?v.vao.size:0)+(y?y.vao.size:0),E={regular:v,silhouette:y,transform:{modelMatrix:a,origin:c},statistics:{gpuMemoryUsage:b,averageEdgeLength:h.averageEdgeLength},components:p,visible:!0,edgeTransparency:k.determineEdgeTransparency(p.meta),objectTransparency:k.determineObjectTransparency(p.meta),distanceToCamera:0,rendererKey:n.key},e.renderables.push(E),n.addRenderable(E),this.gpuMemoryUsage+=b,[2]}})})},t.prototype.addComponentGeometry=function(e,t,r,o,s,a,c,d){return n(this,void 0,void 0,function(){var e,n,u,l,f,g,p,h,m,y,b,E,O;return i(this,function(i){switch(i.label){case 0:return e=k.determineRendererType(c),n=this.acquireRenderer(e,d.slicePlaneEnabled||!1,!1),u=j.EdgeInputBufferLayout.createBuffer(o.count),v.vec3.copy(u.position,o),l=this.createComponentBuffers(c),k.fillComponenBufferIndices(l.meta,a,u.componentIndex,s),f=!0,g=!1,p=n.writerSettings,[4,this.extractEdges(p,u,f,g,s)];case 1:return h=i.sent(),m=this.createEdgeResources(h),y=m.regular,b=m.silhouette,E=(y?y.vao.size:0)+(b?b.vao.size:0),O={regular:y,silhouette:b,transform:t,statistics:{gpuMemoryUsage:E,averageEdgeLength:h.averageEdgeLength},components:l,visible:!0,edgeTransparency:k.determineEdgeTransparency(l.meta),objectTransparency:k.determineObjectTransparency(l.meta),distanceToCamera:0,rendererKey:n.key},r.renderables.push(O),n.addRenderable(O),this.gpuMemoryUsage+=E,[2]}})})},t.prototype.canMergeGeometries=function(e){for(var t=null,r=null,n=0;n<e.geometries.length;n++){var i=e.geometries[n],s=e.geometryRecords[n];if(s.material.supportsEdges){if(i.data instanceof T)return!1;if(t){if(!o.equals(t,s.transformation))return!1}else t=s.transformation;if(!r&&s.origin)r=s;else if(r&&s.origin&&r.origin.id!==s.origin.id)return!1}}return!0},t.prototype.addObjectMergedGeometries=function(e,t,r,o){return n(this,void 0,void 0,function(){var n,s,a,c,u,l,f,g,h,m,v,y,u,l,b,g,E,h,O,w,x,T,R,j,u,C;return i(this,function(i){switch(i.label){case 0:for(n=new Map,s=0,a=null,c=null,u=0;u<e.geometries.length;u++)l=e.geometries[u],f=e.geometryRecords[u],g=f.material,g.supportsEdges&&(!c&&f.origin&&(c=f),h=l.data.getIndices("position"),s+=h?h.length:0,(h&&null==a||a===Uint16Array)&&(a=d.isUint16Array(h)?Uint16Array:Uint32Array));for(m=s?new a(s):null,v=[],y=0,u=0;u<e.geometries.length;u++)if(l=e.geometries[u],b=e.geometryRecords[u],g=b.material,g.supportsEdges){if(E=l.data.getAttribute("position"),h=l.data.getIndices("position"),null==(O=n.get(E.data))){for(O=v.length/3,w=E.offsetIdx;w<E.data.length;w+=E.strideIdx)v.push(E.data[w+0]),v.push(E.data[w+1]),v.push(E.data[w+2]);n.set(E.data,O)}if(h)for(x=0;x<h.length;x++)m[y++]=O+h[x]}for(T=c||e.geometryRecords[0],R=this.computeModelTransformWithLocalOrigin(e,T,p.mat4f64.create()),j=T.origin,u=0;u<e.geometryRecords.length;u++)e.geometryRecords[u].origin=j;return C={position:{data:v,offsetIdx:0,strideIdx:3},indices:m,modelTransform:R,origin:j},[4,this.addNonPreinterleaved(t,C,r[0],o)];case 1:return i.sent(),[2]}})})},t.prototype.acquireRenderer=function(e,t,r){void 0===r&&(r=!0);var n=I.EdgeRenderer.getKey(e,t,r),i=this.renderers.get(n);return this.strokesTexture||(this.strokesTexture=B.generateStrokesTexture(this.rctx)),i||(i=new I.EdgeRenderer(this.rctx,this.techniqueRepository,{type:e,slicePlaneEnabled:t,strokesTexture:this.strokesTexture,legacy:r}),this.renderers.set(n,i)),i.refCount.increment(),i},t.prototype.removeRenderable=function(e){var t=this.renderers.get(e.rendererKey);t.removeRenderable(e),t.refCount.decrement(),this.disposeEdgeResources(e),"origin"in e.transform&&this.localOrigins.release(e.transform.origin),this.gpuMemoryUsage-=e.statistics.gpuMemoryUsage;for(var r=0,n=e.components.meta;r<n.length;r++){var i=n[r];e.components.buffer.releaseIndex(i.index)}},t.prototype.updateObjectCameraDistances=function(e){var t=this,r=e.viewInvTransp;h.vec3.set(this.tmpCameraPosition,r[3],r[7],r[11]),this.perObjectData.forEach(function(e,r){var n="getCenter"in r?r.getCenter():e.center,i=h.vec3.distance(n,t.tmpCameraPosition);e.renderables.forEach(function(e){return e.distanceToCamera=i})})},t.prototype.renderRegularEdges=function(e,t,r){var n=this;e.bindRegularEdges(t,r);var i=r.transparency;e.forEachRenderable(function(i){if(i.visible&&i.regular){var o=k.computeEdgeCount(i.regular.lod.lengths,i.distanceToCamera,r);"origin"in i.transform&&(t.view=n.localOrigins.getViewMatrix(i.transform.origin)),e.renderRegularEdges(i,t,o),n.numberOfRenderedEdges+=o}},i)},t.prototype.renderSilhouetteEdges=function(e,t,r){var n=this;e.bindSilhouetteEdges(t,r);var i=r.transparency;e.forEachRenderable(function(i){if(i.visible&&i.silhouette){var o=k.computeEdgeCount(i.silhouette.lod.lengths,i.distanceToCamera,r);"origin"in i.transform&&(t.view=n.localOrigins.getViewMatrix(i.transform.origin)),e.renderSilhouetteEdges(i,t,o),n.numberOfRenderedEdges+=o}},i)},t}();t.EdgeView=N});