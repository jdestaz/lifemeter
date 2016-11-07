var Calculator = (function() {

    function Calculator(args) {
        this.birthMonth = args.birthMonth || 0;
        this.birthDay = args.birthDay || 0;
        this.birthYear = args.birthYear || 0;
        this.expectancyData = args.expectancyData || [];

        if (this.birthMonth === 0 ||
			this.birthDay === 0 ||
			this.birthYear === 0 ||
			this.expectancyData.length === 0) {

			console.log('Invalid args');
			return;
		}

        this.currentDate = this._getCurrentDateWithoutTime();
        this.birthDate = this._getBirthDateObject();
        this.results = {};
    }

    Calculator.prototype.calculate = function() {
        this.results.currentAgeInYears = this._getAgeInYears(this.birthDate);
		this.results.currentAgeRemainderInDays = this._getAgeRemainderInDays(this.birthDate);
		this.results.currentAgeRemainderInDecimal = this._getAgeRemainderInDecimal(this.results.currentAgeRemainderInDays);
		this.results.currentAge = this.results.currentAgeInYears + this.results.currentAgeRemainderInDecimal;

		this.results.estimatedYearsRemaining = this._getEstimatedYearsRemaining(this.results.currentAgeInYears);
		this.results.estimatedYearsRemainingIfOneYearOlder = this._getEstimatedYearsRemaining(this.results.currentAgeInYears + 1);
		this.results.estimatedYearsRemainingProrated = this._getEstimatedYearsRemainingProrated(this.results.currentAgeRemainderInDecimal, this.results.estimatedYearsRemaining, this.results.estimatedYearsRemainingIfOneYearOlder);

		this.results.estimatedDeathAge = this._getEstimatedDeathAge(this.results.currentAge, this.results.estimatedYearsRemainingProrated);
		this.results.estimatedDeathDate = this._getEstimatedDeathDate(this.birthDate, this.results.estimatedDeathAge);
		this.results.meterValue = this._getMeterValue(this.results.currentAge, this.results.estimatedDeathAge);

        return this.results;
    }

    Calculator.prototype._getCurrentDateWithoutTime = function() {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    }

    Calculator.prototype._getBirthDateObject = function() {
        return new Date(this.birthYear, this.birthMonth - 1, this.birthDay, 0, 0, 0, 0);
    }

    Calculator.prototype._getAgeInYears = function(birthDate) {
        var age = this.currentDate.getFullYear() - birthDate.getFullYear();
        var m = this.currentDate.getMonth() - birthDate.getMonth();

        if(m < 0 || (m === 0 && this.currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    Calculator.prototype._getAgeRemainderInDays = function(birthDate) {
        var thisYearBirthday = new Date(this.currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0, 0);
        var days = (this.currentDate.valueOf() - thisYearBirthday.valueOf()) / 1000 / 60 / 60 / 24;

        return Math.round(days);
    }

    Calculator.prototype._getAgeRemainderInDecimal = function(ageRemainderInDays) {
        return Number((ageRemainderInDays / 365).toFixed(2));
    }

    Calculator.prototype._getEstimatedYearsRemaining = function(age) {
		return this.expectancyData[age];
	}

    Calculator.prototype._getEstimatedYearsRemainingProrated = function(currentAgeRemainderInDecimal, estimatedYearsRemaining, estimatedYearsRemainingIfOneYearOlder) {
		var partialYear = (estimatedYearsRemaining - estimatedYearsRemainingIfOneYearOlder) * currentAgeRemainderInDecimal;

		return Number((estimatedYearsRemaining - partialYear).toFixed(2)); // not sure if this is right
	}
	
	Calculator.prototype._getEstimatedDeathAge = function(currentAge, estimatedYearsRemaining) {
		return Number((currentAge + estimatedYearsRemaining).toFixed(2));
	}
	
	Calculator.prototype._getEstimatedDeathDate = function(birthDate, estimateDeathAge) {
		var deathDate = new Date(birthDate.toJSON());
		deathDate.setDate(deathDate.getDate() + (estimateDeathAge * 365.25));

		return deathDate;
	}
	
	Calculator.prototype._getMeterValue = function(currentAge, estimatedDeathAge) {
		var lifeUsed = currentAge / estimatedDeathAge;
		var lifeRemaining = 1 - lifeUsed;

		return Number(lifeRemaining.toFixed(2));
	}

    Calculator.prototype.toLog = function() {
        console.log(JSON.stringify(this));
    }

    return Calculator;
})();