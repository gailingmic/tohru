function initializeDropzone() {
	var previewNode = document.querySelector('.template');
	previewNode.id = '';
	previewNode.className = '';
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	var dropzone = new Dropzone(document.body, {
		url: '/upload',
		paramName: 'files[]',
		maxFilesize: 250,
		parallelUploads: 10,
		thumbnailWidth: 60,
		thumbnailHeight: 60,
		uploadMultiple: false,
		previewsContainer: '#preview',
		previewTemplate: previewTemplate,
		createImageThumbnails: false,
		maxFiles: 1000,
		autoProcessQueue: true,
		clickable: '.btn'
	});

	dropzone.on('sending', function(file) {
		document.querySelector('.file-progress').style.opacity = '1';
	});

	dropzone.on('success', function(file, response) {
		/* if (response.status !== 200) {
			var span = document.createElement('span');
			span.innerHTML = response.description;
			return file.previewTemplate.querySelector('.links').appendChild(span);
		}*/
		file.previewElement.querySelector('.status').classList.add('hidden');
		file.previewElement.querySelector('.link').classList.remove('hidden');
		file.previewElement.querySelector('.link-href').setAttribute('href', 'http://localhost:3000/images/' + response[0].filename);
		file.previewElement.querySelector('.link-href').innerHTML = 'http://localhost:3000/images/' + response[0].filename;
	});
}

window.onload = function() {
	initializeDropzone();
};
