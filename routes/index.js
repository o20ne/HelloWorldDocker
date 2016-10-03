var express = require('express');
var router = express.Router();

const util = require('util');
const pangrams = require('pangrams');
const _ = require('lodash');

const payload = require('../public/javascript/payload');
const repeatCount = 25;

var envHostname = process.env.HOSTNAME;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hello World 2' });
});

router.get('/constant', function(req,res, next) {
    var responseData = {containerId: envHostname, operation: 'GET', data: []};
    var scale = repeatCount * _.get(req.query, 'scale', 1);

    for(var count=0; count<scale; count++) {
        responseData.data.push(payload);
    }

    res.jsonp(responseData);
});

router.get('/api', function(req, res, next) {
    var recordsCount = _.get(req.query, 'count', _.random(1, 100));
    var visitCount = req.session.visitCount || 0;
    visitCount++;
    req.session.visitCount = visitCount;

    var validLanguages = ['english', 'german', 'japaneseHiragana'];
    var responseData = {containerId: envHostname, visitCount: visitCount, count: recordsCount, operation: 'GET', data: []};

    for(var count = 0; count<recordsCount; count++) {
        responseData.data.push(pangrams.pangrams[validLanguages[_.random(0, 2)]]);
    }

    res.jsonp(responseData);
});

router.post('/api', function(req, res, next) {
    var data = req.body;
    var resp = {containerId: envHostname, operation:'POST', data: []};

    for(var count=0; count<repeatCount; count++) {
        resp.data.push(data);
    }

    res.jsonp(resp);
});

router.put('/api', function(req, res, next) {
    var data = req.body;
    var resp = {containerId: envHostname, operation:'PUT', data: []};

    for(var count=0; count<repeatCount; count++) {
        resp.data.push(data);
    }

    res.jsonp(resp);
});

module.exports = router;
