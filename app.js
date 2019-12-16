const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();


//will replace this in production, aka use database
const events = [];

// app.get('/',(req,res,next)=>{
//     res.send('Hello Muyang, this is a initial test!');
// });

//! mark as non-nullable,
app.use('/graphql',
    graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String! 
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String! 
        }


        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation

        }
    `),
    //name must match!
    //resolver functions:
    rootValue: {
        events: () => {
            return events;
        },

        createEvent: (args)=>{
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
                // date: new Date().toISOString()
            };
            events.push(event);
            return event;
        }
    },
    graphiql: true
    
})
);

app.use(bodyParser.json());

// developing local host setup
app.listen(3000);