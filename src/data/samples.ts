/**
 * Образцы переводов — фрагменты «исходный текст / перевод» для витрины
 * /primery-perevodov, по четырём специализациям бюро. Тексты составлены как
 * иллюстративные примеры характерных формулировок отрасли — не выдержки из
 * документов конкретных клиентов (конфиденциальность).
 */

export type SampleSpecializationKey = "technical" | "legal" | "medical" | "it";

export interface TranslationSample {
  id: string;
  docType: string;
  langPair: string;
  before: string;
  after: string;
  markers: string[];
}

export interface SampleSpecialization {
  key: SampleSpecializationKey;
  label: string;
  iconName: string;
  description: string;
  samples: TranslationSample[];
}

export const SAMPLE_SPECIALIZATIONS: SampleSpecialization[] = [
  {
    key: "technical",
    label: "Технический перевод",
    iconName: "wrench",
    description: "Инструкции, регламенты и отчёты, где неточный термин меняет процедуру на производстве.",
    samples: [
      {
        id: "tech-industrial-pump",
        docType: "Инструкция к промышленному оборудованию",
        langPair: "EN → RU",
        before:
          "Before initial start-up, verify that the discharge valve is fully open and the suction strainer is free of debris. Operating the pump against a closed valve, even briefly, may cause seal damage and void the warranty.",
        after:
          "Перед первым пуском убедитесь, что нагнетательный клапан полностью открыт, а всасывающий фильтр свободен от загрязнений. Работа насоса при закрытом клапане, даже кратковременная, может привести к повреждению уплотнения и аннулированию гарантии.",
        markers: [
          "«discharge valve» переведено как «нагнетательный клапан», а не калька «выпускной клапан» — частая ошибка машинного перевода",
          "причинно-следственная конструкция передана без кальки с английского синтаксиса",
        ],
      },
      {
        id: "tech-drilling-report",
        docType: "Отчёт по бурению",
        langPair: "EN → RU",
        before:
          "Mud weight was increased to 1.42 SG to control the influx observed at 2,140 m MD. No further gas readings were recorded after circulating two full bottoms-up cycles.",
        after:
          "Плотность бурового раствора была увеличена до 1,42 г/см³ для контроля притока флюида, зафиксированного на глубине 2140 м по стволу. После двух полных циклов циркуляции «от забоя» повторных показаний газа не зафиксировано.",
        markers: [
          "единицы SG корректно пересчитаны в г/см³, а не оставлены в исходном формате",
          "сохранены буровые термины «MD» → «по стволу» и «bottoms-up» → «от забоя» — устойчивые отраслевые обороты",
        ],
      },
      {
        id: "tech-machinery-datasheet",
        docType: "Паспорт оборудования",
        langPair: "DE → RU",
        before:
          "Die Anlage darf nur von eingewiesenem Fachpersonal bedient werden. Vor Wartungsarbeiten ist die Maschine drucklos zu schalten und gegen Wiedereinschalten zu sichern.",
        after:
          "К эксплуатации установки допускается только обученный квалифицированный персонал. Перед проведением работ по техническому обслуживанию необходимо сбросить давление в системе и заблокировать возможность случайного включения машины.",
        markers: [
          "«drucklos schalten» переведено функционально («сбросить давление»), а не дословно",
          "сохранена нормативная модальность немецкого «ist zu» → «необходимо»",
        ],
      },
    ],
  },
  {
    key: "legal",
    label: "Юридический перевод",
    iconName: "scale",
    description: "Контракты и корпоративные документы, где неточная формулировка меняет объём обязательств.",
    samples: [
      {
        id: "legal-indemnification-clause",
        docType: "Международный контракт, оговорка о возмещении убытков",
        langPair: "EN → RU",
        before:
          "Each Party shall indemnify, defend and hold harmless the other Party from and against any and all claims, losses, damages, liabilities and expenses arising out of a breach of this Agreement, except to the extent such claims arise from the gross negligence or wilful misconduct of the indemnified Party.",
        after:
          "Каждая Сторона обязуется возместить убытки, обеспечить защиту и оградить от ответственности другую Сторону в отношении любых претензий, потерь, убытков, обязательств и расходов, возникших вследствие нарушения настоящего Договора, за исключением случаев, когда такие претензии возникли по причине грубой неосторожности или умышленных недобросовестных действий Стороны, в пользу которой предоставляется возмещение.",
        markers: [
          "триада «indemnify, defend and hold harmless» передана тремя разными юридически точными глаголами, а не обобщена до одного «возместить»",
          "сохранена оговорка-исключение по вине самой защищаемой стороны — частая точка потери смысла при машинном переводе",
        ],
      },
      {
        id: "legal-nda",
        docType: "Соглашение о неразглашении (NDA)",
        langPair: "EN → RU",
        before:
          "Confidential Information shall not include information that: (a) was already known to the Receiving Party prior to disclosure; (b) becomes publicly available through no fault of the Receiving Party; or (c) is independently developed without reference to the Confidential Information.",
        after:
          "Конфиденциальная информация не включает сведения, которые: (a) были известны Получающей Стороне до их раскрытия; (b) стали общедоступными не по вине Получающей Стороны; либо (c) были самостоятельно разработаны без обращения к Конфиденциальной информации.",
        markers: [
          "сохранена структура перечисления (a)/(b)/(c) — важна для перекрёстных ссылок в остальном тексте договора",
          "термины с заглавной буквы зафиксированы согласно определениям в начале документа",
        ],
      },
      {
        id: "legal-charter",
        docType: "Устав компании, положение о филиалах",
        langPair: "RU → EN",
        before:
          "Общество вправе создавать филиалы и открывать представительства на территории Российской Федерации и за её пределами с соблюдением требований законодательства Российской Федерации и законодательства иностранного государства по месту нахождения филиалов и представительств.",
        after:
          "The Company shall be entitled to establish branches and open representative offices within the territory of the Russian Federation and abroad, subject to the requirements of the legislation of the Russian Federation and the legislation of the foreign state where such branches and representative offices are located.",
        markers: [
          "«вправе» → «shall be entitled to» — юридический регистр модальности, а не разговорное «can»",
          "сохранена двойная квалификация применимого права (российское и иностранное законодательство)",
        ],
      },
    ],
  },
  {
    key: "medical",
    label: "Медицинский перевод",
    iconName: "stethoscope",
    description: "Клинические и регуляторные документы, где цена ошибки — здоровье пациента.",
    samples: [
      {
        id: "medical-clinical-protocol",
        docType: "Протокол клинического исследования",
        langPair: "EN → RU",
        before:
          "Subjects who experience a treatment-emergent adverse event (TEAE) of Grade 3 or higher must be withdrawn from the study drug and followed until resolution or stabilization, regardless of causality assessment.",
        after:
          "Субъекты, у которых наблюдается нежелательное явление, связанное с лечением (НЯСЛ), 3-й степени тяжести или выше, должны быть выведены из исследования и находиться под наблюдением до разрешения явления или его стабилизации, вне зависимости от оценки причинно-следственной связи.",
        markers: [
          "TEAE переведено устоявшейся русскоязычной аббревиатурой НЯСЛ, принятой в документации по ЛП, а не калькой",
          "сохранена безусловность требования «regardless of causality assessment»",
        ],
      },
      {
        id: "medical-device-ifu",
        docType: "Инструкция к медицинскому изделию (IFU)",
        langPair: "EN → RU",
        before:
          "Do not resterilize. Single-use device. Reuse may lead to cross-contamination and device failure, which can result in patient injury.",
        after:
          "Повторная стерилизация не допускается. Изделие предназначено для одноразового применения. Повторное использование может привести к перекрёстному загрязнению и отказу изделия, что способно вызвать травмирование пациента.",
        markers: [
          "формулировки в нормативном регистре ISO 13485 («не допускается»), а не в разговорном («не делайте»)",
          "причинно-следственная цепочка передана без сокращений",
        ],
      },
      {
        id: "medical-discharge-summary",
        docType: "Выписной эпикриз для лечения за рубежом",
        langPair: "RU → EN",
        before:
          "Пациенту выполнена лапароскопическая холецистэктомия без интраоперационных осложнений. Послеоперационный период протекал гладко, дренаж удалён на 2-е сутки, швы сняты на 7-е сутки.",
        after:
          "The patient underwent laparoscopic cholecystectomy without intraoperative complications. The postoperative course was uneventful; the drain was removed on postoperative day 2, and sutures were removed on postoperative day 7.",
        markers: [
          "устойчивая клиническая формулировка «uneventful postoperative course» вместо буквального «протекал гладко»",
          "«сутки» корректно переданы как «postoperative day N» — принятый формат в англоязычной медицинской документации",
        ],
      },
    ],
  },
  {
    key: "it",
    label: "IT-перевод",
    iconName: "cpu",
    description: "Документация и интерфейсы, где важны и техническая точность, и естественность звучания.",
    samples: [
      {
        id: "it-api-docs",
        docType: "Документация API",
        langPair: "EN → RU",
        before:
          "Requests exceeding the rate limit will receive a 429 status code. Clients should implement exponential backoff and respect the Retry-After header before retrying the request.",
        after:
          "Запросы, превышающие лимит частоты обращений, получают код состояния 429. Клиентам следует реализовать экспоненциальную задержку повторных попыток и учитывать значение заголовка Retry-After перед повторной отправкой запроса.",
        markers: [
          "служебные имена (Retry-After header, статус-код) сохранены в исходном виде — стандарт локализации API-документации",
          "терминология rate limit / exponential backoff переведена единообразно",
        ],
      },
      {
        id: "it-saas-ux",
        docType: "Локализация интерфейса SaaS-продукта",
        langPair: "EN → RU",
        before: "You're all set! Your workspace is ready — invite teammates to start collaborating in real time.",
        after: "Готово! Ваше рабочее пространство настроено — пригласите коллег, чтобы начать совместную работу в режиме реального времени.",
        markers: [
          "разговорный, но не фамильярный тон UX-текста сохранён, а не превращён в канцелярит",
          "длина строки учитывает ограничения интерфейсных элементов",
        ],
      },
      {
        id: "it-privacy-policy",
        docType: "Политика конфиденциальности IT-продукта",
        langPair: "EN → RU",
        before:
          "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
        after:
          "Мы храним персональные данные только в течение срока, необходимого для достижения целей, для которых они были собраны, в том числе для соблюдения требований законодательства, ведения бухгалтерского учёта и отчётности.",
        markers: [
          "формулировка согласована с терминологией 152-ФЗ («персональные данные») при сохранении смысла GDPR-совместимого оригинала",
          "подходит для двуязычных юридических текстов IT-продукта",
        ],
      },
    ],
  },
];

export const getSpecialization = (key: string) => SAMPLE_SPECIALIZATIONS.find((s) => s.key === key);
