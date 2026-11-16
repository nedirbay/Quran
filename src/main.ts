import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@fontsource-variable/inter'
import '@fontsource/amiri-quran'
import '@fontsource/scheherazade-new/400.css'
import '@fontsource/scheherazade-new/700.css'
import './style.css'

import App from './App.vue'
import { router } from './router'
import { loadLocalAudioManifest } from './services/localAudio'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// Offline sesleriň bardygyny barlaýarys (garaşmaýarys — ýok bolsa onlaýn çeşmeler ulanylýar)
loadLocalAudioManifest()
