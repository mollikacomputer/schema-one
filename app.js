const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')


app.use(express.json());
app.use(cors());

// schema design

const productSchema = mongoose.Schema({
    name:{type:String},
    description:{type:String},
    price:{type:Number}
})

// schema -> model -> query
// const Product = mongoose.model('Product', productSchema );
const Product = mongoose.model('Product', productSchema);
// post data insert


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// createDocument or save a document another way
const createDocument = async() =>{
  try {
    const createAProduct = new Product({
      name:"Pinaple",
      description:"Pinaple is healty food for our helth",
      price:150
  })
 const result = await createAProduct.save();
 console.log(result);
  } catch (error) {
    console.log(error);
  }
}
createDocument();


module.exports = app;
