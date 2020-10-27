// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../../core/maybe","../../../webgl","./decluttering/config","./decluttering/util"],(function(e,t,r,i,n,o,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CircleRenderBucket=t.SymbolRenderBucket=t.FillRenderBucket=t.LineRenderBucket=t.RenderBucketBase=void 0;var f=function(){function e(e){this.layerIndices=[],this.isDestroyed=!1,this.data=e,this.memoryUsed=e.byteLength;var t=1,r=new Uint32Array(e);this.layerIndices=[];for(var i=r[t++],n=0;n<i;n++)this.layerIndices[n]=r[t++];this.bufferDataOffset=t}return Object.defineProperty(e.prototype,"isPreparedForRendering",{get:function(){return i.isNone(this.data)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"offset",{get:function(){return this.bufferDataOffset},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this.isDestroyed||(this.doDestroy(),this.isDestroyed=!0)},e.prototype.prepareForRendering=function(e,t){i.isNone(this.data)||(this.doPrepareForRendering(e,t,this.data,this.bufferDataOffset),this.data=null)},e}();t.RenderBucketBase=f;var a=function(e){function t(t){var r=e.call(this,t)||this;r.type=2,r.lineIndexStart=0,r.lineIndexCount=0;var i=r.bufferDataOffset,n=new Uint32Array(t);return r.lineIndexStart=n[i++],r.lineIndexCount=n[i++],r.isLineDataDriven=!!n[i++],r.bufferDataOffset=i,r}return r.__extends(t,e),t.prototype.hasData=function(){return this.lineIndexCount>0},t.prototype.triangleCount=function(){return this.lineIndexCount/3},t.prototype.doDestroy=function(){i.isSome(this.lineVertexArrayObject)&&this.lineVertexArrayObject.dispose(),i.isSome(this.lineVertexBuffer)&&this.lineVertexBuffer.dispose(),i.isSome(this.lineIndexBuffer)&&this.lineIndexBuffer.dispose(),this.lineVertexArrayObject=null,this.lineVertexBuffer=null,this.lineIndexBuffer=null,this.memoryUsed=0},t.prototype.doPrepareForRendering=function(e,r,i,o){var s=new Uint32Array(i),f=new Int32Array(s.buffer),a=s[o++];this.lineVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(f.buffer,4*o,a)),o+=a;var u=s[o++];this.lineIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(s.buffer,4*o,u)),o+=u,this.lineVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(3),this.isLineDataDriven?t.lineVertexAttributesDD:t.lineVertexAttributes,{geometry:this.lineVertexBuffer},this.lineIndexBuffer)},t.lineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5123,offset:8,stride:12,normalized:!1,divisor:0}]},t.lineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:20,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5122,offset:8,stride:20,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:20,normalized:!0,divisor:0},{name:"a_width",count:1,type:5126,offset:16,stride:20,normalized:!1,divisor:0}]},t}(f);t.LineRenderBucket=a;var u=function(e){function t(t){var r=e.call(this,t)||this;r.type=1,r.fillIndexStart=0,r.fillIndexCount=0,r.outlineIndexStart=0,r.outlineIndexCount=0;var i=r.bufferDataOffset,n=new Uint32Array(t);return r.fillIndexStart=n[i++],r.fillIndexCount=n[i++],r.outlineIndexStart=n[i++],r.outlineIndexCount=n[i++],r.isFillDataDriven=!!n[i++],r.isOutlineDataDriven=!!n[i++],r.bufferDataOffset=i,r}return r.__extends(t,e),t.prototype.hasData=function(){return this.fillIndexCount>0||this.outlineIndexCount>0},t.prototype.triangleCount=function(){return(this.fillIndexCount+this.outlineIndexCount)/3},t.prototype.doDestroy=function(){i.isSome(this.fillVertexArrayObject)&&this.fillVertexArrayObject.dispose(),i.isSome(this.fillVertexBuffer)&&this.fillVertexBuffer.dispose(),i.isSome(this.fillIndexBuffer)&&this.fillIndexBuffer.dispose(),this.fillVertexArrayObject=null,this.fillVertexBuffer=null,this.fillIndexBuffer=null,i.isSome(this.outlineVertexArrayObject)&&this.outlineVertexArrayObject.dispose(),i.isSome(this.outlineVertexBuffer)&&this.outlineVertexBuffer.dispose(),i.isSome(this.outlineIndexBuffer)&&this.outlineIndexBuffer.dispose(),this.outlineVertexArrayObject=null,this.outlineVertexBuffer=null,this.outlineIndexBuffer=null,this.memoryUsed=0},t.prototype.doPrepareForRendering=function(e,r,i,o){var s=new Uint32Array(i),f=new Int32Array(s.buffer),a=s[o++];this.fillVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(f.buffer,4*o,a)),o+=a;var u=s[o++];this.fillIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(s.buffer,4*o,u)),o+=u;var c=s[o++];this.outlineVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(f.buffer,4*o,c)),o+=c;var l=s[o++];this.outlineIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(s.buffer,4*o,l)),o+=l,this.fillVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(1),this.isFillDataDriven?t.fillVertexAttributesDD:t.fillVertexAttributes,{geometry:this.fillVertexBuffer},this.fillIndexBuffer),this.outlineVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(2),this.isOutlineDataDriven?t.outlineVertexAttributesDD:t.outlineVertexAttributes,{geometry:this.outlineVertexBuffer},this.outlineIndexBuffer)},t.fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},t.fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]},t.outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},t.outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},t}(f);t.FillRenderBucket=u;var c=function(e){function t(t){var r=e.call(this,t)||this;r.type=3,r.iconPerPageElementsMap=new Map,r.glyphPerPageElementsMap=new Map,r.symbolInstances=[],r.isIconSDF=!1,r.opacityChanged=!1,r.lastOpacityUpdate=0,r.symbols=[];var i=r.bufferDataOffset,n=new Uint32Array(t),f=new Int32Array(t),a=new Float32Array(t);r.isIconSDF=!!n[i++],r.isIconDataDriven=!!n[i++],r.isTextDataDriven=!!n[i++];for(var u=n[i++],c=0;c<u;c++){var l=n[i++],d=n[i++],y=n[i++];r.iconPerPageElementsMap.set(l,[d,y])}var x=n[i++];for(c=0;c<x;c++){l=n[i++],d=n[i++],y=n[i++];r.glyphPerPageElementsMap.set(l,[d,y])}var p=n[i++],h=n[i++];if(r.iconOpacity=new Int32Array(p),r.textOpacity=new Int32Array(h),!o.DECLUTTER_TILES){for(c=0;c<p;c++)r.iconOpacity[c]=-1;for(c=0;c<h;c++)r.textOpacity[c]=-1;r.opacityChanged=!0}return i=s.deserializeSymbols(n,f,a,i,r.symbols),r.bufferDataOffset=i,r}return r.__extends(t,e),t.prototype.hasData=function(){return this.iconPerPageElementsMap.size>0||this.glyphPerPageElementsMap.size>0},t.prototype.triangleCount=function(){var e=0;return this.iconPerPageElementsMap.forEach((function(t){e+=t[1]})),this.glyphPerPageElementsMap.forEach((function(t){e+=t[1]})),e/3},t.prototype.doDestroy=function(){i.isSome(this.iconVertexArrayObject)&&this.iconVertexArrayObject.dispose(),i.isSome(this.iconVertexBuffer)&&this.iconVertexBuffer.dispose(),i.isSome(this.iconOpacityBuffer)&&this.iconOpacityBuffer.dispose(),i.isSome(this.iconIndexBuffer)&&this.iconIndexBuffer.dispose(),this.iconVertexArrayObject=null,this.iconVertexBuffer=null,this.iconOpacityBuffer=null,this.iconIndexBuffer=null,i.isSome(this.textVertexArrayObject)&&this.textVertexArrayObject.dispose(),i.isSome(this.textVertexBuffer)&&this.textVertexBuffer.dispose(),i.isSome(this.textOpacityBuffer)&&this.textOpacityBuffer.dispose(),i.isSome(this.textIndexBuffer)&&this.textIndexBuffer.dispose(),this.textVertexArrayObject=null,this.textVertexBuffer=null,this.textOpacityBuffer=null,this.textIndexBuffer=null,this.memoryUsed=0},t.prototype.updateOpacityInfo=function(){if(this.opacityChanged){this.opacityChanged=!1;var e=i.unwrap(this.iconOpacity),t=i.unwrap(this.iconOpacityBuffer);e.length>0&&e.byteLength===t.size&&t.setSubData(e);var r=i.unwrap(this.textOpacity),n=i.unwrap(this.textOpacityBuffer);r.length>0&&r.byteLength===n.size&&n.setSubData(r)}},t.prototype.doPrepareForRendering=function(e,r,o,s){var f=new Uint32Array(o),a=new Int32Array(f.buffer),u=f[s++];this.iconVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(a.buffer,4*s,u)),s+=u;var c=f[s++];this.iconIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(f.buffer,4*s,c)),s+=c;var l=f[s++];this.textVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(a.buffer,4*s,l)),s+=l;var d=f[s++];this.textIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(f.buffer,4*s,d)),s+=d,this.iconOpacityBuffer=n.BufferObject.createVertex(e,35044,i.unwrap(this.iconOpacity).buffer),this.textOpacityBuffer=n.BufferObject.createVertex(e,35044,i.unwrap(this.textOpacity).buffer),this.iconVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(4),this.isIconDataDriven?t.vertexAttributesDD:t.vertexAttributes,{geometry:this.iconVertexBuffer,opacity:this.iconOpacityBuffer},this.iconIndexBuffer),this.textVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(6),this.isTextDataDriven?t.vertexAttributesDD:t.vertexAttributes,{geometry:this.textVertexBuffer,opacity:this.textOpacityBuffer},this.textIndexBuffer)},t.vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_texAngleRange",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}],opacity:[{name:"a_opacityInfo",count:1,type:5121,offset:0,stride:1,normalized:!1,divisor:0}]},t.vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_texAngleRange",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}],opacity:[{name:"a_opacityInfo",count:1,type:5121,offset:0,stride:1,normalized:!1,divisor:0}]},t}(f);t.SymbolRenderBucket=c;var l=function(e){function t(t){var r=e.call(this,t)||this;r.type=4,r.circleIndexStart=0,r.circleIndexCount=0;var i=r.bufferDataOffset,n=new Uint32Array(t);return r.circleIndexStart=n[i++],r.circleIndexCount=n[i++],r.bufferDataOffset=i,r}return r.__extends(t,e),t.prototype.hasData=function(){return this.circleIndexCount>0},t.prototype.triangleCount=function(){return this.circleIndexCount/3},t.prototype.doDestroy=function(){i.isSome(this.circleVertexArrayObject)&&this.circleVertexArrayObject.dispose(),i.isSome(this.circleVertexBuffer)&&this.circleVertexBuffer.dispose(),i.isSome(this.circleIndexBuffer)&&this.circleIndexBuffer.dispose(),this.circleVertexArrayObject=null,this.circleVertexBuffer=null,this.circleIndexBuffer=null,this.memoryUsed=0},t.prototype.doPrepareForRendering=function(e,r,i,o){var s=new Uint32Array(i),f=new Int32Array(s.buffer),a=s[o++];this.circleVertexBuffer=n.BufferObject.createVertex(e,35044,new Int32Array(f.buffer,4*o,a)),o+=a;var u=s[o++];this.circleIndexBuffer=n.BufferObject.createIndex(e,35044,new Uint32Array(s.buffer,4*o,u)),o+=u,this.circleVertexArrayObject=new n.VertexArrayObject(e,r.getProgramAttributes(5),t.circleVertexAttributes,{geometry:this.circleVertexBuffer},this.circleIndexBuffer)},t.circleVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:16,normalized:!0,divisor:0},{name:"a_stroke_color",count:4,type:5121,offset:8,stride:16,normalized:!0,divisor:0},{name:"a_data",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},t}(f);t.CircleRenderBucket=l}));