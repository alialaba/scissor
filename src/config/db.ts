
import dotenv from 'dotenv';
dotenv.config();
import mongoose , { ConnectOptions } from "mongoose";


// console.log(process.env.MONGO_URI)
const connectDB = async (): Promise<void>=>{
 try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log('Database Connected');


 } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    
 }
}

export default connectDB;