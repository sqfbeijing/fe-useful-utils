/**
 *
 * @param func {Function}
 */

function sequentialAjax(func) {
	let context = this;
	let currentResponseTimeStamp = 0;
	let senderIndex = 0;

	function innerRequest(index, ...args) {
		return new Promise((resolve) => {
			func.apply(context, args).then((resp) => {
				resolve({
					data: resp,
					index,
				});
			});
		});
	}

	return function (...args) {
		return new Promise((resolve) => {
			innerRequest(senderIndex++, ...args).then((response) => {
				let { data, index } = response;
				if (index > currentResponseTimeStamp) {
					currentResponseTimeStamp = index;
					resolve(data);
				} else {
					resolve(null);
				}
			});
		});
	};
}

function requestMock(...args) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`value => ${args}`);
		}, Math.floor(Math.random() * 3000));
	});
}

let latestRequest = sequentialAjax(requestMock);

function test() {
	for (let i = 0; i < 100; i++) {
		latestRequest(i).then((item) => item && console.log(item));
	}
}

test();
