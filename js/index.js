define(function (require, exports, module) {

	var items = document.querySelectorAll('.features li:not(.disabled)');
	var featureNames = [];

	for (var i = 0; i < items.length; i++) {
		featureNames.push(items[i].id);
	}

	// load all feature modules and display support information
	requirejs(featureNames, function () {
		for (var i in featureNames) {
			var feature = featureNames[i];
			var module = arguments[i];
			var node = items[i];
			var tryButton = document.querySelector('#' + feature + ' .try');
			var startButton = document.querySelector('#' + feature + ' .start');
			var stopButton = document.querySelector('#' + feature + ' .stop');
			if (module.isSupported()) {
				node.classList.add('supported');
				if (tryButton) {
					tryButton.addEventListener('click', module.onTryClick, false);
				}
				if (startButton) {
					startButton.addEventListener('click', module.onStartClick, false);
				}
				if (stopButton) {
					stopButton.addEventListener('click', module.onStopClick, false);
				}
			}
		}
	});

});
