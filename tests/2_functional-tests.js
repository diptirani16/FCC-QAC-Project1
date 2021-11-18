const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Sending a valid input', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { "initNum": 10, "initUnit": "L", "returnNum": 2.64172, "returnUnit": "gal", "string": "10 liters converts to 2.64172 gallons" })
            })
    });

    test('Sending an invalid input', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
            })
    });

    test('Sending an invalid number', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
            })
    });

    test('Sending invalid number and unit', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
            })
    });

    test('Sending input with no number', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'kg' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" })
            })
    })
});
