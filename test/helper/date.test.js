var assert = require('chai').assert;
var date = require('../../helper/date');

describe('Date Test', function() {
    describe('#numberOfLeapDays()', function() {
        it('should return 0 if the year is 0', function() {
            assert.equal(date.numberOfLeapDays(0), 0);
        });

        it('Should return 488 for 1970', function() {
            assert.equal(date.numberOfLeapDays(1970), 488);
        }); //492 - 4 = 488

        it('should return return 495 for the year 2000', function() {
            assert.equal(date.numberOfLeapDays(2000), 495);
        }) //500 - 5
    });

    describe('#yearToDays()', function() {
        it('should return 0 if the year is 1970', function() {
            assert.equal(date.yearToDays(1970), 0);
        });

        it('should return 10957 if the year is 2000', function() {
            assert.equal(date.yearToDays(2000), 10957);
        });
    });

    describe('#monthToDays()', function() {
        it('should return 0 if it is january', function() {
            assert.equal(date.monthToDays(1), 0);
        });
        it('should retun 334 if the month is december', function() {
            assert.equal(date.monthToDays(12), 334);
        });
    });

    describe('#toSeconds()', function() {
        it('should return 0 if the date is "1970-01-01 00:00:00"', function() {
            assert.equal(date.toSeconds('1970-01-01 00:00:00'), 0);
        });
        it('should return 946,684,800 for the year 2000', function() {
            assert.equal(date.toSeconds('2000-01-01 00:00:00'), 946684800);
        });
    });
})