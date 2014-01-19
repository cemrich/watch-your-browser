define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'battery' in navigator;
	};

	// BATTERY
	if (exports.isSupported()) {

		var battery = document.querySelector('#battery .indicator .inner');
		var dischargedTime = document.querySelector('#battery .dischargedTime');
		var chargedTime = document.querySelector('#battery .chargedTime');

		function updateStatus() {
			var height = navigator.battery.level * 100;
			battery.style.height = height + 'px';
			battery.style.top = 100 - height + 'px';
			battery.innerHTML = height + '%';
			dischargedTime.innerHTML = navigator.battery.dischargingTime;
			chargedTime.innerHTML = navigator.battery.chargingTime;
			if (navigator.battery.charging) {
				battery.style.backgroundColor = '#fff';
			} else {
				battery.style.backgroundColor = '#2385BC';
			}
		}

		navigator.battery.addEventListener('chargingchange', updateStatus);
		navigator.battery.addEventListener('levelchange', updateStatus);
		navigator.battery.addEventListener('chargingtimechange', updateStatus);
		updateStatus();

	}

});