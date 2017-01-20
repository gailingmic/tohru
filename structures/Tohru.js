const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const hbs = require('koa-views');
const lamu = require('lamu')();
const path = require('path');
const fs = global.Promise.promisifyAll(require('fs'));
const koaStatic = require('koa-static2');

class Tohru {
	constructor(settings) {
		this.port = settings.port;
		this.server = new Koa();
		this.router = new Router();
	}

	get handlers() {
		return {
			helmet: helmet(),
			xResponseTime: async (ctx, next) => {
				const start = new Date();
				await next();
				const ms = new Date() - start;
				ctx.set('X-Response-Time', `${ms}ms`);
			},
			logger: async (ctx, next) => {
				const start = new Date();
				await next();
				const ms = new Date() - start;
				lamu.log({ label: 'success', text: `${ctx.method} ${ctx.url} - ${ms}ms` });
			},
			hbs: hbs(path.join(__dirname, '..', 'views'), { map: { hbs: 'handlebars' } }),
			static: koaStatic('css', path.join(__dirname, '..', 'assets/css')),
			routes: this.router.routes(),
			routeMethods: this.router.allowedMethods()
		};
	}

	use(handler) {
		this.server.use(handler);

		return this;
	}

	registerRoutesIn(routePath) {
		fs.readdirAsync(routePath).then(files => {
			for (const file of files) {
				let fileExtension = file.split('.')[file.split('.').length - 1];

				if (fileExtension !== 'js') continue;

				let RouteClass = require(path.join(routePath, file));
				let route = new RouteClass();

				this.router[route.method](route.path, route.run);
			}
		});

		return this;
	}

	start() {
		this.server.listen(this.port, () => {
			return lamu.log({ label: 'success', text: `Server started and listening on port ${this.port}` });
		});
	}
}

module.exports = Tohru;
