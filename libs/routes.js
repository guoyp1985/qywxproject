import Center from '@/pages/Center'
import CenterSales from '@/pages/CenterSales'
import RetailerSales from '@/pages/RetailerSales'
import RetailerSalechance from '@/pages/RetailerSalechance'
import RetailerCustomerlist from '@/pages/RetailerCustomerlist'
import RetailerAddorder from '@/pages/RetailerAddorder'
import RetailerOrders from '@/pages/RetailerOrders'
import Store from '@/pages/Store'
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
import AddNews from '@/pages/AddNews'
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
import RebateApply from '@/pages/RebateApply'
import RebateStore from '@/pages/RebateStore'
import UserRebateInfo from '@/pages/UserRebateInfo'
import BringCustomer from '@/pages/BringCustomer'
import Chat from '@/pages/Chat'
import Pay from '@/pages/Pay'
import RetailerSaleview from '@/pages/RetailerSaleview'
import AccountDetail from '@/pages/AccountDetail'
import RetailerOrderDetail from '@/pages/RetailerOrderDetail'
import Deliverinfo from '@/pages/Deliverinfo'

export default [
  {
    path: '/',
    name: 'tIndex',
    component: Userproducts
  },
  {
    path: '/login',
    name: 'tLogin',
    component: QrLogin
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
    name: 'tRetailerCustomerList',
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
    path: '/retailerRevenue',
    name: 'tRetailerRevenue',
    component: RetailerRevenue
  },
  // {
  //   path: '/pages/',
  //   component: List
  // },
  // {
  //   path: '/retailerSales',
  //   name: 'tRetailerSales',
  //   component: RetailerSales
  // },
  // {
  //   path: '/retailerSalechance',
  //   name: 'tRetailerSalechance',
  //   component: RetailerSalechance
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
    path: '/orderDetail',
    name: 'tOrderDetail',
    component: OrderDetail
  },
  {
    path: '/shippingDetails',
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
    path: '/articles/:id',
    name: 'tArticle',
    component: Article
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
    path: '/AddNews',
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
    path: '/groupbuyStat',
    name: 'tGroupbuyStat',
    component: GroupbuyStat
  },
  {
    path: '/bargainbuyStat',
    name: 'tBargainbuyStat',
    component: BargainbuyStat
  },
  {
    path: '/activityStat',
    name: 'tActivityStat',
    component: ActivityStat
  },
  {
    path: '/newsStat',
    name: 'tNewStat',
    component: NewsStat
  },
  {
    path: '/productStat',
    name: 'tProductStat',
    component: ProductStat
  },
  {
    path: '/product',
    name: 'tProduct',
    component: Product
  },
  {
    path: '/bargainbuy',
    name: 'tBargainbuy',
    component: Bargainbuy
  },
  {
    path: '/bargainbuyView',
    name: 'tBargainbuyView',
    component: BargainbuyView
  },
  {
    path: '/bargainbuyDetail',
    name: 'tBargainbuyDetail',
    component: BargainbuyDetail
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
    path: '/pay/:id',
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
  }
]
