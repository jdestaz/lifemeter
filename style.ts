class Style {
	styleShortname: string;
	styleName: string;
	calculatorResults: CalculatorResults;

	constructor(args: StyleArguments) {
		this.calculatorResults = args.calculatorResults;
		this.styleShortname = args.styleShortname;
	}

	getImagePath(filename): string {
		return `styles/${this.styleShortname}/${filename}`;
	}

	renderTo(canvasHelper: CanvasHelper): void {}
}

interface StyleArguments {
	calculatorResults: CalculatorResults;
	styleShortname: string;
}