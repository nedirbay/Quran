import type { ScriptureBook } from '@/types'

/**
 * Ylahy kitaplar — Kurany Kerimde agzalyşy boýunça.
 * Taryhy seneler takmynan we alymlaryň çaklamalaryna esaslanýar.
 * Her soragda `answer` — `options` massiwindäki dogry jogabyň indeksi.
 */
export const BOOKS: ScriptureBook[] = [
  {
    id: 'suhuf',
    order: 1,
    name: 'Sahyfalar (Suhuf)',
    arabicName: 'صُحُف',
    prophetIds: ['ybrayym', 'musa'],
    language: 'Takyk belli däl',
    period: 'Iň gadymy ylahy ýazgylar',
    summary:
      'Käbir pygamberlere inderilen kiçi göwrümli ylahy ýazgylar. Kuranda Ybraýym we Musa pygamberleriň sahyfalary agzalýar.',
    sections: [
      {
        title: 'Sahyfalar näme?',
        paragraphs: [
          '“Suhuf” sözi “sahyfa”, ýagny ýazgy, sahypa diýmegi aňladýar. Bular uly kitaplardan öň ýa-da olaryň ýanynda pygamberlere inderilen gysga ylahy ýazgylardyr.',
          'Kurany Kerimde Agla süresiniň ahyrynda: “Hakykatdan-da, bu ilkinji sahyfalarda — Ybraýymyň we Musanyň sahyfalarynda hem bardyr” diýilýär (87:18–19). Nejm süresinde hem Musanyň we wepaly Ybraýymyň sahyfalary agzalýar (53:36–37).',
        ],
      },
      {
        title: 'Mazmuny',
        paragraphs: [
          'Kurandaky habarlara görä, bu sahyfalarda hiç kimiň başgasynyň günäsini göterip bilmeýändigi, ynsana diňe öz zähmetiniň netijesiniň berilýändigi we ahyretiň dünýäden has gowy we hemişelikdigi ýaly esasy hakykatlar bolupdyr (53:38–41; 87:16–17).',
          'Käbir rowaýatlarda Adam, Şit we Ydrys pygamberlere hem sahyfalar inderilendigi aýdylýar, ýöne Kuranda diňe Ybraýymyň we Musanyň sahyfalary atlandyrylýar. Bu sahyfalar biziň günlerimize gelip ýetmändir.',
        ],
      },
    ],
    keyAyah: {
      ref: '87:18-19',
      turkmen: 'Hakykatdan-da, bu ilkinji sahyfalarda — Ybraýymyň we Musanyň sahyfalarynda hem bardyr.',
    },
    refs: [
      { surah: 87, ayahs: '14–19' },
      { surah: 53, ayahs: '36–42' },
    ],
    questions: [
      {
        prompt: 'Kuranda haýsy pygamberleriň sahyfalary agzalýar?',
        options: ['Ybraýymyň we Musanyň', 'Nuhuň we Hudyň', 'Dawudyň we Süleýmanyň', 'Isanyň we Ýahýanyň'],
        answer: 0,
      },
      {
        prompt: '“Suhuf” (sahyfalar) näme?',
        options: [
          'Pygamberlere inderilen kiçi göwrümli ylahy ýazgylar',
          'Kuranyň bir süresi',
          'Pygamberleriň hadyslary',
          'Gadymy taryh kitaby',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 'tewrat',
    order: 2,
    name: 'Tewrat',
    arabicName: 'التَّوْرَاة',
    prophetIds: ['musa'],
    language: 'Gadymy ýewreý dili',
    period: 'Takmynan b.e.öň XIII asyr (alymlaryň çaklamasy)',
    summary:
      'Musa pygambere inderilen kitap. Kuran ony “hidaýat we nur” diýip wasp edýär; ol Ysraýyl ogullaryna kanun we ýol görkeziji bolupdyr.',
    sections: [
      {
        title: 'Inderilişi',
        paragraphs: [
          'Musa pygamber Allahyň çagyryşy bilen Tur dagyna gidip, kyrk gije galýar (2:51; 7:142). Şonda Allah oňa ýazylan lewhleri (tagtalary) berýär: “Biz onuň üçin lewhlerde her zat barada öwüt we her zadyň düşündirişini ýazdyk” (7:145).',
          'Kuran Tewraty şeýle wasp edýär: “Hakykatdan-da, Biz Tewraty indirdik, onda hidaýat we nur bardyr. Allaha boýun bolan pygamberler ýahudylara onuň bilen höküm çykarýardylar” (5:44).',
        ],
      },
      {
        title: 'Mazmuny',
        paragraphs: [
          'Tewratda Allahyň birligi, ybadat, adalat, halal we haram, jeza we ahlak barada düzgünler bolupdyr. Kuranda onuň käbir hökümleri hem agzalýar, mysal üçin, “jana jan, göze göz” kanuny (5:45).',
          'Tewratda Muhammet ﷺ hakynda hem habar berlendigi aýdylýar (7:157).',
        ],
      },
      {
        title: 'Soňky taryhy',
        paragraphs: [
          'Yslam ynanjyna görä, Tewratyň asyl nusgasy Allah tarapyndan inderilipdir, ýöne wagtyň geçmegi bilen onuň käbir ýerleri adamlar tarapyndan üýtgedilipdir (2:79; 5:13). Häzirki Tewratyň (Bibliýanyň ilkinji bäş kitabynyň) Musa pygambere inen asyl kitap bilen birmeňzeş däldigi şu sebäpli aýdylýar.',
          'Musulman Tewrata asyl görnüşinde Allahyň kitaby hökmünde iman edýär (4:136), emma kanun hökmünde soňky kitap — Kurany Kerim esas edilip alynýar.',
        ],
      },
    ],
    keyAyah: {
      ref: '17:2',
      turkmen:
        'Biz Musa Kitaby berdik we ony Ysraýyl ogullaryna: «Menden başgany howandar tutunmaň» diýip, hidaýat (ýol görkeziji) etdik.',
    },
    refs: [
      { surah: 5, ayahs: '43–45' },
      { surah: 7, ayahs: '142–145' },
      { surah: 2, ayahs: '53' },
      { surah: 3, ayahs: '3' },
    ],
    questions: [
      { prompt: 'Tewrat haýsy pygambere inderildi?', options: ['Musa', 'Dawut', 'Isa', 'Ybraýym'], answer: 0 },
      {
        prompt: 'Tewrat ilki kimlere ýol görkeziji hökmünde berildi?',
        options: ['Ysraýyl ogullaryna', 'Ad kowmuna', 'Semud kowmuna', 'Kureýşlilere'],
        answer: 0,
      },
      {
        prompt: 'Musa pygamber Tewraty almak üçin Tur dagynda näçe gije galdy?',
        options: ['40 gije', '7 gije', '30 gün', '3 gije'],
        answer: 0,
      },
    ],
  },
  {
    id: 'zebur',
    order: 3,
    name: 'Zebur',
    arabicName: 'الزَّبُور',
    prophetIds: ['dawut'],
    language: 'Gadymy ýewreý dili',
    period: 'Takmynan b.e.öň X asyr (alymlaryň çaklamasy)',
    summary:
      'Dawut pygambere berlen kitap. Esasan Allahy öwýän dogalardan, tesbihlerden we öwüt-nesihatlardan ybarat bolupdyr.',
    sections: [
      {
        title: 'Inderilişi',
        paragraphs: [
          'Kuranda iki ýerde: “Biz Dawuda Zebury berdik” diýilýär (4:163; 17:55). Dawut pygamber hem patyşa, hem pygamberdi; Allah oňa hökümdarlyk, hikmet we kitap beripdir.',
          'Dawut pygamber Allahy örän owadan sesi bilen tesbih edipdir; Kuranda daglaryň we guşlaryň hem onuň bilen bile tesbih edendikleri habar berilýär (34:10; 38:18–19).',
        ],
      },
      {
        title: 'Mazmuny we soňky taryhy',
        paragraphs: [
          'Zebur täze bir şerigat (kanunlar ulgamy) getirmändir — Dawut pygamber Tewratyň hökümlerine eýeripdir. Zeburyň esasy mazmuny Allaha hamd, dogalar we ahlak öwütleridir.',
          'Kuranda Zeburdan bir sitata getirilýär: “Ýer ýüzüne Meniň salih bendelerim mirasdar bolar” (21:105).',
          'Häzirki Bibliýadaky “Mezmurlar” (Psalmlar) kitaby däp boýunça Dawut pygamber bilen baglanyşdyrylýar; ýöne yslam ynanjyna görä, asyl Zebur doly görnüşinde gelip ýetmändir.',
        ],
      },
    ],
    keyAyah: {
      ref: '17:55',
      turkmen:
        'Seniň Rabbyň asmanlarda we ýerde bolanlary has gowy bilýändir. Biz käbir pygamberleri beýlekilerden artyk etdik we Dawuda Zebury berdik.',
    },
    refs: [
      { surah: 4, ayahs: '163' },
      { surah: 17, ayahs: '55' },
      { surah: 21, ayahs: '105' },
      { surah: 34, ayahs: '10–11' },
    ],
    questions: [
      { prompt: 'Zebur haýsy pygambere berildi?', options: ['Dawut', 'Süleýman', 'Musa', 'Zekerýa'], answer: 0 },
      {
        prompt: 'Zeburyň esasy mazmuny näme bolupdyr?',
        options: [
          'Allahy öwýän dogalar we öwütler',
          'Täze şerigat (kanunlar ulgamy)',
          'Diňe taryhy wakalar',
          'Söwda düzgünleri',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 'injil',
    order: 4,
    name: 'Injil',
    arabicName: 'الإِنْجِيل',
    prophetIds: ['isa'],
    language: 'Arami dili (Isa pygamberiň gepleýän dili)',
    period: 'Biziň eramyzyň I asyry',
    summary:
      'Isa pygambere inderilen kitap. Kuran ony “hidaýat, nur we özünden öňki Tewraty tassyklaýjy” diýip wasp edýär.',
    sections: [
      {
        title: 'Inderilişi',
        paragraphs: [
          'Kuranda şeýle diýilýär: “Olaryň yzyndan Merýemiň ogly Isany özünden öňki Tewraty tassyklaýjy edip iberdik we oňa içinde hidaýat we nur bolan Injili berdik” (5:46).',
          'Isa pygamber Ysraýyl ogullaryna iberilipdir (3:49). Injil Tewratdaky käbir gadaganlyklary ýeňilleşdiripdir (3:50) we Isa pygamberden soň “Ahmet” atly pygamberiň geljekdigi buşlanypdyr (61:6).',
        ],
      },
      {
        title: 'Soňky taryhy',
        paragraphs: [
          'Häzirki Täze Ähtdäki dört Ýewangeliýe (Matta, Markus, Luka, Ýohanna) Isa pygamberden onlarça ýyl soň onuň durmuşy barada ýazylan eserlerdir. Taryhçylaryň köpüsi hem olaryň Isa pygamberiň özi tarapyndan ýazylmandygyny tassyklaýar.',
          'Yslam ynanjyna görä, Isa pygambere inderilen asyl Injil özgerdilmedik görnüşinde gelip ýetmändir. Musulman asyl Injile Allahyň kitaby hökmünde iman edýär.',
        ],
      },
    ],
    keyAyah: {
      ref: '5:46',
      turkmen:
        'Olaryň (öňki pygamberleriň) yzyndan Merýemiň ogly Isany özünden öňki Tewraty tassyklaýjy edip iberdik. Oňa içinde hidaýat we nur bolan, özünden öňki Tewraty tassyklaýan Injili berdik; ol takwalar üçin hidaýat we öwütdir.',
    },
    refs: [
      { surah: 5, ayahs: '46–47' },
      { surah: 3, ayahs: '3, 48–50' },
      { surah: 57, ayahs: '27' },
      { surah: 61, ayahs: '6' },
    ],
    questions: [
      { prompt: 'Injil haýsy pygambere inderildi?', options: ['Isa', 'Musa', 'Ýahýa', 'Zekerýa'], answer: 0 },
      {
        prompt: 'Kurana görä Injil Tewrat barada näme edýär?',
        options: ['Ony tassyklaýar', 'Ony doly ýatyrýar', 'Ony agzamaýar', 'Ony ret edýär'],
        answer: 0,
      },
    ],
  },
  {
    id: 'kuran',
    order: 5,
    name: 'Kurany Kerim',
    arabicName: 'القُرْآن الكَرِيم',
    prophetIds: ['muhammet'],
    language: 'Arap dili',
    period: '610–632 ýyllar (23 ýyl)',
    summary:
      'Muhammet ﷺ-e 23 ýylyň dowamynda inderilen soňky ylahy kitap. 114 süreden ybarat bolup, Allah ony goramagy Öz üstüne alypdyr.',
    sections: [
      {
        title: 'Ilkinji ylham',
        paragraphs: [
          'Kuran 610-njy ýylda Ramazan aýynda, Kadr gijesinde inip başlady (2:185; 97:1). Muhammet ﷺ Mekgäniň golaýyndaky Hyra gowagynda ybadat edýärkä, Jebraýyl perişde gelip: “Oka!” diýdi. Ilkinji inen aýatlar Alak süresiniň ilkinji bäş aýatydyr (96:1–5).',
          'Kuran bir gezekde däl-de, wakalara görä bölekleýin, 23 ýylyň dowamynda inderildi (17:106; 25:32): onuň 13 ýyly Mekgede, 10 ýyly Medinede geçdi. Şonuň üçin süreler “Mekge” we “Medine” süreleri diýip bölünýär.',
        ],
      },
      {
        title: 'Ýazga geçirilişi we jemlenişi',
        paragraphs: [
          'Pygamberimiz ﷺ her inen aýaty sahabalara okap berýärdi; olar ony ýatdan öwrenýärdiler we ylham ýazyjylary (Zeýd ibn Sabyt we başgalar) deri, süňk, hurma ýapraklary ýaly zatlara ýazýardylar.',
          'Ebu Bekriň halyflygy döwründe (632–634) Ýemame söweşinde köp hafyz şehit bolansoň, Kuran Zeýd ibn Sabytyň ýolbaşçylygynda bir mushafa jemlendi. Osmanyň halyflygy döwründe (takmynan 650-nji ýyl) şol mushafdan nusgalar köpeldilip, yslam ülkeleriniň merkezlerine iberildi.',
        ],
      },
      {
        title: 'Gurluşy',
        paragraphs: [
          'Kuran 114 süreden we (iň giň ýaýran Kufe hasaby boýunça) 6236 aýatdan ybarat. Okamak üçin 30 jüze bölünýär. Iň uzyn süre — Bakara, iň gysga süre — Kewser.',
          'Allah: “Hakykatdan-da, Zikri (Kurany) Biz indirdik we ony hökman Biz gorarys” diýýär (15:9). Kuran inen gününden bäri müňlerçe hafyzyň ýadynda we ýazgylarda üýtgedilmän saklanyp gelýär.',
        ],
      },
    ],
    keyAyah: {
      ref: '15:9',
      turkmen: 'Hakykatdan-da, Zikri (Kurany) Biz indirdik we hökman ony Biz gorarys.',
    },
    refs: [
      { surah: 96, ayahs: '1–5', note: 'ilkinji inen aýatlar' },
      { surah: 97, ayahs: '1–5' },
      { surah: 2, ayahs: '185' },
      { surah: 15, ayahs: '9' },
    ],
    questions: [
      {
        prompt: 'Kuranyň ilkinji inen aýatlary haýsy süredendir?',
        options: ['Alak', 'Fatiha', 'Bakara', 'Yhlas'],
        answer: 0,
      },
      { prompt: 'Kuran näçe ýylyň dowamynda inderildi?', options: ['23 ýyl', '10 ýyl', '40 ýyl', '63 ýyl'], answer: 0 },
      { prompt: 'Kuranda näçe süre bar?', options: ['114', '99', '120', '30'], answer: 0 },
      {
        prompt: 'Kuran ilkinji gezek bir mushafa haýsy halyfyň döwründe jemlendi?',
        options: ['Ebu Bekriň', 'Omaryň', 'Alynyň', 'Muawiýanyň'],
        answer: 0,
      },
    ],
  },
]

export const BOOK_BY_ID: Record<string, ScriptureBook> = Object.fromEntries(BOOKS.map((b) => [b.id, b]))
