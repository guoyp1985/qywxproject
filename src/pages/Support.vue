<template>
  <div class="containerarea bg-page font14 support">
    <div class="padding10 color-gray bg-white b_bottom_after">使用过程中如有疑问，欢迎联系下方客服</div>
    <div class="scroll_list bg-white">
      <div class="b_bottom_after">
        <div class="disgroupname font15 right_arrow padding10 bg-gray9">售前</div>
      </div>
      <div class="pl10 pr10 supportgroup">
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
      </div>
    </div>
    <div class="scroll_list bg-white">
      <div class="b_bottom_after">
        <div class="disgroupname font15 right_arrow padding10 bg-gray9">投诉</div>
      </div>
      <div class="pl10 pr10 supportgroup">
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
        <a class="scroll_item pt10 pb10 db b_bottom_after" style="color:inherit;">
          <div class="flex_table">
            <div class="flex_left pic">
            <img class="disavatar w40 h40" src="http://osslaravel.boka.cn/avatar/1/31.jpg"/>
            </div>
            <div class="flex_cell flex_left">
              <div class="distitle pl10">郭亚平</div>
              <div class="disdescription font12"></div>
            </div>
            <div class="flex_right w50 align_center">{{$t('Contacted')}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'

export default {
}
</script>

<style lang="css" scoped>
.right_arrow{position: relative;}
.right_arrow:after{
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 17px;
}
.right_arrow.active:after{transform:rotate(135deg);}
.supportgroup .b_bottom_after:last-child:after{display:none;}
</style>
