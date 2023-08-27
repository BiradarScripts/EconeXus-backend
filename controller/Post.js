const express=require('express')
const post=require('../models/Post')

const postModel=post.Post

exports.getAllPosts = async (req, res) => {
  try {
      const posts = await postModel.find({ 'user': req.params.id }).lean();
      res.json(posts);
  } catch (err) {
      res.status(500).json(err);
  }
};

exports.getUserPost=async(req,res)=>{
  try{
    const posts=await postModel.find({'user':req.params.id}).lean();
    res.json(posts)
  }catch(err){
    res.status(500).json(err)
  }
}

exports.addPosts=async(req,res)=>{
    const {title,description,tag}=req.body;
    try{
        conPost=await postModel.create({
            title:title,
            description:description,
            tag:tag,
            user:req.user.id
        })
        res.json(newPost)
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}



exports.updatePosts=async(req,res)=>{
  try {
    const { title, description, tag } = req.body;
    const newPost = {};

    if (title) {
      newPost.title = title;
    }
    if (description) {
      newPost.description = description;
    }
    if (tag) {
      newPost.tag = tag;
    }

    const existingPost = await postModel.findById(req.params.id)

    if (!existingPost) {
      return res.status(404).send("Post not found");
    }
    if (existingPost.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );

    res.json({ Post: "updated", data: updatedPost });

  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}



exports.deletePosts = async (req, res) => {
  try {
    const existingPost = await postModel.findOne({
      description: req.params.description
    });

    if (!existingPost) {
      return res.status(404).send("Post not found");
    }

    if (existingPost.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    const deletedPost = await postModel.findOneAndDelete({
      description: req.params.description
    });

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
