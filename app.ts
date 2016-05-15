﻿class App {

	private data: LifeExpectancyData = this.getData();

	constructor() {

		// get parameters from query string
		let month: number = parseInt(this.getQueryString('month'));
		let day: number = parseInt(this.getQueryString('day'));
		let year: number = parseInt(this.getQueryString('year'));

		if (month === 0 || day === 0 || year === 0) {
			console.log('Invalid date');
			return;
		}

		let gender: string = this.getQueryString('gender');
		let genderData: number[] = [];

		if (gender === 'male')
			genderData = this.data.male;
		else if (gender === 'female')
			genderData = this.data.female;

		if (genderData.length === 0) {
			console.log('Invalid gender');
			return;
		}

		let style: string = this.getQueryString('style');
		let styleConfig: StyleConfig = this.getStyleConfig(style);
		if (styleConfig === null) {
			console.log('Invalid style');
			return;
		}
		
		let calculator = new Calculator({
			month: month,
			day: day,
			year: year,
			data: genderData
		});

		calculator.calculate();
		calculator.toLog();

		// build canvas 
		let canvasHelper = new CanvasHelper({
			canvasId: 'lifemeter-canvas',
			width: styleConfig.width,
			height: styleConfig.height
		});

		// get current style
		this.loadScript(`styles/${style}/script.js`, () => {
			let styleObj: Style = this.getStyleObj(styleConfig, calculator.results);
			styleObj.renderTo(canvasHelper);
		});
	}

	getQueryString(field: string, url?: string): string {
		let href: string = url ? url : window.location.href;
		let reg: RegExp = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		let string: RegExpExecArray = reg.exec(href);

		return string ? string[1] : null;
	}

	loadScript(url, callback) {

		let script: any = document.createElement('script');
		script.type = 'text/javascript';

		if (script.readyState) {  //IE
			script.onreadystatechange = () => {
				if (script.readyState === 'loaded' ||
					script.readyState === 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = () => {
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	getStyleObj(style: StyleConfig, results: CalculatorResults): Style {
		let styleObj: Style = eval(`new ${style.className}({calculatorResults: results, styleShortname: style.shortName});`);

		return styleObj;
	}

	getStyleConfig(style: string): StyleConfig {
		let configs = new StyleConfigs().styles;

		for (let i: number = 0; i < configs.length; i++) {
			if (configs[i].shortName === style) {
				return configs[i];
			}
		}

		return null;
	}

	getData(): LifeExpectancyData {
		// https://www.ssa.gov/oact/STATS/table4c6.html
		let data: LifeExpectancyData = {
			male:[],
			female: []
		};

		data.male[0] = 76.18;
		data.male[1] = 75.69;
		data.male[2] = 74.72;
		data.male[3] = 73.74;
		data.male[4] = 72.76;
		data.male[5] = 71.77;
		data.male[6] = 70.78;
		data.male[7] = 69.79;
		data.male[8] = 68.8;
		data.male[9] = 67.81;
		data.male[10] = 66.82;
		data.male[11] = 65.82;
		data.male[12] = 64.83;
		data.male[13] = 63.84;
		data.male[14] = 62.85;
		data.male[15] = 61.87;
		data.male[16] = 60.9;
		data.male[17] = 59.93;
		data.male[18] = 58.97;
		data.male[19] = 58.02;
		data.male[20] = 57.07;
		data.male[21] = 56.13;
		data.male[22] = 55.2;
		data.male[23] = 54.27;
		data.male[24] = 53.35;
		data.male[25] = 52.42;
		data.male[26] = 51.49;
		data.male[27] = 50.56;
		data.male[28] = 49.63;
		data.male[29] = 48.69;
		data.male[30] = 47.76;
		data.male[31] = 46.83;
		data.male[32] = 45.9;
		data.male[33] = 44.96;
		data.male[34] = 44.03;
		data.male[35] = 43.1;
		data.male[36] = 42.17;
		data.male[37] = 41.24;
		data.male[38] = 40.31;
		data.male[39] = 39.39;
		data.male[40] = 38.46;
		data.male[41] = 37.54;
		data.male[42] = 36.62;
		data.male[43] = 35.71;
		data.male[44] = 34.81;
		data.male[45] = 33.91;
		data.male[46] = 33.02;
		data.male[47] = 32.13;
		data.male[48] = 31.26;
		data.male[49] = 30.39;
		data.male[50] = 29.53;
		data.male[51] = 28.68;
		data.male[52] = 27.84;
		data.male[53] = 27.01;
		data.male[54] = 26.19;
		data.male[55] = 25.38;
		data.male[56] = 24.57;
		data.male[57] = 23.78;
		data.male[58] = 22.99;
		data.male[59] = 22.21;
		data.male[60] = 21.44;
		data.male[61] = 20.67;
		data.male[62] = 19.9;
		data.male[63] = 19.15;
		data.male[64] = 18.4;
		data.male[65] = 17.66;
		data.male[66] = 16.93;
		data.male[67] = 16.21;
		data.male[68] = 15.51;
		data.male[69] = 14.81;
		data.male[70] = 14.13;
		data.male[71] = 13.47;
		data.male[72] = 12.81;
		data.male[73] = 12.18;
		data.male[74] = 11.55;
		data.male[75] = 10.94;
		data.male[76] = 10.34;
		data.male[77] = 9.76;
		data.male[78] = 9.2;
		data.male[79] = 8.66;
		data.male[80] = 8.13;
		data.male[81] = 7.62;
		data.male[82] = 7.14;
		data.male[83] = 6.68;
		data.male[84] = 6.23;
		data.male[85] = 5.81;
		data.male[86] = 5.4;
		data.male[87] = 5.02;
		data.male[88] = 4.65;
		data.male[89] = 4.31;
		data.male[90] = 4;
		data.male[91] = 3.7;
		data.male[92] = 3.44;
		data.male[93] = 3.19;
		data.male[94] = 2.97;
		data.male[95] = 2.78;
		data.male[96] = 2.61;
		data.male[97] = 2.46;
		data.male[98] = 2.33;
		data.male[99] = 2.21;
		data.male[100] = 2.09;
		data.male[101] = 1.98;
		data.male[102] = 1.88;
		data.male[103] = 1.77;
		data.male[104] = 1.68;
		data.male[105] = 1.58;
		data.male[106] = 1.49;
		data.male[107] = 1.4;
		data.male[108] = 1.32;
		data.male[109] = 1.24;
		data.male[110] = 1.16;
		data.male[111] = 1.09;
		data.male[112] = 1.02;
		data.male[113] = 0.95;
		data.male[114] = 0.89;
		data.male[115] = 0.82;
		data.male[116] = 0.76;
		data.male[117] = 0.71;
		data.male[118] = 0.65;
		data.male[119] = 0.6;

		data.female[0] = 80.95;
		data.female[1] = 80.39;
		data.female[2] = 79.42;
		data.female[3] = 78.44;
		data.female[4] = 77.45;
		data.female[5] = 76.47;
		data.female[6] = 75.48;
		data.female[7] = 74.48;
		data.female[8] = 73.49;
		data.female[9] = 72.5;
		data.female[10] = 71.51;
		data.female[11] = 70.51;
		data.female[12] = 69.52;
		data.female[13] = 68.52;
		data.female[14] = 67.53;
		data.female[15] = 66.54;
		data.female[16] = 65.56;
		data.female[17] = 64.57;
		data.female[18] = 63.59;
		data.female[19] = 62.61;
		data.female[20] = 61.63;
		data.female[21] = 60.66;
		data.female[22] = 59.68;
		data.female[23] = 58.71;
		data.female[24] = 57.74;
		data.female[25] = 56.76;
		data.female[26] = 55.79;
		data.female[27] = 54.82;
		data.female[28] = 53.85;
		data.female[29] = 52.88;
		data.female[30] = 51.92;
		data.female[31] = 50.95;
		data.female[32] = 49.99;
		data.female[33] = 49.02;
		data.female[34] = 48.06;
		data.female[35] = 47.1;
		data.female[36] = 46.15;
		data.female[37] = 45.19;
		data.female[38] = 44.23;
		data.female[39] = 43.28;
		data.female[40] = 42.33;
		data.female[41] = 41.39;
		data.female[42] = 40.45;
		data.female[43] = 39.51;
		data.female[44] = 38.57;
		data.female[45] = 37.65;
		data.female[46] = 36.72;
		data.female[47] = 35.81;
		data.female[48] = 34.89;
		data.female[49] = 33.99;
		data.female[50] = 33.09;
		data.female[51] = 32.19;
		data.female[52] = 31.3;
		data.female[53] = 30.42;
		data.female[54] = 29.54;
		data.female[55] = 28.67;
		data.female[56] = 27.8;
		data.female[57] = 26.93;
		data.female[58] = 26.07;
		data.female[59] = 25.22;
		data.female[60] = 24.37;
		data.female[61] = 23.52;
		data.female[62] = 22.68;
		data.female[63] = 21.85;
		data.female[64] = 21.03;
		data.female[65] = 20.22;
		data.female[66] = 19.42;
		data.female[67] = 18.63;
		data.female[68] = 17.85;
		data.female[69] = 17.09;
		data.female[70] = 16.33;
		data.female[71] = 15.59;
		data.female[72] = 14.86;
		data.female[73] = 14.14;
		data.female[74] = 13.44;
		data.female[75] = 12.76;
		data.female[76] = 12.09;
		data.female[77] = 11.44;
		data.female[78] = 10.8;
		data.female[79] = 10.18;
		data.female[80] = 9.58;
		data.female[81] = 9;
		data.female[82] = 8.43;
		data.female[83] = 7.89;
		data.female[84] = 7.37;
		data.female[85] = 6.87;
		data.female[86] = 6.4;
		data.female[87] = 5.94;
		data.female[88] = 5.52;
		data.female[89] = 5.12;
		data.female[90] = 4.75;
		data.female[91] = 4.4;
		data.female[92] = 4.08;
		data.female[93] = 3.79;
		data.female[94] = 3.53;
		data.female[95] = 3.29;
		data.female[96] = 3.08;
		data.female[97] = 2.89;
		data.female[98] = 2.72;
		data.female[99] = 2.56;
		data.female[100] = 2.41;
		data.female[101] = 2.27;
		data.female[102] = 2.13;
		data.female[103] = 2;
		data.female[104] = 1.87;
		data.female[105] = 1.75;
		data.female[106] = 1.64;
		data.female[107] = 1.53;
		data.female[108] = 1.43;
		data.female[109] = 1.33;
		data.female[110] = 1.23;
		data.female[111] = 1.14;
		data.female[112] = 1.06;
		data.female[113] = 0.98;
		data.female[114] = 0.9;
		data.female[115] = 0.83;
		data.female[116] = 0.76;
		data.female[117] = 0.71;
		data.female[118] = 0.65;
		data.female[119] = 0.6;

		return data;
	}

}

interface LifeExpectancyData {
	male: number[];
	female: number[];
}