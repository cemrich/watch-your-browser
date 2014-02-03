define(function (require, exports, module) {

	var lockNode = document.body;
	var panorama = document.querySelector('#pointer-lock .panorama');
	var panoramaPositionX = 0;
	movePanorama(0);

	lockNode.requestPointerLock = lockNode.requestPointerLock ||
		 lockNode.mozRequestPointerLock ||
		 lockNode.webkitRequestPointerLock;

	exports.isSupported = function () {
		return lockNode.requestPointerLock;
	};

	if (exports.isSupported) {
		document.addEventListener('pointerlockchange', lockChangeCallback, false);
		document.addEventListener('mozpointerlockchange', lockChangeCallback, false);
		document.addEventListener('webkitpointerlockchange', lockChangeCallback, false);
	}

	function lockChangeCallback() {
		if (document.pointerLockElement === lockNode ||
			document.mozPointerLockElement === lockNode ||
			document.webkitPointerLockElement === lockNode) {
			// locked
			document.addEventListener('mousemove', mouseMoveCallback, false);
		} else {
			// unlocked
			document.removeEventListener('mousemove', mouseMoveCallback, false);
		}
	}

	function mouseMoveCallback(e) {
		var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
		movePanorama(-movementX);
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