import { createApp } from 'vue'
import App from './App.vue'

import router from './router/router.js'
import vuetify from './plugins/vuetify'

import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'

// #region agent log
const debugLog = (hypothesisId, location, message, data = {}, runId = 'run-1') =>
  fetch('http://127.0.0.1:7326/ingest/c12464eb-4c1b-47b8-87aa-e668b344c232', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': 'c1cbc4'
    },
    body: JSON.stringify({
      sessionId: 'c1cbc4',
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now()
    })
  }).catch(() => {})
// #endregion

const app = createApp(App)

const pinia = createPinia()
// 👇 usar plugins correctamente en Vue 3
// #region agent log
debugLog('H3', 'src/main.js:35', 'init plugins start', {
  hasRouter: !!router,
  hasPiniaFactory: !!createPinia,
  hasVuetify: !!vuetify
})
// #endregion
app.use(router)
app.use(pinia)
// app.use(store)
app.use(vuetify)
// #region agent log
app.config.errorHandler = (err, instance, info) => {
  debugLog('H1', 'src/main.js:45', 'global vue error', {
    message: err?.message,
    stack: err?.stack?.split('\n').slice(0, 3).join(' | '),
    info,
    component: instance?.type?.name || 'unknown'
  })
}
window.addEventListener('error', event => {
  debugLog('H2', 'src/main.js:53', 'window error event', {
    message: event?.message,
    filename: event?.filename,
    lineno: event?.lineno,
    colno: event?.colno
  })
})
debugLog('H3', 'src/main.js:61', 'about to mount app', {})
// #endregion

app.mount('#app')
