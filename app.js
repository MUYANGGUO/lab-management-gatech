const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.get('/',(req,res,next)=>{
    res.send('Hello Muyang, this is a initial test!');
})

app.use(bodyParser.json());

// developing local host setup
app.listen(3000);