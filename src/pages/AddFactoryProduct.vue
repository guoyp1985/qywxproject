<template>
  <div class="containerarea s-havebottom font14 add-factory-product-page">
    <template v-if="showSos">
      <sos :title="sosTitle"></sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container" style="top:0;">
        <form ref="fileForm" enctype="multipart/form-data">
          <input ref="fileInput" class="hide" type="file" multiple="multiple" name="files" @change="fileMulChange('fileForm', 'photo')" />
        </form>
        <form ref="fileForm1" enctype="multipart/form-data">
          <input ref="fileInput1" class="hide" type="file" multiple="multiple" name="files" @change="fileMulChange('fileForm1', 'contentphoto')" />
        </form>
        <form ref="optioinsForm" enctype="multipart/form-data">
          <input ref="optionsInput" class="hide" type="file" name="files" @change="fileOptionChange('optioinsForm')" />
        </form>
        <div class="list-shadow01">
          <div class="form-item no-after pt15 bg-gray10">
            <div class="cover_map" v-if="photoarr.length == 0" @click="uploadPhoto('fileInput','photo')">
              <div class="button_photo">
                <i class="al al-zhaoxiangji color-white"></i>
              </div>
            </div>
            <div class="cover_maplist mt12" v-if="photoarr.length > 0">
              <input v-model="submitdata.photo" type="hidden" name="photo">
              <div class="q_photolist align_left">
                <template v-if="photoarr.length > 0">
                  <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                    <div class="inner photo" :photo="item">
                      <img :src="item" class="pic" @click="uploadPhoto('fileInput','photo',index)" />
                      <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                      <div class="move-ico prev" v-if="index > 0" @click.stop="movePhoto('photo',index,'prev')"><span class="al al-qianyi"></span></div>
                      <div class="move-ico next" v-if="photoarr.length > 1 && index < photoarr.length - 1" @click.stop="movePhoto('photo',index,'next')"><span class="al al-houyi"></span></div>
                    </div>
                  </div>
                </template>
                <div v-if="photoarr.length >= 1 && photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput','photo')">
                  <div class="inner">
                    <div class="innerlist">
                      <div class="flex_center h_100">
                        <div class="txt">
                          <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                          <div><span class="havenum">{{ photoarr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt10 pb5 align_center">
              <p class="font14 color-gray5">封面图像(最多9张) <span class="al al-xing color-red font12" style="vertical-align: 2px;"></span></p>
            </div>
          </div>
          <div v-if="classData.length" class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product class') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <select v-model="submitdata.classid" class="w_100" style="height:35px;">
                  <option value='0'>请选择</option>
                  <option v-for="(item,index) in classData" :value="item.id">{{ item.title }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea
                    ref="titleTextarea"
                    v-model="submitdata.title"
                    name="title"
                    class="x-textarea noborder"
                    :placeholder="$t('Product name')"
                    :show-counter="false"
                    :rows="1"
                    :max="30"
                    @on-change="textareaChange('titleTextarea')"
                    @on-focus="textareaFocus('titleTextarea')"
                    autosize>
                  </x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="pt10 bg-page"></div>
          <div class="flex_center">
            <div class="form-item required bg-white bright">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">商品现价<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.price" @keyup="priceChange('price')" maxlength="7" size="7" type="text" class="input priceInput" name="price" placeholder="现价" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
            <div class="form-item required bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">商品原价</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.oriprice" @keyup="priceChange('oriprice')" maxlength="7" size="7" type="text" class="input priceInput" name="oriprice" placeholder="原价" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
          </div>
          <div class="flex_row">
            <div class="form-item required bg-white bright">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">猫价</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.tb_price" @keyup="priceChange('tb_price')" maxlength="7" size="7" type="text" class="input priceInput" name="tb_price" placeholder="猫价" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
            <div class="form-item required bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">狗价</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.jd_price" @keyup="priceChange('jd_price')" maxlength="7" size="7" type="text" class="input priceInput" name="jd_price" placeholder="狗价" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
          </div>
          <div class="pt10 bg-page"></div>

          <!-- 商品利润 -->
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">商品利润</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.profit" @keyup="priceChange('profit')" type="text" class="input priceInput" name="profit" :placeholder="$t('Saled profit')" ></x-input>
              </div>
              <div class="t-cell v_middle align_center" style="width:30px;" @click="clickTip">
                <i class="al al-wenhao color-red"></i>
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="flex_row">
            <div class="form-item required bg-white bright">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">销售佣金</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.salesrebate" @keyup="priceChange('salesrebate')" maxlength="7" size="7" type="text" class="input priceInput" name="salesrebate" placeholder="销售佣金" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
            <div class="form-item required bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">推荐人佣金</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.superrebate" @keyup="priceChange('superrebate')" maxlength="7" size="7" type="text" class="input priceInput" name="superrebate" placeholder="推荐人佣金" ></x-input>
                </div>
                <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
              </div>
            </div>
          </div>
          <div class="pt10 bg-page"></div>
          <div class="form-item required bg-white" v-if="!optionsData.length">
            <div class="flex_row">
              <div class="flex_cell">
                <div class="t-table">
                  <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product') }}{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <x-input v-model="submitdata.storage" type="tel" class="input" name="storage" :placeholder="$t('Storage')" maxlength="5" size="5" ></x-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">限购个数</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.limitbuy" type="text" class="input priceInput" name="limitbuy" placeholder="限购个数" ></x-input>
              </div>
            </div>
          </div> -->
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Postage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.postage" @keyup="priceChange('postage')" type="text" class="input priceInput" name="postage" :placeholder="$t('Postage')" ></x-input>
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>

          <div class="form-item required bg-white">
            <div class="flex_left">商品规格</div>
            <div class="option-list">
              <div class="option-item" v-for="(item,index) in optionsData" :key="index">
                <div class="option-title flex_left">
                  <div class="flex_cell flex_left">规格 {{index + 1}}</div>
                  <div class="w60 flex_right color-theme" @click="deleteOption(index)">删除</div>
                </div>
                <div class="option-con">
                  <div class="flex_left con-item">
                    <div class="title-cell1 flex_left">规格名称</div>
                    <div class="border-cell flex_left flex_cell">
                      <x-input v-model="item.title" :max="15" type="text" class="input" placeholder="规格名称" ></x-input>
                    </div>
                  </div>
                  <div class="flex_left mt10 con-item">
                    <div class="title-cell1 flex_left">图片</div>
                    <div class="border-cell flex_left flex_cell">
                      <div class="flex_left flex_cell option-pic-list">
                        <img v-if="optionsPhoto[index] && optionsPhoto[index] != ''" class="option-pic" :src="optionsPhoto[index]" @click="previewImg(index,item.photoarr,`previewer${index}`)"/>
                      </div>
                      <div class="icon-cell flex_center" @click="uploadOptionPhoto('optionsInput',index)"><span class="al al-zhaoxiangji font18 color-theme"></span></div>
                    </div>
                    <template v-if="optionsPhoto[index] && optionsPhoto[index] != ''">
                      <div v-transfer-dom>
                        <previewer :list="item.previewerPhoto" :ref="`previewer${index}`"></previewer>
                      </div>
                    </template>
                  </div>
                  <div class="flex_left mt10 con-item">
                    <div class="title-cell1 flex_left">库存</div>
                    <div class="border-cell flex_left flex_cell">
                      <x-input v-model="item.storage" @keyup="optionStorageChange(index)" type="tel" class="input" :placeholder="$t('Storage')" maxlength="5" size="5" ></x-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex_center pt10 pb10">
              <div class="color-theme btn-add flex_center" @click="addOption">添加一项</div>
            </div>
          </div>

          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">商品优势</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.sellingpoint" type="text" class="input" name="sellingpoint" placeholder="请夸一夸你的商品吧" :max="30"></x-input>
              </div>
            </div>
          </div>

          <!-- 是否为加盟礼包 -->
          <!-- <div class="form-item bg-white">
            <div class="t-table">
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-switch title='是否为加盟礼包' v-model="submitdata.isgift"></x-switch>
              </div>
            </div>
          </div> -->

          <div class="pl12 pr12 pt10 bg-white">文字介绍</div>
          <group class="textarea-outer textarea-text bg-white">
            <x-textarea
              ref="contentTextarea"
              v-model="submitdata.content"
              name="content"
              class="x-textarea"
              :placeholder="$t('Product description')"
              :show-counter="false"
              :rows="1"
              @on-change="textareaChange('contentTextarea')"
              @on-focus="textareaFocus('contentTextarea')"
              autosize>
            </x-textarea>
          </group>
          <div class="pl12 pr12 pt10 b_top_after bg-white">详情图像<span class="color-gray">（图像宽高不受限制）</span></div>
          <div class="b_bottom_after bg-white pl12 pr12 pb5">
            <input v-model="submitdata.contentphoto" type="hidden" name="contentphoto" />
            <div class="q_photolist align_left bg-white">
              <template v-if="photoarr1.length > 0">
                <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
                  <div class="inner photo imgcover" :photo="item">
                    <img :src="item" class="pic" @click="uploadPhoto('fileInput1','contentphoto',index)" />
                    <div class="close" @click="deletephoto(item,index,'contentphoto')">×</div>
                    <div class="move-ico prev" v-if="index > 0" @click.stop="movePhoto('content',index,'prev')"><span class="al al-qianyi"></span></div>
                    <div class="move-ico next" v-if="photoarr1.length > 1 && index < photoarr1.length - 1" @click.stop="movePhoto('content',index,'next')"><span class="al al-houyi"></span></div>
                  </div>
                </div>
              </template>
              <div v-if="photoarr1.length < maxnum1" class="photoitem add" @click="uploadPhoto('fileInput1','contentphoto')">
                <div class="inner">
                  <div class="innerlist">
                    <div class="flex_center h_100">
                      <div class="txt">
                        <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                        <div><span class="havenum">{{ gethavenum1 }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">视频</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div class="q_photolist align_left" style="overflow:hidden;">
                  <form ref="videoForm" class="db" enctype="multipart/form-data" v-if="videoarr.length == 0">
                    <div class="button_video flex_center">
                      <i class="al al-ai-video color-white"></i>
                      <input ref="videoInput" type="file" name="files" @change="fileChange('videoForm', 'video')" />
                    </div>
                  </form>
                  <div v-else v-for="(item,index) in videoarr" :key="index" class="videoitem photoitem">
                    <div class="inner photo imgcover" :photo="item" style="border:#ccc 1px solid;">
                      <div class="flex_center" style="position:absolute;left:0;top:0;bottom:0;right:0;">
                        <i class="al al-ai-video"></i>
                        <div class="close" @click="deletephoto(item,index,'video')">×</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showmore">
            <div class="form-item bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share title') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitdata.seotitle" type="text" class="input" name="seotitle" :placeholder="$t('Product share title placeholder')" ></x-input>
                </div>
              </div>
            </div>
            <div class="form-item bg-white no-after">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="descTextarea"
                      v-model="submitdata.seodescription"
                      name="seodescription"
                      class="x-textarea noborder"
                      :placeholder="$t('Product share description placeholder')"
                      :show-counter="false"
                      :rows="1"
                      @on-change="textareaChange('descTextarea')"
                      @on-focus="textareaFocus('descTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('More') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </div>
      <div class="s-bottom flex_center color-white list-shadow02">
        <div class="flex_cell flex_center color-white btn-bottom-red" @click="saveupevent">{{ $t('Shelf sale') }}</div>
      </div>
      <div v-if="showTip" class="auto-modal flex_center">
        <div class="modal-inner border-box" style="width:80%;">
          <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">商品利润</div>
          <div class="align_left txt padding10">
            <div>商品利润是指销售该商品可获得的利润。</div>
            <div class="mt10">例如：商品现价为<span class="color-red">100元</span>，商品的成本是<span class="color-red">80元</span>，该商品利润为<span class="color-red">100-80=20元</span>。</div>
            <div class="mt10">设置商品利润是为了计算销售佣金以及推荐人佣金。</div>
          </div>
          <div class="close-area flex_center" @click="closeTip">
            <i class="al al-close"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Previewer, Group, XInput, XTextarea, XSwitch } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, Group, XInput, XTextarea, Sos, XSwitch
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      data: {},
      photoarr: [],
      maxnum: 9,
      havenum: 0,
      photoarr1: [],
      maxnum1: 29,
      havenum1: 0,
      videoarr: [],
      maxnum2: 1,
      havenum2: 0,
      showmore: false,
      submitdata: {
        classid: '0',
        title: '',
        oriprice: '',
        price: '',
        tb_price: '',
        jd_price: '',
        postage: '0.00',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: '',
        profit: '',
        salesrebate: '',
        superrebate: '',
        sellingpoint: ''
      },
      allowsubmit: true,
      requireddata: {title: '', 'price': '', 'postage': '', 'photo': ''},
      levels: [],
      classData: [],
      submitIng: false,
      showTip: false,
      // optionsData: [{title: '', photo: '', storage: ''}],
      optionsData: [],
      selectedOptionIndex: 0,
      optionsPhoto: [],
      clickPhotoIndex: -1
    }
  },
  watch: {
    submitdata: function () {
      return this.submitdata
    },
    havenum: function (val) {
      this.havenum = this.photoarr.length
      return this.havenum
    },
    havenum1: function (val) {
      this.havenum1 = this.photoarr1.length
      return this.havenum1
    },
    optionsPhoto: {
      handler: (newval) => {
        console.log('监控规格的变化 ')
        console.log(newval)
      },
      deep: true
    }
  },
  computed: {
    gethavenum: function () {
      return this.photoarr.length
    },
    gethavenum1: function () {
      return this.photoarr1.length
    }
  },
  methods: {
    initSubmitData () {
      this.submitdata = {
        classid: '0',
        title: '',
        oriprice: '',
        price: '',
        tb_price: '',
        jd_price: '',
        postage: '0.00',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: '',
        video: '',
        profit: '',
        salesrebate: '',
        superrebate: '',
        sellingpoint: ''
      }
      this.photoarr = []
      this.photoarr1 = []
      // this.optionsData = [{title: '', photo: '', storage: ''}]
      this.optionsData = []
      this.selectedOptionIndex = 0
      this.optionsPhoto = []
      this.videoarr = []
    },
    movePhoto (type, index, move) {
      let moveindex
      let curphoto = ''
      let movephoto = ''
      if (move === 'prev') {
        moveindex = index - 1
      } else {
        moveindex = index + 1
      }
      if (type === 'photo') {
        curphoto = this.photoarr[index]
        movephoto = this.photoarr[moveindex]
        this.photoarr[index] = movephoto
        this.photoarr[moveindex] = curphoto
        let lastphoto = this.photoarr.splice(this.photoarr.length - 1, 1)
        this.photoarr.push(lastphoto)
      } else {
        curphoto = this.photoarr1[index]
        movephoto = this.photoarr1[moveindex]
        this.photoarr1[index] = movephoto
        this.photoarr1[moveindex] = curphoto
        let lastphoto = this.photoarr1.splice(this.photoarr1.length - 1, 1)
        this.photoarr1.push(lastphoto)
      }
    },
    addOption () {
      this.optionsData.push({})
    },
    deleteOption (index) {
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          let deleteOptions = this.optionsData[index]
          if (deleteOptions.id) {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/delete/factoryproductoptions`, {
              id: deleteOptions.id
            }).then((res) => {
              this.$vux.loading.hide()
              let data = res.data
              let error = data.flag ? '删除成功' : data.error
              this.$vux.toast.show({
                text: error,
                type: data.flag ? 'success' : 'warn',
                time: this.$util.delay(error)
              })
              if (data.flag) {
                this.optionsData.splice(index, 1)
                this.optionsPhoto.splice(index, 1)
                if (!this.optionsData.length) {
                  this.submitdata.storage = 0
                }
              }
            })
          } else {
            this.optionsData.splice(index, 1)
            this.optionsPhoto.splice(index, 1)
          }
        }
      })
    },
    previewImg (index, arr, refname) {
      const self = this
      if (self.$util.isPC()) {
        let view = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
        view.show(index)
      } else {
        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('imagePreview', {
            current: arr[0],
            urls: arr
          })
        }
      }
    },
    handleOptionPhoto (photo) {
      if (!this.optionsData[this.selectedOptionIndex]) {
        this.optionsData[this.selectedOptionIndex] = {}
      }
      this.optionsData[this.selectedOptionIndex].photo = photo
      this.optionsData[this.selectedOptionIndex].photoarr = [photo]
      this.optionsData[this.selectedOptionIndex].previewerPhoto = this.$util.previewerImgdata(this.optionsData[this.selectedOptionIndex].photoarr)
      if (this.optionsPhoto.length > this.selectedOptionIndex) {
        this.optionsPhoto.splice(this.selectedOptionIndex, 1, photo)
        console.log('上传后')
        console.log(this.optionsPhoto)
      } else {
        this.optionsPhoto.push(photo)
      }
    },
    fileOptionChange (refname) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then((res) => {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag) {
            this.handleOptionPhoto(data.data)
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    uploadOptionPhoto (refname, index) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      this.selectedOptionIndex = index
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 1,
            handleCallback: (data) => {
              if (data.flag === 1) {
                self.handleOptionPhoto(data.data)
              } else if (data.error) {
                self.$vux.toast.show({
                  text: data.error,
                  time: self.$util.delay(data.error)
                })
              }
            }
          })
        })
      }
    },
    clickTip () {
      this.showTip = true
    },
    closeTip () {
      this.showTip = false
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (this.clickPhotoIndex > -1) {
          if (type === 'photo') {
            self.photoarr[this.clickPhotoIndex] = data.data
            let lastphoto = this.photoarr.splice(this.photoarr.length - 1, 1)
            this.photoarr.push(lastphoto)
            self.submitdata.photo = self.photoarr.join(',')
          } else if (type === 'contentphoto') {
            self.photoarr1[this.clickPhotoIndex] = data.data
            let lastphoto = this.photoarr1.splice(this.photoarr1.length - 1, 1)
            this.photoarr1.push(lastphoto)
            self.submitdata.contentphoto = self.photoarr1.join(',')
          } else if (type === 'video') {
            if (data.data.lastIndexOf('.mp4') < 0 && data.data.lastIndexOf('.MOV') < 0) {
              let error = '请上传正确的视频文件'
              self.$vux.toast.show({
                text: error,
                time: self.$util.delay(error)
              })
            } else {
              self.videoarr[this.clickPhotoIndex] = data.data
              let lastphoto = this.videoarr.splice(this.videoarr.length - 1, 1)
              this.videoarr.push(lastphoto)
              self.submitdata.video = self.videoarr.join(',')
            }
          }
        } else {
          if (type === 'photo' && self.photoarr.length < self.maxnum) {
            self.photoarr.push(data.data)
            self.submitdata.photo = self.photoarr.join(',')
          } else if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
            self.photoarr1.push(data.data)
            self.submitdata.contentphoto = self.photoarr1.join(',')
          } else if (type === 'video') {
            if (data.data.lastIndexOf('.mp4') < 0 && data.data.lastIndexOf('.MOV') < 0) {
              let error = '请上传正确的视频文件'
              self.$vux.toast.show({
                text: error,
                time: self.$util.delay(error)
              })
            } else {
              self.videoarr.push(data.data)
              self.submitdata.video = self.videoarr.join(',')
            }
          }
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname, type, index) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (index !== undefined && index !== 'undefined') {
        this.clickPhotoIndex = index
      } else {
        this.clickPhotoIndex = -1
      }
      if (self.$util.isPC() || type === 'video') {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          let curMaxnum = self.maxnum
          if (type === 'video') {
            curMaxnum = 1
          }
          if (type === 'photo') {
            curMaxnum = self.maxnum - self.photoarr.length
          } else if (type === 'contentphoto') {
            curMaxnum = self.maxnum1 - self.photoarr1.length
          }
          if (curMaxnum > 9) {
            curMaxnum = 9
          }
          self.$util.wxUploadImage({
            maxnum: curMaxnum,
            handleCallback: function (data) {
              self.photoCallback(data, type)
            }
          })
        })
      }
    },
    fileChange (refname, type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        if (type === 'video') {
          fileForm = target.parentNode.parentNode
        }
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data, type)
        })
      }
    },
    fileMulChange (refname, type) {
      const self = this
      const index = this.clickPhotoIndex
      const target = event.target
      const files = target.files
      console.log('进入到了新的多选文件file的change事件中')
      console.log(index)
      if (files.length > 0) {
        let filedata = new FormData()
        for (let i = 0; i < files.length; i++) {
          filedata.append(`files[${i}]`, files[i])
        }
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/uploadFiles`, filedata).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          if (data.flag === 1) {
            let retdata = data.data
            if (index > -1) {
              console.log('进入到了编辑')
              if (type === 'photo') {
                let allowNum = self.maxnum - self.photoarr.length + 1
                let addNum = retdata.length > allowNum ? allowNum : retdata.length
                let addData = retdata.slice(0, addNum)
                if (addData.length > 1) {
                  self.photoarr.splice(index, 1, ...addData)
                } else {
                  self.photoarr[index] = addData[0]
                  let lastphoto = self.photoarr.splice(self.photoarr.length - 1, 1)
                  self.photoarr.push(lastphoto)
                }
                self.submitdata.photo = self.photoarr.join(',')
              } else if (type === 'contentphoto') {
                let allowNum = self.maxnum1 - self.photoarr1.length + 1
                let addNum = retdata.length > allowNum ? allowNum : retdata.length
                let addData = retdata.slice(0, addNum)
                if (addData > 1) {
                  self.photoarr1.splice(index, 1, ...addData)
                } else {
                  self.photoarr1[index] = addData[0]
                  let lastphoto = self.photoarr1.splice(self.photoarr1.length - 1, 1)
                  self.photoarr1.push(lastphoto)
                }
                self.submitdata.contentphoto = self.photoarr1.join(',')
              }
            } else {
              console.log('进入到了上传')
              if (type === 'photo' && self.photoarr.length < self.maxnum) {
                let allowNum = self.maxnum - self.photoarr.length
                let addNum = retdata.length > allowNum ? allowNum : retdata.length
                let addData = retdata.slice(0, addNum)
                self.photoarr = self.photoarr.concat(addData)
                self.submitdata.photo = self.photoarr.join(',')
              } else if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
                let allowNum = self.maxnum1 - self.photoarr1.length
                let addNum = retdata.length > allowNum ? allowNum : retdata.length
                let addData = retdata.slice(0, addNum)
                self.photoarr1 = self.photoarr1.concat(addData)
                self.submitdata.contentphoto = self.photoarr1.join(',')
              }
            }
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto (item, index, type) {
      const self = this
      if (type === 'video') {
        self.videoarr.splice(index, 1)
        self.submitdata.video = self.videoarr.join(',')
      } else if (type === 'photo') {
        self.photoarr.splice(index, 1)
        self.submitdata.photo = self.photoarr.join(',')
      } else {
        self.photoarr1.splice(index, 1)
        self.submitdata.contentphoto = self.photoarr1.join(',')
      }
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    savedata (postdata) {
      const self = this
      if (!self.submitIng) {
        if (self.$util.trim(postdata.photo) === '') {
          self.$vux.toast.text('请先上传封面图像', 'middle')
          return false
        }
        if (self.classData.length && !parseInt(postdata.classid)) {
          self.$vux.toast.text('请选择商品类别', 'middle')
          return false
        }
        if (self.$util.trim(postdata.title) === '') {
          self.$vux.toast.text('请输入商品名称', 'middle')
          return false
        }
        if (self.$util.trim(postdata.price) === '') {
          self.$vux.toast.text('请输入商品价格', 'middle')
          return false
        }
        if (self.$util.trim(postdata.profit) === '' && self.$util.trim(postdata.salesrebate) === '' && self.$util.trim(postdata.superrebate) === '') {
          self.$vux.toast.text('请输入商品利润', 'middle')
          return false
        }
        let price = postdata.price.toString().replace(/,/g, '')
        let oriprice = postdata.oriprice.toString().replace(/,/g, '')
        let tbprice = postdata.tb_price.toString().replace(/,/g, '')
        let jdprice = postdata.jd_price.toString().replace(/,/g, '')
        let postage = postdata.postage.toString().replace(/,/g, '')
        let profit = postdata.profit.toString().replace(/,/g, '')
        let salesrebate = postdata.salesrebate.toString().replace(/,/g, '')
        let superrebate = postdata.superrebate.toString().replace(/,/g, '')
        if (self.$util.trim(price).length > 7 || self.$util.trim(oriprice).length > 7 || self.$util.trim(tbprice).length > 7 || self.$util.trim(jdprice).length > 7) {
          self.$vux.alert.show({
            title: '',
            content: '商品价格不能超过7位数'
          })
          return false
        }
        if ((self.$util.trim(oriprice) !== '' && (isNaN(oriprice) || parseFloat(oriprice) < 0)) || isNaN(price) || parseFloat(price) <= 0) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的价格'
          })
          return false
        }
        if ((self.$util.trim(tbprice) !== '' && (isNaN(tbprice) || parseFloat(tbprice) < 0))) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的猫价'
          })
          return false
        }
        if ((self.$util.trim(jdprice) !== '' && (isNaN(jdprice) || parseFloat(jdprice) < 0))) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的狗价'
          })
          return false
        }
        if (self.$util.trim(oriprice) !== '' && parseFloat(oriprice) <= parseFloat(price)) {
          self.$vux.toast.text('商品现价不能大于等于原价', 'middle')
          return false
        }
        // 商品利润
        if (self.$util.trim(oriprice) !== '' && (isNaN(profit) || parseFloat(profit) < 0)) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的利润'
          })
          return false
        }
        if (parseFloat(profit) >= parseFloat(price)) {
          self.$vux.alert.show({
            title: '',
            content: '利润不能大于商品现价'
          })
          return false
        }
        if (self.$util.trim(salesrebate) !== '') {
          if (isNaN(salesrebate) || parseFloat(salesrebate) < 0) {
            self.$vux.alert.show({
              title: '',
              content: '请输入正确的销售佣金'
            })
            return false
          } else if (parseFloat(salesrebate) > price) {
            self.$vux.alert.show({
              title: '',
              content: '销售佣金不能大于商品现价'
            })
            return false
          }
        }
        if (self.$util.trim(superrebate) !== '') {
          if (isNaN(superrebate) || parseFloat(superrebate) < 0) {
            self.$vux.alert.show({
              title: '',
              content: '请输入正确的推荐人佣金'
            })
            return false
          } else if (parseFloat(superrebate) > price) {
            self.$vux.alert.show({
              title: '',
              content: '推荐人佣金不能大于商品现价'
            })
            return false
          }
        }
        if (self.$util.trim(salesrebate) !== '' && self.$util.trim(superrebate) !== '' && parseFloat(salesrebate) + parseFloat(superrebate) > price) {
          self.$vux.alert.show({
            title: '',
            content: '销售佣金+推荐人佣金不能大于商品现价'
          })
          return false
        }
        if (parseFloat(profit) > parseFloat(price)) {
          self.$vux.alert.show({
            title: '',
            content: '商品利润不得大于商品现价'
          })
          return false
        }
        if (!self.optionsData.length) {
          if (self.$util.trim(postdata.storage) === '') {
            self.$vux.toast.text('请输入商品库存', 'middle')
            return false
          }
          if (isNaN(postdata.storage) || parseFloat(postdata.storage) <= 0) {
            self.$vux.toast.text('库存必须大于0', 'middle')
            return false
          }
        }
        if (self.$util.trim(postdata.postage) === '') {
          self.$vux.toast.text('请输入运费', 'middle')
          return false
        }
        if (isNaN(postage) || postage < 0) {
          self.$vux.toast.text('请输入正确的运费', 'middle')
          return false
        }
        let iscontinue = true
        if (this.optionsData.length) {
          for (let i = 0; i < this.optionsData.length; i++) {
            let curOption = this.optionsData[i]
            let curTitle = curOption.title
            // let curPhoto = curOption.photo
            let curStorage = curOption.storage
            if (self.$util.trim(curTitle) === '' || self.$util.trim(curStorage) === '') {
              self.$vux.toast.text('请完规格信息', 'middle')
              iscontinue = false
              break
            }
            if (isNaN(curStorage) || parseFloat(curStorage) <= 0) {
              self.$vux.toast.text('库存必须大于0', 'middle')
              iscontinue = false
              break
            }
          }
        }
        if (!iscontinue) {
          return false
        }
        if (self.$util.trim(postdata.content) === '' && self.$util.trim(postdata.contentphoto) === '') {
          self.$vux.alert.show({
            title: '',
            content: '请完善商品介绍或者详情图片'
          })
          return false
        }
        self.submitIng = true
        postdata.price = price
        postdata.oriprice = oriprice
        postdata.tb_price = tbprice
        postdata.jd_price = jdprice
        postdata.profit = profit
        let postOptions = []
        if (this.optionsData.length) {
          for (let i = 0; i < this.optionsData.length; i++) {
            let curOption = this.optionsData[i]
            let oPhoto = curOption.photo ? curOption.photo : self.photoarr[0]
            let addoption = {title: curOption.title, photo: oPhoto, storage: curOption.storage}
            if (curOption.id) {
              addoption.id = curOption.id
            }
            postOptions.push(addoption)
          }
        }
        postdata.options = postOptions
        self.$vux.loading.show()
        if (self.query.id) {
          postdata.id = self.query.id
        }
        postdata.fid = self.query.fid
        self.$http.post(`${ENV.BokaApi}/api/add/factoryproduct`, postdata).then(res => {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            type: data.flag !== 1 ? 'warn' : 'success',
            time: self.$util.delay(data.error),
            onHide: () => {
              self.submitIng = false
              if (data.flag === 1) {
                let rparams = self.$util.handleAppParams(self.query, {id: data.data, fid: self.query.fid})
                self.$router.push({path: '/factoryProduct', query: rparams})
              }
            }
          })
        })
      }
    },
    saveevent () {
      const self = this
      let postdata = self.submitdata
      self.savedata(postdata)
    },
    saveupevent () {
      const self = this
      let postdata = self.submitdata
      postdata['moderate'] = 1
      self.savedata(postdata)
    },
    priceChange (key) {
      let val = event.target.value
      const dotindex = val.lastIndexOf('.')
      const vallen = val.length
      const cha = vallen - 1 - dotindex
      if (dotindex > -1 && cha > 2) {
        val = val.substr(0, vallen - cha + 2)
      }
      this.submitdata[key] = val
    },
    optionStorageChange (index) {
      let val = event.target.value
      this.optionsData[index].storage = val
    },
    getData () {
      const self = this
      const params1 = { module: 'product', action: 'add' }
      if (this.query.id) {
        params1.id = this.query.id
        const params2 = { params: { id: this.query.id, module: 'factoryproduct', from: 'edit' } }
        this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, params2).then(res => {
          const data = res.data
          let retdata = data.data ? data.data : data
          if (parseInt(retdata.oriprice) === 0) {
            retdata.oriprice = ''
          }
          if (retdata.options && retdata.options.length) {
            let retOptions = retdata.options
            this.optionsPhoto = []
            for (let i = 0; i < retOptions.length; i++) {
              this.optionsPhoto.push(retOptions[i].photo)
              retOptions[i].previewerPhoto = this.$util.previewerImgdata([retOptions[i].photo])
            }
            console.log('处理过的规格参数')
            this.optionsData = retOptions
            console.log(this.optionsData)
          } else {
            self.submitdata.storage = retdata.storage
          }
          self.data = retdata
          self.activityInfo = self.data.activitinfo
          for (let key in self.submitdata) {
            self.submitdata[key] = self.data[key]
          }
          if (self.submitdata.photo && self.$util.trim(self.submitdata.photo) !== '') {
            self.photoarr = self.submitdata.photo.split(',')
          }
          if (self.submitdata.contentphoto && self.$util.trim(self.submitdata.contentphoto) !== '') {
            self.photoarr1 = self.submitdata.contentphoto.split(',')
          }
          if (self.data.video && self.$util.trim(self.data.video) !== '') {
            self.videoarr = self.data.video.split(',')
          }
          document.title = self.data.title
        })
      }
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, params1).then(res => {
        return self.$http.get(`${ENV.BokaApi}/api/retailer/home`)
      }).then(res => {
        const data = res.data
        self.retailerInfo = data.data ? data.data : data
      })
    },
    init () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/classList/product`).then(res => {
        const data = res.data
        self.classData = data.data ? data.data : data
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      const self = this
      this.loginUser = User.get()
      self.submitIng = false
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.fid)) && !isAdmin && self.$route.query.fromapp !== 'factory') {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          if (this.query.id !== this.$route.query.id || this.query.fid !== this.$route.query.fid) {
            this.initSubmitData()
            this.query = this.$route.query
            this.getData()
          }
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    if (this.query.id !== this.$route.query.id) {
      this.initSubmitData()
    }
    this.refresh()
  }
};
</script>

<style lang="less">
.add-factory-product-page{
  line-height: 1.4;
  .vux-x-input.align_right input{text-align:right;}
  .form-item{position:relative;padding:10px 12px;}
  .form-item:after{
    content:"";display:block;
  	background-color:@list-border-color;height:1px;overflow:hidden;
  	position: absolute;right: 0;bottom:0px;
  	-webkit-transform: scaleY(0.5) translateY(0.5px);
  	transform: scaleY(0.5) translateY(0.5px);
  	-webkit-transform-origin: 0% 0%;
  	transform-origin: 0% 0%;
  }
  .b_top_after:after,.b_bottom_after:after{left:12px;}
  .bright{border-right: 1px solid #ddd}
  .button_photo{
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width:60px;
    height:60px;
    background-color:#ea3a3a;
    margin: 0 auto;
    border-radius:50%;
    overflow:hidden;
  }
  .button_photo .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
  .s-havebottom .s-container{bottom:50px;}
  .s-bottom{height:50px;padding-left:12px;padding-right:12px;background-color:#fff;}
  .button_video{
    position:relative;
    width:60px;
    height:60px;
    background-color:#ea3a3a;
    border-radius:50%;
  }
  .button_video input{
    position:absolute;
    left:0;top:0;right:0;bottom:0;
    opacity:0;
  }

  .btn-add{width:100px;height:30px;border:#ccc 1px solid;border-radius:10px;}
  .option-list{
    .option-item{
      border:#ccc 1px solid;margin-top:10px;
      .option-title{border-bottom:#ccc 1px solid;padding:10px;}
      .option-con{
        padding:10px;
        .con-item:not(:last-child) {margin-bottom:10px;}
        .con-item{
          width:100%;height:30px;
          .title-cell1{width:60px;height:100%;}
          .border-cell{
            border:#ccc 1px solid;height:100%;
            .input{width:100%;height:100%;padding:0 5px;box-sizing: border-box;}
          }
          .icon-cell{
            width:30px;height:100%;
          }
        }
      }
      .option-pic-list{
        .option-pic{width:30px;height:30px;object-fit:cover;}
      }
    }
  }
}
</style>
