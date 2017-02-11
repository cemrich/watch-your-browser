define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'ondeviceproximity' in window || 'userproximity' in window;
	};


	var result = document.querySelector('#proximity-sensor .result');

	function onProximityChanged(event) {
		if ('near' in event) {
			result.style.backgroundColor = event.near ? 'red' : 'yellow';
		} else {
			result.innerHTML = event.reading.distance;
			var percent = event.reading.distance / event.reading.max;
			result.style.width = (percent * 100) + '%';
		}
	}

	exports.onStartClick = function() {
		window.addEventListener('ondeviceproximity', onProximityChanged, false);
		window.addEventListener('userproximity', onProximityChanged, false);
	};

	exports.onStopClick = function() {
		window.removeEventListener('ondeviceproximity', onProximityChanged, false);
		window.removeEventListener('userproximity', onProximityChanged, false);
	};

});
