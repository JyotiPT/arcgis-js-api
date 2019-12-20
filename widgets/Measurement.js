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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/awaiterHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","dojo/i18n!./Measurement/nls/Measurement","../core/compilerUtils","../core/accessorSupport/decorators","./Widget","./Measurement/MeasurementViewModel","./support/widget","@dojo/framework/shim/Promise"],function(e,t,i,r,n,s,o,a,c,u,l,d,v){function p(e){return e&&("esri.widgets.AreaMeasurement2D"===e.declaredClass||"esri.widgets.AreaMeasurement3D"===e.declaredClass)}var w={base:"esri-measurement",widgetIcon:"esri-icon-measure"};return function(t){function i(e){var i=t.call(this,e)||this;return i._widgets=new Map,i.activeTool=null,i.activeWidget=null,i.areaUnit=null,i.iconClass=w.widgetIcon,i.label=a.widgetLabel,i.linearUnit=null,i.view=null,i.viewModel=new d,i}return n(i,t),i.prototype.postInitialize=function(){var e=this;this.activeWidget&&this.viewModel.set("activeViewModel",this.activeWidget.viewModel),this.view&&this.activeTool&&this._getActiveWidget().then(function(t){e._set("activeWidget",t)}),this.own([this.watch(["view","activeTool"],function(){e._getActiveWidget().then(function(t){e._set("activeWidget",t)})}),this.watch("activeWidget",function(t,i){e.viewModel.set("activeViewModel",t?t.viewModel:null),i&&(i.visible=!1)}),this.watch(["areaUnit","linearUnit"],function(){return e._updateWidgetUnits()})])},i.prototype.destroy=function(){this._destroyWidgets()},i.prototype.render=function(){var e=this.activeWidget,t=e&&!e.destroyed?e.render():null;return v.tsx("div",{class:w.base},t)},i.prototype.clear=function(){this.activeTool=null,this._destroyWidgets()},i.prototype.startMeasurement=function(){var e=this.viewModel.activeViewModel;e&&e.newMeasurement()},i.prototype._createWidget=function(t){return r(this,void 0,void 0,function(){var i,r,n,s,a,u,l,d,v,p,w;return o(this,function(o){switch(o.label){case 0:switch(i=this,r=i.areaUnit,n=i.linearUnit,s=i.view,a=t){case"area":return[3,1];case"distance":return[3,7];case"direct-line":return[3,9]}return[3,11];case 1:switch(u=s.type,l=u){case"2d":return[3,2];case"3d":return[3,4]}return[3,6];case 2:return[4,new Promise(function(t,i){e(["./AreaMeasurement2D"],t,i)})];case 3:return d=o.sent(),[2,new d({view:s,unit:r})];case 4:return[4,new Promise(function(t,i){e(["./AreaMeasurement3D"],t,i)})];case 5:return v=o.sent(),[2,new v({view:s,unit:r})];case 6:return c.neverReached(u),[2,null];case 7:return[4,new Promise(function(t,i){e(["./DistanceMeasurement2D"],t,i)})];case 8:return p=o.sent(),[2,new p({view:s,unit:n})];case 9:return[4,new Promise(function(t,i){e(["./DirectLineMeasurement3D"],t,i)})];case 10:return w=o.sent(),[2,new w({view:s,unit:n})];case 11:return c.neverReached(t),[2,null]}})})},i.prototype._destroyWidgets=function(){this._widgets.forEach(function(e){return e.destroy()}),this._widgets.clear()},i.prototype._getActiveWidget=function(){return r(this,void 0,void 0,function(){var e,t,i,r;return o(this,function(n){switch(n.label){case 0:return e=this,(t=e.activeTool,(i=e.view)&&t)?(r=null,this._widgets.has(t)?(r=this._widgets.get(t),r.visible=!0,[3,3]):[3,1]):[2,null];case 1:return[4,this._createWidget(t)];case 2:if(!(r=n.sent()))return[2,null];r.viewModel.newMeasurement(),this._widgets.set(t,r),n.label=3;case 3:return[2,r]}})})},i.prototype._updateWidgetUnits=function(){var e=this;this._widgets.forEach(function(t){var i=e,r=i.areaUnit,n=i.linearUnit;t.unit=p(t)?r:n})},s([u.aliasOf("viewModel.activeTool")],i.prototype,"activeTool",void 0),s([u.property({readOnly:!0}),v.renderable()],i.prototype,"activeWidget",void 0),s([u.aliasOf("viewModel.areaUnit")],i.prototype,"areaUnit",void 0),s([u.property()],i.prototype,"iconClass",void 0),s([u.property()],i.prototype,"label",void 0),s([u.aliasOf("viewModel.linearUnit")],i.prototype,"linearUnit",void 0),s([u.aliasOf("viewModel.view"),v.renderable()],i.prototype,"view",void 0),s([u.property({type:d}),v.renderable(["viewModel.state"])],i.prototype,"viewModel",void 0),i=s([u.subclass("esri.widgets.Measurement")],i)}(u.declared(l))});