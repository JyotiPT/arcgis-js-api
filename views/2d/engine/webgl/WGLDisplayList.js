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

define(["require","exports","../../../../core/tsSupport/generatorHelper","../../../../core/Logger","./enums"],function(e,t,r,n,u){var i=n.getLogger("esri.views.2d.engine.webgl.WGLDisplayList");function p(e,t,r){for(var n=[],o=3;o<arguments.length;o++)n[o-3]=arguments[o];t<e.length?e.splice.apply(e,[t,r].concat(n)):e.push.apply(e,n)}var o=new Map;o.set(u.WGLDrawPhase.MAP,[u.WGLGeometryType.FILL,u.WGLGeometryType.LINE,u.WGLGeometryType.MARKER,u.WGLGeometryType.TEXT]),o.set(u.WGLDrawPhase.LABEL,[u.WGLGeometryType.LABEL]),o.set(u.WGLDrawPhase.LABEL_ALPHA,[u.WGLGeometryType.LABEL]);var l=function(){function o(e){void 0===e&&(e=!1),this.symbolLevels=[],this.unified=e}return o.prototype.replay=function(e,t,r){if(this.unified)for(var n=0,o=this.symbolLevels;n<o.length;n++)for(var i=0,l=o[n].zLevels;i<l.length;i++){var y=l[i].geometryDPInfo;for(var s in y)if(y[s])for(var m=0,u=y[s];m<u.length;m++){var a=u[m],f=e.painter.getGeometryBrush(a.geometryType),p=t.getGeometry(a.geometryType);f.prepareState(e,t),f.drawGeometry(e,t,a,p,r)}}},Object.defineProperty(o.prototype,"empty",{get:function(){return!this.symbolLevels||0===this.symbolLevels.length},enumerable:!0,configurable:!0}),o.prototype.clear=function(){this.symbolLevels.length=0},o.prototype.addToList=function(e,t){if(Array.isArray(e))for(var r=0,n=e;r<n.length;r++){var o=n[r];this._addToList(o,t)}else this._addToList(e,t)},o.prototype.removeFromList=function(e){Array.isArray(e)||(e=[e]);for(var t=null,r=0,n=e;r<n.length;r++){var o=n[r];t=this._removeFromList(o)}return t},o.prototype.byType=function(e,t){for(var r=0,n=this.symbolLevels;r<n.length;r++)for(var o=0,i=n[r].zLevels;o<i.length;o++){var l=i[o].geometryDPInfo,y=this.getDPInfoType(e);if(l[y])for(var s=0,m=l[y];s<m.length;s++){t(m[s])}}},o.prototype.clone=function(){for(var e=new o(this.unified),t=0,r=this.symbolLevels;t<r.length;t++){var n=r[t];e.symbolLevels.push(n.clone())}return e},o.prototype.splitAfter=function(e){for(var t=this._getDisplayList(e.symbolLevel,e.zOrder,e.geometryType),r=t.length,n=e.indexFrom+e.indexCount,o=0;o<r;++o){var i=t[o];if(i.geometryType===e.geometryType&&n>i.indexFrom&&n<=i.indexFrom+i.indexCount){if(n<i.indexFrom+i.indexCount){var l=new d;l.geometryType=i.geometryType,l.materialKey=i.materialKey,l.indexFrom=n,l.indexCount=i.indexFrom+i.indexCount-n,t.splice(o+1,0,l),i.indexCount=n-i.indexFrom}return o}}},o.prototype._addToList=function(e,t){var r=e.symbolLevel,n=e.zOrder,o=this._getDisplayList(r,n,e.geometryType),i=null!=t?t:o.length-1,l=0<=i&&i<o.length?o[i]:null;if(null===l||l.materialKey!==e.materialKey||l.indexFrom+l.indexCount!==e.indexFrom||this.unified&&l.geometryType!==e.geometryType){var y=new d;y.indexFrom=e.indexFrom,y.indexCount=e.indexCount,y.materialKey=e.materialKey,y.geometryType=e.geometryType,p(o,i+1,0,y)}else l.indexCount+=e.indexCount},o.prototype._removeFromList=function(e){for(var t=e.symbolLevel,r=e.zOrder,n=this._getDisplayList(t,r,e.geometryType),o=n.length,i=void 0,l=0;l<o;++l){var y=n[l];if(e.indexFrom+e.indexCount>y.indexFrom&&e.indexFrom<y.indexFrom+y.indexCount&&(!this.unified||y.geometryType===e.geometryType)){i=l;break}}if(void 0===i)return null;y=n[i];if(e.indexFrom===y.indexFrom)return y.indexCount-=e.indexCount,y.indexFrom+=e.indexCount,0===y.indexCount&&p(n,i,1),i-1;if(e.indexFrom+e.indexCount===y.indexFrom+y.indexCount)return y.indexCount-=e.indexCount,0===y.indexCount?(p(n,i,1),i-1):i;var s=y.indexFrom,m=e.indexFrom-y.indexFrom,u=e.indexCount,a=y.indexFrom+y.indexCount-(e.indexFrom+e.indexCount);y.indexCount=m;var f=new d;return f.geometryType=y.geometryType,f.materialKey=y.materialKey,f.indexFrom=s+m+u,f.indexCount=a,p(n,i+1,0,f),i},o.prototype._getDisplayList=function(e,t,r){for(var n,o,i=this.symbolLevels.length,l=0;l<i;l++)if(this.symbolLevels[l].symbolLevel===e){n=this.symbolLevels[l];break}n||((n=new L).symbolLevel=e,this.symbolLevels.push(n));for(var y,s=n.zLevels.length,m=0;m<s;m++)if(n.zLevels[m].zLevel===t){o=n.zLevels[m];break}if(o||((o=new f).geometryDPInfo=new a,o.zLevel=t,n.zLevels.push(o)),this.unified)o.geometryDPInfo.unified||(o.geometryDPInfo.unified=[]),y=o.geometryDPInfo.unified;else switch(r){case u.WGLGeometryType.FILL:o.geometryDPInfo.fill||(o.geometryDPInfo.fill=[]),y=o.geometryDPInfo.fill;break;case u.WGLGeometryType.LINE:o.geometryDPInfo.line||(o.geometryDPInfo.line=[]),y=o.geometryDPInfo.line;break;case u.WGLGeometryType.MARKER:o.geometryDPInfo.marker||(o.geometryDPInfo.marker=[]),y=o.geometryDPInfo.marker;break;case u.WGLGeometryType.TEXT:o.geometryDPInfo.text||(o.geometryDPInfo.text=[]),y=o.geometryDPInfo.text;break;case u.WGLGeometryType.LABEL:o.geometryDPInfo.label||(o.geometryDPInfo.label=[]),y=o.geometryDPInfo.label;break;default:console.error("Trying to add a record with geometry type '"+r+"'.")}return y},o.prototype.getDPInfoType=function(e){if(this.unified)return"unified";switch(e){case u.WGLGeometryType.FILL:return"fill";case u.WGLGeometryType.LINE:return"line";case u.WGLGeometryType.MARKER:return"marker";case u.WGLGeometryType.TEXT:return"text";case u.WGLGeometryType.LABEL:return"label";default:return void i.error("DisplayList: Tried to convert unknown geometryType: "+e)}},o}(),d=function(){function t(){this.materialKey=null,this.indexFrom=0,this.indexCount=0}return t.prototype.clone=function(){var e=new t;return e.geometryType=this.geometryType,e.materialKey=this.materialKey,e.indexFrom=this.indexFrom,e.indexCount=this.indexCount,e},t}(),a=function(){function t(){this.fill=null,this.line=null,this.marker=null,this.text=null,this.label=null,this.unified=null}return t.prototype.clone=function(){var e=new t;return e.fill=this.fill&&this.fill.map(function(e){return e.clone()}),e.line=this.line&&this.line.map(function(e){return e.clone()}),e.marker=this.marker&&this.marker.map(function(e){return e.clone()}),e.text=this.text&&this.text.map(function(e){return e.clone()}),e.label=this.label&&this.label.map(function(e){return e.clone()}),e.unified=this.unified&&this.unified.map(function(e){return e.clone()}),e},t}(),f=function(){function t(){this.geometryDPInfo=new a}return t.prototype.clone=function(){var e=new t;return e.zLevel=this.zLevel,e.geometryDPInfo=this.geometryDPInfo.clone(),e},t}(),L=function(){function o(){this.zLevels=[]}return o.prototype.clone=function(){var e=new o;e.symbolLevel=this.symbolLevel;for(var t=0,r=this.zLevels;t<r.length;t++){var n=r[t];e.zLevels.push(n.clone())}return e},o}();return l});