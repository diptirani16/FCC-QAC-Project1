'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let inputValue = req.query.input;

    let invalidNum = false;
    let invalidUnit = false;

    let initNum;
    let initUnit;

    try {
      initNum = convertHandler.getNum(inputValue);
    } catch (error) {
      invalidNum = true;
    }

    try {
      initUnit = convertHandler.getUnit(inputValue);
    } catch (error) {
      invalidUnit = true;
    }

    if(invalidNum && invalidUnit){
      return res.send('invalid number and unit')
    }
    else if(invalidNum) {
      return res.send('invalid number');
    }
    else if(invalidUnit) {
      return res.send('invalid unit');
    }

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": string
    })
  })

};
