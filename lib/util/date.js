export const formatNumber = function(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

/**
 * 根据date 参数 获取指定格式的年月日 时分秒  如 "2017/11/20 08:22:10"
 * @param {Date} date  Date类型的参数
 */
export const formatTime = function(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

/**
 * 根据date 参数 获取指定格式的年月日 如 "2017-11-20"
 * @param {Date} date  Date类型的参数
 */
export const formatDate = function(date) {
  if (!date) {
    return "";
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
};

// 传入秒  传出对象 对象有天 时 分 秒 和 字符串 属性
export const getDHMSBySecond = allSecond => {
  let second = 0,
    minute = 0,
    hour = 0,
    day = 0;
  // s
  second = allSecond % 60;
  // m
  minute = parseInt(allSecond / 60); //算出一共有多少分钟
  //h
  hour = parseInt(minute / 60);
  minute %= 60;
  //d
  day = parseInt(hour / 24);
  hour %= 24;

  let string = day + "天" + hour + "小时" + minute + "分钟" + second + "秒";

  return {
    hour,
    minute,
    second,
    string
  };
};

// 传入秒  传出对象 对象有时 分 秒 和 字符串 属性
export const getHMSBySecond = allSecond => {
  let hour = Math.floor(allSecond / 3600);
  let minute = Math.floor((allSecond - hour * 3600) / 60);
  let second = allSecond - hour * 3600 - minute * 60;
  // 以冒号分隔  00:32:09
  let string =
    formatNumber(hour) +
    ":" +
    formatNumber(minute) +
    ":" +
    formatNumber(second);

  return {
    hour,
    minute,
    second,
    string
  };
};

// 传入秒  传出对象 对象有 分 秒 和 字符串 属性
export const getMSBySecond = allSecond => {
  let minute = Math.floor(allSecond / 60);
  let second = allSecond - minute * 60;
  // 以冒号分隔  00:32
  let string = formatNumber(minute) + ":" + formatNumber(second);

  return {
    minute,
    second,
    string
  };
};

/**
 * 通过字符串获取秒
 * @param {string}  str "00:08:09" eg:右侧钟表的文字
 * @return {number} second  秒
 */
export const getSecondByString = str => {
  if (!str) {
    return 0;
  }

  const arr = str.split(":");
  const second =
    parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2]);
  return second;
};
