const {MongoClient} = require('mongodb');


class MongoDbClient {
    client;
    uri;

    constructor() {
        this.uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/admin?retryWrites=true&w=majority`
        this.client = new MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (exception) {
            await this.closeConnection();
            throw exception;
        }
    }

    async findOne(queryOption) {
        try {
            return await this.client.db('promotions')
                .collection('products')
                .findOne(queryOption);
        } catch (exception) {
            await this.closeConnection();
            throw exception;
        }
    }

    async findAll(queryOption, page, limit) {
        try {
            return await this.client.db('promotions')
                .collection('products')
                .find(queryOption)
                .skip((page - 1) * limit)
                .limit(limit)
                .toArray();
        } catch (exception) {
            await this.closeConnection();
            throw exception;
        }
    }

    async count(queryOption) {
        try {
            return await this.client.db('promotions')
                .collection('products')
                .find(queryOption)
                .count();
        } catch (exception) {
            await this.closeConnection();
            throw exception;
        }
    }

    async closeConnection() {
        await this.client.close();
    }
}

module.exports = MongoDbClient;