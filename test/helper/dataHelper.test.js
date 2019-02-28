'use strict';
var assert = require('chai').assert;
var dataHelper = require('../../helper/dataHelper');

var messages = [];

describe('dataHelper Tests', function() {
    describe('sortMessages', function() {
        beforeEach(function() {
            messages = [
                {date : "2017-01-01 00:00:00"},
                {date : "2018-01-01 00:00:00"},
                {date : "2019-01-01 00:00:00"}
            ];

        });
        it('Should return an empty array if given an empty array', function() {
            assert.deepEqual(dataHelper.sortMessages([]), []);
        });

        it('Should reverse the array', function() {
            var expectedArray = [
                {date : "2019-01-01 00:00:00"},
                {date : "2018-01-01 00:00:00"},
                {date : "2017-01-01 00:00:00"}
            ];
            assert.deepEqual(dataHelper.sortMessages(messages), expectedArray);
        });

        it('Should do nothing if the array is already sorted', function() {
            var messages = [
                {date : "2019-01-01 00:00:00"},
                {date : "2018-01-01 00:00:00"},
                {date : "2017-01-01 00:00:00"}
            ];
            var expectedArray = [
                {date : "2019-01-01 00:00:00"},
                {date : "2018-01-01 00:00:00"},
                {date : "2017-01-01 00:00:00"}
            ];

            assert.deepEqual(dataHelper.sortMessages(messages), expectedArray);
        });

        it('should sort a random array', function() {
            var messages = [{date : "2001-02-01 11:00:00"}, {date : "2001-02-01 11:00:01"}, {date : "2013-05-01 00:15:00"}, {date : "1980-01-01 00:00:00"}, {date : "2019-01-01 00:00:00"}, {date : "2016-01-01 12:00:00"}, {date : "2018-12-12 11:11:11"}, {date : "1993-11-25 00:00:00"}, {date : "1992-01-26 00:00:00"}, {date : "2000-01-01 00:00:00"}];
            var expectedArray = [{date : "2019-01-01 00:00:00"}, {date : "2018-12-12 11:11:11"}, {date : "2016-01-01 12:00:00"}, {date : "2013-05-01 00:15:00"}, {date : "2001-02-01 11:00:01"}, {date : "2001-02-01 11:00:00"}, {date : "2000-01-01 00:00:00"}, {date : "1993-11-25 00:00:00"}, {date : "1992-01-26 00:00:00"}, {date : "1980-01-01 00:00:00"}];

            assert.deepEqual(dataHelper.sortMessages(messages), expectedArray);
        });
    });
});