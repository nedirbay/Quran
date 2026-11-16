# Kurany öwren — Kurany Kerim okamagy öwreniş programmasy

Türkmen dilinde, häzirki zaman, ykjam we göz ýadatmaýan web programma:
arap elipbiýi → okalyş düzgünleri (tejwid esaslary) → aýatlary interaktiw okamak →
ylahy kitaplar we pygamberleriň kyssalary.

**Tehnologiýalar:** Vue 3 (Composition API, `<script setup>`, TypeScript) · Pinia · Vue Router ·
Tailwind CSS v4 · Vite · Vitest. Maglumatlar brauzeriň LocalStorage-ynda saklanýar.

```bash
npm install
npm run dev        # işläp düzmek
npm run build      # tip barlagy + önümçilik gurluşy (dist/)
npm test           # unit testler
```

`dist/` papkasy islendik statik hostingde (GitHub Pages, Netlify, faýl ulgamy) işleýär —
hash-routing we nispi `base` ulanylýar.

---

## 1. Arhitektura

```
┌──────────────────────────── Views (sahypalar) ────────────────────────────┐
│ Home │ Letters / LetterDetail / LettersQuiz │ Tajweed / Rule / TajweedQuiz │
│      │ SurahList / Reader                   │ Settings                     │
└───────────────┬───────────────────────────────────────────┬───────────────┘
                │ ulanýar                                    │
┌───────────────▼────────────── Components ─────────────────▼───────────────┐
│ layout/AppShell · quiz/QuizRunner, QuizReport (umumy, 2 modul üçin)        │
│ letters/LetterTile, LetterForms · reader/AyahText, AyahPicker · ui/*      │
└───────────────┬───────────────────────────────────────────────────────────┘
                │
┌───────────────▼──── Stores (Pinia) ──────┐   ┌──────── Services ──────────┐
│ settings · letters · tajweed · reader    │──▶│ storage  (LocalStorage)    │
│ (progress, bellikler, statistika)        │   │ audio    (faýl → TTS)      │
└───────────────┬──────────────────────────┘   │ quiz     (arassa logika)   │
                │                              │ quran    (repository)      │
┌───────────────▼────────── Data ─────────────────────────────────────────┐
│ letters.ts (28 harp) · tajweed.ts (9 düzgün + soraglar) · quran/*.json   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Esasy çözgütler**

| Mesele | Çözgüt |
|---|---|
| Progress ýitmesin | Her store `usePersistentRef` arkaly LocalStorage bilen awtomatiki sinhronlaşýar; açarlar wersiýaly (`kuran-owren:v1:*`). Sazlamalarda JSON eksport/import bar. |
| Galan ýerden dowam | Router her “resumable” sahypany ýatda saklaýar; programma baş sahypadan açylsa soňky ýere geçýär. Okaýjy soňky aýaty (`reader.last`) aýratyn saklaýar. |
| Ses | `services/audio.ts`: ilki ýazgy (quran.com sözme-söz, everyayah.com aýat, `public/audio/letters`), bolmasa brauzeriň arapça TTS-i. Bir wagtda bir ses. |
| Quiz | Bir umumy `QuizRunner` + `QuizReport`; soraglar `services/quiz.ts`-de arassa funksiýalar bilen döredilýär (unit test bar). Harp soraglarynda distraktorlar görnüşi meňzeş harplardan saýlanýar. |
| Ýalňyş analizi | Netije `tag` (harp/düzgün) boýunça toplanýar → “Bökdençlik bar ýerler”; ýalňyşlar awtomatiki ýa-da el bilen “Gaýtalamaly” sanawyna goşulýar. |
| Kuran maglumaty | `services/quran.ts` repository; her süre aýratyn chunk bolup diňe gerek wagty ýüklenýär. API-a geçmek üçin diňe şu faýly üýtgetmek ýeterlik. |
| Arap teksti | Amiri Quran (aýatlar) we Scheherazade New (harplar) şriftleri programma bilen bile gelýär (offline). Garyşyk tekstde arapça bölekler `RichText` bilen `<bdi>` içinde görkezilýär. |
| Dizaýn | CSS üýtgeýänlerine esaslanan tokenler (`style.css`): pil süňki fon, goýy ýaşyl, altyn çalgy; gündiz/gije tertibi. |

## 2. Papka gurluşy

```
.
├── index.html
├── public/
│   ├── favicon.svg
│   └── audio/letters/            # islege görä harp ýazgylary (*.mp3)
├── scripts/
│   ├── build-quran-data.py       # süre JSON-laryny döredýär
│   ├── build-history-ayahs.py    # kitap/pygamber esasy aýatlarynyň arapça teksti
│   └── translations-tk.json      # türkmençe many (çeşme)
└── src/
    ├── main.ts                   # giriş: Pinia, Router, şriftler
    ├── App.vue                   # AppShell + RouterView + “dowam et” logikasy
    ├── config.ts                 # audio URL-lar, karylar, storage prefiksi
    ├── style.css                 # Tailwind v4 + dizaýn tokenleri
    ├── types/index.ts            # domen tipleri
    ├── data/
    │   ├── letters.ts            # 28 harp: ady, sesi, mahraj, mysal
    │   ├── tajweed.ts            # 9 düzgün: düşündiriş, mysal, soraglar
    │   ├── books.ts              # 5 ylahy kitap: taryhy, aýatlar, soraglar
    │   ├── prophets.ts           # 25 pygamber: başdan geçirmeler, sapaklar, soraglar
    │   ├── history-ayahs.json    # esasy aýatlaryň arapça teksti (skript bilen)
    │   ├── surahNames.ts         # 114 süräniň türkmençe ady
    │   └── quran/                # index.json + surah-XXX.json
    ├── services/
    │   ├── storage.ts            # LocalStorage örtügi + usePersistentRef
    │   ├── audio.ts              # ses: faýl → TTS fallback
    │   ├── quiz.ts (+ .spec.ts)  # quiz generatorlary we hasaplaýyş
    │   └── quran.ts              # süre repository-si
    ├── stores/
    │   ├── settings.ts           # tema, şrift, kary, awto-goşmak...
    │   ├── letters.ts            # öwrenilen / gaýtalamaly / statistika
    │   ├── tajweed.ts            # öwrenilen düzgünler / netijeler
    │   ├── reader.ts             # soňky ýer / okalan aýatlar / günler
    │   └── stories.ts            # okalan kitaplar/pygamberler, synag statistikasy
    ├── router/index.ts
    ├── utils/arabic.ts           # harp görnüşleri (ZWJ), sözlere bölmek, TTS
    ├── components/
    │   ├── layout/               # AppShell, navItems
    │   ├── ui/                   # AppIcon, AudioButton, ProgressBar/Ring,
    │   │                         # SegmentedControl, PageHeader, RichText
    │   ├── letters/              # LetterTile, LetterForms
    │   ├── quiz/                 # QuizRunner, QuizReport
    │   ├── reader/               # AyahText (basylýan sözler), AyahPicker
    │   └── history/              # KeyAyahCard, StorySections, RefList, StoryAside
    └── views/
        ├── HomeView.vue · SettingsView.vue
        ├── letters/              # LettersView, LetterDetailView, LettersQuizView
        ├── tajweed/              # TajweedView, TajweedRuleView, TajweedQuizView
        ├── reader/               # SurahListView, ReaderView
        └── history/              # HistoryView, BookView, ProphetView, HistoryQuizView
