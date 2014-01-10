define(function (require, exports, module) {

	exports.isSupported = function () {
		return window.webkitSpeechRecognition;
	};

	// SPEECH RECOGNITION
	var result = document.querySelector('#speech .result');
	var tryButton = document.querySelector('#speech button');
	tryButton.addEventListener('click', function() {
		if (exports.isSupported()) {
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
		} else {
			alert('not supported');
		}
	}, false);
});