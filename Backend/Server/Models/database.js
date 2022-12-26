import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to mongodb"))
    .catch((err) => console.log(err));


/**
 * Model Import
 */
import './Category.js';
import './Post.js';
import './User.js';