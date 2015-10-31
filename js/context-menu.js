define(function (require, exports, module) {

	exports.isSupported = function () {
		return 'contextMenu' in document.body &&
			'HTMLMenuItemElement' in window;
	};

});
