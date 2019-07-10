/**
 * 浏览器相关逻辑
 */

//写cookies
export function setCookie(c_name, value, expiredays) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

//读取cookies
export function getCookie(name) {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const regArr = document.cookie.match(reg);
  if (regArr) {
    return regArr[2];
  } else {
    return null;
  }
}

//删除cookies
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}

export const isMobile = () =>
  Boolean(
    window.navigator.userAgent.match(
      /(MicroMessenger|phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  );

export const isWeChat = () =>
  /micromessenger/i.test(window.navigator.userAgent);

export const isQQBroswer = () => /qq/i.test(window.navigator.userAgent);

export const isIOS = () =>
  /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent);

export const isAndroid = () => /Android/i.test(window.navigator.userAgent);

/**
 * 无刷新地改变url的key value; 若没找到对应的key 则增加此k, v
 * @param {string} key
 * @param {string} val
 */
export const changeURLQuery = (key, val) => {
  let url = window.location.href;
  let reCat01 = "/" + key + "=[^&]*/g";
  let reCat = eval("(" + reCat01 + ")"); //对象化

  if (!reCat.test(url)) {
    if (url.indexOf("?") === -1) {
      window.history.replaceState({}, 0, url + "?" + key + "=" + val);
    } else {
      if (url[url.length - 1] !== "&") {
        window.history.replaceState({}, 0, url + "&" + key + "=" + val);
      } else {
        window.history.replaceState({}, 0, url + key + "=" + val);
      }
    }
    return;
  }
  window.history.replaceState({}, 0, url.replace(reCat, key + "=" + val));
};

/**
 * 获取url对应参数的值
 * @param {string}  key  默认为""
 * @return {string} value 默认为""
 */
export const getURLQuery = (key = "") => {
  if (key === "") {
    return "";
  }
  let url = window.location.href;
  let reCat01 = "/" + key + "=[^&]*/g";
  let reCat = eval("(" + reCat01 + ")"); //对象化
  let value;

  try {
    value = window.location.href
      .split("?")[1]
      .match(reCat)[0]
      .replace(`${key}=`, "");
  } catch (e) {
    value = "";
  }
  return value;
};

/**
 * 获取url对应参数的值
 * @param {string} url
 * @return {Object}  一个解析后的对象
 */
export const parseQueryString = function(url) {
  let obj = {};
  let arr = [];

  url = url.replace(/^.*?\?/, "");
  url = url.replace(/#.*$/, "");
  arr = url.split("&");

  arr.forEach(el => {
    let r = el.match(/(.+)=(.*)/);
    if (r) {
      let key = r[1];
      let value = r[2] || null;
      obj[key] = value;
    }
  });
  return obj;
};


/**
 * 打印本地存储信息
 * @param  {[string]} itemName [可选] 若没有传参则 打印全部信息
 * @return {[type]}          [description]
 */
export const printStorage = itemName => {
  if (typeof itemName !== "undefined" && typeof itemName !== "string") {
    console.log("Error, printStorage function need a string param!");
    return;
  }
  console.log(JSON.parse(window.localStorage.getItem(itemName)));
};

