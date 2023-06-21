import mongoose, { Schema, model } from "mongoose";
const UrlSchema = new Schema({
    urlId: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    owner: { type: mongoose.Types.ObjectId,
        ref: "User" },
});
const UrlModel = model("urls", UrlSchema);
export default UrlModel;
//# sourceMappingURL=Url.js.map