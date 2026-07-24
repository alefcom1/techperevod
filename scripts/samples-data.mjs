/**
 * Данные PDF-образцов переводов (scripts/generate-samples.mjs).
 *
 * ВСЕ данные вымышленные: без реальных компаний, имён и номеров. Каждый
 * образец — фрагмент типового документа, переведённый на целевой язык.
 * Переводы готовятся и проверяются заранее; генератор только верстает.
 *
 * Структура body: массив блоков { h?: заголовок, p?: абзац,
 * rows?: [[ключ, значение], ...] — двухколоночная таблица }.
 */

/** Слово «ОБРАЗЕЦ» на целевом языке — для водяного знака рядом с «ПРИМЕР». */
export const WATERMARK_BY_LANG = {
  en: "SAMPLE",
  de: "MUSTER",
  fr: "SPÉCIMEN",
  es: "MUESTRA",
  it: "ESEMPIO",
  pl: "WZÓR",
  cs: "VZOREK",
  nl: "VOORBEELD",
};

/**
 * Тексты сертификата точности перевода — на языке перевода (стр. 2 PDF).
 * subtitle(docTitle, src, tgt) подставляет описание документа и пару.
 */
export const CERT_TEXTS = {
  de: {
    title: "Bescheinigung über die Richtigkeit der Übersetzung",
    subtitle: (docTitle) => `Übersetzung: ${docTitle} — aus dem Russischen ins Deutsche`,
    paragraphs: [
      "Als bevollmächtigter Vertreter des Übersetzungsbüros www.techperevod.com (Büro für technische Übersetzungen) bestätige ich hiermit, dass das oben genannte Dokument von einem qualifizierten und kompetenten Fachübersetzer übersetzt wurde, der beide Sprachen des angegebenen Sprachpaars fließend beherrscht. Nach unserem besten Wissen und Gewissen gibt der übersetzte Text den Inhalt, die Bedeutung und den Stil des Originaltextes genau wieder und stellt in jeder Hinsicht eine vollständige und korrekte Übersetzung des Originaldokuments dar.",
      "Die fachliche Redaktion der Übersetzung wurde von einem Ingenieur mit einschlägiger Fachkompetenz durchgeführt. Die Terminologie wurde anhand der Kundenterminologie-Datenbank sowie der einschlägigen Normen geprüft und vereinheitlicht.",
      "Diese Bescheinigung bezieht sich ausschließlich auf die Richtigkeit der Übersetzung. Wir übernehmen keine Gewähr für die Echtheit oder den Inhalt des Originaldokuments. Eine Kopie der Übersetzung ist dieser Bescheinigung beigefügt.",
      "HINWEIS: Dieses Dokument ist ein unverbindliches Anschauungsmuster (SAMPLE) und kein ausgestelltes Zertifikat.",
    ],
    signatureLabel: "Leiter Qualitätssicherung, www.techperevod.com — Unterschrift",
    dateLabel: "Datum",
  },
  en: {
    title: "Certification of Translation Accuracy",
    subtitle: (docTitle) => `Translation: ${docTitle} — from Russian into English`,
    paragraphs: [
      "As an authorized representative of www.techperevod.com, a professional technical translation bureau, I hereby certify that the above-mentioned document has been translated by an experienced, qualified and competent professional translator, fluent in the above-mentioned language pair, and that, in our best judgment, the translated text truly reflects the content, meaning and style of the original text and constitutes in every respect a complete and accurate translation of the original document.",
      "Editorial review of the translation was performed by an engineer with relevant subject-matter expertise. Terminology has been verified against the client termbase and applicable industry standards.",
      "This certification refers to the accuracy of the translation only. We make no claims or guarantees about the authenticity or content of the original document. A copy of the translation is attached to this certification.",
      "NOTE: This document is a non-binding illustrative SAMPLE, not an issued certificate.",
    ],
    signatureLabel: "Head of Quality Assurance, www.techperevod.com — signature",
    dateLabel: "Date",
  },
  fr: {
    title: "Attestation d'exactitude de la traduction",
    subtitle: (docTitle) => `Traduction : ${docTitle} — du russe vers le français`,
    paragraphs: [
      "En qualité de représentant autorisé du bureau de traductions techniques www.techperevod.com, je certifie par la présente que le document susmentionné a été traduit par un traducteur professionnel qualifié et compétent, maîtrisant parfaitement les deux langues de la paire indiquée. À notre meilleure connaissance, le texte traduit reflète fidèlement le contenu, le sens et le style du texte original et constitue à tous égards une traduction complète et exacte du document original.",
      "La révision technique de la traduction a été effectuée par un ingénieur disposant de l'expertise requise dans le domaine concerné. La terminologie a été vérifiée à l'aide de la base terminologique du client et des normes applicables.",
      "La présente attestation ne concerne que l'exactitude de la traduction. Nous ne garantissons ni l'authenticité ni le contenu du document original. Une copie de la traduction est jointe à la présente attestation.",
      "REMARQUE : le présent document est un SPÉCIMEN illustratif sans valeur contractuelle et non un certificat délivré.",
    ],
    signatureLabel: "Responsable qualité, www.techperevod.com — signature",
    dateLabel: "Date",
  },
  es: {
    title: "Certificación de exactitud de la traducción",
    subtitle: (docTitle) => `Traducción: ${docTitle} — del ruso al español`,
    paragraphs: [
      "Como representante autorizado de www.techperevod.com, oficina de traducciones técnicas, certifico por la presente que el documento arriba mencionado ha sido traducido por un traductor profesional cualificado y competente, con pleno dominio de ambos idiomas del par indicado. A nuestro leal saber y entender, el texto traducido refleja fielmente el contenido, el sentido y el estilo del texto original y constituye, en todos los aspectos, una traducción completa y exacta del documento original.",
      "La revisión técnica de la traducción fue realizada por un ingeniero con experiencia en la materia. La terminología ha sido verificada con la base terminológica del cliente y las normas aplicables.",
      "La presente certificación se refiere únicamente a la exactitud de la traducción. No garantizamos la autenticidad ni el contenido del documento original. Se adjunta una copia de la traducción a la presente certificación.",
      "NOTA: este documento es una MUESTRA ilustrativa sin valor vinculante y no un certificado emitido.",
    ],
    signatureLabel: "Responsable de calidad, www.techperevod.com — firma",
    dateLabel: "Fecha",
  },
  it: {
    title: "Certificazione di accuratezza della traduzione",
    subtitle: (docTitle) => `Traduzione: ${docTitle} — dal russo all'italiano`,
    paragraphs: [
      "In qualità di rappresentante autorizzato di www.techperevod.com, agenzia di traduzioni tecniche, certifico con la presente che il documento sopra indicato è stato tradotto da un traduttore professionista qualificato e competente, con piena padronanza di entrambe le lingue della coppia indicata. Per quanto a nostra conoscenza, il testo tradotto riflette fedelmente il contenuto, il significato e lo stile del testo originale e costituisce sotto ogni aspetto una traduzione completa e accurata del documento originale.",
      "La revisione tecnica della traduzione è stata eseguita da un ingegnere con competenza specifica nel settore. La terminologia è stata verificata con la banca dati terminologica del cliente e le norme applicabili.",
      "La presente certificazione riguarda esclusivamente l'accuratezza della traduzione. Non forniamo alcuna garanzia sull'autenticità o sul contenuto del documento originale. Una copia della traduzione è allegata alla presente certificazione.",
      "NOTA: il presente documento è un ESEMPIO illustrativo non vincolante e non un certificato rilasciato.",
    ],
    signatureLabel: "Responsabile qualità, www.techperevod.com — firma",
    dateLabel: "Data",
  },
  pl: {
    title: "Poświadczenie zgodności tłumaczenia",
    subtitle: (docTitle) => `Tłumaczenie: ${docTitle} — z języka rosyjskiego na polski`,
    paragraphs: [
      "Jako upoważniony przedstawiciel biura tłumaczeń technicznych www.techperevod.com niniejszym poświadczam, że wyżej wymieniony dokument został przetłumaczony przez wykwalifikowanego i kompetentnego tłumacza zawodowego, biegle władającego oboma językami wskazanej pary językowej. Zgodnie z naszą najlepszą wiedzą przetłumaczony tekst wiernie oddaje treść, znaczenie i styl tekstu oryginalnego i stanowi pod każdym względem kompletne i dokładne tłumaczenie dokumentu oryginalnego.",
      "Redakcję merytoryczną tłumaczenia przeprowadził inżynier posiadający odpowiednią wiedzę branżową. Terminologia została zweryfikowana z bazą terminologiczną klienta oraz obowiązującymi normami.",
      "Niniejsze poświadczenie dotyczy wyłącznie zgodności tłumaczenia. Nie gwarantujemy autentyczności ani treści dokumentu oryginalnego. Kopia tłumaczenia stanowi załącznik do niniejszego poświadczenia.",
      "UWAGA: niniejszy dokument jest niewiążącym WZOREM poglądowym, a nie wydanym certyfikatem.",
    ],
    signatureLabel: "Kierownik ds. jakości, www.techperevod.com — podpis",
    dateLabel: "Data",
  },
  cs: {
    title: "Osvědčení o správnosti překladu",
    subtitle: (docTitle) => `Překlad: ${docTitle} — z ruštiny do češtiny`,
    paragraphs: [
      "Jako oprávněný zástupce kanceláře technických překladů www.techperevod.com tímto osvědčuji, že výše uvedený dokument byl přeložen kvalifikovaným a kompetentním profesionálním překladatelem, který plynně ovládá oba jazyky uvedeného jazykového páru. Podle našeho nejlepšího vědomí přeložený text věrně odráží obsah, význam a styl původního textu a představuje v každém ohledu úplný a přesný překlad původního dokumentu.",
      "Odbornou redakci překladu provedl inženýr s odpovídající odbornou znalostí oboru. Terminologie byla ověřena podle terminologické databáze klienta a platných norem.",
      "Toto osvědčení se týká výhradně správnosti překladu. Neručíme za pravost ani obsah původního dokumentu. Kopie překladu je přílohou tohoto osvědčení.",
      "POZNÁMKA: tento dokument je nezávazný ilustrační VZOREK, nikoli vydané osvědčení.",
    ],
    signatureLabel: "Vedoucí kvality, www.techperevod.com — podpis",
    dateLabel: "Datum",
  },
  nl: {
    title: "Verklaring van nauwkeurigheid van de vertaling",
    subtitle: (docTitle) => `Vertaling: ${docTitle} — uit het Russisch naar het Nederlands`,
    paragraphs: [
      "Als gemachtigd vertegenwoordiger van www.techperevod.com, bureau voor technische vertalingen, verklaar ik hierbij dat het bovengenoemde document is vertaald door een gekwalificeerde en competente professionele vertaler die beide talen van het aangegeven talenpaar vloeiend beheerst. Naar ons beste weten geeft de vertaalde tekst de inhoud, betekenis en stijl van de oorspronkelijke tekst getrouw weer en vormt deze in elk opzicht een volledige en nauwkeurige vertaling van het originele document.",
      "De vakinhoudelijke redactie van de vertaling is uitgevoerd door een ingenieur met relevante vakkennis. De terminologie is gecontroleerd aan de hand van de terminologiedatabase van de klant en de toepasselijke normen.",
      "Deze verklaring heeft uitsluitend betrekking op de nauwkeurigheid van de vertaling. Wij geven geen garantie over de echtheid of de inhoud van het originele document. Een kopie van de vertaling is bij deze verklaring gevoegd.",
      "LET OP: dit document is een vrijblijvend illustratief VOORBEELD en geen afgegeven verklaring.",
    ],
    signatureLabel: "Hoofd kwaliteitsborging, www.techperevod.com — handtekening",
    dateLabel: "Datum",
  },
};

