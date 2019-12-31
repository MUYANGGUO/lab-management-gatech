const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformBooking, transformEvent } = require('./mergerelation');



module.exports = {
    bookings: async () =>{
        try {
          const bookings =  await Booking.find();
          return bookings.map(booking=>{
            // return { ...booking._doc, 
            //     user: user.bind(this, booking._doc.user),
            //     event: singleEvent.bind(this, booking._doc.event),
            //     createdAt: dateToString(booking._doc.createdAt),
            //     updatedAt: dateToString(booking._doc.updatedAt),
            // };
            return transformBooking(booking);
          });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async args=>{
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking({
            user: '5dfe64313c48b871429f2d93',
            event: fetchedEvent
        });
        const result = await booking.save();
        // return {
        //     ...result._doc,
        //     // _id: result.id,
        //     user: user.bind(this, booking._doc.user),
        //     event: singleEvent.bind(this, booking._doc.event),
        //     createdAt: dateToString(result._doc.createdAt),
        //     updatedAt: dateToString(result._doc.updatedAt)
            
        // };
        return transformBooking(result);
    },
    cancelBooking: async args =>{
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            // const event = {
            //     ...booking.event._doc, 
            //     creator: user.bind(this, booking.event._doc.creator)
            // };
 
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};