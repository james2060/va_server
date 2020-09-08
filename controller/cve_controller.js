
/*
    @author kisookang
    @date 2020-09-08
    @email verynicesoo78@gmail.com
    @note search cve code with cpe and api response 

*/
var express = require('express');
var router = express.Router();

const assert = require('assert');

const db = require("../db/db");
const apiResponse = require("../helper/apiResponse");
const datacheck = require("../helper/datacheck");

function cveSearchAPI(req, res, next){
    console.log("cveSearchAPI Started...")

    const search = req.body.search;
    if(search)
    {
        console.log(search.type);
        console.log(search.keyword);
        console.log(search.beds);

        if(search.keyword == ""){
            console.log("search keyword is empth")
            return apiResponse.validationErrorWithData(res, "keyword is null", {"keyword":"empty"});
        }
        else{
            result = db.findCVECode(search.keyword, res);
            //todo: find 결과를 callback으로 처리
        }
    }
    else{
        console.log("search is null");
        return apiResponse.validationErrorWithData(res, "object is null", {"search":"empty"});
    }

    console.log("cveSearchAPI End...")
}
/*----------------------------------------------------------------------
    @brief venor, product, version 정보 기반으로 취약점 결과를 제공한다.
    @request body data(json):
    
    {
        "search":{
            "vendor":"google",
            "product":"android",
            "version":"8.0"
        }
    }
    @date 2020-08-19
    @author james kang
    @response data(json): cve 취약점 정보 
//---------------------------------------------------------------------*/
function cveSearchProduct(req, res, next){
    console.log("cveSearchProduct Started...")

    const search = req.body.search;
    if(search)
    {
        console.log(search.vendor);
        console.log(search.product);
        console.log(search.version);    

        if(datacheck.isEmpty(search.vendor)){
            console.log("vendor empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"vendor":"empty"});
        }
        else if(datacheck.isEmpty(search.product)) {
            console.log("product empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"product":"empty"});
        }
        else if(datacheck.isEmpty(search.version)){
            console.log("version empty")
            return apiResponse.validationErrorWithData(res, "invalid data", {"version":"empty"});
        }
        else{
            result = db.findVulnerableProduct(search, res);
            //todo: find 결과를 callback으로 처리
        }
    }
    else{
        console.log("search object is null")
        return apiResponse.validationErrorWithData(res, "invalid data", {"search":"empty"});
    }

    console.log("cveSearchAPI End...")
}

module.exports = {
    cveSearchAPI: cveSearchAPI,
    cveSearchProduct: cveSearchProduct,
}

/*
async function main() {
  
    try {
        datacheck.isEmpty("aaa");
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
  */