function createDropzoneContainer() {
	var div = document.createElement('div');
	div.id = 'dropzone';

	document.getElementById('uploadContainer').appendChild(div);

	initializeDropzone();
}

function initializeDropzone() {
	var previewNode = document.querySelector('#uploads');
	previewNode.id = '';
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	var dropzone = new Dropzone(document.body, {
		url: '/upload',
		paramName: 'files[]',
		maxFilesize: 250,
		parallelUploads: 10,
		uploadMultiple: false,
		previewsContainer: 'div#upload-filelist',
		previewTemplate: previewTemplate,
		createImageThumbnails: false,
		maxFiles: 1000,
		autoProcessQueue: true,
		clickable: ".btn",
		/* headers: { 'auth': upload.token },*/
		init: function() {
			this.on('addedfile', function(file) {
				document.getElementById('upload-filelist');
			});
		}
	});

	dropzone.on('success', function (file, response) {
		console.log(response);


		var a = document.createElement('a');
		a.href = 'http://localhost:3000/images/' + response[0].filename;
		a.target = '_blank';
		a.innerHTML = 'http://localhost:3000/images/' + response[0].filename;
		file.previewTemplate.querySelector('.links').appendChild(a);
	});
}

window.onload = function() {
	createDropzoneContainer();
};
