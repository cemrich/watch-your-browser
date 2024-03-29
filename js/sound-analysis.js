define(function (require, exports, module) {

	var canvas = document.querySelector('#sound-analysis canvas');
	var context = canvas.getContext('2d');
	var running = false;
	var localStream = null;
	var source = null;
	var analyser = null;


	exports.isSupported = function () {
		return navigator.mediaDevices?.getUserMedia && AudioContext.prototype.createAnalyser;
	};


	function analyse(analyser) {
		if (!running) return;

		//loop
		requestAnimationFrame(function () {
			analyse(analyser);
		});

		var x, y, i;
		var width = canvas.width;
		var buffer = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(buffer);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.strokeStyle = '#2385BC';

		context.beginPath();
		for (x = 0; x < width; x++) {
			i = Math.floor(x / width * analyser.frequencyBinCount);
			y = buffer[i] / 256 * canvas.height;
			context.moveTo(x, canvas.height);
			context.lineTo(x, canvas.height - y);
		}
		context.stroke();

		analyser.getByteTimeDomainData(buffer);
		context.strokeStyle = '#0E5177';

		context.beginPath();
		context.moveTo(0, canvas.height / 2);
		for (x = 0; x < width; x++) {
			i = Math.floor(x / width * analyser.frequencyBinCount);
			y = buffer[i] / 256 * canvas.height;
			context.lineTo(x, canvas.height - y);
		}
		context.stroke();
	}

	function microphoneError() {
		alert('could not connect to microphone');
	}

	// SOUND ANALYSIS
	exports.onStartClick = function() {
		running = false;
		var audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();

		navigator.mediaDevices.getUserMedia({audio: true})
			.then(function(stream) {
				console.log("connected");
				source = audioContext.createMediaStreamSource(stream);
				localStream = stream;
				source.connect(analyser);
				running = true;
				analyse(analyser);
			})
			.catch(microphoneError);
	};

	exports.onStopClick = function() {
		if (localStream) {
			source.disconnect(analyser);
			localStream.getTracks()[0].stop();
			localStream = null;
		}
		running = false;
	};

});
