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

define(["require","exports","../../core/has","../../core/maybe","./enums","./InstanceCounter","./renderState","./capabilities/isWebGL2Context","./capabilities/load"],function(t,e,i,s,n,a,l,r,o){function h(t,e){switch(t){case 0:return 2*e;case 4:return e/3;case 5:case 6:return e-2}return 0}return function(){function t(t,e){var s=this;this.gl=null,this._blendEnabled=!1,this._blendColorState={r:0,g:0,b:0,a:0},this._blendFunctionState={srcRGB:1,dstRGB:0,srcAlpha:1,dstAlpha:0},this._blendEquationState={mode:32774,modeAlpha:32774},this._colorMaskState={r:!0,g:!0,b:!0,a:!0},this._polygonCullingEnabled=!1,this._cullFace=1029,this._frontFace=2305,this._scissorTestEnabled=!1,this._scissorRect={x:0,y:0,width:0,height:0},this._depthTestEnabled=!1,this._depthFunction=513,this._clearDepth=1,this._depthWriteEnabled=!0,this._depthRange={zNear:0,zFar:1},this._viewport=null,this._stencilTestEnabled=!1,this._polygonOffsetFillEnabled=!1,this._polygonOffset=[0,0],this._stencilFunction={face:1032,func:519,ref:0,mask:1},this._clearStencil=0,this._stencilWriteMask=1,this._stencilOperation={face:1032,fail:7680,zFail:7680,zPass:7680},this._clearColor={r:0,g:0,b:0,a:0},this._activeShaderProgram=null,this._activeVertexBuffer=null,this._activeIndexBuffer=null,this._activeFramebuffer=null,this._activeRenderbuffer=null,this._activeTextureUnit=0,this._textureUnitMap={},this._numOfDrawCalls=0,this._numOfTriangles=0,this.contextVersion=r.default(t)?"webgl2":"webgl",this.gl=t,t instanceof WebGLRenderingContext&&this.gl.getExtension("OES_element_index_uint"),this._capabilities=o.loadCapabilities(t,e);var n=this.gl.getParameter(this.gl.VIEWPORT);this._viewport={x:n[0],y:n[1],width:n[2],height:n[3]},i("esri-webgl-debug")&&(this.instanceCounter=new a),this._stateTracker=new l.StateTracker({setBlending:function(t){if(t){s.setBlendingEnabled(!0),s.setBlendEquationSeparate(t.opRgb,t.opAlpha),s.setBlendFunctionSeparate(t.srcRgb,t.dstRgb,t.srcAlpha,t.dstAlpha);var e=t.color;s.setBlendColor(e.r,e.g,e.b,e.a)}else s.setBlendingEnabled(!1)},setCulling:function(t){t?(s.setFaceCullingEnabled(!0),s.setCullFace(t.face),s.setFrontFace(t.mode)):s.setFaceCullingEnabled(!1)},setPolygonOffset:function(t){t?(s.setPolygonOffsetFillEnabled(!0),s.setPolygonOffset(t.factor,t.units)):s.setPolygonOffsetFillEnabled(!1)},setDepthTest:function(t){t?(s.setDepthTestEnabled(!0),s.setDepthFunction(t.func)):s.setDepthTestEnabled(!1)},setStencilTest:function(t){if(t){s.setStencilTestEnabled(!0);var e=t.function;s.setStencilFunction(e.func,e.ref,e.mask);var i=t.operation;s.setStencilOp(i.fail,i.zFail,i.zPass)}else s.setStencilTestEnabled(!1)},setDepthWrite:function(t){t?(s.setDepthWriteEnabled(!0),s.setDepthRange(t.zNear,t.zFar)):s.setDepthWriteEnabled(!1)},setColorWrite:function(t){t?s.setColorMask(t.r,t.g,t.b,t.a):s.setColorMask(!1,!1,!1,!1)},setStencilWrite:function(t){t?s.setStencilWriteMask(t.mask):s.setStencilWriteMask(0)}}),this.enforceState()}return Object.defineProperty(t.prototype,"contextAttributes",{get:function(){return this.gl.getContextAttributes()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"parameters",{get:function(){if(!this._parameters){var t=this.capabilities.textureFilterAnisotropic;this._parameters={versionString:this.gl.getParameter(this.gl.VERSION),maxVertexTextureImageUnits:this.gl.getParameter(this.gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxVertexAttributes:this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS),maxMaxAnisotropy:t?this.gl.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY):void 0,maxTextureImageUnits:this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS)}}return this._parameters},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){this.bindVAO(null),this.unbindBuffer(34962),this.unbindBuffer(34963),this._textureUnitMap={},i("esri-webgl-debug")&&this.instanceCounter.printResourceCount(),this.gl=null},t.prototype.setPipelineState=function(t){this._stateTracker.setPipeline(t)},t.prototype.setBlendingEnabled=function(t){this._blendEnabled!==t&&(!0===t?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND),this._blendEnabled=t,this._stateTracker.invalidateBlending())},t.prototype.setBlendColor=function(t,e,i,s){t===this._blendColorState.r&&e===this._blendColorState.g&&i===this._blendColorState.b&&s===this._blendColorState.a||(this.gl.blendColor(t,e,i,s),this._blendColorState.r=t,this._blendColorState.g=e,this._blendColorState.b=i,this._blendColorState.a=s,this._stateTracker.invalidateBlending())},t.prototype.setBlendFunction=function(t,e){t===this._blendFunctionState.srcRGB&&e===this._blendFunctionState.dstRGB||(this.gl.blendFunc(t,e),this._blendFunctionState.srcRGB=t,this._blendFunctionState.srcAlpha=t,this._blendFunctionState.dstRGB=e,this._blendFunctionState.dstAlpha=e,this._stateTracker.invalidateBlending())},t.prototype.setBlendFunctionSeparate=function(t,e,i,s){this._blendFunctionState.srcRGB===t&&this._blendFunctionState.srcAlpha===i&&this._blendFunctionState.dstRGB===e&&this._blendFunctionState.dstAlpha===s||(this.gl.blendFuncSeparate(t,e,i,s),this._blendFunctionState.srcRGB=t,this._blendFunctionState.srcAlpha=i,this._blendFunctionState.dstRGB=e,this._blendFunctionState.dstAlpha=s,this._stateTracker.invalidateBlending())},t.prototype.setBlendEquation=function(t){this._blendEquationState.mode!==t&&(this.gl.blendEquation(t),this._blendEquationState.mode=t,this._blendEquationState.modeAlpha=t,this._stateTracker.invalidateBlending())},t.prototype.setBlendEquationSeparate=function(t,e){this._blendEquationState.mode===t&&this._blendEquationState.modeAlpha===e||(this.gl.blendEquationSeparate(t,e),this._blendEquationState.mode=t,this._blendEquationState.modeAlpha=e,this._stateTracker.invalidateBlending())},t.prototype.setColorMask=function(t,e,i,s){this._colorMaskState.r===t&&this._colorMaskState.g===e&&this._colorMaskState.b===i&&this._colorMaskState.a===s||(this.gl.colorMask(t,e,i,s),this._colorMaskState.r=t,this._colorMaskState.g=e,this._colorMaskState.b=i,this._colorMaskState.a=s,this._stateTracker.invalidateColorWrite())},t.prototype.setClearColor=function(t,e,i,s){this._clearColor.r===t&&this._clearColor.g===e&&this._clearColor.b===i&&this._clearColor.a===s||(this.gl.clearColor(t,e,i,s),this._clearColor.r=t,this._clearColor.g=e,this._clearColor.b=i,this._clearColor.a=s)},t.prototype.setFaceCullingEnabled=function(t){this._polygonCullingEnabled!==t&&(!0===t?this.gl.enable(this.gl.CULL_FACE):this.gl.disable(this.gl.CULL_FACE),this._polygonCullingEnabled=t,this._stateTracker.invalidateCulling())},t.prototype.setPolygonOffsetFillEnabled=function(t){this._polygonOffsetFillEnabled!==t&&(!0===t?this.gl.enable(this.gl.POLYGON_OFFSET_FILL):this.gl.disable(this.gl.POLYGON_OFFSET_FILL),this._polygonOffsetFillEnabled=t,this._stateTracker.invalidatePolygonOffset())},t.prototype.setPolygonOffset=function(t,e){this._polygonOffset[0]===t&&this._polygonOffset[1]===e||(this._polygonOffset[0]=t,this._polygonOffset[1]=e,this.gl.polygonOffset(t,e),this._stateTracker.invalidatePolygonOffset())},t.prototype.setCullFace=function(t){this._cullFace!==t&&(this.gl.cullFace(t),this._cullFace=t,this._stateTracker.invalidateCulling())},t.prototype.setFrontFace=function(t){this._frontFace!==t&&(this.gl.frontFace(t),this._frontFace=t,this._stateTracker.invalidateCulling())},t.prototype.setScissorTestEnabled=function(t){this._scissorTestEnabled!==t&&(!0===t?this.gl.enable(this.gl.SCISSOR_TEST):this.gl.disable(this.gl.SCISSOR_TEST),this._scissorTestEnabled=t)},t.prototype.setScissorRect=function(t,e,i,s){this._scissorRect.x===t&&this._scissorRect.y===e&&this._scissorRect.width===i&&this._scissorRect.height===s||(this.gl.scissor(t,e,i,s),this._scissorRect.x=t,this._scissorRect.y=e,this._scissorRect.width=i,this._scissorRect.height=s)},t.prototype.setDepthTestEnabled=function(t){this._depthTestEnabled!==t&&(!0===t?this.gl.enable(this.gl.DEPTH_TEST):this.gl.disable(this.gl.DEPTH_TEST),this._depthTestEnabled=t,this._stateTracker.invalidateDepthTest())},t.prototype.setClearDepth=function(t){this._clearDepth!==t&&(this.gl.clearDepth(t),this._clearDepth=t)},t.prototype.setDepthFunction=function(t){this._depthFunction!==t&&(this.gl.depthFunc(t),this._depthFunction=t,this._stateTracker.invalidateDepthTest())},t.prototype.setDepthWriteEnabled=function(t){this._depthWriteEnabled!==t&&(this.gl.depthMask(t),this._depthWriteEnabled=t,this._stateTracker.invalidateDepthWrite())},t.prototype.setDepthRange=function(t,e){this._depthRange.zNear===t&&this._depthRange.zFar===e||(this.gl.depthRange(t,e),this._depthRange.zNear=t,this._depthRange.zFar=e,this._stateTracker.invalidateDepthWrite())},t.prototype.setStencilTestEnabled=function(t){this._stencilTestEnabled!==t&&(!0===t?this.gl.enable(this.gl.STENCIL_TEST):this.gl.disable(this.gl.STENCIL_TEST),this._stencilTestEnabled=t,this._stateTracker.invalidateStencilTest())},t.prototype.setClearStencil=function(t){t!==this._clearStencil&&(this.gl.clearStencil(t),this._clearStencil=t)},t.prototype.setStencilFunction=function(t,e,i){this._stencilFunction.func===t&&this._stencilFunction.ref===e&&this._stencilFunction.mask===i||(this.gl.stencilFunc(t,e,i),this._stencilFunction.face=1032,this._stencilFunction.func=t,this._stencilFunction.ref=e,this._stencilFunction.mask=i,this._stateTracker.invalidateStencilTest())},t.prototype.setStencilFunctionSeparate=function(t,e,i,s){this._stencilFunction.face===t&&this._stencilFunction.func===e&&this._stencilFunction.ref===i&&this._stencilFunction.mask===s||(this.gl.stencilFuncSeparate(t,e,i,s),this._stencilFunction.face=t,this._stencilFunction.func=e,this._stencilFunction.ref=i,this._stencilFunction.mask=s,this._stateTracker.invalidateStencilTest())},t.prototype.setStencilWriteMask=function(t){this._stencilWriteMask!==t&&(this.gl.stencilMask(t),this._stencilWriteMask=t,this._stateTracker.invalidateStencilWrite())},t.prototype.setStencilOp=function(t,e,i){this._stencilOperation.fail===t&&this._stencilOperation.zFail===e&&this._stencilOperation.zPass===i||(this.gl.stencilOp(t,e,i),this._stencilOperation.face=1032,this._stencilOperation.fail=t,this._stencilOperation.zFail=e,this._stencilOperation.zPass=i,this._stateTracker.invalidateStencilTest())},t.prototype.setStencilOpSeparate=function(t,e,i,s){this._stencilOperation.face===t&&this._stencilOperation.fail===e&&this._stencilOperation.zFail===i&&this._stencilOperation.zPass===s||(this.gl.stencilOpSeparate(t,e,i,s),this._stencilOperation.face=t,this._stencilOperation.face=t,this._stencilOperation.fail=e,this._stencilOperation.zFail=i,this._stencilOperation.zPass=s,this._stateTracker.invalidateStencilTest())},t.prototype.setActiveTexture=function(t){var e=this._activeTextureUnit;return t>=0&&t!==this._activeTextureUnit&&(this.gl.activeTexture(n.BASE_TEXTURE_UNIT+t),this._activeTextureUnit=t),e},t.prototype.clear=function(t){t&&this.gl.clear(t)},t.prototype.clearSafe=function(t){t&&(16384&t&&this.setColorMask(!0,!0,!0,!0),256&t&&this.setDepthWriteEnabled(!0),1024&t&&this.setStencilWriteMask(255),this.gl.clear(t))},t.prototype.drawArrays=function(t,e,s){i("esri-webgl-debug")&&(this._numOfDrawCalls++,this._numOfTriangles+=h(t,s)),this.gl.drawArrays(t,e,s)},t.prototype.drawElements=function(t,e,s,n){if(i("esri-webgl-debug")&&(this._numOfDrawCalls++,this._numOfTriangles+=h(t,e)),5123===s)return void this.gl.drawElements(t,e,s,n);5125===s&&this.gl.drawElements(t,e,s,n)},t.prototype.logIno=function(){i("esri-webgl-debug")&&console.log("DrawCalls: "+this._numOfDrawCalls+", Triangles: "+this._numOfTriangles)},Object.defineProperty(t.prototype,"capabilities",{get:function(){return this._capabilities},enumerable:!0,configurable:!0}),t.prototype.setViewport=function(t,e,i,s){var n=this._viewport;n.x===t&&n.y===e&&n.width===i&&n.height===s||(n.x=t,n.y=e,n.width=i,n.height=s,this.gl.viewport(t,e,i,s))},t.prototype.getViewport=function(){return{x:this._viewport.x,y:this._viewport.y,width:this._viewport.width,height:this._viewport.height}},t.prototype.bindProgram=function(t){if(!t)return this.gl.useProgram(null),void(this._activeShaderProgram=null);this._activeShaderProgram!==t&&(t.initialize(),this.gl.useProgram(t.glName),this._activeShaderProgram=t)},t.prototype.bindTexture=function(e,i){void 0===i&&(i=0),-1===t._MAX_TEXTURE_IMAGE_UNITS&&(t._MAX_TEXTURE_IMAGE_UNITS=this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS)),(i>=t._MAX_TEXTURE_IMAGE_UNITS||i<0)&&console.error("Input texture unit is out of range of available units!");var s=this._textureUnitMap[i];return this.setActiveTexture(i),null==e||null==e.glName?(null!=s&&(this.gl.bindTexture(s.descriptor.target,null),s.setBoundToUnit(i,!1)),void(this._textureUnitMap[i]=null)):s&&s.id===e.id?void e.applyChanges():(s&&s.setBoundToUnit(i,!1),this.gl.bindTexture(e.descriptor.target,e.glName),e.setBoundToUnit(i,!0),e.applyChanges(),void(this._textureUnitMap[i]=e))},t.prototype.bindFramebuffer=function(t){if(s.isNone(t))return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),void(this._activeFramebuffer=null);this._activeFramebuffer!==t&&(t.initialize()||this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t.glName),this._activeFramebuffer=t)},t.prototype.bindBuffer=function(e){e&&(34962===e.bufferType?this._activeVertexBuffer=t._bindBuffer(this.gl,e,e.bufferType,this._activeVertexBuffer):this._activeIndexBuffer=t._bindBuffer(this.gl,e,e.bufferType,this._activeIndexBuffer))},t.prototype.bindRenderbuffer=function(t){var e=this.gl;t||(e.bindRenderbuffer(e.RENDERBUFFER,null),this._activeRenderbuffer=null),this._activeRenderbuffer!==t&&(e.bindRenderbuffer(e.RENDERBUFFER,t.glName),this._activeRenderbuffer=t)},t.prototype.unbindBuffer=function(e){34962===e?this._activeVertexBuffer=t._bindBuffer(this.gl,null,e,this._activeVertexBuffer):this._activeIndexBuffer=t._bindBuffer(this.gl,null,e,this._activeIndexBuffer)},t.prototype.bindVAO=function(t){if(!t)return void(this._activeVertexArrayObject&&(this._activeVertexArrayObject.unbind(),this._activeVertexArrayObject=null));this._activeVertexArrayObject&&this._activeVertexArrayObject.id===t.id||(t.bind(),this._activeVertexArrayObject=t)},t.prototype.getBoundTexture=function(t){return this._textureUnitMap[t]},t.prototype.getBoundFramebufferObject=function(){return this._activeFramebuffer},t.prototype.getBoundVAO=function(){return this._activeVertexArrayObject},t.prototype.resetState=function(){this.bindProgram(null),this.bindVAO(null),this.bindFramebuffer(null),this.unbindBuffer(34962),this.unbindBuffer(34963);for(var t=0;t<this.parameters.maxTextureImageUnits;t++)this.bindTexture(null,t);this.setBlendingEnabled(!1),this.setBlendFunction(1,0),this.setBlendEquation(32774),this.setBlendColor(0,0,0,0),this.setFaceCullingEnabled(!1),this.setCullFace(1029),this.setFrontFace(2305),this.setPolygonOffsetFillEnabled(!1),this.setPolygonOffset(0,0),this.setScissorTestEnabled(!1),this.setScissorRect(0,0,this.gl.canvas.width,this.gl.canvas.height),this.setDepthTestEnabled(!1),this.setDepthFunction(513),this.setDepthRange(0,1),this.setStencilTestEnabled(!1),this.setStencilFunction(519,0,0),this.setStencilOp(7680,7680,7680),this.setClearColor(0,0,0,0),this.setClearDepth(1),this.setClearStencil(0),this.setColorMask(!0,!0,!0,!0),this.setStencilWriteMask(4294967295),this.setDepthWriteEnabled(!0),this.setViewport(0,0,this.gl.canvas.width,this.gl.canvas.height)},t.prototype.enforceState=function(){var t=this.gl,e=this.capabilities.vao;e&&e.bindVertexArray(null);for(var s=0;s<this.parameters.maxVertexAttributes;s++)t.disableVertexAttribArray(s);if(this._activeVertexBuffer?t.bindBuffer(this._activeVertexBuffer.bufferType,this._activeVertexBuffer.glName):t.bindBuffer(34962,null),this._activeIndexBuffer?t.bindBuffer(this._activeIndexBuffer.bufferType,this._activeIndexBuffer.glName):t.bindBuffer(34963,null),e&&this._activeVertexArrayObject){var a=this._activeVertexArrayObject;this._activeVertexArrayObject&&(this._activeVertexArrayObject.unbind(),this._activeVertexArrayObject=null),this.bindVAO(a)}t.bindFramebuffer(t.FRAMEBUFFER,this._activeFramebuffer?this._activeFramebuffer.glName:null),t.useProgram(this._activeShaderProgram?this._activeShaderProgram.glName:null),t.blendColor(this._blendColorState.r,this._blendColorState.g,this._blendColorState.b,this._blendColorState.a),t.bindRenderbuffer(t.RENDERBUFFER,this._activeRenderbuffer?this._activeRenderbuffer.glName:null),!0===this._blendEnabled?t.enable(this.gl.BLEND):t.disable(this.gl.BLEND),t.blendEquationSeparate(this._blendEquationState.mode,this._blendEquationState.modeAlpha),t.blendFuncSeparate(this._blendFunctionState.srcRGB,this._blendFunctionState.dstRGB,this._blendFunctionState.srcAlpha,this._blendFunctionState.dstAlpha),t.clearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a),t.clearDepth(this._clearDepth),t.clearStencil(this._clearStencil),t.colorMask(this._colorMaskState.r,this._colorMaskState.g,this._colorMaskState.b,this._colorMaskState.a),t.cullFace(this._cullFace),t.depthFunc(this._depthFunction),t.depthRange(this._depthRange.zNear,this._depthRange.zFar),!0===this._depthTestEnabled?t.enable(t.DEPTH_TEST):t.disable(t.DEPTH_TEST),t.depthMask(this._depthWriteEnabled),t.frontFace(this._frontFace),t.lineWidth(1),!0===this._polygonCullingEnabled?t.enable(t.CULL_FACE):t.disable(t.CULL_FACE),t.polygonOffset(this._polygonOffset[0],this._polygonOffset[1]),!0===this._polygonOffsetFillEnabled?t.enable(t.POLYGON_OFFSET_FILL):t.disable(t.POLYGON_OFFSET_FILL),t.scissor(this._scissorRect.x,this._scissorRect.y,this._scissorRect.width,this._scissorRect.height),!0===this._scissorTestEnabled?t.enable(t.SCISSOR_TEST):t.disable(t.SCISSOR_TEST),t.stencilFunc(this._stencilFunction.func,this._stencilFunction.ref,this._stencilFunction.mask),t.stencilOpSeparate(this._stencilOperation.face,this._stencilOperation.fail,this._stencilOperation.zFail,this._stencilOperation.zPass),!0===this._stencilTestEnabled?t.enable(t.STENCIL_TEST):t.disable(t.STENCIL_TEST),t.stencilMask(this._stencilWriteMask);for(var l=0;l<this.parameters.maxTextureImageUnits;l++){t.activeTexture(n.BASE_TEXTURE_UNIT+l),t.bindTexture(3553,null);var r=this._textureUnitMap[l];r&&t.bindTexture(r.descriptor.target,r.glName)}t.activeTexture(n.BASE_TEXTURE_UNIT+this._activeTextureUnit),t.viewport(this._viewport.x,this._viewport.y,this._viewport.width,this._viewport.height),i("esri-webgl-debug")&&(this._numOfDrawCalls=0,this._numOfTriangles=0)},t._bindBuffer=function(t,e,i,s){return e?s===e?s:(t.bindBuffer(i,e.glName),e):(t.bindBuffer(i,null),null)},t._MAX_TEXTURE_IMAGE_UNITS=-1,t}()});