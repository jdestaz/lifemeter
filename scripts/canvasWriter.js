var CanvasWriter = (function() {

    function CanvasWriter(args) {
        this.canvas = document.getElementById(args.canvasId);

        if (this.canvas === null) {
			console.log('Invalid canvas id');
			return;
		}

        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.width = args.width;
		this.canvas.height = args.height
    }

    CanvasWriter.prototype.loadImages = function(sources, callbackFunc) {
        var images = {};
		var numLoadedImages = 0;
		var numImages = Object.keys(sources).length;

		for (var source in sources) {
			images[source] = new Image();
			images[source].onload = () => {
				if (++numLoadedImages >= numImages)
					callbackFunc(images);
			};
			images[source].src = sources[source];
		}
    }

    CanvasWriter.prototype.drawImageToCanvas = function(image, x, y) {
        this.canvasContext.drawImage(image, x, y);
    }

    return CanvasWriter;
})();