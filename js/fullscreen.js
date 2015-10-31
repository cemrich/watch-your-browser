define(function (require, exports, module) {

	var node = document.querySelector('#fullscreen');
	node.requestFullscreen = node.webkitRequestFullscreen ||
		node.mozRequestFullScreen ||
		node.msRequestFullscreen ||
		node.requestFullscreen;

	exports.isSupported = function () {
		return node.requestFullscreen;
	};

	// FULLSCREEN
	exports.onTryClick = function() {
		node.requestFullscreen();
	};

});
