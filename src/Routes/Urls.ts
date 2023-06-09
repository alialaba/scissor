import express from 'express';
const router =  express.Router();
import { protect } from '../middlewares/auth.js';
// import { getPrivateData } from '../Controllers/private.js';
import {shortenUrl, redirectUrl} from "../Controllers/Urls.js"


router.route("/short").post(protect, shortenUrl);
router.route("/:urlId").get(protect, redirectUrl);



export default  router;