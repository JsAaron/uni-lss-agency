/**
 * @class String
 * 格式化字符串
 */
String.format = function(format) {
  var args = Xut.toArray(arguments, 1);
  return format.replace(/\{(\d+)\}/g, function(m, i) {
    return args[i];
  });
};

String.styleFormat = function(format) {
  return format.replace(/\s+/g, " ");
};

/**
 * 格式化日期时间
 */
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

/**
 * 分割数据，4位+空格
 */
export function splitNumber(str, type) {
  if (type === "identity") {
    return str.replace(/\s/g, "").replace(/(\d{6})(?=\d)/g, "$1 ");
  }
  return str.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

/**
 * 移除所有空格
 * @param {*} str
 */
export function removeSpace(str) {
  return str.replace(/\s+/g, "");
}

/**
 * 移除前后空格
 * @param {*} str
 */
export function removeBorderSpace(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

Date.prototype.addMonths = function(m) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setMonth(temp.getMonth() + m);
  return temp;
};
Date.prototype.addDays = function(d) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setDate(temp.getDate() + d);
  return temp;
};
Date.prototype.addHours = function(h) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setHours(temp.getHours() + h);
  return temp;
};
Date.prototype.addMinutes = function(m) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setMinutes(temp.getMinutes() + m);
  return temp;
};

/**
 *config = {
   addMonth :增加月份
 }
 * @param {*} date
 */
export function formatDate(date, count = 1) {
  var year = date.getFullYear();
  var month = date.getMonth() + count;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join("-");
}

/**
 * 为了兼容ios
 * 格式转化
 * 1 时间戳 1561099150799 
 * 2 日期  "2019-06-25 23:59:00"
 */
function convertFormat(date) {
  date = date.valueOf()

  //1561099150799
  if (/^[0-9]*$/.test(date)) {
    return Date.parse(new Date(date))
  }

  //"2019-06-25 23:59:00"\
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
  if (/[-:]/.test(date)) {
    return Date.parse(date.replace(/-/g, "/"))
  }

  console.log('checkFormat不认识格式')
}


/**
 * 获取日期差
 */
export function getDayDiff(start, end) {
  var stime = convertFormat(start)
  var etime = convertFormat(end)
  var usedTime = etime - stime; //两个时间戳相差的毫秒数
  if (stime <= etime) {
    return {
      valid: true,
      day: Math.floor(usedTime / (24 * 3600 * 1000)),
    };
  } else {
    return {
      valid: false
    }
  }
}


/**
 * 获取日期时间差
 * @param {} start 
 * @param {*} end 
 * @param {*} type 
 */
export function getDateTimeDiff(start, end, type) {
  var stime = convertFormat(start)
  var etime = convertFormat(end)
  var usedTime = etime - stime; //两个时间戳相差的毫秒数
  var day = parseInt(usedTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数   
  var hour = parseInt(usedTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时   
  var minute = parseInt(usedTime / 1000 / 60 % 60, 10); //计算剩余的分钟   
  // var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数   

  if (etime < stime) {
    return ''
  }

  if (type == 'day') {
    return day + '天'
  }

  if (type === 'all') {
    if (day && hour) {
      return `${day}天${parseInt(hour)}小时`
    }
    if (!day && hour && minute) {
      return `${hour}小时${parseInt(minute)}分钟`
    }
    if (!day && !hour && minute) {
      return minute + '分钟'
    }
  } else {
    if (day) {
      return day + '天'
    }
    if (hour) {
      return hour + '小时'
    }
    if (minute) {
      return minute + '分钟'
    }
  }
}

/**
 * 获取上一个月 30天前
 */
export function getYearMonth(date) {
  return formatDate(new Date(), 0)
}

/**
 * 今天
 */
export function getToday() {
  return formatDate(new Date())
}

/**
 * 获取当月第一天
 */
export function getFirstDayMonth() {
  var date = new Date()
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  return [year, month, 1].map(formatNumber).join("-");
}

/**
 * 半年时间
 */
export function getPastHalfYear() {
  // 先获取当前时间
  var curDate = (new Date()).getTime();
  // 将半年的时间单位换算成毫秒
  var halfYear = 365 / 2 * 24 * 3600 * 1000;
  var pastResult = curDate - halfYear; // 半年前的时间（毫秒单位）

  // 日期函数，定义起点为半年前
  var pastDate = new Date(pastResult),
    pastYear = pastDate.getFullYear(),
    pastMonth = pastDate.getMonth() + 1,
    pastDay = pastDate.getDate();

  return [pastYear, pastMonth, pastDay].map(formatNumber).join("-");
}


/**
 * 转化字节=》M
 */
export function converByte(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf(".");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

export function signStartTime() {
  return new Date();
}

export function signEndTime(startTime) {
  let end = new Date();
  let date3 = end.getTime() - startTime.getTime();
  // //计算出相差天数
  // var days = Math.floor(date3 / (24 * 3600 * 1000))
  // //计算出小时数
  // var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  // var hours = Math.floor(leave1 / (3600 * 1000))
  // //计算相差分钟数
  // var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  // var minutes = Math.floor(leave2 / (60 * 1000))
  // //计算相差秒数
  // var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000)
  return `用时${date3 / 1000}秒`;
}

/**
 * 判断为空
 * 排除未定义
 */
export function isEmpty(value) {
  if (!value) {
    return true;
  }
  if (value == undefined) {
    return true;
  }
  if (value == "undefined") {
    return true;
  }
}

/**
 * 电话加密
 * 134****0000
 */
export function phoneEncrypt(phone) {
  return phone && phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
}



/**
 * 必须是整数
 */
export function isInteger(num) {
  if (!/(^[1-9]\d*$)/.test(num)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 是数字
 * @param {*} obj 
 */
export function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj)
}

/**
 * 验证邮箱
 * @param {*} text 
 */
export function checkEmail(text) {
  if (!text.match(/^\w+([._-]\w+)*@(\w+\.)+\w+$/)) {
    return false;
  }
  return true;
}


/**
 * 定义一个属性
 */
export function def(obj, key, val, writable = true) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: true,
    writable: writable,
    configurable: true
  });
}

/**
 *两位小数、不能0或.开头 只能输入数字和.
 *
 * @export
 * @param {*} val
 * @returns
 */
export function limitFloat(val) {
  let sNum = val.toString(); //先转换成字符串类型
  if (sNum.indexOf('.') == 0) { //第一位就是 .
    console.log('first str is .')
    sNum = '0' + sNum
  }
  sNum = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  sNum = sNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  sNum = sNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (sNum.indexOf(".") < 0 && sNum != "") {
    sNum = parseFloat(sNum);
  }
  return sNum
}