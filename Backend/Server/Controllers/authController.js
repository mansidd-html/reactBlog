import '../Models/database.js';
import User from '../Models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user){res.status(404).json("user not found")}
        const isPasswordCorrect = await bcrypt.compareSync(req.body.password,user.password);
        if (isPasswordCorrect) {
            const {password,...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        }
        else{
            res.status.json("invalid user");
        }

    } catch (error) {
        res.status(404).json(error);
    }
}