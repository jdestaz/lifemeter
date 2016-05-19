///<reference path="style-config.d.ts"/>

class StyleConfigs {
	styles: StyleConfig[] = [];

	constructor() {
		this.styles.push({
			name: "Mega Man (8-bit)",
			shortName: "megaman",
			className: "MegaManStyle",
			width: 300,
			height: 300
		});

		this.styles.push({
			name: "Shovel Knight",
			shortName: "shovelknight",
			className: "ShovelKnightStyle",
			width: 450,
			height: 450
		});
	}
}


