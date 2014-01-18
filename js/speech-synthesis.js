define(function (require, exports, module) {

	exports.isSupported = function () {
		return window.speechSynthesis;
	};


	var input = document.querySelector('#speech-synthesis input');

	// SPEECH SYNTHESIS
	exports.onTryClick = function() {

		var msg = new SpeechSynthesisUtterance();
		msg.text = input.value;
		msg.lang = 'en-GB';

		speechSynthesis.speak(msg);

		function onEvent(event) {
			input.className = event.type;
		}

		msg.addEventListener('start', onEvent, false);
		msg.addEventListener('end', onEvent, false);
		msg.addEventListener('error', onEvent, false);
		msg.addEventListener('mark', onEvent, false);
		msg.addEventListener('boundary', onEvent, false);

	};
});