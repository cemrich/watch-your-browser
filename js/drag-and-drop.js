define(function (require, exports, module) {

	var dropNode = document.getElementById('drag-and-drop');
	var output = document.querySelector('#drag-and-drop .output');

	exports.isSupported = function () {
		// very rough solution:
		return 'draggable' in document.body;
	};


	// DRAG & DROP

	function onDragEnter(event) {
		dropNode.classList.add('over');
	}

	function onDragEnd(event) {
		dropNode.classList.remove('over');
	}

	function onDragLeave(event) {
		dropNode.classList.remove('over');
	}

	function onDragOver(event) {
		if (event.preventDefault) {
			event.preventDefault(); // necessary for dropping things
		}
		dropNode.classList.add('over');
	}

	function onDrop(event) {
		dropNode.classList.remove('over');

		// stops the browser from redirecting.
		event.stopPropagation();
		event.preventDefault();

		var item;
		var files = event.dataTransfer.files;
		var types = event.dataTransfer.types;

		output.innerHTML = '';

		for (var i in types) {
			var data = event.dataTransfer.getData(types[i]);
			if (data) {
				item = '<li>';
				item += '<span>' + types[i] + '</span>';
				item += data + '</li>';
				output.innerHTML += item;
			}
		}

		for (var j = 0; j < files.length; j++) {
			file = files.item(j);
			item = '<li><span>file';
			if (file.type) {
				item += ' (' + file.type + ')';
			}
			item += '</span>';
			item += file.name + '<br>' + file.lastModifiedDate;
			item += '</li>';
			output.innerHTML += item;
		}
	}

	dropNode.addEventListener('dragenter', onDragEnter, false);
	dropNode.addEventListener('dragleave', onDragLeave, false);
	dropNode.addEventListener('dragover', onDragOver, false);
	dropNode.addEventListener('dragend', onDragEnd, false);
	dropNode.addEventListener('drop', onDrop, false);

});
