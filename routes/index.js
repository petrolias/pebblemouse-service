var express = require('express');
var router = express.Router();
var async = require("async");
var validator = require('node-validator');
var m_helper = require('../schema/script/m_helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  try {
    var data = { msg: "success!" };
    return m_helper.ReturnSuccess(res, data, ''); //Return Results       
  } catch (err) {
    return m_helper.LogError(res, err, 501, arguments, req);
  };
});

router.get('/robot/:_x/:_y', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    try {
        var _x = req.params._x;
        var _y = req.params._y;

        async.series([
            function(callback) {// ▶ Validations ◀ //    
                 return callback(null);
            },
            function(callback) {
                return callback(null, _x, _y);
            }
            ,
            function(callback, _x, _y) {
                return callback(null, _x, _y);
            }
        ],
        function(err, results) {
            if (err) return m_helper.LogError(res, err, 400, arguments, req);
            var resA = results[1][0];
            var resB = results[1][1];
            return m_helper.ReturnSuccess(res, resA, resB);
        });
    } catch (err) {
        return m_helper.LogError(res, err, 501, arguments, req);
    };

});

module.exports = router;
