const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const productController = require("./controller/ProductController");


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const server = require('http').Server(app);

app.get('/getProducts', productController.get);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running on port ' + port);
});
module.exports = app;
