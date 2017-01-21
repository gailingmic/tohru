global.Promise = require('bluebird');

const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const hbs = require('koa-views');
const serveStatic = require('koa-static2');
const multer = require('koa-multer');
const lamu = require('lamu')();
const fs = global.Promise.promisifyAll(require('fs'));
const path = require('path');

class Tohru {
	constructor(settings) {
		this.port = settings.port;
		this.server = new Koa();
		this.router = new Router();
		this.assets = settings.assets;
		this.images = settings.images;
		this.assetsPath = settings.assetsPath;
		this.imagesPath = settings.imagesPath;
	}

	get _handlers() {
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
			static: serveStatic(this.assets, this.assetsPath),
			images: serveStatic(this.images, this.imagesPath),
			multerStorage: multer.diskStorage({
				destination: (req, file, cb) => {
					cb(null, this.imagesPath);
				},
				filename: (req, file, cb) => {
					cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`);
				}
			}),
			routes: this.router.routes(),
			routeMethods: this.router.allowedMethods()
		};
	}

	_use(handler) {
		this.server.use(handler);

		return this;
	}

	_registerRoutesIn(routePath) {
		fs.readdirAsync(routePath).then(files => {
			for (const file of files) {
				if (path.extname(file) !== '.js') continue;

				let RouteClass = require(path.join(routePath, file));
				let route = new RouteClass();

				this.router[route.method](route.path, route.run);
			}
		});

		return this;
	}

	_registerMiddleware(middleware) {
		this.router.use(middleware);

		return this;
	}

	start() {
		this._use(this._handlers.helmet);
		this._use(this._handlers.xResponseTime);
		this._use(this._handlers.logger);
		this._use(this._handlers.hbs);
		this._use(this._handlers.static);
		this._use(this._handlers.images);
		this._use(this._handlers.routes);
		this._use(this._handlers.routeMethods);
		this._registerRoutesIn(path.join(__dirname, '..', 'routes'));
		this._registerMiddleware(multer({ storage: this._handlers.multerStorage }).array('files[]'));
		this.server.listen(this.port, () => {
			return lamu.log({ label: 'success', text: `Server started and listening on port ${this.port}` });
		});
	}
}

module.exports = Tohru;
