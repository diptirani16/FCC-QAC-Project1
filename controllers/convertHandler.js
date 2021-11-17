function ConvertHandler() {
  
    this.getNum = function(input) {
      let result;

      // input = 1/2km , output = 0.5
      // input = 5.4/3lbs , output = 1.8
      if(input.includes('/')){
        let numAsString = '';
        for(let i=0; i<input.length; i++){
            if(!isNaN(input.charAt(i)) || input.charAt(i) === '.' || input.charAt(i) === '/'){
                numAsString += input.charAt(i);
            }
        }
        let numArray = numAsString.split('/');
        if(numArray.length === 2 && numArray[0] !== 0 && numArray[1] !== 0){
            return parseFloat(numArray[0]/parseFloat(numArray[1]));
        }
        else{
            throw new Error('Invalid Number');
        }
      }

      // input = 4gal , output = 4
      else{
          result = parseFloat(numAsString);
      }

      // input = kg , output = 1
      if(isNaN(result)){
          return 1;
      }

      // input = 0kg , output = error
      if(result === 0){
          throw new Error('Invalid Number');
      }

      return result;
    };
    

    this.getUnit = function(input) {
      let result;

      // input = 4gal , output = gal
      // input = 1/2km , output = km
      // input = 5.4/3lbs , output = lbs
      // input = kg , output = kg
      let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']

      let unitAsString = '';
      input = input.lowercase();

      for(let i=0; i<input.length; i++){
          if((input.charAt(i) !== ' ' && isNaN(input.charAt(i))) && (input.charAt(i) !== '.' || input.charAt(i) !== '/')){
              unitAsString += input.charAt(i);
          }
      }

      if(validUnits.includes(unitAsString)){
        if(unitAsString === 'l'){
          result = unitAsString.toUpperCase()
        }
        result = unitAsString
      }
      else {
        throw new Error('Invalid Unit')
      }

      return result;
    };
    
    this.getReturnUnit = function(initUnit) {
      let result;

      if(initUnit !== 'L'){
        initUnit = initUnit.lowercase()
      }

      let convertionList = {
        'gal': 'L',
        'L': 'gal',
        'mi': 'km',
        'km': 'mi',
        'lbs': 'kg',
        'kg': 'lbs'
      }
      if(convertionList.hasOwnProperty(initUnit)){
        result = convertionList.initUnit
      }
      else {
        throw new Error('Invalid Unit')
      }

      return result;
    };
  
    this.spellOutUnit = function(unit) {
      let result;
      unit = unit.lowercase()
      let spellingList = {
        'gal': 'gallons',
        'l': 'liters',
        'mi': 'miles',
        'km': 'kilometers',
        'lbs': 'pounds',
        'kg': 'kilograms',
      }

      if(spellingList.hasOwnProperty(unit)){
        result = spellingList.unit
      }
      else {
        throw new Error('Invalid Unit')
      }

      return result;
    };
    
    this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      
      let result;

      if(initUnit !== 'L'){
        initUnit = initUnit.lowercase()
      }

      switch(initUnit){
        case 'gal': 
          result = initNum * galToL;
          break;
        case 'L': 
          result = initNum / galToL;
          break;
        case 'mi': 
          result = initNum * miToKm;
          break;
        case 'km': 
          result = initNum / miToKm;
          break;
        case 'lbs': 
          result = initNum * lbsToKg;
          break;
        case 'kg': 
          result = initNum / lbsToKg;
          break;
        default: 
          throw new Error('Invalid Unit');
      }
      
      return parseFloat(result.toFixed(5));
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
      
      return result;
    };
    
  }
  
  module.exports = ConvertHandler;
  