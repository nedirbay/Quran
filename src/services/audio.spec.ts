import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { audioUrls } from '@/config'
import { useAudio } from './audio'
import { applyLocalAudioManifest, applyTtsManifest } from './localAudio'

describe('ses çeşmeleriniň tertibi', () => {
  afterEach(() => applyLocalAudioManifest(null))

  it('manifest ýok bolsa diňe onlaýn salgy', () => {
    applyLocalAudioManifest(null)
    expect(audioUrls.ayahSources('Husary_128kbps', 1, 2)).toEqual([
      'https://everyayah.com/data/Husary_128kbps/001002.mp3',
    ])
    expect(audioUrls.wordSources(112, 1, 3)).toEqual(['https://audio.qurancdn.com/wbw/112_001_003.mp3'])
  })

  it('kary ýüklenen bolsa ilki ýerli faýl, soňra onlaýn', () => {
    applyLocalAudioManifest({ ayahs: { Husary_128kbps: 102 }, words: true })
    expect(audioUrls.ayahSources('Husary_128kbps', 1, 2)).toEqual([
      '/audio/ayahs/Husary_128kbps/001002.mp3',
      'https://everyayah.com/data/Husary_128kbps/001002.mp3',
    ])
    expect(audioUrls.wordSources(112, 1, 3)[0]).toBe('/audio/words/112_001_003.mp3')
  })

  it('başga kary ýüklenen bolsa — diňe onlaýn', () => {
    applyLocalAudioManifest({ ayahs: { Alafasy_128kbps: 102 }, words: false })
    expect(audioUrls.ayahSources('Husary_128kbps', 1, 2)).toHaveLength(1)
    expect(audioUrls.wordSources(112, 1, 3)).toHaveLength(1)
  })
})

describe('audio.play — çeşmeden çeşmä geçmek', () => {
  const played: string[] = []
  let failing = new Set<string>()

  /** Brauzeriň Audio elementiniň ýönekeý nusgasy */
  class FakeAudio {
    preload = ''
    playbackRate = 1
    private listeners: Record<string, (() => void)[]> = {}
    src: string
    constructor(src: string) {
      this.src = src
    }
    addEventListener(type: string, fn: () => void) {
      ;(this.listeners[type] ??= []).push(fn)
    }
    removeAttribute() {}
    pause() {}
    play() {
      played.push(this.src)
      setTimeout(() => (this.listeners[failing.has(this.src) ? 'error' : 'ended'] ?? []).forEach((f) => f()), 0)
      return Promise.resolve()
    }
  }

  beforeEach(() => {
    played.length = 0
    ;(globalThis as unknown as { Audio: unknown }).Audio = FakeAudio
  })

  it('ýerli faýl şowsuz bolsa onlaýn salga geçýär', async () => {
    failing = new Set(['local-1.mp3'])
    await useAudio().play({ url: ['local-1.mp3', 'online-1.mp3'] }, 'k1')
    expect(played).toEqual(['local-1.mp3', 'online-1.mp3'])
  })

  it('ýerli faýl işlese onlaýna sorag gitmeýär', async () => {
    failing = new Set()
    await useAudio().play({ url: ['local-2.mp3', 'online-2.mp3'] }, 'k2')
    expect(played).toEqual(['local-2.mp3'])
  })

  it('şowsuz bolan salgy ýatda saklanýar we gaýtadan synanyşylmaýar', async () => {
    failing = new Set(['local-3.mp3'])
    const audio = useAudio()
    await audio.play({ url: ['local-3.mp3', 'online-3.mp3'] }, 'k3')
    played.length = 0
    await audio.play({ url: ['local-3.mp3', 'online-3.mp3'] }, 'k3b')
    expect(played).toEqual(['online-3.mp3'])
  })

  it('ýeke salgy (string) hem kabul edilýär', async () => {
    failing = new Set()
    await useAudio().play({ url: 'single.mp3' }, 'k4')
    expect(played).toEqual(['single.mp3'])
  })
})

describe('mysal sesleri (npm run audio:tts)', () => {
  afterEach(() => applyTtsManifest(null))

  it('döredilmedik bolsa boş — göni TTS, 404 ýok', () => {
    applyTtsManifest(null)
    expect(audioUrls.exampleSources('ex-ba')).toEqual([])
  })

  it('döredilen bolsa ýerli faýl', () => {
    applyTtsManifest({ voice: 'ar-SA-HamedNeural', letters: 112, examples: 63 })
    expect(audioUrls.exampleSources('rule-sedde-0')).toEqual(['/audio/examples/rule-sedde-0.mp3'])
  })
})
