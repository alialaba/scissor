import express from "express";
import User from "../Models/User.js";

import ErrorResponse from "../Utils/errorResponse.js";


//signup logic
export const signup = async (req,res, next)=>{

    const {fullname, email, password} = req.body;
    
    try {
        const user = await User.create({fullname, email, password});
        // return res.status(201).json({success: true, token: "thehhehr" })
        sendToken(user, 201, res)
    } catch (error) {
        next(error)
        
    }

}


export const login = async (req,res, next)=>{
    const {email, password} = req.body;

    //check if email and password was entered
    if(!email || !password){
        // res.status(400).json({success: false, error: "Please provide email and password"})
        return next(new ErrorResponse("Please provide email and password", 400))
    }

    try {
        // Check that user exists by email and select it psd
        const user = await User.findOne({email}).select("+password");
        if(!user){
            // res.status(404).json({success: false, error: "Invalid creditials"})
            return next(new ErrorResponse("Invalid credentials", 401))
           }

           //Check that password match the email
        const isMatch = await user.isValidPassword(password)

       if(!isMatch){
        // res.status(404).json({success: false, error: "Invalid creditials"})
        return next(new ErrorResponse("Invalid credentials", 401))
       }

    //    return res.status(200).json({success: true, token: "thehhehr"})
       sendToken(user, 200, res)
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
        
    }
}


const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}