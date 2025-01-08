import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js'
// import signupRouter from './routes/auth.router.js'
// import signinRouter from './routes/auth.router.js'
// import googleRouter from './routes/auth.router.js'
import authRouter from './routes/auth.router.js'
import cookieParser from 'cookie-parser';
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(()=> {
        console.log('connected to MONGODB!')
    })
    .catch((err)=> {
        console.log(err)
    })

const app = express();

app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
    console.log('server is running!')
})

app.use('/api/user', userRouter)
// app.use('/api/auth', signupRouter)
// app.use('/api/auth' , signinRouter)
// app.use('api/auth' , googleRouter)
app.use('/api/auth', authRouter)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    }) 
})

