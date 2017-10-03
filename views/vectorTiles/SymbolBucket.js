// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.5/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","./Bucket","../2d/engine/webgl/Geometry","./style/StyleLayer","./Placement","./GeometryUtils","./TextShaping","dojox/string/BidiEngine"],function(e,t,r,a,n,i,o,s,l,h,m){function c(e,t){return e.iconMosaicItem&&t.iconMosaicItem?e.iconMosaicItem.page===t.iconMosaicItem.page?0:e.iconMosaicItem.page<t.iconMosaicItem.page?-1:1:e.iconMosaicItem&&!t.iconMosaicItem?1:!e.iconMosaicItem&&t.iconMosaicItem?-1:0}var f=function(){function e(){}return e}(),x=function(){function e(e,t,r,a){this.line=t,this.shaping=e,this.iconMosaicItem=r,this.anchor=a}return e}(),p=(function(){function e(){}return e}(),function(e){function t(t,r,a,n,i,o,s,l){var h=e.call(this,t,r)||this;return h._markerRatio=1,h._markerMap=new Map,h._glyphMap=new Map,h._glyphBufferDataStorage=new Map,h._markerVertexBuffer=a,h._markerIndexBuffer=n,h._textVertexBuffer=i,h._textIndexBuffer=o,h._placementEngine=s,h._workerTileHandler=l,h}return r(t,e),Object.defineProperty(t.prototype,"markerPageMap",{get:function(){return this._markerMap},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"glyphsPageMap",{get:function(){return this._glyphMap},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textIndexStart",{get:function(){return this._textTriangleElementsStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textIndexCount",{get:function(){return this._textTriangleElementsNum},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sdfMarker",{get:function(){return!1},enumerable:!0,configurable:!0}),t.prototype.copy=function(e,r,a,n,i){var o=new t(this.layer,this.zoom,e,r,a,n,i,this._workerTileHandler);return o.layerIndex=this.layerIndex,o.layerExtent=this.layerExtent,o._markerVertexStart=e.index,o._markerTriangleElementsStart=r.index,o._textVertexStart=a.index,o._textTriangleElementsStart=n.index,o._markerTriangleElementsNum=0,o._textTriangleElementsNum=0,o._symbolInstances=this._symbolInstances,o._workerTileHandler=this._workerTileHandler,o._font=this._font,o._textLayout=this._textLayout,o._markerLayout=this._markerLayout,o._isLinePlacement=this._isLinePlacement,o._avoidEdges=this._avoidEdges,o},t.prototype.getResources=function(e,r,a){var n=this.layer,i=this.zoom;e&&e.setExtent(this.layerExtent);for(var o=n.getLayoutValue("icon-image",i),s=n.getLayoutValue("text-field",i),l=n.getLayoutValue("text-font",i),h=n.getLayoutValue("text-transform",i),m=[],c=0,x=this._features;c<x.length;c++){var p=x[c],g=p.getGeometry(e);if(g&&0!==g.length){var u=void 0;o&&(u=this._replaceKeys(o,p.values),u&&r.add(u));var d=void 0,y=!1;if(s){switch(d=this._replaceKeys(s,p.values),h){case 2:d=d.toLowerCase();break;case 1:d=d.toUpperCase()}if(t._bidiEngine.hasBidiChar(d)){var _=t._bidiEngine.checkContextual(d),v=void 0;v="rtl"===_?"IDNNN":"ICNNN",d=t._bidiEngine.bidiTransform(d,v,"VLYSN"),y=!0}var b=d.length;if(b>0){var I=a[l];I||(I=a[l]=new Set);for(var M=0;b>M;M++){var k=d.charCodeAt(M);I.add(k)}}}if(u||d){var E=new f;E.sprite=u,E.label=d,E.rtl=y,E.geometry=g,m.push(E)}}}this._symbolFeatures=m},t.prototype.processFeatures=function(e,r){e&&e.setExtent(this.layerExtent);var a,n=this.layer,i=this.zoom,m=8,f=24,p=this._isLinePlacement=1===n.getLayoutValue("symbol-placement",i),g=this._avoidEdges=n.getLayoutValue("symbol-avoid-edges",i)&&!p,u=n.getLayoutValue("symbol-spacing",i)*m,d=n.getLayoutValue("icon-image",i),y=n.getLayoutValue("text-field",i),_=this._workerTileHandler;d&&(this._markerLayout=new o.IconLayout(n,i,p),a=_.getSpriteItems());var v,b;if(y){var I=this._textLayout=new o.TextLayout(n,i,p),M=void 0;I.font&&I.font.length&&(M=I.font[0],this._font=M);var k=.5;switch(I.anchor){case 5:case 1:case 7:k=0;break;case 6:case 2:case 8:k=1}var E=.5;switch(I.anchor){case 5:case 3:case 6:E=0;break;case 7:case 4:case 8:E=1}var L=.5;switch(I.justify){case 0:L=0;break;case 2:L=1}var T=I.letterSpacing*f,z=p?0:I.maxWidth*f,S=I.lineHeight*f,w=[I.offset[0]*f,I.offset[1]*f];v=_.getGlyphItems(M),b=new h(v,z,S,T,w,k,E,L)}this._markerVertexStart=this._markerVertexBuffer.index,this._markerTriangleElementsStart=this._markerIndexBuffer.index,this._textVertexStart=this._textVertexBuffer.index,this._textTriangleElementsStart=this._textIndexBuffer.index,this._markerTriangleElementsNum=0,this._textTriangleElementsNum=0,this._markerMap.clear(),this._glyphMap.clear();var N=[];this._symbolInstances=N;var P=this._textLayout,A=1;P&&P.size&&(A=P.size/f);for(var V=4096,B=P?P.maxAngle*l.C_DEG_TO_RAD:0,C=P?P.size*m:0,F=0,G=this._symbolFeatures;F<G.length;F++){var D=G[F],H=void 0;D.sprite&&(H=a[D.sprite]);var j=void 0,Y=D.label,O=0;if(Y&&(j=b.getShaping(Y,D.rtl),j&&j.length>0)){for(var R=1e30,q=-1e30,K=0,U=j;K<U.length;K++){var W=U[K];R=Math.min(R,W.x),q=Math.max(q,W.x)}O=(q-R+2*f)*A*m}for(var J=0,Q=D.geometry;J<Q.length;J++){var X=Q[J],Z=void 0;if(p){if(j&&j.length>0&&P&&P.size){var $=P.size*m*(2+Math.min(2,4*Math.abs(P.offset[1])));t._smoothVertices(X,$)}Z=t._findAnchors(X,u,O)}else Z=[new s.Anchor(X[0].x,X[0].y)];for(var ee=0,te=Z;ee<te.length;ee++){var re=te[ee],ae=re.x<0||re.x>V||re.y<0||re.y>V;ae||p&&O>0&&0===P.rotationAlignment&&!t._honorsTextMaxAngle(X,re,O,B,C)||N.push(new x(j,X,H,re))}}}N.sort(c);for(var ne=0,ie=N;ne<ie.length;ne++){var oe=ie[ne];this._processFeature(oe,v,g)}this._addPlacedGlyphs()},t.prototype.updateSymbols=function(){this._markerVertexStart=this._markerVertexBuffer.index,this._markerTriangleElementsStart=this._markerIndexBuffer.index,this._textVertexStart=this._textVertexBuffer.index,this._textTriangleElementsStart=this._textIndexBuffer.index,this._markerTriangleElementsNum=0,this._textTriangleElementsNum=0,this._markerMap.clear(),this._glyphMap.clear();for(var e=this._workerTileHandler.getGlyphItems(this._font),t=this._avoidEdges,r=this._symbolInstances,a=0,n=r;a<n.length;a++){var i=n[a];this._processFeature(i,e,t)}this._addPlacedGlyphs()},t.prototype._replaceKeys=function(e,t){return e.replace(/{([^{}]+)}/g,function(e,r){return r in t?t[r]:""})},t.prototype._processFeature=function(e,t,r){var a=e.line,n=e.iconMosaicItem,o=e.shaping,s=e.anchor,h=8,m=this._markerLayout,c=m&&!!n,f=!0,x=1;if(c){var p=1/this._markerRatio,g=m.size/p;x=h*g,f=m.optional||!n}var u=this._textLayout,d=u&&o&&o.length>0,y=24,_=1,v=_,b=!0;d&&(_=u.size/y,v=h*_,b=u.optional||!o||0===o.length);var I,M=new i.Point(0,-17);if(c){if(I=this._placementEngine.getIconPlacement(s,n,x,a,m,r),I.footprint.minzoom===l.C_INFINITY&&!f)return;s.minzoom>I.footprint.minzoom&&(I.footprint.minzoom=s.minzoom)}var k;if(d&&(k=this._placementEngine.getTextPlacement(s,M,o,t,v,a,u,r))){if(k.footprint.minzoom===l.C_INFINITY&&!b)return;s.minzoom>k.footprint.minzoom&&(k.footprint.minzoom=s.minzoom)}if(!b&&!f||!f&&k&&k.footprint.minzoom!==l.C_INFINITY||!b&&I&&I.footprint.minzoom!==l.C_INFINITY){var E=Math.max(I.footprint.minzoom,k.footprint.minzoom);I.footprint.minzoom=E,k.footprint.minzoom=E}k&&k.footprint.minzoom!==l.C_INFINITY&&(u.ignorePlacement||this._placementEngine.add(k),this._storePlacedGlyphs(k.shapes,k.footprint.minzoom,this.zoom)),I&&I.footprint.minzoom!==l.C_INFINITY&&(m.ignorePlacement||this._placementEngine.add(I),this._addPlacedIcons(I.shapes,I.footprint.minzoom,this.zoom,n.page))},t.prototype._addPlacedIcons=function(e,t,r,a){for(var n=Math.max(r+l.log2(t),0),i=this._markerVertexBuffer,o=this._markerIndexBuffer,s=0,h=e;s<h.length;s++){var m=h[s],c=Math.max(r+l.log2(m.minzoom),n),f=Math.min(r+l.log2(m.maxzoom),25);if(!(c>=f)){var x=m.tl,p=m.tr,g=m.bl,u=m.br,d=m.mosaicRect,y=-m.labelAngle,_=m.anchor,v=i.index,b=d.x,I=d.y,M=b+d.width,k=I+d.height;i.add(_.x,_.y,x.x,x.y,b,I,y,c,f,n),i.add(_.x,_.y,p.x,p.y,M,I,y,c,f,n),i.add(_.x,_.y,g.x,g.y,b,k,y,c,f,n),i.add(_.x,_.y,u.x,u.y,M,k,y,c,f,n),o.add(v+0,v+1,v+2),o.add(v+1,v+2,v+3),this._markerMap.has(a)?this._markerMap.get(a)[1]+=6:this._markerMap.set(a,[this._markerTriangleElementsStart+this._markerTriangleElementsNum/3,6]),this._markerTriangleElementsNum+=6}}},t.prototype._addPlacedGlyphs=function(){var e=this,t=this._textVertexBuffer,r=this._textIndexBuffer;this._glyphBufferDataStorage.forEach(function(a,n){for(var i=0,o=a;i<o.length;i++){var s=o[i],l=t.index;t.add(s.glyphAnchor[0],s.glyphAnchor[1],s.tl[0],s.tl[1],s.xmin,s.ymin,s.labelAngle,s.minLod,s.maxLod,s.placementLod),t.add(s.glyphAnchor[0],s.glyphAnchor[1],s.tr[0],s.tr[1],s.xmax,s.ymin,s.labelAngle,s.minLod,s.maxLod,s.placementLod),t.add(s.glyphAnchor[0],s.glyphAnchor[1],s.bl[0],s.bl[1],s.xmin,s.ymax,s.labelAngle,s.minLod,s.maxLod,s.placementLod),t.add(s.glyphAnchor[0],s.glyphAnchor[1],s.br[0],s.br[1],s.xmax,s.ymax,s.labelAngle,s.minLod,s.maxLod,s.placementLod),r.add(l+0,l+1,l+2),r.add(l+1,l+2,l+3),e._glyphMap.has(n)?e._glyphMap.get(n)[1]+=6:e._glyphMap.set(n,[e._textTriangleElementsStart+e._textTriangleElementsNum/3,6]),e._textTriangleElementsNum+=6}}),this._glyphBufferDataStorage.clear()},t.prototype._storePlacedGlyphs=function(e,t,r){for(var a=Math.max(r+l.log2(t),0),n=0,i=e;n<i.length;n++){var o=i[n],s=Math.max(r+l.log2(o.minzoom),a),h=Math.min(r+l.log2(o.maxzoom),25);if(!(s>=h)){var m=o.tl,c=o.tr,f=o.bl,x=o.br,p=-o.labelAngle,g=o.anchor,u=o.mosaicRect;this._glyphBufferDataStorage.has(o.page)||this._glyphBufferDataStorage.set(o.page,[]);var d=this._glyphBufferDataStorage.get(o.page);d.push({glyphAnchor:[g.x,g.y],tl:[m.x,m.y],tr:[c.x,c.y],bl:[f.x,f.y],br:[x.x,x.y],xmin:u.x,ymin:u.y,xmax:u.x+u.width,ymax:u.y+u.height,labelAngle:p,minLod:s,maxLod:h,placementLod:a})}}},t._findAnchors=function(e,t,r){t+=r;for(var a=0,n=e.length-1,o=0;n>o;o++)a+=i.Point.distance(e[o],e[o+1]);var h=r||t;if(h*=.5,h>=a)return[];var m=h/a;t=a/Math.max(Math.round(a/t),1);for(var c=0,f=-t/2,x=[],p=e.length-1,o=0;p>o;o++){for(var g=e[o],u=e[o+1],d=u.x-g.x,y=u.y-g.y,_=Math.sqrt(d*d+y*y),v=void 0;c+_>f+t;){f+=t;var b=(f-c)/_,I=l.interpolate(g.x,u.x,b),M=l.interpolate(g.y,u.y,b);void 0===v&&(v=Math.atan2(y,d)),x.push(new s.Anchor(I,M,v,o,m))}c+=_}return x},t.deviation=function(e,t,r){var a=(t.x-e.x)*(r.x-t.x)+(t.y-e.y)*(r.y-t.y),n=(t.x-e.x)*(r.y-t.y)-(t.y-e.y)*(r.x-t.x);return Math.atan2(n,a)},t._honorsTextMaxAngle=function(e,t,r,a,n){for(var o=0,s=r/2,l=new i.Point(t.x,t.y),h=t.segment+1;o>-s;){if(--h,0>h)return!1;o-=i.Point.distance(e[h],l),l=e[h]}o+=i.Point.distance(e[h],e[h+1]);for(var m=[],c=0,f=e.length;s>o;){var x=e[h],p=h,g=void 0;do{if(++p,p===f)return!1;g=e[p]}while(g.isEqual(x));var u=p,d=void 0;do{if(++u,u===f)return!1;d=e[u]}while(d.isEqual(g));var y=this.deviation(x,g,d);for(m.push({deviation:y,distToAnchor:o}),c+=y;o-m[0].distToAnchor>n;)c-=m.shift().deviation;if(Math.abs(c)>a)return!1;o+=i.Point.distance(g,d),h=p}return!0},t._smoothVertices=function(e,t){var r=1e-6;if(!(0>=t)){var a=e.length;if(!(3>a)){var n=[],o=0;n.push(0);for(var s=1;a>s;s++)o+=i.Point.distance(e[s],e[s-1]),n.push(o);t=Math.min(t,.2*o);var l=[];l.push(e[0].x),l.push(e[0].y);var h=e[a-1].x,m=e[a-1].y,c=i.Point.sub(e[0],e[1]);c.normalize(),e[0].x+=t*c.x,e[0].y+=t*c.y,c.assignSub(e[a-1],e[a-2]),c.normalize(),e[a-1].x+=t*c.x,e[a-1].y+=t*c.y;for(var s=1;a>s;s++)n[s]+=t;n[a-1]+=t;for(var f=.5*t,s=1;a-1>s;s++){for(var x=0,p=0,g=0,u=s-1;u>=0&&!(n[u+1]<n[s]-f);u--){var d=f+n[u+1]-n[s],y=n[u+1]-n[u],_=n[s]-n[u]<f?1:d/y;if(Math.abs(_)<r)break;var v=_*_,b=_*d-.5*v*y,I=_*y/t,M=e[u+1],k=e[u].x-M.x,E=e[u].y-M.y;x+=I/b*(M.x*_*d+.5*v*(d*k-y*M.x)-v*_*y*k/3),p+=I/b*(M.y*_*d+.5*v*(d*E-y*M.y)-v*_*y*E/3),g+=I}for(var u=s+1;a>u&&!(n[u-1]>n[s]+f);u++){var d=f-n[u-1]+n[s],y=n[u]-n[u-1],_=n[u]-n[s]<f?1:d/y;if(Math.abs(_)<r)break;var v=_*_,b=_*d-.5*v*y,I=_*y/t,M=e[u-1],k=e[u].x-M.x,E=e[u].y-M.y;x+=I/b*(M.x*_*d+.5*v*(d*k-y*M.x)-v*_*y*k/3),p+=I/b*(M.y*_*d+.5*v*(d*E-y*M.y)-v*_*y*E/3),g+=I}l.push(x/g),l.push(p/g)}l.push(h),l.push(m);for(var s=0,u=0;a>s;s++)e[s].x=l[u++],e[s].y=l[u++]}}},t._bidiEngine=new m,t}(n));return p});