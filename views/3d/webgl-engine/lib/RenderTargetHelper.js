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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../webgl/FramebufferObject","../../../webgl/Renderbuffer","../../../webgl/Texture","../../../webgl/Util"],function(e,t,r,i,h,s,o){Object.defineProperty(t,"__esModule",{value:!0});var d={dataType:5121},p={},u=function(){function e(e){this.rctx=e,this.activeTargets=new Set,this.depthTextures=new Map,this.depthBuffers=new Map,this.colorTextures=new Map,this.framebuffers=new Map,this.nextId=1,this.depthTextureSupported=e.capabilities.depthTexture}return e.prototype.disposeAllResource=function(){this.depthBuffers.forEach(function(e){return e.dispose()}),this.depthBuffers.clear(),this.depthTextures.forEach(function(e){return e.dispose()}),this.depthTextures.clear(),this.colorTextures.forEach(function(e){return e.dispose()}),this.colorTextures.clear()},e.prototype.disposeTargetResource=function(e){var t=e.id;this.activeTargets.has(t)&&(this.activeTargets.delete(t),this.depthTextures.has(t)&&(this.depthTextures.get(t).dispose(),this.depthTextures.delete(t)),this.depthBuffers.has(t)&&(this.depthBuffers.get(t).dispose(),this.depthBuffers.delete(t)),this.colorTextures.has(t)&&(this.colorTextures.get(t).dispose(),this.colorTextures.delete(t)))},e.prototype.getDepthTexture=function(e,t){if(this.depthTextureSupported){var r=this.depthTextures.get(e.id);return r&&(r.descriptor.width===t.width&&r.descriptor.height===t.height||(r.dispose(),r=void 0)),r||(r=new s(this.rctx,{target:3553,pixelFormat:34041,dataType:34042,samplingMode:9728,wrapMode:33071,width:t.width,height:t.height}),this.depthTextures.set(e.id,r),this.activeTargets.add(e.id)),r}},e.prototype.getDepthBuffer=function(e,t){if(!this.depthTextureSupported){var i=this.depthBuffers.get(e.id);return i?i.descriptor.width===t.width&&i.descriptor.height===t.height||i.resize(t.width,t.height):(i=new h(this.rctx,r({internalFormat:34041},t)),this.depthBuffers.set(e.id,i),this.activeTargets.add(e.id)),i}},e.prototype.getColorTexture=function(e,t){var r=this.colorTextures.get(e.id);return r&&(r.descriptor.width===t.width&&r.descriptor.height===t.height||(r.dispose(),r=void 0)),r||(r=new s(this.rctx,{target:3553,pixelFormat:6408,dataType:e.dataType,samplingMode:null!=e.samplingMode?e.samplingMode:9729,wrapMode:33071,width:t.width,height:t.height}),this.colorTextures.set(e.id,r),this.activeTargets.add(e.id)),r},e.prototype.getAllocatedColorTexture=function(e){return this.colorTextures.get(e.id)},e.prototype.registerDepthTarget=function(e){void 0===e&&(e={});var t=this.nextId++;return r({id:t},p,e)},e.prototype.registerColorTarget=function(e){void 0===e&&(e={});var t=this.nextId++;return r({id:t},d,e)},e.prototype.getFramebuffer=function(e,t,r){var h=this.getKey(t,r),s=this.framebuffers.get(h),o=this.getColorTexture(t,e);if(this.depthTextureSupported){var d=r?this.getDepthTexture(r,e):void 0;if(!s)return s=r?new i(this.rctx,{colorTarget:0,depthStencilTarget:4},o,d):new i(this.rctx,{colorTarget:0,depthStencilTarget:0},o),this.framebuffers.set(h,s),s;var p=s.width!==e.width||s.height!==e.height||s.colorTexture!==o||s.depthStencilTexture!==d;return p&&(s.detachColorTexture(),s.detachDepthStencilTexture(),s.resize(e.width,e.height),s.attachColorTexture(o),s.attachDepthStencilTexture(d)),s}var u=r?this.getDepthBuffer(r,e):void 0;if(!s)return s=new i(this.rctx,{colorTarget:0,depthStencilTarget:r?3:0},o,u),this.framebuffers.set(h,s),s;var p=s.width!==e.width||s.height!==e.height||s.colorTexture!==o;return p&&(s.detachColorTexture(),s.detachDepthStencilBuffer(),s.resize(e.width,e.height),s.attachColorTexture(o),s.attachDepthStencilBuffer(u)),s},e.prototype.getKey=function(e,t){return e.id+"_"+(t?t.id:"X")+"_"+e.name+(t?"_"+t.name:"")},e.prototype.getGpuMemoryUsage=function(){var e=0,t=new Set,r=function(r){t.has(r)||(t.add(r),e+=o.getGpuMemoryUsage(r))};return this.depthTextures.forEach(r),this.colorTextures.forEach(r),this.depthBuffers.forEach(r),this.framebuffers.forEach(r),e},e}();t.RenderTargetHelper=u});