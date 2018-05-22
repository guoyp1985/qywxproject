/*
* 此文件废弃
*/
import AccountDetail from '@/pages/AccountDetail'
import Activity from '@/pages/Activity'
import Address from '@/pages/Address'
import AddActivity from '@/pages/AddActivity'
import AddNews from '@/pages/AddNews'
import AddProduct from '@/pages/AddProduct'
import Articles from '@/pages/Articles'
import AddOrder from '@/pages/AddOrder'
import BringCustomer from '@/pages/BringCustomer'
import Center from '@/pages/Center'
import CenterSales from '@/pages/CenterSales'
import Credit from '@/pages/Credit'
import Chat from '@/pages/Chat'
import DefaultStat from '@/pages/DefaultStat'
import DecorationShop from '@/pages/DecorationShop'
import Deliverinfo from '@/pages/Deliverinfo'
import Evaluation from '@/pages/Evaluation'
import Favorite from '@/pages/Favorite'
import KnowledgeClass from '@/pages/KnowledgeClass'
import Knowledge from '@/pages/Knowledge'
import MembersView from '@/pages/MembersView'
import Messages from '@/pages/Messages'
import NewAddress from '@/pages/NewAddress'
import News from '@/pages/News'
import OrderSearch from '@/pages/OrderSearch'
import OrderDetail from '@/pages/OrderDetail'
import Profile from '@/pages/Profile'
import Product from '@/pages/Product'
import Pay from '@/pages/Pay'
import Poster from '@/pages/Poster'
import PosterDetail from '@/pages/PosterDetail'
import Login from '@/pages/Login'
import RetailerSales from '@/pages/RetailerSales'
import RetailerSalechance from '@/pages/RetailerSalechance'
import RetailerCustomerlist from '@/pages/RetailerCustomerlist'
import RetailerAddorder from '@/pages/RetailerAddorder'
import RetailerOrders from '@/pages/RetailerOrders'
import RetailerNews from '@/pages/RetailerNews'
import RetailerProductlist from '@/pages/RetailerProductlist'
import RetailerActivitylist from '@/pages/RetailerActivitylist'
import RetailerRevenue from '@/pages/RetailerRevenue'
import Recommend from '@/pages/Recommend'
import RetailerSetting from '@/pages/RetailerSetting'
import RetailerGoodeazy from '@/pages/RetailerGoodeazy'
import RetailerMessagelist from '@/pages/RetailerMessagelist'
import RetailerApply from '@/pages/RetailerApply'
import RebateApply from '@/pages/RebateApply'
import RebateStore from '@/pages/RebateStore'
import RetailerSaleview from '@/pages/RetailerSaleview'
import RetailerOrderDetail from '@/pages/RetailerOrderDetail'
import Sos from '@/pages/Sos'
import Store from '@/pages/Store'
import Share from '@/pages/Share'
import Stat from '@/pages/Stat'
import ShippingDetails from '@/pages/ShippingDetails'
import ShareList from '@/pages/ShareList'
import SalesList from '@/pages/SalesList'
import SharingDetail from '@/pages/SharingDetail'
import SaleProducts from '@/pages/SaleProducts'
import Timeline from '@/pages/Timeline'
import Userproducts from '@/pages/Userproducts'
import UserRebateInfo from '@/pages/UserRebateInfo'

