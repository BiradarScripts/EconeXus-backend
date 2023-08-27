const express=require('express')
const image=require('../models/Image')
const imageModel=image.Image;


exports.uploadImage=async(req,res)=>{
    try{
        const newImage=await imageModel.create({
            image:req.body.myFile,
            user:req.params.id
        })
        res.json(newImage)
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error})
    }
}


exports.getImage=async(req,res)=>{
    try{
        const existingUser = await imageModel.find({'user':req.params.id});
        res.json(existingUser)
    }catch(error){
        res.status(500).json({message:"Internal server error",error})
    }
}

exports.updateImage=async(req,res)=>{
    try{
    const newImage = {};



    if (req.body.myFile) {
        newImage.image = req.body.myFile;
    }

    const existingImage = await imageModel.find({'user': req.params.id})

    if (!existingImage) {
      return res.status(404).send("Note not found");
    }
    if (existingImage[0].user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    const updatedImage = await imageModel.findOneAndUpdate(
    {'user': req.params.id},
      { $set: newImage },
      { new: true }
    );

    res.json({ image: "updated", data: updatedImage });
        
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}