const color = require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
    console.log(`Database connection is successful`);
  })

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`.yellow.bold);
})

// const color = require('colors');
// const app = require('./app.js');
// const port = process.env.PORT || 8080;

// app.listen(port, ()=>{
//     console.log(`Listening to port ${port}`.yellow.bold);
// })