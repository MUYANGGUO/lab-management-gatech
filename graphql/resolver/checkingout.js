const Checkingout = require('../../models/checkingout');
const Asset = require('../../models/asset');
const { transformCheckingout, transformAsset } = require('./mergerelation');



module.exports = {
    checkingouts: async () =>{
        try {
          const checkingouts =  await Checkingout.find();
          return checkingouts.map(checkingout=>{
            // return { ...checkingout._doc, 
            //     student: user.bind(this, checkingout._doc.user),
            //     asset: singleEvent.bind(this, checkingout._doc.event),
            //     createdAt: dateToString(checkingout._doc.createdAt),
            //     updatedAt: dateToString(checkingout._doc.updatedAt),
            // };
            return transformCheckingout(checkingout);
          });
        } catch (err) {
            throw err;
        }
    },
    createCheckingout: async args=>{
        const fetchedAsset = await Asset.findOne({_id: args.checkingoutInput.assetId});
        const checkingout = new Checkingout({
            student: args.checkingoutInput.studentId,
            asset: fetchedAsset
        });
        const result = await checkingout.save();
        // return {
        //     ...result._doc,
        //     // _id: result.id,
        //     user: user.bind(this, booking._doc.user),
        //     event: singleEvent.bind(this, booking._doc.event),
        //     createdAt: dateToString(result._doc.createdAt),
        //     updatedAt: dateToString(result._doc.updatedAt)
            
        // };
        return transformCheckingout(result);
    },
    cancelCheckingout: async args =>{
        try {
            const checkingout = await Checkingout.findById(args.checkingoutId).populate('asset');
            const asset = transformAsset(checkingout.asset);
            // const event = {
            //     ...booking.event._doc, 
            //     creator: user.bind(this, booking.event._doc.creator)
            // };
 
            await Checkingout.deleteOne({ _id: args.checkingoutId });
            return asset;
        } catch (err) {
            throw err;
        }
    }
};