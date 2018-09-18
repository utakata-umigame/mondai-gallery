import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import AllList from '@/components/AllList'
import AddList from '@/components/AddList'
import MondaiList from '@/components/MondaiList'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'
import EditList from '@/components/EditList'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AllList',
      component: AllList
    },
    {
      path: '/add',
      name: 'AddList',
      component: AddList
    },
    {
      path: '/myList/edit/:id',
      name: 'EditList',
      component: EditList
    },
    {
      path: '/myList/show/:id',
      name: 'MondaiList',
      component: MondaiList
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    }
  ]
})
