'use strict';

var express = require('express');
var router = express.Router();
var callout = require('../helper/callouts');
var dataHelper = require('../helper/dataHelper');


//gets the list of voicemails in the inbox
////calls https://msp-15963.eu-west-2.aws.dev.gradwell.net:8080/voicemail/GetMessages/2046415/INBOX
//GetMessages/mailbox/folder[?start-date=yyyy-mm-dd hh:mm:ss[&end-date=yyyy-mm-dd hh:mm:ss]]
router.get('/', (req, res) => {
    callout(req, res, './data.json', 'GET', (req, res, fileData) => {
        //sort the messages
        //return the first 3 objects 
        //var messages = dataHelper.sortMessages(fileData.messages);
        dataHelper.sortMessages(fileData.messages);
        var topMessages = fileData.messages.slice(0, 2); //req.body.numMessages
        res.json(JSON.stringify(topMessages));
    });
});


//DeleteMessage/mailbox/uuid DeleteMessage/uuid
router.post('/', (req, res) => {
    res.send('post');
});

module.exports = router;