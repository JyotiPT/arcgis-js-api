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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./AreaMeasurement2D/nls/AreaMeasurement2D","../core/accessorSupport/decorators","./Widget","./AreaMeasurement2D/AreaMeasurement2DViewModel","./support/widget"],function(e,t,s,a,n,i,r,l,u){var o={button:"esri-button esri-button--secondary",buttonDisabled:"esri-button--disabled",widgetIcon:"esri-icon-measure-area",base:"esri-area-measurement-2d",widget:"esri-widget",panel:"esri-widget--panel",container:"esri-area-measurement-2d__container",hint:"esri-area-measurement-2d__hint",hintText:"esri-area-measurement-2d__hint-text",panelError:"esri-area-measurement-2d__panel--error",measurement:"esri-area-measurement-2d__measurement",measurementItem:"esri-area-measurement-2d__measurement-item",measurementItemDisabled:"esri-area-measurement-2d__measurement-item--disabled",measurementItemTitle:"esri-area-measurement-2d__measurement-item-title",measurementItemValue:"esri-area-measurement-2d__measurement-item-value",settings:"esri-area-measurement-2d__settings",units:"esri-area-measurement-2d__units",unitsLabel:"esri-area-measurement-2d__units-label",unitsSelect:"esri-area-measurement-2d__units-select esri-select",unitsSelectWrapper:"esri-area-measurement-2d__units-select-wrapper",actionSection:"esri-area-measurement-2d__actions",clearButton:"esri-area-measurement-2d__clear-button"};return function(e){function t(t){var s=e.call(this,t)||this;return s.active=null,s.iconClass=o.widgetIcon,s.label=n.widgetLabel,s.unit=null,s.unitOptions=null,s.view=null,s.viewModel=new l,s}return s(t,e),t.prototype.render=function(){var e=this,t=this,s=t.id,a=t.viewModel,i=t.visible,r=a.active,l=a.isSupported,m=a.measurementLabel,d=a.state,c=a.unit,p=a.unitOptions,v="disabled"===d,b="ready"===d,_="measuring"===d||"measured"===d,w=r&&b?u.tsx("section",{key:"hint",class:o.hint},u.tsx("p",{class:o.hintText},n.hint)):null,y=l?null:u.tsx("section",{key:"unsupported",class:o.panelError},u.tsx("p",null,n.unsupported)),M=function(t,s,a){return s?u.tsx("div",{key:a+"-enabled",class:o.measurementItem},u.tsx("span",{class:o.measurementItemTitle},t),u.tsx("span",{class:o.measurementItemValue},s)):u.tsx("div",{key:a+"-disabled",class:e.classes(o.measurementItem,o.measurementItemDisabled),"aria-disabled":"true"},u.tsx("span",{class:o.measurementItemTitle},t))},x=_?u.tsx("section",{key:"measurement",class:o.measurement},M(n.area,m.area,"area"),M(n.perimeter,m.perimeter,"perimeter")):null,h=s+"__units",g=u.tsx("section",{key:"units",class:o.units},u.tsx("label",{class:o.unitsLabel,for:h},n.unit),u.tsx("div",{class:o.unitsSelectWrapper},u.tsx("select",{class:o.unitsSelect,id:h,onchange:this._changeUnit,bind:this,value:c},p.map(function(e){return u.tsx("option",{key:e,value:e},n.units[e])})))),f=_?u.tsx("div",{key:"settings",class:o.settings},g):null,I=!l||r&&!_?null:u.tsx("div",{class:o.actionSection},u.tsx("button",{disabled:v,class:this.classes(o.button,o.clearButton,v&&o.buttonDisabled),bind:this,onclick:this._newMeasurement,title:n.newMeasurement,"aria-label":n.newMeasurement},n.newMeasurement)),O=i?u.tsx("div",{class:o.container},y,w,f,x,I):null;return u.tsx("div",{class:this.classes(o.base,o.widget,o.panel)},O)},t.prototype._newMeasurement=function(){this.viewModel.newMeasurement()},t.prototype._changeUnit=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.viewModel.unit=s.value)},a([i.aliasOf("viewModel.active"),u.renderable()],t.prototype,"active",void 0),a([i.property()],t.prototype,"iconClass",void 0),a([i.property()],t.prototype,"label",void 0),a([i.aliasOf("viewModel.unit")],t.prototype,"unit",void 0),a([i.aliasOf("viewModel.unitOptions")],t.prototype,"unitOptions",void 0),a([i.aliasOf("viewModel.view")],t.prototype,"view",void 0),a([i.property({type:l}),u.renderable(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurementLabel"])],t.prototype,"viewModel",void 0),a([i.aliasOf("viewModel.visible"),u.renderable()],t.prototype,"visible",void 0),a([u.accessibleHandler()],t.prototype,"_newMeasurement",null),a([u.accessibleHandler()],t.prototype,"_changeUnit",null),t=a([i.subclass("esri.widgets.AreaMeasurement2D")],t)}(i.declared(r))});