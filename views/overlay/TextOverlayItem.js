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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/accessorSupport/decorators","../../libs/maquette/index"],function(t,e,o,r,i,n,l){for(var s={bottom:"esri-text-overlay-item-anchor-bottom","bottom-right":"esri-text-overlay-item-anchor-bottom-right","bottom-left":"esri-text-overlay-item-anchor-bottom-left",top:"esri-text-overlay-item-anchor-top","top-right":"esri-text-overlay-item-anchor-top-right","top-left":"esri-text-overlay-item-anchor-top-left",center:"esri-text-overlay-item-anchor-center",right:"esri-text-overlay-item-anchor-right",left:"esri-text-overlay-item-anchor-left"},a=function(t){function e(e){var o=t.call(this,e)||this;return o.x=0,o.y=0,o.text="-",o.fontSize=14,o.anchor="center",o.visible=!0,o.backgroundColor="rgba(0, 0, 0, 0.6)",o.textColor="white",o.textShadowColor=[0,0,0],o.textShadowSize=1,o}return o(e,t),Object.defineProperty(e.prototype,"position",{get:function(){return[this.x,this.y]},set:function(t){this._set("x",t[0]),this._set("y",t[1])},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"padding",{get:function(){return.5*this.fontSize},enumerable:!0,configurable:!0}),e.prototype.render=function(){return l.h("div",{classes:this._cssClasses(),styles:{left:Math.floor(this.x)+"px",top:Math.floor(this.y)+"px",visibility:this.visible?"visible":"hidden",fontSize:this.fontSize+"px",backgroundColor:this.backgroundColor,color:this.textColor,padding:this.padding+"px",borderRadius:this.padding+"px",textShadow:"0 0 "+this.textShadowSize+"px rgb("+this.textShadowColor[0]+", "+this.textShadowColor[1]+", "+this.textShadowColor[2]+")"}},[this.text])},e.prototype.renderCanvas=function(t){if(this.visible){var e=t.font.replace(/^(.*?)px/,"");t.font=this.fontSize+"px "+e;var o=this.padding,r=this.padding,i=t.measureText(this.text).width,n=this.fontSize,l=h[this.anchor];t.textAlign="center",t.textBaseline="middle";var s=i+2*o,a=n+2*o,p=this.x+l.x*s,x=this.y+l.y*a;this.roundedRect(t,p,x,s,a,r),t.fillStyle=this.backgroundColor,t.fill();var d=this.x+(l.x+.5)*s,c=this.y+(l.y+.5)*a;this._renderTextShadow(t,this.text,d,c),t.fillStyle=this.textColor,t.fillText(this.text,d,c)}},e.prototype._renderTextShadow=function(t,e,o,r){t.lineJoin="miter",t.fillStyle="rgba("+this.textShadowColor[0]+", "+this.textShadowColor[1]+", "+this.textShadowColor[2]+", "+1/p.length+")";for(var i=this.textShadowSize,n=0,l=p;n<l.length;n++){var s=l[n],a=s[0],h=s[1];t.fillText(e,o+i*a,r+i*h)}},e.prototype.roundedRect=function(t,e,o,r,i,n){t.beginPath(),t.moveTo(e,o+n),t.arcTo(e,o,e+n,o,n),t.lineTo(e+r-n,o),t.arcTo(e+r,o,e+r,o+n,n),t.lineTo(e+r,o+i-n),t.arcTo(e+r,o+i,e+r-n,o+i,n),t.lineTo(e+n,o+i),t.arcTo(e,o+i,e,o+i-n,n),t.closePath()},e.prototype._cssClasses=function(){var t={"esri-text-overlay-item":!0};for(var e in s)t[s[e]]=this.anchor===e;return t},r([n.property()],e.prototype,"x",void 0),r([n.property()],e.prototype,"y",void 0),r([n.property({dependsOn:["x","y"]})],e.prototype,"position",null),r([n.property()],e.prototype,"text",void 0),r([n.property()],e.prototype,"fontSize",void 0),r([n.property()],e.prototype,"anchor",void 0),r([n.property()],e.prototype,"visible",void 0),r([n.property({dependsOn:["fontSize"]})],e.prototype,"padding",null),e=r([n.subclass("esri.views.overlay.TextOverlayItem")],e)}(n.declared(i)),h={bottom:{x:-.5,y:-1,textAlign:"center",textBaseline:"bottom"},"bottom-left":{x:0,y:-1,textAlign:"left",textBaseline:"bottom"},"bottom-right":{x:-1,y:-1,textAlign:"right",textBaseline:"bottom"},center:{x:-.5,y:-.5,textAlign:"center",textBaseline:"middle"},left:{x:0,y:-.5,textAlign:"left",textBaseline:"middle"},right:{x:-1,y:-.5,textAlign:"right",textBaseline:"middle"},top:{x:-.5,y:0,textAlign:"center",textBaseline:"top"},"top-left":{x:0,y:0,textAlign:"left",textBaseline:"top"},"top-right":{x:-1,y:0,textAlign:"right",textBaseline:"top"}},p=[],x=0;x<360;x+=22.5)p.push([Math.cos(Math.PI*x/180),Math.sin(Math.PI*x/180)]);return a});