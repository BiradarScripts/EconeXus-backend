const mongoose = require('mongoose');

const main=async()=>{
  await mongoose.connect('mongodb://127.0.0.1:27017/EconeXus');
  console.log('Database connected');
}

exports.connectToMongodb = main;