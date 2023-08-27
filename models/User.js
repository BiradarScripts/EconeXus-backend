const mongoose=require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({

  email:{
    type:String,
    required:true,
    unique:true
    },
  password:{
    type:String,
    required:true
    },
  date:{
    type:Date,
    default:Date.now
  },
  firstName:{
      type:String,
      required:true
      },
  lastName:{
        type:String,
        required:true
      },
  userName:{
    type:String,
    required:true,
    unique:true
  },
  interestsData:{
    type:Array,
  },
  userImage:{
    type:String,
  }
});

exports.newUser=mongoose.model('user', UserSchema); 