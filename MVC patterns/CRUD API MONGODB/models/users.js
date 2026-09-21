const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","prefer not say"]
        },
        required:true
    }
})
const users = mongoose.model("user",userSchema)// compiled constructor class that provides prgramming interface to run CRUD queries it represents the collection as a whole
console.log("users model has been created successfully!");
module.exports = users