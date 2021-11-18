const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Reading input number', () => {
        test('reading whole number', () => {
            assert.equal(convertHandler.getNum('4gal'), 4);
        });

        test('reading decimal number', () => {
            assert.equal(convertHandler.getNum('3.1mi'), 3.1);
        });

        test('reading fractional number', () => {
            assert.equal(convertHandler.getNum('1/2km'), 0.5);
        });

        test('reading fractional input with decimal', () => {
            assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
        });

        test('return an error on a double-fraction', () => {
            assert.throws(() => {
                convertHandler.getNum('3/2/3mi')
            }, 'Invalid Number');
        });

        test('return 1 when no numerical input is provided', () => {
            assert.equal(convertHandler.getNum('kg'), 1);
        });
    })

    suite('Reading input unit', () => {
        suite('reading each valid input unit', () => {
            test('Litres', () => {
                assert.equal(convertHandler.getUnit('25l'), 'L');
                assert.equal(convertHandler.getUnit('25L'), 'L');
            });

            test('Gallons', () => {
                assert.equal(convertHandler.getUnit('25gal'), 'gal');
                assert.equal(convertHandler.getUnit('25Gal'), 'gal');
                assert.equal(convertHandler.getUnit('25GAL'), 'gal');
            });

            test('Miles', () => {
                assert.equal(convertHandler.getUnit('25mi'), 'mi');
            });

            test('Kilometers', () => {
                assert.equal(convertHandler.getUnit('25km'), 'km');
                assert.equal(convertHandler.getUnit('25Km'), 'km');
            });

            test('Pounds', () => {
                assert.equal(convertHandler.getUnit('25lbs'), 'lbs');
            });

            test('Kilograms', () => {
                assert.equal(convertHandler.getUnit('25kg'), 'kg');
                assert.equal(convertHandler.getUnit('25Kg'), 'kg');
            });
        });

        suite('Reading invalid units', () => {
            test('no unit', () => {
                assert.throws(() => {
                    convertHandler.getUnit('25')
                }, 'Invalid Unit');
            });

            test('invalid unit', () => {
                assert.throws(() => {
                    convertHandler.getUnit('25kbps')
                }, 'Invalid Unit');
            });

        });

        suite('Reading unit conversion', () => {
            test('gal', () => {
                assert.equal(convertHandler.getReturnUnit('gal'), 'L')
            });

            test('L', () => {
                assert.equal(convertHandler.getReturnUnit('L'), 'gal')
            });

            test('mi', () => {
                assert.equal(convertHandler.getReturnUnit('mi'), 'km')
            });

            test('km', () => {
                assert.equal(convertHandler.getReturnUnit('km'), 'mi')
            });

            test('lbs', () => {
                assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
            });

            test('kg', () => {
                assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
            });
        })

        suite('Checking valid spelling of unit', () => {
            test('Gallons', () => {
                assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            });

            test('Liters', () => {
                assert.equal(convertHandler.spellOutUnit('l'), 'liters');
                assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            });

            test('Miles', () => {
                assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            });

            test('Kilometers', () => {
                assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            });

            test('Pounds', () => {
                assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            });

            test('Kilograms', () => {
                assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
            });
        })
    });

    suite('Checking conversions', () => {
        suite('converting whole numbers', () => {
            test('gal to L', () => {
                assert.approximately(convertHandler.convert(4, 'gal'), 15.14160, 15.14164, 0.00004);
            });

            test('L to gal', () => {
                assert.approximately(convertHandler.convert(4, 'L'), 1.05670, 1.05669, 0.00001);
            });

            test('mi to km', () => {
                assert.approximately(convertHandler.convert(4, 'mi'), 6.43738, 6.43736, 0.00002);
            });

            test('km to mi', () => {
                assert.approximately(convertHandler.convert(4, 'km'), 2.48548, 2.48549, 0.00001);
            });

            test('lbs to kg', () => {
                assert.approximately(convertHandler.convert(4, 'lbs'), 1.81440, 1.81437, 0.00003);
            });

            test('kg to lbs', () => {
                assert.approximately(convertHandler.convert(4, 'kg'), 8.81849, 8.8185, 0.00001);
            })
        });

        suite('converting decimal numbers', () => {
            test('gal to L', () => {
                assert.approximately(convertHandler.convert(4.2, 'gal'), 15.8987, 15.89872, 0.00002);
            });

            test('L to gal', () => {
                assert.approximately(convertHandler.convert(4.2, 'L'),1.10950, 1.10952, 0.00002);
            });

            test('mi to km', () => {
                assert.approximately(convertHandler.convert(4.2, 'mi'), 6.75924, 6.75923, 0.00001);
            });

            test('km to mi', () => {
                assert.approximately(convertHandler.convert(4.2, 'km'), 2.60976, 2.60977, 0.00001);
            });
            
            test('lbs to kg', () => {
                assert.approximately(convertHandler.convert(4.2, 'lbs'), 1.9051, 1.90509, 0.00001);
            });

            test('kg to lbs', () => {
                assert.approximately(convertHandler.convert(4.2, 'kg'), 9.25940, 9.25942, 0.00002);
            })
        })

    })
});