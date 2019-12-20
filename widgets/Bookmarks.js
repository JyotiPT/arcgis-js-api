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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./Bookmarks/nls/Bookmarks","../core/events","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./Bookmarks/BookmarksViewModel","./support/widget"],function(o,t,e,r,a,i,s,n,d,k,l,u,m,c,h){function p(o,t,e){o.splice(e,0,o.splice(t,1)[0])}var b={base:"esri-bookmarks esri-widget--panel",loaderContainer:"esri-bookmarks__loader-container",loader:"esri-bookmarks__loader",fadeIn:"esri-bookmarks--fade-in",bookmarkList:"esri-bookmarks__list",bookmarkListSortable:"esri-bookmarks__list--sortable",bookmark:"esri-bookmarks__bookmark",bookmarkButton:"esri-bookmarks__bookmark-button",bookmarkImageContainer:"esri-bookmarks__bookmark-image-container",bookmarkEditButton:"esri-bookmarks__bookmark-edit-button",bookmarkDragHandle:"esri-bookmarks_bookmark-drag-handle",bookmarkDragHandleIcon:"esri-bookmarks_bookmark-drag-handle-icon",bookmarkIcon:"esri-bookmarks__bookmark-icon",bookmarkImage:"esri-bookmarks__image",bookmarkName:"esri-bookmarks__bookmark-name",bookmarkActive:"esri-bookmarks__bookmark--active",noBookmarksContainer:"esri-widget__content--empty",noBookmarksHeader:"esri-bookmarks__no-bookmarks-heading",noBookmarksIcon:"esri-widget__no-bookmark-icon",noBookmarksDescription:"esri-bookmarks__no-bookmarks-description",addingBookmark:"esri-bookmarks__adding-bookmark",addBookmark:"esri-bookmarks__add-bookmark",addBookmarkButton:"esri-bookmarks__add-bookmark-button",addBookmarkIcon:"esri-bookmarks__add-bookmark-icon",authoringCard:"esri-bookmarks__authoring-card",authoringForm:"esri-bookmarks__authoring-form",authoringLabel:"esri-bookmarks__authoring-label",authoringActions:"esri-bookmarks__authoring-actions",authoringInputInvalid:"esri-bookmarks__authoring-input--invalid",authoringDeleteButton:"esri-bookmarks__authoring-delete-button",authoringCancelButton:"esri-bookmarks__authoring-cancel-button",esriWidget:"esri-widget",esriButton:"esri-button",esriButtonTertiary:"esri-button--tertiary",esriInput:"esri-input",iconHandle:"esri-icon-handle-vertical",iconPlus:"esri-icon-plus",iconEdit:"esri-icon-edit",widgetIcon:"esri-icon-bookmark",header:"esri-widget__heading",loading:"esri-icon-loading-indicator",rotating:"esri-rotating"},_={addBookmark:!0,thumbnail:!0};return function(o){function t(t){var e=o.call(this,t)||this;return e._handles=new d,e._addInputNode=null,e._editInputNode=null,e._addBookmarkButtonNode=null,e._focusAddBookmarkButton=!1,e._focusEditInputBox=!1,e._focusAddInputBox=!1,e._addBookmark=!1,e._editBookmark=null,e._invalidEntry=!1,e._creatingBookmark=!1,e._sortable=null,e._sortableNode=null,e._focusSortUid=null,e._selectedSortUid=null,e._sortableSavedItems=null,e.bookmarkCreationOptions=null,e.bookmarks=null,e.editingEnabled=!1,e.goToOverride=null,e.iconClass=b.widgetIcon,e.label=s.widgetLabel,e.view=null,e.viewModel=new c,e.visibleElements=a({},_),e}return e(t,o),t.prototype.postInitialize=function(){var o=this;this.own([k.init(this,"viewModel.bookmarks",function(){return o._bookmarksInitialized()}),k.init(this,"editingEnabled",function(){return o._toggleSorting()})])},t.prototype.destroy=function(){var o=this._sortable;o&&o.destroy(),this._handles.destroy(),this._handles=null},t.prototype.castVisibleElements=function(o){return a({},_,o)},t.prototype.endAddBookmark=function(){this._invalidEntry=!1,this._addBookmark=!1,this._creatingBookmark=!1,this.scheduleRender()},t.prototype.goTo=function(o){return this.viewModel.goTo(o)},t.prototype.render=function(){var o=this.viewModel.state,t="loading"===o?this._renderLoading():this._renderBookmarks();return h.tsx("div",{class:this.classes(b.base,b.esriWidget)},t)},t.prototype.startAddBookmark=function(){this._editBookmark=null,this._addBookmark=!0,this._focusAddInputBox=!0,this.scheduleRender()},t.prototype._renderLoading=function(){return h.tsx("div",{class:b.loaderContainer,key:"loader"},h.tsx("div",{class:b.loader}))},t.prototype._renderNoBookmarksContainer=function(){return h.tsx("div",{class:b.noBookmarksContainer,key:"no-bookmarks"},h.tsx("span",{"aria-hidden":"true",class:this.classes(b.noBookmarksIcon,b.widgetIcon)}),h.tsx("h1",{class:this.classes(b.header,b.noBookmarksHeader)},s.noBookmarksHeading),h.tsx("p",{class:b.noBookmarksDescription},s.noBookmarksDescription))},t.prototype._renderAddBookmarkLoading=function(){return h.tsx("div",{key:"adding-bookmark",class:b.addingBookmark},h.tsx("span",{"aria-hidden":"true",class:this.classes(b.loading,b.rotating)}),s.addingBookmark)},t.prototype._renderBookmarkItems=function(o){var t=this;return o?o.map(function(o){return t.editingEnabled&&t._editBookmark&&o&&t._editBookmark===o?t._renderEditingBookmark(o):t._renderBookmark(o)}).toArray():null},t.prototype._renderBookmarksContainer=function(o){var t,e=this.editingEnabled&&!this._addBookmark?this._renderAddBookmarkButton():null,r=this.editingEnabled?this._creatingBookmark?this._renderAddBookmarkLoading():this._addBookmark?this._renderAddingBookmark():null:null;return[h.tsx("ul",{key:"bookmark-list","aria-label":s.widgetLabel,class:this.classes(b.bookmarkList,(t={},t[b.bookmarkListSortable]=this.editingEnabled,t)),afterCreate:this._sortNodeCreated,"data-node-ref":"_sortableNode",bind:this},this._renderBookmarkItems(o)),e,r]},t.prototype._dragHandleBlur=function(){this._selectedSortUid=null,this.scheduleRender()},t.prototype._dragHandleKeydown=function(o){o.stopPropagation();var t=this._sortableSavedItems,e=["ArrowDown","ArrowUp","Escape","Tab"," ","Enter"],r=n.eventKey(o);if(-1!==e.indexOf(r)){var a=this,i=a._sortable,s=a._selectedSortUid,d=i.toArray(),k=o.target,l=k.getAttribute("data-bookmark-uid"),u=d.indexOf(l);if(" "===r||"Enter"===r){var m=s&&s===l;return this._selectedSortUid=m?null:l,this._sortableSavedItems=m?null:this._sortable.toArray(),void this.scheduleRender()}if("Tab"===r)return this._selectedSortUid=null,void this.scheduleRender();if("Escape"===r&&t)return this._selectedSortUid=null,this._updateSortItems(t,i,l),void this.scheduleRender();if(-1!==u&&s){var c="ArrowUp"===r?u-1:u+1;c>=d.length||c<=-1||(p(d,u,c),this._updateSortItems(d,i,l))}}},t.prototype._updateSortItems=function(o,t,e){t.sort(o),this._sortBookmarks(t),this._focusSortUid=e,this._selectedSortUid=e},t.prototype._focusDragHandle=function(o){var t=this._focusSortUid;if(o&&t){o.getAttribute("data-bookmark-uid")===t&&(o.focus(),this._focusSortUid=null)}},t.prototype._toggleSorting=function(){var o=this,t=this,e=t._sortable,r=t._sortableNode,a=t.editingEnabled;if(r)if(e)e.option("disabled",!a);else{var i=u.create(r,{dataIdAttr:"data-bookmark-uid",handle:"."+b.bookmarkDragHandle,group:"bookmarks",disabled:!a,onSort:function(){return o._sortBookmarks(i)}});this._sortable=i}},t.prototype._sortNodeCreated=function(o){this._sortableNode=o,this._toggleSorting()},t.prototype._sortBookmarks=function(o){var t=this.viewModel.bookmarks;if(t){var e=o.toArray();t.sort(function(o,t){var r=e.indexOf(o.uid),a=e.indexOf(t.uid);return r>a?1:r<a?-1:0})}},t.prototype._renderAddBookmarkButton=function(){return this.visibleElements.addBookmark?h.tsx("div",{key:"add-bookmark-item",class:b.addBookmark},h.tsx("button",{class:this.classes(b.esriButton,b.esriButtonTertiary,b.addBookmarkButton),onclick:this.startAddBookmark,afterCreate:this._storeAddBookmarkButton,afterUpdate:this._storeAddBookmarkButton,"data-node-ref":"_addBookmarkButtonNode",bind:this},h.tsx("span",{"aria-hidden":"true",class:this.classes(b.addBookmarkIcon,b.iconPlus)}),s.addBookmark)):null},t.prototype._renderBookmarks=function(){var o=this.viewModel.bookmarks,t=o&&o.filter(Boolean),e=t&&t.length,r=e||this.editingEnabled?this._renderBookmarksContainer(t):null;return[e?null:this._renderNoBookmarksContainer(),r]},t.prototype._renderBookmark=function(o){var t,e,r=this.viewModel.activeBookmark,s=o.name,n=o.thumbnail,d=s||i.untitled,k=(t={},t[b.bookmarkActive]=r===o,t),l=n&&n.url||"",u=this.visibleElements,m=u.thumbnail&&l?h.tsx("img",{src:l,alt:"",class:b.bookmarkImage}):h.tsx("span",{"aria-hidden":"true",class:this.classes(b.bookmarkIcon,b.widgetIcon)}),c=h.tsx("div",{class:b.bookmarkImageContainer},m),p=this.editingEnabled?h.tsx("div",{key:"edit-container"},h.tsx("button",{title:i.edit,"aria-label":i.edit,"data-bookmark":o,onclick:this._showEditBookmarkForm,bind:this,class:b.bookmarkEditButton},h.tsx("span",{"aria-hidden":"true",class:b.iconEdit}))):null,_=(e={},e["data-bookmark-uid"]=o.uid,e),B=this.editingEnabled?h.tsx("div",a({role:"button",tabIndex:0,key:"drag-handle",bind:this,class:b.bookmarkDragHandle,onkeydown:this._dragHandleKeydown,afterCreate:this._focusDragHandle,afterUpdate:this._focusDragHandle,onblur:this._dragHandleBlur,"aria-pressed":this._selectedSortUid===o.uid?"true":"false","aria-label":i.dragHandleLabel,title:i.dragHandleTitle},_),h.tsx("span",{"aria-hidden":"true",class:this.classes(b.bookmarkDragHandleIcon,b.iconHandle)})):null;return h.tsx("li",a({key:o,class:this.classes(b.bookmark,k)},_),B,h.tsx("button",{key:"bookmark-button",class:b.bookmarkButton,bind:this,"data-bookmark":o,onclick:this._goToBookmark},c,h.tsx("span",{class:b.bookmarkName},d)),p)},t.prototype._renderEditingBookmark=function(o){var t,e=(t={},t["data-bookmark-uid"]=o.uid,t);return h.tsx("li",a({key:"edit-bookmark-form",class:b.authoringCard},e),h.tsx("form",{class:b.authoringForm,onsubmit:this._editBookmarkSubmit,bind:this},h.tsx("label",{class:b.authoringLabel},s.title,h.tsx("input",{required:!0,bind:this,class:this.classes(b.esriInput,this._invalidEntry?b.authoringInputInvalid:null),type:"text",value:o.name,afterCreate:this._storeEditInput,afterUpdate:this._focusEditInput,"data-bookmark":o,"data-node-ref":"_editInputNode",placeholder:s.addPlaceholder})),h.tsx("div",{class:b.authoringActions},h.tsx("input",{type:"button",value:i.delete,class:this.classes(b.esriButton,b.esriButtonTertiary,b.authoringDeleteButton),"data-bookmark":o,onclick:this._deleteBookmark,bind:this}),h.tsx("input",{type:"button",value:i.cancel,class:this.classes(b.esriButton,b.esriButtonTertiary),onclick:this._closeEditBookmarkForm,bind:this}),h.tsx("input",{class:b.esriButton,type:"submit",value:i.save}))))},t.prototype._renderAddingBookmark=function(){return h.tsx("div",{key:"add-bookmark-form",class:b.authoringCard},h.tsx("form",{class:b.authoringForm,onsubmit:this._addBookmarkSubmit,bind:this},h.tsx("label",{class:b.authoringLabel},s.title,h.tsx("input",{required:!0,bind:this,class:this.classes(b.esriInput,this._invalidEntry?b.authoringInputInvalid:null),type:"text",afterCreate:this._storeAddInput,afterUpdate:this._focusAddInput,"data-node-ref":"_addInputNode",value:"",placeholder:s.addPlaceholder})),h.tsx("div",{class:this.classes(b.authoringActions)},h.tsx("input",{type:"button",value:i.cancel,class:this.classes(b.esriButton,b.esriButtonTertiary,b.authoringCancelButton),onclick:this._endAddBookmark.bind(this),bind:this}),h.tsx("input",{class:b.esriButton,type:"submit",value:i.add}))))},t.prototype._endAddBookmark=function(){this._focusAddBookmarkButton=!0,this.endAddBookmark()},t.prototype._bookmarksInitialized=function(){var o=this,t=this._handles;t.remove("bookmarks-init"),t.add(k.on(this,"viewModel.bookmarks","change",function(){return o._bookmarksChanged()}),"bookmarks-init")},t.prototype._bookmarksChanged=function(){var o=this,t=this.viewModel.bookmarks,e=this._handles;e.remove("bookmarks-change");var r=t.map(function(t){return k.watch(t,["active","name","thumbnail.url"],function(){return o.scheduleRender()})});e.add(r,"bookmarks-change"),this.scheduleRender()},t.prototype._showEditBookmarkForm=function(o){var t=o.currentTarget,e=t["data-bookmark"];this._addBookmark=!1,this._focusEditInputBox=!0,this._editBookmark=e,this.scheduleRender()},t.prototype._closeEditBookmarkForm=function(){this._invalidEntry=!1,this._editBookmark=null,this.scheduleRender()},t.prototype._addBookmarkSubmit=function(o){var t=this;o.preventDefault();var e=this,r=e._addInputNode,a=e.bookmarkCreationOptions,i=r&&r.value.trim();if(!i)return this._invalidEntry=!0,void this.scheduleRender();this._creatingBookmark=!0,this.scheduleRender(),this.viewModel.createBookmark(a).then(function(o){o.name=i,t.viewModel.bookmarks.add(o),t._endAddBookmark()})},t.prototype._editBookmarkSubmit=function(o){o.preventDefault();var t=this,e=t._editInputNode,r=t._editBookmark,a=e&&e.value.trim();if(!a)return this._invalidEntry=!0,void this.scheduleRender();r.name=a,this._closeEditBookmarkForm()},t.prototype._storeAddBookmarkButton=function(o){this._addBookmarkButtonNode=o,this._focusAddBookmark()},t.prototype._storeEditInput=function(o){this._editInputNode=o,this._focusEditInput()},t.prototype._storeAddInput=function(o){this._addInputNode=o,this._focusAddInput()},t.prototype._focusAddInput=function(){this._addInputNode&&this._focusAddInputBox&&(this._focusAddInputBox=!1,this._addInputNode.focus())},t.prototype._focusAddBookmark=function(){this._addBookmarkButtonNode&&this._focusAddBookmarkButton&&(this._focusAddBookmarkButton=!1,this._addBookmarkButtonNode.focus())},t.prototype._focusEditInput=function(){this._editInputNode&&this._focusEditInputBox&&(this._focusEditInputBox=!1,this._editInputNode.focus())},t.prototype._deleteBookmark=function(o){var t=o.currentTarget,e=t["data-bookmark"];this.viewModel.bookmarks.remove(e)},t.prototype._goToBookmark=function(o){var t=o.currentTarget,e=t["data-bookmark"];this.endAddBookmark(),this._closeEditBookmarkForm(),this.viewModel.goTo(e)},r([l.property()],t.prototype,"bookmarkCreationOptions",void 0),r([l.aliasOf("viewModel.bookmarks")],t.prototype,"bookmarks",void 0),r([h.renderable(),l.property()],t.prototype,"editingEnabled",void 0),r([l.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),r([l.property()],t.prototype,"iconClass",void 0),r([l.property()],t.prototype,"label",void 0),r([l.aliasOf("viewModel.view")],t.prototype,"view",void 0),r([l.property({type:c}),h.renderable(["activeBookmark","state","bookmarks"]),h.vmEvent(["select-bookmark"])],t.prototype,"viewModel",void 0),r([l.property(),h.renderable()],t.prototype,"visibleElements",void 0),r([l.cast("visibleElements")],t.prototype,"castVisibleElements",null),r([l.property()],t.prototype,"endAddBookmark",null),r([l.property()],t.prototype,"startAddBookmark",null),t=r([l.subclass("esri.widgets.Bookmarks")],t)}(l.declared(m))});