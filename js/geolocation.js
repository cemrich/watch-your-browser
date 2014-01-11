define(function (require, exports, module) {

	exports.isSupported = function () {
		return navigator.geolocation;
	};

	// GEOLOCATION
	var result = document.querySelector('#geolocation .result');
	function updateLocation(position) {
		result.innerHTML = 'timestamp: ' + position.timestamp + '<br>';
		for (var i in position.coords) {
			result.innerHTML += i + ': ' + position.coords[i] + '<br>';
		}
	}
	
	exports.onTryClick = function() {
		result.innerHTML = 'please wait...';
		var watchID = navigator.geolocation.watchPosition(updateLocation, function () {
			result.innerHTML = '';
			alert('unable to receive location');
		});
	};

});