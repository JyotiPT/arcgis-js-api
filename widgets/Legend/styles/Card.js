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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/assignHelper","dojo/i18n!../../../nls/common","dojo/i18n!../../Legend/nls/Legend","../../../intl","../../../core/Handles","../../../core/screenUtils","../../../core/accessorSupport/decorators","../../../symbols/support/svgUtils","../../Widget","./support/utils","../support/styleUtils","../../support/colorUtils","../../support/widget"],function(e,t,r,a,i,s,n,o,l,c,d,p,h,y,m,g,v){function u(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var r=e.symbolLayers.getItemAt(t-1),a=r.resource&&r.resource.primitive;return"circle"===a||"cross"===a||"kite"===a||"sphere"===a||"cube"===a||"diamond"===a}var i=e.style;return"circle"===i||"diamond"===i||"cross"===i}}function _(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var r=e.symbolLayers.getItemAt(t-1),a=r.get("resource.primitive");return"triangle"===a||"cone"===a||"tetrahedron"===a}return"triangle"===e.style}}var b={activated:"esri-legend--card__carousel-indicator--activated",base:"esri-legend--card esri-widget",stacked:"esri-legend--stacked",carouselTitle:"esri-legend--card__carousel-title",indicator:"esri-legend--card__carousel-indicator",intervalSeparator:"esri-legend--card__interval-separator",imageryLayerStretchedImage:"esri-legend--card__imagery-layer-image--stretched",imageLabel:"esri-legend--card__image-label",layerCaption:"esri-legend--card__layer-caption",labelElement:"esri-legend--card__label-element",layerRow:"esri-legend--card__layer-row",labelCell:"esri-legend--card__label-cell",message:"esri-legend--card__message",rampLabel:"esri-legend--card__ramp-label",section:"esri-legend--card__section",relationshipSection:"esri-legend--card__relationship-section",serviceCaptionText:"esri-legend--card__service-caption-text",serviceContent:"esri-legend--card__service-content",service:"esri-legend--card__service",groupLayer:"esri-legend--card__group-layer",groupLayerChild:"esri-legend--card__group-layer-child",symbol:"esri-legend--card__symbol",sizeRampRow:"esri-legend--card__size-ramp-row",symbolRow:"esri-legend--card__symbol-row",symbolCell:"esri-legend--card__symbol-cell",indicatorContainer:"esri-legend--card__carousel-indicator-container",intervalSeparatorsContainer:"esri-legend--card__interval-separators-container",relationshipLabelContainer:"esri-legend--card__relationship-label-container",labelContainer:"esri-legend--card__label-container",serviceCaptionContainer:"esri-legend--card__service-caption-container",symbolContainer:"esri-legend--card__symbol-container",sizeRampContainer:"esri-legend--card__size-ramp-container",hidden:"esri-hidden",header:"esri-widget__heading"},f="esri-legend--card__",x=window.devicePixelRatio;return function(e){function t(t){var r=e.call(this,t)||this;return r._handles=new l,r._hasIndicators=!1,r._selectedSectionName=null,r._sectionNames=[],r._sectionMap=new Map,r.activeLayerInfos=null,r.layout="stack",r.type="card",r.view=null,r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([this.watch("activeLayerInfos",function(t){e._handles.removeAll(),e._watchForSectionChanges(t)})])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null},t.prototype.render=function(){var e,t=this;this._hasIndicators="auto"===this.layout&&this.view.container.clientWidth<=768||"stack"===this.layout;var r=this.activeLayerInfos,a=r&&r.toArray().map(function(e){return t._renderLegendForLayer(e)}).filter(function(e){return!!e});this._hasIndicators?this._selectedSectionName&&-1!==this._sectionNames.indexOf(this._selectedSectionName)||(this._selectedSectionName=this._sectionNames&&this._sectionNames[0]):this._selectedSectionName=null;var i=this._sectionNames.length,l=this._sectionNames.map(function(e,r){var a,n=o.substitute(s.pagination.pageText,{index:r+1,total:i});return v.tsx("div",{key:e,"aria-label":n,title:n,tabIndex:0,onclick:t._selectSection,onkeydown:t._selectSection,bind:t,class:t.classes(b.indicator,(a={},a[b.activated]=t._selectedSectionName===e,a)),"data-section-name":e})}),c=this._hasIndicators&&i>1?v.tsx("div",{class:b.indicatorContainer,key:"carousel-navigation"},l):null,d=this._hasIndicators?this._sectionMap.get(this._selectedSectionName):a&&a.length?a:null,p=(e={},e[b.stacked]=this._hasIndicators,e);return v.tsx("div",{class:this.classes(b.base,p)},c,d||v.tsx("div",{class:b.message},n.noLegend))},t.prototype._selectSection=function(e){var t=e.target,r=t.getAttribute("data-section-name");r&&(this._selectedSectionName=r)},t.prototype._watchForSectionChanges=function(e){var t=this;if(this._generateSectionNames(),e){e.forEach(function(e){var r="activeLayerInfo-"+e.layer.uid+"-version-change";t._handles.remove(r),t._watchForSectionChanges(e.children),t._handles.add(e.watch("version",function(){return t._generateSectionNames()}),r)});var r="activeLayerInfos-collection-change";this._handles.remove(r),this._handles.add(e.on("change",function(){return t._watchForSectionChanges(e)}),r)}},t.prototype._generateSectionNames=function(){this._sectionNames.length=0,this.activeLayerInfos&&this.activeLayerInfos.forEach(this._generateSectionNamesForActiveLayerInfo,this)},t.prototype._generateSectionNamesForActiveLayerInfo=function(e){var t=this;e.children.forEach(this._generateSectionNamesForActiveLayerInfo,this),e.legendElements&&e.legendElements.forEach(function(r,a){t._sectionNames.push(""+f+e.layer.uid+"-type-"+r.type+"-"+a)})},t.prototype._renderLegendForLayer=function(e){var t,r=this;if(!e.ready)return null;if(e.children.length){var a=e.children.map(function(e){return r._renderLegendForLayer(e)}).toArray();return v.tsx("div",{key:e.layer.uid,class:this.classes(b.service,b.groupLayer)},v.tsx("div",{class:b.serviceCaptionContainer},e.title),a)}var i=e.legendElements;if(i&&!i.length)return null;var s=i.some(function(e){return"relationship-ramp"===e.type}),n=i.map(function(t,a){return r._renderLegendForElement(t,e,a,s)}).filter(function(e){return!!e});if(!n.length)return null;var o=(t={},t[b.groupLayerChild]=!!e.parent,t);return v.tsx("div",{key:e.layer.uid,class:this.classes(b.service,o)},v.tsx("div",{class:b.serviceCaptionContainer},v.tsx("div",{class:b.serviceCaptionText},e.title)),v.tsx("div",{class:b.serviceContent},n))},t.prototype._renderLegendForElement=function(e,t,r,a){var i=this;void 0===a&&(a=!1);var s,n="color-ramp"===e.type,o="opacity-ramp"===e.type,l="size-ramp"===e.type,c=t.layer,d=e.title,p=null;if("string"==typeof d)p=d;else if(d){var h=m.getTitle(d,n||o);p=d.title?d.title+" ("+h+")":h}var g=""+f+c.uid+"-type-"+e.type+"-"+r,u=this._hasIndicators?v.tsx("div",null,v.tsx("h3",{class:this.classes(b.header,b.carouselTitle)},t.title),v.tsx("h4",{class:this.classes(b.header,b.layerCaption)},p)):p?v.tsx("h4",{class:this.classes(b.header,b.layerCaption)},p):null,_=null;if("symbol-table"===e.type){var x=e.infos.map(function(r,a){return i._renderLegendForElementInfo(r,t,e.legendType,a)}).filter(function(e){return!!e});if(x.length){var w=x[0].properties.classes&&x[0].properties.classes[b.symbolRow],L=(s={},s[b.labelContainer]=!w&&!a,s[b.relationshipLabelContainer]=a,s);_=v.tsx("div",{key:g,class:b.section},u,v.tsx("div",{class:this.classes(L)},x))}}else"color-ramp"===e.type||"opacity-ramp"===e.type||"heatmap-ramp"===e.type?_=v.tsx("div",{key:g,class:b.section},u,this._renderLegendForRamp(e,c.opacity)):l?_=v.tsx("div",{key:g,class:b.section},u,this._renderSizeRamps(e,c.opacity)):"relationship-ramp"===e.type&&(_=v.tsx("div",{key:g,class:this.classes(b.section,b.relationshipSection)},u,y.renderRelationshipRamp(e,this.id,c.opacity)));return _?(this._sectionMap.set(g,_),_):null},t.prototype._renderLegendForElementInfo=function(e,t,r,a){var i,s,n,o=t.layer;if(e.type)return this._renderLegendForElement(e,t,a);var l=m.isImageryStretchedLegend(o,r);if(e.symbol&&e.preview){if(-1===e.symbol.type.indexOf("simple-fill")){if(!e.label)return v.tsx("div",{key:a,bind:e.preview,afterCreate:m.attachToNode});var c=(i={},i[b.symbolCell]=this._hasIndicators,i);return v.tsx("div",{key:a,class:this.classes(b.layerRow,(s={},s[b.symbolRow]=this._hasIndicators,s))},v.tsx("div",{class:this.classes(c),bind:e.preview,afterCreate:m.attachToNode}),v.tsx("div",{class:this.classes(b.imageLabel,(n={},n[b.labelCell]=this._hasIndicators,n))},m.getTitle(e.label,!1)||""))}var d=255,p=255,h=255,y=0,u=255,_=255,f=255,x=0,w=e.symbol.color&&e.symbol.color.a,L=e.symbol.outline&&e.symbol.outline.color&&e.symbol.outline.color.a;w&&(d=e.symbol.color.r,p=e.symbol.color.g,h=e.symbol.color.b,y=e.symbol.color.a*o.opacity),L&&(u=e.symbol.outline.color.r,_=e.symbol.outline.color.g,f=e.symbol.outline.color.b,x=e.symbol.outline.color.a*o.opacity);var S=!e.symbol.color||g.isBright(e.symbol.color),I=S?"black":"white",C=S?"rgba(255, 255, 255, .6)":"rgba(0, 0, 0, .6)",R={background:w?"rgba("+d+", "+p+", "+h+", "+y+")":"none",color:I,textShadow:"-1px -1px 0 "+C+",\n                                              1px -1px 0 "+C+",\n                                              -1px 1px 0 "+C+",\n                                              1px 1px 0 "+C,border:L?"1px solid rgba("+u+", "+_+", "+f+", "+x+")":"none"};return v.tsx("div",{key:a,class:b.layerRow},v.tsx("div",{class:b.labelElement,styles:R}," ",e.label," "))}if(e.src){var k=this._renderImage(e,o,l);return v.tsx("div",{key:a,class:b.layerRow},k,v.tsx("div",{class:b.imageLabel},e.label||""))}},t.prototype._renderImage=function(e,t,r){var a,i=e.label,s=e.src,n=e.opacity,o=(a={},a[b.imageryLayerStretchedImage]=r,a[b.symbol]=!r,a),l={opacity:""+(null!=n?n:t.opacity)};return v.tsx("img",{alt:m.getTitle(i,!1),src:s,border:0,width:e.width,height:e.height,class:this.classes(o),styles:l})},t.prototype._drawImageOnSizeRamp=function(e,t,r){var a=r.x,i=r.y,s=r.width,n=r.height,o=new Image;o.src=t,o.onload=function(){e.drawImage(o,a,i,s,n),URL.revokeObjectURL(t)}},t.prototype._attachSizeRampToNode=function(e){var t=e["data-layer-opacity"];null!=t&&(e.style.opacity=t.toString());var r,a,i=e["data-legend-element"],s=i.infos,n=s[0],o=s[s.length-1],l=n.symbol,d=o.symbol,p="picture-marker"===l.type,h=_(l),y=u(l);if(p)r=l.url,a=d.url;else{if(n.preview){var m=new Blob([n.preview.innerHTML],{type:"image/svg+xml"});r=URL.createObjectURL(m)}if(o.preview){var g=new Blob([o.preview.innerHTML],{type:"image/svg+xml"});a=URL.createObjectURL(g)}}var v=c.pt2px(n.size+n.outlineSize)*x,b=c.pt2px(o.size+o.outlineSize)*x,f=this._hasIndicators?v:v+100*x,w=this._hasIndicators?f+50*x:v,L=document.createElement("canvas");L.width=f,L.height=w,L.style.width=L.width/x+"px",L.style.height=L.height/x+"px";var S=L.getContext("2d");if(this._hasIndicators){this._drawImageOnSizeRamp(S,r,{x:0,y:0,width:v,height:v}),this._drawImageOnSizeRamp(S,a,{x:f/2-b/2,y:w-b,width:b,height:b}),S.beginPath();var I=y?f/2:f,C=f/2-b/2,R=w-(h?0:y?b/2:b);S.moveTo(0,I),S.lineTo(C,R);var k=f,N=y?f/2:f,T=f/2+b/2,z=w-(h?0:y?b/2:b);S.moveTo(k,N),S.lineTo(T,z)}else{this._drawImageOnSizeRamp(S,r,{x:f-v,y:0,width:v,height:v}),this._drawImageOnSizeRamp(S,a,{x:0,y:w/2-b/2,width:b,height:b}),S.beginPath();var E=b-(y||h?b/2:0),F=w/2-b/2,O=f-(y||h?v/2:v);S.moveTo(E,F),S.lineTo(O,0);var U=b-(y?b/2:0),A=w/2+b/2,M=f-(y?v/2:v),H=w;S.moveTo(U,A),S.lineTo(M,H)}S.strokeStyle="#ddd",S.stroke(),e.appendChild(L)},t.prototype._renderSizeRamps=function(e,t){var r,a=e.infos,i=a[0].label,s=a[a.length-1].label;return v.tsx("div",{class:this.classes(b.layerRow,(r={},r[b.sizeRampRow]=this._hasIndicators,r))},v.tsx("div",{class:b.rampLabel},this._hasIndicators?i:s),v.tsx("div",{class:b.sizeRampContainer},v.tsx("div",{bind:this,"data-layer-opacity":t,"data-legend-element":e,afterCreate:this._attachSizeRampToNode})),v.tsx("div",{class:b.rampLabel},this._hasIndicators?s:i))},t.prototype._renderLegendForRamp=function(e,t){var r=e.infos,a="heatmap-ramp"===e.type,i=r.length-1,s=i>2&&!a?25*i:100,o=s+20,l=r.slice(0).reverse();l.forEach(function(e,t){e.offset=a?e.ratio:t/i});var c=l.length-1,d=l.length%2!=0&&l[l.length/2|0],h=d&&v.tsx("div",{class:b.intervalSeparatorsContainer},v.tsx("div",{class:b.intervalSeparator},"|"),v.tsx("div",{class:b.rampLabel},d.label)),y=r[r.length-1].label,m=r[0].label,g=null;null!=t&&(g="opacity: "+t);var u=[[{shape:{type:"path",path:"M0 12.5 L10 0 L10 25 Z"},fill:l[0].color,stroke:{width:0}},{shape:{type:"rect",x:10,y:0,width:s,height:25},fill:{type:"linear",x1:10,y1:0,x2:s+10,y2:0,colors:l},stroke:{width:0}},{shape:{type:"path",path:"M"+(s+10)+" 0 L"+o+" 12.5 L"+(s+10)+" 25 Z"},fill:l[c].color,stroke:{width:0}}]],_=p.renderSVG(u,o,25);return v.tsx("div",{class:b.layerRow},v.tsx("div",{class:b.rampLabel},a?n[y]:y),v.tsx("div",{class:b.symbolContainer},v.tsx("div",{style:g},_),h),v.tsx("div",{class:b.rampLabel},a?n[m]:m))},a([v.renderable(),d.property()],t.prototype,"activeLayerInfos",void 0),a([d.property()],t.prototype,"layout",void 0),a([d.property({readOnly:!0})],t.prototype,"type",void 0),a([d.property()],t.prototype,"view",void 0),a([v.accessibleHandler()],t.prototype,"_selectSection",null),t=a([d.subclass("esri.widgets.Legend.styles.Card")],t)}(d.declared(h))});