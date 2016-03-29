var lifemeter = {
	
	birthMonth: 0,
	birthDay: 0,
	birthYear: 0,
	birthDate: new Date(),
	currentDate: new Date(),
	expectancyData: [],
	results: {},
	
	init: function(args) {
		this.birthMonth = args.month || 0;
		this.birthDay = args.day || 0;
		this.birthYear = args.year || 0;
		this.expectancyData = args.data || [];

		if(this.birthMondy === 0 ||
		   this.birthDay === 0 ||
		   this.birthYear === 0 ||
		   this.expectancyData.length === 0) {
				
			alert('Invalid args');
			return;
		}

		this.currentDate = this.getCurrentDateWithoutTime();
		this.birthDate = this.getBirthDateObject(this.birthYear, this.birthMonth, this.birthDay)
	},
	
	getCurrentDateWithoutTime: function() {
		var today = new Date();
		return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
	},
	
	getBirthDateObject: function(year, month, day) {
		return new Date(this.birthYear, this.birthMonth - 1, this.birthDay, 0, 0, 0, 0);
	},
	
	calculate: function() {
		
		this.results.currentAgeInYears = this.getAgeInYears(this.birthDate);
		this.results.currentAgeRemainderInDays = this.getAgeRemainderInDays(this.birthDate);
		this.results.currentAgeRemainderInDecimal = this.getAgeRemainderInDecimal(this.results.currentAgeRemainderInDays);
		this.results.currentAge = this.results.currentAgeInYears + this.results.currentAgeRemainderInDecimal;
		
		this.results.estimatedYearsRemaining = this.getEstimatedYearsRemaining(this.results.currentAgeInYears);
		this.results.estimatedYearsRemainingIfOneYearOlder = this.getEstimatedYearsRemaining(this.results.currentAgeInYears + 1);
		this.results.estimatedYearsRemainingProrated = this.getEstimatedYearsRemainingProrated(this.results.currentAgeRemainderInDecimal, this.results.estimatedYearsRemaining, this.results.estimatedYearsRemainingIfOneYearOlder);
		
		this.results.estimatedDeathAge = this.getEstimatedDeathAge(this.results.currentAge, this.results.estimatedYearsRemainingProrated);
		this.results.estimatedDeathDate = this.getEstimatedDeathDate(this.birthDate, this.results.estimatedDeathAge);
		this.results.meterValue = this.getMeterValue(this.results.currentAge, this.results.estimatedDeathAge);
	},
	
	getAgeInYears: function(birthDate) {
		var age = this.currentDate.getFullYear() - birthDate.getFullYear();
		var m = this.currentDate.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && this.currentDate.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	},
	
	getAgeRemainderInDays: function(birthDate) {
		var thisYearBirthday = new Date(this.currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0, 0);
		var days = (this.currentDate - thisYearBirthday) / 1000 / 60 / 60 / 24;
		
		return Math.round(days);
	},
	
	getAgeRemainderInDecimal: function(ageRemainderInDays) {		
		return Number((ageRemainderInDays / 365).toFixed(2));
	},
	
	getEstimatedYearsRemaining: function(age) {
		return this.expectancyData[age];
	},
	
	getEstimatedYearsRemainingProrated: function(currentAgeRemainderInDecimal, estimatedYearsRemaining, estimatedYearsRemainingIfOneYearOlder) {
		var partialYear = (estimatedYearsRemaining - estimatedYearsRemainingIfOneYearOlder) * currentAgeRemainderInDecimal;
		
		return Number((estimatedYearsRemaining + partialYear).toFixed(2)); // not sure if this is right
	},
	
	getEstimatedDeathAge: function(currentAge, estimatedYearsRemaining) {
		
		return Number((currentAge + estimatedYearsRemaining).toFixed(2));
	},
	
	getEstimatedDeathDate: function(birthDate, estimateDeathAge) {
		var deathDate = new Date(birthDate);
		deathDate.setDate(deathDate.getDate() + (estimateDeathAge * 365.25));
		
		return deathDate;
	},
	
	getMeterValue: function(currentAge, estimatedDeathAge) {
		var lifeUsed = currentAge / estimatedDeathAge;
		var lifeRemaining = 1 - lifeUsed;
		
		return Number(lifeRemaining.toFixed(2));
	},
	
	toLog: function() {
		console.log(JSON.stringify(this));
	}
	
};