define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'onLine' in navigator;
	};

	var indicator = document.querySelector('#offline-detection .indicator');

	function updateStatus() {
		if (navigator.onLine) {
			indicator.classList.add('online');
		} else {
			indicator.classList.remove('online');
		}
	}

	// offline detection
	if (exports.isSupported()) {

		if (window.addEventListener) {
			window.addEventListener('online', updateStatus, false);
			window.addEventListener('offline', updateStatus, false);
		} else {
			// IE
			document.body.ononline = updateStatus;
			document.body.onoffline = updateStatus;
		}

		updateStatus();
	}

});
