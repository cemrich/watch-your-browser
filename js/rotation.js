define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'DeviceOrientationEvent' in window;
	};

	var result = document.querySelector('#rotation .result');
	var indicator = document.querySelector('#rotation .indicator');

	function onOrientation(event) {
		var a = event.alpha;
		var b = event.beta;
		var g = event.gamma;

		result.innerHTML =  'alpha: ' + Math.round(a) + '°<br>';
		result.innerHTML += 'beta: ' + Math.round(b) + '°<br>';
		result.innerHTML += 'gamma: ' + Math.round(g) + '°';

		indicator.style.transform = indicator.style.webkitTransform =
			'rotateY(' + -g + 'deg) ' +
			'rotateX(' + b + 'deg) ' +
			'rotateZ(' + a + 'deg) ';
	}

	// ROTATION
	exports.onStartClick = function () {
		window.addEventListener('deviceorientation', onOrientation, false);
	};

	exports.onStopClick = function () {
		window.removeEventListener('deviceorientation', onOrientation, false);
	};

});
