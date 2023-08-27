const User=require('../models/User')
const userModel=User.newUser;
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const JWT_SECRET="EconeXus-Connect with people$";




exports.signUpUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ "email": req.body.email });
        if (existingUser) { 
            Success=false;
            return res.status(400).json({ Success,"error": "Email/user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = secPass;

        const user = await userModel.create(req.body);
        const data = {
            user: {
                id: user.id
            }
        };
        const justMadeUser = await userModel.findOne({ "email": req.body.email });
        const id = justMadeUser._id.toString();
        const authToken = jwt.sign(data, JWT_SECRET);
        Success=true;
        res.json({ Success, authToken, id });
    } catch (err) {
        res.status(500).json(err);
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let alreadyUser = await userModel.findOne({ email });
        if (!alreadyUser) {
            return res.status(400).json({ "error": "Sorry, user doesn't exist" });
        }
        const passwordCompare = await bcrypt.compare(password, alreadyUser.password);
        if (!passwordCompare) {
            Success = false;
            return res.status(400).json({ Success, "error": "Sorry, password is incorrect" });
        }
        const data = {
            user: {
                id: alreadyUser.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        const id = alreadyUser._id.toString();
        
        Success = true;
        res.json({ Success, authToken,id});
    } catch (err) {
        res.status(500).json(err);
    }
};


exports.getUsers = async (req, res) => {
    try {
        const presentUser = await userModel.findById(req.params.id);
        
        if (!presentUser) {
            return res.status(404).json({"error": "User not found"});
        }
        
        const interestsDataOfPresentUser = presentUser.interestsData;
        const totalUsers = await userModel.find();
        
        const matchedUsers = [];
        
        for (let i = 0; i < totalUsers.length; i++) {
            let interestsDataOfCheckingUser = totalUsers[i].interestsData;
            for (let j = 0; j < interestsDataOfPresentUser.length; j++) {
                if (interestsDataOfCheckingUser.includes(interestsDataOfPresentUser[j]) && presentUser._id!==totalUsers[i]._id) {
                    matchedUsers.push(totalUsers[i]);
                    break; 
                }
            }
        }
        
        const usersWithoutPasswords = matchedUsers.map((user) => {
            const { password, name, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        res.json(usersWithoutPasswords);
    } catch (err) {
        res.status(500).json(err);
    }
};


exports.editUser=async(req,res)=>{
    try{
        const {interestsData,userName}=req.body;
        const updateUserDetails={};
        if(interestsData){
            updateUserDetails.interestsData=interestsData;
        }
        if(userName){
            updateUserDetails.userName=userName;
        }
        
        let userToBeUpdated=await userModel.findById(req.params.id);

        if(userToBeUpdated._id.toString()!==req.user.id){
            return res.status(401).json({"error":"Not Authorized"})
        }
        const updatedUser=await userModel.findByIdAndUpdate(req.params.id,{$set:updateUserDetails},{new:true})
        res.json({'user':'updated'})
    }
    catch(err){
        res.status(500).json(err)
    }
}


exports.getUser = async (req, res) => {
    try {
        const existingUser = await userModel.findById(req.params.id);

        if (existingUser._id.toString() !== req.user.id) {
            return res.status(401).json({ "error": "Not Authorized" });
        }

        const { password, _id, date, ...userWithoutPassword } = existingUser.toObject();
        res.json(userWithoutPassword);
    } catch (err) {
        res.status(500).json(err);
    }
};




