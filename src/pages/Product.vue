<template>
  <div id="product-page" class="containerarea bg-white font14 product notop">
    <template v-if="showSos">
      <sos :title="sosTitle"></sos>
    </template>
    <template v-if="showcontainer">
      <div v-if="playVideo" class="videoarea">
        <video
          ref="productVideo"
          :src="productdata.video"
          controls
          autoplay="true"
          webkit-playsinline=""
          playsinline="true"
          x-webkit-airplay="true"
          raw-controls=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portrait">
        </video>
        <div class="close-icon flex_center" @click="stopPlay('productVideo')">关闭</div>
        <!--
        <div class="close-icon flex_center" @click="stopPlay('productVideo')">
          <i class="al al-guanbi"></i>
        </div>
      -->
      </div>
      <div id="scroll-container" class="pagemiddle scroll-container">
        <title-tip scroll-box="scroll-container" @access="access" :user="loginUser" :messages="messages" :avatar-href="loginUser.avatar" :user-name="loginUser.linkman" :user-credit="loginUser.credit"></title-tip>
        <template v-if="showFlash">
          <div :class="`fixed-topcoll flex_center btnfavorite ${favoritecss} ${startcss}`" @click="favoriteevent"><i class="al font18" style="margin-top:-2px;margin-right:3px;"></i></div>
          <swiper
            class="pic-swiper notitle"
            dots-position="center"
            :interval=6000
            :show-dots="isshowdot"
            :aspect-ratio="1/1"
            loop>
            <swiper-item v-for="(item,index) in photoarr" :key="item.id">
              <img class="db imgcover w_100 h_100" :src="item" default-src="https://tossharingsales.boka.cn/images/nopic.jpg" @click="showBigimg1(index)" />
              <template v-if="index == 0 && productdata.video && productdata.video != ''">
                <div class="play-icon flex_center" @click="clickPlay('productVideo')">
                  <i class="al al-bofang"></i>
                </div>
              </template>
            </swiper-item>
          </swiper>
        </template>
        <div class="grouptitle flex_left" v-if="activityInfo.id && activityInfo.type == 'groupbuy'">
  				<div class="col1"><span>{{ $t('RMB') }}</span><span class="font20 bold">{{ activityInfo.groupprice }}</span></div>
  				<div class="col2">
            <div class="colicon">{{ activityInfo.numbers }}人团</div>
            <span class="db-in">限购{{activityInfo.everybuy}}{{productdata.unit}}</span>
          </div>
  				<div class="col3">已团{{ productdata.havetuan }}{{productdata.unit}}</div>
  			</div>
        <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
      		<div class="clamp2">
            <span class="v_middle db-in bold" @click="copyTxt" style="position:relative;">
              <span v-if="productdata.moderate != 1" class="color-gray bold">【已下架】</span>{{ productdata.title }}
              <div class="copy_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ productdata.title }}</div>
            </span>
            <span v-if="loginUser && loginUser.groupid == 1" class="v_middle db-in color-gray font12">分享次数:{{ productdata.shares }}</span>
          </div>
          <div class="color-red">
            <span class="font18 mr3 v_middle">{{ $t('RMB') }}</span>
            <span class="font18 mr5 v_middle">{{ productdata.price }}</span>
            <span class="color-gray font14 line-through" v-if="productdata.oriprice && productdata.oriprice > 0">
              <span class="mr3 v_middle">{{ $t('RMB') }}</span>
              <span class="v_middle">{{ productdata.oriprice }}</span>
            </span>
          </div>
          <div class="flex_left font12 mt5 color-gray2">
  					<div v-if="productdata.postage == 0" class="flex_left">{{ $t('Postage') }}: 包邮</div>
  					<div v-else class="flex_left w90">{{ $t('Postage') }}: {{ $t('RMB') }}{{ productdata.postage }}</div>
            <template v-if="productdata.uploader != -1 && (productdata.buyonline == 1 && (!activityInfo.id || (activityInfo.id && activityInfo.type == 'bargainbuy')) && ((loginUser && loginUser.uid == retailerInfo.uid) || productdata.identity != 'user'))">
              <div class="flex_cell flex_center">销量: {{ productdata.saled }}{{ productdata.unit }}</div>
              <div class="flex_right color-red" @click="clickSeller"><span class="al al-bangzhu font15"></span><span>返点客佣金: {{ $t('RMB') }}{{ productdata.rebate }}</span>
              </div>
            </template>
            <template v-else-if="productdata.buyonline != 1">
              <div class="flex_cell flex_center">销量: {{ productdata.saled }}{{ productdata.unit }}</div>
    					<div class="flex_cell flex_right" @click="popupbuy">
    						<span class="help-icon">?</span>了解购买流程
    					</div>
            </template>
            <template v-else>
              <div class="flex_cell flex_right">销量: {{ productdata.saled }}{{ productdata.unit }}</div>
            </template>
  				</div>
    		</div>
        <template v-if="productdata.options && productdata.options.length">
          <div class="bg-page" style="height:10px;"></div>
          <div class="b_top_after"></div>
          <div class="padding10 b_bottom_after" @click="buyevent">
            <div class="flex_left">
              <div class="w40 flex_left">规格</div>
              <div class="flex_cell flex_left color-gray" v-if="selectedOption && selectedOption.id">{{selectedOption.title}}</div>
              <div class="flex_cell flex_left color-gray" v-else>请选择</div>
            </div>
            <div class="card-options">
              <template v-for="(item,index) in productdata.options">
                <img v-if="index < 5" :src="item.photo" />
              </template>
              <div class="flex_center txt-item">
                <div class="btn flex_center">共{{productdata.options.length}}种规格可选</div>
              </div>
            </div>
          </div>
        </template>
  			<div class="groupbuarea" v-if="activityInfo.id && activityInfo.type == 'groupbuy' && activitydata.length > 0">
  				<div class="bg-page" style="height:10px;"></div>
  				<div class="bg-white">
  					<div class="b_bottom_after padding10">正在开团，可直接参与</div>
            <div v-if="activitydata.length <= 2" v-for="(item,index) in activitydata" :key="item.id" class="scroll_item padding10">
              <div class="t-table">
                <div class="t-cell v_middle w50">
                  <img class="v_middle avatarimg1 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                </div>
                <div class="t-cell v_middle align_left">
                  <div class="clamp1">{{ item.username }}</div>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:150px;">
                  <div class="align_center">差{{ item.leftnumber }}人成团</div>
                  <div class="align_center color-gray">
                    <span class="v_middle db-in">还剩</span>
                    <span class="v_middle db-in">{{ item.lefthour }}</span>
                    <span class="v_middle db-in">:</span>
                    <span class="v_middle db-in">{{ item.leftminute }}</span>
                    <span class="v_middle db-in">:</span>
                    <span class="v_middle db-in">{{ item.leftsecond }}</span>
                  </div>
                </div>
                <div v-if="item.uid != loginUser.uid" class="t-cell v_middle align_right addgrouparea" style="width:65px;">
                  <div class="qbtn bg-red color-white btnaddgroup" style="line-height:1;" @click="addGroup(item)">去参团</div>
                </div>
              </div>
            </div>
            <template v-if="activitydata.length > 2">
              <marquee :item-height="60" :duration="5000">
                <marquee-item v-for="(item,index) in activitydata" :key="item.id">
                  <div class="scroll_item padding10" v-for="(item, index) in activitydata" :key="index">
          					<div class="t-table">
          						<div class="t-cell v_middle w50">
                        <img class="v_middle avatarimg1 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          						</div>
          						<div class="t-cell v_middle align_left">
          							<div class="clamp1">{{ item.username }}</div>
          						</div>
          						<div class="t-cell v_middle align_right font12" style="width:150px;">
          							<div class="align_center">差{{ item.leftnumber }}人成团</div>
          							<div class="align_center color-gray">
                          <span class="v_middle db-in">还剩</span>
                          <span class="v_middle db-in">{{ item.lefthour }}</span>
                          <span class="v_middle db-in">:</span>
                          <span class="v_middle db-in">{{ item.leftminute }}</span>
                          <span class="v_middle db-in">:</span>
                          <span class="v_middle db-in">{{ item.leftsecond }}</span>
          							</div>
          						</div>
          						<div v-if="item.uid != loginUser.uid" class="t-cell v_middle align_right addgrouparea" style="width:65px;">
          							<div class="qbtn bg-red color-white btnaddgroup" style="line-height:1;" @click="addGroup(item)">去参团</div>
          						</div>
          					</div>
          				</div>
                </marquee-item>
              </marquee>
            </template>
  				</div>
  			</div>
  			<div class="evluatearea" v-if="productdata.buyonline >= 1 && evluatedata.length > 0">
  				<div class="bg-page" style="height:10px;"></div>
  				<div class="bg-white">
  					<div class="b_bottom_after pl10 pr10 pt5 pb5">
  						<div class="t-table">
  							<div class="t-cell">宝贝评价</div>
  							<div class="t-cell align_right">
  								<div class="font12 color-red padding5" @click="popupevluate">查看更多></div>
  							</div>
  						</div>
  					</div>
            <div class="scroll_list">
              <template v-if="evluatedata.length == 0">
                <div class="scroll_item emptyitem">
        					<div class="t-table">
        						<div class="t-cell" style="padding:10px;">暂无评价</div>
        					</div>
        				</div>
              </template>
              <div v-else v-for="(item,index) in evluatedata" :key="item.id" class="scroll_item padding10">
      					<div class="t-table">
      						<div class="t-cell pic" style="width:40px;">
                    <img class="v_middle avatarimg imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  </div>
      						<div class="t-cell">{{ item.username }}</div>
      						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
      					</div>
      					<div class="mt5" v-html="filterEmot(item.message)"></div>
      					<div class="mt5 align_right" v-if="productdata.uploader == loginUser.uid">
                  <div class="bg-orange color-white qbtn" style="width:50px;padding:0px;line-height:25px;" @click="onReply(item)">回复</div>
      					</div>
      					<div class="mt5" v-if="item.comment && item.comment.length > 0">
          				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
          					<div class="title clear pt5 pb5">
          						<div class="color-gray font12" style="padding-left:6px;position:relative;">
          							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
          							<span class="color-orange">卖家</span> 回复 :<span v-html="filterEmot(citem.message)"></span>
          						</div>
          					</div>
          				</div>
          			</div>
      				</div>
            </div>
  				</div>
  			</div>
        <div v-show="disBuyFriends">
          <div class="bg-page" style="height:10px;"></div>
          <div class="bg-white b_bottom_after">
            <div class="pt10 pl10 pr10">购买过本店商品的好友</div>
            <div class="flex_left pb10">
              <div class="buylist" ref="buyList">
                <router-link class="item" :to="{path:'/chat',query:{uid:item.uid,fromModule:'product',fromId:query.id, from: query.from}}" v-for="(item,index) in buyuserdata" :key="index">
                  <div class="pic">
                    <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  </div>
                  <div class="txt">
                    <div class="clamp1 font12 color-gray2 align_center">{{ item.username }}</div>
                  </div>
                </router-link>
              </div>
              <div v-if="disMore" class="moreicon flex_center color-red" @click="moreFriends">
                <i class="al al-asmkticon0165 v_middle"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-page" style="height:10px;"></div>
        <div class="b_top_after"></div>
        <div class="padding10 b_bottom_after">
          <router-link class="t-table" :to="{path:'/store',query:{ wid: retailerInfo.uid}}" style="color:inherit;">
    				<div class="t-cell v_middle" style="width:70px;">
              <img class="v_middle imgcover" style="width:60px;height:60px;" :src="retailerInfo.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
    				<div class="t-cell v_middle">
    					<div class="distitle clamp2">{{ retailerInfo.title }}</div>
    					<div class="distitle clamp2 color-gray font12 mt5">全部宝贝: {{ retailerInfo.productcount }}件</div>
    				</div>
    				<div class="t-cell v_middle align_right" style="width:80px;">
    					<div class="qbtn4 color-orange5 font12 border-color-orange5" style="padding: 1px 8px;">进店逛逛</div>
    				</div>
          </router-link>
        </div>
        <div class="flex_center pt10 pb10 bg-page color-gray">—— 详情 ——</div>
        <div class="productcontent">
          <div v-html="productdata.content"></div>
          <img v-for="(item,index) in previewerPhotoarr" :key="index" :src="item.src" @click="showBigimg(index)" />
        </div>
        <div class="productarea scrollendarea scrollend">
          <div class="inner">
            <div class="txt1">{{WeixinName}}</div>
            <div class="txt2">-- 社交电商2.0 --</div>
          </div>
        </div>
      </div>
  		<div class="pagebottom b_top_after" v-if="productdata.moderate != 1">
  			<div class="t-table h_100">
          <router-link class="t-cell h_100 v_middle align_center" :to="{path:'/store',query:{ wid: retailerInfo.uid}}" style="width:40px;">
            <div><i class="al al-dianpu font18 color-red"></i></div>
            <div class="font12">店铺</div>
          </router-link>
          <router-link class="t-cell h_100 v_middle align_center center-cell" to="/center">
            <div><i class="al al-peoplefill font18 color-red"></i></div>
            <div class="font12">个人中心</div>
          </router-link>
          <div class="t-cell bg-orange1 color-white h_100 v_middle align_center" @click="toChat">我要咨询</div>
        </div>
  		</div>
      <template v-else>
    		<div v-if="activityInfo.id && activityInfo.type == 'groupbuy'" class="pagebottom b_top_after groupbybottom">
    			<div class="t-table h_100">
            <router-link class="t-cell h_100 v_middle align_center" :to="{path:'/store',query:{ wid: retailerInfo.uid}}" style="width:40px;">
              <div><i class="al al-dianpu font18 color-red"></i></div>
              <div class="font12">店铺</div>
            </router-link>
            <div class="t-cell h_100 v_middle align_center" @click="toChat" style="width:40px;">
              <div><i class="al al-buoumaotubiao10 font16 color-red"></i></div>
              <div class="font12">咨询</div>
            </div>
            <router-link class="t-cell h_100 v_middle align_center center-cell" to="/center">
              <div><i class="al al-peoplefill font18 color-red"></i></div>
              <div class="font12">个人中心</div>
            </router-link>
    				<div v-if="productdata.storage > 0" class="t-cell color-white h_100 v_middle align_center " @click="buyevent">
              <div class="w_100 flex_center">
                <div class="w_100 bg-orange1" style="border-top-left-radius:20px;border-bottom-left-radius:20px;padding-top:2px;overflow:hidden;">
                  <div class="font12">原价购买</div>
        					<div class="font12" style="margin-top:-4px;">{{ $t('RMB') }} {{ productdata.price }}</div>
                </div>
              </div>
    				</div>
    				<div class="t-cell color-white h_100 v_middle align_center " @click="buyevent('groupbuy')">
              <div class="w_100 flex_center">
                <div class="w_100 bg-red2" style="border-top-right-radius:20px;border-bottom-right-radius:20px;padding-top:2px;overflow:hidden;">
                  <div class="font12">一键拼团</div>
        					<div class="font12" style="margin-top:-4px;">{{ $t('RMB') }} {{ activityInfo.groupprice }}</div>
                </div>
              </div>
    				</div>
    			</div>
    		</div>
        <template v-else>
      		<div v-if="productdata.buyonline >= 1" class="pagebottom b_top_after">
      			<div class="t-table h_100">
              <router-link class="t-cell h_100 v_middle align_center" :to="{path:'/store',query:{ wid: retailerInfo.uid}}" style="width:40px;">
                <div><i class="al al-dianpu font18 color-red"></i></div>
                <div class="font12">店铺</div>
              </router-link>
              <router-link class="t-cell h_100 v_middle align_center center-cell" to="/center">
                <div><i class="al al-peoplefill font18 color-red"></i></div>
                <div class="font12">个人中心</div>
              </router-link>
              <div class="t-cell bg-orange1 color-white h_100 v_middle align_center" @click="toChat">我要咨询</div>
      				<div v-if="productdata.storage <= 0" class="t-cell color-white h_100 v_middle align_center bg-gray">已售罄</div>
      				<div v-else class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent">立即购买</div>
      			</div>
      		</div>
          <div v-else class="pagebottom b_top_after">
      			<div class="t-table h_100">
              <router-link class="t-cell h_100 v_middle align_center" :to="{path:'/store',query:{ wid: retailerInfo.uid}}" style="width:40px;">
                <div><i class="al al-dianpu font18 color-red"></i></div>
                <div class="font12">店铺</div>
              </router-link>
              <router-link class="t-cell h_100 v_middle align_center center-cell" to="/center">
                <div><i class="al al-peoplefill font18 color-red"></i></div>
                <div class="font12">个人中心</div>
              </router-link>
              <div class="t-cell bg-orange1 color-white h_100 v_middle align_center" @click="toChat">我要咨询</div>
      			</div>
      		</div>
        </template>
      </template>
      <div v-if="query.newadd && showsharetip" class="sharetiplayer" @click="closeSharetip">
  			<div class="ico"><i class="al al-feiji"></i></div>
  			<div class="txt">点击···，分享给好友或朋友圈吧！</div>
  			<div class="pic">
  				<img src="https://tossharingsales.boka.cn/images/share1.jpg" />
  			</div>
  		</div>
      <div v-transfer-dom class="x-popup" v-if="productdata.buyonline != 1">
        <popup v-model="showpopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">购买流程</div>
            <div class="popup-middle font14">
              <div class="padding10">
    						<div class="mt12 color-gray2">您可以点击下方《我要咨询》，与卖家互加微信好友，以传统类似微商交易模式通过微信沟通咨询下单支付即可。</div>
    						<div class="mt12 color-gray2">温馨提示：</div>
    						<div class="mt12 color-gray2">1. 长按下方二维码关注公众号即可查询订单物流信息。</div>
    						<div class="mt12 color-gray2">2. 平台仅提供商品展示，线下交易出现任何纠纷平台概不负责。</div>
    						<div class="align_center">
    							<img style="max-width:50%;" :src="weixin_qrcode" />
    						</div>
    					</div>
            </div>
            <div class="popup-bottom flex_center bg-orange color-white" @click="closepopup">{{ $t('Know txt') }}</div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showevluate" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">评价</div>
            <div class="popup-middle font14 evluate-popup-container" ref="evluatePopContainer" @scroll="handleScrollEvaluate('evluatePopContainer')">
              <div v-if="disPopEvluate" class="scroll_list">
                <template v-if="evluatedata1.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无评价</div>
          					</div>
          				</div>
                </template>
                <div v-else v-for="(item,index) in evluatedata1" :key="item.id" class="scroll_item padding10">
        					<div class="t-table">
        						<div class="t-cell pic" style="width:40px;">
                      <img class="v_middle avatarimg imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        						</div>
        						<div class="t-cell">{{ item.username }}</div>
        						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
        					</div>
        					<div class="mt5" v-html="filterEmot(item.message)"></div>
        					<div class="mt5 align_right" v-if="productdata.uploader == loginUser.uid">
                    <div class="bg-orange color-white qbtn" style="width:50px;padding:0px;line-height:25px;" @click="onReply(item)">回复</div>
        					</div>
        					<div class="mt5" v-if="item.comment && item.comment.length > 0">
            				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
            					<div class="title clear pt5 pb5">
            						<div class="color-gray font12" style="padding-left:6px;position:relative;">
            							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
            							<span class="color-orange">卖家</span> 回复 :<span v-html="filterEmot(citem.message)"></span>
            						</div>
            					</div>
            				</div>
            			</div>
        				</div>
              </div>
            </div>
            <div class="popup-bottom flex_center bg-gray color-white" @click="closepopup1">{{ $t('Close') }}</div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showMoreFriends" height="100%">
          <div class="popup1 tagpopup">
            <div class="popup-top flex_center">购买过的好友</div>
            <div class="popup-middle">
              <router-link :to="{path:'/chat',query:{uid:item.uid, from: query.from}}" v-for="(item,index) in friendsData" :key="item.uid" class="db scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <div :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                    <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  </div>
                  <div :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray">{{item.username}}</div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="popup-bottom flex_center bg-orange color-white" @click="closeFriendsPopup">
              <span>{{ $t('Close') }}</span>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerFlasharr" ref="previewerFlash"></previewer>
      </div>
      <template v-if="loginUser && showShareSuccess">
        <share-success
          v-if="productdata.uploader === loginUser.uid || query.wid === loginUser.uid || productdata.identity !== 'user'"
          :data="productdata"
          :loginUser="loginUser"
          :module="module"
          :on-close="closeShareSuccess">
        </share-success>
      </template>
      <comment-popup style="z-index:600;" :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit" @on-cancel="replyPopupCancel"></comment-popup>
    </template>
    <div class="modalshow" v-if="showShareLayer && !query.share_uid" @click="closeShareLayer">
      <div class="modaInfo">
        <div class="al al-feiji color-white"></div>
        <div class="align_center color-white bold">
          <div>1. 点击右上角" ··· "分享到微信群</div>
          <div class="mt5">2. 群成员点击查看或购买都可获得收入</div>
        </div>
        <div class="btnknow" @click="closeShareLayer">知道了</div>
      </div>
    </div>
    <template v-if="showSellerTip">
      <tip-layer title="什么是返点客佣金" content="当你成为某个卖家的返点客用户时，你销售该卖家的某件商品所得到的佣金，返点客佣金只有返点客才能看到。" @clickClose="closeSellerTip"></tip-layer>
    </template>
    <div v-transfer-dom class="x-popup buy-popup-layer">
      <popup v-model="showBuy" height="100%">
        <div class="product-options-area columnarea">
          <div class="column-content" @click="closeOptions"></div>
          <div class="options-box columnarea">
            <div class="close-area flex_center color-gray" @click="closeOptions"><span class="al al-close"></span></div>
            <div class="column-content columnarea">
              <div class="part1 flex_left">
                <div class="pic flex_left">
                  <img :src="selectedOption.photo" @click="viewBigImg(0)" />
                </div>
                <div class="flex_cell flex_left">
                  <div class="w_100">
                    <div class="color-theme"><span>￥</span><span class="bold font16">{{productdata.price}}</span></div>
                    <div class="mt10 color-gray">库存{{selectedOption.storage}}{{productdata.unit}}</div>
                    <div class="mt10" v-if="selectedOption.title">已选: {{selectedOption.title}}</div>
                    <div class="mt10" v-else>请选择 规格</div>
                  </div>
                </div>
              </div>
              <div class="part2 column-content">
                <div class="pt10">规格</div>
                <div class="options-list">
                  <div v-for="(item,index) in productdata.options" :class="`options-item ${(selectedOptionIndex == index && item.storage > 0) ? 'active' : ''} ${item.storage <= 0 ? 'disabled' : ''}`" @click="clickOptions(item,index)">
                    <div class="flex_center">
                      <img :src="item.photo" /><span class="ml5">{{item.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="options-bottom flex_center">
              <div class="flex_cell h_100 flex_center">
                <div v-if="activityInfo.id && activityInfo.type == 'groupbuy'" class="bg-theme color-white flex_center btn" @click="buyOption">原价购买</div>
                <div v-else class="bg-theme color-white flex_center btn" @click="buyOption">立即购买</div>
              </div>
              <div class="flex_cell h_100 flex_center" v-if="activityInfo.id && activityInfo.type == 'groupbuy'">
                <div class="bg-orange color-white flex_center btn" @click="buyOption('groupbuy')">一键拼团</div>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerOptionsPhoto" ref="previewerOption"></previewer>
    </div>
  </div>
</template>

<i18n>
Selection promotion:
  zh-CN: 精选促销
All products:
  zh-CN: 全部商品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
</i18n>

<script>
import { Previewer, Swiper, SwiperItem, TransferDom, Popup, Marquee, MarqueeItem, XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import CommentPopup from '@/components/CommentPopup'
import Sos from '@/components/Sos'
import TitleTip from '@/components/TitleTip'
import TipLayer from '@/components/TipLayer'
import Time from '#/time'
import jQuery from 'jquery'
import ENV from 'env'
import { User } from '#/storage'
import Socket from '#/socket'

const limit = 10
let pageStart = 0
let room = ''
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, Swiper, SwiperItem, Popup, Marquee, MarqueeItem, Groupbuyitemplate, Bargainbuyitemplate, ShareSuccess, CommentPopup, Sos, XImg, TitleTip, TipLayer
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  data () {
    return {
      module: 'product',
      query: {},
      disTimeout: true,
      showSos: false,
      sosTitle: '',
      showcontainer: false,
      showShareSuccess: false,
      showsharetip: true,
      productid: null,
      productdata: {},
      retailerInfo: {},
      activityInfo: {},
      loginUser: {},
      isshowtop: false,
      waitgetcredit: 100,
      showFlash: false,
      showdot: true,
      showpopup: false,
      showevluate: false,
      weixin_qrcode: ENV.WeixinQrcode,
      favoritecss: 'none',
      isfavorite: false,
      flashdata: [],
      photoarr: [],
      contentphotoarr: [],
      previewerPhotoarr: [],
      previewerFlasharr: [],
      buyuserdata: [],
      evluatedata: [],
      evluatedata1: [],
      disPopEvluate: false,
      replyPopupShow: false,
      ingdata: [],
      activitydata: [],
      submitdata: { flag: 1, quantity: 1 },
      replyData: null,
      messages: 0,
      showVideo: true,
      playVideo: false,
      disBuyFriends: false,
      disMore: false,
      friendsData: [],
      pageStart2: 0,
      showMoreFriends: false,
      startcss: 'start',
      showShareLayer: false,
      WeixinName: ENV.WeixinName,
      showSellerTip: false,
      showBuy: false,
      selectedOption: {},
      selectedOptionIndex: 0,
      previewerOptionsPhoto: []
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    loginUser: function () {
      return this.loginUser
    },
    productdata: function () {
      return this.productdata
    },
    productid: function () {
      return this.productid
    },
    retailerInfo: function () {
      this.submitdata.wid = this.retailerInfo.uid
      return this.retailerInfo
    },
    buyuserdata: function () {
      return this.buyuserdata
    },
    favoritecss: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.favoritecss
    },
    isfavorite: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.isfavorite
    },
    photoarr: function () {
      const self = this
      if (self.photoarr.length > 0 || !self.$util.isNull(self.productdata.video)) {
        self.showFlash = true
      }
      return this.photoarr
    },
    showFlash: function () {
      return this.showFlash
    },
    evluatedata: function () {
      return this.evluatedata
    },
    previewerOptionsPhoto () {
      console.log('监控规格图片的变化')
      return this.previewerOptionsPhoto
    }
  },
  computed: {
    isshowdot: function () {
      if (this.photoarr.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    }
  },
  methods: {
    initData () {
      this.disTimeout = true
      this.showSos = false
      this.sosTitle = ''
      this.showcontainer = false
      this.showShareSuccess = false
      this.showVideo = true
      this.showsharetip = true
      this.productid = null
      this.productdata = {}
      this.retailerInfo = {}
      this.activityInfo = {}
      this.showFlash = false
      this.showdot = true
      this.showpopup = false
      this.showevluate = false
      this.favoritecss = 'none'
      this.isfavorite = false
      this.flashdata = []
      this.photoarr = []
      this.contentphotoarr = []
      this.previewerPhotoarr = []
      this.previewerFlasharr = []
      this.buyuserdata = []
      this.evluatedata = []
      this.evluatedata1 = []
      this.disPopEvluate = false
      this.replyPopupShow = false
      this.ingdata = []
      this.activitydata = []
      this.submitdata = { flag: 1, quantity: 1 }
      this.replyData = null
      this.messages = 0
      this.disBuyFriends = false
      this.disMore = false
      this.playVideo = false
      this.startcss = 'start'
      this.showShareLayer = false
      this.showBuy = false
      this.selectedOption = {}
      this.selectedOptionIndex = 0
      this.previewerOptionsPhoto = []
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    closeOptions () {
      this.showBuy = false
    },
    clickOptions (item, index) {
      this.selectedOption = item
      this.selectedOptionIndex = index
      this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
    },
    addShop (buytype) {
      let isActivity = false
      this.$vux.loading.show()
      let postData = this.submitdata
      if (buytype === 'groupbuy' && this.activityInfo.id) {
        postData.activityid = this.activityInfo.id
        isActivity = true
      }
      postData.id = this.productdata.id
      postData.wid = this.retailerInfo.uid
      if (this.query.wechatorderid) {
        postData.wechatorderid = this.query.wechatorderid
      }
      if (this.productdata.options.length && this.selectedOption && this.selectedOption.id) {
        postData.poid = this.selectedOption.id
      }
      this.$http.post(`${ENV.BokaApi}/api/order/addShop`, postData).then((res) => {
        let data = res.data
        this.$vux.loading.hide()
        if (data.flag === 1) {
          let rparams = {id: data.data}
          if (isActivity) {
            rparams['activityid'] = this.activityInfo.id
          }
          this.$router.push({ path: '/addOrder', query: rparams })
        } else if (data.error) {
          this.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    buyOption (buytype) {
      if (!this.selectedOption.id) {
        this.$vux.toast.text('请选择商品规格', 'middle')
        return false
      }
      if (this.selectedOption.storage <= 0) {
        this.$vux.toast.text('该规格商品库存不足', 'middle')
        return false
      }
      this.addShop(buytype)
    },
    clickSeller () {
      this.showSellerTip = true
    },
    closeSellerTip () {
      this.showSellerTip = false
    },
    copyTxt () {
      const self = this
      let eleobj = jQuery('#product-page .copy_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
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
    closeShareLayer () {
      this.showShareLayer = false
    },
    clickPlay (refname) {
      const self = this
      this.playVideo = true
      setTimeout(function () {
        self.$refs[refname].play()
      }, 100)
    },
    stopPlay (refname) {
      this.playVideo = false
    },
    toChat () {
      if (this.loginUser.uid === this.productdata.wid) {
        this.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (this.loginUser.subscribe === 0) {
          const originHref = encodeURIComponent(`${ENV.Host}/#/chat?uid=${this.retailerInfo.uid}&fromModule=product&fromId=${this.query.id}`)
          const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
        } else {
          this.$router.push({path: '/chat', query: {uid: this.retailerInfo.uid, fromModule: 'product', fromId: this.query.id, from: this.query.from}})
        }
      }
    },
    access () {
      if (this.loginUser.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        this.$router.push('/center')
      }
    },
    closeSharetip () {
      this.showsharetip = false
    },
    popupbuy () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    popupevluate () {
      const self = this
      this.showevluate = true
      if (self.evluatedata1.length < limit) {
        self.disPopEvluate = false
        self.evluatedata1 = []
        self.$vux.loading.show()
        this.getEvaluateList()
      }
    },
    closepopup1 () {
      this.showevluate = false
    },
    getEvaluateList () {
      const self = this
      let params = { module: self.module, nid: self.productid, pagestart: pageStart, limit: limit }
      self.$http.get(`${ENV.BokaApi}/api/comment/list`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.evluatedata1 = self.evluatedata1.concat(retdata)
        self.disPopEvluate = true
      })
    },
    handleScrollEvaluate (refname) {
      const self = this
      let scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.evluatedata1.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getEvaluateList()
          }
        }
      })
    },
    favoriteevent () {
      const self = this
      if (self.isfavorite) {
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/delete`,
          { params: { module: self.module, id: self.productid } }
        ).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.isfavorite = false
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      } else {
        let cururl = `/product?id=${self.productid}`
        if (self.query.wid) {
          cururl = `${cururl}&wid=${self.query.wid}`
        }
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/add`,
          { params: { module: self.module, id: self.productid, currenturl: encodeURIComponent(cururl) } }
        ).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.isfavorite = true
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
      this.isfavorite = !this.isfavorite
    },
    buyevent (buytype) {
      if (this.productdata.options.length) {
        if (!this.selectedOption || !this.selectedOption.id) {
          this.selectedOption = this.productdata.options[0]
          this.selectedOptionIndex = 0
          this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
        }
        this.showBuy = true
      } else {
        this.addShop(buytype)
      }
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        if (window.WeixinJSBridge) {
          let viewarr = self.contentphotoarr.length > 0 ? self.contentphotoarr : self.photoarr
          window.WeixinJSBridge.invoke('imagePreview', {
            current: viewarr[index],
            urls: viewarr
          })
        }
      }
    },
    showBigimg1 (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerFlash.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.photoarr[index],
          urls: self.photoarr
        })
      }
    },
    viewBigImg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerOption.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: this.selectedOption.photo,
          urls: [this.selectedOption.photo]
        })
      }
    },
    closeShareSuccess () {
      this.showShareSuccess = false
      this.showVideo = true
    },
    handleNewAdd () {
      const self = this
      if (self.query.newadd) {
        setTimeout(function () {
          self.showsharetip = false
        }, 10000)
      }
    },
    handelShare () {
      const self = this
      let shareData = {
        module: self.module,
        moduleid: self.productid,
        link: `${ENV.Host}/#/product?id=${self.productid}&wid=${self.productdata.wid}&share_uid=${self.loginUser.uid}&wechatorderid=${this.query.wechatorderid}`,
        successCallback: function () {
          self.showShareSuccess = true
          self.showVideo = false
        }
      }
      if (self.query.share_uid) {
        shareData.link = `${shareData.link}&lastshareuid=${self.query.share_uid}`
        shareData.lastshareuid = self.query.share_uid
      }
      if (self.activityInfo && self.activityInfo.id && self.activityInfo.type === 'groupbuy') {
        shareData.title = self.productdata.title
        shareData.desc = `${self.loginUser.linkman}向你推荐团购商品，参团购买可立享优惠，了解详情`
        shareData.photo = self.photoarr[0]
      } else {
        shareData.data = self.productdata
      }
      self.$util.handleWxShare(shareData)
    },
    cutdown (item, interval) {
      interval = setInterval(function () {
        let h = parseInt(item.lefthour)
        let m = parseInt(item.leftminute)
        let s = parseInt(item.leftsecond)
        if (s > 0) {
          s--
          if (s < 10) {
            item.leftsecond = '0' + s
          } else {
            item.leftsecond = s
          }
        } else if (m > 0) {
          m--
          if (m < 10) {
            item.leftminute = '0' + m
          } else {
            item.leftminute = m
          }
          item.leftsecond = '59'
        } else if (h > 0) {
          h--
          if (h < 10) {
            item.lefthour = '0' + h
          } else {
            item.lefthour = h
          }
          item.leftminute = '59'
          item.leftsecond = '59'
        }
        if (h === 0 && m === 0 && s === 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    addGroup (item) {
      const self = this
      self.$vux.loading.show()
      let postdata = self.submitdata
      postdata.crowdowner = item.uid
      postdata.activityid = item.activityid
      postdata.id = self.productdata.id
      self.$http.post(`${ENV.BokaApi}/api/order/addShop`, postdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          self.$router.push({ path: '/addOrder', query: { id: data.data } })
        } else if (data.error) {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    onReply (item) {
      this.replyData = item
      this.replyPopupShow = true
    },
    replyPopupCancel () {
      this.replyPopupShow = false
    },
    replySubmit (value) { // 回复提交
      this.replyPopupShow = false
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.replyData.id, module: 'comments', message: value})
      .then(res => {
        let data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: self.$util.delay(data.error)
        })
        if (res.data.flag) {
          if (!self.replyData.comment) {
            self.replyData.comment = []
          }
          self.replyData.comment.push(res.data.data)
        }
      })
    },
    getData () {
      const self = this
      this.productid = this.query.id
      let infoparams = { id: this.productid, module: this.module }
      if (this.query.wid) {
        infoparams.wid = this.query.wid
      }
      if (this.query.share_uid) {
        infoparams.share_uid = this.query.share_uid
      }
      if (this.query.lastshareuid) {
        infoparams.lastshareuid = this.query.lastshareuid
      }
      if (this.query.from === 'poster') {
        infoparams.from = 'poster'
      }
      if (this.query.wechatorderid) {
        infoparams.wechatorderid = this.query.wechatorderid
      }
      this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
        params: infoparams
      }).then((res) => {
        if (res && res.status === 200) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag !== 1) {
            self.sosTitle = data.error
            self.showSos = true
          } else {
            self.showcontainer = true
            self.productdata = data.data
            if (this.productdata.options.length) {
              this.selectedOption = {storage: this.productdata.storage, photo: this.productdata.options[0].photo}
              this.previewerOptionsPhoto = this.$util.previewerImgdata([this.productdata.options[0].photo])
            }
            self.retailerInfo = self.productdata.retailerinfo
            if (self.productdata.activityinfo) {
              self.activityInfo = self.productdata.activityinfo
            }
            document.title = self.productdata.title
            self.handleNewAdd()
            const photo = self.productdata.photo
            if (photo && self.$util.trim(photo) !== '') {
              self.photoarr = photo.split(',')
            }
            if (self.photoarr.length > 0) {
              self.showFlash = true
              self.previewerFlasharr = self.$util.previewerImgdata(self.photoarr)
            }
            if (!self.$util.isNull(self.productdata.video)) {
              self.showFlash = true
            }
            const content = self.productdata.content
            const contetnphoto = self.productdata.contentphoto
            if ((!content || self.$util.trim(content) === '') && (!contetnphoto || self.$util.trim(contetnphoto) === '')) {
              self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
            } else if (contetnphoto && self.$util.trim(contetnphoto) !== '') {
              self.contentphotoarr = contetnphoto.split(',')
              self.previewerPhotoarr = self.$util.previewerImgdata(self.contentphotoarr)
            }
            self.handelShare()
            return self.$http.get(`${ENV.BokaApi}/api/message/newMessages`)
          }
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          self.messages = data.data
          return self.$http.get(`${ENV.BokaApi}/api/retailer/friendBuy`, {
            params: { wid: self.retailerInfo.uid, productid: self.productid }
          })
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          if (data.flag === 1) {
            self.buyuserdata = data.data
            if (self.buyuserdata.length > 0) {
              self.disBuyFriends = true
              self.getMoreStatus(self)
            }
          }
          return self.$http.get(`${ENV.BokaApi}/api/user/favorite/show`,
            { params: { module: self.module, id: self.productid } }
          )
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          if (data.flag === 1) {
            self.isfavorite = true
          } else {
            self.isfavorite = false
          }
          return self.$http.get(`${ENV.BokaApi}/api/comment/list`,
            { params: { module: self.module, nid: self.productid, pagestart: 0, limit: 3 } }
          )
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          if (data.flag === 1) {
            self.evluatedata = data.data
          }
          if (self.activityInfo && self.activityInfo.id && self.activityInfo.type === 'groupbuy') {
            return self.$http.get(`${ENV.BokaApi}/api/activity/crowdUser`,
              { params: { id: self.activityInfo.id } }
            )
          }
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (let i = 0; i < retdata.length; i++) {
            let d = retdata[i]
            let lefttime = d.lefttime
            d.lefthour = lefttime.hour
            d.leftminute = lefttime.minute
            d.leftsecond = lefttime.second
            d.interval = null
            self.cutdown(d, d.interval)
          }
          self.activitydata = retdata
        }
      })
    },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      // const fromId = this.query.fromId
      room = `${this.module}-${this.query.id}`
      Socket.listening({room: room, uid: uid, linkman: linkman, fromModule: this.module, fromId: this.query.id})
    },
    handleScroll2 (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.friendsData.length === (self.pageStart2 + 1) * self.limit) {
            self.pageStart2++
            self.$vux.loading.show()
            self.getFriends()
          }
        }
      })
    },
    getFriends () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/retailer/friendBuy`, {
        params: { wid: self.retailerInfo.uid, productid: self.productid }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          let retdata = data.data ? data.data : data
          self.friendsData = retdata
        }
      })
    },
    moreFriends () {
      const self = this
      this.showMoreFriends = true
      self.getFriends()
    },
    closeFriendsPopup () {
      this.showMoreFriends = false
    },
    getMoreStatus (self) {
      const wW = window.innerWidth
      const disCols = Math.floor(wW / 48)
      let buyList = self.$refs.buyList[0] ? self.$refs.buyList[0] : self.$refs.buyList
      if (self.buyuserdata.length > disCols - 1) {
        const listW = (disCols - 1) * 48
        buyList.style.flex = ''
        buyList.style.width = `${listW}px`
        self.disMore = true
      } else {
        buyList.style.width = ''
        buyList.style.flex = '1'
        self.disMore = false
      }
    },
    init () {
      // this.$util.wxAccess()
      this.$util.wxAccessListening()
    },
    refresh () {
      const self = this
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      setTimeout(() => {
        self.startcss = ''
      }, 15300)
      this.loginUser = User.get()
      if (this.loginUser) {
        this.initData()
        this.showShareSuccess = false
        this.showVideo = true
        this.query = this.$route.query
        if (this.query.iswechat) {
          this.showShareLayer = true
        }
        this.$vux.loading.show()
        this.getData()
        this.createSocket()
      }
      window.onresize = function () {
        if (self.buyuserdata.length > 0) {
          self.getMoreStatus(self)
        }
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
  // beforeRouteLeave (to, from, next) {
  //   Socket.destory(room)
  //   next()
  // }
}
</script>

<style lang="less">
.notop .pagetop{display:none;}
.product{
  .card-options{
    display: flex;flex-wrap: wrap;
    img{width:30px;height:30px;margin-right:10px;object-fit:cover;margin-top:10px;}
    .txt-item{margin-top:10px;}
    .btn{border-radius:10px;background-color:#ccc;color:#999;font-size:12px;height:22px;padding:0 10px;}
  }
}
.product .videobg{width:100%;height:100%;background-size:cover;background-position:center;position:relative;}
.product .play-icon{
  width:60px;height:60px;background: rgba(0,0,0,.4);border-radius: 50%;color:#fff;
  position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;
}
.product .play-icon .al{margin-left:4px;}
.product .videoarea{position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:#000;color:#fff;}
.product .videoarea video{position: absolute;width: 100%;height: 100%;}
.product .videoarea .close-icon{position:absolute;left:50%;top:7px;width:60px;height:30px;margin-left:-30px;background-color:#232323;color:#fff;border-radius:10px;}
.product .fixed-topcoll{position:absolute;right:0;top:20px;z-index:10;width:80px;height:35px;border-top-left-radius:20px;border-bottom-left-radius:20px;background-color:rgba(153,153,153,0.8);color:#fff;}
.product .fixed-topcoll.start{top:60px;}
.vline{position:relative;}
.vline:after {
  content: " ";
  display: block;
  position: absolute;
  width: 2px;
  top: 4px;
  bottom: 4px;
  margin: auto 0;
  left: -1px;
  background-color: #ff6600;
}
.product .buylist:after{
  content:'';
  display:block;
  clear:both;
}
.product .buylist .item{
  float: left;
  width: 50px;
  text-align: center;
  display:block;
  color:inherit;;
}
.productcontent{
  padding:20px 15px;
}
.product .productcontent img{
  max-width:100%;
  vertical-align: middle;
}
.product .productarea.scrollend:after {
    background-color: #f6f6f6;
}

.product .pagetop{
  box-shadow: 0px 0px 10px 3px #d0d0d0;
}
.product .pagemiddle{top:50px;}
.product.notop .pagemiddle{top:0px;}
.product .numicon {
    position: absolute;
    top: 0;
    right: -15px;
    background: #f06825;
    padding: 0 1px;
    border-radius: 16%;
    color: #fff;
    font-size: 10px;
    min-width: 18px;
    text-align: center;
}
.product .pic-swiper{box-sizing: border-box;width:100%;max-height:375px;}
.product .pic-swiper:after{content:"";padding-top:100%;display:block;}
.product .pic-swiper .vux-swiper{
  position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
}
.product .vux-swiper-item {}
.product .vux-swiper-item img{}
.product .vux-swiper-desc{display:none !important;}
.product .grouptitle{
  width:100%;
  height: 45px;
  color: #fff;
  font-size: 12px;
  background-image: url(../assets/images/productbg.png);
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  position:relative;
}
.product .grouptitle .t-table{height:100%;}
.product .grouptitle .t-cell{height:100%;vertical-align:middle;}
.product .grouptitle .col1{padding-left:10px;padding-right:10px;display:inline-block;}
.product .grouptitle .col2{display:inline-block;margin-top:2px;}
.product .grouptitle .col3{
	display:inline-block;border-radius:10px;padding:1px 10px;text-align:center;background-color:rgba(0,0,0,0.1);
	position:absolute;right:10px;top:50%;margin-top:-9px;
}
.product .grouptitle .col2 .colicon{display:inline-block;border-radius:10px;border:#fff 1px solid;padding:1px 10px;text-align:center;}
.product .help-icon{
  color:#ff3b30;
  border:#ff3b30 1px solid;
  border-radius:50%;
  display:inline-block;
  width:13px;height:13px;
  font-size:10px;
  text-align:center;
  line-height:14px;
}

.product .btnfavorite.have .al:before{content:"\e68c";color:red;}
.product .btnfavorite.none .al:before{content:"\e68b";}
.product .groupbybottom .btnfavorite:after{display:block;}
.product .btnfavorite.none:after{content:"收藏";}
.product .btnfavorite.have:after{content:"已收藏";}

.product .center-cell{width:60px;}

.product .pagemiddle{bottom:50px;}
.product .pagebottom{height:50px;}

.product .buylist{display:flex;overflow:hidden;}
.product .buylist:after{
  content:'';
  display:block;
  clear:both;
}
.product .buylist .item{
  width: 48px;padding-top:10px;
  text-align: center;display:block;color:inherit;
}
.product .buylist .pic{padding-left:10px;width:38px;}
.product .buylist img{width:38px;height:38px;vertical-align:middle;object-fit: cover;border-radius:50%;}
.product .buylist .txt{padding-left:10px;width:38px;}
.product .moreicon{width:48px;}
.product{
  .modalshow{
    position:absolute;left:0;right:0;bottom:0;top:0;z-index:1000;background-color:rgba(0,0,0,0.8);box-sizing: border-box;
    .modaInfo{
      display:flex;flex-direction:column;margin-top: 60px;
      .al{font-size:80px;margin-left:auto;margin-right: 100px;}
    }
    .btnknow{padding:3px 25px;border:1px solid #fff;color:#fff;margin: 0 auto;border-radius:20px;font-size:14px;margin-top: 20px;}
  }
}
</style>
