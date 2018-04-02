
var app = require("./config/express");
const mongoose = require("mongoose");
var _ = require("lodash");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Product name',
        trim: true
    },
    price: {
        type: Number
    },
    priorityofcate: {
        type: Number
    },
    images: {
        type: [String]
    },
    categories: {
        type: [{
            _id: String,
            name: String
        }]
    },
    shop: {
        type: [{
            _id: String,
            name: String
        }]
    },
    promotionprice: {
        type: Number
    },
    ispromotionprice: {
        type: Boolean,
        default: false
    },
    isrecommend: {
        type: Boolean,
        default: false
    },
    startdate: {
        type: Date
    },
    expiredate: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: {
            _id: String,
            name: String
        }
    }
});
var Product = mongoose.model('Product', ProductSchema);

app.get('/api/product', function (req, res) {
    var productFind = Product.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/api/product', function (req, res) {

    var product = new Product(req.body);

    product.save(function (err, data) {
        res.json(data);
    });

});

app.get("/api/product/:id", function (req, res) {
    res.json(req.data);
});

app.put("/api/product/:id", function (req, res) {
    var productUpdate = _.extend(req.data, req.body);
    productUpdate.save(function (err, data) {
        res.json(data);
    });
});

app.delete("/api/product/:id", function (req, res) {
    req.data.remove(function (err, data) {
        res.json('Whoami remove successfully deleted!');
    });
});

app.param("id", function (req, res, next, id) {
    var productFindById = Product.findById(id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            req.data = data;
            next();
        }
    });
});
module.exports = app;