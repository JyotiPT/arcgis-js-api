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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/i18n!./nls/FeatureForm","../../intl","../../core/Accessor","../../core/accessorSupport/decorators","../../layers/support/CodedValueDomain","../../layers/support/domains","../../layers/support/fieldUtils"],function(e,t,r,i,o,n,l,a,p,d,u){var s={type:"number"},y={type:"date",intlOptions:{day:"2-digit",month:"2-digit",year:"2-digit",hour:"numeric",minute:"numeric",second:"numeric"}};return function(e){function t(t){var r=e.call(this,t)||this;return r.arcade=null,r.config=null,r.feature=null,r.field=null,r.layer=null,r.description=null,r.editorType=null,r.error=null,r.format=null,r.group=null,r.hint=null,r.name=null,r}return r(t,e),Object.defineProperty(t.prototype,"compiledFunc",{get:function(){var e=this.arcade;return e&&e.arcadeUtils.createFunction(this.get("config.visibilityExpression"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"evaluatedVisibility",{get:function(){var e=this.compiledFunc;if(e){var t=this.arcade;return t.arcadeUtils.executeFunction(e,t.arcadeUtils.createExecContext(this.feature))}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"domain",{get:function(){var e=this.layer.typeIdField,t=e===this.name,r=this.get("field.domain");if(t&&!r)return new p({name:"__internal-type-based-coded-value-domain__",codedValues:this.layer.types.map(function(e){return{code:e.id,name:e.name}})});var i=this.feature,o=e&&this.layer.getFieldDomain(this.name,{feature:i}),n=o||r,l=this.get("config.domain");return this._isDomainCompatible(l)?l:n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"editable",{get:function(){return this.layer.capabilities.operations.supportsEditing&&this.field.editable&&!1!==this.get("config.editable")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"errorMessage",{get:function(){return this._toErrorMessage()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"label",{get:function(){return this.get("config.label")||this.field.alias||this.field.name},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxLength",{get:function(){if("date"===this.type)return-1;var e=this.get("field.length"),t=this.get("config.maxLength");return!isNaN(t)&&t>=-1&&(-1===e||t<=e)?t:e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"required",{get:function(){var e=this.get("field.nullable"),t=this.get("config.required");return this.editable&&(!e||!0===t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"type",{get:function(){var e=this.field;return u.isNumericField(e)?"number":u.isStringField(e)?"text":u.isDateField(e)?"date":"unsupported"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"valid",{get:function(){var e=this.editable?this._validate():null;return this._set("error",e),null===e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"value",{get:function(){return this._get("value")},set:function(e){this.notifyChange("evaluatedVisibility"),this._set("value",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{get:function(){return!this._isEditorField()&&("boolean"==typeof this.evaluatedVisibility?this.evaluatedVisibility:!!this.config||this._shownByDefault())},enumerable:!0,configurable:!0}),t.prototype._isDomainCompatible=function(e){var t=this.field;if(e&&"coded-value"===e.type){var r=typeof e.codedValues[0].code;if("string"===r&&u.isStringField(t)||"number"===r&&u.isNumericField(t))return!0}return!(!e||"range"!==e.type||!u.isNumericField(t))},t.prototype._validate=function(){var e=this,t=e.domain,r=e.field,i=e.value;return t?null!==i||this.required?d.validateDomainValue(t,i):null:u.validateFieldValue(r,i)},t.prototype._shownByDefault=function(){var e=this.get("field.type");return"oid"!==e&&"global-id"!==e&&!this._isGeometryField()},t.prototype._isEditorField=function(){return u.getFeatureEditFields(this.layer).indexOf(this.name)>-1},t.prototype._isGeometryField=function(){return u.getFeatureGeometryFields(this.layer).indexOf(this.name)>-1},t.prototype._toErrorMessage=function(){var e=this,t=e.domain,r=e.field,i=e.value,l=e.required,a=e.type,p=this.error;if(l&&null===i)return o.validationErrors.cannotBeNull;if(p===d.DomainValidationError.VALUE_OUT_OF_RANGE||p===u.NumericRangeValidationError.OUT_OF_RANGE){var c=d.getDomainRange(t)||u.getFieldRange(r),f=c.min,g=c.max;return n.substitute(o.validationErrors.outsideRange,{min:f,max:g},{format:{max:"date"===a?y:s,min:"date"===a?y:s}})}return p===d.DomainValidationError.INVALID_CODED_VALUE?o.validationErrors.invalidCodedValue:p===u.TypeValidationError.INVALID_TYPE?o.validationErrors.invalidType:null},i([a.property()],t.prototype,"arcade",void 0),i([a.property({dependsOn:["arcade","config.visibilityExpression"]})],t.prototype,"compiledFunc",null),i([a.property({dependsOn:["compiledFunc","feature"]})],t.prototype,"evaluatedVisibility",null),i([a.property()],t.prototype,"config",void 0),i([a.property()],t.prototype,"feature",void 0),i([a.property()],t.prototype,"field",void 0),i([a.property()],t.prototype,"layer",void 0),i([a.property({aliasOf:"config.description"})],t.prototype,"description",void 0),i([a.property({dependsOn:["config","feature","field","layer"]})],t.prototype,"domain",null),i([a.property({dependsOn:["config","field","layer"]})],t.prototype,"editable",null),i([a.property({aliasOf:"config.editorType"})],t.prototype,"editorType",void 0),i([a.property({readOnly:!0})],t.prototype,"error",void 0),i([a.property({dependsOn:["error","value"]})],t.prototype,"errorMessage",null),i([a.property({aliasOf:"config.format"})],t.prototype,"format",void 0),i([a.property()],t.prototype,"group",void 0),i([a.property({aliasOf:"config.hint"})],t.prototype,"hint",void 0),i([a.property({dependsOn:["field","config"]})],t.prototype,"label",null),i([a.property({dependsOn:["field.length","config"]})],t.prototype,"maxLength",null),i([a.property({aliasOf:"field.name"})],t.prototype,"name",void 0),i([a.property({dependsOn:["field","config"]})],t.prototype,"required",null),i([a.property({dependsOn:["field"]})],t.prototype,"type",null),i([a.property({dependsOn:["config","domain","field","layer","value"]})],t.prototype,"valid",null),i([a.property({value:null})],t.prototype,"value",null),i([a.property({dependsOn:["config","evaluatedVisibility","field","layer"]})],t.prototype,"visible",null),t=i([a.subclass("esri.widgets.FeatureForm.InputField")],t)}(a.declared(l))});