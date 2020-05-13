<template>
  <div class="containerarea bg-page font14 sellerlist-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1" style="height:99px;">
        <div class="row">
          <search
            class="v-search bg-white"
            v-model='searchword1'
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            ref="search">
          </search>
          <template v-if="disSearchList">
            <div class="flex_center" style="width:100%;height:44px;">搜索结果</div>
          </template>
          <template v-else>
            <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
              <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
            </tab>
          </template>
        </div>
      </div>
      <div class="s-container scroll-container" style="top:99px;" ref="scrollContainer">
        <template v-if="disSearchList">
          <div class="swiper-inner" ref="searchScrollContainer" @scroll="handleSearchScroll('searchScrollContainer')">
            <template v-if="disSearchData">
              <template v-if="!searchData.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>暂无搜索结果</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="scroll_list ">
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in searchData" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.identity && item.identity != 'W'">卖家等级: {{item.identity}}</div>
                        <div class="clamp1 font12 color-gray">店铺: {{item.title}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.uploader > 0">推荐人: {{item.uploadname}}</div>
                        <div class="clamp1 font12 color-orange">销售额: {{ $t('RMB') }}{{item.salesmoney}}</div>
                      </div>
                      <div class="align_right t-cell v_middle w80">
                        <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                          <i class="al al-asmkticon0165 v_middle"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </template>
        <template v-else>
          <!-- 全部合伙人 -->
          <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
            <template v-if="disTabData1">
              <template v-if="!tabData1.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>分享【加盟二维码】给好友，好友扫码即可成为全职卖家帮你销售商品</div>
                        <div class="color-blue"><span @click="disJoinQrcode">分享加盟二维码</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="pro_box bg-page list_shadow pl12 pr12 pb15  border-box">
                  <div class="pro_list_top"></div>
                  <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                    <div>什么是全职卖家？</div>
                    <div>指公司内部的销售员或只允许销售本厂家商品的卖家。</div>
                    <div>如何发展全职卖家？</div>
                    <div>1、扫描【加盟二维码】申请加盟的卖家即可成为全职卖家。</div>
                    <div>2、通过【优惠码】申请的卖家即可成为全职卖家。</div>
                  </div>
                </div>
                <div class="scroll_list ">
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData1" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.identity && item.identity != 'W'">卖家等级: {{item.identity}}</div>
                        <div class="clamp1 font12 color-gray">店铺: {{item.title}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.uploader > 0">推荐人: {{item.uploadname}}</div>
                        <div class="clamp1 font12 color-orange">销售额: {{ $t('RMB') }}{{item.salesmoney}}</div>
                      </div>
                      <div class="align_right t-cell v_middle w80">
                        <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                          <i class="al al-asmkticon0165 v_middle"></i>
                        </div>
                      </div>
                		</div>
                  </div>
                </div>
              </template>
            </template>
          </div>
          <!--  待审核合伙人 -->
          <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
            <template v-if="disTabData2">
              <template v-if="!tabData2.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>分享【厂家介绍】给好友，好友申请加盟即可成为兼职卖家帮你销售商品</div>
                        <div class="color-blue"><router-link :to="{path: '/factoryDetail',query:{fid:fid}}">分享厂家介绍</router-link></div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="scroll_list " >
                  <div class="flex_around">
                    <div class="doBtn" @click="allchoose()">全选</div>
                    <div class="doBtn" @click="agree()">同意</div>
                    <div class="doBtn" @click="refuse()">拒绝</div>
                  </div>
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData2" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.identity && item.identity != 'W'">卖家等级: {{item.identity}}</div>
                        <div class="clamp1 font12 color-gray">店铺: {{item.title}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.uploader > 0">推荐人: {{item.uploadname}}</div>
                        <div class="clamp1 font12 color-orange">销售额: {{ $t('RMB') }}{{item.salesmoney}}</div>
                      </div>
                      <div class="align_right t-cell v_middle w80" >
                        <input ref="inputCheckbox" type="checkbox" :value="item.uid" :data-uid="item.uid"/>
                      </div>
                		</div>
                  </div>
                </div>
              </template>
            </template>
          </div>
          <!-- 经理 -->
          <div v-show="(selectedIndex == 2)" class="swiper-inner" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',2)">
            <template v-if="disTabData3">
              <template v-if="!tabData3.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>分享【厂家介绍】给好友，好友申请加盟即可成为兼职卖家帮你销售商品</div>
                        <div class="color-blue"><router-link :to="{path: '/factoryDetail',query:{fid:fid}}">分享厂家介绍</router-link></div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="pro_box bg-page list_shadow pl12 pr12 pb15  border-box">
                  <div class="pro_list_top"></div>
                  <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                    <div>什么是全职卖家？</div>
                    <div>指公司内部的销售员或只允许销售本厂家商品的卖家。</div>
                    <div>如何发展全职卖家？</div>
                    <div>1、扫描【加盟二维码】申请加盟的卖家即可成为全职卖家。</div>
                    <div>2、通过【优惠码】申请的卖家即可成为全职卖家。</div>
                  </div>
                </div>
                <div class="scroll_list ">
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData3" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.identity && item.identity != 'W'">卖家等级: {{item.identity}}</div>
                        <div class="clamp1 font12 color-gray">店铺: {{item.title}}</div>
                        <div class="clamp1 font12 color-gray" v-if="item.uploader > 0">推荐人: {{item.uploadname}}</div>
                        <div class="clamp1 font12 color-orange">销售额: {{ $t('RMB') }}{{item.salesmoney}}</div>
                      </div>
                      <div class="align_right t-cell v_middle w80">
                        <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                          <i class="al al-asmkticon0165 v_middle"></i>
                        </div>
                      </div>
                		</div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </template>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <div class="item" v-if="clickData.identity == 'D'">
                <div class="inner" @click="clickPopup('pay')">关闭合伙人</div>
              </div>
                <div class="item" v-if="clickData.identity == 'D'">
                  <div class="inner" @click="clickPopup('upC')">升级到C</div>
                </div>
                <div class="item" v-if="clickData.identity == 'C'">
                  <div class="inner" @click="clickPopup('upB')">升级到B</div>
                </div>
                <div class="item" v-if="selectedIndex != 1">
                  <div class="inner" @click="clickPopup('level')">推荐记录</div>
                </div>
                <div class="item" v-if="clickData.identity == 'D'">
                  <div class="inner" @click="clickPopup('uploader')">修改推荐人</div>
                </div>
                <div class="item" v-if="clickData.identity == 'C'">
                  <div class="inner" @click="clickPopup('fulltime')">降级</div>
                </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showQrcode" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">{{$t('Join qrcode')}}</div>
            <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
              <img ref="joinQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
            </div>
            <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
              <div>保存图片发送给好友，邀请加盟</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeQrcode">{{ $t('Close') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showLevelPopup" height="100%">
         <div class="popup1">
            <div class="popup-top flex_center">推荐记录</div>
            <div class="popup-middle font14 padding10" style="box-sizing:border-box;" ref="userScrollContainer3" @scroll="handleScroll1('userScrollContainer3',2)">
              <template v-if="disUserData3">
                <template v-if="!userData3.length">
                  <div class="padding10 align_center color-gray">暂无数据</div>
                </template>
                <div v-else class="scroll_list">
                  <div v-for="(item,index) in userData3" :key="index" class="scroll_item">
                    <div class="x-check-icon pl12 pr12 pt10 pb10">
                      <div class="t-table">
                        <div class="t-cell v_middle w60">
                          <img :src="item.avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font14">{{item.linkman}}</div>
                          <div class="clamp1 font12 mt5 color-999">用户ID: {{item.wid}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
      					</div>
              </template>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeLevelPopup">{{ $t('Close') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showUploaderPopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">更改推荐人</div>
            <div style="position:absolute;top:46px;width:100%;box-sizing:border-box;height:55px;">
              <search
                class="v-search bg-white"
                v-model='searchword2'
                :auto-fixed="autofixed"
                @on-submit="onSubmit2"
                @on-change="onChange2"
                @on-cancel="onCancel2"
                ref="search">
              </search>
            </div>
            <div class="popup-middle font14 padding10" style="top:101px;box-sizing:border-box;" ref="userScrollContainer1" @scroll="handleScroll1('userScrollContainer1',0)">
              <template v-if="disUserData1">
                <template v-if="!userData1.length">
                  <div class="padding10 align_center color-gray" v-if="searchword2 != ''">暂无搜索结果</div>
                  <div class="padding10 align_center color-gray" v-else>请搜索用户</div>
                </template>
                <div v-else class="scroll_list">
                  <div v-for="(item,index) in userData1" :key="index" class="scroll_item">
                    <check-icon class="x-check-icon pl12 pr12 pt10 pb10" :value.sync="item.checked" @click.native.stop="uploaderClick1(item,index)">
                      <div class="t-table">
                        <div class="t-cell v_middle w60">
                          <img :src="item.avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font14">{{item.linkman}}</div>
                          <div class="clamp1 font12 mt5 color-999">店铺名称: {{item.title}}</div>
                        </div>
                      </div>
                    </check-icon>
                  </div>
      					</div>
              </template>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeUploaderPopup">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitUploader">提交</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showFulltimePopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">选择新的C级</div>
            <div style="position:absolute;top:46px;width:100%;box-sizing:border-box;height:55px;">
              <search
                class="v-search bg-white"
                v-model='searchword3'
                :auto-fixed="autofixed"
                @on-submit="onSubmit3"
                @on-change="onChange3"
                @on-cancel="onCancel3"
                ref="search">
              </search>
            </div>
            <div class="popup-middle font14 padding10" style="top:101px;box-sizing:border-box;" ref="userScrollContainer2" @scroll="handleScroll1('userScrollContainer2',1)">
              <template v-if="disUserData2">
                <template v-if="!userData2.length">
                  <div class="padding10 align_center color-gray" v-if="searchword3 != ''">暂无搜索结果</div>
                  <div class="padding10 align_center color-gray" v-else>请搜索用户</div>
                </template>
                <div v-else class="scroll_list">
                  <div v-for="(item,index) in userData2" :key="index" class="scroll_item">
                    <check-icon class="x-check-icon pl12 pr12 pt10 pb10" :value.sync="item.checked" @click.native.stop="uploaderClick2(item,index)">
                      <div class="t-table">
                        <div class="t-cell v_middle w60">
                          <img :src="item.avatar" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font14">{{item.linkman}}</div>
                          <div class="clamp1 font12 mt5 color-999">店铺名称: {{item.title}}</div>
                        </div>
                      </div>
                    </check-icon>
                  </div>
      					</div>
              </template>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeFulltimePopup">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitFulltime">提交</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
    <div v-if="showRefuseModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">拒绝审核</div>
        <div class="align_left txt padding10">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="titleTextarea"
              v-model="refuseContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入原因"
              :show-counter="false"
              :rows="6"
              :max="200"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeRefuse">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitRefuse">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
Add factory:
  zh-CN: 添加厂家
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup, Confirm, CheckIcon, XImg, Search, Group, XTextarea, XInput } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Popup, Confirm, CheckIcon, XImg, Sos, Search, Group, XTextarea, XInput
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      fid: 0,
      loginUser: {},
      tabtxts: ['全部合伙人', '待审核合伙人', '经理'],
      selectedIndex: 0,
      searchword1: '',
      searchword2: '',
      searchword3: '',
      autofixed: false,
      searchData: [],
      tabData1: [],
      tabData2: [],
      tabData3: [],
      tabData4: [],
      tabData5: [],
      tabData6: [],
      disSearchData: false,
      disTabData1: false,
      disTabData2: false,
      disTabData3: false,
      disTabData4: false,
      disTabData5: false,
      disTabData6: false,
      userPpageStart1: 0,
      userPpageStart2: 0,
      userPpageStart3: 0,
      searchPageStart: 0,
      pageStart1: 0,
      pageStart2: 0,
      pageStart3: 0,
      pageStart4: 0,
      pageStart5: 0,
      pageStart6: 0,
      limit: 20,
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      showLevelPopup: false,
      levelData: [],
      levelName: {},
      selectLevel: null,
      disSearchList: false,
      showUploaderPopup: false,
      selectUploader1: null,
      selectUploader2: null,
      userData1: [],
      userData2: [],
      userData3: [],
      disUserData1: false,
      disUserData2: false,
      disUserData3: false,
      idArr: [],
      refuseContent: '',
      showRefuseModal: false,
      levelPolicy: {},
      showPayPopup: false,
      payMoney: '',
      allchoosed: false,
      closeContent: '',
      showFulltimePopup: false
    }
  },
  methods: {
    getData1 (isone) {
      const self = this
      let params = {fid: self.query.id, fulltime: 0, pagestart: self.pageStart1, limit: self.limit, agent: 0}
      if (isone) {
        params.pagestart = self.tabData1.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        console.log(res)
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 (isone) {
      const self = this
      let params = {fid: self.query.id, pagestart: self.pageStart2, limit: self.limit, agent: 0}
      if (isone) {
        params.pagestart = self.tabData2.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/getCensorRetailers`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        console.log(res)
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    getData3 (isone) {
      const self = this
      let params = {fid: self.query.id, agent: 0, pagestart: self.pageStart3, limit: self.limit, identity: 'C'}
      if (isone) {
        params.pagestart = self.tabData3.length
        params.limit = 1
      }
      console.log(params)
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData3 = self.tabData3.concat(retdata)
        self.disTabData3 = true
      })
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
          if (this.tabData1.length < this.limit) {
            self.pageStart1 = 0
            self.disTabData1 = false
            this.tabData1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < this.limit) {
            self.pageStart2 = 0
            self.disTabData2 = false
            this.tabData2 = []
            self.getData2()
          }
          break
        case 2:
          if (this.tabData3.length < this.limit) {
            self.pageStart3 = 0
            self.disTabData3 = false
            this.tabData3 = []
            self.getData3()
          }
          break
      }
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      this.searchword1 = ''
      this.disSearchList = false
    },
    onSubmit1 () {
      const kw = this.searchword1
      console.log('------进入搜索方法------')
      console.log(kw)
      if (kw === '') {
        this.disSearchList = false
      } else {
        this.disSearchList = true
        this.disSearchData = false
        this.searchData = []
        this.searchPageStart = 0
        this.getSearchData()
      }
    },
    getSearchData () {
      const self = this
      let keyword = self.searchword1
      let params = {fid: self.query.id, pagestart: self.searchPageStart, limit: self.limit, agent: 0}
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      let url = ''
      switch (self.selectedIndex) {
        case 0:
          url = 'api/factory/retailerList'
          params.fulltime = 0
          break
        case 1:
          url = 'api/factory/getCensorRetailers'
          break
        case 2:
          url = 'api/factory/retailerList'
          params.identity = 'C'
          break
      }
      self.$http.get(`${ENV.BokaApi}/${url}`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.searchData = self.searchData.concat(retdata)
        self.disSearchData = true
      })
    },
    handleSearchScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.searchData.length === (self.searchPageStart + 1) * self.limit) {
            self.searchPageStart++
            self.$vux.loading.show()
            self.getSearchData()
          }
        }
      })
    },
    controlPopup1 (item, index) {
      event.preventDefault()
      this.showPopup1 = !this.showPopup1
      this.clickData = item
      this.clickIndex = index
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      const index = this.selectedIndex
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (index === 0) {
            if (self.tabData1.length === (self.pageStart1 + 1) * self.limit) {
              self.pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabData2.length === (self.pageStart2 + 1) * self.limit) {
              self.pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          } else if (index === 2) {
            if (self.tabData3.length === (self.pageStart3 + 1) * self.limit) {
              self.pageStart3++
              self.$vux.loading.show()
              self.getData3()
            }
          }
        }
      })
    },
    allchoose () {  // 全选
      let checkdoms = this.$refs.inputCheckbox
      this.allchoosed = !this.allchoosed
      for (var i = 0; i < checkdoms.length; i++) {
        if (this.allchoosed) {
          checkdoms[i].checked = true
        } else {
          checkdoms[i].checked = false
        }
      }
      this.getDshsSellerInfo()
    },
    agree () {  // 同意
      let uids = []
      let checkdoms = this.$refs.inputCheckbox  // 通过ref获取所有check-box节点
      for (var i = 0; i < checkdoms.length; i++) {
        if (checkdoms[i].checked) {
          uids.push(checkdoms[i].dataset.uid)
        }
      }
      console.log('-------uid.length------')
      console.log(uids.length)
      if (!uids.length) {
        this.$vux.alert.show({
          title: '温馨提示',
          content: '请先选中待审核的用户'
        })
        return false
      }
      this.idArr = uids
      this.$vux.confirm.show({
        content: '确定将选中的用户通过审核？',
        onConfirm: () => {
          this.$vux.loading.show()
          let postParams = {fid: this.fid, uids: this.idArr, ok: 1}
          if (this.selectedIndex === 4) {
            postParams.agent = 1
          }
          this.$http.get(`${ENV.BokaApi}/api/factory/censorRetailer`, {
            params: postParams
          }).then((res) => {
            console.log('-------------')
            console.log(res)
            this.$vux.loading.hide()
            if (this.disSearchList) {
              this.searchPageStart = 0
              this.searchData = []
              this.getSearchData()
            } else {
              if (this.selectedIndex === 4) {
                this.disTabData5 = false
                this.tabData5 = []
                this.pageStart5 = 0
                this.getData5()
              } else {
                this.disTabData2 = false
                this.tabData2 = []
                this.pageStart2 = 0
                this.getData2()
              }
            }
          })
        }
      })
    },
    refuse () {
      let uids = []
      let checkdoms = this.$refs.inputCheckbox
      for (var i = 0; i < checkdoms.length; i++) {
        if (checkdoms[i].checked) {
          uids.push(checkdoms[i].dataset.uid)
        }
      }
      console.log('-------uid.length------')
      console.log(uids.length)
      if (!uids.length) {
        this.$vux.alert.show({
          title: '温馨提示',
          content: '请先选中待审核的用户'
        })
        return false
      }
      this.idArr = uids
      this.showRefuseModal = true
    },
    clickPopup (key) {
      const self = this
      self.showPopup1 = false
      if (key === 'level') {
        self.showLevelPopup = true
        self.userData3 = []
        self.userPpageStart3 = 0
        self.getRecordList()
      } else if (key === 'uploader') {
        self.showUploaderPopup = true
        for (let i = 0; i < this.userData1.length; i++) {
          let curd = this.userData1[i]
          if (curd.checked) {
            delete this.userData1[i].checked
          }
        }
        if (!self.userData1.length) {
          self.searchword2 = ''
          self.searchUser1()
        }
      } else if (key === 'fulltime') {
        self.showFulltimePopup = true
        for (let i = 0; i < this.userData2.length; i++) {
          let curd = this.userData2[i]
          if (curd.checked) {
            delete this.userData2[i].checked
          }
        }
        if (!self.userData2.length) {
          self.searchword3 = ''
          self.searchUser2()
        }
      } else if (key === 'upC') {
        self.$vux.confirm.show({
          content: '确定将该用户升级到C级吗？',
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/haitun/upgrade`, {uid: self.clickData.uid, fid: self.query.id}).then((res) => {
              self.$vux.loading.hide()
              const data = res.data
              if (data.flag) {
                self.clickData.identity = 'C'
                if (self.selectedIndex === 0) {
                  self.tabData1[self.clickIndex].identity = 'C'
                } else {
                  self.tabData2[self.clickIndex].identity = 'C'
                }
              }
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error)
              })
            })
          }
        })
      } else if (key === 'pay') {
        let uid = []
        uid.push(self.clickData.uid)
        this.idArr = uid
        this.showRefuseModal = true
      } else if (key === 'upB') {
        self.$vux.confirm.show({
          content: '确定将该用户升级到B级吗？',
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/haitun/upgrade`, {uid: self.clickData.uid, fid: self.query.id}).then((res) => {
              self.$vux.loading.hide()
              const data = res.data
              if (data.flag) {
                self.clickData.identity = 'B'
                if (self.selectedIndex === 0) {
                  self.tabData1[self.clickIndex].identity = 'B'
                } else {
                  self.tabData2[self.clickIndex].identity = 'B'
                }
              }
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error)
              })
            })
          }
        })
      }
    },
    searchUser1 () {
      const self = this
      const params = {fid: self.query.id, pagestart: self.userPpageStart1, limit: self.limit, agent: 0}
      let keyword = self.searchword2
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      }).then(function (res) {
        console.log(res)
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.userData1 = self.userData1.concat(retdata)
        self.disUserData1 = true
      })
    },
    searchUser2 () {
      const self = this
      const params = {fid: self.query.id, pagestart: self.userPpageStart2, limit: self.limit, agent: 0, identity: 'C'}
      let keyword = self.searchword3
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      }).then(function (res) {
        console.log(res)
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.userData2 = self.userData2.concat(retdata)
        self.disUserData2 = true
      })
    },
    getRecordList () {
      const self = this
      const params = {fid: self.query.id, pagestart: self.userPpageStart3, limit: self.limit, uid: self.uid, agent: 0}
      self.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.userData3 = self.userData3.concat(retdata)
        self.disUserData3 = true
      })
    },
    disJoinQrcode () {
      const self = this
      self.showQrcode = true
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/joinQRCode`, {
        fid: self.loginUser.fid
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          let img = self.$refs.joinQrcode[0] ? self.$refs.joinQrcode[0] : self.$refs.joinQrcode
          img.src = data.data
        } else {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    closeQrcode () {
      this.showQrcode = false
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onCancel2 () {
      this.searchword2 = ''
      this.disUserData1 = false
      this.userData1 = []
      this.userPpageStart1 = 0
      this.searchUser1()
    },
    onSubmit2 () {
      this.disUserData1 = false
      this.userData1 = []
      this.userPpageStart1 = 0
      this.searchUser1()
    },
    onChange3 (val) {
      this.searchword3 = val
    },
    onCancel3 () {
      this.searchword3 = ''
      this.disUserData2 = false
      this.userData2 = []
      this.userPpageStart2 = 0
      this.searchUser2()
    },
    onSubmit3 () {
      this.disUserData2 = false
      this.userData2 = []
      this.userPpageStart2 = 0
      this.searchUser2()
    },
    handleScroll1: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (index === 0) {
            if (self.userData1.length === (self.userPpageStart1 + 1) * self.limit) {
              self.userPpageStart1++
              self.$vux.loading.show()
              self.searchUser1()
            }
          } else if (index === 1) {
            if (self.userData2.length === (self.userPpageStart2 + 1) * self.limit) {
              self.userPpageStart2++
              self.$vux.loading.show()
              self.searchUser2()
            }
          } else if (index === 2) {
            console.log(self.userData3.length, self.userPpageStart3)
            if (self.userData3.length === (self.userPpageStart3 + 1) * self.limit) {
              self.userPpageStart3++
              self.$vux.loading.show()
              self.getRecordList()
            }
          }
        }
      })
    },
    uploaderClick1 (data, index) {
      const self = this
      if (data.checked) {
        self.selectUploader1 = data
      } else {
        self.selectUploader1 = null
      }
      for (let i = 0; i < this.userData1.length; i++) {
        let curd = this.userData1[i]
        if (data.uid !== curd.uid && curd.checked) {
          delete this.userData1[i].checked
        }
      }
    },
    uploaderClick2 (data, index) {
      const self = this
      if (data.checked) {
        self.selectUploader2 = data
      } else {
        self.selectUploader2 = null
      }
      for (let i = 0; i < this.userData2.length; i++) {
        let curd = this.userData2[i]
        if (data.uid !== curd.uid && curd.checked) {
          delete this.userData2[i].checked
        }
      }
    },
    closeLevelPopup () {
      this.showLevelPopup = false
    },
    closeUploaderPopup () {
      this.showUploaderPopup = false
    },
    closeFulltimePopup () {
      this.showFulltimePopup = false
    },
    // 获取待审核卖家的信息
    getDshsSellerInfo () {
      let uids = []
      let checkdoms = this.$refs.inputCheckbox
      for (var i = 0; i < checkdoms.length; i++) {
        if (checkdoms[i].checked) {
          uids.push(checkdoms[i].dataset.uid)
        }
      }
      this.idArr = uids
    },
    closeRefuse () {
      this.showRefuseModal = false
      this.refuseContent = ''
    },
    submitRefuse () { // 拒绝审核
      this.showRefuseModal = false
      console.log('-----拒绝原因------')
      console.log(this.idArr)
      this.$vux.loading.show()
      let postParams = {fid: this.fid, uids: this.idArr, ok: 0, reason: this.refuseContent}
      if (this.selectedIndex === 4) {
        postParams.agent = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/censorRetailer`, {
        params: postParams
      }).then((res) => {
        console.log('-------------')
        console.log(res)
        this.$vux.loading.hide()
        this.refuseContent = ''
        if (this.disSearchList) {
          this.searchPageStart = 0
          this.searchData = []
          this.getSearchData()
        } else {
          if (this.selectedIndex === 1) {
            console.log(res)
            this.disTabData2 = false
            this.tabData2 = []
            this.pageStart2 = 0
            this.getData2()
          } else {
            this.disTabData1 = false
            this.tabData1 = []
            this.pageStart1 = 0
            this.getData1()
          }
        }
      })
    },
    submitLevel () {
      const self = this
      if (!self.selectLevel) {
        self.$vux.toast.show('请选择代理级别', 'middle')
        return false
      }
      self.$vux.loading.show()
      const params = { fid: self.query.id, wid: self.clickData.wid, level: self.selectLevel.id }
      this.$http.post(`${ENV.BokaApi}/api/factory/changeRetailerLevel`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.disSearchList) {
                self.searchData[self.clickIndex].level = self.selectLevel.id
                self.searchData[self.clickIndex].levelname = self.levelPolicy[self.selectLevel.id]
              } else {
                self.tabData4[self.clickIndex].level = self.selectLevel.id
                self.tabData4[self.clickIndex].levelname = self.levelPolicy[self.selectLevel.id]
              }
              self.showLevelPopup = false
            }
          }
        })
      })
    },
    submitUploader () {
      const self = this
      if (!self.selectUploader1) {
        self.$vux.toast.text('请选择推荐人', 'middle')
        return false
      }
      self.$vux.loading.show()
      const params = {uploader: self.selectUploader1.wid, wid: self.clickData.wid}
      this.$http.post(`${ENV.BokaApi}/api/factory/changeUploader`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.disSearchList) {
                self.searchData[self.clickIndex].uploader = self.selectUploader1.wid
                self.searchData[self.clickIndex].uploadname = self.selectUploader1.linkman
              } else {
                if (self.selectedIndex === 0) {
                  self.tabData1[self.clickIndex].uploader = self.selectUploader1.wid
                  self.tabData1[self.clickIndex].uploadname = self.selectUploader1.linkman
                } else {
                  self.tabData3[self.clickIndex].uploader = self.selectUploader1.wid
                  self.tabData3[self.clickIndex].uploadname = self.selectUploader1.linkman
                }
              }
              self.showUploaderPopup = false
            }
          }
        })
      })
    },
    submitFulltime () {
      const self = this
      if (!self.selectUploader2) {
        self.$vux.toast.text('请选择C级', 'middle')
        return false
      }
      self.$vux.loading.show()
      const params = {dcuid: self.selectUploader2.uid, uid: self.clickData.uid, fid: self.query.id}
      console.log(params)
      this.$http.post(`${ENV.BokaApi}/api/haitun/downgrade`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.disSearchList) {
                self.searchData[self.clickIndex].uploader = self.selectUploader2.wid
                self.searchData[self.clickIndex].identity = 'D'
              } else {
                if (self.selectedIndex === 0) {
                  self.tabData1[self.clickIndex].uploader = self.selectUploader2.wid
                  self.searchData[self.clickIndex].identity = 'D'
                } else {
                  self.tabData3[self.clickIndex].uploader = self.selectUploader2.wid
                  self.searchData[self.clickIndex].identity = 'D'
                }
              }
              self.showFulltimePopup = false
            }
          }
        })
      })
    },
    init () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'factory', action: 'list'
      })
    },
    refresh () {
      console.log('进入了刷新方法')
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.id)) && !isAdmin && !self.query.fromapp === 'factory') {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          this.fid = this.query.id
          if (!this.query.id) {
            this.fid = this.loginUser.fid
          }
          self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
            params: { fid: this.fid }
          }).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            let retdata = data.data ? data.data : data
            self.levelName = retdata.levelname
            self.levelData = []
            if (self.tabData1.length < self.limit) {
              self.disTabData1 = false
              self.tabData1 = []
              self.$vux.loading.show()
              self.pageStart1 = 0
              self.getData1()
            }
            return self.$http.post(`${ENV.BokaApi}/api/factory/getPolicy`)
          }).then(res => {
            const data = res.data
            const retdata = data.data ? data.data : data
            this.levelPolicy = retdata
            for (let key in retdata) {
              self.levelData.push({id: key, key: key, levelname: retdata[key]})
            }
          })
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.sellerlist-page{
  .scroll_item{overflow:hidden;position:relative;}
  .btnicon{
    display: inline-block;
    color: #ea3a3a;
    border: 1px solid #ea3a3a;
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 21px;
    width: 41px;
    line-height: 21px;
  }
  .pro_list_top{
    width:100%;padding-bottom:9%;
    background: url(../assets/images/product_list_top.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .doBtn{height: 44px;line-height: 44px;width: 33.3%;text-align: center;}
  .flex_around{display: flex;justify-content: space-around; align-items: center;}
}
</style>
