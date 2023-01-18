define(function (require, exports, module) {

	var node = document.querySelector('#fullscreen');

	exports.isSupported = function () {
		return node.requestFullscreen;
	};

	// FULLSCREEN
	exports.onTryClick = function() {
		node.requestFullscreen();
	};

});
