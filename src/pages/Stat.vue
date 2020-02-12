<template>
  <div class="containerarea font14 notop nobottom stat-page">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <Sos v-if="showSos" :title="sosTitle"></Sos>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div v-if="showTip" class="border-box db-flex top-subscribe-tip">
          <div class="flex_cell h_100 flex_left">
            <i class="al al-gantanhaozhong font20"></i><span>关注公众号可及时接收私信提醒</span>
          </div>
          <div class="w80 h_100 flex_right">
            <div class="btn flex_center" @click="toSubscribe">立即关注</div>
          </div>
        </div>
        <div v-if="query.from == 'miniprogram'" class="v-top font16 color-white clamp1">{{ data.title }}</div>
        <template v-else>
          <router-link v-if="module == 'activity' && data.type === 'groupbuy'" :to="{path: '/product', query: {id: query.id}}" class="v-top font16 color-white clamp1">{{ data.title }}</router-link>
          <div v-else class="v-top font16 color-white clamp1">{{ data.title }}</div>
        </template>
        <div v-if="statData && statData.length > 0" class="radiusarea mb10 pb15 bg-white list-shadow01">
          <div class="item" v-for="(item,index) in statData" :key="index">
            <div class="inner">
              <!-- <div class="radius font15 clamp1" v-if="item.key == 'salesmoney'">{{ item.value }}</div>
              <div class="radius font22 clamp1" v-else>{{ item.value }}</div> -->
              <div class="radius font22 clamp1" v-if="item.value.length <= 4">{{ item.value }}</div>
              <div class="radius font15 clamp1" v-else-if="item.value.length > 4">{{ item.value }}</div>
              <div class="radius font12 clamp1" v-else>{{ item.value }}</div>
              <div class="title color-gray">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <template v-if="tabsdata && tabsdata.length > 0">
          <div class="tabarea bg-white">
            <tab v-model="selectedIndex" class="v-tab">
              <tab-item v-for="(item,index) in tabsdata" :key="index" @on-item-click="swiperChange(index)">{{ item.title }}</tab-item>
            </tab>
          </div>
          <div v-show="selectedIndex == index" v-for="(tabitem, index) in tabsdata" :key="index">
            <div v-if="tabitem.type == 'shareview'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'buylist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.username }}</div>
                      <div class="clamp1 color-gray">订单金额：{{$t('RMB')}}{{ item.special }}</div>
                      <div class="clamp1 color-gray">购买时间：{{ item.dateline | dateformat }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'sharelist' || tabitem.type == 'factorysharelist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.username }}</div>
                      <div class="clamp1 color-gray">传播级别: {{ item.level }}</div>
                      <div class="clamp1 color-gray" v-if="item.yingxiangli && item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                    <div class="w60 flex_right">
                      <div class="qbtnInfo bg-red color-white" v-if="item.external != 1" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'asklist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1">{{ item.content }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'viewlist' || tabitem.type == 'factoryviewlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.username }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                      <div class="clamp1 color-gray" v-if="item.yingxiangli && item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="color-gray">
                        <div class="clamp1 w_100">停留: {{ item.staytime | staytimeFormat }}  阅读: {{ item.number }}次</div>
                      </div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'second'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="clamp1 color-gray">停留: {{ item.staytime | staytimeFormat }}  阅读: {{ item.number }}次</div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'crowdlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="flex_left"><span class="clamp1 color-gray2 pr5" style="max-width:60%;">{{ item.linkman }}</span><span class="clamp1 color-orange">{{ item.isfull }}</span></div>
                      <div class="color-gray">团员: {{ item.otherusers }}</div>
                      <div class="clamp1 color-gray">开团时间: {{ item.dateline }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'crowdlist_isdeliver_1'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'crowdlist_isdeliver_0'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray">
                        <span class="db-in">已砍到: <span class="color-orange">{{ $t('RMB') }}{{ item.currentprice }}</span></span>
                        <span class="db-in ml5">助力: {{ item.sumothers }}人</span>
                      </div>
                      <div class="clamp1 color-gray">{{ item.dateline }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'agentlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic" @click="toMembersView(item)">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20" @click="toMembersView(item)">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray" v-if="query.module != 'factoryproduct'">{{ item.dateline | dateformat }}</div>
                      <div class="clamp1 color-gray" v-if="item.external != 1">影响力: {{ item.yingxiangli }}<template v-if="item.percent">  成交概率: {{ item.percent }}%</template></div>
                      <div class="color-gray">
                        <div class="clamp1 w_100">停留: {{ item.staytime | staytimeFormat }}  阅读: {{ item.number }}次</div>
                      </div>
                    </div>
                    <div class="w60 flex_right" v-if="item.external != 1">
                      <div class="qbtnInfo bg-red color-white" @click="toChat(item)">联系</div>
                    </div>
                  </div>
                  <div v-if="item.checked" class="detail_card">
                    <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                      <div class="txt-item" @click="expandEvent(item, index1)">性别: {{userData[item.uid].sexname}}</div>
                      <div class="txt-item db-flex" v-if="userData[item.uid].mobile && userData[item.uid].mobile != ''" @click="toPhone(item)">手机: <span>{{userData[item.uid].mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font14"></span></div></div>
                      <div class="txt-item" @click="expandEvent(item, index1)">地区: {{ userData[item.uid].country }} {{ userData[item.uid].province }} {{ userData[item.uid].city }}</div>
                      <div class="txt-item flex_left" v-if="item.external != 1" @click="influence">影响力:
                        <span class="color-red4">{{userData[item.uid].yingxiangli}}</span>
                        <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                      </div>
                      <div class="txt-item">推荐人: {{userData[item.uid].uploadname}}</div>
                      <div class="txt-item" v-if="userData[item.uid].uid != loginUser.uid">客户类型: {{userData[item.uid].customertype}}</div>
                      <div class="txt-item">获客时间: {{userData[item.uid].dateline_str}}</div>
                    </div>
                    <div class="flex_center bg-white h40">
                      <div class="t-table align_center color-gray2 font14 color-gray2">
                        <div class="t-cell v_middle b_right_after" v-if="item.external != 1" @click="toChat(item)">
                          <div>联系TA</div>
                        </div>
                        <div class="t-cell v_middle" @click="toMembersView(item)">更多</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'retailerShare'" class="scroll_list border-box">
              <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
              <template v-else v-for="(item,index1) in arrData">
                <router-link v-if="item.module === 'retailer'" to="/centerSales" class="scroll_item db padding10">
                  <div class="flex_left">
                    <div>
                      <img class="imgcover" style="width:50px;height:50px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">分享次数: {{ item.shares }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                </router-link>
                <router-link v-else :to="{path: `/${item.module}`,query:{id: item.moduleid,wid: item.wid}}" class="scroll_item db padding10">
                  <div class="flex_left">
                    <div>
                      <img class="imgcover" style="width:50px;height:50px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">分享次数: {{ item.shares }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                </router-link>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'productlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <router-link :to="{path: '/factoryproduct', query: {id:item.id,fid: item.uploader}}">
                      <img class="imgcover" :src="item.photo" style="width:50px;height:50px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </router-link>
                    <router-link :to="{path: '/factoryproduct', query: {id:item.id,fid: item.uploader}}" class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </router-link>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'newslist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <router-link :to="{path: '/factorynews', query: {id:item.id,fid: item.uploader}}" class="pic">
                      <img class="imgcover" :src="item.photo" style="width:50px;height:50px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </router-link>
                    <router-link :to="{path: '/factorynews', query: {id:item.id,fid: item.uploader}}" class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </router-link>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'academiclist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <router-link class="pic" :to="{path: '/academic', query: {id:item.id,fid: item.uploader}}">
                      <img class="imgcover" :src="item.photo" style="width:50px;height:50px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </router-link>
                    <router-link :to="{path: '/academic', query: {id:item.id,fid: item.uploader}}" class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </router-link>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'factorycardlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else-if="tabitem.type == 'factoryagentlist'" class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic">
                      <img class="avatarimg2 imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.title }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else class="scroll_list border-box">
              <template>
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                  <div class="flex_left">
                    <div class="pic">
                      <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="flex_cell pl10 pr20">
                      <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                      <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, XImg, Sos, Subscribe, ApplyTip
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      showApply: false,
      showSos: false,
      sosTitle: '该信息不存在',
      showContainer: false,
      loginUser: {},
      query: {},
      module: '',
      data: {},
      arrData: [],
      selectedIndex: 0,
      statData: [],
      tabsdata: [],
      tabtop: 'auto',
      scrollData: [],
      datalist: [],
      isFirst: true,
      clickTabitem: null,
      clickTabIndex: 0,
      userData: {},
      showTip: false
    }
  },
  watch: {
    datalist () {
      return this.datalist
    },
    // arrData () {
    //   console.log('监控到数据变化')
    //   console.log(this.arrData)
    //   return this.arrData
    // },
    arrData: {
      handler: function (newVal, oldVal) {
      },
      deep: true
    }
  },
  methods: {
    initData () {
      this.sosTitle = '该信息不存在'
      this.query = this.$route.query
      this.module = this.query.module
      this.selectedIndex = 0
      this.arrData = []
      this.statData = []
      this.tabsdata = []
      this.scrollData = []
      this.isFirst = true
    },
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    expandEvent (item, index) {
      let curDataList = this.arrData
      if (item.checked) {
        this.arrData[index].checked = false
      } else {
        for (let i = 0; i < curDataList.length; i++) {
          if (i !== index && curDataList[i].checked) {
            this.arrData[i].checked = false
            break
          }
        }
        if (this.userData[item.uid]) {
          this.arrData[index].checked = true
        } else {
          this.$http.get(`${ENV.BokaApi}/api/retailer/customerView?customeruid=${item.uid}`).then(res => {
            const data = res.data
            const retdata = data.data ? data.data : data
            retdata.dateline_str = new Time(retdata.dateline * 1000).dateFormat('yyyy-MM-dd')
            let sex = '未知'
            if (retdata.sex === 1) {
              sex = '男'
            } else if (retdata.sex === 2) {
              sex = '女'
            }
            retdata.sex_str = sex
            this.userData[item.uid] = retdata
            this.arrData[index].checked = true
            console.log(this.arrData)
          })
        }
      }
    },
    handleScroll (refname) {
      const self = this
      const index = this.selectedIndex
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.datalist[index].length === (self.scrollData[index].pagestart + 1) * limit) {
            self.scrollData[index].pagestart++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const item = self.clickTabitem
      const index = this.selectedIndex
      let params = { type: item.type, id: self.query.id, pagestart: self.scrollData[index].pagestart, limit: limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      if (self.module === 'factorynews' || self.module === 'fpimport') {
        params.from = 'miniprograms'
      }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/${self.module}`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.datalist[index] = self.datalist[index].concat(retdata)
        self.arrData = self.datalist[index]
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      const index1 = this.selectedIndex
      this.clickTabitem = this.tabsdata[index1]
      if (self.scrollData.length === 0) {
        for (let i = 0; i < self.tabsdata.length; i++) {
          self.scrollData.push({ pagestart: 0 })
          self.datalist.push([])
        }
      }
      if (this.datalist[index1].length < limit) {
        this.datalist[index1] = []
        self.$vux.loading.show()
        this.getData1()
      } else {
        self.arrData = self.datalist[index1]
      }
    },
    getData () {
      const self = this
      let statParams = { id: self.query.id }
      if (self.query.wid) {
        statParams.wid = self.query.wid
      }
      if (self.module === 'factorynews' || self.module === 'fpimport') {
        statParams.from = 'miniprograms'
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: this.module, action: 'stat', id: this.query.id })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/statData/${self.module}`, { params: statParams }))
      .then(res => {
        self.$vux.loading.hide()
        self.showcontainer = true
        let data = res.data
        self.data = data.moduleinfo
        if (!self.data || self.data.length === 0) {
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.statData = data.data ? data.data : data
          self.tabsdata = data.detail
          document.title = `统计-${self.data.title}`
          self.clickTabitem = self.tabsdata[0]
          self.swiperChange()
        }
      })
    },
    toMembersView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toChat (item) {
      let uid = item.uid
      if (item.gxkuid) {
        uid = item.gxkuid
      }
      let params = this.$util.handleAppParams(this.query, {uid: uid})
      this.$router.push({path: '/chat', query: params})
    },
    init () {
      this.$vux.loading.show()
      this.module = this.query.module
      this.getData()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
      self.showSos = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.$route.query.from && this.loginUser.subscribe !== 1) {
        this.showTip = true
      }
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!this.loginUser.isretailer && !this.loginUser.fid && !isAdmin) {
          self.initContainer()
          this.sosTitle = '抱歉，您暂无权限访问此页面！'
          this.showSos = true
        } else {
          if (this.query.module !== this.$route.query.module || this.query.id !== this.$route.query.id || this.query.wid !== this.$route.query.wid) {
            self.initContainer()
            this.sosTitle = '该信息不存在'
            this.query = this.$route.query
            this.module = this.query.module
            this.initData()
            this.getData()
          } else if (this.showContainer) {
            this.swiperChange()
          }
        }
      }
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:20px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
.stat-page{
  .detail_card{background-color:#fff;}
  .detailInfo{
    display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
    .txt-item{width:50%;box-sizing:border-box;line-height:25px;}
    .txt-item:nth-child(odd){padding-right:5px;}
    .txt-item:nth-child(even){padding-left:5px;}
  }
  .qbtnInfo{width:50px;text-align:center;border-radius: 50px;}
}
</style>
