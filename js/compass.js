define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'DeviceOrientationEvent' in window;
	};

	var result = document.querySelector('#compass .result');
	var compass = document.querySelector('#compass .compass');

	function onOrientation(event) {
		var angle = event.alpha;
		result.innerHTML = Math.round(angle) + '°';
		compass.style.transform = compass.style.webkitTransform =
			'rotate(' + angle + 'deg)';
	}

	// COMPASS
	exports.onStartClick = function () {
		window.addEventListener('deviceorientation', onOrientation, false);
	};

	exports.onStopClick = function () {
		window.removeEventListener('deviceorientation', onOrientation, false);
	};

});