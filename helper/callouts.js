'use strict';

const fs = require('fs').promises;

module.exports = function (req, res, path, method, success) {

    var options = {
        encoding: 'utf8'
    }

    fs.readFile(path).then((result) => {
        var fileData = JSON.parse(result);
        success(req, res, fileData);
    });
}