const addOne = x => x + 1;

const add = (x, y) => x + y;

const multiple = (x, y) => x * y;

const double = x => x * 2;

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
