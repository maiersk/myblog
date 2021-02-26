import { createApp } from 'vue'
import App from './App.vue'
import Router from './plugins/router'
import FontAwesomeIcon from './plugins/fontawesome'
import store from './store'
import hljs from 'highlight.js'

createApp(App)
    .use(store)
    .use(Router)
    .use(hljs.vuePlugin)
    .component('faIcon', FontAwesomeIcon)
    .mount('#app')
