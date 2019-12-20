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

define(["../core/domUtils","../core/promiseUtils","../symbols/PictureMarkerSymbol","../symbols/support/symbolUtils","../symbols/WebStyleSymbol","./ColorPicker","./support/colorUtils","./SymbolStyler/_DelayedUpdate","./SymbolStyler/IconSelect","./SymbolStyler/MarkerSymbolPicker","./SymbolStyler/support/schemeUtils","./SymbolStyler/support/stylerUtils","./SymbolStyler/support/symbolUtils","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dijit/a11yclick","dijit/form/CheckBox","dijit/form/ComboBoxMixin","dijit/form/NumberTextBox","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/number","dojo/on","dojo/i18n!./SymbolStyler/nls/SymbolStyler","dojo/text!./SymbolStyler/templates/SymbolStyler.html","./HorizontalSlider","./SymbolStyler/MarkerSymbolPicker","./SymbolStyler/ColorRampPicker","dijit/form/Button","dijit/form/ComboBox","dijit/form/NumberSpinner","dijit/form/Select","dijit/form/TextBox","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/StackController","dijit/layout/StackContainer"],function(e,t,i,o,l,s,n,r,a,d,h,p,_,m,c,u,g,b,S,C,y,f,P,x,k,I,T){function z(t){y.remove(e.getNode(t),L.hidden)}function O(t){y.add(e.getNode(t),L.hidden)}var v=_.is3d,L={root:"esri-symbol-styler",symbolPreviewContainer:"esri-symbol-preview-container",symbolPreview:"esri-symbol-preview",tabBar:"esri-tab-bar",content:"esri-content",link:"esri-link",label:"esri-label",shapeImageUrlContainer:"esri-shape-image-url-container",urlInput:"esri-url-input",addIcon:"esri-add-icon",errorDisplay:"esri-error-display",symbolSizeInput:"esri-symbol-size-input",inlineInput:"esri-inline-input",inlineInputContainer:"esri-symbol-styler__inline-input-container",text:"esri-text",hidden:"esri-hidden",lineWidthInput:"esri-line-width-input",linePattern:"esri-line-pattern",linePatternInput:"esri-line-pattern-input",alt:"esri-alt",disabled:"esri-disabled"};return c.createSubclass([m,u,r],{declaredClass:"esri.widgets.SymbolStyler",baseClass:L.root,templateString:T,labels:I,css:L,constructor:function(){this._tabOptions={},this._delayedCommitPropsTrigger=this.createUpdateTrigger(this._commitProperties,this),this._initOptimizationControls()},postCreate:function(){this.inherited(arguments),this._setUpComboBox();var e=a.prototype.baseClass,t=new a({baseClass:e+" "+L.root+" "+L.linePatternInput},this.dap_linePatternSelect);this._linePatternSelect=t,O(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.set("placeholder",I.imageUrlInputPlaceholder),this._lineWidthTextBox.selectOnClick=!0,this.dap_shapeSizeTextBox.selectOnClick=!0,this.dap_lineWidthSlider.intermediateChanges=!0,this._lineWidthTextBox.intermediateChanges=!0,this.dap_shapeSizeSlider.intermediateChanges=!0,this.dap_shapeSizeTextBox.intermediateChanges=!0,this.dap_fillColorPicker.trackColors=!1,this.dap_outlineColorPicker.trackColors=!1,this._linePatternSelect.addIconOptions(["solid","dot","dash","dash-dot","long-dash-dot-dot"],L.linePattern),this._importRecentColors(),this.dap_outlineColorPicker._enableTransparencySlider=function(){},this.dap_outlineColorPicker._disableTransparencySlider=function(){}},startup:function(){this.inherited(arguments);var e=new d(this._getSymbolPickerParams(),this.dap_symbolPicker);e.startup(),this._symbolPicker=e,this._addHandlers()},destroy:function(){f.empty(this.dap_symbolPreview),f.destroy(this._optimizationSection),this._optimizationCheckBox.destroy(),this.dap_shapeContainer.destroy(),this.dap_fillContainer.destroy(),this.dap_outlineContainer.destroy(),this.inherited(arguments)},_RECENT_FILL_COLORS_ITEM_KEY:"symbolStyler/recent/fill/colors",_RECENT_OUTLINE_COLORS_ITEM_KEY:"symbolStyler/recent/outline/colors",_defaultMinLineWidthInPx:0,_defaultMinShapeSizeInPx:1,_defaultMaxLineWidthInPx:18,_defaultMaxShapeSizeInPx:120,_originalSymbol:null,_editedSymbol:null,_activeTabName:null,_externalSizing:!1,_delayedCommitPropsTrigger:null,_linePatternSelect:null,_symbolPicker:null,_customImageSymbol:null,_optimizationSection:null,_optimizationCheckBox:null,_isPreppingEdit:null,_hasSymbolBeenModified:null,shapeSymbol:null,_setShapeSymbolAttr:function(e){this._adjustOutlineProperties(this._editedSymbol,e),this._set("shapeSymbol",e),this._editedSymbol=e,this._updateTabs(e),this._toggleOutlineColorControls(e),this._delayedCommitPropsTrigger()},shapeSize:null,_setShapeSizeAttr:function(e){this._set("shapeSize",e),this._delayedCommitPropsTrigger()},_shapeImageUrl:null,_setShapeImageUrlAttr:function(e){this._set("shapeImageUrl",e),this._delayedCommitPropsTrigger()},fillColor:null,_setFillColorAttr:function(e){this._set("fillColor",e),this._delayedCommitPropsTrigger()},fillColorRamp:null,_setFillColorRampAttr:function(e){this._set("fillColorRamp",e),this._delayedCommitPropsTrigger()},outlineColorRamp:null,_setOutlineColorRampAttr:function(e){this._set("outlineColorRamp",e),this._delayedCommitPropsTrigger()},outlineWidth:null,_setOutlineWidthAttr:function(e){this._set("outlineWidth",e),this._delayedCommitPropsTrigger()},outlineColor:null,_setOutlineColorAttr:function(e){var t=!!this._optimizationOptions&&this._optimizationCheckBox.checked;e&&t&&(e.a=.5,this.dap_outlineColorPicker.set("color",e,!1)),this._set("outlineColor",e),this._delayedCommitPropsTrigger()},outlinePattern:null,_setOutlinePatternAttr:function(e){this._set("outlinePattern",e),this._delayedCommitPropsTrigger()},mode:"2d",_setModeAttr:function(e){var t="2d"===e;this._set("mode",e),this.dap_linePatternSelect.hidden=!t,this.dap_linePatternSelectLabel.hidden=!t,this.dap_useImageContent.hidden=!t},portal:null,previewVisible:!0,_setPreviewVisibleAttr:function(e){this._set("previewVisible",e),this.dap_symbolPreviewContainer.hidden=!e,this._editedSymbol&&this._delayedCommitPropsTrigger()},edit:function(e,i){("web-style"===e.type?e.fetchSymbol():t.resolve(e.clone())).then(_.ensureProps).then(function(t){var o;if(i=i||{},o=i.colorRamp,v(t)&&"3d"!==this.mode||!v(t)&&"2d"!==this.mode)throw new Error("symbol-styler:incompatible-symbol-edit","tried to edit a symbol with an incompatible mode",{symbol:t,mode:this.mode});this._isPreppingEdit=!0,this._colorRamp=o,this._originalSymbol=e,this._editedSymbol=t,this._hasSymbolBeenModified=!1,this._activeTabName=i.activeTab,this._externalSizing=i.externalSizing,this._tabOptions=i.tabOptions||{},this._optimizationOptions="boolean"==typeof i.optimizeOutline?{value:i.optimizeOutline}:void 0,this._setUpColorControls(i.schemes,o),this._assimilateSymbol(t),this._toggleSizingControls(this._externalSizing),this._updateSymbolPicker(i),this._toggleOutlineColorControls(t),this._toggleOptimizationOptions();var l=_.hasExtrudeSymbolLayer(t)||_.hasTextSymbolLayer(e)?this.dap_fillContainer:this.dap_shapeContainer;f.place(this.dap_shapeSizeControls,l.domNode,"last")}.bind(this))},getStyle:function(){var e,t,i=this._editedSymbol.clone(),o={};return o.symbol=!this._hasSymbolBeenModified&&i.styleOrigin?new l({name:i.styleOrigin.name,styleUrl:i.styleOrigin.styleUrl,styleName:i.styleOrigin.styleName,portal:i.styleOrigin.portal}):i,this._colorRamp&&(e=_.isLine(i)||_.isPoint(i,"2d")&&_.hasPureOutlineStyle(i),t=e?this.dap_outlineColorRampPicker:this.dap_fillColorRampPicker,o.colorRamp=t.get("selected").colors),this._optimizationOptions&&(o.optimizeOutline=this._optimizationCheckBox.checked),o},storeColors:function(){this._storeRecentColors(this.dap_fillColorPicker,this._RECENT_FILL_COLORS_ITEM_KEY),this._storeRecentColors(this.dap_outlineColorPicker,this._RECENT_OUTLINE_COLORS_ITEM_KEY)},_initOptimizationControls:function(){var e=new b,t=f.create("div",{className:s.prototype.css.section});f.create("label",{for:e.id,className:L.label,innerHTML:I.autoAdjustOutline},t),e.on("change",function(e){var t=this.dap_outlineColorPicker.get("color");t.a=e?.5:1,this.dap_outlineColorPicker.set("color",t),this._delayedCommitPropsTrigger()}.bind(this)),e.placeAt(t,"first"),this._optimizationSection=t,this._optimizationCheckBox=e},_toggleOutlineColorControls:function(e){var t=this.dap_outlineColorRampPicker,i=this.dap_outlineColorPicker;this._shouldShowOutlineColorRamp(e)?(z(t),O(i)):(z(i),O(t))},_shouldShowOutlineColorRamp:function(e){var t=_;return this._colorRamp&&t.isLine(e)||t.isPoint(e,"2d")&&t.hasPureOutlineStyle(e)},_setUpColorControls:function(e,t){var i,o=this.dap_outlineColorRampPicker,l=this.dap_outlineColorPicker,s=this.dap_fillColorRampPicker,n=this.dap_fillColorPicker;if(t)return i={colors:t.colors},t.scheme&&(i.scheme=t.scheme),_.isLine(this._editedSymbol)?(o.set({numStops:t.numStops,schemes:e,selected:i}),O(l),void z(o)):(_.isPoint(this._editedSymbol,"2d")&&o.set({numStops:t.numStops,schemes:e,selected:i}),s.set({numStops:t.numStops,schemes:e,selected:i}),z(s),z(l),O(n),O(o),void l.set("suggestedColors",h.getOutlineColors(e)));z(n),z(l),O(s),O(o),this._updateSuggestedColors(n,h.getFillColors(e)),this._updateSuggestedColors(l,h.getOutlineColors(e))},_toggleOptimizationOptions:function(){var e=this._optimizationOptions,t=this._optimizationSection;_.isPolygon(this._editedSymbol,"2d")&&e?(this._optimizationCheckBox.set("value",e.value),f.place(t,this.dap_outlineColorPicker.dap_recentColorSection)):t.parentNode&&f.empty(t.parentNode)},_importRecentColors:function(){this.dap_fillColorPicker.loadRecentColors(this._RECENT_FILL_COLORS_ITEM_KEY),this.dap_outlineColorPicker.loadRecentColors(this._RECENT_OUTLINE_COLORS_ITEM_KEY)},_toggleSizingControls:function(e){var t=!1,i=!1;e&&(_.isLine(this._editedSymbol)?i=!0:t=!0),this._toggleLabeledControls({labels:this.dap_lineWidthLabel,controls:[this._lineWidthTextBox,this.dap_lineWidthSlider],disabled:i}),this._toggleLabeledControls({labels:this.dap_shapeSizeLabel,controls:[this.dap_shapeSizeTextBox,this.dap_shapeSizeSlider],disabled:t})},_toggleLabeledControls:function(e){var t=[].concat(e.labels),i=[].concat(e.controls),o=e.disabled;t.forEach(function(e){y.toggle(e,L.disabled,o)}),i.forEach(function(e){p.toggleControl(e,o)})},_updateSymbolPicker:function(e){var t=!!this._tabOptions.symbolDisplayMode,i=t?this._tabOptions.symbolDisplayMode:_.isPoint(this._editedSymbol,"2d")&&this._colorRamp?"default":"portal";this.dap_useImageContent.hidden="3d"===this.mode||"portal"!==i,this._symbolPicker.set({displayMode:i,symbolSource:_.getSymbolSource(this._editedSymbol),filters:e.filters}),this._symbolPicker.refresh({freshStorage:e.freshStorage})},_adjustOutlineProperties:function(e,t){var i,o,l,s=this.dap_fillColorPicker,r=this.dap_outlineColorPicker,a=this.dap_fillColorRampPicker,d=this.dap_outlineColorRampPicker;if(_.switchedFromRasterToVectorSymbol(e,t))return s.set("color",t.color),i=_.getOutline(t),r.set("color",i.color),this._lineWidthTextBox.set("value",i.size),void this._linePatternSelect.set("value",i.style);if(_.switchedFromPureOutline(e,t)&&this._colorRamp)return void a.set("selected",d.get("selected"));if(_.switchedToPureOutline(e,t)){if(this._colorRamp)return void d.set("selected",a.get("selected"));if(i=_.getOutline(e),l=r.get("color"),!i.color)return void r.set("color",t.color);o=n.isBright(i.color),o&&i.color.a<.2?(l.a=.2,r.set("color",l)):!o&&i.color.a<.1&&(l.a=.1,r.set("color",l))}},_getTabContainer:function(e){return"fill"===e?this.dap_fillContainer:"outline"===e?this.dap_outlineContainer:this.dap_shapeContainer},_storeRecentColors:function(e,t){var i=e;i.addRecentColor(i.get("color")),i.saveRecentColors(t)},_addHandlers:function(){this._linePatternSelect.on("change",function(e){this._markAsModified(),this.set("outlinePattern",e)}.bind(this)),this.own(k(this.dap_loadShapeImageUrl,g,function(){this._markAsModified(),this._loadImage(this.dap_shapeImageUrlInput.get("value"))}.bind(this))),this.own(k(this.dap_addImage,g,function(){z(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.focus()}.bind(this))),this.dap_shapeImageUrlInput.on("input",function(e){e.keyCode===P.ENTER&&(this._markAsModified(),this._loadImage(this.dap_shapeImageUrlInput.get("value")))}.bind(this)),this.dap_shapeImageUrlInput.on("change",function(e){this._markAsModified(),this.set("shapeImageUrl",e)}.bind(this)),this.dap_fillColorPicker.on("color-change",function(e){this._markAsModified(),this.set("fillColor",e.color)}.bind(this)),this.dap_fillColorRampPicker.on("color-ramp-change",function(e){this._markAsModified(),this.set("fillColorRamp",e.colors)}.bind(this)),this.dap_outlineColorRampPicker.on("color-ramp-change",function(e){this._markAsModified(),this.set("outlineColorRamp",e.colors)}.bind(this)),this.dap_outlineColorPicker.on("color-change",function(e){this._markAsModified();var t=e.color;!this.outlineColor&&t&&0===this.outlineWidth||null===this.outlineWidth?this._lineWidthTextBox.set("value",1):this.outlineColor&&!t&&this._lineWidthTextBox.set("value",0),this.set("outlineColor",t)}.bind(this)),p.bindSliderAndTextBox(this.dap_lineWidthSlider,this._lineWidthTextBox),p.bindSliderAndTextBox(this.dap_shapeSizeSlider,this.dap_shapeSizeTextBox),this._symbolPicker.on("symbol-select",function(e){this._hideImageUrlInput(),this.set("shapeSymbol",e.selection)}.bind(this)),this.dap_shapeSizeTextBox.on("change",function(e){this._markAsModified(),this.set("shapeSize",e)}.bind(this)),this.dap_fillColorPicker.on("color-change",function(e){this._markAsModified(),this.set("fillColor",e.color)}.bind(this)),this.dap_outlineColorPicker.on("color-change",function(e){this._markAsModified(),this.set("outlineColor",e.color)}.bind(this)),this._lineWidthTextBox.on("change",function(e){this._markAsModified(),this.set("outlineWidth",e)}.bind(this))},_markAsModified:function(){this._hasSymbolBeenModified=!this._isPreppingEdit},_setUpComboBox:function(){var e=C.createSubclass([S]),t=[1,1.2,1.5,2,3,4,5,6,7,8,9,10],i=document.createDocumentFragment();t.forEach(function(e){i.appendChild(f.create("option",{innerHTML:x.format(e)}))}),this.dap_lineWidthTextBox.appendChild(i),this._lineWidthTextBox=new e({},this.dap_lineWidthTextBox)},_loadImage:function(e){this._clearUrlImageErrorDisplay(),_.testImageUrl(e).then(function(t){var o=this._customImageSymbol,l=this.shapeSize;t=_.preserveAspectRatio({dimensions:t,targetDimension:"width",targetSize:l}),o?(o.url=e,o.height=t.height,o.width=t.width):(o=new i(e,t.width,t.height),this._customImageSymbol=o),this._symbolPicker.addCustomImageSymbol(o),this.set("shapeSymbol",o)}.bind(this)).catch(function(){this.dap_shapeImageUrlErrorDisplay.innerHTML=I.imageLoadError}.bind(this))},_clearUrlImageErrorDisplay:function(){this.dap_shapeImageUrlErrorDisplay.innerHTML=""},_getActiveTabAttr:function(){var e=this.dap_stackContainer.selectedChildWidget;return e===this.dap_outlineContainer?"outline":e===this.dap_fillContainer?"fill":"shape"},_updateTabs:function(e){var t=_.getApplicableTabs(e,this._tabOptions.excluded),i=this.dap_stackContainer,o=0;Object.keys(t).forEach(function(e,l){var s=t[e],n=this._getTabContainer(e);"disabled"===s.state&&p.disable(n),"enabled"===s.state&&p.enable(n),"excluded"===s.state?n.domNode.parentNode&&i.removeChild(n):(n.domNode.parentNode||i.addChild(n,o),o++)},this),1===i.getChildren().length?O(this.dap_stackController.domNode):z(this.dap_stackController.domNode),this._supportsPattern(e)?(z(this.dap_linePatternSelectLabel),z(this._linePatternSelect.domNode)):(O(this.dap_linePatternSelectLabel),O(this._linePatternSelect.domNode));var l=this._getTabContainer(this._activeTabName);this.dap_stackContainer.getIndexOfChild(l)>-1&&this.dap_stackContainer.selectChild(l),p.ensureEnabledChildSelection(this.dap_stackContainer)},_supportsPattern:function(e){return _.isLine(e,"2d")||_.isPolygon(e,"2d")},_syncControls:function(e){var t,i;this._hideImageUrlInput(),this._updateSizingControls();var o=_.getApplicableTabs(e,this._tabOptions.excluded);if("enabled"===o.shape.state&&(t=_.getMarkerLength(e),this.set("shapeSize",t),p.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeSlider,t),p.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeTextBox,t)),"enabled"===o.fill.state){var l=_.getFillColor(e);this.set("fillColor",l),this.dap_fillColorPicker.set("color",l,!1),(_.hasExtrudeSymbolLayer(e)||_.hasTextSymbolLayer(e))&&(t=_.getMarkerLength(e),this.set("shapeSize",t),p.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeSlider,t),p.silentlyUpdateIntermediateChangingValueWidget(this.dap_shapeSizeTextBox,t))}"enabled"===o.outline.state&&(i=_.getOutline(e))&&(this.set({outlineColor:i.color,outlineWidth:i.size,outlinePattern:i.style}),this.dap_outlineColorPicker.set("color",i.color,!1),p.silentlyUpdateIntermediateChangingValueWidget(this.dap_lineWidthSlider,i.size),p.silentlyUpdateIntermediateChangingValueWidget(this._lineWidthTextBox,i.size),this._linePatternSelect.set("value",i.style,!1))},_updateSizingControls:function(){var e=this._editedSymbol,t=_.is3d(e),i=_.getOutlineUnit(e),o=_.getSizeUnit(e),l=_.getOutline(e),s=_.getMarkerLength(e),n=t&&"meters"===i?99999999:l&&l.size>this._defaultMaxLineWidthInPx?Math.ceil(l.size):this._defaultMaxLineWidthInPx,r=t&&"meters"===o?99999999:s>this._defaultMaxShapeSizeInPx?Math.ceil(s):this._defaultMaxShapeSizeInPx,a=t?"meters"===i?.001:0:this._defaultMinLineWidthInPx,d=t?"meters"===o?.001:1:this._defaultMinShapeSizeInPx;p.updateSliderAndTextBoxConstraints({textBox:this._lineWidthTextBox,slider:this.dap_lineWidthSlider,minimum:a,maximum:n}),this.dap_lineWidthUnitLabel.innerHTML="meters"===i?I.meters:I.px,p.updateSliderAndTextBoxConstraints({textBox:this.dap_shapeSizeTextBox,slider:this.dap_shapeSizeSlider,minimum:d,maximum:r}),this.dap_sizeUnitLabel.innerHTML="meters"===o?I.meters:I.px,y.toggle(this.dap_lineWidthSlider.domNode,L.hidden,"meters"===i),y.toggle(this.dap_shapeSizeSlider.domNode,L.hidden,"meters"===o)},_assimilateSymbol:function(e){this._updateTabs(e),this._syncControls(e)},_getSymbolPickerParams:function(){return{portal:this.portal,symbolSource:"2d"===this.mode?"symbol-set":"web-style"}},_hideImageUrlInput:function(){this._clearUrlImageErrorDisplay(),O(this.dap_shapeImageUrlContainer),this.dap_shapeImageUrlInput.set("value","")},_getFillColor:function(){var e=this._editedSymbol;return v(e)||_.isLine(e)||!this._colorRamp?this.fillColor:this._getMiddleItem(this.fillColorRamp)},_getMiddleItem:function(e){return e[Math.floor(.5*(e.length-1))]},_getOutlineColor:function(){return this._shouldShowOutlineColorRamp(this._editedSymbol)?this._getMiddleItem(this.outlineColorRamp):this.outlineColor},_commitProperties:function(){var e=this._editedSymbol,t=_.getApplicableTabs(e,this._tabOptions.excluded);"enabled"!==t.shape.state||this._externalSizing||_.updateShape({symbol:e,size:this.shapeSize}),"enabled"===t.fill.state&&(_.updateFill({symbol:e,color:this._getFillColor()}),(_.hasExtrudeSymbolLayer(e)||_.hasTextSymbolLayer(e))&&_.updateShape({symbol:e,size:this.shapeSize}),this._isPreppingEdit||_.ensureSupportedSimpleFillSymbolStyle(e)),"enabled"===t.outline.state&&_.updateOutline({symbol:e,color:this._getOutlineColor(),pattern:this.outlinePattern,size:this.outlineWidth}),this.previewVisible&&this._updatePreviewSymbol(),this._toggleOutlineOptions(),this._isPreppingEdit=!1,this.emit("style-update")},_toggleOutlineOptions:function(){var e=!!this._optimizationOptions&&this._optimizationCheckBox.checked,t=this.outlineColor,i=_.isLine(this._editedSymbol),o=this._externalSizing&&i||!t||e,l=e||!t,s=!t;this._toggleLabeledControls({labels:this.dap_lineWidthLabel,controls:[this._lineWidthTextBox,this.dap_lineWidthSlider],disabled:o}),this._toggleLabeledControls({labels:this.dap_linePatternSelectLabel,controls:this._linePatternSelect,disabled:s}),this._toggleLabeledControls({labels:[this.dap_outlineColorPicker.dap_transparencyLabel],controls:[this.dap_outlineColorPicker.dap_transparencySlider],disabled:l})},_updatePreviewSymbol:function(){var e=this._editedSymbol,t=this.dap_symbolPreview;if(f.empty(t),!_.hasTextSymbolLayer(e)){o.renderPreviewHTML(e,{node:t,size:24}).then(function(){y.toggle(t,L.alt,_.blendsIntoBackground(e))})}},_updateSuggestedColors:function(e,t){e.set("suggestedColors",t)}})});