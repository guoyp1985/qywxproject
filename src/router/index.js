import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/pages/HelloWorld'
import Center from '@/pages/Center'
import CenterSales from '@/pages/CenterSales'
// import CenterOperating from '@/pages/CenterOperating'
// import CenterService from '@/pages/CenterService'
import RetailerSales from '@/pages/RetailerSales'
import RetailerSalechance from '@/pages/RetailerSalechance'
import RetailerCustomerlist from '@/pages/RetailerCustomerlist'
import RetailerAddorder from '@/pages/RetailerAddorder'
import RetailerOrders from '@/pages/RetailerOrders'
import RetailerShop from '@/pages/RetailerShop'
import RetailerNews from '@/pages/RetailerNews'
import RetailerProductlist from '@/pages/RetailerProductlist'
import RetailerActivitylist from '@/pages/RetailerActivitylist'
import RetailerRevenue from '@/pages/RetailerRevenue'
import Profile from '@/pages/Profile'
import Credit from '@/pages/Credit'
import Share from '@/pages/Share'
import Address from '@/pages/Address'
import NewAddress from '@/pages/NewAddress'
import Favorite from '@/pages/Favorite'
import OrderSearch from '@/pages/OrderSearch'
import OrderDetail from '@/pages/OrderDetail'
import ShippingDetails from '@/pages/ShippingDetails'
import Recommend from '@/pages/Recommend'
import Articles from '@/pages/Articles'
import Article from '@/pages/Article'
import RetailerSetting from '@/pages/RetailerSetting'
import Userproducts from '@/pages/Userproducts'
import AddActivity from '@/pages/AddActivity'
import AddProduct from '@/pages/AddProduct'
import RetailerGoodeazy from '@/pages/RetailerGoodeazy'
import ServiceAddnews from '@/pages/ServiceAddnews'
import RetailerMessagelist from '@/pages/RetailerMessagelist'
import DefaultStat from '@/pages/DefaultStat'
import GroupbuyStat from '@/pages/GroupbuyStat'
import BargainbuyStat from '@/pages/BargainbuyStat'
import ActivityStat from '@/pages/ActivityStat'
import NewsStat from '@/pages/NewsStat'
import ProductStat from '@/pages/ProductStat'
import Product from '@/pages/Product'
import Bargainbuy from '@/pages/Bargainbuy'
import BargainbuyView from '@/pages/BargainbuyView'
import BargainbuyDetail from '@/pages/BargainbuyDetail'
import AddOrder from '@/pages/AddOrder'
import MembersView from '@/pages/MembersView'
import ShareList from '@/pages/ShareList'
import SalesList from '@/pages/SalesList'
import Timeline from '@/pages/Timeline'
import QrLogin from '@/pages/QrLogin'
import Messages from '@/pages/Messages'
import Evaluation from '@/pages/Evaluation'
import SharingDetail from '@/pages/SharingDetail'
import DecorationShop from '@/pages/DecorationShop'
import RetailerApply from '@/pages/RetailerApply'
// import List from '@/pages/DemoList'
// import DemoList from '@/demo_list'

Vue.use(Router)

let routes = [
  // {
  //   path: '/',
  //   component: HelloWorld
  // },
  {
    path: '/login',
    name: 'login',
    component: QrLogin
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/centerSales',
    component: CenterSales
  },
  // {
  //   path: '/centerOperating',
  //   component: CenterOperating
  // },
  // {
  //   path: '/centerService',
  //   component: CenterService
  // },
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
  // {
  //   path: '/pages/',
  //   component: List
  // },
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
    name: 'profile',
    component: Profile
  },
  {
    path: '/credit',
    name: 'credit',
    component: Credit
  },
  {
    path: '/share',
    component: Share
  },
  {
    path: '/sharingDetail',
    name: 'sharingDetail',
    component: SharingDetail
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
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages
  },
  {
    path: '/orderSearch',
    component: OrderSearch
  },
  {
    path: '/orderDetail',
    component: OrderDetail
  },
  {
    path: '/shippingDetails',
    component: ShippingDetails
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/articles',
    component: Articles
  },
  {
    path: '/articles/:id',
    component: Article
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: Evaluation
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
    path: '/bargainbuyView',
    component: BargainbuyView
  },
  {
    path: '/bargainbuyDetail',
    component: BargainbuyDetail
  },
  {
    path: '/addOrder',
    component: AddOrder
  },
  {
    path: '/membersView',
    component: MembersView
  },
  {
    path: '/shareList',
    component: ShareList
  },
  {
    path: '/salesList',
    component: SalesList
  },
  {
    path: '/timeline',
    component: Timeline
  },
  {
    path: '/decorationShop',
    component: DecorationShop
  },
  {
    path: '/retailerApply',
    component: RetailerApply
  }
]

// const demos = DemoList.map((com) => {
//   return {
//     path: `@/pages/${com.toLowerCase()}`,
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
