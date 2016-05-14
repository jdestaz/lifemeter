class CanvasHelper {

	private canvas: any;
	private canvasContext: any;

	constructor(args: CanvasHelperArguments) {
		this.canvas = document.getElementById(args.canvasId);

		if (this.canvas === null) {
			console.log('Invalid canvas id');
			return;
		}

		this.canvasContext = this.canvas.getContext('2d');
		this.canvas.width = args.width;
		this.canvas.height = args.height;
	}

	loadImages(sources: any, callbackFunc: any): void {
		let images: any = {};
		let loadedImages: number = 0;
		let numImages: number = Object.keys(sources).length;

		for (var source in sources) {
			images[source] = new Image();
			images[source].onload = () => {
				if (++loadedImages >= numImages)
					callbackFunc(images);
			};
			images[source].src = sources[source];
		}
	}

	drawImageToCanvas(image, x, y) {
		this.canvasContext.drawImage(image, x, y);
	}
}

interface CanvasHelperArguments {
	canvasId: string;
	width: number;
	height: number;
}