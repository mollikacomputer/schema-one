const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next)=>{
    res.send('schema One app is runnint');
});

const productSchima = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide a name for this product"]
    }
})
const Product = mongoose.model('Product', productSchima );
app.get('/api/v1/product', async(req, res, next)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({
            status:"success",
            data:products
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get Data",
            error:error.message,
        })
    }
})
module.exports = app;


// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res, next)=>{
//     res.send('Schema One App is running')
// });

// module.exports = app;