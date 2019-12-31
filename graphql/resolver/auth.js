const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
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
};