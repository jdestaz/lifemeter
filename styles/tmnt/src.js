var styles = styles || [];

styles.push({
    name: "Teenage Mutant Ninja Turtles",
    shortName: "tmnt",
    width: 300,
    height: 300,
    
    BARWIDTH: 14,
	BARPADDING: 2,
	MAXBARS: 8,
	YPOS: 252,
	STARTXPOS: 39,

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