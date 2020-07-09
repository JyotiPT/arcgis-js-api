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

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/MathUtil","esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridDataUtil","../../tableJson/TableJsonUtil"],(function(e,t,n,o){var a={},i=function(e,t,n,o,a,i){var s,c;l.collectStatistics(t),e._parentBox={x:function(){switch(a){case"floating":return t.style.left+i.left;case"page":return l.calcX(t,n,o)+i.left}}(),y:function(){switch(a){case"floating":return t.style.top+i.top;case"page":return l.calcY(t,n,o)+i.top}}(),w:l.calcFullWidth(t,n,o),h:l.calcFullHeight(t,n,o)},e._parentStyle={backgroundColor:(s=n,c=o.field,s.style.fields=s.style.fields||{},(s.style.fields[c]=s.style.fields[c]||{}).backgroundColor)}},s=function(e){l.sanitize(e)},l={collectStatistics:function(e){if(!e._measureInfo){var t,n={},o={};e.data.columns.forEach((function(e){t&&(o[t.field]=e),t=e,n[e.field]=e}));var a={},i={},s={},c={},r={},f={};e.data.data.forEach((function(t,n){e.data.columns.forEach((function(e,o){var d=r[o]||0,u=f[n]||0;d+=l._getDataHeight(t,e.field),u+=l._getFieldWidth(t,e),r[o]=d,f[n]=u;var g=o+"_"+n;i[g]=d,a[g]=u,s[g]=a[o-1+"_"+n]||0,c[g]=i[o+"_"+(n-1)]||0}))})),e._measureInfo={xPositions:s,yPositions:c,columnsHash:n,nextColumnHash:o}}},calcX:function(e,t,n){var o=e.data.columns.indexOf(n),a=e.data.data.indexOf(t);return e._measureInfo.xPositions[o+"_"+a]||0},calcY:function(e,t,n){var o=e.data.columns.indexOf(n),a=e.data.data.indexOf(t);return e._measureInfo.yPositions[o+"_"+a]||0},calcFullWidth:function(e,t,n){var o=n.field,a=l._getFieldWidth(t,e._measureInfo.columnsHash[o]),i=t.columnSpans&&t.columnSpans[o]||1;if(i>1)for(var s,c=0;c<i-1;c++)s=e._measureInfo.nextColumnHash[s?s.field:o],a+=l._getFieldWidth(t,s);return a},_getFieldWidth:function(e,t){return e.style.fields=e.style.fields||{},(e.style.fields[t.field]=e.style.fields[t.field]||{}).width||t.style.width},calcFullHeight:function(e,t,n){var o=n.field,a=e.data.data.indexOf(t),i=l._getDataHeight(t,o),s=t.rowSpans&&t.rowSpans[o]||1;if(s>1)for(var c,r=a+1,f=0;f<s-1;f++)c=e.data.data[r++],i+=l._getDataHeight(c,o);return i},_getDataHeight:function(e,t){return e.style.fields=e.style.fields||{},(e.style.fields[t]=e.style.fields[t]||{}).height||e.style.height},sanitize:function(e){delete e._measureInfo}},c=function(e,a,i,s,l){var c=[],r=[];function f(e){var s=e.data.data[0].fieldInfos[e.data.columns[0].field];return!!(n.isTextLikeCell(s)||n.isShapeCell(s)||n.isImageCell(s))&&t.checkRectsIntersect([i,{x:e.style.left+a.left,y:e.style.top+a.top,w:o.getTableWidth(e),h:o.getTableHeight(e)}])}function d(e){return t.checkRectsIntersect([i,{x:e.style.left+a.left,y:e.style.top+a.top,w:e.style.width,h:e.style.height}])}return e.backgroundFloatingTablesSectionJson&&e.backgroundFloatingTablesSectionJson.stack.forEach((function(e,t){(-1===s||l||s!==t)&&(("table"===e.id&&f(e)||"img"===e.id&&d(e))&&(-1===s||l||s>t?c.push(e):r.push(e)))})),e.foregroundFloatingTablesSectionJson&&e.foregroundFloatingTablesSectionJson.stack.forEach((function(e,t){if(l&&s===t)return!0;("table"===e.id&&f(e)||"img"===e.id&&d(e))&&(l&&s>t?c.push(e):r.push(e))})),{elementJsonsBehind:c,elementJsonsAbove:r}};return a.collectSectionJsons=function(e,t){t=t||{};var n=[];return e?e.sections?e.sections:e.sectionsTables?(t.processSectionJson=t.processSectionJson||function(){},e.sectionsTables.forEach((function(o,i){var s=function(){!1!==t.backgroundForeground&&o.backgroundSectionJson&&o.backgroundSectionJson.stack&&n.push(o.backgroundSectionJson)},l=function(s){var l=[];!1!==t.floatingTables&&o.backgroundFloatingTablesSectionJson&&o.backgroundFloatingTablesSectionJson.stack.forEach((function(n,i){"table"===n.id&&a._processTableJson(n,l,"floating",e.documentOptions,t,o,i,!1)})),s&&l.reverse(),l.forEach((function(e){t.processSectionJson(e,{pageIndex:i,source:"foreground",floatingIndex:e.__floatingIndex}),delete e.__floatingIndex})),n=n.concat(l)},c=function(){var s=[];a._processTableJson(o,s,"page",e.documentOptions,t,o),s.forEach((function(e){t.processSectionJson(e,{pageIndex:i,source:"grid",index:e.__inGridIndex}),delete e.__inGridIndex})),n=n.concat(s)},r=function(s){var l=[];!1!==t.floatingTables&&o.foregroundFloatingTablesSectionJson&&o.foregroundFloatingTablesSectionJson.stack.forEach((function(n,i){"table"===n.id&&a._processTableJson(n,l,"floating",e.documentOptions,t,o,i,!0)})),s&&l.reverse(),l.forEach((function(e){t.processSectionJson(e,{pageIndex:i,source:"foreground",floatingIndex:e.__floatingIndex}),delete e.__floatingIndex})),n=n.concat(l)},f=function(){!1!==t.backgroundForeground&&o.foregroundSectionJson&&o.foregroundSectionJson.stack&&n.push(o.foregroundSectionJson)};t.topFirst?(f(),r(!0),c(),l(!0),s()):(s(),l(),c(),r(),f())})),n):[]:[]},a._processTableJson=function(t,n,o,a,l,r,f,d){t.data.data.forEach((function(s,u){s.fieldInfos&&t.data.columns.forEach((function(g,h){var p=s.fieldInfos[g.field];if(p&&p.sectionJson&&p.sectionJson.stack){if(l.processFieldInfoFunc&&l.processFieldInfoFunc(p),(!1!==l.saveParentInfo||l.populateWithFloatingElementsBehind)&&i(p.sectionJson,t,s,g,o,a),l.populateWithFloatingElementsBehind){var _,b=e.clone(p.sectionJson);function m(t){return(t=e.clone(t)).isContextFloatingElement=!0,t.style.left=t.style.left+a.left-b._parentBox.x,"table"===t.id?t.style.top=t.style.top+a.top-b._parentBox.y:"img"!==t.id&&"map"!==t.id||(t.style.top=t.style.top+a.top-b._parentBox.y),t}"page"===o?_=c(r,a,b._parentBox,-1,void 0):"floating"===o&&(_=c(r,a,b._parentBox,f,d));var x=_.elementJsonsBehind.map(m),y=_.elementJsonsAbove.map(m);b.stack=x.concat(b.stack),b.stack=b.stack.concat(y),n.push(b)}else n.push(p.sectionJson);var J=n[n.length-1];"page"===o?J.__inGridIndex=u*t.data.columns.length+h:J.__floatingIndex=f}}))})),s(t)},a.getParentBox=function(e){return e&&e._parentBox},a.setParentBox=function(e,t){e._parentBox=t},a.getParentStyle=function(e){return e&&e._parentStyle},a}));