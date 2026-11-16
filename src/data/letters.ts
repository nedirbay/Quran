import type { ArabicLetter } from '@/types'

/**
 * Arap elipbiýiniň 28 harpy.
 * `arabicName` — harpyň arapça ady (TTS fallback üçin hem ulanylýar).
 * `pronunciation` — okalyş ýeri (mahraj) barada gysga türkmençe düşündiriş.
 */
export const LETTERS: ArabicLetter[] = [
  {
    id: 'alif', order: 1, char: 'ا', name: 'Älif', arabicName: 'أَلِف', translit: 'a / ʾ',
    nonConnecting: true,
    pronunciation: 'Özbaşdak ses bermeýär: üstündäki hereket ýa-da hemze bilen okalýar. Med harpy hökmünde öňki “a” sesini iki hereket uzaldýar.',
    example: { arabic: 'أَسَد', translit: 'asad', meaning: 'arslan' },
  },
  {
    id: 'ba', order: 2, char: 'ب', name: 'Be', arabicName: 'بَاء', translit: 'b',
    pronunciation: 'Iki dodagy jebis ýapyp, türkmen “b” sesi ýaly aýdylýar.',
    example: { arabic: 'بَاب', translit: 'bāb', meaning: 'gapy' },
  },
  {
    id: 'ta', order: 3, char: 'ت', name: 'Te', arabicName: 'تَاء', translit: 't',
    pronunciation: 'Dil ujy ýokarky öň dişleriň düýbüne degip, ýumşak “t” sesi çykýar.',
    example: { arabic: 'تُفَّاح', translit: 'tuffāḥ', meaning: 'alma' },
  },
  {
    id: 'tha', order: 4, char: 'ث', name: 'Se', arabicName: 'ثَاء', translit: 'th',
    pronunciation: 'Dil ujuny ýokarky we aşaky dişleriň arasyna azajyk çykaryp, iňlisçe “think” sözündäki “th” ýaly pyşyrdap aýdylýar.',
    example: { arabic: 'ثَلْج', translit: 'thalj', meaning: 'gar' },
  },
  {
    id: 'jim', order: 5, char: 'ج', name: 'Jim', arabicName: 'جِيم', translit: 'j',
    pronunciation: 'Diliň orta bölegi asmana degip, türkmen “j” sesi ýaly aýdylýar.',
    example: { arabic: 'جَبَل', translit: 'jabal', meaning: 'dag' },
  },
  {
    id: 'ha', order: 6, char: 'ح', name: 'Ha', arabicName: 'حَاء', translit: 'ḥ',
    pronunciation: 'Bokurdagyň orta böleginden, howany gysyp çykarylýan güýçli, ýöne gyryşsyz “h” sesi. Aýna hor beren ýaly.',
    example: { arabic: 'حَلِيب', translit: 'ḥalīb', meaning: 'süýt' },
  },
  {
    id: 'kha', order: 7, char: 'خ', name: 'Hy', arabicName: 'خَاء', translit: 'kh',
    pronunciation: 'Bokurdagyň ýokarky böleginden gyryşly çykýan “h” sesi (nemesçe “Bach” sözündäki ýaly). Galyň okalýar.',
    example: { arabic: 'خُبْز', translit: 'khubz', meaning: 'çörek' },
  },
  {
    id: 'dal', order: 8, char: 'د', name: 'Dal', arabicName: 'دَال', translit: 'd',
    nonConnecting: true,
    pronunciation: 'Dil ujy ýokarky öň dişleriň düýbüne degip, “d” sesi çykýar.',
    example: { arabic: 'دَار', translit: 'dār', meaning: 'öý, mesgen' },
  },
  {
    id: 'dhal', order: 9, char: 'ذ', name: 'Zal', arabicName: 'ذَال', translit: 'dh',
    nonConnecting: true,
    pronunciation: 'Dil ujy dişleriň arasynda durýar, iňlisçe “this” sözündäki sesli “th” ýaly aýdylýar.',
    example: { arabic: 'ذَهَب', translit: 'dhahab', meaning: 'altyn' },
  },
  {
    id: 'ra', order: 10, char: 'ر', name: 'Re', arabicName: 'رَاء', translit: 'r',
    nonConnecting: true,
    pronunciation: 'Dil ujy ýokarky dişleriň üstündäki çykyňa degip, bir gezek titreýär. Üstün we ötre bilen galyň okalýar.',
    example: { arabic: 'رَجُل', translit: 'rajul', meaning: 'erkek adam' },
  },
  {
    id: 'zay', order: 11, char: 'ز', name: 'Ze', arabicName: 'زَاي', translit: 'z',
    nonConnecting: true,
    pronunciation: 'Dil ujy aşaky dişlere ýakyn durup, sesli “z” çykýar.',
    example: { arabic: 'زَيْت', translit: 'zayt', meaning: 'zeýtun ýagy' },
  },
  {
    id: 'sin', order: 12, char: 'س', name: 'Sin', arabicName: 'سِين', translit: 's',
    pronunciation: 'Ince we arassa “s” sesi. Dil ujy aşaky öň dişlere ýakyn durýar.',
    example: { arabic: 'سَمَاء', translit: 'samāʾ', meaning: 'asman' },
  },
  {
    id: 'shin', order: 13, char: 'ش', name: 'Şin', arabicName: 'شِين', translit: 'sh',
    pronunciation: 'Diliň orta bölegi asmana ýakynlaşyp, türkmen “ş” sesi ýaly aýdylýar.',
    example: { arabic: 'شَمْس', translit: 'shams', meaning: 'gün' },
  },
  {
    id: 'sad', order: 14, char: 'ص', name: 'Sad', arabicName: 'صَاد', translit: 'ṣ',
    pronunciation: 'Galyň “s”. Diliň arka bölegi ýokary galdyrylyp, agyz içi giňeldilýär — ses “sa” däl-de “so”-a golaý eşidilýär.',
    example: { arabic: 'صَبْر', translit: 'ṣabr', meaning: 'sabyr' },
  },
  {
    id: 'dad', order: 15, char: 'ض', name: 'Dad', arabicName: 'ضَاد', translit: 'ḍ',
    pronunciation: 'Diliň gyrasy ýokarky azy dişlere degýär. Galyň we güýçli “d” — arap diline mahsus ses.',
    example: { arabic: 'ضَوْء', translit: 'ḍawʾ', meaning: 'ýagtylyk' },
  },
  {
    id: 'tta', order: 16, char: 'ط', name: 'Ta', arabicName: 'طَاء', translit: 'ṭ',
    pronunciation: 'Galyň “t”. Dil ujy ýokarky dişleriň düýbüne berk degip, diliň arkasy ýokary galýar.',
    example: { arabic: 'طَعَام', translit: 'ṭaʿām', meaning: 'nahar, iýmit' },
  },
  {
    id: 'zza', order: 17, char: 'ظ', name: 'Za', arabicName: 'ظَاء', translit: 'ẓ',
    pronunciation: 'Dil ujy dişleriň arasynda, galyň we sesli “z/th” sesi.',
    example: { arabic: 'ظِلّ', translit: 'ẓill', meaning: 'kölege' },
  },
  {
    id: 'ayn', order: 18, char: 'ع', name: 'Aýn', arabicName: 'عَيْن', translit: 'ʿ',
    pronunciation: 'Bokurdagyň orta böleginden gysylyp çykýan sesli harp. Türkmen dilinde gabat gelmeýär — köp diňläp öwrenmeli.',
    example: { arabic: 'عِلْم', translit: 'ʿilm', meaning: 'ylym' },
  },
  {
    id: 'ghayn', order: 19, char: 'غ', name: 'Gaýn', arabicName: 'غَيْن', translit: 'gh',
    pronunciation: 'Bokurdagyň ýokarky böleginden çykýan gyryşly ses — türkmen “agyz” sözündäki “g” sesine golaý.',
    example: { arabic: 'غَيْم', translit: 'ghaym', meaning: 'bulut' },
  },
  {
    id: 'fa', order: 20, char: 'ف', name: 'Fe', arabicName: 'فَاء', translit: 'f',
    pronunciation: 'Ýokarky dişler aşaky dodaga degip, “f” sesi çykýar.',
    example: { arabic: 'فَجْر', translit: 'fajr', meaning: 'daň' },
  },
  {
    id: 'qaf', order: 21, char: 'ق', name: 'Kaf', arabicName: 'قَاف', translit: 'q',
    pronunciation: 'Diliň iň arka bölegi kiçi dile degip, türkmen “k” sesinden has galyň we çuňdan çykýan ses.',
    example: { arabic: 'قَلَم', translit: 'qalam', meaning: 'galam' },
  },
  {
    id: 'kaf', order: 22, char: 'ك', name: 'Kef', arabicName: 'كَاف', translit: 'k',
    pronunciation: 'Diliň arka bölegi ýumşak asmana degip, inçe “k” sesi çykýar.',
    example: { arabic: 'كِتَاب', translit: 'kitāb', meaning: 'kitap' },
  },
  {
    id: 'lam', order: 23, char: 'ل', name: 'Lam', arabicName: 'لَام', translit: 'l',
    pronunciation: 'Diliň gyrasy we ujy ýokarky dişleriň düýbüne degip, inçe “l” sesi çykýar.',
    example: { arabic: 'لَيْل', translit: 'layl', meaning: 'gije' },
  },
  {
    id: 'mim', order: 24, char: 'م', name: 'Mim', arabicName: 'مِيم', translit: 'm',
    pronunciation: 'Iki dodak ýapylýar, ses burundan hem çykýar — “m”.',
    example: { arabic: 'مَاء', translit: 'māʾ', meaning: 'suw' },
  },
  {
    id: 'nun', order: 25, char: 'ن', name: 'Nun', arabicName: 'نُون', translit: 'n',
    pronunciation: 'Dil ujy ýokarky dişleriň üstündäki çykyňa degip, burun sesi bilen “n” aýdylýar.',
    example: { arabic: 'نُور', translit: 'nūr', meaning: 'nur, ýagtylyk' },
  },
  {
    id: 'waw', order: 26, char: 'و', name: 'Waw', arabicName: 'وَاو', translit: 'w',
    nonConnecting: true,
    pronunciation: 'Dodaklar tegelek bolup öňe çykýar — iňlisçe “w” ýaly. Med harpy hökmünde “u” sesini uzaldýar.',
    example: { arabic: 'وَرْد', translit: 'ward', meaning: 'gül' },
  },
  {
    id: 'haa', order: 27, char: 'ه', name: 'He', arabicName: 'هَاء', translit: 'h',
    pronunciation: 'Bokurdagyň iň aşaky böleginden çykýan ýeňil, demli “h” sesi.',
    example: { arabic: 'هِلَال', translit: 'hilāl', meaning: 'täze aý' },
  },
  {
    id: 'ya', order: 28, char: 'ي', name: 'Ýe', arabicName: 'يَاء', translit: 'y',
    pronunciation: 'Diliň orta bölegi asmana ýakynlaşyp, türkmen “ý” sesi ýaly aýdylýar. Med harpy hökmünde “i” sesini uzaldýar.',
    example: { arabic: 'يَد', translit: 'yad', meaning: 'el' },
  },
]

export const LETTER_BY_ID: Record<string, ArabicLetter> = Object.fromEntries(
  LETTERS.map((l) => [l.id, l]),
)
