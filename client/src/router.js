import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top'
import AddList from './views/AddList'
import Home from './views/Home'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import EditList from './views/EditList'
import MyPage from './views/MyPage'
import Profile from './views/Profile'
import Contact from './views/Contact'
import EditProfile from './views/EditProfile'
import MondaiList from './views/MondaiList'
import EditSchedule from './views/EditSchedule'
import EditMilestone from './views/EditMilestone'

import store from './store'

Vue.use(Router)
const routes = [
  {
    path: '/mondailist',
    name: 'Home',
    meta: {
      isPublic: true
    },
    component: Home
  },
  {
    path: '/',
    name: 'Top',
    meta: {
      isPublic: true
    },
    component: Top
  },
  {
    path: '/add',
    name: 'AddList',
    component: AddList
  },
  {
    path: '/mondaiList/edit/:id',
    name: 'EditList',
    component: EditList
  },
  {
    path: '/mondaiList/show/:id',
    name: 'MondaiList',
    meta: {
      isPublic: true
    },
    component: MondaiList
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: {
      isPublic: true
    },
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isPublic: true
    },
    component: LogIn
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/mypage/edit',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/profile/show/:id',
    name: 'Profile',
    meta: {
      isPublic: true
    },
    component: Profile
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      isPublic: true
    },
    component: Contact
  },
  {
    path: '/schedule/edit/:id',
    name: 'EditSchedule',
    component: EditSchedule
  },
  {
    path: '/milestone/edit/:id',
    name: 'EditMilestone',
    component: EditMilestone,
    meta: {
      isPublic: true
    }
  }
]
let router = new Router({
  mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  let user = {}
  let txt = localStorage.user
  if (!user) {
    user = store.state.user
  } else {
    user = JSON.parse(txt)
  }
  if (to.matched.some(record => !record.meta.isPublic) && !user.username) {
    next({ path: '/login' })
  } else {
    next()
  }
})
export default router
