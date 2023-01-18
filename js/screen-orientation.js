define(function (require, exports, module) {

	var rootItem = document.querySelector('#screen-orientation');
	var result = rootItem.querySelector('.result');

	exports.isSupported = function () {
		return rootItem.requestFullscreen &&
			typeof(screen) !== 'undefined' &&
			'orientation' in screen;
	};

	function updateStatus() {
		result.innerHTML  = screen.orientation.type + " ";
		result.innerHTML += "(" + screen.orientation.angle + " degree)";
	}

	function lockScreen() {
		screen.orientation.lock('landscape');

		// remove listeners
		document.removeEventListener('fullscreenchange', lockScreen, false);
	}

	// screen orientation
	if (exports.isSupported()) {
		screen.orientation.addEventListener("change", updateStatus);
		updateStatus();
	}

	exports.onStartClick = function() {
		// lock screen when we go fullscreen
		document.addEventListener('fullscreenchange', lockScreen, false);

		rootItem.requestFullscreen();
	};

	exports.onStopClick = function() {
		screen.orientation.unlock();
		document.exitFullscreen();
	};
});
