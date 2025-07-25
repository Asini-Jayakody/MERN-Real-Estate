import Listing from "../models/listing.models.js"
import User from "../models/user.models.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res) => {
    res.json({
        message: 'Hello World'
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401 , "You can only update your own account!"))
    try {
        if (req.body.password) {
            req.body.password == bcryptjs.hashSync(req.body.password , 10)
        }

    const updateUser = await User.findByIdAndUpdate(req.params.id , {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
    }, {new: true})

    const {password, ...rest} = updateUser._doc

    res.status(200).json(rest)
    }catch (error) {
        next(error)
    }

}

export const deleteUser = async (req,res,next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'You can only delete your account!'))
    try {
        await User.findOneAndDelete(req.params.id)
        res.clearCookie('access_token') //express.js function
        res.status(200).json('User has been deleted!')        
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async (req,res,next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'You can only get your listing!'))
    try {
        const listing = await Listing.find({userRef:req.params.id})
        res.status(200).json(listing)
        
    } catch (error) {
        return next(error)
        
    }
}


export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...rest} = user._doc

        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}