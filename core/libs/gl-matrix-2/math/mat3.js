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

define(["require","exports","./common"],function(t,a,n){function r(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[4],t[4]=a[5],t[5]=a[6],t[6]=a[8],t[7]=a[9],t[8]=a[10],t}function u(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t}function o(t,a,n,r,u,o,e,M,h,i){return t[0]=a,t[1]=n,t[2]=r,t[3]=u,t[4]=o,t[5]=e,t[6]=M,t[7]=h,t[8]=i,t}function e(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function M(t,a){if(t===a){var n=a[1],r=a[2],u=a[5];t[1]=a[3],t[2]=a[6],t[3]=n,t[5]=a[7],t[6]=r,t[7]=u}else t[0]=a[0],t[1]=a[3],t[2]=a[6],t[3]=a[1],t[4]=a[4],t[5]=a[7],t[6]=a[2],t[7]=a[5],t[8]=a[8];return t}function h(t,a){var n=a[0],r=a[1],u=a[2],o=a[3],e=a[4],M=a[5],h=a[6],i=a[7],s=a[8],c=s*e-M*i,f=-s*o+M*h,b=i*o-e*h,l=n*c+r*f+u*b;return l?(l=1/l,t[0]=c*l,t[1]=(-s*r+u*i)*l,t[2]=(M*r-u*e)*l,t[3]=f*l,t[4]=(s*n-u*h)*l,t[5]=(-M*n+u*o)*l,t[6]=b*l,t[7]=(-i*n+r*h)*l,t[8]=(e*n-r*o)*l,t):null}function i(t,a){var n=a[0],r=a[1],u=a[2],o=a[3],e=a[4],M=a[5],h=a[6],i=a[7],s=a[8];return t[0]=e*s-M*i,t[1]=u*i-r*s,t[2]=r*M-u*e,t[3]=M*h-o*s,t[4]=n*s-u*h,t[5]=u*o-n*M,t[6]=o*i-e*h,t[7]=r*h-n*i,t[8]=n*e-r*o,t}function s(t){var a=t[0],n=t[1],r=t[2],u=t[3],o=t[4],e=t[5],M=t[6],h=t[7],i=t[8];return a*(i*o-e*h)+n*(-i*u+e*M)+r*(h*u-o*M)}function c(t,a,n){var r=a[0],u=a[1],o=a[2],e=a[3],M=a[4],h=a[5],i=a[6],s=a[7],c=a[8],f=n[0],b=n[1],l=n[2],m=n[3],p=n[4],v=n[5],d=n[6],S=n[7],x=n[8];return t[0]=f*r+b*e+l*i,t[1]=f*u+b*M+l*s,t[2]=f*o+b*h+l*c,t[3]=m*r+p*e+v*i,t[4]=m*u+p*M+v*s,t[5]=m*o+p*h+v*c,t[6]=d*r+S*e+x*i,t[7]=d*u+S*M+x*s,t[8]=d*o+S*h+x*c,t}function f(t,a,n){var r=a[0],u=a[1],o=a[2],e=a[3],M=a[4],h=a[5],i=a[6],s=a[7],c=a[8],f=n[0],b=n[1];return t[0]=r,t[1]=u,t[2]=o,t[3]=e,t[4]=M,t[5]=h,t[6]=f*r+b*e+i,t[7]=f*u+b*M+s,t[8]=f*o+b*h+c,t}function b(t,a,n){var r=a[0],u=a[1],o=a[2],e=a[3],M=a[4],h=a[5],i=a[6],s=a[7],c=a[8],f=Math.sin(n),b=Math.cos(n);return t[0]=b*r+f*e,t[1]=b*u+f*M,t[2]=b*o+f*h,t[3]=b*e-f*r,t[4]=b*M-f*u,t[5]=b*h-f*o,t[6]=i,t[7]=s,t[8]=c,t}function l(t,a,n){var r=n[0],u=n[1],o=n[2];return t[0]=r*a[0],t[1]=r*a[1],t[2]=r*a[2],t[3]=u*a[3],t[4]=u*a[4],t[5]=u*a[5],t[6]=o*a[6],t[7]=o*a[7],t[8]=o*a[8],t}function m(t,a,n){var r=n[0],u=n[1];return t[0]=r*a[0],t[1]=r*a[1],t[2]=r*a[2],t[3]=u*a[3],t[4]=u*a[4],t[5]=u*a[5],t}function p(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=a[0],t[7]=a[1],t[8]=1,t}function v(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=0,t[3]=-n,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function d(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=a[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function S(t,a){return t[0]=a[0],t[1]=a[1],t[2]=0,t[3]=a[2],t[4]=a[3],t[5]=0,t[6]=a[4],t[7]=a[5],t[8]=1,t}function x(t,a){var n=a[0],r=a[1],u=a[2],o=a[3],e=n+n,M=r+r,h=u+u,i=n*e,s=r*e,c=r*M,f=u*e,b=u*M,l=u*h,m=o*e,p=o*M,v=o*h;return t[0]=1-c-l,t[3]=s-v,t[6]=f+p,t[1]=s+v,t[4]=1-i-l,t[7]=b-m,t[2]=f-p,t[5]=b+m,t[8]=1-i-c,t}function E(t,a){var n=a[0],r=a[1],u=a[2],o=a[4],e=a[5],M=a[6],h=a[8],i=a[9],s=a[10],c=s*e-M*i,f=-s*o+M*h,b=i*o-e*h,l=n*c+r*f+u*b;if(!l)return null;var m=1/l;return t[0]=c*m,t[1]=(-s*r+u*i)*m,t[2]=(M*r-u*e)*m,t[3]=f*m,t[4]=(s*n-u*h)*m,t[5]=(-M*n+u*o)*m,t[6]=b*m,t[7]=(-i*n+r*h)*m,t[8]=(e*n-r*o)*m,t}function L(t,a){var n=a[0],r=a[1],u=a[2],o=a[3],e=a[4],M=a[5],h=a[6],i=a[7],s=a[8],c=a[9],f=a[10],b=a[11],l=a[12],m=a[13],p=a[14],v=a[15],d=n*M-r*e,S=n*h-u*e,x=n*i-o*e,E=r*h-u*M,L=r*i-o*M,O=u*i-o*h,P=s*m-c*l,w=s*p-f*l,I=s*v-b*l,N=c*p-f*m,y=c*v-b*m,q=f*v-b*p,j=d*q-S*y+x*N+E*I-L*w+O*P;return j?(j=1/j,t[0]=(M*q-h*y+i*N)*j,t[1]=(h*I-e*q-i*w)*j,t[2]=(e*y-M*I+i*P)*j,t[3]=(u*y-r*q-o*N)*j,t[4]=(n*q-u*I+o*w)*j,t[5]=(r*I-n*y-o*P)*j,t[6]=(m*O-p*L+v*E)*j,t[7]=(p*x-l*O-v*S)*j,t[8]=(l*L-m*x+v*d)*j,t):null}function O(t,a,n){return t[0]=2/a,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/n,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t}function P(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"}function w(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))}function I(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t}function N(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t}function y(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t}function q(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t[6]=a[6]+n[6]*r,t[7]=a[7]+n[7]*r,t[8]=a[8]+n[8]*r,t}function j(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]}function g(t,a){var r=t[0],u=t[1],o=t[2],e=t[3],M=t[4],h=t[5],i=t[6],s=t[7],c=t[8],f=a[0],b=a[1],l=a[2],m=a[3],p=a[4],v=a[5],d=a[6],S=a[7],x=a[8];return Math.abs(r-f)<=n.EPSILON*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(u-b)<=n.EPSILON*Math.max(1,Math.abs(u),Math.abs(b))&&Math.abs(o-l)<=n.EPSILON*Math.max(1,Math.abs(o),Math.abs(l))&&Math.abs(e-m)<=n.EPSILON*Math.max(1,Math.abs(e),Math.abs(m))&&Math.abs(M-p)<=n.EPSILON*Math.max(1,Math.abs(M),Math.abs(p))&&Math.abs(h-v)<=n.EPSILON*Math.max(1,Math.abs(h),Math.abs(v))&&Math.abs(i-d)<=n.EPSILON*Math.max(1,Math.abs(i),Math.abs(d))&&Math.abs(s-S)<=n.EPSILON*Math.max(1,Math.abs(s),Math.abs(S))&&Math.abs(c-x)<=n.EPSILON*Math.max(1,Math.abs(c),Math.abs(x))}Object.defineProperty(a,"__esModule",{value:!0}),a.fromMat4=r,a.copy=u,a.set=o,a.identity=e,a.transpose=M,a.invert=h,a.adjoint=i,a.determinant=s,a.multiply=c,a.translate=f,a.rotate=b,a.scale=l,a.scaleByVec2=m,a.fromTranslation=p,a.fromRotation=v,a.fromScaling=d,a.fromMat2d=S,a.fromQuat=x,a.normalFromMat4Legacy=E,a.normalFromMat4=L,a.projection=O,a.str=P,a.frob=w,a.add=I,a.subtract=N,a.multiplyScalar=y,a.multiplyScalarAndAdd=q,a.exactEquals=j,a.equals=g,a.mul=c,a.sub=N});