export const SAMPLE_DOCS = [
  {
    docSlug: "pasport-bezopasnosti",
    sourceLang: "ru",
    targetLang: "de",
    docTitle: "Паспорт безопасности (SDS), раздел 1 и 9",
    translatedTitle: "SICHERHEITSDATENBLATT gemäß Verordnung (EG) Nr. 1907/2006 (REACH)",
    sourceNote: "Übersetzung aus dem Russischen · Auszug (Abschnitte 1 und 9) · Alle Daten sind fiktiv",
    body: [
      { h: "ABSCHNITT 1: Bezeichnung des Stoffs bzw. des Gemischs und des Unternehmens" },
      {
        rows: [
          ["1.1 Produktidentifikator", "Industrielles Entfettungsmittel «TP-Clean 40»"],
          ["Produktcode", "TPC-40-2026 (fiktive Angabe)"],
          ["1.2 Verwendung", "Entfettung von Metalloberflächen in industriellen Anlagen. Nur für den gewerblichen Gebrauch."],
          ["1.3 Lieferant", "OOO «Primer-Chim» (fiktives Unternehmen), Moskau, Russland"],
          ["Notrufnummer", "+7 (000) 000-00-00 (rund um die Uhr, fiktive Nummer)"],
        ],
      },
      { h: "ABSCHNITT 9: Physikalische und chemische Eigenschaften" },
      {
        rows: [
          ["Aggregatzustand", "Flüssigkeit, klar, farblos bis leicht gelblich"],
          ["Geruch", "schwach, alkoholartig"],
          ["pH-Wert (20 °C)", "7,5–8,5 (10 g/l in Wasser)"],
          ["Flammpunkt", "41 °C (geschlossener Tiegel, GOST 6356 / DIN EN ISO 2719)"],
          ["Dichte (20 °C)", "0,89–0,92 g/cm³"],
          ["Löslichkeit in Wasser", "vollständig mischbar"],
          ["Viskosität, kinematisch (40 °C)", "2,8 mm²/s"],
        ],
      },
      {
        p: "Hinweis des Übersetzungsbüros: Die Gefahren- (H-) und Sicherheitshinweise (P-Sätze) werden in der vollständigen Fassung des Dokuments gemäß den amtlichen GHS/CLP-Standardformulierungen wiedergegeben; die Abschnittsstruktur folgt GOST 30333 bzw. Verordnung (EG) Nr. 1907/2006.",
      },
    ],
  },
  {
    docSlug: "chertezh",
    sourceLang: "ru",
    targetLang: "en",
    docTitle: "Сборочный чертёж, технические требования",
    translatedTitle: "ASSEMBLY DRAWING — Technical Requirements (extract)",
    sourceNote: "Translated from Russian · Extract: title block and technical requirements · All data is fictitious",
    body: [
      { h: "Title block (fictitious data)" },
      {
        rows: [
          ["Drawing No.", "TP-2026.15.00.000 SB (fictitious)"],
          ["Title", "Gearbox, assembly"],
          ["Scale / Sheet", "1:2 · Sheet 1 of 3"],
          ["Material", "—"],
          ["Mass", "48.5 kg"],
        ],
      },
      { h: "Technical requirements" },
      { p: "1. Assemble and test the gearbox as per TP-2026 assembly procedure. 2. Tightening torque for M12 bolts (pos. 7): 78–86 N·m. 3. Fill with gear oil ISO VG 220 to the level mark before testing; run-in for 30 min at no load. 4. Permissible radial runout of the output shaft: max 0.05 mm. 5. Unspecified limit deviations: holes H14, shafts h14, others ±IT14/2 per GOST 30893.1 (ISO 2768-m equivalent). 6. Preserve machined surfaces with anti-corrosion compound for storage class 2." },
      { p: "Translator's note: item designations, dimensions and geometry of the drawing remain unchanged; only text content is translated. Title block adapted per customer standard (ISO 7200)." },
    ],
  },
  {
    docSlug: "instrukciya",
    sourceLang: "ru",
    targetLang: "fr",
    docTitle: "Руководство по эксплуатации, раздел «Безопасность»",
    translatedTitle: "NOTICE D'UTILISATION — Consignes de sécurité (extrait)",
    sourceNote: "Traduit du russe · Extrait : consignes de sécurité et caractéristiques · Données fictives",
    body: [
      { h: "2. Consignes de sécurité" },
      { p: "AVERTISSEMENT : avant toute intervention de maintenance, mettre la machine hors tension et verrouiller l'interrupteur principal en position « 0 » (consignation). Le non-respect de cette consigne peut entraîner des blessures graves." },
      { p: "ATTENTION : ne jamais neutraliser les dispositifs de protection. Les capots de protection (pos. 3 et 5) doivent être en place pendant le fonctionnement. Porter des équipements de protection individuelle : lunettes de sécurité et protections auditives." },
      { h: "3. Caractéristiques techniques" },
      {
        rows: [
          ["Tension d'alimentation", "400 V, 3~, 50 Hz"],
          ["Puissance installée", "7,5 kW"],
          ["Pression de service", "0,6–0,8 MPa"],
          ["Niveau sonore", "≤ 78 dB(A) à 1 m"],
          ["Masse", "1 250 kg"],
          ["Température ambiante", "+5…+40 °C"],
        ],
      },
      { p: "Note du bureau de traduction : les mots de signalisation (AVERTISSEMENT, ATTENTION) suivent la hiérarchie normalisée ; la numérotation des sections correspond à l'original." },
    ],
  },
  {
    docSlug: "katalog-zapchastej",
    sourceLang: "ru",
    targetLang: "es",
    docTitle: "Каталог запасных частей (фрагмент)",
    translatedTitle: "CATÁLOGO DE PIEZAS DE REPUESTO (extracto)",
    sourceNote: "Traducido del ruso · Extracto: grupo «Sistema hidráulico» · Datos ficticios",
    body: [
      { h: "Grupo 4. Sistema hidráulico" },
      {
        rows: [
          ["4.01 · TP-410256", "Bomba hidráulica de engranajes, 32 cm³/rev — 1 ud."],
          ["4.02 · TP-410311", "Válvula limitadora de presión, 250 bar — 1 ud."],
          ["4.03 · TP-410402", "Filtro de retorno, 25 µm, con indicador — 1 ud."],
          ["4.04 · TP-410415", "Elemento filtrante (recambio) — 2 uds."],
          ["4.05 · TP-410508", "Manguera de alta presión DN12, L=1200 mm — 4 uds."],
          ["4.06 · TP-410612", "Junta tórica 32×3,5 NBR — 10 uds."],
        ],
      },
      { p: "Nota del bureau de traducción: los números de referencia (TP-…) no se modifican en la traducción; se traducen únicamente las denominaciones y observaciones. Pedidos de repuestos: indicar siempre el número de referencia y el número de serie de la máquina." },
    ],
  },
  {
    docSlug: "tu-specifikaciya",
    sourceLang: "ru",
    targetLang: "it",
    docTitle: "Технические условия (ТУ), характеристики продукции",
    translatedTitle: "SPECIFICA TECNICA — Requisiti del prodotto (estratto)",
    sourceNote: "Tradotto dal russo · Estratto: requisiti tecnici principali · Dati fittizi",
    body: [
      { h: "3. Requisiti tecnici" },
      {
        rows: [
          ["Designazione del prodotto", "Profilo di alluminio TP-AL 6060 T6 (fittizio)"],
          ["Lunghezza di fornitura", "6 000 ± 5 mm"],
          ["Tolleranze dimensionali", "secondo EN 755-9 (equivalente GOST 22233)"],
          ["Resistenza a trazione Rm", "≥ 215 MPa"],
          ["Limite di snervamento Rp0,2", "≥ 160 MPa"],
          ["Allungamento A", "≥ 8 %"],
          ["Trattamento superficiale", "anodizzazione 15 µm, colore naturale"],
        ],
      },
      { p: "4. Controllo e collaudo. Ogni lotto è accompagnato da un certificato di collaudo 3.1 secondo EN 10204. Il controllo dimensionale viene eseguito su campioni pari al 5 % del lotto, ma non meno di 3 barre." },
      { p: "Nota dell'agenzia di traduzione: i riferimenti alle norme GOST sono accompagnati dagli equivalenti EN/ISO più vicini; dove la corrispondenza non è esatta, viene indicato esplicitamente." },
    ],
  },
  {
    docSlug: "reglament-to",
    sourceLang: "ru",
    targetLang: "pl",
    docTitle: "Регламент технического обслуживания",
    translatedTitle: "HARMONOGRAM KONSERWACJI I PRZEGLĄDÓW (fragment)",
    sourceNote: "Tłumaczenie z języka rosyjskiego · Fragment: przeglądy okresowe · Dane fikcyjne",
    body: [
      { h: "5. Przeglądy okresowe" },
      {
        rows: [
          ["Co 8 godz. (zmiana)", "Kontrola wzrokowa wycieków; sprawdzenie poziomu oleju hydraulicznego; czyszczenie strefy roboczej."],
          ["Co 250 godz.", "Smarowanie łożysk wg schematu smarowania (smar EP2); kontrola naciągu pasów napędowych (ugięcie 8–10 mm)."],
          ["Co 1 000 godz.", "Wymiana wkładu filtra powrotnego; kontrola momentu dokręcenia śrub fundamentowych M20: 380–420 N·m."],
          ["Co 4 000 godz.", "Wymiana oleju przekładniowego ISO VG 220; pomiar luzu osiowego wału: maks. 0,15 mm."],
          ["Co 8 000 godz.", "Przegląd główny z udziałem serwisu producenta; protokół z przeglądu dołączyć do książki maszyny."],
        ],
      },
      { p: "Uwaga biura tłumaczeń: wartości momentów, lepkości i okresów pozostają zgodne z oryginałem; jednostki podano w układzie SI." },
    ],
  },
  {
    docSlug: "sertifikat",
    sourceLang: "ru",
    targetLang: "cs",
    docTitle: "Сертификат соответствия (фрагмент)",
    translatedTitle: "CERTIFIKÁT SHODY (výtah)",
    sourceNote: "Přeloženo z ruštiny · Výtah z certifikátu · Údaje jsou fiktivní",
    body: [
      {
        rows: [
          ["Číslo certifikátu", "TP RU C-XX.AB12.C.00001/26 (fiktivní)"],
          ["Výrobek", "Čerpadlo odstředivé, řada TP-C (fiktivní označení)"],
          ["Výrobce", "OOO «Primer-Mash» (fiktivní společnost), Rusko"],
          ["Splňuje požadavky", "TR CU 010/2011 «O bezpečnosti strojů a zařízení»"],
          ["Zkušební protokoly", "č. 0001-26, 0002-26 (fiktivní), zkušebna «Primer-Test»"],
          ["Platnost", "od 01.02.2026 do 31.01.2031 (fiktivní údaj)"],
        ],
      },
      { p: "Poznámka překladatelské kanceláře: čísla certifikátu a protokolů se v překladu nemění; překládají se pouze názvy, označení a text. Struktura odpovídá originálu certifikátu." },
    ],
  },
  {
    docSlug: "rukovodstvo-po",
    sourceLang: "ru",
    targetLang: "nl",
    docTitle: "Руководство пользователя ПО (фрагмент)",
    translatedTitle: "SOFTWAREHANDLEIDING — Aan de slag (uittreksel)",
    sourceNote: "Vertaald uit het Russisch · Uittreksel: eerste stappen · Alle gegevens zijn fictief",
    body: [
      { h: "1. Aan de slag" },
      { p: "Meld u aan bij het systeem met het account dat door de beheerder is verstrekt. Kies na het aanmelden de werkruimte «Productie» — het dashboard toont de actuele status van de lijnen en actieve taken." },
      { h: "2. Een taak aanmaken" },
      { p: "Klik op «Nieuwe taak», kies het type bewerking en het artikel uit de catalogus. Velden met een * zijn verplicht. De parameters {snelheid} en {temperatuur} worden automatisch ingevuld op basis van het gekozen recept en kunnen handmatig worden aangepast binnen de toegestane grenzen." },
      {
        rows: [
          ["Sneltoets Ctrl+N", "nieuwe taak aanmaken"],
          ["Sneltoets Ctrl+F", "zoeken in de takenlijst"],
          ["Statuskleur groen", "taak actief, geen afwijkingen"],
          ["Statuskleur oranje", "waarschuwing — controleer de parameters"],
        ],
      },
      { p: "Opmerking van het vertaalbureau: interface-elementen («Nieuwe taak», «Productie») komen overeen met de daadwerkelijke schermteksten van de software; plaatshouders zoals {snelheid} blijven onvertaald." },
    ],
  },
];
