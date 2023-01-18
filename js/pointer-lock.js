define(function (require, exports, module) {

	var lockNode = document.body;
	var panorama = document.querySelector('#pointer-lock .panorama');
	var panoramaPositionX = 0;
	movePanorama(0);

	exports.isSupported = function () {
		return lockNode.requestPointerLock;
	};

	if (exports.isSupported) {
		document.addEventListener('pointerlockchange', lockChangeCallback, false);
	}

	function lockChangeCallback() {
		if (document.pointerLockElement) {
			// locked
			document.addEventListener('mousemove', mouseMoveCallback, false);
		} else {
			// unlocked
			document.removeEventListener('mousemove', mouseMoveCallback, false);
		}
	}

	function mouseMoveCallback(e) {
		movePanorama(e.movementX);
	}

	function movePanorama(amount) {
		panoramaPositionX += amount;
		panorama.style.backgroundPosition = panoramaPositionX + 'px 0';
	}

	// POINTER LOCK
	exports.onTryClick = function() {
		lockNode.requestPointerLock();
	};

});
