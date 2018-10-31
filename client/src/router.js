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

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mondailist',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Top',
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
      component: Profile
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/schedule/edit/:id',
      name: 'EditSchedule',
      component: EditSchedule
    }
  ]
})
