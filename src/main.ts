import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@fontsource-variable/inter'
import '@fontsource/amiri-quran'
import '@fontsource/scheherazade-new/400.css'
import '@fontsource/scheherazade-new/700.css'
import './style.css'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
