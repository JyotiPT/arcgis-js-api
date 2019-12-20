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

define({title:"Φως ημέρας",directShadow:"Εμφάνιση σκιών",notSupportedInHW:"Αυτή η δυνατότητα δεν υποστηρίζεται σε αυτό το πρόγραμμα περιήγησης.",unsupported:"Το εργαλείο «Φως ημέρας» υποστηρίζεται μόνο στο SceneView.",datePattern:"MMMM d, yyyy (μήνας, ημέρα, έτος)",playDay:"Προβολή ήλιου και σκιάς σε μια ημέρα με κινούμενα γραφικά",playYear:"Προβολή ήλιου και σκιάς σε ένα έτος με κινούμενα γραφικά",pause:"Παύση",season:"Εποχή",spring:"Πηγή",summer:"Καλοκαίρι",winter:"Χειμώνας",fall:"Φθινόπωρο",timezoneHAST:"HAST",timezoneAKST:"AKST",timezonePST:"PST",timezoneMST:"MST",timezoneCST:"CST",timezoneEST:"EST",timezoneCET:"CET",timezoneEET:"EET",timezoneMSK:"MSK",timezoneGST:"GST",timezoneICT:"ICT",timezoneCCT:"CCT",timezoneJST:"JST",timezoneAEST:"AEST",timezoneNZST:"NZST",timezoneDateline:"Διεθνής δυτική γραμμή ημερομηνίας",timezoneHawaii:"Χαβάη",timezoneAlaska:"Αλάσκα",timezoneBaja:"Μπάχα Καλιφόρνια",timezoneMountain:"Ορεινή ώρα (ΗΠΑ και Καναδάς)",timezoneLaPaz:"Τσιουάουα, Λα Παζ, Μαζατλάν",timezoneArizona:"Αριζόνα",timezoneSaskatchewan:"Σασκάτσουαν",timezoneCentralAmerica:"Κεντρική Αμερική",timezoneCentralTime:"Κεντρική ώρα (ΗΠΑ και Καναδάς)",timezoneMexico:"Γκουανταλαχάρα, Πόλη του Μεξικού, Μοντερέυ",timezoneEasternUS:"Ανατολική ώρα (ΗΠΑ και Καναδάς)",timezoneLima:"Μπογκοτά, Λίμα, Κουίτο",timezoneIndiana:"Ιντιάνα (Ανατολική) ",timezoneAtlantic:"Ώρα Ατλαντικού (Καναδάς)",timezoneCuiaba:"Κουιάμπα",timezoneSantiago:"Σαντιάγο",timezoneManaus:"Τζόρτζταουν, Λα Παζ, Μανάους, Σαν Χουάν",timezoneAsuncion:"Ασουνσιόν",timezoneBrasilia:"Μπραζίλια",timezoneGreenland:"Γροιλανδία",timezoneMontevideo:"Μοντεβιδέο",timezoneCayenne:"Καγιέν, Φορταλέζα",timezoneBuenosAires:"Μπουένος Άιρες",timezoneMidAtlantic:"Μέσος Ατλαντικός",timezoneAzores:"Αζόρες",timezoneCaboVerde:"Κάμπο Βέρντε",timezoneDublin:"Δουβλίνο, Εδιμβούργο, Λονδίνο, Λισσαβόνα",timezoneReykjavik:"Μονροβία, Ρέικιαβικ",timezoneCasablanca:"Καζαμπλάνκα",timezoneBelgrade:"Βελιγράδι, Μπρατισλάβα, Βουδαπέστη, Λουμπλιάνα, Πράγα",timezoneSarajevo:"Σεράγιεβο, Σκόπια, Βαρσοβία, Ζάγκρεμπ",timezoneBrussels:"Βρυξέλλες, Κοπεγχάγη, Μαδρίτη, Παρίσι",timezoneWCAfrica:"Κεντροδυτική Αφρική",timezoneAmsterdam:"Άμστερνταμ, Βερολίνο, Βέρνη, Ρώμη, Στοκχόλμη, Βιέννη",timezoneWindhoek:"Βίντχουκ",timezoneMinsk:"Μινσκ",timezoneCairo:"Κάιρο",timezoneHelsinki:"Ελσίνκι, Κίεβο, Ρίγα, Σόφια, Ταλίν, Βίλνιους",timezoneAthens:"Αθήνα, Βουκουρέστι",timezoneJerusalem:"Ιερουσαλήμ",timezoneAmman:"Αμμάν",timezoneBeirut:"Βηρυτός",timezoneHarare:"Χαράρε, Πρετόρια",timezoneDamascus:"Δαμασκός",timezoneIstanbul:"Κωνσταντινούπολη",timezoneKuwait:"Κουβέιτ, Ριάντ",timezoneBaghdad:"Βαγδάτη",timezoneNairobi:"Ναϊρόμπι",timezoneKaliningrad:"Καλίνινγκραντ",timezoneMoscow:"Μόσχα, Αγία Πετρούπολη, Βόλγκογκραντ",timezoneMuscat:"Αμπού Ντάμπι, Μουσκάτ",timezoneBaku:"Μπακού",timezoneYerevan:"Ερεβάν",timezoneTbilisi:"Τιφλίδα",timezonePortLouis:"Πορ Λουί",timezoneTashkent:"Τασκένδη",timezoneIslamabad:"Ισλαμαμπάντ, Καράτσι",timezoneEkaterinburg:"Εκατερίνμπουργκ",timezoneAstana:"Αστάνα",timezoneDhaka:"Ντάκα",timezoneNovosibirsk:"Νοβοσιμπίρσκ",timezoneBangkok:"Μπανγκόκ, Ανόι, Τζακάρτα",timezoneKrasnoyarsk:"Κρασνογιάρσκ",timezoneBeijing:"Πεκίνο, Τσονγκ-κινγκ, Χονγκ Κονγκ, Ουρούμκι",timezoneSingapore:"Κουάλα Λουμπούρ, Σιγκαπούρη",timezoneTaipei:"Ταϊπέι",timezonePerth:"Περθ",timezoneUlaanbaatar:"Ουλάν Μπατόρ",timezoneIrkutsk:"Ιρκούτσκ",timezoneSeoul:"Σεούλ",timezoneOsaka:"Οσάκα, Σαπόρο, Τόκιο",timezoneYakutsk:"Γιακούτσκ",timezoneCanberra:"Καμπέρα, Μελβούρνη, Σίντνεϋ",timezoneBrisbane:"Μπρίσμπεϊν",timezoneHobart:"Χόμπαρτ",timezoneGuam:"Γκουάμ, Πορτ Μόρεσμπι",timezoneVladivostok:"Βλαδιβοστόκ",timezoneSolomon:"Νησιά Σολομώντα, Νέα Καληδονία",timezoneMagadan:"Μαγκαντάν",timezoneFiji:"Φίτζι",timezoneAuckland:"Όκλαντ, Ουέλινγκτον",timezoneNukualofa:"Νουκουαλόφα",timezoneSamoa:"Σαμόα",chooseTimezone:"Επιλογή ζώνης ώρας"});