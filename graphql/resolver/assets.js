const Asset = require('../../models/asset');
const Student = require('../../models/student');
const { transformAsset } = require('./mergerelation');

module.exports = {
    assets: async () => {
        try {
        const assets = await Asset.find();
        return assets
            .map(asset =>{
                // return { ...event._doc, 
                //     date: new Date(event._doc.date).toISOString(),
                //     creator: user.bind(this, event._doc.creator)};
                return transformAsset(asset);
            });

        } catch (err){
            throw err;
        }
    },
    createAsset: async (args)=>{
        try {
        const exsitingasset = await Asset. findOne({asset_id: args.assetInput.asset_type+'/'+args.assetInput.name+'/'+args.assetInput.tag_number})
            if (exsitingasset){
                throw new Error('Asset alreay exists, please check if the classification and tag are correct')
            }

        const asset = new Asset({
            asset_id: args.assetInput.asset_type+'/'+args.assetInput.name+'/'+args.assetInput.tag_number,
            name: args.assetInput.name,
            asset_type: args.assetInput.asset_type,
            tag_number: args.assetInput.tag_number
        });
        // let createdAssets;
        const result = await asset.save()
   
            // createdEvents = { ...result._doc, 
            //     date: new Date(event._doc.date).toISOString(),
            //     creator: user.bind(this, result._doc.creator)};
            // createdAssets = transformAsset(result);

            // const checkingoutstudent = await Student.findById('5e0aca9d7e62535729faa319');
            // console.log(checkingoutstudent)

     
            // if (!checkingoutstudent){
            //     throw new Error('Student not exists.');
            // }
            // checkingoutstudent.checkedoutAssets.push(asset);
            // await checkingoutstudent.save();

            return { ...result._doc};
        } catch (err){ 
            throw err;
        }

    },
    
    
};