import mongoose from "mongoose";
import { setTheUsername } from "whatwg-url";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)


const User = mongoose.model('User', userSchema)

export default User;