define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'webkitNotifications' in window;
	};

	// NOTIFICATION
	function showNotification() {
		var counter = 0;
		var interval = setInterval(function () {
			counter++;
			var notification = window.webkitNotifications.createNotification(
				'img/ps_bg_middle.jpg',
				'Notification Title ' + counter,
				'Notification content...');
			notification.show();
			if (counter >= 3) {
				clearInterval(interval);
			}
		}, 1000);
	}

	exports.onTryClick = function() {
		if (window.webkitNotifications.checkPermission() === 0) { 
			// allowed
			showNotification();
		} else {
			window.webkitNotifications.requestPermission(function () {
				showNotification();
			});
		}
	};

});