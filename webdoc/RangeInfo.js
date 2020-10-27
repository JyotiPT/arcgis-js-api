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

define(["require","exports","tslib","../core/JSONSupport","../core/lang","../core/accessorSupport/decorators"],(function(e,t,r,n,o,a){"use strict";return function(e){function t(t){var r=e.call(this,t)||this;return r.activeRange=null,r.currentRangeExtent=null,r.fullRangeExtent=null,r}var n;return r.__extends(t,e),n=t,t.prototype.clone=function(){return new n(o.clone({activeRange:this.activeRange,currentRangeExtent:this.currentRangeExtent,fullRangeExtent:this.fullRangeExtent}))},r.__decorate([a.property({type:String,nonNullable:!0,json:{read:{source:"activeRangeName"},write:{target:"activeRangeName",isRequired:!0}}})],t.prototype,"activeRange",void 0),r.__decorate([a.property({type:[Number],json:{write:!0}})],t.prototype,"currentRangeExtent",void 0),r.__decorate([a.property({type:[Number],json:{write:!0}})],t.prototype,"fullRangeExtent",void 0),t=n=r.__decorate([a.subclass("esri.webdoc.RangeInfo")],t)}(n.JSONSupport)}));