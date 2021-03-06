const Event = require('../../models/event');
const User = require('../../models/user');
const Asset = require('../../models/asset');
const Student = require('../../models/student');
const { dateToString } = require('../../helperfunctions/date');

const user = async userID =>{
    try{
    const user = await User.findById(userID);

    return { ...user._doc , createdEvents: events.bind(this, user._doc.createdEvents)};
    
    } catch (err){
        throw err;
    }
};

const student = async studentID =>{
    try{
    const student = await Student.findById(studentID);

    return { ...student._doc , checkedoutAssets: assets.bind(this, student._doc.checkedoutAssets)};
    
    } catch (err){
        throw err;
    }
};


const assets = async assetIds =>{
    try {
    const assets = await Asset.find({_id: {$in: assetIds}})
    return assets.map(asset=>
        {
        return transformAsset(asset);
        });

        } catch (err){
            throw err;
        }

};


const events = async eventIds =>{
    try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event=>
        {
        return transformEvent(event);
        });

        } catch (err){
            throw err;
        }

};

const singleEvent = async eventId =>{
    try{
        const event = await Event.findById(eventId);
        // return {
        //     ...event._doc,
        //     creator: user.bind(this, event.creator)
        // };
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
};
const singleAsset = async assetId =>{
    try{
        const asset = await Asset.findById(assetId);
        // return {
        //     ...event._doc,
        //     creator: user.bind(this, event.creator)
        // };
        return transformAsset(asset);
    } catch (err) {
        throw err;
    }
};
const transformEvent = event =>{
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
};

const transformBooking = booking =>{ 
    return { 
    ...booking._doc, 
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)};
};
const transformAsset = asset =>{
    return {
        ...asset._doc
        // creator: user.bind(this, event.creator)
    };
};

const transformCheckingout = checkingout =>{ 
    return { 
    ...checkingout._doc, 
    student: student.bind(this, checkingout._doc.student),
    asset: singleAsset.bind(this, checkingout._doc.asset),
    createdAt: dateToString(checkingout._doc.createdAt),
    updatedAt: dateToString(checkingout._doc.updatedAt)};
};
// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.transformCheckingout = transformCheckingout;
exports.transformAsset = transformAsset;