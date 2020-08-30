const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")

// Var data require("./build/data.json")
const app = express();
app.use(bodyParser.json());

//deploy
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    userNewUrlParse: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

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
    const products = await Product.find({});
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at http://localhost:5000"));