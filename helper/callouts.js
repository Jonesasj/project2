'use strict';

const fs = require('fs').promises;
const https = require('https');
require('dotenv').config();

//https://msp-15963.eu-west-2.aws.dev.gradwell.net:8080/voicemail/GetMessages/2046415/INBOX

module.exports = function (req, res, path, method, success) {

    var options = {
        encoding: 'utf8'
    }

    fs.readFile(path).then((result) => {
        var fileData = JSON.parse(result);
        success(req, res, fileData);
    });
}

function callouts(req, res, path, method, success) {

    let reqData = JSON.stringify(req.body);

    var options = {
        encoding : 'utf8',
        host : //use dotenv,
        port : '8080',
        method : method,
        auth : //use dotenv,
        path : path
    }

    let request = https.request(options, (response) => {
        var responseData = '';
        var responseObject = {};
        response.setEncoding('utf8');
        response.on('data', (data) => {
            responseData += data;
        });
        response.on('end', () => {

            if(!(responseData === '')) {
                var responseObject = JSON.parse(responseData);
            }
            success(req, res, responseObject, response.statusCode);
        });

    });

}