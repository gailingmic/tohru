const Route = require('../structures/Route');

class BaseRouteGET extends Route {
	constructor() {
		super('/faq', 'get');
	}

	async run(ctx, next) {
		ctx.state = {
			title: 'Tohru',
			subtitle: 'FAQ'
		};
		await ctx.render('faq.hbs');

		return next();
	}
}

module.exports = BaseRouteGET;
