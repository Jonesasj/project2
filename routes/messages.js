'use strict';

var express = require('express');
var router = express.Router();
var callout = require('../helper/callouts');
var dataHelper = require('../helper/dataHelper');
var endpoint = require('../middleware/endpoint');
require('dotenv').config();


//gets the list of voicemails in the inbox
////calls https://msp-15963.eu-west-2.aws.dev.gradwell.net:8080/voicemail/GetMessages/2046415/INBOX
//GetMessages/mailbox/folder[?start-date=yyyy-mm-dd hh:mm:ss[&end-date=yyyy-mm-dd hh:mm:ss]]

//getting the voicemail list should also return the number of voicemails
/*

    response {
        messages: [{}, {} ...],
        count:
    }
*/

router.get('/', (req, res) => {
    console.log('promise route');

    //callout wraps the request function, it returns a promise therefore is thenable
    callout(req.body, '/voicemail/GetMessages/2046415/INBOX', 'GET').then((responseData) => {
        var data = JSON.parse(responseData);
        let returnData = {};
        var start = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.itemsPerPage);
        var end = start + parseInt(req.query.itemsPerPage);
        console.log('start: ' + start + ', end: ' + end);
        dataHelper.sortMessages(data.messages);
        var returnMessages = data.messages.slice(start, end); //req.body.numMessages
        returnData.messages = returnMessages;
        returnData.count = data.messages.length;
        res.json(JSON.stringify(returnData));
    }).catch((error) => {
        console.log(error);
    });
});

router.put('/', endpoint, (req, res) => {

    let promiseList = [];
    let list = req.body.list;
    console.log(req.body.method);
    console.log(list);

    for(i = 0; i < list.length; i++) {
        promiseList.push(callout(req.body, '/voicemail/' + req.body.method + '/2046415/' + list[i], 'PUT'));
    }

    Promise.all(promiseList).then((values) => {
        console.log(values);
        res.json({success : true});
    }).catch(error => {
        console.log(error);
    });
});


//DeleteMessage/mailbox/uuid DeleteMessage/uuid
router.delete('/', (req, res) => {

    let job = req.body.job;
    let toUpdate = req.body.toUpdate;
    console.log(toUpdate);
    callout(req.body, res, '/voicemail/DeletedMessage/2046415/' + uuid, 'DELETE', (req, res, data, code) => {
        //return success or failure
        if(data.error) {
            res.send('error');
        } else {
            res.send('success');
        }
    });
});

router.get('/:uuid', (req, res) => {

    console.log('recording request recieved');

    callout(req.body, '/voicemail/GetMessageRecording/2046415/' + req.params.uuid, 'GET').then((data) => {
        console.log('promise route');
        res.send(data);
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;