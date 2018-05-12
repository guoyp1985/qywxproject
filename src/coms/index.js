/*
* 此文件废弃
*/
import Vue from 'vue'
import {
  AjaxPlugin,
  WechatPlugin,
  BusPlugin,
  LoadingPlugin,
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  TransferDom,
  Group,
  XInput,
  Popup,
  Alert,
  Datetime,
  Search,
  Loading,
  CheckIcon,
  XTextarea,
  Cell,
  XButton,
  XNumber,
  CellBox,
  ViewBox,
  XSwitch,
  Box,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Tab,
  TabItem,
  Sticky,
  Swiper,
  Panel,
  XImg,
  Grid,
  GridItem,
  Previewer,
  Card,
  Marquee,
  MarqueeItem,
  Confirm,
  SwiperItem,
  Timeline,
  TimelineItem,
  GroupTitle,
  Rater,
  Divider,
  Popover,
  XAddress,
  XDialog,
  CellFormPreview,
  PopupRadio,
  Flexbox,
  FlexboxItem,
  PopupHeader,
  Radio,
  Checker,
  CheckerItem,
  Countdown,
  WechatEmotion,
  Badge
} from 'vux'
import Orderproductplate from '@/components/Orderproductplate'
import Bargainbuy from '@/components/Bargainbuy'
import BargainbuyView from '@/components/BargainbuyView'
import BargainbuyDetail from '@/components/BargainbuyDetail'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import Forminputplate from '@/components/Forminputplate'
import FormGroupbuy from '@/components/FormGroupbuy'
import FormBargainbuy from '@/components/FormBargainbuy'
import FormDiscount from '@/components/FormDiscount'
import ClipPopup from '@/components/ClipPopup'
import CTitle from '@/components/CTitle'
import EmotionBox from '@/components/EmotionBox'
import Listplate from '@/components/Listplate'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import TitleTip from '@/components/TitleTip'
import Comment from '@/components/Comment'
import Reply from '@/components/Reply'
import CommentPopup from '@/components/CommentPopup'
import Editor from '@/components/Editor'
import OrderInfo from '@/components/OrderInfo'
import Orderitemplate from '@/components/Orderitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'

Vue.directive('transfer-dom', TransferDom)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('popup', Popup)
Vue.component('alert', Alert)
Vue.component('datetime', Datetime)
Vue.component('search', Search)
Vue.component('loading', Loading)
Vue.component('check-icon', CheckIcon)
Vue.component('x-textarea', XTextarea)
Vue.component('cell', Cell)
Vue.component('x-button', XButton)
Vue.component('x-number', XNumber)
Vue.component('cell-box', CellBox)
Vue.component('view-box', ViewBox)
Vue.component('x-switch', XSwitch)
Vue.component('box', Box)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('sticky', Sticky)
Vue.component('swiper', Swiper)
Vue.component('panel', Panel)
Vue.component('x-img', XImg)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('Previewer', Previewer)
Vue.component('card', Card)
Vue.component('marquee', Marquee)
Vue.component('marquee-item', MarqueeItem)
Vue.component('confirm', Confirm)
Vue.component('swiper-item', SwiperItem)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('group-title', GroupTitle)
Vue.component('rater', Rater)
Vue.component('divider', Divider)
Vue.component('popover', Popover)
Vue.component('x-address', XAddress)
Vue.component('x-dialog', XDialog)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('popup-radio', PopupRadio)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('popup-header', PopupHeader)
Vue.component('radio', Radio)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('countdown', Countdown)
Vue.component('emotion', WechatEmotion)
Vue.component('badge', Badge)

Vue.component('orderproductplate', Orderproductplate)
Vue.component('bargainbuy', Bargainbuy)
Vue.component('bargainbuy-view', BargainbuyView)
Vue.component('bargainbuy-detail', BargainbuyDetail)
Vue.component('bargainbuyitemplate', Bargainbuyitemplate)
Vue.component('share-success', ShareSuccess)
Vue.component('forminputplate', Forminputplate)
Vue.component('form-groupbuy', FormGroupbuy)
Vue.component('form-discount', FormDiscount)
Vue.component('form-bargainbuy', FormBargainbuy)
Vue.component('clip-popup', ClipPopup)
Vue.component('c-title', CTitle)
Vue.component('emotion-box', EmotionBox)
Vue.component('listplate', Listplate)
Vue.component('groupbuyitemplate', Groupbuyitemplate)
Vue.component('title-tip', TitleTip)
Vue.component('comment', Comment)
Vue.component('reply', Reply)
Vue.component('comment-popup', CommentPopup)
Vue.component('editor', Editor)
Vue.component('order-info', OrderInfo)
Vue.component('orderitemplate', Orderitemplate)
Vue.component('productitemplate', Productitemplate)
Vue.component('newsitemplate', Newsitemplate)

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