```

## 3. Bölümler

**1. Harplar** — 28 harp; her harp üçin ýeke/başda/ortada/soňda görnüşleri, üstün-astyn-ötre
bilen bogunlar, okalyş ýeri, mysal söz. “Öwrendim” belligi; süzgüç: Hemmesi / Öwrenilmedik /
Öwrenilen / Gaýtalamaly. Synag 4 görnüşli sorag bilen (harp → at, at → harp, ses → harp,
söz içindäki görnüş → harp); toplumy saýlap bolýar (ähli, öwrenen, öwrenmedik, gaýtalamaly,
iň köp ýalňyşýanlarym). Hasabatda ýalňyş analizi we “Gaýtalama goş” düwmeleri.

**2. Tejwid esaslary** — Üstün, Astyn, Ötre, Tenwin, Sukun, Şedde, Tebigy med, Uzyn med,
Kalkala. Her düzgünde düşündiriş, sesli mysallar, ýatlatma we synag; umumy synag we
“gowşak düzgünler” boýunça synag. Hasabat: dogry/ýalňyş sany, düzgünler boýunça bökdençlik.

**3. Kuran okamak** — Fatiha, Mülk we 30-njy jüz (78–114), jemi 39 süre. Ekran ikä bölünen: ýokarda arapça aýat,
aşakda türkmençe manysy. Islendik söze basylanda şol sözüň okalyşy ýaňlanýar. Öňe/yza
(düwme, ← → klawiša, barmak bilen süýşürmek), aýat sanawy, okalan aýatlaryň hasaby,
soňky ýeri ýatda saklamak, şrift ölçegi, kary saýlamak.

**4. Kitaplar we pygamberler** — Sahyfalar, Tewrat, Zebur, Injil we Kurany Kerim: kime,
haçan, haýsy dilde inderilendigi we soňky taryhy. Kuranda ady geçýän 25 pygamber (takmynan
taryhy tertipde): başdan geçirmeleri, alynýan sapaklar, esasy aýat (arapça + many + ses) we
Kurandaky salgylar. “Okadym” belligi, ýalňyş analizi bilen synag. Wakalar Kuran aýatlaryna
esaslanýar; aýatlarda bolmadyk jikme-jiklikler “rowaýatlara görä” diýip bellenýär. Pygamberleriň
şekilleri ulanylmaýar — diňe adlarynyň arap ýazgysy.

## Offline sesler

Aýatlaryň we sözleriň sesi adatça internetden çalynýar. Internetsiz ulanmak üçin bir gezek ýükläň:

```bash
npm run audio                                    # esasy kary (Husary) + sözme-söz ses
npm run audio -- --reciter=Alafasy_128kbps       # başga kary
npm run audio -- --reciter=Husary_128kbps,Alafasy_128kbps
npm run audio -- --no-words                      # diňe aýatlar
```

- Ýüklenýär: 13 süräniň ähli aýatlary + “Kitaplar we pygamberler” bölümindäki esasy aýatlar
  (102 aýat, bir kary üçin takmynan 15–25 MB) we 277 söz (birnäçe MB).
- Faýllar `public/audio/ayahs/`, `public/audio/words/` we `public/audio/manifest.json` — git-e goşulmaýar.
  `npm run build` olary `dist/`-e öz-özünden goşýar.
- Programma `manifest.json`-a seredip, ilki ýerli faýly, bolmasa internetdäkini, iň soňunda TTS-i ulanýar.
  Ýagdaýy Sazlamalar → Ses bölüminde görünýär.
- Ýarym galsa, buýrugy gaýtadan işlediň — bar faýllar geçilýär.
- Çeşmeler: aýatlar — [everyayah.com](https://everyayah.com), sözler — quran.com (`audio.qurancdn.com`).
  Programmany köpçülige ýa-da söwda maksady bilen paýlamazdan öň olaryň ulanyş şertlerini barlaň.

## Harplaryň we mysallaryň sesi (`npm run audio:tts`)

Harplaryň sesi adatça brauzeriň arapça TTS sesi bilen okalýar (Windows-daky Chrome-da ol ýok).
Has ygtybarly bolmagy üçin sesleri bir gezek mp3 görnüşinde dörediň:

```bash
npm install                                        # msedge-tts paketi
npm run audio:tts                                  # 175 faýl: harplar, bogunlar, mysallar
npm run audio:tts -- --voice=ar-SA-ZariyahNeural   # aýal sesi
npm run audio:tts -- --only=letters --rate=-25%    # diňe harplar, has haýal
npm run audio:tts -- --force                       # bar faýllary täzeden döretmek
npm run audio:tts -- --dry-run                     # näme dörediljegini görmek
```

| Faýl | Mazmuny |
|---|---|
| `public/audio/letters/<id>.mp3` | harpyň ady (بَاء) |
| `public/audio/letters/<id>-a|i|u.mp3` | üstün / astyn / ötre bilen bogun (بَ بِ بُ) |
| `public/audio/examples/ex-<id>.mp3` | harpyň mysal sözi |
| `public/audio/examples/rule-<düzgün>-<n>.mp3` | tejwid mysallary |

- Microsoft Edge “Read aloud” Neural sesleri ulanylýar (`msedge-tts`). Açar ýa-da hasap gerek däl,
  **ýöne bu resmi API däl** — islendik wagt işlemezligi mümkin.
- Neural ses harplaryň adyny gowy okaýar, emma ýeke bogunlarda we ح ع ق ض ýaly harplarda ýalňyşyp biler —
  döredilen sesleri **bir mugallym diňläp barlasyn**. Gowy däl faýly öz ýazgyňyz bilen çalşyň:
  şol at bilen goýlan faýl `--force` bolmasa üýtgedilmeýär.
- Faýllar git-e goşulmaýar; `npm run build` olary `dist/`-e goşýar.

## Täze süre goşmak

1. `scripts/translations-tk.json` — süräniň türkmençe manysyny goşuň (her aýat üçin bir setir,
   aýat sany çeşme bilen deň bolmaly). Boş setirli (doly terjime edilmedik) süreler programma
   goşulmaýar — skript olary geçip, näçe aýatyň taýýardygyny görkezýär.
2. `python3 scripts/build-quran-data.py <quran-json/dist>` — süre JSON faýllaryny döredýär.
   `quran-json` paketini almak: `mkdir -p /tmp/qj && curl -sL https://registry.npmjs.org/quran-json/-/quran-json-3.1.2.tgz | tar xz -C /tmp/qj`
   → ýoly `/tmp/qj/package/dist`.
