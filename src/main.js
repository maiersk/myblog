import { createApp } from 'vue'
import App from './App.vue'
import Router from './plugins/router'
import FontAwesomeIcon from './plugins/fontawesome'

createApp(App)
    .use(Router)
    .component('faIcon', FontAwesomeIcon)
    .mount('#app')
