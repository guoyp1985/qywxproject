<template>
  <div class="containerarea bg-page font14 rcustomerlist">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1 bg-white">
        <div class="row">
          <tab v-model="selectedIndex" class="v-tab">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container1">
        <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
          <search
            class="v-search bg-white"
            v-model='searchword1'
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            ref="search">
          </search>
          <div v-if="disOrderArea" class="condition font14 pl12 pr12 bg-white border-box color-lightgray">
            <div class="t-table w_100 orderbyarea">
              <div :class="`t-cell v_middle orderbyitem ${dateClass}`" @click="dateOrder">
                时间
                <span v-if="`${dateClass}` === 'active'" class="ico"></span>
                <span v-else class="al al-paixu font14"></span>
              </div>
              <div v-if="disAreaOrder" :class="`t-cell v_middle orderbyitem ${areaClass}`" @click="areaOrder">
                <div class="clamp1">
                  <span class="v_middle">{{ $t('Region') }}</span>
                  <span class="v_middle font12" v-if="selectedArea">( {{selectedArea}} )</span>
                  <span v-if="`${areaClass}` === 'active'" class="ico"></span>
                  <span v-else class="al al-paixu font14"></span>
                </div>
              </div>
              <div :class="`t-cell v_middle orderbyitem ${sexClass}`" @click="sexOrder">
                <div class="clamp1">
                  <span class="v_middle">性别</span>
                  <span class="v_middle font12" v-if="selectedSex">( {{selectedSex}} )</span>
                  <span v-if="`${sexClass}` === 'active'" class="ico"></span>
                  <span v-else class="al al-paixu font14"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="font12 pl12 pr12 b_bottom h35 list-shadow color-lightgray">
            <div class="t-table w_100">
              <div class="t-cell align_left ">{{ $t('Customer text') }}(共{{ tabcount1 }}人)</div>
              <div class="t-cell align_right w80">{{ $t('Percent') }}</div>
              <div class="t-cell align_right w60">{{ $t('Contact customer') }}</div>
            </div>
          </div>
          <div v-if="distabdata1" class="scroll_list">
            <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchresult1">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <!-- <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<span @click="toStore" class="color-blue">商品</span>或<span @click="toNews" class="color-blue">文章</span>给微信好友获得客户吧！</div> -->
                <div class="mt5">好可怜，一个客户都没有~<br />赶快分享商品或文章给微信好友获得客户吧！</div>
              </template>
            </div>
            <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pl12 pr12 bg-white mb10 list-shadow">
              <div class="t-table pb10">
                <div class="t-cell v_middle w70" @click="btnDetail(index)">
                  <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle" @click="btnDetail(index)">
                  <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                  <div class="clamp1 mt5 font14 color-gray">推荐人：{{item.recommendname}}</div>
                </div>
                <div class="t-cell v_middle w60 h_100 align_right">
                  <div class="percentarea db-in v_middle" @click="percentclick">
                    <div class="inner" :style="`width:${item.percent}%`"></div>
                    <div class="txt font12">{{ item.percent }}%</div>
                  </div>
                </div>
                <!-- <router-link :to="{path: '/chat', query: {uid: item.uid, fromModule: 'retailer', from: query.from}}" class="t-cell v_middle w60 align_right">
                  <div class="qbtnInfo bg-red color-white al al-asmkticon0165 font20"></div>
                </router-link> -->
                <div class="t-cell v_middle w60 align_right">
                  <div class="qbtnInfo bg-red color-white al al-asmkticon0165 font20" @click="btnDetail(index)"></div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="influence">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after" v-if="query.from" @click="toCard(item)">专属优惠券</div>
                    <div class="t-cell v_middle b_right_after" v-else @click="toTimeline(item)" :to="{path: '/timeline', query:{ uid: item.uid }}">客户行为</div>
                    <div class="t-cell v_middle b_right_after" v-if="item.priority" @click="priorityEvent(item,index)">取消置顶</div>
                    <div class="t-cell v_middle b_right_after" v-else @click="priorityEvent(item,index)">置顶</div>
                    <div class="t-cell v_middle b_right_after" @click="toChat(item)">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', 1)">
          <search
            class="v-search bg-white"
            v-model='searchword3'
            :auto-fixed="autofixed"
            @on-submit="onSubmit3"
            @on-change="onChange3"
            @on-cancel="onCancel3"
            ref="search">
          </search>
          <div class="font12 padding10 b_bottom color-lightgray">
            <div class="t-table w_100">
              <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount3 }}人)</div>
              <div class="t-cell align_center w80">{{ $t('Degree of intention') }}</div>
              <div class="t-cell align_center w60">{{ $t('Contact customer') }}</div>
            </div>
          </div>
          <div v-if="distabdata3" class="scroll_list ">
            <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchresult3">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">暂无意向客户，可到用户资料里设置客户意向程度</div>
              </template>
            </div>
            <div v-else v-for="(item,index) in tabdata3" :key="item.id" class="scroll_item pt10 pl12 pr12 bg-white mb10 list-shadow">
              <div class="t-table pb10" @click="btnDetail1(index)">
                <div class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                  <div class="clamp1 mt5 font14 color-gray">推荐人：{{item.recommendname}}</div>
                </div>
                <div class="t-cell v_middle w80 align_center color-orange">{{item.intentiondesc}}</div>
                <div class="t-cell v_middle w60 align_right">
                  <div class="qbtnInfo bg-red color-white al al-asmkticon0165 font20"></div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="influence">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after" @click="toTimeline(item)" :to="{path: '/timeline', query:{ uid: item.uid }}">客户行为</div>
                    <div class="t-cell v_middle b_right_after" v-if="item.priority" @click="priorityEvent(item,index)">取消置顶</div>
                    <div class="t-cell v_middle b_right_after" v-else @click="priorityEvent(item,index)">置顶</div>
                    <div class="t-cell v_middle b_right_after" @click="toChat(item)">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="(selectedIndex == 2)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 2)">
          <search
            class="v-search bg-white"
            v-model='searchword2'
            :auto-fixed="autofixed"
            @on-submit="onSubmit2"
            @on-change="onChange2"
            @on-cancel="onCancel2"
            ref="search">
          </search>
          <div class="font12 padding10 b_bottom color-lightgray">
            <div class="t-table w_100">
              <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount2 }}人)</div>
              <div class="t-cell align_right ">{{ $t('Contact customer') }}</div>
            </div>
          </div>
          <div v-if="distabdata2" class="scroll_list">
            <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchresult2">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <!-- <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<span @click="toStore" class="color-blue">商品</span>或<span @click="toNews" class="color-blue">文章</span>给微信好友获得客户吧！</div> -->
                <div class="mt5">好可怜，一个客户都没有~<br />赶快分享商品或文章给微信好友获得客户吧！</div>
              </template>
            </div>
            <div v-else v-for="(item,index) in tabdata2" :key="item.id" class="scroll_item pt10 pl12 pr12 bg-white mb10 list-shadow">
              <div class="t-table pb10" @click="btnDetail2(index)">
                <div class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                  <div class="clamp1 mt5 font14 color-gray">推荐人：{{item.recommendname}}</div>
                </div>
                <div class="t-cell v_middle w60 align_right">
                  <div class="qbtnInfo bg-red color-white al al-asmkticon0165 font20"></div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="influence">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after" @click="toTimeline(item)" :to="{path: '/timeline', query:{ uid: item.uid }}">客户行为</div>
                    <div class="t-cell v_middle b_right_after" v-if="item.priority" @click="priorityEvent(item,index)">取消置顶</div>
                    <div class="t-cell v_middle b_right_after" v-else @click="priorityEvent(item,index)">置顶</div>
                    <div class="t-cell v_middle b_right_after" @click="toChat(item)">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="isshowfluence" height="100%">
          <div class="popup1 font14">
            <div class="percentlayer">
              <div class="bg"></div>
              <div class="w_100 h_100 flex_center">
                <div class="layerinner align_left probability">
                  <div class="inner">
                    <div class="pro" >
                      <div class="pro-sucess">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是影响力</div>
                        </div>
                        <div class="font12" >影响力是指客户通过分享动作所带来的访问量，影响力数值越大，表示该客户越受朋友欢迎，所分享的内容打开率越高，可将影响力高的客户发展成代理，通过他的资源为你带来更多销量！</div>
                      </div>
                    </div>
                  </div>
                  <div class="pro-know">
                    <span class="close" @click="closepopup">知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="isshowpopup" height="100%">
          <div class="popup1 font14">
            <div class="percentlayer">
              <div class="bg"></div>
              <div class="w_100 h_100 flex_center">
                <div class="layerinner align_left probability">
                  <div class="inner">
                    <div class="pro" >
                      <div class="pro-sucess">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是成交概率</div>
                        </div>
                        <div class="font12" >成交概率是系统自动根据客户查看文章等行为，自动计算出该客户的真正成为购买客户的可能性。数字越大,可能性越大,成交概率就越高。</div>
                      </div>
                      <div class="pro-push">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">如何提升成交概率</div>
                        </div>
                        <div class="font12">1、推送客户感兴趣的文章;</div>
                        <div class="font12">2、发展更多的返点客。</div>
                      </div>
                    </div>
                  </div>
                  <div class="pro-know">
                    <span class="close" @click="closepopup">知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="red-popup">
        <popup v-model="showPopupSex">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Confirm')"
          :show-bottom-border="false"
          @on-click-left="showPopupSex = false"
          @on-click-right="listSex"></popup-header>
          <group gutter="0" class="red-radio">
            <radio
              v-model="sexKey"
              :options="sexArr"
              :selected-label-style="{color: '#ea3a3a'}"></radio>
          </group>
        </popup>
      </div>
      <div v-transfer-dom class="red-popup">
        <popup v-model="showPopupArea">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Confirm')"
          :show-bottom-border="false"
          @on-click-left="showPopupArea = false"
          @on-click-right="listArea"></popup-header>
          <group gutter="0" class="red-radio">
            <radio
              v-model="areaKey"
              :options="areaArr"
              :selected-label-style="{color: '#ea3a3a'}"></radio>
          </group>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, TransferDom, XImg, PopupHeader, Radio } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, XImg, Subscribe, ApplyTip, PopupHeader, Radio
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showApply: false,
      showContainer: false,
      autofixed: false,
      tabtxts: [ '潜在客户', '意向客户', '成交客户' ],
      tabcount1: 0,
      tabcount2: 0,
      tabcount3: 0,
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      isshowpopup: false,
      isshowfluence: false,
      searchword1: '',
      searchword2: '',
      searchword3: '',
      searchresult1: false,
      searchresult2: false,
      searchresult3: false,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      dateClass: 'active',
      areaClass: '',
      sexClass: '',
      orderby: '',
      orderbyParams: {},
      showPopupSex: false,
      sexKey: 0,
      sexArr: [
        { key: 0, value: '未知' },
        { key: 1, value: '男' },
        { key: 2, value: '女' }
      ],
      sexParams: {0: '未知', 1: '男', 2: '女'},
      showPopupArea: false,
      areaKey: 0,
      areaArr: [],
      disAreaOrder: false,
      disOrderArea: false,
      selectedArea: null,
      selectedSex: null,
      detailShow: false
    }
  },
  methods: {
    toPhone (item) {
      location.href = `tel:${item.mobile}`
    },
    priorityEvent (item, index) {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'stickcustomer', customeruid: item.uid }
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              if (self.selectedIndex === 0) {
                self.tabdata1[index].priority = !self.tabdata1[index].priority
              } else if (self.selectedIndex === 2) {
                self.tabdata2[index].priority = !self.tabdata2[index].priority
              } else if (self.selectedIndex === 1) {
                self.tabdata3[index].priority = !self.tabdata3[index].priority
              }
            }
          }
        })
      })
    },
    toMembersView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid, fromModule: 'retailer'})
      this.$router.push({path: '/chat', query: params})
    },
    toTimeline (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/timeline', query: params})
    },
    toCard (item) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.addCard}?uid=${item.uid}`})
      }
    },
    btnDetail (index) {
      for (var i = 0; i < this.tabdata1.length; i++) {
        if (i !== index && this.tabdata1[i].checked) {
          this.tabdata1[i].checked = false
          break
        }
      }
      this.tabdata1[index].checked = !this.tabdata1[index].checked
    },
    btnDetail1 (index) {
      for (var i = 0; i < this.tabdata3.length; i++) {
        if (i !== index && this.tabdata3[i].checked) {
          this.tabdata3[i].checked = false
          break
        }
      }
      this.tabdata3[index].checked = !this.tabdata3[index].checked
    },
    btnDetail2 (index) {
      for (var i = 0; i < this.tabdata2.length; i++) {
        if (i !== index && this.tabdata2[i].checked) {
          this.tabdata2[i].checked = false
          break
        }
      }
      this.tabdata2[index].checked = !this.tabdata2[index].checked
    },
    toStore () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.navigateTo({url: ENV.MiniRouter.store})
      } else {
        this.$router.push({path: '/store'})
      }
    },
    toNews () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.navigateTo({url: ENV.MiniRouter.contentsNews})
      } else {
        this.$router.push({path: '/store'})
      }
    },
    handleScroll (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
              self.pagestart3++
              self.$vux.loading.show()
              self.getData3()
            }
          } else if (index === 2) {
            if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
              self.pagestart2++
              self.$vux.loading.show()
              self.getData2()
            }
          }
        }
      })
    },
    removeOrderActive () {
      const self = this
      self.dateClass = self.dateClass.replace(' active', '').replace('active', '')
      self.areaClass = self.areaClass.replace(' active', '').replace('active', '')
      self.sexClass = self.sexClass.replace(' active', '').replace('active', '')
    },
    dateOrder () {
      const self = this
      self.selectedArea = null
      self.selectedSex = null
      if (self.dateClass.indexOf('active') < 0) {
        self.removeOrderActive()
        self.dateClass = 'active'
        self.orderbyParams = { orderby: 'dateline' }
      } else {
        self.removeOrderActive()
        self.dateClass = ''
        self.orderbyParams = {}
      }
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.getData1()
    },
    sexOrder () {
      this.showPopupSex = true
      this.removeOrderActive()
      this.sexClass = 'active'
    },
    listSex () {
      const self = this
      self.showPopupSex = false
      self.$vux.loading.show()
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.selectedArea = null
      self.orderbyParams = {orderby: 'sex', sex: self.sexKey}
      self.selectedSex = self.sexParams[self.sexKey]
      self.getData1()
    },
    areaOrder () {
      this.showPopupArea = true
      this.removeOrderActive()
      this.areaClass = 'active'
    },
    listArea () {
      const self = this
      self.showPopupArea = false
      self.$vux.loading.show()
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.selectedSex = null
      self.orderbyParams = { orderby: 'province', province: self.areaArr[self.areaKey].value }
      self.selectedArea = self.orderbyParams.province
      self.getData1()
    },
    getData1 () {
      const self = this
      this.$vux.loading.show()
      let params = { tolevel: -1, pagestart: self.pagestart1, limit: self.limit }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      if (typeof self.orderby !== 'undefined' && self.orderby && self.$util.trim(self.orderby) !== '') {
        params.orderby = self.orderby
      }
      for (let key in self.orderbyParams) {
        params[key] = self.orderbyParams[key]
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount1 = data.count
        if (data.provinces.length === 0) {
          self.disAreaOrder = false
        } else {
          if (self.areaArr.length === 0) {
            for (let i = 0; i < data.provinces.length; i++) {
              self.areaArr.push({key: i, value: data.provinces[i]})
            }
          }
          self.disAreaOrder = true
        }
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (self.tabdata1.length > 0) {
          self.disOrderArea = true
        } else if (!self.orderbyParams.orderby) {
          self.disOrderArea = false
        }
      })
    },
    getData2 () {
      const self = this
      this.$vux.loading.show()
      let keyword = self.searchword2
      let params = { params: { tolevel: 5, pagestart: self.pagestart2, limit: self.limit } }
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount2 = data.count
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
        console.log(self.tabdata2)
      })
    },
    getData3 () {
      const self = this
      this.$vux.loading.show()
      let keyword = self.searchword3
      let params = { params: { tolevel: 100, pagestart: self.pagestart3, limit: self.limit } }
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult3 = true
        params.params.keyword = keyword
      } else {
        self.searchresult3 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount3 = data.count
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onChange3 (val) {
      this.searchword3 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onCancel2 () {
      const self = this
      self.searchword2 = ''
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getData2()
    },
    onCancel3 () {
      const self = this
      self.searchword3 = ''
      self.$vux.loading.show()
      self.distabdata3 = false
      self.tabdata3 = []
      self.pagestart3 = 0
      self.getData3()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getData2()
    },
    onSubmit3 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata3 = false
      self.tabdata3 = []
      self.pagestart3 = 0
      self.getData3()
    },
    clickTab () {
      this.swiperChange()
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < this.limit) {
            self.pagestart1 = 0
            self.distabdata1 = false
            this.tabdata1 = []
            if (!self.orderbyParams || !self.orderbyParams.orderby) {
              if (this.query.type === 'customer') {
                self.orderbyParams = {}
              } else {
                self.orderbyParams = {orderby: 'dateline'}
              }
            }
            // self.orderbyParams = {}
            // if (self.dateClass.indexOf('active') > -1) {
            //   self.orderbyParams = { orderby: 'dateline' }
            // }
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata3.length < this.limit) {
            self.pagestart3 = 0
            self.distabdata3 = false
            this.tabdata3 = []
            self.getData3()
          }
          break
        case 2:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            self.distabdata2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
      }
    },
    influence () {
      this.isshowfluence = true
    },
    percentclick () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
      this.isshowfluence = false
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'customerlist'
      })
    },
    init () {
      this.getData()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // } else {
        this.query = this.$route.query
        if (this.query.type === 'customer') {
          self.dateClass = ''
        }
        if (!this.loginUser.isretailer) {
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          document.title = this.loginUser.retailerinfo.title
          this.showContainer = true
          this.swiperChange()
        }
        // }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.rcustomerlist{
  .phone{width:20px;height:20px;background-color:red;color:#fff;border-radius:5px;text-align:center;line-height:20px;}
  .detailInfo{
    background-color:#fff;display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
    .txt-item{width:50%;box-sizing:border-box;line-height:25px;position:relative;}
    .txt-item:nth-child(odd){padding-right:5px;}
    .txt-item:nth-child(even){padding-left:5px;}
  }
}
.rcustomerlist .qbtnInfo{
  display: inline-block;
  vertical-align: middle;
  border-radius: 50px;
  text-align: center;
  padding: 2px 10px;
  font-size: 14px;
  line-height: 1;
}
.rcustomerlist .condition{
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
}
.rcustomerlist .h35{
  height: 35px;
  line-height: 35px;
}
.orderbyarea .orderbyitem{
  position:relative;
  text-align:center;
}
.orderbyarea .orderbyitem.active{color: #ea3a3a;}
.orderbyarea .orderbyitem:not(:last-child):after{
  content: "";
  position: absolute;
  right:0;
  top:50%;
  margin-top:-8px;
  height: 16px;
  width: 1px;
  background-color: #f5f5f5;
}
.orderbyarea .orderbyitem.active .ico:after{
  content: '▼';font-size:12px;margin-left:5px;
}
</style>
