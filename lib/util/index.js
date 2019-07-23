/**
 * 函数的作用
 * https://github.com/jsfront/src/blob/master/js.md
 */

export const getElementStyle = (element, attr, NumberMode = "int") => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === "scrollTop") {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == "float" ? parseFloat(target) : parseInt(target);
};

/**
 * 获取元素距离文档的绝对位置
 * @param  {[type]} element [description]
 * @return
 */
export const getElementPosition = function(element) {
  var actualLeft = element.offsetLeft;
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== document.body) {
    actualLeft += current.offsetLeft + current.clientLeft;
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  return {
    left: actualLeft,
    top: actualTop
  };
};

// 缓慢滚动到顶部
// backToTop('idName');
export const backToTop = function(btnId) {
  let btn = document.getElementById(btnId);
  let d = document.documentElement;
  let b = document.body;
  function setStyle() {
    btn.style.display = d.scrollTop + b.scrollTop > 100 ? "block" : "none";
  }

  window.onscroll = setStyle;
  btn.style.display = "none";
  btn.onclick = function() {
    btn.style.display = "none";
    window.onscroll = null;
    this.timer = setInterval(function() {
      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      if (d.scrollTop + b.scrollTop == 0)
        clearInterval(btn.timer, (window.onscroll = set));
    }, 10);
  };
};

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选 如{scrollTop:0}
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选  'linear' 'ease-out' 'ease-in'  ; 'ease-out'为默认值
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (
  element,
  target,
  duration = 400,
  mode = "ease-out",
  callback
) => {
  clearInterval(element.timer);

  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = "ease-out";
  }

  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getElementStyle(element, attr, "float") * 100);
    } else {
      return getElementStyle(element, attr);
    }
  };
  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || "px";
    } else {
      unit[attr] = "px";
    }
    initState[attr] = attrStyle(attr);
  });

  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == "rem") {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });

  let flag = true; //假设所有运动到达终点
  const remberSpeed = {}; //记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0; //步长
      let status = false; //是否仍需运动
      let iCurrent = attrStyle(attr) || 0; //当前元素属性址
      let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case "ease-out":
          speedBase = iCurrent;
          intervalTime = (duration * 5) / 400;
          break;
        case "linear":
          speedBase = initState[attr];
          intervalTime = (duration * 20) / 400;
          break;
        case "ease-in":
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed;
          break;
        default:
          speedBase = iCurrent;
          intervalTime = (duration * 5) / 400;
      }
      if (mode !== "ease-in") {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case "ease-out":
          status = iCurrent != target[attr];
          break;
        case "linear":
          status =
            Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) >
            Math.abs(iSpeed);
          break;
        case "ease-in":
          status =
            Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) >
            Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }

      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === "scrollTop") {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + "px";
        }
      } else {
        flag = true;
      }

      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    });
  }, 20);
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
// 函数节流（如果有连续事件响应，则每间隔一定时间段触发）
// 每间隔 wait(Number) milliseconds 触发一次 func 方法
// 如果 options 参数传入 {leading: false}
// 那么不会马上触发（等待 wait milliseconds 后第一次触发 func）
// 如果 options 参数传入 {trailing: false}
// 那么最后一次回调不会被触发
// **Notice: options 不能同时设置 leading 和 trailing 为 false**
// 示例：
// var throttled = throttle(updatePosition, 100);
// $(window).scroll(throttled);
// 调用方式（注意看 A 和 B console.log 打印的位置）：
// throttle(function, wait, [options])
// sample 1: throttle(function(){}, 1000)
// print: A, B, B, B ...
// sample 2: throttle(function(){}, 1000, {leading: false})
// print: B, B, B, B ...
// sample 3: throttle(function(){}, 1000, {trailing: false})
// print: A, A, A, A ...
// ----------------------------------------- //
export const throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// 函数去抖（连续事件触发结束后只触发一次）
// sample 1: debounce(function(){}, 1000)
// 连续事件结束后的 1000ms 后触发
// sample 1: debounce(function(){}, 1000, true)
// 连续事件触发后立即触发（此时会忽略第二个参数）
export const debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

// ios 11版本下 原生的replace方法 使用正则表达式会有问题:
// 'c'.replace(/c/, 'foo$<br/>') => '$<br/>'
export const replaceAll = (longStr, shortStr, replaceText) => {
  let result = longStr;
  while (result.includes(shortStr)) {
    result = result.replace(shortStr, replaceText);
  }
  return result;
};

// 从左向右执行
export const pipe = (...functions) => {
  let isFirstFn = true;
  return (...result) => {
    return functions.reduce((acc, fn) => {
      // 如果是第一个函数的执行，参数可能会有多个
      if (isFirstFn) {
        isFirstFn = false;
        return fn(...acc);
      }
      return fn(acc);
    }, result);
  };
};

// 从右向左执行
export const compose = (...functions) => {
  let isFirstFn = true;
  return (...result) => {
    return functions.reduceRight((acc, fn) => {
      // 如果是第一个函数的执行，参数可能会有多个
      if (isFirstFn) {
        isFirstFn = false;
        return fn(...acc);
      }
      return fn(acc);
    }, result);
  };
};