3. `npm run audio` — täze süräniň aýat we söz sesleri awtomatiki tapylyp ýüklenýär (bar faýllar geçilýär).
   Işledilmese hem programma täze süräniň sesini internetden alýar.

## 4. Goldaw (GitHub Sponsors)

- `.github/FUNDING.yml` — GitHub-da repozitoriýanyň ýokarsynda **❤ Sponsor** düwmesini görkezýär.
- Programmanyň içinde: ýokarky panelde “Goldaw” düwmesi, baş sahypada we sazlamalarda goldaw bloky.
  Salgy `src/config.ts` → `SPONSOR` içinde.
- Düwmeleriň işlemegi üçin GitHub hasabyňyzda Sponsors profili açyk bolmaly:
  <https://github.com/sponsors> → **Get sponsored**.

## 5. Maglumat çeşmeleri we bellikler

- Arapça tekst: Uthmani ýazgysy, [The Noble Qur'an Encyclopedia](https://quranenc.com) —
  `quran-json` npm paketi arkaly (CC BY-SA 4.0).
- Türkmençe many — öwrenmek üçin gysga terjime; resmi tefsir däldir. Ygtybarly terjime bilen
  barlap, `scripts/translations-tk.json` faýlynda düzetmek we `build-quran-data.py` işletmek ýeterlik.
- Sözme-söz ses: `audio.qurancdn.com` (quran.com); aýat sesi: `everyayah.com`. Internet ýok
  bolsa brauzeriň arapça TTS sesi ulanylýar (enjamda arap TTS sesi gurnalan bolmaly).
- Täze süre goşmak: `translations-tk.json`-a terjimäni goşup, skripti işletmeli.
