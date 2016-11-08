var styles = styles || [];

styles.push({
    name: "Kirby's Adventure",
    shortName: "kirbyadventure",
    width: 300,
    height: 300,
    
    BARWIDTH: 14,
	BARPADDING: 2,
	MAXBARS: 6,
	YPOS: 214,
	STARTXPOS: 160,

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
    width: 300,
    height: 300,
    
    BARWIDTH: 22,
	BARPADDING: 3,
	MAXBARS: 10,
	YPOS: 32,
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
