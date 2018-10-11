import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top'
import AllList from './views/AllList'
import AddList from './views/AddList'
import MondaiList from './views/MondaiList'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import EditList from './views/EditList'
import MyPage from './views/MyPage'
import Profile from './views/Profile'
import Contact from './views/Contact'
import EditProfile from './views/EditProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mondailist',
      name: 'AllList',
      component: AllList
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
    }
  ]
})
