

/*
    @author kisookang
    @date 2020-09-08
    @email verynicesoo78@gmail.com
    @note get cve db between start date and end date and then response the data 

*/

var express = require('express');
var router = express.Router();
const assert = require('assert');
const db = require("../db/db");
const apiResponse = require("../helper/apiResponse");
const datacheck = require("../helper/datacheck");
const winston = require('../helper/logger');

function cvedb_update(req, res, next)
{
    const updateinfo = req.body.updateinfo;

    if(updateinfo){
        const contentsName = updateinfo.contentsName;
        const startDate = updateinfo.startDate;
        const endDate = updateinfo.endDate;
        const contentsType = updateinfo.contentsType;

        if(datacheck.isEmpty(contentsName)){
            console.log("contentsName empty")
            winston.info('contents empty')
            return apiResponse.validationErrorWithData(res, "invalid data", {"contentsName":"empty"});
        }
        else if(datacheck.isEmpty(startDate)) {
            console.log("startDate empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"startDate":"empty"});
        }
        else if(datacheck.isEmpty(endDate)){
            console.log("endDate empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"endDate":"empty"});
        }
        else if(datacheck.isEmpty(contentsType)){
            console.log("contentsType empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"contentsType":"empty"});
        }
        else{
            //get cve db between startt and end date
            result = db.getCveDBbetweenTwoDate(startDate, endDate, res);

        }

    }
    else{
        return apiResponse.validationErrorWithData(res, "object is null", {"updateinfo":"empty"});
    }
}


module.exports = {
    cvedb_update,
}
