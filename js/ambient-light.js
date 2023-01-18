define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'AmbientLightSensor' in window;
	};

	const result = document.querySelector('#ambient-light .result');
	var sensor = null;

	function ondevicelight() {
		result.innerHTML = `${sensor.illuminance} lux`;
	}

	function onError(event) {
		result.innerHTML = `${event.error.name}: ${event.error.message}`;
	}

	exports.onStartClick = function() {
		sensor = sensor || new AmbientLightSensor();
		sensor.addEventListener('reading', ondevicelight, false);
		sensor.addEventListener('error', onError, false);
	};

	exports.onStopClick = function() {
		sensor.removeEventListener('reading', ondevicelight, false);
		sensor.removeEventListener('error', onError, false);
	};

});
