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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!./Swipe/nls/Swipe","../core/events","../core/accessorSupport/decorators","../core/libs/pep/pep","./Widget","./Swipe/SwipeViewModel","./support/widget"],function(e,i,t,n,r,o,a,l,s,d,p,c){var v={base:"esri-swipe",baseDisabled:"esri-swipe--disabled",vertical:"esri-swipe--vertical",horizontal:"esri-swipe--horizontal",container:"esri-swipe__container",divider:"esri-swipe__divider",handle:"esri-swipe__handle",handleHidden:"esri-swipe__handle--hidden",widgetIcon:"esri-icon-up-down-arrows",handleIcon:"esri-swipe__handle-icon",dragIconHorizontal:"esri-icon-drag-horizontal",dragIconVertical:"esri-icon-drag-vertical",widget:"esri-widget",disabled:"esri-disabled"},u={handle:!0,divider:!0};return function(e){function i(i){var t=e.call(this,i)||this;return t.direction=null,t.disabled=!1,t.dragLabel=o.dragLabel,t.iconClass=v.widgetIcon,t.label=o.widgetLabel,t.leadingLayers=null,t.position=null,t.trailingLayers=null,t.view=null,t.viewModel=new p,t._pointerOffset=null,t._container=null,t._onContainerPointerDown=t._onContainerPointerDown.bind(t),t._onContainerPointerMove=t._onContainerPointerMove.bind(t),t._onContainerPointerUp=t._onContainerPointerUp.bind(t),t}return t(i,e),Object.defineProperty(i.prototype,"visibleElements",{get:function(){return this._get("visibleElements")||u},set:function(e){this._set("visibleElements",r({},u,e))},enumerable:!0,configurable:!0}),i.prototype.renderHandle=function(){var e,i=this.viewModel.direction,t=this.visibleElements,n=(e={},e[v.dragIconHorizontal]="vertical"===i,e[v.dragIconVertical]="horizontal"===i,e),r=this.classes(v.handle,!t.handle&&v.handleHidden);return c.tsx("div",{key:"handle",role:"presentation",class:r},c.tsx("span",{"aria-hidden":"true",class:this.classes(v.handleIcon,n)}))},i.prototype.renderDivider=function(){var e=this.visibleElements;return e&&e.divider?c.tsx("div",{key:"divider",role:"presentation",class:v.divider}):null},i.prototype.renderContent=function(){return[this.renderDivider(),this.renderHandle()]},i.prototype.renderContainer=function(){var e=this,i=e.disabled,t=e.dragLabel,n=e.viewModel,r=n.max,o=n.min,a=n.direction,l=n.position,s=l+"%",d={top:"vertical"===a?s:null,left:"vertical"===a?null:s},p=this.renderContent();return i?c.tsx("div",{key:"container",role:"presentation",styles:d,class:v.container},p):c.tsx("div",{tabIndex:0,key:"container",bind:this,afterCreate:this._afterContainerCreate,onkeydown:this._onContainerKeyDown,"touch-action":"none",role:"slider",title:t,"aria-label":t,"aria-orientation":a,"aria-valuemax":""+r,"aria-valuemin":""+o,"aria-valuenow":""+l,"aria-valuetext":s,styles:d,class:v.container},p)},i.prototype.render=function(){var e,i=this.viewModel,t=i.state,n=i.direction,r="disabled"===t||this.disabled,o=(e={},e[v.disabled]=r,e[v.baseDisabled]=r,e[v.vertical]="vertical"===n,e[v.horizontal]="horizontal"===n,e);return c.tsx("div",{class:this.classes(v.base,v.widget,o)},"disabled"===t?null:this.renderContainer())},i.prototype._afterContainerCreate=function(e){s.applyLocal(e),this._container=e,e.addEventListener("pointerdown",this._onContainerPointerDown)},i.prototype._calculatePointerOffset=function(e){var i=this.direction,t=e.target,n=("vertical"===i?t.clientHeight:t.clientWidth)/2,r=t.getBoundingClientRect(),o=e.clientX-r.left,a=e.clientY-r.top;this._pointerOffset="vertical"===i?a-n:o-n},i.prototype._onContainerPointerDown=function(e){e.preventDefault(),this._container&&document.activeElement!==this.container&&this._container.focus(),this._calculatePointerOffset(e),document.addEventListener("pointerup",this._onContainerPointerUp),document.addEventListener("pointermove",this._onContainerPointerMove)},i.prototype._onContainerPointerUp=function(e){e.preventDefault(),document.removeEventListener("pointerup",this._onContainerPointerUp),document.removeEventListener("pointermove",this._onContainerPointerMove)},i.prototype._onContainerPointerMove=function(e){e.preventDefault();var i=this,t=i._pointerOffset,n=i.container,r=i.direction,o=e.clientX,a=e.clientY,l=n.getBoundingClientRect(),s=l.top,d=l.left,p=l.width,c=l.height,v="vertical"===r?c:p,u="vertical"===r?a-s-t:o-d-t,w=u/v*100;this.position=w},i.prototype._getKeyPosition=function(e){var i=a.eventKey(e),t=this.position,n=this.viewModel,r=n.max,o=n.min,l=n.step,s=n.stepMultiplier,d=n.direction,p=l*s;if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown"].indexOf(i)>-1&&(e.preventDefault(),e.stopPropagation()),"vertical"===d?"ArrowDown"===i||"ArrowRight"===i:"ArrowUp"===i||"ArrowRight"===i){var c=e.shiftKey?p:l;return t+c}if("vertical"===d?"ArrowUp"===i||"ArrowLeft"===i:"ArrowDown"===i||"ArrowLeft"===i){var c=e.shiftKey?p:l;return t-c}return"Home"===i?o:"End"===i?r:("vertical"===d?"PageDown"===i:"PageUp"===i)?t+p:("vertical"===d?"PageUp"===i:"PageDown"===i)?t-p:null},i.prototype._onContainerKeyDown=function(e){var i=this._getKeyPosition(e);"number"==typeof i&&(this.position=i)},n([l.aliasOf("viewModel.direction")],i.prototype,"direction",void 0),n([l.property(),c.renderable()],i.prototype,"disabled",void 0),n([l.property(),c.renderable()],i.prototype,"dragLabel",void 0),n([l.property()],i.prototype,"iconClass",void 0),n([l.property()],i.prototype,"label",void 0),n([l.aliasOf("viewModel.leadingLayers")],i.prototype,"leadingLayers",void 0),n([l.aliasOf("viewModel.position")],i.prototype,"position",void 0),n([l.aliasOf("viewModel.trailingLayers")],i.prototype,"trailingLayers",void 0),n([l.aliasOf("viewModel.view"),c.renderable()],i.prototype,"view",void 0),n([l.property({type:p}),c.renderable(["viewModel.state","viewModel.position","viewModel.direction"])],i.prototype,"viewModel",void 0),n([l.property(),c.renderable()],i.prototype,"visibleElements",null),i=n([l.subclass("esri.widgets.Swipe")],i)}(l.declared(d))});