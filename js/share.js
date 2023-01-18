define(function (require, exports, module) {

	var result = document.querySelector('#share .result');

	exports.isSupported = function () {
		return 'share' in navigator;
	};

	exports.onTryClick = function () {
		result.textContent = '';

		const shareData = {
			title: 'Watch your browser',
			url: 'https://christine-coenen.de/demos/watch-your-browser/'
		}

		navigator
			.share(shareData)
			.then(() => {
				result.textContent = 'Link shared successfully!';
			})
			.catch(err => {
				result.textContent = `Error: ${err}`;
			})
	};

});
