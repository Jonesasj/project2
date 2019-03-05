'use strict';

module.exports = function(req, res, next) {

    //if it hasn't been read mark them read
    if(!req.body.read) {
        req.body.method = 'MarkMessageSeen';
    } else {
        req.body.method = 'MarkMessageUnseen';
    }
    next();
}