const mongoose=require('mongoose')
const { Schema } = mongoose;

const ImageSchema = new Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  image:{
    type:String,
  }
});

const Image = mongoose.model('image', ImageSchema);

exports.Image=Image;