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
          <!-- 全职卖家 -->
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
          <!-- 兼职卖家 -->
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
                <div class="pro_box bg-page list_shadow pl12 pr12 pb15 border-box">
                  <div class="pro_list_top"></div>
                  <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                    <div>什么是兼职卖家？</div>
                    <div>指拥有自己的店铺，利用自己的客户群体兼职销售本厂家商品的卖家。</div>
                    <div>如何发展兼职卖家？</div>
                    <div>1、通过厂家介绍界面申请加盟的卖家即可成为兼职卖家。</div>
                    <div>2、卖家通过渠道列表选择并加盟厂家商品时，即可成为兼职卖家。</div>
                  </div>
                </div>
                <div class="scroll_list ">
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
          <!-- 待审核卖家 -->
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
                <div class="scroll_list " >
                  <div class="flex_around">
                    <div class="doBtn" @click="allchoose()">全选</div>
                    <div class="doBtn" @click="agree()">同意</div>
                    <div class="doBtn" @click="refuse()">拒绝</div>
                  </div>
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
                      <div class="align_right t-cell v_middle w80" >
                        <input ref="inputCheckbox" type="checkbox" :value="item.uid" :data-uid="item.uid"/>
                      </div>
                		</div>
                  </div>
                </div>
              </template>
            </template>
          </div>
          <!-- 经销商 -->
          <div v-show="(selectedIndex == 3)" class="swiper-inner" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4',3)">
            <template v-if="disTabData4">
              <template v-if="!tabData4.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>分享【经销商介绍】给好友，好友申请加盟即可成为经销商</div>
                        <div class="color-blue"><router-link :to="{path: '/factoryDetail',query:{fid:fid}}">经销商介绍</router-link></div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="scroll_list ">
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData4" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
                        <div class="clamp1 font12 color-gray">级别: {{item.levelname}}</div>
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
          <!-- 待审核卖家 -->
          <div v-show="(selectedIndex == 4)" class="swiper-inner" ref="scrollContainer5" @scroll="handleScroll('scrollContainer5',4)">
            <template v-if="disTabData5">
              <template v-if="!tabData5.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <div>分享【经销商介绍】给好友，好友申请加盟即可成为经销商</div>
                        <div class="color-blue"><router-link :to="{path: '/agentDetail',query:{fid:fid}}">经销商介绍</router-link></div>
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
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData5" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.linkman}}</div>
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
          <div v-show="(selectedIndex == 5)" class="swiper-inner" ref="scrollContainer6" @scroll="handleScroll('scrollContainer6',5)">
            <template v-if="disTabData6">
              <template v-if="!tabData6.length">
                <div class="scroll_list">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">暂无数据</div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="scroll_list " >
                  <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData6" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                      <div class="t-cell v_middle w70">
                        <img class="avatarimg3 imgcover" :src="item.factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                      </div>
                      <div class="t-cell v_middle pr10" style="box-sizing:border-box;">
                        <div class="clamp1 font16">{{item.factoryinfo.title}}</div>
                        <div class="mt5 font12 color-gray">应打款金额: {{item.needpaymoney}}</div>
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
              <div class="item" v-if="selectedIndex == 5">
                <div class="inner" @click="clickPopup('pay')">核销打款金额</div>
              </div>
              <template v-else>
                <div class="item" v-if="clickData.identity == 'D'">
                  <div class="inner" @click="clickPopup('up')">升级到C</div>
                </div>
                <div class="item" v-if="selectedIndex == 3">
                  <div class="inner" @click="clickPopup('level')">更改级别</div>
                </div>
                <div class="item" >
                  <div class="inner" @click="clickPopup('uploader')">更改推荐人</div>
                </div>
                <div class="item" v-if="clickData.fulltime">
                  <div class="inner" @click="clickPopup('fulltime')">设置为兼职卖家</div>
                </div>
                <router-link class="item" :to="{path:'/store',query:{wid:clickData.wid}}">
                  <div class="inner">进入店铺</div>
                </router-link>
              </template>
              <router-link class="item" :to="{path:'/factoryOrders',query:{wid:clickData.wid}}">
                <div class="inner">相关订单</div>
              </router-link>
              <router-link class="item" :to="{path:'/stat',query:{module:'factoryretailer',id:query.id,wid:clickData.wid}}">
                <div class="inner">统计</div>
              </router-link>
              <div class="item close mt10" @click="clickPopup">
                <div class="inner">{{ $t('Cancel txt') }}</div>
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
            <div class="popup-top flex_center">更改经销商级别</div>
            <div class="popup-middle font14">
              <div class="pt10 pb10 scroll_list">
                <div v-for="(item,index) in levelData" :key="index" class="scroll_item">
                  <check-icon class="x-check-icon pl12 pr12 pt10 pb10" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                    <div class="t-table">
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 font14 color-999">等级名称: {{item.levelname}}</div>
                      </div>
                    </div>
                  </check-icon>
                </div>
    					</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeLevelPopup">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitLevel">提交</div>
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
            <div class="popup-middle font14 padding10" style="top:101px;box-sizing:border-box;" ref="userScrollContainer" @scroll="handleScroll1('userScrollContainer')">
              <template v-if="disUserData">
                <template v-if="!userData.length">
                  <div class="padding10 align_center color-gray" v-if="searchword2 != ''">暂无搜索结果</div>
                  <div class="padding10 align_center color-gray" v-else>请搜索用户</div>
                </template>
                <div v-else class="scroll_list">
                  <div v-for="(item,index) in userData" :key="index" class="scroll_item">
                    <check-icon class="x-check-icon pl12 pr12 pt10 pb10" :value.sync="item.checked" @click.native.stop="uploaderClick(item,index)">
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
    <div v-transfer-dom class="x-popup">
      <popup v-model="showPayPopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">厂家已打款</div>
          <div class="popup-middle font14">
            <div class="pt10 pb10 pl12 pr12" v-if="clickData && clickData.factoryinfo">
              <div class="t-table bg-white pt10 pb10">
                <div class="t-cell pl12 v_middle" style="width:110px;">
                  <img class="imgcover v_middle" :src="clickData.factoryinfo.photo" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font16">{{clickData.factoryinfo.title}}</div>
                  <div class="font12 color-gray">应打款金额: {{clickData.needpaymoney}}</div>
                </div>
              </div>
              <div class="form-item">
                <div class="t-table">
                  <div class="t-cell title-cell w100 font14 v_middle">已打款金额<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <x-input v-model="payMoney" type="text" class="input" placeholder="已打款金额"></x-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closePayPopup">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitPay">提交</div>
          </div>
        </div>
      </popup>
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
      tabtxts: ['全职卖家', '兼职卖家', '待审核卖家', '经销商', '待审核经销商', '代理厂家'],
      selectedIndex: 0,
      searchword1: '',
      searchword2: '',
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
      userPpageStart: 0,
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
      selectUploader: null,
      userData: [],
      disUserData: false,
      idArr: [],
      refuseContent: '',
      showRefuseModal: false,
      levelPolicy: {},
      showPayPopup: false,
      payMoney: ''
    }
  },
  methods: {
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
    onChange2 (val) {
      this.searchword2 = val
    },
    onCancel2 () {
      this.searchword2 = ''
      this.disUserData = false
      this.userData = []
      this.userPpageStart = 0
      this.searchUser()
    },
    onSubmit2 () {
      this.disUserData = false
      this.userData = []
      this.userPpageStart = 0
      this.searchUser()
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
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
          } else if (index === 3) {
            if (self.tabData4.length === (self.pageStart4 + 1) * self.limit) {
              self.pageStart4++
              self.$vux.loading.show()
              self.getData4()
            }
          } else if (index === 4) {
            if (self.tabData5.length === (self.pageStart5 + 1) * self.limit) {
              self.pageStart5++
              self.$vux.loading.show()
              self.getData5()
            }
          } else if (index === 5) {
            if (self.tabData6.length === (self.pageStart6 + 1) * self.limit) {
              self.pageStart6++
              self.$vux.loading.show()
              self.getData6()
            }
          }
        }
      })
    },
    handleScroll1: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.userData.length === (self.userPpageStart + 1) * self.limit) {
            self.userPpageStart++
            self.$vux.loading.show()
            self.searchUser()
          }
        }
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
        case 3:
          if (this.tabData4.length < this.limit) {
            self.pageStart4 = 0
            self.disTabData4 = false
            this.tabData4 = []
            self.getData4()
          }
          break
        case 4:
          if (this.tabData5.length < this.limit) {
            self.pageStart5 = 0
            self.disTabData5 = false
            this.tabData5 = []
            self.getData5()
          }
          break
        case 5:
          if (this.tabData6.length < this.limit) {
            self.pageStart6 = 0
            self.disTabData6 = false
            this.tabData6 = []
            self.getData6()
          }
          break
      }
    },
    controlPopup1 (item, index) {
      event.preventDefault()
      this.showPopup1 = !this.showPopup1
      this.clickData = item
      this.clickIndex = index
    },
    clickPopup (key) {
      const self = this
      self.showPopup1 = false
      if (key === 'level') {
        self.showLevelPopup = true
        for (let i = 0; i < self.levelData.length; i++) {
          if (self.clickData.level.toString() === self.levelData[i].id.toString()) {
            self.selectLevel = self.levelData[i]
            self.levelData[i].checked = true
          } else {
            delete self.levelData[i].checked
          }
        }
      } else if (key === 'uploader') {
        self.showUploaderPopup = true
        if (!self.userData.length) {
          self.searchword2 = ''
          self.searchUser()
        }
      } else if (key === 'fulltime') {
        self.$vux.confirm.show({
          content: '确定将该用户设置为兼职卖家吗？',
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/factory/changeFulltime`, {
              wid: self.clickData.uid, fid: self.clickData.fid, fulltime: 0
            }).then((res) => {
              self.$vux.loading.hide()
              self.clickData.fulltime = 0
              self.tabData1.splice(self.clickIndex, 1)
              if (self.tabData1.length + 1 === (self.pageStart1 + 1) * self.limit) {
                self.getData1(true)
              }
              if (self.tabData2.length) {
                self.tabData2 = [self.clickData].concat(self.tabData2)
                if (self.tabData2.length - 1 === (self.pageStart2 + 1) * self.limit) {
                  self.tabData2.splice(self.tabData2.length - 1, 1)
                }
              }
            })
          }
        })
      } else if (key === 'up') {
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
        this.showPayPopup = true
      }
    },
    closePayPopup () {
      this.showPayPopup = false
    },
    submitPay () {
      const self = this
      let money = self.payMoney
      if (self.$util.trim(money) === '') {
        self.$vux.toast.show({
          text: '请输入核销金额'
        })
        return false
      }
      if (isNaN(money) || parseFloat(money) < 0) {
        self.$vux.toast.show({
          text: '请输入正确的核销金额'
        })
        return false
      }
      // self.$http.post(`${ENV.BokaApi}/api/factory/productset`, {
      //   id: self.clickdata.id, newsalesrebate: salesRebate, newsuperrebate: superRebate
      // }).then(res => {
      //   let data = res.data
      //   self.$vux.loading.hide()
      //   self.$vux.toast.show({
      //     text: data.error,
      //     type: data.flag !== 1 ? 'warn' : 'success',
      //     time: self.$util.delay(data.error),
      //     onHide: function () {
      //       if (data.flag === 1) {
      //         self.showPayPopup = false
      //         self.refresh()
      //       }
      //     }
      //   })
      // })
    },
    closeLevelPopup () {
      this.showLevelPopup = false
    },
    closeUploaderPopup () {
      this.showUploaderPopup = false
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectLevel = data
      } else {
        self.selectLevel = null
      }
      for (let d of self.levelData) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
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
      // console.log('-------uid.length------')
      // console.log(uids.length)
      // if (!uids.length) {
      //   this.$vux.alert.show({
      //     title: '温馨提示',
      //     content: '请先选中待审核的用户'
      //   })
      //   return false
      // }
      this.idArr = uids
      // if (callback) {
      //   callback()
      // }
    },
    allchoose () {  // 全选
      let checkdoms = this.$refs.inputCheckbox
      for (var i = 0; i < checkdoms.length; i++) {
        checkdoms[i].checked = !checkdoms[i].checked
      }
      this.getDshsSellerInfo()
    },
    agree () {  // 同意
      // this.getDshsSellerInfo(() => {
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
            if (this.selectedIndex === 4) {
              this.disTabData5 = false
              this.tabData5 = []
              this.pageStart5 = 0
              this.getData5()
            } else {
              this.disTabData3 = false
              this.tabData3 = []
              this.pageStart3 = 0
              this.getData3()
            }
          })
        }
      })
      // })
    },
    refuse () {
      // this.getDshsSellerInfo(() => {
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
      // })
    },
    closeRefuse () {
      this.showRefuseModal = false
      this.refuseContent = ''
    },
    submitRefuse () { // 拒绝审核
      this.showRefuseModal = false
      console.log('-----拒绝原因------')
      console.log(this.refuseContent)
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
        if (this.selectedIndex === 4) {
          this.disTabData5 = false
          this.tabData5 = []
          this.pageStart5 = 0
          this.getData5()
        } else {
          this.disTabData3 = false
          this.tabData3 = []
          this.pageStart3 = 0
          this.getData3()
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
    uploaderClick (data, index) {
      const self = this
      if (data.checked) {
        self.selectUploader = data
      } else {
        self.selectUploader = null
      }
      for (let i = 0; i < this.userData.length; i++) {
        let curd = this.userData[i]
        if (data.uid !== curd.uid && curd.checked) {
          delete this.userData[i].checked
        }
      }
    },
    submitUploader () {
      const self = this
      if (!self.selectUploader) {
        self.$vux.toast.text('请选择推荐人', 'middle')
        return false
      }
      self.$vux.loading.show()
      const params = {uploader: self.selectUploader.wid, wid: self.clickData.wid}
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
                self.tabData3[self.clickIndex].uploader = self.selectUploader.wid
                self.tabData3[self.clickIndex].uploadname = self.selectUploader.linkman
              } else {
                if (self.selectedIndex === 0) {
                  self.tabData1[self.clickIndex].uploader = self.selectUploader.wid
                  self.tabData1[self.clickIndex].uploadname = self.selectUploader.linkman
                } else {
                  self.tabData2[self.clickIndex].uploader = self.selectUploader.wid
                  self.tabData2[self.clickIndex].uploadname = self.selectUploader.linkman
                }
              }
              self.showUploaderPopup = false
            }
          }
        })
      })
    },
    getSearchData () {
      const self = this
      let keyword = self.searchword1
      let params = {fid: self.query.id, pagestart: self.searchPageStart, limit: self.limit}
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      let url = ''
      switch (self.selectedIndex) {
        case 0:
          url = 'api/factory/retailerList'
          params.fulltime = 1
          break
        case 1:
          url = 'api/factory/retailerList'
          params.fulltime = 2
          break
        case 2:
          url = 'api/factory/getCensorRetailers'
          params.agent = 0
          break
        case 3:
          url = 'api/factory/retailerList'
          break
        case 4:
          url = 'api/factory/getCensorRetailers'
          params.agent = 1
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
    getData1 (isone) {
      const self = this
      let params = {fid: self.query.id, fulltime: 1, pagestart: self.pageStart1, limit: self.limit}
      if (isone) {
        params.pagestart = self.tabData1.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 (isone) {
      const self = this
      let params = {fid: self.query.id, fulltime: 2, pagestart: self.pageStart2, limit: self.limit}
      if (isone) {
        params.pagestart = self.tabData2.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    getData3 (isone) {
      const self = this
      let params = {fid: self.query.id, pagestart: self.pageStart3, limit: self.limit, agent: 0}
      if (isone) {
        params.pagestart = self.tabData3.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/getCensorRetailers`, {
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
    getData4 (isone) {
      const self = this
      let params = {fid: self.query.id, agent: 1, pagestart: self.pageStart4, limit: self.limit}
      if (isone) {
        params.pagestart = self.tabData4.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData4 = self.tabData4.concat(retdata)
        self.disTabData4 = true
      })
    },
    getData5 (isone) {
      const self = this
      let params = {fid: self.query.id, pagestart: self.pageStart5, limit: self.limit, agent: 1}
      if (isone) {
        params.pagestart = self.tabData5.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/factory/getCensorRetailers`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData5 = self.tabData5.concat(retdata)
        self.disTabData5 = true
      })
    },
    getData6 (isone) {
      const self = this
      let params = {fid: this.loginUser.fid, type: 'join', pagestart: self.pageStart6, limit: self.limit}
      if (isone) {
        params.pagestart = self.tabData6.length
        params.limit = 1
      }
      this.$http.post(`${ENV.BokaApi}/api/factory/fpimportapplyList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData6 = self.tabData6.concat(retdata)
        self.disTabData6 = true
      })
    },
    searchUser () {
      const self = this
      const params = {fid: self.query.id, pagestart: self.userPpageStart, limit: self.limit, agent: 0}
      let keyword = self.searchword2
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.userData = self.userData.concat(retdata)
        self.disUserData = true
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
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.id)) && !isAdmin) {
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
            // for (let key in levelpolicy) {
            //   self.levelData.push({id: key, money: levelpolicy[key], levelname: self.levelName[key]})
            // }
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
