const Observer = require("./observer.js")


// 观察模式
const __app__ = new Observer.Observer();

export const observe = {
  //observe
  $$watch(event, callback) {
    let fn = function() {
      callback.apply(__app__, arguments);
    };
    __app__.$$watch(event, fn);
    return fn;
  },
  $$onceWatch(event, callback) {
    let fn = function() {
      callback.apply(__app__, arguments);
    };
    __app__.$$once(event, fn);
    return fn;
  },
  $$notify(...arg) {
    __app__.$$emit(...arg);
  },
  $$unWatch(event, fn) {
    __app__.$$unWatch(event, fn);
  }
}