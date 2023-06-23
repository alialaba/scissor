import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";

import urlsRouter from "./Routes/Urls.js";
import authRoute from "./Routes/Auth.js";
import errorHandler from "./middlewares/error.js";
import cors from "cors";
// import { protect } from './middleware/auth.js';

const app = express();
const port = process.env.PORT || 3000;


//Connect Database
connectDB();
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//url Route
app.use('/api/',  urlsRouter);
//Auth Route
app.use("/api/auth", authRoute);


//Error handler should always be the last piece of middleware
app.use(errorHandler);

//Home page
app.get("/", (req, res)=>{
    res.send("Hello Typescript")
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})