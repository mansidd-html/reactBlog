import express from 'express'
import dotenv from 'dotenv'
// import mongoose from 'mongoose';
import multer from 'multer';
// import cors from 'cors';
import path, { dirname } from 'path';
const app = express();
dotenv.config();
const port = process.env.port || 5000
/**
 * Images path
 */
app.use('/Images',express.static(path.join('D:/WebApps Projects/ReactBlog/Backend',"/Images"))); 


/**
 * Routes
 */
import routerAuth from './Server/Routes/Auth.js';
import routerCategory from './Server/Routes/Categories.js';
import routerPost from './Server/Routes/Posts.js';
import routerUser from './Server/Routes/Users.js';
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
});
const upload = multer({storage:storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});
/**
 * Middlewares
 */

app.use(express.json());
app.use('/auth',routerAuth);
app.use('/categories',routerCategory);
app.use('/post',routerPost);
app.use('/user',routerUser);
/**
 * 
 */
app.listen("5000",()=>{
    console.log(`running at ${port}`);
})