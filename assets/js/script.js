document.addEventListener('DOMContentLoaded', function () {
	function stopDefaultEvent(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}

	function selectFiles(target, evt) {
		stopDefaultEvent(evt);
		target.click();
	}

	var uploadButton = document.getElementById('upload-btn');
	var uploadInput = document.getElementById('upload-input');
	uploadButton.addEventListener('click', selectFiles.bind(this, uploadInput));
	document.getElementById('upload-form').classList.add('js');
});
