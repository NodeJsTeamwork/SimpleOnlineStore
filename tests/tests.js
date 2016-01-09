var url = 'http://localhost:3030',
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../server'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    usersController = require('../server/controllers/usersController');
    // mongoose = require('mongoose'),
    // User = require('../server/data/models/User');
    
chai.use(chaiHttp);
chai.use(sinonChai);

describe('usersController', function () {
    it('getRegister should render register page if there is no user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {};
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getRegister(req, res, next);
              
       expect(res.redirect.called).to.be.false;
       expect(res.render.called).to.be.true;
       expect(res.render.calledWith('users/register')).to.be.true;
    });
    
    it('getRegister should redirect if there is user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {
           user: {}
       };
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getRegister(req, res, next);
              
       expect(res.redirect.called).to.be.true;
       expect(res.redirect.calledWith('/')).to.be.true;
       expect(res.render.called).to.be.false;
    });
    
    it('getLogin should render login page if there is no user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {};
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getLogin(req, res, next);
              
       expect(res.redirect.called).to.be.false;
       expect(res.render.called).to.be.true;
       expect(res.render.calledWith('users/login')).to.be.true;
    });
    
    it('getLogin should redirect if there is user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {
           user: {}
       };
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getLogin(req, res, next);
              
       expect(res.redirect.called).to.be.true;
       expect(res.redirect.calledWith('/')).to.be.true;
       expect(res.render.called).to.be.false;
    });
    
    it('getProfile should render profile page if there is user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {
           user: {}
       };
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getProfile(req, res, next);
              
       expect(res.render.called).to.be.true;
       expect(res.render.calledWith('profile/profile')).to.be.true;
       expect(res.redirect.called).to.be.false;
    });
    
    it('getProfile should redirect if there is no user in the req object', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {};
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.getProfile(req, res, next);
              
       expect(res.redirect.called).to.be.true;
       expect(res.redirect.calledWith('/')).to.be.true;
       expect(res.render.called).to.be.false;
    });
    
    it('createUser should redirect to register if passwords does not match', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {
           body: {
               password: '1234',
               confirmPassword: '1235'
           },
           session: {}
       };
       
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.createUser(req, res, next);
              
       expect(res.redirect.called).to.be.true;
    });
    
    it('createUser should attach error message to the req.session to register if passwords does not match', function () {
       var res = {
           redirect: function() {},
           render: function() {}
       };
       
       var req = {
           body: {
               password: '1234',
               confirmPassword: '1235'
           },
           session: {}
       };
       
       var next = function() {};
       
       sinon.stub(res, 'redirect');
       sinon.stub(res, 'render');
       
       usersController.createUser(req, res, next);
              
       expect(req.session.error).to.be.equal('Passwords do not match!');
    });
});

describe('Routing', function () {
    it('Home page shoud get successfully', function (done) {
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Chat page shoud get successfully', function (done) {
        chai.request(url)
            .get('/live-chat')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Login page shoud get successfully', function (done) {
        chai.request(url)
            .get('/login')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Register page shoud get successfully', function (done) {
        chai.request(url)
            .get('/register')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('Profile page should redirect if there is no logged in user', function (done) {
        chai.request(url)
            .get('/profile')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

    it('Add poduct page should redirect if user is not admin', function (done) {
        chai.request(url)
            .get('/admin/products/add')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

    it('My poducts page should redirect if user is not admin', function (done) {
        chai.request(url)
            .get('/admin/products/my')
            .redirects(0)
            .end(function (err, res) {
                expect(res).to.have.status(302);
                done();
            })
    });

});
