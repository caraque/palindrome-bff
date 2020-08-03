const MongoDbClient = require("../../config/mongo-client");

const LIMIT_PRODUCTS = 10

class ProductService {

    async getProducts(searchedWord, page) {
        const mongoClient = new MongoDbClient();
        try {
            let products = [];
            let totalRows = 1;
            let queryOption = null;
            let totalPages = 1;
            await mongoClient.connect();
            if (searchedWord) {
                if (!isNaN(searchedWord)) {
                    queryOption = {
                        id: Number(searchedWord)
                    }
                    products = await mongoClient.findOne(queryOption);
                } else if (searchedWord.length >= 3) {
                    queryOption = {
                        $or: [
                            {
                                brand: {$regex: searchedWord},
                            },
                            {
                                description: {$regex: searchedWord},
                            }
                        ]
                    }
                    products = await mongoClient.findAll(queryOption, page, LIMIT_PRODUCTS);
                }
                totalRows = await mongoClient.count(queryOption);
                totalPages = Math.ceil(totalRows / LIMIT_PRODUCTS);
            }
            return {
                products,
                page: Number(page),
                totalPages,
                totalRows

            };
        } catch (exception) {
            throw exception;
        } finally {
            await mongoClient.closeConnection();
        }
    }


}

module.exports = ProductService;
