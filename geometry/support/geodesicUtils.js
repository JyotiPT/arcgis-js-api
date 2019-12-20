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

define(["require","exports","@dojo/framework/shim/object","../.","../../core/Error","../../core/unitUtils"],function(e,a,t,n,r,i){function s(e){if(!e||!e.isGeographic)return null;if(e.wkid){var a=b[e.wkid];if(a)return a}if(e.wkt){var t=y.exec(e.wkt);if(!t||2!==t.length)return null;var n=t[1].split(",");if(!n||3!==n.length)return null;var r=parseFloat(n[1]),i=parseFloat(n[2]);if(isNaN(r)||isNaN(i))return null;return{a:r,f:0===i?0:1/i}}return null}function f(e){return"b"in e&&"eSq"in e&&"radius"in e}function o(e){var a=s(e||w);if(f(a))return a;var n=a.a*(1-a.f);return t.assign(a,{b:n,eSq:1-Math.pow(n/a.a,2),radius:(2*a.a+n)/3})}function c(e,a,t){var n,r=o(t),i=r.a,s=r.eSq,f=Math.sqrt(s),c=Math.sin(a[1]*m),h=i*a[0]*m;if(s>0){n=i*((1-s)*(c/(1-s*(c*c))-1/(2*f)*Math.log((1-f*c)/(1+f*c))))*.5}else n=i*c;return e[0]=h,e[1]=n,e}function h(e){return null!==s(e)}function l(e,a){if(void 0===a&&(a="square-meters"),e.some(function(e){return!h(e.spatialReference)}))throw new r("geodesic-areas:invalid-spatial-reference","the input geometries spatial reference is not supported");for(var t=[],n=0;n<e.length;n++){var s=e[n],f=s.spatialReference,l=o(f).radius,p=l*R;t.push(u(s,p))}for(var d=[],v=[0,0],g=[0,0],M=0;M<t.length;M++){for(var m=t[M],w=m.rings,f=m.spatialReference,y=0,b=0;b<w.length;b++){var q=w[b];c(v,q[0],f),c(g,q[q.length-1],f);for(var S=g[0]*v[1]-v[0]*g[1],z=0;z<q.length-1;z++)c(v,q[z+1],f),c(g,q[z],f),S+=g[0]*v[1]-v[0]*g[1];y+=S}y=i.convertUnit(y,"square-meters",a),d.push(y/-2)}return d}function p(e,a){void 0===a&&(a="meters");var t=e,n=e;if(!t&&!n)throw new r("geodesic-lengths:invalid-geometries","the input geometries type is not supported");if(t?t.some(function(e){return!h(e.spatialReference)}):n.some(function(e){return!h(e.spatialReference)}))throw new r("geodesic-lengths:invalid-spatial-reference","the input geometries spatial reference is not supported");for(var s=[],f=0;f<e.length;f++){for(var o=e[f],c=o.spatialReference,l="polyline"===o.type?o.paths:o.rings,p=0,u=0;u<l.length;u++){for(var d=l[u],g=0,M=1;M<d.length;M++){var m=d[M-1][0],w=d[M][0],y=d[M-1][1],R=d[M][1];if(y!==R||m!==w){var b={distance:null};v(b,[m,y],[w,R],c),g+=b.distance}}p+=g}p=i.convertUnit(p,"meters",a),s.push(p)}return s}function u(e,a){if("polyline"!==e.type&&"polygon"!==e.type)throw new r("geodesic-densify:invalid-geometry","the input geometry is neither polyline nor polygon");var t=e.spatialReference;if(!h(t))throw new r("geodesic-densify:invalid-spatial-reference","the input geometry spatial reference is not supported");var i=o(t).radius,s=i/1e4;a<s&&(a=s);for(var f="polyline"===e.type?e.paths:e.rings,c=[],l=[0,0],p={distance:null},u=0,g=f;u<g.length;u++){var M=g[u],m=[];c.push(m),m.push([M[0][0],M[0][1]]);for(var w=M[0][0],y=M[0][1],R=void 0,b=void 0,q=0;q<M.length-1;q++)if(R=M[q+1][0],b=M[q+1][1],w!==R||y!==b){var S=[w,y];v(p,[w,y],[R,b],t);var z=p.azimuth,P=p.distance,x=P/a;if(x>1){for(var N=1;N<=x-1;N++){var k=N*a;d(l,S,z,k,t),m.push(l.slice(0))}var D=(P+Math.floor(x-1)*a)/2;d(l,S,z,D,t),m.push(l.slice(0))}d(l,S,z,P,t),m.push(l.slice(0)),w=l[0],y=l[1]}}return"polyline"===e.type?new n.Polyline({paths:c,spatialReference:t}):new n.Polygon({rings:c,spatialReference:t})}function d(e,a,t,n,r){for(var i,s,f,c,h=a[0],l=a[1],p=h*m,u=l*m,d=t*m,v=o(r),g=v.a,M=v.b,w=v.f,y=Math.sin(d),R=Math.cos(d),b=(1-w)*Math.tan(u),q=1/Math.sqrt(1+b*b),S=b*q,z=Math.atan2(b,R),P=q*y,x=P*P,N=1-x,k=N*(g*g-M*M)/(M*M),D=1+k/16384*(4096+k*(k*(320-175*k)-768)),G=k/1024*(256+k*(k*(74-47*k)-128)),U=n/(M*D),j=2*Math.PI;Math.abs(U-j)>1e-12;)f=Math.cos(2*z+U),i=Math.sin(U),s=Math.cos(U),c=G*i*(f+G/4*(s*(2*f*f-1)-G/6*f*(4*i*i-3)*(4*f*f-3))),j=U,U=n/(M*D)+c;var A=S*i-q*s*R,F=Math.atan2(S*s+q*i*R,(1-w)*Math.sqrt(x+A*A)),I=Math.atan2(i*y,q*s-S*i*R),E=w/16*N*(4+w*(4-3*N)),O=I-(1-E)*w*P*(U+E*i*(f+E*s*(2*f*f-1))),_=F/m,H=(p+O)/m;return e.splice(0,e.length),e.push(H,_),e}function v(e,a,t,n){var r,i,s,f,c,h,l,p,u,d,v=a[0]*m,g=a[1]*m,M=t[0]*m,w=t[1]*m,y=o(n),R=y.a,b=y.b,q=y.f,S=y.radius,z=M-v,P=Math.atan((1-q)*Math.tan(g)),x=Math.atan((1-q)*Math.tan(w)),N=Math.sin(P),k=Math.cos(P),D=Math.sin(x),G=Math.cos(x),U=1e3,j=z;do{if(l=Math.sin(j),p=Math.cos(j),0===(s=Math.sqrt(G*l*(G*l)+(k*D-N*G*p)*(k*D-N*G*p))))return{distance:0};c=N*D+k*G*p,h=Math.atan2(s,c),u=k*G*l/s,i=1-u*u,f=c-2*N*D/i,isNaN(f)&&(f=0),d=q/16*i*(4+q*(4-3*i)),r=j,j=z+(1-d)*q*u*(h+d*s*(f+d*c*(2*f*f-1)))}while(Math.abs(j-r)>1e-12&&--U>0);if(0===U){var A=S,F=Math.acos(Math.sin(g)*Math.sin(w)+Math.cos(g)*Math.cos(w)*Math.cos(M-v))*A,I=M-v,E=Math.sin(I)*Math.cos(w),O=Math.cos(g)*Math.sin(w)-Math.sin(g)*Math.cos(w)*Math.cos(I);return{azimuth:Math.atan2(E,O)/m,distance:F}}var _=i*(R*R-b*b)/(b*b),H=1+_/16384*(4096+_*(_*(320-175*_)-768)),L=_/1024*(256+_*(_*(74-47*_)-128)),W=L*s*(f+L/4*(c*(2*f*f-1)-L/6*f*(4*s*s-3)*(4*f*f-3))),B=b*H*(h-W),C=Math.atan2(G*Math.sin(j),k*D-N*G*Math.cos(j)),J=Math.atan2(k*Math.sin(j),k*D*Math.cos(j)-N*G);return e.azimuth=C/m,e.distance=B,e.reverseAzimuth=J/m,e}function g(e,a,t){if(void 0===t&&(t="meters"),!e||!a)throw new r("geodesic-distance:missing-parameters","one or both input parameters are missing");if(!e.spatialReference||!a.spatialReference)throw new r("geodesic-distance:invalid-parameters","one or both input points do not have a spatial reference");if(!e.spatialReference.equals(a.spatialReference))throw new r("geodesic-distance:invalid-parameters","spatial references of input parameters do not match");var n=e.spatialReference;if(!h(n))throw new r("geodesic-distance:not-supported","input geometry spatial reference is not supported");if(e.equals(a))return{distance:0,azimuth:0,reverseAzimuth:0};var s={distance:null};return v(s,[e.x,e.y],[a.x,a.y],n),s.distance=i.convertUnit(s.distance,"meters",t),s}function M(e,a,t){if(!e||null==a||null==t)throw new r("point-from-distance:missing-parameters","one or more input parameters are missing or undefined");if(t<0||t>360)throw new r("point-from-distance:-of-bounds","azimuth is restricted to angles between, and including, 0° to 360° degrees");if(!e.spatialReference)throw new r("point-from-distance:missing-spatial-reference","the input point must have a spatial reference");var i=e.spatialReference;if(!h(i))throw new r("geodesic-distance:not-supported","input geometry spatial reference is not supported");var s=[0,0];return d(s,[e.x,e.y],t,a,i),new n.Point({x:s[0],y:s[1],spatialReference:i})}Object.defineProperty(a,"__esModule",{value:!0});var m=Math.PI/180,w=n.SpatialReference.WGS84,y=/SPHEROID\[([^\]]+)]/i,R=.0015696101447650193,b={4326:{a:6378137,f:1/298.257223563},104900:{a:2439700,f:0},104901:{a:6051e3,f:0},104902:{a:6051800,f:0},104903:{a:1737400,f:0},104904:{a:3393400,f:.005207166853303471},104905:{a:3396190,f:.005886007555525457},104906:{a:6200,f:0},104907:{a:11100,f:0},104908:{a:71492e3,f:.06487439154031222},104909:{a:8200,f:0},104910:{a:83500,f:0},104911:{a:1e4,f:0},104912:{a:2409300,f:0},104913:{a:15e3,f:0},104914:{a:4e4,f:0},104915:{a:1562090,f:0},104916:{a:2632345,f:0},104917:{a:85e3,f:0},104918:{a:1821460,f:0},104919:{a:5e3,f:0},104920:{a:12e3,f:0},104921:{a:3e4,f:3},104922:{a:18e3,f:0},104923:{a:14e3,f:0},104924:{a:49300,f:0},104925:{a:60268e3,f:.09796243445941462},104926:{a:16e3,f:0},104927:{a:9500,f:0},104928:{a:56e4,f:0},104929:{a:249400,f:0},104930:{a:59500,f:0},104931:{a:16e3,f:0},104932:{a:133e3,f:0},104933:{a:718e3,f:0},104934:{a:888e3,f:0},104935:{a:1986300,f:0},104936:{a:1e4,f:0},104937:{a:41900,f:0},104938:{a:11e4,f:0},104939:{a:50100,f:0},104940:{a:764e3,f:0},104941:{a:11e3,f:0},104942:{a:529800,f:0},104943:{a:2575e3,f:0},104944:{a:25559e3,f:.022927344575296365},104945:{a:578900,f:0},104946:{a:33e3,f:0},104947:{a:21e3,f:0},104948:{a:13e3,f:0},104949:{a:31e3,f:0},104950:{a:27e3,f:0},104951:{a:42e3,f:0},104952:{a:235800,f:0},104953:{a:761400,f:0},104954:{a:15e3,f:0},104955:{a:54e3,f:0},104956:{a:77e3,f:0},104957:{a:27e3,f:0},104958:{a:788900,f:0},104959:{a:584700,f:0},104960:{a:24764e3,f:.01708124697141011},104961:{a:74e3,f:0},104962:{a:79e3,f:0},104963:{a:104e3,f:.14423076923076922},104964:{a:29e3,f:0},104965:{a:17e4,f:0},104966:{a:208e3,f:0},104967:{a:4e4,f:0},104968:{a:1352600,f:0},104969:{a:1195e3,f:0},104970:{a:593e3,f:0},104971:{a:3396190,f:0},104972:{a:47e4,f:0},104973:{a:255e3,f:0},104974:{a:2439400,f:0}};a.isSupported=h,a.geodesicAreas=l,a.geodesicLengths=p,a.geodesicDensify=u,a.directGeodeticSolver=d,a.inverseGeodeticSolver=v,a.geodesicDistance=g,a.pointFromDistance=M});