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

define(["require","exports","../../../../core/maybe","../../../../core/promiseUtils","../../support/imageUtils","../../../webgl/BufferObject","../../../webgl/FramebufferObject","../../../webgl/Program","../../../webgl/renderState","../../../webgl/Texture","../../../webgl/VertexArrayObject"],function(e,t,r,i,a,s,o,h,n,d,u){return function(){function t(e){this.resourceLoadingPromise=null,this.isEnabled=!1,this.vertexAttributeLocations={vPosition:0},this.vertexBufferLayout=[{name:"vPosition",count:2,type:5126,offset:0,stride:8,normalized:!1}],this.rctx=e}return t.prototype.loadResources=function(e){var t=this;if(!this.data||!this.textureArea||!this.textureSearch){var r=this.resourceLoadingPromise||this.loadDataModule().then(function(){return t.loadTextures()});return e&&r.then(e),this.resourceLoadingPromise||(this.resourceLoadingPromise=r,r.then(function(){return t.resourceLoadingPromise=null})),!1}return!0},t.prototype.loadDataModule=function(){var t=this;return this.data?i.resolve():i.create(function(r){return e(["./SmaaRenderPassData"],function(e){t.data=e,r()})})},t.prototype.loadTextures=function(){var e=this;return i.all([this.loadTextureFromBase64(this.data.areaTexture,9729,6407),this.loadTextureFromBase64(this.data.searchTexure,9728,6409)]).then(function(t){var r=t[0],i=t[1];e.textureArea=r,e.textureSearch=i})},Object.defineProperty(t.prototype,"isLoadingResources",{get:function(){return null!=this.resourceLoadingPromise},enumerable:!0,configurable:!0}),t.prototype.enable=function(){if(this.isEnabled)return!0;if(!this.loadResources())return!1;var e=this.rctx;this.programEdgeDetect=new h(e,this.data.edgeDetectShader.vertex,this.data.edgeDetectShader.fragment,this.vertexAttributeLocations),this.programBlendWeights=new h(e,this.data.blendWeightShader.vertex,this.data.blendWeightShader.fragment,this.vertexAttributeLocations),this.programBlur=new h(e,this.data.blurShader.vertex,this.data.blurShader.fragment,this.vertexAttributeLocations),this.pipelineState=n.makePipelineState({colorWrite:n.defaultColorWriteParams});var t=new Float32Array([-1,-1,3,-1,-1,3]);return this.vao=new u(e,this.vertexAttributeLocations,{geometry:this.vertexBufferLayout},{geometry:new s(e,34962,35044,t)}),this.tmpFramebufferEdges=new o(this.rctx,{colorTarget:0,depthStencilTarget:0},{target:3553,pixelFormat:6407,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4}),this.tmpFramebufferBlend=new o(this.rctx,{colorTarget:0,depthStencilTarget:0},{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4}),this.isEnabled=!0,!0},t.prototype.disable=function(){this.isEnabled&&(this.programEdgeDetect.dispose(),this.programEdgeDetect=null,this.programBlendWeights.dispose(),this.programBlendWeights=null,this.programBlur.dispose(),this.programBlur=null,this.vao.dispose(),this.vao=null,this.textureArea.dispose(),this.textureArea=null,this.textureSearch.dispose(),this.textureSearch=null,this.tmpFramebufferBlend.dispose(),this.tmpFramebufferBlend=null,this.tmpFramebufferEdges.dispose(),this.tmpFramebufferEdges=null,this.isEnabled=!1)},t.prototype.render=function(e,t){this.enable();var i=this.rctx,a={x:0,y:0,width:0,height:0};r.isSome(t)?(a.width=t.descriptor.width,a.height=t.descriptor.height):(a.width=i.gl.canvas.width,a.height=i.gl.canvas.height),i.bindVAO(this.vao),i.setPipelineState(this.pipelineState),i.setViewport(a.x,a.y,a.width,a.height),this.tmpFramebufferEdges.resize(a.width,a.height),i.bindFramebuffer(this.tmpFramebufferEdges),i.setClearColor(0,0,0,1),i.clear(16384),i.bindProgram(this.programEdgeDetect),i.bindTexture(e.colorTexture,0),this.programEdgeDetect.setUniform1i("tColor",0),this.programEdgeDetect.setUniform4f("uResolution",1/a.width,1/a.height,a.width,a.height),i.drawArrays(4,0,3),this.tmpFramebufferBlend.resize(a.width,a.height),i.bindFramebuffer(this.tmpFramebufferBlend),i.setClearColor(0,0,1,1),i.clear(16384),i.bindProgram(this.programBlendWeights),this.programBlendWeights.setUniform4f("uResolution",1/a.width,1/a.height,a.width,a.height),i.bindTexture(this.textureSearch,1),this.programBlendWeights.setUniform1i("tSearch",1),i.bindTexture(this.textureArea,2),this.programBlendWeights.setUniform1i("tArea",2),i.bindTexture(this.tmpFramebufferEdges.colorTexture,3),this.programBlendWeights.setUniform1i("tEdges",3),i.drawArrays(4,0,3),i.bindFramebuffer(t),i.setClearColor(0,1,0,1),i.clear(16384),i.bindProgram(this.programBlur),this.programBlur.setUniform4f("uResolution",1/a.width,1/a.height,a.width,a.height),i.bindTexture(e.colorTexture,0),this.programBlur.setUniform1i("tColor",0),i.bindTexture(this.tmpFramebufferBlend.colorTexture,1),this.programBlur.setUniform1i("tBlendWeights",1),i.drawArrays(4,0,3)},t.prototype.loadTextureFromBase64=function(e,t,r){var i=new d(this.rctx,{pixelFormat:r,dataType:5121,wrapMode:33071,samplingMode:t},null);return a.requestImage(e).then(function(e){return i.resize(e.width,e.height),i.setData(e),i})},t}()});