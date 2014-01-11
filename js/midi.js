define(function (require, exports, module) {

	exports.isSupported = function () {
		return navigator.requestMIDIAccess;
	};

	// MIDI
	exports.onTryClick = function() {
		navigator.requestMIDIAccess().then(function (access) {
			var outputs = access.outputs();
			var o = access.outputs()[0];
			// full velocity note on A4 on channel zero:
			o.send( [ 0x90, 0x45, 0x7f ] ); 
			// full velocity A4 note off in one second:
			o.send( [ 0x80, 0x45, 0x7f ], window.performance.now() + 1000 );
		}, function (error) {
			alert('not supported', error);
		});
	};

});