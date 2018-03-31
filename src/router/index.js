import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Center from '@/components/Center'
import CenterOperating from '@/components/CenterOperating'
import CenterService from '@/components/CenterService'
import List from '@/components/DemoList'
import DemoList from '@/demo_list'

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
