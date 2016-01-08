var url = 'http://localhost:3030';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var server = require('../server');

describe('homepage', function () {

    it('Home page shoud get successfully', function (done) {
        chai.request('http://localhost:3030')
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Chat page shoud get successfully', function (done) {
        chai.request('http://localhost:3030')
            .get('/live-chat')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Login page shoud get successfully', function (done) {
        chai.request('http://localhost:3030')
            .get('/login')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Register page shoud get successfully', function (done) {
        chai.request('http://localhost:3030')
            .get('/register')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Profile page should redirect if there is no logged in user', function (done) {
        chai.request('http://localhost:3030')
            .get('/profile')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

    it('Add poduct page should redirect if user is not admin', function (done) {
        chai.request('http://localhost:3030')
            .get('/admin/products/add')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

    it('My poducts page should redirect if user is not admin', function (done) {
        chai.request('http://localhost:3030')
            .get('/admin/products/my')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

});
