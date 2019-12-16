const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();


// app.get('/',(req,res,next)=>{
//     res.send('Hello Muyang, this is a initial test!');
// });

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`
        type RootQuery{
            events: [String!]!
        }

        type RootMutation{
            createEvent(name: String): String
        }

        schema{
            query: RootQuery
            mutation: RootMutation

        }
    `),
    //name must match!
    rootValue: {
        events: () => {
            return ['event1','event2','event3'];
        },

        createEvent: (args)=>{
            const eventName = args.name;
            return eventName;
        }
    },
    //
    graphiql: true
}));

app.use(bodyParser.json());

// developing local host setup
app.listen(3000);