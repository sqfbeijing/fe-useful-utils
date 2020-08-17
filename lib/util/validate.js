/**
 * 合法手机
 * @param {number} telNumber
 */
export const isLegalTel = (telNumber, reg = /^[1](3|4|5|7|8|9)[0-9]{9}$/) =>
  reg.test(telNumber);

/**
 * 合法座机
 * @param {number}
 */
export const isLegalLandline = (number, reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/) =>
  reg.test(number);

/**
 * @param {string} Captcha
 */
export const isLegalCaptcha = (Captcha, reg = /^\d{6}$/) => reg.test(Captcha);

/**
 * @param {string} email
 */
export const isLegalEmail = (email, reg = /^\w+@\w+\.\w+$/) => reg.test(email);

/**
 * @param {string} password
 */
export const isLegalPassword = (password, reg = /^[a-zA-Z0-9_]{6,16}$/) =>
  reg.test(password);

export const rudeIdCardReg = /(^\d{14}(\d|x)$)|(^\d{17}(\d|x)$)/i;

// 身份证：仅能输入数字和“x"，长度15或18位，且只允许最后一位为字母，且只能是大写小写的x
export const isLegalIDCard = idCard => rudeIdCardReg.test(idCard);

/**
 * 合法身份证
 * @param {string} IDCard
 */
// 精确匹配
export const isLegalIDCardExact = idCard => {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 将前17位加权因子保存在数组里
      const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i += 1) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      const idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17); // 得到最后一位身份证号码

      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        return idCardLast === 'X' || idCardLast === 'x';
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        return idCardLast === idCardY[idCardMod];
      }
    }
  } else {
    return false;
  }
};

/**
 * 是否合法的收货人 2-15个字符，只支持中英文
 * @param {string} consignee
 */
export const isLegalConsignee = (
  consignee,
  reg = /^[a-zA-Z\u4e00-\u9fa5]{2,15}$/
) => reg.test(consignee);
