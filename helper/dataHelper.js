'use strict';

var date = require('./date');


module.exports = {

    //takes an array of messages and returns the first n
    getMessages : function(messages, n) {
        
    },

    //takes an array of messages and sorts them according to their date
    sortMessages: function(messages) {
            messages.sort(function(message1, message2) {
            var date1Seconds = date.toSeconds(message1.date);
            var date2Seconds = date.toSeconds(message2.date);
            return date2Seconds - date1Seconds;
        });
    }
}


