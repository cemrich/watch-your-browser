define(function (require, exports, module) {

	var getUserMedia = navigator.getUserMedia || 
		navigator.webkitGetUserMedia || 
		navigator.mozGetUserMedia;

	var canvas = document.querySelector('#video-analysis canvas');
	var context = canvas.getContext('2d');
	var video = document.querySelector('#video-analysis video');
	var running = false;
	var localStream = null;


	exports.isSupported = function () {
		return getUserMedia;
	};


	function analyse(analyser) {
		if (running) requestAnimationFrame(analyse);
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

		var averageR = 0;
		var averageG = 0;
		var averageB = 0;
		var pixValueLength = canvas.width * canvas.height * 4;
		for (var i = 0; i < pixValueLength; i += 4) {
			averageR += data[i];
			averageG += data[i+1];
			averageB += data[i+2];
		}
		averageR /= canvas.width * canvas.height;
		averageG /= canvas.width * canvas.height;
		averageB /= canvas.width * canvas.height;
		var rgb = 'rgb(' +
			Math.floor(averageR) + ',' +
			Math.floor(averageG) + ',' +
			Math.floor(averageB) + ')';
		video.style.borderColor = rgb;
		video.style.backgroundColor = rgb;
	}

	function microphoneError() {
		alert('could not connect to camera');
	};

	// VIDEO ANALYSIS
	exports.onStartClick = function() {
		running = false;

		getUserMedia.call(navigator, {video: true, audio: false}, function(stream) {
			localStream = stream;
			video.src = window.webkitURL.createObjectURL(stream);
			running = true;
			analyse();
		}, microphoneError);
	};

	exports.onStopClick = function() {
		if (localStream) {
			localStream.stop();
			localStream = null;
		}
		running = false;
	};

});