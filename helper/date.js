

module.exports = {
    // < 0 message1 comes first
    // = 0 doesn't matter
    // > 0 message2 comes first
    //
    isMostRecent : function(message1, message2) {
        //convert the two strings into seconds, the greater value is more recent
        date1Seconds = toSeconds(message1.date);
        date2Seconds = toSeconds(message2.date);
        return date2Seconds - date1Seconds;
    },

//Takes a string formatted yyyy-mm-dd hh:mm:ss and returns the number of seconds
//The date is given relative to 1970-01-01 00:00:00
    toSeconds : function(aDate) {
        var base = 10;
        var secondsInDay = 60 * 60 * 24;
        var year = parseInt(aDate.substring(0, 4), base);
        var month = parseInt(aDate.substring(5, 7), base);
        var days = parseInt(aDate.substring(8, 10), base);
        var hours = parseInt(aDate.substring(11, 13), base);
        var minutes = parseInt(aDate.substring(14, 16), base);
        var seconds = parseInt(aDate.substring(17), base);

        dateSeconds = seconds + (60 * minutes) + (60 * 60 * hours) + (secondsInDay * (days - 1)) + (secondsInDay * this.monthToDays(month)) + (secondsInDay * this.yearToDays(year));
        return dateSeconds;
    },

    //takes a month and returns the number of days in the year up until the start of the month
    monthToDays : function (month) {
        var days = 0;
        var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for(i = 0; i < month - 1; i++) {
            days = days + daysInMonths[i];
        }
        return days;
    },

    yearToDays : function(year) {
        var days = 0;
        var years = year - 1970;
        var leapDays = 0;
        leapDays = this.numberOfLeapDays(year) - this.numberOfLeapDays(1970);
        days = (years * 365) + leapDays;
        return days;
    },

    numberOfLeapDays : function(year) {
        var numLeapDays = 0;
        numLeapDays = Math.floor(year / 4) - Math.floor(year / 400);
        return numLeapDays;
    }
}