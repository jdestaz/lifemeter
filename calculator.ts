class CalculatorResults {
	currentAgeInYears: number;
	currentAgeRemainderInDays: number;
	currentAgeRemainderInDecimal: number;
	currentAge: number;

	estimatedYearsRemaining: number;
	estimatedYearsRemainingIfOneYearOlder: number;
	estimatedYearsRemainingProrated: number;

	estimatedDeathAge: number;
	estimatedDeathDate: Date;
	meterValue: number;
}

class Calculator {
	birthMonth: number;
	birthDay: number;
	birthYear: number;
	birthDate: Date;
	currentDate: Date;
	expectancyData: number[];
	results: CalculatorResults;

	constructor(args: CalculatorArguments) {
		this.birthMonth = args.month || 0;
		this.birthDay = args.day || 0;
		this.birthYear = args.year || 0;
		this.expectancyData = args.data || [];

		if (this.birthMonth === 0 ||
			this.birthDay === 0 ||
			this.birthYear === 0 ||
			this.expectancyData.length === 0) {

			console.log('Invalid args');
			return;
		}

		this.currentDate = this.getCurrentDateWithoutTime();
		this.birthDate = this.getBirthDateObject(this.birthYear, this.birthMonth, this.birthDay);
		this.results = new CalculatorResults();
	}

	getCurrentDateWithoutTime(): Date {
		let today = new Date();
		return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
	}

	getBirthDateObject(year: number, month: number, day: number): Date {
		return new Date(this.birthYear, this.birthMonth - 1, this.birthDay, 0, 0, 0, 0);
	}

	calculate() {
		

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

	}

	getAgeInYears(birthDate: Date): number {
		let age: number = this.currentDate.getFullYear() - birthDate.getFullYear();
		let m: number = this.currentDate.getMonth() - birthDate.getMonth();

		if (m < 0 || (m === 0 && this.currentDate.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	}

	getAgeRemainderInDays(birthDate: Date): number {
		let thisYearBirthday: Date = new Date(this.currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0, 0);
		let days: number = (this.currentDate.valueOf() - thisYearBirthday.valueOf()) / 1000 / 60 / 60 / 24;

		return Math.round(days);
	}

	getAgeRemainderInDecimal(ageRemainderInDays: number): number {
		return Number((ageRemainderInDays / 365).toFixed(2));
	}
	
	getEstimatedYearsRemaining(age: number): number {
		return this.expectancyData[age];
	}
	
	getEstimatedYearsRemainingProrated(currentAgeRemainderInDecimal: number, estimatedYearsRemaining: number, estimatedYearsRemainingIfOneYearOlder: number): number {
		let partialYear: number = (estimatedYearsRemaining - estimatedYearsRemainingIfOneYearOlder) * currentAgeRemainderInDecimal;

		return Number((estimatedYearsRemaining + partialYear).toFixed(2)); // not sure if this is right
	}
	
	getEstimatedDeathAge(currentAge: number, estimatedYearsRemaining: number): number {

		return Number((currentAge + estimatedYearsRemaining).toFixed(2));
	}
	
	getEstimatedDeathDate(birthDate: Date, estimateDeathAge: number): Date {
		let deathDate: Date = new Date(birthDate.toJSON());
		deathDate.setDate(deathDate.getDate() + (estimateDeathAge * 365.25));

		return deathDate;
	}
	
	getMeterValue(currentAge: number, estimatedDeathAge: number): number {
		let lifeUsed: number = currentAge / estimatedDeathAge;
		let lifeRemaining: number = 1 - lifeUsed;

		return Number(lifeRemaining.toFixed(2));
	}
	
	toLog() {
		console.log(JSON.stringify(this));
	}
}

interface CalculatorArguments {
	month: number;
	day: number;
	year: number;
	data: number[];
}