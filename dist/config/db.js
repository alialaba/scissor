import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
// console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map