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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./FeatureForm/nls/FeatureForm","dojo/date/locale","../moment","../core/accessorSupport/decorators","../layers/support/domains","../layers/support/fieldUtils","./Widget","./FeatureForm/FeatureFormViewModel","./support/widget"],function(e,t,a,i,r,n,l,o,u,d,s,p,c,f){function h(e){return e&&e.inputFields}var m={base:"esri-feature-form",form:"esri-feature-form__form",label:"esri-feature-form__label",inputField:"esri-feature-form__input",inputDate:"esri-feature-form__input--date",inputTime:"esri-feature-form__input--time",inputDisabled:"esri-feature-form__input--disabled",inputInvalid:"esri-feature-form__input--invalid",inputIconInvalid:"esri-feature-form__input-icon--invalid",errorMessage:"esri-feature-form__field-error-message",description:"esri-feature-form__description-text",dateInputPart:"esri-feature-form__date-input-part",dateInputContainer:"esri-feature-form__date-input-container",dateFormatHint:"esri-feature-form__date-format-hint",group:"esri-feature-form__group",groupLabel:"esri-feature-form__group-label",groupDescription:"esri-feature-form__group-description",groupCollapsed:"esri-feature-form__group--collapsed",groupSequential:"esri-feature-form__group--sequential",groupActive:"esri-feature-form__group--active",errorIcon:"esri-icon-notice-triangle",widget:"esri-widget",panel:"esri-widget--panel",input:"esri-input",select:"esri-select"},v={datePattern:"M/d/y",timePattern:"h:mm:ss a"};return function(e){function t(t){var a=e.call(this,t)||this;return a._fieldFocusNeeded=!1,a._activeDateEdit=null,a._activeInputName=null,a.feature=null,a.fieldConfig=null,a.groupDisplay="all",a.label=n.widgetLabel,a.layer=null,a.strict=null,a.viewModel=new c,a._handleFormKeyDown=a._handleFormKeyDown.bind(a),a._handleInputBlur=a._handleInputBlur.bind(a),a._handleInputFocus=a._handleInputFocus.bind(a),a._handleNumberInputMouseDown=a._handleNumberInputMouseDown.bind(a),a._handleInputKeyDown=a._handleInputKeyDown.bind(a),a._handleOptionChange=a._handleOptionChange.bind(a),a._handleGroupClick=a._handleGroupClick.bind(a),a._handleSubmit=a._handleSubmit.bind(a),a._afterScrollerCreateOrUpdate=a._afterScrollerCreateOrUpdate.bind(a),a}return i(t,e),t.prototype.postInitialize=function(){var e=this;this.own(this.watch("feature",function(){var t=e._getFocusableInput("forward");e._activeInputName=t&&t.name,e._fieldFocusNeeded=!0}),this.on("submit",function(t){if(t.invalid.length>0){var a=t.invalid[0];e._activeInputName=a,e._fieldFocusNeeded=!0,e.scheduleRender()}}))},t.prototype.getValues=function(){return null},t.prototype.submit=function(){return null},t.prototype.render=function(){var e=this.viewModel.state;return f.tsx("div",{class:this.classes(m.base,m.widget,m.panel)},"ready"===e?this.renderForm():null)},t.prototype.renderForm=function(){return f.tsx("form",{class:m.form,novalidate:!0,onsubmit:this._handleSubmit,onkeydown:this._handleFormKeyDown},this.renderFields())},t.prototype.renderFields=function(){var e=this;return this.viewModel.inputFields.map(function(t,a){return h(t)?e.renderGroup(t,a):e.renderLabeledField(t)})},t.prototype.renderGroup=function(e,t){var a=this,i=e.description,r=e.label,n=e.inputFields,l=this.viewModel.findField(this._activeInputName),o=l&&l.group===e,u=this.id+"_group_"+t,d=this.id+"_group-label_"+t,s=this.id+"_group-description_"+t,p=i?f.tsx("p",{class:this.classes(m.groupDescription,m.description),id:s},i):null,c="sequential"===this.groupDisplay,h=c?o?"true":"false":void 0;return f.tsx("fieldset",{class:this.classes(m.group,c?m.groupSequential:null,!c||o?null:m.groupCollapsed,o?m.groupActive:null),"aria-expanded":h,"aria-labelledby":d,"aria-describedby":i?s:"","data-group":e,id:u,key:t,onclick:this._handleGroupClick},f.tsx("div",{class:m.groupLabel,id:d},r),p,n.map(function(e){return a.renderLabeledField(e)}))},t.prototype._getFocusableInput=function(e,t){for(var a=this.viewModel._allInputFields,i="forward"===e?a:a.slice().reverse(),r=t?i.indexOf(t)+1:0,n=r;n<i.length;n++){var l=i[n];if(l.visible&&l.editable)return l}return null},t.prototype.renderLabeledField=function(e){var t=e.label,a=e.layer,i=e.type;return f.tsx("label",{key:a.id+"-"+e.name,class:m.label},[t,"unsupported"!==i?this.renderInputField(e):this.renderUnsupportedField(e),this.renderAuxiliaryText(e)])},t.prototype.renderInputField=function(e){var t=this.viewModel,i=e.domain,r=e.editable,n=e.name,l=e.type,o=t.getValue(n),u=!r,d=this.getCommonInputProps(e);return i&&"coded-value"===i.type&&!u?this.renderSelectInputField(o,i.codedValues.map(function(e){return{value:e.code,name:e.name}}),d):"text"===l&&"text-area"===e.editorType||"rich-text"===e.editorType?f.tsx("textarea",a({},d)):"date"===l?this.renderDateInputField(o,d):f.tsx("input",a({type:"text"===l?"text":"number"},d))},t.prototype.renderDateInputField=function(e,t){var i=this._formatDate(0),r=i.date,n=i.time,l=this.id+"-"+t.key,o=l+"-date",u=l+"-time",d=t["data-field"];return f.tsx("div",{key:t.key+"-date",class:m.dateInputContainer},f.tsx("div",{class:m.dateInputPart},f.tsx("input",a({"aria-label":d.label,"aria-describedby":o,type:"text"},t,{"data-date-part":"date",class:this.classes(t.class,m.inputDate),value:this._formatDate(e).date})),f.tsx("div",{class:m.dateFormatHint,id:o},r)),f.tsx("div",{class:m.dateInputPart},f.tsx("input",a({"aria-describedby":u,"aria-label":d.label,type:"text"},t,{"data-date-part":"time",class:this.classes(t.class,m.inputTime),value:this._formatDate(e).time})),f.tsx("div",{class:m.dateFormatHint,id:u},n)))},t.prototype.renderUnsupportedField=function(e){var t=this.viewModel.getValue(e.name);return f.tsx("input",{class:this.classes(m.input,m.inputField,m.inputDisabled),disabled:!0,type:"text",value:""+t})},t.prototype.renderSelectInputField=function(e,t,i){var r=!1,n=t.map(function(t){return t.value===e&&(r=!0),f.tsx("option",{value:""+t.value,key:t.name},t.name)});null==e||""===e||r||n.unshift(f.tsx("option",{value:""+e,key:"outlier-option"},e));var l=i["data-field"];return l.required||null!=l.value||n.unshift(f.tsx("option",{value:"",key:"empty-option"})),f.tsx("select",a({},i,{class:this.classes(i.class,m.select),onchange:this._handleOptionChange}),n)},t.prototype.renderAuxiliaryText=function(e){return e.valid?e.valid&&e.description?f.tsx("div",{key:"description",class:m.description},e.description):void 0:f.tsx("div",{key:"error-message"},f.tsx("span",{class:this.classes(m.inputIconInvalid,m.errorIcon)}),f.tsx("div",{class:m.errorMessage},e.errorMessage))},t.prototype.getCommonInputProps=function(e){var t=this.viewModel,i=e.editable,r=e.name,n=e.required,l=e.maxLength,o=e.hint,u=e.type,d=e.valid,s=t.getValue(r),p=!i;return a({afterCreate:this._afterScrollerCreateOrUpdate,afterUpdate:this._afterScrollerCreateOrUpdate,"aria-invalid":d?"false":"true",class:this.classes(m.input,m.inputField,p?m.inputDisabled:null,d?null:m.inputInvalid),key:r,maxlength:l>-1?""+l:""},this._getNumberFieldConstraints(e),{disabled:p,value:null==s?"":""+s,"data-field":e,onfocus:this._handleInputFocus,onblur:this._handleInputBlur,onkeydown:this._handleInputKeyDown,onmousedown:"number"===u?this._handleNumberInputMouseDown:null,required:n,title:o})},t.prototype._handleNumberInputMouseDown=function(e){var t=e.target,a=t;a.disabled||a.focus(),this.scheduleRender()},t.prototype._getNumberFieldConstraints=function(e){var t=d.getDomainRange(e.domain)||s.getFieldRange(e.field);return t&&t.max!==Number.MAX_VALUE&&t.min!==Number.MIN_VALUE?t:{min:null,max:null}},t.prototype._afterScrollerCreateOrUpdate=function(e){var t=e["data-field"],a=this.viewModel.findField(this._activeInputName);t.editable&&this._fieldFocusNeeded&&a===t&&(this._fieldFocusNeeded=!1,e.focus())},t.prototype._handleInputFocus=function(e){var t=e.target;this._activeInputName=t["data-field"].name},t.prototype._handleInputBlur=function(e){var t,i=e.target,r=i["data-field"],n=e.relatedTarget,l=n&&n["data-field"];if("date"===r.type){var o=i.getAttribute("data-date-part");this._activeDateEdit=a({},this._activeDateEdit,(t={},t[o]={value:i.value,input:i},t))}if(l&&"date"===r.type&&"date"===l.type&&r.field===l.field){if(""!==i.value&&""===n.value){var o=n.getAttribute("data-date-part");n.value=this._formatDate(Date.now())[o]}}else this._commitValue(i),this.scheduleRender()},t.prototype._commitValue=function(e){var t=e["data-field"];if(this._activeDateEdit){var a=this._activeDateEdit,i=a.date,r=a.time,n=this._getDateEditValue(t,"date"),l=this._getDateEditValue(t,"time"),o=""===n||""===l;if(i){var u=i.input;u.value=o?"":n,this._updateFieldValue(u)}if(r){var d=r.input;d.value=o?"":l,this._updateFieldValue(d)}this._activeDateEdit=null}else this._updateFieldValue(e)},t.prototype._getDateEditValue=function(e,t){var a=this._activeDateEdit[t];if(a){if(""===a.value)return"";var i=this._parseDate(a.value,t);return i?this._formatDate(i.getTime())[t]:this._formatDate(e.value)[t]}},t.prototype._handleInputKeyDown=function(e){var t=e.key,a=e.altKey,i=e.ctrlKey,r=e.metaKey,n=e.shiftKey;if("Tab"===t){var l=e.target,o=l["data-field"],u=n?"backward":"forward",d=l.getAttribute("data-date-part");if(!!("backward"===u&&"time"===d||"forward"===u&&"date"===d))return;this._commitValue(l);var s=this.viewModel.findField(o.name),p=this._getFocusableInput(u,s);return this._activeInputName=p&&p.name,void(p?(e.preventDefault(),this._fieldFocusNeeded=!0):this.renderNow())}if("Enter"===t)this._updateFieldValue(e.target),this.scheduleRender();else{var l=e.target,o=l["data-field"],c=o.field.type,f="integer"===c||"small-integer"===c,h="single"===c||"double"===c,m=!a&&!i&&!r;if((f||h)&&m&&1===t.length){var v=Number(t),_=["-","+"],y=["e","."],g=h?_.concat(y):_;isNaN(v)&&-1===g.indexOf(t)&&e.preventDefault()}}},t.prototype._updateFieldValue=function(e){var t=e["data-field"];this.viewModel.setValue(t.name,this._parseValue(e))},t.prototype._parseValue=function(e){var t=e["data-field"],a=e.value,i=t.required,r=t.type;if(!i&&""===a)return null;if("number"===r)return parseFloat(a);if("date"===r){if(!a)return null;var n=e.getAttribute("data-date-part"),l=Number(a);if(!isNaN(l))return l;var u=this._parseDate(a,n);if(!u)return null;var d=o(u),s=t.domain,p=o(),c=p;if(s&&"range"===s.type){var f=o(s.maxValue);p.isAfter(f)||(c=f)}var h=this.viewModel.getValue(t.name),m=o(null!=h?h:c);return"date"===n?(d.hour(m.hour()),d.minutes(m.minutes()),d.seconds(m.seconds())):(d.date(m.date()),d.month(m.month()),d.year(m.year())),d.valueOf()}return a},t.prototype._handleOptionChange=function(e){this._updateFieldValue(e.target),this.scheduleRender()},t.prototype._handleGroupClick=function(e){var t=e.currentTarget;if("false"===t.getAttribute("aria-expanded")){var a=t["data-group"];this._activeInputName=a.inputFields[0].name,this._fieldFocusNeeded=!0,this.scheduleRender()}},t.prototype._handleSubmit=function(e){e.preventDefault()},t.prototype._handleFormKeyDown=function(e){"Enter"===e.key&&this.viewModel.submit()},t.prototype._formatDate=function(e){if(null==e)return{date:"",time:""};var t=new Date(e);return{date:l.format(t,a({selector:"date"},v)),time:l.format(t,a({selector:"time"},v))}},t.prototype._parseDate=function(e,t){return null==e||""===e?null:l.parse(e,a({selector:t},v))},r([u.aliasOf("viewModel.feature")],t.prototype,"feature",void 0),r([u.aliasOf("viewModel.fieldConfig")],t.prototype,"fieldConfig",void 0),r([u.property(),f.renderable()],t.prototype,"groupDisplay",void 0),r([u.property()],t.prototype,"label",void 0),r([u.aliasOf("viewModel.layer")],t.prototype,"layer",void 0),r([u.aliasOf("viewModel.strict")],t.prototype,"strict",void 0),r([u.property(),f.renderable(["viewModel.inputFields","viewModel.state"]),f.vmEvent(["value-change","submit"])],t.prototype,"viewModel",void 0),r([u.aliasOf("viewModel.getValues")],t.prototype,"getValues",null),r([u.aliasOf("viewModel.submit")],t.prototype,"submit",null),t=r([u.subclass("esri.widgets.FeatureForm")],t)}(u.declared(p))});