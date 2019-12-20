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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","@dojo/framework/shim/array","../../../core/Error","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/quat","../../../core/libs/gl-matrix-2/quatf32","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/SpatialReference","../../../geometry/support/meshUtils/deduplicate","../../../libs/draco/DracoDecoder","./i3s/I3SBinaryReader","./i3s/I3SGeometryUtil","./i3s/I3SProjectionUtil","./i3s/I3SUtil","../support/orientedBoundingBox","../webgl-engine/lib/PreinterleavedGeometryData"],function(e,r,t,a,o,n,i,s,f,u,l,d,c,m,v,b,y,p,A,g,h,I){function w(e){return null==e.geometryIndex.header}function x(e,r){var t=e.mbs,a=e.elevationOffset,i=m.fromJSON(e.indexSR),f=m.fromJSON(e.vertexSR),u=m.fromJSON(e.renderSR),l=A.computeGlobalTransformation(t,a,i,u),d=new Array,c=e.layouts[0],v=e.geometryBuffer,b=new N.DecoderBuffer;b.Init(new Int8Array(v),v.byteLength);var y=new N.Decoder,g=new N.Mesh,h=y.DecodeBufferToMesh(b,g);if(!h.ok())throw N.destroy(g),N.destroy(y),N.destroy(b),new n("draco:decode_error","Error while decoding draco geometry",{message:h.error_msg()});var w=new N.DracoInt32Array,x=new N.MetadataQuerier,O=y.GetAttributeIdByMetadataEntry(g,"i3s-attribute-type","feature-index"),_=y.GetAttributeMetadata(g,O);x.GetIntEntryArray(_,"i3s-feature-ids",w);var P=w.size(),R=N._malloc(4*P);if(!w.GetArray(R,P))throw"GetArray failed";var M=new Uint32Array(N.HEAPU8.buffer,R,P).slice();N._free(R);var T=g.num_points(),B=3*g.num_faces(),F=T<65536;if(R=N._malloc(B*(F?2:4)),!(F?y.GetTrianglesUInt16Array(g,R,B):y.GetTrianglesUInt32Array(g,R,B)))throw"GetTrianglesArray failed";var q=F?new Uint16Array(N.HEAPU8.buffer,R,B).slice():new Uint32Array(N.HEAPU8.buffer,R,B).slice();N._free(R);var H=S(T,y,g,O),z=D(q,H),J=c[0].stride/Float32Array.BYTES_PER_ELEMENT,V=new Float32Array(J*T),j=new I(V,c,null,z,q),L=y.GetAttributeId(g,N.POSITION),k=G(3*T,y,g,L),Q=j.getAttribute("position"),X=y.GetAttributeMetadata(g,L),Y=x.GetDoubleEntry(X,"i3s-scale_x"),K=x.GetDoubleEntry(X,"i3s-scale_y");Y=Y<=0?1:Y,K=K<=0?1:K;for(var W=j.getAttribute("color"),Z=y.GetAttributeId(g,N.COLOR),$=-1!==Z,ee=$?U(4*T,y,g,Z):o.fill(new Array(4*T),255),re=0;re<T;re++){var te=re*Q.strideIdx+Q.offsetIdx;Q.data[te]=k[3*re]*Y,Q.data[te+1]=k[3*re+1]*K,Q.data[te+2]=k[3*re+2];var ae=re*W.strideIdx+W.offsetIdx;W.data[ae]=ee[4*re],W.data[ae+1]=ee[4*re+1],W.data[ae+2]=ee[4*re+2],W.data[ae+3]=ee[4*re+3]}var oe=y.GetAttributeId(g,N.NORMAL);if(e.needNormals&&-1!==oe){var ne={normals:j.getAttribute("normalCompressed"),positions:j.getAttribute("position"),normalInd:j.getIndices("normalCompressed"),positionInd:j.getIndices("position")},ie=e.normalReferenceFrame,se=G(3*T,y,g,oe);p.processAndInterleaveNormals(ie,se,l,ne)}var fe=y.GetAttributeId(g,N.TEX_COORD),ue=j.getAttribute("uv0");if(-1!==fe&&ue)for(var le=G(2*T,y,g,fe),re=0;re<T;re++){var de=re*ue.strideIdx+ue.offsetIdx;ue.data[de]=le[2*re],ue.data[de+1]=le[2*re+1]}var ce=y.GetAttributeIdByMetadataEntry(g,"i3s-attribute-type","uv-region"),me=j.getAttribute("uvRegion");if(-1!==ce&&me)for(var ve=E(4*T,y,g,ce),re=0;re<T;re++){var de=re*me.strideIdx+me.offsetIdx;me.data[de]=ve[4*re],me.data[de+1]=ve[4*re+1],me.data[de+2]=ve[4*re+2],me.data[de+3]=ve[4*re+3]}N.destroy(x),N.destroy(w),N.destroy(g),N.destroy(y),N.destroy(b),s.mat4.invert(C,l);var be=j.getAttribute("position"),ye={globalTrafo:l},pe=V.buffer;A.reprojectPoints(be,t,C,a,i,f,u);var Ae=p.extractPositionData(pe,c,q);return d.push({layout:c,interleavedVertexData:pe,indices:q,corMatrices:ye,hasColors:$,positionData:Ae}),r&&(r.push(pe),r.push(q.buffer)),{geometryBuffer:v,componentOffsets:z,featureIds:M,transformedGeometries:d,obb:null}}function G(e,r,t,a){var o=4*e,i=N._malloc(o),s=r.GetAttribute(t,a);if(!r.GetAttributeFloatArrayForAllPoints(t,s,i,e))throw new n("draco:decode_error","Error while getting attribute values",{attributeId:a});var f=new Float32Array(N.HEAPU8.buffer,i,e).slice();return N._free(i),f}function S(e,r,t,a){var o=4*e,i=N._malloc(o),s=r.GetAttribute(t,a);if(!r.GetAttributeUInt32ArrayForAllPoints(t,s,i,e))throw new n("draco:decode_error","Error while getting attribute values",{attributeId:a});var f=new Uint32Array(N.HEAPU8.buffer,i,e).slice();return N._free(i),f}function E(e,r,t,a){var o=2*e,i=N._malloc(o),s=r.GetAttribute(t,a);if(!r.GetAttributeUInt16ArrayForAllPoints(t,s,i,e))throw new n("draco:decode_error","Error while getting attribute values",{attributeId:a});var f=new Uint16Array(N.HEAPU8.buffer,i,e).slice();return N._free(i),f}function U(e,r,t,a){var o=e,i=N._malloc(o),s=r.GetAttribute(t,a);if(!r.GetAttributeUInt8ArrayForAllPoints(t,s,i,e))throw new n("draco:decode_error","Error while getting attribute values",{attributeId:a});var f=new Uint8Array(N.HEAPU8.buffer,i,e).slice();return N._free(i),f}function D(e,r){for(var t=new Array,a=0;a<e.length;++a){for(var o=e[a],n=r[o];t.length<=n;)t.push(new Array);t[n].push(o)}for(var i=0,s=new Uint32Array(t.length+1),a=0;a<t.length;++a){var f=t[a];s[a]=i;for(var u=0,l=f;u<l.length;u++){var o=l[u];e[i++]=o}}return s[t.length]=i,s}function O(e,r){var t=e.geometryData,a=e.geometryIndex,o=e.layouts,n=e.mbs,i=e.elevationOffset,f=m.fromJSON(e.indexSR),u=m.fromJSON(e.renderSR),l=A.computeGlobalTransformation(n,i,f,u);s.mat4.invert(C,l);var c=e.geometryBuffer,b=R(t,c,a),g=b.componentOffsets,w=b.featureIds;r&&(w&&r.push(w.buffer),g&&r.push(g.buffer));var x=e.obb?null:h.create([0,0,0],[-1,-1,-1],[0,0,0,1]);d.vec3.copy(F,n),F[2]+=i,d.vec3.copy(q,F);for(var G=!1,S=0,E=new Array,U=0,D=t.geometries;U<D.length;U++){var O=D[U],T=o[S];++S;var B=e.geometryBuffer,N=[{name:"color",byteValue:255}],H=["normal","normalCompressed"],z=p.interleaveGeometryBuffer(O,B,T,N,H),J=new I(new Float32Array(z),T),V=J.getAttribute("position"),j=e.mbs,L=e.elevationOffset,k=m.fromJSON(e.indexSR),Q=m.fromJSON(e.vertexSR),X=m.fromJSON(e.renderSR);A.reprojectPoints(V,j,C,L,k,Q,X),x&&_(x,V,l);var Y=J.getAttribute("normalCompressed");if(e.needNormals&&Y){var K={normals:Y,positions:V,normalInd:J.getIndices("normalCompressed"),positionInd:J.getIndices("position")},W=e.normalReferenceFrame,Z=y.createTypedView(B,O.params.vertexAttributes.normal);p.processAndInterleaveNormals(W,Z,l,K)}var $=J.getAttribute("color");$&&!G&&(G=P($));var ee={globalTrafo:l},re=T[0].stride,te=1-.8*re/(re+4),ae=v.default(z,re/4,{minReduction:te,componentOffsets:g});if(null!=ae){var oe=ae.uniqueCount<M?new Uint16Array(ae.indices):ae.indices,ne=p.extractPositionData(ae.buffer,T,oe);E.push({layout:T,interleavedVertexData:ae.buffer,indices:oe,corMatrices:ee,hasColors:G,positionData:ne}),r&&(r.push(ae.buffer),r.push(oe.buffer),r.push(ne.data.buffer),r.push(ne.indices.buffer))}else{var ne=p.extractPositionData(z,T);E.push({layout:T,interleavedVertexData:z,corMatrices:ee,hasColors:G,positionData:ne}),r&&(r.push(z),r.push(ne.data.buffer),r.push(ne.indices.buffer))}x&&d.vec3.transformMat4(x.center,x.center,l)}return{geometryBuffer:c,componentOffsets:g,featureIds:w,transformedGeometries:E,obb:x}}function _(e,r,t){if(e.halfSize[0]>0){d.vec3.subtract(F,e.center,e.halfSize),d.vec3.add(q,e.center,e.halfSize);for(var a=r.offsetIdx;a<r.data.length;a+=r.strideIdx)F[0]=Math.min(F[0],r.data[a]),F[1]=Math.min(F[1],r.data[a+1]),F[2]=Math.min(F[2],r.data[a+2]),q[0]=Math.max(q[0],r.data[a]),q[1]=Math.max(q[1],r.data[a+1]),q[2]=Math.max(q[2],r.data[a+2]);d.vec3.subtract(e.halfSize,q,F),d.vec3.scale(e.halfSize,e.halfSize,.5),d.vec3.add(e.center,F,q),d.vec3.scale(e.center,e.center,.5)}else{h.compute(r,e);var o=2*Math.sqrt(1+t[0]+t[5]+t[10]);H[0]=(t[9]-t[6])/o,H[1]=(t[2]-t[8])/o,H[2]=(t[4]-t[1])/o,H[3]=.25*o,u.quat.conjugate(H,H),u.quat.multiply(e.quaternion,H,e.quaternion)}}function P(e){for(var r=e.data,t=e.size,a=e.offsetIdx,o=e.strideIdx,n=a;n<r.length;n+=o)for(var i=0;i<t;i++)if(255!==r[n+i])return!0;return!1}function R(e,r,t){e.geometries[0].params.vertexAttributes=t.vertexAttributes;var a,o,n=t.featureAttributes;if(n){if(n.faceRange){var i=y.createTypedView(r,n.faceRange),s=n.faceRange.valuesPerElement,f=n.faceRange.count;a=g.convertFlatRangesToOffsets(i,f,s)}var u=n.id;if(u){o=new Uint32Array(u.count);var l=1,d=y.valueType2TypedArrayClassMap[u.valueType];"UInt64"===u.valueType&&(d=Uint32Array,l=2);for(var c=new d(r,u.byteOffset,u.count*u.valuesPerElement*l),m=0;m<u.count;m++){var v=m*u.valuesPerElement*l;if(o[m]=c[v],2===l&&0!==c[v+1])throw new Error("ID exceeded maximum range supported (2^32))")}}}return{componentOffsets:a,featureIds:o}}var M=65536,T=function(){function e(){}return e.prototype.process=function(r){return a(this,void 0,void 0,function(){var a,o;return t(this,function(t){switch(t.label){case 0:return[4,e.ensureDracoDecoder(r)];case 1:return t.sent(),a=[r.geometryBuffer],o=this.transform(r,a),[2,{result:o,transferList:a}]}})})},e.prototype.transform=function(e,r){return w(e)?x(e,r):O(e,r)},e}();!function(e){function r(e){return N&&N.DecoderBuffer||e&&!w(e)?i.resolve():(B||(B=b.getDecoderModule().then(function(e){return N=e,B=null,N})),B.then(function(){}))}e.ensureDracoDecoder=r}(T||(T={}));var B,N,C=f.mat4f64.create(),F=c.vec3f64.create(),q=c.vec3f64.create(),H=l.quatf32.create();return T});