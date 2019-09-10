const addOne = x => x + 1;

const add = (x, y) => x + y;

const multiple = (x, y) => x * y;

const double = x => x * 2;

const addFourNumbers = (a, b, c, d) => a + b + c + d;

// 不确定到底有多少个参数
const sumArgs = (...args) => args.reduce((acc, cur) => acc + cur, 0);

// pipe
pipe(
  addOne,
  double
)(2); // 6
pipe(
  multiple,
  addOne
)(2, 4); // 9

// compose
compose(
  addOne,
  double
)(2); // 5

compose(
  addOne,
  multiple
)(2, 5); // 11

// curry
curry(addFourNumbers)(1, 2, 3, 4, 5); // 10
curry(addFourNumbers)(1, 2, 3, 4); // 10
curry(addFourNumbers)(1, 2)(3, 4); // 10
curry(sumArgs)(1, 2, 3, 4, 5); // 15
