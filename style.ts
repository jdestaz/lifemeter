class Style {
	styleShortname: string;
	styleName: string;
	calculatorResults: CalculatorResults;

	constructor(args: StyleArguments) {
		this.calculatorResults = args.calculatorResults;
	}

	getImagePath(filename): string {
		return `styles/${this.styleShortname}/${filename}`;
	}
}

interface StyleArguments {
	calculatorResults: CalculatorResults;
}