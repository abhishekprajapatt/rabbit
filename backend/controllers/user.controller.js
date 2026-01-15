import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"somthing is missing, please check",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exist with this email.",
                success:false
            })
        }
        
        const hashPassword = await bcryptjs.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashPassword
        });

        return res.status(201).json({
            message:"Account Created Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed register",
            success:false
        })
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"somthing is missing, please check",
                success:false
            })
        }
    
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect Email",
                success:false
            })
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Password",
                success:false
            })
        }
        generateToken(res, user, `Welcome back ${user.name} Cs-Academy`)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed login",
            success:false
        })  
    }

};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed logout",
            success:false
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }

        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed load user",
            success:false
        })
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                message:"User not found",
                success:false
            })
        }

        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicId);
        }

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;
        const updatedData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");
        return res.status(200).json({
            message:"Profile updated successfully.",
            success:true,
            user:updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed update profile",
            success:false
        });
    }
}
