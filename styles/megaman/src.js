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