function initializeDropzone() {
	var previewNode = document.getElementById('template');
	previewNode.id = '';
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	var dropzone = new Dropzone(document.body, {
		url: '/upload',
		paramName: 'files[]',
		maxFilesize: 250,
		parallelUploads: 10,
		uploadMultiple: false,
		previewsContainer: '#uploads',
		previewTemplate: previewTemplate,
		createImageThumbnails: false,
		maxFiles: 1000,
		autoProcessQueue: true,
		clickable: '.btn',
		/* headers: { 'auth': upload.token },*/
		init: function() {
			this.on('addedfile', function(file) {
				document.getElementById('uploads');
			});
		}
	});

	dropzone.on('success', function(file, response) {
		if (response.status !== 200) {
			var span = document.createElement('span');
			span.innerHTML = response.description;
			return file.previewTemplate.querySelector('.link').appendChild(span);
		}

		var links = document.createElement('a');
		links.href = 'http://localhost:3000/images/' + response[0].filename;
		links.target = '_blank';
		links.innerHTML = 'http://localhost:3000/images/' + response[0].filename;

		file.previewTemplate.querySelector('.links').appendChild(links);
		file.previewTemplate.querySelector('.progress').style.display = 'none';
	});
}

window.onload = function() {
	initializeDropzone();
};
