const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//import my model 
const Event = require('./models/event');
const User = require('./models/user');

const app = express();

const user = userID =>{
    return User.findById(userID).then(
        user=>{
            return { ...user._doc , createdEvents: events.bind(this, user._doc.createdEvents)};
        }
    ).catch(err=>{
        throw err;
    });
};

const events = eventIds =>{
    return Event.find({_id: {$in: eventIds}}).then(
        events=>{
            return events.map(event=>{
                return { ...event._doc, creator: user.bind(this, event.creator)};
            })
        }
    ).catch(
        err=>{
            throw err;
        }
    )
};



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
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String! 
        }

        input UserInput {
            email: String!
            password: String!
        }


        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
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
                    return { ...event._doc, creator: user.bind(this, event._doc.creator)};
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
                date: new Date(args.eventInput.date),
                //hardcoded here, dummy id for dev, will change later
                creator: '5dfa82afb72ab3592c651cb9'
            });
            let createdEvents;
            return event.save()
            .then(result => {
                createdEvents = { ...result._doc, creator: user.bind(this, result._doc.creator)};
                return User.findById('5dfa82afb72ab3592c651cb9')

            })
            .then(user=>{
                if (!user){
                    throw new Error('User not exists.');
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result=>{
                return createdEvents;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    
        },
        createUser: args =>{
            //avoid repeated user
            return User.findOne({email: args.userInput.email}).then(user=>{
                if (user) {
                    throw new Error('User exists already.')
                }
                return bcrypt
                .hash(args.userInput.password,12);
            })
            .then(hashedpassword=>{
                const user = new User({
                    email: args.userInput.email,
                    password: hashedpassword
                });
                return user.save();
                
            })
            .then(result=>{
                return { ...result._doc, password: null}
            })
            .catch(err=>{
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