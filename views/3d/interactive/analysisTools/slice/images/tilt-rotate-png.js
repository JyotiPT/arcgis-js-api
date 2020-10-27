// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports"],(function(A,P){"use strict";Object.defineProperty(P,"__esModule",{value:!0}),P.default="data:image/png;base64,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"}));