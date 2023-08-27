const express=require('express')
const routs=express.Router();
const imageController=require('../controller/Image')
const fetchUserDetails=require('../middleware/fetchUser')

routs.post('/uploadImage/:id',imageController.uploadImage)
.get('/getImage/:id',fetchUserDetails.fetchUser,imageController.getImage)
.put('/updateImage/:id',fetchUserDetails.fetchUser,imageController.updateImage)

exports.routes=routs;