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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/buffer/InterleavedLayout","../core/shaderLibrary/DiscardOrAdjustAlpha.glsl","../lib/GLMaterialTexture","../lib/Material","../lib/Util","./internal/bufferWriterUtils","./internal/MaterialUtil","./renderers/InstancedRenderer","./renderers/MergedRenderer","../shaders/DefaultMaterialTechnique","../../../webgl/renderState","../../../webgl/renderState"],function(e,t,i,r,a,n,s,o,c,l,u,p,h,f,m,d,v,g,b,P){function y(e,t){return e?t?6:9:4}function x(e){return e.cullFace?0!==e.cullFace:!e.slicePlaneEnabled&&(!e.transparent&&!e.doubleSided)}var q=h.assert,S=function(e){function t(i,r){var a=e.call(this,r)||this;return a.supportsEdges=!0,a.techniqueConfig=new g.DefaultMaterialTechniqueConfiguration,a.params=m.copyParameters(i,I),a.vertexBufferLayout=t.getVertexBufferLayout(a.params),a.instanceBufferLayout=i.instanced?t.getInstanceBufferLayout(a.params):null,a}return i(t,e),t.prototype.isVisibleInPass=function(e){return 3!==e||this.params.castShadows},t.prototype.isVisible=function(){var t=this.params;if(!e.prototype.isVisible.call(this)||0===t.layerOpacity)return!1;var i=t.instanced,r=t.vertexColors,a=t.symbolColors,n=!!i&&i.indexOf("color")>-1,s=t.vvColorEnabled,o="replace"===t.colorMixMode,c=t.opacity>0,l=t.externalColor&&t.externalColor[3]>0;return r&&(n||s||a)?!!o||c:r?o?l:c:n||s||a?!!o||c:o?l:c},t.prototype.setParameterValues=function(e){var t=this.params;for(var i in e)"instanced"===i&&q(e.instanced===t.instanced,"Can not change instanced attributes"),"textureId"===i&&q(t.textureId,"Can only change texture of material that already has a texture"),"vertexColors"===i&&!0===e[i]&&e[i]!==t[i]&&q(t.vertexColors,"Can not enable vertex colors after DefaultMaterial creation"),t[i]=e[i];this.notifyDirty("matChanged")},t.prototype.getParameters=function(){return this.params},t.prototype.getTechniqueConfig=function(e){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.params.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.params.textureId,this.techniqueConfig.vertexTangents=this.params.vertexTangents,this.techniqueConfig.instanced=!!this.params.instanced,this.techniqueConfig.instancedDoublePrecision=this.params.instancedDoublePrecision,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.verticalOffset=null!==this.params.verticalOffset,this.techniqueConfig.screenSizePerspective=null!==this.params.screenSizePerspective,this.techniqueConfig.slice=this.params.slicePlaneEnabled,this.techniqueConfig.sliceHighlightDisabled=this.params.sliceHighlightDisabled,this.techniqueConfig.alphaDiscardMode="opaque"===this.params.textureAlphaMode?1:"mask"===this.params.textureAlphaMode?2:"maskBlend"===this.params.textureAlphaMode?3:0,this.techniqueConfig.normalsTypeDerivate="screenDerivative"===this.params.normals,0===e&&(this.techniqueConfig.treeRendering=!!this.params.treeRendering,this.techniqueConfig.vertexColors=this.params.vertexColors,this.techniqueConfig.symbolColors=this.params.symbolColors,this.techniqueConfig.doubleSidedMode=this.params.doubleSided&&"normal"===this.params.doubleSidedType?1:this.params.doubleSided&&"winding-order"===this.params.doubleSidedType?2:0,this.techniqueConfig.instancedColor=!!this.params.instanced&&this.params.instanced.indexOf("color")>-1,this.techniqueConfig.receiveShadows=this.params.receiveShadows,this.techniqueConfig.receiveAmbientOcclusion=this.params.receiveSSAO,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.params.textureAlphaPremultiplied,this.techniqueConfig.usePBR=this.params.usePBR,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.params.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.params.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.params.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.params.transparent||!this.params.offsetTransparentBackfaces)),this.techniqueConfig},t.prototype.intersect=function(e,t,i,r,n,o,c){if(null!==this.params.verticalOffset){var l=r.camera;s.vec3.set(W,i[12],i[13],i[14]);var u=null;switch(r.viewingMode){case"global":u=s.vec3.normalize(B,W);break;case"local":u=s.vec3.copy(B,E)}var p=0;if(null!==this.params.verticalOffset){var h=s.vec3.subtract(k,W,l.eye),f=s.vec3.length(h),d=s.vec3.scale(h,h,1/f),v=null;this.params.screenSizePerspective&&(v=s.vec3.dot(u,d)),p+=m.verticalOffsetAtDistance(l,f,this.params.verticalOffset,v,this.params.screenSizePerspective)}s.vec3.scale(u,u,p),s.vec3.transformMat3(L,u,r.transform.inverseRotation),n=s.vec3.subtract(R,n,L),o=s.vec3.subtract(z,o,L)}m.intersectTriangleGeometry(e,t,r,n,o,a.isSome(r.options.verticalOffset)?r.options.verticalOffset.object3D:void 0,c)},t.prototype.getGLMaterials=function(){return{color:C,depthShadowMap:w,normal:D,depth:T,highlight:M}},t.prototype.createRenderer=function(e,t){return this.params.softwareInstanced?new d(e,t,this):new v(e,t,this)},t.prototype.createBufferWriter=function(){return new O(this.vertexBufferLayout,this.instanceBufferLayout)},t.getVertexBufferLayout=function(e){var t=e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId,i=c.newLayout().vec3f("position").vec3f("normal");return e.vertexTangents&&i.vec4f("tangent"),t&&i.vec2f("uv0"),e.vertexColors&&i.vec4u8("color"),e.symbolColors&&i.vec4u8("symbolColor"),i},t.getInstanceBufferLayout=function(e){var t=c.newLayout();return t=e.instancedDoublePrecision?t.vec3f("modelOriginHi").vec3f("modelOriginLo").mat3f("model").mat3f("modelNormal"):t.mat4f("model").mat4f("modelNormal"),e.instanced&&e.instanced.indexOf("color")>-1&&(t=t.vec4f("instanceColor")),e.instanced&&e.instanced.indexOf("featureAttribute")>-1&&(t=t.vec4f("instanceFeatureAttribute")),t},t}(p.Material),C=function(e){function t(t){var i=this,r=t.material,a=r.getParameters();i=e.call(this,u.makeCtorParameters(t,a))||this,i.params=m.copyParameters(a);var n=i.params;return i.slot=y(n.transparent,n.writeDepth),i.technique=i.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,i.material.getTechniqueConfig(0),i.technique),i.selectPipeline(0),i}return i(t,e),t.prototype.selectPipeline=function(e){var t=this.params,i=0===e?A(t):null;this.pipelineState=P.makePipelineState({blending:i,culling:V(t),depthTest:{func:513},depthWrite:t.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.technique.program},t.prototype.getPrograms=function(){return null},t.prototype.updateParameters=function(){this.params=m.copyParameters(this.material.getParameters()),this.slot=y(this.params.transparent,this.params.writeDepth),this.updateTexture(this.params.textureId),this.technique=this.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,this.material.getTechniqueConfig(0),this.technique),this.selectPipeline(0)},t.prototype._updateShadowState=function(e){e.shadowMappingEnabled!==this.params.receiveShadows&&(this.material.setParameterValues({receiveShadows:e.shadowMappingEnabled}),this.updateParameters())},t.prototype.bind=function(e,t){var i=this.params;this._updateShadowState(t);var r=this.technique.program;e.bindProgram(r),e.setPipelineState(this.pipelineState),this.technique.bindPass(e,i,t),m.bindVerticalOffset(i.verticalOffset,t,r),m.bindScreenSizePerspective(i.screenSizePerspective,r),this.bindTexture(e,r)},t.prototype.release=function(){},t.prototype.bindView=function(e){var t=this.technique.program,i=this.params,r=i.instancedDoublePrecision?o.vec3f64.fromValues(e.viewInvTransp[3],e.viewInvTransp[7],e.viewInvTransp[11]):e.origin;m.bindView(r,e.view,t),m.bindCamPos(r,e.viewInvTransp,t),i.instancedDoublePrecision&&m.bindViewOriginDouble(r,t),i.slicePlaneEnabled&&m.bindSlicePlane(r,e.slicePlane,t),e.shadowMappingEnabled&&e.shadowMap.bindView(t,r)},t.prototype.bindInstance=function(e){var t=this.technique.program;t.setUniformMatrix4fv("model",e.transformation),t.setUniformMatrix4fv("modelNormal",e.transformationNormal)},t.prototype.getDrawMode=function(){return 4},t}(u),T=function(e){function t(t){var i=this,r=t.material;return i=e.call(this,u.makeCtorParameters(t,r.getParameters()))||this,i.updateParameters(),i}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.technique.program},t.prototype.getPrograms=function(){return null},t.prototype.selectPipeline=function(){var e=this.params;this.pipelineState=P.makePipelineState({culling:V(e),depthTest:{func:513},depthWrite:e.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=y(this.params.transparent,this.params.writeDepth)},t.prototype.updateParameters=function(){this.params=m.copyParameters(this.material.getParameters()),this.technique=this.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,this.material.getTechniqueConfig(1),this.technique),this.selectPipeline(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var i=this.technique.program,r=this.params;e.bindProgram(i),e.setPipelineState(this.pipelineState),this.technique.bindPass(e,r,t),m.bindVerticalOffset(r.verticalOffset,t,i),m.bindScreenSizePerspective(r.screenSizePerspective,i),this.bindTexture(e,i)},t.prototype.release=function(){},t.prototype.bindView=function(e){var t=this.technique.program,i=this.params,r=i.instancedDoublePrecision?o.vec3f64.fromValues(e.viewInvTransp[3],e.viewInvTransp[7],e.viewInvTransp[11]):e.origin;m.bindView(r,e.view,t),i.slicePlaneEnabled&&m.bindSlicePlane(r,e.slicePlane,t),i.screenSizePerspective&&m.bindCamPos(r,e.viewInvTransp,t),i.instancedDoublePrecision&&m.bindViewOriginDouble(r,t)},t.prototype.bindInstance=function(e){this.technique.program.setUniformMatrix4fv("model",e.transformation)},t.prototype.getDrawMode=function(){return 4},t}(u),w=function(e){function t(t){return e.call(this,t)||this}return i(t,e),t.prototype.updateParameters=function(){this.params=m.copyParameters(this.material.getParameters()),this.technique=this.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,this.material.getTechniqueConfig(3),this.technique),this.selectPipeline(),this.selectSlot(),this.updateTexture(this.params.textureId)},t}(T),D=function(e){function t(t){var i=this,r=t.material,a=r.getParameters();return i=e.call(this,u.makeCtorParameters(t,a))||this,i.params=m.copyParameters(a),i.technique=i.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,i.material.getTechniqueConfig(2),i.technique),i.selectPipeline(),i.selectSlot(),i}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.technique.program},t.prototype.getPrograms=function(){return null},t.prototype.selectPipeline=function(){var e=this.params;this.pipelineState=P.makePipelineState({culling:V(e),depthTest:{func:513},depthWrite:e.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=y(this.params.transparent,this.params.writeDepth)},t.prototype.updateParameters=function(){this.params=m.copyParameters(this.material.getParameters()),this.technique=this.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,this.material.getTechniqueConfig(2),this.technique),this.selectPipeline(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var i=this.technique.program,r=this.params;e.bindProgram(i),e.setPipelineState(this.pipelineState),this.technique.bindPass(e,r,t),m.bindVerticalOffset(r.verticalOffset,t,i),m.bindScreenSizePerspective(r.screenSizePerspective,i),this.bindTexture(e,i)},t.prototype.release=function(){},t.prototype.bindView=function(e){var t=this.technique.program,i=this.params,r=i.instancedDoublePrecision?o.vec3f64.fromValues(e.viewInvTransp[3],e.viewInvTransp[7],e.viewInvTransp[11]):e.origin;m.bindView(r,e.view,t),t.setUniformMatrix4fv("viewNormal",e.viewInvTransp),i.slicePlaneEnabled&&m.bindSlicePlane(r,e.slicePlane,t),i.screenSizePerspective&&m.bindCamPos(r,e.viewInvTransp,t),i.instancedDoublePrecision&&m.bindViewOriginDouble(r,t)},t.prototype.bindInstance=function(e){var t=this.technique.program;t.setUniformMatrix4fv("model",e.transformation),t.setUniformMatrix4fv("modelNormal",e.transformationNormal)},t.prototype.getDrawMode=function(){return 4},t}(u),M=function(e){function t(t){var i=this,r=t.material;return i=e.call(this,u.makeCtorParameters(t,r.getParameters()))||this,i.updateParameters(),i}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.technique.program},t.prototype.getPrograms=function(){return null},t.prototype.selectPipeline=function(){var e=this.params;this.pipelineState=P.makePipelineState({culling:V(e),depthTest:{func:513},depthWrite:e.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=y(this.params.transparent,this.params.writeDepth)},t.prototype.updateParameters=function(){this.params=m.copyParameters(this.material.getParameters()),this.technique=this.techniqueRep.acquireAndReleaseExisting(g.DefaultMaterialTechnique,this.material.getTechniqueConfig(4),this.technique),this.selectPipeline(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var i=this.technique.program,r=this.params;e.bindProgram(i),e.setPipelineState(this.pipelineState),this.technique.bindPass(e,r,t),m.bindVerticalOffset(r.verticalOffset,t,i),m.bindScreenSizePerspective(r.screenSizePerspective,i),this.bindTexture(e,i)},t.prototype.release=function(){},t.prototype.bindView=function(e){var t=this.technique.program,i=this.params,r=i.instancedDoublePrecision?o.vec3f64.fromValues(e.viewInvTransp[3],e.viewInvTransp[7],e.viewInvTransp[11]):e.origin;m.bindView(r,e.view,t),i.slicePlaneEnabled&&m.bindSlicePlane(r,e.slicePlane,t),i.screenSizePerspective&&m.bindCamPos(r,e.viewInvTransp,t),i.instancedDoublePrecision&&m.bindViewOriginDouble(r,t)},t.prototype.bindInstance=function(e){var t=this.technique.program;t.setUniformMatrix4fv("model",e.transformation),t.setUniformMatrix4fv("modelNormal",e.transformationNormal)},t.prototype.getDrawMode=function(){return 4},t}(u);!function(e){e.COLOR_GAMMA=2.1}(S||(S={}));var I={textureId:void 0,initTextureTransparent:!1,usePBR:!1,normalTextureId:void 0,vertexTangents:!1,occlusionTextureId:void 0,emissiveTextureId:void 0,metallicRoughnessTextureId:void 0,emissiveFactor:[0,0,0],metallicFactor:0,roughnessFactor:1,reflectanceFactor:.5,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,vertexColors:!1,symbolColors:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,softwareInstanced:!1,instanced:void 0,instancedDoublePrecision:!1,normals:"default",receiveSSAO:!0,receiveShadows:!1,castShadows:!0,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,sliceHighlightDisabled:!1,offsetTransparentBackfaces:!1,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvSizeValue:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],vvSymbolAnchor:[0,0,0],vvSymbolRotationMatrix:n.mat3f64.create(),transparent:!1,writeDepth:!0,textureAlphaMode:"blend",textureAlphaCutoff:l.TEXTURE_ALPHA_CUTOFF_DEFAULT,textureAlphaPremultiplied:!1},O=function(){function e(e,t){this.vertexBufferLayout=e,this.instanceBufferLayout=t}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices.position.length},e.prototype.write=function(e,t,i,r){f.writeDefaultAttributes(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,i,r)},e}(),A=function(e){return e.transparent&&b.separateBlendingParams(770,1,771,771)},V=function(e){return x(e)&&{face:1===e.cullFace?1028:1029,mode:2305}},R=o.vec3f64.create(),z=o.vec3f64.create(),E=o.vec3f64.fromValues(0,0,1),B=o.vec3f64.create(),L=o.vec3f64.create(),W=o.vec3f64.create(),k=o.vec3f64.create();return S});