define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'connection' in navigator;
	};


	var result = document.querySelector('#network-info .result');

	if (exports.isSupported()) {
		displayConnection();
		navigator.connection.addEventListener('change', onConnectionChange, false);
	}

	function displayConnection() {
		result.innerHTML =
			'Connection type: ' + navigator.connection.type + '<br>' +
			'Downlink speed: ' + navigator.connection.downlinkMax + ' Mbit/s';
	}

	function onConnectionChange(event) {
		displayConnection();
	}

});
