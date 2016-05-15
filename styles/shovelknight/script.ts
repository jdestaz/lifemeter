class ShovelKnightStyle extends Style {

	private imageSources: any;

	private BARWIDTH: number = 39;
	private BARPADDING: number = 5;
	private MAXBARS: number = 10;
	private YPOS: number = 38;
	private STARTXPOS: number = 5;

	constructor(args) {
		super(args);

		this.imageSources = {
			bg: this.getImagePath('bg.png'),
			halfBar: this.getImagePath('halfbar.png'),
			fullBar: this.getImagePath('fullbar.png'),
			emptyBar: this.getImagePath('emptybar.png')
		};
	}

	renderTo(canvasHelper: CanvasHelper): void {

		canvasHelper.loadImages(this.imageSources, images => {

			canvasHelper.drawImageToCanvas(images.bg, 0, 0);

			
			let currentHealth: number = this.calculatorResults.meterValue * this.MAXBARS;

			if (currentHealth < .5) {
				currentHealth = .5;
			}

			let numBars: number = Math.floor(currentHealth);
			let remainder: number = currentHealth - numBars;

			let hasHalf: boolean = (remainder >= .5);

			let currentPos: number = 0;

			for (let i: number = 0; i < numBars; i++) {
				this.drawBar(canvasHelper, images.fullBar, currentPos);
				currentPos++;
			}

			if (hasHalf) {
				this.drawBar(canvasHelper, images.halfBar, currentPos);
				currentPos++;
			}

			for (let i: number = currentPos; i < this.MAXBARS; i++) {
				this.drawBar(canvasHelper, images.emptyBar, currentPos);
				currentPos++;
			}

		});
	}

	getCurrentXPosition(currentPos: number): number {
		return this.STARTXPOS + (currentPos * (this.BARWIDTH + this.BARPADDING));
	}

	drawBar(canvasHelper: CanvasHelper, image: any, currentPos: number) {
		canvasHelper.drawImageToCanvas(image, this.getCurrentXPosition(currentPos), this.YPOS);

	}

}