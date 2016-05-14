class MegaManStyle extends Style {

	private imageSources: any;

	constructor(args) {
		super(args);

		this.styleShortname = 'megaman';
		this.styleName = 'Mega Man (8-bit)';

		this.imageSources = {
			bg: this.getImagePath('bg.png'),
			meterBg: this.getImagePath('meterbg.png'),
			meterBar: this.getImagePath('meterbar.png')
		};
	}

	renderTo(canvasHelper: CanvasHelper): void {

		canvasHelper.loadImages(this.imageSources, images => {

			canvasHelper.drawImageToCanvas(images.bg, 0, 0);
			canvasHelper.drawImageToCanvas(images.meterBg, 30, 20);

			let barHeight: number = 8;
			let barBottom: number = 235;
			let numBarsFullHealth: number = 28;
			let numBarsCurrentHealth: number = Math.round(numBarsFullHealth * this.calculatorResults.meterValue);

			if (numBarsCurrentHealth < 1)
				numBarsCurrentHealth = 1;

			for (let x: number = 0; x < numBarsCurrentHealth; x++) {
				canvasHelper.drawImageToCanvas(images.meterBar, 30, barBottom - (barHeight * x));
			}
		});
	}

	

}