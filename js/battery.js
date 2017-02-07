define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'getBattery' in navigator;
	};

	var battery = document.querySelector('#battery .indicator .inner');
	var dischargedTime = document.querySelector('#battery .dischargedTime');
	var chargedTime = document.querySelector('#battery .chargedTime');

	var batteryManager = null;

	function updateStatus() {
		var height = batteryManager.level * 100;
		battery.style.height = height + 'px';
		battery.style.top = 100 - height + 'px';
		battery.innerHTML = height + '%';
		dischargedTime.innerHTML = batteryManager.dischargingTime;
		chargedTime.innerHTML = batteryManager.chargingTime;
		if (batteryManager.charging) {
			battery.style.backgroundColor = '#fff';
		} else {
			battery.style.backgroundColor = '#2385BC';
		}
	}

	// BATTERY
	if (exports.isSupported()) {
		navigator.getBattery().then(function(battery) {
			batteryManager = battery;
			batteryManager.addEventListener('chargingchange', updateStatus);
			batteryManager.addEventListener('levelchange', updateStatus);
			batteryManager.addEventListener('chargingtimechange', updateStatus);
			batteryManager.addEventListener('dischargingtimechange', updateStatus);
			updateStatus();
		});
	}

});
