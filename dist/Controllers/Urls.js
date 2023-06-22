import { nanoid } from 'nanoid';
import Url from "../Models/Url.js";
import User from "../Models/User.js";
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });
import { validateUrl } from "../Utils/ValidateUrl.js";
import ErrorResponse from "../Utils/errorResponse.js";
//Shorten the Url
export const shortenUrl = async (req, res, next) => {
    const { originalUrl } = req.body;
    const base = "http://localhost:3000";
    // console.log(req.user)
    const urlId = nanoid(5);
    if (validateUrl(originalUrl)) {
        try {
            // console.log("seen" , user)
            let url = await Url.findOne({ originalUrl });
            if (url) {
                res.status(201).json({ success: true, url });
            }
            else {
                let user = await User.findOne({ _id: req.user._id });
                const shortUrl = `${base}/${urlId}`;
                console.log(user._id);
                let newShortenUrl = await Url.create({
                    originalUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                    owner: user._id
                });
                // console.log("new datas", newShortenUrl)
                let savedUrl = await newShortenUrl.save();
                //save shortenurl to the owner 
                user.urls = user.urls.concat(savedUrl.shortUrl);
                await user.save();
                res.status(201).json({ success: true, newShortenUrl });
            }
        }
        catch (error) {
            // console.log(error)
            // res.status(500).json('Server Error');
            next(error);
        }
    }
    else {
        // res.status(400).json('Invalid Original Url');
        return next(new ErrorResponse('Invalid Original Url', 400));
    }
};
//Redirect the Url
export const redirectUrl = async (req, res, next) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            await Url.updateOne({ urlId: req.params.urlId }, { $inc: { clicks: 1 } });
            // return res.redirect((await url).originalUrl);
            let user = await User.findOne({ _id: req.user._id });
            // Check if the owner of the URL matches the authenticated user
            if (user && user.urls.includes(url.shortUrl)) {
                return res.redirect(url.originalUrl);
            }
            else {
                // If the user is not the owner, return an error or handle it accordingly
                return next(new ErrorResponse("Unauthorized", 401));
            }
        }
        else {
            // res.status(404).json("Not Found")
            return next(new ErrorResponse("Not Found", 404));
        }
    }
    catch (error) {
        // console.log(error);
        // res.status(500).json('Server Error');
        next(error);
    }
};
//# sourceMappingURL=Urls.js.map