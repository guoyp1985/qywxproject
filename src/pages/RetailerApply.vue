/*
 * 已废弃
*/
<template>
  <div v-show="showcontainer" class="containerarea font14 bg-white retailerapply notop">
    <div class="pagemiddle bg-white" style="bottom: 50px;">
      <div class="flex_center bg-white posi_r" style="height:auto;">
          <div class="transition-top posi_r" style="width:100%;">
            <img src="../assets/images/banner_top.png" width="100%"/>
            <div class="waveWrapper waveAnimation">
              <div class="waveWrapperInner bgTop">
                <div class="wave waveTop" style="background-image: url('src/assets/images/wave-top.png')"></div>
              </div>
              <div class="waveWrapperInner bgMiddle">
                <div class="wave waveMiddle" style="background-image: url('src/assets/images/wave-mid.png')"></div>
              </div>
              <div class="waveWrapperInner bgBottom">
                <div class="wave waveBottom" style="background-image: url('src/assets/images/wave-top.png')"></div>
              </div>
            </div>
          </div>
          <div class="posi_a logo">
            <img src="../assets/images/logo_red.png"/>
          </div>
      </div>
      <form class="applyform pr12 pl12">
        <div class="form-item required border1px border-box mt15 mb10">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">真实姓名<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.truename" required type="text" class="input" name="truename" placeholder="真实姓名" />
            </div>
          </div>
        </div>
        <div class="form-item required border1px border-box mb10" style="padding: 1px 1px 0 10px">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">手机号<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <group>
                <x-input type="tel" v-model="submitdata.mobile" required class="font14 x-input" name="mobile" placeholder="手机号" mask="999 9999 9999" :max="13" is-type="china-mobile"></x-input>
              </group>
            </div>
            <div class="t-cell align_center" style="width:86px;">
              <div v-if="showGetcode" class="qbtn bg-red color-white font13" style="width:85px;box-sizing:border-box;" @click="getcode">获取验证码</div>
              <div v-else class="qbtn bg-gray8 color-white" style="width:85px;box-sizing:border-box;">{{ timenum }} 秒</div>
            </div>
          </div>
        </div>
        <div class="form-item required border1px border-box mb10">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">验证码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.verifycode" type="tel" class="input" name="verifycode" required placeholder="验证码"/>
            </div>
          </div>
        </div>
        <div class="form-item required border1px border-box padding10" v-if="classdata.length > 0">
          <input v-model="submitdata.productclass" type="hidden" name="productclass" />
          <div class="pb10">经营产品<span class="fong12 color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <checker
          class="x-checker"
          type="checkbox"
          v-model="submitdata.productclass"
          :max="3"
          default-item-class="ck-item"
          selected-item-class="ck-item-selected">
            <checker-item v-for="(item, index) in classdata" :key="index" :value="index">{{ item.title }}</checker-item>
          </checker>
        </div>
        <div class="form-item padding10 font16">
          <div class="font0 align_center">
            <span class="font14 v_top">
              <check-icon class="blue color-gray2" :value.sync="isagree" @click.native.stop="clickagree">同意</check-icon>
              <!--
              <label class="qcheckbox1 font16 color-gray" style="width:33px;">
                <input type="checkbox" @click="clickagree">同意
                <i class="al"></i>
              </label>
            -->
            </span>
            <span class="font14 v_bottom" style="text-decoration: underline" @click="showpopup">卖家入驻协议</span>
          </div>
        </div>
      </form>
    </div>
    <div :class="`pagebottom flex_center pl12 pr12 list-shadow02 bg-white ${bottomcss}`" @click="submitevent" style="height:50px;">
      <div class="flex_cell flex_center btn-bottom-red font16">马上免费入驻</div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="isshowpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">卖家入驻协议</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <h3 class="align_center">共销宝平台服务协议</h3>
              <p style="text-indent: 2em;">
                      感谢您选择共销宝平台服务（以下简称“本服务”）。共销宝平台是由北京博卡先锋软件开发有限公司（以下简称“博卡先锋”）开发并经营，在您使用共销宝平台前，您应当仔细阅读并遵守《共销宝平台服务协议》（以下简称“本协议”）以及共销宝平台规则。本协议由您与共销宝平台的经营者共同缔结，本协议具有合同效力。<b>请您务必审慎阅读、充分理解该等协议、规则各条款内容，特别是限制或免除责任的相应条款、争议解决和法律适用条款。限制或免除责任条款可能将以加粗字体形式显示，提示您注意，您应重点阅读。</b>
              </p>
              <p style="text-indent: 2em;">
                      除非您已阅读并接受本协议以及共销宝平台规则的所有条款,否则您无权使用本服务的任何部分或全部。您对本服务的任何使用行为,包括但不限于注册、登录本服务均视为您已阅读并同意受本协议及共销宝平台规则全部条款的约束,届时您不应以未阅读本协议或共销宝平台规则的内容或者未获得共销宝对您问询的解答等理由,主张本协议无效,或要求撤销本协议。如果您不同意共销宝平台规则的约定,您应立即停止注册或停止使用共销宝平台服务。如您对本协议有任何疑问,应根据本协议列明的联系方式联系共销宝。
              </p>
              <p style="text-indent: 2em;"><b> 一、定义</b></p>
              <p style="text-indent: 2em;"> 1．<b>共销宝/共销宝平台:</b>是指共销宝微信营销平台。</p>
              <p style="text-indent: 2em;">2．<b>共销宝平台服务</b>:共销宝基于微信,在共销宝微信服务号向您提供的各项服务,包括但不限于文章管理、商品管理、订单管理、返点客管理、客户管理、等具体服务。本服务包含的具体服务以共销宝提供的服务内容为准。</p>
              <p style="text-indent: 2em;">3．<b>客户:</b>指在共销宝平台上浏览或购买商品/接受服务的用户。卖家:指注册共销宝并通过实名认证,在共销宝上创建文章，出售商品或提供服务的用户。</p>
              <p style="text-indent: 2em;">4．<b>分销商:</b>指在共销宝通过宣传推广卖家商品,获取佣金的用户。</p>
              <p style="text-indent: 2em;">5．<b>共销宝平台规则:</b>为《共销宝平台服务协议》、《共销宝代理协议》，《共销宝禁售商品管理规范》等共销宝已经发布的及将来可能发布的各类相关协议、相关业务规则、解读、公告的统称。所有规则为本协议不可分割的组成部分,与本协议正文具有同等法律效力。</p>
              <p style="text-indent: 2em;"><b>二、本协议及/或本服务的变更</b></p>
              <p style="text-indent: 2em;">1．共销宝有权根据需要不时地依照本协议约定方式就本协议的有关约定和/或本服务内容进行变更。一旦本协议和/或本服务内容发生变更,共销宝将会在该变更内容确定后,以共销宝客户端更新的方式向用户公布,您知悉并认可共销宝无需另行单独通知您。</p>
              <p style="text-indent: 2em;">2．<b>您应不时关注本协议及本服务有关内容,以便掌握任何变动情况。如果您不同意共销宝变更的内容,您应主动停止使用本服务。如果您在变更内容通告后7天内未主动停止使用本服务,则视为您接受本协议和/或本服务的变更,变更内容通告后您如果仍继续使用本服务亦构成您对有关变更内容的接受与认可。如您针对变更内容有异议,您应立即停止使用全部本服务,且您应在上述约定期限内主动停止使用本服务。</b></p>
              <p style="text-indent: 2em;">3．同时,共销宝将可能进一步扩充本服务功能(扩充的服务功能纳入本服务范畴,本协议同样适用于扩充的服务功能),针对该部分新增功能将有可能附带特别适用于该功能的协议内容,请您在使用该新增功能前,仔细阅读该功能所附带协议(如有)。届时您接受该项新增功能服务的前提为您同意该项新增功能服务所附带的所有法律文档,包括但不限于本协议及新增功能服务所附带的协议。如果您不接受该新增功能所附带协议,请切勿使用该新增功能,否则您的使用行为将被视为您对附带协议的完全接受。同时您知悉并同意如本协议与任何针对某项新增服务添加相关特别约定、协议不一致的,均优先适用针对新增功能所添加相关特别约定及协议的规定。</p>
              <p style="text-indent: 2em;"><b>三、 账户注册与使用</b></p>
              <p style="text-indent: 2em;">1. 主体资格</p>
              <p style="text-indent: 2em;">您确认,在您注册或以其他共销宝允许的方式实际使用共销宝平台服务时,您应当是<b>具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若自然人用户不具备前述主体资格,则您及您的监护人应承担因此而导致的一切后果,且共销宝有权注销或永久冻结您的账户,并向您及您的监护人索偿相应损失。</b></p>
              <p style="text-indent: 2em;">2. 注册与使用</p>
              a)当您按照注册页面提示填写手机号、阅读并同意本协议且收到共销宝发送的短信验证码后,由您填写验证码,完成全部注册程序后,或您以其他共销宝允许的方式实际使用共销宝平台服务时,您即受本协议约束。您可以使用您提供或确认的手机号码或者共销宝允许的其它方式作为登录手段进入共销宝平台。<br/>
              b)您的帐号不得以任何方式买卖、转让、赠与或继承,除非有法律明确规定或司法裁定,并经共销宝同意,且需提供共销宝要求的合格的文件材料并根据共销宝制定的操作流程办理。<br/>
              c)在注册或实名认证时,您应当依照法律法规要求,按相应页面的提示准确提供您的资料,并于资料信息变更时及时更新,以保证您所提交资料的真实、及时、完整和准确。<b>如有合理理由怀疑您提供的资料错误、不实、过时或不完整的,共销宝有权向您发出问询及/或要求及时更正的通知,并有权直接做出删除相应资料的处理,甚至中止、终止对您提供部分或全部共销宝平台服务。共销宝对此不承担任何责任,由您自行承担因此产生的全部直接或间接损失及不利后果。</b><br/>
              d)您应当准确填写并及时更新您提供的联系电话等联系方式,以便共销宝或其他 用户与您取得联系,因通过这些联系方式无法与您取得联系,导致您在使用本服务过程中产生任何损失或承担任何法律责任的,应由您完全独自承担。您了解并同意,您有义务保证你提供的联系方式的真实性和有效性,如有变更的,您应按共销宝的要求进行操作。<br/>
              <p style="text-indent: 2em;">3. 账户的注销</p>
              a)如您申请注销共销宝账户的,您根据共销宝要求提交资料,经共销宝审核过后,办理注销账户事宜,同时共销宝会终止您所有共销宝平台服务。<br/>
              b)您同意并授权共销宝,您如有任意的欺诈、发布或销售假冒伪劣、侵权商品、侵犯他人合法权益或其他违反法律法规、共销宝平台规则等行为,共销宝有权披露您的相关信息,且会导致您的账户可能被注销、不能再登录共销宝平台。<br/>
              <p style="text-indent: 2em;">4. 账户安全</p>
              您应妥善保管您的账号。因您保管不善而可能导致账号失窃的,责任由您自行承担。且您须对在该登录名下发生的所有活动(包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等)承担责任。
              您知悉并认可:<br/>
              a)如发现任何账户安全问题,您应立即采取有效方式通知共销宝;您认可共销宝对您的任何请求采取行动均需要合理的时间,除共销宝存在过错外,共销宝对在采取行动前已经产生的后果不承担任何责任。
              b)为确保您在每个上网时段结束时,以正确步骤离开网站、移动智能终端设备应用、服务。您理解并同意给予共销宝合理的时间对您提出请求做出相应的处理及提供解决方案,共销宝对在共销宝采取行动前已经产生的任何后果(包括但不限于您遭受的任何损失及/或承担的责任)不承担任何法律责任。
              <p style="text-indent: 2em;"><b>四、 用户个人隐私信息的保护</b></p>
              <p style="text-indent: 2em;">1. 共销宝深知您珍视个人隐私,并理解保护您个人信息的重要性。共销宝将按照相关法律法规的规定收集、使用、保存和分享您的个人信息。为了改善产品服务,让您得到更好的用户体验,共销宝可能会与第三方服务供应商以及其他合作伙伴进行合作向您提供共销宝服务,并有可能需要使用您的个人信息。共销宝将努力确保第三方服务供应商以及其他合作伙伴采取的保密和安全措施不低于共销宝对您个人隐私信息保护的措施,如您不同意共销宝收集、使用、保存和分享您的个人信息,您应立即停止使用本服务。</p>
              <p style="text-indent: 2em;">2. 共销宝将按照本协议以及《隐私政策》的规定收集、使用、保存和分享您的个人信息。本协议对个人信息保护规定的内容与上述《隐私政策》有冲突的,及本协议对个人信息保护相关内容未作明确规定的,均应以《隐私政策》内容为准。</p>
              <p style="text-indent: 2em;">3. 您在注册账号和使用本服务的过程中,根据法律法规要求需要填写一些必要的用户个人信息。您应当保证填写的身份信息为真实、完整的。您知悉并认可,若您填写的信息不完整,则无法使用本服务或在使用过程中受到限制。</p>
              <p style="text-indent: 2em;">4. 一般情况下,您可随时浏览、修改自己提交的相关信息,但出于安全性和身份识别的考虑,您可能无法自行修改注册时提供的手机号码。如有任何问题欢迎与共销宝客服取得联系(联系方式请见本协议)。</p>
              <p style="text-indent: 2em;">5. 共销宝将应用各种安全技术和程序建立完善的管理制度来保护您的个人信息以免遭受未经授权的访问、使用或披露。</p>
              <p style="text-indent: 2em;">6. 共销宝非经您的许可或根据相关法律、法规的强制性规定,不会透露您的个人信息。如您涉嫌侵犯他人知识产权等合法权益,则经共销宝初步审核确有涉嫌侵权行为存在的情况下,共销宝有权向权利人提供您的相关个人信息。共销宝承诺并保证这些信息仅且仅用于核实共销宝的记录并向用户提供更适合需要的服务。</p>
              <p style="text-indent: 2em;">7. 共销宝不会将您的个人信息转移或披露给任何非关联的第三方,除非:<br/>
                      a)相关法律法规或法院、政府机关要求;<br/>
                      b)为完成合并、分立、收购或资产转让而转移;<br/>
                      c)为提供给您要求的服务所必需。<br/>
              <p style="text-indent: 2em;">8. 共销宝非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人,在使用本服务前,应事先取得您家长或法定监护人的书面同意。</p>
              <p style="text-indent: 2em;">9. 您声明并保证,您对您所发布的信息拥有相应、合法的权利。否则,共销宝可对您发布的信息依法或依本协议进行删除或屏蔽。</p>
              <p style="text-indent: 2em;"><b>五、商品及/或服务的销售与评价</b></p>
              <p style="text-indent: 2em;">1. 您的销售行为应当基于真实的消费需求,不得存在对商品及/或服务实施刷单、恶意销售、恶意维权等扰乱共销宝平台正常交易秩序的行为。基于维护共销宝平台交易秩序及交易安全的需要,共销宝发现上述情形时可主动执行关闭相关交易订单等操作。</p>
              <p style="text-indent: 2em;">2. 您有权在共销宝平台提供的评价系统中对与您达成交易商品及/或服务进行评价回复。您的所有评价回复行为应遵守共销宝平台规则的相关规定,评价回复内容应当客观真实,不应包含任何污言秽语、色情低俗、广告信息及法律法规与本协议列明的其他禁止性信息;您不应利用评价权利对其他用户实施威胁、敲诈勒索。共销宝可按照共销宝平台规则的相关规定对您实施上述行为所产生的评价信息进行删除或屏蔽。</p>
              <p style="text-indent: 2em;"><b>六、本服务使用规范</b></p>
              <p style="text-indent: 2em;">1. 您承诺在使用本服务过程中,您应遵守以下约定:</p>
              a)实施的所有行为均应遵守国家法律、法规等规范性文件及共销宝平台各项规则的规定和要求,不违背社会公共利益或公共道德,不损害他人的合法权益,不偷逃应缴税费,不违反本协议及相关规则。您如果违反前述承诺,产生任何法律后果的,您应以自己的名义独立承担所有的法律责任,并确保共销宝平台免于因此产生任何损失。<br/>
              b)交易过程中,应遵守诚实信用原则,不采取不正当竞争行为,不扰乱网络交易的正常秩序,不从事与网络交易无关的行为。<br/>
              c)不发布国家明令禁止销售的或限制销售的商品或服务信息(除非获得合法且足够的许可);不得发布涉嫌侵犯他人知识产权或其它合法权益的商品或服务信息;不发布违背社会公共利益或公共道德或共销宝认为不适合在共销宝平台上销售的商品或服务信息;不发布其它涉嫌违法或违反本协议及各类规则的信息。<br/>
              d)不以虚构或歪曲事实的方式贬低、诋毁其他用户,不采取不正当方式提升或试图提升自身的信用度。<br/>
              e)未经共销宝书面许可,不得自行或允许第三方以任何形式抓取共销宝的数据,不对共销宝平台上的任何数据作商业性利用,包括但不限于在未经共销宝事先书面同意的情况下,以复制、传播等任何方式使用共销宝平台上展示的资料。<br/>
              f)不使用任何装置、软件或例行程序干预或试图干预共销宝平台的正常运作或正在共销宝平台上进行的任何交易、活动。您不得采取任何将导致不合理的庞大数据负载加诸共销宝平台网络设备的行动。<br/>
              g)您的共销宝商品信息,可通过微信朋友圈、等进行转发,但因您转发内容导致的任何纠纷均由您自行承担。<br/>
              h)您同意按照共销宝的交易规则,在您与买家完成商品订单后,您同意买家将商品价款支付到共销宝账户,然后根据买家选择的交易模式和收货情况及交易履行情况,由共销宝将交易款项转账到您在共销宝注册时所留的银行卡账户上。<br/>
              i)您应该遵守《共销宝禁售商品管理规范》,严禁通过共销宝销售禁止销售的物品,同时共销宝禁止任何虚假交易、禁止任何无真实标的物的交易行为以及其它共销宝认为不适宜进行交易的行为,否则共销宝一经发现有权没收您全部收入,同时有权立即查封您的共销宝账户,且无需对此承担任何责任。<br/>
              j)您承诺在使用共销宝平台时应遵守中华人民共和国相关法律法规及共销宝平台规则等,不得从事任何非法交易或违反共销宝平台相关规则的交易行为。<br/>
              k)您在共销宝平台开展经营活动的,应承诺经营的商品或服务来源合法,资质齐全,并按中华人民共和国相关法律法规及共销宝平台要求提交相关证明文件,包括但不限于营业执照、授权委托书、资质证书、商标注册证、报关单等。您应保证向共销宝平台提供的上述证明文件或其他相关证明真实、合法、准确、有效,并保证上述证明文件或其他相关证明发生任何变更或更新时,及时通知共销宝平台,若上述文件变更或更新导致您不符合本协议规定的,共销宝平台有权单方全部或部分限制您的经营。若因您提交虚假、过期文件或未及时更新或通知证明文件导致纠纷或共销宝平台被相关国家机关处罚的,由您独立承担全部法律责任,如因此造成共销宝平台损失的,您应予以赔偿。<br/>
              <p style="text-indent: 2em;">2.您有权自行决定商品及/或服务的促销及推广方式,共销宝亦为您提供了丰富的推广、促销、分销方式,您承诺您的促销推广行为应当符合国家相关法律法规及共销宝平台规则的规定。</p>
              <p style="text-indent: 2em;">3.您在使用本服务过程中,您应对销售额/营业额超过法定免征额部分及时、足额地向税务主管机关缴纳应纳税款。</p>
              <p style="text-indent: 2em;">4.您了解并同意:</p>
              a)您如果违反前述承诺,产生任何法律后果的,您应以自己的名义独立承担所有的法律责任,并确保共销宝平台免于因此遭受任何损失或承担任何责任。<br/>
              b)基于维护共销宝平台交易秩序及交易安全的需要,共销宝有权在发生诈骗、售假、套现等扰乱市场正常交易秩序的情形下,对相关交易订单进行冻结、关闭等操作。<br/>
              c)经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为,或者共销宝根据自身的判断,认为您的行为涉嫌违反法律法规的规定或涉嫌违反本协议和/或共销宝规则的条款的,共销宝有权不经通知您即予以删除,且按照相关规则的规定对您进行处罚。共销宝有权在共销宝平台上公示您的该等涉嫌违法或违约行为及共销宝已对您采取的措施。<br/>
              d)对于您违反本协议项下承诺,或您在共销宝平台上实施的行为,包括您未在共销宝平台上实施但已经对共销宝平台及其用户产生影响的行为,共销宝有权单方认定您行为的性质及是否构成对本协议及/或共销宝规则的违反,并根据单方认定结果适用规则予以处理或终止向您提供服务,且无须征得您的同意或提前通知您。您应自行保存与您行为有关的全部证据,并应对无法提供充要证据而承担的不利后果。<br/>
              e)如您涉嫌违反有关法律或者本协议之规定,使共销宝遭受任何损失,或导致任何第三方对共销宝提起索赔,或使共销宝遭受任何行政管理部门的处罚,您应当赔偿共销宝因此产生的全部损失及或发生的费用,包括但不限于诉讼费、律师费以及共销宝向第三方支付的赔偿金或违约金等。<br/>
              f)如您在共销宝的交易行为或您与买家的交易行为被有关部门或共销宝认定为属于信用卡套现的情形时,共销宝平台有权按照该笔交易金额的1%收取违约金,且共销宝有权冻结、取消该交易、关闭或注销您的共销宝账户。<br/>
              <p style="text-indent: 2em;"><b>七、特别授权</b></p>
              <p style="text-indent: 2em;">1. 您知悉并认可,您对本服务的实际使用行为,即视为同意共销宝客户端向您发送商业信息,如您不希望收到共销宝向您发送的商业信息,请您在自己的手机中设置关闭接受共销宝发送信息的功能。</p>
              <p style="text-indent: 2em;">2. 您完全理解并不可撤销的授权共销宝在您和买家发生交易纠纷后,共销宝有权根据买家的请求向买家提供您的详细信息,由买家与您通过协商或诉讼方式处理纠纷。</p>
              <p style="text-indent: 2em;">3. 您亦可以选择使用共销宝进行交易纠纷的调解处理服务,共销宝会根据本协议及共销宝规则的规定,处理您在共销宝发生的所有交易及可能产生的交易纠纷。您同意接受共销宝根据其所了解到的争议事实并依据共销宝平台规则作出调解处理决定。您理解并同意,在争议调处服务中,共销宝平台的客服并非专业人士,仅能以普通人的认知对用户提交的凭证进行判断。因此,除存在故意外,调处方对争议调处决定免责。如您对调处决定不满意,您仍有权采取其他争议处理途径解决争议,但通过其他争议处理途径未取得终局决定前,您仍应先履行调处决定。</p>
              <p style="text-indent: 2em;">4. 一旦您向共销宝和/或其关联公司作出任何形式的承诺,且相关方已确认您违反了该承诺,则共销宝有权立即按您的承诺或协议约定的方式对您的账户采取限制措施,包括中止或终止向您提供服务,并公示相关方确认的您的违约情况。您了解并同意,共销宝无须就相关确认与您核对事实,或另行征得您的同意,且共销宝无须就此限制措施或公示行为向您承担任何的责任。</p>
              <p style="text-indent: 2em;">5. 对于您提供的资料及数据信息,您授予共销宝独家的、全球通用的、永久的、免费的许可使用权利(并有权在多个层面对该权利进行再授权)。此外,共销宝及其关联公司有权(全部或部分地)使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据(包括但不限于注册资料、交易行为数据及全部展示于共销宝平台的各类信息)或制作其派生作品,并以现在已知或日后开发的任何形式、媒体或技术,将上述信息纳入其它作品内。</p>

              <p style="text-indent: 2em;"><b>八、免责声明及有限保证</b></p>
              <p style="text-indent: 2em;">1. 共销宝负责按"现状"和"可得到"的状态向您提供共销宝平台服务。共销宝对本服务的适用性、完整性、持续性、准确性、可靠性以及满足用户的要求或符合用户的期望等不作任何担保,不论是明示的或默示的。同时,共销宝也不对本服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定性、完整性和及时性作出任何承诺和保证。</p>
              <p style="text-indent: 2em;">2. 您了解共销宝仅向您提供共销宝平台服务,且共销宝平台上的的信息均系用户自行发布,可能存在风险和瑕疵。共销宝平台仅作为第三方交易平台。共销宝平台仅作为您获取物品或服务信息、物色交易对象、就物品和/或服务的交易进行协商及开展交易的场所,但共销宝无法控制交易所涉及的物品的质量、安全或合法性,商贸信息的真实性或准确性,以及交易各方履行其在贸易协议中各项义务的能力。因此,共销宝不对用户行为的合法性、有效性、真实性作任何明示或默示的担保,对此您应谨慎判断,另外，您通过共销宝平台创建活动与买家之间产生的交易或其他纠纷，共销宝平台概不负责。</p>
              <p style="text-indent: 2em;">3.除非法律法规明确要求,或出现以下情况,否则,共销宝没有义务对所有用户的信息数据、商品和服务信息、交易行为以及与交易有关的其它事项进行审查:
                      a)共销宝有合理的理由认为特定用户及具体交易事项可能存在重大违法或违约情形。<br/>
                      b)共销宝有合理的理由认为用户在共销宝平台的行为涉嫌违法或不当。<br/></p>
              <p style="text-indent: 2em;">4. 共销宝有权基于您不可撤销的授权受理您与共销宝消费者因交易产生的争议,并有权单方判断与该争议相关的事实及应适用的规则,进而作出处理决定,包括但不限于调整相关订单的交易状态。该处理决定对您有约束力。如您未在限期内执行处理决定的,则共销宝有权利(但无义务)直接使用您在共销宝的款项,或您向共销宝交纳的保证金代为支付。您应及时补足保证金并弥补共销宝及其关联公司的损失,否则共销宝及其关联公司有权直接抵减您在其它合同项下的权益,并有权继续追偿。</p>
              <p style="text-indent: 2em;">5. 您理解并同意,共销宝并非司法机构,仅能以普通人的身份对证据进行鉴别,共销宝对争议的调处完全是基于您不可撤销得授权,其无法保证争议处理结果符合您的期望,也不对争议调处结论承担任何责任。如您因此遭受任何损失或承担任何法责任,均与共销宝无关。</p>
              <p style="text-indent: 2em;">6. 尽管本协议中可能含有相反的规定,在适用法律允许的最大范围内,您了解并同意,共销宝不对因您使用本服务引起的、或在任何方面与本服务有关的任何意外的、非直接的、特殊的利益损失承担责任,包括但不限于利润、商誉、使用、数据等方面的损失或其它无形的损失,(无论共销宝是否已被告知该等损害赔偿的可能性)。</p>
              <p style="text-indent: 2em;">7. 不论在何种情况下,共销宝均不对由于信息网络正常的设备维护,信息网络连接故障,电脑、通讯或其他系统的故障,电力故障,罢工,劳动争议,暴乱,起义,骚乱,生产力或生产资料不足,火灾,洪水,风暴,爆炸,战争,政府行为,司法行政机关的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。</p>

              <p style="text-indent: 2em;"><b> 九、知识产权归属</b></p>
              <p style="text-indent: 2em;">1. 共销宝所包含的全部智力成果包括但不限于数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合,软件编译、相关源代码和软件(包括小应用程序和脚本)的知识产权权利均归博卡先锋所有。用户不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。</p>
              <p style="text-indent: 2em;">2. 共销宝名称中包含的所有权利,包括但不限于著作权、商标权等,均归博卡先锋所有。</p>
              <p style="text-indent: 2em;"> 3. 用户在使用共销宝服务过程中不得未经权利人的合法授权使用共销宝或他人的合法知识产权权利。</p>
              <p style="text-indent: 2em;"><b>十、侵权处理</b></p>
              <p style="text-indent: 2em;">如您认为共销宝平台商家发布的商品侵犯了您的合法权利,您有权向共销宝提交书面权利通知书,要求共销宝删除相关涉嫌侵权的商品。权利通知书应包含的具体内容以及邮寄地址,请您根据本协议列明的客服热线联系共销宝客服。
              <p style="text-indent: 2em;"><b>十一、客户服务</b></p>
              <p style="text-indent: 2em;">1. 共销宝建立专业的客服团队,并建立完善的客户服务制度,从技术、人员和制度上保障用户提问及投诉渠道的畅通,为用户提供及时的疑难解答与投诉反馈服务。</p>
              <p style="text-indent: 2em;">2.在线反馈:进入共销宝个人中心,点击“投诉或建议”。</p>
              <p style="text-indent: 2em;"><b>十二、违约赔偿</b></p>
              <p style="text-indent: 2em;">1. 如由于您使用本服务、违反本协议及其他相关协议、或您侵害他人合法权益而使共销宝及其关联公司遭受任何损失(包括但不限于律师费、诉讼费),或导致任何第三人向共销宝及其关联公司提出任何索赔或请求,或导致共销宝及其关联公司遭受任何行政管理部门的处罚,您应使共销宝及其关联公司不因此遭受任何损害,并保证承担由此引发的全部法律责任。</p>
              <p style="text-indent: 2em;">2. 如共销宝平台发现您存在套现行为的,您应向共销宝平台缴纳交易金额1%的违约金,由共销宝平台直接从您的交易金额中扣取,并有权根据情节严重程度,对您处以警告、限制或禁止使用部分或全部功能、封禁或注销店铺账户等处罚。</p>
              <p style="text-indent: 2em;"><b>十三、协议的中止与终止</b></p>
              <p style="text-indent: 2em;">1. 您知悉并认可,共销宝有权自行决定以合理的理由、在法律允许的最大范围内,并不经事先通知的中止、终止向您提供部分或全部共销宝平台服务,暂时冻结或永久冻结(注销)您的账户在共销宝平台的权限,且无须为此向您或任何第三方承担任何责任。</p>
              <p style="text-indent: 2em;">2. 出现以下任一情况时,共销宝有权直接以注销账户的方式终止本协议,并有权永久冻结(注销)您的共销宝账户的权限:<br/>
                      a)共销宝终止向您提供服务后,您涉嫌再一次直接或间接以他人名义注册为共销宝用户的;<br/>
                      b)您的账户名称、头像或简介涉嫌违反法律法规、包含不良信息、涉嫌冒用或关联机构或社会名人注册账户名称的;<br/>
                      c)严重侵犯消费者的合法权益、不履行法律规定的相关义务(包括但不限于赔付、7天无理由退货等);<br/>
                      d)严重违反共销宝平台规则;<br/>
                      e)本协议(含规则)变更时,您明示并通知共销宝不愿接受新的服务协议的;<br/>
                      f)其它共销宝认为应当终止服务的情况。 3. 您的账户服务被终止或者账户在共销宝平台的权限被永久冻结(注销)后,共销宝没有义务为您保留或向您披露您账户中的任何信息,也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。
                      <br/></p>
              <p style="text-indent: 2em;">4. 您同意,您与共销宝的协议关系终止后,共销宝仍享有下列权利:<br/>
                      a)继续保存您的用户信息及您使用共销宝平台服务期间的所有交易信息;<br/>
                      b)您在使用共销宝平台服务期间存在违法行为或违反本协议和/或共销宝规则的行为的,共销宝仍可依据本协议向您主张权利。<br/>
              </p>
              <p style="text-indent: 2em;">5. 共销宝中止或终止向您提供共销宝平台服务后,对于您在服务中止或终止之前的交易行为依下列原则处理,您应独力处理并完全承担进行以下处理所产生的任何争议、损失或增加的任何费用,并应确保共销宝免于因此遭受任何损失或承担任何法律责任:<br/>
                      a)您在服务中止或终止之前已经上传至共销宝平台的商品或服务尚未交易的,共销宝有权在中止或终止服务的同时删除此项商品或服务的相关信息;<br/>
                      b)您在服务中止或终止之前已经与消费者达成交易合意,但该交易尚未实际履行的,共销宝有权删除该买卖合同及其交易商品或服务的相关信息;<br/>
                      c)您在服务中止或终止之前已经与其他消费者达成交易合意且已部分履行的,共销宝可以不删除该项交易,但共销宝有权在中止或终止服务的同时将相关情形通知您的交易对方。
                      <br/></p>
              <p style="text-indent: 2em;"><b>十四、法律适用与争议解决</b></p>
              <p style="text-indent: 2em;"> 1. 本协议之订立、生效、解释、变更、终止、执行与争议解决均适用中华人民共和国大陆地区法律;如无相关法律规定的,则应参照通用国际商业惯例及/或行业惯例。</p>
              <p style="text-indent: 2em;">2. 本协议包含了所有您在使用本服务时须遵守的一般性规范,您在使用共销宝某个具体服务时还需遵守适用于该具体服务的特殊性规范(具体请参见您使用该具体服务时签署的其他协议以及规则等)。如一般性规范与特殊性规范不一致或有冲突的,则以特殊性规范的约定为准。</p>
            </div>
          </div>
          <div class="popup-bottom flex_center" @click="closepopup">{{ $t('Close') }}</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Required item not empty:
  zh-CN: 必填项不能为空
