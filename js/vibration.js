define(function (require, exports, module) {

	exports.isSupported = function () {
		return navigator.vibrate;
	};

	// VIBRATE
	navigator.vibrate =
		navigator.vibrate ||
		navigator.webkitVibrate ||
		navigator.mozVibrate ||
		navigator.msVibrate;

	var tryButton = document.querySelector('#vibration button');
	tryButton.addEventListener('click', function() {
		if (exports.isSupported()) {
			navigator.vibrate([200, 40, 40, 40, 20, 40, 100]);
		} else {
			alert('not supported');
		}
	}, false);

});