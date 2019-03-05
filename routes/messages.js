'use strict';

var express = require('express');
var router = express.Router();
var callout = require('../helper/callouts');
var dataHelper = require('../helper/dataHelper');


//gets the list of voicemails in the inbox
////calls https://msp-15963.eu-west-2.aws.dev.gradwell.net:8080/voicemail/GetMessages/2046415/INBOX
//GetMessages/mailbox/folder[?start-date=yyyy-mm-dd hh:mm:ss[&end-date=yyyy-mm-dd hh:mm:ss]]
router.get('/', (req, res) => {
    callout(req, res, '/voicemail/GetMessages/2046415/INBOX', 'GET', (req, res, data, code) => {
        //sort the messages
        //return the first 3 objects 
        //var messages = dataHelper.sortMessages(fileData.messages);
        dataHelper.sortMessages(data.messages);
        var topMessages = data.messages.slice(0, 2); //req.body.numMessages
        res.json(JSON.stringify(topMessages));
    });
});


//DeleteMessage/mailbox/uuid DeleteMessage/uuid
router.delete('/', (req, res) => {

    let job = req.body.job;
    let mailIds = req.body.ids;
    callout(req, res, '/voicemail/DeletedMessage/2046415/' + uuid, 'DELETE', (req, res, data, code) => {
        //return success or failure
        if(data.error) {
            res.send('error');
        } else {
            res.send('success');
        }
    }); 
});

router.put('/', (req, res) => {

    let job = req.body.job;
    let mailIds = req.body.ids;
    callout(req, res, '/voicemail/' + job + '/2046415/' + uuid, 'PUT', (req, res, data, code) => {
        if(data.error) {
            res.send('error');
        } else {
            res.send('success');
        }
    });

});

module.exports = router;