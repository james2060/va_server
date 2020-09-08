/*
    @author kisookang
    @date 2020-09-08
    @email verynicesoo78@gmail.com
    @note monogodb connect and import data

*/

const mongodb = require('mongodb');

const apiResponse = require("../helper/apiResponse")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<id>:<password>@cluster0.3d4j6.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function getCveDBbetweenTwoDate(start, end, res){

    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

    if (!client) {
        console.log("can't connect to mongodb server")
        return apiResponse.ErrorResponse(res, "db connection error")
    }

    try {
        const db = client.db("cvedb");
        const collection = db.collection('cves_json');

        const query = 
        {
        "lastModifiedDate":{$gte: start, $lte: end}
        }
        //검색 옵션: 내림차순, limit 1000
        const result = await  collection.find(query).sort({"lastModifiedDate":-1}).limit(1000).toArray();

        return apiResponse.successResponseWithData(res, "success", result);

    } catch (err) {
        console.log(err);
        return apiResponse.ErrorResponse(res, "param is null")

    } finally {
        console.log("mongodb will be closed");
        client.close();
    }

}
async function findVulnerableProduct(search, res) {

  const client = await MongoClient.connect(uri, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  if (!client) {
      console.log("can't connect to mongodb server")
      return apiResponse.ErrorResponse(res, "db connection error")
  }

  try {

      const db = client.db("cvedb");
      const collection = db.collection('cves_json');

      const query = 
      {
         "cve.affects.vendor.vendor_data.vendor_name":search.vendor,
         "cve.affects.vendor.vendor_data.product.product_data.product_name":search.product,
         "cve.affects.vendor.vendor_data.product.product_data.version.version_data.version_value":{$gte: search.version}
      }
      const result = await collection.find(query).toArray();

      return apiResponse.successResponseWithData(res, "success", result);

  } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, "search is null")

  } finally {
      console.log("mongodb will be closed");
      client.close();
  }
}

async function findCVECode(keyword, res) {

    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        console.log("can't connect to mongodb server")
        return;
    }

    try {

        const db = client.db("cvedb");

        let collection = db.collection('cves_json');

        //let query = { CVE_data_meta: { $elemMatch: { ID: keyword } } } 

        const query = {"cve.CVE_data_meta.ID":keyword};
        const result = await collection.find(query).toArray();
        console.log(result);

        return apiResponse.successResponseWithData(res, "success", result);

    } catch (err) {
        console.log(err);
        return apiResponse.ErrorResponse(res, "search is null")

    } finally {
        console.log("mongodb will be closed");
        client.close();
    }
}

module.exports = {
  findVulnerableProduct,
  findCVECode,
  getCveDBbetweenTwoDate,
}
