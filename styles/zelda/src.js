var styles = styles || [];

styles.push({
    name: "The Legend of Zelda (8-bit)",
    shortName: "zelda",
    width: 300,
    height: 300,
    
    HEARTWIDTH: 14,
    HEARTHEIGHT: 16,
	HEARTHORIZONALPADDING: 1,
    HEARTVERTICALPADDING: -1, 
	MAXHEARTS: 16,
    MAXHEARTSPERROW: 8,
	STARTYPOS: 50,
	STARTXPOS: 150,

    renderTo(canvasWriter, styleService, calculatorResults) {

        var imageSources = {
            bg: styleService.getImagePath('bg.png', this),
			halfHeart: styleService.getImagePath('halfheart.png', this),
			fullHeart: styleService.getImagePath('fullheart.png', this),
			emptyHeart: styleService.getImagePath('emptyheart.png', this)
        };

		canvasWriter.loadImages(imageSources, images => {
			canvasWriter.drawImageToCanvas(images.bg, 0, 0);

			var currentHealth = calculatorResults.meterValue * this.MAXHEARTS;

			if (currentHealth < .5) {
				currentHealth = .5;
			}

			var numHearts = Math.floor(currentHealth);
			var remainder = currentHealth - numHearts;

			var hasHalf = (remainder >= .5);

			var currentPos = 0;

			for (var i = 0; i < numHearts; i++) {
				this.drawHeart(canvasWriter, images.fullHeart, currentPos);
				currentPos++;
			}

			if (hasHalf) {
				this.drawHeart(canvasWriter, images.halfHeart, currentPos);
				currentPos++;
			}

			for (var i = currentPos; i < this.MAXHEARTS; i++) {
				this.drawHeart(canvasWriter, images.emptyHeart, currentPos);
				currentPos++;
			}
		});
	},

    getCurrentXPosition(currentPos) {

        while(currentPos >= this.MAXHEARTSPERROW) {
            currentPos -= this.MAXHEARTSPERROW;
        }

		return this.STARTXPOS + (currentPos * (this.HEARTWIDTH + this.HEARTHORIZONALPADDING));
	},

    getCurrentYPosition(currentPos) {
        var rowNum = Math.floor(currentPos / this.MAXHEARTSPERROW);

		return this.STARTYPOS - (rowNum * (this.HEARTHEIGHT + this.HEARTVERTICALPADDING));
	},

	drawHeart(canvasWriter, image, currentPos) {
		canvasWriter.drawImageToCanvas(image, this.getCurrentXPosition(currentPos), this.getCurrentYPosition(currentPos));
	}

});