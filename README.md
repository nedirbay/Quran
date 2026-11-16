# Kurany öwren — Kurany Kerim okamagy öwreniş programmasy

Türkmen dilinde, häzirki zaman, ykjam we göz ýadatmaýan web programma:
arap elipbiýi → okalyş düzgünleri (tejwid esaslary) → aýatlary interaktiw okamak.

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
    │   └── reader.ts             # soňky ýer / okalan aýatlar / günler
    ├── router/index.ts
    ├── utils/arabic.ts           # harp görnüşleri (ZWJ), sözlere bölmek, TTS
    ├── components/
    │   ├── layout/               # AppShell, navItems
    │   ├── ui/                   # AppIcon, AudioButton, ProgressBar/Ring,
    │   │                         # SegmentedControl, PageHeader, RichText
    │   ├── letters/              # LetterTile, LetterForms
    │   ├── quiz/                 # QuizRunner, QuizReport
    │   └── reader/               # AyahText (basylýan sözler), AyahPicker
    └── views/
        ├── HomeView.vue · SettingsView.vue
        ├── letters/              # LettersView, LetterDetailView, LettersQuizView
        ├── tajweed/              # TajweedView, TajweedRuleView, TajweedQuizView
        └── reader/               # SurahListView, ReaderView
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

**3. Kuran okamak** — Fatiha we 103–114-nji süreler. Ekran ikä bölünen: ýokarda arapça aýat,
aşakda türkmençe manysy. Islendik söze basylanda şol sözüň okalyşy ýaňlanýar. Öňe/yza
(düwme, ← → klawiša, barmak bilen süýşürmek), aýat sanawy, okalan aýatlaryň hasaby,
soňky ýeri ýatda saklamak, şrift ölçegi, kary saýlamak.

## 4. Maglumat çeşmeleri we bellikler

- Arapça tekst: Uthmani ýazgysy, [The Noble Qur'an Encyclopedia](https://quranenc.com) —
  `quran-json` npm paketi arkaly (CC BY-SA 4.0).
- Türkmençe many — öwrenmek üçin gysga terjime; resmi tefsir däldir. Ygtybarly terjime bilen
  barlap, `scripts/translations-tk.json` faýlynda düzetmek we `build-quran-data.py` işletmek ýeterlik.
- Sözme-söz ses: `audio.qurancdn.com` (quran.com); aýat sesi: `everyayah.com`. Internet ýok
  bolsa brauzeriň arapça TTS sesi ulanylýar (enjamda arap TTS sesi gurnalan bolmaly).
- Täze süre goşmak: `translations-tk.json`-a terjimäni goşup, skripti işletmeli.
