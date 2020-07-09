// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/promise/all","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","dojo/on","dojo/keys","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","./config","./playerSupports/_CommandSupport","./playerSupports/_LogoSupport","./playerSupports/_MapSupport","./playerSupports/_PageNavigationSupport","./playerSupports/_PrintSupport","./playerSupports/_ReportContainersSwitcher","./playerSupports/_SmartLayoutSupport","./playerSupports/_ZoomSupport","./playerSupports/_WaitingSupport","./supportClasses/PlayerConfigurator","./supportClasses/PlayerToFullScreenAnimator","./toolbar/PlayerToolbar","./ReportPlayerViewModel","./PlayerResizeModes","./PlayerThemes","./PlayerViewModes","./ReportPlayerState","./PlayerZoomBehaviors","./DataProviderGE","esri/dijit/geoenrichment/utils/DelayUtil","esri/dijit/geoenrichment/utils/DeviceUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/InvokeUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","dojo/text!./templates/ReportPlayer.html","dojo/i18n!esri/nls/jsapi","./_devConfig"],(function(e,t,r,i,o,n,s,a,l,h,d,p,u,_,c,g,A,y,f,S,w,m,v,D,P,C,R,M,T,b,E,I,F,V,B,O,L,x){return e([l,h,p,u,_,g,A,y,f,c,S],{templateString:O,nls:L=L.geoenrichment.dijit.ReportPlayer.ReportPlayer,dataProvider:null,exportCommands:null,config:null,theme:void 0,viewMode:void 0,enableDataDrilling:void 0,showToolbarInPopup:void 0,showAreaTitle:void 0,scaleSlidesToFitWindow:void 0,showCloseButton:!1,showToFullScreenAnimation:!1,allowAutoOrientation:!0,mobileLandscapeViewMode:void 0,canAddMoreAreas:!1,areasSelectButtons:null,resizeMode:void 0,printConfig:{subtitle:L.preparedByEsri,printDialogClass:"esri/dijit/geoenrichment/ReportPlayer/printing/PageOptionsDialog/PageOptionsDialog"},showProgressBar:!0,defaultZoomBehavior:void 0,nlsMap:null,isDataDrillingPlayer:!1,isPlayerOnServer:!1,_viewModel:null,_reportData:null,_analysisAreaIndex:0,_originalAreaViewMode:null,_showAllAreasSideBySide:!1,playerToolbar:null,postCreate:function(){this.config=t.mixin(d,this.config),d.isPlayerOnServer=this.isPlayerOnServer,this.isPlayerOnServer&&(this.defaultZoomBehavior=T.RESET),this._viewModel=new(this._getViewModelClass()),this._setUpDataProvider(),w.configurePlayer(this),!this.isPlayerOnServer&&this._initToolbar(),this._initContainerSwither(),!this.isPlayerOnServer&&this._initSmartLayout(),!this.isPlayerOnServer&&this._initCommands(),!this.isPlayerOnServer&&this._initPageNavigationControls(),!this.isPlayerOnServer&&this._initZoomControls(),!this.isPlayerOnServer&&this._applyTheme(),!this.isPlayerOnServer&&this._showError(!1),!this.isPlayerOnServer&&this._initProgressController(),I.isMobileDevice()&&(a.add(this.domNode,"esriGEReportPlayerMobile"),this._setUpMobileOrientationHandling())},_setUpDataProvider:function(){this.dataProvider=this.dataProvider||new b,this.exportCommands&&this.exportCommands.forEach((function(e){this.dataProvider.registerCommand(e)}),this)},_orientationDfd:null,_setUpMobileOrientationHandling:function(){var e=this;this.allowAutoOrientation&&this.own(n(window,"orientationchange",(function(){e._orientationDfd&&e._orientationDfd.resolve("cancel");var t=e._orientationDfd=new i;e._showWaiting(t.promise,"orientationchange"),t.promise.then((function(t){"cancel"!==t&&(e._setViewMode(e.viewMode),e.refresh())})),o(e.getRenderPromise(),(function(){E.delay(500).then(t.resolve,t.resolve)}))})))},_getViewModelClass:function(){return D},_setViewMode:function(e){this.viewMode=e,this.defaultZoomBehavior=null,w.configurePlayer(this),this._refreshZoomControls()},_initToolbar:function(){var e=this;this.playerToolbar=new v({player:this,popupButtonDiv:this.playerAfterToolbarDiv,showToolbarInPopup:this.showToolbarInPopup,showAreaTitle:this.showAreaTitle,stretchToolbarNode:!this.showToolbarInPopup&&(this.resizeMode===P.FIT_WINDOW?document.body:this.domNode),showCloseButton:this.showCloseButton,canAddMoreAreas:this.canAddMoreAreas,areasSelectButtons:this.areasSelectButtons,onShowAnalysisAreaAt:function(t){e.showAnalysisAreaAt(t)},onCompareAreasSideBySide:function(){e._showAllAnalysisAreasSideBySide()},onShowPageAt:function(t){e.showPageAt(t)},isScrollShown:function(){var t=e.getCurrentReportContainer();return t&&t.isScrollShown&&t.isScrollShown()},onClose:function(){e._onClose()},onAddMoreAreas:function(){e.onAddMoreAreas()},onRemoveAreas:function(t){if(e.onAreasPreRemoved(t),t.forEach((function(e){e.hidden=!0})),e.viewMode===R.PANELS_IN_STACK_ALL)if(e.getAnalysisAreas().filter((function(e){return!e.hidden})).length<2)e._setAllAreasVisible(!1);else{var r={};t.forEach((function(e){r[e.index]=!1})),e.getCurrentReportContainer().setAreasVisibilityState(r,{append:!0}),e._updateAreaSelect()}else if(e.getCurrentAnalysisArea().hidden){var i=e.getAnalysisAreas().filter((function(e){return!e.hidden}))[0];i?e.showAnalysisAreaAt(i.index):e.refresh()}else e._updateAreaSelect();e.onAreasRemoved(t)}}).placeAt(this.playerToolbarDiv),this.own(this.playerToolbar),this.showCloseButton&&this.own(n(window,"keyup",(function(t){e.getWaitingPromise()||M.isViewingDataDrillingZoom||M.isImageViewerShown||t.keyCode===s.ESCAPE&&e._onClose()}))),F.hide(this.playerToolbarDiv)},_applyTheme:function(){a.remove(this.domNode,"playerThemeDark playerThemeLight"),a.add(this.domNode,this.theme===C.DARK?"playerThemeDark":"playerThemeLight"),this.playerToolbar.setTheme(this.theme)},playReport:function(e,t){return this._showWaiting(this._callAfterRendering("_doPlayReport",[e,t]),"playReport")},_doPlayReport:function(e,t){this.playerToolbar&&this.playerToolbar.closePopup();var r=this;return this._showError(!1),this._progressController&&this._progressController.reset(),this.showToFullScreenAnimation&&this.resizeMode===P.FIT_WINDOW&&m.animateTo(this),this.dataProvider._onCreateReportStarted=function(){r._viewModel.preInitialize()},this._viewModel.reset(),o(this.dataProvider.getReportData(e,{progressCallback:function(e){r._progressController&&r._progressController.setLoadDataProgress(e)}}),(function(e){if(r.viewMode===R.PANELS_IN_STACK_ALL){var i=e.analysisAreas.length>1&&!e.isMultiFeature,o=r.viewMode;i?r._originalAreaViewMode||(r._showAllAreasSideBySide=!0,r._originalAreaViewMode=w.getDefaultViewMode(r)):(r._showAllAreasSideBySide=!1,o=r._originalAreaViewMode||w.getDefaultViewMode(r)),r._setViewMode(o)}return r.setReportData(e,t)}),(function(e){r._showError(e)}))},refresh:function(e){return this._reportData&&o(this.setReportData(this._reportData,{waitUntilAllContentIsReady:!(!e||!e.waitUntilAllContentIsReady)}),function(){return this.showPageAt(0),this.resize()}.bind(this))},_isDataBeingSetFlag:!1,_notifyShownPendingFlag:!1,setReportData:function(e,t){return this._showWaiting(this._callAfterRendering("_doSetReportData",[e,t]),"setReportData")},_doSetReportData:function(e,t){var r=this;if(t=t||{},this._reportData=e,F.show(this.playerToolbarDiv),e&&!x.emulateErrors.emptyDataProviderResponse){this._isDataBeingSetFlag=!0,M.isAnimationSuspended=!0,this.onSetReportDataStart();var n=new i;return this._viewModel.setAnimationAllowed(!t.disableAnimation),this._configureViewModel(e),s(0).then((function(){if(1===e.analysisAreas.length||e.isMultiFeature)r._destroyAllContainers(),r._resetMapBuilder(),r._applyReportData({analysisAreaIndex:0,rerenderContent:!0}).then(n.resolve,n.reject);else{!1!==t._resetLoadedContents&&(r._destroyAllContainers(),r._resetMapBuilder());var i=e.analysisAreas.length-1;!function t(){for(;i>=0&&e.analysisAreas[i].hidden;)i--;i<0?n.resolve():r._applyReportData({analysisAreaIndex:i--,rerenderContent:!1,isFinalArea:i<0}).then((function(){s(0).then(t)}),n.reject)}()}})),this._progressController&&this._progressController.setNumAreas(e.analysisAreas.length),this._progressController&&this._progressController.setLoadDataProgress(1),n.promise.then((function(){return r._progressController&&r._progressController.finalize()})).otherwise((function(e){r._showError(e)})).always((function(){var e=r.getCurrentReportContainer();if(e&&e.domNode)return s(300).then((function(){if(r._isDataBeingSetFlag=!1,r._notifyShownPendingFlag=!F.isNodeInLayout(r.domNode),M.isAnimationSuspended=r.isPlayerOnServer,r.onSetReportDataEnd(),r._emitPendingResizedEvent(),r._progressController&&r._progressController.reset(),t.waitUntilAllContentIsReady)return r.getRenderPromise()}))}))}function s(e){return r.isPlayerOnServer?o():E.delay(e)}this._showError(!0)},showAnalysisAreaAt:function(e){return this._callAfterRendering("_doShowAnalysisAreaAt",[e])},_doShowAnalysisAreaAt:function(e){var t=this;return o(this._setAllAreasVisible(!1),(function(){if(t._analysisAreaIndex!==e&&t.getAnalysisAreas()[e]&&!t.getAnalysisAreas()[e].hidden)return t._applyReportData({analysisAreaIndex:e,rerenderContent:!1})}))},_showAllAnalysisAreasSideBySide:function(){return this._callAfterRendering("_doShowAllAnalysisAreasSideBySide")},_doShowAllAnalysisAreasSideBySide:function(){return this._setAllAreasVisible(!0)},_setAllAreasVisible:function(e){if(this._showAllAreasSideBySide!==e)return e?(this._showAllAreasSideBySide=!0,this._originalAreaViewMode=this.viewMode===R.PANELS_IN_STACK_ALL?w.getDefaultViewMode(this):this.viewMode,this._setViewMode(R.PANELS_IN_STACK_ALL)):(this._showAllAreasSideBySide=!1,this._setViewMode(this._originalAreaViewMode),this._originalAreaViewMode=null),this.refresh()},_applyReportData:function(e){var t=this;e=e||{};var r=this._reportData&&this._reportData.isMultiFeature?0:e.analysisAreaIndex||0,i=!1!==e.rerenderContent;if(this._analysisAreaIndex=r,this._showError(!this._reportData),this._reportData)return o(this._viewModel.initialize(!this._reportData.reportObject.isGraphicReport,this.viewMode),(function(){return t._setReportContainer(i)?t._doApplyTemplateJson({analysisAreaIndex:r,isFinalArea:e.isFinalArea}):t._updateAreaSelect()}))},_doApplyTemplateJson:function(e){var r=this,i=this.getCurrentReportContainer(),n=t.clone(this._reportData.templateJson);x.emulateErrors.emptyTemplateJson&&(n.sectionsTables.length=0);var s=i.fromJson(n,{waitUntilAllContentIsReady:!0,progressCallback:function(t){r._progressController&&r._progressController.setProgressForAreaAt(t,e.analysisAreaIndex)},analysisAreaIndex:e.analysisAreaIndex,isFinalArea:e.isFinalArea,renderSync:this.isPlayerOnServer}),a=i.getPagePromise?i.getPagePromise():s,l=i.getContentPromise?i.getContentPromise():s;return this._registerContainerLoadPromise(l||a),this._updateAreaSelect(),o(a,(function(){return r._setCurrentContainerLoaded(),r.showPageAt(r._currentPageIndex),r.resize()}))},_updateAreaSelect:function(){this.playerToolbar&&this.playerToolbar.updateAreaSelect({analysisAreas:this._reportData.analysisAreas,combinedAreasInfo:this._reportData.combinedAreasInfo,currentAreaIndex:this._showAllAreasSideBySide?"all":this.getCurrentAnalysisAreaIndex(),isMultiFeature:this._reportData.isMultiFeature})},getReportData:function(){return this._reportData},getReportTitle:function(){return this._reportData&&this._reportData.reportTitle||""},getCurrentAnalysisAreaIndex:function(){return this._analysisAreaIndex},getCurrentAnalysisArea:function(){return this._reportData&&this._reportData.analysisAreas[this._analysisAreaIndex]},getAnalysisAreas:function(){return this._reportData&&this._reportData.analysisAreas},reportDataToJson:function(e){return this._showWaiting(this.dataProvider.reportDataToJson(this.getReportData(),e),"reportDataToJson")},reportDataFromJson:function(e,t){var r=this;return this._showError(!1),this._showWaiting(o(this.dataProvider.reportDataFromJson(e),(function(e){return r.setReportData(e,t)})),"reportDataFromJson")},_configureViewModel:function(e){this._viewModel.setTheme(this._reportData.templateJson.theme),this._viewModel.enableDataDrilling=!this.isPlayerOnServer&&this.enableDataDrilling,this._viewModel.setDynamicReportInfo({fieldData:this._reportData.fieldData,analysisAreas:this._reportData.analysisAreas,combinedAreasInfo:this._reportData.combinedAreasInfo,infographicOptions:this._reportData.infographicOptions,attachmentsStore:this._reportData.attachmentsStore,createMapFunc:t.hitch(this,this._createMap),reportObject:this._reportData.reportObject,isMultiFeature:this._reportData.isMultiFeature,isFixedDataMode:!this._reportData.config.geoenrichmentUrl,geClient:this._reportData.geClient,templateVariableProvider:this._reportData.templateVariableProvider,countryID:this._reportData.config.countryID,hierarchy:this._reportData.config.hierarchy,templateJson:this._reportData.templateJson}),this._viewModel.getDynamicImageFunc=t.hitch(this,this._getReportLogo)},notifyShown:function(){!this._isDataBeingSetFlag&&this._notifyShownPendingFlag&&(this.getCurrentReportContainer()&&this.getCurrentReportContainer().notifyShown(),this._notifyShownPendingFlag=!1)},_isErrorShown:!1,_showError:function(e){x.emulateErrors.playerError&&(e=!0),F[e?"hide":"show"](this.printableDivContainer),F[e?"show":"hide"](this.errorViewDiv),a[e?"add":"remove"](this.domNode,"esriGEReportPlayerError"),this._isErrorShown=!!e,e?(F.hide(this.sidePageNavigator),F.show(this.playerToolbarDiv),this.playerToolbar&&this.playerToolbar.setErrorShown(!0),this._progressController&&this._progressController.reset(),console.log(e),this.onError(e)):this.playerToolbar&&this.playerToolbar.setErrorShown(!1)},isErrorShown:function(){return this._isErrorShown},setPrintMode:function(e){a[e?"add":"remove"](this.domNode,"esriGEReportPlayerInPrinting")},resize:function(e,t){this._resize({width:e,height:t}),this._updatePageNavigator(),this._updateZoomControls(),this.playerToolbar&&this.playerToolbar.update()},_pendingResizeEvent:null,_emitResizedEvent:function(e){this._pendingResizeEvent={isPaginating:!!e},this._isDataBeingSetFlag||this._emitPendingResizedEvent()},_emitPendingResizedEvent:function(){this._pendingResizeEvent&&(this.onResized(this._pendingResizeEvent.isPaginating),this._pendingResizeEvent=null)},_onClose:function(){var e;this.showToFullScreenAnimation&&this.resizeMode===P.FIT_WINDOW&&(e=m.animateFrom(this)),o(e,function(){this.onClose()}.bind(this))},getVisualState:function(){return{type:"reportPlayer",viewMode:this.viewMode,reportContainers:this.getAllReportContainers().map((function(e){return e.getVisualState&&e.getVisualState()}))}},setVisualState:function(e){return this._callAfterRendering("_doSetVisualState",[e])},_doSetVisualState:function(e){var t=e&&this.getAllReportContainers().map((function(t,r){return t.setVisualState&&t.setVisualState(e.reportContainers[r])}));return r(t)},_renderQueue:null,getRenderPromise:function(){return this._renderQueue&&this._renderQueue.getPromise()},_registerContainerLoadPromise:function(e){this._renderQueue=this._renderQueue||new B,this._renderQueue.add(e),this.playerToolbar&&this.playerToolbar.setContentLoadPromise(this.getRenderPromise())},_safeFuncCaller:null,_callAfterRendering:function(e,t){if(this.isPlayerOnServer)return this[e].apply(this,t);var r=this;return this._safeFuncCaller=this._safeFuncCaller||{},this._safeFuncCaller[e]=function(){return r[e].apply(r,t)},o(this.getRenderPromise(),(function(){return V.invoke(r._safeFuncCaller,e)}))},onSetReportDataStart:function(){},onSetReportDataEnd:function(){},onResized:function(e){},onClose:function(){},onError:function(e){},onAddMoreAreas:function(){},onAreasPreRemoved:function(e){},onAreasRemoved:function(e){}})}));