export default [
  {
    path: '/',
    name: 'tIndex',
    component: Center
  },
  {
    path: '/login',
    name: 'tLogin',
    component: Login
  },
  {
    path: '/center',
    name: 'tCenter',
    component: Center
  },
  {
    path: '/centerSales',
    name: 'tCenterSales',
    component: CenterSales
  },
  {
    path: '/retailerSales',
    name: 'tRetailerSales',
    component: RetailerSales
  },
  {
    path: '/retailerSalechance',
    name: 'tRetailerSalechance',
    component: RetailerSalechance
  },
  {
    path: '/retailerCustomerlist',
    name: 'tRetailerCustomerlist',
    component: RetailerCustomerlist
  },
  {
    path: '/retailerAddorder',
    name: 'tRetailerAddorder',
    component: RetailerAddorder
  },
  {
    path: '/retailerOrders',
    name: 'tRetailerOrder',
    component: RetailerOrders
  },
  {
    path: '/store',
    name: 'tStore',
    component: Store
  },
  {
    path: '/retailerNews',
    name: 'tRetailerNews',
    component: RetailerNews
  },
  {
    path: '/retailerProductlist',
    name: 'tRetailerProductlist',
    component: RetailerProductlist
  },
  {
    path: '/retailerActivitylist',
    name: 'tRetailerActivitylist',
    component: RetailerActivitylist
  },
  {
    path: '/activity',
    name: 'tActivity',
    component: Activity
  },
  {
    path: '/retailerRevenue',
    name: 'tRetailerRevenue',
    component: RetailerRevenue
  },
  // {
  //   path: '/pages/',
  //   component: List
  // },
  {
    path: '/profile',
    name: 'tProfile',
    component: Profile
  },
  {
    path: '/credit',
    name: 'tCredit',
    component: Credit
  },
  {
    path: '/share',
    name: 'tShare',
    component: Share
  },
  {
    path: '/sharingDetail',
    name: 'tSharingDetail',
    component: SharingDetail
  },
  {
    path: '/address',
    name: 'tAddress',
    component: Address
  },
  {
    path: '/newAddress',
    name: 'tNewAddress',
    component: NewAddress
  },
  {
    path: '/news',
    name: 'tNews',
    component: News
  },
  {
    path: '/favorite',
    name: 'tFavorite',
    component: Favorite
  },
  {
    path: '/messages',
    name: 'tMessages',
    component: Messages
  },
  {
    path: '/orderSearch',
    name: 'tOrderSearch',
    component: OrderSearch
  },
  {
    path: '/orderDetail/:id',
    name: 'tOrderDetail',
    component: OrderDetail
  },
  {
    path: '/shippingDetails/:id',
    name: 'tShippingDetails',
    component: ShippingDetails
  },
  {
    path: '/recommend',
    name: 'tRecommend',
    component: Recommend
  },
  {
    path: '/articles',
    name: 'tArticles',
    component: Articles
  },
  {
    path: '/evaluation',
    name: 'tEvaluation',
    component: Evaluation
  },
  {
    path: '/retailerSetting',
    name: 'tRetailerSetting',
    component: RetailerSetting
  },
  {
    path: '/userproducts',
    name: 'tUserproducts',
    component: Userproducts
  },
  {
    path: '/addActivity',
    name: 'tAddActivity',
    component: AddActivity
  },
  {
    path: '/addProduct',
    name: 'tAddProduct',
    component: AddProduct
  },
  {
    path: '/retailerGoodeazy',
    name: 'tRetailerGoodeazy',
    component: RetailerGoodeazy
  },
  {
    path: '/addNews',
    name: 'tAddNews',
    component: AddNews
  },
  {
    path: '/retailerMessagelist',
    name: 'tRetailerMessagelist',
    component: RetailerMessagelist
  },
  {
    path: '/defaultStat',
    name: 'tDefaultStat',
    component: DefaultStat
  },
  {
    path: '/product',
    name: 'tProduct',
    component: Product
  },
  {
    path: '/addOrder',
    name: 'tAddOrder',
    component: AddOrder
  },
  {
    path: '/membersView',
    name: 'tMembersView',
    component: MembersView
  },
  {
    path: '/shareList',
    name: 'tShareList',
    component: ShareList
  },
  {
    path: '/salesList',
    name: 'tSalesList',
    component: SalesList
  },
  {
    path: '/timeline',
    name: 'tTimeline',
    component: Timeline
  },
  {
    path: '/decorationShop',
    name: 'tDecorationShop',
    component: DecorationShop
  },
  {
    path: '/retailerApply',
    name: 'tRetailerApply',
    component: RetailerApply
  },
  {
    path: '/rebateApply',
    name: 'tRebateApply',
    component: RebateApply
  },
  {
    path: '/rebateStore',
    name: 'tRebateStore',
    component: RebateStore
  },
  {
    path: '/userRebateInfo',
    name: 'tUserRebateInfo',
    component: UserRebateInfo
  },
  {
    path: '/bringCustomer',
    name: 'tBringCustomer',
    component: BringCustomer
  },
  {
    path: '/chat',
    name: 'tChat',
    component: Chat
  },
  {
    path: '/pay',
    name: 'tPay',
    component: Pay
  },
  {
    path: '/retailerSaleview',
    name: 'tRetailerSaleview',
    component: RetailerSaleview
  },
  {
    path: '/accountDetail',
    name: 'tAccountDetail',
    component: AccountDetail
  },
  {
    path: '/retailerOrderDetail',
    name: 'tRetailerOrderDetail',
    component: RetailerOrderDetail
  },
  {
    path: '/deliverinfo',
    name: 'tDeliverinfo',
    component: Deliverinfo
  },
  {
    path: '/knowledgeClass',
    name: 'tKnowledgeClass',
    component: KnowledgeClass
  },
  {
    path: '/saleProducts',
    name: 'tSaleProducts',
    component: SaleProducts
  },
  {
    path: '/poster',
    name: 'tPoster',
    component: Poster
  },
  {
    path: '/posterDetail',
    name: 'tPosterDetail',
    component: PosterDetail
  },
  {
    path: '/stat',
    name: 'tStat',
    component: Stat
  },
  {
    path: '/knowledge',
    name: 'tKnowledge',
    component: Knowledge
  },
  {
    path: '/sos',
    name: 'tSos',
    component: Sos
  }
]
