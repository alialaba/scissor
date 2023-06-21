import express from "express";
import { nanoid } from 'nanoid';
import Url from "../Models/Url.js";
import User from "../Models/User.js"
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });
import {validateUrl} from "../Utils/ValidateUrl.js";

import ErrorResponse from "../Utils/errorResponse.js";



//Shorten the Url
export const  shortenUrl = async (req,res, next)=>{

    const {originalUrl} = req.body;
    const base = "http://localhost:3000";

    const urlId = nanoid(5);
    if(validateUrl(originalUrl)){

        try {
            let user = await User.findOne({_id:req.user._id})
            let url = await Url.findOne({originalUrl});
            if(url){
                res.status(201).json({success:true, url})
            }else{
                const shortUrl = `${base}/${urlId}`;
            url = new Url({
                originalUrl,
                shortUrl,
                urlId,
                date: new Date(),
                user
              });
            //   (urlid, origUrl, short url, User

              await url.save();
              res.status(201).json({success:true, url})

            }
            
        } catch (error) {
            // console.log(error)
            // res.status(500).json('Server Error');
            next(error)
        }

    }else{
        // res.status(400).json('Invalid Original Url');
        return next(new ErrorResponse('Invalid Original Url', 400))
    }

}



//Redirect the Url
export const redirectUrl = async (req,res, next)=>{

    try {
        const url = Url.findOne({urlId: req.params.urlId});

        if(url){
            await Url.updateOne({urlId:req.params.urlId}, {$inc: {clicks: 1}});
            return res.redirect((await url).originalUrl);
        }else{
            // res.status(404).json("Not Found")
            return next(new ErrorResponse("Not Found", 404));
        }
        
    } catch (error) {
        // console.log(error);
        // res.status(500).json('Server Error');
        next(error)
    }

}


