import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import User from  "../Models/User.js";
import ErrorResponse from "../Utils/errorResponse.js";

export const protect =  async (req,res,next)=>{
    let token ;
 
    if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
      return next(new ErrorResponse(" Not authorized to access this route", 401))
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode token with secret code
        const user = await User.findById(decoded.id);
        console.log(user)

        if(!user){
            return next(new ErrorResponse(" No user found with this id", 404 ))
        }

        req.user = user;
        next();
        
    } catch (error) {

      return next(new ErrorResponse(" Not authorized to access this route", 401));
        
    }

}