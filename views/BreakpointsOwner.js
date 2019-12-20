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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","../core/ArrayPool","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators"],function(e,i,r,t,a,s,l,n,h){function o(e){var i=e;return i&&i.xsmall<i.small&&i.small<i.medium&&i.medium<i.large}function m(e,i){return i?g[e].valueToClassName[i].split(" "):[]}Object.defineProperty(i,"__esModule",{value:!0});var g={widthBreakpoint:{getValue:function(e){var i=e.viewSize[0],r=e.breakpoints,t=this.values;return i<=r.xsmall?t.xsmall:i<=r.small?t.small:i<=r.medium?t.medium:i<=r.large?t.large:t.xlarge},values:{xsmall:"xsmall",small:"small",medium:"medium",large:"large",xlarge:"xlarge"},valueToClassName:{xsmall:"esri-view-width-xsmall esri-view-width-less-than-small esri-view-width-less-than-medium esri-view-width-less-than-large esri-view-width-less-than-xlarge",small:"esri-view-width-small esri-view-width-greater-than-xsmall esri-view-width-less-than-medium esri-view-width-less-than-large esri-view-width-less-than-xlarge",medium:"esri-view-width-medium esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-less-than-large esri-view-width-less-than-xlarge",large:"esri-view-width-large esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-greater-than-medium esri-view-width-less-than-xlarge",xlarge:"esri-view-width-xlarge esri-view-width-greater-than-xsmall esri-view-width-greater-than-small esri-view-width-greater-than-medium esri-view-width-greater-than-large"}},heightBreakpoint:{getValue:function(e){var i=e.viewSize[1],r=e.breakpoints,t=this.values;return i<=r.xsmall?t.xsmall:i<=r.small?t.small:i<=r.medium?t.medium:i<=r.large?t.large:t.xlarge},values:{xsmall:"xsmall",small:"small",medium:"medium",large:"large",xlarge:"xlarge"},valueToClassName:{xsmall:"esri-view-height-xsmall esri-view-height-less-than-small esri-view-height-less-than-medium esri-view-height-less-than-large esri-view-height-less-than-xlarge",small:"esri-view-height-small esri-view-height-greater-than-xsmall esri-view-height-less-than-medium esri-view-height-less-than-large esri-view-height-less-than-xlarge",medium:"esri-view-height-medium esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-less-than-large esri-view-height-less-than-xlarge",large:"esri-view-height-large esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-greater-than-medium esri-view-height-less-than-xlarge",xlarge:"esri-view-height-xlarge esri-view-height-greater-than-xsmall esri-view-height-greater-than-small esri-view-height-greater-than-medium esri-view-height-greater-than-large"}},orientation:{getValue:function(e){var i=e.viewSize,r=i[0],t=i[1],a=this.values;return t>=r?a.portrait:a.landscape},values:{portrait:"portrait",landscape:"landscape"},valueToClassName:{portrait:"esri-view-orientation-portrait",landscape:"esri-view-orientation-landscape"}}},u={xsmall:544,small:768,medium:992,large:1200};i.BreakpointsOwner=function(e){return function(e){function i(){for(var i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];var t=e.apply(this,i)||this;return t._breakpointsHandles=new l,t.orientation=null,t.widthBreakpoint=null,t.heightBreakpoint=null,t.breakpoints=u,t}return r(i,e),i.prototype.initialize=function(){this._breakpointsHandles.add(n.init(this,["breakpoints","size"],this._updateClassNames))},i.prototype.destroy=function(){this.destroyed||(this._removeActiveClassNames(),this._breakpointsHandles.destroy(),this._breakpointsHandles=null)},Object.defineProperty(i.prototype,"breakpoints",{set:function(e){if(e!==this._get("breakpoints")){var i=o(e);if(!i){var r=JSON.stringify(u,null,2);console.warn("provided breakpoints are not valid, using defaults:"+r)}e=i?e:u,this._set("breakpoints",a({},e))}},enumerable:!0,configurable:!0}),i.prototype._updateClassNames=function(){if(this.container){var e,i=s.acquire(),r=s.acquire(),t=!1;for(e in g){var a=this[e],l=g[e].getValue({viewSize:this.size,breakpoints:this.breakpoints});a!==l&&(t=!0,this[e]=l,m(e,a).forEach(function(e){return r.push(e)}),m(e,l).forEach(function(e){return i.push(e)}))}t&&(this._applyClassNameChanges(i,r),s.release(i),s.release(r))}},i.prototype._applyClassNameChanges=function(e,i){var r=this.container;r&&(i.forEach(function(e){return r.classList.remove(e)}),e.forEach(function(e){return r.classList.add(e)}))},i.prototype._removeActiveClassNames=function(){var e=this.container;if(e){var i;for(i in g)m(i,this[i]).forEach(function(i){return e.classList.remove(i)})}},t([h.property()],i.prototype,"breakpoints",null),t([h.property()],i.prototype,"orientation",void 0),t([h.property()],i.prototype,"widthBreakpoint",void 0),t([h.property()],i.prototype,"heightBreakpoint",void 0),i=t([h.subclass("esri.views.BreakpointsOwner")],i)}(h.declared(e))}});