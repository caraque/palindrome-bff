const request = require('supertest');
const app = require('../server');
const agent = request.agent(app);
const MongoDbClient = require("../config/mongo-client");
const {MongoMock} = require('../test/mock/MongoMock');


describe('Testing ProductController', () => {

    beforeEach(() => {
        jest.mock('mongodb');
    });

    test('Testing findProducts not number', async () => {

        const mockMongoConnect = jest.fn();
        MongoDbClient.prototype.connect = mockMongoConnect;
        mockMongoConnect.mockReturnValue(MongoMock().connect())

        const mockMongofindAll = jest.fn();
        MongoDbClient.prototype.findAll = mockMongofindAll;
        mockMongofindAll.mockReturnValue(MongoMock().findAll())

        const mockMongoCount = jest.fn();
        MongoDbClient.prototype.count = mockMongoCount;
        mockMongoCount.mockReturnValue(MongoMock().count())

        await agent.get('/getProducts?word=asd')
            .expect(200, {success: true, data: {products: [], page: 1, totalPages: 1, totalRows: 1}, stack: null})
    });

    test('Testing findProducts number', async () => {

        const mockMongoConnect = jest.fn();
        MongoDbClient.prototype.connect = mockMongoConnect;
        mockMongoConnect.mockReturnValue(MongoMock().connect())

        const mockMongofindAll = jest.fn();
        MongoDbClient.prototype.findAll = mockMongofindAll;
        mockMongofindAll.mockReturnValue(MongoMock().findAll())

        const mockMongoCount = jest.fn();
        MongoDbClient.prototype.count = mockMongoCount;
        mockMongoCount.mockReturnValue(MongoMock().count())

        const mockMongofindOne = jest.fn();
        MongoDbClient.prototype.findOne = mockMongofindOne;
        mockMongofindOne.mockReturnValue(MongoMock().findOne())

        await agent.get('/getProducts?word=345')
            .expect(200, {success: true, data: {products: [], page: 1, totalPages: 1, totalRows: 1}, stack: null});
    });

    test('Testing findProducts exception', async () => {
        await agent.get('/getProducts?word=345');
    });
});
