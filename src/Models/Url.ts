import mongoose , { Types, Schema,  model} from "mongoose";

// import  UserDocument  from "./User.js";
interface Url {
    urlId: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    date: Date;
    owner: { type: mongoose.Types.ObjectId, ref: "User" };
    // owner: Document["_id"];
}

const UrlSchema = new Schema<Url>({

    urlId:{
        type: String,
        required: true
    },
    originalUrl:{
        type: String,
        required: true,
    },
    shortUrl:{
        type: String,
        required: true,
    },
    clicks:{
        type: Number,
        required: true,
        default: 0,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }

})

const UrlModel = model<Url>("urls", UrlSchema);
 
export default UrlModel;