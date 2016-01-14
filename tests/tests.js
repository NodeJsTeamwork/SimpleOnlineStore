var url = 'http://localhost:3030',
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    fakes = require('./fakes'),
    usersController = require('../server/controllers/usersController')(fakes.usersData, fakes.productsData, fakes.cripto),
    productsController = require('../server/controllers/productsController')(fakes.usersData, fakes.productsData),
    homeController = require('../server/controllers/homeController')(fakes.productsData),
    liveChatController = require('../server/controllers/liveChatController')(fakes.messagesData);
chai.use(chaiHttp);
chai.use(sinonChai);

describe('usersController', function () {
    describe('getRegister', function () {
        it('should render register page if there is no user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {};
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getRegister(req, res, next);

            expect(res.redirect.called).to.be.false;
            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('users/register')).to.be.true;
        });

        it('should redirect if there is user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                user: {}
            };
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getRegister(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            expect(res.render.called).to.be.false;
        });
    });

    describe('getLogin', function () {
        it('should render login page if there is no user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {};
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getLogin(req, res, next);

            expect(res.redirect.called).to.be.false;
            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('users/login')).to.be.true;
        });

        it('should redirect if there is user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                user: {}
            };
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getLogin(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            expect(res.render.called).to.be.false;
        });
    });

    describe('getProfile', function () {
        it('should render profile page if there is user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                user: {}
            };
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getProfile(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('profile/profile')).to.be.true;
            expect(res.redirect.called).to.be.false;
        });

        it('should redirect if there is no user in the req object', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {};
            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.getProfile(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            expect(res.render.called).to.be.false;
        });
    });

    describe('createUser', function () {
        it('should redirect to register if passwords does not match', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                body: {
                    password: '1234',
                    confirmPassword: '1235'
                },
                session: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.createUser(req, res, next);

            expect(res.redirect.called).to.be.true;
        });

        it('should attach error message to the req.session if passwords does not match', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                body: {
                    password: '1234',
                    confirmPassword: '1235'
                },
                session: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.createUser(req, res, next);

            expect(req.session.error).to.be.equal('Passwords do not match!');
        });

        it('should redirect to home when valid data is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                body: {
                    password: '1234',
                    confirmPassword: '1234'
                },
                logIn: function (user, callback) {
                    callback();
                },
                session: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(res, 'redirect');

            usersController.createUser(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
            expect(res.render.called).to.be.false;
        });
    });

    describe('updateUser', function () {
        it('shold return error message when invalid user ID is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { }
            };

            var req = {
                body: {
                    _id: 1
                },
                user: {
                    _id: 2,
                    roles: []
                },
                session: {}
            };

            var next = function () { };

            sinon.spy(res, 'send');

            usersController.updateUser(req, res, next);

            expect(res.send.called).to.be.true;
        });

        it('shold send error message when different passwords are passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
            };

            var req = {
                body: {
                    _id: 1,
                    password: '1',
                    confirmPassword: '2'
                },
                user: {
                    _id: 1,
                    roles: []
                },
                session: {}
            };

            var next = function () { };

            usersController.updateUser(req, res, next);

            expect(req.session.error).to.be.equal('Passwords do not match!');
        });

        it('shold redirect to /profile when valid data is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
            };

            var req = {
                body: {
                    _id: 1,
                    password: '1',
                    confirmPassword: '1'
                },
                user: {
                    _id: 1,
                    roles: []
                },
                session: {}
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.updateUser(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/profile')).to.be.true;
        });
    });

    describe('getAll', function () {
        it('shold render users page', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {
                    _id: 1
                },
                user: {},
                session: {},
                query: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');

            usersController.getAll(req, res, next);

            expect(res.render.called).to.be.true;
        });

        it('shold made request to database with valid query params', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {
                    page: 1,
                    pageSize: 10,
                    type: 'tables',
                    sortBy: 'asc'
                }
            };

            var expectedQuery = {
                page: 1,
                limit: 10,
                sort: {
                    asc: 'tables'
                }
            }

            var next = function () { };

            sinon.spy(fakes.usersData, 'getPagedUsers');

            usersController.getAll(req, res, next);

            expect(fakes.usersData.getPagedUsers.calledWith(expectedQuery)).to.be.true;
        });

        it('shold made request to database with default query params', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {}
            };

            var expectedQuery = {
                page: 1,
                limit: 10,
                sort: {}
            }

            var next = function () { };

            usersController.getAll(req, res, next);

            expect(fakes.usersData.getPagedUsers.calledWith(expectedQuery)).to.be.true;
        });
    });

    describe('getProfileByAdmin', function () {
        it('shold redirect to / if no userId is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {}
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.getProfileByAdmin(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });

        it('shold render profile page if valid userId is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {
                    id: 1
                }
            };

            var next = function () { };

            sinon.spy(res, 'render');

            var expectedUser = {
                currentUser: req.user,
                userToUpdate: {
                    _id: 5
                }
            }

            usersController.getProfileByAdmin(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('profile/profile', expectedUser)).to.be.true;
        });
    });

    describe('getCart', function () {
        it('shold redirect to / if no user is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.getCart(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });

        it('shold render cart page if valid user is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
                user: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');
            sinon.spy(fakes.usersData, 'getUserByIdWithCart');

            var expectedUser = {
                currentUser: req.user,
                cart: {
                    total: 5
                }
            }

            usersController.getCart(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('cart/cart', expectedUser)).to.be.true;
        });
    });

    describe('addItemToCart', function () {
        it('shold redirect to /cart if valid data is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
                body: {},
                user: {
                    _id: 5
                }
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.addItemToCart(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/cart')).to.be.true;
        });
    });

    describe('removeItemFromCart', function () {
        it('shold redirect to /cart if valid data is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
                body: {},
                user: {
                    _id: 5
                }
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.removeItemFromCart(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/cart')).to.be.true;
        });
    });

    describe('removeFromCart', function () {
        it('shold redirect to / if no user is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
                body: {},
            };

            var next = function () { };

            sinon.spy(res, 'redirect');

            usersController.removeFromCart(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });

        it('shold render products-details page if valid data is passed', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                session: {},
                body: {},
                user: {
                    _id: 5
                },
                query: {}
            };

            var next = function () { };

            sinon.spy(res, 'render');

            usersController.removeFromCart(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('cart/productDetails')).to.be.true;
        });
    });
});

