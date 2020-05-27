class _LazyMan {
	constructor(name) {
		this.name = name;
		this.tasks = [];
		this.init(name);

		setTimeout(() => {
			this.next();
		}, 0);
	}

	init = (text) => {
		const fn = () => {
			this._log(`Hi! This is ${text}`);
			this.next();
		};
		this.tasks.push(fn);
		return this;
	};

	next = () => {
		const fn = this.tasks.shift();
		if (fn) {
			fn();
		}
	};

	_log = (text) => {
		console.log(text);
	};

	sleepFirst = (count) => {
		const fn = () => {
			setTimeout(() => {
				this._log(`Wake up after ${count}`);
				this.next();
			}, 1000 * count);
		};
		this.tasks.unshift(fn);
		return this;
	};

	sleep = (count) => {
		const fn = () => {
			setTimeout(() => {
				this._log(`Wake up after ${count}`);
				this.next();
			}, 1000 * count);
		};
		this.tasks.push(fn);
		return this;
	};

	eat = (text) => {
		const fn = () => {
			this._log(`eat ${text}`);
			this.next();
		};
		this.tasks.push(fn);
		return this;
	};
}

const LazyMan = (name) => {
	return new _LazyMan(name);
};

//
LazyMan('Hank').sleepFirst(3).eat('dinner');
LazyMan('Hank').sleepFirst(3).eat('dinner').eat('lunch');
LazyMan('Hank').eat('dinner').sleepFirst(3).eat('lunch');
