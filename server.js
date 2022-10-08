const color = require('colors');
const app = require('./app.js');
const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`.yellow.bold);
})