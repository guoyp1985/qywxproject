import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import CenterSales from '@/components/CenterSales'
import CenterOperating from '@/components/CenterOperating'
import CenterService from '@/components/CenterService'
import RetailerSales from '@/components/RetailerSales'
import RetailerSalechance from '@/components/RetailerSalechance'
import RetailerCustomerlist from '@/components/RetailerCustomerlist'
import RetailerAddorder from '@/components/RetailerAddorder'
import RetailerOrders from '@/components/RetailerOrders'
import RetailerShop from '@/components/RetailerShop'
import RetailerNews from '@/components/RetailerNews'
import RetailerProductlist from '@/components/RetailerProductlist'
import RetailerActivitylist from '@/components/RetailerActivitylist'
import RetailerRevenue from '@/components/RetailerRevenue'
import List from '@/components/DemoList'
import DemoList from '@/demo_list'

Vue.use(Router)

let routes = [
  // {
  //   path: '/',
  //   component: HelloWorld
  // },
  {
    path: '/',
    component: CenterSales
  },
  {
    path: '/centerSales',
    component: CenterSales
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
    path: '/retailerCustomerlist',
    component: RetailerCustomerlist
  },
  {
    path: '/retailerAddorder',
    component: RetailerAddorder
  },
  {
    path: '/retailerOrders',
    component: RetailerOrders
  },
  {
    path: '/retailerShop',
    component: RetailerShop
  },
  {
    path: '/retailerNews',
    component: RetailerNews
  },
  {
    path: '/retailerProductlist',
    component: RetailerProductlist
  },
  {
    path: '/retailerActivitylist',
    component: RetailerActivitylist
  },
  {
    path: '/retailerRevenue',
    component: RetailerRevenue
  }
]

const demos = DemoList.map((com) => {
  return {
    path: `@/components/${com.toLowerCase()}`,
    component: Vue.component(
    com,
    // 该 `import` 函数返回一个 `Promise` 对象。
    () => import('@/demos/' + com))
  }
})

routes = routes.concat(demos)

export default new Router({
  routes
})
