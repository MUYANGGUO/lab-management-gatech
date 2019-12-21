const bcrypt = require('bcryptjs');

//import my model 
const Event = require('../../models/event');
const User = require('../../models/user');
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
                return {
                     ...event._doc, 
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator
                        )};
            })
        }
    ).catch(
        err=>{
            throw err;
        }
    )
};




module.exports = {
    events: () => {
        return Event.find()
        .then(events=>{
            return events.map(event =>{
                return { ...event._doc, 
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)};
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
            createdEvents = { ...result._doc, 
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)};
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
};