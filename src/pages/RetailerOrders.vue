<template>
  <div id="retailer-orders-page" :class="`containerarea bg-page font14 retailerordes ${showTip ? 'show-tip-page' : ''}`">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div v-if="showTip" class="pagetop border-box db-flex top-subscribe-tip">
        <div class="flex_cell h_100 flex_left">
          <i class="al al-gantanhaozhong font20"></i><span>关注公众号可及时接收私信提醒</span>
        </div>
        <div class="w80 h_100 flex_right">
          <div class="btn flex_center" @click="toSubscribe">立即关注</div>
        </div>
      </div>
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <search
            class="v-search bg-white"
            v-model='searchword1'
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            placeholder="请输入订单号/收货人姓名/手机号"
            ref="search">
          </search>
          <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="onItemClick()">{{item}}</tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div v-show="(selectedIndex == 0)">
          <div v-if="distabdata1" class="scroll_list">
            <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <Orderitemplate v-else v-for="(item,index1) in tabdata1" :key="item.id" :data="item" :from="query.from">
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class="font12 color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-0-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-0-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
                <div class="t-table pt5 color-lightgray font13 deliverarea" >
                  <template v-if="item.flag == 1 && item.fid == 0 && item.crowdid == 0">
                    <div class="t-cell v_middle align_left color-orange">
                      <div class="clamp1">
                        <span class="v_middle">待支付: {{ $t('RMB') }}</span><span class="v_middle">{{ item.needpaymoney }}</span>
                        <template v-if="!item.delivertype && item.postage && item.postage != ''">
                          <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                          <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                        </template>
                      </div>
                    </div>
                    <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.orderonline == 0 &&  item.frommin && item.frommin != ''">
                      <div class="qbtn4 font12" style="padding:1px 14px;" @click="confirmPrice(item,index1)">确认收款</div>
                    </div>
                    <div class="t-cell v_middle appendcontrol align_right w80" v-else>
                      <div class="qbtn4 font12" style="padding:1px 14px;" @click="changePrice(item,index1)">{{ $t('Change price') }}</div>
                    </div>
                  </template>
                  <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 2 && item.candeliver">
                    <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index1)">{{ $t('Deliver goods') }}</div>
                  </div>
                  <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 3">
                    <router-link v-if="query.fromapp != 'factory'" :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                    <router-link v-if="query.fromapp == 'factory'" :to="{path: '/deliverinfo', query: {id: item.id, fromapp: 'factory'}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                  </div>
                </div>
              </div>
            </Orderitemplate>
          </div>
        </div>
        <div v-show="(selectedIndex == 1)">
          <div v-if="distabdata2" class="scroll_list">
            <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <orderitemplate v-else v-for="(item,index1) in tabdata2" :key="item.id" :data="item" :from="query.from">
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class="font12 color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-1-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-1-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid && (!item.frommin || item.frommin == '')" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
                <div v-if="item.flag == 1 && item.fid == 0 && item.crowdid == 0" class="t-table pt5 color-lightgray font13 deliverarea" >
                  <div class="t-cell v_middle align_left color-orange">
                    <div class="clamp1">
                      <span class="v_middle">待支付: {{ $t('RMB') }}</span><span class="v_middle">{{ item.needpaymoney }}</span>
                      <template v-if="!item.delivertype && item.postage && item.postage != ''">
                        <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                        <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                      </template>
                    </div>
                  </div>
                  <div class="t-cell v_middle appendcontrol align_right w80">
                    <div class="qbtn4 font12" style="padding:1px 14px;" v-if="item.orderonline == 0 && item.frommin && item.frommin != ''" @click="confirmPrice(item,index1)">确认收款</div>
                    <div class="qbtn4 font12" style="padding:1px 14px;" v-else @click="changePrice(item,index1)">{{ $t('Change price') }}</div>
                  </div>
                </div>
              </div>
            </orderitemplate>
          </div>
        </div>
        <div v-show="(selectedIndex == 2)">
          <div class="flex_center" style="height:45px;background-color:#fadedd;">
            <div class="color-red" @click="openFhbz">提示:电脑后台可一键批量发货哦!点击查看发货步骤</div>
          </div>
          <div class="auto-modal modalarea1 flex_center store-modal" style="position:fixed;" v-if="showFhbz">
            <div class="modal-inner">
              <div class="pagetop flex_left font16 pl10 pr10">
                <div class="close flex_center" @click="closeFhbz"><i class="al al-guanbi"></i></div>
              </div>
              <div class="czlc b_bottom">操作流程</div>
              <swiper height="200px">
                <swiper-item v-for="(item, index) in imgList" :key="index" :index="index">
                  <div v-if="index === 0">
                    <div class="tab-num">第一步</div>
                    <div class="discribtion">进入电脑后台,导出待发货订单</div>
                  </div>
                  <div v-else-if="index === 1">
                    <div class="tab-num">第二步</div>
                    <div class="discribtion">录入物流单号,导出Excel文件</div>
                  </div>
                  <div v-else>
                    <div class="tab-num">第三步</div>
                    <div class="discribtion">导入Excel文件并提交,发货完成</div>
                  </div>
                  <div style="width:100%" @click="showBigimg1(index)">
                    <img class="yjfhimg" :src="item">
                  </div>
                </swiper-item>
              </swiper>
              <div class="copyUrl" @click="copyTxt(null, 2)">复制链接
                <div class="copyHtUrl" style="position:absolute;opacity:0;top:84%;z-index:1;overflow:hidden;height:50px;width:100%">{{retailerHt}}</div>
              </div>
            </div>
          </div>
          <div v-if="distabdata3" class="scroll_list">
            <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <orderitemplate v-else v-for="(item,index1) in tabdata3" :key="item.id" :data="item" :from="query.from">
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class="font12 color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-2-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-2-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
                <div v-if="item.candeliver" class="t-table pt5 color-lightgray font13 deliverarea">
                  <div class="t-cell middle-cell appendcontrol align_right w80">
                    <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index1)">{{ $t('Deliver goods') }}</div>
                  </div>
                </div>
              </div>
            </orderitemplate>
          </div>
        </div>
        <div v-show="(selectedIndex == 3)">
          <div v-if="distabdata6" class="scroll_list">
            <div v-if="!tabdata6 || tabdata6.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <orderitemplate v-else v-for="(item,index1) in tabdata6" :key="item.id" :data="item" :from="query.from">
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class=" color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
              </div>
            </orderitemplate>
          </div>
        </div>
        <div v-show="(selectedIndex == 4)">
          <div v-if="distabdata4" class="scroll_list">
            <div v-if="!tabdata4 || tabdata4.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <orderitemplate v-else v-for="(item,index1) in tabdata4" :key="item.id" :data="item" :from="query.from">
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class=" color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
                <div class="t-table pt5 color-lightgray font13 deliverarea">
                  <div class="t-cell middle-cell appendcontrol align_right w80">
                    <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                  </div>
                </div>
              </div>
            </orderitemplate>
          </div>
        </div>
        <div v-show="(selectedIndex == 5)">
          <div v-if="distabdata5" class="scroll_list">
            <div v-if="!tabdata5 || tabdata5.length === 0" class="scroll_item padding10 align_center color-gray">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无相关订单！</div>
              <div>积极分享商品或活动，客户才会购买哦~</div>
            </div>
            <orderitemplate v-else v-for="(item,index1) in tabdata5" :key="item.id" :data="item" :from="query.from">
              <span slot="orderno">{{ item.orderno }}</span>
              <span slot="flagstr">{{ item.flagstr }}</span>
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div slot="receivearea">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                    <span @click="copyTxt(item, 1)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class=" color-red4">复制</span>
                      <template v-if="item.flag != 0 && item.flag != 1 && item.flag != 2">
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.delivercompanyname }} {{ item.delivercode }} {{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                      <template v-else>
                        <div :class="`deliver_txt-3-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.address ? item.address + ', ' : '' }}{{ item.linkman ? item.linkman + ', ' : '' }}{{ item.telephone ? item.telephone : '' }}</div>
                      </template>
                    </span>
                  </div>
                  <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                    <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                  </div>
                </div>
                <div class="t-table pt5 color-lightgray font13 deliverarea">
                  <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 2 && item.candeliver">
                    <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index1)">{{ $t('Deliver goods') }}</div>
                  </div>
                  <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 3">
                    <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                  </div>
                </div>
              </div>
            </orderitemplate>
          </div>
        </div>
      </div>
      <!--
      <div class="s-bottom bottomnaviarea b_top_after">
        <div class="t-table bottomnavi">
          <router-link class="t-cell item" :to="{path: '/store', query: {wid: loginUser.uid}}">{{ $t('My shop') }}</router-link>
          <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
          <div class="t-cell item active">{{ $t('My orders') }}</div>
        </div>
      </div>
    -->
      <div v-transfer-dom class="x-popup popup-deliver">
        <popup v-model="showpopup" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">发货</div>
            <div class="popup-middle">
              <div class="scroll_list">
                <div class="scroll_item padding10">
                  <div class="t-table">
                    <div class="t-cell w80">物流<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                    <div class="t-cell">
                      <select class="qselect" v-model="deliverdata.delivercompany" :value="deliverdata.delivercompany">
                        <option v-for="(item,index) in delivercompany" :key='item.id' :value="item.id" >{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-if="deliverdata.delivercompany != '-1'" class="scroll_item padding10 form-item">
                  <div class="t-table">
                    <div class="t-cell w80">运单号<span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
                    <div class="t-cell">
                      <input v-model="deliverdata.delivercode" type="text" class="input" placeholder="运单号" />
                    </div>
                    <div class="t-cell align_right w50" style="position:relative;" @click="scanClick">
                      <i class="al al-scanning color-blue"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <!-- <template v-if="showFirst">
        <firstTip @submitFirstTip="submitFirstTip">
          <div class="font15 bold txt">
            <div class="flex_center">{{sysParams.advance_orderdeliver}}</div>
          </div>
        </firstTip>
      </template>
      <template v-if="showHb">
        <firstHb action="orderdeliver" @closeFirstHb="closeFirstHb"></firstHb>
      </template> -->
    </template>
    <div class="auto-modal flex_center confirm-tip-modal" v-if="showConfirmModal">
      <div class="modal-inner border-box">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">确认收到买家转账了吗？</div>
        <div class="padding20 font16">
          <div class="flex_left pt20">备注订单金额（不必填）</div>
          <div class="db w_100 pt20">
            <div class="flex_left w_100 pb20">
              <x-input v-model="priceVal" class="input flex_left" type="text" placeholder="请输入订单金额" maxlength="10"></x-input>
              <div class="flex_right small-cell">元</div>
            </div>
            <div class="btns flex_center w_100 mt20">
              <div class="flex_cell flex_center">
                <div class="btn btn-cancel flex_center" @click="closeConfirm">取消</div>
              </div>
              <div class="flex_cell flex_center">
                <div class="btn btn-save flex_center" @click="confirmEvent">确认收款</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg, Search, XInput } from 'vux'
import Orderitemplate from '@/components/Orderitemplate'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import jQuery from 'jquery'
import ENV from 'env'
import { User, SystemParams } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, Orderitemplate, Orderproductplate, XImg, Subscribe, ApplyTip, Search, FirstTip, FirstHb, XInput
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      retailerInfo: {},
      tabtxts: [ '全部', '待付款', '待发货', '备货中', '已发货', '退款订单' ],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      distabdata4: false,
      distabdata5: false,
      distabdata6: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      tabdata5: [],
      tabdata6: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      pagestart4: 0,
      pagestart5: 0,
      pagestart6: 0,
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      autofixed: false,
      searchword1: '',
      showTip: false,
      showFirst: false,
      isFirst: false,
      showHb: false,
      sysParams: {},
      isrefresh: false,
      showConfirmModal: false,
      clickData: null,
      clickIndex: 0,
      priceVal: '',
      pageTop: 0,
      imgList: ['https://tossharingsales.boka.cn/images/yjfh1.png', 'https://tossharingsales.boka.cn/images/yjfh3.png', 'https://tossharingsales.boka.cn/images/yjfh2.png'],
      showFhbz: false,
      retailerHt: ENV.RetailerLoginUrl
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
      this.showHb = false
    },
    closeFirstHb () {
      this.showHb = false
      this.isFirst = false
    },
    submitFirstTip () {
      this.showFirst = false
    },
    // copyUrl (item) {
    //   const self = this
    //   let str = `#retailer-orders-page .copyHtUrl`
    //   let eleobj = jQuery(str)[0]
    //   let range = null
    // },
    copyTxt (item, flag) {  //  flag=1复制订单 flag=2复制后台路径
      const self = this
      let str = null
      if (flag === 1) {
        str = `#retailer-orders-page .deliver_txt-${this.selectedIndex}-${item.id}`
      }
      if (flag === 2) {
        str = `#retailer-orders-page .copyHtUrl`
      }
      let eleobj = jQuery(str)[0]
      let range = null
      console.log('查看复制内容')
      console.log(eleobj.innerHTML)
      let save = function (e) {
        console.log(e)
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        console.log('----ios---')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    showBigimg1 (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerFlash.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.imgList[index],
          urls: self.imgList
        })
      }
    },
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      this.searchword1 = ''
    },
    onSubmit1 () {
      const kw = this.searchword1
      this.searchword1 = ''
      this.$router.push({path: '/retailerOrderSearch', query: {keyword: kw}})
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
                self.pagestart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
                self.pagestart2++
                self.getData2()
              }
              break
            case 2:
              if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
                self.pagestart3++
                self.getData3()
              }
              break
            case 3:
              if (self.tabdata6.length === (self.pagestart6 + 1) * self.limit) {
                self.pagestart6++
                self.getData6()
              }
              break
            case 4:
              if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
                self.pagestart4++
                self.getData4()
              }
              break
            case 5:
              if (self.tabdata5.length === (self.pagestart5 + 1) * self.limit) {
                self.pagestart5++
                self.getData5()
              }
              break
          }
        }
      })
    },
    getData1 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {pagestart: self.pagestart1, limit: self.limit}
      if (isone) {
        params = {pagestart: self.tabdata1.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {flag: 1, pagestart: self.pagestart2, limit: self.limit}
      if (isone) {
        params = {flag: 1, pagestart: self.tabdata2.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getData3 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {flag: 2, pagestart: self.pagestart3, limit: self.limit}
      if (isone) {
        params = {flag: 2, pagestart: self.tabdata3.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    getData4 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {flag: 3, pagestart: self.pagestart4, limit: self.limit}
      if (isone) {
        params = {flag: 3, pagestart: self.tabdata4.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata4 = self.tabdata4.concat(retdata)
        self.distabdata4 = true
      })
    },
    getData5 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {backflag: 20, pagestart: self.pagestart5, limit: self.limit}
      if (isone) {
        params = {backflag: 20, pagestart: self.tabdata5.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata5 = self.tabdata5.concat(retdata)
        self.distabdata5 = true
      })
    },
    getData6 (isone) {
      this.$vux.loading.show()
      const self = this
      let params = {flag: 101, pagestart: self.pagestart6, limit: self.limit}
      if (isone) {
        params = {flag: 101, pagestart: self.tabdata6.length, limit: 1}
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata6 = self.tabdata6.concat(retdata)
        self.distabdata6 = true
      })
    },
    onItemClick () {
      const self = this
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < this.limit) {
            self.pagestart1 = 0
            self.distabdata1 = false
            this.tabdata1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            self.distabdata2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < this.limit) {
            self.pagestart3 = 0
            self.distabdata3 = false
            this.tabdata3 = []
            self.getData3()
          }
          break
        case 3:
          if (this.tabdata6.length < this.limit) {
            self.pagestart6 = 0
            self.distabdata6 = false
            this.tabdata6 = []
            self.getData6()
          }
          break
        case 4:
          if (this.tabdata4.length < this.limit) {
            self.pagestart4 = 0
            self.distabdata4 = false
            this.tabdata4 = []
            self.getData4()
          }
          break
        case 5:
          if (this.tabdata5.length < this.limit) {
            self.pagestart5 = 0
            self.distabdata5 = false
            this.tabdata5 = []
            self.getData5()
          }
          break
      }
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
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            self.distabdata2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < this.limit) {
            self.pagestart3 = 0
            self.distabdata3 = false
            this.tabdata3 = []
            self.getData3()
          }
          break
        case 3:
          if (this.tabdata6.length < this.limit) {
            self.pagestart6 = 0
            self.distabdata6 = false
            this.tabdata6 = []
            self.getData6()
          }
          break
        case 4:
          if (this.tabdata4.length < this.limit) {
            self.pagestart4 = 0
            self.distabdata4 = false
            this.tabdata4 = []
            self.getData4()
          }
          break
        case 5:
          if (this.tabdata5.length < this.limit) {
            self.pagestart5 = 0
            self.distabdata5 = false
            this.tabdata5 = []
            self.getData5()
          }
          break
      }
      this.isrefresh = false
    },
    handleListData (data) {
      let retdata = data
      retdata.dateline_str = new Time(retdata.dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
      if (retdata.pid && retdata.pid !== '') {
        retdata.pid_arr = retdata.pid.split(',')
      }
      if (retdata.flag !== 1) {
        let curprice = retdata.price
        if (curprice && curprice !== '') {
          curprice = curprice.replace(/,/g, '')
          retdata.price_num = curprice
        }
      }
      return retdata
    },
    closeConfirm () {
      this.showConfirmModal = false
      this.clickData = null
      this.clickIndex = 0
    },
    confirmPrice (item, index) {
      this.showConfirmModal = true
      this.clickData = item
      this.clickIndex = index
    },
    confirmEvent () {
      const self = this
      let postPrice = this.priceVal
      if (this.$util.trim(postPrice) === '') {
        postPrice = 0
      }
      if (isNaN(postPrice) || postPrice < 0) {
        self.$vux.toast.text('请输入正确的价格', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/order/orderState`,
        {id: this.clickData.id, type: 'confirm', price: postPrice}
      ).then(res => {
        if (res) {
          self.$vux.loading.hide()
          const data = res.data
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
          if (data.flag) {
            this.showConfirmModal = false
            let newData = this.handleListData(data.data)
            switch (this.selectedIndex) {
              case 0:
                this.tabdata1[this.clickIndex] = newData
                for (let i = 0; i < this.tabdata2.length; i++) {
                  if (this.tabdata2[i].id === data.id) {
                    this.tabdata2.splice(i, 1)
                    this.getData2(true)
                    break
                  }
                }
                break
              case 1:
                this.tabdata2.splice(this.clickIndex, 1)
                this.getData2(true)
                for (let i = 0; i < this.tabdata1.length; i++) {
                  if (this.tabdata1[i].id === data.id) {
                    this.tabdata1[i] = newData
                    break
                  }
                }
                break
            }
          }
        }
      })
    },
    changePrice (item, index) {
      const self = this
      let showtitle = '修改价格'
      let inputval = item.needpaymoney.replace(/,/g, '')
      self.$vux.confirm.prompt(inputval, {
        title: showtitle,
        onShow: () => {
          self.$vux.confirm.setInputValue(inputval)
        },
        onConfirm: (val) => {
          if (val === undefined || self.$util.trim(val) === '' || isNaN(val) || parseFloat(val) < 0) {
            self.$vux.toast.text('请输入正确的价格', 'middle')
            return false
          }
          self.$vux.loading.show()
          val = val.replace(/,/g, '')
          self.$http.post(`${ENV.BokaApi}/api/order/changePrice`,
            { id: item.id, price: val }
          ).then(res => {
            const data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  if (this.selectedIndex === 0) {
                    this.tabdata1[index].needpaymoney = parseFloat(val).toFixed(2)
                  } else if (this.selectedIndex === 1) {
                    this.tabdata2[index].needpaymoney = parseFloat(val).toFixed(2)
                  }
                }
              }
            })
          })
        }
      })
    },
    uploaddeliver (item, index) {
      const self = this
      self.deliveritem = item
      self.deliverindex = index
      for (let key in self.deliverdata) {
        if (self.deliveritem[key] && self.$util.trim(self.deliveritem[key] !== '')) {
          self.deliverdata[key] = self.deliveritem[key]
        }
      }
      if (!self.delivercompany.length) {
        self.$http.post(`${ENV.BokaApi}/api/order/delivercompany`).then(function (res) {
          let data = res.data
          self.delivercompany = data.data ? data.data : data
          if (!self.deliverdata.delivercompany || self.deliverdata.delivercompany === '-1') {
            self.deliverdata.delivercompanyname = self.delivercompany[0].name
            self.deliverdata.delivercompany = self.delivercompany[0].id
          }
        })
      } else {
        if (!self.deliverdata.delivercompany || self.deliverdata.delivercompany === '-1') {
          self.deliverdata.delivercompanyname = self.delivercompany[0].name
          self.deliverdata.delivercompany = self.delivercompany[0].id
        }
      }
      this.deliverdata = { delivercompany: '-1', delivercode: '' }
      this.showpopup = true
    },
    confirmpopup () {
      const self = this
      // if (self.deliverdata.delivercompany.toString() !== '-1' && (!self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '')) {
      if (self.deliverdata.delivercompany.toString() === '' || self.deliverdata.delivercompany.toString() === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.deliverdata.id = self.deliveritem.id
      self.deliverdata.delivercode = self.$util.trim(self.deliverdata.delivercode)
      self.$http.post(`${ENV.BokaApi}/api/order/deliver`, self.deliverdata).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              self.showpopup = false
              // self.isrefresh = true
              // self.refresh()
              let controldata = {}
              if (self.selectedIndex === 0) {
                controldata = self.tabdata1[self.deliverindex]
                self.tabdata1[self.deliverindex].flag = 3
                for (let i = 0; i < self.tabdata3.length; i++) {
                  if (self.tabdata3[i].id === controldata.id) {
                    self.tabdata3.splice(i, 1)
                    if (self.tabdata3.length >= self.limit - 1) {
                      self.getData3(true)
                    }
                    break
                  }
                }
              } else if (self.selectedIndex === 2) {
                controldata = self.tabdata3.splice(self.deliverindex, 1)
                if (self.tabdata3.length >= self.limit - 1) {
                  self.getData3(true)
                }
                for (let i = 0; i < self.tabdata1.length; i++) {
                  if (self.tabdata1[i].id === controldata.id) {
                    self.tabdata1[i].flag = 3
                    break
                  }
                }
              }
              if (self.tabdata4.length) {
                controldata.flag = 3
                self.tabdata4.splice(self.tabdata4.length - 1, 1)
                self.tabdata4 = [controldata].concat(self.tabdata4)
              }
              self.deliveritem = null
              self.deliverindex = 0
              self.deliverdata = { delivercompany: '-1', delivercode: '' }
              // if (this.isFirst) {
              //   this.showHb = true
              // }
            }
          }
        })
      })
    },
    closepopup () {
      this.showpopup = false
      self.deliveritem = null
      self.deliverindex = 0
      self.deliverdata = { delivercompany: '-1', delivercode: '' }
    },
    scanClick () {
      const self = this
      self.$wechat.scanQRCode({
        needResult: 1,
        desc: '识别物流信息',
        success: function (res) {
          if (res.errMsg === 'scanQRCode:ok') {
            let result = res.resultStr.split(',')
            if (result[0] === 'CODE_128') {
              self.deliverdata.delivercode = result[1]
            } else {
              self.$vux.toast.show({
                text: '请扫描物流条形码',
                time: 1500
              })
            }
          }
        },
        failed: function () {
          self.$vux.toast.show({
            text: '扫描失败'
          })
        }
      })
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'orders'
      })
    },
    init () {
      this.loginUser = User.get()
      this.getData()
    },
    initContainer () {
      // this.showApply = false
      // this.showContainer = false
      // this.selectedIndex = 0
      // this.distabdata1 = 0
      // this.distabdata2 = 0
      // this.distabdata3 = 0
      // this.distabdata4 = 0
      // this.tabdata1 = []
      // this.tabdata2 = []
      // this.tabdata3 = []
      // this.tabdata4 = []
      // this.pagestart1 = 0
      // this.pagestart2 = 0
      // this.pagestart3 = 0
      // this.pagestart4 = 0
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.retailerInfo = this.loginUser.retailerinfo
      this.initData()
      if (this.$route.query.from && this.loginUser.subscribe !== 1) {
        this.showTip = true
      }
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showSos = true
        } else {
          self.initContainer()
          this.$vux.loading.hide()
          document.title = this.retailerInfo.title
          this.showContainer = true
          this.query = this.$route.query
          if (this.query.flag === '1') {
            if (!this.tabdata2.length) {
              this.selectedIndex = 1
              this.swiperChange()
            }
          } else if (this.query.flag === '2') {
            if (!this.tabdata3.length) {
              this.selectedIndex = 2
              this.swiperChange()
            }
          } else if (this.query.flag === '3') {
            if (!this.tabdata4.length) {
              this.selectedIndex = 4
              this.swiperChange()
            }
          }  else if (this.query.flag === '101') {
            if (!this.tabdata6.length) {
              this.selectedIndex = 3
              this.swiperChange()
            }
          } else {
            if (!this.tabdata1.length) {
              this.selectedIndex = 0
              this.swiperChange()
            }
          }
          // if (`${this.loginUser.retailerinfo.firstinfo.orderdeliver}` === '0' && this.query.from) {
          //   this.$http.get(`${ENV.BokaApi}/api/retailer/info`).then(res => {
          //     const data = res.data
          //     if (data.flag) {
          //       this.retailerInfo = data.data
          //       this.loginUser.retailerinfo = this.retailerInfo
          //       User.set(this.loginUser)
          //       if (`${this.loginUser.retailerinfo.firstinfo.orderdeliver}` === '0' && this.query.from) {
          //         this.isFirst = true
          //         let finfo = FirstInfo.get()
          //         if (!finfo) {
          //           finfo = this.loginUser.retailerinfo.firstinfo
          //         }
          //         if (`${finfo.orderdeliver}` === '0') {
          //           this.showFirst = true
          //           finfo.orderdeliver = 1
          //         }
          //         FirstInfo.set(finfo)
          //       }
          //     }
          //   })
          // }
        }
      }
    },
    openFhbz () {
      this.showFhbz = true
    },
    closeFhbz () {
      this.showFhbz = false
    }
  },
  created () {
    this.init()
  },
  activated () {
    if (this.$refs.scrollContainer) {
      this.$refs.scrollContainer.scrollTop = this.pageTop
    }
    if (document.querySelector('.vux-tab')) {
      document.querySelector('.vux-tab').scrollLeft = this.tabLeft
    }
    this.refresh()
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
    this.showFhbz = false
    this.$util.miniPost()
  },
  beforeRouteLeave (to, from, next) {
    if (this.$refs.scrollContainer) {
      this.pageTop = this.$refs.scrollContainer.scrollTop
    }
    if (document.querySelector('.vux-tab')) {
      this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.retailerordes{
  .s-topbanner{height:99px;}
  .s-container{top:99px;}
}
.retailerordes.show-tip-page{
  .s-topbanner{top:48px;}
  .s-container{top:147px;}
}
.confirm-tip-modal{
  .modal-inner{width:80%;}
  .input{
    flex:1;height:35px;border: 1px solid #eee;box-sizing: border-box;
    border-radius:5px;padding-left:5px;padding-right:5px;
  }
  .small-cell{width:20px;}
  .btns{
    width:100%;
    .btn{width:80%;height:40px;border-radius:5px;color:#fff;font-size:16px !important;}
    .btn-cancel{background-color:#bdbdbd !important;}
    .btn-save{background-color:#ff6a61 !important;}
  }
}
.fix-home-icon{
  position:absolute;right:20px;bottom:80px;
  width:50px;height:50px;border-radius:50%;
}
.yjfhimg{max-width: 100%}
.czlc{text-align: center;color: rgb(234, 58, 58);font-size: 18px;padding: 10px;}
.tab-num{color: rgb(234, 58, 58);font-size: 16px;font-weight: bolder;text-align: center;padding: 5px}
.discribtion{text-align: center;padding: 5px;}
.copyUrl{
  text-align: center;
  /* height: 48px; */
  line-height: 48px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ff6a61;
  margin-top: 10px;
  color: white;
}
</style>
