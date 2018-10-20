import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.min.css'

import MondaiView from '@/components/MondaiView'
import ListLinkView from '@/components/ListLinkView'
import MondaiDialog from '@/components/MondaiDialog'
import MondaiEditor from '@/components/MondaiEditor'
import AccountLink from '@/components/AccountLink'
import AllList from '@/components/AllList'
import './registerServiceWorker'

Vue.use(VueLocalStorage)
Vue.use(Buefy)
Vue.prototype.$http = axios
Vue.prototype.$endPoint = function (uri) {
  // 開発用APIエンドポイント
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000' + uri
  else return uri
}

Vue.component('mondai-view', MondaiView)
Vue.component('list-link', ListLinkView)
Vue.component('mondai-dialog', MondaiDialog)
Vue.component('mondai-editor', MondaiEditor)
Vue.component('account-link', AccountLink)
Vue.component('all-list', AllList)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
