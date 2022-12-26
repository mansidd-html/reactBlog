import '../Models/database.js';
import User from '../Models/User.js';
import Post from '../Models/Post.js';

/**
 * Post controller
 */
export const createPost = async (req, res) => {
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}
///////////////////////////////////////////////////
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true});
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else {
            res.status(401).json("you can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
///////////////////////////////////////////////////////////
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("deleted Successfully");
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else {
            res.status(401).json("you can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
//////////////////////////////////////////////////////////////
export const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json("post not found");
    }
}
//////////////////////////////////////////////////////////////
export const getAllPost = async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
       let posts;
       if (username) {
        posts = await Post.find({username:username});
       }
       else if(catName){
        posts = await Post.find({categories:{
            $in:[catName]
        }});
       }
       else{
        posts = await Post.find();
       }
       res.status(200).json(posts);
    } catch (error) {
        res.status(404).json("post not found");
    }
}