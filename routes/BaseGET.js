const Route = require('../structures/Route');

class BaseRouteGET extends Route {
	constructor() {
		super('/', 'get');
	}

	async run(ctx, next) {
		ctx.state = {
			title: 'Tohru',
			subtitle: 'A blazingly fast pomf-like upload service that doesn\'t suck.'
		};
		await ctx.render('index.hbs');

		return next();
	}
}

module.exports = BaseRouteGET;
