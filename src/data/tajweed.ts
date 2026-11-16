import type { TajweedRule } from '@/types'

/**
 * Okalyş düzgünleri (Tejwid esaslary).
 * Her sorag üçin `answer` — `options` massiwindäki dogry jogabyň indeksi.
 * Quiz wagtynda jogaplaryň tertibi garyşdyrylýar.
 */
export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: 'ustun',
    order: 1,
    title: 'Üstün',
    arabicName: 'فَتْحَة',
    symbol: 'ـَ',
    summary: 'Harpyň üstündäki kiçijik kese çyzyk — harp “a” sesi bilen okalýar.',
    explanation: [
      'Üstün (arapça fatha) harpyň üstünde ýazylýan kiçijik ýapgyt çyzykdyr. Ol harpa gysga “a” sesini berýär.',
      'Agyz azajyk açylyp, ses ýeňil çykarylýar. Galyň harplar (خ ص ض غ ط ق ظ) bilen “a” sesi “o”-a golaý, inçe harplar bilen “ä”-ä golaý eşidilýär.',
    ],
    examples: [
      { arabic: 'بَ', translit: 'ba' },
      { arabic: 'تَ', translit: 'ta' },
      { arabic: 'كَتَبَ', translit: 'kataba', note: 'ýazdy' },
      { arabic: 'خَلَقَ', translit: 'khalaqa', note: 'ýaratdy' },
    ],
    tip: 'Üstün — üstde, “a” sesi.',
    questions: [
      { prompt: 'Bu harp nähili okalýar?', arabic: 'بَ', options: ['ba', 'bi', 'bu', 'b'], answer: 0 },
      { prompt: 'Haýsy harp “ta” diýip okalýar?', options: ['تَ', 'تِ', 'تُ', 'تْ'], arabicOptions: true, answer: 0 },
      { prompt: 'Üstün belgisi nirede ýazylýar?', options: ['Harpyň üstünde', 'Harpyň aşagynda', 'Harpyň öňünde', 'Asla ýazylmaýar'], answer: 0 },
      { prompt: 'Bu söz nähili okalýar?', arabic: 'كَتَبَ', options: ['kataba', 'kitabi', 'kutubu', 'katab'], answer: 0 },
    ],
  },
  {
    id: 'astyn',
    order: 2,
    title: 'Astyn',
    arabicName: 'كَسْرَة',
    symbol: 'ـِ',
    summary: 'Harpyň aşagyndaky kiçijik kese çyzyk — harp “i” sesi bilen okalýar.',
    explanation: [
      'Astyn (arapça kasra) harpyň aşagynda ýazylýan kiçijik ýapgyt çyzykdyr. Ol harpa gysga “i” sesini berýär.',
      'Okalanda agzyň aşaky eňegi azajyk aşak düşýär, ses inçe çykýar.',
    ],
    examples: [
      { arabic: 'بِ', translit: 'bi' },
      { arabic: 'سِ', translit: 'si' },
      { arabic: 'إِبِلِ', translit: 'ibili', note: 'düýeler' },
      { arabic: 'بِسْمِ', translit: 'bismi', note: 'ady bilen' },
    ],
    tip: 'Astyn — astda, “i” sesi.',
    questions: [
      { prompt: 'Bu harp nähili okalýar?', arabic: 'بِ', options: ['bi', 'ba', 'bu', 'bin'], answer: 0 },
      { prompt: 'Haýsy harp “si” diýip okalýar?', options: ['سِ', 'سَ', 'سُ', 'سٌ'], arabicOptions: true, answer: 0 },
      { prompt: 'Astyn belgisi nirede ýazylýar?', options: ['Harpyň aşagynda', 'Harpyň üstünde', 'Harpyň yzynda', 'Iki harpyň arasynda'], answer: 0 },
      { prompt: 'Bu harp nähili okalýar?', arabic: 'قِ', options: ['qi', 'qa', 'qu', 'q'], answer: 0 },
    ],
  },
  {
    id: 'otre',
    order: 3,
    title: 'Ötre',
    arabicName: 'ضَمَّة',
    symbol: 'ـُ',
    summary: 'Harpyň üstündäki kiçijik “و” şekilli belgi — harp “u” sesi bilen okalýar.',
    explanation: [
      'Ötre (arapça damma) harpyň üstünde ýazylýan kiçijik waw (و) şekilli belgidir. Ol harpa gysga “u” sesini berýär.',
      'Okalanda dodaklar tegelek bolup azajyk öňe çykýar.',
    ],
    examples: [
      { arabic: 'بُ', translit: 'bu' },
      { arabic: 'نُ', translit: 'nu' },
      { arabic: 'كُتُبُ', translit: 'kutubu', note: 'kitaplar' },
      { arabic: 'نَعْبُدُ', translit: 'naʿbudu', note: 'ybadat edýäris' },
    ],
    tip: 'Ötre — dodaklar tegelek, “u” sesi.',
    questions: [
      { prompt: 'Bu harp nähili okalýar?', arabic: 'بُ', options: ['bu', 'ba', 'bi', 'bun'], answer: 0 },
      { prompt: 'Haýsy harp “nu” diýip okalýar?', options: ['نُ', 'نَ', 'نِ', 'نْ'], arabicOptions: true, answer: 0 },
      { prompt: 'Ötre belgisi nähili görnüşde?', options: ['Kiçijik waw (و) şekilli', 'Ýapgyt kese çyzyk', 'Kiçijik tegelek', 'Iki sany çyzyk'], answer: 0 },
      { prompt: 'Bu söz nähili okalýar?', arabic: 'كُتُبُ', options: ['kutubu', 'kataba', 'kitabi', 'kutub'], answer: 0 },
    ],
  },
  {
    id: 'tenwin',
    order: 4,
    title: 'Tenwin',
    arabicName: 'تَنْوِين',
    symbol: 'ـً ـٍ ـٌ',
    summary: 'Goşa hereket — sözüň ahyrynda “an”, “in”, “un” sesini berýär.',
    explanation: [
      'Tenwin hereketiň goşa ýazylmagydyr: iki üstün (ـً), iki astyn (ـٍ) ýa-da iki ötre (ـٌ). Ol diňe sözüň ahyrynda gelýär.',
      'Tenwinli harp öz hereketi bilen okalyp, soňuna sukunly “n” sesi goşulýar: بًا — ban, بٍ — bin, بٌ — bun.',
      'Iki üstünli tenwiniň yzynda köplenç älif ýazylýar, ol aýratyn okalmaýar. Diňe söz ahyrynda durlanda tenwin düşüp, ses “ā” bolup uzalýar.',
    ],
    examples: [
      { arabic: 'بًا', translit: 'ban' },
      { arabic: 'بٍ', translit: 'bin' },
      { arabic: 'بٌ', translit: 'bun' },
      { arabic: 'أَحَدٌ', translit: 'aḥadun', note: 'ýeke-täk' },
    ],
    tip: 'Tenwin = hereket + “n”.',
    questions: [
      { prompt: 'Bu harp nähili okalýar?', arabic: 'بٌ', options: ['bun', 'ban', 'bin', 'bu'], answer: 0 },
      { prompt: 'Haýsy harp “bin” diýip okalýar?', options: ['بٍ', 'بٌ', 'بًا', 'بِ'], arabicOptions: true, answer: 0 },
      { prompt: 'Tenwin näme?', options: ['Goşa ýazylan hereket (iki üstün, iki astyn ýa-da iki ötre)', 'Harpyň goşa okalmagy', 'Sesiň uzaldylmagy', 'Hereketsiz harp'], answer: 0 },
      { prompt: 'Tenwin sözüň haýsy ýerinde gelýär?', options: ['Diňe sözüň ahyrynda', 'Diňe sözüň başynda', 'Sözüň ortasynda', 'Islendik ýerinde'], answer: 0 },
    ],
  },
  {
    id: 'sukun',
    order: 5,
    title: 'Sukun (Jezm)',
    arabicName: 'سُكُون',
    symbol: 'ـْ',
    summary: 'Harpyň üstündäki kiçijik tegelek — harp hereketsiz okalýar we öňki harp bilen birleşýär.',
    explanation: [
      'Sukun harpyň üstünde ýazylýan kiçijik tegelek belgidir. Sukunly harpyň öz sesli sesi ýok — ol öňündäki hereketli harp bilen birleşip okalýar.',
      'Mysal üçin أَبْ — “ab”: älif üstün bilen “a”, yzyndaky sukunly be bolsa “b” bolup goşulýar.',
      'Mushafyň käbir neşirlerinde (Osmanly ýazgysynda) sukun ـۡ görnüşinde ýazylýar.',
    ],
    examples: [
      { arabic: 'أَبْ', translit: 'ab' },
      { arabic: 'مِنْ', translit: 'min', note: '-dan, -den' },
      { arabic: 'قُلْ', translit: 'qul', note: 'aýt' },
      { arabic: 'ٱلْحَمْدُ', translit: 'al-ḥamdu', note: 'hamd, öwgi' },
    ],
    tip: 'Sukun — ses ýok, öňki harp bilen birleş.',
    questions: [
      { prompt: 'Sukun nämäni aňladýar?', options: ['Harp hereketsiz okalýar we öňki harp bilen birleşýär', 'Harp uzaldylyp okalýar', 'Harp iki gezek okalýar', 'Harp asla okalmaýar'], answer: 0 },
      { prompt: 'Bu bogun nähili okalýar?', arabic: 'أَبْ', options: ['ab', 'aba', 'abi', 'abu'], answer: 0 },
      { prompt: 'Bu söz nähili okalýar?', arabic: 'قُلْ', options: ['qul', 'qulu', 'qala', 'qil'], answer: 0 },
      { prompt: 'Haýsy harpda sukun bar?', options: ['مْ', 'مَ', 'مِ', 'مُ'], arabicOptions: true, answer: 0 },
    ],
  },
  {
    id: 'sedde',
    order: 6,
    title: 'Şedde',
    arabicName: 'شَدَّة',
    symbol: 'ـّ',
    summary: 'Harpyň üstündäki “w” şekilli belgi — harp goşa (iki gezek) okalýar.',
    explanation: [
      'Şedde (arapça şadda) harpyň üstünde ýazylýan kiçijik “w” şekilli belgidir. Ol harpyň iki gezek okalmalydygyny görkezýär.',
      'Şeddeli harpyň birinji bölegi sukunly bolup öňki bogna goşulýar, ikinji bölegi bolsa öz hereketi bilen okalýar: رَبَّ = رَبْ + بَ — “rab-ba”.',
      'Nun (ن) we mim (م) şedde bilen gelende, ses iki hereket möçberinde burundan uzaldylýar — muňa gunna diýilýär.',
    ],
    examples: [
      { arabic: 'رَبَّ', translit: 'rabba', note: 'Rabb' },
      { arabic: 'إِنَّ', translit: 'inna', note: 'hakykatdan-da' },
      { arabic: 'ثُمَّ', translit: 'thumma', note: 'soňra' },
      { arabic: 'ٱلرَّحِيمِ', translit: 'ar-raḥīmi', note: 'Rahymly' },
    ],
    tip: 'Şedde — harp goşa: birinjisi sukunly, ikinjisi hereketli.',
    questions: [
      { prompt: 'Şedde nämäni aňladýar?', options: ['Harp iki gezek (goşa) okalýar', 'Harp hereketsiz okalýar', 'Harp “an” bilen okalýar', 'Harp okalmaýar'], answer: 0 },
      { prompt: 'Bu söz nähili okalýar?', arabic: 'رَبَّ', options: ['rabba', 'raba', 'rabi', 'rubba'], answer: 0 },
      { prompt: 'Bu söz nähili okalýar?', arabic: 'إِنَّ', options: ['inna', 'ina', 'anna', 'innu'], answer: 0 },
      { prompt: 'Şeddeli harpyň birinji bölegi nähili okalýar?', options: ['Sukunly', 'Üstünli', 'Astynly', 'Uzaldylyp'], answer: 0 },
    ],
  },
  {
    id: 'med-tebigy',
    order: 7,
    title: 'Tebigy med',
    arabicName: 'مَدّ طَبِيعِي',
    symbol: 'ا و ي',
    summary: 'Med harplary (ا و ي) sesi iki hereket möçberinde uzaldýar.',
    explanation: [
      'Med — sesi uzaltmak diýmekdir. Üç sany med harpy bar: älif (ا), waw (و) we ýe (ي).',
      'Üstünden soň sukunly älif: بَا — “bā”. Ötreden soň sukunly waw: بُو — “bū”. Astyndan soň sukunly ýe: بِي — “bī”.',
      'Tebigy med iki hereket (iki sany gysga ses) möçberinde uzaldylýar. Ondan gysga ýa-da uzyn okamak ýalňyşlykdyr.',
    ],
    examples: [
      { arabic: 'بَا', translit: 'bā' },
      { arabic: 'بُو', translit: 'bū' },
      { arabic: 'بِي', translit: 'bī' },
      { arabic: 'نُوحِيهَا', translit: 'nūḥīhā', note: 'üç med bir sözde' },
    ],
    tip: 'Üstün + ا, ötre + و, astyn + ي → 2 hereket uzalt.',
    questions: [
      { prompt: 'Bu bogun nähili okalýar?', arabic: 'بَا', options: ['bā (uzyn “a”)', 'ba (gysga “a”)', 'bi', 'bu'], answer: 0 },
      { prompt: 'Haýsy bogun “bū” (uzyn “u”) diýip okalýar?', options: ['بُو', 'بُ', 'بِي', 'بَا'], arabicOptions: true, answer: 0 },
      { prompt: 'Tebigy med näçe hereket uzaldylýar?', options: ['2 hereket', '4 hereket', '6 hereket', 'Uzaldylmaýar'], answer: 0 },
      { prompt: 'Med harplary haýsylar?', options: ['ا و ي', 'ب ت ث', 'ق ط ب ج د', 'ر ل ن'], arabicOptions: true, answer: 0 },
    ],
  },
  {
    id: 'med-uzyn',
    order: 8,
    title: 'Uzyn med (Med belgisi)',
    arabicName: 'مَدّ فَرْعِي',
    symbol: 'ـٓ',
    summary: 'Med harpynyň üstünde “ـٓ” belgisi bolsa, ses tebigy medden has uzyn — 4–6 hereket uzaldylýar.',
    explanation: [
      'Med harpyndan soň hemze (ء) ýa-da sukun gelse, ses tebigy medden uzyn okalýar. Mushafda bu ýagdaý med belgisi (ـٓ) bilen görkezilýär.',
      'Muttasil (birleşen) med: med harpy we hemze bir sözde — جَآءَ. 4–5 hereket uzaldylýar.',
      'Munfasil (aýrylan) med: med harpy bir sözüň ahyrynda, hemze indiki sözüň başynda — إِنَّآ أَعۡطَيۡنَٰكَ. 4–5 hereket uzaldylýar.',
      'Lazym med: med harpyndan soň şol sözde şeddeli ýa-da sukunly harp — ٱلضَّآلِّينَ. 6 hereket uzaldylýar.',
    ],
    examples: [
      { arabic: 'جَآءَ', translit: 'jā~ʾa', note: 'muttasil — 4–5 hereket; “~” uzaldylýan ýer' },
      { arabic: 'إِنَّآ أَعۡطَيۡنَٰكَ', translit: 'innā~ aʿṭaynāka', note: 'munfasil — 4–5 hereket' },
      { arabic: 'ٱلضَّآلِّينَ', translit: 'aḍ-ḍā~llīn', note: 'lazym — 6 hereket' },
    ],
    tip: 'Med belgisini (ـٓ) görseň — dur, sesi uzalt.',
    questions: [
      { prompt: 'Med belgisi (ـٓ) görlende näme edilýär?', options: ['Ses tebigy medden has uzaldylýar (4–6 hereket)', 'Harp okalmaýar', 'Harp goşa okalýar', 'Ses kesilýär'], answer: 0 },
      { prompt: 'Bu sözde haýsy med bar?', arabic: 'جَآءَ', options: ['Muttasil med — med harpy we hemze bir sözde', 'Munfasil med', 'Tebigy med', 'Med ýok'], answer: 0 },
      { prompt: 'Bu sözdäki “آ” näçe hereket uzaldylýar?', arabic: 'ٱلضَّآلِّينَ', options: ['6 hereket', '2 hereket', '1 hereket', '3 hereket'], answer: 0 },
      { prompt: 'Munfasil med haçan bolýar?', options: ['Med harpy sözüň ahyrynda, hemze indiki sözüň başynda gelende', 'Med harpy we hemze bir sözde gelende', 'Med harpyndan soň şedde gelende', 'Sözüň ahyrynda tenwin gelende'], answer: 0 },
    ],
  },
  {
    id: 'kalkala',
    order: 9,
    title: 'Kalkala',
    arabicName: 'قَلْقَلَة',
    symbol: 'ق ط ب ج د',
    summary: 'Bäş harp sukunly bolanda sesi azajyk “sekirip”, ýaňlanyp çykýar.',
    explanation: [
      'Kalkala — “yrgyldamak, sekirmek” diýmekdir. Kalkala harplary bäşdir: ق ط ب ج د. Olary ýatda saklamak üçin “قُطْبُ جَدٍّ” (kutbu jeddin) diýen jümle ulanylýar.',
      'Bu harplar sukunly bolanda (ýa-da aýatyň ahyrynda durlanda) ses gysylyp galman, azajyk ýaňlanyp çykýar.',
      'Aýatyň ahyrynda durlanda kalkala has güýçli (kalkala kubra), sözüň ortasynda bolsa ýeňil (kalkala sugra) bolýar.',
    ],
    examples: [
      { arabic: 'أَحَدْ', translit: 'aḥad', note: 'durlanda — güýçli kalkala' },
      { arabic: 'يَلِدْ', translit: 'yalid' },
      { arabic: 'ٱلْفَلَقْ', translit: 'al-falaq' },
      { arabic: 'يَجْعَلْ', translit: 'yajʿal', note: 'sözüň ortasynda — ýeňil' },
    ],
    tip: 'قُطْبُ جَدٍّ — sukunly bolsa, ýaňlan!',
    questions: [
      { prompt: 'Kalkala harplary haýsylar?', options: ['ق ط ب ج د', 'ا و ي', 'م ن', 'ء ه ع ح'], arabicOptions: true, answer: 0 },
      { prompt: 'Kalkala haçan ýüze çykýar?', options: ['Kalkala harpy sukunly bolanda', 'Kalkala harpy üstünli bolanda', 'Harp şeddeli bolanda', 'Harp tenwinli bolanda'], answer: 0 },
      { prompt: 'Aýatyň ahyrynda durlanda soňky “د” nähili okalýar?', arabic: 'أَحَدْ', options: ['Sesi azajyk ýaňlanyp (sekirip) çykýar', 'Düýbünden okalmaýar', 'Uzaldylyp okalýar', 'Burundan okalýar'], answer: 0 },
      { prompt: 'Haýsy sözde kalkala bar?', options: ['يَلِدْ', 'مِنْ', 'هُمْ', 'عَلَيْهِمْ'], arabicOptions: true, answer: 0 },
    ],
  },
]

export const RULE_BY_ID: Record<string, TajweedRule> = Object.fromEntries(
  TAJWEED_RULES.map((r) => [r.id, r]),
)
