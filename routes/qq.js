var express = require('express');
var router = express.Router();
var request = require('request')

var qqApi = require('../config/qq')

/* 根据IP获取经纬度 */
router.get('/latLngByIp', function (req, res, next) {
    var options = {
        headers: {
            "Connection": "close"
        },
        url:req.query.ip?(qqApi.latLngByIp+'&ip='+req.query.ip):(req.ip=='::ffff:127.0.0.1'?qqApi.latLngByIp:qqApi.latLngByIp+'&ip='+req.ip),
        method: req.method.toUpperCase(),
        json: true,
        body: req.body
    };

    
    console.log(req.get("X-Forwarded-For"),'获取X-Forwarded-For');
    console.log(req.ip,'获取IP')
    console.log(options,'获取IP')
    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------', data);
            res.json(data)
        }else{
            // console.log(error);
            // console.log(response);
            // console.log(data);
            res.end('api error')
        }
    }
    
    request(options, callback);
});

/* 根据地址获取经纬度 */
router.get('/latLngByAddr/:addr', function (req, res, next) {
    var options = {
        headers: {
            "Connection": "close"
        },
        url: qqApi.latLngByAddr.replace('@addr',encodeURIComponent(req.params.addr)),
        method: req.method.toUpperCase(),
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------', data);
            res.json(data)
        }else{
            // console.log(error);
            // console.log(response);
            // console.log(data);
            res.end('api error')
        }
    }

    request(options, callback);
});

/* 获取距离 */
router.get('/distance/:from/:to', function (req, res, next) {
    var options = {
        headers: {
            "Connection": "close"
        },
        url: qqApi.distance.replace('@from',req.params.from).replace('@to',req.params.to),
        method: req.method.toUpperCase(),
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------', data);
            res.json(data)
        }else{
            // console.log(error);
            // console.log(response);
            // console.log(data);
            res.end('api error')
        }
    }

    request(options, callback);
});

module.exports = router;