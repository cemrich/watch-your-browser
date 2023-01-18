define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'vibrate' in navigator;
	};

	exports.onTryClick = function() {
		navigator.vibrate([200, 40, 40, 40, 20, 40, 100]);
	};

});
