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
  pt: "AMOSTRA",
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
  pt: {
    title: "Certificação de exatidão da tradução",
    subtitle: (docTitle) => `Tradução: ${docTitle} — do russo para o português`,
    paragraphs: [
      "Na qualidade de representante autorizado da www.techperevod.com, agência de traduções técnicas, certifico pela presente que o documento acima mencionado foi traduzido por um tradutor profissional qualificado e competente, com pleno domínio de ambas as línguas do par indicado. Tanto quanto é do nosso conhecimento, o texto traduzido reflete fielmente o conteúdo, o sentido e o estilo do texto original e constitui, em todos os aspetos, uma tradução completa e exata do documento original.",
      "A revisão técnica da tradução foi efetuada por um engenheiro com competência específica na matéria. A terminologia foi verificada com base na base terminológica do cliente e nas normas aplicáveis.",
      "A presente certificação refere-se exclusivamente à exatidão da tradução. Não garantimos a autenticidade nem o conteúdo do documento original. Uma cópia da tradução encontra-se anexada à presente certificação.",
      "NOTA: o presente documento é uma AMOSTRA ilustrativa sem valor vinculativo e não um certificado emitido.",
    ],
    signatureLabel: "Responsável pela qualidade, www.techperevod.com — assinatura",
    dateLabel: "Data",
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
  {
    docSlug: "protokol-ispytanij",
    sourceLang: "ru",
    targetLang: "de",
    docTitle: "Протокол испытаний (фрагмент)",
    translatedTitle: "PRÜFPROTOKOLL (Auszug)",
    sourceNote: "Übersetzung aus dem Russischen · Auszug: Prüfergebnisse · Alle Daten sind fiktiv",
    body: [
      {
        rows: [
          ["Protokoll Nr.", "TP-PI-0147/26 (fiktive Angabe)"],
          ["Prüfgegenstand", "Kreiselpumpe TP-C 65-200 (fiktive Bezeichnung)"],
          ["Prüfgrundlage", "GOST 6134 (Pumpen — Prüfverfahren), Werksnorm"],
          ["Prüfstand", "Prüfstand Nr. 2, Prüflabor «Primer-Test» (fiktiv)"],
          ["Prüfdatum", "15.01.2026 (fiktive Angabe)"],
        ],
      },
      { h: "3. Prüfergebnisse" },
      {
        rows: [
          ["Förderstrom Q (Nennpunkt)", "50 m³/h (Sollwert: 50 ± 2,5 m³/h) — bestanden"],
          ["Förderhöhe H", "49,7 m (Sollwert: 50 ± 1,5 m) — bestanden"],
          ["Wirkungsgrad η", "71,2 % (mind. 70 %) — bestanden"],
          ["Leistungsaufnahme P", "9,4 kW (max. 9,8 kW) — bestanden"],
          ["Schwingstärke (RMS)", "2,4 mm/s (zul. 4,5 mm/s nach ISO 10816) — bestanden"],
          ["Dichtheitsprüfung, 1,5·PN, 10 min", "keine Leckage — bestanden"],
        ],
      },
      { p: "Schlussfolgerung: Der Prüfgegenstand entspricht den Anforderungen der Prüfgrundlage. Das Erzeugnis wird zur Auslieferung freigegeben." },
      { p: "Hinweis des Übersetzungsbüros: Messwerte, Einheiten und Protokollnummern bleiben unverändert; GOST-Normbezeichnungen werden beibehalten und bei Bedarf mit ISO-Äquivalenten ergänzt." },
    ],
  },
  {
    docSlug: "obosnovanie-bezopasnosti",
    sourceLang: "ru",
    targetLang: "en",
    docTitle: "Обоснование безопасности (фрагмент)",
    translatedTitle: "SAFETY JUSTIFICATION REPORT (extract)",
    sourceNote: "Translated from Russian · Extract: hazard identification · All data is fictitious",
    body: [
      { h: "4. Hazard identification and risk assessment" },
      { p: "The hazard analysis has been carried out for all stages of the machine life cycle: transportation, installation, commissioning, operation, maintenance and decommissioning, in accordance with TR CU 010/2011 “On safety of machinery and equipment” and GOST 33272 (safety justification of machinery)." },
      {
        rows: [
          ["Hazard: rotating coupling (pos. 12)", "Risk before measures: high. Measure: fixed guard per GOST ISO 13857; interlocked with drive start. Residual risk: low."],
          ["Hazard: hydraulic pressure 25 MPa", "Measure: relief valve set at 27 MPa; pressure test 1.25·PN at commissioning. Residual risk: low."],
          ["Hazard: noise 84 dB(A)", "Measure: warning sign, mandatory hearing protection within 2 m zone. Residual risk: acceptable."],
          ["Hazard: hot surface up to 95 °C", "Measure: thermal insulation and warning marking per GOST R 12.4.026. Residual risk: low."],
        ],
      },
      { p: "Safe operation limits: ambient temperature +1…+40 °C; the machine shall not be operated with guards removed or safety devices bypassed. The list of critical failures and personnel actions is given in section 6 of the full document." },
      { p: "Translator's note: the section structure follows GOST 33272; references to TR CU technical regulations are kept in their official English form (TR CU 010/2011)." },
    ],
  },
  {
    docSlug: "instrukciya-montazh",
    sourceLang: "ru",
    targetLang: "it",
    docTitle: "Инструкция по монтажу (фрагмент)",
    translatedTitle: "ISTRUZIONI DI MONTAGGIO (estratto)",
    sourceNote: "Tradotto dal russo · Estratto: installazione e allineamento · Dati fittizi",
    body: [
      { h: "5. Installazione sul basamento" },
      { p: "Posizionare il gruppo sul basamento di calcestruzzo stagionato (resistenza minima C20/25). Verificare la planarità della superficie di appoggio: scostamento massimo 0,5 mm/m. Inserire gli spessori di regolazione in acciaio accanto a ciascun bullone di fondazione." },
      { p: "Serrare i bulloni di fondazione M20 in sequenza incrociata in due passaggi: primo passaggio 200 N·m, passaggio finale 380–420 N·m. Dopo 72 ore di funzionamento ripetere il controllo della coppia di serraggio." },
      { h: "6. Allineamento dell'albero" },
      {
        rows: [
          ["Disallineamento radiale", "max 0,05 mm"],
          ["Disallineamento angolare", "max 0,03 mm su 100 mm"],
          ["Distanza tra i semigiunti", "3,0 ± 0,5 mm"],
          ["Metodo di controllo", "comparatore a quadrante o sistema laser"],
        ],
      },
      { p: "AVVERTENZA: prima dell'avviamento verificare il senso di rotazione del motore con il giunto scollegato. Un senso di rotazione errato danneggia la tenuta meccanica." },
      { p: "Nota dell'agenzia di traduzione: la numerazione delle sezioni e i valori di coppia corrispondono all'originale; le parole di segnalazione seguono la gerarchia normalizzata (AVVERTENZA/ATTENZIONE)." },
    ],
  },
  {
    docSlug: "etiketka-markirovka",
    sourceLang: "ru",
    targetLang: "fr",
    docTitle: "Этикетка и маркировка продукции",
    translatedTitle: "ÉTIQUETTE ET MARQUAGE DU PRODUIT (extrait)",
    sourceNote: "Traduit du russe · Extrait : étiquette produit et marquage de transport · Données fictives",
    body: [
      { h: "Étiquette produit" },
      {
        rows: [
          ["Dénomination", "Enduit anticorrosion «TP-Protect 12» (dénomination fictive)"],
          ["Référence / lot", "TPP-12-B0426 · Lot n° 0426 (fictif)"],
          ["Masse nette", "20 kg"],
          ["Date de fabrication", "01/2026 (fictive) · À utiliser avant : 01/2028"],
          ["Conditions de stockage", "de +5 à +30 °C, à l'abri du rayonnement solaire direct ; craint le gel"],
          ["Fabricant", "OOO « Primer-Chim » (société fictive), Moscou, Russie"],
        ],
      },
      { h: "Marquage de transport" },
      { p: "Mentions de manutention selon GOST 14192 : « Craint l'humidité », « Haut », « Limite de température ». Groupe d'emballage III. Les mentions de danger et conseils de prudence (phrases H et P) figurent dans la version complète de l'étiquette selon les formulations officielles CLP." },
      { p: "Note du bureau de traduction : les références (TPP-…), numéros de lot et dates restent inchangés ; seules les mentions textuelles sont traduites. La mise en page de l'étiquette d'origine est conservée." },
    ],
  },
  {
    docSlug: "kommercheskoe-predlozhenie",
    sourceLang: "ru",
    targetLang: "en",
    docTitle: "Коммерческое предложение (фрагмент)",
    translatedTitle: "COMMERCIAL PROPOSAL (extract)",
    sourceNote: "Translated from Russian · Extract: scope of supply and terms · All data is fictitious",
    body: [
      {
        rows: [
          ["Proposal No.", "TP-CP-0089/26 dated 20.01.2026 (fictitious)"],
          ["Supplier", "OOO «Primer-Mash» (fictitious company), Russia"],
          ["Subject", "Centrifugal pump unit TP-C 65-200 with control cabinet"],
          ["Validity", "60 calendar days from the proposal date"],
        ],
      },
      { h: "1. Scope of supply and price" },
      {
        rows: [
          ["Pump unit TP-C 65-200, 9.5 kW", "2 pcs. · EUR 8,400.00 / pc. (fictitious price)"],
          ["Control cabinet with soft starter", "1 pc. · EUR 2,150.00"],
          ["Spare parts kit for 2 years of operation", "1 set · EUR 640.00"],
          ["Supervision of installation and commissioning", "5 working days · EUR 1,900.00"],
          ["Total, EXW excluding VAT", "EUR 21,490.00 (fictitious)"],
        ],
      },
      { h: "2. Terms" },
      { p: "Delivery: EXW manufacturer's warehouse (Incoterms 2020); lead time 10–12 weeks from advance payment. Payment: 50 % advance, 50 % before shipment. Warranty: 24 months from commissioning, but not more than 30 months from delivery." },
      { p: "Translator's note: prices, references and dates are kept as in the original; Incoterms clauses are not expanded or interpreted in translation." },
    ],
  },
  {
    docSlug: "katalog-produkcii",
    sourceLang: "ru",
    targetLang: "pt",
    docTitle: "Каталог продукции (фрагмент)",
    translatedTitle: "CATÁLOGO DE PRODUTOS (excerto)",
    sourceNote: "Traduzido do russo · Excerto: bombas centrífugas série TP-C · Dados fictícios",
    body: [
      { h: "Série TP-C — bombas centrífugas monobloco" },
      { p: "Bombas centrífugas horizontais para líquidos limpos e ligeiramente contaminados: abastecimento de água, sistemas de aquecimento, circuitos de arrefecimento industriais. Corpo em ferro fundido EN-GJL-250, impulsor em aço inoxidável, vedação mecânica de cartucho." },
      {
        rows: [
          ["TP-C 32-125", "Q até 12,5 m³/h · H até 20 m · 1,1 kW"],
          ["TP-C 50-160", "Q até 25 m³/h · H até 32 m · 4,0 kW"],
          ["TP-C 65-200", "Q até 50 m³/h · H até 50 m · 9,5 kW"],
          ["TP-C 80-250", "Q até 100 m³/h · H até 80 m · 30 kW"],
          ["Temperatura do líquido", "-15…+110 °C"],
          ["Pressão máxima de serviço", "16 bar (PN16)"],
        ],
      },
      { p: "Opções: execução para atmosferas explosivas, aquecimento elétrico do corpo, sensores de vibração e temperatura dos rolamentos. Ligações flangeadas segundo EN 1092-2 (equivalente GOST 33259)." },
      { p: "Nota da agência de tradução: as designações dos modelos (TP-C…) não se alteram na tradução; as unidades mantêm-se no sistema SI. As referências a normas GOST são acompanhadas dos equivalentes EN mais próximos." },
    ],
  },
  {
    docSlug: "pasport-izdeliya",
    sourceLang: "ru",
    targetLang: "pl",
    docTitle: "Паспорт изделия (фрагмент)",
    translatedTitle: "PASZPORT WYROBU (fragment)",
    sourceNote: "Tłumaczenie z języka rosyjskiego · Fragment: dane podstawowe i gwarancja · Dane fikcyjne",
    body: [
      { h: "1. Dane podstawowe wyrobu" },
      {
        rows: [
          ["Nazwa wyrobu", "Przekładnia zębata walcowa TP-R 250 (oznaczenie fikcyjne)"],
          ["Numer fabryczny", "26-00147 (fikcyjny)"],
          ["Data produkcji", "styczeń 2026 (fikcyjna)"],
          ["Przełożenie", "i = 31,5"],
          ["Moment nominalny na wale wyjściowym", "2 500 N·m"],
          ["Masa", "185 kg"],
          ["Producent", "OOO «Primer-Masz» (spółka fikcyjna), Rosja"],
        ],
      },
      { h: "2. Świadectwo odbioru" },
      { p: "Przekładnia TP-R 250 nr fabryczny 26-00147 została wyprodukowana i odebrana zgodnie z dokumentacją techniczną oraz uznana za zdatną do eksploatacji. Wyniki prób odbiorczych — protokół nr TP-PI-0147/26." },
      { h: "3. Warunki gwarancji" },
      { p: "Okres gwarancji wynosi 24 miesiące od daty uruchomienia, lecz nie więcej niż 30 miesięcy od daty dostawy, pod warunkiem przestrzegania zasad transportu, przechowywania, montażu i eksploatacji określonych w instrukcji obsługi. Wpisy o uruchomieniu i przeglądach należy odnotowywać w tabeli w rozdziale 5 pełnej wersji paszportu." },
      { p: "Uwaga biura tłumaczeń: numery fabryczne i daty pozostają bez zmian; struktura rozdziałów odpowiada oryginałowi paszportu wyrobu." },
    ],
  },
  {
    docSlug: "shema-elektricheskaya",
    sourceLang: "ru",
    targetLang: "cs",
    docTitle: "Схема электрическая принципиальная (пояснения)",
    translatedTitle: "ELEKTRICKÉ SCHÉMA ZAPOJENÍ — vysvětlivky (výtah)",
    sourceNote: "Přeloženo z ruštiny · Výtah: seznam prvků a poznámky ke schématu · Údaje jsou fiktivní",
    body: [
      {
        rows: [
          ["Označení výkresu", "TP-2026.15.00.000 E3 (fiktivní)"],
          ["Napájecí soustava", "3× 400 V AC, 50 Hz, síť TN-S"],
          ["Instalovaný výkon", "7,5 kW"],
          ["Hlavní jistič QF1", "25 A, char. C, vypínací schopnost 10 kA"],
        ],
      },
      { h: "Seznam prvků (výtah)" },
      {
        rows: [
          ["QF1", "jistič hlavního přívodu, 25 A"],
          ["KM1", "stykač hlavního pohonu, 18,5 kW / AC-3"],
          ["F1–F3", "pojistky řídicího obvodu, 2 A"],
          ["SB1 «STOP»", "tlačítko nouzového zastavení s aretací, rozpínací kontakt"],
          ["HL1", "signálka «síť zapnuta», zelená, 230 V"],
          ["M1", "asynchronní motor 7,5 kW, 1 450 ot/min, IE3"],
        ],
      },
      { p: "Poznámky: 1. Barevné značení vodičů podle ČSN EN 60445 (ekvivalent GOST 33542). 2. Ochranné pospojování provést vodičem PE 6 mm². 3. Nouzové zastavení odpovídá kategorii stop 0 podle ČSN EN 60204-1." },
      { p: "Poznámka překladatelské kanceláře: písmenná označení prvků (QF, KM, SB…) se v překladu nemění; překládají se pouze popisy a poznámky. Odkazy na normy GOST jsou doplněny nejbližšími ekvivalenty ČSN EN." },
    ],
  },
];
