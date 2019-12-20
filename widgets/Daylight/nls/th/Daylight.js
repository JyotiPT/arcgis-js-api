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

define({title:"แสงกลางวัน",directShadow:"แสดงเงา",notSupportedInHW:"คุณลักษณะนี้ไม่ได้รับการสนับสนุนในเบราว์เซอร์",unsupported:"เครื่องมือเดย์ไลท์จะรองรับเฉพาะใน SceneView",datePattern:"d MMMM,yyyy",playDay:"ภาพเคลื่อนไหวแสงแดด และเงาตลอดวัน",playYear:"ภาพเคลื่อนไหวแสงแดด และเงาตลอดหนึ่งปี",pause:"หยุดชั่วคราว",season:"ฤดูกาล",spring:"ฤดูใบไม้ผลิ",summer:"ฤดูร้อน",winter:"ฤดูหนาว",fall:"ฤดูใบไม้ร่วง",timezoneHAST:"HAST",timezoneAKST:"AKST",timezonePST:"PST",timezoneMST:"MST",timezoneCST:"CST",timezoneEST:"EST",timezoneCET:"CET",timezoneEET:"EET",timezoneMSK:"MSK",timezoneGST:"GST",timezoneICT:"ICT",timezoneCCT:"CCT",timezoneJST:"JST",timezoneAEST:"AEST",timezoneNZST:"NZST",timezoneDateline:"อินเตอร์เนชั่นแนลวันที่สายตะวันตก",timezoneHawaii:"ฮาวาย",timezoneAlaska:"อลาสก้า",timezoneBaja:"บาจาแคลิฟอร์เนีย",timezoneMountain:"เวลาเมาท์เทน (อเมริกาและแคนาดา)",timezoneLaPaz:"ชิวาวาลาปาซ Mazatlan",timezoneArizona:"อริโซน่า",timezoneSaskatchewan:"แคตเชวัน",timezoneCentralAmerica:"อเมริกากลาง",timezoneCentralTime:"เวลากลาง (อเมริกาและแคนาดา)",timezoneMexico:"กวาดาลา , เม็กซิโก้ซิตี้ , มอลเทเรย์",timezoneEasternUS:"เวลาตะวันออก (อเมริกาและแคนาดา)",timezoneLima:"โบโกตา , ลิมา , กีโต",timezoneIndiana:"อินเดียนา (ตะวันออก) ",timezoneAtlantic:"เวลาแอตแลนติก(แคนนาดา)",timezoneCuiaba:"กุยาบา",timezoneSantiago:"ซานเตียโก",timezoneManaus:"จอร์จทาวน์ ,ลาปาซ , มาเนาส์, ซานฮวน",timezoneAsuncion:"ซุนซิออง",timezoneBrasilia:"บราซิเลีย",timezoneGreenland:"กรีนแลนด์",timezoneMontevideo:"มอนเตวิเดโอ",timezoneCayenne:"คาเยน, ฟอทาเรซา",timezoneBuenosAires:"บัวโนสไอเรส",timezoneMidAtlantic:"แอตแลนติกลาง",timezoneAzores:"อะซอเรส",timezoneCaboVerde:"สาธารณรัฐกาบูเวร์ดี",timezoneDublin:"ดับลิน, เอดินบะระ, ลิสบอน, ลอนดอน",timezoneReykjavik:"มอนโรเวีย , เรคยาวิก",timezoneCasablanca:"คาซาบลังกา",timezoneBelgrade:"เบลเกรด, บราติสลาวา, บูดาเปสต์, ลูบลิยานา, ปราก",timezoneSarajevo:"ซาราเจโว , สโกเปีย, วอร์ซอ , ซาเกร็บ",timezoneBrussels:"บรัสเซลส์, โคเปนเฮเกน, มาดริด, ปารีส",timezoneWCAfrica:"แอฟริกาตะวันตกกลาง",timezoneAmsterdam:"อัมสเตอร์ดัม, เบอร์ลิน, เบิร์น, โรม, สตอกโฮล์ม, เวียนนา",timezoneWindhoek:"วินด์ฮุก",timezoneMinsk:"มินสค์",timezoneCairo:"ไคโร",timezoneHelsinki:"เฮลซิงกิ , Kyiv, ริกา, โซเฟีย, ทาลลินน์, วิลนีอุ",timezoneAthens:"เอเธนส์, บูคาเรสต์",timezoneJerusalem:"เยรูซาเล็ม",timezoneAmman:"อัมมาน",timezoneBeirut:"เบรุต",timezoneHarare:"ฮาราเร , พริทอเรี",timezoneDamascus:"ดามัสกัส",timezoneIstanbul:"อิสตันบูล",timezoneKuwait:"คูเวต , ริยาด",timezoneBaghdad:"กรุงแบกแดด",timezoneNairobi:"ไนโรบี",timezoneKaliningrad:"คาลินินกราด",timezoneMoscow:"มอสโก, เซนต์ ปีเตอร์สเบิร์ก, วอลโกกราด",timezoneMuscat:"อาบูดาบี, มัสกัต",timezoneBaku:"บากู",timezoneYerevan:"เยเรวาน",timezoneTbilisi:"ทบิลิซี",timezonePortLouis:"พอร์ตหลุยส์",timezoneTashkent:"ทาชเคนต์",timezoneIslamabad:"กรุงอิสลามาบัด , การาจี",timezoneEkaterinburg:"เอกาเตรินเบิร์ก",timezoneAstana:"อัสตานา",timezoneDhaka:"ธากา",timezoneNovosibirsk:"โนโวซีบีสค์",timezoneBangkok:"กรุงเทพมหานคร, ฮานอย, จาการ์ตา",timezoneKrasnoyarsk:"ครัสโนยา",timezoneBeijing:"ปักกิ่ง, ฉงชิ่ง, ฮ่องกง, อุรุมชี",timezoneSingapore:"กัวลาลัมเปอร์ , สิงคโปร์",timezoneTaipei:"ไทเป",timezonePerth:"เพิร์ธ",timezoneUlaanbaatar:"อูลานบาตาร์",timezoneIrkutsk:"อีร์คุตส",timezoneSeoul:"โซล",timezoneOsaka:"โอซาก้า , ซัปโปโร , โตเกียว",timezoneYakutsk:"ยาคุตสค์",timezoneCanberra:"แคนเบอรา , เมลเบิร์น , ซิดนีย์",timezoneBrisbane:"บริสเบนด์",timezoneHobart:"โฮบาร์ต",timezoneGuam:"กวม, พอร์ท มอเรสซา",timezoneVladivostok:"วลาดีวอสตอค",timezoneSolomon:"โซโลมอน. แคลิโดเนียใหม่",timezoneMagadan:"มากาดาน",timezoneFiji:"ฟิจิ",timezoneAuckland:"โอ๊คแลนด์ ,เวลลิงตัน",timezoneNukualofa:"นูกูโลฟา",timezoneSamoa:"ซามัว",chooseTimezone:"เลือกโซนเวลาของคุณ"});