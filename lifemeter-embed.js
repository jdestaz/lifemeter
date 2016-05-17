function LifeMeter(args) {

	var month = args.month || 0;
	var day = args.day || 0;
	var year = args.year || 0;
	var gender = args.gender || '';
	var style = args.style || '';

	function validateArgs() {
		return (
			month > 0 && day > 0 && year > 0 && (gender === 'male' || gender === 'female') && style !== ''
		);
	}

	if (validateArgs()) {

		document.write('<iframe src="lifemeter.html?month=' + month + '&day=' + day + '&year=' + year + '&gender=' + gender + '&style=' + style + '" class="lifemeter style-' + style + '" height="300" width="300" style="border: 0; overflow: hidden; margin: 0; padding: 0" scrolling="no"></iframe>');

	} else {
		document.write('<div>Invalid LifeMeter parameters</div>');
	}

}