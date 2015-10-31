define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'Notification' in window;
	};

	// NOTIFICATION
	function showNotification() {
		var counter = 0;
		var interval = setInterval(function () {
			counter++;
			var notification = new Notification(
				'Notification Title ' + counter, {
				icon: 'img/ps_bg_middle.jpg',
				body: 'Notification content...' });
			if (counter >= 3) {
				clearInterval(interval);
			}
		}, 1000);
	}

	exports.onTryClick = function() {
		window.Notification.requestPermission(function () {
			showNotification();
		});
	};

});
