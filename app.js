const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

//import my model 
const Event = require('./models/event');


const app = express();




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
            return Event.find()
            .then(events=>{
                return events.map(event =>{
                    return { ...event._doc };
                });

            }).catch(err=> {
                throw err;
                });
        },

        createEvent: (args)=>{
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            return event.save()
            .then(result => {
                console.log(result);
                return { ...result._doc };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    
        }
    },
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