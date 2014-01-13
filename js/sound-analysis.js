define(function (require, exports, module) {

	var AudioContext = window.AudioContext || 
		window.webkitAudioContext || 
		window.mozAudioContext;
	var getUserMedia = navigator.getUserMedia || 
		navigator.webkitGetUserMedia || 
		navigator.mozGetUserMedia;

	var canvas = document.querySelector('#sound-analysis canvas');
	var context = canvas.getContext('2d');
	var running = false;
	var localStream = null;
	var source = null;
	var analyser = null;


	exports.isSupported = function () {
		return getUserMedia && AudioContext.prototype.createAnalyser;
	};


	function analyse(analyser) {
		if (!running) return;

		//loop
		requestAnimationFrame(function () {
			analyse(analyser);
		});

		var buffer = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(buffer);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.strokeStyle = '#2385BC';

		context.beginPath();
		for (var x = 0, l = canvas.width; x < l; x++) {
			var i = Math.floor(x / l * analyser.frequencyBinCount);
			var y = buffer[i] / 256 * canvas.height;
			context.moveTo(x, canvas.height);
			context.lineTo(x, canvas.height - y);
		}
		context.stroke();

		analyser.getByteTimeDomainData(buffer);
		context.strokeStyle = '#0E5177';

		context.beginPath();
		context.moveTo(0, canvas.height / 2);
		for (var x = 0, l = canvas.width; x < l; x++) {
			var i = Math.floor(x / l * analyser.frequencyBinCount);
			var y = buffer[i] / 256 * canvas.height;
			context.lineTo(x, canvas.height - y);
		}
		context.stroke();
	}

	function microphoneError() {
		alert('could not connect to microphone');
	};

	// SOUND ANALYSIS
	exports.onStartClick = function() {
		running = false;
		var audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();

		getUserMedia.call(navigator, {audio: true}, function(stream) {
			source = audioContext.createMediaStreamSource(stream);
			localStream = stream;
			source.connect(analyser);
			running = true;
			analyse(analyser);
		}, microphoneError);
	};

	exports.onStopClick = function() {
		if (localStream) {
			source.disconnect(analyser);
			localStream.stop();
			localStream = null;
		}
		running = false;
	};

});