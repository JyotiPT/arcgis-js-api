// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/DragEventSeparator","../../../input/InputHandler","../../../input/handlers/support"],function(t,n,e,o,a,i){Object.defineProperty(n,"__esModule",{value:!0});var r=function(t){function n(n,e,a){var r=t.call(this,!0)||this;r.view=n,r.pointerAction=e,r.registerIncoming("drag",a,function(t){return r._handleDrag(t)}),r.registerIncoming("pointer-down",function(t){return r.stopMomentumNavigation()});var p=r.view.navigation;return r.dragEventSeparator=new o.DragEventSeparator({start:function(t,n){p.pan.begin(r.view,n.data),n.stopPropagation()},update:function(t,n){p.pan.update(r.view,n.data),n.stopPropagation()},end:function(t,n){p.pan.end(r.view,n.data),n.stopPropagation()},condition:function(t,n){return 1===t&&i.eventMatchesPointerAction(n.data,r.pointerAction)}}),r}return e(n,t),n.prototype._handleDrag=function(t){var n=this.view.navigation;if(n.pinch.zoomMomentum||n.pinch.rotateMomentum)return void this.stopMomentumNavigation();this.dragEventSeparator.handle(t)},n.prototype.stopMomentumNavigation=function(){this.view.navigation.pan.stopMomentumNavigation()},n}(a.InputHandler);n.DragPan=r});