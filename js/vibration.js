define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'vibrate' in navigator;
	};

	// VIBRATE
	navigator.vibrate =
		navigator.vibrate ||
		navigator.webkitVibrate ||
		navigator.mozVibrate ||
		navigator.msVibrate;

	exports.onTryClick = function() {
		navigator.vibrate([200, 40, 40, 40, 20, 40, 100]);
	};

});