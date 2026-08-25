import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(401).json({message:"Token is not found"})
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({message:"user doesn't have valid token"})
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        return res.status(401).json({message:`Authentication failed: ${error.message}`})
    }
}
export default isAuth