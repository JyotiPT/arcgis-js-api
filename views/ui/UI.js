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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/domUtils","../../core/Evented","../../core/Handles","../../core/watchUtils","../../core/accessorSupport/decorators","./Component","../../widgets/support/widgetUtils"],function(t,e,n,o,i,r,a,s,p,d,c,u){function l(t){return t&&!t._started&&"function"==typeof t.postMixInProperties&&"function"==typeof t.buildRendering&&"function"==typeof t.postCreate&&"function"==typeof t.startup}function h(t){var e=t;return"object"!=typeof e||e instanceof c||"declaredClass"in e||!("component"in e||"index"in e||"position"in e)?null:t}function f(t,e){var n=e.top,o=e.bottom,i=e.left,r=e.right;t.style.top=n,t.style.bottom=o,t.style.left=i,t.style.right=r}var m={left:0,top:0,bottom:0,right:0},y={bottom:30,top:15,right:15,left:15},g={ui:"esri-ui",corner:"esri-ui-corner",innerContainer:"esri-ui-inner-container",manualContainer:"esri-ui-manual-container",cornerContainer:"esri-ui-corner-container",topLeft:"esri-ui-top-left",topRight:"esri-ui-top-right",bottomLeft:"esri-ui-bottom-left",bottomRight:"esri-ui-bottom-right"};return function(t){function e(e){var n=t.call(this,e)||this;return n._cornerNameToContainerLookup={},n._positionNameToContainerLookup={},n._components=new Array,n._componentToKey=new Map,n._handles=new s,n.view=null,n._initContainers(),n}return o(e,t),e.prototype.initialize=function(){this._handles.add([p.init(this,"view.padding, container",this._applyViewPadding.bind(this)),p.init(this,"padding",this._applyUIPadding.bind(this))])},e.prototype.destroy=function(){this.container=null;for(var t=0,e=this._components;t<e.length;t++){e[t].destroy()}this._components.length=0,this._handles.destroy(),this._componentToKey.clear()},Object.defineProperty(e.prototype,"container",{set:function(t){var e=this._get("container");t!==e&&(t&&(t.classList.add(g.ui),this._attachContainers(t)),e&&(e.classList.remove(g.ui),f(e,{top:"",bottom:"",left:"",right:""}),r.empty(e)),this._set("container",t))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){var t=this.get("view.height")||0;if(0===t)return t;var e=this._getViewPadding(),n=e.top+e.bottom;return Math.max(t-n,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"padding",{get:function(){return this._get("padding")},set:function(t){if(!t)return void this._clearOverride("padding");this._override("padding",t)},enumerable:!0,configurable:!0}),e.prototype.castPadding=function(t){return"number"==typeof t?{bottom:t,top:t,right:t,left:t}:n({},y,t)},Object.defineProperty(e.prototype,"width",{get:function(){var t=this.get("view.width")||0;if(0===t)return t;var e=this._getViewPadding(),n=e.left+e.right;return Math.max(t-n,0)},enumerable:!0,configurable:!0}),e.prototype.add=function(t,e){var n,o,i=this;if(Array.isArray(t))return void t.forEach(function(t){return i.add(t,e)});var r=h(t);r&&(n=r.index,e=r.position,t=r.component,o=r.key),e&&"object"==typeof e&&(n=e.index,o=e.key,e=e.position),!t||e&&!this._isValidPosition(e)||(t instanceof c||(t=new c({node:t})),this._place({component:t,position:e,index:n}),this._components.push(t),o&&this._componentToKey.set(t,o))},e.prototype.remove=function(t,e){var n=this;if(t){if(Array.isArray(t))return t.map(function(t){return n.remove(t,e)});var o=this._find(t);if(o){var i=this._componentToKey;if(i.has(t)&&i.get(t)!==e)return;var r=this._components.indexOf(o);return o.node.parentNode&&o.node.parentNode.removeChild(o.node),this._componentToKey.delete(t),this._components.splice(r,1)[0]}}},e.prototype.empty=function(t){var e=this;if(Array.isArray(t))return t.map(function(t){return e.empty(t)}).reduce(function(t,e){return t.concat(e)});if("manual"===(t=t||"manual")){return Array.prototype.slice.call(this._manualContainer.children).filter(function(t){return!t.classList.contains(g.corner)}).map(function(t){return e.remove(t)})}return this._isValidPosition(t)?Array.prototype.slice.call(this._cornerNameToContainerLookup[t].children).map(this.remove,this):null},e.prototype.move=function(t,e){var n=this;if(Array.isArray(t)&&t.forEach(function(t){return n.move(t,e)}),t){var o,i=h(t)||h(e);if(i&&(o=i.index,e=i.position,t=i.component||t),!e||this._isValidPosition(e)){var r=this.remove(t);r&&this.add(r,{position:e,index:o})}}},e.prototype.find=function(t){if(!t)return null;var e=this._findById(t);return e&&(e.widget||e.node)},e.prototype._find=function(t){return t?t instanceof c?this._findByComponent(t):"string"==typeof t?this._findById(t):this._findByNode(t.domNode||t):null},e.prototype._getViewPadding=function(){return this.get("view.padding")||m},e.prototype._attachContainers=function(t){t.appendChild(this._innerContainer),t.appendChild(this._manualContainer)},e.prototype._initContainers=function(){var t=document.createElement("div");t.classList.add(g.innerContainer),t.classList.add(g.cornerContainer);var e=document.createElement("div");e.classList.add(g.innerContainer),e.classList.add(g.manualContainer);var o=document.createElement("div");o.classList.add(g.topLeft),o.classList.add(g.corner),t.appendChild(o);var i=document.createElement("div");i.classList.add(g.topRight),i.classList.add(g.corner),t.appendChild(i);var r=document.createElement("div");r.classList.add(g.bottomLeft),r.classList.add(g.corner),t.appendChild(r);var a=document.createElement("div");a.classList.add(g.bottomRight),a.classList.add(g.corner),t.appendChild(a),this._innerContainer=t,this._manualContainer=e;var s=u.isRTL();this._cornerNameToContainerLookup={"top-left":o,"top-right":i,"bottom-left":r,"bottom-right":a,"top-leading":s?i:o,"top-trailing":s?o:i,"bottom-leading":s?a:r,"bottom-trailing":s?r:a},this._positionNameToContainerLookup=n({manual:e},this._cornerNameToContainerLookup)},e.prototype._isValidPosition=function(t){return!!this._positionNameToContainerLookup[t]},e.prototype._place=function(t){var e,n=t.component,o=t.position||"manual",i=t.index,a=this._positionNameToContainerLookup[o],s=i>-1;return l(n.widget)&&n.widget.startup(),s?(e=Array.prototype.slice.call(a.children),0===i?void(a.firstChild?r.insertBefore(n.node,a.firstChild):a.appendChild(n.node)):i>=e.length?void a.appendChild(n.node):void r.insertBefore(n.node,e[i])):void a.appendChild(n.node)},e.prototype._applyViewPadding=function(){var t=this.container;t&&f(t,this._toPxPosition(this._getViewPadding()))},e.prototype._applyUIPadding=function(){var t=this._innerContainer;t&&f(t,this._toPxPosition(this.padding))},e.prototype._toPxPosition=function(t){return{top:this._toPxUnit(t.top),left:this._toPxUnit(t.left),right:this._toPxUnit(t.right),bottom:this._toPxUnit(t.bottom)}},e.prototype._toPxUnit=function(t){return 0===t?"0":t+"px"},e.prototype._findByComponent=function(t){var e,n=null;return this._components.some(function(o){return e=o===t,e&&(n=o),e}),n},e.prototype._findById=function(t){var e,n=null;return this._components.some(function(o){return e=o.id===t,e&&(n=o),e}),n},e.prototype._findByNode=function(t){var e,n=null;return this._components.some(function(o){return e=o.node===t,e&&(n=o),e}),n},i([d.property()],e.prototype,"container",null),i([d.property({dependsOn:["view.height"]})],e.prototype,"height",null),i([d.property({value:y})],e.prototype,"padding",null),i([d.cast("padding")],e.prototype,"castPadding",null),i([d.property()],e.prototype,"view",void 0),i([d.property({dependsOn:["view.width"]})],e.prototype,"width",null),e=i([d.subclass("esri.views.ui.UI")],e)}(d.declared(a.EventedAccessor))});