const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./mergerelation');

module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
        return events
            .map(event =>{
                // return { ...event._doc, 
                //     date: new Date(event._doc.date).toISOString(),
                //     creator: user.bind(this, event._doc.creator)};
                return transformEvent(event);
            });

        } catch (err){
            throw err;
        }
    },
    createEvent: async (args,req)=>{
        try {
            // console.log(req.isAuth)
            if (!req.isAuth) {
                throw new Error ('Unauthenticated')
            }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            date: new Date(args.eventInput.date),
            //hardcoded here, dummy id for dev, will change later
            creator: req.userId
        });
        let createdEvents;
        const result = await event
        .save()
   
            // createdEvents = { ...result._doc, 
            //     date: new Date(event._doc.date).toISOString(),
            //     creator: user.bind(this, result._doc.creator)};
            createdEvents = transformEvent(result);

            const creator = await User.findById(req.userId);


     
            if (!creator){
                throw new Error('User not exists.');
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvents;
        } catch (err){ 
            throw err;
        }

    },
    
    
};