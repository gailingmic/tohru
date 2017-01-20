global.Promise = require('bluebird');

const path = require('path');

const Tohru = require('./structures/Tohru');

const tohru = new Tohru({ port: 3000 });

tohru
	.use(tohru.handlers.helmet)
	.use(tohru.handlers.xResponseTime)
	.use(tohru.handlers.logger)
	.use(tohru.handlers.hbs)
	.use(tohru.handlers.static)
	.use(tohru.handlers.routes)
	.use(tohru.handlers.routeMethods)
	.registerRoutesIn(path.join(__dirname, 'routes'))
	.start();
