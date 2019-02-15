'use strict';

var express = require('express');
var router = express.Router();


//gets the list of voicemails in the inbox
router.get('/', (req, res) => {
    res.send('get');
});

router.post('/', (req, res) => {
    res.send('post');
});

module.exports = router;