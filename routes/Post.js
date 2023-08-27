const express=require('express')
const routs=express.Router();
const postController=require('../controller/Post')
const fetchUserDetails=require('../middleware/fetchUser')


routs.get('/getAllPosts/:id',fetchUserDetails.fetchUser,postController.getAllPosts)
.post('/addPost',fetchUserDetails.fetchUser,postController.addPosts)
.put('/updatPost/:id',fetchUserDetails.fetchUser,postController.updatePosts)
.delete('/deletePost/:description',fetchUserDetails.fetchUser,postController.deletePosts)
.get('/getUserPost/:id',postController.getUserPost);


exports.routes=routs;