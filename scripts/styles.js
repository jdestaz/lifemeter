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
var styles = styles || [];

styles.push({
    name: "Castlevania",
    shortName: "castlevania",
    width: 300,
    height: 300,
    
    BARWIDTH: 6,
	BARPADDING: 2,
	MAXBARS: 16,
	YPOS: 15,
	STARTXPOS: 128,

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
    name: "Kirby's Adventure",
    shortName: "kirbysadventure",
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
var styles = styles || [];

styles.push({
    name: "Ninja Gaiden",
    shortName: "ninjagaiden",
    width: 300,
    height: 300,
    
    BARWIDTH: 6,
	BARPADDING: 2,
	MAXBARS: 16,
	YPOS: 12,
	STARTXPOS: 165,

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
    name: "The Legend of Zelda",
    shortName: "thelegendofzelda",
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