</i18n>

<script>
import { Group, XInput, TransferDom, Alert, Popup, Loading, Checker, CheckerItem, CheckIcon } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Alert, Popup, Loading, Checker, CheckerItem, CheckIcon
  },
  data () {
    return {
      showcontainer: false,
      showGetcode: true,
      timer: null,
      timenum: 60,
      loginUser: {},
      bottomcss: '',
      isagree: false,
      isshowpopup: false,
      classdata: [],
      allowsubmit: false,
      submitdata: {
        truename: '',
        mobile: '',
        verifycode: '',
        productclass: ''
      },
      requireddata: { truename: '', 'mobile': '', 'verifycode': '', 'productclass': '' }
    }
  },
  watch: {
    submitdata: function () {
      return this.submitdata
    }
  },
  computed: {
  },
  methods: {
    getcode () {
      event.preventDefault()
      const self = this
      let iscontinue = self.$util.validateQueue([
        { telephone: self.$util.trim(self.submitdata.mobile), r: 'Phone' }
      ],
        model => {
          switch (model.key) {
            case 'telephone':
              self.$vux.toast.text('请输入正确的手机号', 'middle')
              break
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (!iscontinue) {
        return false
      }
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/verifyMobile`, {
        params: { phone: self.$util.trim(self.submitdata.mobile) }
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
        if (data.flag === 1) {
          self.verifyCode = data.data
        }
        self.showGetcode = false
        self.timer = setInterval(function () {
          self.timenum--
          if (self.timenum === 0) {
            clearInterval(self.timer)
            self.showGetcode = true
            self.timenum = 60
          }
        }, 1000)
      })
    },
    clickagree () {
      const self = this
      if (self.isagree) {
        self.bottomcss = 'active'
        self.allowsubmit = true
      } else {
        self.bottomcss = ''
        self.allowsubmit = false
      }
    },
    showpopup () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    submitevent () {
      const self = this
      if (self.allowsubmit) {
        let validateData = []
        for (let key in self.requireddata) {
          let v = {}
          if (key === 'mobile') {
            v = { telephone: self.$util.trim(self.submitdata.mobile), r: 'Phone' }
          } else {
            v[key] = self.submitdata[key]
          }
          validateData.push(v)
        }
        let iscontinue = self.$util.validateQueue(validateData,
          model => {
            switch (model.key) {
              case 'telephone':
                self.$vux.toast.text('请输入正确的手机号', 'middle')
                break
              default:
                self.$vux.toast.text('必填项不能为空', 'middle')
            }
          }
        )
        if (!iscontinue) {
          return false
        }
        self.$vux.loading.show()
        self.submitdata.mobile = self.$util.trim(self.submitdata.mobile)
        let applydata = Object
        self.$http.post(`${ENV.BokaApi}/api/retailer/apply`, self.submitdata).then(function (res) {
          applydata = res.data
          return self.$http.get(`${ENV.BokaApi}/api/user/show`)
        }).then(function (res) {
          let data = res.data
          let curuser = data.data ? data.data : data
          User.set(curuser)
          self.$vux.toast.show({
            text: applydata.error,
            time: self.$util.delay(applydata.error),
            onHide: function () {
              if (applydata.flag === 1 || applydata.flag === 2) {
                self.$router.push('/centerSales')
              } else {
                self.$vux.loading.hide()
              }
            }
          })
        })
      }
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.$vux.loading.show()
    self.loginUser = User.get()
    let iscontinue = true
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'apply'
    })
    if (!self.loginUser || !self.loginUser.usergroup || self.loginUser.usergroup.length === 0) {
      self.$vux.loading.hide()
      self.showcontainer = true
    } else if (self.loginUser.usergroup) {
      let usergroup = self.loginUser.usergroup
      for (let i = 0; i < usergroup.length; i++) {
        let g = usergroup[i]
        if (g === 3) {
          iscontinue = false
          break
        }
      }
    }
    if (!iscontinue) {
      self.$vux.loading.hide()
      self.$router.push('/centerSales')
    } else {
      self.$vux.loading.hide()
      self.showcontainer = true
      self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
        { params: { limit: 100 } }
      ).then(function (res) {
        let data = res.data
        data = data.data ? data.data : data
        for (let i = 0; i < data.length; i++) {
          let d = data[i]
          d.checked = false
        }
        self.classdata = data
      })
    }
  }
}
</script>

<style lang="less">
.retailerapply .banner_top{
  background: url("../assets/images/banner_top.png") no-repeat top center;
  background-size:100% 100%;
  width:100%;
  height:128px;
}
.retailerapply .logo{
  width:80px;
  height:80px;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto auto;
  background-color:#fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:50;
}
.retailerapply .logo img{width:50%;display: block;}
.retailerapply .pagemiddle{padding:0;}
.retailerapply .x-input .weui-input{padding: 5px;font-size: 14px;}
.retailerapply .form-item{padding:7px 10px;}
.retailerapply .form-item:after{background-color:transparent;}
.retailerapply .qbtn{
  line-height: 39px;
  box-sizing: border-box;
  padding: 0px;
  height: 39px;
  border-radius: 5px;
}
.retailerapply .x-checker .ck-item{
  font-size:13px;
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.retailerapply .btn-bottom-red{border-radius:5px;}
.retailerapply .pagebottom{background-color:#fff;}
.retailerapply .pagebottom .btn-bottom-red{background-color:#f2f2f2;color:#999;}
.retailerapply .pagebottom.active .btn-bottom-red{background-color: #ea3a3a;color: #fff;}
.retailerapply .blue .weui-icon-success{color:#ea3a3a;}
.vux-check-icon.blue > .weui-icon-success:before, .vux-check-icon.blue > .weui-icon-success-circle:before{color:#ea3a3a;}
@keyframes move_wave {
  0% {
      transform: translateX(0) translateZ(0) scaleY(1)
  }
  50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.55)
  }
  100% {
      transform: translateX(-50%) translateZ(0) scaleY(1)
  }
}
.waveWrapper{overflow: hidden;position: absolute;left: 0;right: 0;bottom: 0;top: 0;margin: auto;}
.waveWrapperInner{position: absolute;width: 100%;overflow: hidden;height: 100%;bottom: -1px;}
.bgTop{z-index: 15;opacity: 0.5;}
.bgMiddle{z-index: 10;opacity: 0.75;}
.bgBottom{z-index: 5;}
.wave{position: absolute;left: 0;bottom:0px;width: 200%;height: 70px;background-repeat: repeat no-repeat;background-position: 0 bottom;transform-origin: center bottom;}
.waveTop{background-size: 50% 45%;}
.waveAnimation .waveTop{animation: move-wave 3s;-webkit-animation: move-wave 3s;-webkit-animation-delay: 1s;animation-delay: 1s;}
.waveMiddle{background-size: 50% 50%;}
.waveAnimation .waveMiddle{animation: move_wave 8s linear infinite;}
.waveBottom{background-size: 50% 45%;}
.waveAnimation .waveBottom{animation: move_wave 12s linear infinite;}
</style>
