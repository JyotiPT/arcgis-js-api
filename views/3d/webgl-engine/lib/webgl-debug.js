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

/*
     ** Copyright (c) 2012 The Khronos Group Inc.
     **
     ** Permission is hereby granted, free of charge, to any person obtaining a
     ** copy of this software and/or associated documentation files (the
     ** "Materials"), to deal in the Materials without restriction, including
     ** without limitation the rights to use, copy, modify, merge, publish,
     ** distribute, sublicense, and/or sell copies of the Materials, and to
     ** permit persons to whom the Materials are furnished to do so, subject to
     ** the following conditions:
     **
     ** The above copyright notice and this permission notice shall be included
     ** in all copies or substantial portions of the Materials.
     **
     ** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     ** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     ** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
     ** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
     ** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
     ** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
     ** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
     */

define([],function(){function e(e){if(null==g){g={},E={};for(var t in e)"number"==typeof e[t]&&(g[e[t]]=t,E[t]=e[t])}}function t(){if(null==g)throw"WebGLDebugUtils.init(ctx) not called"}function r(e){return t(),void 0!==g[e]}function n(e){t();var r=g[e];return void 0!==r?"gl."+r:"/*UNKNOWN WebGL ENUM*/ 0x"+e.toString(16)}function o(e,t,r,o){var a=d[e];if(void 0!==a){var a=a[t];if(void 0!==a&&a[r]){if("object"==typeof a[r]&&void 0!==a[r].enumBitwiseOr){for(var i=a[r].enumBitwiseOr,u=0,f=[],c=0;c<i.length;++c){var l=E[i[c]];0!=(o&l)&&(u|=l,f.push(n(l)))}return u===o?f.join(" | "):n(o)}return n(o)}}return null===o?"null":void 0===o?"undefined":o.toString()}function a(e,t){for(var r="",n=t.length,a=0;a<n;++a)r+=(0==a?"":", ")+o(e,n,a,t[a]);return r}function i(e,t,r){e.__defineGetter__(r,function(){return t[r]}),e.__defineSetter__(r,function(e){t[r]=e})}function u(t,r,a,f){function c(e,t){return function(){a&&a(t,arguments);var n=e[t].apply(e,arguments),o=f.getError();return 0!=o&&(l[o]=!0,r(o,t,arguments)),n}}f=f||t,e(t),r=r||function(e,t,r){for(var a="",i=r.length,u=0;u<i;++u)a+=(0==u?"":", ")+o(t,i,u,r[u]);s("WebGL error "+n(e)+" in "+t+"("+a+")")};var l={},d={};for(var g in t)if("function"==typeof t[g])if("getExtension"!=g)d[g]=c(t,g);else{var E=c(t,g);d[g]=function(){return u(E.apply(t,arguments),r,a,f)}}else i(d,t,g);return d.getError=function(){for(var e in l)if(l.hasOwnProperty(e)&&l[e])return l[e]=!1,e;return t.NO_ERROR},d}function f(e){var t=e.getParameter(e.MAX_VERTEX_ATTRIBS),r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r);for(var n=0;n<t;++n)e.disableVertexAttribArray(n),e.vertexAttribPointer(n,4,e.FLOAT,!1,0,0),e.vertexAttrib1f(n,0);e.deleteBuffer(r);for(var o=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),n=0;n<o;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_CUBE_MAP,null),e.bindTexture(e.TEXTURE_2D,null);for(e.activeTexture(e.TEXTURE0),e.useProgram(null),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindRenderbuffer(e.RENDERBUFFER,null),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.DITHER),e.disable(e.SCISSOR_TEST),e.blendColor(0,0,0,0),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(-1),e.colorMask(!0,!0,!0,!0),e.cullFace(e.BACK),e.depthFunc(e.LESS),e.depthMask(!0),e.depthRange(0,1),e.frontFace(e.CCW),e.hint(e.GENERATE_MIPMAP_HINT,e.DONT_CARE),e.lineWidth(1),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.UNPACK_COLORSPACE_CONVERSION_WEBGL&&e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.polygonOffset(0,0),e.sampleCoverage(1,!1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilMask(4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT|e.STENCIL_BUFFER_BIT);e.getError(););}function c(e){function t(e){return"function"==typeof e?e:function(t){e.handleEvent(t)}}function r(){for(var e=Object.keys(R),t=0;t<e.length;++t)delete R[e]}function n(){++v,b||T==v&&e.loseContext()}function o(e,t){var r=e[t];return function(){if(n(),!b){return r.apply(e,arguments)}}}function a(){for(var e=0;e<m.length;++e){var t=m[e];t instanceof WebGLBuffer?l.deleteBuffer(t):t instanceof WebGLFramebuffer?l.deleteFramebuffer(t):t instanceof WebGLProgram?l.deleteProgram(t):t instanceof WebGLRenderbuffer?l.deleteRenderbuffer(t):t instanceof WebGLShader?l.deleteShader(t):t instanceof WebGLTexture&&l.deleteTexture(t)}}function u(e){return{statusMessage:e,preventDefault:function(){_=!0}}}function c(e){for(var t in e)"function"==typeof e[t]?s[t]=o(e,t):i(s,e,t);s.getError=function(){if(n(),!b)for(var e;e=l.getError();)R[e]=!0;for(var e in R)if(R[e])return delete R[e],e;return s.NO_ERROR};for(var r=["createBuffer","createFramebuffer","createProgram","createRenderbuffer","createShader","createTexture"],a=0;a<r.length;++a){var u=r[a];s[u]=function(t){return function(){if(n(),b)return null;var r=t.apply(e,arguments);return r.__webglDebugContextLostId__=E,m.push(r),r}}(e[u])}for(var f=["getActiveAttrib","getActiveUniform","getBufferParameter","getContextAttributes","getAttachedShaders","getFramebufferAttachmentParameter","getParameter","getProgramParameter","getProgramInfoLog","getRenderbufferParameter","getShaderParameter","getShaderInfoLog","getShaderSource","getTexParameter","getUniform","getUniformLocation","getVertexAttrib"],a=0;a<f.length;++a){var u=f[a];s[u]=function(t){return function(){return n(),b?null:t.apply(e,arguments)}}(s[u])}for(var c=["isBuffer","isEnabled","isFramebuffer","isProgram","isRenderbuffer","isShader","isTexture"],a=0;a<c.length;++a){var u=c[a];s[u]=function(t){return function(){return n(),!b&&t.apply(e,arguments)}}(s[u])}return s.checkFramebufferStatus=function(t){return function(){return n(),b?s.FRAMEBUFFER_UNSUPPORTED:t.apply(e,arguments)}}(s.checkFramebufferStatus),s.getAttribLocation=function(t){return function(){return n(),b?-1:t.apply(e,arguments)}}(s.getAttribLocation),s.getVertexAttribOffset=function(t){return function(){return n(),b?0:t.apply(e,arguments)}}(s.getVertexAttribOffset),s.isContextLost=function(){return b},s}var l,s,d=[],g=[],s={},E=1,b=!1,m=[],T=0,v=0,_=!1,p=0,R={};e.getContext=function(t){return function(){var r=t.apply(e,arguments);if(r instanceof WebGLRenderingContext){if(r!=l){if(l)throw"got different context";l=r,s=c(l)}return s}return r}}(e.getContext);var A=function(e){d.push(t(e))},S=function(e){g.push(t(e))};return function(e){var t=e.addEventListener;e.addEventListener=function(r,n,o){switch(r){case"webglcontextlost":A(n);break;case"webglcontextrestored":S(n);break;default:t.apply(e,arguments)}}}(e),e.loseContext=function(){if(!b){for(b=!0,T=0,++E;l.getError(););r(),R[l.CONTEXT_LOST_WEBGL]=!0;var t=u("context lost"),n=d.slice();setTimeout(function(){for(var r=0;r<n.length;++r)n[r](t);p>=0&&setTimeout(function(){e.restoreContext()},p)},0)}},e.restoreContext=function(){b&&g.length&&setTimeout(function(){if(!_)throw"can not restore. webglcontestlost listener did not call event.preventDefault";a(),f(l),b=!1,v=0,_=!1;for(var e=g.slice(),t=u("context restored"),r=0;r<e.length;++r)e[r](t)},0)},e.loseContextInNCalls=function(e){if(b)throw"You can not ask a lost contet to be lost";T=v+e},e.getNumCalls=function(){return v},e.setRestoreTimeout=function(e){p=e},e}var l=function(e){window.console&&window.console.log&&window.console.log(e)},s=function(e){window.console&&window.console.error?window.console.error(e):l(e)},d={enable:{1:{0:!0}},disable:{1:{0:!0}},getParameter:{1:{0:!0}},drawArrays:{3:{0:!0}},drawElements:{4:{0:!0,2:!0}},createShader:{1:{0:!0}},getShaderParameter:{2:{1:!0}},getProgramParameter:{2:{1:!0}},getShaderPrecisionFormat:{2:{0:!0,1:!0}},getVertexAttrib:{2:{1:!0}},vertexAttribPointer:{6:{2:!0}},bindTexture:{2:{0:!0}},activeTexture:{1:{0:!0}},getTexParameter:{2:{0:!0,1:!0}},texParameterf:{3:{0:!0,1:!0}},texParameteri:{3:{0:!0,1:!0,2:!0}},texImage2D:{9:{0:!0,2:!0,6:!0,7:!0},6:{0:!0,2:!0,3:!0,4:!0}},texSubImage2D:{9:{0:!0,6:!0,7:!0},7:{0:!0,4:!0,5:!0}},copyTexImage2D:{8:{0:!0,2:!0}},copyTexSubImage2D:{8:{0:!0}},generateMipmap:{1:{0:!0}},compressedTexImage2D:{7:{0:!0,2:!0}},compressedTexSubImage2D:{8:{0:!0,6:!0}},bindBuffer:{2:{0:!0}},bufferData:{3:{0:!0,2:!0}},bufferSubData:{3:{0:!0}},getBufferParameter:{2:{0:!0,1:!0}},pixelStorei:{2:{0:!0,1:!0}},readPixels:{7:{4:!0,5:!0}},bindRenderbuffer:{2:{0:!0}},bindFramebuffer:{2:{0:!0}},checkFramebufferStatus:{1:{0:!0}},framebufferRenderbuffer:{4:{0:!0,1:!0,2:!0}},framebufferTexture2D:{5:{0:!0,1:!0,2:!0}},getFramebufferAttachmentParameter:{3:{0:!0,1:!0,2:!0}},getRenderbufferParameter:{2:{0:!0,1:!0}},renderbufferStorage:{4:{0:!0,1:!0}},clear:{1:{0:{enumBitwiseOr:["COLOR_BUFFER_BIT","DEPTH_BUFFER_BIT","STENCIL_BUFFER_BIT"]}}},depthFunc:{1:{0:!0}},blendFunc:{2:{0:!0,1:!0}},blendFuncSeparate:{4:{0:!0,1:!0,2:!0,3:!0}},blendEquation:{1:{0:!0}},blendEquationSeparate:{2:{0:!0,1:!0}},stencilFunc:{3:{0:!0}},stencilFuncSeparate:{4:{0:!0,1:!0}},stencilMaskSeparate:{2:{0:!0}},stencilOp:{3:{0:!0,1:!0,2:!0}},stencilOpSeparate:{4:{0:!0,1:!0,2:!0,3:!0}},cullFace:{1:{0:!0}},frontFace:{1:{0:!0}},drawArraysInstancedANGLE:{4:{0:!0}},drawElementsInstancedANGLE:{5:{0:!0,2:!0}},blendEquationEXT:{1:{0:!0}}},g=null,E=null;return{init:e,mightBeEnum:r,glEnumToString:n,glFunctionArgToString:o,glFunctionArgsToString:a,makeDebugContext:u,makeLostContextSimulatingCanvas:c,resetToInitialState:f}});