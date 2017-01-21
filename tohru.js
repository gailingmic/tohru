const path = require('path');
const Tohru = require('./structures/Tohru');

const tohru = new Tohru({
	port: 3000,
	assets: 'assets',
	assetsPath: path.join(__dirname, 'assets'),
	images: 'images',
	imagesPath: path.join(__dirname, 'images')
});

tohru.start();
