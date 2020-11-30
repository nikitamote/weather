
var express = require('express');
var router = express.Router();
const bookshelf = require('../db-config');
const weatherReports = bookshelf.Model.extend({
  tableName: 'weather-reports-audit'
});
let weatheReport = {
  "dt": 1406080800,
  "temp": {
    "day": 297.77,  //daily averaged temperature
    "min": 293.52, //daily min temperature
    "max": 297.77, //daily max temperature
    "night": 293.52, //night temperature
    "eve": 297.77, //evening temperature
    "morn": 297.77 //morning temperature
  }
}
var today = new Date();
var day = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
router.get('/weather', async function (req, res) {

  let weatheReportDetails = {
    weatheReport: weatheReport,
    created_when: new Date(),
    is_prime: true,
  }
  let test_prime = async function (d) {

    if (d === 1) {
      return false;
    }
    else if (d === 2) {
      return true;
    } else {
      for (var i = 2; i < d; i++) {
        if (d % i === 0) {
          return false;
        }
      }
      return true;
    }
  }
  newDay = parseInt(day)
  test_prime(newDay)
  if (test_prime) {
    new weatherReports(weatheReportDetails)
      .save(null, {
        method: 'insert'
      })
      .then(function (model) {
        res.status(200).json({ success: true, error: false, data: weatheReport })
      });
  }
  else {
    weatheReportSave.is_prime = false
    new weatherReports(weatheReportDetails)
      .save(null, {
        method: 'insert'
      })
      .then(function (model) {
        res.status(200).json({ success: false, error: true, message: "Date is not prime so no date" })
      });
  }
})
module.exports = router;
