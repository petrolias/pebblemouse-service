var moment = require('moment');
var stackTrace = require('stack-trace');

//// ▶▶ Error Login Functions ◀◀ ////
var LogError = function (_res, _err, _status, _arguments, _req) {
    console.error('[================]');
    console.error('[ERROR] ' + _err);
    console.error('[Time : ' + moment().format() + ']');
    
    var length = stackTrace.get().length
    if (length> 0) {
        for (i = 0; i < length; i++) { 
            if (i == 5 ) {break; }                        
            console.error('['+ i +'] [Line : ' + stackTrace.get()[i].getLineNumber() + '] - [Method : ' + stackTrace.get()[i].getMethodName() + '] - [FileName : ' + stackTrace.get()[i].getFileName() + ']');                        
        }            
    }    
        
    if (_arguments !== undefined) { console.error('[Method : ' + _arguments.callee.name + ']'); }
    if (_req !== undefined) { console.error('[Params : ' + JSON.stringify(_req.params) + ']'); }
    console.error('[================]');
    var r = {
        success: false,
        error: {}
    };
    r.error = _err;
    if (r.error.message) { r.error = _err.message; }
    return _res.status(_status).json(r);
}
module.exports.LogError = LogError;

//// ▶▶ Error Info Functions ◀◀ ////
var LogInfo = function (_res, _err, _status, _arguments, _req) {
    console.info('[================]');
    console.info('[INFO] ' + _err);
    console.info('[Time : ' + moment().format() + ']');
    console.info('[FileName : ' + stackTrace.get()[2].getFileName() + ']');
    console.info('[Line : ' + stackTrace.get()[2].getLineNumber() + ']');
    console.info('[Method : ' + stackTrace.get()[2].getMethodName() + ']');
    if (_arguments !== undefined) { console.info('[Method : ' + _arguments.callee.name + ']'); }
    if (_req !== undefined) { console.info('[Params : ' + JSON.stringify(_req.params) + ']'); }
    console.info('[================]');
    var r = {
        success: false,
        error: {}
    };
    r.error = _err;
    if (r.error.message) { r.error = _err.message; }
    return _res.status(_status).json(r);
}
module.exports.LogInfo = LogInfo;

//// ▶▶ Succefull return messages ◀◀ ////
var ReturnSuccess = function (_res, _result, _item) {
    if (_result === undefined) _result = "";
    if (_item === undefined) _item = "";
    var r = {};  //return object
    r.success = true;
    r.result = _result;
    r.item = _item;
    //console.log(JSON.stringify(r));
    return _res.status(200).json(r);
}
module.exports.ReturnSuccess = ReturnSuccess;

//// ▶▶ Replaces SQL invalid symbols to prevent SQL Injection ◀◀ ////
var SQLParam = function (_val) {
    if (!(typeof _val === 'string' || _val instanceof String)) return _val;
    _val = _val.replace("'", "''");
    _val = _val.replace("`", "``");
    return _val;
}
module.exports.SQLParam = SQLParam;

var getDistinct = function getDistinct(_arr, _field, _ignoreNulls) {
    var unique = {};
    var d = [];
    _arr.forEach(function (x) {
        if (_ignoreNulls != undefined && _ignoreNulls == true && (x[_field] == null || x[_field] == '')) {
            //ignore
        } else {
            if (!unique[x[_field]]) {
                d.push(x[_field]);
                unique[x[_field]] = true;
            }
        }
    });
    return d;
};

module.exports.getDistinct = getDistinct;

//// ▶▶ logTime ◀◀ ////
var LogTime = function (_start, _function) {
    var end = new Date().getTime();
    var time = end - _start;
    console.info(_function + ' : duration time ms :' + time);
}
module.exports.LogTime = LogTime;