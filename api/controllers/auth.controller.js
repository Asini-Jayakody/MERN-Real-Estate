import bcryptjs from 'bcryptjs'
import User from '../models/user.models.js'

export const signup = async (req,res) => {
    const {username, email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username, email, password:hashedPassword})
    try{
        await newUser.save()
        res.status(200).json("user has created successfully!")
    }catch(error){
        res.status(500).json(error)
    }

}