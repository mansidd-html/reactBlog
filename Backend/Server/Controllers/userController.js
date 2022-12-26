import '../Models/database.js';
import User from '../Models/User.js';
import bycrpt from 'bcryptjs';
import Post from '../Models/Post.js';
/**
 * User controllers
 */
export const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bycrpt.genSalt(10);
            req.body.password = await bycrpt.hash(req.body.password, salt);
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updateduser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(401).json("you can udpate only your account");
    }
}
/////////////////////////////////////////////
export const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted successfully");
            } catch (error) {
                res.status(500).json(error);
            }
        } catch (error) {
            res.status(404).json("User not found");
        }
    }
    else {
        res.status(401).json("you can delete only your account");
    }
}
/////////////////////////////////////////////////////
export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...otherDetails} = user._doc;
        res.status(200).json(otherDetails);
    } catch (error) {
        res.status(404).json("user not found");
    }
}
//////////////////////////////////////////////////////
// export const getAllUser = async (req,res)=>{
//     try {
//         const user = await User.find();
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(404).json("No users in db");
//     }
// }