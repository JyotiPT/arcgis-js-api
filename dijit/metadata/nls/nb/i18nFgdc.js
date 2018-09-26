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
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Ingen",notComplete:"Ikke fullført",other:"Annet",present:"Til stede",unknown:"Ukjent",unpublishedMaterial:"Upublisert materiale"},hints:{integerGreaterThanOne:"(angi et heltall > 1)",integer0To100:"(angi et heltall 0..100)"},citeinfo:{caption:"Siteringsinformasjon",origin:"Opprinnelse",pubdate:"Publiseringsdato",pubtime:"Publiseringstidspunkt",title:"Tittel",edition:"Utgave",geoform:{caption:"Presentasjonsskjema for geografiske data",atlas:"Atlas",audio:"Lyd",diagram:"Diagram",sDocument:"Dokument",globe:"Globus",map:"Kart",model:"Modell",multiMediaPresentation:"Multimediapresentasjon",profile:"Profil",rasterDigitalData:"Raster, digitale data",remoteSensingImage:"Fjernsensorbilde",section:"Seksjon",spreadsheet:"Regneark",tabularDigitalData:"Tabellariske digitale data",vectorDigitalData:"Vektor, digitale data",video:"Video",view:"Vis"},serinfo:{caption:"Serieinformasjon",sername:"Serienavn",issue:"Nummeridentifikasjon"},pubinfo:{caption:"Publikasjonsinformasjon",pubplace:"Publikasjonssted",publish:"Utgiver"},othercit:"Andre siteringsdetaljer",onlink:"Tilkoblet kobling (URL)"},cntinfo:{caption:"Kontaktinformasjon",section:{primary:"Primær",phoneAndEmail:"Telefon og e-post",hoursAndInstructions:"Timer og instruksjoner"},cntorgp:{caption:"Etter organisasjon",cntorg:"Organisasjon",cntper:"Person"},cntperp:{caption:"Etter person",cntper:"Person",cntorg:"Organisasjon"},cntpos:"Posisjon",cntaddr:{caption:"Adresse",addrtype:{caption:"Adressetype",mailing:"Sending",physical:"Fysisk",mailingAndPhysical:"Sending og fysisk"},address:"Adresse",city:"By",state:"Stat",postal:"Postnummer",country:"Land"},cntvoice:"Tale",cnttdd:"TDD/TTY-telefon (hørselshemmede)",cntfax:"Faks",cntemail:"E-postadresse",hours:"Timer",cntinst:"Instruksjoner"},dataqual:{caption:"Datakvalitetinformasjon",section:{attributeAccuracy:"Attributtnøyaktighet",logicalConsistency:"Logisk konsistens",completeness:"Fullstendighet",positionalAccuracy:"Posisjonsnøyaktighet",lineage:"Slektskap",cloudCover:"Skydekke"},attracc:{caption:"Attributtnøyaktighet",attraccr:"Attributtnøyaktighetrapport",qattracc:{caption:"Kvantitativ vurdering av attributtnøyaktighet",attraccv:"Attributtnøyaktighetsverdi",attracce:"Attributtnøyaktighetsforklaring"}},logic:"Rapport om logisk konsistens",complete:"Rapport om fullstendighet",posacc:"Posisjonsnøyaktighet",horizpa:{caption:"Horisontal posisjonsnøyaktighet",horizpar:"Horisontal posisjonsnøyaktighetsrapport",qhorizpa:{caption:"Kvantitativ vurdering av horisontal posisjonsnøyaktighet",horizpav:"Horisontal posisjonsnøyaktighetsverdi",horizpae:"Horisontal posisjonsnøyaktighetsforklaring"}},vertacc:{caption:"Vertikal posisjonsnøyaktighet",vertaccr:"Vertikal posisjonsnøyaktighetsrapport",qvertpa:{caption:"Kvantitativ vurdering av vertikal posisjonsnøyaktighet",vertaccv:"Verdi for vertikal posisjonsnøyaktighet",vertacce:"Vertikal posisjonsnøyaktighetsforklaring"}},lineage:{caption:"Slektskap"},srcinfo:{caption:"Kildeinformasjon",srccite:"Kildesitering",srcscale:"Kildemålestokknevner",typesrc:{caption:"Type kildemedia",paper:"Papir",stableBaseMaterial:"Stabilt basemateriale",microfiche:"Mikrofilmkort",microfilm:"Mikrofilm",audiocassette:"Lydkassett",chart:"Diagram",filmstrip:"Filmstripe",transparency:"Gjennomsiktighet",videocassette:"Videokassett",videodisc:"Videodisk",videotape:"Videokassett",physicalModel:"Fysisk modell",computerProgram:"Datamaskinprogram",disc:"Disk",cartridgeTape:"Kassettbånd",magneticTape:"Magnetbånd",online:"Online",cdrom:"CD-ROM",electronicBulletinBoard:"Elektronisk oppslagstavle",electronicMailSystem:"Elektronisk postsystem"},srctime:"Kildetidsperiode for innholdet",srccurr:"Kildens oppdateringsreferanse",srccitea:"Kildens siteringsforkortelse",srccontr:"Kildebidrag"},procstep:{caption:"Prosesstrinn",procdesc:"Prosessbeskrivelse",srcused:"Siteringsforkortelse for benyttet kilde",procdate:"Behandlingsdato",proctime:"Behandlingstid",srcprod:"Siteringsforkortelse produsert av kilden",proccont:"Behandle kontakt"},cloud:"Skydekke"},distinfo:{caption:"Distribusjonsinformasjon",section:{distributor:"Distributør",description:"Beskrivelse",orderProcess:"Bestillingsprosess",prerequisites:"Nødvendig programvare",availability:"Tilgjengelighet"},distrib:"Distributør",resdesc:{caption:"Ressursbeskrivelse",liveData:"Aktive data og kart",downloadableData:"Data som kan lastes ned",offlineData:"Frakoblede data",staticMapImages:"Statiske kartbilder",sDocument:"Andre dokumenter",application:"Applikasjoner",geographicService:"Geografiske tjenester",clearingHouse:"Clearinghus",mapFiles:"Kartfiler",geographicActivies:"Geografiske aktiviteter"},distliab:"Ansvarserklæring for distribusjon",custom:"Tilpasset bestillingsprosess",techpreq:"Tekniske forutsetninger",availabl:"Tilgjengelighet"},eainfo:{caption:"Entitet- og attributtinformasjon",overview:"Beskrivelse av oversikt",eaover:"Entitet- og attributtoversikt",eadetcit:"Entitet- og attributtdetaljsiteringer"},idinfo:{caption:"Identifikasjonsinformasjon",section:{timeAndStatus:"Tid og status",constraints:"Begrensninger",contact:"Kontakt",additional:"Ekstra"},citeinfo:"Sitering",descript:{caption:"Beskrivelse",sAbstract:"Sammendrag",purpose:"Formål",supplinf:"Tilleggsinformasjon"},timeperd:{caption:"Innholdets tidsperiode",current:{caption:"Oppdateringsreferanse",groundCondition:"Grunnbetingelse",publicationDate:"Publiseringsdato"}},status:{caption:"Status",progress:{caption:"Fremdrift",complete:"Fullfør",inWork:"Under arbeid",planned:"Planlagt"},update:{caption:"Vedlikeholds- og oppdateringsfrekvens",continual:"Kontinuerlig",daily:"Daglig",weekly:"Ukentlig",monthly:"Månedlig",annually:"Årlig",unknown:"Ukjent",asNeeded:"Etter behov",irregular:"Uregelmessig",nonePlanned:"Ingen planlagt"}},spdom:{caption:"Omfang",bounding:{caption:"Markeringskoordinater",westbc:"Vestgående lengdegrad",eastbc:"Østgående lengdegrad",northbc:"Nordgående breddegrad",southbc:"Sørgående breddegrad"}},keywords:{caption:"Nøkkelord",theme:"Tema",place:"sted",stratum:"Stratum",temporal:"Tidsbestemt",thesaursus:"Tilknyttet synonymordbok",delimited:"Nøkkelord",themektIsoTopicCategory:"ISO-emne...",themektIsoTopicDialog:"ISO-emne",placektGnis:"Informasjonssystem for geografiske navn"},accconst:"Tilgangsbegrensninger",useconst:"Brukerbegrensninger",ptcontac:"Kontaktpunkt for ressursen",browse:{caption:"Bla igjennom grafikk",browsen:"Bla igjennom grafikk-URL",browsed:"Bla igjennom grafikkfilbeskrivelse",browset:"Bla igjennom grafikkfiltype"},datacred:"Datasettkreditt",secinfo:{caption:"Sikkerhetsinformasjon",secsys:"Sikkerhetsklassifiseringssystem",secclass:{caption:"Sikkerhetsklassifisering",topSecret:"Strengt hemmelig",secret:"Hemmelig",confidential:"Konfidensielt",restricted:"Begrenset",unclassified:"Ubegrenset",sensitive:"Sensitivt"},sechandl:"Sikkerhetshåndteringsbeskrivelse"},sNative:"Miljø for innebygd datasett",crossref:"Kryssreferanse"},metadata:{idinfo:"Identifikasjon",dataqual:"Kvalitet",spdoinfo:"Geografisk dataorganisasjon",spref:"Koordinatsystem",eainfo:"Entitet og attributt",distinfo:"Distribusjon",metainfo:"Metadata"},metainfo:{caption:"Metadatainformasjon",section:{dates:"Metadatadatoer",contact:"Metadatakontakt",standard:"Metadatastandard",additional:"Ekstra"},metd:"Metadatadato",metrd:"Metadatagjennomgangsdato",metfrd:"Fremtidig gjennomgangsdato for metadata",metstdn:"Metadatastandardnavn",metstdv:"Metadatastandardversjon",metac:"Metadatatilgangsbegrensninger",metuc:"Metadatabrukerbegrensninger",metsi:{caption:"Metadatasikkerhetsinformasjon",metscs:"Metadatasikkerhetsklassifiseringssystem",metsc:"Metadatasikkerhetsklassifisering",metshd:"Metadatasikkerhetshåndteringsbeskrivelse"}},spref:{caption:"Koordinatsysteminformasjon",horizsys:{caption:"Horisontalt koordinatsystem",geograph:{caption:"Geografisk",latres:"Breddegradoppløsning",longres:"Lengdegradoppløsning",geogunit:{caption:"Geografiske koordinatenheter",decimalDegrees:"Desimalgrader",decimalMinutes:"Desimalminutter",decimalSeconds:"Desimalsekunder",degreesAndDecimalMinutes:"Grader og desimalminutter",degreesMinutesAndDecimalSeconds:"Grader, minutter og desimalsekunder",radians:"Radianer",grads:"Gradienter"}},planar:{caption:"Plant"},local:{caption:"Lokalt",localdes:"Lokal beskrivelse",localgeo:"Lokal georeferanseinformasjon"},geodetic:{caption:"Geodetisk modell",horizdn:{caption:"Horisontalt datumnavn",nad83:"Nord-amerikansk datum 1983",nad27:"Nord-amerikansk datum 1927"},ellips:{caption:"Ellipsoidenavn",grs80:"Geodetisk referansesystem 80",clarke1866:"Clarke 1866"},semiaxis:"Halvstor akse",denflat:"Nevner for flateforhold"}},vertdef:{caption:"Vertikalt koordinatsystem",altsys:{caption:"System for høyde over havet",altdatum:{caption:"Datumnavn for høyde over havet",navd88:"Nord-amerikansk vertikalt datum for 1988",ngvd29:"Nasjonalt geodetisk vertikalt datum for 1929"},altres:"Oppløsning for høyde over havet",altunits:{caption:"Avstandsenheter for høyde over havet",meters:"meter",feet:"fot"},altenc:{caption:"Kodemetode for høyde over havet",explicit:"Eksplisitt koordinat for høyde over havet som inkluderes i horisontale koordinater",implicit:"Implisitt koordinat",attribute:"Attributtverdier"}},depthsys:{caption:"Dybdesystem",depthdn:{caption:"Datumnavn for dybde",option1:"Lokal overflate",option2:"Diagramdatum, datum for lydreduksjon",option3:"Laveste astronomiske tidevann",option4:"Høyeste astronomiske tidevann",option5:"Gjennomsnittlig lavvann",option6:"Gjennomsnittlig høyvann",option7:"Gjennomsnittlig havnivå",option8:"Datum for landmåling",option9:"Gjennomsnittlig lavvann i fjære",option10:"Gjennomsnittlig høyvann i fjære",option11:"Gjennomsnittlig lavvann ved nippflo",option12:"Gjennomsnittlig høyvann ved nippflo",option13:"Gjennomsnittlig lavere lavvann",option14:"Gjennomsnittlig lavere lavvann i fjære",option15:"Gjennomsnittlig høyere høyvann",option16:"Gjennomsnittlig høyere lavvann",option17:"Gjennomsnittlig lavere høyvann",option18:"Springflo",option19:"Tropisk lavere lavvann",option20:"Nippflo",option21:"Høyvann",option22:"Høyere høyvann",option23:"Lavvann",option24:"Lavvanndatum",option25:"Laveste lavvann",option26:"Lavere lavvann",option27:"Laveste normalt lavvann",option28:"Gjennomsnittlig tidevannsnivå",option29:"Indisk springlavvann",option30:"Høyvann full og økende",option31:"Lavvann full og økende",option32:"Columbia River datum",option33:"Lavvanndatum for gulfkysten",option34:"Ekvatorialspringlavvann",option35:"Omtrentlig laveste astronomiske tidevann",option36:"Ingen korrigering"},depthres:"Dybdeoppløsning",depthdu:{caption:"Dybdeavstandsenheter",meters:"meter",feet:"fot"},depthem:{caption:"Dybdekodemetode",explicit:"Eksplisitt dybdekoordinat som inkluderes i horisontale koordinater",implicit:"Implisitt koordinat",attribute:"Attributtverdier"}}}},timeinfo:{caption:"Tidsperiodeinformasjon",sngdate:"Enkeltdato",mdattim:"Flere datoer",rngdates:"Dataområde",caldate:"Dato",time:"Tid",begdate:"Startdato",begtime:"Starttidspunkt",enddate:"Sluttdato",endtime:"Sluttidspunkt"}});