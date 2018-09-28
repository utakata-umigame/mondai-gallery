import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import MondaiView from '@/components/MondaiView'
import ListLinkView from '@/components/ListLinkView'
import MondaiDialog from '@/components/MondaiDialog'

Vue.use(Buefy)
Vue.prototype.$http = axios

Vue.component('mondai-view', MondaiView)
Vue.component('list-link', ListLinkView)
Vue.component('mondai-dialog', MondaiDialog)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
