'use strict';

var date = require('./date');


module.exports = {

    getMessages : function(messages) {
        result = fileData
    },

    //takes an array of messages and sorts them according to their date
    sortMessages: function(messages) {
        var sortedArray = messages.sort(function(message1, message2) {
            date1Seconds = date.toSeconds(message1.date);
            date2Seconds = date.toSeconds(message2.date);
            return date2Seconds - date1Seconds;
        });
        return sortedArray;
    }
}


