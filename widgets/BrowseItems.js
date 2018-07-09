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

define(["dojo/_base/declare","dojo/_base/window","dojo/_base/event","dojo/dom-class","dojo/dom-style","dojo/dom-attr","dojo/string","dojo/on","dojo/aspect","dojo/dom","dojo/dom-construct","dojo/mouse","dojo/topic","dojo/query","dojo/parser","dijit/registry","dijit/TooltipDialog","dijit/popup","dojo/promise/all","dojo/Deferred","dgrid/Grid","dgrid/extensions/Pagination","dgrid/extensions/DijitRegistry","dgrid/OnDemandGrid","dgrid/Selection","dgrid/Selector","dgrid/Keyboard","dgrid/util/touch","dstore/Memory","dstore/QueryResults","dstore/Trackable","dstore/legacy/StoreAdapter","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","../portal/Portal","../portal/PortalItem","../portal/PortalQueryResult","../portal/PortalQueryParams","../core/Evented","../core/PluginTarget","./BrowseItems/_AppTemplateFiltersMixin","../core/lang","../config","../request","../geometry/support/webMercatorUtils","../tasks/GeometryService","../geometry/SpatialReference","dojo/i18n!./BrowseItems/nls/BrowseItems","dojo/NodeList-dom"],function(t,e,i,s,n,r,o,a,h,l,d,c,u,g,f,p,m,_,y,v,b,w,x,T,q,P,I,j,k,N,D,A,C,L,S,E,O,M,$,R,U,B,Q,F,H,G,W,K,z){var J=t([k,D],{idProperty:"id",constructor:function(e){t.safeMixin(this,e)},get:function(t,e){return this.portal.queryItems(new $({query:"id:"+t})).then(function(t){return new O(Q.mixin(t,{portal:this.portal}))})},getIdentity:function(t){return t[this.idProperty]},fetchRange:function(t){var e=t.start,i=t.end,s=this.fetch();return new N(s.then(function(t){return t.slice(e,i)}),{totalLength:s.then(function(t){return t.length})})},fetch:function(){var t,e,i,s=new v;if(this.query&&this.queryOptions||s.reject("query parameters missing for ItemStore"),t="object"==typeof this.query?this.query:{query:g},e=this.queryOptions){if(t=Q.mixin(t,{num:e.count,start:(e.start||0)+1}),e.sort&&e.sort.length){var n=e.sort[0];t=Q.mixin(t,{sortField:"created"===n.attribute?"uploaded":n.attribute,sortOrder:n.descending?"desc":"asc"})}e.useExtent&&e.extent&&(t.extent=e.extent)}return i=new $(t),this.portal.queryItems(i).then(function(t){s.resolve(t.results)}),new N(s)}}),V={base:"esri-browseitems",button:"esri-button",close:"esri-button esri-close",loader:"esri-loaderthrob",templatePanel:"template-info-panel"};return t([C,L,S,U],{templateString:'<div><div class="top-bar"><div  class="instructions"><span class="messageLeft hide" data-dojo-attach-point="messageNodeLeft"></span><span class="messageRight hide" data-dojo-attach-point="messageNodeRight"></span><a tabIndex="-1" data-dojo-attach-point="helpLink" class="esriHelpIcon hide" title="${i18n.learnMoreConfigurableApps}" href="#" target="_blank"></a></div><div data-dojo-attach-point="_searchBox" class="searchBar"><input tabIndex="1" placeholder="${i18n.searchTitle}" class="esriSearchBox dijitTextBox" type="search"></div></div><div class="gallery"><div class="gallery-left  quiet-scroll"><ul class="filters"></ul></div><div class="templates gallery-right"><p id="${id}_filterTitle" class="filter-title hide" data-dojo-attach-point="filterDescription"></p><div id="${id}_grid"class="dgrid-autoheight quiet-scroll"></div></div><div  class="${_css.loader}"></div><div  data-dojo-attach-point="infoPanel" class="${_css.templatePanel}"></div></div></div>',galleryTemplate:"<div style='opacity:1;' class='grid-item gallery-view'>${item:_formatThumbnail}${item:_formatItemTitle}"+'<p class="template-overlay" style="display:none;">${i18n.selectDetails}</p></div>',infoPanelTemplate:'<div><div class="template-info-showing"><div class="thumbnail"><img src="${item:_formatInfoPanelImage}"></div><h4>${item.title}</h4><div class="template-info"><p class="quiet-scroll">${item.snippet}</p></div></div><div class="panel-actions"><button class="${_css.button}" id="on-next">${i18n.configure}</button><button class="${_css.close}" id="close-panel">${i18n.close}</button></div><div>',showInfoPanel:!0,i18n:z,baseClass:V.base,_css:V,postMixInProperties:function(){this.inherited(arguments)},postCreate:function(){this.inherited(arguments),this.self?(this._portal=new E({url:this.portalUrl,self:this.self}),this._init(),this._portal.on("load",this._fetchData.bind(this))):(this._portal=new E({url:this.portalUrl,authMode:"immediate"}),this._portal.load().then(function(t){this._user=this._portal.user,this._init(),this._fetchData()}.bind(this)))},_init:function(){this._canSearchPublic=this.self?this.self.canSearchPublic:this._portal.canSearchPublic,this.query=Q.mixin(this.query||{},{get:function(t){return this[t]&&this[t].length?"("+this[t].join(" OR ")+") ":""},toString:function(){return{query:this.get("groups")+this.get("tags")+this.get("persistentTypekeywords")+this.get("typekeywords")+this.get("types")+this.get("custom")+(this.query||"")+(this.search||"")+' -type:"Attachment"'}}}),this.self?this.self.canSearchPublic=!0:this._portal.canSearchPublic=!0,this.galleryTemplate=this.plugin&&this.plugin.galleryTemplate||this.galleryTemplate,this.infoPanelTemplate=this.plugin&&this.plugin.infoPanelTemplate||this.infoPanelTemplate,this.helpLinkUrl=this.plugin&&this.plugin.helpLinkUrl||"",this.helpLinkUrl&&(r.set(this.helpLink,"href",this.helpLinkUrl),s.remove(this.helpLink,"hide")),g(".templates",this.domNode).addClass("fade"),g(".dgrid-footer",this.domNode).addClass("hide")},destroy:function(){this.inherited(arguments),this._grid&&this._grid.destroy(),this._img_connect&&(this._img_connect.remove(),this._img_connect_error.remove()),this._queryTimer&&clearTimeout(this._queryTimer),this._grid=this._portal=null},_setItemQueryAttr:function(t){this.itemQuery=t},_setPluginIdAttr:function(t){this.addPlugin(t)},_setMessageAttr:function(t){this.set("messageRight",t)},_setMessageRightAttr:function(t){r.set(this.messageNodeRight,"innerHTML",t),s.remove(this.messageNodeRight,"hide")},_setMessageLeftAttr:function(t){r.set(this.messageNodeLeft,"innerHTML",t),s.remove(this.messageNodeLeft,"hide")},_setDisabledAttr:function(t){p.findWidgets(this.domNode).concat(p.findWidgets(this._content)).forEach(function(e){e.set("disabled",t)}),s[t?"add":"remove"](this._interval.domNode,"dijitTextBoxDisabled")},_setSortAttr:function(t){this.sortAttribute=t},_setSortDescendingAttr:function(t){this.sortDescending=t},_getSelectionAttr:function(){var t=this._grid.selection;for(var e in t)if(t.hasOwnProperty(e))break;return e&&this._grid.row(e).data},_setGalleryTemplateAttr:function(t){Q.isDefined(t)&&(this.galleryTemplate=t)},_setFormatThumbnailAttr:function(t){Q.isDefined(t)&&"function"==typeof t&&(this._formatThumbnail=t)},_setFormatItemTitleAttr:function(t){Q.isDefined(t)&&"function"==typeof t&&(this._formatItemTitle=t)},_setRowsPerPageAttr:function(t){this._set("rowsPerPage",t)},_setPagingLinksAttr:function(t){this._set("pagingLinks",t)},_getQueryAttr:function(){return this.query},_setQueryAttr:function(t){this._set("query",t),this._grid&&(this._grid.collection.query=t.toString(),this._grid.refresh())},_setExtentAttr:function(t){t&&this._set("extent",t)},_setUseExtentAttr:function(t){this._set("useExtent",t)},_setFetchTimeoutAttr:function(t){this._set("fetchTimeout",t)},_setShowInfoPanelAttr:function(t){this._set("showInfoPanel",t)},_setFilterTypeAttr:function(t){this._set("filterType",t)},_validate:function(){return!!this.get("selection")},_getPortalAttr:function(){return this._portal},reset:function(){if(g(".esriSearchBox",this._searchBox).forEach(function(t){r.set(t,"value","")}),this.query.search="",this.plugin.filters){var t=[],e=[];g("li.active",this.domNode).forEach(function(i){s.remove(i,"active");var n=i.childNodes[0].id,r=this.plugin.filters[n],o=(r.tags||[]).map(function(t){return'tags:"'+t+'"'},this),a=(r.typekeywords||[]).map(function(t){return'typekeywords:"'+t+'"'},this);t.push(o),e.push(a)},this),this.query.tags=(this.query.tags||[]).filter(function(e){return-1!==t.indexOf(e)}),this.query.typekeywords=(this.query.typekeywords||[]).filter(function(t){return-1!==e.indexOf(t)}),l.byId("all").click()}},_clearQueryTimeout:function(){clearTimeout(this._queryTimer),this._queryTimer=null},_clearClosePanelTimeout:function(){clearTimeout(this._panelClosing),this._panelClosing=null,(this._panelClickHandles||[]).forEach(function(t){t&&"function"==typeof t.remove&&t.remove()}),d.empty(this.infoPanel)},_createGrid:function(){var e,h=t([b,w,q,x]),f=this.query,p=function(t){t.snippet=t.snippet||"";var e=d.create("div"),i=o.substitute(this.galleryTemplate,{item:t,i18n:this.i18n},null,this);return d.place(i,e),e}.bind(this),m={sort:[{attribute:this.sortAttribute||"title",descending:this.sortDescending||!1}]};this.get("useExtent")&&(m.extent=this.get("extent"),m.useExtent=this.get("useExtent")),e=new J({portal:this._portal,query:f.toString(),queryOptions:m}),this._grid=new h({collection:e,selectionMode:"single",pagingLinks:this.get("pagingLinks")||2,rowsPerPage:this.get("itemsPerPage")||this.plugin&&this.plugin.rowsPerPage||6,loadingMessage:"Loading items...",showLoadingMessage:!1,renderRow:p,noDataMessage:this.i18n.noItemsToDisplay},this.id+"_grid"),this._grid.startup(),this.own(a(this.domNode,"click",function(t){l.byId("close-panel")&&l.byId("close-panel").click()}),this._grid.on(a.selector(".dgrid-content .dgrid-row",c.enter),function(t){!1===s.contains(this.domNode,"showing")&&this.showInfoPanel&&this._showOverlay(!0,t)}.bind(this)),this._grid.on(a.selector(".dgrid-content .dgrid-row",c.leave),function(t){this._showOverlay(!1,t)}.bind(this)),this._grid.on(".dgrid-row:click",function(t){var e;!1===s.contains(this.domNode,"showing")&&this.showInfoPanel&&(t.preventDefault(),i.stop(t),this._clearClosePanelTimeout(),e=this.get("selection"),this._showOverlay(!1,t),this.showInfoPanel&&this.infoPanelTemplate?d.place(o.substitute(this.infoPanelTemplate,{item:e,i18n:this.i18n,_css:this._css},function(t){return Q.isDefined(t)?t:""},this),this.infoPanel):n.set(this.infoPanel,"display","none"),s.add(this.domNode,"showing"),this._panelClickHandles=[g(".template-info-showing .thumbnail img",this.domNode).on("error",function(t){r.set(t.target,"src",e.thumbnailUrl)}),g(".panel-actions ."+this._css.button).on("click",function(t){t.preventDefault(),i.stop(t),"close-panel"===t.target.id?(s.remove(this.domNode,"showing"),this._panelClosing=setTimeout(function(){[].forEach(function(t){t&&"function"==typeof t.remove&&t.remove()})},250)):u.publish("/esri/browseitems/close",t.target.id,this.get("selection"))}.bind(this)),g("."+this._css.templatePanel).on("click",function(t){t.preventDefault(),i.stop(t)})])}.bind(this)),this._grid.on("dgrid-refresh-complete",function(t){g(".templates",this.domNode).removeClass("fade"),g("."+this._css.loader,this.domNode).addClass("hide"),g(".dgrid-footer",this.domNode)[this._grid._total<=this._grid.rowsPerPage?"addClass":"removeClass"]("hide")}.bind(this)),this._grid.on("refresh",function(){this._img_connect&&(this._img_connect.remove(),this._img_connect_error.remove(),this._img_connect=null,this._img_connect_error=null),this._img_connect=g(".grid-item-thumb",this._grid.domNode).on("load",function(t){var e=this._grid.row(t);e&&e.element&&g(".grid-item",e.element).addClass("fadeIn").style("opacity","1")}.bind(this)),this._img_connect_error=g(".grid-item-thumb",this._grid.domNode).on("error",function(t){r.set(t.target,"src",this._portal.staticImagesUrl+"/desktopapp.png")}.bind(this))}.bind(this)),a(this._searchBox,"keyup",function(t){t.preventDefault(),this._clearQueryTimeout(),this._queryTimer=setTimeout(function(){this.query.search=r.get(t.target,"value"),this._fetchItems(this.query).then(function(){this._clearQueryTimeout()}.bind(this))}.bind(this),this.searchKeypressDelay||450)}.bind(this)),a(this._searchBox,"search",function(t){this._queryTimer||(t.preventDefault(),this.query.search=r.get(t.target,"value"),this._fetchItems(this.query))}.bind(this))),this.useExtent&&this.own(this.watch("extent",function(t,e,i){this._grid.queryOptions.extent=this.get("extent"),this._grid.queryOptions.useExtent=this.get("useExtent"),this._grid.query.bbox=this._grid.queryOptions.useExtent?this._grid.queryOptions.extent:"",this._grid.refresh()}),this.watch("useExtent",function(t,e,i){this._grid.queryOptions.extent=this.get("extent"),this._grid.queryOptions.useExtent=i,this._grid.query.bbox=this._grid.queryOptions.useExtent?this._grid.queryOptions.extent:"",this._grid.refresh()})),this.showInfoPanel||this.own(this._grid.on("dgrid-select,dgrid-deselect",function(t){var e={selection:this.get("selection")};this.emit("select-change",e)}.bind(this)))},_createFilters:function(){if(this.plugin&&this.plugin.filters){var t,e=this.plugin.filters,i=this.plugin.filterStrings,n=g(".filters",this.domNode)[0];for(t in e)d.create("li",{class:"all"===t?"active":"",innerHTML:"<a id='"+t+"'  href='#'>"+i[t].title+"</a>"},n);this.own(a(n,"li a:click",function(t){t.preventDefault();var o=t.target;g(".active",n).removeClass("active"),s.add(o.parentNode,"active"),g(".templates",this.domNode).addClass("fade"),setTimeout(function(){s["all"===o.id?"add":"remove"](this.filterDescription,"hide"),r.set(this.filterDescription,"innerHTML",i[o.id].description||"")}.bind(this),225);var a=Q.mixin({},e[o.id]||{});this.query.tags=(a.tags||[]).map(function(t){return'tags:"'+t+'"'}),this.query.typekeywords=[].concat((a.typekeywords||[]).map(function(t){return'typekeywords:"'+t+'"'})),this._fetchItems(this.query)}.bind(this))),s.add(this.domNode,"filters")}else s.add(this.domNode,"nofilters"+(this.plugin&&this.plugin.extraClasses?" "+this.plugin.extraClasses.join(" "):""))},_showOverlay:function(t,e){var i=this._grid.row(e);i&&g(".template-overlay",i.element).style("display",t?"":"none")},_fetchData:function(){return this.plugin&&this.plugin.fetchData?this.plugin.fetchData():this._fetchItems(this.itemQuery)},_fetchItems:function(t,e){var i={sort:[{attribute:this.sortAttribute||"title",descending:this.sortDescending||!1}]},s=new v;return this.get("useExtent")&&(i.extent=this.get("extent"),i.useExtent=this.get("useExtent")),g(".templates",this.domNode).addClass("fade"),g(".dgrid-footer",this.domNode).addClass("hide"),g("."+this._css.loader,this.domNode).removeClass("hide"),setTimeout(function(){this.query=Q.mixin(this.query,t),this._grid?(this._grid.collection.query=this.query.toString(),this._grid.collection.queryOptions=i,this._grid.refresh()):(this._createFilters(),this._createGrid()),s.resolve(this._grid)}.bind(this),60),s},_formatThumbnail:function(t){return"<img class='grid-item-thumb' width='187px' height='125px' alt='' src='"+(t.thumbnailUrl||this._portal.staticImagesUrl+"/desktopapp.png")+"'>"},_formatInfoPanelImage:function(t){var e=t.screenshots&&t.screenshots.length?t.screenshots[0]:null;return e?t.itemUrl+"/info/"+e:t.thumbnailUrl},_formatItemTitle:function(t){return"<h5>"+(t.title||t.name||"<No Title>")+"</h5>"},clear:function(){this._grid.clearSelection()}})});