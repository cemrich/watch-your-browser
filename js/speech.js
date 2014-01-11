define(function (require, exports, module) {

	exports.isSupported = function () {
		return window.webkitSpeechRecognition;
	};

	// SPEECH RECOGNITION
	var result = document.querySelector('#speech .result');
	exports.onTryClick = function() {
		var recognition = new webkitSpeechRecognition();
		result.innerHTML = '-';
		recognition.start();
		recognition.addEventListener('result', function (event) {
			var resultList = '';
			for (var i = 0; i < event.results.length; i++) {
				resultList += event.results.item(i)[0].transcript + '<br>';
			};
			result.innerHTML = resultList;
			recognition.stop();
		});
	};
});