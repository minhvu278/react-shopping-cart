const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")

// Var data require("./build/data.json")
const app = express();
app.use(bodyParser.json());

//deploy
// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
//     userNewUrlParse: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// Mongodb
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
)

app.get("/api/products", async (req, res) => {
    // const products = await Product.find({});
    const products = [
        {
            "_id": "8JlCq1yvw",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 1",
            "image": "/images/dress1.jpg",
            "price": 29.9,
            "title": "Dress 1"
        },
        {
            "_id": "I2ivd9tKl",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "M", "XXL"],
            "description": "Mẫu số 2",
            "image": "/images/dress2.jpg",
            "price": 18.9,
            "title": "Dress 2"
        },
        {
            "_id": "MLc5ipULj",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 3",
            "image": "/images/dress3.jpg",
            "price": 19.9,
            "title": "Dress 3"
        },
        {
            "_id": "KMFv5RPVn",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 4",
            "image": "/images/dress4.jpg",
            "price": 39.9,
            "title": "Dress 4"
        },
        {
            "_id": "tYAAB-ti_",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "S", "XXL"],
            "description": "Mẫu số 5",
            "image": "/images/dress5.jpg",
            "price": 49.9,
            "title": "Dress 5"
        },
        {
            "_id": "6aMbtpfDc",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 6",
            "image": "/images/dress6.jpg",
            "price": 29.9,
            "title": "Dress 6"
        },
        {
            "_id": "ZcoGSX8HU",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 7",
            "image": "/images/dress3.jpg",
            "price": 27.9,
            "title": "Dress 7"
        },
        {
            "_id": "FA9rpHGoJ",
            "__v": 0,
            "availableSizes": ["X", "L", "XL", "XXL"],
            "description": "Mẫu số 7",
            "image": "/images/dress3.jpg",
            "price": 27.9,
            "title": "Dress 7"
        }
    ]
    res.send(products)
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct)
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const Order = mongoose.model(
    "order",
    new mongoose.Schema(
        {
            _id: {
                type: String,
                default: shortid.generate
            },
            email: String,
            name: String,
            address: String,
            total: Number,
            cartItems: [
                {
                    _id: String,
                    title: String,
                    price: Number,
                    count: Number
                },
            ],
        },
        {
            timeStamps: true
        }
    )
)

app.post("/api/orders", async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
});
app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at http://localhost:5000"));