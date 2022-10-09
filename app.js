const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

// ==== start productSchema ===
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide a name for this product"],
        trim:true, // age pore space remove
        unique:[true, "Name must be unique"],
        minLength:[3, "Name must be at least length 3 characters."],
        maxLength:[100, "Name is too large"]
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:[true, "Please provide price for this product"],
        min:[0, "Price can not be negetive"]
    },
    unit:{
        type: String,
        required:true,
        enum:{
            values:["kg", "liter", "pcs"],
            message:"unit value can not {VALUE} must be kg/liter/pcs"
            }
        },
    quantity:{
        type:Number,
        required:true,
        min:[0, "Quantity can not be negetive value"],
        validate:{
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if(isInteger){
                        return true
                    }else{
                        return false
                    }
                }
            },
            message:"Quantity must be an integer"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["in-stock", "out-of-stock","discontinued"],
            message:"Status can't be {VALUE} must be in-stock/out-of-stock/discontinued"
        }
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    // },
    // updatedAt:{
    //     type:Date,
    //     default:Date.now,
    // },
    // supplier information get from another place with ref
    // supplier:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Supplier"
    // },
    // categories:[{
    //     name:{
    //         type:String,
    //         required:true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]

},
{
tymestamps:true
}
)
// ==== end productSchema ===

// ====start Model =====

const Product = mongoose.model('Product', productSchema );

// ====end Model =====

// ===start get Products ===
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
// ===end get Products ===

//=== start create/post product ===
app.post('/api/v1/product', async(req, res, next) =>{
    // console.log('it is working');
    try {
        // const result = await Product.create(req.body)
        const product = new Product(req.body)
        const result = await product.save()
        // logger call here
        // result.logger()
        res.status(200).json({
            status:'success',
            message:'Data is inserted successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data is not inserted',
            data:error.message
        })
    }

})
//=== end create/post product ===

//==start app testing ==
app.get('/', (req, res, next)=>{
    res.send('schema One app is runnint');
});
//==end app testing ==
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