import Vue from 'vue'
import Router from 'vue-router'
import AllList from '@/components/AllList'
import AddList from '@/components/AddList'
import MondaiList from '@/components/MondaiList'
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'
import EditList from '@/components/EditList'
import MyPage from '@/components/MyPage'
import Profile from '@/components/Profile'
import Contact from '@/components/Contact'

Vue.use(Router)

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
