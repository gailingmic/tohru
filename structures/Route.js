class Route {
	constructor(path, method) {
		if (!path) throw new Error('Every route needs a URL associated with it.');
		if (!method) throw new Error('Every route needs its method specified.');

		this.path = path;
		this.method = method;
	}

	async run(ctx, next) { // eslint-disable-line no-unused-vars
		return;
	}
}

module.exports = Route;
