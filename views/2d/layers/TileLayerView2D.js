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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../engine/Container","./BitmapTileLayerView2D","./LayerView2D","./support/popupUtils2D","../tiling/TileInfoView","../tiling/TileKey","../tiling/TileQueue","../tiling/TileStrategy","../../layers/LayerView","../../layers/RefreshableLayerView","../../layers/TileLayerView"],function(e,t,i,r,n,s,o,a,l,u,h,c,p,f,y,g,d,w,m,_,v,I){var V=a.getLogger("esri.views.2d.layers.TileLayerView2D"),T=[0,0];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._tileStrategy=null,t._fetchQueue=null,t.container=new c.Container,t.layer=null,t}return i(t,e),t.prototype.initialize=function(){var e,t=this,i=this.layer.tileInfo,r=i&&i.spatialReference;r||(e=new o("layerview:tiling-information-missing","The layer doesn't provide tiling information",{layer:this.layer})),r.equals(this.view.spatialReference)||(e=new o("layerview:spatial-reference-incompatible","The spatial reference of this layer does not meet the requirements of the view",{layer:this.layer})),this.watch("resampling",function(){t.refresh()}),e&&this.addResolvingPromise(u.reject(e))},Object.defineProperty(t.prototype,"resampling",{get:function(){return!("resampling"in this.layer)||!1!==this.layer.resampling},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(){return null},t.prototype.update=function(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")},t.prototype.attach=function(){var e=this,t="tileServers"in this.layer?this.layer.tileServers:null;this._tileInfoView=new g(this.layer.tileInfo,this.layer.fullExtent),this._fetchQueue=new w({tileInfoView:this._tileInfoView,concurrency:t&&10*t.length||10,process:function(t,i){return e.fetchTile(t,i)}}),this._tileStrategy=new m({cachePolicy:"keep",resampling:this.resampling,acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},tileInfoView:this._tileInfoView}),this.requestUpdate(),this.container.requestRender(),this.inherited(arguments)},t.prototype.detach=function(){this.inherited(arguments),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.createFetchPopupFeaturesQueryGeometry=function(e,t){return y.createQueryGeometry(e,t,this.view)},t.prototype.doRefresh=function(){return s(this,void 0,void 0,function(){var e=this;return n(this,function(t){return this.updateRequested||this.suspended?[2]:(this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(function(t){return e._enqueueTileFetch(t)}),this.notifyChange("updating"),[2])})})},t.prototype.isUpdating=function(){return this._fetchQueue.length>0},t.prototype.acquireTile=function(e){var t,i,r=this._bitmapView.createTile(e),n=r.bitmap;return t=this._tileInfoView.getTileCoords(T,r.key),n.x=t[0],n.y=t[1],n.resolution=this._tileInfoView.getTileResolution(r.key),i=this._tileInfoView.tileInfo.size,n.width=i[0],n.height=i[1],this._enqueueTileFetch(r),this.requestUpdate(),r},t.prototype.releaseTile=function(e){var t=this;this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",function(){e.destroy(),t.requestUpdate()}),this.requestUpdate()},t.prototype.fetchTile=function(e,t){return s(this,void 0,void 0,function(){var i,r,s,o,a,h,c,p,f;return n(this,function(n){switch(n.label){case 0:if(i="tilemapCache"in this.layer?this.layer.tilemapCache:null,r=!l.isNone(t)&&t.signal,i)return[3,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this._fetchImage(e,r)];case 2:return[2,n.sent()];case 3:if(s=n.sent(),!u.isAbortError(s)&&!this.resampling)return[2,this._createBlankImage()];throw s;case 4:o=d.pool.acquire(),n.label=5;case 5:return n.trys.push([5,8,,10]),[4,i.fetchAvailabilityUpsample(e.level,e.row,e.col,o,{signal:r})];case 6:return n.sent(),o.level===e.level||this.resampling?[4,this._fetchImage(o,r)]:[2,this._createBlankImage()];case 7:return a=n.sent(),[3,10];case 8:if(h=n.sent(),u.isAbortError(h))throw d.pool.release(o),h;return[4,this._fetchImage(e,r)];case 9:return a=n.sent(),[3,10];case 10:return c=o.level,p=o.row,f=o.col,d.pool.release(o),this.resampling&&c!==e.level?[2,this._resampleImage(a,c,p,f,e.level,e.row,e.col)]:[2,a]}})})},t.prototype._enqueueTileFetch=function(e){return s(this,void 0,void 0,function(){var t,i,r=this;return n(this,function(n){switch(n.label){case 0:if(this._fetchQueue.has(e.key.id))return[2];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,this._fetchQueue.push(e.key)];case 2:return t=n.sent(),e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",function(){return r.requestUpdate()}),this._bitmapView.addChild(e),[3,4];case 3:return i=n.sent(),u.isAbortError(i)||V.error(i),[3,4];case 4:return this.requestUpdate(),[2]}})})},t.prototype._fetchImage=function(e,t){return s(this,void 0,void 0,function(){return n(this,function(i){return[2,this.layer.fetchTile(e.level,e.row,e.col,{timestamp:this.refreshTimestamp,signal:t})]})})},t.prototype._resampleImage=function(e,t,i,r,n,s,o){var a=this._tileInfoView.tileInfo.size,l=this._tileInfoView.getTileResolution(t),u=this._tileInfoView.getTileResolution(n),h=this._tileInfoView.getLODInfoAt(n),c=h.getXForColumn(o),p=h.getYForRow(s);h=this._tileInfoView.getLODInfoAt(t);var f=h.getXForColumn(r),y=h.getYForRow(i),g=Math.round((c-f)/l),d=Math.round(-(p-y)/l),w=Math.round(a[0]*(u/l)),m=Math.round(a[1]*(u/l)),_=this._createBlankImage();return _.getContext("2d").drawImage(e,g,d,w,m,0,0,a[0],a[1]),_},t.prototype._createBlankImage=function(){var e=this._tileInfoView.tileInfo.size,t=document.createElement("canvas");return t.width=e[0],t.height=e[1],t},r([h.property({dependsOn:["layer.resampling?"]})],t.prototype,"resampling",null),t=r([h.subclass("esri.views.2d.layers.TileLayerView2D")],t)}(h.declared(I.TileLayerView(v.RefreshableLayerView(p.BitmapTileLayerView2D(f.LayerView2D(_))))))});