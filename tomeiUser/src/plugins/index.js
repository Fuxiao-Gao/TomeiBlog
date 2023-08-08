/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
//import cache from './cache'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
  //app.config.globalProperties.$cache = cache;
}
