var styles = styles || [];

styles.push({
    name: "Mega Man (8-bit)",
    shortName: "megaman",
    width: 300,
    height: 300,

    renderTo(canvasWriter, styleService, calculatorResults) {

        var imageSources = {
            bg: styleService.getImagePath('bg.png', this),
            meterBg: styleService.getImagePath('meterbg.png', this),
            meterBar: styleService.getImagePath('meterbar.png', this)
        };

		canvasWriter.loadImages(imageSources, images => {

			canvasWriter.drawImageToCanvas(images.bg, 0, 0);
			canvasWriter.drawImageToCanvas(images.meterBg, 30, 20);

			var barHeight = 8;
            var barBottom = 235;
			var numBarsFullHealth = 28;
			var numBarsCurrentHealth = Math.round(numBarsFullHealth * calculatorResults.meterValue);

			if (numBarsCurrentHealth < 1)
				numBarsCurrentHealth = 1;

			for (var x = 0; x < numBarsCurrentHealth; x++) {
				canvasWriter.drawImageToCanvas(images.meterBar, 30, barBottom - (barHeight * x));
			}
		});
	}

});
var styles = styles || [];

styles.push({
    name: "Shovel Knight",
    shortName: "shovelknight",
    width: 450,
    height: 450,
    
    BARWIDTH: 39,
	BARPADDING: 5,
	MAXBARS: 10,
	YPOS: 38,
	STARTXPOS: 5,

    renderTo(canvasWriter, styleService, calculatorResults) {

        var imageSources = {
            bg: styleService.getImagePath('bg.png', this),
			halfBar: styleService.getImagePath('halfbar.png', this),
			fullBar: styleService.getImagePath('fullbar.png', this),
			emptyBar: styleService.getImagePath('emptybar.png', this)
        };

		canvasWriter.loadImages(imageSources, images => {
			canvasWriter.drawImageToCanvas(images.bg, 0, 0);

			var currentHealth = calculatorResults.meterValue * this.MAXBARS;

			if (currentHealth < .5) {
				currentHealth = .5;
			}

			var numBars = Math.floor(currentHealth);
			var remainder = currentHealth - numBars;

			var hasHalf = (remainder >= .5);

			var currentPos = 0;

			for (var i = 0; i < numBars; i++) {
				this.drawBar(canvasWriter, images.fullBar, currentPos);
				currentPos++;
			}

			if (hasHalf) {
				this.drawBar(canvasWriter, images.halfBar, currentPos);
				currentPos++;
			}

			for (var i = currentPos; i < this.MAXBARS; i++) {
				this.drawBar(canvasWriter, images.emptyBar, currentPos);
				currentPos++;
			}
		});
	},

    getCurrentXPosition(currentPos) {
		return this.STARTXPOS + (currentPos * (this.BARWIDTH + this.BARPADDING));
	},

	drawBar(canvasWriter, image, currentPos) {
		canvasWriter.drawImageToCanvas(image, this.getCurrentXPosition(currentPos), this.YPOS);
	}

});
