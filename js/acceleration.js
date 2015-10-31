define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'DeviceOrientationEvent' in window;
	};

	var canvas = document.querySelector('#acceleration canvas');
	var context = canvas.getContext('2d');
	var canvasX = 0;
	var x, y, z, lastX, lastY, lastZ = 0;

	context.lineWidth = 1;

	function stroke(x, y, lastY, offset, color) {
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(x-1, offset + lastY);
		context.lineTo(x, offset + y);
		context.stroke();
	}

	function onMotion(event) {
		lastX = x;
		lastY = y;
		lastZ = z;
		x = event.acceleration.x;
		y = event.acceleration.y;
		z = event.acceleration.z;

		context.clearRect(canvasX, 0, 2, canvas.height);
		stroke(canvasX, x, lastX, 20, '#2385BC');
		stroke(canvasX, y, lastY, 60, '#B10071');
		stroke(canvasX, z, lastZ, 100, '#398B0B');

		canvasX = (canvasX + 1) % canvas.width;
	}

	// ACCELERATION
	exports.onStartClick = function () {
		window.addEventListener('devicemotion', onMotion, false);
	};

	exports.onStopClick = function () {
		window.removeEventListener('devicemotion', onMotion, false);
	};

});
