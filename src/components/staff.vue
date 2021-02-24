<style lang="less">

</style>

<template>
  <div class="padding10">
    <div class="box-outer">
      <div class="box-title">获客</div>
      <div class="box-list square">
       <router-link to="/activityList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-huodong1"></span>
            </div>
            <div class="txt">活动</div>
          </div>
        </router-link>
        <router-link to="/qiyeNewsList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-wenzhang3"></span>
            </div>
            <div class="txt">文章</div>
          </div>
        </router-link>
        <router-link to="/qiyeProductList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-shangpin"></span>
            </div>
            <div class="txt">产品</div>
          </div>
        </router-link>
      </div>
      <div class="box-list square">
        <router-link to="/qiyePoster" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-zhaopian"></span>
            </div>
            <div class="txt">海报</div>
          </div>
        </router-link>
        <router-link to="/wechatGroup" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-weixinqun"></span>
            </div>
            <div class="txt">客户群</div>
          </div>
        </router-link>
        <!-- <router-link to="" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-weixin"></span>
            </div>
            <div class="txt">微信</div>
          </div>
        </router-link> -->
        <div class="list-item ico-pic-item"></div>
      </div>
    </div>
    <div class="box-outer mt10">
      <div class="box-title">服务</div>
      <div class="box-list square">
        <router-link to="/qiyeCustomerList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-kehufuwu"></span>
            </div>
            <div class="txt">客户服务</div>
          </div>
        </router-link>
        <router-link to="/pushList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-service"></span>
            </div>
            <div class="txt">精准服务</div>
          </div>
        </router-link>
        <router-link to="/buyerShow" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-maijiaxiu2"></span>
            </div>
            <div class="txt">买家秀</div>
          </div>
        </router-link>
      </div>
      <div class="box-list square">
        <!-- <router-link to="" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-daodianfuwu"></span>
            </div>
            <div class="txt">到店服务</div>
          </div>
        </router-link> -->
        <router-link to="/serveActivity" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-huodong"></span>
            </div>
            <div class="txt">活动</div>
          </div>
        </router-link>
        <div class="list-item ico-pic-item"></div>
        <div class="list-item ico-pic-item"></div>
      </div>
    </div>
    <div class="box-outer mt10">
      <div class="box-title">销售</div>
      <div class="box-list square">
        <router-link to="/saleCustomerList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-kehuliebiao"></span>
            </div>
            <div class="txt">客户列表</div>
          </div>
        </router-link>
        <div class="list-item ico-pic-item"></div>
        <div class="list-item ico-pic-item"></div>
        <!-- <router-link to="/retailSale" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-fenxiao"></span>
            </div>
            <div class="txt">分销</div>
          </div>
        </router-link>
        <router-link to="/saleChance" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-xiaoshoujihui"></span>
            </div>
            <div class="txt">销售机会</div>
          </div>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Staff',
  props: {
    user: {
      type: Object,
      default: {}
    }
  }
}
</script>
