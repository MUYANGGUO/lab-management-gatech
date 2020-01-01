const Checkingout = require('../../models/checkingout');
const Asset = require('../../models/asset');
const Student = require('../../models/student');
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
            asset: fetchedAsset,
            comments: args.checkingoutInput.comments
        });
        const result = await checkingout.save();
        const checkedoutbywhom = await Student.findById(args.checkingoutInput.studentId);
            if (!checkedoutbywhom){
                throw new Error('Students is not in record, warning!');
            }
            checkedoutbywhom.checkedoutLogs.push(checkingout);
            await checkedoutbywhom.save();
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
            const logobject = await Checkingout.findById(args.cancelcheckingoutInput.checkingoutId);
            const checkingout = await Checkingout.findById(args.cancelcheckingoutInput.checkingoutId).populate('asset');
            const asset = transformAsset(checkingout.asset);
            // const event = {
            //     ...booking.event._doc, 
            //     creator: user.bind(this, booking.event._doc.creator)
            // };
 
            //await Checkingout.deleteOne({ _id: args.checkingoutId });
            const checkedoutbywhom = await Student.findById(args.cancelcheckingoutInput.studentId);
            if (!checkedoutbywhom.checkedoutLogs){
                throw new Error('Student does not have checkedout records');
            }
            checkedoutbywhom.checkedoutLogs.pull(logobject);
            await checkedoutbywhom.save();
            await Checkingout.deleteOne({ _id: args.cancelcheckingoutInput.checkingoutId });
            return asset;
        } catch (err) {
            throw err;
        }
    }
};