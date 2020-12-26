import { createApp } from 'vue'
import App from './App.vue'
import Router from './plugins/router'
import FontAwesomeIcon from './plugins/fontawesome'
import store from './store'

createApp(App)
    .use(store)
    .use(Router)
    .component('faIcon', FontAwesomeIcon)
    .mount('#app')
