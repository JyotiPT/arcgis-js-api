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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./Slider/nls/Slider","../intl","../core/events","../core/maybe","../core/accessorSupport/decorators","../core/libs/pep/pep","../libs/resize-observer/ResizeObserver","./Widget","./Slider/SliderViewModel","./support/widget"],function(t,e,n,i,o,r,a,s,l,u,h,d,p,c,m){var _={base:"esri-slider",reversed:"esri-slider--reversed",horizontalLayout:"esri-slider--horizontal",verticalLayout:"esri-slider--vertical",contentElement:"esri-slider__content",extraContentElement:"esri-slider__extra-content",trackElement:"esri-slider__track",ticksContainerElement:"esri-slider__ticks",tickElement:"esri-slider__tick",tickLabelElement:"esri-slider__tick-label",maxElement:"esri-slider__max",minElement:"esri-slider__min",maxElementInteractive:"esri-slider__max--interactive",minElementInteractive:"esri-slider__min--interactive",rangeInput:"esri-slider__range-input",anchorElement:"esri-slider__anchor",movingAnchorElement:"esri-slider__anchor--moving",lastMovedAnchorElement:"esri-slider__anchor--moved",anchorElementIndexPrefix:"esri-slider__anchor-",segmentElement:"esri-slider__segment",segmentElementIndexPrefix:"esri-slider__segment-",segmentElementInteractive:"esri-slider__segment--interactive",thumbElement:"esri-slider__thumb",labelElement:"esri-slider__label",labelElementInteractive:"esri-slider__label--interactive",labelInput:"esri-slider__label-input",esriWidget:"esri-widget",widgetIcon:"esri-icon-edit",disabled:"esri-disabled",hidden:"esri-hidden"},v={showInput:"Enter",hideInput1:"Enter",hideInput2:"Escape",hideInput3:"Tab",moveAnchorUp:"ArrowUp",moveAnchorDown:"ArrowDown",moveAnchorLeft:"ArrowLeft",moveAnchorRight:"ArrowRight",moveAnchorToMax:"End",moveAnchorToMin:"Home"};return function(t){function e(e){var n=t.call(this,e)||this;return n._activeLabelInputIndex=null,n._anchorElements=null,n._baseNode=null,n._dragged=!1,n._dragStartInfo=null,n._focusedAnchorIndex=null,n._isMinInputActive=!1,n._isMaxInputActive=!1,n._labelElements=[],n._lastMovedHandleIndex=null,n._observer=null,n._positionPrecision=5,n._segmentDragStartInfo=null,n._segmentElements=null,n._thumbElements=[],n._tickElements=[],n._trackHeight=null,n._trackWidth=null,n._zIndices=null,n._zIndexOffset=3,n.disabled=!1,n.extraNodes=[],n.draggableSegmentsEnabled=!0,n.label=r.widgetLabel,n.labelFormatFunction=null,n.inputFormatFunction=null,n.inputParseFunction=null,n.labelInputsEnabled=!1,n.labels=null,n.labelsVisible=!1,n.max=null,n.min=null,n.precision=4,n.rangeLabelInputsEnabled=!1,n.rangeLabelsVisible=!1,n.snapOnClickEnabled=!0,n.steps=null,n.thumbsConstrained=!0,n.thumbCreatedFunction=null,n.tickConfigs=null,n.trackElement=null,n.values=null,n.viewModel=new c,n._observer=new d(function(){return n.scheduleRender()}),n._onAnchorPointerDown=n._onAnchorPointerDown.bind(n),n._onAnchorPointerMove=n._onAnchorPointerMove.bind(n),n._onAnchorPointerUp=n._onAnchorPointerUp.bind(n),n._onLabelPointerDown=n._onLabelPointerDown.bind(n),n._onLabelPointerUp=n._onLabelPointerUp.bind(n),n._onSegmentPointerDown=n._onSegmentPointerDown.bind(n),n._onSegmentPointerMove=n._onSegmentPointerMove.bind(n),n._onSegmentPointerUp=n._onSegmentPointerUp.bind(n),n._onTrackPointerDown=n._onTrackPointerDown.bind(n),n}return i(e,t),Object.defineProperty(e.prototype,"layout",{set:function(t){-1===["vertical","vertical-reversed","horizontal","horizontal-reversed"].indexOf(t)&&(t="horizontal"),this._set("layout",t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){var t=this,e=t._activeLabelInputIndex,n=t._isMaxInputActive,i=t._isMinInputActive,o=t._dragStartInfo,r=t._segmentDragStartInfo,a=t.viewModel,s=l.isSome(o)||l.isSome(r);return null===e&&!n&&!i?s?"dragging":a.state:"editing"},enumerable:!0,configurable:!0}),e.prototype.render=function(){var t=this.label,e=this.classes(_.base,_.esriWidget,this._isHorizontalLayout()?_.horizontalLayout:_.verticalLayout,this._isReversedLayout()?_.reversed:null,this._isDisabled()?_.disabled:null);return this._storeTrackDimensions(),m.tsx("div",{afterCreate:this._afterBaseNodeCreate,bind:this,"aria-label":t,class:e,"touch-action":"none"},this.renderContent())},e.prototype.toNextStep=function(t){this._toStep(t,1)},e.prototype.toPreviousStep=function(t){this._toStep(t,-1)},e.prototype.renderContent=function(){return[this.renderMin(),this.renderSliderContainer(),this.renderMax()]},e.prototype.renderSliderContainer=function(){if(l.isSome(this.min)&&l.isSome(this.max))return m.tsx("div",{key:"slider-container",bind:this,class:_.contentElement},this.renderTrackElement(),this.renderTicksContainer(),this.renderExtraContentElements())},e.prototype.renderTrackElement=function(){return m.tsx("div",{afterCreate:this._afterTrackCreate,bind:this,class:_.trackElement,"data-node-ref":"trackElement","touch-action":"none"},this.renderSegmentElements(),this.renderAnchorElements())},e.prototype.renderSegmentElements=function(){if(this.trackElement&&this.values&&this.values.length){this._segmentElements=[];for(var t=this.values.length+1,e=[],n=0;n<t;n++)e.push(this.renderSegmentElement(n));return e}},e.prototype.renderSegmentElement=function(t){var e,n,i=this,o=i._trackHeight,r=i._trackWidth,a=i.draggableSegmentsEnabled,s=i.state,u=i.values,h=this._isHorizontalLayout(),d=h?r:o,p=t===u.length?null:t,c=0===t?null:t-1,v=l.isSome(p),f=l.isSome(c),g=u.slice().sort(function(t,e){return t-e});this._isReversedLayout()?(e=f?this._positionFromValue(g[c]):h?d:0,n=v?this._positionFromValue(g[p]):h?0:d):(e=v?this._positionFromValue(g[p]):h?d:0,n=f?this._positionFromValue(g[c]):h?0:d);var b=this._applyPrecisionToPosition(100*n/d),y=(e-n)/d,x=h?"transform: translate("+b+"%, 0px) scale("+y+", 1);":"transform: translate(0px, "+b+"%) scale(1, "+y+");",E=this.classes(_.segmentElement,_.segmentElementIndexPrefix+t,a&&v&&f&&"disabled"!==s?_.segmentElementInteractive:null);return m.tsx("div",{afterCreate:this._afterSegmentCreate,bind:this,class:E,"data-max-thumb-index":p,"data-min-thumb-index":c,"data-segment-index":t,style:x,"touch-action":"none"})},e.prototype.renderAnchorElements=function(){var t=this,e=this,n=e.trackElement,i=e.values;if(i&&i.length)return this._anchorElements=[],this._thumbElements=[],this._labelElements=[],this._zIndices=i.map(function(e,n){var o=t._positionFromValue(e),r=t._positionToPercent(o),a=t._isHorizontalLayout()?r>50:r<50,s=a?-1:1;return t._zIndexOffset+(i.length+s*n)}),n&&i&&i.length?i.map(function(e,n){return t.renderAnchorElement(e,n)}):null},e.prototype.renderAnchorElement=function(t,e){var n=this._positionFromValue(t),i=this._valueFromPosition(n);if(l.isSome(i)&&!isNaN(i)){var o=this,s=o._dragStartInfo,u=o._lastMovedHandleIndex,h=o.id,d=o.labelsVisible,p=o.layout,c=o.values,v=s&&s.index===e,f=u===e,g=this.classes(_.anchorElement,_.anchorElementIndexPrefix+e,v?_.movingAnchorElement:null,f?_.lastMovedAnchorElement:null),b=this.labels.values[e],y=this._getStyleForAnchor(t,e,v||f),x=this.viewModel.getBoundsForValueAtIndex(e),E=x.min,I=x.max,P=2===c.length?0===e?a.substitute(r.rangeMinimum,{value:t}):a.substitute(r.rangeMaximum,{value:t}):b,k=1===c.length?null:0===e?h+"-handle-"+(e+1):e===c.length-1?h+"-handle-"+(e-1):h+"-handle-"+(e-1)+" "+h+"-handle-"+(e+1);return m.tsx("div",{afterCreate:this._afterAnchorCreate,afterUpdate:this._afterAnchorUpdate,"aria-controls":k,"aria-label":r.sliderValue,"aria-labelledby":d?h+"-label-"+e:null,"aria-orientation":p,"aria-valuemax":I.toString(),"aria-valuemin":E.toString(),"aria-valuenow":t.toString(),"aria-valuetext":P,bind:this,class:g,"data-thumb-index":e,"data-value":t,id:h+"-handle-"+e,onkeydown:this._onAnchorKeyDown,"touch-action":"none",role:"slider",style:y,tabIndex:0},m.tsx("span",{afterCreate:this._afterThumbCreate,bind:this,class:_.thumbElement,"data-thumb-index":e,"touch-action":"none"}),this.renderThumbLabel(e))}},e.prototype.renderThumbLabel=function(t){var e=this,n=e.id,i=e.labels,o=e.labelInputsEnabled,r=e.labelsVisible,a=e.state,s=i.values[t],l=this.classes(_.labelElement,r?null:_.hidden,o&&"disabled"!==a?_.labelElementInteractive:null);return m.tsx("span",{afterCreate:this._afterLabelCreate,"aria-hidden":!r,bind:this,class:l,"data-thumb-index":t,id:n+"-label-"+t,role:o?"button":null,"touch-action":"none"},this._activeLabelInputIndex===t?this.renderValueInput(t):s)},e.prototype.renderValueInput=function(t){var e=this.values[t];return m.tsx("input",{afterCreate:this._afterInputCreate,"aria-label":r.sliderValue,bind:this,class:_.labelInput,required:!0,tabIndex:0,type:"text",value:this._formatInputValue(e,"value",t),onblur:this._onLabelInputBlur,onkeydown:this._onInputKeyDown})},e.prototype.renderMax=function(){var t=this,e=t._isMaxInputActive,n=t.labels,i=t.rangeLabelInputsEnabled,o=t.rangeLabelsVisible,r=t.state,a=this.classes(_.maxElement,o?null:_.hidden,i&&"disabled"!==r?_.maxElementInteractive:null);return m.tsx("div",{"aria-hidden":!o,bind:this,class:a,onclick:this._onMaxLabelClick,onkeydown:this._onMaxLabelKeyDown,role:i?"button":null,tabIndex:i?0:null},e?this.renderMaxInput():n.max)},e.prototype.renderMin=function(){var t=this,e=t._isMinInputActive,n=t.labels,i=t.rangeLabelInputsEnabled,o=t.rangeLabelsVisible,r=t.state,a=this.classes(_.minElement,o?null:_.hidden,i&&"disabled"!==r?_.minElementInteractive:null);return m.tsx("div",{"aria-hidden":!o,bind:this,class:a,onclick:this._onMinLabelClick,onkeydown:this._onMinLabelKeyDown,role:i?"button":null,tabIndex:i?0:null},e?this.renderMinInput():n.min)},e.prototype.renderMaxInput=function(){return m.tsx("input",{afterCreate:this._afterInputCreate,"aria-label":r.maximumValue,bind:this,class:_.rangeInput,required:!0,tabIndex:0,type:"text",value:this._formatInputValue(this.max,"max"),onblur:this._onMaxInputBlur,onkeydown:this._onInputKeyDown})},e.prototype.renderMinInput=function(){return m.tsx("input",{afterCreate:this._afterInputCreate,"aria-label":r.minimumValue,bind:this,class:_.rangeInput,required:!0,tabIndex:0,type:"text",value:this._formatInputValue(this.min,"min"),onblur:this._onMinInputBlur,onkeydown:this._onInputKeyDown})},e.prototype.renderExtraContentElements=function(){return m.tsx("div",{bind:this,class:_.extraContentElement},this.extraNodes)},e.prototype.renderTicksContainer=function(){var t=this;if(this.tickConfigs&&this.trackElement&&(0!==this._trackHeight||0!==this._trackWidth))return this.tickConfigs.map(function(e,n){return m.tsx("div",{key:"ticks-container",class:t.classes(_.ticksContainerElement)},t.renderTicks(e,n))})},e.prototype.renderTicks=function(t,e){var n=this,i=t.mode,o=t.values;if(this._tickElements[e]=[],"position"===i){var r=Array.isArray(o)?o:[o];return this._calculateTickPositions(r).map(function(i,o){return n.renderTickGroup(t,o,e,i)})}if("percent"===i&&Array.isArray(o)){var a=this,s=a.max,l=a.min,u=s-l,h=o.map(function(t){return n._applyPrecisionToPosition(t/100*u+l)});return this._calculateTickPositions(h).map(function(i,o){return n.renderTickGroup(t,o,e,i)})}var d=Array.isArray(o)&&o.length?o[0]:isNaN(o)?null:o,p=this._getTickCounts(d,t);return this._calculateEquidistantTickPositions(p).map(function(i,o){return n.renderTickGroup(t,o,e,i)})},e.prototype.renderTickGroup=function(t,e,n,i){var o="position"===t.mode?Array.isArray(t.values)?t.values[e]:t.values:this._valueFromPosition(i);if(l.isSome(o)&&!isNaN(o))return m.tsx("div",{afterCreate:this._afterTickGroupCreate,bind:this,"data-config":t,"data-position":i,"data-tick-config-index":n,"data-tick-group-index":e,"data-value":o,key:"tick-group-"+e},this.renderTickLine(t,e,n,o),t.labelsVisible?this.renderTickLabel(t,e,n,o):null)},e.prototype.renderTickLine=function(t,e,n,i){return m.tsx("div",{afterCreate:this._afterTickLineCreate,"aria-valuenow":i.toString(),bind:this,class:_.tickElement,"data-tick-config-index":n,"data-tick-group-index":e,"data-value":i,key:"tick-label-"+e,style:this._getPositionStyleForElement(i)})},e.prototype.renderTickLabel=function(t,e,n,i){var o=t.labelFormatFunction?t.labelFormatFunction(i,"tick",e):this.viewModel.getLabelForValue(i,"tick",e);return m.tsx("div",{afterCreate:this._afterTickLabelCreate,"aria-label":o,"aria-valuenow":i.toString(),"aria-valuetext":o,bind:this,class:_.tickLabelElement,"data-tick-config-index":n,"data-tick-group-index":e,"data-value":i,key:"tick-label-"+e,style:"transform: translate(-50%); "+this._getPositionStyleForElement(i)},o)},e.prototype._afterBaseNodeCreate=function(t){this._baseNode&&this._observer.unobserve(this._baseNode),this._baseNode=t,this._observer.observe(this._baseNode)},e.prototype._afterTrackCreate=function(t){m.storeNode.call(this,t),h.applyLocal(t),t.addEventListener("pointerdown",this._onTrackPointerDown),this.scheduleRender()},e.prototype._afterSegmentCreate=function(t){this._segmentElements.push(t),h.applyLocal(t),t.addEventListener("pointerdown",this._onSegmentPointerDown)},e.prototype._afterAnchorCreate=function(t){if(this._anchorElements.push(t),h.applyLocal(t),t.addEventListener("pointerdown",this._onAnchorPointerDown),this.thumbCreatedFunction){var e=t["data-thumb-index"],n=t["data-value"],i=this._thumbElements[e]||null,o=this._labelElements[e]||null;this.thumbCreatedFunction(e,n,i,o)}},e.prototype._afterAnchorUpdate=function(t){if(this._anchorElements.push(t),l.isSome(this._focusedAnchorIndex)){t["data-thumb-index"]===this._focusedAnchorIndex&&(t.focus(),this._focusedAnchorIndex=null)}},e.prototype._afterThumbCreate=function(t){this._thumbElements.push(t)},e.prototype._afterLabelCreate=function(t){this._labelElements.push(t),h.applyLocal(t),t.addEventListener("pointerdown",this._onLabelPointerDown),t.addEventListener("pointerup",this._onLabelPointerUp)},e.prototype._afterInputCreate=function(t){t.focus(),t.select()},e.prototype._afterTickLineCreate=function(t){var e=t["data-tick-config-index"],n=t["data-tick-group-index"],i=this._tickElements[e];i[n]?i[n].line=t:i[n]={line:t,label:null}},e.prototype._afterTickLabelCreate=function(t){var e=t["data-tick-config-index"],n=t["data-tick-group-index"],i=this._tickElements[e];i[n]?i[n].label=t:i[n]={label:t,line:null}},e.prototype._afterTickGroupCreate=function(t){var e=t["data-config"];if(e&&e.tickCreatedFunction){var n=t["data-tick-config-index"],i=t["data-tick-group-index"],o=t["data-value"],r=this._tickElements[n][i];if(r){var a=r.line||null,s=r.label||null;e.tickCreatedFunction(o,a,s)}}},e.prototype._onAnchorKeyDown=function(t){if(!this._isDisabled()&&"editing"!==this.state){var e=t.target,n=s.eventKey(t),i=this,o=i._anchorElements,r=i.values,a=e["data-thumb-index"],u=o[a],h=r[a],d=this._isHorizontalLayout(),p=[v.moveAnchorUp,v.moveAnchorDown,v.moveAnchorLeft,v.moveAnchorRight];if(n===v.showInput&&this.labelInputsEnabled)this._activeLabelInputIndex=a,this.notifyChange("state");else if(p.indexOf(n)>-1){t.preventDefault();var c=this.steps,m=n===v.moveAnchorUp||n===v.moveAnchorRight?1:-1;if(l.isSome(c))this._toStep(a,this._isReversedLayout()?-1*m:m);else{var _=this._getPositionOfElement(u),f=this._isHorizontalLayout()?m:-1*m,g=_+f,b=0===this.precision?this._positionFromValue(this._valueFromPosition(g)+f):g;this._toPosition(a,b)}var y=this.values[a];h!==y&&this._emitThumbChangeEvent({index:a,oldValue:h,value:y})}else if(n===v.moveAnchorToMax||n===v.moveAnchorToMin){t.preventDefault();var x=this._getAnchorBoundsInPixels(a),E=x.min,I=x.max,g=d?n===v.moveAnchorToMax?I:E:n===v.moveAnchorToMin?I:E;this._toPosition(a,g);var y=this.values[a];h!==y&&this._emitThumbChangeEvent({index:a,oldValue:h,value:y})}}},e.prototype._onAnchorPointerDown=function(t){if(t.preventDefault(),!this._isDisabled()){var e=t.target,n=t.clientX,i=t.clientY,o=e["data-thumb-index"];void 0!==o&&(this._anchorElements[o]&&this._anchorElements[o].focus(),this._storeTrackDimensions(),this._dragStartInfo={clientX:n,clientY:i,index:o,position:this._getPositionOfElement(this._anchorElements[o])},this.notifyChange("state"),document.addEventListener("pointerup",this._onAnchorPointerUp),document.addEventListener("pointermove",this._onAnchorPointerMove))}},e.prototype._onAnchorPointerMove=function(t){if(t.preventDefault(),"editing"!==this.state&&this._dragStartInfo){var e=this,n=e.values,i=e._anchorElements,o=e._dragged,r=e._dragStartInfo,a=e._dragStartInfo,s=a.index,l=a.position,u=t.clientX,h=t.clientY,d=o?"drag":"start",p=i[s],c=this._getPositionOfElement(p),m=this._applyPrecisionToPosition(this._isHorizontalLayout()?l+u-r.clientX:l+h-r.clientY);if(c!==m){var _=n[s];this._dragged=!0,this._toPosition(s,m);var v=this.values[s];o?_!==v&&this._emitThumbDragEvent({index:s,state:d,value:v}):this._emitThumbDragEvent({index:s,state:d,value:_})}}},e.prototype._onAnchorPointerUp=function(t){if(t.preventDefault(),document.removeEventListener("pointerup",this._onAnchorPointerUp),document.removeEventListener("pointermove",this._onAnchorPointerMove),this._dragStartInfo){var e=this._dragStartInfo.index,n=this._dragged;this._dragged=!1,this._dragStartInfo=null,this._lastMovedHandleIndex=e,n?(this.notifyChange("state"),this._emitThumbDragEvent({index:e,state:"stop",value:this.values[e]})):this.scheduleRender()}},e.prototype._onTrackPointerDown=function(t){var e=this,n=e._dragStartInfo,i=e.snapOnClickEnabled,o=e.state,r=e.values;if(!this._isDisabled()&&"editing"!==o&&!n&&i&&r.length){var a=this.steps,s=t.clientX,u=t.clientY,h=this._getCursorPositionFromEvent(t),d=this._valueFromPosition(h),p=this._getIndexOfNearestValue(d);if(l.isSome(p)){var c=r[p],m=l.isSome(a)?this._calculateNearestStepPosition(h):h;this._toPosition(p,m),this._dragged=!0,this._dragStartInfo={clientX:s,clientY:u,index:p,position:m},this._focusedAnchorIndex=p,this.notifyChange("state"),this._emitThumbDragEvent({index:p,state:"start",value:c});var _=this.values[p];c!==_&&this._emitThumbDragEvent({index:p,state:"drag",value:_}),document.addEventListener("pointerup",this._onAnchorPointerUp),document.addEventListener("pointermove",this._onAnchorPointerMove)}}},e.prototype._onSegmentPointerDown=function(t){t.preventDefault();var e=this.draggableSegmentsEnabled,n=t.target,i=n["data-segment-index"],o=n["data-min-thumb-index"],r=n["data-max-thumb-index"];!this._isDisabled()&&e&&l.isSome(o)&&l.isSome(r)&&(t.stopPropagation(),this._storeTrackDimensions(),this._segmentDragStartInfo={cursorPosition:this._getCursorPositionFromEvent(t),index:i,details:this._normalizeSegmentDetails({min:this._getAnchorDetails(o),max:this._getAnchorDetails(r)})},this.notifyChange("state"),this._emitSegmentDragEvent({index:i,state:"start",thumbIndices:[o,r]}),document.addEventListener("pointerup",this._onSegmentPointerUp),document.addEventListener("pointermove",this._onSegmentPointerMove))},e.prototype._onSegmentPointerMove=function(t){if(this._segmentDragStartInfo){t.preventDefault();var e=this,n=e._trackHeight,i=e._trackWidth,o=e._segmentDragStartInfo,r=o.index,a=o.cursorPosition,s=o.details,l=s.min,u=s.max,h=l.index,d=l.position,p=l.value,c=u.index,m=u.position,_=u.value;this._dragged=!0;var v=this._getCursorPositionFromEvent(t);if(v!==a){var f=this._positionToPercent(a),g=this._positionToPercent(v),b=g-f,y=this._positionToPercent(d)+b,x=this._positionToPercent(m)+b,E=this._getAnchorBoundsAsPercents(h).min,I=this._getAnchorBoundsAsPercents(c).max,P=!1,k=!1;if(y<E?P=!0:x>I&&(k=!0),P){var A=this.viewModel.getBoundsForValueAtIndex(h),S=A.min,L=A.max,M=this._isPositionInverted()?L:S,C=M,w=_+(M-p);return void this._updateAnchorValues([h,c],[C,w])}if(k){var F=this.viewModel.getBoundsForValueAtIndex(c),S=F.min,L=F.max,M=this._isPositionInverted()?S:L,w=M,C=p+(M-_);return void this._updateAnchorValues([h,c],[C,w])}var D=this._isHorizontalLayout()?i:n,V=x/100*D,T=y/100*D,O=this.values,z=[O[h],O[c]],H=this._getValueForAnchorAtPosition(h,T),N=this._getValueForAnchorAtPosition(c,V);this._updateAnchorValues([h,c],[H,N]);[this.values[h],this.values[c]].every(function(t,e){return t===z[e]})||this._emitSegmentDragEvent({index:r,state:"drag",thumbIndices:[h,c]})}}},e.prototype._onSegmentPointerUp=function(t){if(t.preventDefault(),document.removeEventListener("pointerup",this._onSegmentPointerUp),document.removeEventListener("pointermove",this._onSegmentPointerMove),this._segmentDragStartInfo){var e=this,n=e.max,i=e.min,o=e.values,r=this._segmentDragStartInfo,a=r.index,s=r.details,l=s.min.index,u=s.max.index,h=n-i,d=o[l],p=o[u];this._lastMovedHandleIndex=d===p?d>h/2?l:u:null,this._dragged=!1,this._segmentDragStartInfo=null,this.notifyChange("state"),this._emitSegmentDragEvent({index:a,state:"stop",thumbIndices:[l,u]})}},e.prototype._storeTrackDimensions=function(){if(this.trackElement){var t=this._getDimensions(this.trackElement);this._trackHeight=t.height,this._trackWidth=t.width}},e.prototype._onLabelPointerDown=function(){this._isDisabled()||(this._dragged=!1,document.addEventListener("pointerup",this._onAnchorPointerUp),document.addEventListener("pointermove",this._onAnchorPointerMove))},e.prototype._onLabelPointerMove=function(){this._isDisabled()||(this._dragged=!0)},e.prototype._onLabelPointerUp=function(t){if(!this._isDisabled()){var e=t.target["data-thumb-index"];this.labelInputsEnabled&&!this._dragged&&l.isSome(e)&&(this._activeLabelInputIndex=e),this._dragged=!1,this.notifyChange("state"),document.removeEventListener("pointerup",this._onLabelPointerUp),document.removeEventListener("pointermove",this._onLabelPointerMove)}},e.prototype._onLabelInputBlur=function(t){var e=this,n=e._activeLabelInputIndex,i=e.values,o=e.viewModel,r=t.target,a=r.value;if(this._activeLabelInputIndex=null,this.notifyChange("state"),a){var s=this._parseInputValue(a,"value",n),l=i[n];o.setValue(n,s);var u=this.values[n];l!==u&&this._emitThumbChangeEvent({index:n,oldValue:l,value:u})}},e.prototype._onInputKeyDown=function(t){if(!this._isDisabled()){var e=t.target,n=s.eventKey(t),i=v.hideInput1,o=v.hideInput2,r=v.hideInput3,a=this,u=a._activeLabelInputIndex,h=a._anchorElements,d=e;if(n===i||n===o||n===r){t.stopPropagation();var p=u;d.blur(),l.isSome(p)?h[p].focus():d.parentElement.focus()}}},e.prototype._onMaxLabelClick=function(){!this._isDisabled()&&this.rangeLabelInputsEnabled&&(this._isMaxInputActive=!0,this.notifyChange("state"))},e.prototype._onMaxLabelKeyDown=function(t){this._isDisabled()||s.eventKey(t)!==v.showInput||(this._isMaxInputActive=!0,this.notifyChange("state"))},e.prototype._onMaxInputBlur=function(t){var e=t.target,n=e.value;if(this._isMaxInputActive=!1,this.notifyChange("state"),n){var i=this.max;this.viewModel.set("max",this._parseInputValue(n,"max")),this.max!==i&&this._emitMaxChangeEvent({oldValue:i,value:this.max})}},e.prototype._onMinLabelClick=function(){!this._isDisabled()&&this.rangeLabelInputsEnabled&&(this._isMinInputActive=!0,this.notifyChange("state"))},e.prototype._onMinLabelKeyDown=function(t){this._isDisabled()||s.eventKey(t)!==v.showInput||(this._isMinInputActive=!0,this.notifyChange("state"))},e.prototype._onMinInputBlur=function(){var t=event.target,e=t.value;if(this._isMinInputActive=!1,this.notifyChange("state"),e){var n=this.min;this.viewModel.set("min",this._parseInputValue(e,"min")),this.min!==n&&this._emitMinChangeEvent({oldValue:n,value:this.min})}},e.prototype._isDisabled=function(){return this.disabled||"disabled"===this.state},e.prototype._positionFromValue=function(t){var e=this,n=e.max,i=e.min,o=n-i;if(0===o)return 0;var r=this,a=r._trackHeight,s=r._trackWidth,l=this._isHorizontalLayout(),u=l?parseFloat((s*(t-i)/o).toFixed(2)):parseFloat((a*(n-t)/o).toFixed(2));return this._isReversedLayout()&&(u=l?s-u:a-u),u},e.prototype._valueFromPosition=function(t){var e=this,n=e._trackHeight,i=e._trackWidth,o=e.max,r=e.min,a=e.precision,s=o-r,l=this._isHorizontalLayout()?t*s/i+r:s*(1e3-t/n*1e3)/1e3+r;return this._isReversedLayout()&&(l=o+r-l),parseFloat(l.toFixed(a))},e.prototype._positionToPercent=function(t){var e=this,n=e._trackHeight,i=e._trackWidth,o=this._isHorizontalLayout()?i:n,r=100*t/o;return this._applyPrecisionToPosition(r)},e.prototype._applyPrecisionToPosition=function(t){return parseFloat(t.toFixed(this._positionPrecision))},e.prototype._isPositionInverted=function(){var t=this.layout;return"horizontal-reversed"===t||"vertical"===t},e.prototype._isHorizontalLayout=function(){return this.layout.indexOf("horizontal")>-1},e.prototype._isReversedLayout=function(){return this.layout.indexOf("reversed")>-1},e.prototype._normalizeSegmentDetails=function(t){if(this._isPositionInverted()){var e=t.min;return{min:t.max,max:e}}return t},e.prototype._parseInputValue=function(t,e,n){return this.inputParseFunction?this.inputParseFunction(t,e,n):this.viewModel.defaultInputParseFunction(t)},e.prototype._formatInputValue=function(t,e,n){return this.inputFormatFunction?this.inputFormatFunction(t,e,n):this.viewModel.defaultInputFormatFunction(t)},e.prototype._getAnchorDetails=function(t){return{index:t,position:this._getPositionOfElement(this._anchorElements[t]),value:this.values[t]}},e.prototype._updateAnchorStyle=function(t,e){var n=this._anchorElements[t];n&&(this._isHorizontalLayout()?n.style.left=""+e:n.style.top=""+e)},e.prototype._getStyleForAnchor=function(t,e,n){var i=this._zIndices[e],o=n?this._zIndexOffset+i:i;return this._getPositionStyleForElement(t)+"; z-index: "+o},e.prototype._getPositionStyleForElement=function(t){var e=this._positionFromValue(t),n=this._positionToPercent(e);return(this._isHorizontalLayout()?"left":"top")+": "+n+"%"},e.prototype._getPositionOfElement=function(t){var e=this._getDimensions(t.offsetParent),n=this._getDimensions(t);return this._isHorizontalLayout()?this._applyPrecisionToPosition(n.left-e.left):this._applyPrecisionToPosition(n.top-e.top)},e.prototype._updateAnchorValues=function(t,e){var n=this;t.forEach(function(t,i){return n._toValue(t,e[i])})},e.prototype._toValue=function(t,e){if(l.isSome(this.steps)){e=this._getStepValues()[this._getIndexOfNearestStepValue(e)]}this._updateAnchorStyle(t,this._getPositionStyleForElement(e)),this.viewModel.setValue(t,e)},e.prototype._toPosition=function(t,e){var n=l.isSome(this.steps)?this._getStepValueForAnchorAtPosition(t,e):this._getValueForAnchorAtPosition(t,e);this._updateAnchorStyle(t,this._getPositionStyleForElement(n)),this.viewModel.setValue(t,n)},e.prototype._getValueForAnchorAtPosition=function(t,e){var n,i,o=this._getAnchorBoundsInPixels(t),r=o.min,a=o.max,s=this.viewModel.getBoundsForValueAtIndex(t),l=s.min,u=s.max,h=null;return this._isPositionInverted()?(n=l,i=u):(n=u,i=l),h=e>a?n:e<r?i:this._valueFromPosition(e),h>u?h=u:h<l&&(h=l),h},e.prototype._getStepValueForAnchorAtPosition=function(t,e){var n=this._getStepValues(),i=this._calculateNearestStepPosition(e),o=this._getValueForAnchorAtPosition(t,i);return n[this._getIndexOfNearestStepValue(o)]},e.prototype._getAnchorBoundsAsPercents=function(t){var e=this._getAnchorBoundsInPixels(t),n=e.min,i=e.max;return{min:this._positionToPercent(n),max:this._positionToPercent(i)}},e.prototype._getAnchorBoundsInPixels=function(t){var e=this,n=e._anchorElements,i=e._trackHeight,o=e._trackWidth,r=e.thumbsConstrained,a=n[t-1],s=n[t+1],l=this._isHorizontalLayout()?o:i;return r?this._isPositionInverted()?{max:a?this._getPositionOfElement(a):l,min:s?this._getPositionOfElement(s):0}:{max:s?this._getPositionOfElement(s):l,min:a?this._getPositionOfElement(a):0}:{max:l,min:0}},e.prototype._getIndexOfNearestValue=function(t){return this.values.indexOf(this.values.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e}))},e.prototype._getCursorPositionFromEvent=function(t){var e=this._getDimensions(this.trackElement);return this._isHorizontalLayout()?t.clientX-e.left:t.clientY-e.top},e.prototype._getStepValues=function(){var t=this.steps;if(Array.isArray(t))return t;for(var e=this,n=e.max,i=e.min,o=Math.ceil((n-i)/t),r=[],a=0;a<=o;a++){var s=i+t*a;r.push(s>n?n:s)}return r},e.prototype._toStep=function(t,e){var n=this,i=n.values,o=n.viewModel,r=i[t],a=this._getStepValues(),s=a.indexOf(r),l=null;if(s>-1){var u=a[s+e],h=this._positionFromValue(u);l=this._getStepValueForAnchorAtPosition(t,h)}else{l=a[this._getIndexOfNearestStepValue(r)+e]}o.setValue(t,l)},e.prototype._getIndexOfNearestStepValue=function(t){var e=this.steps;if(!l.isSome(e))return null;var n=this._getStepValues(),i=n.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e});return n.indexOf(i)},e.prototype._calculateNearestStepPosition=function(t){var e=this._valueFromPosition(t),n=this._getIndexOfNearestStepValue(e),i=this._getStepValues();return this._positionFromValue(i[n])},e.prototype._getTickCounts=function(t,e){var n=e.mode;return"count"===n||"position"===n?t||0:"percent"===n?100/t||0:0},e.prototype._calculateTickPositions=function(t){var e=this;return t.map(function(t){return e._positionFromValue(t)})},e.prototype._calculateEquidistantTickPositions=function(t){var e=this,n=e._trackWidth,i=e._trackHeight,o=this._isHorizontalLayout()?n:i,r=o/(t-1),a=[];if(1===t)return[o/2];for(var s=0;s<t;s++){var l=s*r;l<=o&&a.push(l)}return a},e.prototype._getDimensions=function(t){try{return t.getBoundingClientRect()}catch(t){if("object"==typeof t&&null!==t)return{top:0,bottom:0,left:0,width:0,height:0,right:0};throw t}},e.prototype._emitMaxChangeEvent=function(t){this.emit("max-change",n({},t,{type:"max-change"}))},e.prototype._emitMinChangeEvent=function(t){this.emit("min-change",n({},t,{type:"min-change"}))},e.prototype._emitThumbChangeEvent=function(t){this.emit("thumb-change",n({},t,{type:"thumb-change"}))},e.prototype._emitThumbDragEvent=function(t){this.emit("thumb-drag",n({},t,{type:"thumb-drag"}))},e.prototype._emitSegmentDragEvent=function(t){this.emit("segment-drag",n({},t,{type:"segment-drag"}))},o([u.property(),m.renderable()],e.prototype,"disabled",void 0),o([u.property()],e.prototype,"extraNodes",void 0),o([u.property(),m.renderable()],e.prototype,"draggableSegmentsEnabled",void 0),o([u.property()],e.prototype,"label",void 0),o([u.aliasOf("viewModel.labelFormatFunction")],e.prototype,"labelFormatFunction",void 0),o([u.aliasOf("viewModel.inputFormatFunction")],e.prototype,"inputFormatFunction",void 0),o([u.aliasOf("viewModel.inputParseFunction")],e.prototype,"inputParseFunction",void 0),o([u.property()],e.prototype,"labelInputsEnabled",void 0),o([u.aliasOf("viewModel.labels")],e.prototype,"labels",void 0),o([u.property(),m.renderable()],e.prototype,"labelsVisible",void 0),o([u.property({value:"horizontal"}),m.renderable()],e.prototype,"layout",null),o([u.aliasOf("viewModel.max")],e.prototype,"max",void 0),o([u.aliasOf("viewModel.min")],e.prototype,"min",void 0),o([u.aliasOf("viewModel.precision")],e.prototype,"precision",void 0),o([u.property()],e.prototype,"rangeLabelInputsEnabled",void 0),o([u.property(),m.renderable()],e.prototype,"rangeLabelsVisible",void 0),o([u.property()],e.prototype,"snapOnClickEnabled",void 0),o([u.property({dependsOn:["viewModel.state"],readOnly:!0}),m.renderable()],e.prototype,"state",null),o([u.property(),m.renderable()],e.prototype,"steps",void 0),o([u.aliasOf("viewModel.thumbsConstrained")],e.prototype,"thumbsConstrained",void 0),o([u.property()],e.prototype,"thumbCreatedFunction",void 0),o([u.property(),m.renderable()],e.prototype,"tickConfigs",void 0),o([u.property()],e.prototype,"trackElement",void 0),o([u.aliasOf("viewModel.values")],e.prototype,"values",void 0),o([u.property(),m.renderable(["viewModel.thumbsConstrained","viewModel.max","viewModel.min","viewModel.precision","viewModel.labelFormatFunction","viewModel.labels","viewModel.values"])],e.prototype,"viewModel",void 0),e=o([u.subclass("esri.widgets.Slider")],e)}(u.declared(p))});