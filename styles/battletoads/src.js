var styles = styles || [];

styles.push({
    name: "Battletoads",
    shortName: "battletoads",
    width: 300,
    height: 300,
    
    BARWIDTH: 12,
	BARPADDING: 4,
	MAXBARS: 6,
	YPOS: 30,
	STARTXPOS: 53,

    renderTo(canvasWriter, styleService, calculatorResults) {

        var imageSources = {
            bg: styleService.getImagePath('bg.png', this),
			fullBar: styleService.getImagePath('fullbar.png', this),
			emptyBar: styleService.getImagePath('emptybar.png', this)
        };

		canvasWriter.loadImages(imageSources, images => {
			canvasWriter.drawImageToCanvas(images.bg, 0, 0);

			var currentHealth = calculatorResults.meterValue * this.MAXBARS;

			if (currentHealth < .5) {
				currentHealth = .5;
			}

			var numBars = Math.round(currentHealth);

			var currentPos = 0;

			for (var i = 0; i < numBars; i++) {
				this.drawBar(canvasWriter, images.fullBar, currentPos);
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