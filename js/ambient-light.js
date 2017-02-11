define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'ondevicelight' in window;
	};


	var result = document.querySelector('#ambient-light .result');

	function ondevicelight(event) {
		result.innerHTML = event.value;
		var percent = event.value / 1000;
		result.style.width = (percent * 100) + '%';
	}

	exports.onStartClick = function() {
		window.addEventListener('devicelight', ondevicelight, false);
	};

	exports.onStopClick = function() {
		window.removeEventListener('devicelight', ondevicelight, false);
	};

});
