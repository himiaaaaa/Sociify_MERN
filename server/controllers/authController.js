import PasswordReset from "../models/passwordReset.js";
import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async(req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    if(!(firstName || lastName || email || password)){
        next("Provide Required Fields!")
        return res.status(400).json({ message: "Provide Required Fields!" });
    }

    try {
        const userExist = await Users.findOne({ email })

        if(userExist) {
            next("Email Address Already Exists")
            return res.status(400).json({ message: "Email Address Already Exists" });
        }

        const hashedPassword = await hashString(password)

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        //send email verification to user
        sendVerificationEmail(user, res)

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }

}

export const login = async(req, res, next) => {
    const { email, password } = req.body

    try {
        if(!email || !password){
            next("Please provide user credentials")
            return res.status(400).json({ message: "Provide Required Fields!" })
        }

        const user = await Users.findOne({ email }).select("+password").populate({
            path: "friends",
            select: "firstName lastName location profession profileUrl -password"
        })

        if(!user){
            next("Invalid email or password")
            return res.status(400).json({ message: "Invalid email or password" })
        }

        if(!user?.verified){
            next("User email is not verified. Check your email accouand and verify your email")
            return res.status(400).json({ message: "User email is not verified. Check your email accouand and verify your email" })
        }

        const isMatch = await compareString(password, user?.password)

        if(!isMatch){
            next("Invalid email or password")
            return res.status(400).json({ message: "Invalid email or password" })
        }

        user.password = undefined;
        const token = createJWT(user?._id)

        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}