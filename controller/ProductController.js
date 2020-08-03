const ProductService = require('./provider/ProductService');

exports.get = async (request, response) => {
    const respService = {
        success: true,
        data: [],
        stack: null
    }
    try {
        const word = request.query.word;
        const page = request.query.page || 1;
        const productService = new ProductService();
        respService.data = await productService.getProducts(word, page);
    } catch (exception) {
        console.error(exception.stack)
        respService.success = false;
        respService.stack = exception.stack
    } finally {
        response.send(respService);
    }
};

