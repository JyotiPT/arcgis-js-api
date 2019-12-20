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

define(["require","exports","../../../../core/Error","../../../../core/maybe","../../../../core/promiseUtils"],function(e,t,n,r,o){function i(e){return o.create(function(t,n){e.oncomplete=function(){return t()},e.onerror=function(){return n(e.error)},e.onabort=function(){return n(e.error)}})}function s(e){return o.create(function(t,n){"done"===e.readyState?null!=e.error?n(e.error):t(e.result):(e.onsuccess=function(){return t(e.result)},e.onerror=function(){return n(e.error)})})}Object.defineProperty(t,"__esModule",{value:!0});var c=14,u=function(){function e(e,t,n){void 0===n&&(n=c),this._version=n,this._db=null,this._quotaReductionPromise=null,this._gcCounter=0,this._hit=0,this._miss=0,this._destroyed=!1,this.gcFrequency=50,this.maxByteSize=1073741824,this.quotaReductionFactor=.2,this._dbName=e,this._storeName=t}return e.prototype.init=function(){var e=this;return o.resolve().then(function(){var t=indexedDB.open(e._dbName,e._version);return t.onupgradeneeded=function(n){var r=t.result,o=t.transaction,i=r.objectStoreNames.contains(e._storeName)?o.objectStore(e._storeName):r.createObjectStore(e._storeName),s=r.objectStoreNames.contains("last_access")?o.objectStore("last_access"):r.createObjectStore("last_access");s.indexNames.contains("date")||s.createIndex("date","date",{unique:!1}),s.indexNames.contains("byteSize")||s.createIndex("byteSize","byteSize",{unique:!1}),n.oldVersion<e._version&&(i.clear(),s.clear())},s(t)}).then(function(t){e._destroyed?t.close():e._db=t})},e.prototype.destroy=function(){this._db&&(this._db.close(),this._db=null),this._destroyed=!0},Object.defineProperty(e.prototype,"initialized",{get:function(){return null!=this._db},enumerable:!0,configurable:!0}),e.prototype.getHitRate=function(){return this._hit/(this._hit+this._miss)},e.prototype.put=function(e,t){var r=this;return null==this._db?o.reject(new n("indexedb:not-initialized","IndexedDB Cache is not initialized")):(null!=this._quotaReductionPromise?this._quotaReductionPromise:o.resolve()).then(function(){return r._put(e,t)}).catch(function(n){if(n&&"QuotaExceededError"===n.name)return null==r._quotaReductionPromise&&(r._quotaReductionPromise=r._getCacheSize().then(function(e){return r._removeLeastRecentlyAccessed(t.byteSize+Math.ceil(e*r.quotaReductionFactor))}),r._quotaReductionPromise.then(function(){return r._quotaReductionPromise=null},function(){return r._quotaReductionPromise=null})),r._quotaReductionPromise.then(function(){return r._put(e,t)});throw n}).then(function(){--r._gcCounter<0&&null!=r._db&&(r._gcCounter=r.gcFrequency,r._getCacheSize().then(function(e){return r._removeLeastRecentlyAccessed(e-r.maxByteSize)}))})},e.prototype.get=function(e,t){var n=this;if(null==this._db)return o.resolve(null);var i=null;return o.resolve().then(function(){var r=n._db.transaction(n._storeName,"readonly");return i=o.onAbort(t,function(){r.abort()}),s(r.objectStore(n._storeName).get(e))}).then(function(t){if(null==t)++n._miss;else if(n._db){++n._hit;var o=n._db.transaction("last_access","readwrite"),s=o.objectStore("last_access");s.put({date:Date.now(),byteSize:t.byteSize},e)}return r.isSome(i)&&i.remove(),t}).catch(function(){return++n._miss,o.throwIfAborted(t),r.isSome(i)&&i.remove(),null})},e.prototype.remove=function(e){var t=this;return null==this._db?o.resolve():o.resolve().then(function(){var n=t._db.transaction([t._storeName,"last_access"],"readwrite"),r=n.objectStore(t._storeName),c=n.objectStore("last_access"),u=r.delete(e),a=c.delete(e);return o.all([s(u),s(a),i(n)])})},e.prototype._put=function(e,t){var n=this._db.transaction([this._storeName,"last_access"],"readwrite"),r=n.objectStore(this._storeName),c=n.objectStore("last_access"),u=r.put(t,e),a=c.put({date:Date.now(),byteSize:t.byteSize},e);return o.all([s(u),s(a),i(n)])},e.prototype._removeLeastRecentlyAccessed=function(e){if(!(e<=0)){var t=this._db.transaction([this._storeName,"last_access"],"readwrite"),n=t.objectStore(this._storeName),r=t.objectStore("last_access"),o=0,s=r.index("date").openCursor(null,"next");return s.onsuccess=function(){var t=s.result;null!=t&&(null!=t.value.byteSize&&(o+=t.value.byteSize),n.delete(t.primaryKey),r.delete(t.primaryKey),o<e&&t.continue())},i(t)}},e.prototype._getCacheSize=function(){var e=this._db.transaction("last_access"),t=e.objectStore("last_access"),n=0,r=t.index("byteSize").openKeyCursor();return r.onsuccess=function(){var e=r.result;if(e){var t=e.key;null!=t&&(n+=t),e.continue()}},i(e).then(function(){return n})},e}();t.IDBCache=u,t.whenTransaction=i,t.whenRequest=s});