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
import RetailerSetting from '@/components/RetailerSetting'
import Userproducts from '@/components/Userproducts'
import AddActivity from '@/components/AddActivity'
import AddProduct from '@/components/AddProduct'
import RetailerGoodeazy from '@/components/RetailerGoodeazy'
import ServiceAddnews from '@/components/ServiceAddnews'
import RetailerMessagelist from '@/components/RetailerMessagelist'
import DefaultStat from '@/components/DefaultStat'
import GroupbuyStat from '@/components/GroupbuyStat'
import BargainbuyStat from '@/components/BargainbuyStat'
import ActivityStat from '@/components/ActivityStat'
import NewsStat from '@/components/NewsStat'
import ProductStat from '@/components/ProductStat'
import Product from '@/components/Product'
import Bargainbuy from '@/components/Bargainbuy'
import Bargainbuyview from '@/components/Bargainbuyview'
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
  },
  {
    path: '/retailerSetting',
    component: RetailerSetting
  },
  {
    path: '/userproducts',
    component: Userproducts
  },
  {
    path: '/addActivity',
    component: AddActivity
  },
  {
    path: '/addProduct',
    component: AddProduct
  },
  {
    path: '/retailerGoodeazy',
    component: RetailerGoodeazy
  },
  {
    path: '/serviceAddnews',
    component: ServiceAddnews
  },
  {
    path: '/retailerMessagelist',
    component: RetailerMessagelist
  },
  {
    path: '/defaultStat',
    component: DefaultStat
  },
  {
    path: '/groupbuyStat',
    component: GroupbuyStat
  },
  {
    path: '/bargainbuyStat',
    component: BargainbuyStat
  },
  {
    path: '/activityStat',
    component: ActivityStat
  },
  {
    path: '/newsStat',
    component: NewsStat
  },
  {
    path: '/productStat',
    component: ProductStat
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/bargainbuy',
    component: Bargainbuy
  },
  {
    path: '/bargainbuyview',
    component: Bargainbuyview
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
