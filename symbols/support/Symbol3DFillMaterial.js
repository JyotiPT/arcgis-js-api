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
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","./Symbol3DMaterial"],function(e,o,r,l,t,i){Object.defineProperty(o,"__esModule",{value:!0});var c=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}r(o,e),i=o,o.prototype.clone=function(){return new i({color:this.color?this.color.clone():null,colorMixMode:this.colorMixMode})};var i;return l([t.enumeration.serializable()({multiply:"multiply",replace:"replace",tint:"tint"})],o.prototype,"colorMixMode",void 0),o=i=l([t.subclass("esri.symbols.support.Symbol3DFillMaterial")],o)}(t.declared(i.default));o.Symbol3DFillMaterial=c,o.default=c});