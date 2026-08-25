import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
    try {
        let token = req.cookies?.token
        if (!token && req.headers?.authorization) {
            const parts = req.headers.authorization.split(" ")
            if (parts.length === 2 && parts[0] === "Bearer") {
                token = parts[1]
            }
        }
        if(!token){
            return res.status(401).json({message:"Token is not found"})
        }
        let verifyToken = jwt.verify(token ,process.env.JWT_SECRET )
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