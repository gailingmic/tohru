const Route = require('../structures/Route');

class UploadPOST extends Route {
	constructor() {
		super('/upload', 'post');
	}

	async run(ctx, next) {
		ctx.body = ctx.req.files;
		return next();
	}
}

module.exports = UploadPOST;
