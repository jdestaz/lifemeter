var styles = styles || [];

styles.push({
    name: "Metroid",
    shortName: "metroid",
    width: 300,
    height: 300,
    
    TANKWIDTH: 16,
	TANKPADDING: 4,
	MAXTANKS: 6,
    HEALTHPERTANK: 99,
	YPOS: 18,
	STARTXPOS: 112,

    renderTo(canvasWriter, styleService, calculatorResults) {

        var imageSources = {
            bg: styleService.getImagePath('bg.png', this),
			fullBar: styleService.getImagePath('fullbar.png', this),
			emptyBar: styleService.getImagePath('emptybar.png', this),
            num0: styleService.getImagePath('num0.png', this),
            num1: styleService.getImagePath('num1.png', this),
            num2: styleService.getImagePath('num2.png', this),
            num3: styleService.getImagePath('num3.png', this),
            num4: styleService.getImagePath('num4.png', this),
            num5: styleService.getImagePath('num5.png', this),
            num6: styleService.getImagePath('num6.png', this),
            num7: styleService.getImagePath('num7.png', this),
            num8: styleService.getImagePath('num8.png', this),
            num9: styleService.getImagePath('num9.png', this)
        };

		canvasWriter.loadImages(imageSources, images => {
			canvasWriter.drawImageToCanvas(images.bg, 0, 0);

			
            var fullHealth = (this.MAXTANKS + 1) * this.HEALTHPERTANK;
            var currentHealth = calculatorResults.meterValue * fullHealth;

			if (currentHealth < 1) { currentHealth = 1;	}

            var numTanks = (currentHealth / this.HEALTHPERTANK) - 1;
            var numFullTanksPart = Math.floor(numTanks);
            var remainder = numTanks - numFullTanksPart;
            var numeralPart = Math.round(remainder * 100);
            if(numeralPart > 99 || numeralPart === 0) { numeralPart = 99; }

            var currentPos = 0;

			for (var i = 0; i < numTanks; i++) {
				this.drawTank(canvasWriter, images.fullBar, currentPos);
				currentPos++;
			}


			for (var i = currentPos; i < this.MAXTANKS; i++) {
				this.drawTank(canvasWriter, images.emptyBar, currentPos);
				currentPos++;
			}

			this.drawNumberPortion(canvasWriter, images, numeralPart);
		});
	},

    getCurrentXPosition(currentPos) {
		return this.STARTXPOS - (currentPos * (this.TANKWIDTH + this.TANKPADDING));
	},

	drawTank(canvasWriter, image, currentPos) {
		canvasWriter.drawImageToCanvas(image, this.getCurrentXPosition(currentPos), this.YPOS);
	},

    drawNumberPortion(canvasWriter, images, number) {

        var health1X = 81;
        var health2X = health1X + 2 + 14;
        var healthY = 39;

        var health = number.toString();

        if(health.length < 2) {
            health = '0' + health;
        }


        canvasWriter.drawImageToCanvas(images['num' + this.getHealthChar(health, 1)], health1X, healthY);
        canvasWriter.drawImageToCanvas(images['num' + this.getHealthChar(health, 2)], health2X, healthY);

    },

    getHealthChar(health, pos) {
        return health.substr(pos - 1, 1);
    }



});