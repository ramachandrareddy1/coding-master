let chai = require('chai');
let chaiHttp = require('chai-http');
let mocha = require('mocha');
let describe = require('mocha').describe;
let it = mocha.it;
let should = chai.should();

chai.use(chaiHttp);
let server = require('../index.js');

//Our parent block
describe('PetCrud', () => {
    describe('Pets crearion Success Case', () => {
        it('Create new Pets', (done) => {
            chai.request(server)
                .post('/pets')
                .send({
                    'name': 'ramchandra',
                    'age': 28,
                    'colour': 'Green'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('Pets crearion failuere Case', () => {
        it('Create new Pets', (done) => {
            chai.request(server)
                .post('/pets')
                .send({
                    'name': 'ramchandra',
                    'age': '24',
                    'colour': 'Green'
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('Pets Get Success Case', () => {
        it('Create new Pets', (done) => {
            chai.request(server)
                .get('/pets')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    })
})