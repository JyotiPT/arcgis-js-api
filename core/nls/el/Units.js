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

define({measures:{length:"Μήκος",area:"Εμβαδόν",volume:"Όγκος",angle:"Γωνία"},units:{millimeters:{singular:"χιλιοστό",plural:"χιλιοστά",abbr:"χιλ."},centimeters:{singular:"εκατοστό",plural:"εκατοστά",abbr:"εκ."},decimeters:{singular:"δεκατόμετρο",plural:"δεκατόμετρα",abbr:"δεκ."},meters:{singular:"μέτρο",plural:"μέτρα",abbr:"μ."},kilometers:{singular:"χιλιόμετρο",plural:"χιλιόμετρα",abbr:"χλμ."},inches:{singular:"ίντσα",plural:"ίντσες",abbr:"ίν."},feet:{singular:"πόδι",plural:"πόδια",abbr:"πόδ."},yards:{singular:"γιάρδα",plural:"γιάρδες",abbr:"γρδ."},miles:{singular:"μίλι",plural:"μίλια",abbr:"μίλ."},"nautical-miles":{singular:"ναυτικό μίλι",plural:"ναυτικά μίλια",abbr:"ν.μ."},"us-feet":{singular:"πόδι (ΗΠΑ)",plural:"πόδια (ΗΠΑ)",abbr:"πόδ."},"square-millimeters":{singular:"τετραγωνικό χιλιοστό",plural:"τετραγωνικά χιλιοστά",abbr:"τ.χιλ."},"square-centimeters":{singular:"τετραγωνικό εκατοστό",plural:"τετραγωνικά εκατοστά",abbr:"τ.εκ."},"square-decimeters":{singular:"τετραγωνικό δεκατόμετρο",plural:"τετραγωνικά δεκατόμετρα",abbr:"τ.δεκ."},"square-meters":{singular:"τετραγωνικό μέτρο",plural:"τετραγωνικά μέτρα",abbr:"τ.μ."},"square-kilometers":{singular:"τετραγωνικό χιλιόμετρο",plural:"τετραγωνικά χιλιόμετρα",abbr:"τ.χλμ."},"square-inches":{singular:"τετραγωνική ίντσα",plural:"τετραγωνικές ίντσες",abbr:"τ.ίν."},"square-feet":{singular:"τετραγωνικό πόδι",plural:"τετραγωνικά πόδια",abbr:"τ.πόδ."},"square-yards":{singular:"τετραγωνική γιάρδα",plural:"τετραγωνικές γιάρδες",abbr:"τ.γρδ."},"square-miles":{singular:"τετραγωνικό μίλι",plural:"τετραγωνικά μίλια",abbr:"τ.μίλ."},"square-us-feet":{singular:"τετραγωνικό πόδι (ΗΠΑ)",plural:"τετραγωνικά πόδια (ΗΠΑ)",abbr:"τ.πόδ."},acres:{singular:"έικρ",plural:"έικρ",abbr:"έικρ"},ares:{singular:"άριο",plural:"άρια",abbr:"αρ"},hectares:{singular:"εκτάριο",plural:"εκτάρια",abbr:"εκτ."},liters:{singular:"λίτρο",plural:"λίτρα",abbr:"λ."},"cubic-millimeters":{singular:"κυβικό χιλιοστό",plural:"κυβικά χιλιοστά",abbr:"κ.χιλ."},"cubic-centimeters":{singular:"κυβικό εκατοστό",plural:"κυβικά εκατοστά",abbr:"κ.εκ."},"cubic-decimeters":{singular:"κυβικό δεκατόμετρο",plural:"κυβικά δεκατόμετρα",abbr:"κ.δεκ."},"cubic-meters":{singular:"κυβικό μέτρο",plural:"κυβικά μέτρα",abbr:"κ.μ."},"cubic-kilometers":{singular:"κυβικό χιλιόμετρο",plural:"κυβικά χιλιόμετρα",abbr:"κ.χλμ."},"cubic-inches":{singular:"κυβική ίντσα",plural:"κυβικές ίντσες",abbr:"κ.ίν."},"cubic-feet":{singular:"κυβικό πόδι",plural:"κυβικά πόδια",abbr:"κ.πόδ."},"cubic-yards":{singular:"κυβική γιάρδα",plural:"κυβικές γιάρδες",abbr:"κ.γρδ."},"cubic-miles":{singular:"κυβικό μίλι",plural:"κυβικά μίλια",abbr:"κ.μίλ."},radians:{singular:"ακτίνιο",plural:"ακτίνια",abbr:""},degrees:{singular:"βαθμός",plural:"βαθμοί",abbr:"°"}}});