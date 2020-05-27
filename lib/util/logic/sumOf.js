const sum = (...args) => {
	let arr = [...args];

	const innerFn = (...num) => {
		arr = [...arr, ...num];
		return innerFn;
	};

	innerFn.sumOf = () => arr.reduce((acc, cur) => acc + cur, 0);

	return innerFn;
};

sum(1)(2)(3)(4)(5).sumOf(); //15
// sum(1)(2)(3)(4)(5, 6).sumOf(); //21
