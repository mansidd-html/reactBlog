import '../Models/database.js';
import User from '../Models/User.js';
import Post from '../Models/Post.js';
import Category from '../Models/Category.js';

/**
 * Category controller
 */
export const createCategory = async(req,res)=>{
    const newCat = await new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat); 
    } catch (error) {
        res.status(500).json(error);
    }
}
/////////////////////////////////////////////////
export const getAllCategory = async(req,res)=>{
    try {
        const cats = await Category.find();
        res.status(200).json(cats); 
    } catch (error) {
        res.status(500).json(error);
    }
}