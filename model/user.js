const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
     },
    age : {
        type : Number,
        min : 1,
        max : 100,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    phoneNo : {
        type  : Number,
        validate : {
            validator : (value)=> { 
                return String(value).length === 10;
        },
        message  : props => `${props.value} is not a valid phone number. It should have exactly 10 digits.`
      },
      required : true
}})

const  model = mongoose.model('user',userSchema)

module.exports = model