define(function (require, exports, module) {

	var volumeSlider = document.querySelector('#sound-generation .volume');
	var volumeLabel = document.querySelector('#sound-generation #volume');
	var frequencySlider = document.querySelector('#sound-generation .frequency');
	var frequencyLabel = document.querySelector('#sound-generation #frequency');
	var waveshape = document.querySelector('#sound-generation .waveshape');

	var isRunning = false;
	var context = null;
	var source = null;
	var gainNode = null;

	exports.isSupported = function () {
		return AudioContext;
	};

	volumeSlider.oninput = function (event) {
		var volume = event.currentTarget.valueAsNumber;
		volumeLabel.innerHTML = volume;
		gainNode.gain.value = volume;
	};
	frequencySlider.oninput = function (event) {
		var frequency = event.currentTarget.valueAsNumber;
		frequencyLabel.innerHTML = frequency;
		source.frequency.value = frequency;
	};
	waveshape.onchange = function() {
		source.type = this.value;
	};

	function createChain() {
		source = context.createOscillator();
		source.frequency.value = frequencySlider.valueAsNumber;
		source.type = waveshape.value;
		source.connect(gainNode);
	}

	// SOUND GENERATION
	if (exports.isSupported()) {
		context = new AudioContext();

		gainNode = context.createGain();
		gainNode.connect(context.destination);
		gainNode.gain.value = volumeSlider.valueAsNumber;

		createChain();
	}

	exports.onStartClick = function() {
		if (!isRunning) {
			isRunning = true;
			createChain();
			source.start(0);
		}
	};

	exports.onStopClick = function() {
		if (isRunning) {
			isRunning = false;
			source.stop(0);
		}
	};

});
