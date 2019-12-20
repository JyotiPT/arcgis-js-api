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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Error","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../../../geometry/Extent","../../../layers/support/ExportWMSImageParameters","./DynamicLayerView3D","../../layers/WMSLayerView"],function(e,r,t,a,i,s,n,o,p,l,c){return function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.initialize=function(){var e=this;this.layer.supportsSpatialReference(this.view.spatialReference)||this.addResolvingPromise(s.reject(new i("layerview:spatial-reference-incompatible","The spatial references supported by this WMS layer are incompatible with the spatial reference of the view")));var r=this,t=r.layer,a=r.view;this._exportWMSImageParameters=new p({layer:t,view:a}),this.updatingHandles.add(this._exportWMSImageParameters,"version",function(){e.updatingHandles.addPromise(e.refreshDebounced())})},r.prototype.destroy=function(){this._exportWMSImageParameters&&(this._exportWMSImageParameters.layer=null,this._exportWMSImageParameters.destroy(),this._exportWMSImageParameters=null)},r.prototype.createFetchPopupFeaturesQuery=function(e){var r=this.findExtentInfoAt(e),t=r.extent,a=new o(t[0],t[1],t[2],t[3],r.spatialReference),i=r.imageSize,s=i.width,n=i.height,p=a.width/s;return{extent:a,width:s,height:n,x:Math.round((e.x-a.xmin)/p),y:Math.round((a.ymax-e.y)/p)}},a([n.property({dependsOn:["view.spatialReference","layer.spatialReferences"]})],r.prototype,"suspended",void 0),r=a([n.subclass("esri.views.3d.layers.WMSLayerView3D")],r)}(n.declared(c.WMSLayerView(l)))});