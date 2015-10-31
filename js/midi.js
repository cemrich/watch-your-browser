define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'requestMIDIAccess' in navigator;
	};

	// MIDI
	exports.onTryClick = function() {
		navigator.requestMIDIAccess().then(function (access) {
			var output = access.outputs.get(0);

			if (typeof(output) == 'undefined') {
				alert('no midi outputs detected');
				return;
			}

			// full velocity note on A4 on channel zero:
			output.send( [ 0x90, 0x45, 0x7f ] );
			// full velocity A4 note off in one second:
			output.send( [ 0x80, 0x45, 0x7f ], window.performance.now() + 1000 );
		}, function (error) {
			alert('not supported', error);
		});
	};

});
