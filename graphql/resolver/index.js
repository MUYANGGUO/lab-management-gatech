const bcrypt = require('bcryptjs');

//import my model 
const Event = require('../../models/event');
const User = require('../../models/user');
const Student = require('../../models/student');
const user = async userID =>{
    try{
    const user = await User.findById(userID);

    return { ...user._doc , createdEvents: events.bind(this, user._doc.createdEvents)};
    
    } catch (err){
        throw err;
    }
};





const events = async eventIds =>{
    try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event=>
        {
        return {
            ...event._doc,
            date: dateToString(event._doc.date),
            creator: user.bind(this, event.creator)
          };
        });

        } catch (err){
            throw err;
        }

};





module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
        return events
            .map(event =>{
                return { ...event._doc, 
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)};
            });

        } catch (err){
            throw err;
        }
    },
    students: async () => {
        try {
        const students = await Student.find();
        return students
            .map(student =>{
                return { ...student._doc, 
       
                };
            });

        } catch (err){
            throw err;
        }
    },

    createEvent: async (args)=>{
        try {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            //hardcoded here, dummy id for dev, will change later
            creator: '5dfe64313c48b871429f2d93'
        });
        let createdEvents;
        const result = await event
        .save()
   
            createdEvents = { ...result._doc, 
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)};

            const creator = await User.findById('5dfe64313c48b871429f2d93');


     
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
    createUser: async args =>{
        //avoid repeated user
        try{
        const existinguser = await User.findOne({email: args.userInput.email})
            if (existinguser) {
                throw new Error('User exists already.')
            }
            const hashedpassword = await bcrypt
            .hash(args.userInput.password,12);

            const user = new User({
                email: args.userInput.email,
                password: hashedpassword
            })
            const result = await user.save();

            return { ...result._doc, password: null};
        } catch (err) {
            throw err;
        }
    },
    createStudent: async args =>{
        try{
            const existingstudent = await Student.findOne({gtid: args.studentInput.gtid})
            if (existingstudent) {
                throw new Error('Student is already in records')
            }
            const student = new Student({
                name: args.studentInput.name,
                email: args.studentInput.email,
                gtid: args.studentInput.gtid
            })
            const result = await student.save();
            return { ...result._doc };
        } 
        catch (err) {
            throw err;
        }
    }
};