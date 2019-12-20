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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/maybe","../../../../core/PooledArray","../../../../core/promiseUtils","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec4f64","./I3SUtil","../../support/orientedBoundingBox"],function(e,t,r,i,n,o,s,a,d,l){function u(e){e.node?(e.node.renderMbs[3]=-1,e.node.renderObb.halfSize[0]=-1):e.ref&&(e.ref.renderMbs[3]=-1,e.ref.renderObb.halfSize[0]=-1)}function h(e){return d.addWraparound(e,-2)}function c(e){return d.addWraparound(e,2)}function f(e,t){return t+(e?1:0)}function g(e,t){return(-2&e)===t}function p(e){return 1==(1&e)}function m(e,t){return 0===t?0:e/t|0}function v(e,t){return 0===t?e:e%t}function _(e){if(e)for(var t=0;t<e.length;t++)for(var r=0,i=N;r<i.length;r++){var n=i[r];if(n[0]===e[t].metricType)return{lodMetric:n[1],maxError:e[t].maxError}}return{lodMetric:0,maxError:0}}function y(e){return Math.sqrt(e*(4/Math.PI))}Object.defineProperty(t,"__esModule",{value:!0});var b=function(){function e(e,t,r,i,o,s,a,d,l){this.streamDataController=t,this.viewportQueries=r,this.logger=i,this._isLoaded=o,this._isSelected=s,this._enable=a,this._needsUpdate=d,this._canRequest=l,this._dirty=!0,this.nodePages=[],this.nodeCount=0,this.nodesPerPage=0,this.rootIndex=0,this.lodMetric=0,this.lodConversion=function(e){return e},this._loading=new Set,this._failedNodes=new Set,this._failedPages=new Set,this._indexMissing=1,this._maxUnloadedPrio=Number.NEGATIVE_INFINITY,this._maxProcessingPrio=Number.POSITIVE_INFINITY,this._nodeTraversalState={},this._version=0,this._visibilityCacheGeneration=c(0),this._maxLevel=1,this._featureEstimate={estimate:0,leafsReached:!1},this._unloadedMemoryEstimate=0,this._missing=new n({deallocator:null}),this._prefetch=new n({deallocator:null}),this._updates=new x,this.ignoreServiceOBB=!1,this.progressiveLoadPenalty=0,this.layerUrl=e.parsedUrl.path,this.rootId=e.rootNode&&e.rootNode.split("/").pop(),e.serviceUpdateTimeStamp&&e.serviceUpdateTimeStamp.lastUpdate&&(this.lastUpdate=""+e.serviceUpdateTimeStamp.lastUpdate),this._maxLodLevel=this.viewportQueries?this.viewportQueries.maxLodLevel:1,e.nodePages?this.initNodePages(e.nodePages):this.initNodeDocuments(this.rootId)}return e.prototype.initNodePages=function(e){switch(this.nodesPerPage=e.nodesPerPage,this.rootIndex=e.rootIndex,e.lodSelectionMetricType){case"maxScreenThreshold":this.lodMetric=1;break;case"maxScreenThresholdSQ":this.lodMetric=1,this.lodConversion=y}},e.prototype.initNodeDocuments=function(e){this.nodesPerPage=0,this.rootIndex=0,this.nodePages.push({nodes:[],children:[],parents:[]}),this.makeRefNode({id:e,mbs:null},-1)},e.prototype.loadPage=function(e){var t=this;this._loading.add(e);var r=this.layerUrl+"/nodepages/"+e;return this.streamDataController.request(r,"json").then(function(r){t._loading.delete(e),t.addPage(e,r)}).catch(function(r){if(t._loading.delete(e),o.isAbortError(r))throw r;throw t._failedPages.add(e),0===t.nodePages.length&&t.initNodeDocuments(t.rootId),r})},e.prototype.addPage=function(e,t){for(var r=this,i=this.nodePages.length;i<e;i++)this.nodePages[i]=null;var n=[],o=[],d=t.nodes.map(function(t,i){var d=n.length,u=t.children?t.children.length:0;o.push(-1);for(var c=0;c<u;c++)n.push(t.children[c]);var f=""+t.index,g=l.clone(t.obb),p=a.vec4f64.fromArray([g.center[0],g.center[1],g.center[2],s.vec3.length(g.halfSize)]),m=t.mesh&&t.mesh.attribute,v=t.mesh&&t.mesh.geometry,_=t.mesh&&t.mesh.material,y={hasSharedResource:!1,hasFeatureData:!!v,attributes:m&&null!=m.resource?""+m.resource:null,geometry:v&&null!=v.resource?""+v.resource:null,texture:_&&null!=_.resource&&_.texelCountHint>0?""+_.resource:null,geometryDefinition:v?v.definition:-1,materialDefinition:_?_.definition:-1},b={id:f,index:e*r.nodesPerPage+i,childCount:u,failed:!1,cacheState:0,obb:g,mbs:p,level:0,resources:y,lodMetric:r.lodMetric,maxError:r.lodConversion(t.lodThreshold),renderMbs:a.vec4f64.fromArray([0,0,0,-1]),renderObb:l.create([0,0,0],[-1,-1,-1],[0,0,0,1]),numFeatures:v?v.featureCount:null,vertexCount:v?v.vertexCount:null,version:r.lastUpdate};return{childOffset:d,childCount:u,visibilityCache:h(r._visibilityCacheGeneration),ref:null,node:b}});this.nodePages[e]={nodes:d,children:n,parents:o},this.nodeCount+=d.length,this.updateParentsAndLevel()},e.prototype.updateParentsAndLevel=function(){var e=this,t=[],r=function(r,n,o){var s=e.getPage(r);if(i.isSome(s)){var a=v(r,e.nodesPerPage);s.parents[a]=n;var d=s.nodes[a].node;d&&(d.level=o,t.push(r))}};for(r(this.rootIndex,-1,0);t.length;)for(var n=t.pop(),o=this.getNode(n),s=0;s<o.childCount;s++){var a=this.getChildIndex(o,s);r(a,n,o.level+1)}},e.prototype.getPage=function(e){return this.nodePages[m(e,this.nodesPerPage)]},e.prototype.getNodeInternal=function(e){var t=this.getPage(e);return i.isNone(t)?null:t.nodes[v(e,this.nodesPerPage)]},e.prototype.addNode=function(e,t){null!=e.children&&this.populateChildren(t,e.children);var r=this.getParent(t),n=r?r.level+1:1;this._maxLevel=Math.max(this._maxLevel,n);var o=_(e.lodSelection),s=o.lodMetric,d=o.maxError,u=i.expect(this.getNodeInternal(t));return u.node={id:e.id,index:t,mbs:a.vec4f64.fromArray(e.mbs),obb:e.obb&&l.clone(e.obb),childCount:u.childCount,level:n,resources:e.resources,version:e.version,lodMetric:s,maxError:d,memory:null,numFeatures:e.numFeatures,failed:!1,cacheState:0},null==u.ref.mbs&&(u.ref.mbs=e.mbs),u.node.renderMbs=u.ref.renderMbs,u.node.renderObb=u.ref.renderObb,u.node},e.prototype.makeRefNode=function(e,t){var r=this.nodePages[0],i=r.nodes.length;return r.nodes.push({childOffset:0,childCount:0,node:null,ref:e,visibilityCache:h(this._visibilityCacheGeneration)}),this.nodeCount++,r.parents.push(t),e.renderMbs=a.vec4f64.fromArray([0,0,0,-1]),e.renderObb=l.create([0,0,0],[-1,-1,-1],[0,0,0,1]),i},e.prototype.populateChildren=function(e,t){var r=i.expect(this.getNodeInternal(e)),n=i.expect(this.getPage(e));r.childOffset=n.children.length,r.childCount=t.length;for(var o=0;o<t.length;o++){var s=this.makeRefNode(t[o],e);n.children.push(s)}},e.prototype.getNode=function(e){var t=this.getNodeInternal(e);return i.isSome(t)&&t.node},e.prototype.getIndexById=function(e){var t;return this.forAllNodes(function(r,i){(r.node?r.node.id:r.ref.id)===e&&(t=i)}),t},e.prototype.getNodeById=function(e){var t=this.getIndexById(e),r=null!=t?this.getNodeInternal(t):null;return i.isSome(r)?r.node:null},e.prototype.getChildIndex=function(e,t){var r=this.getPage(e.index);if(i.isNone(r))return-1;var n=r.nodes[v(e.index,this.nodesPerPage)];return r.children[n.childOffset+t]},e.prototype.getParentIndex=function(e){var t=this.getPage(e);return i.isSome(t)?t.parents[v(e,this.nodesPerPage)]:-1},e.prototype.getParent=function(e){return e=this.getParentIndex(e),e>=0?this.getNode(e):null},Object.defineProperty(e.prototype,"rootNode",{get:function(){var e=this.getNodeInternal(this.rootIndex);return i.isSome(e)?e.node:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return this.nodeCount},enumerable:!0,configurable:!0}),e.prototype.invalidateVisibilityCache=function(e){if(null!=e){var t=this.getNodeInternal(e);i.isSome(t)&&(t.visibilityCache=h(this._visibilityCacheGeneration))}else this._visibilityCacheGeneration=c(this._visibilityCacheGeneration)},e.prototype.isNodeVisible=function(e){var t=this.getNodeInternal(e);if(i.isNone(t)||t.ref&&!t.ref.mbs)return!0;if(!g(t.visibilityCache,this._visibilityCacheGeneration)){var r=this.viewportQueries.isNodeVisible(t.ref||t.node);return t.visibilityCache=f(r,this._visibilityCacheGeneration),r}return p(t.visibilityCache)},e.prototype.isGeometryVisible=function(e){if(!this.isNodeVisible(e))return!1;var t=this.getNodeInternal(e);return!!i.isNone(t)||(!(t.node&&t.ref&&!t.ref.obb)||this.viewportQueries.isGeometryVisible(t.node))},Object.defineProperty(e.prototype,"maxLevel",{get:function(){return this._maxLevel},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dirty",{get:function(){return this._dirty},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._updates.add.prune(),this._updates.update.prune()},e.prototype.requestUpdate=function(){this._dirty=!0,this._indexMissing=1,++this._version},e.prototype.update=function(e,t){var r=this;if(this._dirty){this._maxUnloadedPrio=Number.NEGATIVE_INFINITY,this._maxProcessingPrio=Number.NEGATIVE_INFINITY,this._missing.clear(),this._prefetch.clear(),this._updates.reset(e,this._missing),P.clear();var n=!0,o=new I,s=new I,a=function(a,d){if(!d){var l=r.entryPriority(a),u=m(a,r.nodesPerPage);return P.set(u,Math.max(l,P.get(u)||0)),r._loading.has(u)||r._failedPages.has(u)||r._missing.push(u),void(r._maxProcessingPrio=Math.max(r._maxProcessingPrio,l))}var h=d.node;if(r._updateNodeFeatureEstimate(h,s),!h){var c=r.entryPriority(a);return r._loading.has(a)||r._failedNodes.has(a)||(r._missing.push(a),P.set(a,c)),void(r._maxProcessingPrio=Math.max(r._maxProcessingPrio,c))}var f=i.expect(r.getPage(a));if(0===r._missing.length&&0===r.nodesPerPage)for(var g=0;g<d.childCount;g++){var p=f.children[d.childOffset+g],v=r.getNodeInternal(p);!i.isSome(v)||v.node||r._loading.has(p)||r._failedNodes.has(p)||(P.set(p,r.entryPriority(p)),r._prefetch.push(p))}if(!h.failed&&h.resources.hasFeatureData)if(r._isLoaded(a)){if(o.known+=h.memory,++o.knownNodes,r._isSelected(h)?d.childCount>0&&(n=!1):(o.unremoved+=h.memory,n=!1),r._needsUpdate(h)){var _=r.entryPriority(a);P.set(a,_),r._maxProcessingPrio=Math.max(r._maxProcessingPrio,_),r._updates.update.push(a)}}else if(h.memory&&(o.known+=h.memory,++o.knownNodes),r._isSelected(h)){if(d.childCount>0&&(n=!1),h.memory?(o.missing+=h.memory,o.known+=h.memory,++o.knownNodes):++o.missingNodes,e.indexOf(h.index)>=0)return r._maxProcessingPrio=Math.max(r._maxProcessingPrio,r.entryPriority(a)),void(r._updates.cancel=r._updates.cancel.filter(function(e){return e!==h.index}));if(!t.done&&r._enable(h))return void t.madeProgress();var y=r.entryPriority(a);P.set(a,y),r._maxProcessingPrio=Math.max(r._maxProcessingPrio,y),r._updates.add.push(a)}};this.traverseVisible(a),this._unloadedMemoryEstimate=o.missing-o.unremoved,o.knownNodes>3&&o.missingNodes>0&&(this._unloadedMemoryEstimate+=o.known/o.knownNodes*o.missingNodes),this._unloadedMemoryEstimate=.8*Math.max(0,this._unloadedMemoryEstimate),this._featureEstimate.estimate=this._computeFeatureEstimate(s),this._featureEstimate.leafsReached=n,this._missing.sort(function(e,t){return e-t}),this._missing.filterInPlace(function(e,t){return t<1||r._missing.data[t-1]!==e}),this._missing.sort(function(e,t){return P.get(e)-P.get(t)}),this._missing.length>0?(this._maxUnloadedPrio=P.get(this._missing.back()),this._prefetch.clear()):this._prefetch.sort(function(e,t){return P.get(e)-P.get(t)}),this._updates.add.filterInPlace(function(e){return P.get(e)>=r._maxUnloadedPrio}).sort(function(e,t){return P.get(e)-P.get(t)}),this._updates.update.sort(function(e,t){return P.get(e)-P.get(t)}),this._indexMissing=this._loading.size+this._missing.length,this._dirty=this._indexMissing>0,P.clear()}},e.prototype.checkFeatureTarget=function(e,t){for(var r=this.viewportQueries.updateScreenSpaceErrorBias(t),i=t,n=t,o=r,s=10;s--;){var a=new I;this._updateFeatureEstimate(i,a);if(this._computeFeatureEstimate(a)<=e){if(i>=t||a.missingNodes>0||0===s)break;o=i,i=.5*(i+n)}else n=i,i=.5*(i+o)}return++this._version,this.viewportQueries.updateScreenSpaceErrorBias(r),Math.min(t,i)},e.prototype._updateFeatureEstimate=function(e,t){var r=this;++this._version,this.viewportQueries.updateScreenSpaceErrorBias(e),this.traverseVisible(function(e,i){return r._updateNodeFeatureEstimate(i&&i.node,t)})},e.prototype._updateNodeFeatureEstimate=function(e,t){if(e&&!e.failed&&null!=e.numFeatures)return this._isLoaded(e.index)?(t.known+=e.numFeatures,++t.knownNodes,void(this._isSelected(e)||(t.unremoved+=e.numFeatures))):void(this._isSelected(e)&&(e.numFeatures?(t.missing+=e.numFeatures,t.known+=e.numFeatures,++t.knownNodes):++t.missingNodes))},e.prototype._computeFeatureEstimate=function(e){var t=e.known-e.unremoved;return e.knownNodes>3&&e.missingNodes>0&&(t+=e.known/e.knownNodes*e.missingNodes),Math.max(0,t)},e.prototype.load=function(){return this._load(this._missing)},e.prototype.prefetch=function(){return this._load(this._prefetch)},e.prototype._load=function(e){if(0===e.length||!this._canRequest())return!1;for(;e.length>0&&this._canRequest();)0===this.nodesPerPage?this._loadNode(e.pop()):this.loadPage(e.pop());return!0},e.prototype.isLoading=function(){return this._indexMissing>0},e.prototype.getIndexLoading=function(){return this._loading.size},e.prototype.getIndexMissing=function(){return this._indexMissing},e.prototype.getUnloadedMemoryEstimate=function(){return this._unloadedMemoryEstimate},Object.defineProperty(e.prototype,"updates",{get:function(){return this._updates},enumerable:!0,configurable:!0}),e.prototype.getFeatureEstimate=function(){return this._featureEstimate},e.prototype.nodeTraversalState=function(e){if(!e)return null;var t=this._nodeTraversalState[e.index];if(t&&t.version===this._version)return t;var r=this.viewportQueries.getLodLevel(e),i=this.viewportQueries.hasLOD(e),n=!0;if(i){var o=this.getParentIndex(e.index);if(o>=0){var s=this._nodeTraversalState[o];n=s&&r>s.lodLevel}else n=r>0}else n=0===e.childCount;return t?(t.lodLevel=r,t.isChosen=n,t.version=this._version,t):(this._nodeTraversalState[e.index]={nodeHasLOD:i,lodLevel:r,isChosen:n,version:this._version},this._nodeTraversalState[e.index])},e.prototype._loadNode=function(e){var t=this;this._loading.add(e);var r=i.expect(this.getNodeInternal(e)).ref.id,n=this.layerUrl+"/nodes/"+r,s=function(){t._loading.delete(e),0===t._missing.length&&0===t._loading.size&&t.requestUpdate()};this.streamDataController.request(n,"json").then(function(i){var n=t._validateNode(r,i);if(null==n)return void s();n.obb&&t.invalidateVisibilityCache(e);var o=t.addNode(n,e);t.nodeTraversalState(o),s()},function(r){o.isAbortError(r)||(t.logger.error("Error loading node: "+n),t._failedNodes.add(e)),s()})},e.prototype._validateNode=function(e,t){var r=this;if(null==t||"object"!=typeof t||t.id!==e)return this.logger.error('Invalid node. Wrong type or wrong id "'+e+'"'),null;t.sharedResource&&"./shared"!==t.sharedResource.href&&"./shared/"!==t.sharedResource.href&&this.logger.warn('Invalid shared resource href on node "'+e+'"'),null==t.geometryData||Array.isArray(t.geometryData)&&1===t.geometryData.length&&"./geometries/0"===t.geometryData[0].href||this.logger.warn('Invalid geometry data on node "'+e+'"'),null==t.attributeData||Array.isArray(t.attributeData)&&!t.attributeData.some(function(e,t){return e.href!=="./attributes/f_"+t+"/0"})||this.logger.warn('Invalid attribute data on node "'+e+'"'),t.featureData&&t.featureData.length>1&&this.logger.warn("Node "+e+" has "+t.featureData.length+" bundles. Only the first bundle will be loaded.");var i=t.hasOwnProperty("obb")&&!this.ignoreServiceOBB?t.obb:null,n=t.featureData&&1===t.featureData.length&&t.featureData[0].featureRange?t.featureData[0].featureRange[1]-t.featureData[0].featureRange[0]+1:null,o=function(t){if(null==t)return null;var i=function(t){return r.logger.error("Invalid node reference on node "+e+": "+t)};if("number"==typeof t.id)i("id "+t.id+" is a number instead of a string.");else if("string"!=typeof t.id||!Array.isArray(t.mbs))return i("Missing or invalid id."),null;if(!Array.isArray(t.mbs))return i("Invalid bounding volume on reference "+t.id+"."),null;t.href&&t.href!=="../"+t.id&&r.logger.error('Invalid node href on node "'+e+'"');var n=t.hasOwnProperty("obb")&&!r.ignoreServiceOBB?t.obb:null;return{id:""+t.id,mbs:t.mbs,obb:n}},s=Array.isArray(t.children)?t.children.map(o).filter(function(e){return null!=e}):null;return{id:e,mbs:t.mbs,obb:i,children:s,resources:{hasFeatureData:t.featureData&&t.featureData.length>0,hasSharedResource:null!=t.sharedResource,attributes:t.attributeData?e:null,texture:t.textureData&&t.textureData.length>0?e:null,geometry:null!=t.geometryData?e:null},version:"string"==typeof t.version?t.version:null,lodSelection:Array.isArray(t.lodSelection)?t.lodSelection:null,numFeatures:n}},e.prototype.resetFailedNodes=function(){this._failedNodes.clear(),this._failedPages.clear(),this.forAllNodes(function(e){e.node&&(e.node.failed=!1)})},e.prototype.entryPriority=function(e){var t=this.getNodeInternal(e),r=this.getParentIndex(e);if(i.isNone(t)||r<0&&null==t.node)return r<0?1/0:this.entryPriority(r);var n=0;if(t.node&&r>=0){var o=this._nodeTraversalState[r];null!=o&&(n=o.lodLevel)}for(var s=this.progressiveLoadPenalty,a=e;a>=0;a=this.getParentIndex(a))if(this._isLoaded(a)){s=0;break}var d=this.viewportQueries.distToPOI(t.ref||t.node);return-d-n*(d+this.progressiveLoadPenalty)+s},e.prototype.traverseVisible=function(e){var t=this.getNodeInternal(this.rootIndex);if(!i.isSome(t))return void e(this.rootIndex,null);this._traverse(this.rootIndex,t,e)},e.prototype._traverse=function(e,t,r){if(t.node&&0===t.childCount)return void(this.isGeometryVisible(e)&&r(e,t));if(this.isNodeVisible(e)&&(r(e,t),null!=t.node)){var n=this.nodeTraversalState(t.node);if(!n.nodeHasLOD||n.lodLevel!==this._maxLodLevel)for(var o=i.expect(this.getPage(e)),s=0;s<t.childCount;s++){var a=o.children[t.childOffset+s],d=this.getNodeInternal(a);i.isSome(d)?this._traverse(a,d,r):r(a,null)}}},e.prototype.traverse=function(e,t){t(e)&&this.traverseChildren(e,t)},e.prototype.traverseChildren=function(e,t){var r=e.index,n=this.getNodeInternal(r);i.isSome(n)&&this._traverseChildren(r,n,t)},e.prototype._traverseChildren=function(e,t,r){var n=this.getPage(e);if(!i.isNone(n))for(var o=0;o<t.childCount;++o){var s=n.children[t.childOffset+o],a=this.getNodeInternal(s);i.isSome(a)&&a.node&&r(a.node)&&this._traverseChildren(s,a,r)}},e.prototype.updateStats=function(e){if(this._updates.add.length>0&&(e.nodes+=" + "+this._updates.add.length),(this._indexMissing||this._prefetch.length>0)&&(e.index+=" + "+this._indexMissing||this._prefetch.length),e.prio=this._maxProcessingPrio,this._featureEstimate.estimate){var t=this._featureEstimate.estimate-e.features;t>0?e.features+=" + "+t:t<0&&(e.features+=" - "+-t)}},e.prototype.getPriority=function(){return Math.max(this._maxProcessingPrio,this._maxUnloadedPrio)},e.prototype.updateElevationInfo=function(e){this.forAllNodes(u),this.viewportQueries.updateElevationInfo(e)},e.prototype.invalidateBoundingVolumeCache=function(e){var t=this.getNodeInternal(e);i.isSome(t)&&u(t)},e.prototype.forAllNodes=function(e){for(var t=0;t<this.nodePages.length;t++){var r=this.nodePages[t];if(r)for(var i=t*this.nodesPerPage,n=0;n<r.nodes.length;n++)e(r.nodes[n],i+n)}},Object.defineProperty(e.prototype,"test",{get:function(){var e=this;return{addNode:function(t,r){return e.addNode(t,r)}}},enumerable:!0,configurable:!0}),e}();t.I3SIndex=b;var P=new Map,x=function(){function e(){this.update=new n({deallocator:null}),this.add=new n({deallocator:null}),this.cancel=[]}return e.prototype.reset=function(e,t){this.add.clear(),this.update.clear(),this.cancel=e,this.missing=t},e}(),N=[["maxScreenThreshold",1],["screenSpaceRelative",2],["removedFeatureDiameter",3],["distanceRangeFromDefaultCamera",4]];t.selectErrorMetric=_;var I=function(){function e(){this.known=0,this.knownNodes=0,this.missing=0,this.missingNodes=0,this.unremoved=0}return e}()});