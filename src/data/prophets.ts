import type { Prophet } from '@/types'

/**
 * Kurany Kerimde ady geçýän 25 pygamber — takmynan taryhy tertipde.
 * Wakalar esasan Kuran aýatlaryna esaslanýar; aýatlarda bolmadyk
 * jikme-jiklikler “rowaýatlara görä” diýip bellenilýär.
 * Her soragda `answer` — `options` massiwindäki dogry jogabyň indeksi.
 */
export const PROPHETS: Prophet[] = [
  {
    id: 'adam',
    order: 1,
    name: 'Adam',
    arabicName: 'آدَم',
    title: 'Ilkinji ynsan we ilkinji pygamber',
    sentTo: 'Öz nesline',
    period: 'Adamzat taryhynyň başy',
    summary:
      'Allah Adamy topraklardan ýaratdy, oňa ähli zatlaryň atlaryny öwretdi we ony ýer ýüzünde halyf etdi. Ol ýalňyşandan soň toba edip, Allahyň bagyşlamagyna eýe boldy.',
    sections: [
      {
        title: 'Ýaradylyşy we bilimi',
        paragraphs: [
          'Allah perişdelere: “Men ýer ýüzünde bir halyf ýaratjak” diýdi (2:30). Adamy palçykdan ýaratdy we oňa Öz tarapyndan ruh berdi.',
          'Allah Adama ähli zatlaryň atlaryny öwretdi. Perişdeler bu atlary aýdyp bilmänlerinde: “Sen pákdirsiň, bize Seniň öwredeniňden başga bilim ýok” diýip boýun aldylar (2:31–33).',
        ],
      },
      {
        title: 'Iblisiň tekepbirligi',
        paragraphs: [
          'Allah perişdelere Adama sežde etmegi buýurdy. Hemmesi sežde etdi, diňe Iblis boýun gaçyrdy: “Men ondan gowy, meni otdan, ony palçykdan ýaratdyň” diýdi (7:11–12). Şeýdip, tekepbirlik ilkinji günä boldy.',
        ],
      },
      {
        title: 'Jennet we toba',
        paragraphs: [
          'Adam we onuň aýaly (rowaýatlarda Howa) jennetde ýerleşdirildi; diňe bir agaja golaýlaşmak gadagan edildi. Şeýtan olary aldady we olar şol agaçdan iýdiler (2:35–36).',
          'Adam ýalňyşyny boýun aldy. Ikisi: “Rabbymyz! Biz özümize zulum etdik, eger Sen bizi bagyşlamasaň we bize rehim etmeseň, hökman zyýan çekenlerden bolarys” diýip dileg etdiler (7:23). Allah olaryň tobasyny kabul etdi we olary ýer ýüzüne iberdi.',
        ],
      },
    ],
    lessons: [
      'Tekepbirlik ynsany Allahyň rehmetinden daşlaşdyrýar.',
      'Ýalňyşanyňda ony boýun alyp, toba etmeli — Allah tobalary kabul edýär.',
      'Ylym ynsana beýik hormat berýär.',
    ],
    keyAyah: {
      ref: '2:37',
      turkmen:
        'Soňra Adam Rabbyndan käbir sözleri (dogany) öwrendi we Allah onuň tobasyny kabul etdi. Hakykatdan-da, Ol tobalary köp kabul edijidir, Rahymdyr.',
    },
    refs: [
      { surah: 2, ayahs: '30–38' },
      { surah: 7, ayahs: '11–25' },
      { surah: 20, ayahs: '115–123' },
    ],
    questions: [
      {
        prompt: 'Kim Adama sežde etmekden boýun gaçyrdy?',
        options: ['Iblis', 'Jebraýyl', 'Ähli perişdeler', 'Hiç kim'],
        answer: 0,
      },
      {
        prompt: 'Adam pygamber ýalňyşandan soň näme etdi?',
        options: ['Ýalňyşyny boýun alyp, toba etdi', 'Iblisi aýyplady', 'Jennetden gaçdy', 'Hiç zat etmedi'],
        answer: 0,
      },
    ],
  },
  {
    id: 'ydrys',
    order: 2,
    name: 'Ydrys',
    arabicName: 'إِدْرِيس',
    title: 'Dogruçyl pygamber',
    sentTo: 'Adamyň nesline (takyk maglumat az)',
    summary:
      'Kuranda “örän dogruçyl pygamber” we “sabyrlylardan” diýip wasp edilýär. Allah ony beýik bir derejä göteripdir.',
    sections: [
      {
        title: 'Kuranda agzalyşy',
        paragraphs: [
          'Kuranda Ydrys pygamber iki ýerde agzalýar: “Kitapda Ydrysy hem ýatla. Hakykatdan-da, ol örän dogruçyl bir pygamberdi. Biz ony beýik bir orna göterdik” (19:56–57). Başga bir aýatda Ysmaýyl we Zülkifl bilen bile “sabyrlylardan” diýip wasp edilýär (21:85).',
        ],
      },
      {
        title: 'Rowaýatlarda',
        paragraphs: [
          'Rowaýatlara görä, Ydrys pygamber Adamdan soň we Nuhdan öň ýaşapdyr; ilkinji bolup galam bilen ýazan, ylma we hünärlere uly üns beren adamdyr. Bu maglumatlar Kurandan däl, soňky rowaýatlardan alnandyr.',
        ],
      },
    ],
    lessons: ['Dogruçyllyk pygamberleriň iň esasy sypatydyr.', 'Sabyr ynsany beýik derejelere ýetirýär.'],
    keyAyah: {
      ref: '19:56',
      turkmen: 'Kitapda Ydrysy hem ýatla. Hakykatdan-da, ol örän dogruçyl bir pygamberdi.',
    },
    refs: [
      { surah: 19, ayahs: '56–57' },
      { surah: 21, ayahs: '85–86' },
    ],
    questions: [
      {
        prompt: 'Kuran Ydrys pygamberi nähili wasp edýär?',
        options: ['Örän dogruçyl we sabyrly', 'Güýçli patyşa', 'Baý söwdagär', 'Meşhur söweşiji'],
        answer: 0,
      },
    ],
  },
  {
    id: 'nuh',
    order: 3,
    name: 'Nuh',
    arabicName: 'نُوح',
    title: 'Tupan we gämi wakasynyň pygamberi',
    sentTo: 'Butlara ybadat edýän öz kowmuna',
    ululAzm: true,
    summary:
      'Nuh pygamber kowmuny 950 ýyl Allaha çagyrdy. Az adam iman getirdi. Allahyň buýrugy bilen gämi gurdy; tupanda diňe gämidäkiler halas boldy.',
    sections: [
      {
        title: 'Uzak ýyllaryň çagyryşy',
        paragraphs: [
          'Nuh pygamber Wedd, Suwag, Ýegus, Ýeguk we Nesr atly butlara ybadat edýän kowmuna iberildi (71:23). Ol olaryň arasynda “elli ýyly kem müň ýyl” galdy (29:14).',
          'Ol kowmuny gije-gündiz, açyk we gizlin Allaha çagyrdy (71:5–9), ýöne olar barmaklaryny gulaklaryna sokup, eşikleri bilen ýüzlerini örtdüler (71:7). Diňe az sanly adam iman getirdi (11:40).',
        ],
      },
      {
        title: 'Gämi we tupan',
        paragraphs: [
          'Allah Nuha: “Biziň gözegçiligimizde we wahyýymyz bilen gämi gur” diýdi (11:37). Kowmunyň ileri tutulanlary her gezek ýanyndan geçende ony masgaralaýardylar (11:38).',
          'Buýruk gelende Nuh gämä her jandardan bir jübüt, maşgalasyny we iman getirenleri mündürdi (11:40). Onuň ogly: “Meni suwdan gorajak bir daga çykaryn” diýip gämä münmedi we gark boldy (11:42–43).',
          'Soňra: “Eý, ýer! Suwuňy ýut. Eý, asman! Saklan!” diýildi; suw azaldy we gämi Jüdi dagynda durdy (11:44).',
        ],
      },
    ],
    lessons: [
      'Hakykata çagyrmakda sabyr we yzygiderlilik gerek.',
      'Iman miras galmaýar: hatda pygamberiň ogly hem öz saýlawy bilen helak boldy.',
      'Allahyň wadasy hökman berjaý bolýar.',
    ],
    keyAyah: {
      ref: '29:14',
      turkmen:
        'Hakykatdan-da, Biz Nuhy öz kowmuna iberdik. Ol olaryň arasynda elli ýyly kem müň ýyl galdy. Ahyrsoňy, olar zalym bolan ýagdaýlarynda olary tupan tutdy.',
    },
    refs: [
      { surah: 11, ayahs: '25–49' },
      { surah: 23, ayahs: '23–30' },
      { surah: 71, ayahs: '1–28', note: 'Nuh süresi' },
    ],
    questions: [
      {
        prompt: 'Nuh pygamber kowmunyň arasynda näçe ýyl galdy?',
        options: ['950 ýyl', '40 ýyl', '120 ýyl', '23 ýyl'],
        answer: 0,
      },
      {
        prompt: 'Tupandan soň gämi nirede durdy?',
        options: ['Jüdi dagynda', 'Tur dagynda', 'Arafat dagynda', 'Uhud dagynda'],
        answer: 0,
      },
    ],
  },
  {
    id: 'hud',
    order: 4,
    name: 'Hud',
    arabicName: 'هُود',
    title: 'Ad kowmunyň pygamberi',
    sentTo: 'Ad kowmuna (Ahkaf sebiti)',
    summary:
      'Güýçli we baý Ad kowmy tekepbirlik edip, Hud pygamberi ret etdi. Olar ýedi gije, sekiz gün dowam eden sowuk, güýçli ýel bilen helak edildi.',
    sections: [
      {
        title: 'Güýçli we tekepbir kowum',
        paragraphs: [
          'Ad kowmy Ahkaf diýlen gum depeli ýerde ýaşaýardy (46:21). Olar beden taýdan güýçli bolup, beýik binalar gurýardylar (26:128–130). Tekepbirlik bilen: “Bizden güýçli kim bar?” diýýärdiler (41:15).',
          'Hud olara: “Eý, kowmum! Allaha ybadat ediň, Ondan başga ilahyňyz ýokdur” diýdi (11:50) we Allaha şükür etmäge, bagyşlanma soramaga çagyrdy (11:52).',
        ],
      },
      {
        title: 'Jeza',
        paragraphs: [
          'Olar Hudy ret edip: “Sen bize hiç bir aýdyň delil getirmediň” diýdiler (11:53). Netijede, olaryň üstüne “ýedi gije we sekiz gün” dowam eden sowuk we güýçli ýel iberildi (69:6–7). Hud we iman getirenler Allahyň rehmeti bilen halas edildi (11:58).',
        ],
      },
    ],
    lessons: [
      'Güýç we baýlyk Allaha garşy hiç zat edip bilmeýär.',
      'Nygmatlara şükür etmek ony köpeldýär, tekepbirlik bolsa ýok edýär.',
    ],
    keyAyah: {
      ref: '11:50',
      turkmen:
        'Ad kowmuna hem öz doganlary Hudy iberdik. Ol: «Eý, kowmum! Allaha ybadat ediň, Ondan başga siziň hiç bir ilahyňyz ýokdur. Siz diňe ýalan uýdurýansyňyz» diýdi.',
    },
    refs: [
      { surah: 7, ayahs: '65–72' },
      { surah: 11, ayahs: '50–60' },
      { surah: 26, ayahs: '123–140' },
      { surah: 46, ayahs: '21–26' },
      { surah: 69, ayahs: '6–8' },
    ],
    questions: [
      {
        prompt: 'Hud pygamber haýsy kowma iberildi?',
        options: ['Ad', 'Semud', 'Medýen', 'Ysraýyl ogullary'],
        answer: 0,
      },
      {
        prompt: 'Ad kowmy nähili jeza bilen helak edildi?',
        options: ['Sowuk we güýçli ýel bilen', 'Tupan bilen', 'Daş ýagyşy bilen', 'Deňizde gark bolup'],
        answer: 0,
      },
    ],
  },
  {
    id: 'salyh',
    order: 5,
    name: 'Salyh',
    arabicName: 'صَالِح',
    title: 'Semud kowmunyň pygamberi',
    sentTo: 'Semud kowmuna (Hijr sebiti)',
    summary:
      'Semud kowmy daglary oýup öý ýasaýardy. Salyh pygambere mugjyza hökmünde düýe berildi; kowmy düýäni öldürdi we helak edildi.',
    sections: [
      {
        title: 'Daglardaky öýler',
        paragraphs: [
          'Semud kowmy Addan soň gelip, daglary oýup öýler ýasaýardy (7:74; 26:149). Salyh pygamber olara: “Allaha ybadat ediň. Ol sizi ýerden ýaratdy we sizi onda ýaşatdy” diýdi (11:61).',
        ],
      },
      {
        title: 'Allahyň düýesi',
        paragraphs: [
          'Kowmy mugjyza isläninde, Allah olara alamat hökmünde bir düýe berdi. Salyh: “Bu Allahyň düýesidir, ony Allahyň ýerinde otlamaga goýuň we oňa erbetlik etmäň” diýdi (7:73). Suw bir gün düýä, bir gün kowma degişli edildi (26:155).',
          'Emma kowmuň iň betbagt adamy düýäni öldürdi (91:12–14). Salyh: “Öýleriňizde üç gün peýdalanyň” diýdi (11:65). Soňra olary güýçli gykylyk we ýer titremesi tutdy (7:78; 11:67), Salyh we iman getirenler halas boldy.',
        ],
      },
    ],
    lessons: [
      'Allahyň alamatlaryny masgaralamak heläkçilige eltýär.',
      'Bir toparyň dymmagy hem günä şärik bolmakdyr — düýäni bir adam öldürse-de, jeza ähli razy bolanlara geldi.',
    ],
    keyAyah: {
      ref: '11:61',
      turkmen:
        'Semud kowmuna hem öz doganlary Salyhy iberdik. Ol: «Eý, kowmum! Allaha ybadat ediň, Ondan başga siziň hiç bir ilahyňyz ýokdur. Ol sizi ýerden ýaratdy we sizi onda ýaşatdy. Ondan bagyşlanma soraň, soňra Oňa toba ediň. Hakykatdan-da, Rabbym ýakyndyr, dogalary kabul edijidir» diýdi.',
    },
    refs: [
      { surah: 7, ayahs: '73–79' },
      { surah: 11, ayahs: '61–68' },
      { surah: 26, ayahs: '141–159' },
      { surah: 91, ayahs: '11–15' },
    ],
    questions: [
      {
        prompt: 'Salyh pygamberiň kowmuna mugjyza hökmünde näme berildi?',
        options: ['Düýe', 'Hasa', 'Gämi', 'Lewhler'],
        answer: 0,
      },
      { prompt: 'Salyh pygamber haýsy kowma iberildi?', options: ['Semud', 'Ad', 'Medýen', 'Lut kowmy'], answer: 0 },
    ],
  },
  {
    id: 'ybrayym',
    order: 6,
    name: 'Ybraýym',
    arabicName: 'إِبْرَاهِيم',
    title: 'Halylulla — Allahyň dosty',
    sentTo: 'Butparaz kowmuna (rowaýatlara görä Mesopotamiýa)',
    period: 'Takmynan b.e.öň II müňýyllyk (taryhçylaryň çaklamasy)',
    family: 'Ysmaýyl we Yshak pygamberleriň kakasy; Lut pygamber oňa iman getiripdir',
    ululAzm: true,
    bookId: 'suhuf',
    summary:
      'Butlara garşy çykyp, Allahyň birligini wagyz eden pygamber. Oda taşlandy, ýöne ot oňa salkyn boldy. Ogly Ysmaýyl bilen Kagbany gurdy.',
    sections: [
      {
        title: 'Hakykaty gözlemek',
        paragraphs: [
          'Ybraýymyň kakasy Azer butlara ybadat edýärdi (6:74). Ybraýym ýyldyzlara, Aýa we Güne seredip, olaryň hemmesiniň ýaşýandygyny görüp: “Men ýaşýanlary söýmeýärin” diýdi we ýüzüni asmanlary we ýeri ýaradana öwürdi (6:76–79).',
        ],
      },
      {
        title: 'Butlaryň döwülmegi we ot',
        paragraphs: [
          'Ol kowmunyň butlaryny döwüp, diňe iň ulusyny galdyrdy. Olar soranlarynda: “Muny şu ulusy eden bolsa gerek, gürläp bilýän bolsalar, olardan soraň” diýdi (21:57–63). Şeýdip, olaryň butlarynyň gürläp-de, özlerini gorap-da bilmeýändigini görkezdi.',
          'Kowmy ony oda atdylar. Allah: “Eý, ot! Ybraýyma salkyn we amanlyk bol!” diýdi (21:68–69) we ot oňa zyýan bermedi.',
        ],
      },
      {
        title: 'Mekge, Kagba we gurban',
        paragraphs: [
          'Ybraýym aýaly (rowaýatlarda Hajar) we bäbek ogly Ysmaýyly ekin bitmeýän Mekge jülgesinde goýup, olar üçin doga etdi (14:37). Soňra ogly Ysmaýyl bilen Kagbanyň diwarlaryny galdyrdylar (2:127).',
          'Ybraýym düýşünde ogluny gurban edýändigini gördi. Ogly: “Eý, kakam! Saňa buýrulany et” diýdi. Ikisi hem boýun bolanda, Allah ogluň ýerine uly bir gurbanlyk iberdi (37:102–107). Kurban baýramy şu wakanyň ýadygärligidir.',
        ],
      },
    ],
    lessons: [
      'Hakykaty akyl we pikir bilen gözlemeli.',
      'Allaha bolan ynam iň agyr synaglarda hem ynsany goraýar.',
      'Allahyň buýrugyna doly boýun bolmak — yslamyň manysydyr.',
    ],
    keyAyah: {
      ref: '21:69',
      turkmen: 'Biz: «Eý, ot! Ybraýyma salkyn we amanlyk bol!» diýdik.',
    },
    refs: [
      { surah: 6, ayahs: '74–83' },
      { surah: 21, ayahs: '51–73' },
      { surah: 2, ayahs: '124–131' },
      { surah: 14, ayahs: '35–41' },
      { surah: 37, ayahs: '83–113' },
    ],
    questions: [
      {
        prompt: 'Ybraýym pygamber oda taşlananda näme boldy?',
        options: ['Ot oňa salkyn we amanlyk boldy', 'Ol otdan gaçdy', 'Ýagyş ýagyp ot söndi', 'Perişdeler ony alyp gitdiler'],
        answer: 0,
      },
      {
        prompt: 'Ybraýym pygamber Kagbany kim bilen bile gurdy?',
        options: ['Ogly Ysmaýyl bilen', 'Ogly Yshak bilen', 'Lut bilen', 'Ýakup bilen'],
        answer: 0,
      },
      {
        prompt: 'Kurban baýramy haýsy pygamberiň wakasy bilen baglanyşykly?',
        options: ['Ybraýym', 'Musa', 'Nuh', 'Isa'],
        answer: 0,
      },
    ],
  },
  {
    id: 'lut',
    order: 7,
    name: 'Lut',
    arabicName: 'لُوط',
    title: 'Ahlaksyzlyga garşy çykan pygamber',
    sentTo: 'Lut kowmuna (rowaýatlara görä Sodom şäheri)',
    family: 'Ybraýym pygambere iman getiren, rowaýatlara görä onuň dogany ogly',
    summary:
      'Lut pygamber özünden öň hiç kimiň etmedik ahlaksyzlygyny edýän kowmuny duýdurdy. Kowmy ret etdi we şäherleri agdarylyp helak edildi.',
    sections: [
      {
        title: 'Kowmuň günäsi',
        paragraphs: [
          'Lut Ybraýym pygambere iman getirip, onuň bilen hijret etdi (29:26). Soňra özünden öň “älemlerde hiç kimiň etmedik hapa işini” — erkekleriň erkeklere şehwet bilen golaýlaşmagyny — edýän kowma iberildi (7:80–81).',
          'Kowmy ony diňlemän: “Lutuň maşgalasyny şäheriňizden çykaryň, olar arassalanmak isleýän adamlar” diýdiler (27:56).',
        ],
      },
      {
        title: 'Myhmanlar we jeza',
        paragraphs: [
          'Allah adam keşbinde perişdeler iberdi. Olar ilki Ybraýyma Yshagyň buşlugyny berdiler, soňra Lutuň ýanyna geldiler (11:69–81). Perişdeler Luta maşgalasy bilen gije şäherden çykmagy, yzyna garamazlygy buýurdylar.',
          'Lutuň aýaly iman getirmän, kowmy bilen galdy we helak boldy (11:81; 66:10). Daň atanda şäherleriň asty üstüne agdaryldy we olaryň üstüne bişen palçykdan daşlar ýagdyryldy (11:82).',
        ],
      },
    ],
    lessons: [
      'Ahlak arassalygy jemgyýetiň bina bolmagynyň esasydyr.',
      'Pygambere ýakyn bolmak (hatda aýaly bolmak) imanyň ornuny tutmaýar.',
    ],
    keyAyah: {
      ref: '7:80',
      turkmen:
        'Lutu hem (iberdik). Ol öz kowmuna: «Siz özüňizden öň älemlerde hiç kimiň etmedik hapa işini edýärsiňizmi?» diýdi.',
    },
    refs: [
      { surah: 7, ayahs: '80–84' },
      { surah: 11, ayahs: '77–83' },
      { surah: 15, ayahs: '57–77' },
      { surah: 26, ayahs: '160–175' },
    ],
    questions: [
      {
        prompt: 'Lut pygamberiň aýalynyň ykbaly näme boldy?',
        options: ['Kowmy bilen bile helak boldy', 'Lut bilen halas boldy', 'Ybraýymyň ýanyna gitdi', 'Kuranda agzalmaýar'],
        answer: 0,
      },
      {
        prompt: 'Lut pygamber haýsy pygambere iman getirip, onuň bilen hijret etdi?',
        options: ['Ybraýym', 'Nuh', 'Musa', 'Şugaýyp'],
        answer: 0,
      },
    ],
  },
  {
    id: 'ysmayyl',
    order: 8,
    name: 'Ysmaýyl',
    arabicName: 'إِسْمَاعِيل',
    title: 'Wadasyna wepaly pygamber',
    sentTo: 'Mekge töweregindäki arap kabylalaryna',
    family: 'Ybraýym pygamberiň ogly; Muhammet ﷺ onuň neslindendir',
    summary:
      'Ybraýym pygamberiň ogly. Kakasynyň düýşüne boýun bolup gurban bolmaga taýýar boldy. Kakasy bilen Kagbany gurdy.',
    sections: [
      {
        title: 'Mekge jülgesinde',
        paragraphs: [
          'Ybraýym pygamber bäbek Ysmaýyly we onuň ejesini Allahyň buýrugy bilen Mekgäniň ekin bitmeýän jülgesinde goýdy (14:37). Hadyslara görä, ejesi suw gözläp Safa we Merwe depeleriniň arasynda ýedi gezek ylgady; Allah olara Zemzem çeşmesini çykardy. Hajda Safa bilen Merweniň arasynda ýöremek şu wakany ýatladýar.',
        ],
      },
      {
        title: 'Boýun bolmak',
        paragraphs: [
          'Kakasy düýşünde ony gurban edýändigini görüp, ogluna aýdanda, Ysmaýyl: “Eý, kakam! Saňa buýrulany et. Allah islese, meni sabyrlylardan taparsyň” diýdi (37:102). Allah ony uly bir gurbanlyk bilen halas etdi (37:107).',
          'Soňra kakasy bilen Kagbanyň diwarlaryny galdyryp: “Rabbymyz! Bizden kabul et” diýip doga etdiler (2:127).',
        ],
      },
    ],
    lessons: ['Ene-ata hormat we Allaha boýun bolmak bir-birine baglydyr.', 'Wada wepaly bolmak möminiň sypatydyr.'],
    keyAyah: {
      ref: '19:54',
      turkmen:
        'Kitapda Ysmaýyly hem ýatla. Hakykatdan-da, ol wadasyna wepalydy, ol bir resul we pygamberdi.',
    },
    refs: [
      { surah: 2, ayahs: '125–129' },
      { surah: 19, ayahs: '54–55' },
      { surah: 37, ayahs: '100–107' },
    ],
    questions: [
      {
        prompt: 'Ysmaýyl pygamber Kuranda haýsy sypat bilen öwülýär?',
        options: ['Wadasyna wepaly', 'Iň baý adam', 'Iň güýçli söweşiji', 'Iň uzak ýaşan'],
        answer: 0,
      },
      {
        prompt: 'Muhammet ﷺ haýsy pygamberiň neslindendir?',
        options: ['Ysmaýyl', 'Yshak', 'Musa', 'Dawut'],
        answer: 0,
      },
    ],
  },
  {
    id: 'yshak',
    order: 9,
    name: 'Yshak',
    arabicName: 'إِسْحَاق',
    title: 'Buşlanan pygamber',
    sentTo: 'Kengan (Palestina) topraklaryndaky halka',
    family: 'Ybraýym pygamberiň ogly, Ýakup pygamberiň kakasy',
    summary:
      'Ybraýym we Sara garran wagtlarynda perişdeler olara Yshagyň dogljakdygyny buşladylar. Ysraýyl ogullarynyň nesil şejeresi ondan we ogly Ýakupdan dowam edýär.',
    sections: [
      {
        title: 'Perişdeleriň buşlugy',
        paragraphs: [
          'Perişdeler adam keşbinde Ybraýymyň öýüne myhman bolup geldiler. Olar Ybraýymyň aýalyna Yshagyň we ondan soň Ýakubyň buşlugyny berdiler. Ol geň galyp: “Men garry, ärim hem garry bolsa, men nädip dogaýyn?” diýdi (11:71–72). Perişdeler: “Allahyň işine geň galýarsyňmy?” diýip jogap berdiler (11:73).',
          'Allah Yshagy salihlerden bolan bir pygamber etdi we oňa we Ybraýyma bereket berdi (37:112–113).',
        ],
      },
    ],
    lessons: ['Allah üçin hiç zat mümkin däl däldir — umydy kesmeli däl.', 'Salih nesil Allahyň uly nygmatydyr.'],
    keyAyah: {
      ref: '37:112',
      turkmen: 'Biz oňa (Ybraýyma) salihlerden bolan bir pygamber — Yshak bilen buşluk berdik.',
    },
    refs: [
      { surah: 11, ayahs: '69–73' },
      { surah: 37, ayahs: '112–113' },
      { surah: 51, ayahs: '24–30' },
    ],
    questions: [
      { prompt: 'Yshak pygamberiň ogly kim?', options: ['Ýakup', 'Ýusup', 'Ysmaýyl', 'Musa'], answer: 0 },
    ],
  },
  {
    id: 'yakup',
    order: 10,
    name: 'Ýakup',
    arabicName: 'يَعْقُوب',
    title: 'Ysraýyl — sabyr nusgasy',
    sentTo: 'Kengan (Palestina) topraklaryndaky halka',
    family: 'Yshak pygamberiň ogly, Ýusup pygamberiň kakasy; 12 ogly bolupdyr',
    summary:
      'Ýakup pygamberiň beýleki ady Ysraýyldyr — Ysraýyl ogullary onuň neslidir. Söýgüli ogly Ýusupdan aýrylanda ajaýyp sabyr görkezdi.',
    sections: [
      {
        title: 'Ýusupdan aýrylyş',
        paragraphs: [
          'Ogullary Ýusuby guýa taşlap, kakasyna gana bulanan köýnegi getirdiler we ony möjek iýdi diýdiler. Ýakup: “Maňa owadan sabyr gerek” diýdi (12:18).',
          'Ol köp ýyl gaýgy çekdi, aglamakdan gözleri agardy (12:84). Ýöne: “Men gaýgymy we hasratymy diňe Allaha arz edýärin” diýip, umydyny kesmedi (12:86–87). Ahyrynda Ýusubyň köýnegi ýüzüne goýlanda gözleri açyldy (12:93–96).',
        ],
      },
      {
        title: 'Ogullaryna wesýeti',
        paragraphs: [
          'Ölüm ýassygynda ogullaryna: “Menden soň nämä ybadat edersiňiz?” diýip sorady. Olar: “Seniň ilahyňa, atalaryň Ybraýymyň, Ysmaýylyň we Yshagyň ilahyna — ýeke-täk Allaha ybadat ederis” diýdiler (2:133).',
        ],
      },
    ],
    lessons: [
      'Gaýgyny adamlara däl-de, Allaha arz etmeli.',
      'Allahyň rehmetinden umydyňy kesmeli däl (12:87).',
      'Ene-atanyň iň gymmatly mirasy — iman.',
    ],
    keyAyah: {
      ref: '12:86',
      turkmen:
        'Ol: «Men gaýgymy we hasratymy diňe Allaha arz edýärin. Men Allahdan siziň bilmeýän zatlaryňyzy bilýärin» diýdi.',
    },
    refs: [
      { surah: 2, ayahs: '132–133' },
      { surah: 12, ayahs: '4–18, 83–100' },
      { surah: 3, ayahs: '93' },
    ],
    questions: [
      {
        prompt: 'Ýakup pygamberiň beýleki ady näme?',
        options: ['Ysraýyl', 'Halylulla', 'Zünnun', 'Mesih'],
        answer: 0,
      },
      {
        prompt: 'Ýakup pygamber Ýusupdan aýrylanda näme diýdi?',
        options: ['“Maňa owadan sabyr gerek”', '“Ogullarymy jezalandyraryn”', '“Ýusuby özüm gözlärin”', 'Hiç zat diýmedi'],
        answer: 0,
      },
    ],
  },
  {
    id: 'yusup',
    order: 11,
    name: 'Ýusup',
    arabicName: 'يُوسُف',
    title: 'Owadan sabyryň we bagyşlamagyň pygamberi',
    sentTo: 'Müsür halkyna',
    family: 'Ýakup pygamberiň ogly',
    summary:
      'Kuranda “kyssalaryň iň gowusy” diýip atlandyrylýan wakanyň gahrymany. Doganlary ony guýa taşladylar; zyndandan soň Müsüriň hazynasyny dolandyrdy we doganlaryny bagyşlady.',
    sections: [
      {
        title: 'Düýş we guýy',
        paragraphs: [
          'Ýusup kiçijik wagtynda düýşünde on bir ýyldyzyň, Günüň we Aýyň özüne sežde edýändigini gördi (12:4). Kakasynyň oňa aýratyn söýgüsi doganlarynyň gabanjaňlygyny oýardy.',
          'Doganlary ony bir guýa taşladylar (12:15). Ony tapan kerwen birnäçe dirhem pula satdy (12:20) we ol Müsürde bir weziriň (Azyzyň) öýüne düşdi.',
        ],
      },
      {
        title: 'Synag we zyndan',
        paragraphs: [
          'Azyzyň aýaly ony günä çagyranda, Ýusup: “Allaha sygynýaryn!” diýip, boýun gaçyrdy (12:23). Soňra: “Rabbym! Zyndan meniň üçin olaryň meni çagyrýan zadyndan has söýgüli” diýdi (12:33) we nähak ýere zyndana salyndy.',
          'Zyndanda iki ýoldaşynyň düýşlerini ýorady we olary-da ýeke-täk Allaha çagyrdy (12:36–41).',
        ],
      },
      {
        title: 'Hazynaçy we bagyşlamak',
        paragraphs: [
          'Patyşa ýedi semiz we ýedi ýaplak sygyr baradaky düýşüni görende, Ýusup ony ýedi bereketli we ýedi gurakçylyk ýyly diýip ýorady (12:43–49). Patyşa ony aklap, ýurduň hazynasyny oňa tabşyrdy (12:54–55).',
          'Açlyk ýyllarynda doganlary azyk almaga geldiler. Ýusup olary tanady we: “Bu gün size hiç hili kyna ýok, Allah sizi bagyşlasyn” diýdi (12:92). Ene-atasy we doganlary Müsüre gelip, oňa sežde etdiler — çagalykdaky düýşi hasyl boldy (12:99–100).',
        ],
      },
    ],
    lessons: [
      'Namysy we arassalygy goramak üçin kynçylyga sabyr etmek gerek.',
      'Güýç eliňe geçende ar almak däl-de, bagyşlamak beýiklikdir.',
      'Allahyň tedbiri kynçylyklaryň aňyrsynda hem işleýär.',
    ],
    keyAyah: {
      ref: '12:4',
      turkmen:
        'Ýusup kakasyna: «Eý, kakajan! Men düýşümde on bir ýyldyzy, Güni we Aýy gördüm; olaryň maňa sežde edýändiklerini gördüm» diýdi.',
    },
    refs: [{ surah: 12, ayahs: '1–111', note: 'Ýusup süresi' }],
    questions: [
      {
        prompt: 'Ýusup pygamberi doganlary nirä taşladylar?',
        options: ['Guýa', 'Derýa', 'Zyndana', 'Çöle'],
        answer: 0,
      },
      {
        prompt: 'Ýusup patyşanyň düýşüni nähili ýorady?',
        options: [
          'Ýedi bereketli we ýedi gurakçylyk ýyly',
          'Uly söweş boljak',
          'Patyşa tagtyny ýitirer',
          'Tupan boljak',
        ],
        answer: 0,
      },
      {
        prompt: 'Ýusup pygamber doganlary ýanyna gelende näme etdi?',
        options: ['Olary bagyşlady', 'Zyndana saldy', 'Kowup goýberdi', 'Kakasyna arz etdi'],
        answer: 0,
      },
    ],
  },
  {
    id: 'eyyup',
    order: 12,
    name: 'Eýýup',
    arabicName: 'أَيُّوب',
    title: 'Sabyr nusgasy',
    sentTo: 'Öz kowmuna (takyk ýeri belli däl)',
    summary:
      'Agyr kesel, baýlygyny we maşgalasyny ýitirmek bilen synaldy, ýöne sabyr etdi we diňe Allaha dileg etdi. Allah ony sagaltdy we ýitirenlerini iki esse gaýtaryp berdi.',
    sections: [
      {
        title: 'Uly synag',
        paragraphs: [
          'Rowaýatlara görä, Eýýup pygamber baý we köp perzentli bolupdyr, soňra baýlygyny, perzentlerini we saglygyny ýitirip, uzak ýyllap synalypdyr. Bu ýagdaýda hem ol Allaha garşy hiç zat diýmändir.',
          'Ol diňe şeýle dileg etdi: “Hakykatdan-da, maňa bir kynçylyk ýetdi, Sen bolsa rehim edijileriň iň rehimlisiň” (21:83).',
        ],
      },
      {
        title: 'Şypa we sylag',
        paragraphs: [
          'Allah oňa: “Aýagyň bilen ýere ur — ine, ýuwunmak üçin salkyn we içmek üçin suw” diýdi (38:42). Ol sagaldy; Allah oňa maşgalasyny we olar bilen bile ýene şonça-da berdi (38:43).',
          'Allah ony şeýle öwýär: “Biz ony sabyrly tapdyk. Ol näçe gowy guldy! Hakykatdan-da, ol (Allaha) köp ýüzlenýärdi” (38:44).',
        ],
      },
    ],
    lessons: [
      'Kesel we ýitgi — Allahyň synagy; sabyr bilen ol sylaga öwrülýär.',
      'Dileg etmek sabra garşy däl — Eýýup pygamber hem Allaha arz etdi.',
    ],
    keyAyah: {
      ref: '21:83',
      turkmen:
        'Eýýuby hem (ýatla). Ol Rabbyna: «Hakykatdan-da, maňa bir kynçylyk ýetdi, Sen bolsa rehim edijileriň iň rehimlisiň» diýip dileg etdi.',
    },
    refs: [
      { surah: 21, ayahs: '83–84' },
      { surah: 38, ayahs: '41–44' },
    ],
    questions: [
      {
        prompt: 'Eýýup pygamber haýsy sypaty bilen meşhur?',
        options: ['Sabyr', 'Baýlyk', 'Batyrlyk', 'Gözellik'],
        answer: 0,
      },
    ],
  },
  {
    id: 'sugayyp',
    order: 13,
    name: 'Şugaýyp',
    arabicName: 'شُعَيْب',
    title: 'Adalatly söwdanyň pygamberi',
    sentTo: 'Medýen halkyna we Eýke eýelerine',
    summary:
      'Şugaýyp pygamber ölçegde we terezide aldaw edýän Medýen halkyny adalata çagyrdy. Olar ret etdiler we ýer titremesi bilen helak edildiler.',
    sections: [
      {
        title: 'Adalatly ölçeg',
        paragraphs: [
          'Medýen halky söwdada adamlary aldaýardy. Şugaýyp olara: “Ölçegi we terezini adalat bilen doly beriň, adamlaryň zatlaryny kemeltmäň” diýdi (11:84–85).',
          'Olar: “Seniň namazyň bize atalarymyzyň ybadat edenlerini taşlamagy we mal-mülkümizi islänimiz ýaly ulanmazlygy buýurýarmy?” diýip, masgaraladylar (11:87). Ony we oňa iman getirenleri şäherden kowmak bilen gorkuzdylar (7:88).',
        ],
      },
      {
        title: 'Jeza',
        paragraphs: [
          'Ahyrsoňy, olary güýçli ýer titremesi we gykylyk tutdy, öýlerinde ýüzin ýykylyp galdylar (7:91; 11:94). Şugaýyp we iman getirenler halas edildi.',
          'Köp tefsirçileriň pikirine görä, Musa pygamberiň Medýende duşan we gyzyny oňa beren garry adamy (28:23–28) Şugaýyp pygamberdir; ýöne Kuranda onuň ady bu wakada agzalmaýar.',
        ],
      },
    ],
    lessons: [
      'Söwdada dogruçyllyk — ybadatyň bir bölegidir.',
      'Iman diňe namaz däl, gündelik gatnaşyklarda adalat hem talap edýär.',
    ],
    keyAyah: {
      ref: '11:85',
      turkmen:
        'Eý, kowmum! Ölçegi we terezini adalat bilen doly beriň, adamlaryň zatlaryny kemeltmäň we ýer ýüzünde bozgakçylyk edip ýörmäň.',
    },
    refs: [
      { surah: 7, ayahs: '85–93' },
      { surah: 11, ayahs: '84–95' },
      { surah: 26, ayahs: '176–191' },
    ],
    questions: [
      {
        prompt: 'Şugaýyp pygamber kowmuny haýsy erbet endikden saklamaga çagyrdy?',
        options: ['Ölçegde we terezide aldawdan', 'Butlara sežde etmekden', 'Daglary oýmakdan', 'Söweşmekden'],
        answer: 0,
      },
      { prompt: 'Şugaýyp pygamber haýsy halka iberildi?', options: ['Medýen', 'Ad', 'Semud', 'Müsür'], answer: 0 },
    ],
  },
  {
    id: 'musa',
    order: 14,
    name: 'Musa',
    arabicName: 'مُوسَى',
    title: 'Kelimulla — Allah bilen gepleşen pygamber',
    sentTo: 'Firauna we Ysraýyl ogullaryna',
    period: 'Takmynan b.e.öň XIII asyr (taryhçylaryň çaklamasy)',
    family: 'Harun pygamberiň dogany',
    ululAzm: true,
    bookId: 'tewrat',
    summary:
      'Kuranda ady iň köp geçýän pygamber. Firaunyň zulmundan Ysraýyl ogullaryny halas etdi; Allah onuň bilen gepleşdi we oňa Tewraty berdi.',
    sections: [
      {
        title: 'Derýada ýüzen sandyk',
        paragraphs: [
          'Firaun Ysraýyl ogullarynyň ogul çagalaryny öldürýärdi (28:4). Allah Musanyň ejesine: “Ony emdir, howp etseň ony derýa taşla, gorkma we gaýgy etme, Biz ony saňa gaýtararys” diýip ylham etdi (28:7).',
          'Sandyk Firaunyň köşgüne bardy; Firaunyň aýaly ony ogullyga aldy (28:9). Musa başga emdiriji enäni kabul etmedi we Allahyň wadasy boýunça öz ejesine gaýtaryldy (28:12–13).',
        ],
      },
      {
        title: 'Medýen we Tuwa jülgesi',
        paragraphs: [
          'Uly bolanda, bir dawada bir adamy bilmän urup öldürdi we Medýene gaçdy (28:15–22). Ol ýerde iki gyza dowarlaryny suwarmaga kömek etdi we olaryň kakasynyň gyzyna öýlendi (28:23–28).',
          'Maşgalasy bilen gaýdyp gelýärkä Tuwa jülgesinde bir ot gördi. Şol ýerde Allah onuň bilen gepleşdi (20:9–14). Hasasy ýylana öwrüldi, eli bolsa ak nur saçdy — bular onuň mugjyzalary boldy (20:17–23).',
        ],
      },
      {
        title: 'Firaun we deňiz',
        paragraphs: [
          'Musa dogany Harun bilen Firauna bardy. Firaun jadygöýleri ýygnady; Musanyň hasasy olaryň ýasanlaryny ýuwdanda, jadygöýler sežde edip iman getirdiler (20:65–70).',
          'Musa Ysraýyl ogullaryny gije alyp çykdy. Deňiziň kenaryna ýetenlerinde Allah: “Hasaň bilen deňze ur” diýdi; deňiz ýaryldy, Ysraýyl ogullary geçdi, yzlaryndan giren Firaun we goşuny gark boldy (26:61–66).',
        ],
      },
      {
        title: 'Tur dagy we Tewrat',
        paragraphs: [
          'Musa kyrk gije Tur dagynda galyp, Tewratyň lewhlerini aldy (7:142–145). Şol aralykda Samiri altyndan göle ýasap, halky oňa ybadat etmäge saldy; Musa gaharly gaýdyp geldi (20:85–97).',
          'Kehf süresinde Musanyň Allahyň ylym beren bir guly (hadyslarda Hydyr) bilen syýahaty beýan edilýär — ol wakada her hadysanyň aňyrsynda gizlin hikmetiň bardygy öwredilýär (18:60–82).',
        ],
      },
    ],
    lessons: [
      'Zalymyň güýji näçe uly bolsa-da, Allahyň kömegi ondan beýikdir.',
      'Wezipe uly bolsa, Allahdan göwüs giňligini we kömekçi soramaly.',
      'Her zadyň aňyrsyndaky hikmeti biz bilmän bileris — sabyr gerek.',
    ],
    keyAyah: {
      ref: '20:25-28',
      turkmen:
        '(Musa): «Rabbym! Göwsümi giňelt, işimi maňa aňsatlaşdyr, dilimdäki düwüni çöz, olar sözüme düşünsinler» diýdi.',
    },
    refs: [
      { surah: 28, ayahs: '3–46' },
      { surah: 20, ayahs: '9–98' },
      { surah: 26, ayahs: '10–68' },
      { surah: 7, ayahs: '103–156' },
      { surah: 18, ayahs: '60–82' },
    ],
    questions: [
      { prompt: 'Musa pygambere haýsy kitap berildi?', options: ['Tewrat', 'Zebur', 'Injil', 'Kuran'], answer: 0 },
      {
        prompt: 'Firaun we onuň goşuny nähili helak boldy?',
        options: ['Deňizde gark boldy', 'Ýer titremesinde', 'Ýangynda', 'Söweşde'],
        answer: 0,
      },
      {
        prompt: 'Musa pygamberiň hasasy mugjyza hökmünde näme bolýardy?',
        options: ['Ýylana öwrülýärdi', 'Guşa öwrülýärdi', 'Nur saçýardy', 'Agaja öwrülýärdi'],
        answer: 0,
      },
      {
        prompt: 'Bäbek Musany ejesi nirä goýberdi?',
        options: ['Sandykda derýa', 'Guýa', 'Çöle', 'Bir dagdaky gowaga'],
        answer: 0,
      },
    ],
  },
  {
    id: 'harun',
    order: 15,
    name: 'Harun',
    arabicName: 'هَارُون',
    title: 'Musanyň kömekçisi',
    sentTo: 'Firauna we Ysraýyl ogullaryna (Musa bilen bile)',
    family: 'Musa pygamberiň dogany',
    summary:
      'Musa pygamber Allahdan dilli-agyzly dogany Harunyň özüne kömekçi edilmegini sorady. Harun hem pygamber edildi we Musa bilen bile Firauna gitdi.',
    sections: [
      {
        title: 'Musanyň dogasy',
        paragraphs: [
          'Musa: “Maşgalamdan maňa bir kömekçi ber — doganym Haruny. Onuň bilen arkamy berkit we ony işime şärik et” diýip dileg etdi (20:29–32). Ol: “Doganym Harun menden has çeper dilli” diýdi (28:34). Allah bu dogany kabul etdi we Haruny-da pygamber etdi (19:53).',
        ],
      },
      {
        title: 'Göle wakasy',
        paragraphs: [
          'Musa Tur dagyna gidende halky Haruna tabşyrdy. Samiri göle ýasanda, Harun: “Eý, kowmum! Siz munuň bilen synaldyňyz, siziň Rabbyňyz Rahmandyr, maňa eýeriň we buýrugyma boýun boluň” diýdi (20:90), ýöne köpler ony diňlemedi.',
        ],
      },
    ],
    lessons: [
      'Hakykatyň ýolunda bir-birine goldaw bermek — doganlygyň iň gowusy.',
      'Gowy sözlemek we düşündirmek ukyby — Allahyň nygmaty.',
    ],
    keyAyah: {
      ref: '20:29-30',
      turkmen: 'Maşgalamdan maňa bir kömekçi ber — doganym Haruny.',
    },
    refs: [
      { surah: 20, ayahs: '29–36, 90–94' },
      { surah: 28, ayahs: '34–35' },
      { surah: 19, ayahs: '53' },
    ],
    questions: [
      {
        prompt: 'Harun pygamber Musa pygamberiň kimi bolýar?',
        options: ['Dogany', 'Kakasy', 'Ogly', 'Garyndaşy däl ýoldaşy'],
        answer: 0,
      },
    ],
  },
  {
    id: 'zulkifl',
    order: 16,
    name: 'Zülkifl',
    arabicName: 'ذُو الْكِفْل',
    title: 'Sabyrly we saýlanan pygamber',
    sentTo: 'Takyk maglumat ýok',
    summary:
      'Kuranda iki ýerde agzalýar we “sabyrlylardan” hem-de “iň gowulardan” diýip wasp edilýär. Durmuşy barada takyk maglumat az.',
    sections: [
      {
        title: 'Kuranda agzalyşy',
        paragraphs: [
          'Kuranda: “Ysmaýyly, Ydrysy we Zülkifli hem (ýatla). Olaryň hemmesi sabyrlylardandy. Biz olary rehmetimize girizdik, olar salihlerdendi” diýilýär (21:85–86). Sad süresinde hem “iň gowulardan” diýip agzalýar (38:48).',
          '“Zülkifl” sözi “paý (borç) eýesi” diýmegi aňladýar. Tefsirçileriň bir topary onuň berlen sözüni we borçlaryny doly berjaý edendigi üçin şeýle atlandyrylandygyny aýdýar.',
        ],
      },
    ],
    lessons: ['Kuranda ady gysga geçse-de, sabyr we salihlik ynsany ebedi ýatlanmaga mynasyp edýär.'],
    keyAyah: {
      ref: '21:85',
      turkmen: 'Ysmaýyly, Ydrysy we Zülkifli hem (ýatla). Olaryň hemmesi sabyrlylardandy.',
    },
    refs: [
      { surah: 21, ayahs: '85–86' },
      { surah: 38, ayahs: '48' },
    ],
    questions: [
      {
        prompt: 'Kuran Zülkifl pygamberi nähili wasp edýär?',
        options: ['Sabyrlylardan we iň gowulardan', 'Iň baý patyşa', 'Ilkinji ynsan', 'Deňizçi'],
        answer: 0,
      },
    ],
  },
  {
    id: 'dawut',
    order: 17,
    name: 'Dawut',
    arabicName: 'دَاوُود',
    title: 'Patyşa we pygamber',
    sentTo: 'Ysraýyl ogullaryna',
    period: 'Takmynan b.e.öň X asyr (taryhçylaryň çaklamasy)',
    family: 'Süleýman pygamberiň kakasy',
    bookId: 'zebur',
    summary:
      'Ýaşlykda zalym Jaluty ýeňdi, soňra patyşa we pygamber boldy. Oňa Zebur berildi; daglar we guşlar onuň bilen tesbih edýärdi, demir onuň elinde ýumşaýardy.',
    sections: [
      {
        title: 'Jalutyň ýeňilmegi',
        paragraphs: [
          'Talut patyşanyň goşuny bilen Jalutyň goşunynyň arasyndaky söweşde ýaş Dawut Jaluty öldürdi. Allah oňa hökümdarlyk we hikmet berdi, islän zadyndan öwretdi (2:249–251).',
        ],
      },
      {
        title: 'Mugjyzalary we adalaty',
        paragraphs: [
          'Allah: “Eý, daglar we guşlar! Onuň bilen bile tesbih ediň” diýdi we oňa demri ýumşatdy; ol söweş sowutlaryny ýasaýardy (34:10–11; 21:80).',
          'Allah oňa: “Eý, Dawut! Biz seni ýer ýüzünde halyf etdik, adamlaryň arasynda hak bilen höküm et, nebse eýerme” diýdi (38:26). Ol adalatly kazy bolupdyr.',
          'Hadyslara görä, Dawut pygamber gün aşa oraza tutupdyr we öz eliniň zähmeti bilen gazanç edipdir.',
        ],
      },
    ],
    lessons: [
      'Ýeňiş sanda däl-de, iman we sabyrdadyr (2:249).',
      'Häkimiýet — adalat bilen höküm etmek üçin berlen amanatdyr.',
      'Öz eliň bilen gazanmak — hormatly işdir.',
    ],
    keyAyah: {
      ref: '34:10',
      turkmen:
        'Hakykatdan-da, Biz Dawuda Öz tarapymyzdan bir artykmaçlyk berdik: «Eý, daglar we guşlar! Onuň bilen bile tesbih ediň!» (diýdik) we oňa demri ýumşatdyk.',
    },
    refs: [
      { surah: 2, ayahs: '249–251' },
      { surah: 34, ayahs: '10–11' },
      { surah: 38, ayahs: '17–26' },
      { surah: 21, ayahs: '78–80' },
    ],
    questions: [
      { prompt: 'Dawut pygamber ýaşlykda kimi ýeňdi?', options: ['Jaluty', 'Firauny', 'Nemrudy', 'Ebu Lehebi'], answer: 0 },
      { prompt: 'Dawut pygambere haýsy kitap berildi?', options: ['Zebur', 'Tewrat', 'Injil', 'Sahyfalar'], answer: 0 },
      {
        prompt: 'Dawut pygamberiň elinde haýsy zat ýumşaýardy?',
        options: ['Demir', 'Daş', 'Altyn', 'Agaç'],
        answer: 0,
      },
    ],
  },
  {
    id: 'suleyman',
    order: 18,
    name: 'Süleýman',
    arabicName: 'سُلَيْمَان',
    title: 'Hikmetli patyşa we pygamber',
    sentTo: 'Ysraýyl ogullaryna',
    family: 'Dawut pygamberiň ogly',
    summary:
      'Allah oňa öňde-soňda hiç kime berilmedik mülk berdi: ýel, jynlar onuň buýrugyndady, guşlaryň we haýwanlaryň dilini bilýärdi. Ol bu nygmatlara şükür etdi.',
    sections: [
      {
        title: 'Garynja we hüdhüd',
        paragraphs: [
          'Süleýman guşlaryň dilini öwrenipdi (27:16). Goşuny bilen garynjalaryň jülgesine gelende, bir garynja: “Eý, garynjalar! Öýleriňize giriň, Süleýman we goşuny bilmän sizi basgylamasyn” diýdi. Süleýman munuň üçin ýylgyrdy we Allaha şükür etdi (27:18–19).',
          'Hüdhüd guşy oňa Saba ýurdunyň melikesiniň we halkynyň Güne sežde edýändigi barada habar getirdi (27:20–26). Süleýman olara hat iberip, Allaha boýun bolmaga çagyrdy (27:29–31).',
        ],
      },
      {
        title: 'Saba melikesi',
        paragraphs: [
          'Melikäniň tagty göz açyp-ýumasy salymda Süleýmanyň ýanyna getirildi (27:38–40). Melike Süleýmanyň köşgüne gelende hakykaty gördi we: “Rabbym! Men özüme zulum etdim, Süleýman bilen bile älemleriň Rabby Allaha boýun boldum” diýdi (27:44).',
        ],
      },
      {
        title: 'Ýel, jynlar we wepaty',
        paragraphs: [
          'Ýel onuň buýrugy bilen ösýärdi, jynlar onuň üçin binalar gurýardy (34:12–13; 21:81–82). Ol hasasyna söýenip duran ýagdaýynda aradan çykdy; termitler hasany iýip, ol ýykylýança jynlar onuň ölenini bilmediler (34:14).',
        ],
      },
    ],
    lessons: [
      'Uly nygmat — uly şükür talap edýär.',
      'Gaýby (gizlini) diňe Allah bilýär — hatda jynlar hem bilmeýär.',
      'Hakykata çagyrmak paýhas we hoşniýetlilik bilen bolmaly.',
    ],
    keyAyah: {
      ref: '27:19',
      turkmen:
        '(Süleýman) garynjanyň sözüne ýylgyryp güldi we: «Rabbym! Maňa we ene-atama beren nygmatlaryňa şükür etmegi, Seniň razy boljak salih amalyňy etmegi maňa ylham et we rehmetiň bilen meni salih bendeleriňiň arasyna goş» diýdi.',
    },
    refs: [
      { surah: 27, ayahs: '15–44' },
      { surah: 34, ayahs: '12–14' },
      { surah: 21, ayahs: '78–82' },
      { surah: 38, ayahs: '30–40' },
    ],
    questions: [
      {
        prompt: 'Süleýman pygambere Saba melikesi barada habary kim getirdi?',
        options: ['Hüdhüd guşy', 'Bir garynja', 'Bir jyn', 'Bir söwdagär'],
        answer: 0,
      },
      { prompt: 'Süleýman pygamberiň kakasy kim?', options: ['Dawut', 'Musa', 'Zekerýa', 'Ýakup'], answer: 0 },
    ],
  },
  {
    id: 'ylyas',
    order: 19,
    name: 'Ylýas',
    arabicName: 'إِلْيَاس',
    title: 'Bagl butuna garşy çykan pygamber',
    sentTo: 'Bagl butuna ybadat edýän Ysraýyl ogullaryna',
    summary:
      'Ylýas pygamber Bagl atly buta ybadat edýän kowmuny ýeke-täk Allaha çagyrdy. Kowmunyň köpüsi ony ret etdi.',
    sections: [
      {
        title: 'Kowmuna çagyryşy',
        paragraphs: [
          'Ylýas kowmuna: “Siz takwa bolmaýarsyňyzmy? Bagla ybadat edip, ýaradyjylaryň iň gowusyny — siziň we öňki atalaryňyzyň Rabby Allahy terk edýärsiňizmi?” diýdi (37:124–126).',
          'Olar ony ýalançy saýdylar, diňe Allahyň yhlasly bendeleri muňa girmedi (37:127–128). Allah ondan soňky nesillerde onuň gowy adyny galdyrdy: “Ylýasa salam bolsun!” (37:129–130).',
        ],
      },
    ],
    lessons: ['Köpçüligiň ýalňyş ýola düşmegi ony hak etmeýär.', 'Hakykaty aýtmak üçin ýeke galsaň-da ýüregiňi gysma.'],
    keyAyah: {
      ref: '37:123',
      turkmen: 'Hakykatdan-da, Ylýas hem iberilen resullardandy.',
    },
    refs: [
      { surah: 37, ayahs: '123–132' },
      { surah: 6, ayahs: '85' },
    ],
    questions: [
      {
        prompt: 'Ylýas pygamberiň kowmy haýsy buta ybadat edýärdi?',
        options: ['Bagl', 'Wedd', 'Lat', 'Altyn göle'],
        answer: 0,
      },
    ],
  },
  {
    id: 'elyesa',
    order: 20,
    name: 'Elýesa',
    arabicName: 'الْيَسَع',
    title: 'Saýlanan pygamber',
    sentTo: 'Ysraýyl ogullaryna',
    summary:
      'Kuranda iki ýerde beýleki pygamberler bilen bile agzalýar we “iň gowulardan” diýip wasp edilýär. Rowaýatlara görä, ol Ylýas pygamberiň orunbasary bolupdyr.',
    sections: [
      {
        title: 'Kuranda agzalyşy',
        paragraphs: [
          'Enam süresinde Ysmaýyl, Ýunus we Lut bilen bile agzalyp: “Olaryň hemmesini älemlerden artyk etdik” diýilýär (6:86). Sad süresinde: “Ysmaýyly, Elýesany we Zülkifli hem ýatla. Olaryň hemmesi iň gowulardandy” diýilýär (38:48).',
          'Rowaýatlara görä, ol Ylýas pygamberiň şägirdi we ondan soň Ysraýyl ogullaryny hak ýola çagyran pygamberdir.',
        ],
      },
    ],
    lessons: ['Hakykatyň ýoly nesilden-nesle mugallymdan şägirde geçýär.'],
    keyAyah: {
      ref: '38:48',
      turkmen: 'Ysmaýyly, Elýesany we Zülkifli hem ýatla. Olaryň hemmesi iň gowulardandy.',
    },
    refs: [
      { surah: 6, ayahs: '86' },
      { surah: 38, ayahs: '48' },
    ],
    questions: [
      {
        prompt: 'Rowaýatlara görä Elýesa pygamber kimiň orunbasary bolupdyr?',
        options: ['Ylýas pygamberiň', 'Musa pygamberiň', 'Isa pygamberiň', 'Nuh pygamberiň'],
        answer: 0,
      },
    ],
  },
  {
    id: 'yunus',
    order: 21,
    name: 'Ýunus',
    arabicName: 'يُونُس',
    title: 'Zünnun — balygyň eýesi',
    sentTo: 'Ýüz müňden gowrak adamdan ybarat kowmuna (rowaýatlara görä Ninewa)',
    summary:
      'Kowmundan gaharlanyp, Allahyň rugsadyndan öň gitdi. Uly balyk ony ýuwutdy; garaňkylykda eden tobasy bilen halas boldy. Soňra kowmunyň hemmesi iman getirdi.',
    sections: [
      {
        title: 'Gämi we balyk',
        paragraphs: [
          'Ýunus kowmy iman getirmänsoň olardan gaharlanyp gitdi (21:87) we ýükli bir gämä mündi. Bije atylanda, ol utulanlardan boldy we deňze taşlandy; ony uly bir balyk ýuwutdy (37:139–142).',
          'Ol garaňkylyklaryň içinde: “Senden başga hiç bir ilah ýokdur, Sen pákdirsiň! Hakykatdan-da, men zalymlardan boldum” diýip dileg etdi (21:87). Eger ol tesbih edijilerden bolmadyk bolsa, direlýän güne çenli balygyň garnynda galardy (37:143–144).',
        ],
      },
      {
        title: 'Halas bolmak we kowmunyň imany',
        paragraphs: [
          'Allah ony halas edip, kesel ýagdaýda boş kenara taşlatdy we üstünde kädi ösümligini ösdürdi (37:145–146).',
          'Ýunusyň kowmy jezanyň alamatlaryny görüp, iman getirdiler. Kuranda olar jeza gelmänkä iman edip, ondan halas bolan ýeke-täk kowum hökmünde agzalýar (10:98).',
        ],
      },
    ],
    lessons: [
      'Sabyrsyzlyk bilen wezipäni taşlamak synaga eltýär.',
      'Toba we tesbih iň çykalgasyz ýagdaýdan hem halas edýär.',
      'Hiç bir kowumdan umydyňy kesme — Ýunusyň kowmy ahyrsoňy iman getirdi.',
    ],
    keyAyah: {
      ref: '21:87',
      turkmen:
        'Zünnuny (balygyň eýesini) hem ýatla. Ol gaharlanyp gitdi we Biziň ony kynçylyga salmajakdygymyzy pikir etdi. Soňra ol garaňkylyklaryň içinde: «Senden başga hiç bir ilah ýokdur, Sen pákdirsiň! Hakykatdan-da, men zalymlardan boldum» diýip dileg etdi.',
    },
    refs: [
      { surah: 37, ayahs: '139–148' },
      { surah: 21, ayahs: '87–88' },
      { surah: 10, ayahs: '98' },
      { surah: 68, ayahs: '48–50' },
    ],
    questions: [
      { prompt: 'Ýunus pygamberi näme ýuwutdy?', options: ['Uly balyk', 'Ýer', 'Tupan', 'Derýa'], answer: 0 },
      {
        prompt: 'Ýunus pygamber balygyň içinde näme etdi?',
        options: ['Allaha tesbih edip, toba etdi', 'Kowmuny nälet etdi', 'Uklady', 'Dymdy'],
        answer: 0,
      },
    ],
  },
  {
    id: 'zekerya',
    order: 22,
    name: 'Zekerýa',
    arabicName: 'زَكَرِيَّا',
    title: 'Merýemiň hossary',
    sentTo: 'Ysraýyl ogullaryna',
    family: 'Ýahýa pygamberiň kakasy; Merýemiň hossary',
    summary:
      'Zekerýa pygamber Merýemiň hossarydy. Garrap, aýaly hem önelgesiz bolsa-da, Allahdan salih perzent sorady we oňa Ýahýa buşlandy.',
    sections: [
      {
        title: 'Merýemiň hossary',
        paragraphs: [
          'Allah Merýemi Zekerýanyň hossarlygyna tabşyrdy. Zekerýa her gezek onuň ybadathanadaky otagyna girende, onuň ýanynda rysky tapýardy. “Bu saňa nireden?” diýip soranda, Merýem: “Bu Allahyň huzuryndan” diýdi (3:37).',
        ],
      },
      {
        title: 'Gizlin dileg',
        paragraphs: [
          'Şonda Zekerýa Rabbyna gizlin dileg etdi: “Rabbym! Süňklerim gowşady, başym agardy... Maňa Öz tarapyňdan bir mirasdar ber” (19:3–6). Perişdeler oňa Ýahýanyň buşlugyny berdiler (3:39).',
          'Ol alamat sorady; Allah: “Alamatyň — sag-aman bolup durkaň, adamlar bilen üç gije gürleşip bilmezligiňdir” diýdi (19:10).',
        ],
      },
    ],
    lessons: [
      'Dileg etmekden hiç wagt ýadamaly däl — Allah üçin giç däl.',
      'Gizlin we ýürekden edilen dileg kabul bolýar.',
    ],
    keyAyah: {
      ref: '21:89',
      turkmen:
        'Zekerýany hem ýatla. Ol Rabbyna: «Rabbym! Meni ýalňyz (perzentsiz) goýma, Sen mirasdarlaryň iň gowusysyň» diýip dileg etdi.',
    },
    refs: [
      { surah: 3, ayahs: '37–41' },
      { surah: 19, ayahs: '2–11' },
      { surah: 21, ayahs: '89–90' },
    ],
    questions: [
      { prompt: 'Zekerýa pygamber kimiň hossarydy?', options: ['Merýemiň', 'Ýusubyň', 'Musanyň', 'Ysmaýylyň'], answer: 0 },
      { prompt: 'Zekerýa pygambere haýsy ogul buşlandy?', options: ['Ýahýa', 'Isa', 'Yshak', 'Ýakup'], answer: 0 },
    ],
  },
  {
    id: 'yahya',
    order: 23,
    name: 'Ýahýa',
    arabicName: 'يَحْيَى',
    title: 'Çagalykda hikmet berlen pygamber',
    sentTo: 'Ysraýyl ogullaryna',
    family: 'Zekerýa pygamberiň ogly; Isa pygamberiň garyndaşy',
    summary:
      'Adyny Allahyň özi beren pygamber. Çagalykda oňa hikmet berildi. Ene-atasyna mähirli, tekepbirlikden uzak, arassa ahlakly adamdy.',
    sections: [
      {
        title: 'Öňden bellenen ady',
        paragraphs: [
          'Allah Zekerýa: “Saňa ady Ýahýa bolan bir oglanyň buşlugyny berýäris. Mundan öň hiç kime bu ady bermändik” diýdi (19:7). Ol Allahdan bolan bir Sözi (Isany) tassyklaýjy, ýolbaşçy we arassa bolup dünýä indi (3:39).',
        ],
      },
      {
        title: 'Sypatlary',
        paragraphs: [
          'Allah oňa: “Eý, Ýahýa! Kitaby berk tut!” diýdi we oňa çagalykda hikmet berdi. Ol mähirli, arassa, takwa, ene-atasyna gowulyk edýän we tekepbir däldi (19:12–14).',
          'Allah ony şeýle salamlaýar: “Doglan gününde, öljek gününde we direlip galjak gününde oňa salam bolsun!” (19:15).',
        ],
      },
    ],
    lessons: ['Ýaşlyk — hikmet we ybadat üçin iň gowy döwür.', 'Ene-ata gowulyk etmek pygamberleriň sypatydyr.'],
    keyAyah: {
      ref: '19:12',
      turkmen: '«Eý, Ýahýa! Kitaby berk tut!» (diýdik). Biz oňa çagalykda hikmet berdik.',
    },
    refs: [
      { surah: 19, ayahs: '7–15' },
      { surah: 3, ayahs: '39' },
      { surah: 21, ayahs: '90' },
    ],
    questions: [
      { prompt: 'Ýahýa pygamberiň kakasy kim?', options: ['Zekerýa', 'Ýakup', 'Ybraýym', 'Dawut'], answer: 0 },
      {
        prompt: 'Ýahýa adynyň aýratynlygy näme?',
        options: ['Öň hiç kime bu at berilmändi', 'Ony kakasy saýlady', 'Ol Isanyň beýleki ady', 'Ol Tewratda ýok'],
        answer: 0,
      },
    ],
  },
  {
    id: 'isa',
    order: 24,
    name: 'Isa',
    arabicName: 'عِيسَى',
    title: 'Mesih — Merýemiň ogly',
    sentTo: 'Ysraýyl ogullaryna',
    period: 'Biziň eramyzyň I asyry',
    family: 'Merýemiň ogly; Ýahýa pygamberiň garyndaşy',
    ululAzm: true,
    bookId: 'injil',
    summary:
      'Allahyň “Bol!” buýrugy bilen atasyz dünýä indi, bäbekkä gürledi. Allahyň rugsady bilen köp mugjyza görkezdi. Oňa Injil berildi. Kurana görä ol öldürilmedi we haça çüýlenmedi, Allah ony Öz huzuryna göterdi.',
    sections: [
      {
        title: 'Gudratly doglyşy',
        paragraphs: [
          'Perişde Merýeme Allahdan bir Sözüň — ady Mesih Isa bolan oglanyň buşlugyny berdi. Merýem: “Maňa hiç bir adam degmedik bolsa, nädip oglum bolsun?” diýdi. Perişde: “Allah islänini ýaradýar. Bir işe höküm etse, oňa diňe «Bol!» diýýär we ol bolýar” diýdi (3:45–47). Isanyň ýaradylyşy Adamyňky ýalydyr (3:59).',
          'Merýem bäbegi halkynyň ýanyna getirende, olar ony aýypladylar. Merýem bäbege işaret etdi we Isa: “Men Allahyň guludyryn. Ol maňa Kitap berdi we meni pygamber etdi” diýip gürledi (19:27–33).',
        ],
      },
      {
        title: 'Mugjyzalary we Injil',
        paragraphs: [
          'Allahyň rugsady bilen palçykdan guş şekilini ýasap, üfländen soň ol guşa öwrülýärdi; körleri we alaçlary sagaldýardy, ölüleri direldýärdi (3:49; 5:110). Hawarylar oňa kömekçi boldular (3:52), olaryň dilegi bilen asmandan sofra indirildi (5:112–115).',
          'Ol özünden öňki Tewraty tassyklady we özünden soň “Ahmet” atly bir resulyň geljekdigini buşlady (61:6).',
        ],
      },
      {
        title: 'Göterilmegi',
        paragraphs: [
          'Kuran şeýle habar berýär: “Olar ony öldürmediler we haça çüýlemediler, ýöne olara şeýle görkezildi... Tersine, Allah ony Öz huzuryna göterdi” (4:157–158).',
          'Yslam ynanjyna görä, Isa Allahyň guly we resulydyr, Hudaý ýa-da Hudaýyň ogly däldir (19:30; 5:116–117). Musulmanlar ony hormatlaýarlar we oňa iman etmek imanyň şertlerinden biridir.',
        ],
      },
    ],
    lessons: [
      'Allahyň gudraty tebigatyň kanunlaryndan beýikdir.',
      'Pygamberleriň hemmesi Allahyň gullarydyr — olary söýmek we hormatlamak gerek, ýöne ybadat diňe Allaha.',
    ],
    keyAyah: {
      ref: '19:30',
      turkmen: '(Isa): «Hakykatdan-da, men Allahyň guludyryn. Ol maňa Kitap berdi we meni pygamber etdi» diýdi.',
    },
    refs: [
      { surah: 19, ayahs: '16–36' },
      { surah: 3, ayahs: '42–59' },
      { surah: 5, ayahs: '110–118' },
      { surah: 4, ayahs: '157–159' },
      { surah: 61, ayahs: '6' },
    ],
    questions: [
      {
        prompt: 'Isa pygamber bäbek wagtynda näme etdi?',
        options: ['Gürledi', 'Ýöräp başlady', 'Ýazmagy öwrendi', 'Hiç zat etmedi'],
        answer: 0,
      },
      {
        prompt: 'Isa pygamber özünden soň geljek pygamberiň adyny nähili buşlady?',
        options: ['Ahmet', 'Ýahýa', 'Musa', 'Ylýas'],
        answer: 0,
      },
      { prompt: 'Isa pygambere haýsy kitap inderildi?', options: ['Injil', 'Tewrat', 'Zebur', 'Kuran'], answer: 0 },
    ],
  },
  {
    id: 'muhammet',
    order: 25,
    name: 'Muhammet',
    arabicName: 'مُحَمَّد',
    title: 'Pygamberleriň soňkusy, älemlere rehmet',
    sentTo: 'Ähli adamzada we jynlara',
    period: '571–632 ýyllar',
    family: 'Ysmaýyl pygamberiň neslinden; Kureýş taýpasynyň Haşim urugyndan',
    ululAzm: true,
    bookId: 'kuran',
    summary:
      'Soňky pygamber. 40 ýaşynda Hyra gowagynda ilkinji ylhamy aldy. 13 ýyl Mekgede, 10 ýyl Medinede yslamy wagyz etdi. Oňa Kurany Kerim inderildi.',
    sections: [
      {
        title: 'Doglan we ýaşlyk ýyllary',
        paragraphs: [
          'Muhammet ﷺ takmynan 571-nji ýylda — “Pil ýylynda” (Fil süresi) Mekgede dünýä indi. Kakasy Abdylla ol dogulmazdan öň, ejesi Amina alty ýaşynda aradan çykdy. Ony ilki atasy Abdulmuttalyp, soňra kakasynyň dogany Ebu Talyp terbiýeledi.',
          'Ýaşlykda çopançylyk we söwda bilen meşgullandy. Dogruçyllygy we ynamdarlygy üçin halk ony “Emin” (ynamly) diýip atlandyrýardy. 25 ýaşynda Hatyja bilen öýlendi.',
        ],
      },
      {
        title: 'Pygamberlik we Mekge döwri',
        paragraphs: [
          '610-njy ýylda, 40 ýaşynda, Hyra gowagynda Jebraýyl perişde gelip: “Oka! Ýaradan Rabbyňyň ady bilen oka!” diýdi (96:1–5). Ilkinji iman getirenler aýaly Hatyja, dosty Ebu Bekir, kakasynyň doganynyň ogly Aly we Zeýd ibn Harisa boldy.',
          'Mekgede 13 ýyl dowam eden çagyryş döwründe musulmanlar köp zulum we gabaw gördüler. Şol döwürde Ysra we Mygraç wakasy boldy — Allah ony bir gijede Mesjidi Haramdan Mesjidi Aksa göçürdi (17:1).',
        ],
      },
      {
        title: 'Hijret we Medine döwri',
        paragraphs: [
          '622-nji ýylda Medinä hijret etdi — hijri senenamasy şu wakadan başlaýar. Medinede ilkinji yslam jemgyýetini gurdy. Bedr (624), Uhud (625), Handak (627) wakalary, Hudaýbiýe ylalaşygy (628) boldy.',
          '630-njy ýylda Mekge gan dökülmän diýen ýaly azat edildi; ol özüne ýyllarça zulum edenleri bagyşlady. 632-nji ýylda Weda (hoşlaşyk) hajyny berjaý etdi we şol ýyl 63 ýaşynda Medinede aradan çykdy.',
        ],
      },
    ],
    lessons: [
      'Ynamdarlyk we dogruçyllyk — çagyryşyň iň güýçli delili.',
      'Kynçylyklara sabyr, ýeňişde bolsa bagyşlamak — pygamberiň sünneti.',
      'Ol ähli adamzat üçin iň gowy nusgadyr (33:21).',
    ],
    keyAyah: {
      ref: '21:107',
      turkmen: 'Biz seni diňe älemlere rehmet edip iberdik.',
    },
    refs: [
      { surah: 96, ayahs: '1–5', note: 'ilkinji ylham' },
      { surah: 33, ayahs: '21, 40' },
      { surah: 17, ayahs: '1', note: 'Ysra' },
      { surah: 48, ayahs: '1–29', note: 'Fetih süresi' },
      { surah: 110, ayahs: '1–3' },
    ],
    questions: [
      {
        prompt: 'Muhammet ﷺ-e ilkinji ylham nirede geldi?',
        options: ['Hyra gowagynda', 'Kagbada', 'Medinede', 'Tur dagynda'],
        answer: 0,
      },
      { prompt: 'Hijret näçenji ýylda boldy?', options: ['622', '610', '630', '571'], answer: 0 },
      {
        prompt: 'Kuranda Muhammet ﷺ nähili wasp edilýär?',
        options: ['Pygamberleriň soňkusy we älemlere rehmet', 'Ilkinji ynsan', 'Kelimulla', 'Halylulla'],
        answer: 0,
      },
      {
        prompt: 'Muhammet ﷺ-i ýaşlykda halk nähili atlandyrýardy?',
        options: ['Emin (ynamly)', 'Halyl (dost)', 'Mesih', 'Syddyk'],
        answer: 0,
      },
    ],
  },
]

export const PROPHET_BY_ID: Record<string, Prophet> = Object.fromEntries(PROPHETS.map((p) => [p.id, p]))
