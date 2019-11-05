import { Observer } from './observer'

/**
 * 验证码倒计时处理.
 * 
  checkTime = 60, //默认检测时间
  start, //开始回调
  change, //变化回调
  end //结束回调
 */
export class CountDown extends Observer {

  constructor(args) {
    super()
    this.checkTime = args.checkTime || 60
    this.timer = null
    this.recordIndex = this.checkTime //倒计时索引
      //开始回调
    this.$$emit('init', this.checkTime)
  }

  _nextCheck() {
    this.timer = setInterval(() => {
      if (this.recordIndex == 1) {
        this.$$emit('end', this.checkTime)
        this._clearInterval()
        return
      }
      this.recordIndex--;
      this.$$emit('change', this.recordIndex)
    }, 1000)
  }

  _clearInterval() {
    clearInterval(this.timer);
    this.timer = null
  }

  //===========对外接口==============

  start() {
    this._nextCheck()
  }

  destory() {
    this._clearInterval()
  }

}


