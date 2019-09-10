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

// curry 方法，返回一个函数
export const curry = fn =>
  (innerFunc = (...args) =>
    args.length >= fn.length
      ? //如果参数个数达到原来的函数个数，则直接执行返回
        fn(...args)
      : // 否则返回一个函数：此函数固定了前面的参数
        (...backArgs) => innerFunc(...args, ...backArgs));
