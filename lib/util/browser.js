/**
 * 设置cookie
 * @param name <string> 名
 * @param value <string> 值
 * @param iDay <number> 天数
 * @param domain <string> 域名
 * */
export const setCookie = (name, value, iDay, domain) => {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie =
    name +
    "=" +
    value +
    ";path=/;expires=" +
    oDate +
    (domain ? ";domain=" + domain : "");
};
/**
 * 获取cookie
 * @param name <string> 名
 * @return string 值
 * */
export const getCookie = name => {
  var arr = document.cookie.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return "";
};
/**
 * 删除cookie
 * @param name <string> 名
 * */
export const removeCookie = (name, domain) => {
  setCookie(name, "1", -1, domain);
};

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

export const isOkUrl = url => {
  return new Promise(function(resolve, reject) {
    // 测试链接连通性, 主要检测404错误
    // 由于AJAX通常无法区分404和跨域问题
    // 所以只能用script 或者 link标签
    // link比script更容易捕获错误
    var dom = document.createElement("link");
    dom.href = url;
    dom.rel = "stylesheet";
    document.head.appendChild(dom);
    dom.onload = function(e) {
      document.head.removeChild(dom);
      resolve();
    };
    dom.onerror = e => {
      document.head.removeChild(dom);
      reject();
    };
  });
};
