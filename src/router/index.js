import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Center from '@/components/Center'
import CenterOperating from '@/components/CenterOperating'
import CenterService from '@/components/CenterService'
import RetailerSales from '@/components/RetailerSales'
import RetailerSalechance from '@/components/RetailerSalechance'
import Profile from '@/components/Profile'
import Credit from '@/components/Credit'
import Share from '@/components/Share'
import Address from '@/components/Address'
import NewAddress from '@/components/NewAddress'
import Favorite from '@/components/Favorite'
import List from '@/components/DemoList'
// import DemoList from '@/demo_list'

Vue.use(Router)

let routes = [
  // {
  //   path: '/',
  //   component: HelloWorld
  // },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/centerOperating',
    component: CenterOperating
  },
  {
    path: '/centerService',
    component: CenterService
  },
  {
    path: '/components/',
    component: List
  },
  {
    path: '/retailerSales',
    component: RetailerSales
  },
  {
    path: '/retailerSalechance',
    component: RetailerSalechance
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/credit',
    component: Credit
  },
  {
    path: '/share',
    component: Share
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/address/:id',
    component: NewAddress
  },
  {
    path: '/favorite',
    component: Favorite
  }
]

// const demos = DemoList.map((com) => {
//   return {
//     path: `@/components/${com.toLowerCase()}`,
//     component: Vue.component(
//     com,
//     // 该 `import` 函数返回一个 `Promise` 对象。
//     () => import('@/demos/' + com))
//   }
// })
//
// routes = routes.concat(demos)

export default new Router({
  routes
})
