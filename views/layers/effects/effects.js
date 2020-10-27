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

define(["require","exports","tslib","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f32"],(function(t,o,r,e,i){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.OpacityEffect=o.HueRotateEffect=o.DropShadowEffect=o.ColorMatrixEffect=o.sepia=o.grayscale=o.BlurEffect=o.BloomEffect=void 0;var a=function(){function t(t,o,r){this.strength=t,this.radius=o,this.threshold=r,this.type="bloom"}return t.prototype.interpolate=function(t,o,r){this.strength=f(t.strength,o.strength,r),this.radius=f(t.radius,o.radius,r),this.threshold=f(t.threshold,o.threshold,r)},t.prototype.clone=function(){return new t(this.strength,this.radius,this.threshold)},t}();o.BloomEffect=a;var n=function(){function t(t,o){this.type=t,this.radius=o}return t.prototype.interpolate=function(t,o,r){this.radius=Math.round(f(t.radius,o.radius,r))},t.prototype.clone=function(){return new t(this.type,this.radius)},t}();o.BlurEffect=n,o.grayscale=function(t,o){var r=1-o,i=e.mat4.set(t,.2126+.7874*r,.7152-.7152*r,.0722-.0722*r,0,.2126-.2126*r,.7152+.2848*r,.0722-.0722*r,0,.2126-.2126*r,.7152-.7152*r,.0722+.9278*r,0,0,0,0,1);return e.mat4.transpose(i,i)},o.sepia=function(t,o){var r=1-o,i=e.mat4.set(t,.393+.607*r,.769-.769*r,.189-.189*r,0,.349-.349*r,.686+.314*r,.168-.168*r,0,.272-.272*r,.534-.534*r,.131+.869*r,0,0,0,0,1);return e.mat4.transpose(i,i)};var s=function(){function t(t,o){this.type=t,this.amount=o,"invert"!==this.type&&"grayscale"!==this.type&&"sepia"!==this.type||(this.amount=Math.min(this.amount,1))}return Object.defineProperty(t.prototype,"colorMatrix",{get:function(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix},enumerable:!1,configurable:!0}),t.prototype.interpolate=function(t,o,r){this.amount=f(t.amount,o.amount,r),this._updateMatrix()},t.prototype.clone=function(){return new t(this.type,this.amount)},t.prototype._updateMatrix=function(){var t,r,a,n=this._colorMatrix||i.mat4f32.create();switch(this.type){case"brightness":this._colorMatrix=(t=n,r=this.amount,a=e.mat4.set(t,r,0,0,0,0,r,0,0,0,0,r,0,0,0,0,1),e.mat4.transpose(a,a));break;case"contrast":this._colorMatrix=function(t,o){var r=e.mat4.set(t,o,0,0,.5-.5*o,0,o,0,.5-.5*o,0,0,o,.5-.5*o,0,0,0,1);return e.mat4.transpose(r,r)}(n,this.amount);break;case"grayscale":this._colorMatrix=o.grayscale(n,this.amount);break;case"invert":this._colorMatrix=function(t,o){var r=1-2*o,i=o,a=e.mat4.set(t,r,0,0,i,0,r,0,i,0,0,r,i,0,0,0,1);return e.mat4.transpose(a,a)}(n,this.amount);break;case"saturate":this._colorMatrix=function(t,o){var r=o,i=e.mat4.set(t,.213+.787*r,.715-.715*r,.072-.072*r,0,.213-.213*r,.715+.285*r,.072-.072*r,0,.213-.213*r,.715-.715*r,.072+.928*r,0,0,0,0,1);return e.mat4.transpose(i,i)}(n,this.amount);break;case"sepia":this._colorMatrix=o.sepia(n,this.amount)}},t}();o.ColorMatrixEffect=s;var u=function(){function t(t,o,r,e){this.offsetX=t,this.offsetY=o,this.blurRadius=r,this.color=e,this.type="drop-shadow"}return t.prototype.interpolate=function(t,o,r){this.offsetX=f(t.offsetX,o.offsetX,r),this.offsetY=f(t.offsetY,o.offsetY,r),this.blurRadius=f(t.blurRadius,o.blurRadius,r),this.color[0]=Math.round(f(t.color[0],o.color[0],r)),this.color[1]=Math.round(f(t.color[1],o.color[1],r)),this.color[2]=Math.round(f(t.color[2],o.color[2],r)),this.color[3]=f(t.color[3],o.color[3],r)},t.prototype.clone=function(){return new t(this.offsetX,this.offsetY,this.blurRadius,r.__spreadArrays(this.color))},t}();o.DropShadowEffect=u;var c=function(){function t(t){this.angle=t,this.type="hue-rotate"}return Object.defineProperty(t.prototype,"colorMatrix",{get:function(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix},enumerable:!1,configurable:!0}),t.prototype.interpolate=function(t,o,r){this.angle=f(t.angle,o.angle,r),this._updateMatrix()},t.prototype.clone=function(){return new t(this.angle)},t.prototype._updateMatrix=function(){var t,o,r,a,n,s=this._colorMatrix||i.mat4f32.create();this._colorMatrix=(t=s,o=this.angle,r=Math.sin(o*Math.PI/180),a=Math.cos(o*Math.PI/180),n=e.mat4.set(t,.213+.787*a-.213*r,.715-.715*a-.715*r,.072-.072*a+.928*r,0,.213-.213*a+.143*r,.715+.285*a+.14*r,.072-.072*a-.283*r,0,.213-.213*a-.787*r,.715-.715*a+.715*r,.072+.928*a+.072*r,0,0,0,0,1),e.mat4.transpose(n,n))},t}();o.HueRotateEffect=c;var h=function(){function t(t){this.amount=t,this.type="opacity",this.amount=Math.min(this.amount,1)}return t.prototype.interpolate=function(t,o,r){this.amount=f(t.amount,o.amount,r)},t.prototype.clone=function(){return new t(this.amount)},t}();function f(t,o,r){return t+(o-t)*r}o.OpacityEffect=h}));