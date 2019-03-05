'use strict';

const fs = require('fs').promises;
const https = require('https');
require('dotenv').config();

//https://msp-15963.eu-west-2.aws.dev.gradwell.net:8080/voicemail/GetMessages/2046415/INBOX

/*module.exports = function (req, res, path, method, success) {

    var options = {
        encoding: 'utf8'
    }

    fs.readFile(path).then((result) => {
        var fileData = JSON.parse(result);
        success(req, res, fileData);
    });
}*/

module.exports = function callouts(req, res, path, method, success) {

    let reqData = JSON.stringify(req.body);

    var options = {
        encoding : 'utf8',
        host : process.env.API_HOST,
        port : '8080',
        method : method,
        headers : {
            Authorization : 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.API_SECRET_KEY).toString('base64')
        },
        path : path
    }

    let request = https.request(options, (response) => {
        var responseData = '';
        var responseObject = {};
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
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
    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    request.write(reqData);
    request.end();

}