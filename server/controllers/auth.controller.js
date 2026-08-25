import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"


export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name: name || email.split("@")[0] || "User",
                email
            })
        }
        let token = await getToken(user._id)
        if (!token) {
            return res.status(500).json({ message: "JWT token generation failed. Ensure JWT_SECRET is set in environment." });
        }
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token" , token , {
            httpOnly:true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path:"/",
            maxAge:7 * 24 * 60 * 60 * 1000

        })
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            credits: user.credits,
            isCreditAvailable: user.isCreditAvailable,
            notes: user.notes,
            token
        })
    } catch (error) {
        console.error("googleSignup Error:", error)
        return res.status(500).json({message:`googleSignup Error: ${error.message || error}`})
    }
}

export const logOut = async (req,res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/"
        });
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message:`Logout Error  ${error}`})
    }
}
