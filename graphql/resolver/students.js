const Student = require('../../models/student');

module.exports = {
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

    createStudent: async args =>{
        try{
            const existingstudent = await Student.findOne({gtid: args.studentInput.gtid})
            if (existingstudent) {
                throw new Error('Student is already in records')
            }
            const student = new Student({
                _id: args.studentInput.gtid,
                name: args.studentInput.name,
                email: args.studentInput.email,
                gtid: args.studentInput.gtid
            })
            const result = await student.save();
            return { ...result._doc, _id: args.studentInput.gtid.toString()};
        } 
        catch (err) {
            throw err;
        }
    },


};