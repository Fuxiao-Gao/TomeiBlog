/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import ElementPlus from 'element-plus'

// store
import store from '@/store'

const app = createApp(App)

registerPlugins(app)

app.use(store)
app.use(ElementPlus)

app.mount('#app')


