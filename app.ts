class App {

	constructor() {
		let calculator = new Calculator({
			month: 3,
			day: 10,
			year: 1984,
			data: data.male
		});

		calculator.calculate();
		calculator.toLog();

		// build canvas 
		let canvasHelper = new CanvasHelper({
			canvasId: 'lifemeter-canvas',
			width: 300,
			height: 300
		});

		// todo: get current style
		let style = new MegamanStyle({
			calculatorResults: calculator.results
		});
		style.renderTo(canvasHelper);
	}

	getQueryString(field: string, url: string): string {
		let href: string = url ? url : window.location.href;
		let reg: RegExp = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		let string: RegExpExecArray = reg.exec(href);

		return string ? string[1] : null;
	}
}