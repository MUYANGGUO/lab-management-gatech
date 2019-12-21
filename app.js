const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');

const graphQlResolver = require('./graphql/resolver/index');

const app = express();




// app.get('/',(req,res,next)=>{
//     res.send('Hello Muyang, this is a initial test!');
// });

//! mark as non-nullable,
app.use('/graphql',
    graphqlHttp({
    schema: graphQlSchema,
    //name must match!
    //resolver functions:
    rootValue: graphQlResolver,
    graphiql: true
    
})
);

app.use(bodyParser.json());

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@labcluster-km0yf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(()=>{
        //connect to local server once logged in mongoDB
        app.listen(3000);
    }

    ).catch(
        err=>{
            console.log(err);
        }
    )


// // developing local host setup
// app.listen(3000);