describe('productsController', function () {
    describe('getAdd', function () {
        it('should render products/add page', function () {
            var res = {
                render: function () { }
            };

            var req = {};
            var next = function () { };

            sinon.spy(res, 'render');

            productsController.getAdd(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('products/add')).to.be.true;
        });
    });

    describe('createProduct', function () {
        it('should redirect to / if valid data is passed', function () {
            var res = {
                render: function () { },
                redirect: function () { }
            };

            var req = {
                user: {
                    _id: 5
                },
                body: {}
            };
            var next = function () { };

            sinon.spy(res, 'redirect');

            productsController.createProduct(req, res, next);

            expect(res.redirect.called).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });
    });

    describe('getProducts', function () {
        it('shold made request to database with valid query params', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {
                    page: 1,
                    pageSize: 10,
                    type: 'tables',
                    sortBy: 'asc'
                }
            };

            var expectedCustomQuery = {}

            var expectedQuery = {
                page: 1,
                limit: 10,
                sort: {
                    asc: 'tables'
                }
            }

            var next = function () { };

            sinon.spy(fakes.productsData, 'getPagedProducts');

            productsController.getProducts(req, res, next);

            expect(fakes.productsData.getPagedProducts.calledWith(expectedCustomQuery, expectedQuery)).to.be.true;
        });

        it('shold redner products page with the right products', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {
                    page: 1,
                    pageSize: 10,
                    type: 'tables',
                    sortBy: 'asc'
                }
            };

            var expectedCustomQuery = {}

            var expectedQuery = {
                page: 1,
                limit: 10,
                sort: {
                    asc: 'tables'
                }
            }

            var next = function () { };

            sinon.spy(res, 'render');

            var expectedResult = {
                currentUser: req.user,
                collection: []
            }

            productsController.getProducts(req, res, next);

            expect(res.render.calledWith('products/products', expectedResult)).to.be.true;
        });
    });

    describe('getProductDetails', function () {
        it('shold render product details page with the right product', function () {
            var res = {
                redirect: function () { },
                render: function () { },
                send: function () { },
            };

            var req = {
                body: {},
                user: {},
                session: {},
                query: {
                    itemId: 1
                }
            };

            var next = function () { };

            var expectedResult = {
                currentUser: req.user,
                product: {}
            }

            sinon.spy(res, 'render');

            productsController.getProductDetails(req, res, next);

            expect(res.render.calledWith('cart/productDetails', expectedResult)).to.be.true;
        });
    });
});

describe('homeController', function () {
    describe('getHome', function () {
        it('should render index page with the latest products', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                user: {}
            };
            var next = function () { };

            sinon.spy(res, 'render');
            var collection = [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ];

            var expectedResult = {
                currentUser: req.user,
                collection: collection.reverse()
            }


            homeController.getHome(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('index', expectedResult)).to.be.true;
        });
    });
});

describe('liveChatController', function () {
    describe('getChat', function () {
        it('should render live-chat page with all chat messages', function () {
            var res = {
                redirect: function () { },
                render: function () { }
            };

            var req = {
                user: {}
            };
            var next = function () { };

            sinon.spy(res, 'render');

            var expectedResult = {
                currentUser: req.user,
                messages: [1, 2, 3]
            }

            liveChatController.getChat(req, res, next);

            expect(res.render.called).to.be.true;
            expect(res.render.calledWith('live-chat/live-chat', expectedResult)).to.be.true;
        });
    });
});