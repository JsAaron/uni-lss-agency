const lcc = "https://lss.facess.net/lssSys"
const pay = "https://lcc.facess.net/pay"
const imgDomain = "https://img.facess.net/" //加/

const config = {

  api: "appaccount/appbase",
  /**
   * 获取openid请求
   */
  openIdUrl: `${lcc}/loginAction!weixingcode2session.ilf`,

  /**
   * 人脸识别设备请求
   */
  deviceUrl: `${pay}/smallProgram`,
  /**
   * 普通请求
   */
  requestUrl: `${lcc}/loginAction!currency.ilf`,
  /**
   * 加密请求
   */
  md5Url: `${lcc}/lssSys/loginAction!des.ilf`,


  /***
   * 图片域名
   */
  imgDomain: imgDomain,

  //=================== 二维码 =============================

  /**
   * 二维码请求地址
   * 支付
   */
  payQrCodeUrl: `${lcc}/loginAction!weixingSolidImage.ilf`,
  /**
   * 商品二维码请求地址
   * sp-2222222-111111-33333
   * 分享
   */
  goodsQrCodeUrl: `${lcc}/loginAction!weixingShopImage.ilf`,
  /**
   * 推广海报,注册
   * weixingRegisterImage的格式是zc-agentid
   * 分享
   */
  registerQrCodeUrl: `${lcc}/loginAction!weixingRegisterImage.ilf`,
  /** 
   * 微信哦图像
   */
  weixin: `${lcc}/loginAction!weixingAutomatic.ilf`
};


module.exports = config;